import { FaPlus } from "react-icons/fa";

const NewProduct = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold mb-5">New Product</h1>

      <div className="bg-white p-5 shadow-lg rounded-lg">
        <form className="flex flex-col md:flex-row gap-10">
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            {/* Product Image */}
            <div>
              <label className="block mb-1 font-medium">Product Image</label>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer border-2 border-gray-300 w-32 h-32 flex items-center justify-center rounded-md"
                >
                  <FaPlus className="text-[20px]" />
                </label>
                <input id="imageUpload" type="file" className="hidden" />
                <p className="text-pink-500 text-sm mt-1">uploading is 0%</p>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block mb-1 font-medium">
                Product Description
              </label>
              <textarea
                placeholder="Product Description"
                rows={7}
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400 resize-y"
              />
            </div>

            {/* Product Original Price */}
            <div>
              <label className="block mb-1 font-medium">
                Product Original Price
              </label>
              <input
                type="number"
                placeholder="Original Price"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>

            {/* Product Discounted Price */}
            <div>
              <label className="block mb-1 font-medium">
                Product Discounted Price
              </label>
              <input
                type="number"
                placeholder="Discounted Price"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 space-y-5">
            {/* Wholesale Price */}
            <div>
              <label className="block mb-1 font-medium">Wholesale Price</label>
              <input
                type="number"
                placeholder="50"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>

            {/* Wholesale Minimum Quantity */}
            <div>
              <label className="block mb-1 font-medium">
                Wholesale Minimum Quantity
              </label>
              <input
                type="number"
                placeholder="10"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 font-medium">Brand</label>
              <input
                type="text"
                placeholder="Kylie"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>

            {/* Concern */}
            <div>
              <label className="block mb-1 font-medium">Concern</label>
              <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400">
                <option value="">Select Concern</option>
                <option value="dry-skin">Dry Skin</option>
                <option value="pigmentation">Pigmentation</option>
                <option value="oil-control">Oil Control</option>
                <option value="anti-acne">Anti Acne</option>
                <option value="sunburn">Sunburn</option>
                <option value="skin-brightening">Skin Brightening</option>
                <option value="tan-removal">Tan Removal</option>
                <option value="night-routine">Night Routine</option>
                <option value="uv-protection">UV Protection</option>
              </select>
            </div>

            {/* Skin Type */}
            <div>
              <label className="block mb-1 font-medium">Skin Type</label>
              <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400">
                <option value="all">All</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-pink-400">
                <option value="">Select Category</option>
                <option value="men">MEN</option>
                <option value="women">WOMEN</option>
                <option value="beauty-essentials">BEAUTY ESSENTIALS</option>
              </select>
            </div>

            {/* Create Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
