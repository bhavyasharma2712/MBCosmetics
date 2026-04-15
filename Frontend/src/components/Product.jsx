import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Product = ({ id, img, name, price, rating, reviewCount }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="group flex flex-col items-center text-center cursor-pointer p-4 rounded-xl transition duration-300 bg-white hover:bg-green-50 hover:shadow-xl hover:-translate-y-2"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-[250px] w-full object-contain mb-4 transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* NAME */}
      <h2 className="font-semibold text-[16px] group-hover:text-green-700 transition">
        {name}
      </h2>

      {/* PRICE */}
      <span className="text-[16px] font-semibold text-green-700">
        ₹{price}
      </span>

      {/* RATING */}
      <div className="flex items-center gap-1 mt-1">
        <StarRatings
          rating={rating}
          starDimension="18px"
          starSpacing="3px"
          starRatedColor="gold"
        />
        <span className="text-sm text-gray-500">({reviewCount})</span>
      </div>

      {/* BUTTON (appears on hover) */}
      <button className="mt-3 px-4 py-1 bg-green-600 text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition">
        View Product
      </button>
    </div>
  );
};

export default Product;