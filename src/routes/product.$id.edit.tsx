import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Save, Upload } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

export const Route = createFileRoute("/product/$id/edit")({
  component: EditProduct,
  head: () => ({
    meta: [{ title: "Edit Product — VintageCvunt Admin" }],
  }),
});

const CATEGORIES = ["Outerwear", "Footwear", "Silverwork", "Adornment", "Tops", "Bottoms"];

function EditProduct() {
  const { id } = Route.useParams();
  const product = useQuery(api.products.getById, { id: id as any });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    status: "Draft" as "Active" | "Draft" | "Archived",
  });

  const updateProduct = useMutation(api.products.update);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price.toString(),
        comparePrice: product.compareAtPrice?.toString() || "",
        description: product.description,
        details: "",
        materials: "",
        dimensions: "",
        stock: product.stockCount.toString(),
        status: product.inStock ? "Active" : "Draft",
      });
    }
  }, [product]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name") {
      setForm((prev) => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.category) errs.category = "Required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Required";
    if (!form.stock || Number(form.stock) < 0) errs.stock = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      let images: string[] | undefined;
      if (imageFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, { method: "POST", body: imageFile });
        const { storageId } = await result.json();
        images = [storageId];
      }
      await updateProduct({
        id: id as any,
        name: form.name.trim(),
        slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        category: form.category,
        price: Number(form.price),
        compareAtPrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        description: form.description.trim(),
        inStock: Number(form.stock) > 0,
        stockCount: Number(form.stock),
        images,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to update product", err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
  const inputErrorClass = "rounded-xl border border-red-500/50 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-red-500/70 transition-colors w-full";
  const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="font-display text-2xl text-chrome-dim">Product not found</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2">The product you are looking for does not exist.</p>
          <Link to="/product" className="btn-chrome btn-chrome-inner mt-6">
            <span className="btn-label">Back to Products</span>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-display">Edit Product</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">{product.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div>
              <label className={labelClass}>Product Name <span className="text-red-400">*</span></label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? inputErrorClass : inputClass}
              />
              {errors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category <span className="text-red-400">*</span></label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={errors.category ? inputErrorClass : inputClass}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.category}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price ($) <span className="text-red-400">*</span></label>
                <input
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  type="number"
                  step="0.01"
                  className={errors.price ? inputErrorClass : inputClass}
                />
                {errors.price && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.price}</p>}
              </div>
              <div>
                <label className={labelClass}>Compare At Price ($)</label>
                <input
                  value={form.comparePrice}
                  onChange={(e) => handleChange("comparePrice", e.target.value)}
                  type="number"
                  step="0.01"
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
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Details <span className="text-chrome-dim/50 font-normal normal-case">(one per line)</span></label>
              <textarea
                value={form.details}
                onChange={(e) => handleChange("details", e.target.value)}
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Materials <span className="text-chrome-dim/50 font-normal normal-case">(one per line)</span></label>
              <textarea
                value={form.materials}
                onChange={(e) => handleChange("materials", e.target.value)}
                className={`${inputClass} min-h-[80px] resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Dimensions</label>
              <input
                value={form.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div>
              <label className={labelClass}>Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-10 text-center cursor-pointer hover:border-chrome/50 transition-colors"
              >
                {imageFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-chrome/30">
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <p className="font-mono text-[10px] text-chrome-dim">{imageFile.name}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImageFile(null); }}
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-xl bg-graphite-2 flex items-center justify-center font-mono text-lg text-chrome-dim mb-3">
                      {product.name.charAt(0)}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to replace</p>
                    <p className="font-mono text-[9px] text-chrome-dim/50 mt-1">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                }}
              />
            </div>
            <div>
              <label className={labelClass}>Stock <span className="text-red-400">*</span></label>
              <input
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                type="number"
                className={errors.stock ? inputErrorClass : inputClass}
              />
              {errors.stock && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.stock}</p>}
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
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-chrome btn-chrome-inner flex-1 justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          <span className="btn-label">{saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}</span>
        </button>
        <Link to="/product" className="btn-chrome btn-chrome-inner justify-center !py-3.5">
          <span className="btn-label">Cancel</span>
        </Link>
      </div>
    </AdminLayout>
  );
}
