import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/users", label: "Users", icon: "👥" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/orders", label: "Orders", icon: "📋" },
  { to: "/banners", label: "Banners", icon: "🖼️" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
  { to: "/backups", label: "Backups", icon: "💾" },
  { to: "/charts", label: "Charts", icon: "📊" },
  { to: "/logs", label: "All logs", icon: "📋" },
];

function Menu() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 1rem" }}>
      
      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "0.9rem 1.2rem",
              borderRadius: "14px",
              textDecoration: "none",
              fontSize: "1rem", 
              fontWeight: isActive ? "800" : "700", 
              color: isActive ? "#065f46" : "#cbd5e1", 
              background: isActive ? "#d1fae5" : "transparent",
              transition: "all 0.2s ease-in-out",
              boxShadow: isActive ? "0 4px 12px rgba(16, 185, 129, 0.2)" : "none",
            })}
          >
            <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: "2rem", paddingBottom: "1.5rem" }}>
        <NavLink
          to="/logout"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "1rem 1.2rem",
            textDecoration: "none",
            color: "#f87171", 
            fontSize: "1rem",
            fontWeight: "900",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>↪️</span> Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;