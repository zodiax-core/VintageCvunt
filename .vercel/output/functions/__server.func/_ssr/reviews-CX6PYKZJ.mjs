import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-Dc0i5OIR.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Star } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-CIQp9x1q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-CX6PYKZJ.js
var import_jsx_runtime = require_jsx_runtime();
function statusBadge(status) {
	const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
	const styles = {
		Approved: "bg-green-500/10 text-green-400 border-green-500/20",
		Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
		Rejected: "bg-red-500/10 text-red-400 border-red-500/20"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${base} ${styles[status] || styles.Pending}`,
		children: status
	});
}
function StarRating({ rating }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-0.5",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			size: 12,
			className: star <= rating ? "text-yellow-400 fill-yellow-400" : "text-chrome-dim/30"
		}, star))
	});
}
function MyReviews() {
	const { user } = useAuthContext();
	const reviews = useQuery(api.reviews.getByCustomerEmail, { email: user?.email || "" }) ?? [];
	const products = useQuery(api.products.list) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 border-b border-chrome/10 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-mono uppercase tracking-[0.2em] text-foreground",
			children: "My Reviews"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2",
			children: [
				reviews.length,
				" review",
				reviews.length !== 1 ? "s" : "",
				" submitted"
			]
		})]
	}), reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: reviews.map((review) => {
			const product = products.find((p) => p._id === review.productId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products/$slug",
								params: { slug: product?.slug || "" },
								className: "font-mono text-[11px] text-chrome hover:text-foreground transition-colors",
								children: product?.name || "Unknown Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, { rating: review.rating }), statusBadge(review.status === "approved" ? "Approved" : review.status === "rejected" ? "Rejected" : "Pending")]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[9px] text-chrome-dim shrink-0",
							children: new Date(review.createdAt).toLocaleDateString("en-PK")
						})]
					}),
					review.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm mb-1",
						children: review.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-chrome-dim leading-relaxed",
						children: review.comment
					})
				]
			}, review._id);
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-graphite border border-chrome/20 rounded-2xl p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
				size: 24,
				className: "mx-auto text-chrome-dim/40 mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-chrome-dim",
				children: "No reviews yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors",
				children: "Browse Collection →"
			})
		]
	})] });
}
//#endregion
export { MyReviews as component };
