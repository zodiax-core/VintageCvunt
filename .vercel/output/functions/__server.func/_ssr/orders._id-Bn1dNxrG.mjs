import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-Bn1dNxrG.js
var $$splitComponentImporter = () => import("./orders._id-CIo6ECYm.mjs");
var Route = createFileRoute("/orders/$id")({
	beforeLoad: () => import("./auth-guard-Bi83nSf2.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Order Detail — VintageCvunt" }] })
});
//#endregion
export { Route as t };
