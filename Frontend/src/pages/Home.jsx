import React, { useRef } from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";

const BEST_SELLERS = [
  "Dr Rashel's Salicylic Acid 2% Face Serum",
  "Rexona Face Wash for Women",
  "AquaClear Hydrating Toner for Men",
  "Dr Rashel Sunscreen SPF 50",
  "Luminous Hydration Boost Day & Night Moisturizer",
];

const Home = () => {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Banner onShopNowClick={scrollToProducts} />
      <Category />
      <div ref={productsRef} className="scroll-mt-24">
        <div className="flex flex-col items-center py-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-green-600 uppercase mb-2">
            Our Collection
          </span>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Best Sellers
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-px w-16 bg-green-200" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="h-px w-16 bg-green-200" />
          </div>
        </div>
        <Products bestSellers={BEST_SELLERS} />
      </div>
    </div>
  );
};

export default Home;