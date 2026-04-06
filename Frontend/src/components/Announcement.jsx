import {Typewriter} from "react-simple-typewriter";

const Announcement = () => {
    return (
        <div style={{ backgroundColor: '#90EE90', textAlign: 'center' }} classname ="flex text-white text-[18px] font-semibold h-[30px] ">
            <Typewriter
            words = {["🌿 Free Shipping on orders above ₹499", "Use Code MBFRESH for 10% off" , "New Arrivals: Men's Face Wash Collection", "100% Natural Ingredients"]}
            loop = {5}
            cursor
            cursorStyle = '_'
            typeSpeed = {70}
            deleteSpeed={50}
            delaySpeed={1000}
            />
        </div>
    )
}
export default Announcement
