import { i as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-Duu_HWWl.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as Route } from "./orders._id-BDnq-Z2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-D08-Yke7.js
var import_jsx_runtime = require_jsx_runtime();
function statusBadge(status) {
	const base = "inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] border";
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
var statusTimeline = [
	"pending",
	"processing",
	"shipped",
	"delivered"
];
function OrderDetail() {
	const { id } = Route.useParams();
	const order = useQuery(api.orders.getById, { id });
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[40vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] text-chrome-dim",
			children: "Loading order details…"
		})
	}) });
	const currentStepIndex = statusTimeline.indexOf(order.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/orders",
			className: "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground transition-colors mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), " Back to Orders"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: order.orderNumber
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-1",
				children: ["Placed on ", new Date(order.createdAt).toLocaleDateString("en-PK", {
					year: "numeric",
					month: "long",
					day: "numeric"
				})]
			})] }), statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4",
				children: "Order Timeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1",
				children: statusTimeline.map((step, idx) => {
					const completed = currentStepIndex >= idx;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 ${idx > 0 ? "ml-1" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-6 w-6 rounded-full flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] border ${completed ? "bg-chrome text-background border-chrome" : "border-chrome/30 text-chrome-dim"} ${currentStepIndex === idx ? "ring-2 ring-chrome/40" : ""}`,
								children: completed ? "✓" : idx + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-[9px] uppercase tracking-[0.15em] hidden md:inline ${completed ? "text-chrome" : "text-chrome-dim/50"}`,
								children: step
							})]
						}), idx < statusTimeline.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-px mx-2 ${completed ? "bg-chrome/50" : "bg-chrome/10"}` })]
					}, step);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3",
					children: "Shipping Address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-[11px] space-y-1 text-chrome-dim",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.customerName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.shippingAddress.street }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							order.shippingAddress.city,
							", ",
							order.shippingAddress.zip
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.shippingAddress.country })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3",
					children: "Billing Address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-[11px] space-y-1 text-chrome-dim",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.customerName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.billingAddress.street }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							order.billingAddress.city,
							", ",
							order.billingAddress.zip
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.billingAddress.country })
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 md:p-6 border-b border-chrome/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Order Items"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "Item"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "Qty"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "Price"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Total"
							})
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px]",
								children: item.name
							}),
							item.size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[9px] text-chrome-dim",
								children: ["Size: ", item.size]
							}),
							item.color && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[9px] text-chrome-dim",
								children: ["Color: ", item.color]
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px]",
							children: item.quantity
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px]",
							children: ["PKR ", item.price.toLocaleString("en-PK")]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[11px]",
								children: ["PKR ", (item.price * item.quantity).toLocaleString("en-PK")]
							})
						})
					] }, idx)) })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-chrome/10 p-4 md:p-6 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[11px]",
								children: ["PKR ", order.subtotal.toLocaleString("en-PK")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Shipping"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-chrome-dim",
								children: order.shipping === 0 ? "Free" : `PKR ${order.shipping.toLocaleString("en-PK")}`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between pt-2 border-t border-chrome/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm text-chrome",
								children: ["PKR ", order.total.toLocaleString("en-PK")]
							})]
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { OrderDetail as component };
