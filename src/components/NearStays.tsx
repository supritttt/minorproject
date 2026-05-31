import { Hotel, Sparkles, Wallet, Building2 } from "lucide-react";
import { getStays, type StayTier } from "@/data/stays";

const tierMeta: Record<StayTier, { icon: React.ElementType; chip: string }> = {
  Luxury: { icon: Sparkles, chip: "bg-primary/10 text-primary border-primary/20" },
  Standard: { icon: Building2, chip: "bg-secondary text-secondary-foreground border-border" },
  Budget: { icon: Wallet, chip: "bg-muted text-muted-foreground border-border" },
};

export function NearStays({ slug }: { slug: string }) {
  const stays = getStays(slug);
  if (!stays) return null;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Hotel className="size-5 text-primary" />
        <h2 className="font-display text-2xl">Near Stays</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Curated places to stay across budgets. Always verify availability and current pricing before booking.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(tierMeta) as StayTier[]).map((tier) => {
          const Icon = tierMeta[tier].icon;
          return (
            <div key={tier} className="bg-card border border-border rounded-xl p-4">
              <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border mb-3 ${tierMeta[tier].chip}`}>
                <Icon className="size-3.5" /> {tier}
              </div>
              <ul className="space-y-3">
                {stays[tier].map((s, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-medium text-foreground">{s.name}</p>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">{s.price}<span className="text-muted-foreground font-normal"> /night</span></span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.area}</p>
                    {s.note && <p className="text-xs text-foreground/70 mt-1">{s.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
