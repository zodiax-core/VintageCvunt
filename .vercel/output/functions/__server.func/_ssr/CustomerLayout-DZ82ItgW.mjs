import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuthContext } from "./auth-context-Dc0i5OIR.mjs";
import { _ as useNavigate, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-B7DrmgJy.mjs";
import { A as LogOut, f as ShoppingBag, j as LayoutDashboard, m as Settings, r as User, u as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CustomerLayout-DZ82ItgW.js
var import_jsx_runtime = require_jsx_runtime();
var NAV_ITEMS = [
	{
		to: "/account",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ShoppingBag
	},
	{
		to: "/reviews",
		label: "My Reviews",
		icon: Star
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function CustomerLayout({ children }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuthContext();
	const isActive = (to) => {
		if (to === "/account") return location.pathname === "/account";
		return location.pathname.startsWith(to);
	};
	const handleLogout = () => {
		logout();
		navigate({ to: "/auth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pt-24 md:pt-32 pb-16 md:pb-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-5xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-end justify-between border-b border-chrome/20 pb-6 mb-8 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-full border border-chrome/20 bg-graphite flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 24,
									className: "text-chrome-dim"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl md:text-3xl leading-none mb-1",
								children: user?.name || "Patron"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: user?.email || ""
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex items-center gap-2 rounded-full border border-chrome/20 bg-graphite px-4 py-2 text-chrome-dim hover:text-foreground hover:bg-graphite-2 transition-colors self-start md:self-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Sign Out"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row gap-8 lg:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "w-full md:w-48 lg:w-56 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 scrollbar-none border-b md:border-none border-chrome/20",
								children: NAV_ITEMS.map((item) => {
									const active = isActive(item.to);
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										className: `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors whitespace-nowrap md:whitespace-normal shrink-0 ${active ? "bg-foreground/5 text-foreground border border-chrome/10" : "text-chrome-dim hover:text-foreground hover:bg-foreground/5 border border-transparent"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 16,
											className: "shrink-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] uppercase tracking-[0.2em]",
											children: item.label
										})]
									}, item.to);
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-w-0",
							children
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { CustomerLayout as t };
