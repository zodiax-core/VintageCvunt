import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { J as ArrowUpRight, L as DollarSign, n as Users, p as ShoppingBag, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-CcKRSB9e.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BhqFQvf8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ranges = [
	"7D",
	"30D",
	"12M"
];
var productsMap = {
	"7D": [
		{
			name: "Obsidian Tailcoat",
			sales: 48
		},
		{
			name: "Argentine Cuff",
			sales: 41
		},
		{
			name: "Noir Leather Boots",
			sales: 35
		},
		{
			name: "Silver Mesh Veil",
			sales: 27
		},
		{
			name: "Chrome Signet Ring",
			sales: 22
		}
	],
	"30D": [
		{
			name: "Obsidian Tailcoat",
			sales: 186
		},
		{
			name: "Argentine Cuff",
			sales: 152
		},
		{
			name: "Noir Leather Boots",
			sales: 138
		},
		{
			name: "Silver Mesh Veil",
			sales: 104
		},
		{
			name: "Chrome Signet Ring",
			sales: 91
		}
	],
	"12M": [
		{
			name: "Obsidian Tailcoat",
			sales: 2140
		},
		{
			name: "Argentine Cuff",
			sales: 1820
		},
		{
			name: "Noir Leather Boots",
			sales: 1650
		},
		{
			name: "Silver Mesh Veil",
			sales: 1290
		},
		{
			name: "Chrome Signet Ring",
			sales: 1140
		}
	]
};
function Analytics() {
	const [range, setRange] = (0, import_react.useState)("30D");
	const allOrders = useQuery(api.orders.list) ?? [];
	const globalStats = (0, import_react.useMemo)(() => {
		return {
			totalRevenue: allOrders.reduce((sum, o) => sum + o.total, 0),
			totalOrders: allOrders.length
		};
	}, [allOrders]);
	const chartData = (0, import_react.useMemo)(() => {
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
	}, [allOrders]).map((m) => ({
		month: m.month,
		revenue: m.revenue,
		orders: 0,
		customers: 0
	}));
	const labelKey = "month";
	const products = productsMap[range];
	const kpis = [
		{
			label: "Revenue",
			value: globalStats ? `$${globalStats.totalRevenue.toLocaleString()}` : "$0",
			icon: DollarSign
		},
		{
			label: "Orders",
			value: globalStats ? globalStats.totalOrders.toLocaleString() : "0",
			icon: ShoppingBag
		},
		{
			label: "Customers",
			value: "892",
			icon: Users
		},
		{
			label: "Conversion",
			value: "3.24%",
			icon: TrendingUp
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl md:text-2xl font-display",
						children: "Analytics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Performance overview"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1",
					children: ranges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setRange(r),
						className: `rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${range === r ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
						children: r
					}, r))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: kpis.map((kpi) => {
					const Icon = kpi.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 18,
									className: "text-chrome-dim"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-400 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 10 }), " +12.3%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl mb-1",
								children: kpi.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: kpi.label
							})
						]
					}, kpi.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
						children: "Revenue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
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
										dataKey: labelKey,
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
						children: "Orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: chartData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "oklch(0.3 0 240 / 0.5)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: labelKey,
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "orders",
										fill: "oklch(0.7 0.008 240)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
						children: "Top Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: products,
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "oklch(0.3 0 240 / 0.5)",
										horizontal: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										stroke: "oklch(0.55 0.008 240)",
										tick: {
											fontSize: 10,
											fontFamily: "JetBrains Mono"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										dataKey: "name",
										type: "category",
										stroke: "oklch(0.55 0.008 240)",
										tick: {
											fontSize: 10,
											fontFamily: "JetBrains Mono"
										},
										width: 140
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "oklch(0.1 0.005 240)",
										border: "1px solid oklch(0.72 0.008 240 / 0.35)",
										borderRadius: "12px",
										fontSize: "11px",
										fontFamily: "JetBrains Mono"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "sales",
										fill: "oklch(0.8 0.008 240)",
										radius: [
											0,
											4,
											4,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
						children: "Customer Growth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: chartData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "oklch(0.3 0 240 / 0.5)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: labelKey,
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "customerGrad",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "oklch(0.7 0.008 240)",
											stopOpacity: .3
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "oklch(0.7 0.008 240)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "customers",
										stroke: "oklch(0.7 0.008 240)",
										fill: "url(#customerGrad)",
										strokeWidth: 2
									})
								]
							})
						})
					})]
				})]
			})
		]
	}) });
}
//#endregion
export { Analytics as component };
