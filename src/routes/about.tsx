import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Us — VintageCvunt" },
      { name: "description", content: "The story of VintageCvunt. A gothic luxury house cast in chrome, silver, and leather." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;



function About() {
  const milestones = useQuery(api.aboutMilestones.list) ?? [];
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-28 pb-14 md:pt-44 md:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6"
          >
            — The House · Chapter I
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">About</span><br />
            <span>VintageCvunt</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-y border-chrome py-12 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-16">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Manifesto</span>
              <h2 className="mt-4 font-display text-3xl md:text-6xl leading-[0.95]">
                Cast in <span className="italic text-chrome-h">Chrome</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-4 md:space-y-6 text-sm md:text-base leading-relaxed text-chrome-dim">
              <p>
                VintageCvunt is not a brand. It is a house — a place where the gothic meets the metallic, where
                cathedral shadows fall across chrome surfaces. Every piece is conceived in the Casa d'Argento atelier
                and finished by hand, a process measured in weeks, not hours.
              </p>
              <p>
                We work in four materials: silver, leather, chrome, and bone. Each object carries a number and a
                weight — not merely physical, but the weight of the hands that shaped it, the hours of polish,
                the silence of the atelier after the last craftsman has left.
              </p>
              <p>
                Our collection spans sixty-two objects, each one a chapter in a larger story. There will be no
                seasonal drops, no endless rotations. When a piece is gone, it is gone — cast once, numbered, and
                released into the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-chrome py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Chronology</span>
          <h2 className="mt-4 mb-10 md:mb-16 font-display text-4xl md:text-6xl leading-[0.95]">
            The <span className="italic text-chrome-h">Path</span>
          </h2>
          <div className="space-y-10 md:space-y-20">
            {milestones.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="flex items-start gap-4 md:grid md:grid-cols-12 md:gap-8"
              >
                <div className="shrink-0 md:col-span-2">
                  <span className="font-mono text-xs tracking-[0.3em] text-chrome">{m.year}</span>
                </div>
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <div className="h-full w-px bg-chrome/30" />
                </div>
                <div className="min-w-0 md:col-span-8">
                  <h3 className="font-display text-xl md:text-4xl mb-2 md:mb-3">{m.title}</h3>
                  <p className="text-sm md:text-base text-chrome-dim max-w-xl">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="border-b border-chrome py-12 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-16 items-start md:items-center">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Craft</span>
              <h2 className="mt-4 font-display text-3xl md:text-6xl leading-[0.95]">
                Hand-<span className="italic text-chrome-h">Finished</span>
              </h2>
              <div className="mt-8 space-y-4 text-sm text-chrome-dim leading-relaxed">
                <p>Each object passes through twelve hands before it reaches its final form. Our atelier in Karachi is a place of slow work — of burnishing, stitching, and patient assembly.</p>
                <p>We source our leathers from a single tannery in Tuscany that has operated since 1872. Our silver is recycled from vintage ecclesiastical objects. Every chain is assembled link by link.</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <div className="rounded-3xl border border-chrome bg-graphite overflow-hidden" style={{ boxShadow: "var(--shadow-plate)" }}>
                <div className="aspect-[4/5] bg-gradient-to-br from-graphite-2 via-graphite to-background flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-display text-7xl italic text-chrome-h opacity-30">✧</div>
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Casa d'Argento · Karachi</div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim/60">Est. MMXXII</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-chrome py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Principles</span>
          <h2 className="mt-4 mb-10 md:mb-16 font-display text-4xl md:text-6xl leading-[0.95]">
            The <span className="italic text-chrome-h">Code</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Slowness", desc: "No seasonal calendar. Objects are released when they are ready — measured in months, not weeks. Each piece is an event, not an item." },
              { title: "Materiality", desc: "We work only with natural and noble materials: silver, chrome, full-grain leather, bone. No synthetics, no compromises on the handfeel." },
              { title: "Permanence", desc: "Every object is numbered and documented. Once a run is complete, the mould is retired. These are heirloom pieces, designed to outlast their owners." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="rounded-2xl md:rounded-3xl border border-chrome bg-graphite p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-plate)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome">{`0${i + 1}`}</span>
                <h3 className="mt-4 font-display text-2xl md:text-4xl">{v.title}</h3>
                <div className="divider-chrome my-4 md:my-6" />
                <p className="text-sm text-chrome-dim leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
