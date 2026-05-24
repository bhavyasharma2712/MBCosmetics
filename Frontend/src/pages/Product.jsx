import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const hardcodedReviews = {
  "Rexona Face Wash for Women": [
    { user: "Priya Sharma", rating: 5, comment: "My skin feels so clean and fresh after using this. Love it!" },
    { user: "Sneha Verma", rating: 4, comment: "Good face wash, lathers well and doesn't dry out my skin." },
    { user: "Ananya Gupta", rating: 4, comment: "Been using this for a month now, definitely see a difference." },
    { user: "Ritika Mehta", rating: 5, comment: "Smells amazing and leaves my face glowing!" },
    { user: "Pooja Nair", rating: 4, comment: "Very gentle on skin, great for daily use." },
    { user: "Divya Iyer", rating: 3, comment: "Decent product, does the job but nothing extraordinary." },
  ],
  "AquaClear Hydrating Toner for Men": [
    { user: "Arjun Singh", rating: 5, comment: "Best toner I've used. Keeps my skin hydrated all day." },
    { user: "Rohit Sharma", rating: 4, comment: "Good product, skin feels balanced after use." },
    { user: "Vikram Patel", rating: 4, comment: "No irritation, absorbs quickly. Solid toner for men." },
    { user: "Karan Malhotra", rating: 3, comment: "Works fine but the bottle is a bit small for the price." },
    { user: "Nikhil Joshi", rating: 5, comment: "My skin feels so much smoother since I started using this." },
  ],
  "Dr Rashel Sunscreen SPF 50 for Men": [
    { user: "Aditya Kumar", rating: 5, comment: "No white cast at all! Finally a sunscreen that works for Indian skin." },
    { user: "Sameer Bhat", rating: 5, comment: "Lightweight and non-greasy. Wearing it daily now." },
    { user: "Rahul Desai", rating: 4, comment: "Great protection, doesn't feel heavy on the face." },
    { user: "Manish Tiwari", rating: 4, comment: "Good sunscreen for the price. Reapply needed after 3 hours though." },
    { user: "Suresh Yadav", rating: 5, comment: "Using this every day, skin looks much better now." },
    { user: "Deepak Rathi", rating: 4, comment: "Blends well, no sticky feeling. Happy with this purchase." },
  ],
  "Luron Eyeliner": [
    { user: "Kavya Reddy", rating: 5, comment: "So pigmented! One stroke and it's perfect. Stays on all day." },
    { user: "Simran Kaur", rating: 4, comment: "Good staying power, doesn't smudge easily." },
    { user: "Neha Pandey", rating: 5, comment: "Best eyeliner I've tried under ₹400. Absolutely love it!" },
    { user: "Isha Chopra", rating: 4, comment: "Smooth application and great color payoff." },
    { user: "Meera Pillai", rating: 4, comment: "Does not transfer or bleed. Very happy with this." },
  ],
  "Luminous Foundation": [
    { user: "Tanya Srivastava", rating: 4, comment: "Good coverage and blends like a dream." },
    { user: "Radhika Menon", rating: 5, comment: "Gives such a natural finish! My go-to foundation now." },
    { user: "Sunita Agarwal", rating: 4, comment: "Stays put for hours, very impressed." },
    { user: "Pallavi Jain", rating: 4, comment: "Matches my skin tone perfectly. Love the formula." },
    { user: "Geeta Nambiar", rating: 4, comment: "Lightweight yet full coverage. Exactly what I needed." },
  ],
  "Heaven Dove Toner for Women": [
    { user: "Ankita Dubey", rating: 4, comment: "Skin feels refreshed and hydrated after every use." },
    { user: "Shruti Kulkarni", rating: 4, comment: "Nice toner, no fragrance which is great for sensitive skin." },
    { user: "Bhavna Shah", rating: 3, comment: "It's okay, does the job but didn't wow me." },
    { user: "Roshni Thomas", rating: 4, comment: "Pores look smaller after consistent use. Good product." },
    { user: "Lakshmi Choudhary", rating: 4, comment: "Very gentle and soothing. Will repurchase." },
  ],
  "Nivea FaceWash for Men": [
    { user: "Gaurav Saxena", rating: 4, comment: "Good lather and leaves skin feeling clean without over-drying." },
    { user: "Harish Nair", rating: 5, comment: "Been using Nivea for years, this one is great." },
    { user: "Pradeep Mishra", rating: 4, comment: "Affordable and effective. Does exactly what it says." },
    { user: "Sanjay Rawat", rating: 4, comment: "Good for oily skin. Controls shine throughout the day." },
    { user: "Tushar Bhatt", rating: 4, comment: "Nice cooling effect. Perfect for summer." },
    { user: "Ajay Pillai", rating: 4, comment: "Simple, no-nonsense face wash that actually works." },
  ],
  "Luminous Hydration Boost Day & Night Moisturizer": [
    { user: "Chandni Sethi", rating: 5, comment: "My skin has never felt this soft! Using it morning and night." },
    { user: "Varsha Trivedi", rating: 5, comment: "Absorbs so fast and doesn't feel greasy at all." },
    { user: "Namrata Desai", rating: 4, comment: "Great moisturizer. Skin is plump and glowing." },
    { user: "Shalini Bose", rating: 5, comment: "Honestly one of the best moisturizers I've tried." },
    { user: "Jyoti Kapoor", rating: 4, comment: "Love how lightweight it is. Great for layering under makeup." },
    { user: "Usha Patil", rating: 5, comment: "Dry skin completely gone after 2 weeks of use!" },
  ],
  "Dr Rashel's Salicylic Acid 2% Face Serum for Men": [
    { user: "Rahul Verma", rating: 3, comment: "Mild results but takes a long time to show effect." },
    { user: "Arjun Mehta", rating: 2, comment: "Broke me out initially. Might work for others though." },
    { user: "Kunal Sharma", rating: 2, comment: "Didn't see much difference even after a month." },
    { user: "Rohan Gupta", rating: 3, comment: "Average product, expected more from salicylic acid serum." },
  ],
  "Rexona Hydra Glow Face Serum for Women": [
    { user: "Meghna Joshi", rating: 5, comment: "Skin looks so dewy and glowing! Love this serum." },
    { user: "Puja Singh", rating: 4, comment: "Lightweight and absorbs quickly. Great addition to my routine." },
    { user: "Deepika Rao", rating: 4, comment: "Noticed a difference in brightness within 2 weeks." },
    { user: "Harini Venkat", rating: 4, comment: "Good hydration, skin feels plump after application." },
    { user: "Sonali Thakur", rating: 5, comment: "Best serum at this price point. Highly recommend!" },
  ],
  "Luron Ultra Protect Sunscreen SPF 50+ for Women": [
    { user: "Priya Kapoor", rating: 5, comment: "No white cast and very lightweight. Perfect for daily use!" },
    { user: "Sneha Nair", rating: 4, comment: "Great SPF protection, blends well into skin." },
    { user: "Ananya Mishra", rating: 4, comment: "Using this daily, skin hasn't tanned at all this summer." },
    { user: "Ritika Sharma", rating: 5, comment: "Dewy finish is so beautiful, skin looks healthy." },
    { user: "Divya Menon", rating: 4, comment: "Good value for money. Does the job well." },
  ],
  "Rexona Men: Pure Hydration Moisturizer": [
    { user: "Shubham Verma", rating: 4, comment: "Non-sticky formula, great for daily use." },
    { user: "Akash Pandey", rating: 4, comment: "Skin stays hydrated for hours. Good moisturizer for men." },
    { user: "Yash Malhotra", rating: 4, comment: "No fragrance, no irritation. Exactly what I wanted." },
    { user: "Dhruv Saxena", rating: 4, comment: "Simple and effective. No complaints." },
    { user: "Nitin Rawat", rating: 4, comment: "Gets absorbed fast. Love using this after face wash." },
  ],
  "Kylie Mascara: Infinite Volume": [
    { user: "Aishwarya Rao", rating: 5, comment: "Lashes look so full and voluminous! Absolutely obsessed." },
    { user: "Tanvi Kapoor", rating: 5, comment: "No clumping at all. Best mascara I've tried." },
    { user: "Ridhi Malhotra", rating: 4, comment: "Great formula, lasts all day without flaking." },
    { user: "Komal Sinha", rating: 4, comment: "Good wand design, easy to apply evenly." },
    { user: "Aarti Menon", rating: 5, comment: "Makes my eyes pop! Gets compliments every time I wear it." },
    { user: "Ritu Banerjee", rating: 4, comment: "Love the curl it gives. Very happy with this purchase." },
  ],
  "Kiss Beauty Velvet Matte Liquid Lipstick": [
    { user: "Nisha Aggarwal", rating: 5, comment: "Stays on for 8+ hours. The color payoff is incredible!" },
    { user: "Sonia Reddy", rating: 4, comment: "Love the matte finish. Doesn't dry out lips either." },
    { user: "Mansi Dubey", rating: 4, comment: "Great shade range and very comfortable to wear." },
    { user: "Priyanka Ghosh", rating: 4, comment: "Transfer-proof and long-lasting. Exactly as described." },
    { user: "Archana Pillai", rating: 5, comment: "One of the best liquid lipsticks I've ever used!" },
  ],
  "Heaven Dove: Radiant Cream Blush": [
    { user: "Ayesha Khan", rating: 4, comment: "Gives such a natural flush! Love how it blends." },
    { user: "Madhuri Iyer", rating: 4, comment: "Cream formula is so easy to build up. Great product." },
    { user: "Shweta Nair", rating: 5, comment: "Looks so natural and lasts all day. Repurchasing for sure!" },
    { user: "Bindiya Sharma", rating: 4, comment: "Dewy finish is gorgeous. Skin looks healthy and glowing." },
    { user: "Lavanya Suresh", rating: 4, comment: "Blends seamlessly. No streaks or patches." },
  ],
  "Luron Silk-Finish Face Primer": [
    { user: "Aditi Mishra", rating: 4, comment: "Makeup stays on so much longer with this primer!" },
    { user: "Charu Bajaj", rating: 5, comment: "Silky smooth texture. Foundation glides on beautifully." },
    { user: "Falguni Trivedi", rating: 4, comment: "Pores look minimized and skin looks blurred." },
    { user: "Ishita Roy", rating: 4, comment: "Good primer for the price. Does its job well." },
    { user: "Kajal Walia", rating: 4, comment: "Lightweight and non-greasy. Great base for makeup." },
  ],
  "Luminous: Micro-Fine Setting Spray": [
    { user: "Lata Choudhary", rating: 5, comment: "Makeup lasts 10 hours with this! Absolutely essential." },
    { user: "Mona Kapila", rating: 4, comment: "Fine mist, doesn't disturb makeup. Sets everything beautifully." },
    { user: "Neelam Arora", rating: 4, comment: "Skin looks dewy and fresh all day. Love it!" },
    { user: "Pallavi Rao", rating: 5, comment: "Game changer for my makeup routine. Can't go without it." },
    { user: "Qurratulain Baig", rating: 4, comment: "Great product, keeps makeup in place even in humidity." },
  ],
  "Kylie Velvet Lip Liner – Smooth Matte": [
    { user: "Rekha Jain", rating: 4, comment: "Smooth application and stays on for hours." },
    { user: "Saroj Bhatt", rating: 4, comment: "Great color range, matches my lipstick perfectly." },
    { user: "Trupti Kulkarni", rating: 4, comment: "No feathering at all. Very pleased with this." },
    { user: "Uma Dixit", rating: 4, comment: "Good staying power. Lips look defined and sharp." },
    { user: "Vandana Sethi", rating: 4, comment: "Creamy formula that doesn't tug on lips. Lovely product." },
  ],
  "Heaven Dove Concealer – Flawless": [
    { user: "Yamini Prasad", rating: 5, comment: "Covers dark circles completely! This is my holy grail concealer." },
    { user: "Zara Ahmed", rating: 5, comment: "Blends so easily and doesn't crease. Perfect finish." },
    { user: "Aarohi Mehta", rating: 4, comment: "Good coverage and lasts all day. Very happy!" },
    { user: "Bhumi Patel", rating: 4, comment: "Natural finish, doesn't look cakey at all." },
    { user: "Charvi Singhania", rating: 5, comment: "Best concealer I've found at this price. Repurchasing!" },
    { user: "Diya Krishnan", rating: 4, comment: "Wide shade range and great formula. Highly recommend." },
  ],
  "Kiss Beauty Glow Highlighter – Radiant": [
    { user: "Esha Oberoi", rating: 5, comment: "The glow is absolutely blinding! So beautiful on the cheekbones." },
    { user: "Falak Qureshi", rating: 5, comment: "Pigmentation is insane for the price. Love love love!" },
    { user: "Gargi Shukla", rating: 4, comment: "Buildable and blendable. Perfect for a natural or glam look." },
    { user: "Hema Narayanan", rating: 5, comment: "Skin looks lit from within. This is my favourite highlighter!" },
    { user: "Indira Varma", rating: 4, comment: "Stays on all day without fading. Great product." },
  ],
};

