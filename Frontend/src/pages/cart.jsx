import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
const Cart = () => {
  return (
    <div className="min-h-screen p-8">
      <h3 className="text-[20px] font-bold mb-6">Shopping Cart</h3>
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-gray-400 pb-4">
              <img
                src="/facewashmen.png"
                alt=""
                className="w-32 h-40 rounded-md "
              />
              <div className="flex-1 ml-4 -mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  AquaClear Deep Clean Face Wash (For Men)
                </h3>
                <p className="text-gray-600 ">
                  A refreshing deep-cleansing face wash designed for men to
                  remove dirt, excess oil, and impurities
                </p>
                <div className="flex items-center my-5 p-4">
                  <FaMinus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                  <span className="text-lg font-semibold mx-4">1</span>
                  <FaPlus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-6">₹349</p>
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <img
                src="/foundation.jpg"
                alt=""
                className="w-32 h-40 rounded-md "
              />
              <div className="flex-1 ml-4 -mt-4">
                <h3 className="text-xl font-semibold mb-2 mt-10">
                  Luminous Complexion Foundation
                </h3>
                <p className="text-gray-600  ">
                  Achieve flawless skin with our lightweight liquid foundation
                  that delivers buildable coverage and a natural, seamless
                  finish
                </p>
                <div className="flex items-center my-5 p-4">
                  <FaMinus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                  <span className="text-lg font-semibold mx-4">2</span>
                  <FaPlus className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-6">₹499</p>
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
          <button className="bg-red-500 w-[200px] text-white p-3 mt-4 rounded-md font-semibold">
            Clear Cart
          </button>
          <div></div>
        </div>
        {/* RIGHT */}
        <div className="w-80 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col space-y-4 ">
            <div className="flex justify-between ">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium">₹1347</span>
            </div>

            <div className="flex justify-between ">
              <span className="text-lg font-medium">Shipping</span>
              <span className="text-lg font-medium">₹70</span>
            </div>

            <div className="flex justify-between ">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">₹1417</span>
            </div>

            <button className="bg-[#1b5e15] text-white p-3 w-full rounded-lg font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
