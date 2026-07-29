import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, DollarSign, Receipt, Calendar, Users, Download } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Id } from "../../convex/_generated/dataModel";
import { generateCustomerProfilePDF } from "@/lib/pdf-utils";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/customer/$id")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: CustomerDetail,
  head: () => ({
    meta: [{ title: "Customer Detail — VintageCvunt Admin" }],
  }),
});



const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

function CustomerDetail() {
  const { id } = Route.useParams();
  const customer = useQuery(api.customers.getById, { id: id as Id<"customers"> });
  const orders = useQuery(api.orders.getByEmail, { email: customer?.email ?? "" });

  if (customer === undefined) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading customer...</h2>
          <p className="text-muted-foreground text-sm">Fetching details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (customer === null) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Customer not found</h2>
          <p className="text-muted-foreground text-sm mb-6">No customer matches the ID "{id}".</p>
          <Link to="/customer" className="btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm">
            Back to Customers
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const initials = customer.name.split(" ").map((n) => n[0]).join("");
  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;
  const lastOrderDate = orders && orders.length > 0
    ? new Date(Math.max(...orders.map((o) => o.createdAt))).toLocaleDateString()
    : "N/A";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/customer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Customers
          </Link>
          <button
            onClick={() => generateCustomerProfilePDF({
              id: customer._id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone || "N/A",
              joined: new Date(customer._creationTime).toLocaleDateString(),
              status: customer.status || "Active",
              totalOrders: customer.totalOrders || 0,
              totalSpent: customer.totalSpent || 0,
              avgOrderValue: (customer.totalSpent || 0) / Math.max(1, customer.totalOrders || 1),
              lastOrderDate: "Recent", // Optional placeholder
              orders: orders?.map(o => ({
                id: o._id,
                date: new Date(o._creationTime).toLocaleDateString(),
                items: o.items.reduce((acc: any, i: any) => acc + i.quantity, 0),
                total: o.total,
                status: o.status
              })) || []
            })}
            className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          >
            <Download className="h-4 w-4" /> Download Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-chrome/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-foreground">{initials}</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
                <p className="text-sm text-muted-foreground">{customer.phone ?? ""}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                    customer.status === "Active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {customer.status}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Orders", value: customer.totalOrders.toString(), icon: ShoppingBag },
                { label: "Total Spent", value: "PKR " + customer.totalSpent.toFixed(2), icon: DollarSign },
                { label: "Avg Order Value", value: "PKR " + avgOrderValue.toFixed(2), icon: Receipt },
                { label: "Last Order", value: lastOrderDate, icon: Calendar },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-chrome/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Order History
                </span>
              </div>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/10">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order ID</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Date</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Items</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Total</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(orders ?? []).map((o) => (
                      <TableRow key={o._id} className="border-chrome/10 hover:bg-chrome/5">
                        <TableCell>
                          <Link
                            to="/order/$id"
                            params={{ id: o._id }}
                            className="font-medium text-foreground hover:text-blue-400 transition-colors"
                          >
                            {o.orderNumber}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{o.items.length}</TableCell>
                        <TableCell className="text-right text-foreground">PKR {o.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[o.status]}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {o.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="md:hidden divide-y divide-chrome/10">
                {(orders ?? []).map((o) => (
                  <div key={o._id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        to="/order/$id"
                        params={{ id: o._id }}
                        className="font-medium text-foreground hover:text-chrome-h transition-colors text-sm"
                      >
                        {o.orderNumber}
                      </Link>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${statusColors[o.status]}`}
                      >
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {o.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                      <span>{o.items.length} items</span>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-foreground font-semibold">PKR {o.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}
