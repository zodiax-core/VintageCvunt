import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as editorial_2_default$1, c as product_chain_default, d as product_jacket_default$1, f as product_ring_default, i as editorial_2_default, l as product_chain_default$1, n as editorial_1_default, o as product_boots_default, p as product_ring_default$1, r as editorial_1_default$1, s as product_boots_default$1, u as product_jacket_default } from "./product-boots-yUznlmdZ.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-WijJY6Fs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-B8uPuuAl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const [catOpen, setCatOpen] = (0, import_react.useState)(false);
	const [priceOpen, setPriceOpen] = (0, import_react.useState)(false);
	const [sortOpen, setSortOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("All");
	const [priceRange, setPriceRange] = (0, import_react.useState)(priceRanges[0]);
	const [sort, setSort] = (0, import_react.useState)(sortOptions[0]);
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
		"data-tsd-source": "/src/routes/shop.tsx:91:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/shop.tsx:92:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden",
				"data-tsd-source": "/src/routes/shop.tsx:95:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					},
					"data-tsd-source": "/src/routes/shop.tsx:96:9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/shop.tsx:100:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE
						},
						className: "font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						"data-tsd-source": "/src/routes/shop.tsx:101:11",
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
						"data-tsd-source": "/src/routes/shop.tsx:109:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								"data-tsd-source": "/src/routes/shop.tsx:115:13",
								children: "Sixty-Two"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/shop.tsx:115:68" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-tsd-source": "/src/routes/shop.tsx:116:13",
								children: "Objects of Weight"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sticky top-0 z-40 border-y border-chrome bg-graphite",
				"data-tsd-source": "/src/routes/shop.tsx:122:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-3 md:px-6 py-3 md:py-5",
					"data-tsd-source": "/src/routes/shop.tsx:123:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-nowrap items-center gap-1.5 md:gap-6 overflow-visible",
						"data-tsd-source": "/src/routes/shop.tsx:124:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mr-2 shrink-0",
								"data-tsd-source": "/src/routes/shop.tsx:125:13",
								children: "Filter by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								"data-tsd-source": "/src/routes/shop.tsx:128:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setCatOpen(!catOpen);
										setPriceOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									"data-tsd-source": "/src/routes/shop.tsx:129:15",
									children: [category, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										"data-tsd-source": "/src/routes/shop.tsx:134:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"data-tsd-source": "/src/routes/shop.tsx:134:159"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									"data-tsd-source": "/src/routes/shop.tsx:136:15",
									children: catOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
										className: "absolute top-full left-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[220px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
										style: { boxShadow: "var(--shadow-heavy)" },
										"data-tsd-source": "/src/routes/shop.tsx:138:19",
										children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setCategory(c);
												setCatOpen(false);
											},
											className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${category === c ? "text-chrome" : "text-foreground/70"}`,
											"data-tsd-source": "/src/routes/shop.tsx:146:23",
											children: c
										}, c))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								"data-tsd-source": "/src/routes/shop.tsx:160:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setPriceOpen(!priceOpen);
										setCatOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									"data-tsd-source": "/src/routes/shop.tsx:161:15",
									children: [priceRange.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${priceOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										"data-tsd-source": "/src/routes/shop.tsx:166:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"data-tsd-source": "/src/routes/shop.tsx:166:161"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									"data-tsd-source": "/src/routes/shop.tsx:168:15",
									children: priceOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
										className: "absolute top-full left-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[260px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
										style: { boxShadow: "var(--shadow-heavy)" },
										"data-tsd-source": "/src/routes/shop.tsx:170:19",
										children: priceRanges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setPriceRange(r);
												setPriceOpen(false);
											},
											className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${priceRange.label === r.label ? "text-chrome" : "text-foreground/70"}`,
											"data-tsd-source": "/src/routes/shop.tsx:178:23",
											children: r.label
										}, r.label))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim ml-auto mr-2 shrink-0",
								"data-tsd-source": "/src/routes/shop.tsx:191:13",
								children: "Sort by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								"data-tsd-source": "/src/routes/shop.tsx:194:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setSortOpen(!sortOpen);
										setCatOpen(false);
										setPriceOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									"data-tsd-source": "/src/routes/shop.tsx:195:15",
									children: [sort, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`,
										viewBox: "0 0 12 12",
										fill: "none",
										"data-tsd-source": "/src/routes/shop.tsx:200:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M2 4l4 4 4-4",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"data-tsd-source": "/src/routes/shop.tsx:200:160"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									"data-tsd-source": "/src/routes/shop.tsx:202:15",
									children: sortOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
										className: "absolute top-full right-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[240px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
										style: { boxShadow: "var(--shadow-heavy)" },
										"data-tsd-source": "/src/routes/shop.tsx:204:19",
										children: sortOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setSort(s);
												setSortOpen(false);
											},
											className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${sort === s ? "text-chrome" : "text-foreground/70"}`,
											"data-tsd-source": "/src/routes/shop.tsx:212:23",
											children: s
										}, s))
									})
								})]
							}),
							(category !== "All" || priceRange.label !== "All Prices" || sort !== "Featured") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setCategory("All");
									setPriceRange(priceRanges[0]);
									setSort("Featured");
								},
								className: "shrink-0 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-chrome transition-colors ml-1 md:ml-2",
								"data-tsd-source": "/src/routes/shop.tsx:226:15",
								children: "Clear"
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 md:py-24",
				"data-tsd-source": "/src/routes/shop.tsx:238:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/shop.tsx:239:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 flex items-center justify-between",
						"data-tsd-source": "/src/routes/shop.tsx:240:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
							"data-tsd-source": "/src/routes/shop.tsx:241:13",
							children: [
								filtered.length,
								" object",
								filtered.length !== 1 ? "s" : ""
							]
						})
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-32 text-center",
						"data-tsd-source": "/src/routes/shop.tsx:247:13",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-chrome-dim italic",
							"data-tsd-source": "/src/routes/shop.tsx:248:15",
							children: "No objects found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setCategory("All");
								setPriceRange(priceRanges[0]);
								setSort("Featured");
							},
							className: "mt-6 btn-chrome btn-chrome-inner",
							"data-tsd-source": "/src/routes/shop.tsx:249:15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								"data-tsd-source": "/src/routes/shop.tsx:253:17",
								children: "Clear filters"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
						"data-tsd-source": "/src/routes/shop.tsx:257:13",
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
							"data-tsd-source": "/src/routes/shop.tsx:259:17",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
								style: { boxShadow: "var(--shadow-plate)" },
								"data-tsd-source": "/src/routes/shop.tsx:268:19",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/5] overflow-hidden",
										"data-tsd-source": "/src/routes/shop.tsx:269:21",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
											webp: product.webp,
											fallback: product.src,
											alt: product.name,
											className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
											"data-tsd-source": "/src/routes/shop.tsx:270:23"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]",
										"data-tsd-source": "/src/routes/shop.tsx:272:21",
										children: product.num
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute right-3 top-3 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]",
										"data-tsd-source": "/src/routes/shop.tsx:273:21",
										children: "✦"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								"data-tsd-source": "/src/routes/shop.tsx:275:19",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs tracking-[0.14em] text-chrome",
									"data-tsd-source": "/src/routes/shop.tsx:276:21",
									children: priceLabel(product.price)
								})
							})]
						}, product.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/shop.tsx:285:7" })
		]
	});
}
//#endregion
export { Shop as component };
