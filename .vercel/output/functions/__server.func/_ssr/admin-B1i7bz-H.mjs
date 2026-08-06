//#region node_modules/.nitro/vite/services/ssr/assets/admin-B1i7bz-H.js
var ADMIN_EMAILS = ["zodiaxcore@gmail.com", "vintagecvunt@gmail.com"];
function isAdminEmail(email) {
	return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase().trim()));
}
var SESSION_STORAGE_KEY = "vc_admin_session";
function getSessionToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(SESSION_STORAGE_KEY);
}
function setSessionToken(token) {
	if (typeof window === "undefined") return;
	if (token) localStorage.setItem(SESSION_STORAGE_KEY, token);
	else localStorage.removeItem(SESSION_STORAGE_KEY);
}
//#endregion
export { isAdminEmail as n, setSessionToken as r, getSessionToken as t };
