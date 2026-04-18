import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import axios from 'axios';
import { userRequest } from "../requestMethods";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  categories: [
    "Skincare", "Makeup", "Fragrance", "Bath & Body",
    "Tools & Accessories", "Men's Care", "Sun Care",
    "Toners", "Serums", "Foundations", "Lotions",
    "Cleansers", "Moisturizers", "Face Masks", "Eye Creams", "Lip Care",
    "Face Oils", "Exfoliators & Scrubs", "Sunscreen", "BB & CC Creams",
    "Concealers", "Powders", "Blush", "Bronzers", "Highlighters", "Eyeshadow",
    "Eyeliner", "Mascara", "Eyebrow Products", "Lipstick", "Lip Gloss",
    "Lip Liner", "Makeup Remover", "Setting Sprays", "Primers", "Shampoo",
    "Conditioner", "Hair Masks", "Hair Oils", "Hair Serums", "Hair Styling",
    "Hair Color", "Hair Treatment", "Perfume", "Cologne", "Body Spray",
    "Body Lotion", "Body Wash", "Body Scrubs", "Hand Cream", "Body Oil",
    "Makeup Brushes", "Beauty Blenders", "Hair Tools", "Skincare Tools",
    "Shaving Products", "Beard Care", "Aftershave", "Toothpaste", "Mouthwash",
    "Teeth Whitening", "Vitamins", "Supplements"
  ],
  concern: [
    "Dry Skin", "Pigmentation", "Oil Control", "Anti Acne", "Sunburn",
    "Skin Brightening", "Tan Removal", "Night Routine", "UV Protection",
    "Color Protection", "Soothing", "Well Being", "Acne", "Anti Aging",
    "Wrinkles", "Fine Lines", "Dark Spots", "Hyperpigmentation", "Redness",
    "Irritation", "Sensitivity", "Rosacea", "Eczema", "Psoriasis",
    "Dark Circles", "Puffy Eyes", "Large Pores", "Blackheads", "Whiteheads",
    "Clogged Pores", "Uneven Skin Tone", "Dull Skin", "Dehydrated Skin",
    "Combination Skin", "Oily Scalp", "Dry Scalp", "Hair Breakage",
    "Split Ends", "Thinning Hair", "Curly Hair", "Straight Hair", "Wavy Hair",
    "Color Treated Hair", "Chemical Damage", "Heat Damage", "Body Acne",
    "Back Acne", "Body Odor", "Dry Hands", "Cracked Heels", "Cellulite",
    "Sun Damage", "Pollution Protection", "Blue Light Protection",
    "Menstrual Care", "Stress Relief", "Sleep Aid", "Energy Boost",
    "Immune Support", "Gut Health"
  ],
  skintype: [
    "All", "Oily", "Dry", "Sensitive", "Normal", "Combination",
    "Acne-Prone", "Mature", "Dehydrated"
  ]
};

