import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Save } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/product/new")({
  component: AddProduct,
  head: () => ({
    meta: [{ title: "Add Product — VintageCvunt Admin" }],
  }),
});

function AddProduct() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    comparePrice: "",
    description: "",
    details: "",
    materials: "",
    dimensions: "",
    stock: "",
    status: "Draft",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name") {
      setForm((prev) => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
  const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-display">Add Product</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Create a new product listing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Obsidian Tailcoat"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="auto-generated"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={inputClass}
              >
                <option value="">Select category</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Footwear">Footwear</option>
                <option value="Silverwork">Silverwork</option>
                <option value="Adornment">Adornment</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Compare At Price ($)</label>
                <input
                  value={form.comparePrice}
                  onChange={(e) => handleChange("comparePrice", e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Product description..."
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Details</label>
              <textarea
                value={form.details}
                onChange={(e) => handleChange("details", e.target.value)}
                placeholder="One detail per line..."
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Materials</label>
              <input
                value={form.materials}
                onChange={(e) => handleChange("materials", e.target.value)}
                placeholder="e.g. Bonded chrome leather (Italy)"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dimensions</label>
              <input
                value={form.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                placeholder="e.g. Length: 142cm · Chest: 112cm"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div>
              <label className={labelClass}>Image</label>
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-10 text-center cursor-pointer hover:border-chrome/50 transition-colors">
                <Upload size={24} className="text-chrome-dim mb-3" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to upload</p>
                <p className="font-mono text-[9px] text-chrome-dim/50 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>
            <div>
              <label className={labelClass}>Stock</label>
              <input
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                type="number"
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} className="btn-chrome btn-chrome-inner w-full justify-center !py-3.5">
          <Save size={16} />
          <span className="btn-label">{saved ? "Saved ✓" : "Save Product"}</span>
        </button>
      </div>
    </AdminLayout>
  );
}
