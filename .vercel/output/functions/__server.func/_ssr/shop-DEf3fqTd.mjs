import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useCurrency } from "./currency-context-dbZ1tzKb.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-DsbE5ZVl.mjs";
import { t as Route } from "./shop-DIJc2T3I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DEf3fqTd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
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
function Shop() {
	const { formatPrice } = useCurrency();
	const search = Route.useSearch();
	const allProducts = useQuery(api.products.list) ?? [];
	const collections = useQuery(api.collections.list) ?? [];
	const categories = (0, import_react.useMemo)(() => ["All", ...collections.filter((c) => c.isActive).map((c) => c.name)], [collections]);
	const [catOpen, setCatOpen] = (0, import_react.useState)(false);
	const [priceOpen, setPriceOpen] = (0, import_react.useState)(false);
	const [sortOpen, setSortOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)(search.category ?? "All");
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
				result = [...result].sort((a, b) => b._creationTime - a._creationTime);
				break;
		}
		return result;
	}, [
		allProducts,
		category,
		priceRange,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
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
				className: "sticky top-0 z-40 border-y border-chrome bg-graphite",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-3 md:px-6 py-3 md:py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-nowrap items-center gap-1.5 md:gap-6 overflow-visible",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mr-2 shrink-0",
								children: "Filter by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setCatOpen(!catOpen);
										setPriceOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									children: [category, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`,
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
									className: "absolute top-full left-0 mt-2 z-50 min-w-[160px] md:min-w-[220px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setCategory(c);
											setCatOpen(false);
										},
										className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${category === c ? "text-chrome" : "text-foreground/70"}`,
										children: c
									}, c))
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setPriceOpen(!priceOpen);
										setCatOpen(false);
										setSortOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									children: [priceRange.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${priceOpen ? "rotate-180" : ""}`,
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
									className: "absolute top-full left-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[260px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: priceRanges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setPriceRange(r);
											setPriceOpen(false);
										},
										className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${priceRange.label === r.label ? "text-chrome" : "text-foreground/70"}`,
										children: r.label
									}, r.label))
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim ml-auto mr-2 shrink-0",
								children: "Sort by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setSortOpen(!sortOpen);
										setCatOpen(false);
										setPriceOpen(false);
									},
									className: "flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap",
									children: [sort, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`,
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
									className: "absolute top-full right-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[240px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2",
									style: { boxShadow: "var(--shadow-heavy)" },
									children: sortOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSort(s);
											setSortOpen(false);
										},
										className: `block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${sort === s ? "text-chrome" : "text-foreground/70"}`,
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
								className: "shrink-0 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-chrome transition-colors ml-1 md:ml-2",
								children: "Clear"
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
						children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: product.slug },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
									style: { boxShadow: "var(--shadow-plate)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/5] overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: product.imageUrls?.[0] || "/placeholder.svg",
											alt: product.name,
											className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tracking-[0.14em] text-chrome",
										children: formatPrice(product.price)
									})
								})]
							})
						}, product._id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Shop as component };
