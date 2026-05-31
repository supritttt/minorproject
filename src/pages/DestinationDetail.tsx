import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { getDestination, getGalleryImages } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Plus, Check } from "lucide-react";
import { WeatherCard } from "@/components/WeatherCard";
import { MapView } from "@/components/MapView";
import { ReviewSection } from "@/components/ReviewSection";
import { ChatRoom } from "@/components/ChatRoom";
import { TerraChat } from "@/components/TerraChat";
import { NearStays } from "@/components/NearStays";
import { useItinerary } from "@/lib/itinerary";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const d = slug ? getDestination(slug) : undefined;
  const { add, has } = useItinerary();
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
  const ctx = `${d.place}, ${d.state} (${d.category}, ${d.type}). Best season: ${d.best_season}. Description: ${d.description}`;
  const gallery = getGalleryImages(d);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[88px] pb-20 fade-up">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge className={d.category === "Hotspot" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>{d.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3.5" />{d.state} · {d.type}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-6">{d.place}</h1>

          <div className="grid gap-3 md:grid-cols-3 mb-8">
            <img src={gallery[0]} alt={d.place} className="md:col-span-2 md:row-span-2 w-full h-[260px] md:h-[420px] object-cover rounded-xl border border-border" />
            {gallery.slice(1, 5).map((src, i) => (
              <img key={i} src={src} alt={`${d.place} ${i+2}`} loading="lazy" className="hidden md:block w-full h-[200px] object-cover rounded-xl border border-border" />
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr,320px]">
            <article className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-3">About {d.place}</h2>
                <p className="text-foreground/85 leading-relaxed">{d.description}</p>
              </section>
              <section>
                <h2 className="font-display text-2xl mb-3">Best Season to Visit</h2>
                <p className="text-foreground/85">{d.best_season}</p>
              </section>
              <section>
                <h2 className="font-display text-2xl mb-3">How to Reach</h2>
                <ul className="space-y-2 text-foreground/85">
                  <li><strong className="text-foreground">By air:</strong> {d.how_to_reach.air}</li>
                  <li><strong className="text-foreground">By rail:</strong> {d.how_to_reach.rail}</li>
                  <li><strong className="text-foreground">By road:</strong> {d.how_to_reach.road}</li>
                </ul>
              </section>
              <section>
                <h2 className="font-display text-2xl mb-3">Travel Precautions</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
                  {d.travel_precautions.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </section>
              <section>
                <h2 className="font-display text-2xl mb-3">Travel Tips</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
                  {d.travel_tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </section>
              <section>
                <h2 className="font-display text-2xl mb-3">Location</h2>
                <MapView destination={d} />
              </section>
              <NearStays slug={d.slug} />
              <ReviewSection slug={d.slug} />
              <ChatRoom slug={d.slug} />
            </article>
            <aside className="space-y-4">
              <Button
                onClick={() => add({ slug: d.slug, place: d.place, state: d.state })}
                disabled={inItinerary}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {inItinerary ? <><Check className="size-4 mr-2" /> Added to itinerary</> : <><Plus className="size-4 mr-2" /> Add to itinerary</>}
              </Button>
              <WeatherCard lat={d.coords.lat} lng={d.coords.lng} />
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display text-lg mb-3">Coordinates</h3>
                <p className="text-sm text-muted-foreground">Lat {d.coords.lat}°<br/>Lng {d.coords.lng}°</p>
              </div>
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
            </aside>
          </div>
        </div>
      </main>
      <TerraChat destinationContext={ctx} />
    </div>
  );
}
