import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as ConvexReactClient } from "../_libs/convex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/convex-COoNaxwC.js
var convex_exports = /* @__PURE__ */ __exportAll({
	CONVEX_URL: () => CONVEX_URL,
	getConvexClient: () => getConvexClient
});
var CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
var convexClient = null;
function getConvexClient() {
	if (!convexClient) convexClient = new ConvexReactClient(CONVEX_URL, { skipConvexDeploymentUrlCheck: typeof window === "undefined" });
	return convexClient;
}
//#endregion
export { convex_exports as n, getConvexClient as r, CONVEX_URL as t };
