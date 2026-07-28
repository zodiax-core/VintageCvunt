import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Save, i as Upload, t as X, x as Plus } from "../_libs/lucide-react.mjs";
import { t as cleanError } from "./utils-DLpWP-3B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product.new-Cc-kEQR_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddProduct() {
	const navigate = useNavigate();
	const categoryOptions = (useQuery(api.collections.list) ?? []).filter((c) => c.isActive).map((c) => c.name);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [videoFile, setVideoFile] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [saveError, setSaveError] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const videoInputRef = (0, import_react.useRef)(null);
	const [tagInput, setTagInput] = (0, import_react.useState)("");
	const [sizeInput, setSizeInput] = (0, import_react.useState)("");
	const [colorInput, setColorInput] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
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
		tags: [],
		sizes: [],
		colors: [],
		faqs: []
	});
	const createProduct = useMutation(api.products.create);
	const generateUploadUrl = useMutation(api.products.generateUploadUrl);
	const createFaq = useMutation(api.faq.create);
	const handleChange = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		if (field === "name") setForm((prev) => ({
			...prev,
			slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
		}));
		if (errors[field]) setErrors((prev) => ({
			...prev,
			[field]: ""
		}));
	};
	const addTag = () => {
		const t = tagInput.trim();
		if (t && !form.tags.includes(t)) setForm((prev) => ({
			...prev,
			tags: [...prev.tags, t]
		}));
		setTagInput("");
	};
	const removeTag = (t) => {
		setForm((prev) => ({
			...prev,
			tags: prev.tags.filter((x) => x !== t)
		}));
	};
	const addSize = () => {
		const s = sizeInput.trim();
		if (s && !form.sizes.includes(s)) setForm((prev) => ({
			...prev,
			sizes: [...prev.sizes, s]
		}));
		setSizeInput("");
	};
	const removeSize = (s) => {
		setForm((prev) => ({
			...prev,
			sizes: prev.sizes.filter((x) => x !== s)
		}));
	};
	const addColor = () => {
		const c = colorInput.trim();
		if (c && !form.colors.includes(c)) setForm((prev) => ({
			...prev,
			colors: [...prev.colors, c]
		}));
		setColorInput("");
	};
	const removeColor = (c) => {
		setForm((prev) => ({
			...prev,
			colors: prev.colors.filter((x) => x !== c)
		}));
	};
	const [faqQuestion, setFaqQuestion] = (0, import_react.useState)("");
	const [faqAnswer, setFaqAnswer] = (0, import_react.useState)("");
	const addFaq = () => {
		const q = faqQuestion.trim();
		const a = faqAnswer.trim();
		if (q && a) {
			setForm((prev) => ({
				...prev,
				faqs: [...prev.faqs, {
					question: q,
					answer: a
				}]
			}));
			setFaqQuestion("");
			setFaqAnswer("");
		}
	};
	const removeFaq = (i) => {
		setForm((prev) => ({
			...prev,
			faqs: prev.faqs.filter((_, idx) => idx !== i)
		}));
	};
	const validate = () => {
		const errs = {};
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
		let images = [];
		let video;
		try {
			if (imageFile) try {
				const uploadUrl = await generateUploadUrl();
				const result = await fetch(uploadUrl, {
					method: "POST",
					headers: { "Content-Type": imageFile.type },
					body: imageFile
				});
				if (result.ok) {
					const { storageId } = await result.json();
					if (storageId) images = [storageId];
				} else setSaveError("Image upload failed (HTTP " + result.status + "). Product saved without image.");
			} catch (e) {
				setSaveError("Image upload error: " + cleanError(e));
			}
			if (videoFile) try {
				const uploadUrl = await generateUploadUrl();
				const result = await fetch(uploadUrl, {
					method: "POST",
					headers: { "Content-Type": videoFile.type },
					body: videoFile
				});
				if (result.ok) {
					const { storageId } = await result.json();
					if (storageId) video = storageId;
				} else setSaveError("Video upload failed (HTTP " + result.status + "). Product saved without video.");
			} catch (e) {
				setSaveError("Video upload error: " + cleanError(e));
			}
			await createProduct({
				name: form.name.trim(),
				slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
				category: form.category,
				price: Number(form.price),
				compareAtPrice: form.comparePrice ? Number(form.comparePrice) : void 0,
				description: form.description.trim(),
				details: form.details.trim() || void 0,
				dimensions: form.dimensions.trim() || void 0,
				video,
				tags: form.tags,
				sizes: form.sizes,
				colors: form.colors,
				material: form.materials.trim() || void 0,
				careInstructions: void 0,
				inStock: Number(form.stock) > 0,
				stockCount: Number(form.stock),
				featured: false,
				images
			});
			for (const faq of form.faqs) try {
				await createFaq({
					question: faq.question,
					answer: faq.answer,
					category: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
					order: 0,
					isActive: true
				});
			} catch (e) {
				setSaveError("Failed to save FAQ: " + cleanError(e));
			}
			navigate({ to: "/product" });
		} catch (err) {
			setSaveError("Failed to save product. Please check your connection and try again.");
			console.error("Failed to create product", err);
		} finally {
			setSaving(false);
		}
	};
	const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
	const inputErrorClass = "rounded-xl border border-red-500/50 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-red-500/70 transition-colors w-full";
	const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Add Product"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: "Create a new product listing"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 space-y-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: ["Product Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.name,
								onChange: (e) => handleChange("name", e.target.value),
								placeholder: "e.g. Obsidian Tailcoat",
								className: errors.name ? inputErrorClass : inputClass
							}),
							errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[10px] text-red-400",
								children: errors.name
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.slug,
							onChange: (e) => handleChange("slug", e.target.value),
							placeholder: "auto-generated",
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.category,
								onChange: (e) => handleChange("category", e.target.value),
								className: errors.category ? inputErrorClass : inputClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select category"
								}), categoryOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))]
							}),
							errors.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[10px] text-red-400",
								children: errors.category
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: labelClass,
									children: ["Price ($) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-400",
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.price,
									onChange: (e) => handleChange("price", e.target.value),
									type: "number",
									step: "0.01",
									placeholder: "0.00",
									className: errors.price ? inputErrorClass : inputClass
								}),
								errors.price && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-[10px] text-red-400",
									children: errors.price
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Compare At Price ($)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.comparePrice,
								onChange: (e) => handleChange("comparePrice", e.target.value),
								type: "number",
								step: "0.01",
								placeholder: "0.00",
								className: inputClass
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: (e) => handleChange("description", e.target.value),
							placeholder: "Product description...",
							className: `${inputClass} min-h-[120px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelClass,
							children: ["Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-chrome-dim/50 font-normal normal-case",
								children: "(one per line)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.details,
							onChange: (e) => handleChange("details", e.target.value),
							placeholder: "Single-panel bonded leather construction\nFull-length centre-back seam\nFour concealed snap pockets",
							className: `${inputClass} min-h-[120px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelClass,
							children: ["Materials ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-chrome-dim/50 font-normal normal-case",
								children: "(one per line)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.materials,
							onChange: (e) => handleChange("materials", e.target.value),
							placeholder: "Bonded chrome leather\nHorn buttons",
							className: `${inputClass} min-h-[80px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Dimensions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.dimensions,
							onChange: (e) => handleChange("dimensions", e.target.value),
							placeholder: "e.g. Length: 142cm · Chest: 112cm",
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Tags"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 mb-2 flex-wrap",
								children: form.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]",
									children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeTag(t),
										className: "text-chrome-dim hover:text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
									})]
								}, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: tagInput,
									onChange: (e) => setTagInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addTag();
										}
									},
									placeholder: "Add tag and press Enter",
									className: `${inputClass} flex-1`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: addTag,
									type: "button",
									className: "btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]",
									children: "Add"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Sizes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 mb-2 flex-wrap",
								children: form.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]",
									children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeSize(s),
										className: "text-chrome-dim hover:text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
									})]
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: sizeInput,
									onChange: (e) => setSizeInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addSize();
										}
									},
									placeholder: "Add size and press Enter",
									className: `${inputClass} flex-1`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: addSize,
									type: "button",
									className: "btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]",
									children: "Add"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Colors"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 mb-2 flex-wrap",
								children: form.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-graphite-2 px-2.5 py-1 font-mono text-[10px]",
									children: [c, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeColor(c),
										className: "text-chrome-dim hover:text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
									})]
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: colorInput,
									onChange: (e) => setColorInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addColor();
										}
									},
									placeholder: "Add color and press Enter",
									className: `${inputClass} flex-1`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: addColor,
									type: "button",
									className: "btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px]",
									children: "Add"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Product FAQ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 mb-3",
								children: form.faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 items-start rounded-xl border border-chrome/20 bg-graphite-2 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] font-medium truncate",
											children: faq.question
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[9px] text-chrome-dim line-clamp-2",
											children: faq.answer
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeFaq(i),
										className: "shrink-0 text-chrome-dim hover:text-red-400 mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
									})]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: faqQuestion,
									onChange: (e) => setFaqQuestion(e.target.value),
									placeholder: "Question",
									className: inputClass
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: faqAnswer,
										onChange: (e) => setFaqAnswer(e.target.value),
										placeholder: "Answer",
										className: `${inputClass} min-h-[60px] resize-none flex-1`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: addFaq,
										type: "button",
										className: "btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px] shrink-0 self-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
									})]
								})]
							})
						] })
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Image"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: () => fileInputRef.current?.click(),
								className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-10 text-center cursor-pointer hover:border-chrome/50 transition-colors",
								children: imageFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-16 w-16 rounded-lg overflow-hidden border border-chrome/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: URL.createObjectURL(imageFile),
												alt: "Preview",
												className: "h-full w-full object-cover"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] text-chrome-dim",
											children: imageFile.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => {
												e.stopPropagation();
												setImageFile(null);
											},
											className: "font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300",
											children: "Remove"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
										size: 24,
										className: "text-chrome-dim mb-3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Click to upload"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[9px] text-chrome-dim/50 mt-1",
										children: "PNG, JPG up to 10MB"
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								className: "hidden",
								onChange: (e) => {
									setImageFile(e.target.files?.[0] || null);
								}
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: ["Video ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-chrome-dim/50 font-normal normal-case",
									children: "(optional)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: () => videoInputRef.current?.click(),
								className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-6 text-center cursor-pointer hover:border-chrome/50 transition-colors",
								children: videoFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] text-chrome-dim",
										children: videoFile.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => {
											e.stopPropagation();
											setVideoFile(null);
										},
										className: "font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300",
										children: "Remove"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Click to upload video"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: videoInputRef,
								type: "file",
								accept: "video/mp4,video/webm",
								className: "hidden",
								onChange: (e) => {
									setVideoFile(e.target.files?.[0] || null);
								}
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: ["Stock ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.stock,
								onChange: (e) => handleChange("stock", e.target.value),
								type: "number",
								placeholder: "0",
								className: errors.stock ? inputErrorClass : inputClass
							}),
							errors.stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[10px] text-red-400",
								children: errors.stock
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.status,
							onChange: (e) => handleChange("status", e.target.value),
							className: inputClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Active",
								children: "Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Draft",
								children: "Draft"
							})]
						})] })
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-red-400",
					children: saveError
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSave,
				disabled: saving,
				className: "btn-chrome btn-chrome-inner w-full justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: saving ? "Saving..." : saved ? "Saved ✓" : "Save Product"
				})]
			})]
		})
	] });
}
//#endregion
export { AddProduct as component };
