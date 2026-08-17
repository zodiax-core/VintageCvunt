import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as getSessionToken } from "./admin-D4iRQZfC.mjs";
import { et as DollarSign, g as ShoppingBag, l as TrendingUp, r as Users } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-CEycyE9k.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-DLXqQhY7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ranges = [
	"7D",
	"30D",
	"12M"
];
function computePeriodOrders(orders, range) {
	const cutoff = Date.now() - {
		"7D": 7 * 864e5,
		"30D": 30 * 864e5,
		"12M": 365 * 864e5
	}[range];
	return orders.filter((o) => o.createdAt >= cutoff);
}
function Analytics() {
	const [range, setRange] = (0, import_react.useState)("30D");
	const allOrders = useQuery(api.orders.list, { sessionToken: getSessionToken() ?? "" }) ?? [];
	const periodOrders = (0, import_react.useMemo)(() => computePeriodOrders(allOrders, range), [allOrders, range]);
	const kpis = (0, import_react.useMemo)(() => {
		const totalRevenue = periodOrders.reduce((s, o) => s + o.total, 0);
		const totalOrders = periodOrders.length;
		const totalCustomers = new Set(periodOrders.map((o) => o.customerEmail)).size;
		const completed = periodOrders.filter((o) => o.status === "delivered" || o.status === "shipped").length;
		return {
			totalRevenue,
			totalOrders,
			totalCustomers,
			convRate: totalOrders > 0 ? completed / totalOrders * 100 : 0
		};
	}, [periodOrders]);
	const chartData = (0, import_react.useMemo)(() => {
		if (range === "12M") {
			const byMonth = {};
			for (const order of periodOrders) {
				const d = new Date(order.createdAt);
				const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
				if (!byMonth[key]) byMonth[key] = {
					revenue: 0,
					orders: 0,
					customers: /* @__PURE__ */ new Set()
				};
				byMonth[key].revenue += order.total;
				byMonth[key].orders++;
				byMonth[key].customers.add(order.customerEmail);
			}
			return Object.entries(byMonth).sort(([a], [b]) => a.localeCompare(b)).map(([month, d]) => ({
				label: month,
				revenue: d.revenue,
				orders: d.orders,
				customers: d.customers.size
			}));
		}
		const byDay = {};
		for (const order of periodOrders) {
			const d = new Date(order.createdAt);
			const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
			if (!byDay[key]) byDay[key] = {
				revenue: 0,
				orders: 0,
				customers: /* @__PURE__ */ new Set()
			};
			byDay[key].revenue += order.total;
			byDay[key].orders++;
			byDay[key].customers.add(order.customerEmail);
		}
		return Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b)).map(([label, d]) => ({
			label,
			revenue: d.revenue,
			orders: d.orders,
			customers: d.customers.size
		}));
	}, [periodOrders, range]);
	const topProducts = (0, import_react.useMemo)(() => {
		const sales = {};
		for (const order of periodOrders) for (const item of order.items) sales[item.name] = (sales[item.name] || 0) + item.quantity;
		return Object.entries(sales).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, sales]) => ({
			name,
			sales
		}));
	}, [periodOrders]);
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
				children: [
					{
						label: "Revenue",
						value: `PKR ${kpis.totalRevenue.toLocaleString("en-PK")}`,
						icon: DollarSign
					},
					{
						label: "Orders",
						value: kpis.totalOrders.toLocaleString(),
						icon: ShoppingBag
					},
					{
						label: "Customers",
						value: kpis.totalCustomers.toLocaleString(),
						icon: Users
					},
					{
						label: "Conversion",
						value: `${kpis.convRate.toFixed(2)}%`,
						icon: TrendingUp
					}
				].map((kpi) => {
					const Icon = kpi.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 18,
									className: "text-chrome-dim"
								})
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
								data: topProducts.length > 0 ? topProducts : [{
									name: "No data",
									sales: 0
								}],
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
