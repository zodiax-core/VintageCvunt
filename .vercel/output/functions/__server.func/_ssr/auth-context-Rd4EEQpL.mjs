import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-Rd4EEQpL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "vc_user";
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed && parsed.email) {
					if (parsed.email.toLowerCase() === "zodiaxcore@gmail.com") parsed.role = "admin";
					setUser(parsed);
				}
			}
		} catch {}
	}, []);
	const login = (userData) => {
		const isAdmin = userData.email.toLowerCase() === "zodiaxcore@gmail.com" || userData.role === "admin";
		const fullUser = {
			...userData,
			role: isAdmin ? "admin" : "customer"
		};
		setUser(fullUser);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
	};
	const logout = () => {
		setUser(null);
		localStorage.removeItem(STORAGE_KEY);
	};
	const isAdmin = Boolean(user && (user.role === "admin" || user.email.toLowerCase() === "zodiaxcore@gmail.com"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			login,
			logout,
			isAdmin
		},
		children
	});
}
function useAuthContext() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuthContext as n, AuthProvider as t };
