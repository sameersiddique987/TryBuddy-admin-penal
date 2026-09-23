// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import API from "../api/axios";
// // import { HiOutlineChevronLeft, HiOutlineCloudUpload, HiOutlineSave } from "react-icons/hi";

// // function EditProduct() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     title: "",
// //     price: "",
// //     description: "",
// //     category: "tshirt",
// //     collection: "general",     // 👈 NEW FIELD
// //     season: "",                // 👈 NEW FIELD
// //     size: "",
// //     stock: "",
// //   });
// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [oldImage, setOldImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await API.get(`/card`);
// //         const product = res.data.find((p) => p._id === id);
// //         if (product) {
// //           setForm({
// //             title: product.title || "",
// //             price: product.price || "",
// //             description: product.description || "",
// //             category: product.category || "tshirt",
// //             collection: product.collection || "general",  // 👈 ADD THIS
// //             season: product.season || "",                 // 👈 ADD THIS
// //             size: product.size ? product.size.join(", ") : "",
// //             stock: product.stock || "",
// //           });
// //           setOldImage(product.image);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch product:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
    
// //     try {
// //       const formData = new FormData();
// //       formData.append("title", form.title);
// //       formData.append("price", form.price);
// //       formData.append("description", form.description);
// //       formData.append("category", form.category);
// //       formData.append("collection", form.collection);  // 👈 ADD THIS
// //       formData.append("season", form.season);          // 👈 ADD THIS
// //       formData.append("size", form.size);
// //       formData.append("stock", form.stock);
// //       if (image) formData.append("image", image);

// //       await API.put(`/card/${id}`, formData);
// //       alert("✅ Product Updated Successfully!");
// //       navigate("/Products");
// //     } catch (err) {
// //       console.error("Failed to update product:", err);
// //       alert("❌ Error updating product: " + (err.response?.data?.message || "Please try again"));
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-700";
// //   const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

// //   if (loading) {
// //     return (
// //       <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading product details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Back Button & Header */}
// //         <div className="flex items-center justify-between mb-8">
// //           <button 
// //             onClick={() => navigate("/Products")}
// //             className="flex items-center text-gray-500 hover:text-orange-600 font-medium transition-colors"
// //           >
// //             <HiOutlineChevronLeft size={20} />
// //             <span>Back to Products</span>
// //           </button>
// //           <h2 className="text-2xl font-extrabold text-gray-900">Edit Product Details</h2>
// //         </div>

// //         <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
// //             {/* Left Side: Image Management */}
// //             <div className="space-y-6">
// //               <div>
// //                 <label className={labelStyle}>Product Image</label>
// //                 <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center bg-gray-50 overflow-hidden group">
// //                   <img 
// //                     src={preview || oldImage} 
// //                     alt="Product" 
// //                     className="h-full w-full object-contain p-2"
// //                   />
// //                   <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity">
// //                     <HiOutlineCloudUpload size={32} />
// //                     <span className="text-sm font-medium mt-1">Change Image</span>
// //                     <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
// //                   </label>
// //                 </div>
// //                 <p className="text-[10px] text-gray-400 pt-1 text-center italic">Tip: Click the image to upload a new one</p>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3">
// //                 <div>
// //                   <label className={labelStyle}>Price ($) *</label>
// //                   <input 
// //                     className={inputStyle} 
// //                     type="number" 
// //                     step="0.01"
// //                     value={form.price} 
// //                     onChange={(e) => setForm({ ...form, price: e.target.value })} 
// //                     required 
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className={labelStyle}>Stock *</label>
// //                   <input 
// //                     className={inputStyle} 
// //                     type="number" 
// //                     value={form.stock} 
// //                     onChange={(e) => setForm({ ...form, stock: e.target.value })} 
// //                     required 
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Side: Text Details */}
// //             <div className="space-y-5">
// //               <div>
// //                 <label className={labelStyle}>Product Title *</label>
// //                 <input 
// //                   className={inputStyle} 
// //                   type="text" 
// //                   value={form.title} 
// //                   onChange={(e) => setForm({ ...form, title: e.target.value })} 
// //                   required 
// //                 />
// //               </div>

// //               <div>
// //                 <label className={labelStyle}>Category *</label>
// //                 <select 
// //                   className={inputStyle} 
// //                   value={form.category} 
// //                   onChange={(e) => setForm({ ...form, category: e.target.value })}
// //                   required
// //                 >
// //                   <option value="tshirt">👕 T-shirt</option>
// //                   <option value="shirt">👔 Shirt</option>
// //                   <option value="hoodie">🧥 Hoodie</option>
// //                   <option value="jacket">🧥 Jacket</option>
// //                   <option value="pant">👖 Pant</option>
// //                 </select>
// //               </div>