const fieldLabel = { categories: 'Category', concern: 'Concern', skintype: 'Skin Type' };

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [inputs, setInputs] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({ concern: [], skintype: [], categories: [] });
  const [searchTerms, setSearchTerms] = useState({ concern: '', skintype: '', categories: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await userRequest.get(`/products/find/${id}`);
        const p = res.data;
        setInputs({
          title: p.title || '',
          desc: p.desc || '',
          whatinbox: p.whatinbox || '',
          brand: p.brand || '',
          video: p.video || '',
          originalPrice: p.originalPrice || '',
          discountedPrice: p.discountedPrice || '',
          wholesalePrice: p.wholesalePrice || '',
          wholesaleMinimumQuantity: p.wholesaleMinimumQuantity || '',
        });
        setExistingImages(Array.isArray(p.img) ? p.img : p.img ? [p.img] : []);
        setSelectedOptions({
          concern: p.concern || [],
          skintype: p.skintype || [],
          categories: p.categories || [],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setStatus("Failed to load product.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const compressImageToWebP = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        try {
          let width = img.width, height = img.height;
          if (width > maxWidth) { const r = maxWidth / width; width = maxWidth; height = height * r; }
          canvas.width = width; canvas.height = height;
          ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(resolve, 'image/webp', quality);
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const totalImages = existingImages.length + newImages.length;

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const slots = 4 - totalImages;
      if (slots <= 0) { alert('Maximum 4 images allowed'); return; }
      const files = Array.from(e.target.files).slice(0, slots);
      setStatus("Compressing images...");
      try {
        const compressed = await Promise.all(files.map(async (file) => {
          const blob = await compressImageToWebP(file);
          return { originalFile: file, compressedBlob: blob, preview: URL.createObjectURL(blob) };
        }));
        setNewImages(prev => [...prev, ...compressed]);
        setStatus("Images ready.");
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch { setStatus("Error compressing images."); }
    }
  };

  const removeExistingImage = (index) => setExistingImages(prev => prev.filter((_, i) => i !== index));
  const removeNewImage = (index) => {
    setNewImages(prev => { const arr = [...prev]; URL.revokeObjectURL(arr[index].preview); arr.splice(index, 1); return arr; });
  };

  const handleChange = (e) => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelectChange = (field, value) => {
    if (value && !selectedOptions[field].includes(value))
      setSelectedOptions(prev => ({ ...prev, [field]: [...prev[field], value] }));
    setSearchTerms(prev => ({ ...prev, [field]: '' }));
  };

  const handleRemoveOption = (field, value) =>
    setSelectedOptions(prev => ({ ...prev, [field]: prev[field].filter(o => o !== value) }));

  const handleSearchChange = (field, value) =>
    setSearchTerms(prev => ({ ...prev, [field]: value }));

  const getFilteredOptions = (field) => {
    const s = searchTerms[field].toLowerCase();
    if (!s) return beautyData[field];
    return beautyData[field].filter(o => o.toLowerCase().includes(s));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("Saving changes...");
    try {
      let uploadedUrls = [...existingImages];

      if (newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
          const data = new FormData();
          const webpFile = new File([newImages[i].compressedBlob], `product_${Date.now()}_${i}.webp`, { type: 'image/webp' });
          data.append("file", webpFile);
          data.append("upload_preset", "uploads");
          setStatus(`Uploading image ${i + 1} of ${newImages.length}...`);
          const res = await axios.post("https://api.cloudinary.com/v1_1/dkgcdpask/image/upload", data);
          uploadedUrls.push(res.data.secure_url || res.data.url);
        }
      }

      await userRequest.put(`/products/${id}`, {
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

      setStatus("Product updated successfully!");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      console.error(err);
      setStatus("Update failed. Please try again.");
    }
  };

  const isUpdating = status.includes('Uploading') || status.includes('Saving');

  if (loading) return (
    <div style={{ padding: "32px", background: "#f0fdf4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: G.dark, fontWeight: "700", fontSize: "16px" }}>Loading product...</div>
    </div>
  );

  return (
    <div style={{ padding: "32px", background: "#f0fdf4", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", marginLeft: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={() => navigate("/products")}
          style={{ background: G.lighter, border: `1px solid ${G.border}`, borderRadius: "10px", padding: "8px 16px", color: G.dark, fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>
          ← Back
        </button>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: G.dark, letterSpacing: "-0.5px", margin: 0 }}>Edit Product</h1>
          <p style={{ color: "#64748b", fontWeight: "500", marginTop: "4px", fontSize: "14px" }}>Update product details</p>
        </div>
      </div>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "24px", padding: "36px", boxShadow: "0 4px 32px rgba(6,78,59,0.08)", border: `1px solid ${G.border}` }}>
        <form onSubmit={handleUpdate} style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Images */}
            <div>
              <label style={labelStyle}>Product Images ({totalImages}/4)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>

                {/* Existing images */}
                {existingImages.map((url, index) => (
                  <div key={`ex-${index}`} style={{ position: "relative", width: "90px", height: "90px" }}
                    onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = '0'}
                  >
                    <img src={url} alt={`Product ${index + 1}`}
                      style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "14px", border: `2px solid ${G.border}` }} />
                    <button type="button" className="del-btn" onClick={() => removeExistingImage(index)}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s", fontSize: "9px" }}>
                      <FaTrash />
                    </button>
                    <span style={{ position: "absolute", bottom: "5px", left: "5px", background: "rgba(6,78,59,0.7)", color: "#fff", fontSize: "8px", padding: "1px 5px", borderRadius: "4px" }}>Saved</span>
                  </div>
                ))}

                {/* New images */}
                {newImages.map((image, index) => (
                  <div key={`new-${index}`} style={{ position: "relative", width: "90px", height: "90px" }}
                    onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = '0'}
                  >
                    <img src={image.preview} alt={`New ${index + 1}`}
                      style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "14px", border: `2px dashed ${G.border}` }} />
                    <button type="button" className="del-btn" onClick={() => removeNewImage(index)}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s", fontSize: "9px" }}>
                      <FaTrash />
                    </button>
                    <span style={{ position: "absolute", bottom: "5px", left: "5px", background: "rgba(6,78,59,0.7)", color: "#fff", fontSize: "8px", padding: "1px 5px", borderRadius: "4px" }}>New</span>
                  </div>
                ))}

                {/* Add more */}
                {totalImages < 4 && (
                  <label htmlFor="imageUpload" style={{ cursor: "pointer", border: `2px dashed ${G.border}`, width: "90px", height: "90px", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: G.lighter, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = G.light}
                    onMouseLeave={e => e.currentTarget.style.background = G.lighter}
                  >
                    <FaPlus style={{ color: G.muted, fontSize: "20px" }} />
                    <span style={{ color: G.muted, fontSize: "10px", marginTop: "4px" }}>Add Image</span>
                  </label>
                )}
              </div>
              <input ref={fileInputRef} id="imageUpload" type="file" multiple accept="image/*" style={{ display: "none" }} onChange={imageChange} />
              {status && (
                <p style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px", color: status.includes('success') ? "#16a34a" : status.includes('fail') || status.includes('Error') ? "#dc2626" : G.text }}>
                  {status}
                </p>
              )}
            </div>

            {/* Product Name */}
            <div>
              <label style={labelStyle}>Product Name</label>
              <input style={inputStyle} type="text" name="title" value={inputs.title || ''} onChange={handleChange} placeholder="e.g. Silk Finish Foundation"
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, resize: "none" }} name="desc" value={inputs.desc || ''} onChange={handleChange}
                placeholder="Describe the texture, benefits, and ingredients..." rows={6}
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* What's in the Box */}
            <div>
              <label style={labelStyle}>What's in the Box</label>
              <input style={inputStyle} type="text" name="whatinbox" value={inputs.whatinbox || ''} onChange={handleChange} placeholder="e.g. Product, Manual, Accessories"
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* Prices */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Original Price</label>
                <input style={inputStyle} type="number" name="originalPrice" value={inputs.originalPrice || ''} onChange={handleChange} placeholder="₹ 0.00"
                  onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label style={labelStyle}>Discount Price</label>
                <input style={inputStyle} type="number" name="discountedPrice" value={inputs.discountedPrice || ''} onChange={handleChange} placeholder="₹ 0.00"
                  onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Wholesale + Min Qty */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Wholesale Price</label>
                <input style={inputStyle} type="number" name="wholesalePrice" value={inputs.wholesalePrice || ''} onChange={handleChange} placeholder="₹ 0.00"
                  onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label style={labelStyle}>Min Quantity</label>
                <input style={inputStyle} type="number" name="wholesaleMinimumQuantity" value={inputs.wholesaleMinimumQuantity || ''} onChange={handleChange} placeholder="10"
                  onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label style={labelStyle}>Brand</label>
              <input style={inputStyle} type="text" name="brand" value={inputs.brand || ''} onChange={handleChange} placeholder="Kylie, L'Oreal, etc."
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* Video URL */}
            <div>
              <label style={labelStyle}>Video URL (Optional)</label>
              <input style={inputStyle} type="text" name="video" value={inputs.video || ''} onChange={handleChange} placeholder="https://example.com/video.mp4"
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* Searchable Multi-Selects */}
            {['categories', 'concern', 'skintype'].map((field) => (
              <div key={field}>
                <label style={labelStyle}>
                  {fieldLabel[field]}
                  <span style={{ color: G.muted, fontWeight: "600", marginLeft: "8px", fontSize: "10px", textTransform: "none" }}>
                    ({selectedOptions[field].length} selected)
                  </span>
                </label>

                <div style={{ position: "relative", marginBottom: "8px" }}>
                  <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: G.muted, fontSize: "11px" }} />
                  <input type="text" placeholder={`Search ${fieldLabel[field].toLowerCase()}...`}
                    value={searchTerms[field]} onChange={(e) => handleSearchChange(field, e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "34px" }}
                    onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>

                <div style={{ maxHeight: "140px", overflowY: "auto", border: `1px solid ${G.border}`, borderRadius: "12px", marginBottom: "8px", background: G.lighter }}>
                  {getFilteredOptions(field).map((option) => (
                    <div key={option} onClick={() => handleSelectChange(field, option)}
                      style={{ padding: "9px 14px", fontSize: "13px", color: "#475569", cursor: "pointer", borderBottom: "1px solid #f0fdf4", transition: "background 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = G.light; e.currentTarget.style.color = G.dark; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}>
                      {option}
                    </div>
                  ))}
                  {getFilteredOptions(field).length === 0 && (
                    <div style={{ padding: "10px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No results found</div>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedOptions[field].map((option) => (
                    <span key={option} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: G.lighter, color: G.dark, border: `1px solid ${G.border}`, padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "600" }}>
                      {option}
                      <button type="button" onClick={() => handleRemoveOption(field, option)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, padding: 0, display: "flex", alignItems: "center" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#dc2626"}
                        onMouseLeave={e => e.currentTarget.style.color = G.muted}>
                        <FaTrash style={{ fontSize: "9px" }} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "16px" }}>
              <button type="submit" disabled={isUpdating}
                style={{ background: isUpdating ? G.muted : G.dark, color: "#fff", fontWeight: "900", padding: "14px 48px", borderRadius: "12px", border: "none", cursor: isUpdating ? "not-allowed" : "pointer", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: "0 4px 20px rgba(6,78,59,0.25)", transition: "all 0.2s" }}
                onMouseEnter={e => { if (!isUpdating) e.currentTarget.style.background = G.mid; }}
                onMouseLeave={e => { if (!isUpdating) e.currentTarget.style.background = G.dark; }}>
                {isUpdating ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;