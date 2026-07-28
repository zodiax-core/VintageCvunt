import { o as __toESM } from "../_runtime.mjs";
import { r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-Dc0i5OIR.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-DXdzIAJ-.mjs";
import { t as cleanError } from "./utils-DLpWP-3B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-oVQFhPmI.js
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
	const { login } = useAuthContext();
	const registerMutation = useMutation(api.customers.register);
	const authenticateMutation = useMutation(api.customers.authenticate);
	const verifyMutation = useMutation(api.customers.verifyEmail);
	const resendVerificationMutation = useMutation(api.customers.resendVerification);
	const requestResetMutation = useMutation(api.customers.requestPasswordReset);
	const resetPasswordMutation = useMutation(api.customers.resetPassword);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		otp: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const validate = () => {
		const errs = {};
		if (mode === "register" && !form.name.trim()) errs.name = "Name is required";
		if (mode !== "reset" && !form.email.trim()) errs.email = "Email is required";
		else if (mode !== "reset" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
		if (mode === "login" || mode === "register" || mode === "reset") {
			if (!form.password) errs.password = "Password is required";
			else if (mode !== "login" && form.password.length < 8) errs.password = "Minimum 8 characters";
		}
		if ((mode === "register" || mode === "reset") && form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
		if ((mode === "verify" || mode === "reset") && form.otp.length !== 6) errs.otp = "Enter a 6-digit code";
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		setTouched({
			name: true,
			email: true,
			password: true,
			confirmPassword: true,
			otp: true
		});
		if (Object.keys(errs).length > 0) return;
		setLoading(true);
		setErrors({});
		setSuccessMsg("");
		try {
			if (mode === "register") {
				const user = await registerMutation({
					name: form.name.trim(),
					email: form.email.trim(),
					password: form.password
				});
				if (user.isEmailVerified) {
					login({
						id: user._id,
						name: user.name,
						email: user.email,
						role: user.role
					});
					const isAdminRole = user.email.toLowerCase() === "zodiaxcore@gmail.com" || user.role === "admin";
					setSuccessMsg(isAdminRole ? "Admin account created! Redirecting to Dashboard…" : "Account created! Welcome to the house.");
					setTimeout(() => navigate({ to: isAdminRole ? "/admin" : "/account" }), 1e3);
				} else {
					setSuccessMsg("Registration successful! Verification code sent to your email.");
					setMode("verify");
				}
			} else if (mode === "verify") {
				const user = await verifyMutation({
					email: form.email.trim(),
					otp: form.otp.trim()
				});
				login({
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role
				});
				setSuccessMsg("Email verified! Welcome to the house.");
				setTimeout(() => navigate({ to: "/account" }), 1e3);
			} else if (mode === "forgot") {
				await requestResetMutation({ email: form.email.trim() });
				setSuccessMsg("If an account exists, a verification code has been sent to your email.");
				setMode("reset");
				setForm((f) => ({
					...f,
					otp: "",
					password: "",
					confirmPassword: ""
				}));
				setTouched({});
			} else if (mode === "reset") {
				await resetPasswordMutation({
					email: form.email.trim(),
					otp: form.otp.trim(),
					newPassword: form.password
				});
				setSuccessMsg("Password reset successfully! Please sign in.");
				setTimeout(() => {
					setMode("login");
					setForm((f) => ({
						...f,
						password: "",
						otp: "",
						confirmPassword: ""
					}));
					setSuccessMsg("");
					setTouched({});
				}, 2e3);
			} else {
				const user = await authenticateMutation({
					email: form.email.trim(),
					password: form.password
				});
				if (user && "needsVerification" in user && user.needsVerification) {
					setSuccessMsg("Please verify your email. A verification code has been sent.");
					setMode("verify");
					setForm((f) => ({
						...f,
						email: user.email
					}));
					return;
				}
				login({
					id: user._id,
					name: user.name || "",
					email: user.email,
					role: user.role
				});
				const isAdminRole = user.email.toLowerCase() === "zodiaxcore@gmail.com" || user.role === "admin";
				setSuccessMsg(isAdminRole ? "Welcome back Admin! Redirecting to Dashboard…" : "Signed in successfully. Redirecting…");
				setTimeout(() => navigate({ to: isAdminRole ? "/admin" : "/account" }), 1e3);
			}
		} catch (err) {
			setErrors({ form: cleanError(err) });
		} finally {
			setLoading(false);
		}
	};
	const handleResendCode = async () => {
		setErrors({});
		setSuccessMsg("");
		try {
			await resendVerificationMutation({ email: form.email.trim() });
			setSuccessMsg("Verification code resent! Please check your email.");
		} catch (err) {
			setErrors({ form: cleanError(err) });
		}
	};
	const getHeaderTitle = () => {
		switch (mode) {
			case "login": return "Welcome";
			case "register": return "Join";
			case "verify": return "Verify Email";
			case "forgot": return "Reset Password";
			case "reset": return "New Password";
		}
	};
	const getHeaderSubtitle = () => {
		switch (mode) {
			case "login": return "Returning Patron";
			case "register": return "New Patron";
			case "verify": return "Verify Patron";
			case "forgot": return "Account Recovery";
			case "reset": return "Account Recovery";
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
								children: ["— ", getHeaderSubtitle()]
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
								className: "mt-4 font-display text-4xl md:text-5xl leading-[0.9] tracking-tight",
								children: getHeaderTitle()
							})]
						}),
						(mode === "login" || mode === "register") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex rounded-full border border-chrome bg-graphite p-1 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("login");
									setErrors({});
									setSuccessMsg("");
								},
								className: `flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "login" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`,
								children: "Sign In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode("register");
									setErrors({});
									setSuccessMsg("");
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
									(mode === "login" || mode === "register" || mode === "forgot") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
									(mode === "login" || mode === "register" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: mode === "reset" ? "New Password" : "Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-chrome-dim/50 pointer-events-none",
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "3",
													y: "11",
													width: "18",
													height: "11",
													rx: "2",
													ry: "2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: form.password,
												onChange: (e) => setForm({
													...form,
													password: e.target.value
												}),
												onBlur: () => handleBlur("password"),
												placeholder: "••••••••",
												className: `w-full rounded-xl border bg-graphite pl-10 pr-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.password && errors.password ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											})]
										}),
										touched.password && errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400",
											children: errors.password
										})
									] }),
									(mode === "register" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Confirm Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-chrome-dim/50 pointer-events-none",
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "3",
													y: "11",
													width: "18",
													height: "11",
													rx: "2",
													ry: "2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: form.confirmPassword,
												onChange: (e) => setForm({
													...form,
													confirmPassword: e.target.value
												}),
												onBlur: () => handleBlur("confirmPassword"),
												placeholder: "••••••••",
												className: `w-full rounded-xl border bg-graphite pl-10 pr-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.confirmPassword && errors.confirmPassword ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											})]
										}),
										touched.confirmPassword && errors.confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400",
											children: errors.confirmPassword
										})
									] }),
									(mode === "verify" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-center font-mono text-[11px] text-chrome-dim mb-6",
											children: mode === "reset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Enter the 6-digit reset code sent to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: form.email
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												"Enter the 6-digit verification code sent to ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: form.email
												}),
												"."
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2",
											children: "Verification Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											maxLength: 6,
											value: form.otp,
											onChange: (e) => setForm({
												...form,
												otp: e.target.value.replace(/\D/g, "")
											}),
											onBlur: () => handleBlur("otp"),
											placeholder: "123456",
											className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-center text-xl tracking-widest placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.otp && errors.otp ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
										}),
										touched.otp && errors.otp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-red-400 text-center",
											children: errors.otp
										}),
										mode === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleResendCode,
											className: "w-full text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome mt-4",
											children: "Resend Code"
										})
									] }),
									mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setMode("forgot");
											setErrors({});
											setSuccessMsg("");
										},
										className: "block w-full text-right font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors",
										children: "Forgot password?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: loading,
										className: "btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50 mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "btn-label",
											children: loading ? "Processing…" : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : mode === "forgot" ? "Send Reset Code" : mode === "reset" ? "Update Password" : "Verify Email"
										})
									}),
									(mode === "verify" || mode === "forgot" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setMode("login");
											setErrors({});
											setSuccessMsg("");
										},
										className: "w-full text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome mt-4",
										children: "Back to Sign In"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											height: 0
										},
										animate: {
											opacity: 1,
											height: "auto"
										},
										exit: {
											opacity: 0,
											height: 0
										},
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center mt-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[11px] text-green-400",
												children: successMsg
											})
										})
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: Object.values(errors).some(Boolean) && !successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											height: 0
										},
										animate: {
											opacity: 1,
											height: "auto"
										},
										exit: {
											opacity: 0,
											height: 0
										},
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 mt-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-1",
												children: Object.entries(errors).filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													className: "font-mono text-[10px] text-red-400",
													children: v
												}, k))
											})
										})
									}) })
								]
							}, mode)
						}),
						(mode === "login" || mode === "register") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
								type: "button",
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
										type: "button",
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
										type: "button",
										onClick: () => {
											setMode("login");
											setErrors({});
										},
										className: "text-chrome hover:text-foreground underline underline-offset-2",
										children: "Sign In"
									})
								] })
							})
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Auth as component };
