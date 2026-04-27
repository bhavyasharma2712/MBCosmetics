import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const hardcodedReviews = {
  "Heaven Dove Toner": [
    { user: "Muskan", rating: 4, comment: "Very refreshing toner, loved it!" },
    { user: "Garima", rating: 3, comment: "Good but slightly drying for me." },
  ],
  "Luminous Complexion Foundation": [
    { user: "Asha", rating: 5, comment: "Perfect shade and long-lasting!" },
    { user: "Anuradha", rating: 4, comment: "Blends really well on skin." },
  ],
  "Luron Eyeliner": [
    { user: "Mehak", rating: 5, comment: "Very sharp and easy to apply!" },
    { user: "Khushi", rating: 4, comment: "Stays all day without smudging." },
  ],
  "Dr Rashel's Salicylic Acid 2% Face Serum": [
    { user: "Bhavya", rating: 2, comment: "Did not work well for me." },
    { user: "Nitin", rating: 3, comment: "Average product, slow results." },
  ],
  "Nivea Face Wash for Men.": [
    { user: "Sushant", rating: 5, comment: "Very refreshing and cooling effect!" },
    { user: "Saksham", rating: 4, comment: "Good for daily use." },
  ],
};

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    userRequest
      .get(`/products/find/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <h2 className="p-10 text-gray-400">Loading...</h2>;
  if (!product) return <h2 className="p-10">Product not found</h2>;

  const img = Array.isArray(product.img) ? product.img[0] : product.img;
  const price = product.discountedPrice || product.originalPrice || 0;

  const dbRatings = product.ratings || [];
  const reviews = hardcodedReviews[product.title] || [];

  const allRatings = [
    ...dbRatings.map((r) => ({ user: r.name, rating: Number(r.star), comment: r.comment })),
    ...reviews,
  ];

  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, r) => acc + r.rating, 0) / allRatings.length
      : 0;

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: product._id,
        img,
        name: product.title,
        price,
        quantity: qty,
        email: currentUser?.email || "guest@mbcosmetics.com",
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-green-50 min-h-screen px-10 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-12">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={img}
            alt={product.title}
            className="w-[300px] hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">{product.desc}</p>

          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            ₹{price}
          </h2>

          {avgRating > 0 && (
            <div className="flex items-center gap-2">
              <StarRatings
                rating={avgRating}
                starDimension="20px"
                starSpacing="3px"
                starRatedColor="gold"
              />
              <span className="text-gray-500 text-sm">
                ({allRatings.length} reviews)
              </span>
            </div>
          )}

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

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            {added ? "✓ Added!" : "Add To Cart"}
          </button>

          {product.whatinbox && (
            <div className="mt-6 border border-green-200 p-4 rounded-lg w-[250px] bg-green-50">
              <h3 className="font-semibold mb-2 text-green-700">
                WHAT'S IN THE BOX:
              </h3>
              <p>{product.whatinbox}</p>
            </div>
          )}
        </div>
      </div>

      {allRatings.length > 0 && (
        <div className="mt-10 bg-white rounded-xl p-6 shadow-md max-w-[700px]">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            People Reviews
          </h2>
          {allRatings.map((r, index) => (
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
      )}
    </div>
  );
};

export default Product;