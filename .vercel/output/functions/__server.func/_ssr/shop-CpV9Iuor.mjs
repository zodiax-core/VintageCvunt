import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as logo_default$1, c as product_chain_default, d as product_jacket_default$1, f as product_ring_default, i as logo_default, l as product_chain_default$1, n as editorial_1_default, o as product_boots_default, p as product_ring_default$1, r as editorial_1_default$1, s as product_boots_default$1, t as OptimizedImage, u as product_jacket_default } from "./OptimizedImage-CDdK_kKj.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CpV9Iuor.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var editorial_2_default$1 = "/assets/editorial-2-8RJuX1gc.jpg";
var editorial_2_default = "/assets/editorial-2-D1fiFcYq.webp";
var EASE = [
	.16,
	1,
	.3,
	1
];
var allProducts = [
	{
		id: 1,
		name: "Meridian Coat",
		category: "Outerwear",
		price: 1284e3,
		src: editorial_1_default$1,
		webp: editorial_1_default,
		num: "No. 001"
	},
	{
		id: 2,
		name: "Thorn Signet, Silver",
		category: "Silverwork",
		price: 267e3,
		src: product_ring_default$1,
		webp: product_ring_default,
		num: "No. 007"
	},
	{
		id: 3,
		name: "Papillon Chain",
		category: "Adornment",
		price: 402e3,
		src: product_chain_default$1,
		webp: product_chain_default,
		num: "No. 012"
	},
	{
		id: 4,
		name: "Reliquary Rider",
		category: "Outerwear",
		price: 1107e3,
		src: product_jacket_default$1,
		webp: product_jacket_default,
		num: "No. 021"
	},
	{
		id: 5,
		name: "Ossuary Boot",
		category: "Footwear",
		price: 462e3,
		src: product_boots_default$1,
		webp: product_boots_default,
		num: "No. 034"
	},
	{
		id: 6,
		name: "Argent Cross Pendant",
		category: "Adornment",
		price: 186e3,
		src: product_ring_default$1,
		webp: product_ring_default,
		num: "No. 046"
	},
	{
		id: 7,
		name: "Basilica Trench, Onyx",
		category: "Outerwear",
		price: 1536e3,
		src: editorial_2_default$1,
		webp: editorial_2_default,
		num: "No. 047"
	},
	{
		id: 8,
		name: "Vesper Cuff, Brushed",
		category: "Silverwork",
		price: 234e3,
		src: product_chain_default$1,
		webp: product_chain_default,
		num: "No. 048"
	},
	{
		id: 9,
		name: "Nave Boot, High",
		category: "Footwear",
		price: 564e3,
		src: product_boots_default$1,
		webp: product_boots_default,
		num: "No. 049"
	},
	{
		id: 10,
		name: "Rosary of Iron",
		category: "Adornment",
		price: 282e3,
		src: product_ring_default$1,
		webp: product_ring_default,
		num: "No. 050"
	},
	{
		id: 11,
		name: "Chrome Signet Ring",
		category: "Silverwork",
		price: 32e4,
		src: product_ring_default$1,
		webp: product_ring_default,
		num: "No. 003"
	},
	{
		id: 12,
		name: "Cathedral Scarf",
		category: "Outerwear",
		price: 185e3,
		src: editorial_1_default$1,
		webp: editorial_1_default,
		num: "No. 018"
	}
];
var categories = [
	"All",
	"Outerwear",
	"Silverwork",
	"Footwear",
	"Adornment"
];
var priceRanges = [
	{
		label: "All Prices",
		min: 0,
		max: Infinity
	},
	{
		label: "Under PKR 500k",
		min: 0,
		max: 5e5
	},
	{
		label: "PKR 500k — PKR 1M",
		min: 5e5,
		max: 1e6
	},
	{
		label: "Over PKR 1M",
		min: 1e6,
		max: Infinity
	}
];
var sortOptions = [
	"Featured",
	"Newest",
	"Price: Low — High",
	"Price: High — Low"
];
var priceLabel = (p) => "PKR " + p.toLocaleString("en-PK");
function Shop() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [catOpen, setCatOpen] = (0, import_react.useState)(false);
	const [priceOpen, setPriceOpen] = (0, import_react.useState)(false);
	const [sortOpen, setSortOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("All");
	const [priceRange, setPriceRange] = (0, import_react.useState)(priceRanges[0]);
	const [sort, setSort] = (0, import_react.useState)(sortOptions[0]);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		let result = category === "All" ? allProducts : allProducts.filter((p) => p.category === category);
		result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
		switch (sort) {
			case "Price: Low — High":
				result = [...result].sort((a, b) => a.price - b.price);
				break;
			case "Price: High — Low":
				result = [...result].sort((a, b) => b.price - a.price);
				break;
			case "Newest":
				result = [...result].sort((a, b) => b.id - a.id);
				break;
		}
		return result;
	}, [
		category,
		priceRange,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
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
									className: "transition-colors hover:text-black",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "text-black",
									children: "Shop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "transition-colors hover:text-black",
									children: "About Us"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "transition-colors hover:text-black",
									children: "Contact"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "hidden sm:inline hover:opacity-70 transition-opacity",
									children: "Search"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "hidden md:inline hover:opacity-70 transition-opacity",
									children: "Account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-medium border border-white",
											children: "0"
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
										className: "hover:text-black transition-colors",
										onClick: () => setMenuOpen(false),
										children: "Home"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/shop",
										className: "text-black",
										onClick: () => setMenuOpen(false),
										children: "Shop"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-black transition-colors",
										children: "About Us"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "hover:text-black transition-colors",
										children: "Contact"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-black/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-left hover:text-black transition-colors",
									onClick: () => setMenuOpen(false),
									children: "Search"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-left hover:text-black transition-colors",
									onClick: () => setMenuOpen(false),
									children: "Account"
								})]
							})
						]
					})
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden",
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
						className: "font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						children: "— The Collection · All Objects"
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
						className: "font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Sixty-Two"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Objects of Weight" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome bg-graphite",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6 py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 md:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mr-2",
								children: "Filter by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setCatOpen(!catOpen);
										setPriceOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-3 rounded-full border border-chrome bg-graphite-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors",
									children: [category, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-3 h-3 transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: catOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: -8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									className: "absolute top-full left-0 mt-2 z-20 min-w-[220px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setCategory(c);
											setCatOpen(false);
										},
										className: `block w-full px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${category === c ? "text-chrome" : "text-foreground/70"}`,
										children: c
									}, c))
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setPriceOpen(!priceOpen);
										setCatOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-3 rounded-full border border-chrome bg-graphite-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors",
									children: [priceRange.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-3 h-3 transition-transform duration-300 ${priceOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: priceOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: -8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									className: "absolute top-full left-0 mt-2 z-20 min-w-[260px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: priceRanges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setPriceRange(r);
											setPriceOpen(false);
										},
										className: `block w-full px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${priceRange.label === r.label ? "text-chrome" : "text-foreground/70"}`,
										children: r.label
									}, r.label))
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim ml-auto mr-2",
								children: "Sort by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setSortOpen(!sortOpen);
										setCatOpen(false);
										setPriceOpen(false);
									},
									className: "flex items-center gap-3 rounded-full border border-chrome bg-graphite-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors",
									children: [sort, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-3 h-3 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sortOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: -8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									className: "absolute top-full right-0 mt-2 z-20 min-w-[240px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: sortOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSort(s);
											setSortOpen(false);
										},
										className: `block w-full px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${sort === s ? "text-chrome" : "text-foreground/70"}`,
										children: s
									}, s))
								}) })]
							}),
							(category !== "All" || priceRange.label !== "All Prices" || sort !== "Featured") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setCategory("All");
									setPriceRange(priceRanges[0]);
									setSort("Featured");
								},
								className: "font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-chrome transition-colors ml-2",
								children: "Clear all"
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
							children: [
								filtered.length,
								" object",
								filtered.length !== 1 ? "s" : ""
							]
						})
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-32 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-chrome-dim italic",
							children: "No objects found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setCategory("All");
								setPriceRange(priceRanges[0]);
								setSort("Featured");
							},
							className: "mt-6 btn-chrome btn-chrome-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Clear filters"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
						children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: 20
							},
							transition: {
								duration: .6,
								ease: EASE
							},
							className: "group cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
									style: { boxShadow: "var(--shadow-plate)" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[4/5] overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
												webp: product.webp,
												fallback: product.src,
												alt: product.name,
												className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]",
											children: product.num
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-3 top-3 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]",
											children: "✦"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base md:text-xl truncate",
										children: product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tracking-[0.14em] text-chrome whitespace-nowrap",
										children: priceLabel(product.price)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[9px] uppercase tracking-[0.28em] text-chrome-dim mt-1",
									children: product.category
								})
							]
						}, product.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative bg-background pt-24 pb-10 border-t border-chrome",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
								webp: logo_default,
								fallback: logo_default$1,
								alt: "VintageCvunt",
								width: 1400,
								height: 400,
								className: "h-auto w-full max-w-4xl opacity-95"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-14" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-10 md:grid-cols-5 text-sm",
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
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
								children: c.h
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 font-display text-lg",
								children: c.l.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "hover:text-chrome transition-colors",
									children: x
								}) }, x))
							})] }, c.h))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chrome pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© MMXXVI VintageCvunt · Casa d'Argento" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Milano · N 45°27′ E 9°11′" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Privacy · Terms · Cookies" })
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Shop as component };
