import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import axios from 'axios';
import { userRequest } from "../requestMethods";
import { useState, useRef } from "react";

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

const NewProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputs, setInputs] = useState({});
  const [uploading, setUploading] = useState("Ready to upload");
  const [selectedOptions, setSelectedOptions] = useState({
    concern: [],
    skintype: [],
    categories: []
  });
  const [searchTerms, setSearchTerms] = useState({
    concern: '',
    skintype: '',
    categories: '',
  });
  const fileInputRef = useRef(null);

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
       "Color Protection", "Soothing",
      "Well Being", "Acne",  "Anti Aging", "Wrinkles", "Fine Lines",
      "Dark Spots", "Hyperpigmentation", "Redness", "Irritation", "Sensitivity",
      "Rosacea", "Eczema", "Psoriasis", "Dark Circles", "Puffy Eyes",
      "Large Pores", "Blackheads", "Whiteheads", "Clogged Pores",
      "Uneven Skin Tone", "Dull Skin", "Dehydrated Skin", "Combination Skin",
      "Oily Scalp", "Dry Scalp", "Hair Breakage", "Split Ends", "Thinning Hair", "Curly Hair", "Straight Hair", "Wavy Hair",
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

  const getFilteredOptions = (field) => {
    const searchTerm = searchTerms[field].toLowerCase();
    if (!searchTerm) return beautyData[field];
    return beautyData[field].filter(option =>
      option.toLowerCase().includes(searchTerm)
    );
  };

  const compressImageToWebP = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(resolve, 'image/webp', quality);
        } catch (error) { reject(error); }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, 4 - selectedImages.length);
      if (files.length === 0) { alert('You can only upload up to 4 images'); return; }
      setUploading("Compressing images to WebP...");
      try {
        const compressedImages = await Promise.all(
          files.map(async (file) => {
            const compressedBlob = await compressImageToWebP(file);
            return {
              originalFile: file,
              compressedBlob,
              preview: URL.createObjectURL(compressedBlob),
              name: file.name.replace(/\.[^/.]+$/, ".webp")
            };
          })
        );
        setSelectedImages(prev => [...prev, ...compressedImages]);
        setUploading(`Added ${files.length} WebP image(s). Ready to upload.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        console.error('Error compressing images:', error);
        setUploading("Error compressing images");
      }
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSelectChange = (field, value) => {
    if (value && !selectedOptions[field].includes(value)) {
      setSelectedOptions((prev) => ({ ...prev, [field]: [...prev[field], value] }));
    }
    setSearchTerms(prev => ({ ...prev, [field]: '' }));
  };

  const handleRemoveOption = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((o) => o !== value)
    }));
  };

  const handleSearchChange = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) { alert('Please select at least one image'); return; }
    if (!inputs.title || !inputs.desc) { alert('Please fill in Title and Description'); return; }
    setUploading("Starting upload...");
    try {
      const uploadedUrls = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const image = selectedImages[i];
        const data = new FormData();
        const webpFile = new File([image.compressedBlob], `product_${Date.now()}_${i}.webp`, { type: 'image/webp' });
        data.append("file", webpFile);
        data.append("upload_preset", "uploads");
        setUploading(`Uploading image ${i + 1} of ${selectedImages.length}...`);
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dkgcdpask/image/upload", data,
          { onUploadProgress: (pe) => setUploading(`Uploading image ${i + 1}: ${Math.round((pe.loaded * 100) / pe.total)}%`) }
        );
        uploadedUrls.push(uploadRes.data.secure_url || uploadRes.data.url);
      }
      setUploading("Finalizing product creation...");
      await userRequest.post("/products", {
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
        inStock: true
      });
      setUploading("Product created successfully!");
      setTimeout(() => {
        setSelectedImages([]);
        setInputs({});
        setSelectedOptions({ concern: [], skintype: [], categories: [] });
        setSearchTerms({ concern: '', skintype: '', categories: '' });
        setUploading("Ready to upload");
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploading("Upload failed. Please try again.");
    }
  };

  const calculateSizeSavings = () => {
    if (selectedImages.length === 0) return null;
    let originalSize = 0, compressedSize = 0;
    selectedImages.forEach(img => { originalSize += img.originalFile.size; compressedSize += img.compressedBlob.size; });
    return { originalSize, compressedSize, savings: ((originalSize - compressedSize) / originalSize * 100).toFixed(1) };
  };

  const sizeInfo = calculateSizeSavings();
  const isUploading = uploading.includes('Uploading') || uploading.includes('Finalizing');

  const fieldLabel = { categories: 'Category', concern: 'Concern', skintype: 'Skin Type' };

  return (
    <div style={{ padding: "32px", background: "#f0fdf4", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", marginLeft: "8px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: G.dark, letterSpacing: "-0.5px", margin: 0 }}>
          Create New Product
        </h1>
        <p style={{ color: "#64748b", fontWeight: "500", marginTop: "4px", fontSize: "14px" }}>
          Add a new beauty item to your premium collection
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "36px",
        boxShadow: "0 4px 32px rgba(6,78,59,0.08)",
        border: `1px solid ${G.border}`,
      }}>
        <form onSubmit={handleUpload} style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Images */}
            <div>
              <label style={labelStyle}>Product Images ({selectedImages.length}/4)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>
                {selectedImages.map((image, index) => (
                  <div key={index} style={{ position: "relative", width: "90px", height: "90px" }}
                    onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = '0'}
                  >
                    <img src={image.preview} alt={`Preview ${index + 1}`}
                      style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "14px", border: `2px solid ${G.border}` }}
                    />
                    <button type="button" className="del-btn" onClick={() => removeImage(index)}
                      style={{
                        position: "absolute", top: "-8px", right: "-8px",
                        background: "#ef4444", color: "#fff", border: "none",
                        borderRadius: "50%", width: "22px", height: "22px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", opacity: 0, transition: "opacity 0.2s", fontSize: "9px"
                      }}>
                      <FaTrash />
                    </button>
                    <span style={{
                      position: "absolute", bottom: "5px", left: "5px",
                      background: "rgba(6,78,59,0.7)", color: "#fff",
                      fontSize: "8px", padding: "1px 5px", borderRadius: "4px"
                    }}>WebP</span>
                  </div>
                ))}
                {selectedImages.length < 4 && (
                  <label htmlFor="imageUpload" style={{
                    cursor: "pointer", border: `2px dashed ${G.border}`,
                    width: "90px", height: "90px", borderRadius: "14px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: G.lighter, transition: "background 0.2s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = G.light}
                    onMouseLeave={e => e.currentTarget.style.background = G.lighter}
                  >
                    <FaPlus style={{ color: G.muted, fontSize: "20px" }} />
                    <span style={{ color: G.muted, fontSize: "10px", marginTop: "4px" }}>Add Image</span>
                  </label>
                )}
              </div>
              <input ref={fileInputRef} id="imageUpload" type="file" multiple accept="image/*" style={{ display: "none" }} onChange={imageChange} />
              {sizeInfo && (
                <div style={{ background: G.lighter, border: `1px solid ${G.border}`, borderRadius: "10px", padding: "8px 12px", marginBottom: "6px" }}>
                  <span style={{ color: G.text, fontSize: "12px", fontWeight: "600" }}>
                    Size saved: {sizeInfo.savings}% &nbsp;|&nbsp;
                    {(sizeInfo.originalSize / 1024 / 1024).toFixed(2)}MB → {(sizeInfo.compressedSize / 1024 / 1024).toFixed(2)}MB
                  </span>
                </div>
              )}
              <p style={{
                fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px",
                color: uploading.includes('success') ? "#16a34a" : uploading.includes('fail') || uploading.includes('Error') ? "#dc2626" : G.text
              }}>{uploading}</p>
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
              <input style={inputStyle} type="text" name="whatinbox" value={inputs.whatinbox || ''} onChange={handleChange}
                placeholder="e.g. Product, Manual, Accessories"
                onFocus={e => e.target.style.borderColor = G.mid} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>

            {/* Original + Discount Price */}
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

                {/* Search */}
                <div style={{ position: "relative", marginBottom: "8px" }}>
                  <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: G.muted, fontSize: "11px" }} />
                  <input
                    type="text"
                    placeholder={`Search ${fieldLabel[field].toLowerCase()}...`}
                    value={searchTerms[field]}
                    onChange={(e) => handleSearchChange(field, e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "34px" }}
                    onFocus={e => e.target.style.borderColor = G.mid}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Options List */}
                <div style={{
                  maxHeight: "140px", overflowY: "auto", border: `1px solid ${G.border}`,
                  borderRadius: "12px", marginBottom: "8px", background: G.lighter
                }}>
                  {getFilteredOptions(field).map((option) => (
                    <div key={option} onClick={() => handleSelectChange(field, option)}
                      style={{ padding: "9px 14px", fontSize: "13px", color: "#475569", cursor: "pointer", borderBottom: "1px solid #f0fdf4", transition: "background 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = G.light; e.currentTarget.style.color = G.dark; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}
                    >
                      {option}
                    </div>
                  ))}
                  {getFilteredOptions(field).length === 0 && (
                    <div style={{ padding: "10px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No results found</div>
                  )}
                </div>

                {/* Selected Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedOptions[field].map((option) => (
                    <span key={option} style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      background: G.lighter, color: G.dark, border: `1px solid ${G.border}`,
                      padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "600"
                    }}>
                      {option}
                      <button type="button" onClick={() => handleRemoveOption(field, option)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, padding: 0, display: "flex", alignItems: "center" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#dc2626"}
                        onMouseLeave={e => e.currentTarget.style.color = G.muted}
                      >
                        <FaTrash style={{ fontSize: "9px" }} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "16px" }}>
              <button type="submit" disabled={isUploading}
                style={{
                  background: isUploading ? "#6ee7b7" : G.dark,
                  color: "#fff", fontWeight: "900", padding: "14px 48px",
                  borderRadius: "12px", border: "none", cursor: isUploading ? "not-allowed" : "pointer",
                  fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em",
                  boxShadow: "0 4px 20px rgba(6,78,59,0.25)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { if (!isUploading) e.currentTarget.style.background = G.mid; }}
                onMouseLeave={e => { if (!isUploading) e.currentTarget.style.background = G.dark; }}
              >
                {isUploading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;