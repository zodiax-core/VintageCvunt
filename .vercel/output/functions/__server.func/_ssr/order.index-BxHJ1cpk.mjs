import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as FileText, I as Eye, K as Check, U as ChevronRight, W as ChevronLeft, d as SquareCheckBig, f as SlidersHorizontal, g as Search, t as X } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { n as generateDetailedOrdersPDF } from "./pdf-utils-JH9XGotu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order.index-BxHJ1cpk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusList = [
	"Pending",
	"Processing",
	"Shipped",
	"Delivered",
	"Cancelled"
];
var dateRanges = [
	{
		key: "all",
		label: "All Time"
	},
	{
		key: "today",
		label: "Today"
	},
	{
		key: "week",
		label: "This Week"
	},
	{
		key: "month",
		label: "This Month"
	}
];
var dateRangeLabel = {
	all: "All Time",
	today: "Today",
	week: "This Week",
	month: "This Month"
};
var statusColors = {
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
	Cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};
var PAGE_SIZE = 5;
function Orders() {
	const orders = useQuery(api.orders.list) ?? [];
	const settings = useQuery(api.settings.get);
	const updateOrder = useMutation(api.orders.update);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [dateRangeFilter, setDateRangeFilter] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(0);
	const [showMobileFilters, setShowMobileFilters] = (0, import_react.useState)(false);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [bulkStatus, setBulkStatus] = (0, import_react.useState)("");
	const statusCounts = (0, import_react.useMemo)(() => {
		const counts = {};
		for (const o of orders) counts[o.status] = (counts[o.status] || 0) + 1;
		return counts;
	}, [orders]);
	const latestDate = (0, import_react.useMemo)(() => {
		if (orders.length === 0) return /* @__PURE__ */ new Date();
		return new Date(Math.max(...orders.map((o) => new Date(o.createdAt).getTime())));
	}, [orders]);
	function matchesDateRange(dateStr, range) {
		if (range === "all") return true;
		const d = new Date(dateStr);
		const ref = new Date(latestDate);
		if (range === "today") return dateStr === ref.toISOString().split("T")[0];
		if (range === "week") {
			const diffToMonday = (ref.getDay() + 6) % 7;
			const monday = new Date(ref);
			monday.setDate(ref.getDate() - diffToMonday);
			const sunday = new Date(monday);
			sunday.setDate(monday.getDate() + 6);
			return d >= new Date(monday.setHours(0, 0, 0, 0)) && d <= new Date(sunday.setHours(23, 59, 59, 999));
		}
		if (range === "month") return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
		return true;
	}
	const filtered = (0, import_react.useMemo)(() => {
		return orders.filter((o) => {
			const dateStr = new Date(o.createdAt).toISOString().split("T")[0];
			const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
			const matchStatus = statusFilter === "All" || o.status === statusFilter;
			const matchDate = matchesDateRange(dateStr, dateRangeFilter);
			return matchSearch && matchStatus && matchDate;
		});
	}, [
		orders,
		search,
		statusFilter,
		dateRangeFilter
	]);
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
	const allSelected = paged.length > 0 && paged.every((o) => selectedIds.has(o._id));
	function toggleSelect(id) {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}
	function toggleSelectAll() {
		if (allSelected) setSelectedIds(/* @__PURE__ */ new Set());
		else setSelectedIds(new Set(paged.map((o) => o._id)));
	}
	async function handleBulkUpdate() {
		if (!bulkStatus || selectedIds.size === 0) return;
		for (const id of selectedIds) await updateOrder({
			id,
			status: bulkStatus
		});
		setSelectedIds(/* @__PURE__ */ new Set());
		setBulkStatus("");
	}
	function StatusBadge({ status }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[status] || ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl md:text-2xl font-display",
					children: "Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
					children: orders.length
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-chrome-dim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search orders...",
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setPage(0);
						},
						className: "w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-chrome-dim focus:outline-none focus:border-chrome/40"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => generateDetailedOrdersPDF(filtered, settings ? {
							name: settings.storeName,
							tagline: "Objects / Chrome / Bone",
							address: "Karachi, Pakistan",
							phone: "+92 21 1123 4567",
							email: settings.storeEmail
						} : void 0),
						className: "btn-chrome btn-chrome-inner btn-chrome-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: "Download PDF"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowMobileFilters(!showMobileFilters),
						className: "md:hidden btn-chrome btn-chrome-inner btn-chrome-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: showMobileFilters ? "Hide Filters" : "Show Filters"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${showMobileFilters ? "flex" : "hidden"} md:flex flex-col gap-3 no-print`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setStatusFilter("All");
							setPage(0);
						},
						className: `rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${statusFilter === "All" ? "bg-chrome/20 text-foreground border-chrome/40" : "text-chrome-dim border-transparent hover:border-chrome/20"}`,
						children: [
							"All (",
							orders.length,
							")"
						]
					}), statusList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setStatusFilter(s);
							setPage(0);
						},
						className: `rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${statusFilter === s ? "bg-chrome/20 text-foreground border-chrome/40" : "text-chrome-dim border-transparent hover:border-chrome/20"}`,
						children: [
							s,
							" (",
							statusCounts[s] || 0,
							")"
						]
					}, s))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: dateRanges.map((dr) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setDateRangeFilter(dr.key);
							setPage(0);
						},
						className: `rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${dateRangeFilter === dr.key ? "bg-chrome/20 text-foreground border-chrome/40" : "text-chrome-dim border-transparent hover:border-chrome/20"}`,
						children: dr.label
					}, dr.key))
				})]
			}),
			(statusFilter !== "All" || dateRangeFilter !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 no-print",
				children: [
					statusFilter !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-3 py-1 font-mono text-[10px] text-foreground",
						children: [statusFilter, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setStatusFilter("All");
								setPage(0);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
						})]
					}),
					dateRangeFilter !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-3 py-1 font-mono text-[10px] text-foreground",
						children: [dateRangeLabel[dateRangeFilter], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setDateRangeFilter("all");
								setPage(0);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setStatusFilter("All");
							setDateRangeFilter("all");
							setPage(0);
						},
						className: "font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors",
						children: "Clear All"
					})
				]
			}),
			selectedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 p-3 bg-graphite border border-chrome/20 rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
						children: [selectedIds.size, " selected"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: bulkStatus,
						onChange: (e) => setBulkStatus(e.target.value),
						className: "rounded-xl bg-background border border-chrome/20 px-3 py-1.5 font-mono text-[10px] text-foreground focus:outline-none focus:border-chrome/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Change status to..."
						}), statusList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleBulkUpdate,
						disabled: !bulkStatus,
						className: "btn-chrome btn-chrome-inner btn-chrome-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: "Apply"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setSelectedIds(/* @__PURE__ */ new Set());
							setBulkStatus("");
						},
						className: "font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors ml-auto",
						children: "Clear"
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
								className: "w-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: toggleSelectAll,
									className: "flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
										size: 14,
										className: allSelected ? "text-foreground" : "text-chrome-dim"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Items"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: paged.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: `border-chrome/10 hover:bg-chrome/5 ${selectedIds.has(o._id) ? "bg-chrome/10" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleSelect(o._id),
								className: "flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
									size: 14,
									className: selectedIds.has(o._id) ? "text-foreground" : "text-chrome-dim/40"
								})
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium text-foreground",
								children: o.orderNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-chrome-dim",
								children: o.customerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-chrome-dim",
								children: new Date(o.createdAt).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-chrome-dim",
								children: o.items.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-foreground",
								children: ["PKR ", o.total.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/order/$id",
									params: { id: o._id },
									className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							})
						]
					}, o._id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3 no-print",
				children: paged.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleSelect(o._id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
										size: 14,
										className: selectedIds.has(o._id) ? "text-foreground" : "text-chrome-dim/40"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: o.orderNumber
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-chrome-dim",
							children: o.customerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-chrome-dim",
								children: [
									new Date(o.createdAt).toLocaleDateString(),
									" · ",
									o.items.length,
									" items"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground font-semibold",
								children: ["PKR ", o.total.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/order/$id",
								params: { id: o._id },
								className: "btn-chrome btn-chrome-inner btn-chrome-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), " View"]
							})
						})
					]
				}, o._id))
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-chrome-dim",
					children: [
						"Page ",
						page + 1,
						" of ",
						totalPages
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: page === 0,
						onClick: () => setPage(page - 1),
						className: "btn-chrome btn-chrome-inner p-2 rounded-lg disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: page >= totalPages - 1,
						onClick: () => setPage(page + 1),
						className: "btn-chrome btn-chrome-inner p-2 rounded-lg disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
					})]
				})]
			})
		]
	}) });
}
//#endregion
export { Orders as component };
