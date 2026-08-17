import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-CoM2scNx.js
var $$splitComponentImporter = () => import("./orders._id-g1Lc_KkA.mjs");
var Route = createFileRoute("/orders/$id")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt" }] })
});
//#endregion
export { Route as t };
