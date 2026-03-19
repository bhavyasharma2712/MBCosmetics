import {Typewriter} from "react-simple-typewriter";

const Announcement = () => {
    return (
        <div style={{ backgroundColor: '#e9acd9', textAlign: 'center' }} classname ="flex text-white text-[18px] font-semibold h-[30px] ">
            <Typewriter
            words = {["Eat", "Sleep", "Code", "Repeat!"]}
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
