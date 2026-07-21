import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, DollarSign, Receipt, Calendar, Users, Download } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateCustomerProfilePDF } from "@/lib/pdf-utils";

export const Route = createFileRoute("/customer/$id")({
  component: CustomerDetail,
  head: () => ({
    meta: [{ title: "Customer Detail — VintageCvunt Admin" }],
  }),
});

const mockCustomers = [
  { id: "CUST-001", name: "Elena Voss", email: "elena@example.com", orders: 8, totalSpent: 3840.0, joined: "2025-06-12", status: "Active" },
  { id: "CUST-002", name: "Marcus Webb", email: "marcus@example.com", orders: 3, totalSpent: 520.0, joined: "2025-08-04", status: "Active" },
  { id: "CUST-003", name: "Clara Hemlock", email: "clara@example.com", orders: 12, totalSpent: 8400.0, joined: "2025-03-19", status: "Active" },
  { id: "CUST-004", name: "Julian Frost", email: "julian@example.com", orders: 1, totalSpent: 175.0, joined: "2026-01-22", status: "Inactive" },
  { id: "CUST-005", name: "Sylvia Kaine", email: "sylvia@example.com", orders: 5, totalSpent: 2100.0, joined: "2025-09-10", status: "Active" },
  { id: "CUST-006", name: "Dorian Ashford", email: "dorian@example.com", orders: 2, totalSpent: 1200.0, joined: "2025-11-05", status: "Inactive" },
  { id: "CUST-007", name: "Priya Nair", email: "priya@example.com", orders: 9, totalSpent: 3650.0, joined: "2025-05-28", status: "Active" },
  { id: "CUST-008", name: "Leo Ventura", email: "leo@example.com", orders: 4, totalSpent: 890.0, joined: "2025-10-14", status: "Active" },
  { id: "CUST-009", name: "Wren Calloway", email: "wren@example.com", orders: 6, totalSpent: 2750.0, joined: "2025-07-01", status: "Active" },
  { id: "CUST-010", name: "Morgan Thorne", email: "morgan@example.com", orders: 7, totalSpent: 4100.0, joined: "2025-04-16", status: "Inactive" },
  { id: "CUST-011", name: "Ivy Castell", email: "ivy@example.com", orders: 11, totalSpent: 6200.0, joined: "2025-02-09", status: "Active" },
  { id: "CUST-012", name: "Ronan Voss", email: "ronan@example.com", orders: 2, totalSpent: 120.0, joined: "2026-01-30", status: "Active" },
];

const claraDetail = {
  id: "CUST-003",
  name: "Clara Hemlock",
  email: "clara@example.com",
  phone: "+1 (555) 234-5678",
  joined: "March 19, 2025",
  status: "Active" as const,
  totalOrders: 12,
  totalSpent: 8400.0,
  avgOrderValue: 700.0,
  lastOrderDate: "March 14, 2026",
  orders: [
    { id: "ORD-1003", date: "2026-03-14", items: 5, total: 620.0, status: "Processing" },
    { id: "ORD-0987", date: "2026-02-28", items: 3, total: 345.0, status: "Delivered" },
    { id: "ORD-0942", date: "2026-01-15", items: 7, total: 1200.0, status: "Delivered" },
    { id: "ORD-0891", date: "2025-12-20", items: 2, total: 180.0, status: "Delivered" },
    { id: "ORD-0823", date: "2025-11-05", items: 4, total: 890.0, status: "Shipped" },
    { id: "ORD-0765", date: "2025-09-12", items: 6, total: 1450.0, status: "Delivered" },
    { id: "ORD-0701", date: "2025-07-30", items: 1, total: 75.0, status: "Cancelled" },
  ],
};

