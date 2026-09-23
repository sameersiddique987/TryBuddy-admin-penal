// // import { useState } from "react";
// // import API from "../api/axios";
// // import { HiOutlineCloudUpload, HiOutlineTrash, HiCheckCircle } from "react-icons/hi";

// // function AddProduct() {
// //   const [form, setForm] = useState({
// //     title: "",
// //     price: "",
// //     description: "",
// //     category: "tshirt",
// //     size: [],
// //     stock: 0,
// //   });

// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     Object.keys(form).forEach(key => {
// //       if (key === "size") formData.append(key, form.size.join(","));
// //       else formData.append(key, form[key]);
// //     });
// //     formData.append("image", image);

// //     try {
// //       await API.post("/card", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       alert("🚀 Product Created Successfully!");
// //       setForm({ title: "", price: "", description: "", category: "tshirt", size: [], stock: 0 });
// //       setImage(null);
// //       setPreview(null);
// //     } catch (err) {
// //       alert("❌ Error creating product");
// //     }
// //   };

// //   const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all";
// //   const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

// //   return (
// //     // <div className="max-w-5xl p-5 md:pt-5 mx-auto pb-10">
// //     <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
// //       <div className="mb-8 text-center md:text-left">
// //         <h2 className="text-3xl font-extrabold text-gray-900">Add New Product</h2>
// //         <p className="text-gray-500">Fill in the details to list a new item in your store.</p>
// //       </div>

// //       <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
        
// //         {/* Top Section: Image & Basic Info */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //           {/* Left: Image Upload */}
// //           <div>
// //             <label className={labelStyle}>Product Image</label>
// //             <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-[310px] flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-all overflow-hidden group">
// //               {preview ? (
// //                 <div className="relative w-full h-full p-2">
// //                   <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
// //                   <button 
// //                     type="button"
// //                     onClick={() => {setPreview(null); setImage(null)}}
// //                     className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
// //                   >
// //                     <HiOutlineTrash size={20} />
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
// //                   <HiOutlineCloudUpload size={48} className="text-gray-400 group-hover:text-blue-500 mb-2" />
// //                   <span className="text-gray-500 font-medium">Click to upload image</span>
// //                   <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" required />
// //                 </label>
// //               )}
// //             </div>
// //           </div>

// //           {/* Right: Title, Price, Stock, Category */}
// //           <div className="space-y-5">
// //             <div>
// //               <label className={labelStyle}>Product Title</label>
// //               <input className={inputStyle} placeholder="Premium Cotton Hoodie" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className={labelStyle}>Price ($)</label>
// //                 <input className={inputStyle} type="number" placeholder="49.99" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
// //               </div>
// //               <div>
// //                 <label className={labelStyle}>Stock</label>
// //                 <input className={inputStyle} type="number" placeholder="100" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
// //               </div>
// //             </div>

// //             <div>
// //               <label className={labelStyle}>Category</label>
// //               <select className={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
// //                 <option value="tshirt">T-shirt</option>
// //                 <option value="shirt">Shirt</option>
// //                 <option value="hoodie">Hoodie</option>
// //                 <option value="jacket">Jacket</option>
// //                 <option value="pant">Pant</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Middle Section: Description & Sizes (Aligned side-by-side) */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-5">
// //           <div>
// //             <label className={labelStyle}>Description</label>
// //             <textarea
// //               className={`${inputStyle} h-36 resize-none`}
// //               placeholder="Describe the product material, fit, and style..."
// //               value={form.description}
// //               onChange={(e) => setForm({ ...form, description: e.target.value })}
// //             />
// //           </div>

// //           <div>
// //             <label className={labelStyle}>Select Available Sizes</label>
// //             <div className="grid grid-cols-3 gap-3">
// //               {["S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
// //                 <button
// //                   key={s}
// //                   type="button"
// //                   onClick={() => {
// //                     const newSizes = form.size.includes(s) 
// //                       ? form.size.filter(x => x !== s) 
// //                       : [...form.size, s];
// //                     setForm({ ...form, size: newSizes });
// //                   }}
// //                   className={`py-3 rounded-xl border-2 font-bold transition-all ${
// //                     form.size.includes(s) 
// //                     ? "bg-blue-600 border-blue-600 text-white shadow-md" 
// //                     : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200"
// //                   }`}
// //                 >
// //                   {s}
// //                 </button>
// //               ))}
// //             </div>
// //             <p className="mt-3 text-xs text-blue-600 font-medium flex items-center">
// //               <HiCheckCircle className="mr-1" /> Selected: {form.size.length > 0 ? form.size.join(", ") : "None"}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Bottom Section: Center Button */}
// //         <div className="flex justify-center border-t border-gray-100 pt-5">
// //           <button
// //             type="submit"
// //             className="w-full md:w-1/2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-lg"
// //           >
// //             Publish Product
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AddProduct;
















