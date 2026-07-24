import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Save, Plus, Globe, Ship, CreditCard, Receipt } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

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

const shippingRates = [
  { zone: "Domestic", method: "Standard", rate: "$8.00", freeAbove: "$100" },
  { zone: "Domestic", method: "Express", rate: "$22.00", freeAbove: "$200" },
  { zone: "International", method: "Standard", rate: "$25.00", freeAbove: "$500" },
  { zone: "International", method: "Express", rate: "$55.00", freeAbove: "$500" },
];

const paymentMethods = [
  { name: "Credit Card", enabled: true },
  { name: "PayPal", enabled: true },
  { name: "Bank Transfer", enabled: false },
];

const taxRules = [
  { country: "United States", rate: "8.5%", appliesTo: "All products" },
  { country: "European Union", rate: "20.0%", appliesTo: "Digital goods" },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-green-500" : "bg-chrome/20"}`}
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [storeName, setStoreName] = useState("VintageCvunt");
  const [storeEmail, setStoreEmail] = useState("hello@vintagecvunt.com");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("America/New_York");
  const [taxRate, setTaxRate] = useState("8.5");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [payments, setPayments] = useState(paymentMethods);

  function togglePayment(name: string) {
    setPayments((prev) => prev.map((p) => (p.name === name ? { ...p, enabled: !p.enabled } : p)));
  }

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
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                  <option value="English">English</option>
                  <option value="Italian">Italian</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
                >
                  <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                </select>
              </div>
            </div>
            <button className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
              <Save size={14} />
              <span className="btn-label">Save Changes</span>
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
              <button className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
                <Plus size={14} />
                <span className="btn-label">Add Rate</span>
              </button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/10">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Zone</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Method</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rate</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Free Above</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingRates.map((rate, i) => (
                  <TableRow key={i} className="border-chrome/10">
                    <TableCell className="text-foreground">{rate.zone}</TableCell>
                    <TableCell className="text-muted-foreground">{rate.method}</TableCell>
                    <TableCell className="text-foreground font-mono">{rate.rate}</TableCell>
                    <TableCell className="text-muted-foreground">${rate.freeAbove}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard size={18} className="text-chrome-dim" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">Payment Methods</h2>
            </div>
            <div className="space-y-3">
              {payments.map((method) => (
                <div key={method.name} className="flex items-center justify-between rounded-xl border border-chrome/20 bg-background px-5 py-4">
                  <div>
                    <p className="font-mono text-[12px] text-foreground">{method.name}</p>
                    <p className="font-mono text-[10px] text-chrome-dim">{method.enabled ? "Active" : "Disabled"}</p>
                  </div>
                  <Toggle enabled={method.enabled} onChange={() => togglePayment(method.name)} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3">Country-Specific Rules</h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-chrome/10">
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Country</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rate</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Applies To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRules.map((rule, i) => (
                    <TableRow key={i} className="border-chrome/10">
                      <TableCell className="text-foreground">{rule.country}</TableCell>
                      <TableCell className="text-foreground font-mono">{rule.rate}</TableCell>
                      <TableCell className="text-muted-foreground">{rule.appliesTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
