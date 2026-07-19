import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productRing from "@/assets/product-ring.jpg";
import productRingWebp from "@/assets/product-ring.webp";
import productJacket from "@/assets/product-jacket.jpg";
import productJacketWebp from "@/assets/product-jacket.webp";
import productChain from "@/assets/product-chain.jpg";
import productChainWebp from "@/assets/product-chain.webp";
import productBoots from "@/assets/product-boots.jpg";
import productBootsWebp from "@/assets/product-boots.webp";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial1Webp from "@/assets/editorial-1.webp";
import editorial2 from "@/assets/editorial-2.jpg";
import editorial2Webp from "@/assets/editorial-2.webp";
import logoAsset from "@/assets/logo.png";
import logoWebp from "@/assets/logo.webp";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — VintageCvunt" },
      { name: "description", content: "Browse the VintageCvunt collection. Outerwear, silverwork, footwear, and adornment." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  src: string;
  webp: string;
  num: string;
};

const allProducts: Product[] = [
  { id: 1, name: "Meridian Coat", category: "Outerwear", price: 1284000, src: editorial1, webp: editorial1Webp, num: "No. 001" },
  { id: 2, name: "Thorn Signet, Silver", category: "Silverwork", price: 267000, src: productRing, webp: productRingWebp, num: "No. 007" },
  { id: 3, name: "Papillon Chain", category: "Adornment", price: 402000, src: productChain, webp: productChainWebp, num: "No. 012" },
  { id: 4, name: "Reliquary Rider", category: "Outerwear", price: 1107000, src: productJacket, webp: productJacketWebp, num: "No. 021" },
  { id: 5, name: "Ossuary Boot", category: "Footwear", price: 462000, src: productBoots, webp: productBootsWebp, num: "No. 034" },
  { id: 6, name: "Argent Cross Pendant", category: "Adornment", price: 186000, src: productRing, webp: productRingWebp, num: "No. 046" },
  { id: 7, name: "Basilica Trench, Onyx", category: "Outerwear", price: 1536000, src: editorial2, webp: editorial2Webp, num: "No. 047" },
  { id: 8, name: "Vesper Cuff, Brushed", category: "Silverwork", price: 234000, src: productChain, webp: productChainWebp, num: "No. 048" },
  { id: 9, name: "Nave Boot, High", category: "Footwear", price: 564000, src: productBoots, webp: productBootsWebp, num: "No. 049" },
  { id: 10, name: "Rosary of Iron", category: "Adornment", price: 282000, src: productRing, webp: productRingWebp, num: "No. 050" },
  { id: 11, name: "Chrome Signet Ring", category: "Silverwork", price: 320000, src: productRing, webp: productRingWebp, num: "No. 003" },
  { id: 12, name: "Cathedral Scarf", category: "Outerwear", price: 185000, src: editorial1, webp: editorial1Webp, num: "No. 018" },
];

const categories = ["All", "Outerwear", "Silverwork", "Footwear", "Adornment"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under PKR 500k", min: 0, max: 500000 },
  { label: "PKR 500k — PKR 1M", min: 500000, max: 1000000 },
  { label: "Over PKR 1M", min: 1000000, max: Infinity },
];
const sortOptions = ["Featured", "Newest", "Price: Low — High", "Price: High — Low"];

const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

