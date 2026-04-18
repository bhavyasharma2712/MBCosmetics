import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/${searchTerm}`);
    }
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-2 flex items-center justify-between gap-10">
        
        {/* Logo Section - Adjusted height to prevent layout stretching */}
        <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
          <img 
            src="/logo.png" 
            alt="MB Cosmetics" 
            className="h-14 md:h-16 w-auto object-contain" 
          />
        </Link>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl relative items-center group"
        >
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products.." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-6 pr-12 
                       text-sm text-gray-700 placeholder:text-gray-400
                       focus:outline-none focus:ring-4 focus:ring-green-50/50 focus:border-green-600 
                       focus:bg-white transition-all duration-300 shadow-sm"
          />
          <button 
            type="submit"
            className="absolute right-1.5 w-8 h-8 flex items-center justify-center 
                       bg-green-600 text-white rounded-full hover:bg-green-800 transition-all"
          >
            <FaSearch className="text-[10px]" />
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
          <Link to="/cart" className="relative group transition-transform hover:scale-110 flex items-center">
            <FaShoppingBag className="text-xl text-gray-600 group-hover:text-green-700 transition-colors" />
          </Link>
          
          <Link to="/login" className="flex items-center">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-full text-[11px] font-bold tracking-widest transition-all shadow-md active:scale-95 leading-none">
              <FaUserCircle className="text-sm" />
              <span>LOGIN</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products" 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-5 focus:outline-none"
          />
          <FaSearch className="absolute right-5 text-gray-400" />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;