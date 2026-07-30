import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-BV7r43CQ.js
var $$splitNotFoundComponentImporter = () => import("./products._slug-X8fcc-E3.mjs");
var $$splitComponentImporter = () => import("./products._slug-fGDm7eCL.mjs");
var Route = createFileRoute("/products/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	head: () => ({ meta: [{ title: "Object — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt object detail."
	}] })
});
//#endregion
export { Route as t };
