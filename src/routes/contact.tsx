import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — VintageCvunt" },
      { name: "description", content: "Get in touch with VintageCvunt. Atelier visits, press inquiries, and general correspondence." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

const inquiryTypes = ["General Inquiry", "Atelier Visit", "Press & Editorial", "Wholesale", "Bespoke Commission", "Care & Restoration"];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.type) errs.type = "Please select an inquiry type";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
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
            — Correspondence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.4rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">Get in</span><br />
            <span>Touch</span>
          </motion.h1>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="border-y border-chrome py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {/* Form */}
            <div className="col-span-12 md:col-span-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="font-display text-7xl italic text-chrome-h mb-6">✧</div>
                    <h2 className="font-display text-3xl md:text-5xl">Message Received</h2>
                    <p className="mt-4 text-sm text-chrome-dim max-w-md">
                      Thank you for reaching out. Our team typically responds within 24–48 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", type: "", subject: "", message: "" }); }}
                      className="mt-8 btn-chrome btn-chrome-inner"
                    >
                      <span className="btn-label">Send another</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 md:space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {errors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Email *</label>
                        <input
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@address.com"
                          className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                        />
                        {errors.email && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Inquiry Type *</label>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {inquiryTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, type: t })}
                            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] transition-colors whitespace-nowrap ${form.type === t ? "bg-chrome text-background border-chrome" : "border-chrome text-chrome-dim hover:text-foreground"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.type && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.type}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Subject</label>
                      <input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Optional subject line"
                        className="w-full rounded-xl border border-chrome bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Your message…"
                        rows={4}
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${errors.message ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {errors.message && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.message}</p>}
                    </div>

                    <button type="submit" className="btn-chrome btn-chrome-inner w-full md:w-auto justify-center">
                      <span className="btn-label">Send Message</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-8 md:space-y-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Atelier</span>
                <div className="mt-4 space-y-1 font-display text-lg">
                  <p>Casa d'Argento</p>
                  <p>Via Brera 24</p>
                  <p>20121 Milano, Italy</p>
                </div>
                <a href="#" className="mt-4 inline-block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-chrome hover:text-foreground transition-colors">View on Map ↗</a>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Contact</span>
                <div className="mt-4 space-y-3">
                  <a href="mailto:studio@vintagecvunt.com" className="block font-mono text-sm text-chrome hover:text-foreground transition-colors">studio@vintagecvunt.com</a>
                  <a href="tel:+390212345678" className="block font-mono text-sm text-chrome hover:text-foreground transition-colors">+39 02 1234 5678</a>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Hours</span>
                <div className="mt-4 space-y-1 font-mono text-xs text-chrome-dim">
                  <p>Mon — Fri: 10:00 — 19:00</p>
                  <p>Saturday: 11:00 — 17:00</p>
                  <p>Sunday: By appointment</p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">§ Follow</span>
                <div className="mt-4 space-y-2">
                  {["Instagram", "Journal", "Pinterest", "Discord"].map((s) => (
                    <a key={s} href="#" className="block font-display text-lg hover:text-chrome transition-colors">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
