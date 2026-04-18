import React, { useRef } from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";

const Home = () => {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Banner onShopNowClick={scrollToProducts} />
      
      <Category />

      {/* Added scroll-mt-24 to stop the scroll a bit higher up */}
      <div ref={productsRef} className="scroll-mt-24">
        <Products />
      </div>
    </div>
  );
};

export default Home;