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

export const Route = createFileRoute("/coupon")({
  component: Coupons,
  head: () => ({
    meta: [{ title: "Coupons — VintageCvunt Admin" }],
  }),
});

type DiscountType = "percentage" | "fixed" | "free_shipping";
type CouponStatus = "Active" | "Expired" | "Scheduled";

interface Coupon {
  id: number;
  code: string;
  type: DiscountType;
  value: string;
  minOrder: string;
  usage: string;
  expiry: string;
  status: CouponStatus;
}

const initialCoupons: Coupon[] = [
  { id: 1, code: "WELCOME20", type: "percentage", value: "20%", minOrder: "$0", usage: "145/200", expiry: "2026-12-31", status: "Active" },
  { id: 2, code: "SUMMER25", type: "fixed", value: "$25", minOrder: "$100", usage: "78/150", expiry: "2026-09-01", status: "Active" },
  { id: 3, code: "VIP15", type: "percentage", value: "15%", minOrder: "$50", usage: "34/100", expiry: "2026-08-15", status: "Scheduled" },
  { id: 4, code: "FREESHIP", type: "free_shipping", value: "Free", minOrder: "$75", usage: "203/500", expiry: "2026-12-31", status: "Active" },
  { id: 5, code: "FLASH30", type: "percentage", value: "30%", minOrder: "$0", usage: "56/100", expiry: "2026-07-25", status: "Active" },
  { id: 6, code: "BUNDLE10", type: "fixed", value: "$10", minOrder: "$60", usage: "22/50", expiry: "2026-10-01", status: "Scheduled" },
  { id: 7, code: "LOYAL20", type: "percentage", value: "20%", minOrder: "$0", usage: "89/300", expiry: "2026-06-30", status: "Expired" },
  { id: 8, code: "CLEAR50", type: "percentage", value: "50%", minOrder: "$150", usage: "12/50", expiry: "2026-08-20", status: "Active" },
];

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
  const [coupons, setCoupons] = useState(initialCoupons);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyForm);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(coupon: Coupon) {
    setEditing(coupon);
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
    if (editing) {
      setCoupons((prev) => prev.map((c) => (c.id === editing.id ? {
        ...c,
        code: form.code,
        type: form.type,
        value: form.type === "percentage" ? `${form.value}%` : form.type === "fixed" ? `$${form.value}` : "Free",
        minOrder: `$${form.minOrder || "0"}`,
        usage: `${c.usage.split("/")[0]}/${form.usageLimit}`,
        expiry: form.expiry,
        status: form.status,
      } : c)));
    } else {
      setCoupons((prev) => [...prev, {
        id: Math.max(...prev.map((c) => c.id)) + 1,
        code: form.code,
        type: form.type,
        value: form.type === "percentage" ? `${form.value}%` : form.type === "fixed" ? `$${form.value}` : "Free",
        minOrder: `$${form.minOrder || "0"}`,
        usage: `0/${form.usageLimit}`,
        expiry: form.expiry,
        status: form.status,
      }]);
    }
    setOpen(false);
  }

  function handleDelete(id: number) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
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
                  <TableRow key={coupon.id} className="border-chrome/10 hover:bg-chrome/5">
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
                        <button onClick={() => handleDelete(coupon.id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
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
            <div key={coupon.id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
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
                <button onClick={() => handleDelete(coupon.id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
                  <Trash2 className="h-3.5 w-3.5 mr-1 inline" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-background border border-chrome/20">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
              <DialogDescription className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                {editing ? "Update coupon details" : "Create a new discount coupon"}
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
                <span className="btn-label">{editing ? "Update" : "Create"}</span>
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
