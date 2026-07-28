import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer._id-BPJ78tbU.js
var $$splitComponentImporter = () => import("./customer._id-MCYPljwQ.mjs");
var Route = createFileRoute("/customer/$id")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Customer Detail — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
