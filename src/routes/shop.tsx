import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
import { OptimizedImage } from "@/components/OptimizedImage";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

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
  const [catOpen, setCatOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [sort, setSort] = useState(sortOptions[0]);

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
      <SiteNav />

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
      <section className="sticky top-0 z-40 border-y border-chrome bg-graphite">
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-3 md:py-5">
          <div className="flex flex-nowrap items-center gap-1.5 md:gap-6 overflow-visible">
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
                    className="absolute top-full left-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[220px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
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
                    className="absolute top-full left-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[260px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
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
                    className="absolute top-full right-0 max-md:right-0 max-md:left-auto mt-2 z-50 min-w-[160px] md:min-w-[240px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-chrome bg-graphite-2"
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

      <SiteFooter />
    </div>
  );
}
