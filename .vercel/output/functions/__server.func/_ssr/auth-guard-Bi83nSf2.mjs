import { M as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-guard-Bi83nSf2.js
function requireAdmin() {
	if (typeof window === "undefined") return;
	const raw = localStorage.getItem("vc_user");
	if (!raw) throw notFound();
	try {
		const user = JSON.parse(raw);
		if (!user.email || user.email.toLowerCase() !== "zodiaxcore@gmail.com") throw notFound();
	} catch {
		throw notFound();
	}
}
function requireCustomer() {
	if (typeof window === "undefined") return;
	const raw = localStorage.getItem("vc_user");
	if (!raw) throw notFound();
	try {
		const user = JSON.parse(raw);
		if (!user.email || user.role !== "customer") throw notFound();
	} catch {
		throw notFound();
	}
}
//#endregion
export { requireAdmin, requireCustomer };
