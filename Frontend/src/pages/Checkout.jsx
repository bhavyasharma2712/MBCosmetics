import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const shipping = products.length > 0 ? 70 : 0;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    // database se saved phone aur address pehle se fill ho jaayega
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay. Please check your connection.");
      setLoading(false);
      return;
    }

    try {
      const res = await userRequest.post("/payment/create-order", {
        amount: grandTotal,
      });

      const razorpayOrder = res.data.order ? res.data.order : res.data;

      if (!razorpayOrder || !razorpayOrder.id) {
        throw new Error("Invalid order response from server");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "MB Cosmetics",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const { data: verification } = await userRequest.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verification.success) {
              await userRequest.post("/orders", {
                name: form.name,
                userId: currentUser?._id || "guest",
                products: products.map((p) => ({
                  productId: p.id,
                  name: p.name,
                  quantity: p.quantity,
                  price: p.price,
                })),
                total: grandTotal,
                address: form.address,
                phone: form.phone,
                email: form.email,
                status: 1,
                paymentId: response.razorpay_payment_id,
              });

              dispatch(clearCart());
              toast.success("Payment successful! Order placed.");
              navigate("/myorders");
            }
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#1b5e15",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout Error:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
        <p className="text-2xl font-semibold">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#1b5e15] text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h3 className="text-[20px] font-bold mb-6">Checkout</h3>

      <div className="flex gap-8 flex-col md:flex-row">
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1b5e15]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1b5e15]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1b5e15]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your full delivery address"
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1b5e15]"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 bg-white shadow-md rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col space-y-3 mb-4">
            {products.map((p) => (
              <div key={p.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{p.name} x {p.quantity}</span>
                <span>₹{p.price * p.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex flex-col space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-[#1b5e15] text-white p-3 w-full rounded-lg font-semibold mt-6 disabled:opacity-60"
          >
            {loading ? "Processing..." : `Pay ₹${grandTotal}`}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">Secured by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;