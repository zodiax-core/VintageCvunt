import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-4P1GzU5R.js
var $$splitNotFoundComponentImporter = () => import("./products._slug-X8fcc-E3.mjs");
var $$splitComponentImporter = () => import("./products._slug-DF8KxRTJ.mjs");
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
