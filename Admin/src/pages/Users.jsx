import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";

const Users = () => {
  const dummyUsers = [
    {
      _id: "u001",
      name: "Bhavya Sharma",
      email: "bhavya@example.com",
      phone: "123-456-7890",
      role: "Admin",
    },
    {
      _id: "u002",
      name: "Muskan Chopra",
      email: "muskan@example.com",
      phone: "234-567-8901",
      role: "User",
    },
    {
      _id: "u003",
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "345-678-9012",
      role: "User",
    },
    {
      _id: "u004",
      name: "David Clark",
      email: "david@example.com",
      phone: "456-789-0123",
      role: "Moderator",
    },
    {
      _id: "u005",
      name: "Eve Stone",
      email: "eve@example.com",
      phone: "567-890-1234",
      role: "User",
    },
    {
      _id: "u006",
      name: "Frank Wilson",
      email: "frank@example.com",
      phone: "678-901-2345",
      role: "Moderator",
    },
    {
      _id: "u007",
      name: "Grace Lee",
      email: "grace@example.com",
      phone: "789-012-3456",
      role: "User",
    },
    {
      _id: "u008",
      name: "Henry Kim",
      email: "henry@example.com",
      phone: "890-123-4567",
      role: "Admin",
    },
  ];

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 160 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => <FaTrash className="text-red-500 cursor-pointer m-2" />,
    },
  ];

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
      </div>
      <div className="m-[40px]">
        <DataGrid
          rows={dummyUsers}
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
