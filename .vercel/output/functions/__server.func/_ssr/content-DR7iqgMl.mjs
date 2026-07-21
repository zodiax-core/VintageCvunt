import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as FileText, O as Mail, S as Pencil, g as Save, t as X, w as PanelsTopLeft, y as Quote } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-DR7iqgMl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialBlocks = [
	{
		id: "hero-banner",
		title: "Hero Section",
		type: "Hero Banner",
		preview: "Discover timeless elegance with our curated collection of vintage-inspired accessories and apparel.",
		content: "Discover timeless elegance with our curated collection of vintage-inspired accessories and apparel. Each piece tells a story of craftsmanship and style.",
		icon: PanelsTopLeft
	},
	{
		id: "about-feature",
		title: "About Page Intro",
		type: "About Feature",
		preview: "VintageCvunt was born from a passion for resurrecting the elegance of bygone eras...",
		content: "VintageCvunt was born from a passion for resurrecting the elegance of bygone eras. We scour the globe for the finest materials and collaborate with master artisans who share our vision of timeless design. Every item in our collection is a testament to the art of slow, deliberate craftsmanship.",
		icon: FileText
	},
	{
		id: "featured-quote",
		title: "Home Quote",
		type: "Featured Quote",
		preview: "\"Style is a way to say who you are without having to speak.\" — Rachel Zoe",
		content: "\"Style is a way to say who you are without having to speak.\" — Rachel Zoe",
		icon: Quote
	},
	{
		id: "newsletter-cta",
		title: "Newsletter",
		type: "Newsletter CTA",
		preview: "Subscribe to receive exclusive offers, early access to new collections, and style inspiration.",
		content: "Subscribe to receive exclusive offers, early access to new collections, and style inspiration delivered to your inbox every week.",
		icon: Mail
	}
];
function Content() {
	const [blocks, setBlocks] = (0, import_react.useState)(initialBlocks);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editValue, setEditValue] = (0, import_react.useState)("");
	function startEdit(block) {
		setEditingId(block.id);
		setEditValue(block.content);
	}
	function saveEdit(id) {
		setBlocks((prev) => prev.map((b) => b.id === id ? {
			...b,
			content: editValue,
			preview: editValue.length > 80 ? editValue.slice(0, 80) + "..." : editValue
		} : b));
		setEditingId(null);
		setEditValue("");
	}
	function cancelEdit() {
		setEditingId(null);
		setEditValue("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Content Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: "Edit site content blocks"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
			children: blocks.map((block) => {
				const Icon = block.icon;
				const isEditing = editingId === block.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-xl bg-chrome/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 18,
									className: "text-chrome-dim"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mono text-[11px] uppercase tracking-[0.2em] text-foreground",
								children: block.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
								children: block.type
							})] })]
						}), !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => startEdit(block),
							className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 14 })
						})]
					}), isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: editValue,
							onChange: (e) => setEditValue(e.target.value),
							rows: 4,
							className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 resize-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => saveEdit(block.id),
								className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "Save"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: cancelEdit,
								className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "Cancel"
								})]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-background/50 rounded-xl px-4 py-3 border border-chrome/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[12px] text-foreground/70 leading-relaxed",
							children: block.preview
						})
					})]
				}, block.id);
			})
		})]
	}) });
}
//#endregion
export { Content as component };