// //               {/* Collection Field - NEW */}
// //               <div>
// //                 <label className={labelStyle}>Collection *</label>
// //                 <select 
// //                   className={inputStyle} 
// //                   value={form.collection} 
// //                   onChange={(e) => setForm({ ...form, collection: e.target.value })}
// //                   required
// //                 >
// //                   <option value="general">📦 General Collection</option>
// //                   <option value="summer">☀️ Summer Collection</option>
// //                   <option value="winter">❄️ Winter Collection</option>
// //                 </select>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Select appropriate collection for seasonal filtering
// //                 </p>
// //               </div>

// //               {/* Season Field - NEW */}
// //               <div>
// //                 <label className={labelStyle}>Season (Optional)</label>
// //                 <select 
// //                   className={inputStyle} 
// //                   value={form.season} 
// //                   onChange={(e) => setForm({ ...form, season: e.target.value })}
// //                 >
// //                   <option value="">-- Select Season --</option>
// //                   <option value="summer">☀️ Summer</option>
// //                   <option value="winter">❄️ Winter</option>
// //                   <option value="spring">🌸 Spring</option>
// //                   <option value="autumn">🍂 Autumn</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className={labelStyle}>Sizes (e.g. S, M, L, XL)</label>
// //                 <input 
// //                   className={inputStyle} 
// //                   type="text" 
// //                   placeholder="Comma separated values"
// //                   value={form.size} 
// //                   onChange={(e) => setForm({ ...form, size: e.target.value })} 
// //                 />
// //                 <p className="text-xs text-gray-400 mt-1">Example: S, M, L, XL, 2XL</p>
// //               </div>

// //               <div>
// //                 <label className={labelStyle}>Description</label>
// //                 <textarea
// //                   className={`${inputStyle} h-32 resize-none`}
// //                   value={form.description}
// //                   onChange={(e) => setForm({ ...form, description: e.target.value })}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-col md:flex-row gap-4 justify-center border-t border-gray-100 mt-10 pt-8">
// //             <button
// //               type="button"
// //               onClick={() => navigate("/Products")}
// //               className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className={`flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 ${
// //                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
// //               }`}
// //             >
// //               <HiOutlineSave size={22} />
// //               {isSubmitting ? "Saving..." : "Save Changes"}
// //             </button>
// //           </div>
// //         </form>

// //         {/* Quick Info Box */}
// //         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
// //           <p className="text-sm text-blue-800">
// //             <strong>💡 Tip:</strong> Products with <strong>"Summer Collection"</strong> will appear on the Summer page, 
// //             and <strong>"Winter Collection"</strong> will appear on the Winter page. General products appear only in main listings.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EditProduct;
















// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { HiOutlineChevronLeft, HiOutlineCloudUpload, HiOutlineSave } from "react-icons/hi";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     description: "",
//     category: "tshirt",
//     collection: "general",
//     season: "",
//     size: "",
//     stock: "",
//   });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [oldImage, setOldImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get(`/card`);
//         const product = res.data.find((p) => p._id === id);
//         if (product) {
//           setForm({
//             title: product.title || "",
//             price: product.price || "",
//             description: product.description || "",
//             category: product.category || "tshirt",
//             collection: product.collection || "general",
//             season: product.season || "",
//             size: product.size ? product.size.join(", ") : "",
//             stock: product.stock || "",
//           });
//           setOldImage(product.image);
//         }
//       } catch (err) {
//         console.error("Failed to fetch product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("price", form.price);
//       formData.append("description", form.description);
//       formData.append("category", form.category);
//       formData.append("collection", form.collection);
//       formData.append("season", form.season);
//       formData.append("size", form.size);
//       formData.append("stock", form.stock);
//       if (image) formData.append("image", image);

//       await API.put(`/card/${id}`, formData);
//       alert("✅ Product Updated Successfully!");
//       navigate("/Products");
//     } catch (err) {
//       console.error("Failed to update product:", err);
//       alert("❌ Error updating product: " + (err.response?.data?.message || "Please try again"));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-700";
//   const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

