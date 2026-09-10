import { useState, useEffect } from "react";
import {
  HiOutlineUser, HiOutlineLockClosed, HiOutlineGlobeAlt,
  HiOutlineColorSwatch, HiOutlineEye, HiOutlineEyeOff,
  HiOutlineOfficeBuilding, HiOutlineMoon, HiOutlineSun
} from "react-icons/hi";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import API from "../api/axios";

const TABS = ["profile", "security", "store", "appearance"];

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  // ── Profile state ──
  const [admin, setAdmin] = useState({
    firstname: "", lastname: "", email: "", phoneNumber: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // ── Change Password state ──
  const [passwordData, setPasswordData] = useState({
    oldPassword: "", newPassword: "", confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // ── Store Info state ──
  const [store, setStore] = useState({
    storeName: "", storeEmail: "", storePhone: "",
    storeAddress: "", currency: "PKR", timezone: "Asia/Karachi",
  });
  const [storeLoading, setStoreLoading] = useState(false);

  // ── Appearance state ──
  const [darkMode, setDarkMode] = useState(false);

  // ── Load data on mount ──
  useEffect(() => {
    // Profile from cookie
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try { setAdmin(JSON.parse(storedUser)); } catch (e) {}
    }
    // Dark mode from localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Load store info when store tab opens
  useEffect(() => {
    if (activeTab === "store") fetchStoreInfo();
  }, [activeTab]);

  const fetchStoreInfo = async () => {
    try {
      const res = await API.get("/api/v1/store-info");
      if (res.data.store) setStore(res.data.store);
    } catch (err) {
      console.error("Store fetch error:", err);
    }
  };

  // ── Profile Update ──
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!admin.firstname || !admin.lastname) {
      Swal.fire('Error', 'Firstname aur Lastname required hain', 'error');
      return;
    }
    try {
      setProfileLoading(true);
      const res = await API.put("/api/v1/update-profile", {
        firstname: admin.firstname,
        lastname: admin.lastname,
        phoneNumber: admin.phoneNumber,
      });
      const updatedUser = res.data.user;
      Cookies.set("user", JSON.stringify(updatedUser));
      setAdmin(updatedUser);
      Swal.fire('Success', 'Profile update ho gaya!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || "Kuch ghalat ho gaya", 'error');
    } finally {
      setProfileLoading(false);
    }
  };

  // ── Change Password ──
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Swal.fire('Error', 'Sab fields bharein', 'error'); return;
    }
    if (passwordData.newPassword.length < 6) {
      Swal.fire('Error', 'New password kam az kam 6 characters ka hona chahiye', 'error'); return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'Passwords match nahi kar rahe', 'error'); return;
    }
    try {
      setPasswordLoading(true);
      const res = await API.put("/api/v1/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      Swal.fire('Success', res.data.message || 'Password change ho gaya!', 'success');
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || "Kuch ghalat ho gaya", 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Store Update ──
  const handleUpdateStore = async (e) => {
    e.preventDefault();
    if (!store.storeName) {
      Swal.fire('Error', 'Store name required hai', 'error'); return;
    }
    try {
      setStoreLoading(true);
      const res = await API.put("/api/v1/update/store-info", store);
      Swal.fire('Success', res.data.message || 'Store info update ho gaya!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || "Kuch ghalat ho gaya", 'error');
    } finally {
      setStoreLoading(false);
    }
  };

  // ── Dark Mode Toggle ──
  const toggleDarkMode = (val) => {
    setDarkMode(val);
    localStorage.setItem("darkMode", val);
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false,
      timer: 1500, icon: 'success',
      title: val ? '🌙 Dark mode on!' : '☀️ Light mode on!'
    });
  };

  // ── Tab config ──
  const tabs = [
    { id: "profile",    label: "Account Profile",    icon: <HiOutlineUser size={20} /> },
    { id: "security",   label: "Security & Password", icon: <HiOutlineLockClosed size={20} /> },
    { id: "store",      label: "Store Information",   icon: <HiOutlineGlobeAlt size={20} /> },
    { id: "appearance", label: "Appearance",          icon: <HiOutlineColorSwatch size={20} /> },
  ];

  return (
    <div className="p-5 pt-24 md:pt-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 italic">
        System <span className="text-blue-600">Settings</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left Side ── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Nav Tabs */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Avatar Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-bold text-blue-600">
                {admin.firstname ? admin.firstname.charAt(0).toUpperCase() : "A"}
              </span>
            </div>
            <p className="font-bold text-gray-800">{admin.firstname} {admin.lastname}</p>
            <p className="text-xs text-gray-400">{admin.email}</p>
            <span className="inline-block mt-2 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
              {admin.role || "admin"}
            </span>
          </div>
        </div>

        {/* ── Right Side ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── TAB 1: Profile ── */}
          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HiOutlineUser className="text-blue-600" /> Personal Information
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                    <input type="text" value={admin.firstname}
                      onChange={(e) => setAdmin({ ...admin, firstname: e.target.value })}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                    <input type="text" value={admin.lastname}
                      onChange={(e) => setAdmin({ ...admin, lastname: e.target.value })}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                  <input type="text" value={admin.phoneNumber || ""}
                    onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                  <input type="email" value={admin.email} readOnly
                    className="w-full mt-1 p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-400 cursor-not-allowed" />
                  <p className="text-xs text-gray-400 mt-1 ml-1">Email change nahi ho sakta</p>
                </div>
                <button type="submit" disabled={profileLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* ── TAB 2: Security ── */}
          {activeTab === "security" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <HiOutlineLockClosed className="text-red-500" /> Change Password
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">

                {/* Old Password */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Current Password</label>
                  <div className="relative mt-1">
                    <input type={showOld ? "text" : "password"}
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      placeholder="Purana password"
                      className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    <button type="button" onClick={() => setShowOld(!showOld)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showOld ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">New Password</label>
                  <div className="relative mt-1">
                    <input type={showNew ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Naya password (min 6 chars)"
                      className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    <button type="button" onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNew ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Confirm New Password</label>
                  <div className="relative mt-1">
                    <input type={showConfirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Dobara naya password"
                      className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                    </button>
                  </div>
                  {passwordData.confirmPassword && (
                    <p className={`text-xs mt-1 ml-1 font-bold ${passwordData.newPassword === passwordData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                      {passwordData.newPassword === passwordData.confirmPassword ? '✅ Passwords match' : '❌ Passwords do not match'}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={passwordLoading}
                  className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}

          {/* ── TAB 3: Store Information ── */}
          {activeTab === "store" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HiOutlineOfficeBuilding className="text-green-600" /> Store Information
              </h2>
              <form onSubmit={handleUpdateStore} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Store Name *</label>
                    <input type="text" value={store.storeName}
                      onChange={(e) => setStore({ ...store, storeName: e.target.value })}
                      placeholder="My Awesome Store"
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Store Phone</label>
                    <input type="text" value={store.storePhone}
                      onChange={(e) => setStore({ ...store, storePhone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Store Email</label>
                  <input type="email" value={store.storeEmail}
                    onChange={(e) => setStore({ ...store, storeEmail: e.target.value })}
                    placeholder="store@example.com"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Store Address</label>
                  <textarea value={store.storeAddress}
                    onChange={(e) => setStore({ ...store, storeAddress: e.target.value })}
                    placeholder="123 Main Street, Karachi, Pakistan"
                    rows={3}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Currency</label>
                    <select value={store.currency}
                      onChange={(e) => setStore({ ...store, currency: e.target.value })}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all">
                      <option value="PKR">PKR — Pakistani Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="AED">AED — UAE Dirham</option>
                      <option value="SAR">SAR — Saudi Riyal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Timezone</label>
                    <select value={store.timezone}
                      onChange={(e) => setStore({ ...store, timezone: e.target.value })}
                      className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all">
                      <option value="Asia/Karachi">Asia/Karachi (PKT +5:00)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                      <option value="Asia/Riyadh">Asia/Riyadh (AST +3:00)</option>
                      <option value="Europe/London">Europe/London (GMT +0:00)</option>
                      <option value="America/New_York">America/New_York (EST -5:00)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={storeLoading}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                  {storeLoading ? "Saving..." : "Save Store Info"}
                </button>
              </form>
            </div>
          )}

          {/* ── TAB 4: Appearance ── */}
          {activeTab === "appearance" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <HiOutlineColorSwatch className="text-purple-600" /> Appearance
              </h2>

              <div className="space-y-6">

                {/* Dark Mode */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    {darkMode
                      ? <HiOutlineMoon size={22} className="text-purple-600" />
                      : <HiOutlineSun size={22} className="text-yellow-500" />
                    }
                    <div>
                      <p className="font-bold text-sm">
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {darkMode ? "Dark theme active hai" : "Light theme active hai"}
                      </p>
                    </div>
                  </div>
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Theme preview */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Theme Preview</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => toggleDarkMode(false)}
                      className={`p-4 rounded-xl border-2 transition-all ${!darkMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="bg-white rounded-lg p-3 shadow-sm mb-2 border border-gray-100">
                        <div className="h-2 bg-gray-200 rounded mb-1 w-3/4" />
                        <div className="h-2 bg-gray-100 rounded w-1/2" />
                      </div>
                      <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                        <HiOutlineSun size={14} className="text-yellow-500" /> Light Mode
                      </p>
                    </button>

                    <button
                      onClick={() => toggleDarkMode(true)}
                      className={`p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="bg-gray-800 rounded-lg p-3 shadow-sm mb-2">
                        <div className="h-2 bg-gray-600 rounded mb-1 w-3/4" />
                        <div className="h-2 bg-gray-700 rounded w-1/2" />
                      </div>
                      <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                        <HiOutlineMoon size={14} className="text-purple-600" /> Dark Mode
                      </p>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;

