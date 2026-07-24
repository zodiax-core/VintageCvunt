import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CustomerLayout } from "@/components/CustomerLayout";
import { useAuthContext } from "@/lib/auth-context";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/reviews")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireCustomer()),
  component: MyReviews,
  head: () => ({
    meta: [
      { title: "My Reviews — VintageCvunt" },
    ],
  }),
});

function statusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    Approved: "bg-green-500/10 text-green-400 border-green-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return <span className={`${base} ${styles[status] || styles.Pending}`}>{status}</span>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-chrome-dim/30"}
        />
      ))}
    </div>
  );
}

function MyReviews() {
  const { user } = useAuthContext();
  const reviews = useQuery(api.reviews.getByCustomerEmail, { email: user?.email || "" }) ?? [];
  const products = useQuery(api.products.list) ?? [];

  return (
    <CustomerLayout>
      <div className="mb-8 border-b border-chrome/10 pb-4">
        <h2 className="text-lg font-mono uppercase tracking-[0.2em] text-foreground">My Reviews</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => {
            const product = products.find((p) => p._id === review.productId);
            return (
              <div key={review._id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product?.slug || "" }}
                      className="font-mono text-[11px] text-chrome hover:text-foreground transition-colors"
                    >
                      {product?.name || "Unknown Product"}
                    </Link>
                    <div className="flex items-center gap-3 mt-1">
                      <StarRating rating={review.rating} />
                      {statusBadge(review.status === "approved" ? "Approved" : review.status === "rejected" ? "Rejected" : "Pending")}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-chrome-dim shrink-0">
                    {new Date(review.createdAt).toLocaleDateString("en-PK")}
                  </span>
                </div>
                {review.title && (
                  <p className="font-display text-sm mb-1">{review.title}</p>
                )}
                <p className="font-mono text-[11px] text-chrome-dim leading-relaxed">{review.comment}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-8 text-center">
          <Star size={24} className="mx-auto text-chrome-dim/40 mb-3" />
          <p className="font-mono text-[11px] text-chrome-dim">No reviews yet</p>
          <Link to="/shop" className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors">
            Browse Collection →
          </Link>
        </div>
      )}
    </CustomerLayout>
  );
}
