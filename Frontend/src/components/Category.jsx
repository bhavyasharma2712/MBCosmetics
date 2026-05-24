import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText("SAVE20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-10 py-12 bg-white">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-green-600 uppercase mb-2">
          Explore
        </span>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Shop by Category
        </h2>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-px w-16 bg-green-200" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div className="h-px w-16 bg-green-200" />
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-6">

        {/* MEN */}
        <div onClick={() => navigate("/products/category/men")} className="relative group h-[420px] w-[280px] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
          <div className="absolute inset-0 bg-[url('/mencategory.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition"></div>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
            <h2 className="text-[24px] font-bold text-white tracking-widest transition duration-300 group-hover:scale-105">
              MEN SKINCARE
            </h2>
            <div className="mt-2 h-0.5 w-8 bg-green-400 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
        </div>

        {/* WOMEN */}
        <div onClick={() => navigate("/products/category/women")} className="relative group h-[420px] w-[280px] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
          <div className="absolute inset-0 bg-[url('/femalecategory.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition"></div>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
            <h2 className="text-[24px] font-bold text-white tracking-widest transition duration-300 group-hover:scale-105">
              WOMEN SKINCARE
            </h2>
            <div className="mt-2 h-0.5 w-8 bg-green-400 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
        </div>

        {/* BEAUTY ESSENTIALS */}
        <div onClick={() => navigate("/products/category/beauty essentials")} className="relative group h-[420px] w-[280px] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
          <div className="absolute inset-0 bg-[url('/womenproducts2.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition"></div>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center px-4">
            <h2 className="text-[24px] font-bold text-white tracking-widest text-center transition duration-300 group-hover:scale-105">
              BEAUTY ESSENTIALS
            </h2>
            <div className="mt-2 h-0.5 w-8 bg-green-400 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
        </div>

        {/* PROMO CARD */}
        <div className="group flex flex-col items-center justify-center h-[420px] w-[280px] bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 rounded-2xl text-white text-center p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2">
          <div className="bg-white text-green-700 text-[11px] font-bold px-3 py-1 rounded-full mb-4 animate-bounce shadow-sm">
            🔥 Limited Time
          </div>
          <h2 className="text-[44px] font-extrabold leading-none group-hover:scale-110 transition tracking-tight">
            20% OFF
          </h2>
          <p className="text-[17px] mt-3 font-semibold">Today Only!</p>
          <p className="text-[12px] mt-1 opacity-80">On all beauty products</p>
          <button
            onClick={handleCopy}
            className="bg-white text-green-600 font-bold text-[16px] px-6 py-2 rounded-full mt-5 hover:scale-105 transition active:scale-95 shadow-sm"
          >
            {copied ? "✅ Copied!" : "SAVE20"}
          </button>
          <p className="text-[11px] mt-2 opacity-70">
            {copied ? "Code copied to clipboard!" : "Click to copy code"}
          </p>
          <button onClick={() => navigate("/products/category/beauty essentials")} className="mt-4 bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-green-700 transition-all duration-200 text-sm">
            Shop Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Category;