//   if (loading) {
//     return (
//       <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         {/* Back Button & Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button 
//             onClick={() => navigate("/Products")}
//             className="flex items-center text-gray-500 hover:text-orange-600 font-medium transition-colors"
//           >
//             <HiOutlineChevronLeft size={20} />
//             <span>Back to Products</span>
//           </button>
//           <h2 className="text-2xl font-extrabold text-gray-900">Edit Product Details</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          
//           {/* Two Column Layout - Image Left, Inputs Right */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
//             {/* Left Column - Image */}
//             <div>
//               <label className={labelStyle}>Product Image</label>
//               <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-80 flex items-center justify-center bg-gray-50 overflow-hidden group">
//                 <img 
//                   src={preview || oldImage} 
//                   alt="Product" 
//                   className="h-full w-full object-contain p-2"
//                 />
//                 <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity">
//                   <HiOutlineCloudUpload size={32} />
//                   <span className="text-sm font-medium mt-1">Change Image</span>
//                   <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
//                 </label>
//               </div>
//               <p className="text-[10px] text-gray-400 pt-2 text-center italic">Click on image to upload new one</p>
//             </div>

//             {/* Right Column - All Input Fields */}
//             <div className="space-y-4">
//               <div>
//                 <label className={labelStyle}>Product Title *</label>
//                 <input 
//                   className={inputStyle} 
//                   type="text" 
//                   value={form.title} 
//                   onChange={(e) => setForm({ ...form, title: e.target.value })} 
//                   required 
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className={labelStyle}>Price ($) *</label>
//                   <input 
//                     className={inputStyle} 
//                     type="number" 
//                     step="0.01"
//                     value={form.price} 
//                     onChange={(e) => setForm({ ...form, price: e.target.value })} 
//                     required 
//                   />
//                 </div>
//                 <div>
//                   <label className={labelStyle}>Stock *</label>
//                   <input 
//                     className={inputStyle} 
//                     type="number" 
//                     value={form.stock} 
//                     onChange={(e) => setForm({ ...form, stock: e.target.value })} 
//                     required 
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className={labelStyle}>Category *</label>
//                   <select 
//                     className={inputStyle} 
//                     value={form.category} 
//                     onChange={(e) => setForm({ ...form, category: e.target.value })}
//                     required
//                   >
//                     <option value="tshirt">👕 T-shirt</option>
//                     <option value="shirt">👔 Shirt</option>
//                     <option value="hoodie">🧥 Hoodie</option>
//                     <option value="jacket">🧥 Jacket</option>
//                     <option value="pant">👖 Pant</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelStyle}>Collection *</label>
//                   <select 
//                     className={inputStyle} 
//                     value={form.collection} 
//                     onChange={(e) => setForm({ ...form, collection: e.target.value })}
//                     required
//                   >
//                     <option value="general">📦 General</option>
//                     <option value="summer">☀️ Summer</option>
//                     <option value="winter">❄️ Winter</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className={labelStyle}>Season</label>
//                   <select 
//                     className={inputStyle} 
//                     value={form.season} 
//                     onChange={(e) => setForm({ ...form, season: e.target.value })}
//                   >
//                     <option value="">-- Select --</option>
//                     <option value="summer">☀️ Summer</option>
//                     <option value="winter">❄️ Winter</option>
//                     <option value="spring">🌸 Spring</option>
//                     <option value="autumn">🍂 Autumn</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelStyle}>Sizes</label>
//                   <input 
//                     className={inputStyle} 
//                     type="text" 
//                     placeholder="S, M, L, XL"
//                     value={form.size} 
//                     onChange={(e) => setForm({ ...form, size: e.target.value })} 
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelStyle}>Description</label>
//                 <textarea
//                   className={`${inputStyle} h-28 resize-none`}
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col md:flex-row gap-4 justify-center border-t border-gray-100 mt-8 pt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/Products")}
//               className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <HiOutlineSave size={22} />
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>

//         {/* Quick Info Box */}
//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
//           <p className="text-sm text-blue-800">
//             <strong>💡 Tip:</strong> Products with <strong>"Summer"</strong> collection appear on Summer page, 
//             <strong> "Winter"</strong> collection appear on Winter page.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProduct;





