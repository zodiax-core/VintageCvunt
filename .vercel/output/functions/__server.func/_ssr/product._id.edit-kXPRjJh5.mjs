import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-DSJLF2wo.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Save } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { t as Route } from "./product._id.edit-DGFLVhAd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id.edit-kXPRjJh5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Outerwear",
	"Footwear",
	"Silverwork",
	"Adornment",
	"Tops",
	"Bottoms"
];
function EditProduct() {
	const { id } = Route.useParams();
	const product = useQuery(api.products.getById, { id });
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const fileInputRef = (0, import_react.useRef)(null);
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
		status: "Draft"
	});
	const updateProduct = useMutation(api.products.update);
	const generateUploadUrl = useMutation(api.products.generateUploadUrl);
	(0, import_react.useEffect)(() => {
		if (product) setForm({
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
			status: product.inStock ? "Active" : "Draft"
		});
	}, [product]);
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
			[field]: void 0
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
		try {
			let images;
			if (imageFile) {
				const uploadUrl = await generateUploadUrl();
				const { storageId } = await (await fetch(uploadUrl, {
					method: "POST",
					body: imageFile
				})).json();
				images = [storageId];
			}
			await updateProduct({
				id,
				name: form.name.trim(),
				slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
				category: form.category,
				price: Number(form.price),
				compareAtPrice: form.comparePrice ? Number(form.comparePrice) : void 0,
				description: form.description.trim(),
				inStock: Number(form.stock) > 0,
				stockCount: Number(form.stock),
				images
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2e3);
		} catch (err) {
			console.error("Failed to update product", err);
		} finally {
			setSaving(false);
		}
	};
	const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
	const inputErrorClass = "rounded-xl border border-red-500/50 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-red-500/70 transition-colors w-full";
	const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-chrome-dim",
				children: "Product not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2",
				children: "The product you are looking for does not exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/product",
				className: "btn-chrome btn-chrome-inner mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: "Back to Products"
				})
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Edit Product"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: product.name
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
								}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
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
							className: `${inputClass} min-h-[80px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Dimensions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.dimensions,
							onChange: (e) => handleChange("dimensions", e.target.value),
							className: inputClass
						})] })
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl bg-graphite-2 flex items-center justify-center font-mono text-lg text-chrome-dim mb-3",
										children: product.name.charAt(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Click to replace"
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
									const file = e.target.files?.[0] || null;
									setImageFile(file);
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Active",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Draft",
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Archived",
									children: "Archived"
								})
							]
						})] })
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSave,
				disabled: saving,
				className: "btn-chrome btn-chrome-inner flex-1 justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/product",
				className: "btn-chrome btn-chrome-inner justify-center !py-3.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: "Cancel"
				})
			})]
		})
	] });
}
//#endregion
export { EditProduct as component };
