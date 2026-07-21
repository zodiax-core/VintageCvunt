import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Package, c as Trash2, q as ArrowLeft, v as Receipt } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { r as generateReceiptPDF } from "./pdf-utils-B1aO1vk4.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-CUP9yHvC.mjs";
import { t as Route } from "./order._id-BprlMCUA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-D6ZHuhFo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockOrders = [
	{
		id: "ORD-1001",
		customer: "Elena Voss",
		email: "elena@example.com",
		date: "2026-03-15",
		items: 3,
		total: 245,
		status: "Delivered"
	},
	{
		id: "ORD-1002",
		customer: "Marcus Webb",
		email: "marcus@example.com",
		date: "2026-03-14",
		items: 1,
		total: 89.5,
		status: "Shipped"
	},
	{
		id: "ORD-1003",
		customer: "Clara Hemlock",
		email: "clara@example.com",
		date: "2026-03-14",
		items: 5,
		total: 620,
		status: "Processing"
	},
	{
		id: "ORD-1004",
		customer: "Julian Frost",
		email: "julian@example.com",
		date: "2026-03-13",
		items: 2,
		total: 175,
		status: "Pending"
	},
	{
		id: "ORD-1005",
		customer: "Sylvia Kaine",
		email: "sylvia@example.com",
		date: "2026-03-12",
		items: 4,
		total: 412,
		status: "Delivered"
	},
	{
		id: "ORD-1006",
		customer: "Dorian Ashford",
		email: "dorian@example.com",
		date: "2026-03-11",
		items: 7,
		total: 890,
		status: "Cancelled"
	},
	{
		id: "ORD-1007",
		customer: "Priya Nair",
		email: "priya@example.com",
		date: "2026-03-10",
		items: 2,
		total: 134,
		status: "Shipped"
	},
	{
		id: "ORD-1008",
		customer: "Leo Ventura",
		email: "leo@example.com",
		date: "2026-03-09",
		items: 1,
		total: 45,
		status: "Delivered"
	},
	{
		id: "ORD-1009",
		customer: "Wren Calloway",
		email: "wren@example.com",
		date: "2026-03-08",
		items: 3,
		total: 298,
		status: "Processing"
	},
	{
		id: "ORD-1010",
		customer: "Morgan Thorne",
		email: "morgan@example.com",
		date: "2026-03-07",
		items: 6,
		total: 567,
		status: "Pending"
	},
	{
		id: "ORD-1011",
		customer: "Ivy Castell",
		email: "ivy@example.com",
		date: "2026-03-06",
		items: 2,
		total: 189,
		status: "Delivered"
	},
	{
		id: "ORD-1012",
		customer: "Ronan Voss",
		email: "ronan@example.com",
		date: "2026-03-05",
		items: 4,
		total: 376,
		status: "Shipped"
	}
];
var customerInfo = {
	"ORD-1001": {
		phone: "+1 (555) 111-2222",
		address: "123 Oak St, Portland, OR 97201"
	},
	"ORD-1002": {
		phone: "+1 (555) 222-3333",
		address: "456 Pine Ave, Portland, OR 97202"
	},
	"ORD-1003": {
		phone: "+1 (555) 234-5678",
		address: "842 Willow Lane, Apt 4B, Portland, OR 97201"
	},
	"ORD-1004": {
		phone: "+1 (555) 444-5555",
		address: "789 Elm St, Portland, OR 97203"
	},
	"ORD-1005": {
		phone: "+1 (555) 555-6666",
		address: "321 Cedar Rd, Portland, OR 97204"
	},
	"ORD-1006": {
		phone: "+1 (555) 666-7777",
		address: "654 Birch Dr, Portland, OR 97205"
	},
	"ORD-1007": {
		phone: "+1 (555) 777-8888",
		address: "987 Maple Ln, Portland, OR 97206"
	},
	"ORD-1008": {
		phone: "+1 (555) 888-9999",
		address: "147 Walnut Ct, Portland, OR 97207"
	},
	"ORD-1009": {
		phone: "+1 (555) 999-0000",
		address: "258 Spruce Way, Portland, OR 97208"
	},
	"ORD-1010": {
		phone: "+1 (555) 000-1111",
		address: "369 Ash Blvd, Portland, OR 97209"
	},
	"ORD-1011": {
		phone: "+1 (555) 111-3333",
		address: "741 Cherry St, Portland, OR 97210"
	},
	"ORD-1012": {
		phone: "+1 (555) 432-1098",
		address: "852 Fir Ave, Portland, OR 97211"
	}
};
var orderItems = {
	"ORD-1001": [
		{
			product: "Wool Scarf",
			sku: "WSC-606",
			price: 38,
			qty: 2,
			subtotal: 76
		},
		{
			product: "Leather Gloves",
			sku: "LGV-707",
			price: 65,
			qty: 1,
			subtotal: 65
		},
		{
			product: "Brass Keychain",
			sku: "BKC-015",
			price: 15,
			qty: 1,
			subtotal: 15
		}
	],
	"ORD-1002": [{
		product: "Canvas Messenger Bag",
		sku: "CMB-412",
		price: 65,
		qty: 1,
		subtotal: 65
	}],
	"ORD-1003": [
		{
			product: "Vintage Leather Jacket",
			sku: "VLJ-101",
			price: 250,
			qty: 1,
			subtotal: 250
		},
		{
			product: "Retro Aviator Sunglasses",
			sku: "RAS-204",
			price: 85,
			qty: 2,
			subtotal: 170
		},
		{
			product: "Wool Peacoat",
			sku: "WPC-309",
			price: 120,
			qty: 1,
			subtotal: 120
		},
		{
			product: "Canvas Messenger Bag",
			sku: "CMB-412",
			price: 65,
			qty: 1,
			subtotal: 65
		},
		{
			product: "Brass Keychain",
			sku: "BKC-015",
			price: 15,
			qty: 1,
			subtotal: 15
		}
	],
	"ORD-1004": [{
		product: "Fedora Hat",
		sku: "FDH-303",
		price: 78,
		qty: 1,
		subtotal: 78
	}, {
		product: "Pocket Square",
		sku: "PKS-010",
		price: 22,
		qty: 1,
		subtotal: 22
	}],
	"ORD-1005": [
		{
			product: "Silk Scarf",
			sku: "SSC-101",
			price: 45,
			qty: 1,
			subtotal: 45
		},
		{
			product: "Leather Belt",
			sku: "LBT-202",
			price: 55,
			qty: 1,
			subtotal: 55
		},
		{
			product: "Cufflinks Set",
			sku: "CFL-505",
			price: 42,
			qty: 1,
			subtotal: 42
		}
	],
	"ORD-1006": [
		{
			product: "Vintage Leather Jacket",
			sku: "VLJ-101",
			price: 250,
			qty: 2,
			subtotal: 500
		},
		{
			product: "Leather Gloves",
			sku: "LGV-707",
			price: 65,
			qty: 1,
			subtotal: 65
		},
		{
			product: "Wool Scarf",
			sku: "WSC-606",
			price: 38,
			qty: 1,
			subtotal: 38
		}
	],
	"ORD-1007": [{
		product: "Tote Bag",
		sku: "TTB-808",
		price: 48,
		qty: 1,
		subtotal: 48
	}, {
		product: "Pocket Square",
		sku: "PKS-010",
		price: 22,
		qty: 2,
		subtotal: 44
	}],
	"ORD-1008": [{
		product: "Brass Keychain",
		sku: "BKC-015",
		price: 15,
		qty: 1,
		subtotal: 15
	}],
	"ORD-1009": [{
		product: "Denim Jacket",
		sku: "DNJ-909",
		price: 135,
		qty: 1,
		subtotal: 135
	}, {
		product: "Tote Bag",
		sku: "TTB-808",
		price: 48,
		qty: 1,
		subtotal: 48
	}],
	"ORD-1010": [
		{
			product: "Vintage Watch",
			sku: "VWT-404",
			price: 195,
			qty: 1,
			subtotal: 195
		},
		{
			product: "Leather Belt",
			sku: "LBT-202",
			price: 55,
			qty: 1,
			subtotal: 55
		},
		{
			product: "Fedora Hat",
			sku: "FDH-303",
			price: 78,
			qty: 1,
			subtotal: 78
		},
		{
			product: "Cufflinks Set",
			sku: "CFL-505",
			price: 42,
			qty: 1,
			subtotal: 42
		}
	],
	"ORD-1011": [{
		product: "Retro Aviator Sunglasses",
		sku: "RAS-204",
		price: 85,
		qty: 1,
		subtotal: 85
	}, {
		product: "Silk Scarf",
		sku: "SSC-101",
		price: 45,
		qty: 1,
		subtotal: 45
	}],
	"ORD-1012": [
		{
			product: "Canvas Messenger Bag",
			sku: "CMB-412",
			price: 65,
			qty: 2,
			subtotal: 130
		},
		{
			product: "Leather Gloves",
			sku: "LGV-707",
			price: 65,
			qty: 1,
			subtotal: 65
		},
		{
			product: "Brass Keychain",
			sku: "BKC-015",
			price: 15,
			qty: 1,
			subtotal: 15
		}
	]
};
var shippingRates = {
	"ORD-1001": 10,
	"ORD-1002": 8,
	"ORD-1003": 15,
	"ORD-1004": 9,
	"ORD-1005": 12,
	"ORD-1006": 20,
	"ORD-1007": 10,
	"ORD-1008": 5,
	"ORD-1009": 11,
	"ORD-1010": 14,
	"ORD-1011": 10,
	"ORD-1012": 13
};
var taxRates = {
	"ORD-1001": 12.4,
	"ORD-1002": 5.2,
	"ORD-1003": 49.6,
	"ORD-1004": 8,
	"ORD-1005": 11.4,
	"ORD-1006": 48.2,
	"ORD-1007": 7.4,
	"ORD-1008": 1.6,
	"ORD-1009": 15.4,
	"ORD-1010": 29.6,
	"ORD-1011": 10.4,
	"ORD-1012": 16.8
};
var statusColors = {
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
	Cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};
