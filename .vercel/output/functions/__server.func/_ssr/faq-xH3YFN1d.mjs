import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, a as Trigger2, g as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-dhHytbjK.mjs";
import { V as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-xH3YFN1d.js
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
var categories = [
	"Orders",
	"Shipping",
	"Returns & Exchanges",
	"Product Care",
	"Sizing"
];
var faqData = {
	Orders: [
		{
			q: "How do I place an order?",
			a: "Browse our collection, select your desired item and size, and proceed to checkout. You will need to provide your shipping details and payment information. Once your order is confirmed, you will receive an email with your order number and invoice."
		},
		{
			q: "Can I modify or cancel my order?",
			a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters our processing queue and cannot be changed. Please contact us immediately at orders@vintagecvunt.com if you need to make a change."
		},
		{
			q: "What payment methods do you accept?",
			a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and bank transfers for bespoke commissions. All payments are processed securely through our encrypted payment gateway."
		},
		{
			q: "Do you offer payment plans?",
			a: "We offer Klarna instalments for orders over €300 within the EU. You can select this option at checkout. For bespoke pieces exceeding €2,000, we offer a 50% deposit arrangement with the balance due upon completion."
		},
		{
			q: "Is my payment information secure?",
			a: "Yes. All transactions are encrypted using TLS 1.3 protocol. Our payment processing partners are PCI DSS Level 1 compliant. We do not store your full payment details on our servers."
		},
		{
			q: "Will I receive an invoice?",
			a: "Yes. A detailed invoice is emailed to you upon order confirmation. A separate receipt is sent once your payment has been processed. For custom commissions, a proforma invoice is provided before work begins."
		}
	],
	Shipping: [
		{
			q: "How long does processing take?",
			a: "Orders are processed within 1–2 business days. Made-to-order and bespoke items have longer processing times, which are communicated at the time of purchase and via your order confirmation email."
		},
		{
			q: "Which carriers do you use?",
			a: "We ship via DHL Express, UPS, and Poste Italiane. The carrier is selected based on your destination and the value of the shipment. All orders are fully insured and require a signature upon delivery."
		},
		{
			q: "Do you ship internationally?",
			a: "Yes. We ship to all countries worldwide. International orders may be subject to customs duties, taxes, and import fees, which are the responsibility of the recipient. These charges vary by country."
		},
		{
			q: "How can I track my order?",
			a: "Once your order ships, you will receive a tracking link via email and SMS. You can also track your order by logging into your account on our website."
		},
		{
			q: "What happens if my package is lost or damaged?",
			a: "All shipments are fully insured. If your package arrives damaged or is lost in transit, please contact us immediately at shipping@vintagecvunt.com. We will file a claim with the carrier and arrange a replacement or refund."
		}
	],
	"Returns & Exchanges": [
		{
			q: "What is your return window?",
			a: "We accept returns within 14 calendar days of delivery. Items must be unworn, unaltered, and in their original packaging with all tags attached. Please initiate your return by emailing returns@vintagecvunt.com."
		},
		{
			q: "How long do refunds take?",
			a: "Once your return is received and inspected by our atelier, refunds are processed within 10 business days to your original payment method. You will receive a confirmation email once the refund has been issued."
		},
		{
			q: "Can I exchange an item?",
			a: "Exchanges are handled as a return and a new purchase. Please initiate a return for the original item and place a new order for the desired item. This ensures the fastest processing."
		},
		{
			q: "What items are final sale?",
			a: "Custom and bespoke pieces, earrings, grooming products, and items marked as final sale on the product page cannot be returned. Sale items may be returned only if not marked as final sale."
		},
		{
			q: "Do you cover return shipping?",
			a: "Domestic returns within Italy are free. For international returns, the cost of return shipping is deducted from your refund. We provide a prepaid shipping label for all authorized returns."
		}
	],
	"Product Care": [
		{
			q: "How do I care for silver jewellery?",
			a: "Store silver pieces in the provided anti-tarnish pouch away from direct sunlight. Clean gently with a soft, lint-free cloth. Avoid contact with perfumes, lotions, and harsh chemicals. Remove before swimming or bathing."
		},
		{
			q: "How do I care for leather goods?",
			a: "Apply a quality leather conditioner every 3–6 months depending on use. Keep away from direct heat and moisture. For light stains, dab with a damp cloth and allow to air dry naturally. Never use alcohol-based cleaners."
		},
		{
			q: "Can I wear my jewellery in water?",
			a: "We do not recommend wearing any VintageCvunt pieces in water. Chlorine, salt water, and humidity can accelerate tarnishing and weaken structural components. Remove your pieces before showering, swimming, or exercising."
		},
		{
			q: "How should I store my items?",
			a: "Each piece comes in a numbered dust bag or pouch. Store in a cool, dry place away from direct sunlight. Keep leather items stuffed with acid-free tissue paper to maintain their shape. Do not stack heavy items on top of delicate pieces."
		},
		{
			q: "Do you offer restoration services?",
			a: "Yes. We offer a comprehensive care and restoration service for all VintageCvunt pieces. Contact care@vintagecvunt.com to arrange an assessment. Services include repolishing, restitching, and component replacement."
		}
	],
	Sizing: [
		{
			q: "How do I find my size?",
			a: "Refer to our Size Guide page for detailed measurements and conversion charts. We recommend measuring yourself following the guide's instructions and comparing your measurements to the specific product's size chart."
		},
		{
			q: "What if I am between sizes?",
			a: "If you are between sizes, we recommend sizing up for outerwear and jackets, and sizing down for fitted tops and bottoms. For rings, refer to the specific ring's sizing notes as some designs run larger or smaller."
		},
		{
			q: "Are your sizes consistent across products?",
			a: "Each product category has its own sizing specifications due to different cuts and materials. Always check the individual product size chart before ordering. Our customer service team can assist with specific measurements."
		},
		{
			q: "Do you offer custom sizing?",
			a: "Yes. Bespoke sizing is available for select pieces. Please contact our atelier at bespoke@vintagecvunt.com with your measurements. Custom sizing adds 3–4 weeks to production time and is non-refundable."
		},
		{
			q: "How do I measure my ring size?",
			a: "Use a ring sizer tool or measure the inner diameter of an existing ring that fits the intended finger. We recommend measuring at the end of the day when fingers are slightly larger. Our size guide includes a printable ring sizer."
		}
	]
};
function FAQ() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Orders");
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
							children: faqData[activeCategory].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: `item-${i}`,
								className: "border-chrome/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "font-mono text-sm md:text-base text-left hover:no-underline hover:text-chrome transition-colors",
									children: item.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "font-body text-sm text-chrome-dim leading-relaxed",
									children: item.a
								})]
							}, i))
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
