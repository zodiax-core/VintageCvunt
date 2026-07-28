import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Pencil, F as FileText, T as PanelsTopLeft, _ as Save, b as Quote, c as Trash2, k as Mail, t as X, x as Plus } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BzUk_VCo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-B7KShKP9.js
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
	const faqs = useQuery(api.faq.list) ?? [];
	const createFaq = useMutation(api.faq.create);
	const updateFaq = useMutation(api.faq.update);
	const removeFaq = useMutation(api.faq.remove);
	const [faqForm, setFaqForm] = (0, import_react.useState)({
		question: "",
		answer: "",
		category: "General",
		order: 0
	});
	const [editingFaqId, setEditingFaqId] = (0, import_react.useState)(null);
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
	function resetFaqForm() {
		setFaqForm({
			question: "",
			answer: "",
			category: "General",
			order: faqs.length
		});
		setEditingFaqId(null);
	}
	function startEditFaq(faq) {
		setEditingFaqId(faq._id);
		setFaqForm({
			question: faq.question,
			answer: faq.answer,
			category: faq.category,
			order: faq.order
		});
	}
	function handleSaveFaq() {
		if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
		if (editingFaqId) updateFaq({
			id: editingFaqId,
			question: faqForm.question.trim(),
			answer: faqForm.answer.trim(),
			category: faqForm.category,
			order: faqForm.order,
			isActive: true
		});
		else createFaq({
			question: faqForm.question.trim(),
			answer: faqForm.answer.trim(),
			category: faqForm.category,
			order: faqForm.order,
			isActive: true
		});
		resetFaqForm();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 border-t border-chrome/20 pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg md:text-xl font-display",
						children: "FAQ Management"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Add, edit or remove frequently asked questions"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: editingFaqId ? "Edit FAQ" : "Add FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: faqForm.question,
								onChange: (e) => setFaqForm({
									...faqForm,
									question: e.target.value
								}),
								placeholder: "Question",
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: faqForm.category,
								onChange: (e) => setFaqForm({
									...faqForm,
									category: e.target.value
								}),
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full",
								children: [
									"General",
									"Orders",
									"Shipping",
									"Returns",
									"Product",
									"Payment"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: faqForm.answer,
							onChange: (e) => setFaqForm({
								...faqForm,
								answer: e.target.value
							}),
							placeholder: "Answer",
							rows: 3,
							className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full resize-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [editingFaqId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: resetFaqForm,
								className: "rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveFaq,
								disabled: !faqForm.question.trim() || !faqForm.answer.trim(),
								className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: editingFaqId ? "Update" : "Add FAQ"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-chrome/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-left px-5 py-4",
									children: "Question"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-left px-5 py-4",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-right px-5 py-4",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: faqs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 3,
							className: "px-5 py-10 text-center font-mono text-[11px] text-chrome-dim",
							children: "No FAQs yet"
						}) }) : faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-chrome/10 hover:bg-chrome/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] text-foreground",
										children: faq.question
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[9px] text-chrome-dim mt-0.5 line-clamp-1",
										children: faq.answer
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
										children: faq.category
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => startEditFaq(faq),
											className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeFaq({ id: faq._id }),
											className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, faq._id)) })]
					})
				})
			]
		})]
	}) });
}
//#endregion
export { Content as component };
