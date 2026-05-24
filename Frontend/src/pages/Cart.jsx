import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct, clearCart } from "../redux/cartRedux";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total } = useSelector((state) => state.cart);
 
  const { currentUser } = useSelector((state) => state.user);
  const shipping = products.length > 0 ? 70 : 0;

  // if logged out
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p className="text-2xl font-semibold mb-2">⚠️ You are not logged in</p>
        <p className="text-sm mb-6">Please login first to view your cart.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#1b5e15] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Login
        </button>
      </div>
    );
  }

  const handleIncrease = (product) => {
    dispatch(removeProduct({ id: product.id }));
    dispatch({
      type: "cart/addProduct",
      payload: { ...product, quantity: product.quantity + 1 },
    });
  };

  const handleDecrease = (product) => {
    if (product.quantity === 1) {
      dispatch(removeProduct({ id: product.id }));
    } else {
      dispatch(removeProduct({ id: product.id }));
      dispatch({
        type: "cart/addProduct",
        payload: { ...product, quantity: product.quantity - 1 },
      });
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h3 className="text-[20px] font-bold mb-6">Shopping Cart</h3>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <p className="text-2xl font-semibold">Your cart is empty</p>
          <p className="text-sm mt-2">Add some products to get started!</p>
        </div>
      ) : (
        <div className="flex gap-8">
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>

            <div className="flex flex-col space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-32 h-40 rounded-md object-cover"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center my-5 p-4">
                      <FaMinus
                        onClick={() => handleDecrease(product)}
                        className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
                      />

                      <span className="text-lg font-semibold mx-4">
                        {product.quantity}
                      </span>

                      <FaPlus
                        onClick={() => handleIncrease(product)}
                        className="bg-[#8FE388] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold mb-6">
                      ₹{product.price * product.quantity}
                    </p>

                    <FaTrashAlt
                      onClick={() =>
                        dispatch(removeProduct({ id: product.id }))
                      }
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 w-[200px] text-white p-3 mt-4 rounded-md font-semibold"
            >
              Clear Cart
            </button>
          </div>

          <div className="w-80 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-medium">₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-medium">Shipping</span>
                <span className="text-lg font-medium">₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">
                  ₹{total + shipping}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-[#1b5e15] text-white p-3 w-full rounded-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;