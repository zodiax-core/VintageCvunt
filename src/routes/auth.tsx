import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthContext } from "@/lib/auth-context";
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
  const { login } = useAuthContext();
  const registerMutation = useMutation(api.customers.register);
  const authenticateMutation = useMutation(api.customers.authenticate);
  const verifyMutation = useMutation(api.customers.verifyEmail);
  const resendVerificationMutation = useMutation(api.customers.resendVerification);
  const requestResetMutation = useMutation(api.customers.requestPasswordReset);
  const resetPasswordMutation = useMutation(api.customers.resetPassword);

  const [mode, setMode] = useState<"login" | "register" | "verify" | "forgot" | "reset">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", otp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "register" && !form.name.trim()) errs.name = "Name is required";
    if (mode !== "reset" && !form.email.trim()) errs.email = "Email is required";
    else if (mode !== "reset" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";

    if (mode === "login" || mode === "register" || mode === "reset") {
      if (!form.password) errs.password = "Password is required";
      else if (mode !== "login" && form.password.length < 8) errs.password = "Minimum 8 characters";
    }

    if ((mode === "register" || mode === "reset") && form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if ((mode === "verify" || mode === "reset") && form.otp.length !== 6) {
      errs.otp = "Enter a 6-digit code";
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, password: true, confirmPassword: true, otp: true });
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      if (mode === "register") {
        const user = await registerMutation({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });
        if (user.isEmailVerified) {
          login({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role as "admin" | "customer",
          });
          const isAdminRole = user.email.toLowerCase() === "zodiaxcore@gmail.com" || user.role === "admin";
          setSuccessMsg(isAdminRole ? "Admin account created! Redirecting to Dashboard…" : "Account created! Welcome to the house.");
          setTimeout(() => navigate({ to: isAdminRole ? "/admin" : "/account" }), 1000);
        } else {
          setSuccessMsg("Registration successful! Verification code sent to your email.");
          setMode("verify");
        }

      } else if (mode === "verify") {
        const user = await verifyMutation({
          email: form.email.trim(),
          otp: form.otp.trim(),
        });
        login({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role as "admin" | "customer",
        });
        setSuccessMsg("Email verified! Welcome to the house.");
        setTimeout(() => navigate({ to: "/account" }), 1000);

      } else if (mode === "forgot") {
        await requestResetMutation({ email: form.email.trim() });
        setSuccessMsg("If an account exists, a verification code has been sent to your email.");
        setMode("reset");
        setForm(f => ({ ...f, otp: "", password: "", confirmPassword: "" }));
        setTouched({});

      } else if (mode === "reset") {
        await resetPasswordMutation({
          email: form.email.trim(),
          otp: form.otp.trim(),
          newPassword: form.password,
        });
        setSuccessMsg("Password reset successfully! Please sign in.");
        setTimeout(() => {
          setMode("login");
          setForm(f => ({ ...f, password: "", otp: "", confirmPassword: "" }));
          setSuccessMsg("");
          setTouched({});
        }, 2000);

      } else {
        // login
        const user = await authenticateMutation({
          email: form.email.trim(),
          password: form.password,
        });

        if (user && 'needsVerification' in user && user.needsVerification) {
          setSuccessMsg("Please verify your email. A verification code has been sent.");
          setMode("verify");
          setForm(f => ({ ...f, email: user.email }));
          return;
        }

        login({
          id: user._id,
          name: user.name || "",
          email: user.email as string,
          role: user.role as "admin" | "customer",
        });
        const isAdminRole = user.email.toLowerCase() === "zodiaxcore@gmail.com" || user.role === "admin";
        setSuccessMsg(isAdminRole ? "Welcome back Admin! Redirecting to Dashboard…" : "Signed in successfully. Redirecting…");
        setTimeout(() => navigate({ to: isAdminRole ? "/admin" : "/account" }), 1000);
      }
    } catch (err: any) {
      setErrors({ form: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setErrors({});
    setSuccessMsg("");
    try {
      await resendVerificationMutation({ email: form.email.trim() });
      setSuccessMsg("Verification code resent! Please check your email.");
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to resend code." });
    }
  };

  const getHeaderTitle = () => {
    switch (mode) {
      case "login": return "Welcome";
      case "register": return "Join";
      case "verify": return "Verify Email";
      case "forgot": return "Reset Password";
      case "reset": return "New Password";
    }
  };

  const getHeaderSubtitle = () => {
    switch (mode) {
      case "login": return "Returning Patron";
      case "register": return "New Patron";
      case "verify": return "Verify Patron";
      case "forgot": return "Account Recovery";
      case "reset": return "Account Recovery";
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
              — {getHeaderSubtitle()}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="mt-4 font-display text-4xl md:text-5xl leading-[0.9] tracking-tight"
            >
              {getHeaderTitle()}
            </motion.h1>
          </div>

          {/* Tabs */}
          {(mode === "login" || mode === "register") && (
            <div className="flex rounded-full border border-chrome bg-graphite p-1 mb-8">
              <button
                type="button"
                onClick={() => { setMode("login"); setErrors({}); setSuccessMsg(""); }}
                className={`flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "login" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); setErrors({}); setSuccessMsg(""); }}
                className={`flex-1 rounded-full py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-all duration-300 ${mode === "register" ? "bg-foreground text-background" : "text-chrome-dim hover:text-foreground"}`}
              >
                Register
              </button>
            </div>
          )}

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

              {(mode === "login" || mode === "register" || mode === "forgot") && (
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
              )}

              {(mode === "login" || mode === "register" || mode === "reset") && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">{mode === "reset" ? "New Password" : "Password"}</label>
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
              )}

              {(mode === "register" || mode === "reset") && (
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

              {(mode === "verify" || mode === "reset") && (
                <div>
                  <p className="text-center font-mono text-[11px] text-chrome-dim mb-6">
                    {mode === "reset"
                      ? <>Enter the 6-digit reset code sent to <span className="text-foreground">{form.email}</span></>
                      : <>Enter the 6-digit verification code sent to <span className="text-foreground">{form.email}</span>.</>}
                  </p>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-2">Verification Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
                    onBlur={() => handleBlur("otp")}
                    placeholder="123456"
                    className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-center text-xl tracking-widest placeholder:text-chrome-dim/30 outline-none transition-colors ${touched.otp && errors.otp ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                  />
                  {touched.otp && errors.otp && <p className="mt-1 font-mono text-[10px] text-red-400 text-center">{errors.otp}</p>}

                  {mode === "verify" && (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="w-full text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome mt-4"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              )}

              {mode === "login" && (
                <button type="button" onClick={() => { setMode("forgot"); setErrors({}); setSuccessMsg(""); }} className="block w-full text-right font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome transition-colors">
                  Forgot password?
                </button>
              )}

              <button type="submit" disabled={loading} className="btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50 mt-2">
                <span className="btn-label">
                  {loading ? "Processing…" : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : mode === "forgot" ? "Send Reset Code" : mode === "reset" ? "Update Password" : "Verify Email"}
                </span>
              </button>

              {(mode === "verify" || mode === "forgot" || mode === "reset") && (
                <button
                  type="button"
                  onClick={() => { setMode("login"); setErrors({}); setSuccessMsg(""); }}
                  className="w-full text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-chrome mt-4"
                >
                  Back to Sign In
                </button>
              )}

              <AnimatePresence>
                {successMsg && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center mt-4">
                      <p className="font-mono text-[11px] text-green-400">
                        {successMsg}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Errors summary */}
              <AnimatePresence>
                {Object.values(errors).some(Boolean) && !successMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 mt-4">
                      <ul className="space-y-1">
                        {Object.entries(errors).filter(([, v]) => v).map(([k, v]) => (
                          <li key={k} className="font-mono text-[10px] text-red-400">{v}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          {(mode === "login" || mode === "register") && (
            <>
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
                type="button"
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
                  <>No account?{" "}<button type="button" onClick={() => { setMode("register"); setErrors({}); }} className="text-chrome hover:text-foreground underline underline-offset-2">Register</button></>
                ) : (
                  <>Already a patron?{" "}<button type="button" onClick={() => { setMode("login"); setErrors({}); }} className="text-chrome hover:text-foreground underline underline-offset-2">Sign In</button></>
                )}
              </p>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
