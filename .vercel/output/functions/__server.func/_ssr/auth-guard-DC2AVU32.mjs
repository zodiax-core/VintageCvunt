import { n as getSessionToken, r as isAdminEmail } from "./admin-D4iRQZfC.mjs";
import { j as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-guard-DC2AVU32.js
function getStoredUser() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem("vc_user");
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function requireAdmin() {
	if (typeof window === "undefined") return;
	const user = getStoredUser();
	if (!user) throw redirect({ to: "/auth" });
	if (!(user.role === "admin" || isAdminEmail(user.email))) throw redirect({ to: "/" });
	if (!getSessionToken()) throw redirect({ to: "/auth" });
}
function requireCustomer() {
	if (typeof window === "undefined") return;
	const user = getStoredUser();
	if (!user) throw redirect({ to: "/auth" });
	if (!user.email) throw redirect({ to: "/auth" });
}
//#endregion
export { requireAdmin, requireCustomer };
