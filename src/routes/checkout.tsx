import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Copy, Check, Upload, X } from "lucide-react";
import { useCartContext } from "@/lib/cart-context";
import { useAuthContext } from "@/lib/auth-context";
import { useCurrency } from "@/lib/currency-context";
import type { Id } from "../../convex/_generated/dataModel";
import jazzCashLogo from "@/assets/jazz-cash-logo.png";

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

// ─── Payment account details ───────────────
const JAZZCASH_DETAILS = {
  accountHolder: "Anabiya Kashif",
  accountNumber: "0331-6809983",
};

// ─── JazzCash Logo ───────────────────────────────────────────────────────
function JazzCashLogo({ size = 22 }: { size?: number }) {
  return (
    <img
      src={jazzCashLogo}
      alt="JazzCash"
      width={size}
      height={size}
      className="rounded-xl overflow-hidden object-contain bg-white"
    />
  );
}

// ─── Copy button with feedback ───────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handle}
      title="Copy"
      className="ml-2 inline-flex items-center justify-center h-7 w-7 rounded-lg border border-chrome/30 bg-graphite hover:border-chrome/60 transition-colors shrink-0"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-chrome-dim" />
      )}
    </button>
  );
}

function Checkout() {
  const { formatPrice } = useCurrency();
  const { cart, cartTotal, clearCart } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const settings = useQuery(api.settings.get);
  const shippingRates = useQuery(api.shippingRates.list) ?? [];

  const [toastOpen, setToastOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);

  // Show registration modal for non-logged-in users
  useEffect(() => {
    if (!user) {
      setToastOpen(true);
    }
  }, [user]);

  const [billing, setBilling] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
    zip: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  // Payment method: "cash on delivery" | "jazzcash"
  const [paymentMethod, setPaymentMethod] = useState<"cash on delivery" | "jazzcash">("cash on delivery");

  // Screenshot upload state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    _id: Id<"coupons">;
    code: string;
    type: string;
    value: number;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponApplying, setCouponApplying] = useState(false);

  // Shipping — driven by city selection
  const [selectedShipping, setSelectedShipping] = useState<typeof shippingRates[number] | null>(null);

  // Set first city as default once rates load and sync citySearch
  useEffect(() => {
    if (shippingRates.length > 0 && !selectedShipping) {
      setSelectedShipping(shippingRates[0]);
      const defaultCity = shippingRates[0].name;
      setBilling((prev) => ({ ...prev, city: prev.city || defaultCity }));
      setCitySearch(prev => prev || defaultCity);
    }
  }, [shippingRates, selectedShipping]);

  const shippingCost = selectedShipping?.price ?? 0;
  const taxRate = settings?.defaultTaxRate ?? 0;
  const discount = appliedCoupon?.discountAmount ?? 0;
  const taxableAmount = Math.max(0, cartTotal - discount);
  const tax = settings?.taxInclusive ? 0 : Math.round(taxableAmount * (taxRate / 100) * 100) / 100;
  const grandTotal = cartTotal + shippingCost + tax - discount;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!billing.name.trim()) errs.name = "Full name is required";
    if (!billing.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) errs.email = "Invalid email";
    if (!billing.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[\d\s+\-]{7,15}$/.test(billing.phone)) errs.phone = "Enter a valid phone number";
    if (!billing.address.trim()) errs.address = "Address is required";
    if (!billing.city.trim()) errs.city = "City is required";
    if (!billing.zip.trim()) errs.zip = "ZIP code is required";
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] || "" }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponApplying(true);
    setCouponError("");
    setAppliedCoupon(null);
    try {
      const result = await queryValidateCoupon(couponCode.trim().toUpperCase(), cartTotal);
      if (result.valid && result.coupon) {
        setAppliedCoupon(result.coupon);
        setCouponCode("");
      } else {
        setCouponError(result.reason || "Invalid coupon");
      }
    } catch {
      setCouponError("Failed to validate coupon");
    } finally {
      setCouponApplying(false);
    }
  };

  // Handle screenshot file selection
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshotPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const createOrder = useMutation(api.orders.create);
  const generateUploadUrl = useMutation(api.orders.generateUploadUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      zip: true,
    });
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const orderNumber = "VC-" + String(Math.floor(100000 + Math.random() * 900000));

      // Resolve which online method was selected
      const resolvedPaymentMethod = paymentMethod;

      let screenshotStorageId: string | undefined;

      // Upload screenshot to Convex Storage if present and online payment
      if (screenshotFile && resolvedPaymentMethod === "jazzcash") {
        setUploadingScreenshot(true);
        try {
          const uploadUrl = await generateUploadUrl();
          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": screenshotFile.type },
            body: screenshotFile,
          });
          if (!result.ok) throw new Error("Upload failed");
          const { storageId } = await result.json();
          screenshotStorageId = storageId;
        } finally {
          setUploadingScreenshot(false);
        }
      }

      await createOrder({
        orderNumber,
        customerId: user?.id || undefined,
        customerName: billing.name,
        customerEmail: billing.email,
        phone: billing.phone,
        items: cart.items.map((item) => ({
          productId: item.productId || String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.src,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        subtotal: cartTotal,
        shipping: shippingCost,
        tax,
        discount: discount > 0 ? discount : undefined,
        couponCode: appliedCoupon?.code,
        total: grandTotal,
        status: "pending",
        paymentMethod: resolvedPaymentMethod,
        screenshot: screenshotStorageId,
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

  const isOnlinePayment = paymentMethod === "jazzcash";

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Registration / Auth modal */}
      {toastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-chrome bg-graphite p-6 text-center shadow-2xl"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-chrome animate-pulse mb-3" />
            <h3 className="font-display text-2xl text-foreground">Patron Identity</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-chrome-dim">
              Register or sign in to save your purchase history and track orders
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/auth"
                search={{ mode: "register" }}
                className="btn-chrome bg-chrome text-white hover:text-white hover:bg-chrome-h w-full justify-center py-3 text-xs uppercase tracking-[0.2em]"
              >
                Register Account
              </Link>
              <Link
                to="/auth"
                search={{ mode: "login" }}
                className="btn-chrome btn-chrome-inner w-full justify-center py-3 text-xs uppercase tracking-[0.2em]"
              >
                Log In
              </Link>
              <button
                type="button"
                onClick={() => setToastOpen(false)}
                className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors"
              >
                Continue as Guest / Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <SiteNav />

      <section className="relative pt-28 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
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
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                            }`}
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
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.email && errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                            }`}
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
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.phone && errors.phone ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                          }`}
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
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.address && errors.address ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                          }`}
                      />
                      {touched.address && errors.address && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* City — searchable combobox */}
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">City *</label>
                        <div className="relative">
                          <input
                            value={citySearch}
                            onChange={(e) => {
                              setCitySearch(e.target.value);
                              setCityOpen(true);
                            }}
                            onFocus={() => setCityOpen(true)}
                            onBlur={() => setTimeout(() => setCityOpen(false), 150)}
                            placeholder="Search city…"
                            className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.city && errors.city ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                              }`}
                          />
                          {cityOpen && shippingRates.length > 0 && (
                            <div className="absolute z-20 mt-1 w-full rounded-xl border border-chrome/30 bg-graphite shadow-xl overflow-hidden">
                              <div className="max-h-48 overflow-y-auto scrollbar-thin">
                                {shippingRates
                                  .filter((r) => r.name.toLowerCase().includes(citySearch.toLowerCase()))
                                  .map((rate) => (
                                    <button
                                      key={rate._id}
                                      type="button"
                                      onMouseDown={() => {
                                        setBilling((prev) => ({ ...prev, city: rate.name }));
                                        setCitySearch(rate.name);
                                        setSelectedShipping(rate);
                                        setCityOpen(false);
                                        setTouched((prev) => ({ ...prev, city: true }));
                                        setErrors((prev) => ({ ...prev, city: "" }));
                                      }}
                                      className={`w-full flex items-center justify-between px-4 py-2.5 font-mono text-sm text-left transition-colors hover:bg-chrome/10 ${selectedShipping?._id === rate._id ? "bg-chrome/10 text-chrome" : "text-foreground"
                                        }`}
                                    >
                                      <span>{rate.name}</span>
                                      <span className="text-chrome-dim text-xs">{rate.price === 0 ? "Free" : `PKR ${rate.price.toLocaleString()}`}</span>
                                    </button>
                                  ))}
                                {shippingRates.filter((r) => r.name.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && (
                                  <p className="px-4 py-3 font-mono text-[11px] text-chrome-dim/60">No cities found</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {touched.city && errors.city && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Country</label>
                        <input
                          type="text"
                          value={billing.country}
                          disabled
                          className="w-full rounded-xl border border-chrome/20 bg-graphite/50 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">ZIP Code *</label>
                        <input
                          value={billing.zip}
                          onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
                          onBlur={() => handleBlur("zip")}
                          placeholder="ZIP"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.zip && errors.zip ? "border-red-500/50" : "border-chrome focus:border-chrome/80"
                            }`}
                        />
                        {touched.zip && errors.zip && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.zip}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Payment Section ────────────────────────────────────────── */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Payment</span>
                  <div className="mt-5 space-y-3">

                    {/* ── Cash on Delivery ── */}
                    <label
                      className={`flex items-start gap-4 cursor-pointer rounded-2xl border p-4 transition-all ${paymentMethod === "cash on delivery"
                        ? "border-chrome/60 bg-chrome/5"
                        : "border-chrome/20 bg-graphite hover:border-chrome/35"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cash on delivery"
                        checked={paymentMethod === "cash on delivery"}
                        onChange={() => setPaymentMethod("cash on delivery")}
                        className="mt-0.5 shrink-0 accent-current"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        {/* COD icon */}
                        <div className="h-10 w-10 rounded-xl bg-graphite-2 border border-chrome/20 flex items-center justify-center shrink-0">
                          <svg className="h-5 w-5 text-chrome-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <circle cx="12" cy="12" r="2" />
                            <path d="M6 12h.01M18 12h.01" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-mono text-sm text-foreground">Cash on Delivery</p>
                          <p className="font-mono text-[10px] text-chrome-dim mt-0.5">Pay in cash when your parcel arrives</p>
                        </div>
                      </div>
                    </label>

                    {/* ── JazzCash Block ── */}
                    <div
                      className={`rounded-2xl border transition-all overflow-hidden ${isOnlinePayment
                        ? "border-chrome/60 bg-chrome/5"
                        : "border-chrome/20 bg-graphite hover:border-chrome/35"
                        }`}
                    >
                      {/* Header row — clicking selects online payment */}
                      <label className="flex items-center gap-4 cursor-pointer p-4">
                        <input
                          type="radio"
                          name="payment"
                          value="jazzcash"
                          checked={isOnlinePayment}
                          onChange={() => {
                            setPaymentMethod("jazzcash");
                          }}
                          className="mt-0.5 shrink-0 accent-current"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-10 w-10 rounded-xl bg-graphite-2 border border-chrome/20 flex items-center justify-center shrink-0 overflow-hidden">
                            <JazzCashLogo size={28} />
                          </div>
                          <div>
                            <p className="font-mono text-sm text-foreground">JazzCash</p>
                            <p className="font-mono text-[10px] text-chrome-dim mt-0.5">Transfer via JazzCash</p>
                          </div>
                        </div>
                      </label>

                      {/* Details — only visible when online is selected */}
                      <AnimatePresence>
                        {isOnlinePayment && (
                          <motion.div
                            key="online-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-4 pt-2">
                              {/* Account details panel */}
                              <div className="rounded-xl border border-chrome/15 bg-background/60 p-4 space-y-3">
                                <div>
                                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim/60 mb-1">Account Holder</p>
                                  <div className="flex items-center">
                                    <span className="font-mono text-sm text-foreground">{JAZZCASH_DETAILS.accountHolder}</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim/60 mb-1">Mobile Number</p>
                                  <div className="flex items-center">
                                    <span className="font-mono text-sm text-foreground">{JAZZCASH_DETAILS.accountNumber}</span>
                                    <CopyButton text={JAZZCASH_DETAILS.accountNumber} />
                                  </div>
                                </div>
                              </div>

                              {/* Screenshot upload */}
                              <div>
                                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim mb-2">
                                  Upload Payment Screenshot
                                </p>
                                {screenshotPreview ? (
                                  <div className="relative rounded-xl overflow-hidden border border-chrome/30 bg-background/50">
                                    <img
                                      src={screenshotPreview}
                                      alt="Payment proof"
                                      className="w-full max-h-48 object-contain"
                                    />
                                    <button
                                      type="button"
                                      onClick={removeScreenshot}
                                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 border border-chrome/30 flex items-center justify-center hover:border-red-400/60 transition-colors"
                                    >
                                      <X className="h-3.5 w-3.5 text-chrome-dim" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full flex flex-col items-center gap-2 py-6 rounded-xl border border-dashed border-chrome/30 bg-background/30 hover:border-chrome/60 hover:bg-chrome/5 transition-all"
                                  >
                                    <Upload className="h-5 w-5 text-chrome-dim" />
                                    <span className="font-mono text-[10px] text-chrome-dim">Click to upload screenshot</span>
                                    <span className="font-mono text-[9px] text-chrome-dim/50">PNG, JPG, WEBP up to 5 MB</span>
                                  </button>
                                )}
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleScreenshotChange}
                                  className="hidden"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
                {/* ────────────────────────────────────────────────────────────── */}
              </div>

              {/* Right — Order Summary */}
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <div className="md:sticky md:top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8" style={{ boxShadow: "var(--shadow-plate)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Order Summary</span>
                  <div className="divider-chrome my-5" />

                  {/* Cart items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-chrome/30 bg-graphite-2">
                          <OptimizedImage
                            webp={item.webp}
                            fallback={item.src}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[11px] text-chrome-dim truncate">{item.name}</p>
                          {(item.selectedSize || item.selectedColor) && (
                            <p className="font-mono text-[9px] text-chrome-dim/60">
                              {[item.selectedSize, item.selectedColor].filter(Boolean).join(" / ")}
                            </p>
                          )}
                          <p className="font-mono text-[10px] text-chrome">× {item.quantity}</p>
                        </div>
                        <span className="font-mono text-xs text-chrome shrink-0">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="divider-chrome my-4" />
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2">
                        <span className="font-mono text-[10px] text-green-400">{appliedCoupon.code} (-{formatPrice(discount)})</span>
                        <button
                          type="button"
                          onClick={() => setAppliedCoupon(null)}
                          className="font-mono text-[9px] text-chrome-dim hover:text-red-400 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code"
                          className="flex-1 rounded-xl border border-chrome/20 bg-background px-3 py-2 font-mono text-[10px] outline-none focus:border-chrome/50"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={couponApplying || !couponCode.trim()}
                          className="btn-chrome btn-chrome-inner px-3 py-2 rounded-xl text-[10px] disabled:opacity-30 cursor-pointer"
                        >
                          {couponApplying ? "..." : "Apply"}
                        </button>
                      </div>
                    )}
                    {couponError && <p className="mt-1 font-mono text-[9px] text-red-400">{couponError}</p>}
                  </div>

                  {/* Delivery charge indicator */}
                  {selectedShipping && (
                    <>
                      <div className="divider-chrome my-4" />
                      <div className="flex items-center justify-between rounded-xl border border-chrome/20 bg-chrome/5 px-3 py-2.5">
                        <div>
                          <p className="font-mono text-[10px] text-chrome-dim uppercase tracking-[0.2em]">Delivery</p>
                          <p className="font-mono text-[11px] text-foreground mt-0.5">{selectedShipping.name}</p>
                          {selectedShipping.estimatedDays && (
                            <p className="font-mono text-[9px] text-chrome-dim/60">{selectedShipping.estimatedDays} days</p>
                          )}
                        </div>
                        <span className="font-mono text-sm text-chrome shrink-0">
                          {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Totals */}
                  <div className="divider-chrome my-5" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Subtotal</span>
                      <span className="font-mono text-sm text-chrome">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Shipping</span>
                      <span className="font-mono text-xs text-chrome">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                    </div>
                    {tax > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Tax</span>
                        <span className="font-mono text-xs text-chrome">{formatPrice(tax)}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-400">Discount</span>
                        <span className="font-mono text-xs text-green-400">-{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="divider-chrome my-5" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Total</span>
                    <span className="font-mono text-lg text-chrome">{formatPrice(grandTotal)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || uploadingScreenshot}
                    className="mt-6 btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50 cursor-pointer"
                  >
                    <span className="btn-label">
                      {uploadingScreenshot ? "Uploading…" : submitting ? "Processing…" : "Place Order"}
                    </span>
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

// Helper to query coupon validation via Convex
async function queryValidateCoupon(code: string, subtotal: number) {
  const { getConvexClient } = await import("@/lib/convex");
  const { api } = await import("../../convex/_generated/api");
  return await getConvexClient().query(api.coupons.validateCoupon, { code, subtotal });
}
