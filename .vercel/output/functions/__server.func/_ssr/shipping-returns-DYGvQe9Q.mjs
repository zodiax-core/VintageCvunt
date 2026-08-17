import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-C6-3EVv-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shipping-returns-DYGvQe9Q.js
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var returnSteps = [
	{
		step: "01",
		title: "Initiate Request",
		desc: "Email returns@vintagecvunt.com within 14 days of delivery with your order number and reason for return."
	},
	{
		step: "02",
		title: "Receive Authorization",
		desc: "Our team will issue a Return Merchandise Authorization (RMA) number and provide a prepaid shipping label within 48 hours."
	},
	{
		step: "03",
		title: "Pack Securely",
		desc: "Place the item in its original packaging with all tags, documentation, and authenticity cards. Include your RMA number inside the package."
	},
	{
		step: "04",
		title: "Ship & Track",
		desc: "Drop the package at the designated carrier. We recommend insuring the shipment for its full value."
	},
	{
		step: "05",
		title: "Inspection & Refund",
		desc: "Upon arrival, our atelier inspects the item. Approved refunds are processed within 10 business days to the original payment method."
	}
];
var exclusions = [
	"Custom and bespoke pieces are final sale and not eligible for return.",
	"Items worn, altered, damaged, or returned without original packaging will be refused.",
	"Earrings, intimates, and grooming products cannot be returned for hygiene reasons.",
	"Sale or discounted items marked as final sale are non-returnable."
];
function ShippingReturns() {
	const shippingRates = useQuery(api.shippingRates.list) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 md:pt-44 pb-16 md:pb-28 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE
						},
						className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						children: "— Policies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1.2,
							ease: EASE
						},
						className: "font-display text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] tracking-[-0.03em]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Shipping"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "& Returns" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							ease: EASE
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
								children: "§ Shipping"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-3xl md:text-5xl",
								children: "Delivery Rates & Times"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-2 font-mono text-sm text-chrome-dim",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All orders are processed within 1–2 business days. Orders placed after 14:00 PKT are processed the following business day." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We ship via Leopards Courier, TCS, and M&P. All shipments are fully insured and require a signature upon delivery. Free shipping on orders over PKR 500,000." })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							ease: EASE,
							delay: .1
						},
						className: "mt-8 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[400px] border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-graphite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left",
										children: "Region"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left",
										children: "Estimated Delivery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left",
										children: "Cost"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shippingRates.filter((r) => r.isActive).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "even:bg-graphite/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border border-chrome px-4 py-3 font-mono text-sm",
										children: r.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border border-chrome px-4 py-3 font-mono text-sm text-chrome-dim",
										children: r.estimatedDays
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border border-chrome px-4 py-3 font-mono text-sm",
										children: r.price === 0 ? "Free" : `PKR ${r.price.toLocaleString()}`
									})
								]
							}, r._id)) })]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								duration: .7,
								ease: EASE
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Returns"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-3xl md:text-5xl",
									children: "Return Policy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 font-mono text-sm text-chrome-dim max-w-3xl leading-relaxed",
									children: "We accept returns within 14 days of delivery. Items must be unworn, unaltered, and returned in their original packaging with all tags and documentation attached. Refunds are processed to the original payment method within 10 business days of inspection."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-6",
							children: returnSteps.map((rs, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-40px"
								},
								transition: {
									duration: .7,
									ease: EASE,
									delay: i * .08
								},
								className: "flex gap-4 md:gap-6 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 font-mono text-xs tracking-[0.3em] text-chrome mt-0.5",
									children: rs.step
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 border-b border-chrome/20 pb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg md:text-2xl",
										children: rs.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-sm text-chrome-dim",
										children: rs.desc
									})]
								})]
							}, rs.step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								duration: .7,
								ease: EASE,
								delay: .3
							},
							className: "mt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl md:text-2xl mb-4",
								children: "Exclusions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: exclusions.map((exc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 font-mono text-sm text-chrome-dim",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-chrome mt-0.5",
										children: "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exc })]
								}, exc))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ShippingReturns as component };
