import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-B2p0RPiN.mjs";
import { r as generateReceiptPDF } from "./pdf-utils-C7bt-qoI.mjs";
import { t as Route } from "./order-confirmed-ov4WpvPE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-JTKwCXv8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
function OrderConfirmed() {
	const { orderId } = Route.useSearch();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const order = useQuery(api.orders.getByOrderNumber, { orderNumber: orderId });
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-2xl px-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center mb-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									scale: 0,
									rotate: -90
								},
								animate: mounted ? {
									scale: 1,
									rotate: 0
								} : {},
								transition: {
									duration: .8,
									ease: EASE,
									delay: .3
								},
								className: "h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-chrome flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
									width: "36",
									height: "36",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									className: "text-chrome",
									initial: {
										pathLength: 0,
										opacity: 0
									},
									animate: mounted ? {
										pathLength: 1,
										opacity: 1
									} : {},
									transition: {
										duration: .6,
										ease: EASE,
										delay: .9
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: mounted ? {
								opacity: 1,
								y: 0
							} : {},
							transition: {
								duration: .6,
								ease: EASE,
								delay: .5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
								children: "§ Order Confirmed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-4xl md:text-6xl leading-[0.95]",
								children: ["Thank You, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									children: "Patron"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: mounted ? {
								opacity: 1,
								y: 0
							} : {},
							transition: {
								duration: .6,
								ease: EASE,
								delay: .7
							},
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-chrome-dim leading-relaxed max-w-md mx-auto",
								children: "Your order has been received and is being prepared at the Casa d'Argento atelier. You will receive a confirmation email shortly."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: mounted ? {
								opacity: 1,
								y: 0
							} : {},
							transition: {
								duration: .6,
								ease: EASE,
								delay: .9
							},
							className: "mt-10 inline-block rounded-2xl border border-chrome bg-graphite px-8 py-6",
							style: { boxShadow: "var(--shadow-plate)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
								children: "Order Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xl md:text-2xl tracking-[0.08em] text-chrome",
								children: orderId
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: mounted ? {
								opacity: 1,
								y: 0
							} : {},
							transition: {
								duration: .6,
								ease: EASE,
								delay: 1.1
							},
							className: "mt-10 flex flex-col md:flex-row items-center justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (order) generateReceiptPDF(order);
									else {
										const receipt = `Order: ${orderId}\nDate: ${(/* @__PURE__ */ new Date()).toISOString()}\n\nThank you for your patronage.\n— VintageCvunt · Casa d'Argento`;
										const blob = new Blob([receipt], { type: "text/plain" });
										const url = URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.href = url;
										a.download = `receipt-${orderId}.txt`;
										a.click();
										URL.revokeObjectURL(url);
									}
								},
								className: "btn-chrome btn-chrome-inner",
								disabled: !order,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "Download Receipt"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "15",
											x2: "12",
											y2: "3"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-dim hover:text-foreground transition-colors",
								children: "Continue Shopping →"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { OrderConfirmed as component };
