import { FaCheckCircle, FaCheckDouble, FaClock } from "react-icons/fa";
import { useState } from "react";

const Orders = () => {
  // Logic for updating orders (mock function)
  const handleUpdateOrder = (id) => {
    console.log("Updating order:", id);
  };

  const data = [
    { _id: "o101", name: "Muskan Chopra", email: "muskan@example.com", status: 1 },
    { _id: "o102", name: "Bhavya Sharma", email: "bhavya@example.com", status: 0 },
    { _id: "o103", name: "Charlie Brown", email: "charlie@example.com", status: 2 },
    { _id: "o104", name: "David Clark", email: "david@example.com", status: 1 },
    { _id: "o105", name: "Eve Stone", email: "eve@example.com", status: 0 },
    { _id: "o106", name: "Frank Wilson", email: "frank@example.com", status: 1 },
    { _id: "o107", name: "Grace Lee", email: "grace@example.com", status: 2 },
    { _id: "o108", name: "Henry Kim", email: "henry@example.com", status: 0 },
  ];

  return (
    <div style={{ padding: "2.5rem", background: "#f1f5f9", minHeight: "100vh", width: "100%" }}>
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
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={tdStyle}>
                   <span style={{ color: "#64748b", fontWeight: "600" }}>#{order._id}</span>
                </td>
                <td style={{ ...tdStyle, fontWeight: "700", color: "#1e293b" }}>{order.name}</td>
                <td style={{ ...tdStyle, color: "#64748b" }}>{order.email}</td>
                <td style={tdStyle}>
                  {order.status === 0 || order.status === 1 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f59e0b" }}>
                      <FaClock size={18} />
                      <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Pending</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981" }}>
                      <FaCheckDouble size={18} />
                      <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Delivered</span>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  {(order.status === 1 || order.status === 0) && (
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
      </div>
    </div>
  );
};

// Styles
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