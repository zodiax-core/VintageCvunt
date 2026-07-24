import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-2f08fjhI.js
var $$splitComponentImporter = () => import("./customer._id-Bwv3gzFw.mjs");
var Route = createFileRoute("/customer/$id")({
	beforeLoad: () => import("./auth-guard-Bi83nSf2.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Customer Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
