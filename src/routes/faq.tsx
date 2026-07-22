import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — VintageCvunt" },
      { name: "description", content: "Frequently asked questions about VintageCvunt. Orders, shipping, returns, product care, and sizing information." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

function FAQ() {
  const allFaq = useQuery(api.faq.list) ?? [];
  const faqByCategory = useMemo(() => {
    const map: Record<string, typeof allFaq> = {};
    for (const item of allFaq) {
      if (!item.isActive) continue;
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [allFaq]);
  const categories = Object.keys(faqByCategory);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "");

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
            — Support
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">Frequently</span><br />
            <span>Asked Questions</span>
          </motion.h1>
        </div>
      </section>

      <section className="border-y border-chrome py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full border font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] transition-colors whitespace-nowrap ${activeCategory === cat ? "bg-chrome text-background border-chrome" : "border-chrome text-chrome-dim hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Accordion type="single" collapsible className="w-full">
              {(faqByCategory[activeCategory] || []).map((item, i) => (
                <AccordionItem key={item._id || i} value={`item-${item._id || i}`} className="border-chrome/20">
                  <AccordionTrigger className="font-mono text-sm md:text-base text-left hover:no-underline hover:text-chrome transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-chrome-dim leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
