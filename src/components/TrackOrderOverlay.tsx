import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrency } from "@/lib/currency-context";

const EASE = [0.16, 1, 0.3, 1] as const;
const STATUS_TIMELINE = ["pending", "processing", "shipped", "delivered"];

function StatusBadge({ status }: { status: string }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    shipped: "bg-green-500/10 text-green-400 border-green-500/20",
    processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const normalized = status.toLowerCase();
  return <span className={`${base} ${styles[normalized] || styles.pending}`}>{status}</span>;
}

export function TrackOrderOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  // Search query using Convex
  const order = useQuery(
    api.orders.getByOrderNumber,
    searchTrigger ? { orderNumber: searchTrigger.trim() } : "skip"
  );

  useEffect(() => {
    if (open) {
      setOrderNumber("");
      setSearchTrigger("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearchTrigger(orderNumber.trim());
    }
  };

  const currentStepIndex = order ? STATUS_TIMELINE.indexOf(order.status.toLowerCase()) : -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 backdrop-blur-xl pt-[12vh] md:pt-[15vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="w-full max-w-2xl px-4 md:px-6"
          >
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-5 top-1/2 -translate-y-1/2 text-chrome-dim/50"
              >
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter Order Tracking ID (e.g., VC-123456)…"
                className="w-full rounded-2xl border border-chrome/40 bg-graphite/80 pl-14 pr-24 py-5 font-display text-lg md:text-xl text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors backdrop-blur"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-chrome/30 bg-black px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:border-chrome transition-colors cursor-pointer"
              >
                Track
              </button>
              <button
                type="button"
                onClick={onClose}
                className="absolute -right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-foreground transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                ESC
              </button>
            </form>

            {/* Results Details */}
            <div className="mt-6" style={{ maxHeight: "65vh", overflowY: "auto", overscrollBehavior: "contain" }}>
              {searchTrigger && order === null && (
                <div className="py-16 text-center rounded-2xl border border-chrome/20 bg-graphite/40 backdrop-blur">
                  <p className="font-display text-2xl text-chrome-dim italic">Order not found</p>
                  <p className="mt-2 font-mono text-xs text-chrome-dim/50">Please verify the Tracking ID and try again</p>
                </div>
              )}

              {searchTrigger && order === undefined && (
                <div className="py-16 text-center rounded-2xl border border-chrome/20 bg-graphite/40 backdrop-blur">
                  <p className="font-mono text-xs text-chrome-dim/50 animate-pulse">Searching order database…</p>
                </div>
              )}

              {order && (
                <div className="rounded-2xl border border-chrome/30 bg-graphite p-6 md:p-8 space-y-6 backdrop-blur shadow-xl">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-chrome-dim">Tracking details</span>
                      <h3 className="font-display text-2xl text-foreground mt-1">{order.orderNumber}</h3>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim/60 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="divider-chrome" />

                  {/* Status Timeline */}
                  {order.status.toLowerCase() !== "cancelled" && (
                    <div className="space-y-4">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-chrome-dim">Status Timeline</span>
                      <div className="flex items-center gap-1">
                        {STATUS_TIMELINE.map((step, idx) => {
                          const completed = currentStepIndex >= idx;
                          const isCurrent = currentStepIndex === idx;
                          return (
                            <div key={step} className="flex-1 flex items-center">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-[8px] uppercase tracking-[0.15em] border ${
                                    completed ? "bg-chrome text-background border-chrome" : "border-chrome/30 text-chrome-dim/40"
                                  } ${isCurrent ? "ring-2 ring-chrome/30" : ""}`}
                                >
                                  {completed ? "✓" : idx + 1}
                                </div>
                                <span
                                  className={`font-mono text-[9px] uppercase tracking-[0.15em] hidden sm:inline ${
                                    completed ? "text-chrome" : "text-chrome-dim/40"
                                  }`}
                                >
                                  {step}
                                </span>
                              </div>
                              {idx < STATUS_TIMELINE.length - 1 && (
                                <div className={`flex-1 h-px mx-2 ${completed ? "bg-chrome/50" : "bg-chrome/10"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Items detail */}
                    <div className="space-y-3">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-chrome-dim">Items</span>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-start gap-4 text-xs font-mono">
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate">{item.name}</p>
                              {(item.size || item.color) && (
                                <p className="text-[9px] text-chrome-dim/60 mt-0.5">
                                  {[item.size, item.color].filter(Boolean).join(" / ")}
                                </p>
                              )}
                              <p className="text-[10px] text-chrome-dim">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-chrome shrink-0">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-3 font-mono text-xs text-chrome-dim">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-chrome-dim">Address & Summary</span>
                      <div className="rounded-xl border border-chrome/10 bg-graphite-2 p-3 text-[10px] leading-relaxed">
                        <p className="text-foreground">{order.customerName}</p>
                        <p className="text-chrome-dim/80">{order.shippingAddress.street}</p>
                        <p className="text-chrome-dim/80">{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px]">
                          <span>Subtotal</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Shipping</span>
                          <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                        </div>
                        {order.discount && order.discount > 0 && (
                          <div className="flex justify-between text-[11px] text-green-400">
                            <span>Discount</span>
                            <span>-{formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[12px] text-chrome font-semibold border-t border-chrome/15 pt-1 mt-1">
                          <span>Total</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
