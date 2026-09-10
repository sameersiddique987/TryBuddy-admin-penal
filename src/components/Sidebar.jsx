

import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import Swal from 'sweetalert2';
import { 
  HiOutlineMenuAlt2, 
  HiOutlineX, 
  HiOutlineHome, 
  HiOutlineShoppingBag, 
  HiOutlinePlusCircle, 
  HiOutlineClipboardList, 
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle
} from "react-icons/hi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  // Sidebar toggle for mobile
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Fetch Admin from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout System?',
      text: "You will need to login again to access TryBuddy.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        localStorage.removeItem("user");
        setAdmin(null);
        navigate("/Login");
        closeSidebar();
      }
    });
  };

  const menuItems = [
    { name: "Dashboard", to: "/Dashboard", icon: <HiOutlineHome size={22} /> },
    { name: "Products", to: "/Products", icon: <HiOutlineShoppingBag size={22} /> },
    { name: "Add Product", to: "/AddCard", icon: <HiOutlinePlusCircle size={22} /> },
    { name: "Orders", to: "/Orders", icon: <HiOutlineClipboardList size={22} /> },
    { name: "Settings", to: "/Setting", icon: <HiOutlineCog size={22} /> },
     { name: "Help", to: "/Help", icon: <HiOutlineQuestionMarkCircle size={22} /> }, 
  ];

  const activeLink = "flex items-center space-x-3 bg-blue-600 text-white p-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30";
  const normalLink = "flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white p-3 rounded-xl transition-all duration-200";

  return (
    <>
      {/* --- MOBILE HEADER (Fixed at Top) --- */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-[100] border-b border-gray-800 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20">T</div>
          <span className="text-lg font-black tracking-tighter italic">Try<span className="text-blue-500">Buddy</span></span>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none"
        >
          {isOpen ? <HiOutlineX size={28} className="text-blue-500" /> : <HiOutlineMenuAlt2 size={28} />}
        </button>
      </div>

      {/* --- SIDEBAR ASIDE --- */}
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-gray-900 border-r border-gray-800 text-white p-6 flex flex-col z-[110] transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-2xl md:shadow-none`}>
        
        {/* Logo Section (Desktop only) */}
        <div className="hidden md:flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 font-black">TB</div>
          <h1 className="text-xl font-black tracking-tighter italic text-white">
            Try<span className="text-blue-500 underline underline-offset-4">Buddy</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Main Navigation</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {item.icon}
              <span className="font-bold text-[15px]">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Profile & Logout Section */}
        <div className="pt-6 border-t border-gray-800 mt-auto">
          <div className="flex items-center space-x-3 mb-6 px-2 bg-gray-800/40 p-3 rounded-2xl border border-gray-700/50">
            {admin ? (
              <>
                {/* Stylish User Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center text-white shadow-inner">
                  <HiOutlineUserCircle size={26} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black truncate text-white uppercase tracking-tight">
                    {admin.firstname}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Admin</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 text-gray-500 italic py-1">
                 <HiOutlineUserCircle size={22} />
                 <span className="text-xs font-bold uppercase tracking-widest">Guest Access</span>
              </div>
            )}
          </div>
          
          {admin ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 text-gray-400 hover:text-white p-3 rounded-xl hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/20"
            >
              <HiOutlineLogout size={22} className="group-hover:text-red-400 transition-colors" />
              <span className="font-bold text-sm">Logout</span>
            </button>
          ) : (
            <Link
              to="/Login"
              onClick={closeSidebar}
              className="w-full flex items-center space-x-3 text-blue-400 hover:bg-blue-600 hover:text-white p-3 rounded-xl transition-all font-bold text-sm"
            >
              <HiOutlineLogout size={22} className="rotate-180" />
              <span>Admin Login</span>
            </Link>
          )}
        </div>
      </aside>

      {/* --- OVERLAY (Mobile only) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[105] md:hidden transition-opacity duration-300" 
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;











