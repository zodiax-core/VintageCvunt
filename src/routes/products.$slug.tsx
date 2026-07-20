import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial1Webp from "@/assets/editorial-1.webp";
import editorial2 from "@/assets/editorial-2.jpg";
import editorial2Webp from "@/assets/editorial-2.webp";
import productRing from "@/assets/product-ring.jpg";
import productRingWebp from "@/assets/product-ring.webp";
import productJacket from "@/assets/product-jacket.jpg";
import productJacketWebp from "@/assets/product-jacket.webp";
import productChain from "@/assets/product-chain.jpg";
import productChainWebp from "@/assets/product-chain.webp";
import productBoots from "@/assets/product-boots.jpg";
import productBootsWebp from "@/assets/product-boots.webp";
import { OptimizedImage } from "@/components/OptimizedImage";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartContext } from "@/lib/cart-context";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl italic text-chrome-h">404</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-chrome-dim">Object not found</p>
        <Link to="/shop" className="mt-8 inline-block btn-chrome btn-chrome-inner">
          <span className="btn-label">Return to shop</span>
        </Link>
      </div>
    </div>
  ),
  head: ({ params }) => {
    const product = allProducts.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: product ? `${product.name} — VintageCvunt` : "Object — VintageCvunt" },
        { name: "description", content: product ? `${product.name}. ${product.category}. ${priceLabel(product.price)}` : "VintageCvunt object detail." },
      ],
    };
  },
});

const EASE = [0.16, 1, 0.3, 1] as const;

type ProductDetail = {
  id: number;
  name: string;
  category: string;
  price: number;
  num: string;
  slug: string;
  src: string;
  webp: string;
  description: string;
  details: string[];
  materials: string[];
  dimensions: string;
};

