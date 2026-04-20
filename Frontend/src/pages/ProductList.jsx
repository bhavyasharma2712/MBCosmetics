import { useParams } from "react-router-dom";
import { useState } from "react";
import Products from "../components/Products";
import productsData from "../components/productsData";

const ProductList = () => {
  const { searchterm } = useParams();
  const [concern, setConcern] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("newest");

  let filtered = searchterm
    ? productsData.filter((p) =>
        p.name.toLowerCase().includes(searchterm.toLowerCase())
      )
    : [...productsData];

  if (concern !== "All") {
    filtered = filtered.filter((p) => p.concern === concern);
  }

  if (brand !== "All") {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  if (sort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between m-4">
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-l font-semibold mr-4">Filter Products:</span>
          <select
            name="Concern"
            className="p-2 mb-4 sm:mb-0 mr-4"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
          >
            <option value="All">All Concerns</option>
            <option>Dry Skin</option>
            <option>Pigmentation</option>
            <option>Oil Control</option>
            <option>Anti Acne</option>
            <option>Sunburn</option>
            <option>Skin Brightening</option>
            <option>Tan Removal</option>
            <option>Night Routine</option>
            <option>UV Protection</option>
          </select>

          <select
            name="Brand"
            className="p-2 mb-4 sm:mb-0 mr-4"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="All">All Brands</option>
            <option>AquaClear</option>
            <option>Luminous</option>
            <option>Kiss Beauty</option>
            <option>Dr Rashel</option>
            <option>Luron</option>
            <option>Nivea</option>
            <option>Heaven Dove</option>
            <option>Disaar</option>
            <option>Johnsons Baby</option>
            <option>Rexona</option>
            <option>Kylie</option>
          </select>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Sort Products:</span>
          <select
            name="Price"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>

      {searchterm && (
        <div className="mx-4 mb-4">
          <p className="text-gray-600 text-sm">
            Showing results for:{" "}
            <span className="font-semibold text-green-700">"{searchterm}"</span>
            {" "}— {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-semibold">No products found</p>
          <p className="text-sm mt-2">Try adjusting your filters.</p>
        </div>
      ) : (
        <Products products={filtered} />
      )}
    </div>
  );
};

export default ProductList;