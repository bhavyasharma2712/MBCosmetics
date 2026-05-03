import { useEffect, useState } from "react";
import Product from "./Product";
import { userRequest } from "../requestMethods";

const hardcodedRatings = {
  "Heaven Dove Toner": { rating: 3.8, reviewCount: 2 },
  "Luminous Complexion Foundation": { rating: 4.5, reviewCount: 2 },
  "Luron Eyeliner": { rating: 4.4, reviewCount: 2 },
  "Dr Rashel's Salicylic Acid 2% Face Serum": { rating: 2.4, reviewCount: 2 },
  "Nivea Face Wash for Men.": { rating: 4.2, reviewCount: 2 },
};

const Products = ({ products: filteredProducts, bestSellers }) => {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filteredProducts === undefined) {
      setLoading(true);
      userRequest
        .get("/products")
        .then((res) => setApiProducts(res.data))
        .catch((err) => console.error("Failed to fetch products:", err))
        .finally(() => setLoading(false));
    }
  }, [filteredProducts]);

  const list = filteredProducts !== undefined
    ? filteredProducts
    : bestSellers
      ? apiProducts.filter(p => bestSellers.includes(p.title))
      : apiProducts;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">Loading products...</p>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4 mx-[30px]">
      {list.map((p) => {
        const hardcoded = hardcodedRatings[p.title] || null;
        const dbAvg =
          p.ratings?.length > 0
            ? p.ratings.reduce((acc, r) => acc + Number(r.star), 0) / p.ratings.length
            : null;

        const rating = dbAvg || hardcoded?.rating || 0;
        const reviewCount = (p.ratings?.length || 0) + (hardcoded?.reviewCount || 0);

        return (
          <Product
            key={p._id || p.id}
            id={p._id || p.id}
            img={Array.isArray(p.img) ? p.img[0] : p.img}
            name={p.title || p.name}
            price={p.discountedPrice || p.originalPrice || p.price}
            rating={rating}
            reviewCount={reviewCount}
          />
        );
      })}
    </div>
  );
};

export default Products;