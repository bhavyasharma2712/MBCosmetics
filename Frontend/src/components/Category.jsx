const Category = () => {
  return (
    <div className="m-5">  {/* ← change: wrap with a new div */}

      {/* ADD THIS ↓ */}
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>

      <div className="flex gap-4">  {/* ← your existing flex div moved here */}

        {/* MEN */}
        <div className="relative bg-[url('/mencategory.png')] bg-cover bg-center h-[400px] w-1/2 w-[280px]">
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-[30px] font-semibold">MEN</h2>
          </div>
        </div>

        {/* WOMEN */}
        <div className="relative bg-[url('/femalecategory.png')] bg-cover bg-center h-[400px] w-[280px]">
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-[30px] font-semibold">WOMEN</h2>
          </div>
        </div>
        {/* Beauty */}
        <div className="relative bg-[url('/womenproducts2.png')] bg-cover bg-center h-[400px] w-[280px]">
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-[30px] font-semibold">BEAUTY ESSENTIALS</h2>
          </div>
          </div>

      </div>
    </div>
  );
};

export default Category;