import StarRatings from "react-star-ratings";
const Product = ({ img }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[500px] m-[20px] cursor-pointer">
        <img
          src={img}
          alt=""
          className="h-[300px] w-[200px] m-[30px] bg-cover"
        />
        <h2 className="font-semibold text-[18px]">
          Salicylic Acid 2% Face Serum
        </h2>
        <span className="text-[18px] font-semibold flex items-center justify-center">
          ₹349
        </span>
        <div>
          <span className="flex items-center">
            <StarRatings
              rating={2.403}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="yellow"
            />
            (2)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
