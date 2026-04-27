import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FaTruck, FaHouse, FaBoxOpen } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods.js";

const statusSteps = [
  { label: "Confirmed", icon: <FaCheckCircle />, value: 0 },
  { label: "Shipping", icon: <FaTruck />, value: 1 },
  { label: "Delivered", icon: <FaHouse />, value: 2 },
];

const Order = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Per-item rating/review state keyed by "orderId_productId"
  const [ratings, setRatings] = useState({});
  const [hovered, setHovered] = useState({});
  const [reviews, setReviews] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get(`/orders/find/${currentUser._id}`);
        setOrders(res.data);
        if (res.data.length > 0) setExpandedOrder(res.data[0]._id);
      } catch (err) {
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser, navigate]);

  const handleSubmitReview = async (productId, key) => {
    const star = ratings[key];
    const comment = reviews[key] || "";
    if (!star) return;
    setSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      await userRequest.put(`/products/${productId}`, {
        $push: {
          ratings: {
            star: String(star),
            name: currentUser.name,
            comment,
            postedBy: currentUser._id,
          },
        },
      });
      setSubmitted((prev) => ({ ...prev, [key]: true }));
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  const getStatusIndex = (status) => {
    if (status === 0) return 0;
    if (status === 1) return 1;
    if (status === 2) return 2;
    return 0;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading your orders…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Empty ────────────────────────────────────────────────────────────────
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBoxOpen className="text-5xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-1">No orders yet</h2>
          <p className="text-gray-400 text-sm mb-5">Looks like you haven't placed any orders.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-2.5 rounded-full transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Orders List ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>

        {/* Orders */}
        {orders.map((order, orderIdx) => {
          const statusIdx = getStatusIndex(order.status);
          const isExpanded = expandedOrder === order._id;
          const orderTotal = order.total;
          const firstProduct = order.products?.[0];

          return (
            <div
              key={order._id}
              className="bg-white shadow-sm rounded-2xl mb-4 overflow-hidden border border-gray-100"
            >
              {/* Order Card Header — always visible */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                {/* Status dot */}
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    statusIdx === 2
                      ? "bg-green-500"
                      : statusIdx === 1
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full border border-gray-200 font-medium">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        statusIdx === 2
                          ? "bg-green-100 text-green-600"
                          : statusIdx === 1
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {statusSteps[statusIdx].label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                    <span className="text-gray-200">·</span>
                    <p className="text-xs text-gray-400">{order.products?.length} item{order.products?.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800 text-sm">₹{orderTotal}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{isExpanded ? "▲ Hide" : "▼ Details"}</p>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4">

                  {/* Status Stepper */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Status</p>
                    <div className="flex items-center">
                      {statusSteps.map((step, i) => {
                        const isActive = i === statusIdx;
                        const isDone = i < statusIdx;
                        return (
                          <div key={step.label} className="flex items-center flex-1">
                            <div className="flex flex-col items-center gap-1 flex-1">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                  isDone
                                    ? "bg-green-100 text-green-500"
                                    : isActive
                                    ? i === 1
                                      ? "bg-yellow-100 text-yellow-500"
                                      : "bg-green-100 text-green-500"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {step.icon}
                              </div>
                              <span
                                className={`text-xs font-medium ${
                                  isDone
                                    ? "text-green-600"
                                    : isActive
                                    ? i === 1
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                            {i < statusSteps.length - 1 && (
                              <div
                                className={`flex-1 h-0.5 mb-4 ${
                                  i < statusIdx ? "bg-green-300" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</p>

                    {order.products?.map((item, index) => {
                      const key = `${order._id}_${item.productId || item._id || index}`;
                      return (
                        <div key={key}>
                          {/* Item Row */}
                          <div className="flex items-center gap-3 py-2">
                            <div className="relative">
                              <img
                                src={item.img?.[0] ? `http://localhost:8000/uploads/${item.img[0]}` : item.image ? `http://localhost:8000/uploads/${item.image}` : "/placeholder.jpg"}
                                alt={item.title || item.name}
                                className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                              />
                              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-400 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.title || item.name}</p>
                              <p className="text-gray-400 text-xs mt-0.5">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-sm flex-shrink-0">
                              ₹{(item.price || item.discountedPrice) * item.quantity}
                            </p>
                          </div>

                          {/* Rating Section — only show if delivered */}
                          {statusIdx === 2 && (
                            <div className="border-t border-gray-200 pt-3 pb-2 mt-1">
                              {submitted[key] ? (
                                <p className="text-green-600 text-sm font-medium">✓ Thanks for your review!</p>
                              ) : (
                                <>
                                  <p className="text-xs text-gray-500 mb-2">Rate this product</p>
                                  <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <FaStar
                                        key={star}
                                        className="cursor-pointer text-xl"
                                        color={
                                          star <= (hovered[key] || ratings[key] || 0)
                                            ? "#f59e0b"
                                            : "#d1d5db"
                                        }
                                        onMouseEnter={() => setHovered((prev) => ({ ...prev, [key]: star }))}
                                        onMouseLeave={() => setHovered((prev) => ({ ...prev, [key]: 0 }))}
                                        onClick={() => setRatings((prev) => ({ ...prev, [key]: star }))}
                                      />
                                    ))}
                                  </div>
                                  <textarea
                                    className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none bg-white focus:outline-none focus:border-green-400 transition-colors"
                                    rows={2}
                                    placeholder="Leave a message..."
                                    value={reviews[key] || ""}
                                    onChange={(e) =>
                                      setReviews((prev) => ({ ...prev, [key]: e.target.value }))
                                    }
                                  />
                                  <button
                                    onClick={() =>
                                      handleSubmitReview(item.productId || item._id, key)
                                    }
                                    disabled={!ratings[key] || submitting[key]}
                                    className={`mt-2 text-white text-sm px-5 py-1.5 rounded-lg font-medium transition-colors ${
                                      ratings[key]
                                        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                        : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                  >
                                    {submitting[key] ? "Submitting…" : "Submit"}
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                          {index < (order.products?.length - 1) && (
                            <div className="border-t border-gray-200 my-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Shipping + Payment */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Shipping To</p>
                      <p className="text-sm font-medium text-gray-800">{order.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.email}</p>
                      {order.address && (
                        <p className="text-xs text-gray-400 mt-1">{order.address}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Order Info</p>
                      <p className="text-xs text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
                      {order.phone && (
                        <p className="text-xs text-gray-500 mt-1">📞 {order.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Summary</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Items ({order.products?.length})</span>
                      <span>₹{order.total}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {/* Continue Shopping */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-3 rounded-full transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Order;