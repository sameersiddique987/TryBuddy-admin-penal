import { useEffect, useState } from "react";
import API from "../api/axios"; 
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle, 
  HiOutlineTruck, 
  HiOutlineMail 
} from "react-icons/hi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Orders Logic
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Backend route check karein: /api/v1/admin/orders ya jo bhi aapne rakha ho
      const res = await API.get("/api/v1/all"); 
      // setOrders(res.data);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Please login again", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Status Logic
  const updateStatus = async (orderId, status) => {
    try {
      const res = await API.put(`/api/v1/status`, { orderId, status });
      
      if (res.status === 200) {
        Swal.fire({
          title: "Status Updated",
          text: `Order is now ${status}`,
          icon: "success",
          timer: 1000,
          showConfirmButton: false
        });
        fetchOrders(); // Refresh list
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Status Styling Logic
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      case "shipped": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    // <div className="max-w-7xl mx-auto p-5 m-11">
    <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Order Management</h2>
          <p className="text-slate-500 font-medium">Track and process your TryBuddy customer orders.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          Refresh List
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Info</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items Detail</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center font-bold text-slate-400 animate-pulse">
                    Fetching latest orders...
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* Order ID & Email */}
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-sm">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                        <HiOutlineMail className="text-blue-400" /> {order.email}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 font-bold">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </td>

                  {/* Products */}
                  <td className="py-5 px-6">
                    <div className="max-w-[200px]">
                      {order.products.map((p, idx) => (
                        <p key={idx} className="text-xs text-slate-700 font-bold truncate">
                          • {p.title} <span className="text-blue-500 italic">({p.size})</span> x{p.quantity}
                        </p>
                      ))}
                    </div>
                  </td>

                  {/* Total Amount */}
                  <td className="py-5 px-6">
                    <span className="text-lg font-black text-slate-900 tracking-tighter">₹{order.totalAmount}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-5 px-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => updateStatus(order._id, "shipped")}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Ship Order"
                      >
                        <HiOutlineTruck size={20} />
                      </button>
                      <button 
                        onClick={() => updateStatus(order._id, "completed")}
                        className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        title="Complete Order"
                      >
                        <HiOutlineCheckCircle size={20} />
                      </button>
                      <button 
                        onClick={() => updateStatus(order._id, "cancelled")}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Cancel Order"
                      >
                        <HiOutlineXCircle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && orders.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineClock size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Pending Orders</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;