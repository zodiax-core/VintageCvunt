import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({
    meta: [
      { title: "Account — VintageCvunt" },
      { name: "description", content: "Sign in or create your VintageCvunt account." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "register" && !form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters";
    if (mode === "register" && form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] || "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setTimeout(() => navigate({ to: "/admin" }), 1000);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="relative pt-28 md:pt-44 pb-16 md:pb-28 overflow-hidden min-h-screen flex items-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }} />
        <div className="relative mx-auto w-full max-w-md px-6">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.4, ease: EASE }}
              className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim"
            >
              — {mode === "login" ? "Returning" : "New"} Patron
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="mt-4 font-display text-4xl md:text-6xl leading-[0.9] tracking-tight"
            >
              {mode === "login" ? "Welcome" : "Join"}
            </motion.h1>
          </div>

          {/* Tabs */}
          <div className="flex rounded-full border border-chrome bg-graphite p-1 mb-8">
            <button
              onClick={() => { setMode("login"); setErrors({}); setSuccess(false); }}
              className={`flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "login" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("register"); setErrors({}); setSuccess(false); }}
              className={`flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "register" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {mode === "register" && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Full Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => handleBlur("name")}
                    placeholder="John Doe"
                    className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.name && errors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                  />
                  {touched.name && errors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={() => handleBlur("email")}
                  placeholder="your@address.com"
                  className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.email && errors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                />
                {touched.email && errors.email && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.password && errors.password ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                />
                {touched.password && errors.password && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.password}</p>}
              </div>

              {mode === "register" && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.confirmPassword && errors.confirmPassword ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && <p className="mt-1 font-mono text-[10px] text-red-400">{errors.confirmPassword}</p>}
                </div>
              )}

              {mode === "login" && (
                <a href="#" className="block text-right font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors">
                  Forgot password?
                </a>
              )}

              <button type="submit" className="btn-chrome btn-chrome-inner w-full justify-center">
                <span className="btn-label">{mode === "login" ? "Sign In" : "Create Account"}</span>
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center"
                  >
                    <p className="font-mono text-[11px] text-green-400">
                      {mode === "login" ? "Signed in successfully. Redirecting…" : "Account created. Welcome to the house."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Errors summary */}
              <AnimatePresence>
                {Object.values(errors).some(Boolean) && !success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                  >
                    <ul className="space-y-1">
                      {Object.entries(errors).filter(([, v]) => v).map(([k, v]) => (
                        <li key={k} className="font-mono text-[10px] text-red-400">{v}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-chrome" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={() => {}}
            className="w-full flex items-center justify-center gap-3 rounded-full border border-chrome bg-graphite px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground hover:bg-graphite-2 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.5 12.2c0-.7-.1-1.4-.2-2.1H12v4.1h5.9a4.8 4.8 0 01-2.1 3.2v2.6h3.4c2-1.8 3.1-4.5 3.1-7.8z" fill="#4285F4"/>
              <path d="M12 23c2.8 0 5.1-.9 6.8-2.6l-3.4-2.6c-.9.6-2.1 1-3.4 1a6.8 6.8 0 01-6.4-4.6H2v2.8A12 12 0 0012 23z" fill="#34A853"/>
              <path d="M5.6 14.2A7.3 7.3 0 015.3 12c0-.8.1-1.5.3-2.2V7H2a12 12 0 000 10l3.6-2.8z" fill="#FBBC05"/>
              <path d="M12 5.2c1.5 0 2.9.5 4 1.5l3-3A11.9 11.9 0 002 7l3.6 2.8A6.8 6.8 0 0112 5.2z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim">
            {mode === "login" ? (
              <>No account?{" "}<button onClick={() => { setMode("register"); setErrors({}); }} className="text-chrome hover:text-foreground underline underline-offset-2">Register</button></>
            ) : (
              <>Already a patron?{" "}<button onClick={() => { setMode("login"); setErrors({}); }} className="text-chrome hover:text-foreground underline underline-offset-2">Sign In</button></>
            )}
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
