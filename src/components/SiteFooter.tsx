import logoAsset from "@/assets/logo.png";
import logoWebp from "@/assets/logo.webp";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export function SiteFooter() {
  const settings = useQuery(api.settings.get);
  const collections = (useQuery(api.collections.list) ?? []) as Doc<"collections">[];
  const activeCollections = collections.filter((c) => c.isActive);
  const storeName = settings?.storeName || "VintageCvunt";

  const brandLinks = [
    { n: "About", to: "/about" },
    { n: "Contact", to: "/contact" },
    { n: "FAQ", to: "/faq" },
  ];

  const shopLinks = [
    { n: "All Objects", to: "/shop" },
    ...activeCollections.map((c) => ({ n: c.name, to: "/shop" as const })),
  ];

  const serviceLinks = [
    { n: "Shipping & Returns", to: "/shipping-returns" },
    { n: "Size Guide", to: "/size-guide" },
    { n: "Privacy Policy", to: "/privacy-policy" },
    { n: "Terms & Conditions", to: "/terms-conditions" },
  ];

  const followLinks = [
    { n: "Instagram", to: "https://instagram.com/vintagecvunt", ext: true },
  ];

  const sections = [
    { h: "Brand", l: brandLinks },
    { h: "Shop", l: shopLinks },
    { h: "Service", l: serviceLinks },
    { h: "Follow", l: followLinks },
  ] as Array<{ h: string; l: Array<{ n: string; to: string; ext?: boolean }> }>;

  return (
    <footer className="relative bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center">
          <OptimizedImage webp={logoWebp} fallback={logoAsset} alt={storeName} width={1400} height={400} className="h-auto w-full max-w-4xl opacity-95" />
        </div>
        <div className="divider-chrome my-14" />
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 text-sm">
          {sections.map((c) => (
            <div key={c.h}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim">{c.h}</div>
              <ul className="mt-4 space-y-2 font-display text-lg">
                {c.l.map((x) => (
                  <li key={x.n}>
                    {x.ext ? (
                      <a href={x.to} target="_blank" rel="noopener noreferrer" className="hover:text-chrome transition-colors">{x.n}</a>
                    ) : (
                      <Link to={x.to} className="hover:text-chrome transition-colors">{x.n}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chrome pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim">
          <span>&copy; MMXXVI {storeName} &middot; Casa d'Argento</span>
          <span>Karachi &middot; Pakistan</span>
          <span><Link to="/privacy-policy" className="hover:text-chrome transition-colors">Privacy</Link> &middot; <Link to="/terms-conditions" className="hover:text-chrome transition-colors">Terms</Link> &middot; Cookies</span>
        </div>
      </div>
    </footer>
  );
}
