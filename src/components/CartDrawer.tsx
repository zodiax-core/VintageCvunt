import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCartContext } from "@/lib/cart-context";
import { OptimizedImage } from "@/components/OptimizedImage";

const EASE = [0.32, 0.72, 0, 1] as const;
const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleCheckout = () => {
    onClose();
    navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-[80] flex flex-col rounded-t-3xl border-t border-chrome bg-background max-h-[85vh]"
            style={{ boxShadow: "0 -20px 60px -20px oklch(0 0 0 / 0.8)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-chrome/30">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Your Ledger</span>
                <p className="font-mono text-xs text-chrome-dim/60">{cartCount} {cartCount === 1 ? "object" : "objects"}</p>
              </div>
              <button onClick={onClose} className="h-8 w-8 rounded-full border border-chrome/40 grid place-items-center hover:bg-graphite transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="font-display text-5xl italic text-chrome-dim/30 mb-4">◇</div>
                  <p className="font-display text-2xl text-chrome-dim">Your ledger is empty</p>
                  <p className="mt-2 font-mono text-xs text-chrome-dim/50">Objects await your discovery</p>
                  <Link to="/shop" onClick={onClose} className="mt-6 btn-chrome btn-chrome-inner">
                    <span className="btn-label">Browse Collection</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-chrome/20 bg-graphite/50 p-3">
                      <Link to="/products/$slug" params={{ slug: item.slug }} onClick={onClose} className="shrink-0">
                        <div className="h-16 w-16 rounded-xl overflow-hidden border border-chrome/30">
                          <OptimizedImage webp={item.webp} fallback={item.src} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to="/products/$slug" params={{ slug: item.slug }} onClick={onClose} className="font-display text-base text-foreground hover:text-chrome transition-colors truncate block">
                          {item.name}
                        </Link>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="font-mono text-[9px] text-chrome-dim/60 mt-0.5">
                            {[item.selectedSize, item.selectedColor].filter(Boolean).join(" / ")}
                          </p>
                        )}
                        <p className="font-mono text-xs text-chrome mt-0.5">{priceLabel(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-0 rounded-lg border border-chrome/30 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) updateQuantity(item.id, Math.max(1, val));
                              }}
                              className="h-7 w-10 bg-transparent text-center font-mono text-xs text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 grid place-items-center text-xs text-chrome-dim hover:bg-graphite-2 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-chrome-dim/50 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-chrome/30 px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Subtotal</span>
                  <span className="font-mono text-lg text-chrome">{priceLabel(cartTotal)}</span>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim/50">Shipping calculated at checkout</p>
                <button onClick={handleCheckout} className="btn-chrome btn-chrome-inner w-full justify-center">
                  <span className="btn-label">Checkout</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
