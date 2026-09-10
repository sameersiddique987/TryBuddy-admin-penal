// import { Outlet } from "react-router-dom";
// import Sidebar from "./components/Sidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* 1. Sidebar apni jagah fixed rahega */}
//       <Sidebar />

//       {/* 2. Main Content Area: Yahan Margin-Left (ml) dena zaroori hai */}
//       <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-72">
//         {/* - md:ml-72: Desktop par content ko sidebar ki width (72) jitna right sarak dega.
//           - p-4 ya p-8: Content ko thoda sa saans lene ki jagah (padding) dega.
//         */}
//         <main className="p-4 md:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Cookies from 'js-cookie';

export default function AdminLayout() {
  const location = useLocation();
  const token = Cookies.get('token');

  // Agar user "/" ya "/Login" par hai, toh Sidebar nahi dikhana
  const isAuthPage = location.pathname === "/" || location.pathname === "/Login";

  // Agar user dashboard access karne ki koshish kare bina token ke, toh redirect to login
  if (!token && !isAuthPage) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar sirf tab dikhega jab hum auth page par nahi honge */}
      {!isAuthPage && <Sidebar />}

      {/* Main Content Area: Margin-left sirf tab apply hoga jab sidebar visible ho */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isAuthPage ? "md:ml-72" : "ml-0"}`}>
        <main className={`${!isAuthPage ? "p-4 md:p-8" : "p-0"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}