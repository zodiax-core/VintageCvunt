import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-DKyG4i_w.js
var $$splitComponentImporter = () => import("./order._id-BKtTJu9d.mjs");
var Route = createFileRoute("/order/$id")({
	beforeLoad: () => import("./auth-guard-DC2AVU32.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
