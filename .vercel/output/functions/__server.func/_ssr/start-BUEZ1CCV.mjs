import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BUEZ1CCV.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var ADMIN_PATH_RE = /^\/(admin|analytics|collection|content|coupon|customer|message|order|product|review|setting|investor|finance)(\/|$)/;
var adminSessionMiddleware = createMiddleware().server(async ({ next, request }) => {
	const url = new URL(request.url);
	if (!ADMIN_PATH_RE.test(url.pathname)) return next();
	if (!(request.headers.get("cookie") ?? "").split(";").map((c) => c.trim()).some((c) => c.startsWith(`vc_admin_session=`))) return new Response(null, {
		status: 302,
		headers: { location: "/auth" }
	});
	return next();
});
var startInstance = createStart(() => ({ requestMiddleware: [adminSessionMiddleware, errorMiddleware] }));
//#endregion
export { startInstance };
