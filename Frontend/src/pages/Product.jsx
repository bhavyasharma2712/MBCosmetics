import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useState } from "react";

const products = [
  {
    id: 1,
    img: "/womentoner.png",
    name: "Heaven Dove Toner",
    price: 399,
    rating: 3.8,
    desc: "A gentle facial toner that helps tighten pores and refresh your skin.",
    box: "1 Toner Bottle (150 ml)",
    reviews: [
      { user: "Muskan", rating: 4, comment: "Very refreshing toner, loved it!" },
      { user: "Garima", rating: 3, comment: "Good but slightly drying for me." },
    ],
  },
  {
    id: 2,
    img: "/foundation.jpg",
    name: "Luminous Complexion Foundation",
    price: 499,
    rating: 4.5,
    desc: "Provides smooth and flawless coverage with a natural glow.",
    box: "1 Foundation Bottle (30 ml)",
    reviews: [
      { user: "Asha", rating: 5, comment: "Perfect shade and long-lasting!" },
      { user: "Anuradha", rating: 4, comment: "Blends really well on skin." },
    ],
  },
  {
    id: 3,
    img: "/eyeliner.png",
    name: "Luron Eyeliner",
    price: 399,
    rating: 4.4,
    desc: "Highly pigmented eyeliner for bold and precise eye definition.",
    box: "1 Liquid Eyeliner Pen (5 ml)",
    reviews: [
      { user: "Mehak", rating: 5, comment: "Very sharp and easy to apply!" },
      { user: "Khushi", rating: 4, comment: "Stays all day without smudging." },
    ],
  },
  {
    id: 4,
    img: "/serum2.png",
    name: "Dr Rashel's Salicylic Acid 2% Face Serum",
    price: 349,
    rating: 2.4,
    desc: "Helps reduce acne and unclog pores for clearer skin.",
    box: "1 Serum Dropper Bottle (30 ml)",
    reviews: [
      { user: "Bhavya", rating: 2, comment: "Did not work well for me." },
      { user: "Nitin", rating: 3, comment: "Average product, slow results." },
    ],
  },
  {
    id: 5,
    img: "/facewashmen.png",
    name: "Nivea Face Wash for Men",
    price: 299,
    rating: 4.2,
    desc: "Deep cleans dirt and oil while keeping skin fresh and energized.",
    box: "1 Face Wash Tube (100 ml)",
    reviews: [
      { user: "Sushant", rating: 5, comment: "Very refreshing and cooling effect!" },
      { user: "Saksham", rating: 4, comment: "Good for daily use." },
    ],
  },
];

const Product = () => {
  const { productId } = useParams();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) return <h2 className="p-10">Product not found</h2>;

  return (
    <div className="bg-green-50 min-h-screen px-10 py-10">

      <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-12">

        {/* IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-[300px] hover:scale-105 transition duration-300"
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold text-green-700 mb-2">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">{product.desc}</p>

          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            ₹{product.price}
          </h2>

          <div className="flex items-center gap-2">
            <StarRatings
              rating={product.rating}
              starDimension="20px"
              starSpacing="3px"
              starRatedColor="gold"
            />
            <span className="text-gray-500 text-sm">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-green-200 rounded"
            >
              -
            </button>

            <span className="font-semibold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-green-200 rounded"
            >
              +
            </button>
          </div>

          {/* Button */}
          <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Add To Cart
          </button>

          {/* ✅ UPDATED WHAT'S IN THE BOX */}
          <div className="mt-6 border border-green-200 p-4 rounded-lg w-[250px] bg-green-50">
            <h3 className="font-semibold mb-2 text-green-700">
              WHAT'S IN THE BOX:
            </h3>
            <p>{product.box}</p>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow-md max-w-[700px]">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          People Reviews
        </h2>

        {product.reviews.map((r, index) => (
          <div key={index} className="border-b py-4">
            <p className="font-semibold">{r.user}</p>

            <StarRatings
              rating={r.rating}
              starDimension="16px"
              starSpacing="2px"
              starRatedColor="gold"
            />

            <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Product;