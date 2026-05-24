import { useEffect, useState, useRef, useCallback } from "react";

const INTERVAL_MS = 5000;
const BASE_URL = "http://localhost:8000";

const FALLBACK_BANNER = {
  img: "/bannerweb.png",
  title: "Reveal Your Natural Radiance",
  subtitle: "with our premium beauty collection",
};

const Banner = ({ onShopNowClick, localBanners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  const activeBanners = localBanners && localBanners.length > 0 
    ? localBanners 
    : [FALLBACK_BANNER];

  const getBannerImage = (img) => {
    if (!img) return "/bannerweb.png";
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === 'string' && img.startsWith("/uploads/")) {
      return `${BASE_URL}${img}`;
    }
    return img;
  };

  const nextSlide = useCallback(() => {
    if (activeBanners.length <= 1) return;
    
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
      setVisible(true);
    }, 600);
  }, [activeBanners.length]);

  const handleManualClick = (index) => {
    if (index === currentIndex || activeBanners.length <= 1) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setVisible(true);
      timerRef.current = setInterval(nextSlide, INTERVAL_MS);
    }, 600);
  };

  useEffect(() => {
    if (activeBanners.length > 1) {
      timerRef.current = setInterval(nextSlide, INTERVAL_MS);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, activeBanners.length]); 

  const banner = activeBanners[currentIndex] || FALLBACK_BANNER;
  const bgImage = getBannerImage(banner?.img);
  const title = banner?.title || FALLBACK_BANNER.title;
  const subtitle = banner?.subtitle || FALLBACK_BANNER.subtitle;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden bg-[#1a1a1a]">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url('${bgImage}')`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.05)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Layer */}
      <div
        className="relative h-full flex flex-col justify-center px-6 md:px-24 max-w-4xl transition-all duration-700 ease-in-out"
        style={{ 
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)'
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px w-10 bg-green-400" />
          <span className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Premium Beauty
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
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

        <p className="text-white/80 text-lg md:text-xl font-light mb-2 max-w-xl leading-relaxed">
          {subtitle}
        </p>

        <p className="text-white/90 text-xl font-semibold italic mb-8">✨ Glow With Confidence</p>

        <div className="flex items-center gap-4">
          <button
            onClick={onShopNowClick}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-3.5 rounded-full transition-all duration-300 active:scale-95"
          >
            Shop Now
          </button>
        </div>

        {activeBanners.length > 1 && (
          <div className="flex items-center gap-3 mt-12">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualClick(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "w-8 bg-green-400" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;