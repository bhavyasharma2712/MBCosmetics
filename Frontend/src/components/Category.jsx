import { useState } from "react";

const Category = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("SAVE20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="m-5">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>

      {/* 👉 CENTER + SHIFT RIGHT */}
      <div className="flex justify-center gap-6 pl-6">

        {/* MEN */}
        <div className="relative group h-[400px] w-[280px] overflow-hidden rounded-xl cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="absolute inset-0 bg-[url('/mencategory.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>

          {/* overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>

          {/* text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[30px] font-semibold text-white tracking-wide transition duration-300 group-hover:scale-110 group-hover:tracking-widest">
              MEN
            </h2>
          </div>
        </div>

        {/* WOMEN */}
        <div className="relative group h-[400px] w-[280px] overflow-hidden rounded-xl cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="absolute inset-0 bg-[url('/femalecategory.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[30px] font-semibold text-white tracking-wide transition duration-300 group-hover:scale-110 group-hover:tracking-widest">
              WOMEN
            </h2>
          </div>
        </div>

        {/* BEAUTY ESSENTIALS */}
        <div className="relative group h-[400px] w-[280px] overflow-hidden rounded-xl cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="absolute inset-0 bg-[url('/womenproducts2.png')] bg-cover bg-center transition duration-500 group-hover:scale-110"></div>

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[26px] font-semibold text-white text-center px-2 tracking-wide transition duration-300 group-hover:scale-110 group-hover:tracking-widest">
              BEAUTY ESSENTIALS
            </h2>
          </div>
        </div>

        {/* PROMO CARD */}
        <div className="group flex flex-col items-center justify-center h-[400px] w-[280px] bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-xl text-white text-center p-6 transform hover:-translate-y-2 hover:shadow-xl">
          
          {/* badge */}
          <div className="bg-white text-black text-[12px] font-bold px-3 py-1 rounded-full mb-3 animate-bounce">
            🔥 Limited Time
          </div>

          <h2 className="text-[40px] font-bold group-hover:scale-110 transition">
            20% OFF
          </h2>

          <p className="text-[18px] mt-2">Today Only!</p>
          <p className="text-[13px] mt-2 opacity-80">
            On all beauty products
          </p>

          {/* copy button */}
          <button
            onClick={handleCopy}
            className="bg-white text-green-500 font-bold text-[18px] px-6 py-2 rounded-full mt-4 hover:scale-110 transition active:scale-95"
          >
            {copied ? "✅ Copied!" : "SAVE20"}
          </button>

          <p className="text-[12px] mt-2 opacity-70">
            {copied
              ? "Code copied to clipboard!"
              : "Click to copy code"}
          </p>

          {/* shop button */}
          <button className="mt-4 bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-green-700 transition-all duration-200">
            Shop Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Category;