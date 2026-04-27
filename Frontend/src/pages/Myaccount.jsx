import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginSuccess } from '../redux/userRedux';
import { userRequest } from '../requestMethods';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaSignOutAlt, FaSave, FaShoppingBag, FaHeart, FaSlidersH } from 'react-icons/fa';

const Myaccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sync fields whenever currentUser changes (login or logout)
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      await userRequest.put(`/users/${user.currentUser._id}`, {
        password: newPassword,
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password.");
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
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 pt-16 pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl border-4 border-green-300 flex-shrink-0">
            <span className="text-green-700 text-3xl font-bold tracking-tight">{initials}</span>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-green-200 text-xs font-semibold tracking-[0.2em] uppercase mb-1">MB Cosmetics Account</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {user.currentUser?.name || "Welcome Back"}
            </h1>
            <p className="text-green-100 text-sm">{user.currentUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 pb-16 relative z-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <FaShoppingBag />, label: "Order History", desc: "View past purchases" },
            { icon: <FaHeart />, label: "Wishlist", desc: "Your saved products" },
            { icon: <FaSlidersH />, label: "Preferences", desc: "Customize experience" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer group">
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 text-base flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FaUser className="text-white text-xs" />
              </div>
              <h2 className="font-bold text-gray-800">Personal Information</h2>
            </div>
            <form onSubmit={handleSaveInfo} className="p-6 space-y-4">
              {[
                { label: "Full Name", icon: <FaUser />, value: name, setter: setName, type: "text", placeholder: "Your full name" },
                { label: "Email Address", icon: <FaEnvelope />, value: email, setter: setEmail, type: "email", placeholder: "your@email.com" },
                { label: "Phone Number", icon: <FaPhone />, value: phone, setter: setPhone, type: "text", placeholder: "+1 (555) 000-0000" },
                { label: "Address", icon: <FaMapMarkerAlt />, value: address, setter: setAddress, type: "text", placeholder: "Your address" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-sm">
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
              <button
                type="submit"
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95"
              >
                <FaSave />
                Save Changes
              </button>
            </form>
          </div>

          {/* Password & Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FaLock className="text-white text-xs" />
              </div>
              <h2 className="font-bold text-gray-800">Password & Security</h2>
            </div>
            <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
              {[
                { label: "Current Password", value: currentPassword, setter: setCurrentPassword, placeholder: "Enter current password" },
                { label: "New Password", value: newPassword, setter: setNewPassword, placeholder: "Enter new password" },
                { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, placeholder: "Confirm new password" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-sm">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full mt-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <FaLock />
                Update Password
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-gray-400">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          🌿 MB Cosmetics — 100% Natural Ingredients
        </p>
      </div>
    </div>
  );
};

export default Myaccount;