import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-DSJLF2wo.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as FileText, O as Mail, S as Pencil, g as Save, t as X, w as PanelsTopLeft, y as Quote } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BpZEQ1YZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-CoB7om14.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var iconMap = {
	"hero-banner": PanelsTopLeft,
	"hero": PanelsTopLeft,
	"about-feature": FileText,
	"about": FileText,
	"featured-quote": Quote,
	"quote": Quote,
	"newsletter-cta": Mail,
	"newsletter": Mail
};
function Content() {
	const contentBlocks = useQuery(api.content.list) ?? [];
	const upsertContent = useMutation(api.content.upsert);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editValue, setEditValue] = (0, import_react.useState)("");
	function startEdit(block) {
		setEditingId(block._id);
		setEditValue(block.content);
	}
	function saveEdit(id) {
		const block = contentBlocks.find((b) => b._id === id);
		if (block) upsertContent({
			key: block.key,
			title: block.title,
			content: editValue,
			type: block.type
		});
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
			children: contentBlocks.map((block) => {
				const Icon = iconMap[block.key] || FileText;
				const isEditing = editingId === block._id;
				const preview = block.content.length > 80 ? block.content.slice(0, 80) + "..." : block.content;
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
								onClick: () => saveEdit(block._id),
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
							children: preview
						})
					})]
				}, block._id);
			})
		})]
	}) });
}
//#endregion
export { Content as component };