function Shop() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [sort, setSort] = useState(sortOptions[0]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const filtered = useMemo(() => {
    let result = category === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === category);
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    switch (sort) {
      case "Price: Low — High": result = [...result].sort((a, b) => a.price - b.price); break;
      case "Price: High — Low": result = [...result].sort((a, b) => b.price - a.price); break;
      case "Newest": result = [...result].sort((a, b) => b.id - a.id); break;
    }
    return result;
  }, [category, priceRange, sort]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* NAV */}
      <motion.header
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
            <Link to="/" className="transition-colors hover:text-black">Home</Link>
            <Link to="/shop" className="text-black">Shop</Link>
            <a href="#" className="transition-colors hover:text-black">About Us</a>
            <a href="#" className="transition-colors hover:text-black">Contact</a>
          </nav>
          <div className="flex items-center justify-end gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black">
            <button className="hidden sm:inline hover:opacity-70 transition-opacity">Search</button>
            <button className="hidden md:inline hover:opacity-70 transition-opacity">Account</button>
            <button className="flex items-center hover:opacity-70 transition-opacity">
              <span className="relative">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span className="absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-medium border border-white">0</span>
              </span>
            </button>
            <button className="md:hidden flex flex-col items-center justify-center gap-1.5 h-8 w-8 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-[1px] w-5 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-[1px] w-5 bg-black transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden mx-auto max-w-7xl px-3"
            >
              <div className="rounded-3xl border border-chrome bg-white p-6 flex flex-col gap-6" style={{ boxShadow: "var(--shadow-plate)" }}>
                <nav className="flex flex-col gap-6 font-mono text-sm uppercase tracking-[0.24em] text-black/70">
                  <Link to="/" className="hover:text-black transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                  <Link to="/shop" className="text-black" onClick={() => setMenuOpen(false)}>Shop</Link>
                  <a href="#" className="hover:text-black transition-colors">About Us</a>
                  <a href="#" className="hover:text-black transition-colors">Contact</a>
                </nav>
                <div className="h-px w-full bg-black/10" />
                <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70">
                  <button className="text-left hover:text-black transition-colors" onClick={() => setMenuOpen(false)}>Search</button>
                  <button className="text-left hover:text-black transition-colors" onClick={() => setMenuOpen(false)}>Account</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
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
            — The Collection · All Objects
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <span className="italic text-chrome-h">Sixty-Two</span><br />
            <span>Objects of Weight</span>
          </motion.h1>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-y border-chrome bg-graphite">
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-3 md:py-5">
          <div className="flex flex-nowrap items-center gap-1.5 md:gap-6 overflow-x-auto">
            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mr-2 shrink-0">Filter by</span>

            {/* Category dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => { setCatOpen(!catOpen); setPriceOpen(false); setSortOpen(false); }}
                className="flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap"
              >
                {category}
                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="absolute top-full left-0 max-md:left-0 max-md:right-auto mt-2 z-20 min-w-[180px] md:min-w-[220px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
                    style={{ boxShadow: "var(--shadow-heavy)" }}
                  >
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCategory(c); setCatOpen(false); }}
                        className={`block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${category === c ? 'text-chrome' : 'text-foreground/70'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => { setPriceOpen(!priceOpen); setCatOpen(false); setSortOpen(false); }}
                className="flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap"
              >
                {priceRange.label}
                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${priceOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <AnimatePresence>
                {priceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="absolute top-full left-0 max-md:left-0 max-md:right-auto mt-2 z-20 min-w-[180px] md:min-w-[260px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
                    style={{ boxShadow: "var(--shadow-heavy)" }}
                  >
                    {priceRanges.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => { setPriceRange(r); setPriceOpen(false); }}
                        className={`block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${priceRange.label === r.label ? 'text-chrome' : 'text-foreground/70'}`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim ml-auto mr-2 shrink-0">Sort by</span>

            {/* Sort dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => { setSortOpen(!sortOpen); setCatOpen(false); setPriceOpen(false); }}
                className="flex items-center gap-1 md:gap-3 rounded-full border border-chrome bg-graphite-2 px-2.5 py-1 md:px-5 md:py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-chrome/60 transition-colors whitespace-nowrap"
              >
                {sort}
                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="absolute top-full left-0 md:right-0 md:left-auto mt-2 z-20 min-w-[180px] md:min-w-[240px] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
                    style={{ boxShadow: "var(--shadow-heavy)" }}
                  >
                    {sortOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSort(s); setSortOpen(false); }}
                        className={`block w-full px-4 py-2.5 md:px-5 md:py-3 text-left font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-chrome/10 ${sort === s ? 'text-chrome' : 'text-foreground/70'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(category !== "All" || priceRange.label !== "All Prices" || sort !== "Featured") && (
              <button
                onClick={() => { setCategory("All"); setPriceRange(priceRanges[0]); setSort("Featured"); }}
                className="shrink-0 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim hover:text-chrome transition-colors ml-1 md:ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
              {filtered.length} object{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-4xl text-chrome-dim italic">No objects found</p>
              <button
                onClick={() => { setCategory("All"); setPriceRange(priceRanges[0]); setSort("Featured"); }}
                className="mt-6 btn-chrome btn-chrome-inner"
              >
                <span className="btn-label">Clear filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-chrome bg-graphite" style={{ boxShadow: "var(--shadow-plate)" }}>
                    <div className="aspect-[4/5] overflow-hidden">
                      <OptimizedImage webp={product.webp} fallback={product.src} alt={product.name} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                    </div>
                    <span className="absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]">{product.num}</span>
                    <span className="absolute right-3 top-3 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]">✦</span>
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-xs tracking-[0.14em] text-chrome">{priceLabel(product.price)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-background pt-24 pb-10 border-t border-chrome">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-center">
            <OptimizedImage webp={logoWebp} fallback={logoAsset} alt="VintageCvunt" width={1400} height={400} className="h-auto w-full max-w-4xl opacity-95" />
          </div>
          <div className="divider-chrome my-14" />
          <div className="grid grid-cols-2 gap-10 md:grid-cols-5 text-sm">
            {[
              { h: "Atelier", l: ["Milano", "Paris", "Tokyo", "Bookings"] },
              { h: "Objects", l: ["Outerwear", "Silverwork", "Footwear", "Adornment"] },
              { h: "House", l: ["Manifesto", "Craftsmen", "Materials", "Sustainability"] },
              { h: "Service", l: ["Shipping", "Returns", "Care", "Contact"] },
              { h: "Follow", l: ["Instagram", "Journal", "Pinterest", "Discord"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">{c.h}</div>
                <ul className="mt-4 space-y-2 font-display text-lg">
                  {c.l.map((x) => <li key={x}><a href="#" className="hover:text-chrome transition-colors">{x}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chrome pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
            <span>© MMXXVI VintageCvunt · Casa d'Argento</span>
            <span>Milano · N 45°27′ E 9°11′</span>
            <span>Privacy · Terms · Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
