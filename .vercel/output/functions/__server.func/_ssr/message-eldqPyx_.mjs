import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as ChevronLeft, _ as Reply, c as Trash2, k as MailOpen } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-CUP9yHvC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/message-eldqPyx_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"All",
	"Unread",
	"Read",
	"Replied"
];
var mockMessages = [
	{
		id: 1,
		name: "Elena Voss",
		email: "elena@example.com",
		subject: "Order #ORD-1001 sizing question",
		date: "2026-07-20",
		body: "Hi, I recently ordered the Obsidian Tailcoat in size M but I'm concerned it might be too tight in the shoulders. Can you advise on the measurements? I usually wear a 40R in suit jackets. Thank you!",
		status: "Unread"
	},
	{
		id: 2,
		name: "Marcus Webb",
		email: "marcus@example.com",
		subject: "Return request for Noir Leather Boots",
		date: "2026-07-20",
		body: "I received my Noir Leather Boots today but they are too small. I ordered size 10 but they fit like a 9.5. I'd like to initiate a return and exchange for size 11 if possible. Please let me know the process.",
		status: "Unread"
	},
	{
		id: 3,
		name: "Clara Hemlock",
		email: "clara@example.com",
		subject: "Discount code not working",
		date: "2026-07-19",
		body: "I tried applying code WELCOME20 at checkout but it says the code has expired. I thought it was valid until end of July? Can you please look into this or issue a new code? Thanks!",
		status: "Read"
	},
	{
		id: 4,
		name: "Julian Frost",
		email: "julian@example.com",
		subject: "Custom embroidered cufflinks inquiry",
		date: "2026-07-19",
		body: "I'm interested in commissioning a pair of custom embroidered cufflinks with my family crest. Do you offer custom design services? If so, what is the turnaround time and pricing? I've attached a reference image.",
		status: "Replied"
	},
	{
		id: 5,
		name: "Sylvia Kaine",
		email: "sylvia@example.com",
		subject: "International shipping to Australia",
		date: "2026-07-18",
		body: "Do you ship to Australia? I'd like to place a fairly large order (approx 6 items) but want to confirm shipping costs and estimated delivery times before I commit. Thank you!",
		status: "Unread"
	},
	{
		id: 6,
		name: "Dorian Ashford",
		email: "dorian@example.com",
		subject: "Missing item from order",
		date: "2026-07-18",
		body: "My order #ORD-1006 arrived today but one item is missing. I ordered the Chrome Signet Ring and Silver Mesh Veil but only the ring was in the package. Please help.",
		status: "Unread"
	},
	{
		id: 7,
		name: "Priya Nair",
		email: "priya@example.com",
		subject: "Wedding party bulk discount",
		date: "2026-07-17",
		body: "I'm organizing a wedding and we need 8 tailcoats and matching accessories. Do you offer bulk or wedding party discounts? The wedding is in October so we have some time.",
		status: "Read"
	},
	{
		id: 8,
		name: "Leo Ventura",
		email: "leo@example.com",
		subject: "Material composition question",
		date: "2026-07-16",
		body: "Could you tell me the exact material composition of the Argentine Cuff? The listing says 'premium metal alloy' but I'd like specifics — is it nickel-free? I have sensitive skin.",
		status: "Replied"
	},
	{
		id: 9,
		name: "Wren Calloway",
		email: "wren@example.com",
		subject: "Gift wrapping options",
		date: "2026-07-15",
		body: "Do you offer gift wrapping services? I want to send a pair of cufflinks as a birthday gift and would love to have it nicely wrapped with a personalized note.",
		status: "Read"
	},
	{
		id: 10,
		name: "Morgan Thorne",
		email: "morgan@example.com",
		subject: "Exchange size for tailcoat",
		date: "2026-07-14",
		body: "I bought the Obsidian Tailcoat in size L but it's slightly too big. Can I exchange it for size M? It's unworn with tags still attached. Please advise on the exchange process.",
		status: "Unread"
	}
];
var statusStyles = {
	Unread: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Read: "bg-green-500/20 text-green-400 border-green-500/30",
	Replied: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};
function Messages() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [messages, setMessages] = (0, import_react.useState)(mockMessages);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const unreadCount = messages.filter((m) => m.status === "Unread").length;
	const filtered = filter === "All" ? messages : messages.filter((m) => m.status === filter);
	function handleDelete(id) {
		setMessages((prev) => prev.filter((m) => m.id !== id));
		if (selected?.id === id) setSelected(null);
		setDeleteTarget(null);
	}
	function handleMarkRead(id) {
		setMessages((prev) => prev.map((m) => m.id === id ? {
			...m,
			status: "Read"
		} : m));
	}
	function handleReply() {
		if (!replyText.trim() || !selected) return;
		setMessages((prev) => prev.map((m) => m.id === selected.id ? {
			...m,
			status: "Replied"
		} : m));
		setSelected((prev) => prev ? {
			...prev,
			status: "Replied"
		} : null);
		setReplyText("");
	}
	function StatusBadge({ status }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
		});
	}
	if (selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				setSelected(null);
				setReplyText("");
			},
			className: "btn-chrome btn-chrome-inner rounded-lg px-3 py-2 inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "btn-label",
				children: "Back"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-display mb-1",
							children: selected.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-chrome-dim",
							children: [
								"From: ",
								selected.name,
								" <",
								selected.email,
								">"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] text-chrome-dim",
							children: selected.date
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selected.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-chrome/20 pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[12px] leading-relaxed text-foreground/80",
						children: selected.body
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-chrome/20 pt-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: replyText,
						onChange: (e) => setReplyText(e.target.value),
						placeholder: "Type your reply...",
						rows: 4,
						className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 resize-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleReply,
							disabled: !replyText.trim(),
							className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2 disabled:opacity-30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Send Reply"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setDeleteTarget(selected.id),
							className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2 text-red-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Delete"
							})]
						})]
					})]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: deleteTarget !== null,
		onClose: () => setDeleteTarget(null),
		onConfirm: () => deleteTarget !== null && handleDelete(deleteTarget),
		title: "Delete Message",
		message: "Are you sure you want to delete this message?"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Messages"
				}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]",
					children: [unreadCount, " unread"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit",
				children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFilter(f),
					className: `rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${filter === f ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
					children: [
						f,
						" ",
						f === "All" ? `(${messages.length})` : ""
					]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Subject"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10 hover:bg-chrome/5 cursor-pointer",
						onClick: () => {
							setSelected(msg);
							handleMarkRead(msg.id);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: msg.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium text-foreground",
								children: msg.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: msg.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground max-w-[200px] truncate",
								children: msg.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: msg.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSelected(msg);
											handleMarkRead(msg.id);
										},
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDeleteTarget(msg.id),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, msg.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3",
				children: filtered.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3 cursor-pointer",
					onClick: () => {
						setSelected(msg);
						handleMarkRead(msg.id);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground text-sm",
								children: msg.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: msg.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground truncate",
							children: msg.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: msg.email }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: msg.date })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setSelected(msg);
									handleMarkRead(msg.id);
								},
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-3.5 w-3.5 mr-1 inline" }), " Read"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setDeleteTarget(msg.id);
								},
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 mr-1 inline" }), " Delete"]
							})]
						})
					]
				}, msg.id))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: deleteTarget !== null,
		onClose: () => setDeleteTarget(null),
		onConfirm: () => deleteTarget !== null && handleDelete(deleteTarget),
		title: "Delete Message",
		message: "Are you sure you want to delete this message?"
	})] });
}
//#endregion
export { Messages as component };
