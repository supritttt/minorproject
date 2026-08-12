import { Hotel, Sparkles, Wallet, Building2, ExternalLink, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  getStays,
  distanceKm,
  formatDistance,
  stayLinks,
  type Stay,
  type StayTier,
} from "@/data/stays";

const tierMeta: Record<StayTier, { icon: React.ElementType; chip: string }> = {
  Luxury: { icon: Sparkles, chip: "bg-primary/10 text-primary border-primary/20" },
  Standard: { icon: Building2, chip: "bg-secondary text-secondary-foreground border-border" },
  Budget: { icon: Wallet, chip: "bg-muted text-muted-foreground border-border" },
};

export function NearStays({
  slug,
  destinationCoords,
}: {
  slug: string;
  destinationCoords: { lat: number; lng: number };
}) {
  const stays = getStays(slug);
  const navigate = useNavigate();
  if (!stays) return null;

  const viewOnMap = (lat: number, lng: number) => {
    // Scroll to the map and store the focus point so the map can highlight it.
    sessionStorage.setItem("nearStayFocus", JSON.stringify({ lat, lng, name: "Stay" }));
    const el = document.getElementById("map-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`#location`);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Hotel className="size-5 text-primary" />
        <h2 className="font-display text-2xl">Near Stays</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Curated places to stay across budgets. Real-time availability and pricing on the booking
        platforms — always verify before booking.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(tierMeta) as StayTier[]).map((tier) => {
          const Icon = tierMeta[tier].icon;
          return (
            <div key={tier} className="bg-card border border-border rounded-xl p-4">
              <div
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border mb-3 ${tierMeta[tier].chip}`}
              >
                <Icon className="size-3.5" /> {tier}
              </div>
              <ul className="space-y-3">
                {stays[tier].map((s, i) => {
                  const km = distanceKm(s.coords, destinationCoords);
                  const links = stayLinks(s);
                  return (
                    <li key={i} className="text-sm">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-medium text-foreground">{s.name}</p>
                        <span className="text-xs font-medium text-primary whitespace-nowrap">
                          {s.price}
                          <span className="text-muted-foreground font-normal"> /night</span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.area}</p>
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/90 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                          <Map className="size-3" /> {formatDistance(km)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => viewOnMap(s.coords.lat, s.coords.lng)}
                            className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                          >
                            View on map
                          </button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                size="sm"
                                variant="default"
                                className="h-7 px-2.5 text-xs bg-primary hover:bg-primary/90"
                              >
                                Book Now
                                <ExternalLink className="size-3 ml-1" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="end"
                              className="w-56 p-2 bg-popover text-popover-foreground"
                            >
                              <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                                Choose a booking platform
                              </p>
                              <a
                                href={links.booking}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <span className="text-sm font-medium">Booking.com</span>
                                <ExternalLink className="size-3.5 text-muted-foreground" />
                              </a>
                              <a
                                href={links.makemytrip}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <span className="text-sm font-medium">MakeMyTrip</span>
                                <ExternalLink className="size-3.5 text-muted-foreground" />
                              </a>
                              <a
                                href={links.google}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                <span className="text-sm font-medium">Google Hotels</span>
                                <ExternalLink className="size-3.5 text-muted-foreground" />
                              </a>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      {s.note && (
                        <p className="text-xs text-foreground/70 mt-1">{s.note}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Re-export for convenience.
export type { Stay };
