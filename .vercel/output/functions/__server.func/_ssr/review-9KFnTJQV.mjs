import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { ct as Check, d as Trash2, rt as CircleX, t as X, x as Search } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BQ75gQdN.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-CUP9yHvC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-9KFnTJQV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	Approved: "bg-green-500/20 text-green-400 border-green-500/30",
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Rejected: "bg-red-500/20 text-red-400 border-red-500/30"
};
var ratingOptions = [
	5,
	4,
	3,
	2,
	1
];
var statusOptions = [
	"Approved",
	"Pending",
	"Rejected"
];
function StarDisplay({ rating }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-amber-400 font-mono text-sm",
		children: Array.from({ length: 5 }, (_, i) => i < rating ? "★" : "☆").join("")
	});
}
function Reviews() {
	const reviews = useQuery(api.reviews.list) ?? [];
	const updateStatus = useMutation(api.reviews.updateStatus);
	const removeReview = useMutation(api.reviews.remove);
	const [search, setSearch] = (0, import_react.useState)("");
	const [ratingFilter, setRatingFilter] = (0, import_react.useState)(null);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	function handleDelete(id) {
		removeReview({ id });
		setDeleteTarget(null);
	}
	const filtered = reviews.filter((r) => {
		const matchesSearch = (r.productId ?? "").toLowerCase().includes(search.toLowerCase()) || r.customerName.toLowerCase().includes(search.toLowerCase());
		const matchesRating = ratingFilter === null || r.rating === ratingFilter;
		const matchesStatus = statusFilter === null || r.status === statusFilter;
		return matchesSearch && matchesRating && matchesStatus;
	});
	function StatusBadge({ status }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
		});
	}
	const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
	const pendingCount = reviews.filter((r) => r.status === "Pending").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl md:text-2xl font-display",
					children: "Reviews"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
					children: "Manage customer feedback"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl mb-1",
							children: [avgRating, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-400 ml-2",
								children: "★"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Avg Rating"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl mb-1",
							children: reviews.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Total Reviews"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl mb-1 text-yellow-400",
							children: pendingCount
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Pending"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl border border-chrome/20 bg-graphite px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 14,
								className: "text-chrome-dim shrink-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search by product or customer...",
								className: "flex-1 bg-transparent font-mono text-[12px] outline-none placeholder:text-chrome-dim/50 text-foreground"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearch(""),
								className: "text-chrome-dim hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 14 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRatingFilter(null),
							className: `rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${ratingFilter === null ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
							children: "All"
						}), ratingOptions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setRatingFilter(ratingFilter === r ? null : r),
							className: `rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${ratingFilter === r ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
							children: [r, "★"]
						}, r))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStatusFilter(null),
							className: `rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${statusFilter === null ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
							children: "All"
						}), statusOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStatusFilter(statusFilter === s ? null : s),
							className: `rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${statusFilter === s ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
							children: s
						}, s))]
					}),
					(ratingFilter !== null || statusFilter !== null) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							ratingFilter !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-chrome/10 border border-chrome/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
								children: [
									"Rating: ",
									ratingFilter,
									"★",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setRatingFilter(null),
										className: "hover:text-foreground/70",
										children: "×"
									})
								]
							}),
							statusFilter !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-chrome/10 border border-chrome/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
								children: [
									"Status: ",
									statusFilter,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setStatusFilter(null),
										className: "hover:text-foreground/70",
										children: "×"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setRatingFilter(null);
									setStatusFilter(null);
								},
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground underline underline-offset-2",
								children: "Clear All"
							})
						]
					})
				]
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
								children: "Product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Rating"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Content"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10 hover:bg-chrome/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium text-foreground",
								children: review.productId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: review.customerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarDisplay, { rating: review.rating }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground max-w-[200px] truncate",
								children: review.comment
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: new Date(review.createdAt).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: review.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									children: [
										review.status !== "Approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateStatus({
												id: review._id,
												status: "Approved"
											}),
											className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-green-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
										}),
										review.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateStatus({
												id: review._id,
												status: "Rejected"
											}),
											className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setDeleteTarget(review._id),
											className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})
									]
								})
							})
						]
					}, review._id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3",
				children: filtered.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground text-sm",
								children: review.productId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: review.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: review.customerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarDisplay, { rating: review.rating }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-2",
							children: review.comment
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: new Date(review.createdAt).toLocaleDateString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [
								review.status !== "Approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => updateStatus({
										id: review._id,
										status: "Approved"
									}),
									className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-green-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 mr-1 inline" }), " Approve"]
								}),
								review.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => updateStatus({
										id: review._id,
										status: "Rejected"
									}),
									className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1 inline" }), " Reject"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setDeleteTarget(review._id),
									className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 mr-1 inline" }), " Delete"]
								})
							]
						})
					]
				}, review._id))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: deleteTarget !== null,
		onClose: () => setDeleteTarget(null),
		onConfirm: () => deleteTarget !== null && handleDelete(deleteTarget),
		title: "Delete Review",
		message: "Are you sure you want to delete this review?"
	})] });
}
//#endregion
export { Reviews as component };
