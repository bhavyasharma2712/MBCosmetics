import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FaTruck, FaHouse } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      items: [
        {
          id: 1,
          name: "Luminous Complexion Foundation",
          quantity: 3,
          price: 499,
          image: "/foundation.jpg",
        },
        {
          id: 2,
          name: "AquaClear Deep Clean Face Wash (For Men)",
          quantity: 2,
          price: 349,
          image: "/facewashmen.png",
        },
      ],
    },
  ];

  const shipping = {
    email: "sharmabhavya614@gmail.com",
    name: "Bhavya Sharma",
  };

  const paymentMethod = "VISA";

  const subtotal = orders[0].items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 60;
  const total = subtotal + shippingCost;

  const [ratings, setRatings] = useState({});
  const [hovered, setHovered] = useState({});
  const [reviews, setReviews] = useState({});
  const [submitted, setSubmitted] = useState({});

  const handleSubmit = (itemId) => {
    setSubmitted((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-2xl font-bold">Order confirmed!</h1>
          <p className="text-gray-500 text-sm mt-1">A confirmation has been sent to your email.</p>
          <span className="inline-block mt-2 bg-gray-100 text-gray-500 text-xs px-4 py-1 rounded-full border border-gray-200">
            Order #BB-00{orders[0].id}
          </span>
        </div>

        {/* Status Stepper */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order status</p>
          <div className="flex items-center">
            {/* Confirmed */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-500 text-sm" />
              </div>
              <span className="text-xs text-green-600 font-medium">Confirmed</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-200 mb-4" />
            {/* Shipping */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <FaTruck className="text-yellow-500 text-sm" />
              </div>
              <span className="text-xs text-yellow-600 font-medium">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mb-4" />
            {/* Delivered */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <FaHouse className="text-gray-400 text-sm" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Delivered</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        {orders.map((order) => (
          <div key={order.id} className="mb-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Items ordered</p>

              {order.items.map((item, index) => (
                <div key={item.id}>
                  {/* Item Row */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-400 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                  </div>

                  {/* Rating Section */}
                  <div className="border-t border-gray-200 pt-3 pb-2 mt-1">
                    {submitted[item.id] ? (
                      <p className="text-green-600 text-sm font-medium">Thanks for your review!</p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 mb-2">Rate this product</p>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className="cursor-pointer text-xl"
                              color={
                                star <= (hovered[item.id] || ratings[item.id] || 0)
                                  ? "#f59e0b"
                                  : "#d1d5db"
                              }
                              onMouseEnter={() => setHovered((prev) => ({ ...prev, [item.id]: star }))}
                              onMouseLeave={() => setHovered((prev) => ({ ...prev, [item.id]: 0 }))}
                              onClick={() => setRatings((prev) => ({ ...prev, [item.id]: star }))}
                            />
                          ))}
                        </div>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none bg-white"
                          rows={2}
                          placeholder="Leave a message..."
                          value={reviews[item.id] || ""}
                          onChange={(e) => setReviews((prev) => ({ ...prev, [item.id]: e.target.value }))}
                        />
                        <button
                          onClick={() => handleSubmit(item.id)}
                          className="mt-2 bg-black text-white text-sm px-5 py-1.5 rounded-lg font-medium hover:bg-gray-800"
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>

                  {index < order.items.length - 1 && <div className="border-t border-gray-200 my-2" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Shipping + Payment side by side */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Shipping to</p>
            <p className="text-sm font-medium text-gray-800">{shipping.name}</p>
            <p className="text-xs text-gray-500 mt-1">{shipping.email}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded">VISA</span>
              <span className="text-xs text-gray-500">···· 4242</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order summary</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Shipping</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-full transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Order;