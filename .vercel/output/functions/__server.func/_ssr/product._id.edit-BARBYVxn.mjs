import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id.edit-BARBYVxn.js
var $$splitComponentImporter = () => import("./product._id.edit-DpIYlZ7w.mjs");
var Route = createFileRoute("/product/$id/edit")({
	beforeLoad: () => import("./auth-guard-Bi83nSf2.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Edit Product — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
