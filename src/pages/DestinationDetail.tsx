import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { getDestination, getGalleryImages } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Plus, Check } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { MapView } from "@/components/MapView";
import { ReviewSection } from "@/components/ReviewSection";
import { ChatRoom } from "@/components/ChatRoom";
import { NearStays } from "@/components/NearStays";
import { useItinerary } from "@/lib/itinerary";
import { useChatContext } from "@/contexts/ChatContext";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { SPRING_BUTTON, fadeUp, staggerContainer } from "@/lib/motion";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const d = slug ? getDestination(slug) : undefined;
  const { add, has } = useItinerary();
  const { setDestinationContext } = useChatContext();
  const reduce = useReducedMotion();

  // Push the destination context to the global TerraChat on mount,
  // clear it on unmount so other pages get the generic prompt.
  useEffect(() => {
    if (!d) return;
    const ctx = `${d.place}, ${d.state} (${d.category}, ${d.type}). Best season: ${d.best_season}. Description: ${d.description}`;
    setDestinationContext(ctx);
    return () => setDestinationContext(undefined);
  }, [d, setDestinationContext]);

  if (!d) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="font-display text-3xl mb-2">Destination not found</h1>
          <Link to="/" className="text-primary hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }
  const inItinerary = has(d.slug);
  const gallery = getGalleryImages(d);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[88px] pb-20">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge className={d.category === "Hotspot" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>{d.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3.5" />{d.state} · {d.type}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-6">{d.place}</h1>

          <motion.div
            variants={reduce ? undefined : staggerContainer(0.08)}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="grid gap-3 md:grid-cols-3 mb-8"
          >
            <TiltCard
              className="md:col-span-2 md:row-span-2 block rounded-xl"
              innerClassName="block rounded-xl overflow-hidden border border-border"
              motionProps={{ variants: reduce ? undefined : fadeUp }}
              liftY={-2}
            >
              <img
                src={gallery[0]}
                alt={d.place}
                className="w-full h-[260px] md:h-[420px] object-cover rounded-xl"
              />
            </TiltCard>
            {gallery.slice(1, 5).map((src, i) => (
              <motion.img
                key={i}
                variants={reduce ? undefined : fadeUp}
                src={src}
                alt={`${d.place} ${i+2}`}
                loading="lazy"
                className="hidden md:block w-full h-[200px] object-cover rounded-xl border border-border hover:scale-[1.02] transition-transform duration-300 ease-soft"
              />
            ))}
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr,320px]">
            <article className="space-y-8">
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">About {d.place}</h2>
                <p className="text-foreground/85 leading-relaxed">{d.description}</p>
              </Reveal>
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">Best Season to Visit</h2>
                <p className="text-foreground/85">{d.best_season}</p>
              </Reveal>
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">How to Reach</h2>
                <ul className="space-y-2 text-foreground/85">
                  <li><strong className="text-foreground">By air:</strong> {d.how_to_reach.air}</li>
                  <li><strong className="text-foreground">By rail:</strong> {d.how_to_reach.rail}</li>
                  <li><strong className="text-foreground">By road:</strong> {d.how_to_reach.road}</li>
                </ul>
              </Reveal>
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">Travel Precautions</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
                  {d.travel_precautions.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </Reveal>
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">Travel Tips</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
                  {d.travel_tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </Reveal>
              <Reveal as="section">
                <h2 className="font-display text-2xl mb-3">Location</h2>
                <MapView destination={d} />
              </Reveal>
              <Reveal><NearStays slug={d.slug} /></Reveal>
              <Reveal><ReviewSection slug={d.slug} /></Reveal>
              <Reveal><ChatRoom slug={d.slug} /></Reveal>
            </article>
            <aside className="space-y-4">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                transition={SPRING_BUTTON}
                className="w-full"
              >
                <Magnetic max={5} className="block w-full">
                  <Button
                    onClick={() => add({ slug: d.slug, place: d.place, state: d.state })}
                    disabled={inItinerary}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {inItinerary ? <><Check className="size-4 mr-2" /> Added to itinerary</> : <><Plus className="size-4 mr-2" /> Add to itinerary</>}
                  </Button>
                </Magnetic>
              </motion.div>
              <Reveal><WeatherCard lat={d.coords.lat} lng={d.coords.lng} /></Reveal>
              <Reveal>
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-display text-lg mb-3">Coordinates</h3>
                  <p className="text-sm text-muted-foreground">Lat {d.coords.lat}°<br/>Lng {d.coords.lng}°</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-display text-lg mb-3">Nearby Points of Interest</h3>
                  <ul className="space-y-2 text-sm">
                    {d.nearby_poi.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{p.kind}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
