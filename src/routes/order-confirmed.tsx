import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/order-confirmed")({
  component: OrderConfirmed,
  validateSearch: (search: Record<string, string | undefined>) => ({
    orderId: search.orderId || "VC-" + String(Math.floor(100000 + Math.random() * 900000)),
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — VintageCvunt" },
      { name: "description", content: "Your order has been placed. Thank you for your patronage." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

function OrderConfirmed() {
  const { orderId } = Route.useSearch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }} />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          {/* Checkmark */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={mounted ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-chrome flex items-center justify-center"
            >
              <motion.svg
                width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-chrome"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={mounted ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Order Confirmed</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95]">
              Thank You, <span className="italic text-chrome-h">Patron</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="mt-8"
          >
            <p className="text-sm text-chrome-dim leading-relaxed max-w-md mx-auto">
              Your order has been received and is being prepared at the Casa d'Argento atelier.
              You will receive a confirmation email shortly.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
            className="mt-10 inline-block rounded-2xl border border-chrome bg-graphite px-8 py-6"
            style={{ boxShadow: "var(--shadow-plate)" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Order Number</span>
            <p className="mt-2 font-mono text-xl md:text-2xl tracking-[0.08em] text-chrome">{orderId}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                const receipt = `Order: ${orderId}\nDate: ${new Date().toISOString()}\n\nThank you for your patronage.\n— VintageCvunt · Casa d'Argento`;
                const blob = new Blob([receipt], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `receipt-${orderId}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="btn-chrome btn-chrome-inner"
            >
              <span className="btn-label">Download Receipt</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-dim hover:text-foreground transition-colors">
              Continue Shopping →
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