const elenaDetail = {
  id: "CUST-001",
  name: "Elena Voss",
  email: "elena@example.com",
  phone: "+1 (555) 111-2222",
  joined: "June 12, 2025",
  status: "Active" as const,
  totalOrders: 8,
  totalSpent: 3840.0,
  avgOrderValue: 480.0,
  lastOrderDate: "March 15, 2026",
  orders: [
    { id: "ORD-1001", date: "2026-03-15", items: 3, total: 245.0, status: "Delivered" },
    { id: "ORD-0963", date: "2026-02-10", items: 2, total: 180.0, status: "Delivered" },
    { id: "ORD-0912", date: "2026-01-05", items: 4, total: 520.0, status: "Shipped" },
    { id: "ORD-0876", date: "2025-11-22", items: 1, total: 95.0, status: "Delivered" },
    { id: "ORD-0801", date: "2025-09-14", items: 5, total: 780.0, status: "Delivered" },
    { id: "ORD-0734", date: "2025-07-08", items: 3, total: 420.0, status: "Cancelled" },
    { id: "ORD-0655", date: "2025-05-01", items: 6, total: 1100.0, status: "Delivered" },
  ],
};

function generateCustomerDetail(id: string) {
  const c = mockCustomers.find((c) => c.id === id);
  if (!c) return null;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date(c.joined);
  const joinedDisplay = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: "+1 (555) 000-0000",
    joined: joinedDisplay,
    status: c.status as "Active" | "Inactive",
    totalOrders: c.orders,
    totalSpent: c.totalSpent,
    avgOrderValue: c.orders > 0 ? +(c.totalSpent / c.orders).toFixed(2) : 0,
    lastOrderDate: "2026-03-15",
    orders: [
      { id: "ORD-" + (1000 + parseInt(id.slice(-3))), date: "2026-03-15", items: Math.ceil(c.orders / 2), total: +(c.totalSpent * 0.3).toFixed(2), status: "Delivered" },
      { id: "ORD-" + (900 + parseInt(id.slice(-3))), date: "2026-02-01", items: Math.ceil(c.orders / 3), total: +(c.totalSpent * 0.25).toFixed(2), status: "Shipped" },
      { id: "ORD-" + (800 + parseInt(id.slice(-3))), date: "2025-12-15", items: Math.max(1, c.orders - 3), total: +(c.totalSpent * 0.2).toFixed(2), status: "Delivered" },
    ],
  };
}

function getDetail(id: string) {
  if (id === claraDetail.id) return claraDetail;
  if (id === elenaDetail.id) return elenaDetail;
  return generateCustomerDetail(id);
}

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

function CustomerDetail() {
  const { id } = Route.useParams();
  const c = getDetail(id);

  if (!c) {
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

  const initials = c.name.split(" ").map((n) => n[0]).join("");

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
            onClick={() => generateCustomerProfilePDF(c)}
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
                <h2 className="text-lg font-semibold text-foreground">{c.name}</h2>
                <p className="text-sm text-muted-foreground">{c.email}</p>
                <p className="text-sm text-muted-foreground">{c.phone}</p>
                <p className="text-xs text-muted-foreground">Joined {c.joined}</p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                    c.status === "Active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {c.status}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Orders", value: c.totalOrders.toString(), icon: ShoppingBag },
                { label: "Total Spent", value: "$" + c.totalSpent.toFixed(2), icon: DollarSign },
                { label: "Avg Order Value", value: "$" + c.avgOrderValue.toFixed(2), icon: Receipt },
                { label: "Last Order", value: c.lastOrderDate, icon: Calendar },
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
                  {c.orders.map((o) => (
                    <TableRow key={o.id} className="border-chrome/10 hover:bg-chrome/5">
                      <TableCell>
                        <Link
                          to="/order/$id"
                          params={{ id: o.id }}
                          className="font-medium text-foreground hover:text-blue-400 transition-colors"
                        >
                          {o.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{o.date}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{o.items}</TableCell>
                      <TableCell className="text-right text-foreground">${o.total.toFixed(2)}</TableCell>
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
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}
