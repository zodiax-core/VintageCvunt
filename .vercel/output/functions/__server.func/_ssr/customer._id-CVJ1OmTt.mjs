import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Download, I as DollarSign, W as Calendar, f as ShoppingBag, n as Users, q as ArrowLeft, v as Receipt } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Route } from "./customer._id-CoObsgw2.mjs";
import { t as generateCustomerProfilePDF } from "./pdf-utils-B1aO1vk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-CVJ1OmTt.js
var import_jsx_runtime = require_jsx_runtime();
var mockCustomers = [
	{
		id: "CUST-001",
		name: "Elena Voss",
		email: "elena@example.com",
		orders: 8,
		totalSpent: 3840,
		joined: "2025-06-12",
		status: "Active"
	},
	{
		id: "CUST-002",
		name: "Marcus Webb",
		email: "marcus@example.com",
		orders: 3,
		totalSpent: 520,
		joined: "2025-08-04",
		status: "Active"
	},
	{
		id: "CUST-003",
		name: "Clara Hemlock",
		email: "clara@example.com",
		orders: 12,
		totalSpent: 8400,
		joined: "2025-03-19",
		status: "Active"
	},
	{
		id: "CUST-004",
		name: "Julian Frost",
		email: "julian@example.com",
		orders: 1,
		totalSpent: 175,
		joined: "2026-01-22",
		status: "Inactive"
	},
	{
		id: "CUST-005",
		name: "Sylvia Kaine",
		email: "sylvia@example.com",
		orders: 5,
		totalSpent: 2100,
		joined: "2025-09-10",
		status: "Active"
	},
	{
		id: "CUST-006",
		name: "Dorian Ashford",
		email: "dorian@example.com",
		orders: 2,
		totalSpent: 1200,
		joined: "2025-11-05",
		status: "Inactive"
	},
	{
		id: "CUST-007",
		name: "Priya Nair",
		email: "priya@example.com",
		orders: 9,
		totalSpent: 3650,
		joined: "2025-05-28",
		status: "Active"
	},
	{
		id: "CUST-008",
		name: "Leo Ventura",
		email: "leo@example.com",
		orders: 4,
		totalSpent: 890,
		joined: "2025-10-14",
		status: "Active"
	},
	{
		id: "CUST-009",
		name: "Wren Calloway",
		email: "wren@example.com",
		orders: 6,
		totalSpent: 2750,
		joined: "2025-07-01",
		status: "Active"
	},
	{
		id: "CUST-010",
		name: "Morgan Thorne",
		email: "morgan@example.com",
		orders: 7,
		totalSpent: 4100,
		joined: "2025-04-16",
		status: "Inactive"
	},
	{
		id: "CUST-011",
		name: "Ivy Castell",
		email: "ivy@example.com",
		orders: 11,
		totalSpent: 6200,
		joined: "2025-02-09",
		status: "Active"
	},
	{
		id: "CUST-012",
		name: "Ronan Voss",
		email: "ronan@example.com",
		orders: 2,
		totalSpent: 120,
		joined: "2026-01-30",
		status: "Active"
	}
];
var claraDetail = {
	id: "CUST-003",
	name: "Clara Hemlock",
	email: "clara@example.com",
	phone: "+1 (555) 234-5678",
	joined: "March 19, 2025",
	status: "Active",
	totalOrders: 12,
	totalSpent: 8400,
	avgOrderValue: 700,
	lastOrderDate: "March 14, 2026",
	orders: [
		{
			id: "ORD-1003",
			date: "2026-03-14",
			items: 5,
			total: 620,
			status: "Processing"
		},
		{
			id: "ORD-0987",
			date: "2026-02-28",
			items: 3,
			total: 345,
			status: "Delivered"
		},
		{
			id: "ORD-0942",
			date: "2026-01-15",
			items: 7,
			total: 1200,
			status: "Delivered"
		},
		{
			id: "ORD-0891",
			date: "2025-12-20",
			items: 2,
			total: 180,
			status: "Delivered"
		},
		{
			id: "ORD-0823",
			date: "2025-11-05",
			items: 4,
			total: 890,
			status: "Shipped"
		},
		{
			id: "ORD-0765",
			date: "2025-09-12",
			items: 6,
			total: 1450,
			status: "Delivered"
		},
		{
			id: "ORD-0701",
			date: "2025-07-30",
			items: 1,
			total: 75,
			status: "Cancelled"
		}
	]
};
var elenaDetail = {
	id: "CUST-001",
	name: "Elena Voss",
	email: "elena@example.com",
	phone: "+1 (555) 111-2222",
	joined: "June 12, 2025",
	status: "Active",
	totalOrders: 8,
	totalSpent: 3840,
	avgOrderValue: 480,
	lastOrderDate: "March 15, 2026",
	orders: [
		{
			id: "ORD-1001",
			date: "2026-03-15",
			items: 3,
			total: 245,
			status: "Delivered"
		},
		{
			id: "ORD-0963",
			date: "2026-02-10",
			items: 2,
			total: 180,
			status: "Delivered"
		},
		{
			id: "ORD-0912",
			date: "2026-01-05",
			items: 4,
			total: 520,
			status: "Shipped"
		},
		{
			id: "ORD-0876",
			date: "2025-11-22",
			items: 1,
			total: 95,
			status: "Delivered"
		},
		{
			id: "ORD-0801",
			date: "2025-09-14",
			items: 5,
			total: 780,
			status: "Delivered"
		},
		{
			id: "ORD-0734",
			date: "2025-07-08",
			items: 3,
			total: 420,
			status: "Cancelled"
		},
		{
			id: "ORD-0655",
			date: "2025-05-01",
			items: 6,
			total: 1100,
			status: "Delivered"
		}
	]
};
function generateCustomerDetail(id) {
	const c = mockCustomers.find((c) => c.id === id);
	if (!c) return null;
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const d = new Date(c.joined);
	const joinedDisplay = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	return {
		id: c.id,
		name: c.name,
		email: c.email,
		phone: "+1 (555) 000-0000",
		joined: joinedDisplay,
		status: c.status,
		totalOrders: c.orders,
		totalSpent: c.totalSpent,
		avgOrderValue: c.orders > 0 ? +(c.totalSpent / c.orders).toFixed(2) : 0,
		lastOrderDate: "2026-03-15",
		orders: [
			{
				id: "ORD-" + (1e3 + parseInt(id.slice(-3))),
				date: "2026-03-15",
				items: Math.ceil(c.orders / 2),
				total: +(c.totalSpent * .3).toFixed(2),
				status: "Delivered"
			},
			{
				id: "ORD-" + (900 + parseInt(id.slice(-3))),
				date: "2026-02-01",
				items: Math.ceil(c.orders / 3),
				total: +(c.totalSpent * .25).toFixed(2),
				status: "Shipped"
			},
			{
				id: "ORD-" + (800 + parseInt(id.slice(-3))),
				date: "2025-12-15",
				items: Math.max(1, c.orders - 3),
				total: +(c.totalSpent * .2).toFixed(2),
				status: "Delivered"
			}
		]
	};
}
function getDetail(id) {
	if (id === claraDetail.id) return claraDetail;
	if (id === elenaDetail.id) return elenaDetail;
	return generateCustomerDetail(id);
}
var statusColors = {
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
	Cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};
