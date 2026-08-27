import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-BqGyC6x_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as Search } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-DshScrjT.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.index-DKbJqsZG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusList = [
	"All",
	"Pending",
	"Processing",
	"Shipped",
	"Delivered",
	"Cancelled"
];
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
function OrderHistory() {
	const { user } = useAuthContext();
	const allOrders = useQuery(api.orders.getByEmail, { email: user?.email || "" }) ?? [];
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		let result = allOrders;
		if (statusFilter !== "All") result = result.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
		if (search.trim()) {
			const q = search.toLowerCase();
			result = result.filter((o) => o.orderNumber.toLowerCase().includes(q));
		}
		return result;
	}, [
		allOrders,
		statusFilter,
		search
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 border-b border-chrome/10 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-mono uppercase tracking-[0.2em] text-foreground",
				children: "Order History"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2",
				children: [
					allOrders.length,
					" order",
					allOrders.length !== 1 ? "s" : "",
					" placed"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 14,
					className: "absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search by order number…",
					className: "w-full rounded-xl border border-chrome/10 bg-chrome/5 py-2.5 pl-9 pr-4 font-mono text-[11px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/30 transition-colors"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 p-1 bg-chrome/5 border border-chrome/10 rounded-2xl",
				children: statusList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setStatusFilter(s),
					className: `px-3 py-1.5 rounded-xl font-mono text-[9px] uppercase tracking-[0.2em] transition-colors ${statusFilter === s ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
					children: s
				}, s))
			})]
		}),
		filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Order"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Date"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Items"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Total"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Status"
					}) })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders/$id",
						params: { id: order._id },
						className: "font-mono text-[11px] text-chrome hover:text-foreground transition-colors",
						children: order.orderNumber
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-chrome-dim",
						children: new Date(order.createdAt).toLocaleDateString("en-PK")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-chrome-dim",
						children: order.items.length
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px]",
						children: ["PKR ", order.total.toLocaleString("en-PK")]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1)) })
				] }, order._id)) })] })
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-chrome-dim",
				children: search || statusFilter !== "All" ? "No orders match your filters." : "No orders placed yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors",
				children: "Browse Collection →"
			})]
		})
	] });
}
//#endregion
export { OrderHistory as component };
