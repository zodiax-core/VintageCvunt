import { o as __toESM } from "../_runtime.mjs";
import { i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as isAdminEmail, r as setSessionToken, t as getSessionToken } from "./admin-B1i7bz-H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-CocvLYL7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "vc_user";
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [sessionToken, setToken] = (0, import_react.useState)(null);
	const revokeSession = useMutation(api.admin.revokeSession);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed && parsed.email) {
					if (isAdminEmail(parsed.email)) parsed.role = "admin";
					setUser(parsed);
				}
			}
			setToken(getSessionToken());
		} catch {}
	}, []);
	const login = (userData, token) => {
		const isAdmin = isAdminEmail(userData.email) || userData.role === "admin";
		const fullUser = {
			...userData,
			role: isAdmin ? "admin" : "customer"
		};
		setUser(fullUser);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
		if (token) {
			setSessionToken(token);
			setToken(token);
		}
	};
	const logout = () => {
		const token = sessionToken || getSessionToken();
		if (token) revokeSession({ sessionToken: token }).catch(() => {});
		setUser(null);
		setToken(null);
		localStorage.removeItem(STORAGE_KEY);
		setSessionToken(null);
	};
	const updateUser = (updates) => {
		setUser((prev) => {
			if (!prev) return prev;
			const updated = {
				...prev,
				...updates
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			return updated;
		});
	};
	const isAdmin = Boolean(user && (user.role === "admin" || isAdminEmail(user.email)));
	const isCustomer = Boolean(user && user.role === "customer");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			sessionToken,
			login,
			logout,
			updateUser,
			isAdmin,
			isCustomer
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
