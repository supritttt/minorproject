import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DESTINATIONS, STATES, CATEGORIES, getCoverImage } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { TerraChat } from "@/components/TerraChat";

export default function Index() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [catFilter, setCatFilter] = useState<string>("all");

  const filtered = useMemo(() => DESTINATIONS.filter(d =>
    (stateFilter === "all" || d.state === stateFilter) &&
    (catFilter === "all" || d.category === catFilter)
  ), [stateFilter, catFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[72px]">
        <Hero />

        {/* Filters */}
        <section className="container -mt-10 relative z-10 mb-16">
          <div className="bg-card border border-border rounded-xl shadow-soft p-4 md:p-6 grid gap-3 md:grid-cols-[1fr,1fr,auto] items-end fade-up">
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-1.5 block">State</label>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Category</label>
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground md:text-right">{filtered.length} destinations</p>
          </div>
        </section>

        {/* Featured carousel */}
        <section className="container mb-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-3xl md:text-4xl">Featured Destinations</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">Swipe to explore</p>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {DESTINATIONS.slice(0, 8).map((d, i) => (
              <Link
                to={`/destination/${d.slug}`}
                key={d.slug}
                className="snap-start shrink-0 w-[280px] md:w-[320px] group fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-lift transition-all duration-300 ease-soft hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getCoverImage(d)}
                      alt={d.place}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-display text-lg leading-tight">{d.place}</h3>
                      <Badge className={`${d.category === "Hotspot" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} badge-pulse`}>
                        {d.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" /> {d.state} · {d.type}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Grid by filter */}
        <section className="container mb-24">
          <h2 className="font-display text-3xl md:text-4xl mb-6">Browse Destinations</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((d, i) => (
              <Link
                to={`/destination/${d.slug}`}
                key={d.slug}
                className="group fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                <div className="rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-lift transition-all duration-300 ease-soft hover:-translate-y-1 h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={getCoverImage(d)} alt={d.place} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <h3 className="font-display text-lg leading-tight truncate">{d.place}</h3>
                      <Badge className={`${d.category === "Hotspot" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} shrink-0`}>
                        {d.category === "Hotspot" ? "Hotspot" : "Hidden"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="size-3" /> {d.state} · {d.type}
                    </p>
                    <p className="text-sm text-foreground/80 line-clamp-2">{d.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border bg-card/50 py-12 mt-12">
          <div className="container grid gap-8 md:grid-cols-3 text-sm">
            <div>
              <h3 className="font-display text-xl mb-2">HiddenTerra</h3>
              <p className="text-muted-foreground">A peaceful guide to India's most loved hotspots and best-kept hidden gems.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Coverage</h4>
              <p className="text-muted-foreground">Currently featuring Sikkim, Odisha, Maharashtra, Tamil Nadu and Himachal Pradesh. More states coming soon.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Disclaimer</h4>
              <p className="text-muted-foreground">Weather and AQI data is approximated.</p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} HiddenTerra · A non-commercial demo project</p>
        </footer>
      </main>
      <TerraChat />
    </div>
  );
}
