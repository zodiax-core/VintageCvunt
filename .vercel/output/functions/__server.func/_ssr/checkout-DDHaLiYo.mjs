import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { m as useCartContext } from "./product-boots-yUznlmdZ.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-WijJY6Fs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DDHaLiYo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var priceLabel = (p) => "PKR " + p.toLocaleString("en-PK");
var paymentApps = [
	{
		id: "jazzcash",
		name: "JazzCash",
		account: "0300 1234567",
		number: "03001234567"
	},
	{
		id: "easypaisa",
		name: "EasyPaisa",
		account: "0312 3456789",
		number: "03123456789"
	},
	{
		id: "nayapay",
		name: "NayaPay",
		account: "0333 1112233",
		number: "03331112233"
	},
	{
		id: "sadapay",
		name: "SadaPay",
		account: "0345 9876543",
		number: "03459876543"
	}
];
function Checkout() {
	const { cart, cartTotal, cartCount, clearCart } = useCartContext();
	const navigate = useNavigate();
	const [billing, setBilling] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		country: "",
		zip: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const [paymentApp, setPaymentApp] = (0, import_react.useState)("");
	const [securityCode, setSecurityCode] = (0, import_react.useState)("");
	const [screenshot, setScreenshot] = (0, import_react.useState)(null);
	const [screenshotPreview, setScreenshotPreview] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const validate = () => {
		const errs = {};
		if (!billing.name.trim()) errs.name = "Full name is required";
		if (!billing.email.trim()) errs.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) errs.email = "Invalid email";
		if (!billing.phone.trim()) errs.phone = "Phone is required";
		else if (!/^[\d\s\+\-]{7,15}$/.test(billing.phone)) errs.phone = "Enter a valid phone number";
		if (!billing.address.trim()) errs.address = "Address is required";
		if (!billing.city.trim()) errs.city = "City is required";
		if (!billing.country) errs.country = "Country is required";
		if (!billing.zip.trim()) errs.zip = "ZIP code is required";
		if (!paymentApp) errs.paymentApp = "Select a payment method";
		if (!securityCode.trim()) errs.securityCode = "Security code is required";
		if (!screenshot) errs.screenshot = "Payment screenshot is required";
		return errs;
	};
	const handleBlur = (field) => {
		setTouched((prev) => ({
			...prev,
			[field]: true
		}));
		const errs = validate();
		setErrors((prev) => ({
			...prev,
			[field]: errs[field] || ""
		}));
	};
	const handleFileChange = (file) => {
		if (file) {
			setScreenshot(file);
			const reader = new FileReader();
			reader.onload = (e) => setScreenshotPreview(e.target?.result);
			reader.readAsDataURL(file);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		setTouched({
			name: true,
			email: true,
			phone: true,
			address: true,
			city: true,
			country: true,
			zip: true,
			paymentApp: true,
			securityCode: true,
			screenshot: true
		});
		if (Object.keys(errs).length > 0) return;
		setSubmitting(true);
		const orderId = "VC-" + String(Math.floor(1e5 + Math.random() * 9e5));
		setTimeout(() => {
			clearCart();
			navigate({
				to: "/order-confirmed",
				search: { orderId }
			});
		}, 800);
	};
	if (cart.items.length === 0 && !submitting) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/checkout.tsx:96:7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/checkout.tsx:97:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center min-h-screen",
				"data-tsd-source": "/src/routes/checkout.tsx:98:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					"data-tsd-source": "/src/routes/checkout.tsx:99:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-chrome-dim",
						"data-tsd-source": "/src/routes/checkout.tsx:100:13",
						children: "Your ledger is empty"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-6 inline-block btn-chrome btn-chrome-inner",
						"data-tsd-source": "/src/routes/checkout.tsx:101:13",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							"data-tsd-source": "/src/routes/checkout.tsx:102:15",
							children: "Browse Collection"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/checkout.tsx:106:9" })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/checkout.tsx:112:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/checkout.tsx:113:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 md:pt-44 pb-12 md:pb-20 overflow-hidden",
				"data-tsd-source": "/src/routes/checkout.tsx:115:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					},
					"data-tsd-source": "/src/routes/checkout.tsx:116:9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/checkout.tsx:120:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE
						},
						className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						"data-tsd-source": "/src/routes/checkout.tsx:121:11",
						children: "— Secure Checkout"
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
						className: "font-display text-[clamp(2.4rem,10vw,6rem)] leading-[0.9] tracking-[-0.03em]",
						"data-tsd-source": "/src/routes/checkout.tsx:129:11",
						children: ["Complete Your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-chrome-h",
							"data-tsd-source": "/src/routes/checkout.tsx:135:27",
							children: "Order"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				"data-tsd-source": "/src/routes/checkout.tsx:140:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/checkout.tsx:141:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleSubmit,
						"data-tsd-source": "/src/routes/checkout.tsx:142:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-12 gap-8 md:gap-16",
							"data-tsd-source": "/src/routes/checkout.tsx:143:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-12 md:col-span-7 space-y-10",
								"data-tsd-source": "/src/routes/checkout.tsx:145:15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/checkout.tsx:147:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										"data-tsd-source": "/src/routes/checkout.tsx:148:19",
										children: "§ Billing Details"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 space-y-5",
										"data-tsd-source": "/src/routes/checkout.tsx:149:19",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-5",
												"data-tsd-source": "/src/routes/checkout.tsx:150:21",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-tsd-source": "/src/routes/checkout.tsx:151:23",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
															"data-tsd-source": "/src/routes/checkout.tsx:152:25",
															children: "Full Name *"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: billing.name,
															onChange: (e) => setBilling({
																...billing,
																name: e.target.value
															}),
															onBlur: () => handleBlur("name"),
															placeholder: "John Doe",
															className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
															"data-tsd-source": "/src/routes/checkout.tsx:153:25"
														}),
														touched.name && errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-1 font-mono text-[10px] text-red-400",
															"data-tsd-source": "/src/routes/checkout.tsx:160:57",
															children: errors.name
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-tsd-source": "/src/routes/checkout.tsx:162:23",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
															"data-tsd-source": "/src/routes/checkout.tsx:163:25",
															children: "Email *"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "email",
															value: billing.email,
															onChange: (e) => setBilling({
																...billing,
																email: e.target.value
															}),
															onBlur: () => handleBlur("email"),
															placeholder: "your@address.com",
															className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.email && errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
															"data-tsd-source": "/src/routes/checkout.tsx:164:25"
														}),
														touched.email && errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-1 font-mono text-[10px] text-red-400",
															"data-tsd-source": "/src/routes/checkout.tsx:172:59",
															children: errors.email
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/checkout.tsx:175:21",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/checkout.tsx:176:23",
														children: "Phone *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: billing.phone,
														onChange: (e) => setBilling({
															...billing,
															phone: e.target.value
														}),
														onBlur: () => handleBlur("phone"),
														placeholder: "+92 300 1234567",
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.phone && errors.phone ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
														"data-tsd-source": "/src/routes/checkout.tsx:177:23"
													}),
													touched.phone && errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/checkout.tsx:184:57",
														children: errors.phone
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/checkout.tsx:186:21",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/checkout.tsx:187:23",
														children: "Address *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: billing.address,
														onChange: (e) => setBilling({
															...billing,
															address: e.target.value
														}),
														onBlur: () => handleBlur("address"),
														placeholder: "Street address",
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.address && errors.address ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
														"data-tsd-source": "/src/routes/checkout.tsx:188:23"
													}),
													touched.address && errors.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/checkout.tsx:195:61",
														children: errors.address
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-3 gap-5",
												"data-tsd-source": "/src/routes/checkout.tsx:197:21",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-tsd-source": "/src/routes/checkout.tsx:198:23",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
																"data-tsd-source": "/src/routes/checkout.tsx:199:25",
																children: "City *"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																value: billing.city,
																onChange: (e) => setBilling({
																	...billing,
																	city: e.target.value
																}),
																onBlur: () => handleBlur("city"),
																placeholder: "City",
																className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.city && errors.city ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
																"data-tsd-source": "/src/routes/checkout.tsx:200:25"
															}),
															touched.city && errors.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-mono text-[10px] text-red-400",
																"data-tsd-source": "/src/routes/checkout.tsx:207:57",
																children: errors.city
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-tsd-source": "/src/routes/checkout.tsx:209:23",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
																"data-tsd-source": "/src/routes/checkout.tsx:210:25",
																children: "Country *"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																value: billing.country,
																onChange: (e) => setBilling({
																	...billing,
																	country: e.target.value
																}),
																onBlur: () => handleBlur("country"),
																className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm text-chrome-dim outline-none transition-colors appearance-none ${touched.country && errors.country ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
																"data-tsd-source": "/src/routes/checkout.tsx:211:25",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "",
																		"data-tsd-source": "/src/routes/checkout.tsx:217:27",
																		children: "Select country"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "PK",
																		"data-tsd-source": "/src/routes/checkout.tsx:218:27",
																		children: "Pakistan"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "IT",
																		"data-tsd-source": "/src/routes/checkout.tsx:219:27",
																		children: "Italy"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "US",
																		"data-tsd-source": "/src/routes/checkout.tsx:220:27",
																		children: "United States"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "UK",
																		"data-tsd-source": "/src/routes/checkout.tsx:221:27",
																		children: "United Kingdom"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "AE",
																		"data-tsd-source": "/src/routes/checkout.tsx:222:27",
																		children: "UAE"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "JP",
																		"data-tsd-source": "/src/routes/checkout.tsx:223:27",
																		children: "Japan"
																	})
																]
															}),
															touched.country && errors.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-mono text-[10px] text-red-400",
																"data-tsd-source": "/src/routes/checkout.tsx:225:63",
																children: errors.country
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-tsd-source": "/src/routes/checkout.tsx:227:23",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
																"data-tsd-source": "/src/routes/checkout.tsx:228:25",
																children: "ZIP Code *"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																value: billing.zip,
																onChange: (e) => setBilling({
																	...billing,
																	zip: e.target.value
																}),
																onBlur: () => handleBlur("zip"),
																placeholder: "ZIP",
																className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.zip && errors.zip ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
																"data-tsd-source": "/src/routes/checkout.tsx:229:25"
															}),
															touched.zip && errors.zip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-mono text-[10px] text-red-400",
																"data-tsd-source": "/src/routes/checkout.tsx:236:55",
																children: errors.zip
															})
														]
													})
												]
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/checkout.tsx:243:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
											"data-tsd-source": "/src/routes/checkout.tsx:244:19",
											children: "§ Online Payment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-mono text-[10px] text-chrome-dim/60",
											"data-tsd-source": "/src/routes/checkout.tsx:245:19",
											children: "Select your payment app to auto-fill account details."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 space-y-3",
											"data-tsd-source": "/src/routes/checkout.tsx:247:19",
											children: [paymentApps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setPaymentApp(app.id);
													setErrors((prev) => ({
														...prev,
														paymentApp: ""
													}));
												},
												className: `w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${paymentApp === app.id ? "border-chrome bg-chrome/5" : "border-chrome/30 bg-graphite/50 hover:border-chrome/60"}`,
												"data-tsd-source": "/src/routes/checkout.tsx:249:23",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-10 w-10 rounded-xl border grid place-items-center shrink-0 font-mono text-xs ${paymentApp === app.id ? "border-chrome bg-chrome text-background" : "border-chrome/30 bg-graphite-2 text-chrome-dim"}`,
														"data-tsd-source": "/src/routes/checkout.tsx:259:25",
														children: app.name.charAt(0)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														"data-tsd-source": "/src/routes/checkout.tsx:264:25",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono text-sm text-foreground",
															"data-tsd-source": "/src/routes/checkout.tsx:265:27",
															children: app.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-mono text-[11px] text-chrome-dim/60",
															"data-tsd-source": "/src/routes/checkout.tsx:266:27",
															children: ["Account: ", app.account]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 ${paymentApp === app.id ? "border-chrome" : "border-chrome-dim/30"}`,
														"data-tsd-source": "/src/routes/checkout.tsx:268:25",
														children: paymentApp === app.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-2.5 w-2.5 rounded-full bg-chrome",
															"data-tsd-source": "/src/routes/checkout.tsx:271:53"
														})
													})
												]
											}, app.id)), touched.paymentApp && errors.paymentApp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[10px] text-red-400",
												"data-tsd-source": "/src/routes/checkout.tsx:275:65",
												children: errors.paymentApp
											})]
										}),
										paymentApp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											className: "mt-5 space-y-4 rounded-2xl border border-chrome/20 bg-graphite/30 p-5",
											"data-tsd-source": "/src/routes/checkout.tsx:280:21",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-4",
												"data-tsd-source": "/src/routes/checkout.tsx:285:23",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-tsd-source": "/src/routes/checkout.tsx:286:25",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/checkout.tsx:287:27",
														children: "Account Number"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "rounded-xl border border-chrome/30 bg-graphite/80 px-4 py-3 font-mono text-sm text-chrome",
														"data-tsd-source": "/src/routes/checkout.tsx:288:27",
														children: paymentApps.find((a) => a.id === paymentApp)?.number || ""
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-tsd-source": "/src/routes/checkout.tsx:292:25",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/checkout.tsx:293:27",
														children: "Amount"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "rounded-xl border border-chrome/30 bg-graphite/80 px-4 py-3 font-mono text-sm text-chrome",
														"data-tsd-source": "/src/routes/checkout.tsx:294:27",
														children: priceLabel(cartTotal)
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/checkout.tsx:299:23",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														"data-tsd-source": "/src/routes/checkout.tsx:300:25",
														children: "Security Code *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "password",
														value: securityCode,
														onChange: (e) => setSecurityCode(e.target.value),
														onBlur: () => handleBlur("securityCode"),
														placeholder: "Enter your payment app PIN",
														maxLength: 6,
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.securityCode && errors.securityCode ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
														"data-tsd-source": "/src/routes/checkout.tsx:301:25"
													}),
													touched.securityCode && errors.securityCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/checkout.tsx:310:73",
														children: errors.securityCode
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6",
											"data-tsd-source": "/src/routes/checkout.tsx:316:19",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
													"data-tsd-source": "/src/routes/checkout.tsx:317:21",
													children: "Payment Screenshot *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => fileRef.current?.click(),
													className: `relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${screenshot ? "border-chrome/50 bg-chrome/5" : "border-chrome/20 hover:border-chrome/40 bg-graphite/30"} ${touched.screenshot && errors.screenshot ? "border-red-500/50" : ""}`,
													"data-tsd-source": "/src/routes/checkout.tsx:318:21",
													children: [screenshotPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-3",
														"data-tsd-source": "/src/routes/checkout.tsx:325:25",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: screenshotPreview,
																alt: "Payment screenshot",
																className: "mx-auto max-h-40 rounded-xl object-contain",
																"data-tsd-source": "/src/routes/checkout.tsx:326:27"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-mono text-[10px] text-chrome-dim",
																"data-tsd-source": "/src/routes/checkout.tsx:327:27",
																children: screenshot?.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: (e) => {
																	e.stopPropagation();
																	setScreenshot(null);
																	setScreenshotPreview("");
																},
																className: "font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-colors",
																"data-tsd-source": "/src/routes/checkout.tsx:328:27",
																children: "Remove"
															})
														]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-tsd-source": "/src/routes/checkout.tsx:337:25",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
																className: "mx-auto text-chrome-dim/40",
																width: "32",
																height: "32",
																viewBox: "0 0 24 24",
																fill: "none",
																stroke: "currentColor",
																strokeWidth: "1.5",
																strokeLinecap: "round",
																strokeLinejoin: "round",
																"data-tsd-source": "/src/routes/checkout.tsx:338:27",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
																		d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4",
																		"data-tsd-source": "/src/routes/checkout.tsx:339:29"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
																		points: "17 8 12 3 7 8",
																		"data-tsd-source": "/src/routes/checkout.tsx:340:29"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
																		x1: "12",
																		y1: "3",
																		x2: "12",
																		y2: "15",
																		"data-tsd-source": "/src/routes/checkout.tsx:341:29"
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 font-mono text-xs text-chrome-dim/60",
																"data-tsd-source": "/src/routes/checkout.tsx:343:27",
																children: "Click to upload payment screenshot"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-mono text-[9px] text-chrome-dim/40",
																"data-tsd-source": "/src/routes/checkout.tsx:344:27",
																children: "PNG, JPG — Max 5MB"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														ref: fileRef,
														type: "file",
														accept: "image/png,image/jpeg",
														className: "hidden",
														onChange: (e) => handleFileChange(e.target.files?.[0] || null),
														"data-tsd-source": "/src/routes/checkout.tsx:347:23"
													})]
												}),
												touched.screenshot && errors.screenshot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/checkout.tsx:355:65",
													children: errors.screenshot
												})
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-12 md:col-span-4 md:col-start-9",
								"data-tsd-source": "/src/routes/checkout.tsx:361:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:sticky md:top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8",
									style: { boxShadow: "var(--shadow-plate)" },
									"data-tsd-source": "/src/routes/checkout.tsx:362:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
											"data-tsd-source": "/src/routes/checkout.tsx:363:19",
											children: "Order Summary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "divider-chrome my-5",
											"data-tsd-source": "/src/routes/checkout.tsx:364:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											"data-tsd-source": "/src/routes/checkout.tsx:365:19",
											children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												"data-tsd-source": "/src/routes/checkout.tsx:367:23",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-chrome/30",
														"data-tsd-source": "/src/routes/checkout.tsx:368:25",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
															webp: item.webp,
															fallback: item.src,
															alt: item.name,
															className: "h-full w-full object-cover",
															"data-tsd-source": "/src/routes/checkout.tsx:369:27"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0 flex-1",
														"data-tsd-source": "/src/routes/checkout.tsx:371:25",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono text-[11px] text-chrome-dim truncate",
															"data-tsd-source": "/src/routes/checkout.tsx:372:27",
															children: item.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-mono text-[10px] text-chrome",
															"data-tsd-source": "/src/routes/checkout.tsx:373:27",
															children: ["× ", item.quantity]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-chrome shrink-0",
														"data-tsd-source": "/src/routes/checkout.tsx:375:25",
														children: priceLabel(item.price * item.quantity)
													})
												]
											}, item.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "divider-chrome my-5",
											"data-tsd-source": "/src/routes/checkout.tsx:379:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											"data-tsd-source": "/src/routes/checkout.tsx:380:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												"data-tsd-source": "/src/routes/checkout.tsx:381:21",
												children: "Subtotal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-sm text-chrome",
												"data-tsd-source": "/src/routes/checkout.tsx:382:21",
												children: priceLabel(cartTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mt-2",
											"data-tsd-source": "/src/routes/checkout.tsx:384:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												"data-tsd-source": "/src/routes/checkout.tsx:385:21",
												children: "Shipping"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-chrome-dim",
												"data-tsd-source": "/src/routes/checkout.tsx:386:21",
												children: "Free"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "divider-chrome my-5",
											"data-tsd-source": "/src/routes/checkout.tsx:388:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											"data-tsd-source": "/src/routes/checkout.tsx:389:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												"data-tsd-source": "/src/routes/checkout.tsx:390:21",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-lg text-chrome",
												"data-tsd-source": "/src/routes/checkout.tsx:391:21",
												children: priceLabel(cartTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: submitting,
											className: "mt-6 btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50",
											"data-tsd-source": "/src/routes/checkout.tsx:394:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												"data-tsd-source": "/src/routes/checkout.tsx:399:21",
												children: submitting ? "Processing…" : "Place Order"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											"data-tsd-source": "/src/routes/checkout.tsx:402:19",
											children: Object.values(errors).some(Boolean) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												initial: {
													opacity: 0,
													y: -10
												},
												animate: {
													opacity: 1,
													y: 0
												},
												exit: { opacity: 0 },
												className: "mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3",
												"data-tsd-source": "/src/routes/checkout.tsx:404:23",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "space-y-1",
													"data-tsd-source": "/src/routes/checkout.tsx:410:25",
													children: Object.entries(errors).filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
														className: "font-mono text-[10px] text-red-400",
														"data-tsd-source": "/src/routes/checkout.tsx:412:29",
														children: v
													}, k))
												})
											})
										})
									]
								})
							})]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/checkout.tsx:425:7" })
		]
	});
}
//#endregion
export { Checkout as component };
