import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Eye, R as Download, U as ChevronRight, W as ChevronLeft, g as Search, t as X } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-Bztq9OEq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusOptions = [
	"All",
	"Active",
	"Inactive"
];
var dateOptions = [
	"All Time",
	"Past Month",
	"Past 3 Months",
	"Past Year"
];
var PAGE_SIZE = 5;
function isWithinMonths(dateStr, months) {
	const d = new Date(dateStr);
	const cutoff = /* @__PURE__ */ new Date();
	cutoff.setMonth(cutoff.getMonth() - months);
	return d >= cutoff;
}
function Customers() {
	const customers = useQuery(api.customers.list) ?? [];
	const [search, setSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(0);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("All Time");
	const [minSpend, setMinSpend] = (0, import_react.useState)("");
	const [maxSpend, setMaxSpend] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		return customers.filter((c) => {
			const q = search.toLowerCase();
			const joined = new Date(c.createdAt).toISOString().split("T")[0];
			if (q && !c.name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q)) return false;
			if (statusFilter !== "All" && c.status !== statusFilter) return false;
			if (dateFilter === "Past Month" && !isWithinMonths(joined, 1)) return false;
			if (dateFilter === "Past 3 Months" && !isWithinMonths(joined, 3)) return false;
			if (dateFilter === "Past Year" && !isWithinMonths(joined, 12)) return false;
			const min = minSpend ? parseFloat(minSpend) : 0;
			const max = maxSpend ? parseFloat(maxSpend) : Infinity;
			if (c.totalSpent < min || c.totalSpent > max) return false;
			return true;
		});
	}, [
		customers,
		search,
		statusFilter,
		dateFilter,
		minSpend,
		maxSpend
	]);
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
	const hasActiveFilters = statusFilter !== "All" || dateFilter !== "All Time" || minSpend || maxSpend;
	function clearFilters() {
		setStatusFilter("All");
		setDateFilter("All Time");
		setMinSpend("");
		setMaxSpend("");
		setPage(0);
	}
	function removeStatusFilter() {
		setStatusFilter("All");
		setPage(0);
	}
	function removeDateFilter() {
		setDateFilter("All Time");
		setPage(0);
	}
	function removeSpendFilter() {
		setMinSpend("");
		setMaxSpend("");
		setPage(0);
	}
	function exportCSV() {
		const headers = [
			"Name",
			"Email",
			"Orders",
			"Total Spent",
			"Joined",
			"Status"
		];
		const rows = filtered.map((c) => [
			c.name,
			c.email,
			c.totalOrders.toString(),
			c.totalSpent.toFixed(2),
			new Date(c.createdAt).toISOString().split("T")[0],
			c.status
		]);
		const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "customers.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Customers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: customers.length
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search by name or email...",
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setPage(0);
						},
						className: "w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-chrome/40"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: exportCSV,
					className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export CSV"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					statusOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setStatusFilter(s);
							setPage(0);
						},
						className: `rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${statusFilter === s ? "bg-chrome/20 text-foreground border-chrome/30" : "bg-transparent text-muted-foreground border-chrome/20 hover:text-foreground"}`,
						children: s
					}, s)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px h-5 bg-chrome/20 mx-1" }),
					dateOptions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setDateFilter(d);
							setPage(0);
						},
						className: `rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${dateFilter === d ? "bg-chrome/20 text-foreground border-chrome/30" : "bg-transparent text-muted-foreground border-chrome/20 hover:text-foreground"}`,
						children: d
					}, d)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px h-5 bg-chrome/20 mx-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Min $"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: minSpend,
								onChange: (e) => {
									setMinSpend(e.target.value);
									setPage(0);
								},
								className: "w-20 rounded-lg bg-graphite border border-chrome/20 px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-chrome/40"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Max $"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: maxSpend,
								onChange: (e) => {
									setMaxSpend(e.target.value);
									setPage(0);
								},
								className: "w-20 rounded-lg bg-graphite border border-chrome/20 px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-chrome/40"
							})
						]
					})
				]
			}),
			hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-xs",
				children: [
					statusFilter !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
						children: [
							"Status: ",
							statusFilter,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: removeStatusFilter,
								className: "hover:text-red-400 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
							})
						]
					}),
					(minSpend || maxSpend) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
						children: [
							"Spent: $",
							minSpend || "0",
							"-$",
							maxSpend || "∞",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: removeSpendFilter,
								className: "hover:text-red-400 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
							})
						]
					}),
					dateFilter !== "All Time" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground",
						children: [
							"Joined: ",
							dateFilter,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: removeDateFilter,
								className: "hover:text-red-400 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clearFilters,
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2",
						children: "Clear All"
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
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Total Spent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Joined"
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
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: paged.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10 hover:bg-chrome/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium text-foreground",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: c.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right text-muted-foreground",
								children: c.totalOrders
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right text-foreground",
								children: ["PKR ", c.totalSpent.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: new Date(c.createdAt).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), c.status]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/customer/$id",
									params: { id: c._id },
									className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							})
						]
					}, c._id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3",
				children: paged.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-current" }), c.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: c.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [c.totalOrders, " orders"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground font-semibold",
								children: ["PKR ", c.totalSpent.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Joined ", new Date(c.createdAt).toLocaleDateString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/customer/$id",
								params: { id: c._id },
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 mr-1 inline" }), " View"]
							})]
						})
					]
				}, c._id))
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
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
export { Customers as component };
