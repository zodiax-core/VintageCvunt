import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-D6z03m5U.js
var $$splitComponentImporter = () => import("./customer._id-DYfI-4t-.mjs");
var Route = createFileRoute("/customer/$id")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Customer Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
