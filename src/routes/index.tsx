import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import butterflyAsset from "@/assets/butterfly-img.png";
import butterflyWebp from "@/assets/butterfly-img.webp";
import sculptureAsset from "@/assets/sculpture.png";
import sculptureWebp from "@/assets/sculpture.webp";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial1Webp from "@/assets/editorial-1.webp";
import editorial2 from "@/assets/editorial-2.jpg";
import { ChromeCursor } from "@/components/ChromeCursor";
import { OptimizedImage } from "@/components/OptimizedImage";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "VintageCvunt — Modern Gothic Luxury House" },
      { name: "description", content: "An interactive luxury fashion campaign in chrome, leather and silver. Explore VintageCvunt's inaugural collection." },
      { property: "og:image", content: butterflyAsset },
    ],
    links: [
      { rel: "preload", href: butterflyWebp, as: "image", type: "image/webp", fetchPriority: "high" },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;
const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ChromeCursor />
      <SiteNav />
      <Hero />
      <Marquee />
      <Featured />
      <SculptureSection />
      <BestSellers />
      <Categories />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
        backgroundSize: "88px 88px",
      }} />
      <CornerOrnament className="absolute top-24 left-6 h-24 w-24 opacity-40" />
      <CornerOrnament className="absolute top-24 right-6 h-24 w-24 opacity-40 -scale-x-100" />

      <motion.div
        style={{ y: heroY }}
        initial={{ scale: 0.6, clipPath: "inset(50% 0 50% 0)" }}
        animate={{ scale: 1, clipPath: "inset(0% 0 0% 0)" }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <OptimizedImage
          webp={butterflyWebp}
          fallback={butterflyAsset}
          alt=""
          width={1400}
          height={1050}
          fetchPriority="high"
          className="h-[55vh] sm:h-[52vh] md:h-[62vh] w-full object-contain max-w-none select-none"
          style={{ filter: "drop-shadow(0 25px 55px oklch(0.7 0.008 240 / 0.25))" }}
          draggable={false}
        />
      </motion.div>

      <div className="pointer-events-none absolute left-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
        <span className="[writing-mode:vertical-rl] rotate-180">N 24°51′ · E 67°00′</span>
        <div className="h-40 w-px bg-brushed opacity-60" />
        <span className="[writing-mode:vertical-rl] rotate-180">Est. MMXXVI</span>
      </div>
      <div className="pointer-events-none absolute right-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
        <span className="[writing-mode:vertical-rl]">Chapter One</span>
        <div className="h-40 w-px bg-brushed opacity-60" />
        <span className="[writing-mode:vertical-rl]">Objects / Chrome / Bone</span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-[76vh] w-full items-end justify-between gap-10 px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-3xl w-full md:w-auto text-center md:text-left">
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.8 }}
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6"
          >
            — VintageCvunt · Autumn / Winter Campaign No. 01
          </motion.p>
          <h1 className="font-display text-[clamp(2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">
            <MaskLine delay={1.0}><span className="italic text-chrome">Vintage</span></MaskLine>
            <MaskLine delay={1.15}><span>Cvunt</span></MaskLine>
          </h1>
        </div>
        <div className="space-y-4 max-w-md md:pb-4 w-full md:w-auto flex flex-col items-center md:items-start">
          <div className="space-y-1 text-xs md:text-sm leading-relaxed text-chrome-dim text-center md:text-left">
            <MaskLine delay={1.3}>A gothic house rendered in liquid metal.</MaskLine>
            <MaskLine delay={1.4}>Sixty-two pieces cast in silver, leather</MaskLine>
            <MaskLine delay={1.5}>and the cold breath of cathedral air.</MaskLine>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.7 }}>
            <Link to="/shop" className="btn-chrome btn-chrome-inner">
              <span className="btn-label">Enter the Collection</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-y border-chrome bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">
          <span>001 / 062 objects</span>
          <span className="hidden sm:inline">Cast in Karachi</span>
          <span className="hidden md:inline">Shipping across Pakistan</span>
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
  const items = ["Modern Gothic", "Cast in Chrome", "Cathedral Tailoring", "Hand-Finished", "Karachi · Lahore · Islamabad", "Chapter I", "Objects of Weight"];
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
  const featured = useQuery(api.products.getFeatured) ?? [];

  if (featured.length === 0) {
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
          </div>
          <div className="divider-chrome mb-16" />
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-3xl text-chrome-dim italic">No featured products</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim">Mark products as featured in the admin panel</p>
          </div>
        </div>
      </section>
    );
  }

  const items = featured.slice(0, 3);
  const first = items[0];
  const rest = items.slice(1);

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
          <Link to="/products/$slug" params={{ slug: first.slug }} className="col-span-12 md:col-span-7 md:row-span-2">
            <ProductCase
              imageUrl={first.imageUrls?.[0] || "/placeholder.svg"}
              number="No. 001"
              name={first.name}
              price={priceLabel(first.price)}
              tall
              priority
            />
          </Link>
          {rest.map((p) => (
            <Link key={p._id} to="/products/$slug" params={{ slug: p.slug }} className="col-span-12 md:col-span-5">
              <ProductCase
                imageUrl={p.imageUrls?.[0] || "/placeholder.svg"}
                number=""
                name={p.name}
                price={priceLabel(p.price)}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">{children}</span>;
}

function ProductCase({ imageUrl, number, name, price, tall, priority }: { imageUrl: string; number: string; name: string; price: string; tall?: boolean; priority?: boolean }) {
  return (
    <motion.div
      data-cursor="hover"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.3, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-chrome bg-graphite"
      style={{ boxShadow: "var(--shadow-plate)" }}
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[3/4] md:aspect-auto md:h-[820px]" : "aspect-[3/4] md:aspect-[4/5]"}`}>
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-[1deg]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
        {number && <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome">{number}</span>}
        <span className="absolute right-5 top-5 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]">✦</span>
      </div>
      <div className="px-6 py-5">
        <p className="font-mono text-sm tracking-[0.14em] text-chrome">{price}</p>
      </div>
    </motion.div>
  );
}

/* ---------------- SCULPTURE SCROLL ---------------- */
function SculptureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]), { stiffness: 60, damping: 20 });
  const scaleRange = isDesktop ? [1.2, 3.2, 3.2] : [1.1, 1.55, 1.9];
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], scaleRange), { stiffness: 60, damping: 22 });
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 4]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-chrome bg-background py-20 md:py-56 mt-20 md:mt-0">
      <motion.div style={{ x: wordX }} className="pointer-events-none absolute inset-x-0 top-[55%] md:top-1/2 -translate-y-1/2 whitespace-nowrap text-center">
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
          <motion.div style={{ x, scale, rotate: rot }} className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-full md:h-[140%] md:w-auto -translate-x-1/2 -translate-y-1/2 select-none will-change-transform">
            <picture className="flex h-full w-full items-center justify-center">
              <source srcSet={sculptureWebp} type="image/webp" />
              <img src={sculptureAsset} alt="Chrome sculpture" fetchPriority="high" className="h-full w-full object-cover md:object-contain" draggable={false} />
            </picture>
          </motion.div>
          <div className="absolute bottom-6 left-0 max-w-xs font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
            <p>Fig. 04 — Argenta<br />sculpture in motion</p>
          </div>
          <div className="absolute top-6 right-0 max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
            <p>MMXXVI · Karachi<br />24° / 120mm / Kodak Vision</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEST SELLERS ---------------- */
