// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCube, HiPlus } from "react-icons/hi";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {
//       const res = await API.get("/card");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await API.delete(`/card/${id}`);
//         fetchProducts();
//       } catch (err) {
//         console.error("Failed to delete product:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     // <div className="max-w-7xl p-5 mx-auto">
//     <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Inventory</h2>
//           <p className="text-gray-500 mt-1">Manage your products, stock, and pricing here.</p>
//         </div>
//         <button 
//           onClick={() => navigate("/AddCard")}
//           className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
//         >
//           <HiPlus size={20} />
//           <span>Add New Product</span>
//         </button>
//       </div>

//       {/* Table Container */}
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50/50 border-b border-gray-100">
//                 <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Product</th>
//                 <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Category & Size</th>
//                 <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Pricing</th>
//                 <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Inventory</th>
//                 <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-50">
//               {products.map((item) => (
//                 <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
//                   {/* Product Info */}
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-4">
//                       <div className="h-14 w-14 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
//                         <img 
//                           src={item.image} 
//                           alt={item.title} 
//                           className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
//                         />
//                       </div>
//                       <div className="min-w-0">
//                         <p className="font-bold text-gray-900 truncate max-w-[180px]">{item.title}</p>
//                         <p className="text-xs text-gray-400 truncate max-w-[180px]">{item.description}</p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Category & Size */}
//                   <td className="py-4 px-6">
//                     <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold capitalize mb-2">
//                       {item.category || 'General'}
//                     </span>
//                     <div className="flex gap-1 flex-wrap">
//                       {item.size?.map(s => (
//                         <span key={s} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 font-medium">
//                           {s}
//                         </span>
//                       ))}
//                     </div>
//                   </td>

//                   {/* Pricing */}
//                   <td className="py-4 px-6">
//                     <p className="text-lg font-extrabold text-gray-900">₹{item.price}</p>
//                     <p className="text-[10px] text-green-500 font-bold uppercase">Incl. Taxes</p>
//                   </td>

//                   {/* Inventory/Stock */}
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-2">
//                       <div className={`h-2 w-2 rounded-full ${item.stock > 10 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
//                       <span className={`font-bold ${item.stock > 10 ? 'text-gray-700' : 'text-red-600'}`}>
//                         {item.stock} <span className="text-xs font-normal text-gray-400">in stock</span>
//                       </span>
//                     </div>
//                   </td>

//                   {/* Actions */}
//                   <td className="py-4 px-6">
//                     <div className="flex justify-center gap-3">
//                       <button
//                         onClick={() => navigate(`/EditProduct/${item._id}`)}
//                         className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
//                         title="Edit Product"
//                       >
//                         <HiOutlinePencilAlt size={22} />
//                       </button>
//                       <button
//                         onClick={() => deleteProduct(item._id)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
//                         title="Delete Product"
//                       >
//                         <HiOutlineTrash size={22} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Empty State */}
//         {products.length === 0 && (
//           <div className="py-20 text-center">
//             <HiOutlineCube size={50} className="mx-auto text-gray-200 mb-4" />
//             <p className="text-gray-500 font-medium">No products found in your inventory.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Products;


















import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCube, HiPlus } from "react-icons/hi";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/card");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/card/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Inventory</h2>
          <p className="text-gray-500 mt-1">Manage your products, stock, and pricing here.</p>
        </div>
        <button 
          onClick={() => navigate("/AddCard")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          <HiPlus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Category & Size</th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Colors</th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Pricing</th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Inventory</th>
                <th className="py-5 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* Product Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate max-w-[180px]">{item.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[180px]">{item.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category & Size */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold capitalize mb-2">
                      {item.category || 'General'}
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {item.size?.map(s => (
                        <span key={s} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* 👇 NAYA COLUMN — Colors */}
                  <td className="py-4 px-6">
                    {item.colors && item.colors.length > 0 ? (
                      <div className="flex items-center gap-1.5 flex-wrap max-w-[140px]">
                        {item.colors.map((color, idx) => (
                          <span
                            key={idx}
                            title={color.name}
                            className="w-5 h-5 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          ></span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300 italic">No colors</span>
                    )}
                  </td>

                  {/* Pricing */}
                  <td className="py-4 px-6">
                    <p className="text-lg font-extrabold text-gray-900">Rs {item.price}</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase">Incl. Taxes</p>
                  </td>

                  {/* Inventory/Stock */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.stock > 10 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                      <span className={`font-bold ${item.stock > 10 ? 'text-gray-700' : 'text-red-600'}`}>
                        {item.stock} <span className="text-xs font-normal text-gray-400">in stock</span>
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/EditProduct/${item._id}`)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Product"
                      >
                        <HiOutlinePencilAlt size={22} />
                      </button>
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Product"
                      >
                        <HiOutlineTrash size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-20 text-center">
            <HiOutlineCube size={50} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">No products found in your inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;