const getImageUrl = (img) => {
  const raw = Array.isArray(img) ? img[0] : img;
  if (!raw) return "/placeholder.png";
  if (raw.startsWith("http")) return raw;
  if (raw.startsWith("/uploads/")) return `http://localhost:8000${raw}`;
  return raw;
};

const getHardcodedReviews = (title) => {
  if (!title) return [];
  const exactMatch = hardcodedReviews[title];
  if (exactMatch) return exactMatch;
  const key = Object.keys(hardcodedReviews).find(
    (k) => title.includes(k.substring(0, 15)) || k.includes(title.substring(0, 15))
  );
  return key ? hardcodedReviews[key] : [];
};

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // login error state
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    userRequest
      .get(`/products/find/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <h2 className="p-10 text-gray-400">Loading...</h2>;
  if (!product) return <h2 className="p-10">Product not found</h2>;

  const img = getImageUrl(product.img);
  const price = product.discountedPrice || product.originalPrice || 0;

  const dbRatings = product.ratings || [];
  const reviews = getHardcodedReviews(product.title);

  const allRatings = [
    ...dbRatings.map((r) => ({ user: r.name, rating: Number(r.star), comment: r.comment })),
    ...reviews,
  ];

  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, r) => acc + r.rating, 0) / allRatings.length
      : 0;

  //login check added
  const handleAddToCart = () => {
    if (!currentUser) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
      return;
    }
    dispatch(
      addProduct({
        id: product._id,
        img,
        name: product.title,
        price,
        quantity: qty,
        email: currentUser?.email || "guest@mbcosmetics.com",
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-green-50 min-h-screen px-10 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-12">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={img}
            alt={product.title}
            className="w-[300px] hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">{product.desc}</p>

          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            ₹{price}
          </h2>

          {avgRating > 0 && (
            <div className="flex items-center gap-2">
              <StarRatings
                rating={avgRating}
                starDimension="20px"
                starSpacing="3px"
                starRatedColor="gold"
              />
              <span className="text-gray-500 text-sm">
                ({allRatings.length} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-green-200 rounded"
            >
              -
            </button>
            <span className="font-semibold">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-green-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            {added ? "✓ Added!" : "Add To Cart"}
          </button>

          {/* login error message */}
          {loginError && (
            <p className="mt-3 text-red-500 font-medium text-sm">
              ⚠️ Please login first to add products to cart.
            </p>
          )}

          {product.whatinbox && (
            <div className="mt-6 border border-green-200 p-4 rounded-lg w-[250px] bg-green-50">
              <h3 className="font-semibold mb-2 text-green-700">
                WHAT'S IN THE BOX:
              </h3>
              <p>{product.whatinbox}</p>
            </div>
          )}
        </div>
      </div>

      {allRatings.length > 0 && (
        <div className="mt-10 bg-white rounded-xl p-6 shadow-md max-w-[700px]">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            People Reviews
          </h2>
          {allRatings.map((r, index) => (
            <div key={index} className="border-b py-4">
              <p className="font-semibold">{r.user}</p>
              <StarRatings
                rating={r.rating}
                starDimension="16px"
                starSpacing="2px"
                starRatedColor="gold"
              />
              <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;