import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-BelWRq_m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-policy-Dd_x1H6T.js
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var sections = [
	{
		title: "Information We Collect",
		content: "We collect information you provide directly to us, including your name, email address, shipping address, payment details, and phone number when you place an order, create an account, or contact our atelier. We also automatically collect certain information when you visit our site, such as your IP address, browser type, device characteristics, and browsing behaviour through cookies and similar technologies."
	},
	{
		title: "How We Use Your Information",
		content: "Your information is used to process and fulfil your orders, communicate with you about your purchases, provide customer support, personalise your shopping experience, and send you marketing communications where you have consented to receive them. We also use aggregated data to improve our products and services."
	},
	{
		title: "Data Sharing",
		content: "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website, processing payments, fulfilling orders, and delivering packages. These providers are contractually bound to protect your data and may only use it for the specific services they perform on our behalf."
	},
	{
		title: "Cookies & Tracking",
		content: "Our site uses cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our site. We use both session cookies and persistent cookies to deliver a seamless experience."
	},
	{
		title: "Your Rights (GDPR / CCPA)",
		content: "If you are a resident of the European Economic Area, you have the right to access, correct, update, or request deletion of your personal data under GDPR. California residents have similar rights under the CCPA, including the right to know what personal information we collect and to opt out of the sale of your data. To exercise your rights, please contact us at privacy@vintagecvunt.com. We will respond to your request within the timeframe required by applicable law."
	},
	{
		title: "Data Security",
		content: "We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission, secure server infrastructure, and restricted access to personal data within our organisation. Our payment processing partners adhere to PCI DSS standards. Despite these measures, no method of electronic storage is 100% secure, and we cannot guarantee absolute security."
	},
	{
		title: "Third-Party Services",
		content: "Our website may contain links to third-party sites or services. We are not responsible for the privacy practices of these external platforms. We encourage you to review their privacy policies before providing any personal information. This policy applies solely to data collected by VintageCvunt."
	},
	{
		title: "Changes to This Policy",
		content: "We reserve the right to update this privacy policy at any time. Changes will be posted on this page with an updated revision date. For significant changes, we will notify you via email or through a prominent notice on our website. We encourage you to review this policy periodically."
	},
	{
		title: "Contact",
		content: "If you have any questions or concerns regarding this privacy policy or how we handle your data, please contact our Data Protection Officer at privacy@vintagecvunt.com or write to us at Casa d'Argento, 42 Clifton Avenue, Karachi, Pakistan."
	}
];
function PrivacyPolicy() {
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
							children: "— Legal · Privacy"
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
									children: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Policy" })
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
export { PrivacyPolicy as component };