function CustomerDetail() {
	const { id } = Route.useParams();
	const c = getDetail(id);
	if (!c) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-12 w-12 text-muted-foreground mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Customer not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-sm mb-6",
				children: [
					"No customer matches the ID \"",
					id,
					"\"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/customer",
				className: "btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm",
				children: "Back to Customers"
			})
		]
	}) });
	const initials = c.name.split(" ").map((n) => n[0]).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/customer",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Customers"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => generateCustomerProfilePDF(c),
				className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download Profile"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto h-16 w-16 rounded-full bg-chrome/10 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-semibold text-foreground",
								children: initials
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-foreground",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: c.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: c.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Joined ", c.joined]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), c.status]
						}) })
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-3 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						{
							label: "Total Orders",
							value: c.totalOrders.toString(),
							icon: ShoppingBag
						},
						{
							label: "Total Spent",
							value: "$" + c.totalSpent.toFixed(2),
							icon: DollarSign
						},
						{
							label: "Avg Order Value",
							value: "$" + c.avgOrderValue.toFixed(2),
							icon: Receipt
						},
						{
							label: "Last Order",
							value: c.lastOrderDate,
							icon: Calendar
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: s.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-semibold text-foreground",
							children: s.value
						})]
					}, s.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-4 border-b border-chrome/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Order History"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Items"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Status"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: c.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10 hover:bg-chrome/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/order/$id",
								params: { id: o.id },
								className: "font-medium text-foreground hover:text-blue-400 transition-colors",
								children: o.id
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: o.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right text-muted-foreground",
								children: o.items
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right text-foreground",
								children: ["$", o.total.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[o.status]}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), o.status]
							}) })
						]
					}, o.id)) })] })]
				})]
			})]
		})]
	}) });
}
//#endregion
export { CustomerDetail as component };
