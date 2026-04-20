import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Banners from "./pages/Banners"; // Import the Banners component
import Menu from "./components/Menu";
import NewProduct from "./pages/NewProduct";
import { useState } from "react";
import EditProduct from "./pages/EditProduct";

// Updated title mapping for the header
const pageTitles = {
  "/": "Dashboard",
  "/users": "Users",
  "/products": "Products",
  "/orders": "Orders Management",
  "/banners": "Banner Management", // Header title for banners
  "/newproduct": "New Product",
};

function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f0fdf4", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            zIndex: 40, display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: "250px",
        minWidth: "250px",
        background: "linear-gradient(180deg, #14532d 0%, #15803d 100%)",
        color: "white",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(20,83,45,0.15)",
        zIndex: 50,
        transition: "transform 0.25s ease",
      }}>
        {/* Brand */}
        <div style={{
          padding: "1.5rem 1.25rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: "#22c55e", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em", color: "#fff" }}>
            MB Cosmetics
          </span>
        </div>

        {/* Menu */}
        <div style={{ flex: 1, padding: "1rem 0.75rem" }}>
          <Menu />
        </div>

        <div style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.75rem", color: "#86efac",
        }}>
          Admin Panel · v1.0
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        
        {/* Header */}
        <header style={{
          backgroundColor: "#fff",
          padding: "0 2rem",
          height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #dcfce7",
          boxShadow: "0 1px 8px rgba(16,185,129,0.07)",
          position: "sticky", top: 0, zIndex: 30,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: "none", background: "none", border: "none",
                cursor: "pointer", padding: "6px", borderRadius: "8px",
                color: "#15803d",
              }}
              className="mobile-menu-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <div>
              <h1 style={{ margin: 0, color: "#14532d", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1 }}>
                {title}
              </h1>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#4b7c61", marginTop: "2px" }}>
                Welcome back, Admin
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: "10px", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#15803d", position: "relative",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{
                position: "absolute", top: "6px", right: "6px",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#22c55e", border: "2px solid #fff",
              }} />
            </button>

            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #15803d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "0.85rem",
              cursor: "pointer", border: "2px solid #bbf7d0",
            }}>
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "2rem", background: "#f0fdf4" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/banners" element={<Banners />} /> {/* Added Banners route */}
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
          </Routes>
        </main>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f0fdf4; }
        ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 10px; }

        @media (max-width: 768px) {
          aside {
            position: fixed !important;
            top: 0; left: 0; bottom: 0;
            transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"} !important;
          }
          .mobile-overlay { display: block !important; }
          .mobile-menu-btn { display: flex !important; }
          main { padding: 1rem !important; }
          header { padding: 0 1rem !important; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;