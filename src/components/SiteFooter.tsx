import logoAsset from "@/assets/logo.png";
import logoWebp from "@/assets/logo.webp";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function SiteFooter() {
  const settings = useQuery(api.settings.get);
  const storeName = settings?.storeName || "VintageCvunt";
  const storeEmail = settings?.storeEmail || "studio@vintagecvunt.com";

  return (
    <footer className="relative bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center">
          <OptimizedImage webp={logoWebp} fallback={logoAsset} alt={storeName} width={1400} height={400} className="h-auto w-full max-w-4xl opacity-95" />
        </div>
        <div className="divider-chrome my-14" />
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 text-sm">
          {(
            [
              { h: "Brand", l: [{ n: "About", to: "/about" }, { n: "Contact", to: "/contact" }, { n: "FAQ", to: "/faq" }] },
            { h: "Shop", l: [{ n: "All Objects", to: "/shop" }, { n: "Outerwear", to: "/shop" }, { n: "Footwear", to: "/shop" }, { n: "Silverwork", to: "/shop" }, { n: "Adornment", to: "/shop" }] },
            { h: "Service", l: [{ n: "Shipping & Returns", to: "/shipping-returns" }, { n: "Size Guide", to: "/size-guide" }, { n: "Privacy Policy", to: "/privacy-policy" }, { n: "Terms & Conditions", to: "/terms-conditions" }] },
            { h: "Follow", l: [{ n: "Instagram", to: "https://instagram.com", ext: true }, { n: "Twitter", to: "https://twitter.com", ext: true }, { n: "Email", to: `mailto:${storeEmail}`, ext: true }] },
            ] as Array<{ h: string; l: Array<{ n: string; to: string; ext?: boolean }> }>
          ).map((c) => (
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
