import { FaCheckCircle, FaStar } from "react-icons/fa";
import { useState } from "react";

const Order = () => {
  const orders = [
    {
      id: 1,
      items: [
        {
          id: 1,
          name: "Luminous Complexion Foundation",
          quantity: 3,
          price: '₹499',
          image: "/foundation.jpg",
        },
        {
          id: 2,
          name: "AquaClear Deep Clean Face Wash (For Men)",
          quantity: 2,
          price: '₹349',
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

  const subtotal = '2195';
  const shippingCost = '60';
  const total = '2255';

  const [ratings, setRatings] = useState({});
  const [hovered, setHovered] = useState({});
  const [reviews, setReviews] = useState({});
  const [submitted, setSubmitted] = useState({});

  const handleSubmit = (itemId) => {
    setSubmitted((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

        {/* Header */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
          <h1 className="text-3xl font-bold">Thank You for Your Order!</h1>
          <p className="text-gray-600 mt-2">Here are the details of your recent orders.</p>
        </div>

        {/* Orders */}
        {orders.map((order) => (
          <div key={order.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order #{order.id}</h2>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-bold mb-4">Items Ordered</h3>

              {order.items.map((item) => (
                <div key={item.id}>
                  {/* Item Row */}
                  <div className="flex items-center gap-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.quantity}</p>
                    </div>
                    <p className="font-semibold">{item.price}</p>
                  </div>

                  {/* Rating Section */}
                  <div className="border-t border-gray-300 pt-3 pb-4">
                    {submitted[item.id] ? (
                      <p className="text-green-600 font-medium">Thanks for your review!</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 mb-2">Rate this product</p>

                        <div className="flex gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className="cursor-pointer text-2xl"
                              color={
                                star <= (hovered[item.id] || ratings[item.id] || 0)
                                  ? "#f59e0b"
                                  : "#d1d5db"
                              }
                              onMouseEnter={() =>
                                setHovered((prev) => ({ ...prev, [item.id]: star }))
                              }
                              onMouseLeave={() =>
                                setHovered((prev) => ({ ...prev, [item.id]: 0 }))
                              }
                              onClick={() =>
                                setRatings((prev) => ({ ...prev, [item.id]: star }))
                              }
                            />
                          ))}
                        </div>

                        <textarea
                          className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
                          rows={3}
                          placeholder="leave a message"
                          value={reviews[item.id] || ""}
                          onChange={(e) =>
                            setReviews((prev) => ({ ...prev, [item.id]: e.target.value }))
                          }
                        />

                        <button
                          onClick={() => handleSubmit(item.id)}
                          className="mt-2 bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800"
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Shipping Information */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="font-bold mb-2">Shipping Information</h3>
          <p className="text-gray-600 text-sm">{shipping.email}</p>
          <p className="text-gray-600 text-sm">{shipping.name}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="font-bold mb-2">Payment Method</h3>
          <p className="text-gray-500 text-sm">{paymentMethod}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping:</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2 border-t border-gray-300 pt-2">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = "/"}
            className="bg-green-500 hover:bg-green-900 text-white font-semibold px-10 py-3 rounded-full"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Order;