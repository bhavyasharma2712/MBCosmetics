import { useEffect, useState } from "react";
import Product from "./Product";
import { userRequest } from "../requestMethods";

const hardcodedRatings = {
  // Page 1
  "Rexona Face Wash for Women": {
    rating: 4.3,
    reviewCount: 6,
    reviews: [
      { name: "Priya Sharma", star: 5, comment: "My skin feels so clean and fresh after using this. Love it!" },
      { name: "Sneha Verma", star: 4, comment: "Good face wash, lathers well and doesn't dry out my skin." },
      { name: "Ananya Gupta", star: 4, comment: "Been using this for a month now, definitely see a difference." },
      { name: "Ritika Mehta", star: 5, comment: "Smells amazing and leaves my face glowing!" },
      { name: "Pooja Nair", star: 4, comment: "Very gentle on skin, great for daily use." },
      { name: "Divya Iyer", star: 3, comment: "Decent product, does the job but nothing extraordinary." },
    ],
  },
  "AquaClear Hydrating Toner for Men": {
    rating: 4.1,
    reviewCount: 5,
    reviews: [
      { name: "Arjun Singh", star: 5, comment: "Best toner I've used. Keeps my skin hydrated all day." },
      { name: "Rohit Sharma", star: 4, comment: "Good product, skin feels balanced after use." },
      { name: "Vikram Patel", star: 4, comment: "No irritation, absorbs quickly. Solid toner for men." },
      { name: "Karan Malhotra", star: 3, comment: "Works fine but the bottle is a bit small for the price." },
      { name: "Nikhil Joshi", star: 5, comment: "My skin feels so much smoother since I started using this." },
    ],
  },
  "Dr Rashel Sunscreen SPF 50 for Me": {
    rating: 4.5,
    reviewCount: 6,
    reviews: [
      { name: "Aditya Kumar", star: 5, comment: "No white cast at all! Finally a sunscreen that works for Indian skin." },
      { name: "Sameer Bhat", star: 5, comment: "Lightweight and non-greasy. Wearing it daily now." },
      { name: "Rahul Desai", star: 4, comment: "Great protection, doesn't feel heavy on the face." },
      { name: "Manish Tiwari", star: 4, comment: "Good sunscreen for the price. Reapply needed after 3 hours though." },
      { name: "Suresh Yadav", star: 5, comment: "Using this every day, skin looks much better now." },
      { name: "Deepak Rathi", star: 4, comment: "Blends well, no sticky feeling. Happy with this purchase." },
    ],
  },
  "Luron Eyeliner": {
    rating: 4.4,
    reviewCount: 5,
    reviews: [
      { name: "Kavya Reddy", star: 5, comment: "So pigmented! One stroke and it's perfect. Stays on all day." },
      { name: "Simran Kaur", star: 4, comment: "Good staying power, doesn't smudge easily." },
      { name: "Neha Pandey", star: 5, comment: "Best eyeliner I've tried under ₹400. Absolutely love it!" },
      { name: "Isha Chopra", star: 4, comment: "Smooth application and great color payoff." },
      { name: "Meera Pillai", star: 4, comment: "Does not transfer or bleed. Very happy with this." },
    ],
  },
  "Luminous Foundation": {
    rating: 4.2,
    reviewCount: 5,
    reviews: [
      { name: "Tanya Srivastava", star: 4, comment: "Good coverage and blends like a dream." },
      { name: "Radhika Menon", star: 5, comment: "Gives such a natural finish! My go-to foundation now." },
      { name: "Sunita Agarwal", star: 4, comment: "Stays put for hours, very impressed." },
      { name: "Pallavi Jain", star: 4, comment: "Matches my skin tone perfectly. Love the formula." },
      { name: "Geeta Nambiar", star: 4, comment: "Lightweight yet full coverage. Exactly what I needed." },
    ],
  },
  "Heaven Dove Toner for Women": {
    rating: 3.8,
    reviewCount: 5,
    reviews: [
      { name: "Ankita Dubey", star: 4, comment: "Skin feels refreshed and hydrated after every use." },
      { name: "Shruti Kulkarni", star: 4, comment: "Nice toner, no fragrance which is great for sensitive skin." },
      { name: "Bhavna Shah", star: 3, comment: "It's okay, does the job but didn't wow me." },
      { name: "Roshni Thomas", star: 4, comment: "Pores look smaller after consistent use. Good product." },
      { name: "Lakshmi Choudhary", star: 4, comment: "Very gentle and soothing. Will repurchase." },
    ],
  },
  "Nivea FaceWash for Men": {
    rating: 4.2,
    reviewCount: 6,
    reviews: [
      { name: "Gaurav Saxena", star: 4, comment: "Good lather and leaves skin feeling clean without over-drying." },
      { name: "Harish Nair", star: 5, comment: "Been using Nivea for years, this one is great." },
      { name: "Pradeep Mishra", star: 4, comment: "Affordable and effective. Does exactly what it says." },
      { name: "Sanjay Rawat", star: 4, comment: "Good for oily skin. Controls shine throughout the day." },
      { name: "Tushar Bhatt", star: 4, comment: "Nice cooling effect. Perfect for summer." },
      { name: "Ajay Pillai", star: 4, comment: "Simple, no-nonsense face wash that actually works." },
    ],
  },
  "Luminous Hydration Boost Day & N": {
    rating: 4.6,
    reviewCount: 6,
    reviews: [
      { name: "Chandni Sethi", star: 5, comment: "My skin has never felt this soft! Using it morning and night." },
      { name: "Varsha Trivedi", star: 5, comment: "Absorbs so fast and doesn't feel greasy at all." },
      { name: "Namrata Desai", star: 4, comment: "Great moisturizer. Skin is plump and glowing." },
      { name: "Shalini Bose", star: 5, comment: "Honestly one of the best moisturizers I've tried." },
      { name: "Jyoti Kapoor", star: 4, comment: "Love how lightweight it is. Great for layering under makeup." },
      { name: "Usha Patil", star: 5, comment: "Dry skin completely gone after 2 weeks of use!" },
    ],
  },
  "Dr Rashel's Salicylic Acid 2% Face": {
    rating: 2.4,
    reviewCount: 4,
    reviews: [
      { name: "Kritika Arora", star: 3, comment: "Mild results but takes a long time to show effect." },
      { name: "Nidhi Sharma", star: 2, comment: "Broke me out initially. Might work for others though." },
      { name: "Prachi Tiwari", star: 2, comment: "Didn't see much difference even after a month." },
      { name: "Swati Gupta", star: 3, comment: "Average product, expected more from salicylic acid serum." },
    ],
  },
  "Rexona Hydra Glow Face Serum fo": {
    rating: 4.3,
    reviewCount: 5,
    reviews: [
      { name: "Meghna Joshi", star: 5, comment: "Skin looks so dewy and glowing! Love this serum." },
      { name: "Puja Singh", star: 4, comment: "Lightweight and absorbs quickly. Great addition to my routine." },
      { name: "Deepika Rao", star: 4, comment: "Noticed a difference in brightness within 2 weeks." },
      { name: "Harini Venkat", star: 4, comment: "Good hydration, skin feels plump after application." },
      { name: "Sonali Thakur", star: 5, comment: "Best serum at this price point. Highly recommend!" },
    ],
  },

  // Page 2
  "Luron Ultra Protect Sunscreen SPF": {
    rating: 4.4,
    reviewCount: 5,
    reviews: [
      { name: "Amit Chauhan", star: 5, comment: "No white cast and very lightweight. Finally a good Indian sunscreen!" },
      { name: "Ravi Shankar", star: 4, comment: "Great SPF protection, blends well into skin." },
      { name: "Vivek Nanda", star: 4, comment: "Using this daily, skin hasn't tanned at all this summer." },
      { name: "Pranav Mehta", star: 5, comment: "Matte finish is perfect for oily skin." },
      { name: "Kartik Bose", star: 4, comment: "Good value for money. Does the job well." },
    ],
  },
  "Rexona Men: Pure Hydration Moist": {
    rating: 4.0,
    reviewCount: 5,
    reviews: [
      { name: "Shubham Verma", star: 4, comment: "Non-sticky formula, great for daily use." },
      { name: "Akash Pandey", star: 4, comment: "Skin stays hydrated for hours. Good moisturizer for men." },
      { name: "Yash Malhotra", star: 4, comment: "No fragrance, no irritation. Exactly what I wanted." },
      { name: "Dhruv Saxena", star: 4, comment: "Simple and effective. No complaints." },
      { name: "Nitin Rawat", star: 4, comment: "Gets absorbed fast. Love using this after face wash." },
    ],
  },
  "Kylie Mascara: Infinite Volume": {
    rating: 4.5,
    reviewCount: 6,
    reviews: [
      { name: "Aishwarya Rao", star: 5, comment: "Lashes look so full and voluminous! Absolutely obsessed." },
      { name: "Tanvi Kapoor", star: 5, comment: "No clumping at all. Best mascara I've tried." },
      { name: "Ridhi Malhotra", star: 4, comment: "Great formula, lasts all day without flaking." },
      { name: "Komal Sinha", star: 4, comment: "Good wand design, easy to apply evenly." },
      { name: "Aarti Menon", star: 5, comment: "Makes my eyes pop! Gets compliments every time I wear it." },
      { name: "Ritu Banerjee", star: 4, comment: "Love the curl it gives. Very happy with this purchase." },
    ],
  },
  "Kiss Beauty Velvet Matte Liquid Li": {
    rating: 4.3,
    reviewCount: 5,
    reviews: [
      { name: "Nisha Aggarwal", star: 5, comment: "Stays on for 8+ hours. The color payoff is incredible!" },
      { name: "Sonia Reddy", star: 4, comment: "Love the matte finish. Doesn't dry out lips either." },
      { name: "Mansi Dubey", star: 4, comment: "Great shade range and very comfortable to wear." },
      { name: "Priyanka Ghosh", star: 4, comment: "Transfer-proof and long-lasting. Exactly as described." },
      { name: "Archana Pillai", star: 5, comment: "One of the best liquid lipsticks I've ever used!" },
    ],
  },
  "Heaven Dove: Radiant Cream Blus": {
    rating: 4.1,
    reviewCount: 5,
    reviews: [
      { name: "Ayesha Khan", star: 4, comment: "Gives such a natural flush! Love how it blends." },
      { name: "Madhuri Iyer", star: 4, comment: "Cream formula is so easy to build up. Great product." },
      { name: "Shweta Nair", star: 5, comment: "Looks so natural and lasts all day. Repurchasing for sure!" },
      { name: "Bindiya Sharma", star: 4, comment: "Dewy finish is gorgeous. Skin looks healthy and glowing." },
      { name: "Lavanya Suresh", star: 4, comment: "Blends seamlessly. No streaks or patches." },
    ],
  },
  "Luron Silk-Finish Face Primer": {
    rating: 4.2,
    reviewCount: 5,
    reviews: [
      { name: "Aditi Mishra", star: 4, comment: "Makeup stays on so much longer with this primer!" },
      { name: "Charu Bajaj", star: 5, comment: "Silky smooth texture. Foundation glides on beautifully." },
      { name: "Falguni Trivedi", star: 4, comment: "Pores look minimized and skin looks blurred." },
      { name: "Ishita Roy", star: 4, comment: "Good primer for the price. Does its job well." },
      { name: "Kajal Walia", star: 4, comment: "Lightweight and non-greasy. Great base for makeup." },
    ],
  },
  "Luminous: Micro-Fine Setting Spra": {
    rating: 4.4,
    reviewCount: 5,
    reviews: [
      { name: "Lata Choudhary", star: 5, comment: "Makeup lasts 10 hours with this! Absolutely essential." },
      { name: "Mona Kapila", star: 4, comment: "Fine mist, doesn't disturb makeup. Sets everything beautifully." },
      { name: "Neelam Arora", star: 4, comment: "Skin looks dewy and fresh all day. Love it!" },
      { name: "Pallavi Rao", star: 5, comment: "Game changer for my makeup routine. Can't go without it." },
      { name: "Qurratulain Baig", star: 4, comment: "Great product, keeps makeup in place even in humidity." },
    ],
  },
  "Kylie Velvet Lip Liner – Smooth Ma": {
    rating: 4.0,
    reviewCount: 5,
    reviews: [
      { name: "Rekha Jain", star: 4, comment: "Smooth application and stays on for hours." },
      { name: "Saroj Bhatt", star: 4, comment: "Great color range, matches my lipstick perfectly." },
      { name: "Trupti Kulkarni", star: 4, comment: "No feathering at all. Very pleased with this." },
      { name: "Uma Dixit", star: 4, comment: "Good staying power. Lips look defined and sharp." },
      { name: "Vandana Sethi", star: 4, comment: "Creamy formula that doesn't tug on lips. Lovely product." },
    ],
  },
  "Heaven Dove Concealer – Flawless": {
    rating: 4.5,
    reviewCount: 6,
    reviews: [
      { name: "Yamini Prasad", star: 5, comment: "Covers dark circles completely! This is my holy grail concealer." },
      { name: "Zara Ahmed", star: 5, comment: "Blends so easily and doesn't crease. Perfect finish." },
      { name: "Aarohi Mehta", star: 4, comment: "Good coverage and lasts all day. Very happy!" },
      { name: "Bhumi Patel", star: 4, comment: "Natural finish, doesn't look cakey at all." },
      { name: "Charvi Singhania", star: 5, comment: "Best concealer I've found at this price. Repurchasing!" },
      { name: "Diya Krishnan", star: 4, comment: "Wide shade range and great formula. Highly recommend." },
    ],
  },
  "Kiss Beauty Glow Highlighter – Ra": {
    rating: 4.6,
    reviewCount: 5,
    reviews: [
      { name: "Esha Oberoi", star: 5, comment: "The glow is absolutely blinding! So beautiful on the cheekbones." },
      { name: "Falak Qureshi", star: 5, comment: "Pigmentation is insane for the price. Love love love!" },
      { name: "Gargi Shukla", star: 4, comment: "Buildable and blendable. Perfect for a natural or glam look." },
      { name: "Hema Narayanan", star: 5, comment: "Skin looks lit from within. This is my favourite highlighter!" },
      { name: "Indira Varma", star: 4, comment: "Stays on all day without fading. Great product." },
    ],
  },
};

