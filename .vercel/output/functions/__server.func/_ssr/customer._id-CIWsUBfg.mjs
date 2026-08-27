import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-CIWsUBfg.js
var $$splitComponentImporter = () => import("./customer._id-LI_yG7l0.mjs");
var Route = createFileRoute("/customer/$id")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Customer Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
