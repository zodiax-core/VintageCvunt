import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-CudAlZqb.js
var $$splitComponentImporter = () => import("./order._id-CbJWY75i.mjs");
var Route = createFileRoute("/order/$id")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
