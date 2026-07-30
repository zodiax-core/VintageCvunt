import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuthContext } from "@/lib/auth-context";
import { useCurrency } from "@/lib/currency-context";
import { CustomerLayout } from "@/components/CustomerLayout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ShoppingBag, Package, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/account")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireCustomer()),
  component: AccountDashboard,
  head: () => ({
    meta: [
      { title: "My Account — VintageCvunt" },
      { name: "description", content: "Your VintageCvunt account dashboard." },
    ],
  }),
});

function statusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    Shipped: "bg-green-500/10 text-green-400 border-green-500/20",
    Processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return <span className={`${base} ${styles[status] || styles.Pending}`}>{status}</span>;
}

function AccountDashboard() {
  const { user } = useAuthContext();
  const { formatPrice } = useCurrency();
  const orders = useQuery(api.orders.getByEmail, { email: user?.email || "" }) ?? [];
  
  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <CustomerLayout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10">
          <Package size={20} className="text-chrome-dim mb-4" />
          <p className="font-display text-3xl mb-1">{orders.length}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Total Orders</p>
        </div>
        <div className="bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10">
          <Clock size={20} className="text-chrome-dim mb-4" />
          <p className="font-display text-3xl mb-1">{orders.filter((o) => o.status === "pending" || o.status === "processing").length}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Active Orders</p>
        </div>
        <div className="bg-chrome/5 border border-chrome/10 rounded-2xl p-6 transition-colors hover:bg-chrome/10">
          <ShoppingBag size={20} className="text-chrome-dim mb-4" />
          <p className="font-display text-3xl mb-1">{formatPrice(totalSpent)}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Total Spent</p>
        </div>
      </div>

      <div className="bg-graphite border border-chrome/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-chrome/10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em]">Recent Orders</h2>
          {orders.length > 0 && (
            <Link to="/orders" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground transition-colors group">
              View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Link
                key={order._id}
                to="/orders/$id"
                params={{ id: order._id }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-chrome/10 bg-chrome/5 p-4 hover:border-chrome/30 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[12px] group-hover:text-chrome transition-colors">{order.orderNumber}</p>
                  <p className="font-mono text-[10px] text-chrome-dim mt-1">{new Date(order.createdAt).toLocaleDateString("en-PK", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 w-full sm:w-auto">
                  <span className="font-mono text-[12px]">{formatPrice(order.total)}</span>
                  {statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <ShoppingBag size={32} className="mx-auto text-chrome-dim/20 mb-4" />
            <p className="font-mono text-[12px] text-chrome-dim">You haven't placed any orders yet.</p>
            <Link to="/shop" className="mt-6 inline-flex items-center justify-center rounded-full border border-chrome bg-graphite px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground hover:bg-graphite-2 transition-colors">
              Browse Collection
            </Link>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
