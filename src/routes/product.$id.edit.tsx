import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Save, Upload, X, Plus } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { cleanError } from "@/lib/utils";
import { getSessionToken } from "@/lib/admin";

export const Route = createFileRoute("/product/$id/edit")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: EditProduct,
  head: () => ({
    meta: [{ title: "Edit Product — VintageCvunt Admin" }],
  }),
});

function EditProduct() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = useQuery(api.products.getById, { id: id as any });

  const collections = useQuery(api.collections.list) ?? [];
  const activeCollections = collections.filter((c) => c.isActive);
  const categoryOptions = activeCollections.map((c) => c.name);

  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [tagInput, setTagInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

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
    tags: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    faqs: [] as { question: string; answer: string }[],
  });

  const existingFaqs = useQuery(api.faq.getByCategory, { category: product?.slug ?? "" }) ?? [];

  const updateProduct = useMutation(api.products.update);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const createFaq = useMutation(api.faq.create);
  const addToCollection = useMutation(api.collections.addProductToCollection);
  const removeFromCollection = useMutation(api.collections.removeProductFromCollection);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price.toString(),
        comparePrice: product.compareAtPrice?.toString() || "",
        description: product.description,
        details: product.details ?? "",
        materials: product.material ?? "",
        dimensions: product.dimensions ?? "",
        stock: product.stockCount.toString(),
        status: product.inStock ? "Active" : "Draft",
        tags: product.tags ?? [],
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        faqs: existingFaqs.map((f) => ({ question: f.question, answer: f.answer })),
      });
    }
  }, [product, existingFaqs]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name") {
      setForm((prev) => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) { setForm((prev) => ({ ...prev, tags: [...prev.tags, t] })); } setTagInput(""); };
  const removeTag = (t: string) => setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }));
  const addSize = () => { const s = sizeInput.trim(); if (s && !form.sizes.includes(s)) { setForm((prev) => ({ ...prev, sizes: [...prev.sizes, s] })); } setSizeInput(""); };
  const removeSize = (s: string) => setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((x) => x !== s) }));
  const addColor = () => { const c = colorInput.trim(); if (c && !form.colors.includes(c)) { setForm((prev) => ({ ...prev, colors: [...prev.colors, c] })); } setColorInput(""); };
  const removeColor = (c: string) => setForm((prev) => ({ ...prev, colors: prev.colors.filter((x) => x !== c) }));

  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const addFaq = () => {
    const q = faqQuestion.trim();
    const a = faqAnswer.trim();
    if (q && a) {
      setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { question: q, answer: a }] }));
      setFaqQuestion("");
      setFaqAnswer("");
    }
  };

  const removeFaq = (i: number) => {
    setForm((prev) => ({ ...prev, faqs: prev.faqs.filter((_, idx) => idx !== i) }));
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
    setSaveError("");
    let images: string[] | undefined;
    let video: string | undefined;
    try {
      if (imageFile) {
        try {
          const uploadUrl = await generateUploadUrl({ sessionToken: getSessionToken() ?? "" });
          const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": imageFile.type }, body: imageFile });
          if (result.ok) {
            const { storageId } = await result.json();
            if (storageId) images = [storageId];
          } else {
            setSaveError("Image upload failed (HTTP " + result.status + "). Product saved without image.");
          }
        } catch (e) {
          setSaveError("Image upload error: " + cleanError(e));
        }
      }

      if (videoFile) {
        try {
          const uploadUrl = await generateUploadUrl({ sessionToken: getSessionToken() ?? "" });
          const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": videoFile.type }, body: videoFile });
          if (result.ok) {
            const { storageId } = await result.json();
            if (storageId) video = storageId;
          } else {
            setSaveError("Video upload failed (HTTP " + result.status + "). Product saved without video.");
          }
        } catch (e) {
          setSaveError("Video upload error: " + cleanError(e));
        }
      }

      const oldCategory = product?.category;
      await updateProduct({
        sessionToken: getSessionToken() ?? "",
        id: id as any,
        name: form.name.trim(),
        slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        category: form.category,
        price: Number(form.price),
        compareAtPrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        description: form.description.trim(),
        details: form.details.trim() || undefined,
        dimensions: form.dimensions.trim() || undefined,
        video,
        tags: form.tags,
        sizes: form.sizes,
        colors: form.colors,
        material: form.materials.trim() || undefined,
        inStock: Number(form.stock) > 0,
        stockCount: Number(form.stock),
        images,
      });

      if (oldCategory && oldCategory !== form.category) {
        await removeFromCollection({ sessionToken: getSessionToken() ?? "", category: oldCategory, productId: id });
      }
      if (form.category) {
        await addToCollection({ sessionToken: getSessionToken() ?? "", category: form.category, productId: id });
      }

      for (const faq of form.faqs) {
        try {
          await createFaq({
            sessionToken: getSessionToken() ?? "",
            question: faq.question,
            answer: faq.answer,
            category: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
            order: 0,
            isActive: true,
          });
        } catch (e) {
          setSaveError("Failed to save FAQ: " + cleanError(e));
        }
      }

      navigate({ to: "/product" });
    } catch (err) {
      setSaveError("Failed to save product. Please check your connection and try again.");
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
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="font-display text-2xl text-chrome-dim">Product not found</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2">The product you are looking for does not exist.</p>
        <Link to="/product" className="btn-chrome btn-chrome-inner mt-6">
          <span className="btn-label">Back to Products</span>
        </Link>
      </div>
    );
  }

  return (
    <>
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
                {categoryOptions.map((c) => (
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

            <div>
              <label className={labelClass}>Tags</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]">
                    {t}
                    <button onClick={() => removeTag(t)} className="text-chrome-dim hover:text-red-400"><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag" className={`${inputClass} flex-1`} />
                <button onClick={addTag} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]">Add</button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Sizes</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {form.sizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]">
                    {s}
                    <button onClick={() => removeSize(s)} className="text-chrome-dim hover:text-red-400"><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSize(); } }} placeholder="Add size" className={`${inputClass} flex-1`} />
                <button onClick={addSize} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]">Add</button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Colors</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {form.colors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]">
                    {c}
                    <button onClick={() => removeColor(c)} className="text-chrome-dim hover:text-red-400"><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={colorInput} onChange={(e) => setColorInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addColor(); } }} placeholder="Add color" className={`${inputClass} flex-1`} />
                <button onClick={addColor} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]">Add</button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Product FAQ</label>
              <div className="space-y-2 mb-3">
                {form.faqs.map((faq, i) => (
                  <div key={i} className="flex gap-2 items-start rounded-xl border border-chrome/20 bg-graphite-2 p-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] font-medium truncate">{faq.question}</p>
                      <p className="font-mono text-[9px] text-chrome-dim line-clamp-2">{faq.answer}</p>
                    </div>
                    <button onClick={() => removeFaq(i)} className="shrink-0 text-chrome-dim hover:text-red-400 mt-0.5"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <input value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} placeholder="Question" className={inputClass} />
                <div className="flex gap-2">
                  <textarea value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} placeholder="Answer" className={`${inputClass} min-h-[60px] resize-none flex-1`} />
                  <button onClick={addFaq} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px] shrink-0 self-end"><Plus size={12} /></button>
                </div>
              </div>
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
                    <button onClick={(e) => { e.stopPropagation(); setImageFile(null); }} className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300">Remove</button>
                  </div>
                ) : product.imageUrls?.[0] ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-20 rounded-xl overflow-hidden border border-chrome/30">
                      <img src={product.imageUrls[0]} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <p className="font-mono text-[10px] text-chrome-dim">Current image</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to replace</p>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-chrome-dim mb-3" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to upload</p>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>

            <div>
              <label className={labelClass}>Video <span className="text-chrome-dim/50 font-normal normal-case">(optional)</span></label>
              <div
                onClick={() => videoInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-6 text-center cursor-pointer hover:border-chrome/50 transition-colors"
              >
                {videoFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <video src={URL.createObjectURL(videoFile)} className="max-h-32 rounded-lg mb-1" controls />
                    <p className="font-mono text-[10px] text-chrome-dim">{videoFile.name}</p>
                    <button onClick={(e) => { e.stopPropagation(); setVideoFile(null); }} className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300">Remove</button>
                  </div>
                ) : product.videoUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <video src={product.videoUrl} className="max-h-32 rounded-lg mb-1" controls />
                    <button onClick={(e) => { e.stopPropagation(); videoInputRef.current?.click(); }} className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300">Replace</button>
                  </div>
                ) : (
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to upload video</p>
                )}
              </div>
              <input ref={videoInputRef} type="file" accept="video/mp4,video/webm" className="hidden" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
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

      <div className="mt-6">
        {saveError && (
          <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="font-mono text-[11px] text-red-400">{saveError}</p>
          </div>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-chrome btn-chrome-inner flex-1 justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            <span className="btn-label">{saving ? "Saving..." : "Save Changes"}</span>
          </button>
          <Link to="/product" className="btn-chrome btn-chrome-inner justify-center !py-3.5">
            <span className="btn-label">Cancel</span>
          </Link>
        </div>
      </div>
    </>
  );
}