function getOrderDetail(id) {
	const summary = mockOrders.find((o) => o.id === id);
	if (!summary) return null;
	const info = customerInfo[id];
	const items = orderItems[id] ?? [];
	const shipping = shippingRates[id] ?? 10;
	const tax = taxRates[id] ?? 0;
	return {
		...summary,
		...info,
		items,
		shipping,
		tax
	};
}
function OrderDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const order = getOrderDetail(id);
	const [status, setStatus] = (0, import_react.useState)(order?.status ?? "");
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (order) setStatus(order.status);
	}, [id, order]);
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Order not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-sm mb-6",
				children: [
					"No order matches the ID \"",
					id,
					"\"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/order",
				className: "btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm",
				children: "Back to Orders"
			})
		]
	}) });
	const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0);
	function handleUpdate() {
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 2e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/order",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Orders"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => generateReceiptPDF(order),
					className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Download Receipt"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: order.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[order.status]}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), order.status]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: order.date
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-5 py-4 border-b border-chrome/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
									children: "Order Items"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-chrome/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: "Product"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: "SKU"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
										children: "Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
										children: "Qty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
										children: "Subtotal"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: order.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-chrome/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-foreground font-medium",
										children: item.product
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "font-mono text-xs text-muted-foreground",
										children: item.sku
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										className: "text-right text-muted-foreground",
										children: ["$", item.price.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-right text-muted-foreground",
										children: item.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										className: "text-right text-foreground",
										children: ["$", item.subtotal.toFixed(2)]
									})
								]
							}, i)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-chrome/10 px-5 py-4 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground",
											children: ["$", subtotal.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Shipping"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground",
											children: ["$", order.shipping.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Tax"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground",
											children: ["$", order.tax.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-base font-semibold pt-1 border-t border-chrome/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground",
											children: ["$", (subtotal + order.shipping + order.tax).toFixed(2)]
										})]
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Customer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground font-medium",
									children: order.customer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: order.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: order.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs leading-relaxed",
									children: order.address
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Status"
							}),
							showSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), "Status Updated!"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: status,
								onChange: (e) => setStatus(e.target.value),
								className: "w-full rounded-xl bg-background border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40",
								children: [
									"Pending",
									"Processing",
									"Shipped",
									"Delivered",
									"Cancelled"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleUpdate,
								className: "btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium",
								children: "Update"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setDeleteTarget(true),
								className: "btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium text-red-400 flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete Order"]
							})
						]
					})]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: deleteTarget,
		onClose: () => setDeleteTarget(false),
		onConfirm: () => navigate({ to: "/order" }),
		title: "Delete Order",
		message: `Are you sure you want to delete order ${order.id}?`,
		confirmLabel: "Delete",
		variant: "danger"
	})] });
}
//#endregion
export { OrderDetail as component };
