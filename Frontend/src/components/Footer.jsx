import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-100 px-[200px] pb-8 mt-[40px]">
      {/* UPPER PART */}
      <div className="flex justify-between py-[5%]">
        <div>
          <img src="/logo.png" alt="Logo" height={200} width={200} />
          <p className="mt-[2]">Cultivating your natural glow 🌿</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold ">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold ">Contact Us</h2>
          <p className="mt-2 ">123 MBCosmetics Avenue, City, Country</p>
          <p className="mt-2 ">Phone: (+91)8889997776</p>
          <p className="mt-2 ">Email: mbcosmetics2712@gmail.com</p>
        </div>
      </div>
      <div className="mt-8 border-t border-[#8FE388] pt-4 text-center  ">
        <div className="border-t border-gray-200 py-5 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            © 2026 MB Cosmetics. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            >
              <FaInstagram size={14} />
            </a>

            {/* X / Twitter */}
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            >
              <FaXTwitter size={14} />
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            >
              <FaFacebook size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
