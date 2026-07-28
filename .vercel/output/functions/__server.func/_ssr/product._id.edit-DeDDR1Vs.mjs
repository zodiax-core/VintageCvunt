import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id.edit-DeDDR1Vs.js
var $$splitComponentImporter = () => import("./product._id.edit-BtBFJuAc.mjs");
var Route = createFileRoute("/product/$id/edit")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Edit Product — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
