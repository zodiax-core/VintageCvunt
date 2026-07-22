import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-DSJLF2wo.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as DollarSign, J as ArrowDownRight, K as ArrowUpRight, T as Package, U as ChartColumn, b as Plus, f as ShoppingBag, n as Users, s as TrendingUp, x as Percent } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BpZEQ1YZ.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, r as LineChart, s as Line, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-N7SKpSBg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ranges = [
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
	},
	{
		key: "quarter",
		label: "This Quarter"
	}
];
var chartLabels = {
	today: "Revenue (Today — Hourly)",
	week: "Revenue (This Week — Daily)",
	month: "Revenue (This Month — Weekly)",
	quarter: "Revenue (This Quarter — Monthly)"
};
var formatDate = (ts) => new Date(ts).toLocaleDateString("en-PK", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});
function statusBadge(status) {
	const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
	const styles = {
		Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
		Shipped: "bg-green-500/10 text-green-400 border-green-500/20",
		Processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
		Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
		Cancelled: "bg-red-500/10 text-red-400 border-red-500/20"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${base} ${styles[status] || styles.Pending}`,
		children: status
	});
}
function AdminDashboard() {
	const [range, setRange] = (0, import_react.useState)("week");
	const allOrders = useQuery(api.orders.list) ?? [];
	const stats = (0, import_react.useMemo)(() => {
		const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
		const totalOrders = allOrders.length;
		return {
			totalRevenue,
			totalOrders,
			pendingOrders: allOrders.filter((o) => o.status === "pending" || o.status === "processing").length,
			averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
		};
	}, [allOrders]);
	const monthlyRevenue = (0, import_react.useMemo)(() => {
		const byMonth = {};
		for (const order of allOrders) {
			const d = new Date(order.createdAt);
			const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
			byMonth[key] = (byMonth[key] || 0) + order.total;
		}
		return Object.entries(byMonth).sort(([a], [b]) => a.localeCompare(b)).map(([month, revenue]) => ({
			month,
			revenue
		}));
	}, [allOrders]);
	const recentOrders = allOrders.slice(0, 5).map((o) => ({
		id: o.orderNumber,
		customer: o.customerName,
		date: formatDate(o.createdAt),
		status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
		total: "PKR " + o.total.toLocaleString("en-PK")
	}));
	const productSales = {};
	for (const o of allOrders) for (const item of o.items) productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
	const topProducts = Object.entries(productSales).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, sales], i) => ({
		rank: i + 1,
		name,
		sales
	}));
	const chartData = monthlyRevenue.map((m) => ({
		label: m.month,
		revenue: m.revenue
	}));
	const chartLabel = chartLabels[range];
	const statCards = [
		{
			label: "Total Revenue",
			value: stats ? `PKR ${stats.totalRevenue.toLocaleString("en-PK")}` : "PKR 0",
			trend: "+12.3%",
			up: true,
			icon: DollarSign
		},
		{
			label: "Orders",
			value: stats ? stats.totalOrders.toLocaleString() : "0",
			trend: "+8.1%",
			up: true,
			icon: ShoppingBag
		},
		{
			label: "Pending Orders",
			value: stats ? stats.pendingOrders.toLocaleString() : "0",
			trend: "+5.7%",
			up: true,
			icon: Package
		},
		{
			label: "Avg Order Value",
			value: stats ? `PKR ${Math.round(stats.averageOrderValue).toLocaleString("en-PK")}` : "PKR 0",
			trend: "-2.1%",
			up: false,
			icon: TrendingUp
		},
		{
			label: "Products",
			value: "156",
			trend: "+3.2%",
			up: true,
			icon: Users
		},
		{
			label: "Conversion Rate",
			value: "3.24%",
			trend: "+0.8%",
			up: true,
			icon: Percent
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: "Welcome back, Admin"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-1 mb-6 p-1 bg-graphite border border-chrome/20 rounded-2xl w-fit",
			children: ranges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setRange(r.key),
				className: `px-4 py-2 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${range === r.key ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
				children: r.label
			}, r.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6",
			children: statCards.map((card) => {
				const Icon = card.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 18,
								className: "text-chrome-dim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${card.up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`,
									children: [card.up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 10 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 10 }), card.trend]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[8px] text-chrome-dim/60 mt-0.5",
									children: "vs previous period"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl mb-1",
							children: card.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: card.label
						})
					]
				}, card.label);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
					children: chartLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: chartData,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "oklch(0.3 0 240 / 0.5)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									stroke: "oklch(0.55 0.008 240)",
									tick: {
										fontSize: 10,
										fontFamily: "JetBrains Mono"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "oklch(0.55 0.008 240)",
									tick: {
										fontSize: 10,
										fontFamily: "JetBrains Mono"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "oklch(0.1 0.005 240)",
										border: "1px solid oklch(0.72 0.008 240 / 0.35)",
										borderRadius: "12px",
										fontSize: "11px",
										fontFamily: "JetBrains Mono"
									},
									labelStyle: { color: "oklch(0.86 0.008 240)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "revenue",
									stroke: "oklch(0.86 0.008 240)",
									strokeWidth: 2,
									dot: { fill: "oklch(0.86 0.008 240)" }
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
					children: "Top Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: topProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[9px] text-chrome-dim w-4",
								children: product.rank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] truncate",
									children: product.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-chrome-dim",
								children: product.sales
							})
						]
					}, product.rank))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
				children: "Recent Orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Order ID"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Customer"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Date"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Status"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Total"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: recentOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px]",
					children: order.id
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px]",
					children: order.customer
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-chrome-dim",
					children: order.date
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: statusBadge(order.status) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: order.total
					})
				})
			] }, order.id)) })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/new",
					className: "btn-chrome btn-chrome-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-label",
						children: "Add Product"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/order",
					className: "btn-chrome btn-chrome-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-label",
						children: "View Orders"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/analytics",
					className: "btn-chrome btn-chrome-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-label",
						children: "View Analytics"
					})]
				})
			]
		})
	] });
}
//#endregion
export { AdminDashboard as component };
