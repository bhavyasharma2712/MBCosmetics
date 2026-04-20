import { DataGrid } from '@mui/x-data-grid';
import { FaTrash, FaEdit, FaPlus, FaSearch, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { userRequest } from "../requestMethods";
import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 30 });

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const averagePrice = products.length > 0
    ? (products.reduce((sum, p) => sum + (p.originalPrice || 0), 0) / products.length).toFixed(2)
    : 0;

  const statCards = [
    {
      label: "Total Products",
      value: totalProducts,
      iconBg: "#dcfce7",
      iconColor: "#15803d",
      icon: <FaBox size={18} />,
    },
    {
      label: "In Stock",
      value: inStockProducts,
      iconBg: "#d1fae5",
      iconColor: "#065f46",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
    {
      label: "Out of Stock",
      value: outOfStockProducts,
      iconBg: "#fee2e2",
      iconColor: "#991b1b",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      ),
    },
    {
      label: "Avg. Price",
      value: `₹${averagePrice}`,
      iconBg: "#fef9c3",
      iconColor: "#854d0e",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "100%" }}>
          <img
            style={{
              width: "44px", height: "44px", borderRadius: "10px",
              objectFit: "cover", border: "1px solid #bbf7d0", flexShrink: 0,
            }}
            src={params.row.img?.[0] || '/api/placeholder/48/48'}
            alt={params.row.title}
            onError={(e) => { e.target.src = '/api/placeholder/48/48'; }}
          />
          <div>
            <div style={{ fontWeight: 600, color: "#14532d", fontSize: "0.88rem" }}>
              {params.row.title}
            </div>
            {params.row.category && (
              <div style={{
                fontSize: "0.75rem", color: "#fff",
                background: "#15803d", padding: "1px 8px",
                borderRadius: "20px", display: "inline-block", marginTop: "3px",
              }}>
                {params.row.category}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      renderCell: (params) => (
        <div style={{ fontSize: "0.82rem", color: "#4b7c61", lineHeight: 1.4 }}>
          {params.row.desc}
        </div>
      ),
    },
    {
      field: "originalPrice",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <span style={{ fontWeight: 700, color: "#14532d", fontSize: "0.9rem" }}>
          ₹{params.row.originalPrice}
        </span>
      ),
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 130,
      renderCell: (params) => (
        <span style={{
          padding: "4px 12px", borderRadius: "20px",
          fontSize: "0.75rem", fontWeight: 600,
          background: params.row.inStock ? "#d1fae5" : "#fee2e2",
          color: params.row.inStock ? "#065f46" : "#991b1b",
        }}>
          {params.row.inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to={`/products/edit/${params.id}`}>
          <button style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 12px", background: "#dcfce7",
            color: "#15803d", border: "1px solid #bbf7d0",
            borderRadius: "8px", cursor: "pointer",
            fontSize: "0.8rem", fontWeight: 600,
            transition: "all 0.15s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#bbf7d0"}
            onMouseLeave={e => e.currentTarget.style.background = "#dcfce7"}
          >
            <FaEdit size={11} /> Edit
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      renderCell: () => (
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 12px", background: "#fee2e2",
          color: "#991b1b", border: "1px solid #fecaca",
          borderRadius: "8px", cursor: "pointer",
          fontSize: "0.8rem", fontWeight: 600,
          transition: "all 0.15s ease",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#fecaca"}
          onMouseLeave={e => e.currentTarget.style.background = "#fee2e2"}
        >
          <FaTrash size={11} /> Delete
        </button>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "2rem", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "flex-start", gap: "1rem", marginBottom: "2rem",
        }}>
          <div>
            <h1 style={{ margin: 0, color: "#14532d", fontSize: "1.6rem", fontWeight: 700 }}>
              Product Management
            </h1>
            <p style={{ margin: "4px 0 0", color: "#4b7c61", fontSize: "0.9rem" }}>
              Manage your product inventory and listings
            </p>
          </div>

          <Link to="/NewProduct">
            <button style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "0.6rem 1.25rem",
              background: "linear-gradient(135deg, #15803d, #22c55e)",
              color: "#fff", border: "none", borderRadius: "10px",
              fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(34,197,94,0.3)",
              transition: "all 0.15s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(34,197,94,0.45)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(34,197,94,0.3)"}
            >
              <FaPlus size={13} /> Add New Product
            </button>
          </Link>
        </div>

        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem", marginBottom: "2rem",
        }}>
          {statCards.map((card) => (
            <div key={card.label} style={{
              background: "#fff", borderRadius: "16px",
              border: "1px solid #bbf7d0", padding: "1.25rem 1.5rem",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 2px 8px rgba(16,185,129,0.07)",
            }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "0.78rem", color: "#4b7c61", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {card.label}
                </p>
                <p style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#14532d" }}>
                  {card.value}
                </p>
              </div>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: card.iconBg, color: card.iconColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div style={{
          background: "#fff", borderRadius: "16px",
          border: "1px solid #bbf7d0",
          boxShadow: "0 2px 8px rgba(16,185,129,0.07)",
          overflow: "hidden",
        }}>

          {/* Toolbar */}
          <div style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #dcfce7",
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "center", gap: "1rem",
          }}>
            <div style={{ position: "relative", flex: 1, maxWidth: "420px" }}>
              <span style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "#6b9e82", pointerEvents: "none",
              }}>
                <FaSearch size={13} />
              </span>
              <input
                type="text"
                placeholder="Search by name, description or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.25rem",
                  border: "1px solid #bbf7d0", borderRadius: "10px",
                  fontSize: "0.85rem", color: "#1a2e22", background: "#f0fdf4",
                  outline: "none", transition: "border-color 0.15s ease",
                }}
                onFocus={e => e.target.style.borderColor = "#22c55e"}
                onBlur={e => e.target.style.borderColor = "#bbf7d0"}
              />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {["Filter", "Export"].map((btn) => (
                <button key={btn} style={{
                  padding: "0.55rem 1rem",
                  border: "1px solid #bbf7d0", borderRadius: "10px",
                  background: "#f0fdf4", color: "#15803d",
                  fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#dcfce7"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f0fdf4"}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* DataGrid */}
          <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
            {loading ? (
              <div style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", height: "240px",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "3px solid #bbf7d0", borderTopColor: "#22c55e",
                  animation: "spin 0.8s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <DataGrid
                getRowId={(row) => row._id}
                rows={filteredProducts}
                columns={columns}
                checkboxSelection
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[30]}
                disableSelectionOnClick
                autoHeight
                rowHeight={68}
                sx={{
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f0fdf4",
                    borderBottom: "2px solid #bbf7d0",
                    color: "#4b7c61",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f0fdf4",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f0fdf4",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "#f0fdf4",
                    borderTop: "1px solid #bbf7d0",
                    color: "#4b7c61",
                  },
                  "& .MuiCheckbox-root": {
                    color: "#22c55e",
                  },
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: "#15803d",
                  },
                  "& .MuiDataGrid-selectedRowCount": {
                    color: "#15803d",
                  },
                  "& .MuiTablePagination-root": {
                    color: "#4b7c61",
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    display: "none",
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Footer info */}
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6b9e82" }}>
          Showing {Math.min(filteredProducts.length, 30)} of {filteredProducts.length} products
        </p>
      </div>
    </div>
  );
};

export default Products;