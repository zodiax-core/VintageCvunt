import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-Din4MCV0.js
var $$splitComponentImporter = () => import("./order-confirmed-B9Bms91P.mjs");
var Route = createFileRoute("/order-confirmed")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => ({ orderId: search.orderId || "VC-" + String(Math.floor(1e5 + Math.random() * 9e5)) }),
	head: () => ({ meta: [{ title: "Order Confirmed — VintageCvunt" }, {
		name: "description",
		content: "Your order has been placed. Thank you for your patronage."
	}] })
});
//#endregion
export { Route as t };
