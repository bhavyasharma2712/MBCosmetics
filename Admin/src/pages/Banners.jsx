import { FaPlus, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const BASE_URL = "http://localhost:8000";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef();

  // Fetch all banners on mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/banners`);
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      setError("Failed to fetch banners");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    setError("");
    setSuccess("");

    if (!imgFile) return setError("Please select a banner image.");
    if (!title.trim()) return setError("Please enter a banner title.");
    if (!subtitle.trim()) return setError("Please enter a subtitle.");

    const formData = new FormData();
    formData.append("img", imgFile);
    formData.append("title", title);
    formData.append("subtitle", subtitle);

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/banners`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to publish banner");

      const newBanner = await res.json();
      setBanners((prev) => [...prev, newBanner]);
      setTitle("");
      setSubtitle("");
      setImgFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess("Banner published successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to publish banner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/banners/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBanners((prev) => prev.filter((b) => b._id !== id));
      setSuccess("Banner deleted.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete banner.");
    }
  };

  return (
    <div style={{ padding: "2.5rem", background: "#f1f5f9", minHeight: "100vh", width: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b" }}>Banner Management</h1>
        <p style={{ color: "#64748b" }}>Control the promotional visuals on your storefront</p>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div style={alertStyle("#fef2f2", "#e11d48", "#fecdd3")}>
          {error}
        </div>
      )}
      {success && (
        <div style={alertStyle("#f0fdf4", "#15803d", "#bbf7d0")}>
          {success}
        </div>
      )}

      <div style={gridStyle}>

        {/* LEFT: Active Banners */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b" }}>
            Active Banners {!fetchLoading && `(${banners.length})`}
          </h2>

          {fetchLoading ? (
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Loading banners...</div>
          ) : banners.length === 0 ? (
            <div style={emptyStyle}>No active banners yet. Upload one!</div>
          ) : (
            banners.map((banner) => (
              <div key={banner._id} style={bannerCardStyle}>
                <img
                  src={`${BASE_URL}${banner.img}`}
                  alt={banner.title}
                  style={bannerImageStyle}
                  onError={(e) => { e.target.src = "/placeholder.png"; }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>
                    {banner.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>
                    {banner.subtitle}
                  </p>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(banner._id)}>
                    <FaTrash size={12} /> Delete Banner
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Upload Form */}
        <div style={formCardStyle}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b", marginBottom: "1.5rem" }}>
            Upload New Banner
          </h3>

          {/* Image Upload */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={labelStyle}>Banner Image</span>
            <div
              style={{ ...uploadBoxStyle, borderColor: preview ? "#10b981" : "#cbd5e1" }}
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
              ) : (
                <label style={{ cursor: "pointer", textAlign: "center", pointerEvents: "none" }}>
                  <FaPlus style={{ fontSize: "1.5rem", color: "#10b981", marginBottom: "8px" }} />
                  <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>Click to upload</p>
                </label>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {imgFile && (
              <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>
                Selected: {imgFile.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div style={{ marginBottom: "1.25rem" }}>
            <span style={labelStyle}>Banner Title</span>
            <input
              type="text"
              placeholder="e.g. Summer Collection"
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={labelStyle}>Subtitle / Description</span>
            <input
              type="text"
              placeholder="e.g. Up to 50% Off"
              style={inputStyle}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <button
            style={{ ...uploadButtonStyle, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            onClick={handlePublish}
            disabled={loading}
          >
            <FaCloudUploadAlt /> {loading ? "Publishing..." : "Publish Banner"}
          </button>
        </div>

      </div>
    </div>
  );
};

// Styles
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1.8fr 1.2fr",
  gap: "2rem",
  alignItems: "start",
};

const bannerCardStyle = {
  background: "#fff",
  padding: "1.25rem",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
};

const bannerImageStyle = {
  width: "140px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "10px",
  background: "#f8fafc",
  flexShrink: 0,
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
  gap: "6px",
};

const formCardStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "20px",
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
  position: "sticky",
  top: "100px",
};

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "8px",
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
  cursor: "pointer",
  overflow: "hidden",
  transition: "border-color 0.2s",
};

const inputStyle = {
  width: "100%",
  padding: "10px 0",
  border: "none",
  borderBottom: "2px solid #e2e8f0",
  outline: "none",
  fontSize: "0.9rem",
  color: "#1e293b",
  background: "transparent",
  boxSizing: "border-box",
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
  marginTop: "1rem",
  fontSize: "0.95rem",
};

const emptyStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "15px",
  color: "#94a3b8",
  textAlign: "center",
  border: "1px dashed #e2e8f0",
  fontSize: "0.9rem",
};

const alertStyle = (bg, color, border) => ({
  background: bg,
  color: color,
  border: `1px solid ${border}`,
  padding: "10px 16px",
  borderRadius: "10px",
  fontSize: "0.85rem",
  fontWeight: "600",
  marginBottom: "1rem",
});

export default Banners;