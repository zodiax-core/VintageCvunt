import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "@/lib/cart-context";
import { useAuthContext } from "@/lib/auth-context";
import { SearchOverlay } from "@/components/SearchOverlay";
import { CartDrawer } from "@/components/CartDrawer";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCartContext();
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isDesktop = () => window.innerWidth >= 768;

  const handleCartClick = () => {
    if (isDesktop()) {
      navigate({ to: "/cart" });
    } else {
      setCartOpen(true);
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "px-3 pt-3" : "px-6 pt-6"}`}
      >
        <div
          className={`relative mx-auto flex items-center justify-between gap-4 rounded-3xl border border-chrome bg-white transition-all duration-500 ${scrolled ? "max-w-6xl px-5 py-2.5" : "max-w-7xl px-7 py-4"}`}
          style={{ boxShadow: "var(--shadow-plate)" }}
        >
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-black" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black truncate">VintageCvunt</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70">
            <Link to="/" className="relative transition-colors hover:text-black">Home</Link>
            <Link to="/shop" className="relative transition-colors hover:text-black">Shop</Link>
            <Link to="/about" className="relative transition-colors hover:text-black">About Us</Link>
            <Link to="/contact" className="relative transition-colors hover:text-black">Contact</Link>
          </nav>

          <div className="flex items-center justify-end gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black">
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {isAdmin ? (
              <Link to="/admin" className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.2em] bg-foreground text-background px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity">
                Admin
              </Link>
            ) : user ? (
              <span className="hidden md:inline font-mono text-[11px] text-chrome truncate max-w-[100px]">
                {user.name.split(" ")[0]}
              </span>
            ) : (
              <Link to="/auth" className="hidden md:inline hover:opacity-70 transition-opacity">Account</Link>
            )}

            <button onClick={handleCartClick} className="flex items-center hover:opacity-70 transition-opacity">
              <span className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-medium border border-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
            </button>

            <button className="md:hidden flex flex-col items-center justify-center gap-1.5 h-8 w-8 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[1px] w-5 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden mx-auto max-w-7xl px-3"
            >
              <div className="rounded-3xl border border-chrome bg-white p-6 flex flex-col gap-6" style={{ boxShadow: "var(--shadow-plate)" }}>
                <nav className="flex flex-col gap-6 font-mono text-sm uppercase tracking-[0.24em] text-black/70">
                  <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">Home</Link>
                  <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">Shop</Link>
                  <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">About Us</Link>
                  <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">Contact</Link>
                </nav>
                <div className="h-px w-full bg-black/10" />
                <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70">
                  <button className="text-left hover:text-black transition-colors" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>Search</button>
                  <Link to="/auth" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">Account</Link>
                  <button className="text-left hover:text-black transition-colors" onClick={() => { setMenuOpen(false); handleCartClick(); }}>Cart ({cartCount})</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
