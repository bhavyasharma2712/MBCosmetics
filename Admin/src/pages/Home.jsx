import { LineChart } from "@mui/x-charts/LineChart";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

const Home = () => {
  const [stats, setStats] = useState({
    totalProducts: 6,
    activeOrders: 6,
    activeUsers: 2,
    totalRevenue: 56000,
    totalLosses: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ days: [], revenue: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [productsRes, ordersRes, usersRes, paymentsRes] = await Promise.all([
          userRequest.get("/products"),
          userRequest.get("/orders"),
          userRequest.get("/users"),
          userRequest.get("/payments")
        ]);

        const completed = paymentsRes.data.filter(p => p.status === 'completed' || p.payment_status === 'success');
        const failed = paymentsRes.data.filter(p => p.status === 'failed' || p.payment_status === 'failed');
        
        setStats({
          totalProducts: productsRes.data.length,
          activeOrders: ordersRes.data.filter(o => o.status === 0 || o.status === 1).length,
          activeUsers: usersRes.data.length,
          totalRevenue: completed.reduce((sum, p) => sum + (p.amount || 0), 0),
          totalLosses: failed.reduce((sum, p) => sum + (p.amount || 0), 0)
        });

        // Map recent transactions with Indian formatting
        setTransactions(completed.slice(0, 5).map(p => ({
          id: p._id,
          name: `${p.first_name || 'Customer'} ${p.last_name || ''}`,
          amount: `₹${(p.amount || 0).toLocaleString('en-IN')}`,
          status: "Approved"
        })));

        // Chart Logic: Last 7 Days
        const days = [];
        const revs = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          
          const dayRev = completed
            .filter(p => new Date(p.created_at || p.createdAt).toISOString().split('T')[0] === dateStr)
            .reduce((sum, p) => sum + (p.amount || 0), 0);
          
          days.push(d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
          revs.push(dayRev); 
        }
        setChartData({ days, revenue: revs });

      } catch (error) {
        console.error("Dashboard Data Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#f0fdf4]">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div style={{ padding: "2.5rem", background: "#f8fafc", minHeight: "100vh", width: "100%" }}>
      {/* Top Section Header */}
      <div style={{ marginBottom: "2rem", marginLeft: "0.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#064e3b" }}>Admin Insights</h1>
        <p style={{ color: "#64748b", fontWeight: "500" }}>MB Cosmetics performance metrics</p>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div style={cardStyle}>
          <div style={{ ...circleStyle, borderColor: "#10b981", color: "#10b981" }}>{stats.totalProducts}</div>
          <p style={labelStyle}>Total Products</p>
        </div>
        <div style={cardStyle}>
          <div style={{ ...circleStyle, borderColor: "#f43f5e", color: "#f43f5e" }}>{stats.activeOrders}</div>
          <p style={labelStyle}>Active Orders</p>
        </div>
        <div style={cardStyle}>
          <div style={{ ...circleStyle, borderColor: "#0f172a", color: "#0f172a" }}>{stats.activeUsers}</div>
          <p style={labelStyle}>Total Users</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={financialBoxStyle}>
            <span style={miniLabelStyle}>Total Revenue</span>
            <span style={amountStyle}>₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div style={financialBoxStyle}>
            <span style={miniLabelStyle}>Total Losses</span>
            <span style={{ ...amountStyle, color: "#991b1b" }}>₹{stats.totalLosses.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "2rem", alignItems: "start" }}>
        {/* Recent Transactions */}
        <div style={tableContainerStyle}>
          <h3 style={sectionTitleStyle}>Latest Transactions</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9", color: "#94a3b8", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>Customer</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Amount</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                  <td style={{ padding: "16px 12px", fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>{t.name}</td>
                  <td style={{ padding: "16px 12px", fontSize: "0.85rem", color: "#1e293b", fontWeight: "800" }}>{t.amount}</td>
                  <td style={{ padding: "16px 12px" }}>
                    <span style={statusBadgeStyle}>{t.status}</span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="3" style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No recent activity</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Revenue Chart */}
        <div style={tableContainerStyle}>
          <h3 style={sectionTitleStyle}>Revenue Trend</h3>
          <MuiLineChart
            xAxis={[{ data: chartData.days, scaleType: 'point' }]}
            series={[{ 
              data: chartData.revenue, 
              color: "#10b981", 
              area: true, 
              showMark: true,
              valueFormatter: (v) => `₹${v?.toLocaleString('en-IN')}`
            }]}
            height={300}
            margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
            sx={{
              ".MuiAreaElement-root": { fill: "rgba(16, 185, 129, 0.15)" },
              ".MuiLineElement-root": { strokeWidth: 4 }
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = { background: "#fff", padding: "2rem 1.5rem", borderRadius: "24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)", textAlign: "center", border: "1px solid #f1f5f9" };
const circleStyle = { width: "70px", height: "70px", borderRadius: "50%", border: "4px solid", margin: "0 auto 1.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.4rem" };
const labelStyle = { fontSize: "0.8rem", color: "#64748b", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em" };
const financialBoxStyle = { background: "#fff", padding: "1.25rem", borderRadius: "20px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #f1f5f9" };
const miniLabelStyle = { fontSize: "0.65rem", color: "#94a3b8", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" };
const amountStyle = { fontSize: "1.2rem", fontWeight: "900", color: "#064e3b" };
const tableContainerStyle = { background: "#fff", padding: "1.8rem", borderRadius: "24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9" };
const sectionTitleStyle = { fontSize: "1rem", fontWeight: "900", color: "#0f172a", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em" };
const statusBadgeStyle = { color: "#059669", background: "#ecfdf5", padding: "5px 12px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "800", textTransform: "uppercase" };

export default Home;
