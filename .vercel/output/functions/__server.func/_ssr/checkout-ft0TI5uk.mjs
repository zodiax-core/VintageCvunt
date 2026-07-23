import { o as __toESM } from "../_runtime.mjs";
import { r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-DSJLF2wo.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useCartContext } from "./cart-context-CAiE_2vy.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-D2bs4uMY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-ft0TI5uk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var priceLabel = (p) => "PKR " + p.toLocaleString("en-PK");
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
	const createOrder = useMutation(api.orders.create);
	const generateUploadUrl = useMutation(api.products.generateUploadUrl);
	const handleSubmit = async (e) => {
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
			screenshot: true
		});
		if (Object.keys(errs).length > 0) return;
		setSubmitting(true);
		try {
			let screenshotId;
			if (screenshot) {
				const uploadUrl = await generateUploadUrl();
				const { storageId } = await (await fetch(uploadUrl, {
					method: "POST",
					body: screenshot
				})).json();
				screenshotId = storageId;
			}
			const orderNumber = "VC-" + String(Math.floor(1e5 + Math.random() * 9e5));
			await createOrder({
				orderNumber,
				customerName: billing.name,
				customerEmail: billing.email,
				items: cart.items.map((item) => ({
					productId: String(item.id),
					name: item.name,
					price: item.price,
					quantity: item.quantity
				})),
				subtotal: cartTotal,
				shipping: 0,
				tax: 0,
				total: cartTotal,
				status: "pending",
				paymentMethod: "Bank Transfer",
				billingAddress: {
					street: billing.address,
					city: billing.city,
					state: "",
					zip: billing.zip,
					country: "Pakistan"
				},
				shippingAddress: {
					street: billing.address,
					city: billing.city,
					state: "",
					zip: billing.zip,
					country: "Pakistan"
				},
				screenshot: screenshotId
			});
			clearCart();
			navigate({
				to: "/order-confirmed",
				search: { orderId: orderNumber }
			});
		} catch (err) {
			console.error("Order submission failed", err);
			setSubmitting(false);
		}
	};
	if (cart.items.length === 0 && !submitting) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-chrome-dim",
						children: "Your ledger is empty"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-6 inline-block btn-chrome btn-chrome-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: "Browse Collection"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
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
						children: ["Complete Your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-chrome-h",
							children: "Order"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-12 gap-8 md:gap-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-12 md:col-span-7 space-y-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Billing Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-2 gap-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
													children: "Full Name *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: billing.name,
													onChange: (e) => setBilling({
														...billing,
														name: e.target.value
													}),
													onBlur: () => handleBlur("name"),
													placeholder: "Your Name",
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
												}),
												touched.name && errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													children: errors.name
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
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
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.email && errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
												}),
												touched.email && errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													children: errors.email
												})
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
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
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.phone && errors.phone ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}),
											touched.phone && errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: errors.phone
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
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
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.address && errors.address ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}),
											touched.address && errors.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: errors.address
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-3 gap-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
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
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.city && errors.city ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
													}),
													touched.city && errors.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														children: errors.city
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
														children: "Country *"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: "Pakistan",
														disabled: true,
														className: "w-full rounded-xl border border-chrome/20 bg-graphite/50 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "hidden",
														value: "PK"
													}),
													touched.country && errors.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														children: errors.country
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
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
														className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.zip && errors.zip ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
													}),
													touched.zip && errors.zip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														children: errors.zip
													})
												] })
											]
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										children: "§ Payment Proof"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-mono text-[10px] text-chrome-dim/60",
										children: "Upload a screenshot of your payment transaction to confirm your order."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
												children: "Payment Screenshot *"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => fileRef.current?.click(),
												className: `relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${screenshot ? "border-chrome/50 bg-chrome/5" : "border-chrome/20 hover:border-chrome/40 bg-graphite/30"} ${touched.screenshot && errors.screenshot ? "border-red-500/50" : ""}`,
												children: [screenshotPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: screenshotPreview,
															alt: "Payment screenshot",
															className: "mx-auto max-h-40 rounded-xl object-contain"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono text-[10px] text-chrome-dim",
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
															children: "Remove"
														})
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 8 12 3 7 8" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
																x1: "12",
																y1: "3",
																x2: "12",
																y2: "15"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 font-mono text-xs text-chrome-dim/60",
														children: "Click to upload payment screenshot"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[9px] text-chrome-dim/40",
														children: "PNG, JPG — Max 5MB"
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													ref: fileRef,
													type: "file",
													accept: "image/png,image/jpeg",
													className: "hidden",
													onChange: (e) => handleFileChange(e.target.files?.[0] || null)
												})]
											}),
											touched.screenshot && errors.screenshot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: errors.screenshot
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400/60 leading-relaxed",
										children: "⚠ Orders with incorrect or fraudulent payment screenshots will be automatically cancelled. Please ensure your transaction proof matches the order total before submitting."
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-12 md:col-span-4 md:col-start-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:sticky md:top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8",
									style: { boxShadow: "var(--shadow-plate)" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
											children: "Order Summary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-chrome/30 bg-graphite-2 grid place-items-center font-mono text-xs text-chrome-dim",
														children: item.name.charAt(0)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0 flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono text-[11px] text-chrome-dim truncate",
															children: item.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-mono text-[10px] text-chrome",
															children: ["× ", item.quantity]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-chrome shrink-0",
														children: priceLabel(item.price * item.quantity)
													})
												]
											}, item.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												children: "Subtotal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-sm text-chrome",
												children: priceLabel(cartTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												children: "Shipping"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-chrome-dim",
												children: "Free"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-lg text-chrome",
												children: priceLabel(cartTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: submitting,
											className: "mt-6 btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "btn-label",
												children: submitting ? "Processing…" : "Place Order"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: Object.values(errors).some(Boolean) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-1",
												children: Object.entries(errors).filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													className: "font-mono text-[10px] text-red-400",
													children: v
												}, k))
											})
										}) })
									]
								})
							})]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Checkout as component };
