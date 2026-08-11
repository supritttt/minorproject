import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { DESTINATIONS, STATES, CATEGORIES, getCoverImage } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Destinations — browse all destinations with state + category filters.
 * Owns its own filter state (URL-persisted filters are out of scope for now).
 */
export default function Destinations() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [catFilter, setCatFilter] = useState<string>("all");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      DESTINATIONS.filter(
        (d) =>
          (stateFilter === "all" || d.state === stateFilter) &&
          (catFilter === "all" || d.category === catFilter),
      ),
    [stateFilter, catFilter],
  );

  const cardMotion = reduce ? undefined : { variants: fadeUp };

  return (
    <PageShell>
      <main className="pt-[72px]">
        {/* Filters */}
        <Reveal as="section" className="container -mt-10 relative z-10 mb-12">
          <div className="bg-card border border-border rounded-xl shadow-soft p-4 md:p-6 grid gap-3 md:grid-cols-[1fr,1fr,auto] items-end">
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-1.5 block">State</label>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Category</label>
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground md:text-right">{filtered.length} destinations</p>
          </div>
        </Reveal>

        {/* Heading */}
        <section className="container mb-8">
          <h1 className="font-display text-3xl md:text-5xl">Browse Destinations</h1>
          <p className="text-muted-foreground mt-2">
            Filter by state or category to find your next escape.
          </p>
        </section>

        {/* Grid */}
        <section className="container mb-24">
          <motion.div
            variants={reduce ? undefined : staggerContainer(0.06)}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((d) => (
              <TiltCard
                key={d.slug}
                className="block h-full"
                innerClassName="block h-full rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-lift transition-shadow duration-300 ease-soft"
                motionProps={cardMotion ?? {}}
              >
                <Link to={`/destination/${d.slug}`} className="group block h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getCoverImage(d)}
                      alt={d.place}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <h3 className="font-display text-lg leading-tight truncate">{d.place}</h3>
                      <Badge
                        className={`${
                          d.category === "Hotspot"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        } shrink-0`}
                      >
                        {d.category === "Hotspot" ? "Hotspot" : "Hidden"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="size-3" /> {d.state} · {d.type}
                    </p>
                    <p className="text-sm text-foreground/80 line-clamp-2">{d.description}</p>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No destinations match those filters yet.
            </p>
          )}
        </section>
      </main>
    </PageShell>
  );
}