const allProducts: ProductDetail[] = [
  { id: 1, name: "Meridian Coat", category: "Outerwear", price: 1284000, num: "No. 001", slug: "meridian-coat", src: editorial1, webp: editorial1Webp, description: "A floor-length coat cut from a single panel of bonded chrome leather. The Meridian traces the spine — a seam runs from the nape to the hem, dividing the body into two equal fields of silver. Four concealed pockets, horn buttons, and a silk-blend interior lining.", details: ["Single-panel bonded leather construction", "Full-length centre-back seam", "Four concealed snap pockets", "Horn-button closure", "Silk-blend lined interior", "Made in Milano"], materials: ["Bonded chrome leather (Italy)", "Horn buttons (France)", "Silk-blend lining (Como)"], dimensions: "Length: 142cm · Chest: 112cm · Shoulder: 48cm" },
  { id: 2, name: "Thorn Signet, Silver", category: "Silverwork", price: 267000, num: "No. 007", slug: "thorn-signet-silver", src: productRing, webp: productRingWebp, description: "A signet ring cast in recycled ecclesiastical silver. The band is sculpted as a twisted thorn vine, with a flat bezel bearing the house mark — a C crossed with an arrow. Hand-finished with a brushed surface and polished highlights.", details: ["Recycled ecclesiastical silver (925)", "Twisted thorn-vine band", "House-mark bezel engraving", "Brushed finish with polished highlights", "Hand-finished in Milano", "Presentation box included"], materials: ["Recycled silver 925 (Italy)", "Microcrystalline wax polishing"], dimensions: "Band width: 8mm · Bezel: 14mm × 12mm · Weight: 18g" },
  { id: 3, name: "Papillon Chain", category: "Adornment", price: 402000, num: "No. 012", slug: "papillon-chain", src: productChain, webp: productChainWebp, description: "A 72cm chain composed of hand-assembled butterfly-wing links. Each link is cast individually, then filed and polished before assembly. The clasp is a concealed butterfly mechanism — the chain appears seamless when fastened.", details: ["72cm hand-assembled chain", "Butterfly-wing link design", "Concealed butterfly clasp", "Individually cast and finished links", "Anti-tarnish treated", "Arrives in a linen pouch"], materials: ["Chrome-plated brass (base)", "Silver-soldered joints", "Anti-tarnish nano-coating"], dimensions: "Length: 72cm · Link width: 6mm · Weight: 42g" },
  { id: 4, name: "Reliquary Rider", category: "Outerwear", price: 1107000, num: "No. 021", slug: "reliquary-rider", src: productJacket, webp: productJacketWebp, description: "A cropped rider jacket in heavyweight chrome-embossed calf leather. Asymmetric zip closure with a sculpted lapel that folds into a high collar. The back panel features a blind-stamped archival motif.", details: ["Heavyweight chrome-embossed calf leather", "Asymmetric zip closure", "Sculpted fold-over lapel collar", "Blind-stamped archival motif on back", "Two zip hand pockets", "Quilted satin lining"], materials: ["Calf leather, chrome embossed (Tuscany)", "YKK Excella zippers (Japan)", "Satin lining (France)"], dimensions: "Length: 58cm · Chest: 104cm · Sleeve: 64cm" },
  { id: 5, name: "Ossuary Boot", category: "Footwear", price: 462000, num: "No. 034", slug: "ossuary-boot", src: productBoots, webp: productBootsWebp, description: "A high-top boot constructed from a single piece of shell-cordovan leather. The silhouette is architectural — a straight shaft rising from a sculpted sole. Goodyear-welted with a chrome-plated steel toe cap.", details: ["Single-piece shell-cordovan construction", "Goodyear welted sole", "Chrome-plated steel toe cap", "Leather-lined interior", "Vibram® Christy outsole", "Lasted in Milano"], materials: ["Shell cordovan (Chicago)", "Chrome-plated steel (Germany)", "Vibram® Christy outsole"], dimensions: "Shaft height: 18cm · Heel: 3cm · Available in EU 39–46" },
  { id: 6, name: "Argent Cross Pendant", category: "Adornment", price: 186000, num: "No. 046", slug: "argent-cross-pendant", src: productRing, webp: productRingWebp, description: "A pendant in the form of a minimalist cross, forged from oxidized silver. The surface is textured with a hand-stippled finish that catches light unevenly. Suspended from a 56cm rolo chain.", details: ["Oxidized silver 925", "Hand-stippled surface texture", "56cm rolo chain included", "Spring-ring clasp", "Arrives in a felt-lined box"], materials: ["Oxidized silver 925", "Stainless steel spring ring"], dimensions: "Cross: 42mm × 26mm · Chain: 56cm · Weight: 12g" },
  { id: 7, name: "Basilica Trench, Onyx", category: "Outerwear", price: 1536000, num: "No. 047", slug: "basilica-trench-onyx", src: editorial2, webp: editorial2Webp, description: "A double-breasted trench coat in onyx-black bonded chrome fabric. The cut is severe — wide lapels, a suppressed waist, and a dramatic sweep to the hem. Epaulettes and cuff straps in matching chrome leather.", details: ["Double-breasted trench silhouette", "Bonded chrome fabric in onyx black", "Wide peak lapels", "Suppressed waist with belt", "Epaulettes and cuff straps", "Storm flap and gun patch"], materials: ["Bonded chrome fabric (Italy)", "Chrome leather trims", "Horn-effect buttons"], dimensions: "Length: 128cm · Chest: 114cm · Sleeve: 66cm" },
  { id: 8, name: "Vesper Cuff, Brushed", category: "Silverwork", price: 234000, num: "No. 048", slug: "vesper-cuff-brushed", src: productChain, webp: productChainWebp, description: "A wide cuff bracelet in brushed silver, with a subtle architectural bevel along each edge. The interior is stamped with the house coordinates. Opens and closes on a concealed hinge.", details: ["Brushed silver 925 construction", "Architectural bevel detailing", "Concealed hinge mechanism", "Interior house-coordinate stamp", "Hand-polished edges", "Presentation box included"], materials: ["Silver 925, brushed finish", "Steel hinge pin"], dimensions: "Width: 55mm · Inner circumference: 19cm · Weight: 34g" },
  { id: 9, name: "Nave Boot, High", category: "Footwear", price: 564000, num: "No. 049", slug: "nave-boot-high", src: productBoots, webp: productBootsWebp, description: "A knee-high boot in black calf with a chrome-patent shaft. The silhouette is inspired by cathedral nave columns — ribbed panels run vertically. Side zip for easy entry. Leather sole with chrome-studded rubber grip.", details: ["Knee-high shaft, black calf", "Chrome-patent ribbed panels", "Side zip entry", "Leather sole with chrome studs", "Cushioned leather insole", "Made in Milano"], materials: ["Black calf leather (France)", "Chrome-patent accent panels", "Leather sole with rubber grip inserts"], dimensions: "Shaft height: 38cm · Heel: 4.5cm · Available in EU 38–45" },
  { id: 10, name: "Rosary of Iron", category: "Adornment", price: 282000, num: "No. 050", slug: "rosary-of-iron", src: productRing, webp: productRingWebp, description: "A rosary of sixty-two hand-forged iron beads, each one faceted on seven sides. Strung on a braided steel cable with a chrome crucifix pendant. Each bead is a meditation on weight and repetition.", details: ["62 hand-forged iron beads", "Seven-sided faceted beads", "Braided steel cable cord", "Chrome crucifix pendant", "Knot-tied construction", "Arrives in a steel box"], materials: ["Hand-forged iron beads", "Braided steel cable", "Chrome-plated brass crucifix"], dimensions: "Length: 68cm · Bead diameter: 8mm · Weight: 86g" },
  { id: 11, name: "Chrome Signet Ring", category: "Silverwork", price: 320000, num: "No. 003", slug: "chrome-signet-ring", src: productRing, webp: productRingWebp, description: "A heavy signet ring in polished chrome with a carved obsidian inset. The bezel is a truncated pyramid — the obsidian is set in a rub-over mount. The band tapers from 10mm at the top to 4mm at the base.", details: ["Polished chrome band", "Carved obsidian inset", "Truncated pyramid bezel", "Rub-over setting", "Tapered band 10mm–4mm", "Hand-finished in Milano"], materials: ["Chrome-plated brass", "Obsidian (Brazil)", "Silver-soldered setting"], dimensions: "Band width: 4–10mm · Bezel: 16mm × 12mm · Weight: 22g" },
  { id: 12, name: "Cathedral Scarf", category: "Outerwear", price: 185000, num: "No. 018", slug: "cathedral-scarf", src: editorial1, webp: editorial1Webp, description: "An oversized scarf woven from a blend of merino wool and chrome filament. The weave creates a subtle architectural grid. Finished with hand-knotted fringe at both ends. Wraps twice around the neck.", details: ["Oversized 200cm length", "Merino wool and chrome filament", "Architectural grid weave", "Hand-knotted fringe", "Unisex design", "Dry clean only"], materials: ["Merino wool (Australia)", "Chrome filament (Italy)"], dimensions: "200cm × 40cm · Fringe: 6cm" },
];

