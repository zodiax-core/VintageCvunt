import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as getSessionToken } from "./admin-D4iRQZfC.mjs";
import { C as Reply, d as Trash2, lt as ChevronLeft, z as MailOpen } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-CEycyE9k.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-CUP9yHvC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/message-dgvoKmvL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"All",
	"Unread",
	"Read",
	"Replied"
];
var statusStyles = {
	Unread: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Read: "bg-green-500/20 text-green-400 border-green-500/30",
	Replied: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};
function Messages() {
	const messages = useQuery(api.messages.list, { sessionToken: getSessionToken() ?? "" }) ?? [];
	const markRead = useMutation(api.messages.markRead);
	const markReplied = useMutation(api.messages.markReplied);
	const removeMessage = useMutation(api.messages.remove);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	function displayStatus(m) {
		if (m.replied) return "Replied";
		if (m.status === "read") return "Read";
		return "Unread";
	}
	const unreadCount = messages.filter((m) => displayStatus(m) === "Unread").length;
	const filtered = filter === "All" ? messages : messages.filter((m) => displayStatus(m) === filter);
	function handleDelete(id) {
		removeMessage({
			sessionToken: getSessionToken() ?? "",
			id
		});
		if (selected?._id === id) setSelected(null);
		setDeleteTarget(null);
	}
	function handleMarkRead(id) {
		markRead({
			sessionToken: getSessionToken() ?? "",
			id
		});
	}
	function handleReply() {
		if (!replyText.trim() || !selected) return;
		markReplied({
			sessionToken: getSessionToken() ?? "",
			id: selected._id
		});
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
							children: new Date(selected.createdAt).toLocaleDateString()
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: displayStatus(selected) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-chrome/20 pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[12px] leading-relaxed text-foreground/80",
						children: selected.message
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
							onClick: () => setDeleteTarget(selected._id),
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
							handleMarkRead(msg._id);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: displayStatus(msg) }) }),
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
								children: new Date(msg.createdAt).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSelected(msg);
											handleMarkRead(msg._id);
										},
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDeleteTarget(msg._id),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, msg._id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3",
				children: filtered.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3 cursor-pointer",
					onClick: () => {
						setSelected(msg);
						handleMarkRead(msg._id);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground text-sm",
								children: msg.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: displayStatus(msg) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground truncate",
							children: msg.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: msg.email }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(msg.createdAt).toLocaleDateString() })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setSelected(msg);
									handleMarkRead(msg._id);
								},
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-3.5 w-3.5 mr-1 inline" }), " Read"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: (e) => {
									e.stopPropagation();
									setDeleteTarget(msg._id);
								},
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 mr-1 inline" }), " Delete"]
							})]
						})
					]
				}, msg._id))
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
