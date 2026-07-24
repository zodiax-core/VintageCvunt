import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-C9Z0suw5.js
var $$splitComponentImporter = () => import("./order._id-DA5ETYpo.mjs");
var Route = createFileRoute("/order/$id")({
	beforeLoad: () => import("./auth-guard-Bi83nSf2.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
