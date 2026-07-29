import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as useLocation, p as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as PenLine, _ as Save, c as Trash2, i as Upload } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as useIsMobile } from "./use-mobile-DM96sOa1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection-T6hyjtPf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function toWebP(file, quality = .82) {
	if (!file.type.startsWith("image/")) return file;
	const img = new Image();
	const blob = await new Promise((resolve, reject) => {
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("Canvas ctx unavailable"));
				return;
			}
			ctx.drawImage(img, 0, 0);
			canvas.toBlob(resolve, "image/webp", quality);
		};
		img.onerror = () => {
			URL.revokeObjectURL(img.src);
			reject(/* @__PURE__ */ new Error("Image load failed"));
		};
		img.src = URL.createObjectURL(file);
	});
	if (!blob) return file;
	const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
	return new File([blob], name, { type: "image/webp" });
}
function Collections() {
	const { pathname } = useLocation();
	useNavigate();
	const isMobile = useIsMobile();
	const allCollections = useQuery(api.collections.list) ?? [];
	const createCollection = useMutation(api.collections.create);
	const updateCollection = useMutation(api.collections.update);
	const removeCollection = useMutation(api.collections.remove);
	const generateUploadUrl = useMutation(api.collections.generateUploadUrl);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [isActive, setIsActive] = (0, import_react.useState)(true);
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const resetForm = () => {
		setEditingId(null);
		setName("");
		setSlug("");
		setDescription("");
		setIsActive(true);
		setImageFile(null);
	};
	const startEdit = (c) => {
		setEditingId(c._id);
		setName(c.name);
		setSlug(c.slug);
		setDescription(c.description ?? "");
		setIsActive(c.isActive);
		setImageFile(null);
	};
	const handleSave = async () => {
		if (!name.trim()) return;
		setSaving(true);
		try {
			let image;
			if (imageFile) {
				const webpFile = await toWebP(imageFile);
				const uploadUrl = await generateUploadUrl();
				const result = await fetch(uploadUrl, {
					method: "POST",
					body: webpFile
				});
				if (!result.ok) throw new Error("Upload failed");
				const { storageId } = await result.json();
				if (storageId) image = storageId;
			}
			if (editingId) await updateCollection({
				id: editingId,
				name: name.trim(),
				slug: slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
				description: description.trim(),
				isActive,
				...image ? { image } : {}
			});
			else await createCollection({
				name: name.trim(),
				slug: slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
				description: description.trim(),
				productIds: [],
				isActive,
				image
			});
			resetForm();
		} catch (err) {
			console.error("Failed to save collection", err);
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async (id, n) => {
		if (!window.confirm(`Delete "${n}"?`)) return;
		try {
			await removeCollection({ id });
		} catch (err) {
			console.error(err);
		}
	};
	if (pathname !== "/collection") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Collections"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: "Manage categories"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
					children: editingId ? "Edit Collection" : "New Collection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => {
							setName(e.target.value);
							setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
						},
						placeholder: "Name",
						className: "rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: slug,
						onChange: (e) => setSlug(e.target.value),
						placeholder: "Slug (auto)",
						className: "rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: description,
					onChange: (e) => setDescription(e.target.value),
					placeholder: "Description",
					className: "rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full min-h-[80px] resize-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => fileInputRef.current?.click(),
							className: "flex items-center gap-2 rounded-xl border border-dashed border-chrome/20 px-4 py-2.5 cursor-pointer hover:border-chrome/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								size: 14,
								className: "text-chrome-dim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-chrome-dim",
								children: imageFile ? imageFile.name : "Upload image"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => setImageFile(e.target.files?.[0] || null)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: isActive,
								onChange: (e) => setIsActive(e.target.checked),
								className: "rounded"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-chrome-dim",
								children: "Active"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 ml-auto",
							children: [editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: resetForm,
								className: "rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSave,
								disabled: saving || !name.trim(),
								className: "btn-chrome btn-chrome-inner !py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: saving ? "Saving..." : editingId ? "Update" : "Create"
								})]
							})]
						})
					]
				})
			]
		}),
		allCollections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col items-center justify-center py-20 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl text-chrome-dim italic",
				children: "No collections yet"
			})
		}) : isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: allCollections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${c.isActive ? "bg-green-400" : "bg-gray-500"}` })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] text-chrome-dim",
						children: [
							c.slug,
							" · ",
							c.productIds.length,
							" products"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pt-2 border-t border-chrome/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => startEdit(c),
							className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 12 }), " Edit"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleDelete(c._id, c.name),
							className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " Delete"]
						})]
					})
				]
			}, c._id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Name"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Slug"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Products"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Active"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Actions"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: allCollections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px]",
					children: c.name
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-chrome-dim",
					children: c.slug
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px]",
					children: c.productIds.length
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-mono text-[11px] ${c.isActive ? "text-green-400" : "text-gray-500"}`,
					children: c.isActive ? "Yes" : "No"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => startEdit(c),
							className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 14 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(c._id, c.name),
							className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})]
					})
				})
			] }, c._id)) })] })
		})
	] });
}
//#endregion
export { Collections as component };
