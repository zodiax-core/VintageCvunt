import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, Save, X, Plus, GripVertical, ImagePlus } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { cleanError } from "@/lib/utils";
import { getSessionToken } from "@/lib/admin";

export const Route = createFileRoute("/product/new")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: AddProduct,
  head: () => ({
    meta: [{ title: "Add Product — VintageCvunt Admin" }],
  }),
});

interface ImageEntry {
  file: File;
  preview: string;
}

interface VariantEntry {
  name: string;
  price: string; // empty = use base price
  imageFile: File | null;
  imagePreview: string;
}

function AddProduct() {
  const navigate = useNavigate();
  const collections = useQuery(api.collections.list) ?? [];
  const activeCollections = collections.filter((c) => c.isActive);
  const categoryOptions = activeCollections.map((c) => c.name);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<ImageEntry[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [tagInput, setTagInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  // Variants state
  const [variants, setVariants] = useState<VariantEntry[]>([]);
  const variantImageRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    status: "Draft" as "Active" | "Draft",
    tags: [] as string[],
    sizes: [] as string[],
    faqs: [] as { question: string; answer: string }[],
  });

  const createProduct = useMutation(api.products.create);
  const getBySlug = useQuery(api.products.getBySlug, { slug: form.slug });
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const createFaq = useMutation(api.faq.create);
  const addToCollection = useMutation(api.collections.addProductToCollection);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name") {
      setForm((prev) => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setTagInput("");
  };
  const removeTag = (t: string) => setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }));

  const addSize = () => {
    const s = sizeInput.trim();
    if (s && !form.sizes.includes(s)) {
      setForm((prev) => ({ ...prev, sizes: [...prev.sizes, s] }));
    }
    setSizeInput("");
  };
  const removeSize = (s: string) => setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((x) => x !== s) }));

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
  const removeFaq = (i: number) => setForm((prev) => ({ ...prev, faqs: prev.faqs.filter((_, idx) => idx !== i) }));

  // ── Multi-image handlers ─────────────────────────────────────────────────
  const handleImagesSelected = (files: FileList | null) => {
    if (!files) return;
    const newEntries: ImageEntry[] = [];
    for (const file of Array.from(files)) {
      newEntries.push({ file, preview: URL.createObjectURL(file) });
    }
    setImageFiles((prev) => [...prev, ...newEntries]);
  };
  const removeImage = (idx: number) => {
    setImageFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };
  const moveImage = (from: number, to: number) => {
    setImageFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  // ── Variant handlers ─────────────────────────────────────────────────────
  const addVariant = () => {
    setVariants((prev) => [...prev, { name: "", price: "", imageFile: null, imagePreview: "" }]);
  };
  const removeVariant = (idx: number) => {
    setVariants((prev) => {
      if (prev[idx].imagePreview) URL.revokeObjectURL(prev[idx].imagePreview);
      return prev.filter((_, i) => i !== idx);
    });
  };
  const updateVariant = (idx: number, field: keyof VariantEntry, value: string) => {
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  };
  const handleVariantImage = (idx: number, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, imageFile: file, imagePreview: preview } : v));
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
    if (form.slug && getBySlug) {
      setSaveError("A product with this slug already exists. Please choose a different slug.");
      setSaving(false);
      return;
    }
    setSaving(true);
    setSaveError("");
    const images: string[] = [];
    let video: string | undefined;
    try {
      // Upload product images in order
      for (let i = 0; i < imageFiles.length; i++) {
        const entry = imageFiles[i];
        setUploadProgress(`Uploading image ${i + 1}/${imageFiles.length}…`);
        try {
          const uploadUrl = await generateUploadUrl({ sessionToken: getSessionToken() ?? "" });
          const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": entry.file.type }, body: entry.file });
          if (result.ok) {
            const { storageId } = await result.json();
            if (storageId) images.push(storageId);
          } else {
            setSaveError(`Image ${i + 1} upload failed (HTTP ${result.status}).`);
          }
        } catch (e) {
          setSaveError("Image upload error: " + cleanError(e));
        }
      }

      if (videoFile) {
        setUploadProgress("Uploading video…");
        try {
          const uploadUrl = await generateUploadUrl({ sessionToken: getSessionToken() ?? "" });
          const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": videoFile.type }, body: videoFile });
          if (result.ok) {
            const { storageId } = await result.json();
            if (storageId) video = storageId;
          }
        } catch (e) {
          setSaveError("Video upload error: " + cleanError(e));
        }
      }

      // Upload variant images
      const resolvedVariants: { name: string; image?: string; price?: number }[] = [];
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        if (!v.name.trim()) continue;
        let variantImageId: string | undefined;
        if (v.imageFile) {
          setUploadProgress(`Uploading variant ${i + 1} image…`);
          try {
            const uploadUrl = await generateUploadUrl({ sessionToken: getSessionToken() ?? "" });
            const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": v.imageFile.type }, body: v.imageFile });
            if (result.ok) {
              const { storageId } = await result.json();
              variantImageId = storageId;
            }
          } catch (e) {
            setSaveError("Variant image upload error: " + cleanError(e));
          }
        }
        resolvedVariants.push({
          name: v.name.trim(),
          image: variantImageId,
          price: v.price ? Number(v.price) : undefined,
        });
      }

      setUploadProgress("Saving product…");
      const productId = await createProduct({
        sessionToken: getSessionToken() ?? "",
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
        colors: [],
        variants: resolvedVariants.length > 0 ? resolvedVariants : undefined,
        material: form.materials.trim() || undefined,
        careInstructions: undefined,
        inStock: Number(form.stock) > 0,
        stockCount: Number(form.stock),
        featured: false,
        images,
      });

      if (form.category) {
        await addToCollection({ sessionToken: getSessionToken() ?? "", category: form.category, productId });
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

      setSaved(true);
      navigate({ to: "/product" });
    } catch (err) {
      setSaveError("Failed to save product. Please check your connection and try again.");
      console.error("Failed to create product", err);
    } finally {
      setSaving(false);
      setUploadProgress("");
    }
  };

  const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
  const inputErrorClass = "rounded-xl border border-red-500/50 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-red-500/70 transition-colors w-full";
  const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";

  return (
    <>
    <div className="mb-6 flex flex-col gap-1">
      <h1 className="text-xl md:text-2xl font-display">Add Product</h1>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Create a new product listing</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
          <div>
            <label className={labelClass}>Product Name <span className="text-red-400">*</span></label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Obsidian Tailcoat"
              className={errors.name ? inputErrorClass : inputClass}
            />
            {errors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>}
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
              <label className={labelClass}>Base Price <span className="text-red-400">*</span></label>
              <input
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                type="number"
                step="0.01"
                placeholder="0.00"
                className={errors.price ? inputErrorClass : inputClass}
              />
              {errors.price && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.price}</p>}
            </div>
            <div>
              <label className={labelClass}>Compare At Price</label>
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
              placeholder="Product description..."
              className={`${inputClass} min-h-[120px] resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>Details <span className="text-chrome-dim/50 font-normal normal-case">(one per line)</span></label>
            <textarea
              value={form.details}
              onChange={(e) => handleChange("details", e.target.value)}
              placeholder="Single-panel bonded leather construction&#10;Full-length centre-back seam"
              className={`${inputClass} min-h-[120px] resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>Materials <span className="text-chrome-dim/50 font-normal normal-case">(one per line)</span></label>
            <textarea
              value={form.materials}
              onChange={(e) => handleChange("materials", e.target.value)}
              placeholder="Bonded chrome leather&#10;Horn buttons"
              className={`${inputClass} min-h-[80px] resize-none`}
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

          {/* Tags */}
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
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add tag and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button onClick={addTag} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]">Add</button>
            </div>
          </div>

          {/* Sizes */}
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
              <input
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSize(); } }}
                placeholder="Add size and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button onClick={addSize} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]">Add</button>
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass + " mb-0"}>Variants <span className="text-chrome-dim/50 font-normal normal-case">(each with own image &amp; price)</span></label>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1.5 rounded-lg border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] hover:border-chrome/50 transition-colors"
              >
                <Plus size={11} /> Add Variant
              </button>
            </div>
            {variants.length === 0 && (
              <p className="font-mono text-[10px] text-chrome-dim/50 italic">No variants — product will use base price only.</p>
            )}
            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div key={idx} className="rounded-xl border border-chrome/20 bg-graphite-2/50 p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim mb-1">Name *</label>
                        <input
                          value={v.name}
                          onChange={(e) => updateVariant(idx, "name", e.target.value)}
                          placeholder="e.g. Midnight Black"
                          className="w-full rounded-lg border border-chrome/20 bg-graphite px-3 py-2 font-mono text-xs outline-none focus:border-chrome/50"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim mb-1">Price Override (optional)</label>
                        <input
                          value={v.price}
                          onChange={(e) => updateVariant(idx, "price", e.target.value)}
                          type="number"
                          step="0.01"
                          placeholder="Leave blank = base price"
                          className="w-full rounded-lg border border-chrome/20 bg-graphite px-3 py-2 font-mono text-xs outline-none focus:border-chrome/50"
                        />
                      </div>
                    </div>
                    <button onClick={() => removeVariant(idx)} className="shrink-0 text-chrome-dim hover:text-red-400 mt-4">
                      <X size={14} />
                    </button>
                  </div>
                  {/* Variant image */}
                  <div className="flex items-center gap-3">
                    {v.imagePreview ? (
                      <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-chrome/30">
                        <img src={v.imagePreview} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => setVariants((prev) => prev.map((vv, i) => i === idx ? { ...vv, imageFile: null, imagePreview: "" } : vv))}
                          className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500/80"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => variantImageRefs.current[idx]?.click()}
                        className="h-14 w-14 shrink-0 rounded-lg border-2 border-dashed border-chrome/20 flex items-center justify-center cursor-pointer hover:border-chrome/50 transition-colors"
                      >
                        <ImagePlus size={16} className="text-chrome-dim" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => variantImageRefs.current[idx]?.click()}
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors"
                    >
                      {v.imagePreview ? "Change Image" : "Upload Image"}
                    </button>
                    <input
                      ref={(el) => { variantImageRefs.current[idx] = el; }}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/heic"
                      className="hidden"
                      onChange={(e) => handleVariantImage(idx, e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
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
              <input
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                placeholder="Question"
                className={inputClass}
              />
              <div className="flex gap-2">
                <textarea
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Answer"
                  className={`${inputClass} min-h-[60px] resize-none flex-1`}
                />
                <button onClick={addFaq} type="button" className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px] shrink-0 self-end">
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">

          {/* Multi-image upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass + " mb-0"}>
                Images <span className="text-chrome-dim/50 font-normal normal-case">({imageFiles.length} added)</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] hover:border-chrome/50 transition-colors"
              >
                <ImagePlus size={11} />
                Add Photos
              </button>
            </div>

            {imageFiles.length > 0 ? (
              <div className="space-y-2">
                {imageFiles.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-xl border border-chrome/20 bg-graphite-2/50 p-2">
                    <GripVertical size={14} className="text-chrome-dim shrink-0 cursor-grab" />
                    <div className="h-12 w-12 rounded-lg overflow-hidden border border-chrome/30 shrink-0">
                      <img src={entry.preview} alt="" className="h-full w-full object-cover" />
                    </div>
                    <p className="flex-1 font-mono text-[9px] text-chrome-dim truncate min-w-0">{entry.file.name}</p>
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button type="button" onClick={() => moveImage(idx, idx - 1)} disabled={idx === 0} className="font-mono text-[8px] text-chrome-dim hover:text-chrome disabled:opacity-30">▲</button>
                      <button type="button" onClick={() => moveImage(idx, idx + 1)} disabled={idx === imageFiles.length - 1} className="font-mono text-[8px] text-chrome-dim hover:text-chrome disabled:opacity-30">▼</button>
                    </div>
                    {idx === 0 && (
                      <span className="shrink-0 rounded-full bg-chrome/10 border border-chrome/20 px-1.5 py-0.5 font-mono text-[8px] text-chrome uppercase tracking-[0.2em]">Main</span>
                    )}
                    <button type="button" onClick={() => removeImage(idx)} className="shrink-0 text-chrome-dim hover:text-red-400">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:border-chrome/50 transition-colors"
                >
                  <Upload size={14} />
                  Add More Photos
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-10 text-center cursor-pointer hover:border-chrome/50 transition-colors"
              >
                <Upload size={24} className="text-chrome-dim mb-3" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to upload</p>
                <p className="font-mono text-[9px] text-chrome-dim/50 mt-1">PNG, JPG, WEBP — select multiple</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/heic"
              multiple
              className="hidden"
              onChange={(e) => handleImagesSelected(e.target.files)}
            />
          </div>

          {/* Video upload */}
          <div>
            <label className={labelClass}>Video <span className="text-chrome-dim/50 font-normal normal-case">(optional)</span></label>
            <div
              onClick={() => videoInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-6 text-center cursor-pointer hover:border-chrome/50 transition-colors"
            >
              {videoFile ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-[10px] text-chrome-dim">{videoFile.name}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setVideoFile(null); }}
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Click to upload video</p>
              )}
            </div>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(e) => { setVideoFile(e.target.files?.[0] || null); }}
            />
          </div>

          <div>
            <label className={labelClass}>Stock <span className="text-red-400">*</span></label>
            <input
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              type="number"
              placeholder="0"
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
      {uploadProgress && (
        <div className="mb-3 rounded-xl border border-chrome/20 bg-graphite-2/50 px-4 py-3">
          <p className="font-mono text-[11px] text-chrome-dim">{uploadProgress}</p>
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-chrome btn-chrome-inner w-full justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={16} />
        <span className="btn-label">{saving ? "Saving..." : saved ? "Saved ✓" : "Save Product"}</span>
      </button>
    </div>
    </>
  );
}
