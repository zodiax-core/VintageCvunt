import { o as __toESM } from "../_runtime.mjs";
import { n as ConvexReactClient, t as ConvexProvider } from "../_libs/convex.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as CartProvider } from "./cart-context-CAiE_2vy.mjs";
import { t as AuthProvider } from "./auth-context-Dc0i5OIR.mjs";
import { _ as Link, c as HeadContent, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as useLocation, m as lazyRouteComponent, p as Outlet, s as Scripts, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
import { t as Route$31 } from "./order-confirmed-CgDP9eyR.mjs";
import { t as Route$32 } from "./customer._id-D6z03m5U.mjs";
import { t as Route$33 } from "./order._id-BX8TXe3C.mjs";
import { t as Route$34 } from "./orders._id-CJ1yFID6.mjs";
import { t as Route$35 } from "./products._slug-B6BRc387.mjs";
import { t as Route$36 } from "./product._id.edit-C2jyEVFI.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D6Iz3b5v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
var convexClient = null;
function getConvexClient() {
	if (!convexClient) convexClient = new ConvexReactClient(CONVEX_URL, { skipConvexDeploymentUrlCheck: typeof window === "undefined" });
	return convexClient;
}
var styles_default = "/assets/styles-D5Xyj46q.css";
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
var insta_icon_default = "/assets/insta-icon-BpNF4abn.png";
var EASE = [
	.16,
	1,
	.3,
	1
];
function FloatingInstagram() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
		href: "https://instagram.com/vintagecvunt",
		target: "_blank",
		rel: "noopener noreferrer",
		initial: {
			scale: 0,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1
		},
		transition: {
			duration: 1.2,
			ease: EASE,
			delay: 1.5
		},
		whileHover: { scale: 1.1 },
		whileTap: { scale: .95 },
		className: "fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-white shadow-lg hover:shadow-xl transition-shadow",
		"aria-label": "Follow us on Instagram",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: insta_icon_default,
			alt: "Instagram",
			className: "h-6 w-6 object-contain"
		})
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
var Route$30 = createRootRouteWithContext()({
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
				href: "/favicon.png",
				type: "image/png"
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
	const { queryClient } = Route$30.useRouteContext();
	const [convexClient] = (0, import_react.useState)(() => getConvexClient());
	const navigate = useNavigate();
	const location = useLocation();
	const isAdminRoute = /^\/(admin|analytics|collection|content|coupon|customer|message|order|product|review|setting)(\/|$)/.test(location.pathname);
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), !isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingInstagram, {})] }) })
		})
	});
}
var $$splitComponentImporter$29 = () => import("./routes-oTVUUPAu.mjs");
var Route$29 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$29, "component"),
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
var $$splitComponentImporter$28 = () => import("./about-BVJdZnxp.mjs");
var Route$28 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$28, "component"),
	head: () => ({ meta: [{ title: "About Us — VintageCvunt" }, {
		name: "description",
		content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather."
	}] })
});
var $$splitComponentImporter$27 = () => import("./account-DXRIkUeF.mjs");
var Route$27 = createFileRoute("/account")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	head: () => ({ meta: [{ title: "My Account — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt account dashboard."
	}] })
});
var $$splitComponentImporter$26 = () => import("./admin-zTdqBZG7.mjs");
var Route$26 = createFileRoute("/admin")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$26, "component"),
	head: () => ({ meta: [{ title: "Dashboard — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$25 = () => import("./analytics-CZxLKgCf.mjs");
var Route$25 = createFileRoute("/analytics")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$25, "component"),
	head: () => ({ meta: [{ title: "Analytics — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$24 = () => import("./auth-CW_1jiTs.mjs");
var Route$24 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: () => ({ meta: [{ title: "Account — VintageCvunt" }, {
		name: "description",
		content: "Sign in or create your VintageCvunt account."
	}] })
});
var $$splitComponentImporter$23 = () => import("./cart-BYm7Ou3I.mjs");
var Route$23 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: () => ({ meta: [{ title: "Cart — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt shopping cart."
	}] })
});
var $$splitComponentImporter$22 = () => import("./checkout-uzrrETk3.mjs");
var Route$22 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => ({ meta: [{ title: "Checkout — VintageCvunt" }, {
		name: "description",
		content: "Complete your order at VintageCvunt."
	}] })
});
var $$splitComponentImporter$21 = () => import("./collection-CYl62TKW.mjs");
var Route$21 = createFileRoute("/collection")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: "Collections — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$20 = () => import("./contact-DiS-vcrR.mjs");
var Route$20 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [{ title: "Contact — VintageCvunt" }, {
		name: "description",
		content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence."
	}] })
});
var $$splitComponentImporter$19 = () => import("./content-Dbh0wBUX.mjs");
var Route$19 = createFileRoute("/content")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Content — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$18 = () => import("./coupon-Bb5ifvoP.mjs");
var Route$18 = createFileRoute("/coupon")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Coupons — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$17 = () => import("./customer-BqUEJK8H.mjs");
var Route$17 = createFileRoute("/customer")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$16 = () => import("./faq-Dp8qhCfl.mjs");
var Route$16 = createFileRoute("/faq")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "FAQ — VintageCvunt" }, {
		name: "description",
		content: "Frequently asked questions about VintageCvunt. Orders, shipping, returns, product care, and sizing information."
	}] })
});
var $$splitComponentImporter$15 = () => import("./message-BXyRixgY.mjs");
var Route$15 = createFileRoute("/message")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Messages — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$14 = () => import("./order-Dh9P7KHP.mjs");
var Route$14 = createFileRoute("/order")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$13 = () => import("./privacy-policy-lwY34tAu.mjs");
var Route$13 = createFileRoute("/privacy-policy")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Privacy Policy — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt privacy policy. How we collect, use, and protect your personal data in compliance with GDPR and CCPA."
	}] })
});
var $$splitComponentImporter$12 = () => import("./product-BVvDyt7f.mjs");
var Route$12 = createFileRoute("/product")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Products — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$11 = () => import("./review-DTqnT1YR.mjs");
var Route$11 = createFileRoute("/review")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Reviews — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$10 = () => import("./reviews-ZQg3m5aH.mjs");
var Route$10 = createFileRoute("/reviews")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "My Reviews — VintageCvunt" }] })
});
var $$splitComponentImporter$9 = () => import("./setting-zTC3s168.mjs");
var Route$9 = createFileRoute("/setting")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Settings — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$8 = () => import("./settings-DIBuJ0Wp.mjs");
var Route$8 = createFileRoute("/settings")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Account Settings — VintageCvunt" }] })
});
var $$splitComponentImporter$7 = () => import("./shipping-returns-D-GkwXQb.mjs");
var Route$7 = createFileRoute("/shipping-returns")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Shipping & Returns — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt shipping and returns policy. Domestic delivery rates, processing times, and return instructions."
	}] })
});
var $$splitComponentImporter$6 = () => import("./shop-tHZV-ga-.mjs");
var Route$6 = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Shop — VintageCvunt" }, {
		name: "description",
		content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment."
	}] })
});
var $$splitComponentImporter$5 = () => import("./size-guide-78klJY-J.mjs");
var Route$5 = createFileRoute("/size-guide")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Size Guide — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt size guide. Find your perfect fit with our measurement charts for jackets, tops, bottoms, footwear, and rings."
	}] })
});
var $$splitComponentImporter$4 = () => import("./terms-conditions-BFDxf-bR.mjs");
var Route$4 = createFileRoute("/terms-conditions")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Terms & Conditions — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt terms and conditions governing the use of our website, products, and services."
	}] })
});
var $$splitComponentImporter$3 = () => import("./customer.index-DdKtUnp_.mjs");
var Route$3 = createFileRoute("/customer/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$2 = () => import("./order.index-DkotzGss.mjs");
var Route$2 = createFileRoute("/order/")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$1 = () => import("./orders.index-CGQr9lrz.mjs");
var Route$1 = createFileRoute("/orders/")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "My Orders — VintageCvunt" }, {
		name: "description",
		content: "View your order history at VintageCvunt."
	}] })
});
var $$splitComponentImporter = () => import("./product.new-DIyzvCWN.mjs");
var Route = createFileRoute("/product/new")({
	beforeLoad: () => import("./auth-guard-DrhmoJF1.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Add Product — VintageCvunt Admin" }] })
});
var IndexRoute = Route$29.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$30
});
var AboutRoute = Route$28.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$30
});
var AccountRoute = Route$27.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$30
});
var AdminRoute = Route$26.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$30
});
var AnalyticsRoute = Route$25.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$30
});
var AuthRoute = Route$24.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$30
});
var CartRoute = Route$23.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$30
});
var CheckoutRoute = Route$22.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$30
});
var CollectionRoute = Route$21.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => Route$30
});
var ContactRoute = Route$20.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$30
});
var ContentRoute = Route$19.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => Route$30
});
var CouponRoute = Route$18.update({
	id: "/coupon",
	path: "/coupon",
	getParentRoute: () => Route$30
});
var CustomerRoute = Route$17.update({
	id: "/customer",
	path: "/customer",
	getParentRoute: () => Route$30
});
var FaqRoute = Route$16.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$30
});
var MessageRoute = Route$15.update({
	id: "/message",
	path: "/message",
	getParentRoute: () => Route$30
});
var OrderRoute = Route$14.update({
	id: "/order",
	path: "/order",
	getParentRoute: () => Route$30
});
var OrderConfirmedRoute = Route$31.update({
	id: "/order-confirmed",
	path: "/order-confirmed",
	getParentRoute: () => Route$30
});
var PrivacyPolicyRoute = Route$13.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$30
});
var ProductRoute = Route$12.update({
	id: "/product",
	path: "/product",
	getParentRoute: () => Route$30
});
var ReviewRoute = Route$11.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$30
});
var ReviewsRoute = Route$10.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$30
});
var SettingRoute = Route$9.update({
	id: "/setting",
	path: "/setting",
	getParentRoute: () => Route$30
});
var SettingsRoute = Route$8.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$30
});
var ShippingReturnsRoute = Route$7.update({
	id: "/shipping-returns",
	path: "/shipping-returns",
	getParentRoute: () => Route$30
});
var ShopRoute = Route$6.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$30
});
var SizeGuideRoute = Route$5.update({
	id: "/size-guide",
	path: "/size-guide",
	getParentRoute: () => Route$30
});
var TermsConditionsRoute = Route$4.update({
	id: "/terms-conditions",
	path: "/terms-conditions",
	getParentRoute: () => Route$30
});
var CustomerIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => CustomerRoute
});
var CustomerIdRoute = Route$32.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => CustomerRoute
});
var OrderIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => OrderRoute
});
var OrderIdRoute = Route$33.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => OrderRoute
});
var OrdersIndexRoute = Route$1.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$30
});
var OrdersIdRoute = Route$34.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => Route$30
});
var ProductNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => ProductRoute
});
var ProductsSlugRoute = Route$35.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$30
});
var ProductIdEditRoute = Route$36.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => ProductRoute
});
var CustomerRouteChildren = {
	CustomerIdRoute,
	CustomerIndexRoute
};
var CustomerRouteWithChildren = CustomerRoute._addFileChildren(CustomerRouteChildren);
var OrderRouteChildren = {
	OrderIdRoute,
	OrderIndexRoute
};
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
var routeTree = Route$30._addFileChildren(rootRouteChildren)._addFileTypes();
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
