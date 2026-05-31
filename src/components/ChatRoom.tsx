import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Send, Loader2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Msg = { id: string; user_id: string; content: string | null; image_url: string | null; created_at: string; profile?: { display_name: string | null; avatar_url: string | null } };

export function ChatRoom({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function hydrateProfiles(items: Msg[]) {
    const ids = [...new Set(items.map(m => m.user_id))];
    if (!ids.length) return items;
    const { data: profs } = await supabase.from("profiles").select("id, display_name, avatar_url").in("id", ids);
    const byId = new Map((profs ?? []).map(p => [p.id, p]));
    return items.map(m => ({ ...m, profile: byId.get(m.user_id) ?? undefined }));
  }

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("chat_messages").select("*").eq("destination_slug", slug).order("created_at", { ascending: true }).limit(200);
      if (active && data) setMsgs(await hydrateProfiles(data as Msg[]));
      setLoading(false);
    })();

    const ch = supabase.channel(`chat:${slug}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `destination_slug=eq.${slug}` }, async (p) => {
        const row = p.new as Msg;
        const [withProf] = await hydrateProfiles([row]);
        setMsgs(prev => [...prev, withProf]);
      })
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, [slug]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [msgs.length]);

  async function send() {
    if (!user) { toast.error("Log in to chat"); return; }
    if (!text.trim() && !image) return;
    setSending(true);
    let image_url: string | null = null;
    if (image) {
      const path = `${user.id}/${slug}/${Date.now()}-${image.name}`;
      const up = await supabase.storage.from("chat-images").upload(path, image, { upsert: false });
      if (up.error) { toast.error(up.error.message); setSending(false); return; }
      image_url = supabase.storage.from("chat-images").getPublicUrl(path).data.publicUrl;
    }
    const { error } = await supabase.from("chat_messages").insert({ destination_slug: slug, user_id: user.id, content: text.trim() || null, image_url });
    setSending(false);
    if (error) { toast.error(error.message); return; }
    setText(""); setImage(null);
  }

  return (
    <section>
      <h2 className="font-display text-2xl mb-3">Community Chat</h2>
      <div className="bg-card border border-border rounded-xl flex flex-col h-[460px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-muted-foreground flex items-center gap-2"><Loader2 className="size-4 animate-spin" /> Loading messages…</div>
          ) : msgs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">Start the conversation about this place.</p>
          ) : msgs.map(m => {
            const mine = m.user_id === user?.id;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {!mine && <p className="text-[11px] font-medium opacity-80 mb-0.5">{m.profile?.display_name ?? "Traveller"}</p>}
                  {m.image_url && <img src={m.image_url} alt="" className="rounded-lg mb-1.5 max-h-56" />}
                  {m.content && <p className="text-sm whitespace-pre-wrap break-words">{m.content}</p>}
                  <p className={`text-[10px] mt-0.5 ${mine ? "opacity-70" : "text-muted-foreground"}`}>{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-border p-3">
          {image && (
            <div className="flex items-center gap-2 mb-2 text-xs bg-muted rounded px-2 py-1 w-fit">
              <ImagePlus className="size-3.5" /> {image.name}
              <button onClick={() => setImage(null)} aria-label="Remove image"><X className="size-3.5" /></button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <label className="cursor-pointer p-2 hover:bg-accent rounded-md transition-colors" aria-label="Attach image">
              <ImagePlus className="size-4 text-muted-foreground" />
              <input type="file" accept="image/*" className="hidden" onChange={e => setImage(e.target.files?.[0] ?? null)} />
            </label>
            <Input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={user ? "Say something…" : "Log in to chat"}
              disabled={!user || sending}
            />
            <Button onClick={send} disabled={sending || !user} size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
              {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
