import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-DqR2RY4d.js
var $$splitComponentImporter = () => import("./orders._id-CECRPFoC.mjs");
var Route = createFileRoute("/orders/$id")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt" }] })
});
//#endregion
export { Route as t };
