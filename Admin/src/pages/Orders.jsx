import { useEffect, useState } from "react";
import { FaCheckCircle, FaCheckDouble, FaClock, FaSpinner } from "react-icons/fa";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await userRequest.get("/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateOrder = async (id) => {
    try {
      await userRequest.put(`/orders/${id}`, { status: 2 });
      setOrders((prev) =>
        prev.map((order) => order._id === id ? { ...order, status: 2 } : order)
      );
      toast.success("Order marked as delivered!");
    } catch (err) {
      toast.error("Failed to update order.");
    }
  };

  return (
    <div style={{ padding: "2.5rem", background: "#f1f5f9", minHeight: "100vh", width: "100%" }}>
      <ToastContainer />
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b" }}>Orders Management</h1>
        <p style={{ color: "#64748b" }}>Monitor and manage customer deliveries</p>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        overflow: "hidden",
        border: "1px solid #e2e8f0"
      }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#64748b" }}>
            <FaSpinner style={{ fontSize: "2rem", animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#94a3b8" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>No orders found.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={tdStyle}>
                    <span style={{ color: "#64748b", fontWeight: "600" }}>#{order._id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "700", color: "#1e293b" }}>{order.name}</td>
                  <td style={{ ...tdStyle, color: "#64748b" }}>{order.email}</td>
                  <td style={{ ...tdStyle, fontWeight: "600", color: "#1e293b" }}>₹{order.total}</td>
                  <td style={tdStyle}>
                    {order.status === 2 ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981" }}>
                        <FaCheckDouble size={18} />
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Delivered</span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f59e0b" }}>
                        <FaClock size={18} />
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Pending</span>
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {order.status !== 2 && (
                      <button
                        onClick={() => handleUpdateOrder(order._id)}
                        style={{
                          background: "#ecfdf5",
                          color: "#059669",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: "600",
                          transition: "0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#d1fae5"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#ecfdf5"}
                      >
                        <FaCheckCircle /> Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const thStyle = {
  padding: "16px 24px",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#94a3b8",
  fontWeight: "700"
};

const tdStyle = {
  padding: "20px 24px",
  fontSize: "0.9rem",
  verticalAlign: "middle"
};

export default Orders;