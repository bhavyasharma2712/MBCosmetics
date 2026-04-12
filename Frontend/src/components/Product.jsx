import StarRatings from "react-star-ratings";

const Product = ({ img, name, price, rating, reviewCount }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[500px] m-[20px] cursor-pointer">
        <img
          src={img}
          alt=""
          className="h-[300px] w-[200px] m-[30px] bg-cover"
        />
        <h2 className="font-semibold text-[18px]">{name}</h2>
        <span className="text-[18px] font-semibold flex items-center justify-center">
          ₹{price}
        </span>
        <div>
          <span className="flex items-center">
            <StarRatings
              rating={rating}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="yellow"
            />
            ({reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;