import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";

const Products = () => {
  const navigate = useNavigate();

  // state for products
  const [products, setProducts] = useState([]);

  // fetch products from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "img",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            src={params.row.img}
            alt={params.row.title}
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
          <span>{params.row.title}</span>
        </div>
      ),
    },
    { field: "desc", headerName: "Description", width: 250 },
    {
      field: "discountedPrice",
      headerName: "Price (₹)",
      width: 120,
      renderCell: (params) => <span>₹{params.row.discountedPrice}</span>,
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 100,
      renderCell: (params) => (
        <span
          className={
            params.row.inStock
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {params.row.inStock ? "Yes" : "No"}
        </span>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to={`/product/${params.row._id}`}>
          <button className="bg-gray-400 text-white cursor-pointer w-[70px]">
            Edit
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => (
        <FaTrash className="text-red-500 cursor-pointer m-2" />
      ),
    },
  ];

  return (
    <div className="p-5 w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Products</h1>
        <button
          onClick={() => navigate("/newproduct")}
          className="bg-[#1e1e1e] p-[10px] font-semibold text-white cursor-pointer"
        >
          Create
        </button>
      </div>

      <div className="m-[40px]">
        <DataGrid
          rows={products}   // 👈 now using API data
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

export default Products;