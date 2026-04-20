import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => (
        <span style={{ fontWeight: 600, color: "#14532d" }}>{params.row.username}</span>
      ),
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 160 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 130,
      renderCell: (params) => (
        <span style={{
          padding: "4px 14px",
          borderRadius: "20px",
          fontSize: "0.75rem",
          fontWeight: 700,
          background: params.row.isAdmin ? "#ede9fe" : "#d1fae5",
          color: params.row.isAdmin ? "#6d28d9" : "#065f46",
        }}>
          {params.row.isAdmin ? "Admin" : "User"}
        </span>
      ),
    },
    {
      field: "delete",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <FaTrash
            style={{ color: "#fca5a5", cursor: "pointer", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fca5a5")}
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "2rem", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ margin: 0, color: "#14532d", fontSize: "2rem", fontWeight: 800 }}>Users</h1>
          <p style={{ margin: "4px 0 0", color: "#4b7c61", fontSize: "0.9rem" }}>
            Manage your MB Cosmetics community
          </p>
        </div>

        {/* Table */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #bbf7d0",
          boxShadow: "0 2px 8px rgba(16,185,129,0.07)",
          overflow: "hidden",
        }}>
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            autoHeight
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
                color: "#374151",
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
              "& .MuiTablePagination-root": {
                color: "#4b7c61",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;