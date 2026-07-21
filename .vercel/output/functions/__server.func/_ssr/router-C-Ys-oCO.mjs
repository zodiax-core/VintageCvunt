import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as CartProvider } from "./product-boots-2Dw9K3Jj.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$24 } from "./customer._id-CoObsgw2.mjs";
import { t as Route$25 } from "./order-confirmed-DgHAQu3I.mjs";
import { t as Route$26 } from "./order._id-BprlMCUA.mjs";
import { t as Route$27 } from "./product._id.edit-UWWrUJjH.mjs";
import { t as Route$28 } from "./products._slug-BthHtuod.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C-Ys-oCO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DzsK0nA1.css";
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$22 = () => import("./routes-B7zoXY1A.mjs");
var Route$22 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
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
var $$splitComponentImporter$21 = () => import("./about-B0jdKNv7.mjs");
var Route$21 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: "About Us — VintageCvunt" }, {
		name: "description",
		content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather."
	}] })
});
var $$splitComponentImporter$20 = () => import("./admin-XNFItuWG.mjs");
var Route$20 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [{ title: "Dashboard — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$19 = () => import("./analytics-z-7_bVyq.mjs");
var Route$19 = createFileRoute("/analytics")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Analytics — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$18 = () => import("./auth-DJH9mAr0.mjs");
var Route$18 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Account — VintageCvunt" }, {
		name: "description",
		content: "Sign in or create your VintageCvunt account."
	}] })
});
var $$splitComponentImporter$17 = () => import("./cart-BbU2Knjs.mjs");
var Route$17 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "Cart — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt shopping cart."
	}] })
});
var $$splitComponentImporter$16 = () => import("./checkout-BTIUdN9o.mjs");
var Route$16 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "Checkout — VintageCvunt" }, {
		name: "description",
		content: "Complete your order at VintageCvunt."
	}] })
});
var $$splitComponentImporter$15 = () => import("./contact-BLNutM5n.mjs");
var Route$15 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Contact — VintageCvunt" }, {
		name: "description",
		content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence."
	}] })
});
var $$splitComponentImporter$14 = () => import("./content-DR7iqgMl.mjs");
var Route$14 = createFileRoute("/content")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Content — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$13 = () => import("./coupon-CQyiS8bV.mjs");
var Route$13 = createFileRoute("/coupon")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Coupons — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$12 = () => import("./customer-Dt7lxqCY.mjs");
var Route$12 = createFileRoute("/customer")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$11 = () => import("./faq-xH3YFN1d.mjs");
var Route$11 = createFileRoute("/faq")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "FAQ — VintageCvunt" }, {
		name: "description",
		content: "Frequently asked questions about VintageCvunt. Orders, shipping, returns, product care, and sizing information."
	}] })
});
var $$splitComponentImporter$10 = () => import("./message-eldqPyx_.mjs");
var Route$10 = createFileRoute("/message")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Messages — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$9 = () => import("./order-COa6H9dX.mjs");
var Route$9 = createFileRoute("/order")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$8 = () => import("./privacy-policy-BQW8sSnQ.mjs");
var Route$8 = createFileRoute("/privacy-policy")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Privacy Policy — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt privacy policy. How we collect, use, and protect your personal data in compliance with GDPR and CCPA."
	}] })
});
var $$splitComponentImporter$7 = () => import("./product-D2aVsSAW.mjs");
var Route$7 = createFileRoute("/product")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Products — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$6 = () => import("./review-BHxLyEWY.mjs");
var Route$6 = createFileRoute("/review")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Reviews — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$5 = () => import("./setting-CWXSi6yq.mjs");
var Route$5 = createFileRoute("/setting")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Settings — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$4 = () => import("./shipping-returns-D8Q5ryzy.mjs");
var Route$4 = createFileRoute("/shipping-returns")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Shipping & Returns — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt shipping and returns policy. Domestic and international delivery rates, processing times, and return instructions."
	}] })
});
var $$splitComponentImporter$3 = () => import("./shop-DZou2EBx.mjs");
var Route$3 = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Shop — VintageCvunt" }, {
		name: "description",
		content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment."
	}] })
});
var $$splitComponentImporter$2 = () => import("./size-guide-5lToObf7.mjs");
var Route$2 = createFileRoute("/size-guide")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Size Guide — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt size guide. Find your perfect fit with our measurement charts for jackets, tops, bottoms, footwear, and rings."
	}] })
});
var $$splitComponentImporter$1 = () => import("./terms-conditions-CgIJRvbG.mjs");
var Route$1 = createFileRoute("/terms-conditions")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Terms & Conditions — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt terms and conditions governing the use of our website, products, and services."
	}] })
});
var $$splitComponentImporter = () => import("./product.new-B6yfaGPU.mjs");
var Route = createFileRoute("/product/new")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Add Product — VintageCvunt Admin" }] })
});
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AboutRoute = Route$21.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$20.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var AnalyticsRoute = Route$19.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$23
});
var AuthRoute = Route$18.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$23
});
var CartRoute = Route$17.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$23
});
var CheckoutRoute = Route$16.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$23
});
var ContactRoute = Route$15.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$23
});
var ContentRoute = Route$14.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => Route$23
});
var CouponRoute = Route$13.update({
	id: "/coupon",
	path: "/coupon",
	getParentRoute: () => Route$23
});
var CustomerRoute = Route$12.update({
	id: "/customer",
	path: "/customer",
	getParentRoute: () => Route$23
});
var FaqRoute = Route$11.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$23
});
var MessageRoute = Route$10.update({
	id: "/message",
	path: "/message",
	getParentRoute: () => Route$23
});
var OrderRoute = Route$9.update({
	id: "/order",
	path: "/order",
	getParentRoute: () => Route$23
});
var OrderConfirmedRoute = Route$25.update({
	id: "/order-confirmed",
	path: "/order-confirmed",
	getParentRoute: () => Route$23
});
var PrivacyPolicyRoute = Route$8.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$23
});
var ProductRoute = Route$7.update({
	id: "/product",
	path: "/product",
	getParentRoute: () => Route$23
});
var ReviewRoute = Route$6.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$23
});
var SettingRoute = Route$5.update({
	id: "/setting",
	path: "/setting",
	getParentRoute: () => Route$23
});
var ShippingReturnsRoute = Route$4.update({
	id: "/shipping-returns",
	path: "/shipping-returns",
	getParentRoute: () => Route$23
});
var ShopRoute = Route$3.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$23
});
var SizeGuideRoute = Route$2.update({
	id: "/size-guide",
	path: "/size-guide",
	getParentRoute: () => Route$23
});
var TermsConditionsRoute = Route$1.update({
	id: "/terms-conditions",
	path: "/terms-conditions",
	getParentRoute: () => Route$23
});
var CustomerIdRoute = Route$24.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => CustomerRoute
});
var OrderIdRoute = Route$26.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => OrderRoute
});
var ProductNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => ProductRoute
});
var ProductsSlugRoute = Route$28.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$23
});
var ProductIdEditRoute = Route$27.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => ProductRoute
});
var CustomerRouteChildren = { CustomerIdRoute };
var CustomerRouteWithChildren = CustomerRoute._addFileChildren(CustomerRouteChildren);
var OrderRouteChildren = { OrderIdRoute };
var OrderRouteWithChildren = OrderRoute._addFileChildren(OrderRouteChildren);
var ProductRouteChildren = {
	ProductNewRoute,
	ProductIdEditRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute,
	AnalyticsRoute,
	AuthRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	ContentRoute,
	CouponRoute,
	CustomerRoute: CustomerRouteWithChildren,
	FaqRoute,
	MessageRoute,
	OrderRoute: OrderRouteWithChildren,
	OrderConfirmedRoute,
	PrivacyPolicyRoute,
	ProductRoute: ProductRoute._addFileChildren(ProductRouteChildren),
	ReviewRoute,
	SettingRoute,
	ShippingReturnsRoute,
	ShopRoute,
	SizeGuideRoute,
	TermsConditionsRoute,
	ProductsSlugRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
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
