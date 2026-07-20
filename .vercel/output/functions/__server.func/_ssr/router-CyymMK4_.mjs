import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as CartProvider } from "./product-boots-yUznlmdZ.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$8 } from "./order-confirmed-DLykAk2t.mjs";
import { t as Route$9 } from "./products._slug-D18qThuT.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CyymMK4_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C_v_biRW.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		"data-tsd-source": "/src/routes/__root.tsx:19:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			"data-tsd-source": "/src/routes/__root.tsx:20:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:21:9",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:22:9",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:23:9",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					"data-tsd-source": "/src/routes/__root.tsx:26:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						"data-tsd-source": "/src/routes/__root.tsx:27:11",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		"data-tsd-source": "/src/routes/__root.tsx:47:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			"data-tsd-source": "/src/routes/__root.tsx:48:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:49:9",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:52:9",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					"data-tsd-source": "/src/routes/__root.tsx:55:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						"data-tsd-source": "/src/routes/__root.tsx:56:11",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						"data-tsd-source": "/src/routes/__root.tsx:65:11",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VintageCvunt — Modern Gothic Luxury" },
			{
				name: "description",
				content: "VintageCvunt. A modern gothic luxury house. Chrome, leather, silver — an interactive fashion campaign."
			},
			{
				name: "author",
				content: "VintageCvunt"
			},
			{
				property: "og:title",
				content: "VintageCvunt — Modern Gothic Luxury"
			},
			{
				property: "og:description",
				content: "An interactive luxury fashion campaign. Chrome, leather, silver."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-tsd-source": "/src/routes/__root.tsx:109:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", {
			"data-tsd-source": "/src/routes/__root.tsx:110:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, { "data-tsd-source": "/src/routes/__root.tsx:111:9" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			"data-tsd-source": "/src/routes/__root.tsx:113:7",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, { "data-tsd-source": "/src/routes/__root.tsx:115:9" })]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis();
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => lenis.destroy();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		"data-tsd-source": "/src/routes/__root.tsx:135:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, {
			"data-tsd-source": "/src/routes/__root.tsx:136:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, { "data-tsd-source": "/src/routes/__root.tsx:137:9" })
		})
	});
}
var $$splitComponentImporter$6 = () => import("./routes-DVwnOoaS.mjs");
var Route$6 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({
		meta: [
			{ title: "VintageCvunt — Modern Gothic Luxury House" },
			{
				name: "description",
				content: "An interactive luxury fashion campaign in chrome, leather and silver. Explore VintageCvunt's inaugural collection."
			},
			{
				property: "og:image",
				content: butterfly_img_default$1
			}
		],
		links: [{
			rel: "preload",
			href: butterfly_img_default,
			as: "image",
			type: "image/webp",
			fetchPriority: "high"
		}]
	})
});
var $$splitComponentImporter$5 = () => import("./about-DIx4dRD3.mjs");
var Route$5 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "About Us — VintageCvunt" }, {
		name: "description",
		content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather."
	}] })
});
var $$splitComponentImporter$4 = () => import("./auth-2Y0DVI7n.mjs");
var Route$4 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Account — VintageCvunt" }, {
		name: "description",
		content: "Sign in or create your VintageCvunt account."
	}] })
});
var $$splitComponentImporter$3 = () => import("./cart-Dx9MqibP.mjs");
var Route$3 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Cart — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt shopping cart."
	}] })
});
var $$splitComponentImporter$2 = () => import("./checkout-DDHaLiYo.mjs");
var Route$2 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Checkout — VintageCvunt" }, {
		name: "description",
		content: "Complete your order at VintageCvunt."
	}] })
});
var $$splitComponentImporter$1 = () => import("./contact-BzbCDv7i.mjs");
var Route$1 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Contact — VintageCvunt" }, {
		name: "description",
		content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence."
	}] })
});
var $$splitComponentImporter = () => import("./shop-B8uPuuAl.mjs");
var Route = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Shop — VintageCvunt" }, {
		name: "description",
		content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment."
	}] })
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute: Route$5.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$7
	}),
	AuthRoute: Route$4.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$7
	}),
	CartRoute: Route$3.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$7
	}),
	CheckoutRoute: Route$2.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$7
	}),
	ContactRoute: Route$1.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$7
	}),
	OrderConfirmedRoute: Route$8.update({
		id: "/order-confirmed",
		path: "/order-confirmed",
		getParentRoute: () => Route$7
	}),
	ShopRoute: Route.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$7
	}),
	ProductsSlugRoute: Route$9.update({
		id: "/products/$slug",
		path: "/products/$slug",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
