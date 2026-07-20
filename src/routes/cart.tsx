import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartContext } from "@/lib/cart-context";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Cart — VintageCvunt" },
      { name: "description", content: "Your VintageCvunt shopping cart." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;
const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartContext();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

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
            — Your Ledger
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">Shopping</span><br />
            <span>Cart</span>
          </motion.h1>
        </div>
      </section>

      <section className="border-y border-chrome py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="font-display text-7xl italic text-chrome-dim/30 mb-6">◇</div>
              <h2 className="font-display text-3xl md:text-4xl text-chrome-dim">Your ledger is empty</h2>
              <p className="mt-3 font-mono text-xs text-chrome-dim/50">Objects await your discovery</p>
              <Link to="/shop" className="mt-8 btn-chrome btn-chrome-inner">
                <span className="btn-label">Browse Collection</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-8 md:gap-16">
              {/* Items */}
              <div className="col-span-12 md:col-span-8 space-y-4">
                {cart.items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                    className="flex items-center gap-4 md:gap-6 rounded-2xl border border-chrome/20 bg-graphite/50 p-4 md:p-5"
                  >
                    <Link to="/products/$slug" params={{ slug: item.slug }} className="shrink-0">
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border border-chrome/30">
                        <OptimizedImage webp={item.webp} fallback={item.src} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to="/products/$slug" params={{ slug: item.slug }} className="font-display text-base md:text-xl text-foreground hover:text-chrome transition-colors truncate block">
                        {item.name}
                      </Link>
                      <p className="font-mono text-sm text-chrome mt-1">{priceLabel(item.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-0 rounded-lg border border-chrome/30 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 grid place-items-center text-sm text-chrome-dim hover:bg-graphite-2 transition-colors"
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
                            className="h-8 w-12 bg-transparent text-center font-mono text-sm text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 grid place-items-center text-sm text-chrome-dim hover:bg-graphite-2 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-sm text-chrome">{priceLabel(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="col-span-12 md:col-span-4">
                <div className="sticky top-28 rounded-2xl border border-chrome bg-graphite p-6 md:p-8" style={{ boxShadow: "var(--shadow-plate)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Order Summary</span>
                  <div className="divider-chrome my-6" />
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <span className="font-mono text-xs text-chrome-dim truncate max-w-[180px]">{item.name} × {item.quantity}</span>
                        <span className="font-mono text-xs text-chrome shrink-0 ml-2">{priceLabel(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="divider-chrome my-6" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Subtotal</span>
                    <span className="font-mono text-lg text-chrome">{priceLabel(cartTotal)}</span>
                  </div>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim/50">Shipping calculated at checkout</p>
                  <Link to="/checkout" className="mt-6 btn-chrome btn-chrome-inner w-full justify-center">
                    <span className="btn-label">Checkout</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
                  </Link>
                  <Link to="/shop" className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