const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

const faqs = [
  { q: "How is this object numbered?", a: "Every VintageCvunt object carries a unique number corresponding to its place in the collection sequence. This number is engraved or stamped directly onto the piece and recorded in our ledger." },
  { q: "Can I return or exchange?", a: "Returns are accepted within 14 days of receipt. The object must be returned in its original packaging with all documentation. Bespoke and commissioned pieces are final sale." },
  { q: "How long does shipping take?", a: "Domestic orders (Italy) arrive within 2–3 business days. International shipping takes 5–10 business days. All shipments are insured and require a signature." },
  { q: "How should I care for this piece?", a: "Each material requires specific care. A care card is included with every object. For silver, we recommend a dry cloth and storage in the provided pouch. Chrome can be wiped with a damp, lint-free cloth." },
  { q: "Is this piece available for bespoke modification?", a: "Select objects can be customized — contact the atelier via our contact page for enquiries about sizing, material variations, or commissioned pieces." },
];

const reviews = [
  { name: "C. Argento", rating: 5, text: "Exceptional quality. The weight of the piece in the hand tells you everything — this is not mass-produced. The finish is flawless.", date: "MMXXVI · Mar" },
  { name: "L. Mori", rating: 5, text: "I own three pieces from Chapter I. The consistency of the craftsmanship across different object types is remarkable. A house to watch.", date: "MMXXVI · Feb" },
  { name: "V. Kurov", rating: 4, text: "Beautiful object, true to the campaign imagery. The packaging alone is a work of art. My only note is the sizing runs slightly large.", date: "MMXXVI · Jan" },
  { name: "E. Thornton", rating: 5, text: "The leather has developed a beautiful patina over three months of wear. It feels like an inheritance, not a purchase.", date: "MMXXV · Dec" },
];

