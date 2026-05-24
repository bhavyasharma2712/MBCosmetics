import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, sendOtp, resetPassword } from "../redux/apiCalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forgotStep, setForgotStep] = useState(0); // 0=login, 1=enter email, 2=enter otp+newpass
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return toast.error("Please enter your email");
    setLoading(true);
    try {
      await sendOtp(forgotEmail);
      toast.success("OTP sent to your email");
      setForgotStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter the OTP");
    if (!newPassword) return toast.error("Please enter a new password");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      await resetPassword(forgotEmail, otp, newPassword);
      toast.success("Password reset successfully! Please login.");
      setForgotStep(0);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
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

          {/* LOGIN FORM */}
          {forgotStep === 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-5">Login</h2>
              <form className="spay-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-30">
                  <label className="block text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right mt-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="text-sm text-green-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
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
            </>
          )}

          {/* STEP 1 — ENTER EMAIL */}
          {forgotStep === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Forgot Password</h2>
              <p className="text-sm text-gray-500 mb-5">Enter your registered email to receive an OTP.</p>
              <form onSubmit={handleSendOtp}>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="example@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-[#62d058] text-white font-bold rounded-md transition-transform duration-500 mt-2 hover:bg-green-800 focus:outline-none transform hover:scale-105 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => setForgotStep(0)}
                  className="w-full py-2 mt-3 text-sm text-gray-600 hover:underline"
                >
                  Back to Login
                </button>
              </form>
            </>
          )}

          {/* STEP 2 — ENTER OTP + NEW PASSWORD */}
          {forgotStep === 2 && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Reset Password</h2>
              <p className="text-sm text-gray-500 mb-5">Enter the OTP sent to <span className="font-semibold text-gray-700">{forgotEmail}</span></p>
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label className="block text-gray-600 mb-1">OTP</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="*********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-600 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FE388]"
                    placeholder="*********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-[#62d058] text-white font-bold rounded-md transition-transform duration-500 mt-2 hover:bg-green-800 focus:outline-none transform hover:scale-105 disabled:opacity-60"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setForgotStep(1)}
                  className="w-full py-2 mt-3 text-sm text-gray-600 hover:underline"
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;