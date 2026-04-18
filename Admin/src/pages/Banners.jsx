import { FaPlus, FaTrash, FaCloudUploadAlt } from "react-icons/fa";

const Banners = () => {
  return (
    <div style={{ padding: "2.5rem", background: "#f1f5f9", minHeight: "100vh", width: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b" }}>Banner Management</h1>
        <p style={{ color: "#64748b" }}>Control the promotional visuals on your storefront</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "2rem", alignItems: "start" }}>
        
        {/* LEFT: Active Banners List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b" }}>Active Banners</h2>
          
          {[
            { img: "/productbanner.png", title: "Glow Beyond the Ordinary", sub: "Premium Products for an Extraordinary You" },
            { img: "/eyeliner.png", title: "Sharp Eyes, Sharper You", sub: "Long-Lasting Eyeliners for Every Look" }
          ].map((banner, index) => (
            <div key={index} style={bannerCardStyle}>
              <img src={banner.img} alt="" style={bannerImageStyle} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>{banner.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>{banner.sub}</p>
                <button style={deleteButtonStyle}>
                  <FaTrash size={12} /> Delete Banner
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Upload Form */}
        <div style={formCardStyle}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b", marginBottom: "1.5rem" }}>Upload New Banner</h3>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={labelStyle}>Banner Image</span>
            <div style={uploadBoxStyle}>
              <label htmlFor="banner-upload" style={{ cursor: "pointer", textAlign: "center" }}>
                <FaPlus style={{ fontSize: "1.5rem", color: "#10b981", marginBottom: "8px" }} />
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>Click to upload</p>
              </label>
              <input type="file" id="banner-upload" style={{ display: "none" }} />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <span style={labelStyle}>Banner Title</span>
            <input type="text" placeholder="e.g. Summer Collection" style={inputStyle} />
          </div>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={labelStyle}>Subtitle / Description</span>
            <input type="text" placeholder="e.g. Up to 50% Off" style={inputStyle} />
          </div>

          <button style={uploadButtonStyle}>
            <FaCloudUploadAlt /> Publish Banner
          </button>
        </div>

      </div>
    </div>
  );
};

// Styles
const bannerCardStyle = {
  background: "#fff",
  padding: "1.25rem",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0"
};

const bannerImageStyle = {
  width: "140px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "10px",
  background: "#f8fafc"
};

const deleteButtonStyle = {
  background: "#fff1f2",
  color: "#e11d48",
  border: "1px solid #fecdd3",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

const formCardStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "20px",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
  position: "sticky",
  top: "100px"
};

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "8px"
};

const uploadBoxStyle = {
  width: "100%",
  height: "120px",
  border: "2px dashed #cbd5e1",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  transition: "0.2s"
};

const inputStyle = {
  width: "100%",
  padding: "10px 0",
  border: "none",
  borderBottom: "2px solid #e2e8f0",
  outline: "none",
  fontSize: "0.9rem",
  color: "#1e293b",
  transition: "0.2s",
  background: "transparent"
};

const uploadButtonStyle = {
  width: "100%",
  background: "#15803d",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginTop: "1rem"
};

export default Banners; 