import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { HiOutlineChevronLeft, HiOutlineCloudUpload, HiOutlineSave, HiOutlineTrash, HiPlus } from "react-icons/hi";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "tshirt",
    collection: "general",
    season: "",
    size: "",
    stock: "",
  });

  // 👇 NAYA STATE — colors ke liye
  const [colors, setColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/card`);
        const product = res.data.find((p) => p._id === id);
        if (product) {
          setForm({
            title: product.title || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "tshirt",
            collection: product.collection || "general",
            season: product.season || "",
            size: product.size ? product.size.join(", ") : "",
            stock: product.stock || "",
          });
          setColors(product.colors || []); // 👈 existing colors load karo
          setOldImage(product.image);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 👇 Color add karne ka function
  const addColor = () => {
    if (!newColorName.trim()) {
      alert("Please enter a color name");
      return;
    }
    if (colors.some(c => c.name.toLowerCase() === newColorName.trim().toLowerCase())) {
      alert("This color is already added");
      return;
    }
    setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName("");
    setNewColorHex("#000000");
  };

  // 👇 Color remove karne ka function
  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("collection", form.collection);
      formData.append("season", form.season);
      formData.append("size", form.size);
      formData.append("stock", form.stock);
      formData.append("colors", JSON.stringify(colors)); // 👈 colors bhejo
      if (image) formData.append("image", image);

      await API.put(`/card/${id}`, formData);
      alert("✅ Product Updated Successfully!");
      navigate("/Products");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("❌ Error updating product: " + (err.response?.data?.message || "Please try again"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-700";
  const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  if (loading) {
    return (
      <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate("/Products")}
            className="flex items-center text-gray-500 hover:text-orange-600 font-medium transition-colors"
          >
            <HiOutlineChevronLeft size={20} />
            <span>Back to Products</span>
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">Edit Product Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div>
              <label className={labelStyle}>Product Image</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-80 flex items-center justify-center bg-gray-50 overflow-hidden group">
                <img 
                  src={preview || oldImage} 
                  alt="Product" 
                  className="h-full w-full object-contain p-2"
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity">
                  <HiOutlineCloudUpload size={32} />
                  <span className="text-sm font-medium mt-1">Change Image</span>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <p className="text-[10px] text-gray-400 pt-2 text-center italic">Click on image to upload new one</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Product Title *</label>
                <input 
                  className={inputStyle} 
                  type="text" 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Price ($) *</label>
                  <input 
                    className={inputStyle} 
                    type="number" 
                    step="0.01"
                    value={form.price} 
                    onChange={(e) => setForm({ ...form, price: e.target.value })} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelStyle}>Stock *</label>
                  <input 
                    className={inputStyle} 
                    type="number" 
                    value={form.stock} 
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Category *</label>
                  <select 
                    className={inputStyle} 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="tshirt">👕 T-shirt</option>
                    <option value="shirt">👔 Shirt</option>
                    <option value="hoodie">🧥 Hoodie</option>
                    <option value="jacket">🧥 Jacket</option>
                    <option value="pant">👖 Pant</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Collection *</label>
                  <select 
                    className={inputStyle} 
                    value={form.collection} 
                    onChange={(e) => setForm({ ...form, collection: e.target.value })}
                    required
                  >
                    <option value="general">📦 General</option>
                    <option value="summer">☀️ Summer</option>
                    <option value="winter">❄️ Winter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Season</label>
                  <select 
                    className={inputStyle} 
                    value={form.season} 
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                  >
                    <option value="">-- Select --</option>
                    <option value="summer">☀️ Summer</option>
                    <option value="winter">❄️ Winter</option>
                    <option value="spring">🌸 Spring</option>
                    <option value="autumn">🍂 Autumn</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Sizes</label>
                  <input 
                    className={inputStyle} 
                    type="text" 
                    placeholder="S, M, L, XL"
                    value={form.size} 
                    onChange={(e) => setForm({ ...form, size: e.target.value })} 
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Description</label>
                <textarea
                  className={`${inputStyle} h-28 resize-none`}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 👇 NAYA SECTION — Colors */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <label className={labelStyle}>Available Colors (Optional)</label>
            <p className="text-xs text-gray-400 mb-4 ml-1">
              Add colors this product comes in. Leave empty if color selection isn't needed.
            </p>

            <div className="flex flex-wrap items-end gap-3 mb-4">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Color Name</label>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="e.g. Red, Navy Blue"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addColor();
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Pick Color</label>
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-14 h-[46px] rounded-xl border border-gray-200 cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={addColor}
                className="h-[46px] px-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all"
              >
                <HiPlus size={18} /> Add
              </button>
            </div>

            {colors.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pl-2 pr-3 py-1.5"
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span className="text-sm font-semibold text-gray-700">{color.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center border-t border-gray-100 mt-8 pt-8">
            <button
              type="button"
              onClick={() => navigate("/Products")}
              className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <HiOutlineSave size={22} />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Products with <strong>"Summer"</strong> collection appear on Summer page, 
            <strong> "Winter"</strong> collection appear on Winter page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;