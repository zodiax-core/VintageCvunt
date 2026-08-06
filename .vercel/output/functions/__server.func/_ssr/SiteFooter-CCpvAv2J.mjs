import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useCurrency, i as useCartContext } from "./currency-context-dbZ1tzKb.mjs";
import { n as useAuthContext } from "./auth-context-CocvLYL7.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-CCpvAv2J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE$2 = [
	.16,
	1,
	.3,
	1
];
function SearchOverlay({ open, onClose }) {
	const allProducts = useQuery(api.products.list, open ? {} : "skip") ?? [];
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { formatPrice } = useCurrency();
	(0, import_react.useEffect)(() => {
		if (open) {
			setQuery("");
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [open]);
	(0, import_react.useEffect)(() => {
		const handleKey = (e) => {
			if (e.key === "Escape" && open) onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [open, onClose]);
	const filtered = query.trim() ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : [];
	const goToProduct = (slug) => {
		onClose();
		navigate({
			to: "/products/$slug",
			params: { slug }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "11",
							cy: "11",
							r: "8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 21l-4.35-4.35" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "text",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search objects…",
						className: "w-full rounded-2xl border border-chrome/40 bg-graphite/80 pl-12 pr-12 py-5 font-display text-xl md:text-2xl text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors backdrop-blur"
					}),
					query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuery(""),
						className: "absolute right-5 top-1/2 -translate-y-1/2 text-chrome-dim/50 hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6L6 18M6 6l12 12" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onClose,
						className: "absolute -right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6L6 18M6 6l12 12" })
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
				children: [query.trim() && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-chrome-dim italic",
						children: "No objects found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-chrome-dim/50",
						children: "Try a different search term"
					})]
				}), filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => goToProduct(p.slug),
						className: "flex items-center gap-4 w-full rounded-2xl border border-chrome/20 bg-graphite/60 hover:bg-graphite p-3 md:p-4 text-left transition-all group backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-xl border border-chrome/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.images?.[0] || "/placeholder.svg",
									alt: p.name,
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg md:text-xl text-foreground group-hover:text-chrome transition-colors truncate",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-dim",
									children: p.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-chrome shrink-0",
								children: formatPrice(p.price)
							})
						]
					}, p._id))
				})]
			})]
		})
	}) });
}
function OptimizedImage({ webp, fallback, className, alt, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
		srcSet: webp,
		type: "image/webp"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: fallback,
		alt: alt ?? "",
		className,
		...rest
	})] });
}
var EASE$1 = [
	.32,
	.72,
	0,
	1
];
function CartDrawer({ open, onClose }) {
	const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartContext();
	const { formatPrice } = useCurrency();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .3,
			ease: EASE$1
		},
		className: "fixed inset-0 z-[70] bg-black/60 backdrop-blur-md",
		onClick: onClose
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-6 pt-5 pb-3 border-b border-chrome/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
					children: "Your Ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-chrome-dim/60",
					children: [
						cartCount,
						" ",
						cartCount === 1 ? "object" : "objects"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "h-8 w-8 rounded-full border border-chrome/40 grid place-items-center hover:bg-graphite transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6L6 18M6 6l12 12" })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto overscroll-contain px-6 py-4",
				children: cart.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-5xl italic text-chrome-dim/30 mb-4",
							children: "◇"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-chrome-dim",
							children: "Your ledger is empty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xs text-chrome-dim/50",
							children: "Objects await your discovery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							onClick: onClose,
							className: "mt-6 btn-chrome btn-chrome-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Browse Collection"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl border border-chrome/20 bg-graphite/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: item.slug },
							onClick: onClose,
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-xl overflow-hidden border border-chrome/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
									webp: item.webp,
									fallback: item.src,
									alt: item.name,
									className: "h-full w-full object-cover"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products/$slug",
									params: { slug: item.slug },
									onClick: onClose,
									className: "font-display text-base text-foreground hover:text-chrome transition-colors truncate block",
									children: item.name
								}),
								(item.selectedSize || item.selectedColor) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[9px] text-chrome-dim/60 mt-0.5",
									children: [item.selectedSize, item.selectedColor].filter(Boolean).join(" / ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-chrome mt-0.5",
									children: formatPrice(item.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-0 rounded-lg border border-chrome/30 overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateQuantity(item.id, item.quantity - 1),
												className: "h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors",
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: item.quantity,
												onChange: (e) => {
													const val = parseInt(e.target.value, 10);
													if (!isNaN(val)) updateQuantity(item.id, Math.max(1, val));
												},
												className: "h-7 w-10 bg-transparent text-center font-mono text-xs text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateQuantity(item.id, item.quantity + 1),
												className: "h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors",
												children: "+"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeFromCart(item.id),
										className: "ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-chrome-dim/50 hover:text-red-400 transition-colors",
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
				children: [
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
						className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim/50",
						children: "Shipping calculated at checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCheckout,
						className: "btn-chrome btn-chrome-inner w-full justify-center",
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
					})
				]
			})
		]
	})] }) });
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
	const { user, isAdmin } = useAuthContext();
	const { currency, toggleCurrency } = useCurrency();
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative mx-auto flex items-center justify-between gap-4 rounded-3xl border border-chrome bg-white transition-all duration-500 ${scrolled ? "max-w-6xl px-5 py-2.5" : "max-w-7xl px-7 py-4"}`,
				style: { boxShadow: "var(--shadow-plate)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 shrink-0 rounded-full bg-black" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.28em] text-black truncate",
							children: "VintageCvunt"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "relative transition-colors hover:text-black",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "relative transition-colors hover:text-black",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "relative transition-colors hover:text-black",
								children: "About Us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "relative transition-colors hover:text-black",
								children: "Contact"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggleCurrency,
								className: "hover:opacity-70 transition-opacity text-[10px] tracking-[0.15em]",
								"aria-label": "Toggle currency",
								children: currency === "PKR" ? "PKR" : "USD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchOpen(true),
								className: "hover:opacity-70 transition-opacity",
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "11",
										cy: "11",
										r: "8"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 21l-4.35-4.35" })]
								})
							}),
							isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] bg-foreground text-background px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity",
								children: "Admin"
							}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account",
								className: "hidden md:inline hover:opacity-70 transition-opacity font-mono text-[11px]",
								children: user.name.split(" ")[0]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "hidden md:inline hover:opacity-70 transition-opacity",
								children: "Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleCartClick,
								className: "flex items-center hover:opacity-70 transition-opacity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 01-8 0" })
										]
									}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-medium border border-white",
										children: cartCount > 9 ? "9+" : cartCount
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "md:hidden flex flex-col items-center justify-center gap-1.5 h-8 w-8 ml-2",
								onClick: () => setMenuOpen(!menuOpen),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-[1px] w-5 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}` })
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-chrome bg-white p-6 flex flex-col gap-6",
					style: { boxShadow: "var(--shadow-plate)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex flex-col gap-6 font-mono text-sm uppercase tracking-[0.24em] text-black/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "Shop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "About Us"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "Contact"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-black/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-left hover:text-black transition-colors",
									onClick: () => {
										setMenuOpen(false);
										setSearchOpen(true);
									},
									children: "Search"
								}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/account",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "Account"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									onClick: () => setMenuOpen(false),
									className: "hover:text-black transition-colors",
									children: "Account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "text-left hover:text-black transition-colors",
									onClick: () => {
										setMenuOpen(false);
										handleCartClick();
									},
									children: [
										"Cart (",
										cartCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "text-left hover:text-black transition-colors",
									onClick: toggleCurrency,
									children: ["Currency: ", currency]
								})
							]
						})
					]
				})
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
			open: searchOpen,
			onClose: () => setSearchOpen(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
			open: cartOpen,
			onClose: () => setCartOpen(false)
		})
	] });
}
var logo_default$1 = "/assets/logo-CJzlZTIN.png";
var logo_default = "/assets/logo-BudfrtGN.webp";
function SiteFooter() {
	const settings = useQuery(api.settings.get);
	const activeCollections = (useQuery(api.collections.list) ?? []).filter((c) => c.isActive);
	const storeName = settings?.storeName || "VintageCvunt";
	const brandLinks = [
		{
			n: "About",
			to: "/about"
		},
		{
			n: "Contact",
			to: "/contact"
		},
		{
			n: "FAQ",
			to: "/faq"
		}
	];
	const shopLinks = [{
		n: "All Objects",
		to: "/shop"
	}, ...activeCollections.map((c) => ({
		n: c.name,
		to: "/shop"
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative bg-background pt-24 pb-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
						webp: logo_default,
						fallback: logo_default$1,
						alt: storeName,
						width: 1400,
						height: 400,
						className: "h-auto w-full max-w-4xl opacity-95"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-10 md:grid-cols-4 text-sm",
					children: [
						{
							h: "Brand",
							l: brandLinks
						},
						{
							h: "Shop",
							l: shopLinks
						},
						{
							h: "Service",
							l: [
								{
									n: "Shipping & Returns",
									to: "/shipping-returns"
								},
								{
									n: "Size Guide",
									to: "/size-guide"
								},
								{
									n: "Privacy Policy",
									to: "/privacy-policy"
								},
								{
									n: "Terms & Conditions",
									to: "/terms-conditions"
								}
							]
						},
						{
							h: "Follow",
							l: [{
								n: "Instagram",
								to: "https://instagram.com/vintagecvunt",
								ext: true
							}]
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
						children: c.h
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 font-display text-lg",
						children: c.l.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x.ext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: x.to,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-chrome transition-colors",
							children: x.n
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: x.to,
							className: "hover:text-chrome transition-colors",
							children: x.n
						}) }, x.n))
					})] }, c.h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chrome pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"© MMXXVI ",
							storeName,
							" · Casa d'Argento"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Karachi · Pakistan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy-policy",
								className: "hover:text-chrome transition-colors",
								children: "Privacy"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms-conditions",
								className: "hover:text-chrome transition-colors",
								children: "Terms"
							}),
							" · Cookies"
						] })
					]
				})
			]
		})
	});
}
//#endregion
export { SiteFooter as n, SiteNav as r, OptimizedImage as t };
