import { useEffect, useState, useRef } from "react";

const BASE_URL = "https://mbcosmetics.onrender.com";
const INTERVAL_MS = 5000;

const Banner = ({ onShopNowClick }) => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/banners`);
        const data = await res.json();
        setBanners(data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        setVisible(true);
      }, 600);
    }, INTERVAL_MS);

    return () => clearInterval(timerRef.current);
  }, [banners]);

  const banner = banners[currentIndex];

  const getBannerImage = (img) => {
    if (!img) return "/bannerweb.png";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads/")) return `${BASE_URL}${img}`;
    return img;
  };

  const bgImage = getBannerImage(banner?.img);
  const title = banner?.title || "Reveal Your Natural Radiance";
  const subtitle = banner?.subtitle || "with our premium beauty collection";

  if (loading) {
    return (
      <div className="bg-gray-900 h-[75vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="bg-no-repeat bg-cover h-[75vh] relative"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Fading content */}
      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease-in-out" }}
        className="relative h-full flex flex-col justify-center px-24 max-w-3xl"
      >
        {/* Badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px w-10 bg-green-400" />
          <span className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Premium Beauty
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          {title.includes(" ") ? (
            <>
              {title.split(" ").slice(0, Math.ceil(title.split(" ").length / 2)).join(" ")} <br />
              <span className="text-green-400">
                {title.split(" ").slice(Math.ceil(title.split(" ").length / 2)).join(" ")}
              </span>
            </>
          ) : (
            <span className="text-green-400">{title}</span>
          )}
        </h1>

        {/* Subtext */}
        <p className="text-white/75 text-lg font-light mb-2 leading-relaxed">{subtitle}</p>

        {/* Tagline */}
        <p className="text-white/90 text-xl font-semibold italic mb-8">✨ Glow With Confidence</p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onShopNowClick}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-900/40 hover:-translate-y-0.5"
          >
            Shop Now
          </button>
          <button className="bg-transparent border-2 border-white/60 hover:border-white text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm">
            Contact Us
          </button>
        </div>

        {/* Dots */}
        {banners.length > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setVisible(false);
                  setTimeout(() => { setCurrentIndex(i); setVisible(true); }, 600);
                }}
                style={{
                  width: i === currentIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: i === currentIndex ? "#4ade80" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;