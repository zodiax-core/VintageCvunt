import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useCurrency, i as useCartContext } from "./currency-context-dbZ1tzKb.mjs";
import { n as useAuthContext } from "./auth-context-BqGyC6x_.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-BelWRq_m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BlelVHxQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
function Checkout() {
	const { formatPrice } = useCurrency();
	const { cart, cartTotal, clearCart } = useCartContext();
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const settings = useQuery(api.settings.get);
	const shippingRates = useQuery(api.shippingRates.list) ?? [];
	const [toastOpen, setToastOpen] = (0, import_react.useState)(false);
	const [citySearch, setCitySearch] = (0, import_react.useState)("");
	const [cityOpen, setCityOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) setToastOpen(true);
	}, [user]);
	const [billing, setBilling] = (0, import_react.useState)({
		name: user?.name || "",
		email: user?.email || "",
		phone: "",
		address: "",
		city: "",
		country: "Pakistan",
		zip: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [couponCode, setCouponCode] = (0, import_react.useState)("");
	const [appliedCoupon, setAppliedCoupon] = (0, import_react.useState)(null);
	const [couponError, setCouponError] = (0, import_react.useState)("");
	const [couponApplying, setCouponApplying] = (0, import_react.useState)(false);
	const [selectedShipping, setSelectedShipping] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (shippingRates.length > 0 && !selectedShipping) {
			setSelectedShipping(shippingRates[0]);
			const defaultCity = shippingRates[0].name;
			setBilling((prev) => ({
				...prev,
				city: prev.city || defaultCity
			}));
			setCitySearch((prev) => prev || defaultCity);
		}
	}, [shippingRates, selectedShipping]);
	const shippingCost = selectedShipping?.price ?? 0;
	const taxRate = settings?.defaultTaxRate ?? 0;
	const discount = appliedCoupon?.discountAmount ?? 0;
	const taxableAmount = Math.max(0, cartTotal - discount);
	const tax = settings?.taxInclusive ? 0 : Math.round(taxableAmount * (taxRate / 100) * 100) / 100;
	const grandTotal = cartTotal + shippingCost + tax - discount;
	const validate = () => {
		const errs = {};
		if (!billing.name.trim()) errs.name = "Full name is required";
		if (!billing.email.trim()) errs.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) errs.email = "Invalid email";
		if (!billing.phone.trim()) errs.phone = "Phone is required";
		else if (!/^[\d\s+\-]{7,15}$/.test(billing.phone)) errs.phone = "Enter a valid phone number";
		if (!billing.address.trim()) errs.address = "Address is required";
		if (!billing.city.trim()) errs.city = "City is required";
		if (!billing.zip.trim()) errs.zip = "ZIP code is required";
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
	const handleApplyCoupon = async () => {
		if (!couponCode.trim()) return;
		setCouponApplying(true);
		setCouponError("");
		setAppliedCoupon(null);
		try {
			const result = await queryValidateCoupon(couponCode.trim().toUpperCase(), cartTotal);
			if (result.valid && result.coupon) {
				setAppliedCoupon(result.coupon);
				setCouponCode("");
			} else setCouponError(result.reason || "Invalid coupon");
		} catch {
			setCouponError("Failed to validate coupon");
		} finally {
			setCouponApplying(false);
		}
	};
	const createOrder = useMutation(api.orders.create);
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
			zip: true
		});
		if (Object.keys(errs).length > 0) return;
		setSubmitting(true);
		try {
			const orderNumber = "VC-" + String(Math.floor(1e5 + Math.random() * 9e5));
			await createOrder({
				orderNumber,
				customerId: user?.id || void 0,
				customerName: billing.name,
				customerEmail: billing.email,
				phone: billing.phone,
				items: cart.items.map((item) => ({
					productId: item.productId || String(item.id),
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: item.src,
					size: item.selectedSize,
					color: item.selectedColor
				})),
				subtotal: cartTotal,
				shipping: shippingCost,
				tax,
				discount: discount > 0 ? discount : void 0,
				couponCode: appliedCoupon?.code,
				total: grandTotal,
				status: "pending",
				paymentMethod: "Cash on Delivery",
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
				}
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
			toastOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "w-full max-w-md rounded-2xl border border-chrome bg-graphite p-6 text-center shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-chrome animate-pulse mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-foreground",
							children: "Patron Identity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xs uppercase tracking-[0.15em] text-chrome-dim",
							children: "Register or sign in to save your purchase history and track orders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "register" },
									className: "btn-chrome bg-chrome text-background hover:bg-chrome-h w-full justify-center py-3 text-xs uppercase tracking-[0.2em]",
									children: "Register Account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "login" },
									className: "btn-chrome btn-chrome-inner w-full justify-center py-3 text-xs uppercase tracking-[0.2em]",
									children: "Log In"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setToastOpen(false),
									className: "mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors",
									children: "Continue as Guest / Cancel"
								})
							]
						})
					]
				})
			}),
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
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: citySearch,
															onChange: (e) => {
																setCitySearch(e.target.value);
																setCityOpen(true);
															},
															onFocus: () => setCityOpen(true),
															onBlur: () => setTimeout(() => setCityOpen(false), 150),
															placeholder: "Search city…",
															className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.city && errors.city ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
														}), cityOpen && shippingRates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "absolute z-20 mt-1 w-full rounded-xl border border-chrome/30 bg-graphite shadow-xl overflow-hidden",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "max-h-48 overflow-y-auto scrollbar-thin",
																children: [shippingRates.filter((r) => r.name.toLowerCase().includes(citySearch.toLowerCase())).map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onMouseDown: () => {
																		setBilling((prev) => ({
																			...prev,
																			city: rate.name
																		}));
																		setCitySearch(rate.name);
																		setSelectedShipping(rate);
																		setCityOpen(false);
																		setTouched((prev) => ({
																			...prev,
																			city: true
																		}));
																		setErrors((prev) => ({
																			...prev,
																			city: ""
																		}));
																	},
																	className: `w-full flex items-center justify-between px-4 py-2.5 font-mono text-sm text-left transition-colors hover:bg-chrome/10 ${selectedShipping?._id === rate._id ? "bg-chrome/10 text-chrome" : "text-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rate.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-chrome-dim text-xs",
																		children: rate.price === 0 ? "Free" : `PKR ${rate.price.toLocaleString()}`
																	})]
																}, rate._id)), shippingRates.filter((r) => r.name.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "px-4 py-3 font-mono text-[11px] text-chrome-dim/60",
																	children: "No cities found"
																})]
															})
														})]
													}),
													touched.city && errors.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-[10px] text-red-400",
														children: errors.city
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
													children: "Country"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: billing.country,
													disabled: true,
													className: "w-full rounded-xl border border-chrome/20 bg-graphite/50 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
												})] }),
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
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "§ Payment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-start gap-4 rounded-2xl border border-chrome/20 bg-graphite/30 p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-chrome bg-chrome/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-chrome" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-chrome",
										children: "Cash on Delivery (COD)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-[10px] text-chrome-dim/60",
										children: "Pay in cash upon receiving your parcel. No prepayment required."
									})] })]
								})] })]
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
											className: "space-y-3 max-h-48 overflow-y-auto scrollbar-thin",
											children: cart.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-chrome/30 bg-graphite-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
															webp: item.webp,
															fallback: item.src,
															alt: item.name,
															className: "h-full w-full object-cover"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0 flex-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-mono text-[11px] text-chrome-dim truncate",
																children: item.name
															}),
															(item.selectedSize || item.selectedColor) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-mono text-[9px] text-chrome-dim/60",
																children: [item.selectedSize, item.selectedColor].filter(Boolean).join(" / ")
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "font-mono text-[10px] text-chrome",
																children: ["× ", item.quantity]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-chrome shrink-0",
														children: formatPrice(item.price * item.quantity)
													})
												]
											}, item.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [appliedCoupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[10px] text-green-400",
												children: [
													appliedCoupon.code,
													" (-",
													formatPrice(discount),
													")"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAppliedCoupon(null),
												className: "font-mono text-[9px] text-chrome-dim hover:text-red-400 cursor-pointer",
												children: "Remove"
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: couponCode,
												onChange: (e) => setCouponCode(e.target.value),
												placeholder: "Coupon code",
												className: "flex-1 rounded-xl border border-chrome/20 bg-background px-3 py-2 font-mono text-[10px] outline-none focus:border-chrome/50"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: handleApplyCoupon,
												disabled: couponApplying || !couponCode.trim(),
												className: "btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px] disabled:opacity-30 cursor-pointer",
												children: couponApplying ? "..." : "Apply"
											})]
										}), couponError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[9px] text-red-400",
											children: couponError
										})] }),
										selectedShipping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-xl border border-chrome/20 bg-chrome/5 px-3 py-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-[10px] text-chrome-dim uppercase tracking-[0.2em]",
													children: "Delivery"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-[11px] text-foreground mt-0.5",
													children: selectedShipping.name
												}),
												selectedShipping.estimatedDays && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-mono text-[9px] text-chrome-dim/60",
													children: [selectedShipping.estimatedDays, " days"]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-sm text-chrome shrink-0",
												children: shippingCost === 0 ? "Free" : formatPrice(shippingCost)
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
														children: "Subtotal"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-sm text-chrome",
														children: formatPrice(cartTotal)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
														children: "Shipping"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-chrome",
														children: shippingCost === 0 ? "Free" : formatPrice(shippingCost)
													})]
												}),
												tax > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
														children: "Tax"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-chrome",
														children: formatPrice(tax)
													})]
												}),
												discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.3em] text-green-400",
														children: "Discount"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono text-xs text-green-400",
														children: ["-", formatPrice(discount)]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-lg text-chrome",
												children: formatPrice(grandTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: submitting,
											className: "mt-6 btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50 cursor-pointer",
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
async function queryValidateCoupon(code, subtotal) {
	const { getConvexClient } = await import("./convex-COoNaxwC.mjs").then((n) => n.n);
	const { api } = await import("./api-B0N4M6pc.mjs").then((n) => n.n).then((n) => n.n);
	return await getConvexClient().query(api.coupons.validateCoupon, {
		code,
		subtotal
	});
}
//#endregion
export { Checkout as component };
