import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CustomerLayout } from "@/components/CustomerLayout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/orders/$id")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireCustomer()),
  component: OrderDetail,
  head: () => ({
    meta: [
      { title: "Order Detail — VintageCvunt" },
    ],
  }),
});

function statusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    Shipped: "bg-green-500/10 text-green-400 border-green-500/20",
    Processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return <span className={`${base} ${styles[status] || styles.Pending}`}>{status}</span>;
}

const statusTimeline = ["pending", "processing", "shipped", "delivered"];

function OrderDetail() {
  const { id } = Route.useParams();
  const order = useQuery(api.orders.getById, { id: id as any });

  if (!order) {
    return (
      <CustomerLayout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="font-mono text-[11px] text-chrome-dim">Loading order details…</p>
        </div>
      </CustomerLayout>
    );
  }

  const currentStepIndex = statusTimeline.indexOf(order.status);

  return (
    <CustomerLayout>
      <Link to="/orders" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-display">{order.orderNumber}</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        {statusBadge(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
      </div>

      <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Order Timeline</h2>
        <div className="flex items-center gap-1">
          {statusTimeline.map((step, idx) => {
            const completed = currentStepIndex >= idx;
            const isCurrent = currentStepIndex === idx;
            return (
              <div key={step} className="flex-1 flex items-center">
                <div className={`flex items-center gap-2 ${idx > 0 ? "ml-1" : ""}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] border ${
                    completed ? "bg-chrome text-background border-chrome" : "border-chrome/30 text-chrome-dim"
                  } ${isCurrent ? "ring-2 ring-chrome/40" : ""}`}>
                    {completed ? "✓" : idx + 1}
                  </div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.15em] hidden md:inline ${
                    completed ? "text-chrome" : "text-chrome-dim/50"
                  }`}>
                    {step}
                  </span>
                </div>
                {idx < statusTimeline.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${completed ? "bg-chrome/50" : "bg-chrome/10"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3">Shipping Address</h2>
          <div className="font-mono text-[11px] space-y-1 text-chrome-dim">
            <p>{order.customerName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3">Billing Address</h2>
          <div className="font-mono text-[11px] space-y-1 text-chrome-dim">
            <p>{order.customerName}</p>
            <p>{order.billingAddress.street}</p>
            <p>{order.billingAddress.city}, {order.billingAddress.zip}</p>
            <p>{order.billingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-chrome/10">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Order Items</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Item</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Qty</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Price</span></TableHead>
                <TableHead className="text-right"><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Total</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div>
                      <p className="font-mono text-[11px]">{item.name}</p>
                      {item.size && <p className="font-mono text-[9px] text-chrome-dim">Size: {item.size}</p>}
                      {item.color && <p className="font-mono text-[9px] text-chrome-dim">Color: {item.color}</p>}
                    </div>
                  </TableCell>
                  <TableCell><span className="font-mono text-[11px]">{item.quantity}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">PKR {item.price.toLocaleString("en-PK")}</span></TableCell>
                  <TableCell className="text-right"><span className="font-mono text-[11px]">PKR {(item.price * item.quantity).toLocaleString("en-PK")}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-chrome/10 p-4 md:p-6 space-y-2">
          <div className="flex justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Subtotal</span>
            <span className="font-mono text-[11px]">PKR {order.subtotal.toLocaleString("en-PK")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Shipping</span>
            <span className="font-mono text-[11px] text-chrome-dim">{order.shipping === 0 ? "Free" : `PKR ${order.shipping.toLocaleString("en-PK")}`}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-chrome/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome">Total</span>
            <span className="font-mono text-sm text-chrome">PKR {order.total.toLocaleString("en-PK")}</span>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
