import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Calendar, H as Download, U as DollarSign, n as Users, p as ShoppingBag, rt as ArrowLeft, y as Receipt } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as Route } from "./customer._id-D6z03m5U.mjs";
import { t as generateCustomerProfilePDF } from "./pdf-utils-C7bt-qoI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-DYfI-4t-.js
var import_jsx_runtime = require_jsx_runtime();
var statusColors = {
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
	Cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};
function CustomerDetail() {
	const { id } = Route.useParams();
	const customer = useQuery(api.customers.getById, { id });
	const orders = useQuery(api.orders.getByEmail, { email: customer?.email ?? "" });
	if (customer === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-12 w-12 text-muted-foreground mb-4 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Loading customer..."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Fetching details..."
			})
		]
	}) });
	if (customer === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
	const initials = customer.name.split(" ").map((n) => n[0]).join("");
	const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;
	const lastOrderDate = orders && orders.length > 0 ? new Date(Math.max(...orders.map((o) => o.createdAt))).toLocaleDateString() : "N/A";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/customer",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Customers"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => generateCustomerProfilePDF({
					id: customer._id,
					name: customer.name,
					email: customer.email,
					phone: customer.phone || "N/A",
					joined: new Date(customer._creationTime).toLocaleDateString(),
					status: customer.status || "Active",
					totalOrders: customer.totalOrders || 0,
					totalSpent: customer.totalSpent || 0,
					avgOrderValue: (customer.totalSpent || 0) / Math.max(1, customer.totalOrders || 1),
					lastOrderDate: "Recent",
					orders: orders?.map((o) => ({
						id: o._id,
						date: new Date(o._creationTime).toLocaleDateString(),
						items: o.items.reduce((acc, i) => acc + i.quantity, 0),
						total: o.total,
						status: o.status
					})) || []
				}),
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
									children: customer.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: customer.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: customer.phone ?? ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Joined ", new Date(customer.createdAt).toLocaleDateString()]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${customer.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), customer.status]
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
							value: customer.totalOrders.toString(),
							icon: ShoppingBag
						},
						{
							label: "Total Spent",
							value: "PKR " + customer.totalSpent.toFixed(2),
							icon: DollarSign
						},
						{
							label: "Avg Order Value",
							value: "PKR " + avgOrderValue.toFixed(2),
							icon: Receipt
						},
						{
							label: "Last Order",
							value: lastOrderDate,
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-4 border-b border-chrome/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Order History"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
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
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (orders ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-chrome/10 hover:bg-chrome/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/order/$id",
										params: { id: o._id },
										className: "font-medium text-foreground hover:text-blue-400 transition-colors",
										children: o.orderNumber
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-muted-foreground",
										children: new Date(o.createdAt).toLocaleDateString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-right text-muted-foreground",
										children: o.items.length
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										className: "text-right text-foreground",
										children: ["PKR ", o.total.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[o.status]}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), o.status]
									}) })
								]
							}, o._id)) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:hidden divide-y divide-chrome/10",
							children: (orders ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/order/$id",
											params: { id: o._id },
											className: "font-medium text-foreground hover:text-chrome-h transition-colors text-sm",
											children: o.orderNumber
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${statusColors[o.status]}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-current" }), o.status]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(o.createdAt).toLocaleDateString() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [o.items.length, " items"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground font-semibold",
											children: ["PKR ", o.total.toFixed(2)]
										})
									})
								]
							}, o._id))
						})
					]
				})]
			})]
		})]
	}) });
}
//#endregion
export { CustomerDetail as component };
