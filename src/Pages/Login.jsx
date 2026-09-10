import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import API from "../api/axios"; 
import Cookies from 'js-cookie'; 
import Swal from 'sweetalert2';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineShieldCheck,
  HiOutlineEye,
  HiOutlineEyeOff
} from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login Function
const onLoginSubmit = async (data) => {
  setLoading(true);
  const { email, password } = data;

  try {
    // ✅ TryBuddy Backend API Call
    const response = await API.post("/api/v1/admin/login", {
      email,
      password,
    });

    const responseData = response.data;
    const token = responseData.token;

    if (token) {
      // ✅ TOKEN KO COOKIE MEIN SAVE KARNA
      Cookies.set('token', token, {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });

      // User info for UI
      localStorage.setItem("user", JSON.stringify(responseData.user));

      Swal.fire({
        title: "Access Granted",
        text: "Welcome back to TryBuddy!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: '#2563eb'
      });

      setTimeout(() => {
        navigate("/Dashboard");
      }, 1500);
    } else {
      Swal.fire({
        title: "Login Failed",
        text: responseData.message || "Invalid Admin Credentials",
        icon: "error",
        confirmButtonColor: '#2563eb'
      });
    }
  } catch (error) {
    console.error("Login Error:", error);

    const errMsg = error.response?.data?.message || "Backend is not responding. Please check your connection.";

    Swal.fire({
      title: error.response ? "Login Failed" : "Connection Error",
      text: errMsg,
      icon: "warning",
      confirmButtonColor: '#2563eb'
    });
  } finally {
    setLoading(false);
  }
};

  // // Login Function
  // const onLoginSubmit = async (data) => {
  //   setLoading(true);
  //   const { email, password } = data;

  //   try {
  //     // ✅ TryBuddy Backend API Call
  //     const response = await API.get("/api/v1/admin/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       const token = responseData.token;
        
  //       if (token) {
  //         // ✅ TOKEN KO COOKIE MEIN SAVE KARNA
  //         Cookies.set('token', token, { 
  //           expires: 1, 
  //           secure: true, 
  //           sameSite: 'strict' 
  //         });

  //         // User info for UI
  //         localStorage.setItem("user", JSON.stringify(responseData.user));
          
  //         Swal.fire({
  //           title: "Access Granted",
  //           text: "Welcome back to TryBuddy!",
  //           icon: "success",
  //           timer: 1500,
  //           showConfirmButton: false,
  //           confirmButtonColor: '#2563eb'
  //         });

  //         setTimeout(() => {
  //           navigate("/Dashboard"); 
  //         }, 1500);
  //       }
  //     } else {
  //       Swal.fire({
  //         title: "Login Failed",
  //         text: responseData.message || "Invalid Admin Credentials",
  //         icon: "error",
  //         confirmButtonColor: '#2563eb'
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     Swal.fire({
  //       title: "Connection Error",
  //       text: "Backend is not responding on Port 5000",
  //       icon: "warning",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans px-4">
      <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 relative overflow-hidden">
        
        {/* Top Blue Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <HiOutlineShieldCheck size={36} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            Try<span className="text-blue-600 underline">Buddy</span>
          </h2>
          <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Admin Control Center
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onLoginSubmit)}>
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase ml-1">Admin Email</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <HiOutlineMail size={20} />
              </span>
              <input 
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                type="email" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200" 
                placeholder="admin@trybuddy.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
          </div>

          {/* Password Input with Eye Icon */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <HiOutlineLockClosed size={20} />
              </span>
              <input 
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"} 
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200" 
                placeholder="••••••••"
              />
              {/* ✅ Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <HiOutlineEyeOff size={22} /> : <HiOutlineEye size={22} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 px-4 py-5 font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              "Login to System"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-slate-50">
          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black italic">
            TryBuddy Admin v2.0 © 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;