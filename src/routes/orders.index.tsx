import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CustomerLayout } from "@/components/CustomerLayout";
import { useAuthContext } from "@/lib/auth-context";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/orders/")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireCustomer()),
  component: OrderHistory,
  head: () => ({
    meta: [
      { title: "My Orders — VintageCvunt" },
      { name: "description", content: "View your order history at VintageCvunt." },
    ],
  }),
});

const statusList = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

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

function OrderHistory() {
  const { user } = useAuthContext();
  const allOrders = useQuery(api.orders.getByEmail, { email: user?.email || "" }) ?? [];
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = allOrders;
    if (statusFilter !== "All") {
      result = result.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((o) => o.orderNumber.toLowerCase().includes(q));
    }
    return result;
  }, [allOrders, statusFilter, search]);

  return (
    <CustomerLayout>
      <div className="mb-8 border-b border-chrome/10 pb-4">
        <h2 className="text-lg font-mono uppercase tracking-[0.2em] text-foreground">Order History</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2">
          {allOrders.length} order{allOrders.length !== 1 ? "s" : ""} placed
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number…"
            className="w-full rounded-xl border border-chrome/10 bg-chrome/5 py-2.5 pl-9 pr-4 font-mono text-[11px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/30 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-chrome/5 border border-chrome/10 rounded-2xl">
          {statusList.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[9px] uppercase tracking-[0.2em] transition-colors ${
                statusFilter === s ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Order</span></TableHead>
                  <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Date</span></TableHead>
                  <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Items</span></TableHead>
                  <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Total</span></TableHead>
                  <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Status</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Link to="/orders/$id" params={{ id: order._id }} className="font-mono text-[11px] text-chrome hover:text-foreground transition-colors">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell><span className="font-mono text-[11px] text-chrome-dim">{new Date(order.createdAt).toLocaleDateString("en-PK")}</span></TableCell>
                    <TableCell><span className="font-mono text-[11px] text-chrome-dim">{order.items.length}</span></TableCell>
                    <TableCell><span className="font-mono text-[11px]">PKR {order.total.toLocaleString("en-PK")}</span></TableCell>
                    <TableCell>{statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-8 text-center">
          <p className="font-mono text-[11px] text-chrome-dim">
            {search || statusFilter !== "All" ? "No orders match your filters." : "No orders placed yet."}
          </p>
          <Link to="/shop" className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors">
            Browse Collection →
          </Link>
        </div>
      )}
    </CustomerLayout>
  );
}
