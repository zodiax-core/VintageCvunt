import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getSessionToken } from "@/lib/admin";
import { Save, Plus, Globe, Ship, CreditCard, Receipt, Trash2, Pencil } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/setting")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Settings,
  head: () => ({
    meta: [{ title: "Settings — VintageCvunt Admin" }],
  }),
});

type Tab = "general" | "shipping" | "payment" | "tax";
const tabs: { id: Tab; label: string; icon: typeof Globe }[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "shipping", label: "Shipping", icon: Ship },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "tax", label: "Tax", icon: Receipt },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-green-500" : "bg-chrome/20"}`}
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function Settings() {
  const settingsData = useQuery(api.settings.get);
  const upsertSettings = useMutation(api.settings.upsert);
  const shippingRatesData = useQuery(api.shippingRates.list) ?? [];
  const createShippingRate = useMutation(api.shippingRates.create);
  const updateShippingRate = useMutation(api.shippingRates.update);
  const removeShippingRate = useMutation(api.shippingRates.remove);

  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [storeName, setStoreName] = useState("VintageCvunt");
  const [storeEmail, setStoreEmail] = useState("hello@vintagecvunt.com");
  const [currency, setCurrency] = useState("PKR");
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [taxRate, setTaxRate] = useState("0");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [shippingForm, setShippingForm] = useState({ name: "", description: "", price: "", estimatedDays: "" });
  const [editingShippingId, setEditingShippingId] = useState<Id<"shippingRates"> | null>(null);

  useEffect(() => {
    if (settingsData) {
      setStoreName(settingsData.storeName);
      setStoreEmail(settingsData.storeEmail);
      setCurrency(settingsData.currency);
      setTimezone(settingsData.timezone);
      setTaxRate(String(settingsData.defaultTaxRate));
      setTaxInclusive(settingsData.taxInclusive);
    }
  }, [settingsData]);

  const handleSaveGeneral = async () => {
    setSaving(true);
    try {
      await upsertSettings({
        sessionToken: getSessionToken() ?? "",
        storeName,
        storeEmail,
        currency,
        timezone,
        defaultTaxRate: Number(taxRate) || 0,
        taxInclusive,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveShipping = async () => {
    if (!shippingForm.name || !shippingForm.price) return;
    const price = Number(shippingForm.price);
    if (editingShippingId) {
      await updateShippingRate({
        sessionToken: getSessionToken() ?? "",
        id: editingShippingId,
        name: shippingForm.name,
        description: shippingForm.description,
        price,
        estimatedDays: shippingForm.estimatedDays,
        isActive: true,
      });
    } else {
      await createShippingRate({
        sessionToken: getSessionToken() ?? "",
        name: shippingForm.name,
        description: shippingForm.description,
        price,
        estimatedDays: shippingForm.estimatedDays,
        isActive: true,
      });
    }
    setShippingForm({ name: "", description: "", price: "", estimatedDays: "" });
    setEditingShippingId(null);
  };

  const editShipping = (rate: (typeof shippingRatesData)[number]) => {
    setEditingShippingId(rate._id);
    setShippingForm({
      name: rate.name,
      description: rate.description,
      price: String(rate.price),
      estimatedDays: rate.estimatedDays,
    });
  };

  const handleSaveTax = async () => {
    setSaving(true);
    try {
      await upsertSettings({
        sessionToken: getSessionToken() ?? "",
        storeName,
        storeEmail,
        currency,
        timezone,
        defaultTaxRate: Number(taxRate) || 0,
        taxInclusive,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const Icon = tabs.find((t) => t.id === activeTab)!.icon;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-display">Settings</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Manage store configuration</p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  activeTab === tab.id ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
                }`}
              >
                <TabIcon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "general" && (
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Icon size={18} className="text-chrome-dim" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">General Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Store Name</label>
                <input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Store Email</label>
                <input
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                   <option value="PKR">PKR (Rs)</option>
                   <option value="USD">USD ($)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                  <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSaveGeneral}
              disabled={saving}
              className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2"
            >
              <Save size={14} />
              <span className="btn-label">{saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}</span>
            </button>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Ship size={18} className="text-chrome-dim" />
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">Shipping Rates</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                value={shippingForm.name}
                onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                placeholder="Name (e.g. Standard)"
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
              />
              <input
                value={shippingForm.description}
                onChange={(e) => setShippingForm({ ...shippingForm, description: e.target.value })}
                placeholder="Description"
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
              />
              <input
                value={shippingForm.price}
                onChange={(e) => setShippingForm({ ...shippingForm, price: e.target.value })}
                type="number"
                step="0.01"
                placeholder="Price"
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
              />
              <input
                value={shippingForm.estimatedDays}
                onChange={(e) => setShippingForm({ ...shippingForm, estimatedDays: e.target.value })}
                placeholder="Est. days (e.g. 3-5)"
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
              />
            </div>
            <div className="flex items-center gap-2">
              {editingShippingId && (
                <button
                  onClick={() => { setEditingShippingId(null); setShippingForm({ name: "", description: "", price: "", estimatedDays: "" }); }}
                  className="rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSaveShipping}
                disabled={!shippingForm.name || !shippingForm.price}
                className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2"
              >
                <Plus size={14} />
                <span className="btn-label">{editingShippingId ? "Update" : "Add Rate"}</span>
              </button>
            </div>

            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-chrome/10">
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Description</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Price</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Est. Days</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingRatesData.map((rate) => (
                    <TableRow key={rate._id} className="border-chrome/10">
                      <TableCell className="text-foreground">{rate.name}</TableCell>
                      <TableCell className="text-muted-foreground">{rate.description}</TableCell>
                      <TableCell className="text-foreground font-mono">{currency} {rate.price.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground">{rate.estimatedDays}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => editShipping(rate)} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => removeShippingRate({ sessionToken: getSessionToken() ?? "", id: rate._id })} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="md:hidden space-y-3">
              {shippingRatesData.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No shipping rates yet</p>
              ) : (
                shippingRatesData.map((rate) => (
                  <div key={rate._id} className="border border-chrome/10 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{rate.name}</span>
                      <span className="font-mono text-[11px] text-foreground">{currency} {rate.price.toFixed(2)}</span>
                    </div>
                    {rate.description && <p className="text-xs text-muted-foreground">{rate.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{rate.estimatedDays || "—"}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => editShipping(rate)} className="btn-chrome btn-chrome-inner p-1.5 rounded-lg">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removeShippingRate({ sessionToken: getSessionToken() ?? "", id: rate._id })} className="btn-chrome btn-chrome-inner p-1.5 rounded-lg text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard size={18} className="text-chrome-dim" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">Payment Methods</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: "Bank Transfer", enabled: true, desc: "Accepted — upload proof at checkout" },
                { name: "Credit Card", enabled: false, desc: "Coming Soon" },
                { name: "PayPal", enabled: false, desc: "Coming Soon" },
                { name: "Cash on Delivery", enabled: false, desc: "Coming Soon" },
              ].map((method) => (
                <div key={method.name} className={`flex items-center justify-between rounded-xl border ${method.enabled ? "border-green-500/30 bg-green-500/5" : "border-chrome/20 bg-background/50"} px-5 py-4 ${!method.enabled ? "opacity-50" : ""}`}>
                  <div>
                    <p className="font-mono text-[12px] text-foreground">{method.name}</p>
                    <p className="font-mono text-[10px] text-chrome-dim">{method.desc}</p>
                  </div>
                  {method.enabled ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-chrome/20 bg-chrome/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tax" && (
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Receipt size={18} className="text-chrome-dim" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">Tax Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Default Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  step="0.1"
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Tax Inclusive Pricing</label>
                <div className="flex items-center gap-3 rounded-xl border border-chrome/20 bg-background px-4 py-2.5">
                  <Toggle enabled={taxInclusive} onChange={() => setTaxInclusive(!taxInclusive)} />
                  <span className="font-mono text-[11px] text-muted-foreground">{taxInclusive ? "Prices include tax" : "Tax added at checkout"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSaveTax}
              disabled={saving}
              className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2"
            >
              <Save size={14} />
              <span className="btn-label">{saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}</span>
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
