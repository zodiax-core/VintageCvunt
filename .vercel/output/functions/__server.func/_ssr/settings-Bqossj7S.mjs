import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-Dc0i5OIR.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { _ as Save } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-Duu_HWWl.mjs";
import { t as cleanError } from "./utils-DLpWP-3B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Bqossj7S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountSettings() {
	const { user, updateUser } = useAuthContext();
	const customer = useQuery(api.customers.getByEmail, { email: user?.email || "" });
	const updateProfile = useMutation(api.customers.updateProfile);
	const updatePassword = useMutation(api.customers.updatePassword);
	const [profile, setProfile] = (0, import_react.useState)({
		name: user?.name || "",
		phone: "",
		address: ""
	});
	const [passwords, setPasswords] = (0, import_react.useState)({
		current: "",
		new: "",
		confirm: ""
	});
	const [profileMsg, setProfileMsg] = (0, import_react.useState)("");
	const [passwordMsg, setPasswordMsg] = (0, import_react.useState)("");
	const [profileLoading, setProfileLoading] = (0, import_react.useState)(false);
	const [passwordLoading, setPasswordLoading] = (0, import_react.useState)(false);
	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		if (!customer) return;
		setProfileLoading(true);
		setProfileMsg("");
		try {
			await updateProfile({
				id: customer._id,
				name: profile.name.trim() || void 0,
				phone: profile.phone.trim() || void 0,
				address: profile.address.trim() || void 0
			});
			if (profile.name.trim()) updateUser({ name: profile.name.trim() });
			setProfileMsg("Profile updated successfully.");
		} catch (err) {
			setProfileMsg(cleanError(err));
		} finally {
			setProfileLoading(false);
		}
	};
	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		if (!customer) return;
		if (passwords.new !== passwords.confirm) {
			setPasswordMsg("New passwords do not match.");
			return;
		}
		if (passwords.new.length < 8) {
			setPasswordMsg("New password must be at least 8 characters.");
			return;
		}
		setPasswordLoading(true);
		setPasswordMsg("");
		try {
			await updatePassword({
				id: customer._id,
				currentPassword: passwords.current,
				newPassword: passwords.new
			});
			setPasswords({
				current: "",
				new: "",
				confirm: ""
			});
			setPasswordMsg("Password changed successfully.");
		} catch (err) {
			setPasswordMsg(cleanError(err));
		} finally {
			setPasswordLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 border-b border-chrome/10 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-mono uppercase tracking-[0.2em] text-foreground",
			children: "Account Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2",
			children: "Manage your profile and security"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-6",
				children: "Profile Details"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleProfileSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "Full Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.name,
						onChange: (e) => setProfile({
							...profile,
							name: e.target.value
						}),
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: user?.email || "",
							disabled: true,
							className: "w-full rounded-xl border border-chrome/10 bg-chrome/5 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-[9px] text-chrome-dim/40",
							children: "Email cannot be changed."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "Phone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.phone,
						onChange: (e) => setProfile({
							...profile,
							phone: e.target.value
						}),
						placeholder: "+92 300 1234567",
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "Address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: profile.address,
						onChange: (e) => setProfile({
							...profile,
							address: e.target.value
						}),
						rows: 2,
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors resize-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: profileLoading,
						className: "btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: profileLoading ? "Saving…" : "Save Changes"
						})]
					}),
					profileMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: -5
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: `font-mono text-[10px] ${profileMsg.includes("success") ? "text-green-400" : "text-red-400"}`,
						children: profileMsg
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-6",
				children: "Change Password"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handlePasswordSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "Current Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: passwords.current,
						onChange: (e) => setPasswords({
							...passwords,
							current: e.target.value
						}),
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "New Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: passwords.new,
						onChange: (e) => setPasswords({
							...passwords,
							new: e.target.value
						}),
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2",
						children: "Confirm New Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: passwords.confirm,
						onChange: (e) => setPasswords({
							...passwords,
							confirm: e.target.value
						}),
						className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: passwordLoading,
						className: "btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: passwordLoading ? "Changing…" : "Update Password"
						})]
					}),
					passwordMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: -5
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: `font-mono text-[10px] ${passwordMsg.includes("success") ? "text-green-400" : "text-red-400"}`,
						children: passwordMsg
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { AccountSettings as component };
