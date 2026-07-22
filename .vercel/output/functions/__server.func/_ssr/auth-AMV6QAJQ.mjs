import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-CR_fnpUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-AMV6QAJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
function Auth() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const [success, setSuccess] = (0, import_react.useState)(false);
	const validate = () => {
		const errs = {};
		if (mode === "register" && !form.name.trim()) errs.name = "Name is required";
		if (!form.email.trim()) errs.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
		if (!form.password) errs.password = "Password is required";
		else if (form.password.length < 8) errs.password = "Minimum 8 characters";
		if (mode === "register" && form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
		return errs;
	};
	const handleBlur = (field) => {
		setTouched({
			...touched,
			[field]: true
		});
		const errs = validate();
		setErrors((prev) => ({
			...prev,
			[field]: errs[field] || ""
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		setTouched({
			name: true,
			email: true,
			password: true,
			confirmPassword: true
		});
		if (Object.keys(errs).length === 0) {
			setSuccess(true);
			setTimeout(() => navigate({ to: "/admin" }), 1e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 md:pt-44 pb-16 md:pb-28 overflow-hidden min-h-screen flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-md px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-8 md:mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
								initial: { clipPath: "inset(0 100% 0 0)" },
								animate: { clipPath: "inset(0 0% 0 0)" },
								transition: {
									duration: 1.4,
									ease: EASE
								},
								className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
								children: [
									"— ",
									mode === "login" ? "Returning" : "New",
									" Patron"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: 1.2,
									ease: EASE
								},
								className: "mt-4 font-display text-4xl md:text-6xl leading-[0.9] tracking-tight",
								children: mode === "login" ? "Welcome" : "Join"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex rounded-full border border-chrome bg-graphite p-1 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setMode("login");
									setErrors({});
									setSuccess(false);
								},
								className: `flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "login" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`,
								children: "Sign In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setMode("register");
									setErrors({});
									setSuccess(false);
								},
								className: `flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "register" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`,
								children: "Register"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -10
								},
								transition: {
									duration: .4,
									ease: EASE
								},
								onSubmit: handleSubmit,
								className: "space-y-5",
								children: [
									mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Full Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.name,
											onChange: (e) => setForm({
												...form,
												name: e.target.value
											}),
											onBlur: () => handleBlur("name"),
											placeholder: "John Doe",
											className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
										}),
										touched.name && errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400",
											children: errors.name
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: form.email,
											onChange: (e) => setForm({
												...form,
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
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: form.password,
											onChange: (e) => setForm({
												...form,
												password: e.target.value
											}),
											onBlur: () => handleBlur("password"),
											placeholder: "••••••••",
											className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.password && errors.password ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
										}),
										touched.password && errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400",
											children: errors.password
										})
									] }),
									mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Confirm Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: form.confirmPassword,
											onChange: (e) => setForm({
												...form,
												confirmPassword: e.target.value
											}),
											onBlur: () => handleBlur("confirmPassword"),
											placeholder: "••••••••",
											className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.confirmPassword && errors.confirmPassword ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
										}),
										touched.confirmPassword && errors.confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400",
											children: errors.confirmPassword
										})
									] }),
									mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "block text-right font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors",
										children: "Forgot password?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "btn-chrome btn-chrome-inner w-full justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "btn-label",
											children: mode === "login" ? "Sign In" : "Create Account"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: -10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: { opacity: 0 },
										className: "rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] text-green-400",
											children: mode === "login" ? "Signed in successfully. Redirecting…" : "Account created. Welcome to the house."
										})
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: Object.values(errors).some(Boolean) && !success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: -10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: { opacity: 0 },
										className: "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1",
											children: Object.entries(errors).filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "font-mono text-[10px] text-red-400",
												children: v
											}, k))
										})
									}) })
								]
							}, mode)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative my-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-chrome" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-background px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
									children: "or continue with"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {},
							className: "w-full flex items-center justify-center gap-3 rounded-full border border-chrome bg-graphite px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground hover:bg-graphite-2 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M22.5 12.2c0-.7-.1-1.4-.2-2.1H12v4.1h5.9a4.8 4.8 0 01-2.1 3.2v2.6h3.4c2-1.8 3.1-4.5 3.1-7.8z",
										fill: "#4285F4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 23c2.8 0 5.1-.9 6.8-2.6l-3.4-2.6c-.9.6-2.1 1-3.4 1a6.8 6.8 0 01-6.4-4.6H2v2.8A12 12 0 0012 23z",
										fill: "#34A853"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M5.6 14.2A7.3 7.3 0 015.3 12c0-.8.1-1.5.3-2.2V7H2a12 12 0 000 10l3.6-2.8z",
										fill: "#FBBC05"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 5.2c1.5 0 2.9.5 4 1.5l3-3A11.9 11.9 0 002 7l3.6 2.8A6.8 6.8 0 0112 5.2z",
										fill: "#EA4335"
									})
								]
							}), "Continue with Google"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim",
							children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"No account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setMode("register");
										setErrors({});
									},
									className: "text-chrome hover:text-foreground underline underline-offset-2",
									children: "Register"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Already a patron?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setMode("login");
										setErrors({});
									},
									className: "text-chrome hover:text-foreground underline underline-offset-2",
									children: "Sign In"
								})
							] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Auth as component };
