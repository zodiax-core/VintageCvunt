import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as editorial_2_default$1, c as product_chain_default, d as product_jacket_default$1, f as product_ring_default, i as editorial_2_default, l as product_chain_default$1, m as useCartContext, n as editorial_1_default, o as product_boots_default, p as product_ring_default$1, r as editorial_1_default$1, s as product_boots_default$1, u as product_jacket_default } from "./product-boots-yUznlmdZ.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-WijJY6Fs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OptimizedImage({ webp, fallback, className, alt, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
		"data-tsd-source": "/src/components/OptimizedImage.tsx:10:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
			srcSet: webp,
			type: "image/webp",
			"data-tsd-source": "/src/components/OptimizedImage.tsx:11:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: fallback,
			alt: alt ?? "",
			className,
			...rest
		})]
	});
}
var EASE$2 = [
	.16,
	1,
	.3,
	1
];
var searchProducts = [
	{
		id: 1,
		name: "Meridian Coat",
		category: "Outerwear",
		price: 1284e3,
		slug: "meridian-coat",
		src: editorial_1_default$1,
		webp: editorial_1_default
	},
	{
		id: 2,
		name: "Thorn Signet, Silver",
		category: "Silverwork",
		price: 267e3,
		slug: "thorn-signet-silver",
		src: product_ring_default$1,
		webp: product_ring_default
	},
	{
		id: 3,
		name: "Papillon Chain",
		category: "Adornment",
		price: 402e3,
		slug: "papillon-chain",
		src: product_chain_default$1,
		webp: product_chain_default
	},
	{
		id: 4,
		name: "Reliquary Rider",
		category: "Outerwear",
		price: 1107e3,
		slug: "reliquary-rider",
		src: product_jacket_default$1,
		webp: product_jacket_default
	},
	{
		id: 5,
		name: "Ossuary Boot",
		category: "Footwear",
		price: 462e3,
		slug: "ossuary-boot",
		src: product_boots_default$1,
		webp: product_boots_default
	},
	{
		id: 6,
		name: "Argent Cross Pendant",
		category: "Adornment",
		price: 186e3,
		slug: "argent-cross-pendant",
		src: product_ring_default$1,
		webp: product_ring_default
	},
	{
		id: 7,
		name: "Basilica Trench, Onyx",
		category: "Outerwear",
		price: 1536e3,
		slug: "basilica-trench-onyx",
		src: editorial_2_default$1,
		webp: editorial_2_default
	},
	{
		id: 8,
		name: "Vesper Cuff, Brushed",
		category: "Silverwork",
		price: 234e3,
		slug: "vesper-cuff-brushed",
		src: product_chain_default$1,
		webp: product_chain_default
	},
	{
		id: 9,
		name: "Nave Boot, High",
		category: "Footwear",
		price: 564e3,
		slug: "nave-boot-high",
		src: product_boots_default$1,
		webp: product_boots_default
	},
	{
		id: 10,
		name: "Rosary of Iron",
		category: "Adornment",
		price: 282e3,
		slug: "rosary-of-iron",
		src: product_ring_default$1,
		webp: product_ring_default
	},
	{
		id: 11,
		name: "Chrome Signet Ring",
		category: "Silverwork",
		price: 32e4,
		slug: "chrome-signet-ring",
		src: product_ring_default$1,
		webp: product_ring_default
	},
	{
		id: 12,
		name: "Cathedral Scarf",
		category: "Outerwear",
		price: 185e3,
		slug: "cathedral-scarf",
		src: editorial_1_default$1,
		webp: editorial_1_default
	}
];
var priceLabel$1 = (p) => "PKR " + p.toLocaleString("en-PK");
function SearchOverlay({ open, onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (open) {
			setQuery("");
			setTimeout(() => inputRef.current?.focus(), 100);
			document.body.style.overflow = "hidden";
		} else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		const handleKey = (e) => {
			if (e.key === "Escape" && open) onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [open, onClose]);
	const filtered = query.trim() ? searchProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : [];
	const goToProduct = (slug) => {
		onClose();
		navigate({
			to: "/products/$slug",
			params: { slug }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		"data-tsd-source": "/src/components/SearchOverlay.tsx:83:5",
		children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: {
				duration: .25,
				ease: EASE$2
			},
			className: "fixed inset-0 z-[60] flex items-start justify-center bg-black/80 backdrop-blur-xl pt-[15vh] md:pt-[18vh]",
			onClick: (e) => {
				if (e.target === e.currentTarget) onClose();
			},
			"data-tsd-source": "/src/components/SearchOverlay.tsx:85:9",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					y: -20,
					opacity: 0,
					scale: .97
				},
				animate: {
					y: 0,
					opacity: 1,
					scale: 1
				},
				exit: {
					y: -20,
					opacity: 0,
					scale: .97
				},
				transition: {
					duration: .35,
					ease: EASE$2
				},
				className: "w-full max-w-2xl px-4 md:px-6",
				"data-tsd-source": "/src/components/SearchOverlay.tsx:93:11",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					"data-tsd-source": "/src/components/SearchOverlay.tsx:101:13",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "absolute left-5 top-1/2 -translate-y-1/2 text-chrome-dim/50",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:102:15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "11",
								cy: "11",
								r: "8",
								"data-tsd-source": "/src/components/SearchOverlay.tsx:113:17"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M21 21l-4.35-4.35",
								"data-tsd-source": "/src/components/SearchOverlay.tsx:114:17"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "text",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search objects…",
							className: "w-full rounded-2xl border border-chrome/40 bg-graphite/80 pl-12 pr-12 py-5 font-display text-xl md:text-2xl text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors backdrop-blur",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:116:15"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(""),
							className: "absolute right-5 top-1/2 -translate-y-1/2 text-chrome-dim/50 hover:text-foreground transition-colors",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:125:17",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"data-tsd-source": "/src/components/SearchOverlay.tsx:129:19",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M18 6L6 18M6 6l12 12",
									"data-tsd-source": "/src/components/SearchOverlay.tsx:130:21"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onClose,
							className: "absolute -right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-foreground transition-colors",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:134:15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"data-tsd-source": "/src/components/SearchOverlay.tsx:138:17",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M18 6L6 18M6 6l12 12",
									"data-tsd-source": "/src/components/SearchOverlay.tsx:139:19"
								})
							}), "ESC"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					style: {
						maxHeight: "55vh",
						overflowY: "auto",
						overscrollBehavior: "contain"
					},
					"data-tsd-source": "/src/components/SearchOverlay.tsx:146:13",
					children: [query.trim() && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center",
						"data-tsd-source": "/src/components/SearchOverlay.tsx:148:17",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-chrome-dim italic",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:149:19",
							children: "No objects found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xs text-chrome-dim/50",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:150:19",
							children: "Try a different search term"
						})]
					}), filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						"data-tsd-source": "/src/components/SearchOverlay.tsx:154:17",
						children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => goToProduct(p.slug),
							className: "flex items-center gap-4 w-full rounded-2xl border border-chrome/20 bg-graphite/60 hover:bg-graphite p-3 md:p-4 text-left transition-all group backdrop-blur",
							"data-tsd-source": "/src/components/SearchOverlay.tsx:156:21",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-xl border border-chrome/30",
									"data-tsd-source": "/src/components/SearchOverlay.tsx:161:23",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
										webp: p.webp,
										fallback: p.src,
										alt: p.name,
										className: "h-full w-full object-cover",
										"data-tsd-source": "/src/components/SearchOverlay.tsx:162:25"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									"data-tsd-source": "/src/components/SearchOverlay.tsx:164:23",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg md:text-xl text-foreground group-hover:text-chrome transition-colors truncate",
										"data-tsd-source": "/src/components/SearchOverlay.tsx:165:25",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-dim",
										"data-tsd-source": "/src/components/SearchOverlay.tsx:166:25",
										children: p.category
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm text-chrome shrink-0",
									"data-tsd-source": "/src/components/SearchOverlay.tsx:168:23",
									children: priceLabel$1(p.price)
								})
							]
						}, p.id))
					})]
				})]
			})
		})
	});
}
var EASE$1 = [
	.32,
	.72,
	0,
	1
];
var priceLabel = (p) => "PKR " + p.toLocaleString("en-PK");
function CartDrawer({ open, onClose }) {
	const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartContext();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const handleCheckout = () => {
		onClose();
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		"data-tsd-source": "/src/components/CartDrawer.tsx:29:5",
		children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: {
				duration: .3,
				ease: EASE$1
			},
			className: "fixed inset-0 z-[70] bg-black/60 backdrop-blur-md",
			onClick: onClose,
			"data-tsd-source": "/src/components/CartDrawer.tsx:33:11"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { y: "100%" },
			animate: { y: 0 },
			exit: { y: "100%" },
			transition: {
				duration: .5,
				ease: EASE$1
			},
			className: "fixed inset-x-0 bottom-0 z-[80] flex flex-col rounded-t-3xl border-t border-chrome bg-background max-h-[85vh]",
			style: { boxShadow: "0 -20px 60px -20px oklch(0 0 0 / 0.8)" },
			"data-tsd-source": "/src/components/CartDrawer.tsx:43:11",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-6 pt-5 pb-3 border-b border-chrome/30",
					"data-tsd-source": "/src/components/CartDrawer.tsx:52:13",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-tsd-source": "/src/components/CartDrawer.tsx:53:15",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
							"data-tsd-source": "/src/components/CartDrawer.tsx:54:17",
							children: "Your Ledger"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-chrome-dim/60",
							"data-tsd-source": "/src/components/CartDrawer.tsx:55:17",
							children: [
								cartCount,
								" ",
								cartCount === 1 ? "object" : "objects"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "h-8 w-8 rounded-full border border-chrome/40 grid place-items-center hover:bg-graphite transition-colors",
						"data-tsd-source": "/src/components/CartDrawer.tsx:57:15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"data-tsd-source": "/src/components/CartDrawer.tsx:58:17",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M18 6L6 18M6 6l12 12",
								"data-tsd-source": "/src/components/CartDrawer.tsx:59:19"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto overscroll-contain px-6 py-4",
					"data-tsd-source": "/src/components/CartDrawer.tsx:65:13",
					children: cart.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-16 text-center",
						"data-tsd-source": "/src/components/CartDrawer.tsx:67:17",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-5xl italic text-chrome-dim/30 mb-4",
								"data-tsd-source": "/src/components/CartDrawer.tsx:68:19",
								children: "◇"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-chrome-dim",
								"data-tsd-source": "/src/components/CartDrawer.tsx:69:19",
								children: "Your ledger is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs text-chrome-dim/50",
								"data-tsd-source": "/src/components/CartDrawer.tsx:70:19",
								children: "Objects await your discovery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								onClick: onClose,
								className: "mt-6 btn-chrome btn-chrome-inner",
								"data-tsd-source": "/src/components/CartDrawer.tsx:71:19",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									"data-tsd-source": "/src/components/CartDrawer.tsx:72:21",
									children: "Browse Collection"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						"data-tsd-source": "/src/components/CartDrawer.tsx:76:17",
						children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-chrome/20 bg-graphite/50 p-3",
							"data-tsd-source": "/src/components/CartDrawer.tsx:78:21",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products/$slug",
								params: { slug: item.slug },
								onClick: onClose,
								className: "shrink-0",
								"data-tsd-source": "/src/components/CartDrawer.tsx:79:23",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-16 w-16 rounded-xl overflow-hidden border border-chrome/30",
									"data-tsd-source": "/src/components/CartDrawer.tsx:80:25",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
										webp: item.webp,
										fallback: item.src,
										alt: item.name,
										className: "h-full w-full object-cover",
										"data-tsd-source": "/src/components/CartDrawer.tsx:81:27"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								"data-tsd-source": "/src/components/CartDrawer.tsx:84:23",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/products/$slug",
										params: { slug: item.slug },
										onClick: onClose,
										className: "font-display text-base text-foreground hover:text-chrome transition-colors truncate block",
										"data-tsd-source": "/src/components/CartDrawer.tsx:85:25",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-chrome mt-0.5",
										"data-tsd-source": "/src/components/CartDrawer.tsx:88:25",
										children: priceLabel(item.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-2",
										"data-tsd-source": "/src/components/CartDrawer.tsx:89:25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-0 rounded-lg border border-chrome/30 overflow-hidden",
											"data-tsd-source": "/src/components/CartDrawer.tsx:90:27",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQuantity(item.id, item.quantity - 1),
													className: "h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors",
													"data-tsd-source": "/src/components/CartDrawer.tsx:91:29",
													children: "−"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: item.quantity,
													onChange: (e) => {
														const val = parseInt(e.target.value, 10);
														if (!isNaN(val)) updateQuantity(item.id, Math.max(1, val));
													},
													className: "h-7 w-10 bg-transparent text-center font-mono text-xs text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
													"data-tsd-source": "/src/components/CartDrawer.tsx:97:29"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => updateQuantity(item.id, item.quantity + 1),
													className: "h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors",
													"data-tsd-source": "/src/components/CartDrawer.tsx:106:29",
													children: "+"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeFromCart(item.id),
											className: "ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-chrome-dim/50 hover:text-red-400 transition-colors",
											"data-tsd-source": "/src/components/CartDrawer.tsx:113:27",
											children: "Remove"
										})]
									})
								]
							})]
						}, item.id))
					})
				}),
				cart.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-chrome/30 px-6 py-4 space-y-3",
					"data-tsd-source": "/src/components/CartDrawer.tsx:129:15",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							"data-tsd-source": "/src/components/CartDrawer.tsx:130:17",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
								"data-tsd-source": "/src/components/CartDrawer.tsx:131:19",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-lg text-chrome",
								"data-tsd-source": "/src/components/CartDrawer.tsx:132:19",
								children: priceLabel(cartTotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim/50",
							"data-tsd-source": "/src/components/CartDrawer.tsx:134:17",
							children: "Shipping calculated at checkout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleCheckout,
							className: "btn-chrome btn-chrome-inner w-full justify-center",
							"data-tsd-source": "/src/components/CartDrawer.tsx:135:17",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								"data-tsd-source": "/src/components/CartDrawer.tsx:136:19",
								children: "Checkout"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "none",
								"data-tsd-source": "/src/components/CartDrawer.tsx:137:19",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1 7h12M8 2l5 5-5 5",
									stroke: "currentColor",
									strokeWidth: "1.2",
									"data-tsd-source": "/src/components/CartDrawer.tsx:137:79"
								})
							})]
						})
					]
				})
			]
		})] })
	});
}
var EASE = [
	.16,
	1,
	.3,
	1
];
function SiteNav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const { cartCount } = useCartContext();
	const navigate = useNavigate();
	const headerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);
	const isDesktop = () => window.innerWidth >= 768;
	const handleCartClick = () => {
		if (isDesktop()) navigate({ to: "/cart" });
		else setCartOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
			ref: headerRef,
			initial: {
				y: -30,
				opacity: 0
			},
			animate: {
				y: 0,
				opacity: 1
			},
			transition: {
				duration: 1.2,
				ease: EASE,
				delay: .3
			},
			className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "px-3 pt-3" : "px-6 pt-6"}`,
			"data-tsd-source": "/src/components/SiteNav.tsx:37:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative mx-auto flex items-center justify-between gap-4 rounded-3xl border border-chrome bg-white transition-all duration-500 ${scrolled ? "max-w-6xl px-5 py-2.5" : "max-w-7xl px-7 py-4"}`,
				style: { boxShadow: "var(--shadow-plate)" },
				"data-tsd-source": "/src/components/SiteNav.tsx:44:9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3 min-w-0",
						"data-tsd-source": "/src/components/SiteNav.tsx:48:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2 w-2 shrink-0 rounded-full bg-black",
							"data-tsd-source": "/src/components/SiteNav.tsx:49:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.28em] text-black truncate",
							"data-tsd-source": "/src/components/SiteNav.tsx:50:13",
							children: "VintageCvunt"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70",
						"data-tsd-source": "/src/components/SiteNav.tsx:53:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "relative transition-colors hover:text-black",
								"data-tsd-source": "/src/components/SiteNav.tsx:54:13",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "relative transition-colors hover:text-black",
								"data-tsd-source": "/src/components/SiteNav.tsx:55:13",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "relative transition-colors hover:text-black",
								"data-tsd-source": "/src/components/SiteNav.tsx:56:13",
								children: "About Us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "relative transition-colors hover:text-black",
								"data-tsd-source": "/src/components/SiteNav.tsx:57:13",
								children: "Contact"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black",
						"data-tsd-source": "/src/components/SiteNav.tsx:60:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchOpen(true),
								className: "hover:opacity-70 transition-opacity",
								"aria-label": "Search",
								"data-tsd-source": "/src/components/SiteNav.tsx:61:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"data-tsd-source": "/src/components/SiteNav.tsx:66:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "11",
										cy: "11",
										r: "8",
										"data-tsd-source": "/src/components/SiteNav.tsx:67:17"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M21 21l-4.35-4.35",
										"data-tsd-source": "/src/components/SiteNav.tsx:68:17"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "hidden md:inline hover:opacity-70 transition-opacity",
								"data-tsd-source": "/src/components/SiteNav.tsx:72:13",
								children: "Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleCartClick,
								className: "flex items-center hover:opacity-70 transition-opacity",
								"data-tsd-source": "/src/components/SiteNav.tsx:74:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative",
									"data-tsd-source": "/src/components/SiteNav.tsx:75:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.5",
										"data-tsd-source": "/src/components/SiteNav.tsx:76:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
												"data-tsd-source": "/src/components/SiteNav.tsx:76:117"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M3 6h18",
												"data-tsd-source": "/src/components/SiteNav.tsx:76:175"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M16 10a4 4 0 01-8 0",
												"data-tsd-source": "/src/components/SiteNav.tsx:76:194"
											})
										]
									}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-medium border border-white",
										"data-tsd-source": "/src/components/SiteNav.tsx:78:19",
										children: cartCount > 9 ? "9+" : cartCount
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "md:hidden flex flex-col items-center justify-center gap-1.5 h-8 w-8 ml-2",
								onClick: () => setMenuOpen(!menuOpen),
								"data-tsd-source": "/src/components/SiteNav.tsx:85:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`,
										"data-tsd-source": "/src/components/SiteNav.tsx:86:15"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `block h-[1px] w-5 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`,
										"data-tsd-source": "/src/components/SiteNav.tsx:87:15"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`,
										"data-tsd-source": "/src/components/SiteNav.tsx:88:15"
									})
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				"data-tsd-source": "/src/components/SiteNav.tsx:93:9",
				children: menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						height: 0,
						opacity: 0,
						marginTop: 0
					},
					animate: {
						height: "auto",
						opacity: 1,
						marginTop: 12
					},
					exit: {
						height: 0,
						opacity: 0,
						marginTop: 0
					},
					transition: {
						duration: .3,
						ease: EASE
					},
					className: "overflow-hidden mx-auto max-w-7xl px-3",
					"data-tsd-source": "/src/components/SiteNav.tsx:95:13",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-chrome bg-white p-6 flex flex-col gap-6",
						style: { boxShadow: "var(--shadow-plate)" },
						"data-tsd-source": "/src/components/SiteNav.tsx:102:15",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex flex-col gap-6 font-mono text-sm uppercase tracking-[0.24em] text-black/70",
								"data-tsd-source": "/src/components/SiteNav.tsx:103:17",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										onClick: () => setMenuOpen(false),
										className: "hover:text-black transition-colors",
										"data-tsd-source": "/src/components/SiteNav.tsx:104:19",
										children: "Home"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/shop",
										onClick: () => setMenuOpen(false),
										className: "hover:text-black transition-colors",
										"data-tsd-source": "/src/components/SiteNav.tsx:105:19",
										children: "Shop"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										onClick: () => setMenuOpen(false),
										className: "hover:text-black transition-colors",
										"data-tsd-source": "/src/components/SiteNav.tsx:106:19",
										children: "About Us"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										onClick: () => setMenuOpen(false),
										className: "hover:text-black transition-colors",
										"data-tsd-source": "/src/components/SiteNav.tsx:107:19",
										children: "Contact"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-px w-full bg-black/10",
								"data-tsd-source": "/src/components/SiteNav.tsx:109:17"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70",
								"data-tsd-source": "/src/components/SiteNav.tsx:110:17",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-left hover:text-black transition-colors",
										onClick: () => {
											setMenuOpen(false);
											setSearchOpen(true);
										},
										"data-tsd-source": "/src/components/SiteNav.tsx:111:19",
										children: "Search"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										onClick: () => setMenuOpen(false),
										className: "hover:text-black transition-colors",
										"data-tsd-source": "/src/components/SiteNav.tsx:112:19",
										children: "Account"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "text-left hover:text-black transition-colors",
										onClick: () => {
											setMenuOpen(false);
											handleCartClick();
										},
										"data-tsd-source": "/src/components/SiteNav.tsx:113:19",
										children: [
											"Cart (",
											cartCount,
											")"
										]
									})
								]
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
			open: searchOpen,
			onClose: () => setSearchOpen(false),
			"data-tsd-source": "/src/components/SiteNav.tsx:121:7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
			open: cartOpen,
			onClose: () => setCartOpen(false),
			"data-tsd-source": "/src/components/SiteNav.tsx:122:7"
		})
	] });
}
var logo_default$1 = "/assets/logo-CJzlZTIN.png";
var logo_default = "/assets/logo-BudfrtGN.webp";
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative bg-background pt-24 pb-10",
		"data-tsd-source": "/src/components/SiteFooter.tsx:8:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			"data-tsd-source": "/src/components/SiteFooter.tsx:9:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					"data-tsd-source": "/src/components/SiteFooter.tsx:10:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
						webp: logo_default,
						fallback: logo_default$1,
						alt: "VintageCvunt",
						width: 1400,
						height: 400,
						className: "h-auto w-full max-w-4xl opacity-95",
						"data-tsd-source": "/src/components/SiteFooter.tsx:11:11"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divider-chrome my-14",
					"data-tsd-source": "/src/components/SiteFooter.tsx:13:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-10 md:grid-cols-5 text-sm",
					"data-tsd-source": "/src/components/SiteFooter.tsx:14:9",
					children: [
						{
							h: "Atelier",
							l: [
								"Milano",
								"Paris",
								"Tokyo",
								"Bookings"
							]
						},
						{
							h: "Objects",
							l: [
								"Outerwear",
								"Silverwork",
								"Footwear",
								"Adornment"
							]
						},
						{
							h: "House",
							l: [
								"Manifesto",
								"Craftsmen",
								"Materials",
								"Sustainability"
							]
						},
						{
							h: "Service",
							l: [
								"Shipping",
								"Returns",
								"Care",
								"Contact"
							]
						},
						{
							h: "Follow",
							l: [
								"Instagram",
								"Journal",
								"Pinterest",
								"Discord"
							]
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-tsd-source": "/src/components/SiteFooter.tsx:22:13",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
							"data-tsd-source": "/src/components/SiteFooter.tsx:23:15",
							children: c.h
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 font-display text-lg",
							"data-tsd-source": "/src/components/SiteFooter.tsx:24:15",
							children: c.l.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								"data-tsd-source": "/src/components/SiteFooter.tsx:25:33",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-chrome transition-colors",
									"data-tsd-source": "/src/components/SiteFooter.tsx:25:45",
									children: x
								})
							}, x))
						})]
					}, c.h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chrome pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
					"data-tsd-source": "/src/components/SiteFooter.tsx:30:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-tsd-source": "/src/components/SiteFooter.tsx:31:11",
							children: "© MMXXVI VintageCvunt · Casa d'Argento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-tsd-source": "/src/components/SiteFooter.tsx:32:11",
							children: "Milano · N 45°27′ E 9°11′"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-tsd-source": "/src/components/SiteFooter.tsx:33:11",
							children: "Privacy · Terms · Cookies"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { SiteFooter as n, SiteNav as r, OptimizedImage as t };
