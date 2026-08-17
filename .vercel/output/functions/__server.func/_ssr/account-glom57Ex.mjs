import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useCurrency } from "./currency-context-dbZ1tzKb.mjs";
import { n as useAuthContext } from "./auth-context-BqGyC6x_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Package, g as ShoppingBag, ht as ArrowRight, nt as Clock } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-BHHzTzbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-glom57Ex.js
var import_jsx_runtime = require_jsx_runtime();
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
function AccountDashboard() {
	const { user } = useAuthContext();
	const { formatPrice } = useCurrency();
	const orders = useQuery(api.orders.getByEmail, { email: user?.email || "" }) ?? [];
	const recentOrders = orders.slice(0, 3);
	const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
						size: 20,
						className: "text-chrome-dim mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl mb-1",
						children: orders.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Total Orders"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						size: 20,
						className: "text-chrome-dim mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl mb-1",
						children: orders.filter((o) => o.status === "pending" || o.status === "processing").length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Active Orders"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
						size: 20,
						className: "text-chrome-dim mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl mb-1",
						children: formatPrice(totalSpent)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Total Spent"
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-graphite border border-chrome/20 rounded-2xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-6 pb-4 border-b border-chrome/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[11px] uppercase tracking-[0.2em]",
				children: "Recent Orders"
			}), orders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders",
				className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground transition-colors group",
				children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					size: 12,
					className: "group-hover:translate-x-1 transition-transform"
				})]
			})]
		}), recentOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: recentOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders/$id",
				params: { id: order._id },
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-chrome/10 bg-chrome/5 p-4 hover:border-chrome/30 transition-colors group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[12px] group-hover:text-chrome transition-colors",
						children: order.orderNumber
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] text-chrome-dim mt-1",
						children: new Date(order.createdAt).toLocaleDateString("en-PK", {
							month: "long",
							day: "numeric",
							year: "numeric"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between sm:justify-end gap-6 shrink-0 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[12px]",
						children: formatPrice(order.total)
					}), statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1))]
				})]
			}, order._id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
					size: 32,
					className: "mx-auto text-chrome-dim/20 mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[12px] text-chrome-dim",
					children: "You haven't placed any orders yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "mt-6 inline-flex items-center justify-center rounded-full border border-chrome bg-graphite px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground hover:bg-graphite-2 transition-colors",
					children: "Browse Collection"
				})
			]
		})]
	})] });
}
//#endregion
export { AccountDashboard as component };
