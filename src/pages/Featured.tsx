import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { DESTINATIONS, getCoverImage } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { DUR, EASE, fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Featured — curated carousel of hand-picked destinations.
 * Same cards as before, but given their own page so they read as a
 * standalone experience rather than a section.
 */
export default function Featured() {
  const reduce = useReducedMotion();

  return (
    <PageShell>
      <main className="pt-[88px] pb-16">
        <section className="container mb-10">
          <Reveal as="div" className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-secondary/90 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 mb-4">
              <Sparkles className="size-3.5" />
              Curated picks
            </span>
            <h1 className="font-display text-4xl md:text-6xl mb-4">
              Featured Destinations
            </h1>
            <p className="text-foreground/75 text-lg">
              A hand-picked carousel of India's most loved spots. Swipe through
              and tap any card to learn more.
            </p>
          </Reveal>
        </section>

        <section className="container mb-16">
          <motion.div
            variants={reduce ? undefined : staggerContainer(0.08)}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {DESTINATIONS.slice(0, 8).map((d) => (
              <motion.div
                key={d.slug}
                variants={reduce ? undefined : fadeUp}
                className="snap-start shrink-0 w-[280px] md:w-[320px] group"
              >
                <TiltCard
                  className="block rounded-xl"
                  innerClassName="block rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-lift transition-shadow duration-300 ease-soft"
                >
                  <Link to={`/destination/${d.slug}`} className="block">
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
                        <Badge
                          className={`${
                            d.category === "Hotspot"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          } badge-pulse`}
                        >
                          {d.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3" /> {d.state} · {d.type}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA back into the full catalogue */}
        <section className="container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-display text-2xl mb-2">Want the full list?</h3>
              <p className="text-foreground/70">
                Browse every destination in the catalogue, filter by state or
                category, and build your itinerary.
              </p>
            </div>
            <Magnetic max={6}>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 shadow-soft"
              >
                Browse All <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
          </motion.div>
        </section>
      </main>
    </PageShell>
  );
}