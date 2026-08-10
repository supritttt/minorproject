
import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/terra-chat`;

export function TerraChat({ destinationContext }: { destinationContext?: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Namaste! I'm **Terra** 🌿 — ask me about destinations, itineraries, the best season to visit, or how to get there.",
    },
  ]);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const resp = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next,
          destinationContext,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMsgs((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Terra couldn't respond. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 size-14 rounded-full bg-primary text-primary-foreground shadow-lift flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Open Terra chatbot"
        >
          <MessageCircle className="size-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-3rem))] bg-card border border-border rounded-2xl shadow-lift flex flex-col fade-up">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Bot className="size-4 text-primary" />
            </div>

            <div className="flex-1">
              <p className="font-display leading-tight">Terra</p>
              <p className="text-[11px] text-muted-foreground">
                Your India travel guide
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-accent rounded-md"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-headings:my-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </div>
            ))}

            {busy && msgs[msgs.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-3 py-2 text-sm flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin" />
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask about a place…"
              disabled={busy}
            />

            <Button
              onClick={send}
              disabled={busy || !input.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90 shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}