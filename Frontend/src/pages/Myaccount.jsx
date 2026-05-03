import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginSuccess } from '../redux/userRedux';
import { userRequest } from '../requestMethods';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt, FaSave } from 'react-icons/fa';

const Myaccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(user.currentUser?.name || "");
    setEmail(user.currentUser?.email || "");
    setPhone(user.currentUser?.phone || "");
    setAddress(user.currentUser?.address || "");
  }, [user.currentUser]);

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/users/${user.currentUser._id}`, {
        name,
        email,
        phone,
        address,
      });
      dispatch(loginSuccess(res.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const initials = user.currentUser?.name
    ? user.currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "MB";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <ToastContainer />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 pt-14 pb-20 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-green-300 flex-shrink-0">
            <span className="text-green-700 text-xl font-bold">{initials}</span>
          </div>
          <div>
            <p className="text-green-200 text-xs tracking-widest uppercase mb-0.5">MB Cosmetics Account</p>
            <h1 className="text-2xl font-bold text-white">{user.currentUser?.name || "Welcome Back"}</h1>
            <p className="text-green-100 text-sm">{user.currentUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 -mt-10 pb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <FaUser className="text-white text-xs" />
            </div>
            <h2 className="font-semibold text-gray-800">Personal Information</h2>
          </div>
          <form onSubmit={handleSaveInfo} className="p-6 space-y-4">
            {[
              { label: "Full Name", icon: <FaUser />, value: name, setter: setName, type: "text", placeholder: "Your full name" },
              { label: "Email Address", icon: <FaEnvelope />, value: email, setter: setEmail, type: "email", placeholder: "your@email.com" },
              { label: "Phone Number", icon: <FaPhone />, value: phone, setter: setPhone, type: "text", placeholder: "+1 (555) 000-0000" },
              { label: "Address", icon: <FaMapMarkerAlt />, value: address, setter: setAddress, type: "text", placeholder: "Your address" },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{field.label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300 text-sm">
                    {field.icon}
                  </div>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaSave />
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">🌿 MB Cosmetics — 100% Natural Ingredients</p>
      </div>
    </div>
  );
};

export default Myaccount;