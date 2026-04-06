const Category = () => {
  return (
    <div className="flex gap-4 m-5">
      {/* MEN */}
      <div className="relative bg-[url('/mencategory.png')] bg-cover bg-center h-[450px] w-1/2 w-[280px]">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-[30px] font-semibold">MEN</h2>
        </div>
      </div>

      {/* WOMEN */}
      <div className="relative bg-[url('/femalecategory.png')] bg-cover bg-center h-[450px] w-[280px]">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-[30px] font-semibold">WOMEN</h2>
        </div>
      </div>
    </div>
  );
};

export default Category;