// import { useState } from "react";
// import API from "../api/axios";
// import { HiOutlineCloudUpload, HiOutlineTrash, HiCheckCircle } from "react-icons/hi";

// function AddProduct() {
//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     description: "",
//     category: "tshirt",
//     collection: "general",     // 👈 NEW FIELD
//     season: "",                // 👈 NEW FIELD
//     size: [],
//     stock: 0,
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!image && !preview) {
//       alert("⚠️ Please upload a product image");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
    
//     Object.keys(form).forEach(key => {
//       if (key === "size") {
//         formData.append(key, form.size.join(","));
//       } else {
//         formData.append(key, form[key]);
//       }
//     });
//     formData.append("image", image);

//     try {
//       await API.post("/card", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("🚀 Product Created Successfully!");
      
//       // Reset form
//       setForm({ 
//         title: "", 
//         price: "", 
//         description: "", 
//         category: "tshirt", 
//         collection: "general",
//         season: "",
//         size: [], 
//         stock: 0 
//       });
//       setImage(null);
//       setPreview(null);
//     } catch (err) {
//       console.error("Error:", err);
//       alert("❌ Error creating product: " + (err.response?.data?.message || "Please try again"));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all";
//   const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

//   return (
//     <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8 text-center md:text-left">
//           <h2 className="text-3xl font-extrabold text-gray-900">Add New Product</h2>
//           <p className="text-gray-500">Fill in the details to list a new item in your store.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          
//           {/* Top Section: Image & Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             {/* Left: Image Upload */}
//             <div>
//               <label className={labelStyle}>Product Image *</label>
//               <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-[310px] flex items-center justify-center bg-gray-50 hover:border-orange-400 transition-all overflow-hidden group">
//                 {preview ? (
//                   <div className="relative w-full h-full p-2">
//                     <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
//                     <button 
//                       type="button"
//                       onClick={() => {setPreview(null); setImage(null)}}
//                       className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
//                     >
//                       <HiOutlineTrash size={20} />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
//                     <HiOutlineCloudUpload size={48} className="text-gray-400 group-hover:text-orange-500 mb-2" />
//                     <span className="text-gray-500 font-medium">Click to upload image</span>
//                     <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
//                     <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" required />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* Right: Title, Price, Stock, Category */}
//             <div className="space-y-5">
//               <div>
//                 <label className={labelStyle}>Product Title *</label>
//                 <input 
//                   className={inputStyle} 
//                   placeholder="Premium Cotton Hoodie" 
//                   value={form.title} 
//                   onChange={(e) => setForm({ ...form, title: e.target.value })} 
//                   required 
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelStyle}>Price ($) *</label>
//                   <input 
//                     className={inputStyle} 
//                     type="number" 
//                     step="0.01"
//                     placeholder="49.99" 
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
//                     placeholder="100" 
//                     value={form.stock} 
//                     onChange={(e) => setForm({ ...form, stock: e.target.value })} 
//                     required 
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelStyle}>Category</label>
//                 <select 
//                   className={inputStyle} 
//                   value={form.category} 
//                   onChange={(e) => setForm({ ...form, category: e.target.value })}
//                 >
//                   <option value="tshirt">👕 T-shirt</option>
//                   <option value="shirt">👔 Shirt</option>
//                   <option value="hoodie">🧥 Hoodie</option>
//                   <option value="jacket">🧥 Jacket</option>
//                   <option value="pant">👖 Pant</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Collection Section - NEW */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <label className={labelStyle}>Collection *</label>
//               <select 
//                 className={inputStyle} 
//                 value={form.collection} 
//                 onChange={(e) => setForm({ ...form, collection: e.target.value })}
//                 required
//               >
//                 <option value="general">📦 General Collection</option>
//                 <option value="summer">☀️ Summer Collection</option>
//                 <option value="winter">❄️ Winter Collection</option>
//               </select>
//               <p className="text-xs text-gray-400 mt-1">
//                 Select "Summer" for beachwear, shorts, t-shirts | Select "Winter" for hoodies, jackets
//               </p>
//             </div>

