import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/shipping-returns")({
  component: ShippingReturns,
  head: () => ({
    meta: [
      { title: "Shipping & Returns — VintageCvunt" },
      { name: "description", content: "VintageCvunt shipping and returns policy. Domestic delivery rates, processing times, and return instructions." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;



const returnSteps = [
  { step: "01", title: "Initiate Request", desc: "Email returns@vintagecvunt.com within 14 days of delivery with your order number and reason for return." },
  { step: "02", title: "Receive Authorization", desc: "Our team will issue a Return Merchandise Authorization (RMA) number and provide a prepaid shipping label within 48 hours." },
  { step: "03", title: "Pack Securely", desc: "Place the item in its original packaging with all tags, documentation, and authenticity cards. Include your RMA number inside the package." },
  { step: "04", title: "Ship & Track", desc: "Drop the package at the designated carrier. We recommend insuring the shipment for its full value." },
  { step: "05", title: "Inspection & Refund", desc: "Upon arrival, our atelier inspects the item. Approved refunds are processed within 10 business days to the original payment method." },
];

const exclusions = ["Custom and bespoke pieces are final sale and not eligible for return.", "Items worn, altered, damaged, or returned without original packaging will be refused.", "Earrings, intimates, and grooming products cannot be returned for hygiene reasons.", "Sale or discounted items marked as final sale are non-returnable."];

function ShippingReturns() {
  const shippingRates = useQuery(api.shippingRates.list) ?? [];
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="relative pt-28 md:pt-44 pb-16 md:pb-28 overflow-hidden">
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
            — Policies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">Shipping</span><br />
            <span>& Returns</span>
          </motion.h1>
        </div>
      </section>

      {/* Shipping */}
      <section className="border-t border-chrome py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Shipping</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Delivery Rates & Times</h2>
            <div className="mt-6 space-y-2 font-mono text-sm text-chrome-dim">
              <p>All orders are processed within 1–2 business days. Orders placed after 14:00 PKT are processed the following business day.</p>
              <p>We ship via Leopards Courier, TCS, and M&P. All shipments are fully insured and require a signature upon delivery. Free shipping on orders over PKR 500,000.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-8 overflow-x-auto"
          >
            <table className="w-full min-w-[400px] border-collapse">
              <thead>
                <tr className="bg-graphite">
                  <th className="border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left">Region</th>
                  <th className="border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left">Estimated Delivery</th>
                  <th className="border border-chrome px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                {shippingRates.filter((r) => r.isActive).map((r) => (
                  <tr key={r._id} className="even:bg-graphite/40">
                    <td className="border border-chrome px-4 py-3 font-mono text-sm">{r.name}</td>
                    <td className="border border-chrome px-4 py-3 font-mono text-sm text-chrome-dim">{r.estimatedDays}</td>
                    <td className="border border-chrome px-4 py-3 font-mono text-sm">{r.price === 0 ? "Free" : `PKR ${r.price.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Returns */}
      <section className="border-y border-chrome py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Returns</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Return Policy</h2>
            <p className="mt-6 font-mono text-sm text-chrome-dim max-w-3xl leading-relaxed">
              We accept returns within 14 days of delivery. Items must be unworn, unaltered, and returned in their original packaging with all tags and documentation attached. Refunds are processed to the original payment method within 10 business days of inspection.
            </p>
          </motion.div>

          <div className="mt-10 space-y-6">
            {returnSteps.map((rs, i) => (
              <motion.div
                key={rs.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="flex gap-4 md:gap-6 items-start"
              >
                <span className="shrink-0 font-mono text-xs tracking-[0.3em] text-chrome mt-0.5">{rs.step}</span>
                <div className="flex-1 border-b border-chrome/20 pb-6">
                  <h3 className="font-display text-lg md:text-2xl">{rs.title}</h3>
                  <p className="mt-1 font-mono text-sm text-chrome-dim">{rs.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="font-display text-xl md:text-2xl mb-4">Exclusions</h3>
            <ul className="space-y-2">
              {exclusions.map((exc) => (
                <li key={exc} className="flex gap-3 font-mono text-sm text-chrome-dim">
                  <span className="text-chrome mt-0.5">—</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
