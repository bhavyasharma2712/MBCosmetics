import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-green-50 border-t border-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-10 pt-16 pb-8">

        {/* Top Section */}
        <div className="grid grid-cols-3 gap-12 pb-12 border-b border-green-100">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img src="/logo.png" alt="Logo" height={160} width={160} />
            <p className="text-gray-500 text-sm leading-relaxed">
              Cultivating your natural glow, one product at a time. Premium beauty essentials crafted for you.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 shadow-sm">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 shadow-sm">
                <FaXTwitter size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 shadow-sm">
                <FaFacebook size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-green-700 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Shop", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 text-sm hover:text-green-600 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-green-500 transition-all duration-200 inline-block" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-green-700 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <FaMapMarkerAlt className="text-green-500 mt-0.5 shrink-0" size={14} />
                123 MBCosmetics Avenue, City, Country
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaPhone className="text-green-500 shrink-0" size={14} />
                (+91) 8889997776
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaEnvelope className="text-green-500 shrink-0" size={14} />
                mbcosmetics2712@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex items-center justify-center">
          <p className="text-xs text-gray-400">
            © 2026 <span className="text-green-600 font-semibold">MB Cosmetics</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;