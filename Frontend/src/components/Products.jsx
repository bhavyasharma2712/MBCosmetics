import Product from "./Product";

const products = [
  { id: 1, img: "/womentoner.png", name: "Heaven Dove Toner", price: 399, rating: 3.8, reviewCount: 5 },
  { id: 2, img: "/foundation.jpg", name: "Luminous Complexion Foundation", price: 499, rating: 4.5, reviewCount: 8 },
  { id: 3, img: "/eyeliner.png", name: "Luron Eyeliner", price: 399, rating: 4.4, reviewCount: 6 },
  { id: 4, img: "/serum2.png", name: "Dr Rashel's Salicylic Acid 2% Face Serum", price: 349, rating: 2.4, reviewCount: 2 },
  { id: 5, img: "/facewashmen.png", name: "Nivea Face Wash for Men", price: 299, rating: 4.2, reviewCount: 10 },
];

const Products = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mx-[30px]">
      {products.map((p) => (
        <Product
          key={p.id}
          id={p.id}   // ✅ IMPORTANT
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