import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DIJc2T3I.js
var $$splitComponentImporter = () => import("./shop-DEf3fqTd.mjs");
var Route = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => ({ category: typeof search.category === "string" ? search.category : void 0 }),
	head: () => ({ meta: [{ title: "Shop — VintageCvunt" }, {
		name: "description",
		content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment."
	}] })
});
//#endregion
export { Route as t };
