import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Plus, Pencil, Trash2, Percent, DollarSign, Truck } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/coupon")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Coupons,
  head: () => ({
    meta: [{ title: "Coupons — VintageCvunt Admin" }],
  }),
});

type DiscountType = "percentage" | "fixed" | "free_shipping";
type CouponStatus = "Active" | "Expired" | "Scheduled";



const statusStyles: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Expired: "bg-red-500/20 text-red-400 border-red-500/30",
  Scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const typeIcons: Record<string, typeof Percent> = {
  percentage: Percent,
  fixed: DollarSign,
  free_shipping: Truck,
};

const typeColors: Record<string, string> = {
  percentage: "bg-green-500/20 text-green-400 border-green-500/30",
  fixed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  free_shipping: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const emptyForm = { code: "", type: "percentage" as DiscountType, value: "", minOrder: "", usageLimit: "", expiry: "", status: "Active" as CouponStatus };

function Coupons() {
  const couponsData = useQuery(api.coupons.list) ?? [];
  const createCoupon = useMutation(api.coupons.create);
  const updateCoupon = useMutation(api.coupons.update);
  const removeCoupon = useMutation(api.coupons.remove);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"coupons"> | null>(null);
  const [form, setForm] = useState(emptyForm);

  function displayCoupon(c: (typeof couponsData)[0]) {
    return {
      _id: c._id,
      code: c.code,
      type: c.type as DiscountType,
      value: c.type === "percentage" ? `${c.value}%` : c.type === "fixed" ? `$${c.value}` : "Free",
      minOrder: c.minPurchase ? `$${c.minPurchase}` : "$0",
      usage: `${c.usedCount}/${c.maxUses ?? "∞"}`,
      expiry: new Date(c.expiresAt).toISOString().split("T")[0],
      status: (c.isActive ? "Active" : "Expired") as CouponStatus,
    };
  }

  const coupons = couponsData.map(displayCoupon);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(coupon: ReturnType<typeof displayCoupon>) {
    setEditingId(coupon._id);
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.type === "free_shipping" ? "" : coupon.value.replace(/[$%]/g, ""),
      minOrder: coupon.minOrder.replace("$", ""),
      usageLimit: coupon.usage.split("/")[1],
      expiry: coupon.expiry,
      status: coupon.status,
    });
    setOpen(true);
  }

  function handleSave() {
    if (editingId) {
      updateCoupon({
        id: editingId,
        ...(form.code !== undefined && { code: form.code }),
        ...(form.type !== undefined && { type: form.type }),
        ...(form.type !== "free_shipping" && form.value ? { value: Number(form.value) } : {}),
        ...(form.minOrder ? { minPurchase: Number(form.minOrder) } : {}),
        ...(form.usageLimit ? { maxUses: Number(form.usageLimit) } : {}),
        ...(form.expiry ? { expiresAt: new Date(form.expiry).getTime() } : {}),
        ...{ isActive: form.status === "Active" },
      });
    } else {
      const expiresAt = form.expiry ? new Date(form.expiry).getTime() : Date.now() + 365 * 24 * 60 * 60 * 1000;
      createCoupon({
        code: form.code,
        type: form.type,
        value: form.type !== "free_shipping" ? Number(form.value) : 0,
        usedCount: 0,
        ...(form.minOrder ? { minPurchase: Number(form.minOrder) } : {}),
        ...(form.usageLimit ? { maxUses: Number(form.usageLimit) } : {}),
        expiresAt,
        isActive: form.status === "Active",
      });
    }
    setOpen(false);
  }

  function handleDelete(id: Id<"coupons">) {
    removeCoupon({ id });
  }

  function StatusBadge({ status }: { status: string }) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  }

  function TypeBadge({ type }: { type: DiscountType }) {
    const Icon = typeIcons[type];
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${typeColors[type] || ""}`}>
        <Icon size={10} />
        {type === "percentage" ? "%" : type === "fixed" ? "$" : "Free Shipping"}
      </span>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl font-display">Coupons</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Manage discount codes</p>
          </div>
          <button onClick={openAdd} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
            <Plus size={14} />
            <span className="btn-label">Add Coupon</span>
          </button>
        </div>

        <div className="hidden md:block">
          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/10">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Code</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Type</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Value</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Min Order</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Usage</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Expiry</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon._id} className="border-chrome/10 hover:bg-chrome/5">
                    <TableCell className="font-mono text-[11px] font-medium text-foreground">{coupon.code}</TableCell>
                    <TableCell><TypeBadge type={coupon.type} /></TableCell>
                    <TableCell className="text-foreground">{coupon.value}</TableCell>
                    <TableCell className="text-muted-foreground">{coupon.minOrder}</TableCell>
                    <TableCell className="text-muted-foreground">{coupon.usage}</TableCell>
                    <TableCell className="text-muted-foreground">{coupon.expiry}</TableCell>
                    <TableCell><StatusBadge status={coupon.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(coupon)} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(coupon._id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] font-medium text-foreground">{coupon.code}</span>
                <StatusBadge status={coupon.status} />
              </div>
              <div className="flex items-center gap-2">
                <TypeBadge type={coupon.type} />
                <span className="text-foreground font-mono text-sm">{coupon.value}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Min: {coupon.minOrder}</span>
                <span>Used: {coupon.usage}</span>
              </div>
              <div className="text-sm text-muted-foreground">Expires: {coupon.expiry}</div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => openEdit(coupon)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs">
                  <Pencil className="h-3.5 w-3.5 mr-1 inline" /> Edit
                </button>
                <button onClick={() => handleDelete(coupon._id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
                  <Trash2 className="h-3.5 w-3.5 mr-1 inline" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-background border border-chrome/20">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
              <DialogDescription className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                {editingId ? "Update coupon details" : "Create a new discount coupon"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Code</label>
                <input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SAVE20"
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Discount Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as DiscountType })}
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed ($)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </div>
              {form.type !== "free_shipping" && (
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Value</label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    placeholder={form.type === "percentage" ? "20" : "25"}
                    className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Min Order ($)</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Usage Limit</label>
                <input
                  type="number"
                  value={form.usageLimit}
                  onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                  placeholder="100"
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Expiry Date</label>
                <input
                  type="date"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as CouponStatus })}
                  className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2">
                  <span className="btn-label">Cancel</span>
                </button>
              </DialogClose>
              <button
                onClick={handleSave}
                disabled={!form.code || (!form.value && form.type !== "free_shipping")}
                className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 disabled:opacity-30"
              >
                <span className="btn-label">{editingId ? "Update" : "Create"}</span>
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
