import { o as __toESM } from "../_runtime.mjs";
import { n as ConvexReactClient, t as ConvexProvider } from "../_libs/convex.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as CartProvider } from "./cart-context-CAiE_2vy.mjs";
import { t as AuthProvider } from "./auth-context-Dc0i5OIR.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
import { t as Route$29 } from "./order-confirmed-CZcjUN0-.mjs";
import { t as Route$30 } from "./customer._id-QBnXiN3O.mjs";
import { t as Route$31 } from "./order._id-BkJWo7Ma.mjs";
import { t as Route$32 } from "./orders._id-BDnq-Z2P.mjs";
import { t as Route$33 } from "./products._slug-BYKxgRYh.mjs";
import { t as Route$34 } from "./product._id.edit-BV6cOq9w.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DejTswdS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
var convexClient = null;
function getConvexClient() {
	if (!convexClient) convexClient = new ConvexReactClient(CONVEX_URL, { skipConvexDeploymentUrlCheck: typeof window === "undefined" });
	return convexClient;
}
var styles_default = "/assets/styles-CmIorLoH.css";
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
	const isConvexError = error?.message?.includes("Could not find public function") || error?.message?.includes("CONVEX") || error?.message?.includes("Server Error");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: isConvexError ? "Backend Connecting…" : "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: isConvexError ? "The backend server is starting up. Please wait a moment and try again." : "Something went wrong on our end. You can try refreshing or head back home."
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
var Route$28 = createRootRouteWithContext()({
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
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			suppressHydrationWarning: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$28.useRouteContext();
	const [convexClient] = (0, import_react.useState)(() => getConvexClient());
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis();
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => lenis.destroy();
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
				e.preventDefault();
				const raw = localStorage.getItem("vc_user");
				if (!raw) return;
				try {
					if (JSON.parse(raw).email?.toLowerCase() === "zodiaxcore@gmail.com") {
						const isOnAdmin = window.location.pathname.startsWith("/admin");
						navigate({ to: isOnAdmin ? "/" : "/admin" });
					}
				} catch {}
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConvexProvider, {
			client: convexClient,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
		})
	});
}
var $$splitComponentImporter$27 = () => import("./routes-izoffSM6.mjs");
var Route$27 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
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
var $$splitComponentImporter$26 = () => import("./about-phPseh9D.mjs");
var Route$26 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$26, "component"),
	head: () => ({ meta: [{ title: "About Us — VintageCvunt" }, {
		name: "description",
		content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather."
	}] })
});
var $$splitComponentImporter$25 = () => import("./account-BJwuxeZy.mjs");
var Route$25 = createFileRoute("/account")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$25, "component"),
	head: () => ({ meta: [{ title: "My Account — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt account dashboard."
	}] })
});
var $$splitComponentImporter$24 = () => import("./admin-CZHEBxNL.mjs");
var Route$24 = createFileRoute("/admin")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: () => ({ meta: [{ title: "Dashboard — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$23 = () => import("./analytics-B6m-n39-.mjs");
var Route$23 = createFileRoute("/analytics")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: () => ({ meta: [{ title: "Analytics — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$22 = () => import("./auth-oVQFhPmI.mjs");
var Route$22 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => ({ meta: [{ title: "Account — VintageCvunt" }, {
		name: "description",
		content: "Sign in or create your VintageCvunt account."
	}] })
});
var $$splitComponentImporter$21 = () => import("./cart-lJRaOgS8.mjs");
var Route$21 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: "Cart — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt shopping cart."
	}] })
});
var $$splitComponentImporter$20 = () => import("./checkout-BYwtJW9w.mjs");
var Route$20 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [{ title: "Checkout — VintageCvunt" }, {
		name: "description",
		content: "Complete your order at VintageCvunt."
	}] })
});
var $$splitComponentImporter$19 = () => import("./collection-BSW1n0_q.mjs");
var Route$19 = createFileRoute("/collection")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Collections — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$18 = () => import("./contact-BX4usoCK.mjs");
var Route$18 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Contact — VintageCvunt" }, {
		name: "description",
		content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence."
	}] })
});
var $$splitComponentImporter$17 = () => import("./content-B4IXXSPA.mjs");
var Route$17 = createFileRoute("/content")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "Content — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$16 = () => import("./coupon-CMth6pli.mjs");
var Route$16 = createFileRoute("/coupon")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "Coupons — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$15 = () => import("./customer-C9nzFtzG.mjs");
var Route$15 = createFileRoute("/customer")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$14 = () => import("./faq-fhc3wn4Z.mjs");
var Route$14 = createFileRoute("/faq")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "FAQ — VintageCvunt" }, {
		name: "description",
		content: "Frequently asked questions about VintageCvunt. Orders, shipping, returns, product care, and sizing information."
	}] })
});
var $$splitComponentImporter$13 = () => import("./message-B1m4ZrzO.mjs");
var Route$13 = createFileRoute("/message")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Messages — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$12 = () => import("./order-DNUIfI2c.mjs");
var Route$12 = createFileRoute("/order")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$11 = () => import("./privacy-policy-DjVeuHYG.mjs");
var Route$11 = createFileRoute("/privacy-policy")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Privacy Policy — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt privacy policy. How we collect, use, and protect your personal data in compliance with GDPR and CCPA."
	}] })
});
var $$splitComponentImporter$10 = () => import("./product-DwUNWoYf.mjs");
var Route$10 = createFileRoute("/product")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Products — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$9 = () => import("./review-DDepaYJX.mjs");
var Route$9 = createFileRoute("/review")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Reviews — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$8 = () => import("./reviews-BZM2yY9e.mjs");
var Route$8 = createFileRoute("/reviews")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "My Reviews — VintageCvunt" }] })
});
var $$splitComponentImporter$7 = () => import("./setting-BapLdRTd.mjs");
var Route$7 = createFileRoute("/setting")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Settings — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$6 = () => import("./settings-Bqossj7S.mjs");
var Route$6 = createFileRoute("/settings")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Account Settings — VintageCvunt" }] })
});
var $$splitComponentImporter$5 = () => import("./shipping-returns-CONrWNJH.mjs");
var Route$5 = createFileRoute("/shipping-returns")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Shipping & Returns — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt shipping and returns policy. Domestic delivery rates, processing times, and return instructions."
	}] })
});
var $$splitComponentImporter$4 = () => import("./shop-DGFsgJ1Z.mjs");
var Route$4 = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Shop — VintageCvunt" }, {
		name: "description",
		content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment."
	}] })
});
var $$splitComponentImporter$3 = () => import("./size-guide-_CuhPytC.mjs");
var Route$3 = createFileRoute("/size-guide")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Size Guide — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt size guide. Find your perfect fit with our measurement charts for jackets, tops, bottoms, footwear, and rings."
	}] })
});
var $$splitComponentImporter$2 = () => import("./terms-conditions-C5TXoQ11.mjs");
var Route$2 = createFileRoute("/terms-conditions")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Terms & Conditions — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt terms and conditions governing the use of our website, products, and services."
	}] })
});
var $$splitComponentImporter$1 = () => import("./orders.index-ByPwXPr3.mjs");
var Route$1 = createFileRoute("/orders/")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "My Orders — VintageCvunt" }, {
		name: "description",
		content: "View your order history at VintageCvunt."
	}] })
});
var $$splitComponentImporter = () => import("./product.new-Cc-kEQR_.mjs");
var Route = createFileRoute("/product/new")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Add Product — VintageCvunt Admin" }] })
});
var IndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$28
});
var AboutRoute = Route$26.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$28
});
var AccountRoute = Route$25.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$28
});
var AdminRoute = Route$24.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$28
});
var AnalyticsRoute = Route$23.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$28
});
var AuthRoute = Route$22.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$28
});
var CartRoute = Route$21.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$28
});
var CheckoutRoute = Route$20.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$28
});
var CollectionRoute = Route$19.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => Route$28
});
var ContactRoute = Route$18.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$28
});
var ContentRoute = Route$17.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => Route$28
});
var CouponRoute = Route$16.update({
	id: "/coupon",
	path: "/coupon",
	getParentRoute: () => Route$28
});
var CustomerRoute = Route$15.update({
	id: "/customer",
	path: "/customer",
	getParentRoute: () => Route$28
});
var FaqRoute = Route$14.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$28
});
var MessageRoute = Route$13.update({
	id: "/message",
	path: "/message",
	getParentRoute: () => Route$28
});
var OrderRoute = Route$12.update({
	id: "/order",
	path: "/order",
	getParentRoute: () => Route$28
});
var OrderConfirmedRoute = Route$29.update({
	id: "/order-confirmed",
	path: "/order-confirmed",
	getParentRoute: () => Route$28
});
var PrivacyPolicyRoute = Route$11.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$28
});
var ProductRoute = Route$10.update({
	id: "/product",
	path: "/product",
	getParentRoute: () => Route$28
});
var ReviewRoute = Route$9.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$28
});
var ReviewsRoute = Route$8.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$28
});
var SettingRoute = Route$7.update({
	id: "/setting",
	path: "/setting",
	getParentRoute: () => Route$28
});
var SettingsRoute = Route$6.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$28
});
var ShippingReturnsRoute = Route$5.update({
	id: "/shipping-returns",
	path: "/shipping-returns",
	getParentRoute: () => Route$28
});
var ShopRoute = Route$4.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$28
});
var SizeGuideRoute = Route$3.update({
	id: "/size-guide",
	path: "/size-guide",
	getParentRoute: () => Route$28
});
var TermsConditionsRoute = Route$2.update({
	id: "/terms-conditions",
	path: "/terms-conditions",
	getParentRoute: () => Route$28
});
var CustomerIdRoute = Route$30.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => CustomerRoute
});
var OrderIdRoute = Route$31.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => OrderRoute
});
var OrdersIndexRoute = Route$1.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$28
});
var OrdersIdRoute = Route$32.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => Route$28
});
var ProductNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => ProductRoute
});
var ProductsSlugRoute = Route$33.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$28
});
var ProductIdEditRoute = Route$34.update({
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
	AccountRoute,
	AdminRoute,
	AnalyticsRoute,
	AuthRoute,
	CartRoute,
	CheckoutRoute,
	CollectionRoute,
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
	ReviewsRoute,
	SettingRoute,
	SettingsRoute,
	ShippingReturnsRoute,
	ShopRoute,
	SizeGuideRoute,
	TermsConditionsRoute,
	OrdersIdRoute,
	ProductsSlugRoute,
	OrdersIndexRoute
};
var routeTree = Route$28._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter, getConvexClient as n, CONVEX_URL as t };
