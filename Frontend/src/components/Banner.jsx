import React from "react";

const Banner = () => {
  return (
    <div className="bg-[url('/bannerweb.png')] bg-no-repeat bg-cover h-[75vh] px-[200px] z-0 relative object-contain">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col text-white w-[50%] pt-[10%]">
        <span className="text-[30px] mt-3">
          Reveal your natural radiance with our premium beauty collection
        </span>
        <h1 className="text-[28px] mt-3"> Glow With Confidence</h1>
        <div className="flex items-center mt-[20px]">
          <button className="bg-green-800 p-[10px] w-[250px] text-white cursor-pointer mr-5">
            Shop Now
          </button>
          <button className="bg-green-800 p-[10px] w-[250px] text-white cursor-pointer mr-10">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
