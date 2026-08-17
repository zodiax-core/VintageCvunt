import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id.edit-7d0WIWsZ.js
var $$splitComponentImporter = () => import("./product._id.edit-BFq5v1Wn.mjs");
var Route = createFileRoute("/product/$id/edit")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Edit Product — VintageCvunt Admin" }] })
});
//#endregion
export { Route as t };
