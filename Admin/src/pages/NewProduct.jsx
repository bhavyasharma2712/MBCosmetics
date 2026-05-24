import { FaMinus, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  dark: "#064e3b",
  mid: "#065f46",
  light: "#d1fae5",
  lighter: "#ecfdf5",
  border: "#a7f3d0",
  text: "#065f46",
  muted: "#6ee7b7",
};

const inputStyle = {
  width: "100%",
  border: `1.5px solid #e2e8f0`,
  borderRadius: "12px",
  padding: "11px 14px",
  outline: "none",
  fontSize: "14px",
  color: "#1e293b",
  background: "#fff",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "800",
  color: G.dark,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const beautyData = {
  categories: ["Men", "Women", "Beauty Essentials"],
  concern: [
    "Dry Skin", "Pigmentation", "Oil Control", "Anti Acne", "Sunburn",
    "Skin Brightening", "Tan Removal", "Night Routine", "UV Protection",
    "Color Protection", "Soothing"
  ],
  skintype: [
    "All", "Oily", "Dry", "Sensitive", "Normal", "Combination",
    "Acne-Prone", "Mature", "Dehydrated"
  ]
};

const fieldLabel = { categories: 'Category', concern: 'Concern', skintype: 'Skin Type' };

const NewProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState("");
  const [inputs, setInputs] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({ concern: [], skintype: [], categories: [] });
  const [searchTerms, setSearchTerms] = useState({ concern: '', skintype: '', categories: '' });

  const compressImageToWebP = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        try {
          let width = img.width, height = img.height;
          if (width > maxWidth) {
            const r = maxWidth / width;
            width = maxWidth;
            height = height * r;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(resolve, 'image/webp', quality);
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const totalImages = newImages.length;

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const slots = 4 - totalImages;
      if (slots <= 0) { alert('Maximum 4 images allowed'); return; }

      const files = Array.from(e.target.files).slice(0, slots);
      setStatus("Compressing images...");

      try {
        const compressed = await Promise.all(files.map(async (file) => {
          const blob = await compressImageToWebP(file);
          return {
            compressedBlob: blob,
            preview: URL.createObjectURL(blob)
          };
        }));

        setNewImages(prev => [...prev, ...compressed]);
        setStatus("Images ready.");

        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch {
        setStatus("Error compressing images.");
      }
    }
  };

  const removeNewImage = (index) => {
    setNewImages(prev => {
      const arr = [...prev];
      URL.revokeObjectURL(arr[index].preview);
      arr.splice(index, 1);
      return arr;
    });
  };

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (field, value) => {
    if (value && !selectedOptions[field].includes(value)) {
      setSelectedOptions(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
    setSearchTerms(prev => ({ ...prev, [field]: '' }));
  };

  const handleRemoveOption = (field, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [field]: prev[field].filter(o => o !== value)
    }));
  };

  const handleSearchChange = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  const getFilteredOptions = (field) => {
    const s = searchTerms[field].toLowerCase();
    if (!s) return beautyData[field];
    return beautyData[field].filter(o => o.toLowerCase().includes(s));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus("Saving changes...");

    try {
      let uploadedUrls = [];

      for (let i = 0; i < newImages.length; i++) {
        const data = new FormData();
        const webpFile = new File(
          [newImages[i].compressedBlob],
          `product_${Date.now()}_${i}.webp`,
          { type: 'image/webp' }
        );

        data.append("file", webpFile);
        data.append("upload_preset", "uploads");

        setStatus(`Uploading image ${i + 1} of ${newImages.length}...`);

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dkgcdpask/image/upload",
          data
        );

        uploadedUrls.push(res.data.secure_url || res.data.url);
      }

      await userRequest.post(`/products`, {
        title: inputs.title,
        desc: inputs.desc,
        whatinbox: inputs.whatinbox || "",
        img: uploadedUrls,
        video: inputs.video || "",
        wholesalePrice: inputs.wholesalePrice ? Number(inputs.wholesalePrice) : undefined,
        wholesaleMinimumQuantity: inputs.wholesaleMinimumQuantity ? Number(inputs.wholesaleMinimumQuantity) : undefined,
        categories: selectedOptions.categories,
        concern: selectedOptions.concern,
        brand: inputs.brand || "",
        skintype: selectedOptions.skintype,
        originalPrice: inputs.originalPrice ? Number(inputs.originalPrice) : undefined,
        discountedPrice: inputs.discountedPrice ? Number(inputs.discountedPrice) : undefined,
      });

      setStatus("Product created successfully!");

      setTimeout(() => {
        navigate("/products");
        window.location.reload();
      }, 1200);

    } catch (err) {
      console.error(err);
      setStatus("Failed to create product.");
    }
  };

  const isUpdating = status.includes('Uploading') || status.includes('Saving');

  return (
    <div style={{ padding: "32px", background: "#f0fdf4", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: "28px", marginLeft: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={() => navigate("/products")}
          style={{
            background: G.lighter,
            border: `1px solid ${G.border}`,
            borderRadius: "10px",
            padding: "8px 16px",
            color: G.dark,
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "13px"
          }}>
          ← Back
        </button>

        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: G.dark, margin: 0 }}>
            New Product
          </h1>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>
            Create a new product
          </p>
        </div>
      </div>

      {/* CARD */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "36px",
        boxShadow: "0 4px 32px rgba(6,78,59,0.08)",
        border: `1px solid ${G.border}`
      }}>

        <form onSubmit={handleCreate} style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>

          {/* LEFT */}
          <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* IMAGES */}
            <div>
              <label style={labelStyle}>Product Images ({totalImages}/4)</label>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>
                
                {newImages.map((image, index) => (
                  <div key={index} style={{ position: "relative", width: "90px", height: "90px" }}
                    onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = '0'}
                  >
                    <img src={image.preview}
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "14px",
                        border: `2px dashed ${G.border}`
                      }} />

                    <button type="button" className="del-btn"
                      onClick={() => removeNewImage(index)}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        opacity: 0,
                        transition: "opacity 0.2s",
                        cursor: "pointer"
                      }}>
                      <FaTrash />
                    </button>

                    <span style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "5px",
                      background: "rgba(6,78,59,0.7)",
                      color: "#fff",
                      fontSize: "8px",
                      padding: "1px 5px",
                      borderRadius: "4px"
                    }}>
                      New
                    </span>
                  </div>
                ))}

                {totalImages < 4 && (
                  <label htmlFor="imageUpload"
                    style={{
                      cursor: "pointer",
                      border: `2px dashed ${G.border}`,
                      width: "90px",
                      height: "90px",
                      borderRadius: "14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: G.lighter
                    }}>
                    <FaPlus />
                    <span style={{ fontSize: "10px" }}>Add Image</span>
                  </label>
                )}
              </div>

              <input
                ref={fileInputRef}
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageChange}
              />

              {status && (
                <p style={{ fontSize: "10px", marginTop: "2px", color: G.text }}>
                  {status}
                </p>
              )}
            </div>

            {/* FORM FIELDS SAME AS EDIT */}
            <input style={inputStyle} name="title" placeholder="Product Name" onChange={handleChange} />
            <textarea style={{ ...inputStyle }} name="desc" rows={6} placeholder="Description" onChange={handleChange} />
            <input style={inputStyle} name="whatinbox" placeholder="What's in the box" onChange={handleChange} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <input style={inputStyle} type="number" name="originalPrice" placeholder="Original Price" onChange={handleChange} />
              <input style={inputStyle} type="number" name="discountedPrice" placeholder="Discount Price" onChange={handleChange} />
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>

            <input style={inputStyle} name="brand" placeholder="Brand" onChange={handleChange} />
            <input style={inputStyle} name="video" placeholder="Video URL" onChange={handleChange} />

            {["categories","concern","skintype"].map(field => (
              <div key={field}>
                <label style={labelStyle}>{fieldLabel[field]}</label>

                <div style={{ position: "relative", marginBottom: "8px" }}>
                  <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: G.muted }} />
                  <input
                    type="text"
                    value={searchTerms[field]}
                    onChange={(e)=>handleSearchChange(field,e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "34px" }}
                  />
                </div>

                <div style={{ maxHeight: "140px", overflowY: "auto", border: `1px solid ${G.border}`, borderRadius: "12px", background: G.lighter }}>
                  {getFilteredOptions(field).map(option => (
                    <div key={option}
                      onClick={()=>handleSelectChange(field,option)}
                      style={{ padding: "9px 14px", cursor: "pointer" }}>
                      {option}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedOptions[field].map(option => (
                    <span key={option}>
                      {option}
                      <button onClick={()=>handleRemoveOption(field,option)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <button type="submit" disabled={isUpdating}
              style={{
                background: G.dark,
                color: "#fff",
                padding: "14px",
                borderRadius: "12px",
                fontWeight: "900"
              }}>
              {isUpdating ? "Creating..." : "Create Product"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;