const Products = ({ products: filteredProducts, bestSellers }) => {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filteredProducts === undefined) {
      setLoading(true);
      userRequest
        .get("/products")
        .then((res) => setApiProducts(res.data))
        .catch((err) => console.error("Failed to fetch products:", err))
        .finally(() => setLoading(false));
    }
  }, [filteredProducts]);

  const list = filteredProducts !== undefined
    ? filteredProducts
    : bestSellers
      ? apiProducts.filter(p => bestSellers.includes(p.title))
      : apiProducts;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">Loading products...</p>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">No products found.</p>
      </div>
    );
  }

  const getImageUrl = (img) => {
    const raw = Array.isArray(img) ? img[0] : img;
    if (!raw) return "/placeholder.png";
    if (raw.startsWith("http")) return raw;
    if (raw.startsWith("/uploads/")) return `http://localhost:8000${raw}`;
    return raw;
  };

  const getHardcoded = (title) => {
    if (!title) return null;
    const key = Object.keys(hardcodedRatings).find((k) =>
      title.startsWith(k) || k.startsWith(title.substring(0, 20))
    );
    return key ? hardcodedRatings[key] : null;
  };

  return (
    <div className="grid grid-cols-5 gap-4 mx-[30px]">
      {list.map((p) => {
        const hardcoded = getHardcoded(p.title);
        const dbAvg =
          p.ratings?.length > 0
            ? p.ratings.reduce((acc, r) => acc + Number(r.star), 0) / p.ratings.length
            : null;

        const rating = dbAvg || hardcoded?.rating || 0;
        const reviewCount = (p.ratings?.length || 0) + (hardcoded?.reviewCount || 0);

        return (
          <Product
            key={p._id || p.id}
            id={p._id || p.id}
            img={getImageUrl(p.img)}
            name={p.title || p.name}
            price={p.discountedPrice || p.originalPrice || p.price}
            rating={rating}
            reviewCount={reviewCount}
          />
        );
      })}
    </div>
  );
};

export default Products;