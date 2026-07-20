import logoAsset from "@/assets/logo.png";
import logoWebp from "@/assets/logo.webp";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative bg-background pt-24 pb-10">
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
                {c.l.map((x) => <li key={x}><Link to="/" className="hover:text-chrome transition-colors">{x}</Link></li>)}
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
