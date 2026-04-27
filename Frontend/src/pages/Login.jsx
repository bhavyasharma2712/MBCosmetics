import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(dispatch, { email, password });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-[2%]">
      <ToastContainer />
      <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* IMAGE */}
        <div className="h-[500px] w-[500px] transition-transform duration-700 ease-in-out transform hover:scale-105 mb-30">
          <img
            src="/logo.png"
            alt="login"
            className="object-contain h-full w-full"
          />
        </div>

        {/* FORM */}
        <div className="p-10 w-[500px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-5">Login</h2>
          <form className="spay-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-30">
              <label htmlFor="" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#62d058] text-white font-bold rounded-md transition-transform duration-500 mt-5 hover:bg-green-800 focus:outline-none focus:ring-red-500 transform hover:scale-105"
            >
              Login
            </button>

            <div className="mt-4 text-sm text-gray-600 font-semibold">
              <span>Don't have an account? </span>
              <Link to="/create-account" className="text-green-700 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;