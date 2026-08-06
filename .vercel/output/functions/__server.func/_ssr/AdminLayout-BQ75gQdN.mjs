import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-CocvLYL7.mjs";
import { _ as Link, l as useLocation, u as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { B as LogOut, D as PiggyBank, F as MessageSquare, I as Menu, J as FileText, K as HandCoins, N as Package, Q as Ellipsis, V as LayoutDashboard, W as House, b as Settings, f as Tag, ft as Bell, g as ShoppingBag, i as User, lt as ChartColumn, ot as ChevronLeft, p as Star, r as Users, x as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLayout-BQ75gQdN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_ITEMS = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/order",
		label: "Orders",
		icon: ShoppingBag
	},
	{
		to: "/product",
		label: "Products",
		icon: Package
	},
	{
		to: "/collection",
		label: "Collections",
		icon: FileText
	},
	{
		to: "/customer",
		label: "Customers",
		icon: Users
	},
	{
		to: "/investor",
		label: "Investors",
		icon: HandCoins
	},
	{
		to: "/finance",
		label: "Finance",
		icon: PiggyBank
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/message",
		label: "Messages",
		icon: MessageSquare
	},
	{
		to: "/review",
		label: "Reviews",
		icon: Star
	},
	{
		to: "/coupon",
		label: "Coupons",
		icon: Tag
	},
	{
		to: "/content",
		label: "Content",
		icon: FileText
	},
	{
		to: "/setting",
		label: "Settings",
		icon: Settings
	}
];
function AdminLayout({ children }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuthContext();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const isLoading = useRouterState({ select: (s) => s.isLoading });
	(0, import_react.useEffect)(() => {
		const check = () => {
			const w = window.innerWidth;
			if (w < 768) setCollapsed(false);
			else if (w < 1024) setCollapsed(true);
			else setCollapsed(false);
		};
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);
	const MOBILE_NAV = [
		{
			to: "/admin",
			label: "Dashboard",
			icon: LayoutDashboard
		},
		{
			to: "/order",
			label: "Orders",
			icon: ShoppingBag
		},
		{
			to: "/product",
			label: "Products",
			icon: Package
		},
		{
			to: "/investor",
			label: "Investors",
			icon: HandCoins
		},
		{
			to: "/finance",
			label: "Finance",
			icon: PiggyBank
		},
		{
			to: "/analytics",
			label: "Analytics",
			icon: ChartColumn
		},
		{
			to: "/setting",
			label: "Settings",
			icon: Settings
		},
		{
			to: "",
			label: "Menu",
			icon: Ellipsis,
			action: "sidebar"
		}
	];
	const isActive = (to) => {
		if (to === "/admin") return location.pathname === "/admin";
		return location.pathname.startsWith(to);
	};
	const handleLogout = () => {
		logout();
		navigate({ to: "/auth" });
	};
	const SidebarContent = ({ col }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center gap-3 border-b border-chrome/20 px-4 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 shrink-0 rounded-full bg-chrome" }), !col && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.28em] text-chrome truncate",
					children: "VintageCvunt"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin",
				children: NAV_ITEMS.map((item) => {
					const active = isActive(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setSidebarOpen(false),
						className: `relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group ${active ? "bg-foreground/10 text-foreground" : "text-chrome-dim hover:text-foreground hover:bg-foreground/5"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 18,
								className: "shrink-0"
							}),
							!col && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] uppercase tracking-[0.2em] truncate",
								children: item.label
							}),
							col && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute left-16 rounded-lg bg-graphite-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap z-50 border border-chrome/20",
								children: item.label
							})
						]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-chrome/20 p-3 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleLogout,
					className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-all duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						size: 18,
						className: "shrink-0"
					}), !col && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em]",
						children: "Logout"
					})]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: `hidden md:flex flex-col border-r border-chrome/20 bg-background transition-all duration-300 shrink-0 ${collapsed ? "w-16" : "w-56"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { col: collapsed })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 bg-black/60 md:hidden",
				onClick: () => setSidebarOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.aside, {
					initial: { x: "-100%" },
					animate: { x: 0 },
					exit: { x: "-100%" },
					transition: {
						type: "spring",
						damping: 28,
						stiffness: 250
					},
					className: "absolute left-0 top-0 h-full w-72 border-r border-chrome/20 bg-background shadow-2xl",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { col: false })
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col min-w-0",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed top-0 left-0 right-0 z-50 h-0.5 bg-chrome-h/60 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { x: "-100%" },
							animate: { x: "100%" },
							transition: {
								repeat: Infinity,
								duration: 1,
								ease: "linear"
							},
							className: "h-full w-1/2 bg-chrome-h"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-chrome/20 bg-background backdrop-blur-xl px-3 lg:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSidebarOpen(true),
								className: "md:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-foreground/10 active:bg-foreground/15 transition-colors",
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCollapsed(!collapsed),
								className: "hidden md:flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
									size: 18,
									className: `transition-transform ${collapsed ? "rotate-180" : ""}`
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:flex flex-1 max-w-md relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									size: 14,
									className: "absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Search...",
									className: "w-full rounded-xl border border-chrome/20 bg-graphite py-2 pl-9 pr-4 font-mono text-[12px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/50 transition-colors"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 ml-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "relative flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 pl-2 border-l border-chrome/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-7 w-7 rounded-full bg-chrome/20 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
											size: 14,
											className: "text-chrome-dim"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden lg:block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] leading-tight",
											children: user?.name || "Admin"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[9px] text-chrome-dim",
											children: user?.email || "admin@vintagecvunt.com"
										})]
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 px-3 py-4 lg:p-6 overflow-auto pb-24 md:pb-6",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-chrome/20 bg-background backdrop-blur-xl px-2 py-2 md:hidden",
						children: MOBILE_NAV.map((item) => {
							const active = isActive(item.to);
							const Icon = item.icon;
							if (item.action === "sidebar") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSidebarOpen(true),
								className: "flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors text-chrome-dim hover:text-foreground active:bg-foreground/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] uppercase tracking-[0.15em]",
									children: item.label
								})]
							}, item.label);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: `flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors ${active ? "text-foreground bg-foreground/8" : "text-chrome-dim hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] uppercase tracking-[0.15em]",
									children: item.label
								})]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl hover:scale-105 active:scale-95 transition-all md:hidden",
						"aria-label": "Go to homepage",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 18 })
					})
				]
			})
		]
	});
}
//#endregion
export { AdminLayout as t };
