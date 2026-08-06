import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Package, Receipt, Trash2, Check, X, Phone, ExternalLink, Maximize2, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { getSessionToken } from "@/lib/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Id } from "../../convex/_generated/dataModel";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { generateReceiptPDF } from "@/lib/pdf-utils";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

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

type QuickAction = {
  label: string;
  nextStatus: string;
  color: string;
  icon: typeof Check;
};

const quickActions: Record<string, QuickAction[]> = {
  Pending: [
    { label: "Confirm", nextStatus: "Processing", color: "text-green-400", icon: Check },
    { label: "Cancel", nextStatus: "Cancelled", color: "text-red-400", icon: X },
  ],
  Processing: [
    { label: "Mark Shipped", nextStatus: "Shipped", color: "text-purple-400", icon: Check },
    { label: "Cancel", nextStatus: "Cancelled", color: "text-red-400", icon: X },
  ],
  Shipped: [
    { label: "Mark Delivered", nextStatus: "Delivered", color: "text-green-400", icon: Check },
  ],
};

function OrderDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const order = useQuery(api.orders.getById, { id: id as Id<"orders"> });
  const settings = useQuery(api.settings.get);
  const allProducts = useQuery(api.products.list) ?? [];
  const updateOrder = useMutation(api.orders.update);
  const removeOrder = useMutation(api.orders.remove);

  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const productMap = useMemo(() => {
    const map = new Map<string, { slug: string; imageUrl?: string }>();
    for (const p of allProducts) {
      map.set(p._id, { slug: p.slug, imageUrl: p.imageUrls?.[0] });
    }
    return map;
  }, [allProducts]);

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [id, order]);

  function flashSuccess(msg: string) {
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  if (order === undefined) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading order...</h2>
          <p className="text-muted-foreground text-sm">Fetching details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (order === null) {
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
  const profit = (order.shipping || 0) + (order.tax || 0) - (order.discount || 0);

  async function handleUpdate() {
    try {
      await updateOrder({ sessionToken: getSessionToken() ?? "", id: order._id as Id<"orders">, status });
      flashSuccess("Status updated!");
    } catch (err) {
      console.error("Failed to update order", err);
    }
  }

  async function handleQuickAction(nextStatus: string) {
    try {
      await updateOrder({ sessionToken: getSessionToken() ?? "", id: order._id as Id<"orders">, status: nextStatus });
      setStatus(nextStatus);
      flashSuccess(`Order ${nextStatus.toLowerCase()}!`);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  }

  async function handleDelete() {
    try {
      await removeOrder({ id: order._id as Id<"orders"> });
      navigate({ to: "/order" });
    } catch (err) {
      console.error("Failed to delete order", err);
    }
    setDeleteTarget(false);
  }

  const actions = quickActions[order.status] || [];

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <button
            onClick={() => generateReceiptPDF({
              ...order,
              id: order._id,
              discount: order.discount ?? 0,
            } as any, settings ? {
              name: settings.storeName,
              tagline: "Objects / Chrome / Bone",
              address: "Karachi, Pakistan",
              phone: "+92 21 1123 4567",
              email: settings.storeEmail,
            } : undefined)}
            className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm w-fit"
          >
            <Receipt className="h-4 w-4" /> Download Receipt
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">{order.orderNumber}</h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[order.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {order.status}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="px-4 md:px-5 py-4 border-b border-chrome/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order Items</span>
              </div>

              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/10">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">SKU</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Variant</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Price</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Qty</TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, i) => {
                      const product = productMap.get(item.productId);
                      const imgSrc = item.image || product?.imageUrl;
                      return (
                        <TableRow key={i} className="border-chrome/10">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {imgSrc ? (
                                <Link to={product ? `/products/${product.slug}` : "#"} className="shrink-0">
                                  <img src={imgSrc} alt={item.name} className="h-10 w-10 rounded-lg object-cover border border-chrome/20" />
                                </Link>
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-chrome/10 flex items-center justify-center font-mono text-sm text-chrome-dim shrink-0">
                                  {item.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                {product ? (
                                  <Link to={`/products/${product.slug}`} className="text-foreground font-medium hover:text-chrome-h transition-colors flex items-center gap-1">
                                    {item.name} <ExternalLink className="h-3 w-3" />
                                  </Link>
                                ) : (
                                  <span className="text-foreground font-medium">{item.name}</span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{item.productId.slice(0, 8)}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {item.size || item.color ? (
                              <span>{[item.size, item.color].filter(Boolean).join(" / ")}</span>
                            ) : (
                              <span className="text-chrome-dim/40">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">PKR {item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{item.quantity}</TableCell>
                          <TableCell className="text-right text-foreground">PKR {(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden divide-y divide-chrome/10">
                {order.items.map((item, i) => {
                  const product = productMap.get(item.productId);
                  const imgSrc = item.image || product?.imageUrl;
                  return (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {imgSrc ? (
                          <Link to={product ? `/products/${product.slug}` : "#"} className="shrink-0">
                            <img src={imgSrc} alt={item.name} className="h-12 w-12 rounded-lg object-cover border border-chrome/20" />
                          </Link>
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-chrome/10 flex items-center justify-center font-mono text-sm text-chrome-dim shrink-0">
                            {item.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          {product ? (
                            <Link to={`/products/${product.slug}`} className="text-foreground font-medium text-sm hover:text-chrome-h transition-colors flex items-center gap-1">
                              {item.name} <ExternalLink className="h-3 w-3 shrink-0" />
                            </Link>
                          ) : (
                            <p className="text-foreground font-medium text-sm">{item.name}</p>
                          )}
                          <p className="font-mono text-[10px] text-chrome-dim">SKU: {item.productId.slice(0, 8)}</p>
                          {(item.size || item.color) && (
                            <p className="font-mono text-[10px] text-chrome-dim mt-0.5">
                              {[item.size, item.color].filter(Boolean).join(" / ")}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-foreground font-semibold">PKR {(item.price * item.quantity).toFixed(2)}</p>
                          <p className="font-mono text-[10px] text-chrome-dim">{item.quantity} x PKR {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-chrome/10 px-4 md:px-5 py-4 space-y-1.5">
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
                {order.discount ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
                    <span className="text-green-400">-PKR {order.discount.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-base font-semibold pt-1 border-t border-chrome/10">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">PKR {(subtotal + order.shipping + order.tax - (order.discount || 0)).toFixed(2)}</span>
                </div>
                {order.status === "Delivered" ? (
                  <div className="flex justify-between text-sm pt-1 border-t border-chrome/10">
                    <span className="text-green-400 font-semibold">Profit</span>
                    <span className="text-green-400 font-semibold">PKR {profit.toFixed(2)}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-5 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Customer</span>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">{order.customerName}</p>
                <p className="text-muted-foreground">{order.customerEmail}</p>
                {order.phone ? (
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{order.phone}</p>
                    <a
                      href={`tel:${order.phone}`}
                      className="btn-chrome btn-chrome-inner inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                    >
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  </div>
                ) : null}
              </div>
              <div className="border-t border-chrome/10 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Billing Address</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {order.billingAddress.street}, {order.billingAddress.city},{" "}
                  {order.billingAddress.state} {order.billingAddress.zip}<br />
                  {order.billingAddress.country}
                </p>
              </div>
              <div className="border-t border-chrome/10 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Shipping Address</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
              {order.paymentMethod ? (
                <div className="border-t border-chrome/10 pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Payment</p>
                  <p className="text-foreground text-sm mt-1">{order.paymentMethod}</p>
                  {order.screenshot && (
                    <button onClick={() => setLightboxImg(order.screenshot)} className="mt-2 w-full group relative">
                      <img
                        src={order.screenshot}
                        alt="Payment proof"
                        className="max-h-32 w-full rounded-xl object-contain border border-chrome/20 bg-background transition-opacity group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="btn-chrome btn-chrome-inner inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                          <Maximize2 className="h-3 w-3" /> View Full
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              ) : null}
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</span>
                {showSuccess && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {successMsg}
                  </span>
                )}
              </div>

              {actions.length > 0 && (
                <div className="flex gap-2">
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.nextStatus}
                        onClick={() => handleQuickAction(action.nextStatus)}
                        className={`btn-chrome btn-chrome-inner flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${action.color}`}
                      >
                        <Icon className="h-4 w-4" /> {action.label}
                      </button>
                    );
                  })}
                </div>
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
                Update Status
              </button>

              {order.notes ? (
                <div className="border-t border-chrome/10 pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Notes</p>
                  <p className="text-xs text-muted-foreground">{order.notes}</p>
                </div>
              ) : null}

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

      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <XCircle className="h-8 w-8" />
          </button>
          <img
            src={lightboxImg}
            alt="Payment proof full view"
            className="max-h-full max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget}
        onClose={() => setDeleteTarget(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order ${order.orderNumber}?`}
        confirmLabel="Delete"
        variant="danger"
      />

    </AdminLayout>
  );
}
