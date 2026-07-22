import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartContext } from "@/lib/cart-context";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — VintageCvunt" },
      { name: "description", content: "Complete your order at VintageCvunt." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;
const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

function Checkout() {
  const { cart, cartTotal, cartCount, clearCart } = useCartContext();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "", zip: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!billing.name.trim()) errs.name = "Full name is required";
    if (!billing.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) errs.email = "Invalid email";
    if (!billing.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[\d\s\+\-]{7,15}$/.test(billing.phone)) errs.phone = "Enter a valid phone number";
    if (!billing.address.trim()) errs.address = "Address is required";
    if (!billing.city.trim()) errs.city = "City is required";
    if (!billing.country) errs.country = "Country is required";
    if (!billing.zip.trim()) errs.zip = "ZIP code is required";
    if (!screenshot) errs.screenshot = "Payment screenshot is required";
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] || "" }));
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const createOrder = useMutation(api.orders.create);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({
      name: true, email: true, phone: true, address: true,
      city: true, country: true, zip: true, screenshot: true,
    });
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      let screenshotId: string | undefined;
      if (screenshot) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, { method: "POST", body: screenshot });
        const { storageId } = await result.json();
        screenshotId = storageId;
      }

      const orderNumber = "VC-" + String(Math.floor(100000 + Math.random() * 900000));
      await createOrder({
        orderNumber,
        customerName: billing.name,
        customerEmail: billing.email,
        items: cart.items.map((item) => ({
          productId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: cartTotal,
        shipping: 0,
        tax: 0,
        total: cartTotal,
        status: "pending",
        paymentMethod: "Bank Transfer",
        billingAddress: {
          street: billing.address,
          city: billing.city,
          state: "",
          zip: billing.zip,
          country: "Pakistan",
        },
        shippingAddress: {
          street: billing.address,
          city: billing.city,
          state: "",
          zip: billing.zip,
          country: "Pakistan",
        },
        screenshot: screenshotId,
      });

      clearCart();
      navigate({ to: "/order-confirmed", search: { orderId: orderNumber } });
    } catch (err) {
      console.error("Order submission failed", err);
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0 && !submitting) {
    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <SiteNav />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-display text-3xl text-chrome-dim">Your ledger is empty</h2>
            <Link to="/shop" className="mt-6 inline-block btn-chrome btn-chrome-inner">
              <span className="btn-label">Browse Collection</span>
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="relative pt-28 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6"
          >
            — Secure Checkout
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-[0.9] tracking-[-0.03em]"
          >
            Complete Your <span className="italic text-chrome-h">Order</span>
          </motion.h1>
        </div>
      </section>

      <section className="border-y border-chrome py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-8 md:gap-16">
              {/* Left — Billing + Payment */}
              <div className="col-span-12 md:col-span-7 space-y-10">
                {/* Billing */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Billing Details</span>
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Full Name *</label>
                        <input
                          value={billing.name}
                          onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                          onBlur={() => handleBlur("name")}
                          placeholder="Your Name"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {touched.name && errors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Email *</label>
                        <input
                          type="email"
                          value={billing.email}
                          onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                          onBlur={() => handleBlur("email")}
                          placeholder="your@address.com"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.email && errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {touched.email && errors.email && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Phone *</label>
                      <input
                        value={billing.phone}
                        onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+92 300 1234567"
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.phone && errors.phone ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {touched.phone && errors.phone && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Address *</label>
                      <input
                        value={billing.address}
                        onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                        onBlur={() => handleBlur("address")}
                        placeholder="Street address"
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.address && errors.address ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {touched.address && errors.address && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">City *</label>
                        <input
                          value={billing.city}
                          onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                          onBlur={() => handleBlur("city")}
                          placeholder="City"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.city && errors.city ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {touched.city && errors.city && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Country *</label>
                          <input
                            type="text"
                            value="Pakistan"
                            disabled
                            className="w-full rounded-xl border border-chrome/20 bg-graphite/50 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
                          />
                          <input type="hidden" value="PK" />
                        {touched.country && errors.country && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.country}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">ZIP Code *</label>
                        <input
                          value={billing.zip}
                          onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
                          onBlur={() => handleBlur("zip")}
                          placeholder="ZIP"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.zip && errors.zip ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {touched.zip && errors.zip && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.zip}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Screenshot */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Payment Proof</span>
                  <p className="mt-2 font-mono text-[10px] text-chrome-dim/60">Upload a screenshot of your payment transaction to confirm your order.</p>

                  {/* Screenshot Upload */}
                  <div className="mt-5">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Payment Screenshot *</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                        screenshot ? "border-chrome/50 bg-chrome/5" : "border-chrome/20 hover:border-chrome/40 bg-graphite/30"
                      } ${touched.screenshot && errors.screenshot ? "border-red-500/50" : ""}`}
                    >
                      {screenshotPreview ? (
                        <div className="space-y-3">
                          <img src={screenshotPreview} alt="Payment screenshot" className="mx-auto max-h-40 rounded-xl object-contain" />
                          <p className="font-mono text-[10px] text-chrome-dim">{screenshot?.name}</p>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setScreenshot(null); setScreenshotPreview(""); }}
                            className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <svg className="mx-auto text-chrome-dim/40" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <p className="mt-3 font-mono text-xs text-chrome-dim/60">Click to upload payment screenshot</p>
                          <p className="mt-1 font-mono text-[9px] text-chrome-dim/40">PNG, JPG — Max 5MB</p>
                        </div>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      />
                    </div>
                    {touched.screenshot && errors.screenshot && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.screenshot}</p>}
                  </div>

                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400/60 leading-relaxed">
                    ⚠ Orders with incorrect or fraudulent payment screenshots will be automatically cancelled.
                    Please ensure your transaction proof matches the order total before submitting.
                  </p>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <div className="md:sticky md:top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8" style={{ boxShadow: "var(--shadow-plate)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Order Summary</span>
                  <div className="divider-chrome my-5" />
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-chrome/30 bg-graphite-2 grid place-items-center font-mono text-xs text-chrome-dim">
                          {item.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[11px] text-chrome-dim truncate">{item.name}</p>
                          <p className="font-mono text-[10px] text-chrome">× {item.quantity}</p>
                        </div>
                        <span className="font-mono text-xs text-chrome shrink-0">{priceLabel(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="divider-chrome my-5" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Subtotal</span>
                    <span className="font-mono text-sm text-chrome">{priceLabel(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Shipping</span>
                    <span className="font-mono text-xs text-chrome-dim">Free</span>
                  </div>
                  <div className="divider-chrome my-5" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Total</span>
                    <span className="font-mono text-lg text-chrome">{priceLabel(cartTotal)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50"
                  >
                    <span className="btn-label">{submitting ? "Processing…" : "Place Order"}</span>
                  </button>

                  <AnimatePresence>
                    {Object.values(errors).some(Boolean) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                      >
                        <ul className="space-y-1">
                          {Object.entries(errors).filter(([, v]) => v).map(([k, v]) => (
                            <li key={k} className="font-mono text-[10px] text-red-400">{v}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
