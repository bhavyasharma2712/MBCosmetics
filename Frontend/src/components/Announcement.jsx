import { Typewriter } from "react-simple-typewriter";

const Announcement = () => {
  return (
    <div className="bg-green-600 flex items-center justify-center h-[34px]">
      <p className="text-white text-[11.5px] font-medium tracking-widest uppercase">
        <Typewriter
          words={[
            "Use Code SAVE20 for 20% off",
            "New Arrivals: Men's Collection",
            "100% Natural Ingredients",
            "New Arrivals: Rexona FaceWash"
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={65}
          deleteSpeed={40}
          delaySpeed={1800}
        />
      </p>
    </div>
  );
};

export default Announcement;