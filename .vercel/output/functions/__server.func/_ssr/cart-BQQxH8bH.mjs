import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useCurrency, i as useCartContext } from "./currency-context-dbZ1tzKb.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-B2p0RPiN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-BQQxH8bH.js
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
function CartPage() {
	const { formatPrice } = useCurrency();
	const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 md:pt-44 pb-12 md:pb-20 overflow-hidden",
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
						children: "— Your Ledger"
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
						className: "font-display text-[clamp(2.4rem,10vw,6rem)] leading-[0.9] tracking-[-0.03em]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Shopping"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cart" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: cart.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-7xl italic text-chrome-dim/30 mb-6",
								children: "◇"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl md:text-4xl text-chrome-dim",
								children: "Your ledger is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-mono text-xs text-chrome-dim/50",
								children: "Objects await your discovery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "mt-8 btn-chrome btn-chrome-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "Browse Collection"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8 md:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-8 space-y-4",
							children: cart.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .6,
									ease: EASE,
									delay: i * .05
								},
								className: "flex items-center gap-4 md:gap-6 rounded-2xl border border-chrome/20 bg-graphite/50 p-4 md:p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/products/$slug",
										params: { slug: item.slug },
										className: "shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border border-chrome/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
												webp: item.webp,
												fallback: item.src,
												alt: item.name,
												className: "h-full w-full object-cover"
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/products/$slug",
												params: { slug: item.slug },
												className: "font-display text-base md:text-xl text-foreground hover:text-chrome transition-colors truncate block",
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-sm text-chrome mt-1",
												children: formatPrice(item.price)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-0 rounded-lg border border-chrome/30 overflow-hidden",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => updateQuantity(item.id, item.quantity - 1),
															className: "h-8 w-8 grid place-items-center text-sm text-chrome-dim hover:bg-graphite-2 transition-colors",
															children: "−"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															value: item.quantity,
															onChange: (e) => {
																const val = parseInt(e.target.value, 10);
																if (!isNaN(val)) updateQuantity(item.id, Math.max(1, val));
															},
															className: "h-8 w-12 bg-transparent text-center font-mono text-sm text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => updateQuantity(item.id, item.quantity + 1),
															className: "h-8 w-8 grid place-items-center text-sm text-chrome-dim hover:bg-graphite-2 transition-colors",
															children: "+"
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => removeFromCart(item.id),
													className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-red-400 transition-colors",
													children: "Remove"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-sm text-chrome",
											children: formatPrice(item.price * item.quantity)
										})
									})
								]
							}, item.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8",
								style: { boxShadow: "var(--shadow-plate)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										children: "Order Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-6" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs text-chrome-dim truncate max-w-[180px]",
												children: [
													item.name,
													" × ",
													item.quantity
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-chrome shrink-0 ml-2",
												children: formatPrice(item.price * item.quantity)
											})]
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-6" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
											children: "Subtotal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-lg text-chrome",
											children: formatPrice(cartTotal)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim/50",
										children: "Shipping calculated at checkout"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/checkout",
										className: "mt-6 btn-chrome btn-chrome-inner w-full justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "btn-label",
											children: "Checkout"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 14 14",
											fill: "none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M1 7h12M8 2l5 5-5 5",
												stroke: "currentColor",
												strokeWidth: "1.2"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/shop",
										className: "mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-foreground transition-colors",
										children: "Continue Shopping"
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { CartPage as component };
