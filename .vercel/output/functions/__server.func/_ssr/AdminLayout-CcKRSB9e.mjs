import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-Dc0i5OIR.mjs";
import { _ as useNavigate, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { D as MessageSquare, E as Package, G as ChartColumn, H as ChevronLeft, M as LayoutDashboard, O as Menu, P as FileText, g as Search, h as Settings, j as LogOut, l as Tag, n as Users, p as ShoppingBag, q as Bell, r as User, u as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLayout-CcKRSB9e.js
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
						damping: 25,
						stiffness: 200
					},
					className: "absolute left-0 top-0 h-full w-64 border-r border-chrome/20 bg-background",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { col: false })
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-chrome/20 bg-background/80 backdrop-blur-xl px-4 lg:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarOpen(true),
							className: "md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 lg:p-6 overflow-auto",
					children
				})]
			})
		]
	});
}
//#endregion
export { AdminLayout as t };
