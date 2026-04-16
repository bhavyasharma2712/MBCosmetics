import { LineChart } from "@mui/x-charts/LineChart";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({});

  // 🔥 Fetch product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  // 🔄 Sync product → form
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  // ✏️ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "inStock" ? value === "yes" : value,
    }));
  };

  // 🔥 Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await userRequest.put(`/products/${product._id}`, formData);
      alert("Product Updated ✅");
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  // ⏳ Loading
  if (!product) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="p-5 w-[70vw]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-3xl font-semibold">Product</h3>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* CHART */}
        <div className="w-[500px]">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
            height={250}
            width={500}
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex-1 bg-white p-5 shadow-lg rounded-lg">
          <div className="flex items-center gap-4 mb-5">
            <img
              src={product.img}
              alt={product.title}
              className="h-16 w-16 rounded-full object-contain"
            />
            <span className="text-2xl font-semibold">
              {product.title}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>ID:</span>
              <span>{product._id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Price:</span>
              <span>₹{product.discountedPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Stock:</span>
              <span>{product.inStock ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-5 bg-white p-5 shadow-lg rounded-lg">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col md:flex-row gap-5"
        >
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border"
            />

            <input
              name="desc"
              value={formData.desc || ""}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border"
            />

            <input
              name="originalPrice"
              type="number"
              value={formData.originalPrice || ""}
              onChange={handleChange}
              placeholder="Original Price"
              className="w-full p-2 border"
            />

            <input
              name="discountedPrice"
              type="number"
              value={formData.discountedPrice || ""}
              onChange={handleChange}
              placeholder="Discounted Price"
              className="w-full p-2 border"
            />

            <select
              name="inStock"
              value={formData.inStock ? "yes" : "no"}
              onChange={handleChange}
              className="w-full p-2 border"
            >
              <option value="yes">In Stock</option>
              <option value="no">Out of Stock</option>
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col items-center space-y-5">
            <img
              src={product.img}
              alt={product.title}
              className="h-40 w-40 rounded-full object-contain"
            />

            <FaUpload className="text-2xl text-gray-700" />

            <button className="bg-black text-white px-4 py-2">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;