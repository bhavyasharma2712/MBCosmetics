import { FaMinus, FaPlus } from "react-icons/fa";
import StarRatings from "react-star-ratings";

const Product = () => {
  return (
    <div className="h-auto flex justify-stretch p-[30px]">
      {/* LEFT */}
      <div className="flex-1 h-[500px] w-[600px]">
        <img
          src="/facewashmen.png"
          alt=""
          className=" h-[100%] w-[100%] object-contain"
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col ml-10 m-[20px]">
        <h2 className="text-[25px] font-semibold mb-[20px]">
          AquaClear Deep Clean Face Wash (For Men)
        </h2>
        <span>
          A refreshing deep-cleansing face wash designed for men to remove dirt,
          excess oil, and impurities without drying the skin. Its advanced
          oil-control formula helps keep your face fresh, clean, and energized
          throughout the day. Perfect for daily use, it unclogs pores and leaves
          your skin feeling smooth, revitalized, and visibly healthier.
        </span>
        <h2 className="font-semibold mt-[12] text-[20px] ">₹349</h2>
        <div>
          <span className="flex items-center mt-1 text-xl">
            <StarRatings
              rating={4.204}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="yellow"
            />
          </span>
          <div className="h-35 w-60 border-2 border-gray-300 rounded-lg shadow-md my-4 p-6 bg-white ">
            <h2 className="flex items-center justify-center font-semibold text-lg text-gray-700 mb-4">
              WHAT'S IN THE BOX:
            </h2>
            <hr className="mb-4" />
            <span>
              <ul className="block text-[14px] text-gray-600 mt-2 space-y-1 text-base">
                <li>✔ 1 Face Wash (100 ml)</li>
              </ul>
            </span>
          </div>
          <div className="flex items-center my-5 p-4">
            <FaMinus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
            <span className="text-lg font-semibold mx-4">2</span>
            <FaPlus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
          </div>
          <button className="bg-[#1e1e1e] p-[10px] w-[200px] text-white cursor-pointer  ">
            Add To Cart
          </button>
          <hr className="my-6" />
          <div className="flex flex-col ">
            <h2 className="font-semibold text-[20px]">Reviews</h2>
            <div className="flex items-center text-xl ">
               <StarRatings
              rating={3.503}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="yellow"
            />
              <span className="font-semibold mx-[20px] ">Sunil K.</span>
            </div>

            <div className="flex items-center text-xl ">
               <StarRatings
              rating={4.503}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="yellow"
            />
              <span className="font-semibold mx-[20px] ">Arnav M.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
