
import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaBoxOpen, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Backend routes ke hisaab se calls (Inhe apne routes se match kar lena)
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          API.get("/card"),
          API.get("/api/v1/all"),
          API.get("/api/v1/allUser"),
        ]);

        // ✅ Backend response object bhejta hai ({ success, orders/users/products })
        // ya kabhi seedha array bhi bhej sakta hai — dono cases safely handle karo
        const products = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.products || [];

        const orders = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || [];

        const users = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data.users || [];

        // Revenue Calculation (Sirf completed orders ka total)
        const revenue = orders.reduce((acc, curr) => {
          return curr.status === "completed" ? acc + curr.totalAmount : acc;
        }, 0);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalRevenue: revenue,
        });

        // Recent 5 orders for the table
        setRecentOrders(orders.slice(0, 5));

      } catch (err) {
        console.error("Dashboard Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6 text-center font-bold">Loading Dashboard Data...</div>;

  return (
    // <div className="p-5 bg-gray-100 min-h-screen">
       <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Garments Admin Dashboard
      </h1>

      {/* Stats Cards - Wahi layout jo aapne dia tha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Products</p>
            <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
          </div>
          <FaBoxOpen className="text-3xl text-blue-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
          </div>
          <FaShoppingCart className="text-3xl text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Users</p>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          </div>
          <FaUsers className="text-3xl text-purple-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">Rs{stats.totalRevenue}</h2>
          </div>
          <FaDollarSign className="text-3xl text-yellow-500" />
        </div>

      </div>

      {/* Recent Orders Table - Wahi original design */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="p-3 border text-sm font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-3 border text-sm">{order.email}</td>
                  <td className={`p-3 border text-sm font-bold ${
                    order.status === "completed" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
                  <td className="p-3 border font-bold">₹{order.totalAmount}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-5 text-center text-gray-500">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;