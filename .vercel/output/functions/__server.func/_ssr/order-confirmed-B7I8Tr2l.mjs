import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-WijJY6Fs.mjs";
import { t as Route } from "./order-confirmed-DLykAk2t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-B7I8Tr2l.js
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
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/order-confirmed.tsx:31:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/order-confirmed.tsx:32:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden",
				"data-tsd-source": "/src/routes/order-confirmed.tsx:34:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					},
					"data-tsd-source": "/src/routes/order-confirmed.tsx:35:9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-2xl px-6 text-center",
					"data-tsd-source": "/src/routes/order-confirmed.tsx:39:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center mb-8",
							"data-tsd-source": "/src/routes/order-confirmed.tsx:41:11",
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
								"data-tsd-source": "/src/routes/order-confirmed.tsx:42:13",
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
									"data-tsd-source": "/src/routes/order-confirmed.tsx:48:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
										points: "20 6 9 17 4 12",
										"data-tsd-source": "/src/routes/order-confirmed.tsx:55:17"
									})
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
							"data-tsd-source": "/src/routes/order-confirmed.tsx:60:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:65:13",
								children: "§ Order Confirmed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-4xl md:text-6xl leading-[0.95]",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:66:13",
								children: ["Thank You, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									"data-tsd-source": "/src/routes/order-confirmed.tsx:67:26",
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
							"data-tsd-source": "/src/routes/order-confirmed.tsx:71:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-chrome-dim leading-relaxed max-w-md mx-auto",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:77:13",
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
							"data-tsd-source": "/src/routes/order-confirmed.tsx:84:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:91:13",
								children: "Order Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xl md:text-2xl tracking-[0.08em] text-chrome",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:92:13",
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
							"data-tsd-source": "/src/routes/order-confirmed.tsx:95:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									const receipt = `Order: ${orderId}\nDate: ${(/* @__PURE__ */ new Date()).toISOString()}\n\nThank you for your patronage.\n— VintageCvunt · Casa d'Argento`;
									const blob = new Blob([receipt], { type: "text/plain" });
									const url = URL.createObjectURL(blob);
									const a = document.createElement("a");
									a.href = url;
									a.download = `receipt-${orderId}.txt`;
									a.click();
									URL.revokeObjectURL(url);
								},
								className: "btn-chrome btn-chrome-inner",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:101:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									"data-tsd-source": "/src/routes/order-confirmed.tsx:114:15",
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
									"data-tsd-source": "/src/routes/order-confirmed.tsx:115:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4",
											"data-tsd-source": "/src/routes/order-confirmed.tsx:116:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
											points: "7 10 12 15 17 10",
											"data-tsd-source": "/src/routes/order-confirmed.tsx:117:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "15",
											x2: "12",
											y2: "3",
											"data-tsd-source": "/src/routes/order-confirmed.tsx:118:17"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-dim hover:text-foreground transition-colors",
								"data-tsd-source": "/src/routes/order-confirmed.tsx:121:13",
								children: "Continue Shopping →"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/order-confirmed.tsx:128:7" })
		]
	});
}
//#endregion
export { OrderConfirmed as component };
