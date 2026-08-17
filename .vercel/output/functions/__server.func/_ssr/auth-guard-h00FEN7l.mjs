import { a as setSessionToken, n as getSessionToken, r as isAdminEmail, t as clearSessionCookie } from "./admin-D4iRQZfC.mjs";
import { j as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CONVEX_URL } from "./convex-COoNaxwC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-guard-h00FEN7l.js
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
async function validateSessionToken(token) {
	try {
		const res = await fetch(`${CONVEX_URL}/api/query`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				path: "admin:validateSession",
				args: { sessionToken: token }
			})
		});
		if (!res.ok) return false;
		const json = await res.json();
		return (json && typeof json === "object" && "value" in json ? json.value : json)?.valid === true;
	} catch {
		return true;
	}
}
async function requireAdmin() {
	if (typeof window === "undefined") return;
	const user = getStoredUser();
	if (!user) throw redirect({ to: "/auth" });
	if (!(user.role === "admin" || isAdminEmail(user.email))) throw redirect({ to: "/" });
	const token = getSessionToken();
	if (!token) throw redirect({ to: "/auth" });
	if (!await validateSessionToken(token)) {
		setSessionToken(null);
		clearSessionCookie();
		localStorage.removeItem("vc_user");
		throw redirect({ to: "/auth" });
	}
}
function requireCustomer() {
	if (typeof window === "undefined") return;
	const user = getStoredUser();
	if (!user) throw redirect({ to: "/auth" });
	if (!user.email) throw redirect({ to: "/auth" });
}
//#endregion
export { requireAdmin, requireCustomer };
