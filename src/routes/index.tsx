import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import logoAsset from "@/assets/logo.png";
import butterflyAsset from "@/assets/butterfly-img.png";
import sculptureAsset from "@/assets/sculpture.png";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import productRing from "@/assets/product-ring.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productChain from "@/assets/product-chain.jpg";
import productBoots from "@/assets/product-boots.jpg";
import { ChromeCursor } from "@/components/ChromeCursor";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "VintageCvunt — Modern Gothic Luxury House" },
      { name: "description", content: "An interactive luxury fashion campaign in chrome, leather and silver. Explore VintageCvunt's inaugural collection." },
      { property: "og:image", content: butterflyAsset },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ChromeCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Featured />
      <SculptureSection />
      <BestSellers />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
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
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-black" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black truncate">VentageCvunt</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70">
          {["Home", "Shop", "About Us", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="relative transition-colors hover:text-black">
              {l}
            </a>
          ))}
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

      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
        className="overflow-hidden mx-auto max-w-7xl px-3"
      >
        <div className="rounded-3xl border border-chrome bg-white p-6 flex flex-col gap-6" style={{ boxShadow: "var(--shadow-plate)" }}>
          <nav className="flex flex-col gap-6 font-mono text-sm uppercase tracking-[0.24em] text-black/70">
            {["Home", "Shop", "About Us", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="h-px w-full bg-black/10" />
          <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-black/70">
            <button className="text-left hover:text-black transition-colors" onClick={() => setMenuOpen(false)}>Search</button>
            <button className="text-left hover:text-black transition-colors" onClick={() => setMenuOpen(false)}>Account</button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-32">
      {/* Architectural grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
        backgroundSize: "88px 88px",
      }} />
      {/* Corner tribal SVG ornaments */}
      <CornerOrnament className="absolute top-24 left-6 h-24 w-24 opacity-40" />
      <CornerOrnament className="absolute top-24 right-6 h-24 w-24 opacity-40 -scale-x-100" />

      {/* Butterfly — one-time intro reveal, then still */}
      <motion.div
        style={{ y: heroY }}
        initial={{ scale: 0.6, clipPath: "inset(50% 0 50% 0)" }}
        animate={{ scale: 1, clipPath: "inset(0% 0 0% 0)" }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <img
          src={butterflyAsset}
          alt=""
          width={1400}
          height={1050}
          fetchPriority="high"
          className="h-[42vh] sm:h-[52vh] md:h-[62vh] w-full object-contain max-w-[92vw] select-none"
          style={{ filter: "drop-shadow(0 25px 55px oklch(0.7 0.008 240 / 0.25))" }}
          draggable={false}
        />
      </motion.div>

      {/* Vertical side rails */}
      <div className="pointer-events-none absolute left-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
        <span className="[writing-mode:vertical-rl] rotate-180">N 41°24′ · E 2°10′</span>
        <div className="h-40 w-px bg-brushed opacity-60" />
        <span className="[writing-mode:vertical-rl] rotate-180">Est. MMXXVI</span>
      </div>
      <div className="pointer-events-none absolute right-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
        <span className="[writing-mode:vertical-rl]">Chapter One</span>
        <div className="h-40 w-px bg-brushed opacity-60" />
        <span className="[writing-mode:vertical-rl]">Objects / Chrome / Bone</span>
      </div>

      {/* Copy */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-[76vh] w-full items-end justify-between gap-10 px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.8 }}
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6"
          >
            — VintageCvunt · Autumn / Winter Campaign No. 01
          </motion.p>
          <h1 className="font-display text-[clamp(2.4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">
            <MaskLine delay={1.0}><span className="italic text-chrome">Vintage</span></MaskLine>
            <MaskLine delay={1.15}><span>Cvunt</span></MaskLine>
          </h1>
        </div>
        <div className="space-y-6 max-w-md md:pb-4">
          <div className="space-y-2 text-sm leading-relaxed text-chrome-dim">
            <MaskLine delay={1.3}>A gothic house rendered in liquid metal.</MaskLine>
            <MaskLine delay={1.4}>Sixty-two pieces cast in silver, leather</MaskLine>
            <MaskLine delay={1.5}>and the cold breath of cathedral air.</MaskLine>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.7 }}>
            <button className="btn-chrome btn-chrome-inner">
              <span className="btn-label">Enter the Collection</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative z-10 border-y border-chrome bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
          <span>001 / 062 objects</span>
          <span className="hidden sm:inline">Cast in Milano</span>
          <span className="hidden md:inline">Shipping worldwide</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="inline-block h-3 w-px bg-chrome animate-pulse" />
          </span>
        </div>
      </div>
    </section>
  );
}

