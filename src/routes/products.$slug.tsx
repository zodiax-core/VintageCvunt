import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartContext } from "@/lib/cart-context";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

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
  head: () => ({
    meta: [
      { title: "Object — VintageCvunt" },
      { name: "description", content: "VintageCvunt object detail." },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

const priceLabel = (p: number) => "PKR " + p.toLocaleString("en-PK");

function ProductPage() {
  const { slug } = Route.useParams();
  const product = useQuery(api.products.getBySlug, { slug }) ?? null;
  const reviews = useQuery(api.reviews.getByProductId, { productId: product?._id ?? "" }) ?? [];
  const allProducts = useQuery(api.products.list) ?? [];
  const faqs: { q: string; a: string }[] = [];
  const relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const createReview = useMutation(api.reviews.create);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: "", email: "", rating: 5, text: "" });
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCartContext();

  if (!product) return null;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!reviewForm.name.trim()) errs.name = "Name is required";
    if (!reviewForm.email.trim()) errs.email = "Email is required";
    if (!reviewForm.text.trim()) errs.text = "Review text is required";
    setReviewErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        await createReview({
          productId: product._id,
          customerName: reviewForm.name.trim(),
          customerEmail: reviewForm.email.trim(),
          rating: reviewForm.rating,
          comment: reviewForm.text.trim(),
          status: "pending",
        });
        setReviewSubmitted(true);
        setReviewForm({ name: "", email: "", rating: 5, text: "" });
      } catch (err) {
        console.error("Failed to submit review", err);
      }
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
                   <img src={product.imageUrls?.[0] || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
                </div>
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

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart({
                      id: product._id,
                      name: product.name,
                      slug: product.slug,
                      src: product.imageUrls?.[0] || "/placeholder.svg",
                      webp: product.imageUrls?.[0] || "/placeholder.svg",
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
                  Free shipping on orders over PKR 500,000 · 14-day return policy · Serving all Pakistan
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
                          {r.customerName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-mono text-xs text-foreground">{r.customerName}</span>
                          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">{new Date(r.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "short" })}</span>
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
                    <p className="text-sm text-chrome-dim leading-relaxed">{r.comment}</p>
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
              <RelatedProductCard key={p._id} product={p} index={i} />
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

function RelatedProductCard({ product, index }: { product: any; index: number }) {
  const imgUrl = product.imageUrls?.[0] || "/placeholder.svg";
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-chrome bg-graphite" style={{ boxShadow: "var(--shadow-plate)" }}>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={imgUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
          </div>
        </div>
        <div className="mt-3">
          <p className="font-mono text-[11px] text-chrome-dim truncate">{product.name}</p>
          <p className="font-mono text-xs tracking-[0.14em] text-chrome mt-1">{priceLabel(product.price)}</p>
        </div>
      </motion.div>
    </Link>
  );
}
