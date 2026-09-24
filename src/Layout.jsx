import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AdminLayout() {
  const location = useLocation();

  // Login pages par Sidebar hide
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/Login";

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar sirf protected pages par */}
      {!isAuthPage && <Sidebar />}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          !isAuthPage ? "md:ml-72" : "ml-0"
        }`}
      >
        <main className={`${!isAuthPage ? "p-4 md:p-8" : "p-0"}`}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}