function BestSellers() {
  const allProducts = useQuery(api.products.list) ?? [];

  return (
    <section className="relative border-b border-chrome py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">Most Coveted</h2>
          <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-dim hover:text-foreground transition">View all objects ↗</Link>
        </div>
        <div className="divider-chrome mb-14" />
        {allProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-3xl text-chrome-dim italic">No products added</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim">Add products in the admin panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {allProducts.slice(0, 4).map((p) => (
              <Link key={p._id} to="/products/$slug" params={{ slug: p.slug }}>
                <SmallCase
                  imageUrl={p.imageUrls?.[0] || "/placeholder.svg"}
                  name={p.name}
                  price={priceLabel(p.price)}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SmallCase({ imageUrl, name, price }: { imageUrl: string; name: string; price: string }) {
  return (
    <motion.div
      data-cursor="hover"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-chrome bg-graphite" style={{ boxShadow: "var(--shadow-plate)" }}>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:rotate-[1deg]"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-mono text-xs tracking-[0.14em] text-chrome">{price}</p>
      </div>
    </motion.div>
  );
}

/* ---------------- COLLECTIONS / CATEGORIES ---------------- */
function Categories() {
  const collections = useQuery(api.collections.list) ?? [];
  const allProducts = useQuery(api.products.list) ?? [];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allProducts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  const cats = useMemo(() => {
    if (collections.length > 0) {
      return collections.filter((c) => c.isActive).map((c) => {
        const count = categoryCounts[c.name] || 0;
        return {
          name: c.name,
          imageUrl: (c as any).imageUrl,
          count: `${count} piece${count !== 1 ? "s" : ""}`,
          link: "/shop",
        };
      });
    }
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      imageUrl: undefined,
      count: `${count} piece${count !== 1 ? "s" : ""}`,
      link: "/shop",
    }));
  }, [collections, categoryCounts]);

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
        {cats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-3xl text-chrome-dim italic">No collections yet</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim">Create collections in the admin panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {cats.map((c, i) => (
              <Link key={i} to={c.link} data-cursor="hover" className="group relative block overflow-hidden rounded-3xl border border-chrome">
                <div className="aspect-[3/4] overflow-hidden bg-graphite-2 flex items-center justify-center">
                  {c.imageUrl ? (
                    <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                  ) : (
                    <div className="font-display text-6xl text-chrome-dim/20 italic">{c.name.charAt(0)}</div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">{c.count}</p>
                  <h3 className="mt-1 font-display text-3xl">{c.name}</h3>
                  <div className="mt-4 h-px w-0 bg-chrome transition-all duration-700 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  return (
    <section className="relative border-b border-chrome overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
        <OptimizedImage webp={butterflyWebp} fallback={butterflyAsset} alt="" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto opacity-20" />
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
