import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-BkJWo7Ma.js
var $$splitComponentImporter = () => import("./order._id-BbRC1bkn.mjs");
var Route = createFileRoute("/order/$id")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
