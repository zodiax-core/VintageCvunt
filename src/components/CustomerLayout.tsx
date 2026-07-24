import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingBag, Star, Settings, LogOut, User } from "lucide-react";
import { useAuthContext } from "@/lib/auth-context";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const NAV_ITEMS = [
  { to: "/account", label: "Dashboard", icon: LayoutDashboard },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/reviews", label: "My Reviews", icon: Star },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const isActive = (to: string) => {
    if (to === "/account") return location.pathname === "/account";
    return location.pathname.startsWith(to);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-28">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
          {/* Top Banner / Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-chrome/20 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full border border-chrome/20 bg-graphite flex items-center justify-center shrink-0">
                <User size={24} className="text-chrome-dim" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl leading-none mb-1">{user?.name || "Patron"}</h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-chrome/20 bg-graphite px-4 py-2 text-chrome-dim hover:text-foreground hover:bg-graphite-2 transition-colors self-start md:self-auto"
            >
              <LogOut size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Sign Out</span>
            </button>
          </div>

          {/* Main Layout Grid */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Left Nav (Desktop) / Horizontal Nav (Mobile) */}
            <aside className="w-full md:w-48 lg:w-56 shrink-0">
              <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 scrollbar-none border-b md:border-none border-chrome/20">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors whitespace-nowrap md:whitespace-normal shrink-0 ${
                        active
                          ? "bg-foreground/5 text-foreground border border-chrome/10"
                          : "text-chrome-dim hover:text-foreground hover:bg-foreground/5 border border-transparent"
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
