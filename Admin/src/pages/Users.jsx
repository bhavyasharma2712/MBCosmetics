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
    { field: "_id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 160 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <span>{params.row.isAdmin ? "Admin" : "User"}</span>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 cursor-pointer m-2"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
      </div>
      <div className="m-[40px]">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        />
      </div>
    </div>
  );
};

export default Users;