function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="cornOrn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.95 0 0)" />
          <stop offset="0.5" stopColor="oklch(0.5 0 0)" />
          <stop offset="1" stopColor="oklch(0.85 0 0)" />
        </linearGradient>
      </defs>
      <path d="M2 2 L45 2 M2 2 L2 45 M2 2 C 25 12, 40 25, 50 50" stroke="url(#cornOrn)" strokeWidth="0.6" />
      <path d="M8 8 L38 8 M8 8 L8 38" stroke="url(#cornOrn)" strokeWidth="0.4" opacity="0.6" />
      <path d="M2 2 L18 2 L 14 6 L 18 10 L 2 10 Z" fill="url(#cornOrn)" opacity="0.35" />
    </svg>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["Modern Gothic", "Cast in Chrome", "Cathedral Tailoring", "Hand-Finished", "Milano · Paris · Tokyo", "Chapter I", "Objects of Weight"];
  return (
    <section className="relative overflow-hidden border-b border-chrome bg-graphite py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10 font-display text-4xl md:text-6xl italic text-chrome">
            {it}
            <span className="text-chrome-dim">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */
function Featured() {
  return (
    <section id="collection" className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-6">
            <SectionTag>§ Featured · Chapter I</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9] tracking-tight">
              <span className="italic text-chrome-h">The First</span><br />
              Seventeen Objects
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="text-sm leading-relaxed text-chrome-dim">
              A ceremonial capsule. Each piece is numbered, cast in a house atelier, and sealed by hand — a slow inheritance of weight, silver and shadow.
            </p>
          </div>
        </div>
        <div className="divider-chrome mb-16" />
        <div className="grid grid-cols-12 gap-6">
          <ProductCase span="col-span-12 md:col-span-7 md:row-span-2" src={editorial1} number="No. 001" name="Meridian Coat" price="€ 4,280" tall priority={true} />
          <ProductCase span="col-span-6 md:col-span-5" src={productRing} number="No. 007" name="Thorn Signet, Silver" price="€ 890" />
          <ProductCase span="col-span-6 md:col-span-5" src={productChain} number="No. 012" name="Papillon Chain" price="€ 1,340" />
        </div>
      </div>
    </section>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">{children}</span>;
}

function ProductCase({ span, src, number, name, price, tall, priority }: { span: string; src: string; number: string; name: string; price: string; tall?: boolean, priority?: boolean }) {
  return (
    <motion.div
      data-cursor="hover"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: priority ? "0px" : "-40px" }}
      transition={{ duration: 1.3, ease: EASE }}
      className={`${span} group relative overflow-hidden rounded-3xl border border-chrome bg-graphite`}
      style={{ boxShadow: "var(--shadow-plate)" }}
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[3/4] md:aspect-auto md:h-[820px]" : "aspect-[4/5]"}`}>
        <img src={src} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-[1deg]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
        <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome">{number}</span>
        <span className="absolute right-5 top-5 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]">✦</span>
      </div>
      <div className="flex items-end justify-between gap-4 px-6 py-5">
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight truncate">{name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">Hand-cast · Milano</p>
        </div>
        <div className="overflow-hidden">
          <div className="translate-y-1 transition-transform duration-500 group-hover:-translate-y-0">
            <p className="font-mono text-sm tracking-[0.14em] text-chrome">{price}</p>
          </div>
        </div>
      </div>
      {/* draw-in border */}
    </motion.div>
  );
}