//             <div>
//               <label className={labelStyle}>Season (Optional)</label>
//               <select 
//                 className={inputStyle} 
//                 value={form.season} 
//                 onChange={(e) => setForm({ ...form, season: e.target.value })}
//               >
//                 <option value="">-- Select Season --</option>
//                 <option value="summer">☀️ Summer</option>
//                 <option value="winter">❄️ Winter</option>
//                 <option value="spring">🌸 Spring</option>
//                 <option value="autumn">🍂 Autumn</option>
//               </select>
//               <p className="text-xs text-gray-400 mt-1">
//                 More specific seasonal categorization
//               </p>
//             </div>
//           </div>

//           {/* Middle Section: Description & Sizes */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-5">
//             <div>
//               <label className={labelStyle}>Description</label>
//               <textarea
//                 className={`${inputStyle} h-36 resize-none`}
//                 placeholder="Describe the product material, fit, and style..."
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className={labelStyle}>Select Available Sizes</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {["S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => {
//                       const newSizes = form.size.includes(s) 
//                         ? form.size.filter(x => x !== s) 
//                         : [...form.size, s];
//                       setForm({ ...form, size: newSizes });
//                     }}
//                     className={`py-3 rounded-xl border-2 font-bold transition-all ${
//                       form.size.includes(s) 
//                       ? "bg-orange-600 border-orange-600 text-white shadow-md" 
//                       : "border-gray-100 bg-gray-50 text-gray-600 hover:border-orange-200"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//               <p className="mt-3 text-xs text-orange-600 font-medium flex items-center">
//                 <HiCheckCircle className="mr-1" /> Selected: {form.size.length > 0 ? form.size.join(", ") : "None"}
//               </p>
//             </div>
//           </div>

//           {/* Bottom Section: Center Button */}
//           <div className="flex justify-center border-t border-gray-100 pt-5">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full md:w-1/2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-lg ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isSubmitting ? "Publishing..." : "🚀 Publish Product"}
//             </button>
//           </div>
//         </form>

//         {/* Quick Guide */}
//         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
//           <h3 className="font-bold text-blue-900 mb-3">📌 Quick Guide:</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="font-semibold text-blue-800">☀️ Summer Collection Products:</p>
//               <ul className="list-disc list-inside text-gray-600 ml-2">
//                 <li>T-shirts, Tank tops</li>
//                 <li>Shorts, Swimwear</li>
//                 <li>Linen shirts, Light fabrics</li>
//                 <li>Set Collection: "summer"</li>
//               </ul>
//             </div>
//             <div>
//               <p className="font-semibold text-blue-800">❄️ Winter Collection Products:</p>
//               <ul className="list-disc list-inside text-gray-600 ml-2">
//                 <li>Hoodies, Sweatshirts</li>
//                 <li>Jackets, Coats</li>
//                 <li>Thermal wear, Woolens</li>
//                 <li>Set Collection: "winter"</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;




import { useState } from "react";
import API from "../api/axios";
import { HiOutlineCloudUpload, HiOutlineTrash, HiCheckCircle, HiPlus } from "react-icons/hi";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "tshirt",
    collection: "general",
    season: "",
    size: [],
    stock: 0,
  });

  // 👇 NAYA STATE — colors ke liye
  const [colors, setColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (!image && !preview) {
      alert("⚠️ Please upload a product image");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    
    Object.keys(form).forEach(key => {
      if (key === "size") {
        formData.append(key, form.size.join(","));
      } else {
        formData.append(key, form[key]);
      }
    });
    formData.append("image", image);
    formData.append("colors", JSON.stringify(colors)); // 👈 colors ko JSON string bana ke bhejo

    try {
      await API.post("/card", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("🚀 Product Created Successfully!");
      
      // Reset form
      setForm({ 
        title: "", 
        price: "", 
        description: "", 
        category: "tshirt", 
        collection: "general",
        season: "",
        size: [], 
        stock: 0 
      });
      setColors([]); // 👈 colors bhi reset karo
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error creating product: " + (err.response?.data?.message || "Please try again"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all";
  const labelStyle = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <div className="p-5 pt-24 md:pt-5 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900">Add New Product</h2>
          <p className="text-gray-500">Fill in the details to list a new item in your store.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          
          {/* Top Section: Image & Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelStyle}>Product Image *</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl h-[310px] flex items-center justify-center bg-gray-50 hover:border-orange-400 transition-all overflow-hidden group">
                {preview ? (
                  <div className="relative w-full h-full p-2">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <button 
                      type="button"
                      onClick={() => {setPreview(null); setImage(null)}}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <HiOutlineCloudUpload size={48} className="text-gray-400 group-hover:text-orange-500 mb-2" />
                    <span className="text-gray-500 font-medium">Click to upload image</span>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" required />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelStyle}>Product Title *</label>
                <input 
                  className={inputStyle} 
                  placeholder="Premium Cotton Hoodie" 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Price ($) *</label>
                  <input 
                    className={inputStyle} 
                    type="number" 
                    step="0.01"
                    placeholder="49.99" 
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
                    placeholder="100" 
                    value={form.stock} 
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Category</label>
                <select 
                  className={inputStyle} 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="tshirt">👕 T-shirt</option>
                  <option value="shirt">👔 Shirt</option>
                  <option value="hoodie">🧥 Hoodie</option>
                  <option value="jacket">🧥 Jacket</option>
                  <option value="pant">👖 Pant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collection Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelStyle}>Collection *</label>
              <select 
                className={inputStyle} 
                value={form.collection} 
                onChange={(e) => setForm({ ...form, collection: e.target.value })}
                required
              >
                <option value="general">📦 General Collection</option>
                <option value="summer">☀️ Summer Collection</option>
                <option value="winter">❄️ Winter Collection</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Select "Summer" for beachwear, shorts, t-shirts | Select "Winter" for hoodies, jackets
              </p>
            </div>

            <div>
              <label className={labelStyle}>Season (Optional)</label>
              <select 
                className={inputStyle} 
                value={form.season} 
                onChange={(e) => setForm({ ...form, season: e.target.value })}
              >
                <option value="">-- Select Season --</option>
                <option value="summer">☀️ Summer</option>
                <option value="winter">❄️ Winter</option>
                <option value="spring">🌸 Spring</option>
                <option value="autumn">🍂 Autumn</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                More specific seasonal categorization
              </p>
            </div>
          </div>

          {/* Middle Section: Description & Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-5">
            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                className={`${inputStyle} h-36 resize-none`}
                placeholder="Describe the product material, fit, and style..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <label className={labelStyle}>Select Available Sizes</label>
              <div className="grid grid-cols-3 gap-3">
                {["S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      const newSizes = form.size.includes(s) 
                        ? form.size.filter(x => x !== s) 
                        : [...form.size, s];
                      setForm({ ...form, size: newSizes });
                    }}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${
                      form.size.includes(s) 
                      ? "bg-orange-600 border-orange-600 text-white shadow-md" 
                      : "border-gray-100 bg-gray-50 text-gray-600 hover:border-orange-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-orange-600 font-medium flex items-center">
                <HiCheckCircle className="mr-1" /> Selected: {form.size.length > 0 ? form.size.join(", ") : "None"}
              </p>
            </div>
          </div>

          {/* 👇 NAYA SECTION — Colors */}
          <div className="mb-8 border-t border-gray-100 pt-6">
            <label className={labelStyle}>Available Colors (Optional)</label>
            <p className="text-xs text-gray-400 mb-4 ml-1">
              Add colors this product comes in. Leave empty if color selection isn't needed.
            </p>

            {/* Color Input Row */}
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

            {/* Added Colors List */}
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

          {/* Bottom Section: Center Button */}
          <div className="flex justify-center border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-1/2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Publishing..." : "🚀 Publish Product"}
            </button>
          </div>
        </form>

        {/* Quick Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">📌 Quick Guide:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-800">☀️ Summer Collection Products:</p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>T-shirts, Tank tops</li>
                <li>Shorts, Swimwear</li>
                <li>Linen shirts, Light fabrics</li>
                <li>Set Collection: "summer"</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-blue-800">❄️ Winter Collection Products:</p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Hoodies, Sweatshirts</li>
                <li>Jackets, Coats</li>
                <li>Thermal wear, Woolens</li>
                <li>Set Collection: "winter"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;