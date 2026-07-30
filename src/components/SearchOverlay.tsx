import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrency } from "@/lib/currency-context";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const allProducts = useQuery(api.products.list, open ? {} : "skip") ?? [];
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (open) {
      setQuery("");
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

  const filtered = query.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const goToProduct = (slug: string) => {
    onClose();
    navigate({ to: "/products/$slug", params: { slug } });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 backdrop-blur-xl pt-[15vh] md:pt-[18vh]"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="w-full max-w-2xl px-4 md:px-6"
          >
            {/* Search Field */}
            <div className="relative">
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
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search objects…"
                className="w-full rounded-2xl border border-chrome/40 bg-graphite/80 pl-12 pr-12 py-5 font-display text-xl md:text-2xl text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/80 transition-colors backdrop-blur"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-chrome-dim/50 hover:text-foreground transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="absolute -right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 hover:text-foreground transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="mt-6" style={{ maxHeight: "55vh", overflowY: "auto", overscrollBehavior: "contain" }}>
              {query.trim() && filtered.length === 0 && (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl text-chrome-dim italic">No objects found</p>
                  <p className="mt-2 font-mono text-xs text-chrome-dim/50">Try a different search term</p>
                </div>
              )}
              {filtered.length > 0 && (
                <div className="space-y-2">
                  {filtered.map((p) => (
                    <button
                      key={p._id}
                      onClick={() => goToProduct(p.slug)}
                      className="flex items-center gap-4 w-full rounded-2xl border border-chrome/20 bg-graphite/60 hover:bg-graphite p-3 md:p-4 text-left transition-all group backdrop-blur"
                    >
                      <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-xl border border-chrome/30">
                        <img src={p.images?.[0] || "/placeholder.svg"} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg md:text-xl text-foreground group-hover:text-chrome transition-colors truncate">{p.name}</p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-dim">{p.category}</p>
                      </div>
                      <span className="font-mono text-sm text-chrome shrink-0">{formatPrice(p.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
