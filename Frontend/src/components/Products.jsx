import Product from "./Product";
import productsData from "./productsData";

const Products = ({ products: filteredProducts }) => {
  const list = filteredProducts !== undefined ? filteredProducts : productsData;

  return (
    <div className="grid grid-cols-5 gap-4 mx-[30px]">
      {list.map((p) => (
        <Product
          key={p.id}
          id={p.id}
          img={p.img}
          name={p.name}
          price={p.price}
          rating={p.rating}
          reviewCount={p.reviewCount}
        />
      ))}
    </div>
  );
};

export default Products;