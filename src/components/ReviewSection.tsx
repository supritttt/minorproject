import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Review = { id: string; user_id: string; rating: number; comment: string; created_at: string; profile?: { display_name: string | null; avatar_url: string | null } };

export function ReviewSection({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("reviews").select("id, user_id, rating, comment, created_at").eq("destination_slug", slug).order("created_at", { ascending: false });
    if (data) {
      const ids = [...new Set(data.map(r => r.user_id))];
      const { data: profs } = await supabase.from("profiles").select("id, display_name, avatar_url").in("id", ids);
      const byId = new Map((profs ?? []).map(p => [p.id, p]));
      setReviews(data.map(r => ({ ...r, profile: byId.get(r.user_id) ?? undefined })));
    }
    setLoading(false);
  }
  useEffect(() => { load(); }, [slug]);

  async function submit() {
    if (!user) { toast.error("Please log in to leave a review"); return; }
    if (!comment.trim()) { toast.error("Write a short comment"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({ destination_slug: slug, user_id: user.id, rating, comment: comment.trim() });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setComment(""); setRating(5); toast.success("Review posted"); load();
  }

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-2xl">Traveller Reviews</h2>
        {reviews.length > 0 && <span className="text-sm text-muted-foreground">{avg.toFixed(1)} ★ · {reviews.length}</span>}
      </div>

      {user ? (
        <div className="bg-card border border-heather/30 rounded-xl p-4 mb-4 shadow-soft">
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`} className="p-0.5">
                <Star className={`size-5 transition-colors ${n <= rating ? "fill-electric text-[#9B7ED6]" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience…" rows={3} className="mb-2 bg-porcelain/40 border-heather/30 text-[#26153B]" />
          <Button onClick={submit} disabled={submitting} className="bg-electric hover:bg-[#d5f325] text-[#190C28] font-bold shadow-[0_0_12px_rgba(228,255,59,0.35)]">
            {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null} Post review
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground bg-porcelain/60 border border-heather/25 rounded-xl p-3 mb-4">Log in to leave a review.</p>
      )}

      {loading ? (
        <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="size-4 animate-spin text-heather" /> Loading…</div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet — be the first.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map(r => (
            <li key={r.id} className="bg-card border border-heather/30 rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#26153B]">{r.profile?.display_name ?? "Traveller"}</span>
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(n => <Star key={n} className={`size-3.5 ${n <= r.rating ? "fill-electric text-heather" : "text-muted-foreground/30"}`} />)}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-foreground/85 whitespace-pre-wrap">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
