
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

  const [colors, setColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");
  const [newColorImage, setNewColorImage] = useState(null);
  const [newColorPreview, setNewColorPreview] = useState(null);

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
          setColors(
            (product.colors || []).map((c) => ({
              name: c.name,
              hex: c.hex,
              image: c.image,
              imageFile: null,
              preview: c.image,
            }))
          );
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

  const handleNewColorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewColorImage(file);
      setNewColorPreview(URL.createObjectURL(file));
    }
  };

  const addColor = () => {
    if (!newColorName.trim()) {
      alert("Please enter a color name");
      return;
    }
    if (!newColorImage) {
      alert("Please upload an image for this color");
      return;
    }
    if (colors.some((c) => c.name.toLowerCase() === newColorName.trim().toLowerCase())) {
      alert("This color is already added");
      return;
    }

    setColors([
      ...colors,
      {
        name: newColorName.trim(),
        hex: newColorHex,
        image: null,
        imageFile: newColorImage,
        preview: newColorPreview,
      },
    ]);

    setNewColorName("");
    setNewColorHex("#000000");
    setNewColorImage(null);
    setNewColorPreview(null);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  // 👇 NAYA — existing color ka naam/hex update karne ke liye
  const updateColorField = (index, field, value) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: value };
    setColors(updated);
  };

  const replaceColorImage = (index, file) => {
    const updated = [...colors];
    updated[index] = {
      ...updated[index],
      imageFile: file,
      preview: URL.createObjectURL(file),
    };
    setColors(updated);
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
      formData.append("season", form.season || undefined);
      formData.append("size", form.size);
      formData.append("stock", form.stock);
      if (image) formData.append("image", image);

      const colorsMeta = colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        ...(c.image ? { image: c.image } : {}),
      }));
      formData.append("colors", JSON.stringify(colorsMeta));

      colors.forEach((c, index) => {
        if (c.imageFile) {
          formData.append(`colorImage_${index}`, c.imageFile);
        }
      });

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
                  <label className={labelStyle}>Price (Rs) *</label>
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

          {/* Colors Section */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <label className={labelStyle}>Available Colors (Optional)</label>
            <p className="text-xs text-gray-400 mb-4 ml-1">
              Add or edit colors — each needs its own photo. Click a color's name or dot below to edit it.
            </p>

            {/* Add New Color Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-end">

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Color Photo *</label>
                  <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white flex items-center justify-center group">
                    {newColorPreview ? (
                      <>
                        <img src={newColorPreview} alt="Color preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setNewColorImage(null); setNewColorPreview(null); }}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                          <HiOutlineTrash size={12} />
                        </button>
                      </>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <HiOutlineCloudUpload size={22} className="text-gray-400 group-hover:text-orange-500" />
                        <input type="file" className="hidden" onChange={handleNewColorImageChange} accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Color Name</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="e.g. Red, Navy Blue"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
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
            </div>

            {/* Existing + Newly Added Colors — naam/hex/image sab editable */}
            {colors.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="relative bg-white border border-gray-200 rounded-2xl p-3 flex flex-col items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:scale-110 transition-transform"
                    >
                      <HiOutlineTrash size={14} />
                    </button>

                    <label className="relative w-16 h-16 cursor-pointer group">
                      <img
                        src={color.preview}
                        alt={color.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-opacity">
                        <HiOutlineCloudUpload size={18} className="text-white" />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) replaceColorImage(index, file);
                        }}
                      />
                    </label>

                    {/* Naam — ab editable */}
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColorField(index, "name", e.target.value)}
                      className="text-xs font-semibold text-gray-700 text-center w-full border border-transparent hover:border-gray-200 focus:border-orange-500 rounded px-1 py-0.5 outline-none transition-all"
                    />

                    {/* Hex — ab editable */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColorField(index, "hex", e.target.value)}
                        className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                        style={{ padding: 0 }}
                      />
                      <span className="text-[10px] text-gray-400 font-mono">{color.hex}</span>
                    </div>
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