const relatedProducts = allProducts.slice(0, 4);

function ProductPage() {
  const { slug } = Route.useParams();
  const product = allProducts.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: "", email: "", rating: 5, text: "" });
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCartContext();

  if (!product) return null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!reviewForm.name.trim()) errs.name = "Name is required";
    if (!reviewForm.email.trim()) errs.email = "Email is required";
    if (!reviewForm.text.trim()) errs.text = "Review text is required";
    setReviewErrors(errs);
    if (Object.keys(errs).length === 0) {
      setReviewSubmitted(true);
      setReviewForm({ name: "", email: "", rating: 5, text: "" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Breadcrumb */}
      <section className="pt-24 md:pt-36 pb-3 md:pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link to="/" className="hover:text-chrome transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link to="/shop" className="hover:text-chrome transition-colors shrink-0">Shop</Link>
            <span className="shrink-0">/</span>
            <span className="text-chrome truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Section */}
      <section className="pb-12 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            {/* Images */}
            <div className="col-span-12 md:col-span-7">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-chrome bg-graphite"
                style={{ boxShadow: "var(--shadow-plate)" }}
              >
                <div className="aspect-[4/5]">
                  <OptimizedImage webp={product.webp} fallback={product.src} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <span className="absolute left-3 md:left-4 top-3 md:top-4 rounded-full border border-chrome bg-background/70 px-2.5 py-1 md:px-3 md:py-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em]">{product.num}</span>
                <button className="absolute right-3 md:right-4 top-3 md:top-4 h-8 w-8 md:h-9 md:w-9 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-sm transition-colors hover:bg-chrome hover:text-background">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                </button>
              </motion.div>
            </div>

            {/* Details */}
            <div className="col-span-12 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">{product.category}</span>
                <h1 className="mt-3 font-display text-3xl md:text-6xl leading-[0.95] tracking-tight">{product.name}</h1>
                <p className="mt-4 md:mt-6 font-mono text-lg md:text-xl tracking-[0.08em] text-chrome">{priceLabel(product.price)}</p>

                <div className="divider-chrome my-6 md:my-8" />

                <p className="text-sm leading-relaxed text-chrome-dim">{product.description}</p>

                <div className="divider-chrome my-6 md:my-8" />

                {/* Details list */}
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Details</span>
                    <ul className="mt-3 space-y-2">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 font-mono text-xs text-chrome-dim">
                          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-chrome" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Materials</span>
                    <ul className="mt-3 space-y-1">
                      {product.materials.map((m, i) => (
                        <li key={i} className="font-mono text-xs text-chrome-dim">{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">Dimensions</span>
                    <p className="mt-2 font-mono text-xs text-chrome-dim">{product.dimensions}</p>
                  </div>
                </div>

                <div className="divider-chrome my-6 md:my-8" />

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      src: product.src,
                      webp: product.webp,
                      price: product.price,
                    });
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }}
                  className="btn-chrome btn-chrome-inner w-full justify-center text-sm !py-4"
                >
                  <span className="btn-label">{addedToCart ? "Added ✓" : `Add to Cart — ${priceLabel(product.price)}`}</span>
                </button>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim">
                  Free shipping on orders over PKR 500,000 · 14-day return policy
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-chrome py-12 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-8 md:mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Information</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-[0.95] italic text-chrome-h">Frequently Asked</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className="rounded-2xl border border-chrome bg-graphite overflow-hidden"
                style={{ boxShadow: "var(--shadow-plate)" }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors hover:bg-graphite-2/50"
                >
                  <span className="font-mono text-xs md:text-sm tracking-[0.04em] pr-4">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 text-chrome-dim transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-sm text-chrome-dim leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-b border-chrome py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Testimonials</span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl leading-[0.95]">
                Patron <span className="italic text-chrome-h">Voices</span>
              </h2>

              <div className="mt-10 space-y-6">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                    className="rounded-2xl border border-chrome bg-graphite p-6"
                    style={{ boxShadow: "var(--shadow-plate)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-chrome bg-graphite-2 grid place-items-center font-mono text-[10px] text-chrome">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-mono text-xs text-foreground">{r.name}</span>
                          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">{r.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, j) => (
                          <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill={j < r.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" className={j < r.rating ? "text-chrome" : "text-chrome-dim/30"}>
                            <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-chrome-dim leading-relaxed">{r.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Review Form */}
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <div className="md:sticky md:top-28">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ Write a Review</span>
                <p className="mt-2 text-xs text-chrome-dim">Share your experience with this object.</p>

                {reviewSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center"
                  >
                    <div className="font-display text-3xl text-green-400 mb-2">✓</div>
                    <p className="font-mono text-[11px] text-green-400">Review submitted</p>
                    <button onClick={() => setReviewSubmitted(false)} className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors">
                      Write another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                    <div>
                      <input
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="Your name *"
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {reviewErrors.name && <p className="mt-1 font-mono text-[10px] text-red-400">{reviewErrors.name}</p>}
                    </div>
                    <div>
                      <input
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        placeholder="Email *"
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {reviewErrors.email && <p className="mt-1 font-mono text-[10px] text-red-400">{reviewErrors.email}</p>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim">Rating</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button key={r} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: r })}>
                              <svg width="16" height="16" viewBox="0 0 12 12" fill={r <= reviewForm.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" className={r <= reviewForm.rating ? "text-chrome" : "text-chrome-dim/30"}>
                                <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <textarea
                        value={reviewForm.text}
                        onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                        placeholder="Your review *"
                        rows={4}
                        className={`w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${reviewErrors.text ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`}
                      />
                      {reviewErrors.text && <p className="mt-1 font-mono text-[10px] text-red-400">{reviewErrors.text}</p>}
                    </div>
                    <button type="submit" className="btn-chrome btn-chrome-inner w-full justify-center">
                      <span className="btn-label">Submit Review</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="border-b border-chrome py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim">§ The Collection</span>
          <h2 className="mt-4 mb-8 md:mb-12 font-display text-3xl md:text-5xl leading-[0.95]">
            Related <span className="italic text-chrome-h">Objects</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((p, i) => (
              <Link
                key={p.id}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-chrome bg-graphite" style={{ boxShadow: "var(--shadow-plate)" }}>
                    <div className="aspect-[4/5] overflow-hidden">
                      <OptimizedImage webp={p.webp} fallback={p.src} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                    </div>
                    <span className="absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]">{p.num}</span>
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-[11px] text-chrome-dim truncate">{p.name}</p>
                    <p className="font-mono text-xs tracking-[0.14em] text-chrome mt-1">{priceLabel(p.price)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/shop" className="btn-chrome btn-chrome-inner">
              <span className="btn-label">View All Objects</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
