import { LineChart } from "@mui/x-charts/LineChart";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";

const allProducts = [
  {
    _id: "101",
    title: "Heaven Dove Toner",
    img: "/womentoner.png",
    desc: "Toner for Women",
    originalPrice: 499,
    discountedPrice: 379,
    inStock: true,
  },
  {
    _id: "102",
    title: "Luminous Complexion Foundation",
    img: "/foundation.jpg",
    desc: "Brightening Foundation for skin.",
    originalPrice: 499,
    discountedPrice: 429,
    inStock: false,
  },
  {
    _id: "103",
    title: "Luron Eyeliner",
    img: "/eyeliner.png",
    desc: "Long-lasting eyeliner for bold, precise lines.",
    originalPrice: 399,
    discountedPrice: 359,
    inStock: true,
  },
  {
    _id: "104",
    title: "Dr Rashel's Salicylic Acid 2% Face Serum",
    img: "/serum2.png",
    desc: "Gentle Face Serum for All Skin Types",
    originalPrice: 359,
    discountedPrice: 319,
    inStock: true,
  },
  {
    _id: "105",
    title: "Nivea Face Wash for Men",
    img: "/facewashmen.png",
    desc: "Organic Cleanser for All Skin Types",
    originalPrice: 349,
    discountedPrice: 317,
    inStock: false,
  },
];

const Product = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p._id === id) || allProducts[0];

  return (
    <div className="p-5 w-[70vw]">
      {/* FIRST PART */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-3xl font-semibold">Product</h3>
        <button className="bg-slate-500 text-white py-2 px-4 rounded">
          Create
        </button>
      </div>

      {/* SECOND PART */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* CHART */}
        <div className="w-[500px]">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
            height={250}
            width={500}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>

        {/* PRODUCT CARD */}
        <div className="flex-1 bg-white p-5 shadow-lg rounded-lg">
          <div className="flex items-center gap-4 mb-5">
            <img
              src={product.img}
              alt={product.title}
              className="h-16 w-16 rounded-full object-contain"
            />
            <span className="text-2xl font-semibold">{product.title}</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">ID:</span>
              <span>{product._id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Price:</span>
              <span>₹{product.discountedPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">In Stock:</span>
              <span>{product.inStock ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD PART */}
      <div className="mt-5 bg-white p-5 shadow-lg rounded-lg">
        <form action="" className="flex flex-col md:flex-row gap-5">
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Product Name</label>
              <input
                type="text"
                defaultValue={product.title}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Description</label>
              <input
                type="text"
                defaultValue={product.desc}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Original Price</label>
              <input
                type="number"
                defaultValue={product.originalPrice}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Discounted Price</label>
              <input
                type="number"
                defaultValue={product.discountedPrice}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">In Stock</label>
              <select
                defaultValue={product.inStock ? "yes" : "no"}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center">
              <img
                src={product.img}
                alt={product.title}
                className="h-40 w-40 rounded-full mr-5 object-contain"
              />
              <label className="cursor-pointer">
                <FaUpload className="text-2xl text-gray-700" />
              </label>
              <button className="bg-slate-500 text-white py-2 px-4 rounded mt-5">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;