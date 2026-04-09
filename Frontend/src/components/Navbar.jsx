import { FaSearch, FaUser } from "react-icons/fa";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[100px] shadow-md pl-0 pr-6 z-50 relative">
      <Link to='/'>
        {/* Logo */}
      <div className="cursor-pointer m-2">
        <img src="/logo.png" alt="" height="200px" width="200px" />
      </div>
      </Link>

      {/* Search */}
    <div className="flex items-center m-2 flex-1 justify-center">
        <input
          type="text"
          placeholder="Search Products"
          className="p-[15px] border-2 border-[#8FE388] border-solid w-[500px] outline-none rounded-lg"
        />
        <FaSearch className="text-[20px] cursor-pointer ml-2" />
      </div>

       <Link to='/cart'>
         {/* CART */}
      <div className="flex items-center">
        <div className="mr-[20px] cursor-pointer relative left-[5px]">
          <Badge badgeContent={2} color="secondary">
            <ShoppingBasketIcon className="text-green-950"  />
          </Badge>
        </div>
      </div>
      {/* LOGIN */}
       </Link>
      <Link to="/login">
        <div className="flex items-center gap-2 border border-[#8FE388] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#8FE388] hover:text-white transition">
        <FaUser />
        <span className="font-semibold">Login</span>
      </div>
      </Link>
    </div>
  );
};

export default Navbar;
