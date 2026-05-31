import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { getDestination, getGalleryImages } from "@/data/destinations";
import { MapPin, Loader2 } from "lucide-react";
import { TerraChat } from "@/components/TerraChat";

type Shared = { id: string; title: string; items: any; created_at: string; owner_name: string | null };

export default function ShareItinerary() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<Shared | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    supabase.rpc("get_itinerary_by_share_token", { _token: token }).then(({ data, error }) => {
      if (error) setErr(error.message);
      else if (!data || data.length === 0) setErr("Itinerary not found");
      else setData(data[0] as Shared);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[88px] pb-20">
        <div className="container max-w-3xl">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading…</div>
          ) : err ? (
            <div className="text-center py-16">
              <p className="text-destructive mb-2">{err}</p>
              <Link to="/" className="text-primary hover:underline">Back to home</Link>
            </div>
          ) : data && (
            <>
              <p className="text-sm text-muted-foreground">Shared by {data.owner_name ?? "a traveller"}</p>
              <h1 className="font-display text-4xl mt-1 mb-8">{data.title}</h1>
              <ul className="space-y-3">
                {(Array.isArray(data.items) ? data.items : []).map((it: any, idx: number) => {
                  const d = getDestination(it.slug);
                  const img = d ? getGalleryImages(d)[0] : "/placeholder.svg";
                  return (
                    <li key={it.slug + idx} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                      <span className="font-display text-lg w-6 text-muted-foreground">{idx + 1}</span>
                      <img src={img} alt={it.place} className="size-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <Link to={`/destination/${it.slug}`} className="font-medium hover:text-primary block truncate">{it.place}</Link>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {it.state}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </main>
      <TerraChat />
    </div>
  );
}
