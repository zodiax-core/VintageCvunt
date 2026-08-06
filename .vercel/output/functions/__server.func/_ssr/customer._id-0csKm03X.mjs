import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-0csKm03X.js
var $$splitComponentImporter = () => import("./customer._id-ER5w70IF.mjs");
var Route = createFileRoute("/customer/$id")({
	beforeLoad: () => import("./auth-guard-B3LRUeJI.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Customer Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
