import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-CoPgpr_w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-conditions-BFDxf-bR.js
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var sections = [
	{
		title: "Acceptance",
		content: "By accessing or using the VintageCvunt website and purchasing our products, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should not use our site or services. We reserve the right to update these terms at any time; continued use constitutes acceptance of the revised terms."
	},
	{
		title: "Intellectual Property",
		content: "All content on this website — including text, images, designs, logos, product photography, and code — is the exclusive property of VintageCvunt and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission. The VintageCvunt name, logo, and all related marks are registered trademarks."
	},
	{
		title: "Product & Service Use",
		content: "All products listed on our site are made in limited quantities and are subject to availability. We reserve the right to discontinue any product at any time. Product descriptions, images, and pricing are provided as accurately as possible, but we do not guarantee that colours, textures, or finishes are represented with absolute precision due to variations in screen displays."
	},
	{
		title: "Orders & Payments",
		content: "When you place an order, you agree to provide accurate and complete information. All prices are listed in EUR and include applicable VAT unless stated otherwise. Payment is due at the time of purchase via the available methods on our checkout. We reserve the right to cancel or refuse any order for any reason, including suspected fraud or pricing errors."
	},
	{
		title: "Shipping & Delivery",
		content: "Shipping costs and estimated delivery times are provided at checkout. VintageCvunt is not responsible for delays caused by customs, carriers, or events outside our reasonable control. Risk of loss and title for products pass to you upon delivery to the carrier. We insure all shipments up to the full order value."
	},
	{
		title: "Returns & Refunds",
		content: "We accept returns within 14 days of delivery for unworn, undamaged items in their original packaging. Custom and bespoke pieces are final sale. Refunds are processed to the original payment method within 10 business days of receiving the returned item. Shipping costs are non-refundable except in cases of our error or defective product."
	},
	{
		title: "Limitation of Liability",
		content: "VintageCvunt shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website. Our total liability for any claim is limited to the purchase price of the product in question. This limitation does not apply where prohibited by applicable consumer protection law."
	},
	{
		title: "Governing Law",
		content: "These Terms & Conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be resolved exclusively in the courts of Karachi. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these terms."
	},
	{
		title: "Contact",
		content: "For questions regarding these Terms & Conditions, please contact us at legal@vintagecvunt.com or write to VintageCvunt, Casa d'Argento, 42 Clifton Avenue, Karachi, Pakistan."
	}
];
function TermsConditions() {
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { clipPath: "inset(0 100% 0 0)" },
							animate: { clipPath: "inset(0 0% 0 0)" },
							transition: {
								duration: 1.4,
								ease: EASE
							},
							className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
							children: "— Legal · Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
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
									children: "Terms &"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conditions" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								ease: EASE,
								delay: .3
							},
							className: "mt-6 font-mono text-xs tracking-[0.2em] text-chrome-dim",
							children: "Last updated March 2026"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-4xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-10 md:space-y-14",
						children: sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-60px"
							},
							transition: {
								duration: .7,
								ease: EASE,
								delay: i * .05
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl md:text-3xl mb-3 md:mb-4",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm text-chrome-dim leading-relaxed max-w-3xl",
								children: s.content
							})]
						}, s.title))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { TermsConditions as component };