/* ---------------- SCULPTURE SCROLL ---------------- */
function SculptureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]), { stiffness: 60, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.55, 1.9]), { stiffness: 60, damping: 22 });
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 4]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-chrome bg-background py-20 md:py-56">
      {/* Giant chrome word + subtitle floating opposite direction */}
      <motion.div style={{ x: wordX }} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center">
        <div className="font-display italic text-[22vw] leading-none text-chrome-h opacity-[0.14]">
          Ars · Chroma · Corpus
        </div>
        <div className="mt-2 font-mono text-[2.4vw] uppercase tracking-[0.4em] text-chrome-dim opacity-40">
          Art · Color · Body — Cast in Silver
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>§ Editorial · The Silver Body</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl italic tracking-tight">A Body Cast in Chrome</h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm text-chrome-dim">
            Filmed inside the Palazzo Argento — a study in flesh, drape and mirror. Scroll to move through the sculpture.
          </p>
        </div>
        <div className="divider-chrome mb-10 md:mb-16" />

        <div className="relative h-[60vh] md:h-[85vh] w-full">
          <motion.img
            src={sculptureAsset}
            alt="Chrome sculpture"
            fetchPriority="high"
            style={{ x, scale, rotate: rot }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-full object-cover md:h-[140%] md:w-auto md:object-contain -translate-x-1/2 -translate-y-1/2 select-none will-change-transform"
            draggable={false}
          />
          {/* Editorial captions */}
          <div className="absolute bottom-6 left-0 max-w-xs font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
            <p>Fig. 04 — Argenta<br />sculpture in motion</p>
          </div>
          <div className="absolute top-6 right-0 max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
            <p>MMXXVI · Milano<br />24° / 120mm / Kodak Vision</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEST SELLERS ---------------- */
function BestSellers() {
  const items = [
    { src: productJacket, name: "Reliquary Rider", num: "No. 021", price: "€ 3,690" },
    { src: productBoots, name: "Ossuary Boot", num: "No. 034", price: "€ 1,540" },
    { src: productRing, name: "Thorn Signet", num: "No. 007", price: "€ 890" },
    { src: productChain, name: "Papillon Chain", num: "No. 012", price: "€ 1,340" },
  ];
  return (
    <section className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">Most Coveted</h2>
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-dim hover:text-foreground transition">View all 62 objects ↗</a>
        </div>
        <div className="divider-chrome mb-14" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((it, i) => (
            <SmallCase key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SmallCase({ src, name, num, price }: { src: string; name: string; num: string; price: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={inView ? { clipPath: "inset(0 0 0 0)" } : undefined}
      transition={{ duration: 1.1, ease: EASE }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-chrome bg-graphite" style={{ boxShadow: "var(--shadow-plate)" }}>
        <div className="aspect-[4/5] overflow-hidden">
          <img src={src} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:rotate-[1deg]" />
        </div>
        <span className="absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]">{num}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-xl truncate">{name}</h3>
        <p className="font-mono text-xs tracking-[0.14em] text-chrome">{price}</p>
      </div>
    </motion.div>
  );
}

/* ---------------- CATEGORIES ---------------- */
function Categories() {
  const cats = [
    { name: "Outerwear", count: "18 pieces", img: editorial1 },
    { name: "Silverwork", count: "22 pieces", img: productRing },
    { name: "Footwear", count: "9 pieces", img: productBoots },
    { name: "Adornment", count: "13 pieces", img: productChain },
  ];
  return (
    <section id="archive" className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>§ Cabinets</SectionTag>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl md:text-7xl leading-tight">Four Cabinets, <span className="italic text-chrome-h">One House</span></h2>
          </div>
          <p className="max-w-sm text-sm text-chrome-dim">Enter each atelier — outerwear, silverwork, footwear and adornment — assembled by dedicated master craftsmen.</p>
        </div>
        <div className="divider-chrome mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <a key={i} href="#" data-cursor="hover" className="group relative block overflow-hidden rounded-3xl border border-chrome">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">{c.count}</p>
                <h3 className="mt-1 font-display text-3xl">{c.name}</h3>
                <div className="mt-4 h-px w-0 bg-chrome transition-all duration-700 group-hover:w-full" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- NEW ARRIVALS ---------------- */
function NewArrivals() {
  const rows = [
    { num: "046", name: "Argent Cross Pendant", cat: "Adornment", price: "€ 620" },
    { num: "047", name: "Basilica Trench, Onyx", cat: "Outerwear", price: "€ 5,120" },
    { num: "048", name: "Vesper Cuff, Brushed", cat: "Silverwork", price: "€ 780" },
    { num: "049", name: "Nave Boot, High", cat: "Footwear", price: "€ 1,880" },
    { num: "050", name: "Rosary of Iron", cat: "Adornment", price: "€ 940" },
  ];
  return (
    <section className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>§ New Arrivals · Week 42</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl leading-none italic">Just Cast</h2>
          </div>
          <button className="btn-chrome btn-chrome-inner"><span className="btn-label">Enter Archive</span></button>
        </div>
        <div className="divider-chrome" />
        <ul>
          {rows.map((r, i) => (
            <li key={i}>
              <a href="#" data-cursor="hover" className="group grid grid-cols-12 items-center gap-4 py-6 md:py-8 border-b border-chrome transition-colors hover:bg-graphite">
                <span className="col-span-2 md:col-span-1 font-mono text-xs text-chrome-dim">No. {r.num}</span>
                <span className="col-span-6 md:col-span-5 font-display text-2xl md:text-4xl transition-transform duration-700 group-hover:translate-x-3">{r.name}</span>
                <span className="col-span-4 md:col-span-4 font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-dim">{r.cat}</span>
                <span className="col-span-12 md:col-span-2 md:text-right font-mono text-sm text-chrome">{r.price}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM GRID ---------------- */
function InstagramGrid() {
  const imgs = [editorial1, productChain, editorial2, productRing, productJacket, productBoots];
  return (
    <section id="journal" className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag>§ Journal · @vintagecvunt</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl leading-none">From the <span className="italic">Corridors</span></h2>
          </div>
          <a href="#" className="font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-dim hover:text-foreground">Follow ↗</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {imgs.map((img, i) => (
            <a key={i} href="#" data-cursor="hover" className="group relative aspect-square overflow-hidden rounded-2xl border border-chrome">
              <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  return (
    <section className="relative border-b border-chrome overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
        <img src={butterflyAsset} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto opacity-20" />
        <div className="relative grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <SectionTag>§ Correspondence</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]">
              Receive <span className="italic text-chrome-h">the Ledger.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm text-chrome-dim">
              A hand-set letter, dispatched twice a year. Object releases, private previews, and the occasional dispatch from the atelier floor.
            </p>
          </div>
          <form className="col-span-12 md:col-span-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2 rounded-full border border-chrome bg-graphite p-2" style={{ boxShadow: "var(--shadow-plate)" }}>
              <input type="email" placeholder="your address" className="flex-1 bg-transparent px-5 py-3 font-mono text-sm placeholder:text-chrome-dim outline-none" />
              <button className="btn-chrome btn-chrome-inner !py-3 !px-6"><span className="btn-label">Enroll</span></button>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim">Two dispatches per year. Never sold.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center">
          <img src={logoAsset} alt="VintageCvunt" width={1400} height={400} className="h-auto w-full max-w-4xl opacity-95" />
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
  );
}
