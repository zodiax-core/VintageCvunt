//#region node_modules/.nitro/vite/services/ssr/assets/admin-D4iRQZfC.js
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
var SESSION_COOKIE = "vc_admin_session";
function setSessionCookie(token) {
	if (typeof document === "undefined") return;
	document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
}
function clearSessionCookie() {
	if (typeof document === "undefined") return;
	document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
//#endregion
export { setSessionToken as a, setSessionCookie as i, getSessionToken as n, isAdminEmail as r, clearSessionCookie as t };
