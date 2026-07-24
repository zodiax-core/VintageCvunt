import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Package, Receipt, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { generateReceiptPDF } from "@/lib/pdf-utils";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/order/$id")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: OrderDetail,
  head: () => ({
    meta: [{ title: "Order Detail — VintageCvunt Admin" }],
  }),
});

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

function OrderDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const order = useQuery(api.orders.getById, { id });

  const [status, setStatus] = useState(order?.status ?? "");
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(false);

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [id, order]);

  if (!order) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Order not found</h2>
          <p className="text-muted-foreground text-sm mb-6">No order matches the ID "{id}".</p>
          <Link to="/order" className="btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm">
            Back to Orders
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

  function handleUpdate() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <button
            onClick={() => generateReceiptPDF(order)}
            className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          >
            <Receipt className="h-4 w-4" /> Download Receipt
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{order.orderNumber}</h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[order.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {order.status}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-chrome/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order Items</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-chrome/10">
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">SKU</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Price</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Qty</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i} className="border-chrome/10">
                      <TableCell className="text-foreground font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{item.productId}</TableCell>
                      <TableCell className="text-right text-muted-foreground">PKR {item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.quantity}</TableCell>
                      <TableCell className="text-right text-foreground">PKR {(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-chrome/10 px-5 py-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">PKR {order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">PKR {order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-1 border-t border-chrome/10">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">PKR {(subtotal + order.shipping + order.tax).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Customer</span>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">{order.customerName}</p>
                <p className="text-muted-foreground">{order.customerEmail}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {order.billingAddress.street}, {order.billingAddress.city},{" "}
                  {order.billingAddress.state} {order.billingAddress.zip}
                </p>
              </div>
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</span>
              {showSuccess && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  Status Updated!
                </span>
              )}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl bg-background border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40"
              >
                {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                onClick={handleUpdate}
                className="btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium"
              >
                Update
              </button>
              <button
                onClick={() => setDeleteTarget(true)}
                className="btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium text-red-400 flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteTarget}
        onClose={() => setDeleteTarget(false)}
        onConfirm={() => navigate({ to: "/order" })}
        title="Delete Order"
        message={`Are you sure you want to delete order ${order.orderNumber}?`}
        confirmLabel="Delete"
        variant="danger"
      />

    </AdminLayout>
  );
}
