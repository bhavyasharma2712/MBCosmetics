import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Users = () => {
  const [users, setUsers] = useState([]);

  // 🔥 Fetch all users
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

  // 🗑️ Delete a user
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
    { field: "_id", headerName: "ID", width: 120 },
    { 
      field: "username", 
      headerName: "Username", 
      width: 180,
      renderCell: (params) => (
        <span className="font-bold text-slate-700">{params.row.username}</span>
      )
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 160 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <span className={`px-3 py-1 rounded-full text-[12px] font-extrabold ${
          params.row.isAdmin 
            ? "bg-purple-100 text-purple-700" 
            : "bg-emerald-100 text-emerald-700"
        }`}>
          {params.row.isAdmin ? "Admin" : "User"}
        </span>
      ),
    },
    {
      field: "delete",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          <FaTrash
            className="text-red-400 hover:text-red-600 cursor-pointer transition-colors"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header section with your specific Green aesthetic */}
      <div className="mb-8 ml-10">
        <h1 className="text-3xl font-black text-[#064e3b] tracking-tight">Users</h1>
        <p className="text-slate-500 font-medium">Manage your MB Cosmetics community</p>
      </div>

      <div className="mx-10 bg-white rounded-[20px] shadow-xl shadow-emerald-900/5 overflow-hidden border border-slate-100">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          sx={{
            border: "none",
            fontFamily: "inherit",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              fontSize: "13px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              color: "#475569",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },
            "& .MuiCheckbox-root": {
              color: "#10b981 !important",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Users;