import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-WijJY6Fs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BzbCDv7i.js
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
	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length === 0) setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/contact.tsx:46:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/contact.tsx:47:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 md:pt-44 pb-12 md:pb-20 overflow-hidden",
				"data-tsd-source": "/src/routes/contact.tsx:50:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					},
					"data-tsd-source": "/src/routes/contact.tsx:51:9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/contact.tsx:55:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE
						},
						className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						"data-tsd-source": "/src/routes/contact.tsx:56:11",
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
						"data-tsd-source": "/src/routes/contact.tsx:64:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								"data-tsd-source": "/src/routes/contact.tsx:70:13",
								children: "Get in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/contact.tsx:70:65" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-tsd-source": "/src/routes/contact.tsx:71:13",
								children: "Touch"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-24",
				"data-tsd-source": "/src/routes/contact.tsx:77:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/contact.tsx:78:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8 md:gap-12",
						"data-tsd-source": "/src/routes/contact.tsx:79:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-7",
							"data-tsd-source": "/src/routes/contact.tsx:81:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								"data-tsd-source": "/src/routes/contact.tsx:82:15",
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
									"data-tsd-source": "/src/routes/contact.tsx:84:19",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-7xl italic text-chrome-h mb-6",
											"data-tsd-source": "/src/routes/contact.tsx:91:21",
											children: "✧"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-3xl md:text-5xl",
											"data-tsd-source": "/src/routes/contact.tsx:92:21",
											children: "Message Received"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm text-chrome-dim max-w-md",
											"data-tsd-source": "/src/routes/contact.tsx:93:21",
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
											"data-tsd-source": "/src/routes/contact.tsx:96:21",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												"data-tsd-source": "/src/routes/contact.tsx:100:23",
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
									"data-tsd-source": "/src/routes/contact.tsx:104:19",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6",
											"data-tsd-source": "/src/routes/contact.tsx:112:21",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/contact.tsx:113:23",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/contact.tsx:114:25",
														children: "Name *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: form.name,
														onChange: (e) => setForm({
															...form,
															name: e.target.value
														}),
														placeholder: "Your name",
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
														"data-tsd-source": "/src/routes/contact.tsx:115:25"
													}),
													errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/contact.tsx:121:41",
														children: errors.name
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/contact.tsx:123:23",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/contact.tsx:124:25",
														children: "Email *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: form.email,
														onChange: (e) => setForm({
															...form,
															email: e.target.value
														}),
														placeholder: "your@address.com",
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
														"data-tsd-source": "/src/routes/contact.tsx:125:25"
													}),
													errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/contact.tsx:131:42",
														children: errors.email
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/contact.tsx:136:21",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
													"data-tsd-source": "/src/routes/contact.tsx:137:23",
													children: "Inquiry Type *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-1.5 md:gap-2",
													"data-tsd-source": "/src/routes/contact.tsx:138:23",
													children: inquiryTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setForm({
															...form,
															type: t
														}),
														className: `px-3 py-1.5 md:px-4 md:py-2 rounded-full border font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] transition-colors whitespace-nowrap ${form.type === t ? "bg-chrome text-background border-chrome" : "border-chrome text-chrome-dim hover:text-foreground"}`,
														"data-tsd-source": "/src/routes/contact.tsx:140:27",
														children: t
													}, t))
												}),
												errors.type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/contact.tsx:150:39",
													children: errors.type
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/contact.tsx:154:21",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
												"data-tsd-source": "/src/routes/contact.tsx:155:23",
												children: "Subject"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.subject,
												onChange: (e) => setForm({
													...form,
													subject: e.target.value
												}),
												placeholder: "Optional subject line",
												className: "w-full rounded-xl border border-chrome bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors",
												"data-tsd-source": "/src/routes/contact.tsx:156:23"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/contact.tsx:165:21",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
													"data-tsd-source": "/src/routes/contact.tsx:166:23",
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
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${errors.message ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
													"data-tsd-source": "/src/routes/contact.tsx:167:23"
												}),
												errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/contact.tsx:174:42",
													children: errors.message
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "btn-chrome btn-chrome-inner w-full md:w-auto justify-center",
											"data-tsd-source": "/src/routes/contact.tsx:177:21",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												"data-tsd-source": "/src/routes/contact.tsx:178:23",
												children: "Send Message"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "14",
												height: "14",
												viewBox: "0 0 14 14",
												fill: "none",
												"data-tsd-source": "/src/routes/contact.tsx:179:23",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M1 7h12M8 2l5 5-5 5",
													stroke: "currentColor",
													strokeWidth: "1.2",
													"data-tsd-source": "/src/routes/contact.tsx:179:83"
												})
											})]
										})
									]
								}, "form")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-4 md:col-start-9 space-y-8 md:space-y-10",
							"data-tsd-source": "/src/routes/contact.tsx:187:13",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/contact.tsx:188:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
											"data-tsd-source": "/src/routes/contact.tsx:189:17",
											children: "§ Atelier"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 space-y-1 font-display text-lg",
											"data-tsd-source": "/src/routes/contact.tsx:190:17",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-tsd-source": "/src/routes/contact.tsx:191:19",
													children: "Casa d'Argento"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-tsd-source": "/src/routes/contact.tsx:192:19",
													children: "Via Brera 24"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-tsd-source": "/src/routes/contact.tsx:193:19",
													children: "20121 Milano, Italy"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											className: "mt-4 inline-block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-chrome hover:text-foreground transition-colors",
											"data-tsd-source": "/src/routes/contact.tsx:195:17",
											children: "View on Map ↗"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/contact.tsx:198:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										"data-tsd-source": "/src/routes/contact.tsx:199:17",
										children: "§ Contact"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-3",
										"data-tsd-source": "/src/routes/contact.tsx:200:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "mailto:studio@vintagecvunt.com",
											className: "block font-mono text-sm text-chrome hover:text-foreground transition-colors",
											"data-tsd-source": "/src/routes/contact.tsx:201:19",
											children: "studio@vintagecvunt.com"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "tel:+390212345678",
											className: "block font-mono text-sm text-chrome hover:text-foreground transition-colors",
											"data-tsd-source": "/src/routes/contact.tsx:202:19",
											children: "+39 02 1234 5678"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/contact.tsx:206:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										"data-tsd-source": "/src/routes/contact.tsx:207:17",
										children: "§ Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-1 font-mono text-xs text-chrome-dim",
										"data-tsd-source": "/src/routes/contact.tsx:208:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-tsd-source": "/src/routes/contact.tsx:209:19",
												children: "Mon — Fri: 10:00 — 19:00"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-tsd-source": "/src/routes/contact.tsx:210:19",
												children: "Saturday: 11:00 — 17:00"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-tsd-source": "/src/routes/contact.tsx:211:19",
												children: "Sunday: By appointment"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/contact.tsx:215:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										"data-tsd-source": "/src/routes/contact.tsx:216:17",
										children: "§ Follow"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 space-y-2",
										"data-tsd-source": "/src/routes/contact.tsx:217:17",
										children: [
											"Instagram",
											"Journal",
											"Pinterest",
											"Discord"
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											className: "block font-display text-lg hover:text-chrome transition-colors",
											"data-tsd-source": "/src/routes/contact.tsx:219:21",
											children: s
										}, s))
									})]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/contact.tsx:228:7" })
		]
	});
}
//#endregion
export { Contact as component };
