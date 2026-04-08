import Product from "./Product";

const Products = () => {
  return (
    <div className="flex flex-wrap m-[30px]">
      <Product img="/facewashmen.png" />
      <Product img="/toner.jpg" />
      <Product img="/womentoner.png" />
      <Product img="/foundation.jpg" />
    </div>
  );
};

export default Products;
