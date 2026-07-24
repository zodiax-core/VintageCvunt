import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-DSJLF2wo.mjs";
import { _ as require_react, a as Trigger2, g as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-B7DrmgJy.mjs";
import { H as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-DHKTjKa_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var EASE = [
	.16,
	1,
	.3,
	1
];
function FAQ() {
	const allFaq = useQuery(api.faq.list) ?? [];
	const faqByCategory = (0, import_react.useMemo)(() => {
		const map = {};
		for (const item of allFaq) {
			if (!item.isActive) continue;
			if (!map[item.category]) map[item.category] = [];
			map[item.category].push(item);
		}
		return map;
	}, [allFaq]);
	const categories = Object.keys(faqByCategory);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)(categories[0] || "");
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
						children: "— Support"
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
								children: "Frequently"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Asked Questions" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCategory(cat),
							className: `px-4 py-1.5 md:px-5 md:py-2 rounded-full border font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] transition-colors whitespace-nowrap ${activeCategory === cat ? "bg-chrome text-background border-chrome" : "border-chrome text-chrome-dim hover:text-foreground"}`,
							children: cat
						}, cat))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							ease: EASE
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							type: "single",
							collapsible: true,
							className: "w-full",
							children: (faqByCategory[activeCategory] || []).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: `item-${item._id || i}`,
								className: "border-chrome/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "font-mono text-sm md:text-base text-left hover:no-underline hover:text-chrome transition-colors",
									children: item.question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "font-body text-sm text-chrome-dim leading-relaxed",
									children: item.answer
								})]
							}, item._id || i))
						})
					}, activeCategory)]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { FAQ as component };
