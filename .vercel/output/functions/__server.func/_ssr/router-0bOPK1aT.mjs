import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation, r as useAction, t as ConvexProvider } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as CurrencyProvider, r as formatPrice, t as CartProvider } from "./currency-context-dbZ1tzKb.mjs";
import { n as getSessionToken, r as isAdminEmail } from "./admin-D4iRQZfC.mjs";
import { t as AuthProvider } from "./auth-context-BqGyC6x_.mjs";
import { _ as Link, c as HeadContent, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as useLocation, m as lazyRouteComponent, p as Outlet, s as Scripts, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { A as Pencil, D as PiggyBank, E as Plus, H as Landmark, K as History, P as PackageCheck, U as IndianRupee, Z as Eye, _t as ArrowRight, a as UserPlus, c as TriangleAlert, d as Trash2, ht as Banknote, k as Percent, l as TrendingUp, n as Wallet, nt as DollarSign, pt as Boxes, q as HandCoins, t as X, tt as Download, u as TrendingDown, ut as Check, v as ShieldCheck, vt as ArrowLeft, w as Receipt, x as Search, y as ShieldAlert } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-CEycyE9k.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { r as getConvexClient } from "./convex-COoNaxwC.mjs";
import { t as Route$35 } from "./customer._id-CIWsUBfg.mjs";
import { t as Route$36 } from "./order-confirmed-BYLIadpY.mjs";
import { t as Route$37 } from "./order._id-CudAlZqb.mjs";
import { t as Route$38 } from "./orders._id-C9gm1MeM.mjs";
import { t as Route$39 } from "./product._id.edit-o-NQEm10.mjs";
import { t as Route$40 } from "./products._slug-DXBKiqu4.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
import { t as Route$41 } from "./shop-YsMaYjYk.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-0bOPK1aT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C4JzMmob.css";
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
var EASE$1 = [
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
			ease: EASE$1,
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
var Route$34 = createRootRouteWithContext()({
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
	const { queryClient } = Route$34.useRouteContext();
	const [convexClient] = (0, import_react.useState)(() => getConvexClient());
	const navigate = useNavigate();
	const location = useLocation();
	const isAdminRoute = /^\/(admin|analytics|collection|content|coupon|customer|message|order|product|review|setting|investor|finance)(\/|$)/.test(location.pathname);
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
					if (isAdminEmail(JSON.parse(raw).email) && getSessionToken()) {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), !isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingInstagram, {})] }) }) })
		})
	});
}
var $$splitComponentImporter$29 = () => import("./routes-DWHL6-pQ.mjs");
var Route$33 = createFileRoute("/")({
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
var $$splitComponentImporter$28 = () => import("./about-CwFXipv2.mjs");
var Route$32 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$28, "component"),
	head: () => ({ meta: [{ title: "About Us — VintageCvunt" }, {
		name: "description",
		content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather."
	}] })
});
var $$splitComponentImporter$27 = () => import("./account-DsptB666.mjs");
var Route$31 = createFileRoute("/account")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	head: () => ({ meta: [{ title: "My Account — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt account dashboard."
	}] })
});
var $$splitComponentImporter$26 = () => import("./admin-BMvXJz1K.mjs");
var Route$30 = createFileRoute("/admin")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$26, "component"),
	head: () => ({ meta: [{ title: "Dashboard — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$25 = () => import("./analytics-DLXqQhY7.mjs");
var Route$29 = createFileRoute("/analytics")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$25, "component"),
	head: () => ({ meta: [{ title: "Analytics — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$24 = () => import("./auth-CIIrxgj4.mjs");
var Route$28 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: () => ({ meta: [{ title: "Account — VintageCvunt" }, {
		name: "description",
		content: "Sign in or create your VintageCvunt account."
	}] })
});
var $$splitComponentImporter$23 = () => import("./cart-EMbf-5JB.mjs");
var Route$27 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: () => ({ meta: [{ title: "Cart — VintageCvunt" }, {
		name: "description",
		content: "Your VintageCvunt shopping cart."
	}] })
});
var $$splitComponentImporter$22 = () => import("./checkout-BlelVHxQ.mjs");
var Route$26 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => ({ meta: [{ title: "Checkout — VintageCvunt" }, {
		name: "description",
		content: "Complete your order at VintageCvunt."
	}] })
});
var $$splitComponentImporter$21 = () => import("./collection-DCla-UfO.mjs");
var Route$25 = createFileRoute("/collection")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: "Collections — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$20 = () => import("./contact--BHuofOB.mjs");
var Route$24 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [{ title: "Contact — VintageCvunt" }, {
		name: "description",
		content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence."
	}] })
});
var $$splitComponentImporter$19 = () => import("./content-C5T8Wl8O.mjs");
var Route$23 = createFileRoute("/content")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Content — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$18 = () => import("./coupon-FK6-JcHR.mjs");
var Route$22 = createFileRoute("/coupon")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Coupons — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$17 = () => import("./customer-BqUEJK8H.mjs");
var Route$21 = createFileRoute("/customer")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$16 = () => import("./faq-Bc7HSNvT.mjs");
var Route$20 = createFileRoute("/faq")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "FAQ — VintageCvunt" }, {
		name: "description",
		content: "Frequently asked questions about VintageCvunt. Orders, shipping, returns, product care, and sizing information."
	}] })
});
var INVESTMENT_MODELS = [
	"Loan",
	"Pure Equity",
	"Profit Share",
	"Batch Revenue Share",
	"Hybrid"
];
var INVESTOR_STATUSES = [
	"Active",
	"Completed",
	"Defaulted",
	"Withdrawn"
];
var RELATIONSHIPS = [
	"Family",
	"Friend",
	"External",
	"Other"
];
var REPAYMENT_FREQUENCIES = [
	"Monthly",
	"Quarterly",
	"One-time at end"
];
var PAYOUT_FREQUENCIES = [
	"Monthly",
	"Quarterly",
	"Per-batch"
];
var EXPENSE_CATEGORIES = [
	"COGS",
	"Fabric",
	"Production",
	"Marketing",
	"Operations",
	"Shipping",
	"Packaging",
	"Other"
];
var ASSET_CATEGORIES = [
	"Cash",
	"Inventory",
	"Equipment",
	"Vehicle",
	"Property",
	"Other"
];
var CAPITAL_METHODS = [
	"Cash",
	"Bank Transfer",
	"Other"
];
var CNIC_REGEX = /^\d{5}-\d{7}-\d$/;
function validateCnic(cnic) {
	return CNIC_REGEX.test(cnic.trim());
}
function maskCnic(cnic) {
	const digits = cnic.replace(/\D/g, "");
	if (digits.length < 4) return "XXXXX-XXXXX-XXXX";
	return "XXXXX-XXXXX-" + digits.slice(-4);
}
function loanModel(principal, interestRatePct, repaymentPeriodMonths, frequency, startTimestamp) {
	const totalRepayment = principal + principal * interestRatePct / 100;
	const periods = frequency === "Monthly" ? Math.max(1, Math.round(repaymentPeriodMonths)) : frequency === "Quarterly" ? Math.max(1, Math.ceil(repaymentPeriodMonths / 3)) : 1;
	const perInstallment = totalRepayment / periods;
	const payoffTimestamp = startTimestamp + periods * (frequency === "Monthly" ? 30 * 864e5 : frequency === "Quarterly" ? 91 * 864e5 : Math.max(1, Math.round(repaymentPeriodMonths)) * 30 * 864e5);
	return {
		totalRepayment,
		perInstallment,
		periods,
		payoffTimestamp,
		payoffDate: new Date(payoffTimestamp).toISOString().split("T")[0]
	};
}
function pureEquityModel(investment, preMoneyValuation) {
	const postMoneyValuation = preMoneyValuation + investment;
	return {
		postMoneyValuation,
		ownershipPercentage: postMoneyValuation > 0 ? investment / postMoneyValuation * 100 : 0
	};
}
function profitShareModel(netProfit, sharePct) {
	return { payout: Math.max(0, netProfit) * (sharePct / 100) };
}
function hybridModel(netProfit, principalRemaining, sharePctAfterRecovery) {
	if (netProfit <= 0) return {
		payout: 0,
		toPrincipal: 0,
		principalRemainingAfter: principalRemaining
	};
	if (principalRemaining <= 0) return {
		payout: netProfit * sharePctAfterRecovery / 100,
		toPrincipal: 0,
		principalRemainingAfter: 0
	};
	const toPrincipal = Math.min(netProfit, principalRemaining);
	return {
		payout: toPrincipal + (netProfit - toPrincipal) * sharePctAfterRecovery / 100,
		toPrincipal,
		principalRemainingAfter: principalRemaining - toPrincipal
	};
}
var Route$19 = createFileRoute("/finance")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: Finance,
	head: () => ({ meta: [{ title: "Finance — VintageCvunt Admin" }] })
});
var TABS = [
	{
		id: "summary",
		label: "Summary",
		icon: Landmark
	},
	{
		id: "expenses",
		label: "Expenses",
		icon: Receipt
	},
	{
		id: "assets",
		label: "Assets",
		icon: Boxes
	},
	{
		id: "capital",
		label: "Capital In",
		icon: IndianRupee
	}
];
var inputCls$2 = "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";
var CATEGORY_COLORS = {
	COGS: "bg-cyan-500/20 text-cyan-400",
	Fabric: "bg-indigo-500/20 text-indigo-400",
	Production: "bg-violet-500/20 text-violet-400",
	Marketing: "bg-pink-500/20 text-pink-400",
	Operations: "bg-amber-500/20 text-amber-400",
	Shipping: "bg-blue-500/20 text-blue-400",
	Packaging: "bg-teal-500/20 text-teal-400",
	Other: "bg-gray-500/20 text-gray-400"
};
function Finance() {
	const sessionToken = getSessionToken() ?? "";
	const [tab, setTab] = (0, import_react.useState)("summary");
	const summary = useQuery(api.finance.summary, { sessionToken });
	const expenses = useQuery(api.expenses.list, { sessionToken }) ?? [];
	const assets = useQuery(api.assets.list, { sessionToken }) ?? [];
	const capital = useQuery(api.capital.list, { sessionToken }) ?? [];
	const investors = useQuery(api.investors.list, { sessionToken }) ?? [];
	const createExpense = useMutation(api.expenses.create);
	const removeExpense = useMutation(api.expenses.remove);
	const createAsset = useMutation(api.assets.create);
	const updateAsset = useMutation(api.assets.update);
	const removeAsset = useMutation(api.assets.remove);
	const createCapital = useMutation(api.capital.create);
	const removeCapital = useMutation(api.capital.remove);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [expForm, setExpForm] = (0, import_react.useState)({
		title: "",
		category: "COGS",
		amount: "",
		date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		note: ""
	});
	const [assetForm, setAssetForm] = (0, import_react.useState)({
		name: "",
		category: "Equipment",
		purchaseDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		purchaseValue: "",
		currentValue: "",
		note: ""
	});
	const [capForm, setCapForm] = (0, import_react.useState)({
		investorId: "",
		amount: "",
		date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		method: "Bank Transfer",
		note: ""
	});
	const [editingAssetId, setEditingAssetId] = (0, import_react.useState)(null);
	const [editValue, setEditValue] = (0, import_react.useState)("");
	const monthlyExpenseTotal = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
		return expenses.filter((e) => {
			const d = new Date(e.expenseDate);
			return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === key;
		}).reduce((s, e) => s + e.amount, 0);
	}, [expenses]);
	const totalPaidCapital = (0, import_react.useMemo)(() => capital.reduce((s, c) => s + c.amountReceived, 0), [capital]);
	async function run(fn) {
		setBusy(true);
		setError("");
		try {
			await fn();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Operation failed.");
		} finally {
			setBusy(false);
		}
	}
	async function handleAddExpense() {
		await run(async () => {
			await createExpense({
				sessionToken,
				title: expForm.title,
				category: expForm.category,
				amount: parseFloat(expForm.amount) || 0,
				expenseDate: new Date(expForm.date).getTime(),
				note: expForm.note.trim() || void 0
			});
			setExpForm({
				...expForm,
				title: "",
				amount: "",
				note: ""
			});
		});
	}
	async function handleAddAsset() {
		await run(async () => {
			const value = parseFloat(assetForm.currentValue) || 0;
			await createAsset({
				sessionToken,
				name: assetForm.name,
				category: assetForm.category,
				purchaseDate: new Date(assetForm.purchaseDate).getTime(),
				purchaseValue: parseFloat(assetForm.purchaseValue) || 0,
				currentValue: value,
				note: assetForm.note.trim() || void 0
			});
			setAssetForm({
				...assetForm,
				name: "",
				purchaseValue: "",
				currentValue: "",
				note: ""
			});
		});
	}
	async function handleAddCapital() {
		await run(async () => {
			if (!capForm.investorId) throw new Error("Select an investor.");
			await createCapital({
				sessionToken,
				investorId: capForm.investorId,
				amountReceived: parseFloat(capForm.amount) || 0,
				receivedDate: new Date(capForm.date).getTime(),
				method: capForm.method,
				note: capForm.note.trim() || void 0
			});
			setCapForm({
				...capForm,
				investorId: "",
				amount: "",
				note: ""
			});
		});
	}
	const statCards = summary ? [
		{
			label: "Total Revenue",
			value: formatPrice(summary.totalRevenue, "PKR"),
			icon: TrendingUp,
			tone: "text-green-400"
		},
		{
			label: "Total Expenses",
			value: formatPrice(summary.totalExpenses, "PKR"),
			icon: TrendingDown,
			tone: "text-red-400"
		},
		{
			label: "Net Profit",
			value: formatPrice(summary.totalNetProfit, "PKR"),
			icon: Wallet,
			tone: summary.totalNetProfit >= 0 ? "text-green-400" : "text-red-400"
		},
		{
			label: "This Month Expenses",
			value: formatPrice(monthlyExpenseTotal, "PKR"),
			icon: Receipt,
			tone: "text-amber-400"
		},
		{
			label: "Capital Received",
			value: formatPrice(summary.totalCapitalReceived, "PKR"),
			icon: IndianRupee,
			tone: "text-blue-400"
		},
		{
			label: "Paid To Investors",
			value: formatPrice(summary.totalPaidToInvestors, "PKR"),
			icon: PiggyBank,
			tone: "text-purple-400"
		},
		{
			label: "Assets Value",
			value: formatPrice(summary.totalAssets, "PKR"),
			icon: Boxes,
			tone: "text-cyan-400"
		},
		{
			label: "Investor Liability",
			value: formatPrice(summary.totalOutstanding, "PKR"),
			icon: Wallet,
			tone: "text-yellow-400"
		}
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold text-foreground",
					children: "Finance"
				}), summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: ["Net Worth ", formatPrice(summary.netWorth, "PKR")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit overflow-x-auto",
				children: TABS.map((t) => {
					const Icon = t.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(t.id),
						className: `flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${tab === t.id ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
							" ",
							t.label
						]
					}, t.id);
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 shrink-0" }),
					" ",
					error
				]
			}),
			tab === "summary" && summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: s.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-lg font-semibold truncate ${s.tone}`,
							children: s.value
						})]
					}, s.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Revenue vs Expenses (by month)"
						}), summary.timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground py-12 text-center",
							children: "No data yet — log expenses or wait for orders."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: summary.timeline,
								barGap: 2,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "#ffffff10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fill: "#8a8a8a",
											fontSize: 10
										},
										tickLine: false,
										axisLine: { stroke: "#ffffff20" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "#8a8a8a",
											fontSize: 10
										},
										tickLine: false,
										axisLine: false,
										width: 55
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "#151515",
											border: "1px solid #333",
											borderRadius: 12,
											fontSize: 12
										},
										formatter: (v) => formatPrice(Number(v) || 0, "PKR")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										name: "Revenue",
										fill: "#22c55e",
										radius: [
											4,
											4,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "expenses",
										name: "Expenses",
										fill: "#ef4444",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Expenses By Category"
						}), Object.entries(summary.expenseByCategory).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground py-12 text-center",
							children: "No expenses logged."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: Object.entries(summary.expenseByCategory).sort(([, a], [, b]) => b - a).map(([cat, amt]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${CATEGORY_COLORS[cat] || "bg-gray-500/20 text-gray-400"}`,
									children: cat
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-foreground font-medium",
									children: formatPrice(amt, "PKR")
								})]
							}, cat))
						})]
					})]
				})]
			}),
			tab === "expenses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Add Expense"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-5 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Title *",
									value: expForm.title,
									onChange: (e) => setExpForm({
										...expForm,
										title: e.target.value
									}),
									className: inputCls$2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: expForm.category,
									onChange: (e) => setExpForm({
										...expForm,
										category: e.target.value
									}),
									className: inputCls$2,
									children: EXPENSE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									placeholder: "Amount (PKR)",
									value: expForm.amount,
									onChange: (e) => setExpForm({
										...expForm,
										amount: e.target.value
									}),
									className: inputCls$2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: expForm.date,
									onChange: (e) => setExpForm({
										...expForm,
										date: e.target.value
									}),
									className: inputCls$2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleAddExpense,
									disabled: busy || !expForm.title.trim() || !parseFloat(expForm.amount),
									className: "btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Note (optional)",
							value: expForm.note,
							onChange: (e) => setExpForm({
								...expForm,
								note: e.target.value
							}),
							className: inputCls$2
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20 hover:bg-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Delete"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: "border-chrome/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								colSpan: 5,
								className: "text-center text-muted-foreground text-sm py-10",
								children: "No expenses yet."
							})
						}) : expenses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "text-sm text-foreground",
									children: [e.title, e.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: e.note
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${CATEGORY_COLORS[e.category] || ""}`,
									children: e.category
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap",
									children: new Date(e.expenseDate).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-red-400 font-medium whitespace-nowrap",
									children: formatPrice(e.amount, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => run(() => removeExpense({
											sessionToken,
											id: e._id
										})),
										className: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors",
										"aria-label": "Delete expense",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-red-400" })
									})
								})
							]
						}, e._id)) })] })
					})
				})]
			}),
			tab === "assets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Add Asset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Asset name *",
								value: assetForm.name,
								onChange: (e) => setAssetForm({
									...assetForm,
									name: e.target.value
								}),
								className: inputCls$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: assetForm.category,
								onChange: (e) => setAssetForm({
									...assetForm,
									category: e.target.value
								}),
								className: inputCls$2,
								children: ASSET_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: assetForm.purchaseDate,
								onChange: (e) => setAssetForm({
									...assetForm,
									purchaseDate: e.target.value
								}),
								className: inputCls$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								placeholder: "Purchase value (PKR)",
								value: assetForm.purchaseValue,
								onChange: (e) => setAssetForm({
									...assetForm,
									purchaseValue: e.target.value
								}),
								className: inputCls$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								placeholder: "Current value (PKR)",
								value: assetForm.currentValue,
								onChange: (e) => setAssetForm({
									...assetForm,
									currentValue: e.target.value
								}),
								className: inputCls$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Note (optional)",
								value: assetForm.note,
								onChange: (e) => setAssetForm({
									...assetForm,
									note: e.target.value
								}),
								className: inputCls$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleAddAsset,
								disabled: busy || !assetForm.name.trim() || !parseFloat(assetForm.currentValue),
								className: "btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20 hover:bg-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Purchased"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Purchase Value"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Current Value"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: assets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: "border-chrome/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								colSpan: 6,
								className: "text-center text-muted-foreground text-sm py-10",
								children: "No assets yet."
							})
						}) : assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "text-sm text-foreground",
									children: [a.name, a.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: a.note
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-chrome/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim",
									children: a.category
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap",
									children: new Date(a.purchaseDate).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden lg:table-cell text-sm text-muted-foreground whitespace-nowrap",
									children: formatPrice(a.purchaseValue, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-cyan-400 font-medium whitespace-nowrap",
									children: editingAssetId === a._id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: editValue,
												onChange: (e) => setEditValue(e.target.value),
												className: "w-28 rounded-lg border border-chrome/30 bg-background px-2 py-1 font-mono text-xs",
												autoFocus: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => run(async () => {
													await updateAsset({
														sessionToken,
														id: a._id,
														currentValue: parseFloat(editValue) || 0
													});
													setEditingAssetId(null);
												}),
												className: "text-green-400 hover:text-green-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditingAssetId(null),
												className: "text-muted-foreground hover:text-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
											})
										]
									}) : formatPrice(a.currentValue, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setEditingAssetId(a._id);
											setEditValue(String(a.currentValue));
										},
										className: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/10 transition-colors",
										"aria-label": "Edit value",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5 text-muted-foreground" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => run(() => removeAsset({
											sessionToken,
											id: a._id
										})),
										className: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors",
										"aria-label": "Delete asset",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-red-400" })
									})]
								})
							]
						}, a._id)) })] })
					})
				})]
			}),
			tab === "capital" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Log Capital Received From Investor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-5 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: capForm.investorId,
									onChange: (e) => setCapForm({
										...capForm,
										investorId: e.target.value
									}),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select investor *"
									}), investors.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: i._id,
										children: [
											i.fullName,
											" — ",
											i.cnicMasked
										]
									}, i._id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									placeholder: "Amount (PKR) *",
									value: capForm.amount,
									onChange: (e) => setCapForm({
										...capForm,
										amount: e.target.value
									}),
									className: inputCls$2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: capForm.date,
									onChange: (e) => setCapForm({
										...capForm,
										date: e.target.value
									}),
									className: inputCls$2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: capForm.method,
									onChange: (e) => setCapForm({
										...capForm,
										method: e.target.value
									}),
									className: inputCls$2,
									children: CAPITAL_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: m,
										children: m
									}, m))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Note (optional)",
									value: capForm.note,
									onChange: (e) => setCapForm({
										...capForm,
										note: e.target.value
									}),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors md:col-span-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleAddCapital,
									disabled: busy || !capForm.investorId || !parseFloat(capForm.amount),
									className: "btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Log Capital"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Total received:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground font-medium",
									children: formatPrice(totalPaidCapital, "PKR")
								}),
								" ",
								"— this tracks the money actually received into the business, separate from each investor's agreed commitment."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20 hover:bg-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Investor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Method"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right font-mono text-[10px] uppercase tracking-[0.2em]",
									children: "Delete"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: capital.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: "border-chrome/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								colSpan: 5,
								className: "text-center text-muted-foreground text-sm py-10",
								children: "No capital received logged yet."
							})
						}) : capital.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "text-sm text-foreground",
									children: [c.investorName, c.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: c.note
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap",
									children: new Date(c.receivedDate).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-muted-foreground",
									children: c.method
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-blue-400 font-medium whitespace-nowrap",
									children: formatPrice(c.amountReceived, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => run(() => removeCapital({
											sessionToken,
											id: c._id
										})),
										className: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors",
										"aria-label": "Delete capital entry",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-red-400" })
									})
								})
							]
						}, c._id)) })] })
					})
				})]
			})
		]
	}) });
}
var $$splitComponentImporter$15 = () => import("./investor-Cy7kP9wj.mjs");
var Route$18 = createFileRoute("/investor")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Investors — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$14 = () => import("./message-dgvoKmvL.mjs");
var Route$17 = createFileRoute("/message")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Messages — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$13 = () => import("./order-Dh9P7KHP.mjs");
var Route$16 = createFileRoute("/order")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$12 = () => import("./privacy-policy-Dd_x1H6T.mjs");
var Route$15 = createFileRoute("/privacy-policy")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Privacy Policy — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt privacy policy. How we collect, use, and protect your personal data in compliance with GDPR and CCPA."
	}] })
});
var $$splitComponentImporter$11 = () => import("./product-BXf0C9Rs.mjs");
var Route$14 = createFileRoute("/product")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Products — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$10 = () => import("./review-DZeJyI9U.mjs");
var Route$13 = createFileRoute("/review")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Reviews — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$9 = () => import("./reviews-DNbpPUPP.mjs");
var Route$12 = createFileRoute("/reviews")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "My Reviews — VintageCvunt" }] })
});
var $$splitComponentImporter$8 = () => import("./setting-CYMryrIm.mjs");
var Route$11 = createFileRoute("/setting")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Settings — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$7 = () => import("./settings-Kn4ZU3Kg.mjs");
var Route$10 = createFileRoute("/settings")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Account Settings — VintageCvunt" }] })
});
var $$splitComponentImporter$6 = () => import("./shipping-returns-CmjxTgoi.mjs");
var Route$9 = createFileRoute("/shipping-returns")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Shipping & Returns — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt shipping and returns policy. Domestic delivery rates, processing times, and return instructions."
	}] })
});
var $$splitComponentImporter$5 = () => import("./size-guide-DgVlB7JN.mjs");
var Route$8 = createFileRoute("/size-guide")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Size Guide — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt size guide. Find your perfect fit with our measurement charts for jackets, tops, bottoms, footwear, and rings."
	}] })
});
var $$splitComponentImporter$4 = () => import("./terms-conditions-CSsEcZ82.mjs");
var Route$7 = createFileRoute("/terms-conditions")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Terms & Conditions — VintageCvunt" }, {
		name: "description",
		content: "VintageCvunt terms and conditions governing the use of our website, products, and services."
	}] })
});
var $$splitComponentImporter$3 = () => import("./customer.index-wpr4kQjC.mjs");
var Route$6 = createFileRoute("/customer/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Customers — VintageCvunt Admin" }] })
});
var Route$5 = createFileRoute("/investor/")({
	component: Investors,
	head: () => ({ meta: [{ title: "Investors — VintageCvunt Admin" }] })
});
var MODEL_COLORS$1 = {
	Loan: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	"Pure Equity": "bg-purple-500/20 text-purple-400 border-purple-500/30",
	"Profit Share": "bg-teal-500/20 text-teal-400 border-teal-500/30",
	"Batch Revenue Share": "bg-orange-500/20 text-orange-400 border-orange-500/30",
	Hybrid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
var STATUS_COLORS$1 = {
	Active: "bg-green-500/20 text-green-400 border-green-500/30",
	Completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
	Defaulted: "bg-red-500/20 text-red-400 border-red-500/30",
	Withdrawn: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};
function Investors() {
	const sessionToken = getSessionToken() ?? "";
	const investors = useQuery(api.investors.list, { sessionToken }) ?? [];
	const [search, setSearch] = (0, import_react.useState)("");
	const [modelFilter, setModelFilter] = (0, import_react.useState)("All");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.toLowerCase();
		return investors.filter((i) => {
			if (q && !i.fullName.toLowerCase().includes(q) && !i.phoneNumber.includes(q) && !i.cnicMasked.toLowerCase().includes(q)) return false;
			if (modelFilter !== "All" && i.investmentModel !== modelFilter) return false;
			if (statusFilter !== "All" && i.status !== statusFilter) return false;
			return true;
		});
	}, [
		investors,
		search,
		modelFilter,
		statusFilter
	]);
	function exportCSV() {
		const headers = [
			"Name",
			"CNIC (masked)",
			"Model",
			"Investment (PKR)",
			"Status",
			"Date Added",
			"Paid To Date",
			"Balance Owed"
		];
		const rows = filtered.map((i) => [
			i.fullName,
			i.cnicMasked,
			i.investmentModel,
			i.investmentAmount.toFixed(2),
			i.status,
			new Date(i.dateAdded).toISOString().split("T")[0],
			i.totalPaidToDate.toFixed(2),
			(i.summary?.remainingBalance ?? i.summary?.remainingPrincipal ?? 0).toFixed(2)
		]);
		const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "investors.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	const totalInvested = investors.reduce((s, i) => s + i.investmentAmount, 0);
	const totalPaid = investors.reduce((s, i) => s + i.totalPaidToDate, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Investors"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: investors.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/investor/new",
					className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Add Investor"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					{
						label: "Total Invested",
						value: formatPrice(totalInvested, "PKR")
					},
					{
						label: "Paid To Date",
						value: formatPrice(totalPaid, "PKR")
					},
					{
						label: "Active Investors",
						value: investors.filter((i) => i.status === "Active").length.toString()
					},
					{
						label: "Capital Still Owed",
						value: formatPrice(totalInvested - totalPaid, "PKR")
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold text-foreground truncate",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search by name, phone, CNIC...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-chrome/40"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: modelFilter,
							onChange: (e) => setModelFilter(e.target.value),
							className: "rounded-xl bg-graphite border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Models"
							}), INVESTMENT_MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: m
							}, m))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							className: "rounded-xl bg-graphite border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Statuses"
							}), INVESTOR_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: exportCSV,
							className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export CSV"]
						})
					]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandCoins, { className: "h-12 w-12 text-muted-foreground mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold text-foreground mb-2",
						children: "No investors found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm mb-6",
						children: "Add your first investor to start tracking shares and returns."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/investor/new",
						className: "btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm",
						children: "Add Investor"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/20 hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Model"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Investment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Date Added"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Paid To Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Balance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "View"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((i) => {
						const balance = i.summary?.remainingBalance ?? i.summary?.remainingPrincipal ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "border-chrome/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm",
											children: i.fullName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-chrome-dim",
											children: i.cnicMasked
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${MODEL_COLORS$1[i.investmentModel] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`,
									children: i.investmentModel
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-foreground whitespace-nowrap",
									children: formatPrice(i.investmentAmount, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${STATUS_COLORS$1[i.status] || ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), i.status]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap",
									children: new Date(i.dateAdded).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "hidden lg:table-cell text-sm text-foreground whitespace-nowrap",
									children: formatPrice(i.totalPaidToDate, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: `text-sm whitespace-nowrap ${balance > 0 ? "text-yellow-400" : "text-muted-foreground"}`,
									children: formatPrice(balance, "PKR")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/investor/$id",
										params: { id: i._id },
										className: "inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/10 transition-colors",
										"aria-label": "View investor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 text-muted-foreground" })
									})
								})
							]
						}, i._id);
					}) })] })
				})
			})
		]
	}) });
}
var Route$4 = createFileRoute("/investor/$id")({
	component: InvestorDetail,
	head: () => ({ meta: [{ title: "Investor Detail — VintageCvunt Admin" }] })
});
var MODEL_COLORS = {
	Loan: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	"Pure Equity": "bg-purple-500/20 text-purple-400 border-purple-500/30",
	"Profit Share": "bg-teal-500/20 text-teal-400 border-teal-500/30",
	"Batch Revenue Share": "bg-orange-500/20 text-orange-400 border-orange-500/30",
	Hybrid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};
var STATUS_COLORS = {
	Active: "bg-green-500/20 text-green-400 border-green-500/30",
	Completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
	Defaulted: "bg-red-500/20 text-red-400 border-red-500/30",
	Withdrawn: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};
var KIND_LABELS = {
	"profit-cycle": "Profit Cycle",
	"loan-repayment": "Loan Repayment",
	distribution: "Distribution",
	"withdrawal-payout": "Withdrawal Settlement",
	"manual-adjustment": "Manual Adjustment"
};
var inputCls$1 = "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";
function InvestorDetail() {
	const { id } = Route$4.useParams();
	const sessionToken = getSessionToken() ?? "";
	const data = useQuery(api.investors.getById, {
		sessionToken,
		id
	});
	const logPayout = useMutation(api.investors.logPayout);
	const withdraw = useMutation(api.investors.withdraw);
	const markSoldOut = useMutation(api.investors.markBatchSoldOut);
	const forceClose = useMutation(api.investors.forceClose);
	const [cycleDate, setCycleDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [grossRevenue, setGrossRevenue] = (0, import_react.useState)("");
	const [costs, setCosts] = (0, import_react.useState)("");
	const [override, setOverride] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("profit-cycle");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [withdrawOpen, setWithdrawOpen] = (0, import_react.useState)(false);
	const [settlement, setSettlement] = (0, import_react.useState)("");
	const [closeOpen, setCloseOpen] = (0, import_react.useState)(false);
	const [closeReason, setCloseReason] = (0, import_react.useState)("");
	const [closeStatus, setCloseStatus] = (0, import_react.useState)("Defaulted");
	const gross = parseFloat(grossRevenue) || 0;
	const cost = parseFloat(costs) || 0;
	const netProfit = gross - cost;
	const overrideAmt = parseFloat(override) || 0;
	const computedPayout = (0, import_react.useMemo)(() => {
		if (!data) return 0;
		const inv = data.investor;
		if (kind === "loan-repayment" || kind === "distribution" || kind === "manual-adjustment") return overrideAmt;
		if (inv.investmentModel === "Profit Share") return profitShareModel(netProfit, inv.profitSharePercentage ?? 0).payout;
		if (inv.investmentModel === "Batch Revenue Share") return profitShareModel(netProfit, inv.batchProfitSharePercentage ?? 0).payout;
		if (inv.investmentModel === "Hybrid") {
			const remaining = Math.max(0, inv.investmentAmount - (inv.principalRecovered || 0));
			return hybridModel(netProfit, remaining, inv.profitSharePercentageAfterPrincipal ?? 0).payout;
		}
		if (inv.investmentModel === "Loan") {
			const loan = loanModel(inv.investmentAmount, inv.interestRate ?? 0, inv.repaymentPeriodMonths ?? 0, inv.repaymentFrequency ?? "Monthly", inv.investmentDate);
			return overrideAmt || loan.perInstallment;
		}
		return overrideAmt;
	}, [
		data,
		kind,
		netProfit,
		overrideAmt
	]);
	if (data === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandCoins, { className: "h-12 w-12 text-muted-foreground mb-4 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Loading investor..."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Fetching details..."
			})
		]
	}) });
	if (data === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandCoins, { className: "h-12 w-12 text-muted-foreground mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Investor not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-sm mb-6",
				children: [
					"No investor matches the ID \"",
					id,
					"\"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/investor",
				className: "btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm",
				children: "Back to Investors"
			})
		]
	}) });
	const inv = data.investor;
	const summary = inv.summary;
	const balance = summary?.remainingBalance ?? summary?.remainingPrincipal ?? 0;
	const isProfitModel = inv.investmentModel === "Profit Share" || inv.investmentModel === "Batch Revenue Share" || inv.investmentModel === "Hybrid";
	async function handleLogPayout() {
		setBusy(true);
		setError("");
		try {
			await logPayout({
				sessionToken,
				investorId: inv._id,
				cycleDate: new Date(cycleDate).getTime(),
				grossRevenue: gross,
				costs: cost,
				kind,
				payoutAmountOverride: [
					"loan-repayment",
					"distribution",
					"manual-adjustment"
				].includes(kind) ? overrideAmt : void 0,
				note: note.trim() || void 0
			});
			setGrossRevenue("");
			setCosts("");
			setOverride("");
			setNote("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to log payout.");
		} finally {
			setBusy(false);
		}
	}
	async function handleWithdraw() {
		setBusy(true);
		setError("");
		try {
			await withdraw({
				sessionToken,
				investorId: inv._id,
				settlementAmount: parseFloat(settlement) || 0,
				note: note.trim() || void 0
			});
			setWithdrawOpen(false);
			setSettlement("");
			setNote("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to withdraw investor.");
		} finally {
			setBusy(false);
		}
	}
	async function handleForceClose() {
		setBusy(true);
		setError("");
		try {
			await forceClose({
				sessionToken,
				investorId: inv._id,
				reason: closeReason,
				status: closeStatus
			});
			setCloseOpen(false);
			setCloseReason("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to close deal.");
		} finally {
			setBusy(false);
		}
	}
	async function handleMarkSoldOut() {
		setBusy(true);
		setError("");
		try {
			await markSoldOut({
				sessionToken,
				investorId: inv._id
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to mark batch sold out.");
		} finally {
			setBusy(false);
		}
	}
	const statCards = [
		{
			label: "Invested",
			value: formatPrice(inv.investmentAmount, "PKR"),
			icon: DollarSign
		},
		{
			label: "Paid To Date",
			value: formatPrice(inv.totalPaidToDate, "PKR"),
			icon: Banknote
		},
		{
			label: inv.investmentModel === "Loan" ? "Balance Owed" : inv.investmentModel === "Hybrid" ? "Principal Remaining" : "Balance",
			value: formatPrice(balance, "PKR"),
			icon: Wallet
		},
		...summary?.equity ? [{
			label: "Ownership",
			value: summary.equity.ownershipPercentage.toFixed(2) + "%",
			icon: Percent
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/investor",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Investors"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						inv.investmentModel === "Batch Revenue Share" && !inv.batchSoldOutAt && inv.status === "Active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleMarkSoldOut,
							disabled: busy,
							className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "h-4 w-4" }), " Mark Batch Sold Out"]
						}),
						inv.status === "Active" && !withdrawOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setWithdrawOpen(true),
							className: "inline-flex items-center gap-2 rounded-xl border border-yellow-500/40 px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 transition-colors",
							children: "Withdraw"
						}),
						inv.status === "Active" && !closeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCloseOpen(true),
							className: "inline-flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" }), " Force Close / Write-off"]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 shrink-0" }),
					" ",
					error
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-16 w-16 rounded-full bg-chrome/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-semibold text-foreground",
									children: inv.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold text-foreground",
										children: inv.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground font-mono",
										children: inv.cnicMasked
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: inv.phoneNumber
									}),
									inv.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground break-all",
										children: inv.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Added ", new Date(inv.dateAdded).toLocaleDateString()]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${MODEL_COLORS[inv.investmentModel] || ""}`,
									children: inv.investmentModel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_COLORS[inv.status] || ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), inv.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left space-y-1.5 text-sm border-t border-chrome/20 pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-chrome-dim",
											children: "Relationship"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: inv.relationshipToOwner
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-chrome-dim",
											children: "Investment Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: new Date(inv.investmentDate).toLocaleDateString()
										})]
									}),
									inv.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-xs border border-chrome/20 rounded-xl bg-background p-2 mt-2",
										children: inv.notes
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-3 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
							children: statCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: s.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-semibold text-foreground truncate",
									children: s.value
								})]
							}, s.label))
						}),
						inv.investmentModel === "Loan" && summary?.loan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Loan Schedule"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-3",
								children: [
									["Interest Rate", (inv.interestRate ?? 0) + "%"],
									["Total Repayment", formatPrice(summary.loan.totalRepayment, "PKR")],
									["Per Installment", formatPrice(summary.loan.perInstallment, "PKR")],
									["Payoff Date", summary.loan.payoffDate]
								].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background border border-chrome/20 rounded-xl p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
										children: k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground mt-1",
										children: v
									})]
								}, k))
							})]
						}),
						inv.investmentModel === "Pure Equity" && summary?.equity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Equity Position"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background border border-chrome/20 rounded-xl p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
											children: "Ownership %"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-lg font-semibold text-foreground mt-1",
											children: [summary.equity.ownershipPercentage.toFixed(2), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background border border-chrome/20 rounded-xl p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
											children: "Post-Money Valuation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold text-foreground mt-1",
											children: formatPrice(summary.equity.postMoneyValuation, "PKR")
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Payout only occurs on a distribution or exit/sale event — no guaranteed schedule."
								})
							]
						}),
						inv.investmentModel === "Hybrid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Principal Recovery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl font-semibold text-foreground",
										children: [
											formatPrice(summary?.recoveredAmount ?? 0, "PKR"),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-muted-foreground",
												children: [
													"/ ",
													formatPrice(inv.investmentAmount, "PKR"),
													" recovered"
												]
											})
										]
									}), summary?.principalRecoveredFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-green-400",
										children: "Principal Recovered"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2.5 w-full rounded-full bg-chrome/10 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-green-500 transition-all duration-300",
										style: { width: `${Math.min(100, summary?.recoveryPct ?? 0)}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										(summary?.recoveryPct ?? 0).toFixed(1),
										"% recovered · After recovery, investor receives ",
										inv.profitSharePercentageAfterPrincipal ?? 0,
										"% of each cycle's profit."
									]
								})
							]
						}),
						inv.investmentModel === "Batch Revenue Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Linked Batch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold text-foreground",
											children: inv.batchNameOrId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400",
											children: [inv.batchProfitSharePercentage ?? 0, "% of batch profit"]
										}),
										inv.batchSoldOutAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-green-400",
											children: ["Batch Sold Out ", new Date(inv.batchSoldOutAt).toLocaleDateString()]
										})
									]
								}),
								inv.expectedBatchDuration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: ["Expected duration: ", inv.expectedBatchDuration]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Deal auto-closes when the batch inventory is fully sold."
								})
							]
						}),
						inv.investmentModel === "Profit Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Profit Share Terms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-teal-400",
										children: [inv.profitSharePercentage ?? 0, "% of net profit"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border border-chrome/20 bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim",
										children: inv.payoutFrequency ?? "Monthly"
									})]
								}),
								inv.profitDefinitionNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-3",
									children: inv.profitDefinitionNotes
								})
							]
						}),
						(isProfitModel || inv.investmentModel === "Loan" || inv.investmentModel === "Pure Equity") && inv.status !== "Withdrawn" && inv.status !== "Defaulted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Log Payout"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 md:grid-cols-4 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
												children: "Kind"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: kind,
												onChange: (e) => setKind(e.target.value),
												className: inputCls$1,
												children: [
													(isProfitModel ? ["profit-cycle"] : []).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: k,
														children: KIND_LABELS[k]
													}, k)),
													inv.investmentModel === "Loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "loan-repayment",
														children: "Loan Repayment"
													}),
													inv.investmentModel === "Pure Equity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "distribution",
														children: "Distribution (Exit Event)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "manual-adjustment",
														children: "Manual Adjustment"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
												children: "Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												value: cycleDate,
												onChange: (e) => setCycleDate(e.target.value),
												className: inputCls$1
											})]
										}),
										isProfitModel && kind === "profit-cycle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
												children: "Gross Revenue (PKR)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												value: grossRevenue,
												onChange: (e) => setGrossRevenue(e.target.value),
												placeholder: "0",
												className: inputCls$1
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
												children: "Costs (PKR)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												value: costs,
												onChange: (e) => setCosts(e.target.value),
												placeholder: "0",
												className: inputCls$1
											})]
										})] }),
										!isProfitModel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
												children: "Amount (PKR)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												value: override,
												onChange: (e) => setOverride(e.target.value),
												placeholder: "0",
												className: inputCls$1
											})]
										}),
										isProfitModel && kind === "profit-cycle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2 md:col-span-4 bg-background border border-chrome/20 rounded-xl p-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
													children: "Auto-Calculated Payout"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xl font-semibold text-foreground",
													children: formatPrice(computedPayout, "PKR")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: ["Net profit this cycle: ", formatPrice(netProfit, "PKR")]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleLogPayout,
												disabled: busy || netProfit < 0,
												className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }),
													" ",
													busy ? "Saving..." : "Log Payout"
												]
											})]
										})
									]
								}),
								(!isProfitModel || kind !== "profit-cycle") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-end gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex-1 min-w-[200px] space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
											children: "Note (optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: note,
											onChange: (e) => setNote(e.target.value),
											placeholder: "e.g. Installment 1 of 12",
											className: inputCls$1
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleLogPayout,
										disabled: busy || (isProfitModel ? false : overrideAmt <= 0),
										className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }),
											" ",
											busy ? "Saving..." : "Log Payout"
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 pb-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Payout History"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: "border-chrome/20 hover:bg-transparent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Kind"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Net Profit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Paid"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Running Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "font-mono text-[10px] uppercase tracking-[0.2em]",
											children: "Balance"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.payouts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
									className: "border-chrome/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										colSpan: 6,
										className: "text-center text-muted-foreground text-sm py-10",
										children: "No payouts logged yet."
									})
								}) : data.payouts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: "border-chrome/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-sm text-foreground whitespace-nowrap",
											children: new Date(p.cycleDate).toLocaleDateString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim",
											children: KIND_LABELS[p.kind] || p.kind
										}), p.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											children: p.note
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap",
											children: formatPrice(p.netProfit, "PKR")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-sm text-green-400 font-medium whitespace-nowrap",
											children: formatPrice(p.payoutAmount, "PKR")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "hidden lg:table-cell text-sm text-foreground whitespace-nowrap",
											children: formatPrice(p.runningTotalPaid, "PKR")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-sm text-muted-foreground whitespace-nowrap",
											children: formatPrice(p.remainingBalanceAfter, "PKR")
										})
									]
								}, p._id)) })] })
							})]
						}),
						data.capital.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Capital Received Into Business"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-3",
								children: data.capital.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background border border-chrome/20 rounded-xl px-4 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: formatPrice(c.amountReceived, "PKR")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim",
										children: [
											new Date(c.receivedDate).toLocaleDateString(),
											" · ",
											c.method
										]
									})]
								}, c._id))
							})]
						}),
						data.audit.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5" }), " Audit Trail"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-56 overflow-y-auto scrollbar-thin",
								children: data.audit.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs border-b border-chrome/10 pb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim",
											children: a.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: a.actorEmail
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-chrome-dim",
											children: new Date(a.createdAt).toLocaleString()
										})
									]
								}, a._id))
							})]
						})
					]
				})]
			}),
			withdrawOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
				onClick: () => setWithdrawOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Withdraw Investor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "The investor is withdrawing before principal is fully recovered. Log any partial payout paid at the time of withdrawal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Final Settlement Paid (PKR)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: settlement,
								onChange: (e) => setSettlement(e.target.value),
								placeholder: "0",
								className: inputCls$1
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Note"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: note,
								onChange: (e) => setNote(e.target.value),
								placeholder: "Reason for withdrawal",
								className: inputCls$1
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setWithdrawOpen(false),
								className: "rounded-xl border border-chrome/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleWithdraw,
								disabled: busy,
								className: "rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400 disabled:opacity-40",
								children: busy ? "Processing..." : "Confirm Withdrawal"
							})]
						})
					]
				})
			}),
			closeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
				onClick: () => setCloseOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Force Close / Write-off"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Admin override for deals that will never complete (e.g. a batch that never sells out). This is recorded in the audit trail."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: closeStatus,
								onChange: (e) => setCloseStatus(e.target.value),
								className: inputCls$1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Defaulted",
									children: "Defaulted (write-off)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Completed",
									children: "Completed"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Reason *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: closeReason,
								onChange: (e) => setCloseReason(e.target.value),
								placeholder: "e.g. Batch did not sell; writing off remaining balance.",
								className: "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors resize-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCloseOpen(false),
								className: "rounded-xl border border-chrome/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleForceClose,
								disabled: busy || closeReason.trim().length < 5,
								className: "rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-40",
								children: busy ? "Processing..." : "Confirm Close"
							})]
						})
					]
				})
			})
		]
	}) });
}
var Route$3 = createFileRoute("/investor/new")({
	component: AddInvestor,
	head: () => ({ meta: [{ title: "Add Investor — VintageCvunt Admin" }] })
});
var STEPS = [
	"Personal Info",
	"Select Model",
	"Investment Terms",
	"Live Preview",
	"Confirm & Save"
];
var MODEL_DESCRIPTIONS = {
	Loan: "Fixed return on principal with interest, repaid on a schedule.",
	"Pure Equity": "Ownership % based on post-money valuation. Payout on distribution or exit.",
	"Profit Share": "No equity — investor receives a % of net profit per cycle.",
	"Batch Revenue Share": "Tied to a specific product batch; closes when batch sells out.",
	Hybrid: "Principal recovered first from profits, then ongoing profit split. Recommended default."
};
var MODEL_ICONS = {
	Loan: "%",
	"Pure Equity": "◈",
	"Profit Share": "₹",
	"Batch Revenue Share": "▣",
	Hybrid: "◉"
};
var EASE = [
	.16,
	1,
	.3,
	1
];
var inputCls = "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";
function formatCnic(raw) {
	const d = raw.replace(/\D/g, "").slice(0, 13);
	if (d.length <= 5) return d;
	if (d.length <= 12) return d.slice(0, 5) + "-" + d.slice(5);
	return d.slice(0, 5) + "-" + d.slice(5, 12) + "-" + d.slice(12);
}
function Field({ label, children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function AddInvestor() {
	const navigate = useNavigate();
	const sessionToken = getSessionToken() ?? "";
	const createInvestor = useAction(api.investors.create);
	const checkCnic = useAction(api.investors.checkCnicDuplicate);
	const [step, setStep] = (0, import_react.useState)(0);
	const [confirmAgreed, setConfirmAgreed] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [dupStatus, setDupStatus] = (0, import_react.useState)(null);
	const dupTimer = (0, import_react.useRef)(null);
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		cnic: "",
		phoneNumber: "",
		email: "",
		relationshipToOwner: "Family",
		investmentAmount: "",
		investmentDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		investmentModel: "Hybrid",
		notes: "",
		interestRate: "",
		repaymentPeriodMonths: "",
		repaymentFrequency: "Monthly",
		preMoneyValuation: "",
		profitSharePercentage: "",
		payoutFrequency: "Monthly",
		profitDefinitionNotes: "",
		batchNameOrId: "",
		batchProfitSharePercentage: "",
		expectedBatchDuration: "",
		profitSharePercentageAfterPrincipal: ""
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const handleCnicChange = (raw) => {
		const formatted = formatCnic(raw);
		set("cnic", formatted);
		setDupStatus(null);
		if (dupTimer.current) clearTimeout(dupTimer.current);
		if (CNIC_REGEX.test(formatted)) dupTimer.current = setTimeout(async () => {
			try {
				const res = await checkCnic({
					sessionToken,
					cnic: formatted
				});
				setDupStatus(res);
			} catch {
				setDupStatus(null);
			}
		}, 400);
	};
	const amount = (0, import_react.useMemo)(() => parseFloat(form.investmentAmount) || 0, [form.investmentAmount]);
	const rate = (0, import_react.useMemo)(() => parseFloat(form.interestRate) || 0, [form.interestRate]);
	const months = (0, import_react.useMemo)(() => parseFloat(form.repaymentPeriodMonths) || 0, [form.repaymentPeriodMonths]);
	const preMoney = (0, import_react.useMemo)(() => parseFloat(form.preMoneyValuation) || 0, [form.preMoneyValuation]);
	const sharePct = (0, import_react.useMemo)(() => parseFloat(form.profitSharePercentage || form.batchProfitSharePercentage || form.profitSharePercentageAfterPrincipal) || 0, [
		form.profitSharePercentage,
		form.batchProfitSharePercentage,
		form.profitSharePercentageAfterPrincipal
	]);
	const investmentTimestamp = (0, import_react.useMemo)(() => {
		const d = new Date(form.investmentDate);
		return isNaN(d.getTime()) ? Date.now() : d.getTime();
	}, [form.investmentDate]);
	const preview = (0, import_react.useMemo)(() => {
		if (form.investmentModel === "Loan") {
			if (!amount || !months) return null;
			return loanModel(amount, rate, months, form.repaymentFrequency, investmentTimestamp);
		}
		if (form.investmentModel === "Pure Equity") {
			if (!amount || !preMoney) return null;
			return pureEquityModel(amount, preMoney);
		}
		return null;
	}, [
		form.investmentModel,
		amount,
		rate,
		months,
		preMoney,
		form.repaymentFrequency,
		investmentTimestamp
	]);
	const step1Valid = form.fullName.trim().length >= 2 && validateCnic(form.cnic) && !dupStatus?.exists && form.phoneNumber.trim().length >= 7;
	const step3Valid = form.investmentAmount.trim() && parseFloat(form.investmentAmount) > 0 ? form.investmentModel === "Loan" ? parseFloat(form.interestRate || "0") >= 0 && parseFloat(form.interestRate || "0") <= 100 && parseFloat(form.repaymentPeriodMonths || "0") > 0 : form.investmentModel === "Pure Equity" ? parseFloat(form.preMoneyValuation || "0") > 0 : form.investmentModel === "Profit Share" ? parseFloat(form.profitSharePercentage || "0") >= 0 && parseFloat(form.profitSharePercentage || "0") <= 100 : form.investmentModel === "Batch Revenue Share" ? !!form.batchNameOrId.trim() && parseFloat(form.batchProfitSharePercentage || "0") >= 0 && parseFloat(form.batchProfitSharePercentage || "0") <= 100 : parseFloat(form.profitSharePercentageAfterPrincipal || "0") >= 0 && parseFloat(form.profitSharePercentageAfterPrincipal || "0") <= 100 : false;
	const canNext = step === 0 ? step1Valid : step === 1 ? !!form.investmentModel : step === 2 ? step3Valid : true;
	async function handleSave() {
		if (!confirmAgreed) return;
		setSaving(true);
		setError("");
		try {
			const res = await createInvestor({
				sessionToken,
				fullName: form.fullName,
				cnic: form.cnic,
				phoneNumber: form.phoneNumber,
				email: form.email.trim() || void 0,
				relationshipToOwner: form.relationshipToOwner,
				investmentAmount: amount,
				investmentDate: investmentTimestamp,
				investmentModel: form.investmentModel,
				notes: form.notes.trim() || void 0,
				interestRate: form.investmentModel === "Loan" ? rate : void 0,
				repaymentPeriodMonths: form.investmentModel === "Loan" ? months : void 0,
				repaymentFrequency: form.investmentModel === "Loan" ? form.repaymentFrequency : void 0,
				preMoneyValuation: form.investmentModel === "Pure Equity" ? preMoney : void 0,
				profitSharePercentage: form.investmentModel === "Profit Share" ? parseFloat(form.profitSharePercentage) || void 0 : void 0,
				payoutFrequency: form.investmentModel === "Profit Share" ? form.payoutFrequency : void 0,
				profitDefinitionNotes: form.investmentModel === "Profit Share" ? form.profitDefinitionNotes.trim() || void 0 : void 0,
				batchNameOrId: form.investmentModel === "Batch Revenue Share" ? form.batchNameOrId.trim() || void 0 : void 0,
				batchProfitSharePercentage: form.investmentModel === "Batch Revenue Share" ? parseFloat(form.batchProfitSharePercentage) || void 0 : void 0,
				expectedBatchDuration: form.investmentModel === "Batch Revenue Share" ? form.expectedBatchDuration.trim() || void 0 : void 0,
				profitSharePercentageAfterPrincipal: form.investmentModel === "Hybrid" ? parseFloat(form.profitSharePercentageAfterPrincipal) || void 0 : void 0
			});
			navigate({
				to: "/investor/$id",
				params: { id: res.investorId }
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save investor. Please try again.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/investor",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Investors"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: [
						"Step ",
						step + 1,
						" / ",
						STEPS.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 overflow-x-auto pb-1",
				children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => i < step && setStep(i),
						className: `flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${i === step ? "bg-foreground text-background border-foreground" : i < step ? "bg-green-500/15 text-green-400 border-green-500/30" : "bg-graphite text-chrome-dim border-chrome/20"}`,
						children: [i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }), label]
					}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-4 bg-chrome/20" })]
				}, label))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
					" ",
					error
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 24
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: -24
					},
					transition: {
						duration: .25,
						ease: EASE
					},
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-foreground",
								children: "Personal Information"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "CNIC is encrypted at rest and never shown in full."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Full Name *",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: form.fullName,
											onChange: (e) => set("fullName", e.target.value),
											placeholder: "e.g. Ahmed Raza",
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
										label: "CNIC * (XXXXX-XXXXXXX-X)",
										hint: "Stored encrypted. Only the last 4 digits are ever displayed.",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												inputMode: "numeric",
												value: form.cnic,
												onChange: (e) => handleCnicChange(e.target.value),
												placeholder: "42101-1234567-1",
												className: inputCls
											}),
											dupStatus?.exists && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-red-400 flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }),
													"CNIC already exists for ",
													dupStatus.name,
													" (",
													dupStatus.masked,
													",",
													" ",
													dupStatus.status,
													"). Duplicates are not allowed."
												]
											}),
											form.cnic && !validateCnic(form.cnic) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-yellow-400",
												children: "Format should be 12345-1234567-1"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone Number *",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: form.phoneNumber,
											onChange: (e) => set("phoneNumber", e.target.value),
											placeholder: "+92 300 1234567",
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email (optional)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: form.email,
											onChange: (e) => set("email", e.target.value),
											placeholder: "investor@email.com",
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Relationship To Owner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: form.relationshipToOwner,
											onChange: (e) => set("relationshipToOwner", e.target.value),
											className: inputCls,
											children: RELATIONSHIPS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: r,
												children: r
											}, r))
										})
									})
								]
							})]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-foreground",
								children: "Select Investment Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "This determines how the investor's share and returns are calculated."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: INVESTMENT_MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => set("investmentModel", m),
									className: `text-left rounded-2xl border p-5 transition-all duration-200 ${form.investmentModel === m ? "border-chrome bg-foreground/10" : "border-chrome/20 bg-graphite hover:border-chrome/50"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex h-9 w-9 items-center justify-center rounded-xl bg-chrome/10 text-lg",
												children: MODEL_ICONS[m]
											}), form.investmentModel === m && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-400" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-foreground text-sm",
											children: m
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: MODEL_DESCRIPTIONS[m]
										})
									]
								}, m))
							})]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-lg font-semibold text-foreground",
								children: [form.investmentModel, " — Terms"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: MODEL_DESCRIPTIONS[form.investmentModel]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Investment Amount * (PKR)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											value: form.investmentAmount,
											onChange: (e) => set("investmentAmount", e.target.value),
											placeholder: "100000",
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Investment Date *",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: form.investmentDate,
											onChange: (e) => set("investmentDate", e.target.value),
											className: inputCls
										})
									}),
									form.investmentModel === "Loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Interest Rate * (%)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "100",
												step: "0.1",
												value: form.interestRate,
												onChange: (e) => set("interestRate", e.target.value),
												placeholder: "e.g. 20",
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Repayment Period * (months)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "1",
												value: form.repaymentPeriodMonths,
												onChange: (e) => set("repaymentPeriodMonths", e.target.value),
												placeholder: "e.g. 12",
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Repayment Frequency",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: form.repaymentFrequency,
												onChange: (e) => set("repaymentFrequency", e.target.value),
												className: inputCls,
												children: REPAYMENT_FREQUENCIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: f,
													children: f
												}, f))
											})
										})
									] }),
									form.investmentModel === "Pure Equity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Pre-Money Valuation * (PKR)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											value: form.preMoneyValuation,
											onChange: (e) => set("preMoneyValuation", e.target.value),
											placeholder: "e.g. 2000000",
											className: inputCls
										})
									}),
									form.investmentModel === "Profit Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Profit Share * (%)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "100",
												step: "0.1",
												value: form.profitSharePercentage,
												onChange: (e) => set("profitSharePercentage", e.target.value),
												placeholder: "e.g. 25",
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Payout Frequency",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: form.payoutFrequency,
												onChange: (e) => set("payoutFrequency", e.target.value),
												className: inputCls,
												children: PAYOUT_FREQUENCIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: f,
													children: f
												}, f))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "md:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Profit Definition (what counts as cost before profit)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													rows: 3,
													value: form.profitDefinitionNotes,
													onChange: (e) => set("profitDefinitionNotes", e.target.value),
													placeholder: "e.g. Net profit = revenue − product cost, ad spend, delivery and packaging.",
													className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors resize-none"
												})
											})
										})
									] }),
									form.investmentModel === "Batch Revenue Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Linked Batch Name / ID *",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: form.batchNameOrId,
												onChange: (e) => set("batchNameOrId", e.target.value),
												placeholder: "e.g. Winter '26 — Chrome Leather",
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Batch Profit Share * (%)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "100",
												step: "0.1",
												value: form.batchProfitSharePercentage,
												onChange: (e) => set("batchProfitSharePercentage", e.target.value),
												placeholder: "e.g. 30",
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Expected Batch Duration (optional)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: form.expectedBatchDuration,
												onChange: (e) => set("expectedBatchDuration", e.target.value),
												placeholder: "e.g. 4 months, or Dec 2026 – Mar 2027",
												className: inputCls
											})
										})
									] }),
									form.investmentModel === "Hybrid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Profit Share After Principal Recovered * (%)",
										hint: "100% of each cycle's profit goes to the investor until their principal is recovered. After that, the split below applies.",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											max: "100",
											step: "0.1",
											value: form.profitSharePercentageAfterPrincipal,
											onChange: (e) => set("profitSharePercentageAfterPrincipal", e.target.value),
											placeholder: "e.g. 30",
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Notes (special terms, optional)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: form.notes,
												onChange: (e) => set("notes", e.target.value),
												placeholder: "Any special terms agreed with the investor...",
												className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors resize-none"
											})
										})
									})
								]
							})]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-foreground",
									children: "Live Preview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Recalculated in real time from the terms entered."
								})] }),
								form.investmentModel === "Loan" && preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										{
											label: "Total Amount Owed",
											value: formatPrice(preview.totalRepayment, "PKR")
										},
										{
											label: "Per Installment",
											value: formatPrice(preview.perInstallment, "PKR")
										},
										{
											label: "Final Payoff Date",
											value: preview.payoffDate
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background border border-chrome/20 rounded-2xl p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: s.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold text-foreground",
											children: s.value
										})]
									}, s.label))
								}) : form.investmentModel === "Pure Equity" && preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [[{
										label: "Ownership %",
										value: preview.ownershipPercentage.toFixed(2) + "%"
									}, {
										label: "Post-Money Valuation",
										value: formatPrice(preview.postMoneyValuation, "PKR")
									}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background border border-chrome/20 rounded-2xl p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: s.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold text-foreground",
											children: s.value
										})]
									}, s.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "sm:col-span-2 text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-4",
										children: "Payout only occurs on a distribution or exit/sale event — there is no guaranteed payout schedule for equity."
									})]
								}) : null,
								form.investmentModel === "Profit Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background border border-chrome/20 rounded-2xl p-4 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: "Investor Share"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xl font-semibold text-foreground",
											children: [sharePct || 0, "% of each cycle's net profit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												"Payout frequency: ",
												form.payoutFrequency,
												". Each cycle you log actual gross revenue and costs — the payout is auto-calculated."
											]
										})
									]
								}),
								form.investmentModel === "Batch Revenue Share" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background border border-chrome/20 rounded-2xl p-4 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: "Linked Batch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-semibold text-foreground",
											children: form.batchNameOrId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [sharePct || 0, "% of that batch's net profit. The deal auto-closes when the batch inventory is fully sold (admin marks it sold out)."]
										})
									]
								}),
								form.investmentModel === "Hybrid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-background border border-chrome/20 rounded-2xl p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: "Principal Recovery Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xl font-semibold text-foreground",
												children: ["0 / ", formatPrice(amount || 0, "PKR")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: "recovered"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2 w-full rounded-full bg-chrome/10 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-0 bg-green-500 transition-all duration-300" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												"100% of each cycle's profit goes to the investor until",
												" ",
												formatPrice(amount || 0, "PKR"),
												" is recovered, then ",
												sharePct || 0,
												"% of each cycle's profit thereafter."
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-t border-chrome/20 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										{
											label: "Investor",
											value: form.fullName || "—"
										},
										{
											label: "Investment",
											value: formatPrice(amount, "PKR")
										},
										{
											label: "Model",
											value: form.investmentModel
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: s.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-foreground truncate",
										children: s.value
									})] }, s.label))
								})
							]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-foreground",
									children: "Confirm & Save"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Review the summary below before saving."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm",
									children: [
										["Name", form.fullName],
										["CNIC (masked)", maskCnic(form.cnic)],
										["Phone", form.phoneNumber],
										["Email", form.email || "—"],
										["Relationship", form.relationshipToOwner],
										["Model", form.investmentModel],
										["Investment", formatPrice(amount, "PKR")],
										["Date", form.investmentDate],
										["Status", "Active"]
									].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-4 border-b border-chrome/10 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
											children: k
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground truncate",
											children: v
										})]
									}, k))
								}),
								form.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-3",
									children: ["Notes: ", form.notes]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 cursor-pointer select-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: confirmAgreed,
										onChange: (e) => setConfirmAgreed(e.target.checked),
										className: "mt-0.5 h-4 w-4 accent-chrome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-foreground",
										children: "I confirm these terms have been agreed with the investor."
									})]
								})
							]
						})
					]
				}, step)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStep((s) => Math.max(0, s - 1)),
					disabled: step === 0,
					className: "inline-flex items-center gap-2 rounded-xl border border-chrome/20 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
				}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStep((s) => s + 1),
					disabled: !canNext,
					className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed",
					children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSave,
					disabled: !confirmAgreed || saving,
					className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed",
					children: saving ? "Saving..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Save Investor"] })
				})]
			})
		]
	}) });
}
var $$splitComponentImporter$2 = () => import("./order.index-CJnTji3X.mjs");
var Route$2 = createFileRoute("/order/")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Orders — VintageCvunt Admin" }] })
});
var $$splitComponentImporter$1 = () => import("./orders.index-DKbJqsZG.mjs");
var Route$1 = createFileRoute("/orders/")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireCustomer()),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "My Orders — VintageCvunt" }, {
		name: "description",
		content: "View your order history at VintageCvunt."
	}] })
});
var $$splitComponentImporter = () => import("./product.new-CRABIPHo.mjs");
var Route = createFileRoute("/product/new")({
	beforeLoad: () => import("./auth-guard-h00FEN7l.mjs").then((m) => m.requireAdmin()),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Add Product — VintageCvunt Admin" }] })
});
var IndexRoute = Route$33.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$34
});
var AboutRoute = Route$32.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$34
});
var AccountRoute = Route$31.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$34
});
var AdminRoute = Route$30.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$34
});
var AnalyticsRoute = Route$29.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$34
});
var AuthRoute = Route$28.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$34
});
var CartRoute = Route$27.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$34
});
var CheckoutRoute = Route$26.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$34
});
var CollectionRoute = Route$25.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => Route$34
});
var ContactRoute = Route$24.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$34
});
var ContentRoute = Route$23.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => Route$34
});
var CouponRoute = Route$22.update({
	id: "/coupon",
	path: "/coupon",
	getParentRoute: () => Route$34
});
var CustomerRoute = Route$21.update({
	id: "/customer",
	path: "/customer",
	getParentRoute: () => Route$34
});
var FaqRoute = Route$20.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$34
});
var FinanceRoute = Route$19.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => Route$34
});
var InvestorRoute = Route$18.update({
	id: "/investor",
	path: "/investor",
	getParentRoute: () => Route$34
});
var MessageRoute = Route$17.update({
	id: "/message",
	path: "/message",
	getParentRoute: () => Route$34
});
var OrderRoute = Route$16.update({
	id: "/order",
	path: "/order",
	getParentRoute: () => Route$34
});
var OrderConfirmedRoute = Route$36.update({
	id: "/order-confirmed",
	path: "/order-confirmed",
	getParentRoute: () => Route$34
});
var PrivacyPolicyRoute = Route$15.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$34
});
var ProductRoute = Route$14.update({
	id: "/product",
	path: "/product",
	getParentRoute: () => Route$34
});
var ReviewRoute = Route$13.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$34
});
var ReviewsRoute = Route$12.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$34
});
var SettingRoute = Route$11.update({
	id: "/setting",
	path: "/setting",
	getParentRoute: () => Route$34
});
var SettingsRoute = Route$10.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$34
});
var ShippingReturnsRoute = Route$9.update({
	id: "/shipping-returns",
	path: "/shipping-returns",
	getParentRoute: () => Route$34
});
var ShopRoute = Route$41.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$34
});
var SizeGuideRoute = Route$8.update({
	id: "/size-guide",
	path: "/size-guide",
	getParentRoute: () => Route$34
});
var TermsConditionsRoute = Route$7.update({
	id: "/terms-conditions",
	path: "/terms-conditions",
	getParentRoute: () => Route$34
});
var CustomerIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => CustomerRoute
});
var CustomerIdRoute = Route$35.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => CustomerRoute
});
var InvestorIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => InvestorRoute
});
var InvestorIdRoute = Route$4.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => InvestorRoute
});
var InvestorNewRoute = Route$3.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => InvestorRoute
});
var OrderIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => OrderRoute
});
var OrderIdRoute = Route$37.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => OrderRoute
});
var OrdersIndexRoute = Route$1.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$34
});
var OrdersIdRoute = Route$38.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => Route$34
});
var ProductNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => ProductRoute
});
var ProductsSlugRoute = Route$40.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$34
});
var ProductIdEditRoute = Route$39.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => ProductRoute
});
var CustomerRouteChildren = {
	CustomerIdRoute,
	CustomerIndexRoute
};
var CustomerRouteWithChildren = CustomerRoute._addFileChildren(CustomerRouteChildren);
var InvestorRouteChildren = {
	InvestorIdRoute,
	InvestorNewRoute,
	InvestorIndexRoute
};
var InvestorRouteWithChildren = InvestorRoute._addFileChildren(InvestorRouteChildren);
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
	FinanceRoute,
	InvestorRoute: InvestorRouteWithChildren,
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
var routeTree = Route$34._addFileChildren(rootRouteChildren)._addFileTypes();
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
