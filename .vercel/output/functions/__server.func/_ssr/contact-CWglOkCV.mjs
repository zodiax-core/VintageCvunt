import { o as __toESM } from "../_runtime.mjs";
import { i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-F4Rjfi8V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CWglOkCV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var inquiryTypes = [
	"General Inquiry",
	"Atelier Visit",
	"Press & Editorial",
	"Wholesale",
	"Bespoke Commission",
	"Care & Restoration"
];
function Contact() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		type: "",
		subject: "",
		message: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const validate = () => {
		const errs = {};
		if (!form.name.trim()) errs.name = "Name is required";
		if (!form.email.trim()) errs.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
		if (!form.type) errs.type = "Please select an inquiry type";
		if (!form.message.trim()) errs.message = "Message is required";
		return errs;
	};
	const sendMessage = useMutation(api.messages.create);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length === 0) try {
			await sendMessage({
				name: form.name,
				email: form.email,
				subject: form.subject || form.type,
				message: form.message
			});
			setSubmitted(true);
		} catch (err) {
			console.error("Failed to send message", err);
		}
	};
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
						children: "— Correspondence"
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
						className: "font-display text-[clamp(2.4rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Get in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Touch" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
										y: -20
									},
									className: "flex flex-col items-center justify-center py-16 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-7xl italic text-chrome-h mb-6",
											children: "✧"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-3xl md:text-5xl",
											children: "Message Received"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm text-chrome-dim max-w-md",
											children: "Thank you for reaching out. Our team typically responds within 24–48 hours."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setSubmitted(false);
												setForm({
													name: "",
													email: "",
													type: "",
													subject: "",
													message: ""
												});
											},
											className: "mt-8 btn-chrome btn-chrome-inner",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												children: "Send another"
											})
										})
									]
								}, "success") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: { opacity: 0 },
									onSubmit: handleSubmit,
									className: "space-y-5 md:space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
													children: "Name *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: form.name,
													onChange: (e) => setForm({
														...form,
														name: e.target.value
													}),
													placeholder: "Your name",
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
												}),
												errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													children: errors.name
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
													children: "Email *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: form.email,
													onChange: (e) => setForm({
														...form,
														email: e.target.value
													}),
													placeholder: "your@address.com",
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
												}),
												errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													children: errors.email
												})
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
												children: "Inquiry Type *"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5 md:gap-2",
												children: inquiryTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setForm({
														...form,
														type: t
													}),
													className: `px-3 py-1.5 md:px-4 md:py-2 rounded-full border font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] transition-colors whitespace-nowrap ${form.type === t ? "bg-chrome text-background border-chrome" : "border-chrome text-chrome-dim hover:text-foreground"}`,
													children: t
												}, t))
											}),
											errors.type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: errors.type
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Subject"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.subject,
											onChange: (e) => setForm({
												...form,
												subject: e.target.value
											}),
											placeholder: "Optional subject line",
											className: "w-full rounded-xl border border-chrome bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
												children: "Message *"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												value: form.message,
												onChange: (e) => setForm({
													...form,
													message: e.target.value
												}),
												placeholder: "Your message…",
												rows: 4,
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${errors.message ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}),
											errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: errors.message
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "btn-chrome btn-chrome-inner w-full md:w-auto justify-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												children: "Send Message"
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
								}, "form")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-4 md:col-start-9 space-y-8 md:space-y-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Contact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 space-y-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:studio@vintagecvunt.com",
										className: "block font-mono text-sm text-chrome hover:text-foreground transition-colors",
										children: "studio@vintagecvunt.com"
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Hours"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 font-mono text-xs text-chrome-dim",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "24/7 — Always open" })
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Follow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://instagram.com/vintagecvunt",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "block font-display text-lg hover:text-chrome transition-colors",
										children: "Instagram"
									})
								})] })
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Contact as component };
