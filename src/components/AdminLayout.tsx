import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Package, Users, BarChart3,
  MessageSquare, Star, Tag, FileText, Settings, LogOut,
  Menu, ChevronLeft, Bell, Search, User
} from "lucide-react";
import { useAuthContext } from "@/lib/auth-context";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/order", label: "Orders", icon: ShoppingBag },
  { to: "/product", label: "Products", icon: Package },
  { to: "/customer", label: "Customers", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/message", label: "Messages", icon: MessageSquare },
  { to: "/review", label: "Reviews", icon: Star },
  { to: "/coupon", label: "Coupons", icon: Tag },
  { to: "/content", label: "Content", icon: FileText },
  { to: "/setting", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) { setCollapsed(false); }
      else if (w < 1024) setCollapsed(true);
      else setCollapsed(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isActive = (to: string) => {
    if (to === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(to);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  const SidebarContent = ({ col }: { col: boolean }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-chrome/20 px-4 shrink-0">
        <div className="h-2 w-2 shrink-0 rounded-full bg-chrome" />
        {!col && <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome truncate">VintageCvunt</span>}
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group ${
                active ? "bg-foreground/10 text-foreground" : "text-chrome-dim hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!col && <span className="font-mono text-[11px] uppercase tracking-[0.2em] truncate">{item.label}</span>}
              {col && (
                <div className="pointer-events-none absolute left-16 rounded-lg bg-graphite-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap z-50 border border-chrome/20">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-chrome/20 p-3 shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
        >
          <LogOut size={18} className="shrink-0" />
          {!col && <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className={`hidden md:flex flex-col border-r border-chrome/20 bg-background transition-all duration-300 shrink-0 ${collapsed ? "w-16" : "w-56"}`}>
        <SidebarContent col={collapsed} />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-64 border-r border-chrome/20 bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent col={false} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-chrome/20 bg-background/80 backdrop-blur-xl px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors">
            <Menu size={18} />
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors">
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
          <div className="hidden sm:flex flex-1 max-w-md relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim" />
            <input placeholder="Search..." className="w-full rounded-xl border border-chrome/20 bg-graphite py-2 pl-9 pr-4 font-mono text-[12px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/50 transition-colors" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-chrome/20">
              <div className="h-7 w-7 rounded-full bg-chrome/20 flex items-center justify-center">
                <User size={14} className="text-chrome-dim" />
              </div>
              <div className="hidden lg:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] leading-tight">{user?.name || "Admin"}</p>
                <p className="font-mono text-[9px] text-chrome-dim">{user?.email || "admin@vintagecvunt.com"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
