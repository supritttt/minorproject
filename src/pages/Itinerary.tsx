import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useItinerary, saveItineraryToCloud } from "@/lib/itinerary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Share2, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TerraChat } from "@/components/TerraChat";
import { getDestination, getGalleryImages } from "@/data/destinations";

export default function Itinerary() {
  const { items, remove, clear } = useItinerary();
  const { user } = useAuth();
  const [title, setTitle] = useState("My India Trip");
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  async function share() {
    if (!user) { toast.error("Log in to create a shareable link"); return; }
    if (!items.length) { toast.error("Add destinations first"); return; }
    setSaving(true);
    try {
      const saved = await saveItineraryToCloud(user.id, title.trim() || "My Trip", items);
      const url = `${window.location.origin}/share/${saved.share_token}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url).catch(() => {});
      toast.success("Share link copied to clipboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally { setSaving(false); }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[88px] pb-20">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl mb-2">Your Itinerary</h1>
          <p className="text-muted-foreground mb-8">Build, save, and share your India trip plan.</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Trip title" className="sm:max-w-xs" />
            <Button onClick={share} disabled={saving || !items.length} className="bg-primary hover:bg-primary/90">
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Share2 className="size-4 mr-2" />} Save & share
            </Button>
            {items.length > 0 && (
              <Button variant="ghost" onClick={() => { if (confirm("Clear itinerary?")) clear(); }}>Clear all</Button>
            )}
          </div>

          {shareUrl && (
            <div className="bg-secondary/40 border border-border rounded-xl p-3 mb-6 text-sm flex items-center gap-2 break-all">
              <Share2 className="size-4 text-primary shrink-0" />
              <a href={shareUrl} className="text-primary hover:underline">{shareUrl}</a>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground mb-3">Your itinerary is empty.</p>
              <Link to="/" className="text-primary hover:underline">Browse destinations →</Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it, idx) => {
                const d = getDestination(it.slug);
                const img = d ? getGalleryImages(d)[0] : "/placeholder.svg";
                return (
                  <li key={it.slug} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                    <span className="font-display text-lg w-6 text-muted-foreground">{idx + 1}</span>
                    <img src={img} alt={it.place} className="size-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/destination/${it.slug}`} className="font-medium hover:text-primary block truncate">{it.place}</Link>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" /> {it.state}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => remove(it.slug)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <TerraChat />
    </div>
  );
}
