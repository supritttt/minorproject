import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { DUR, EASE, modalVariants } from "@/lib/motion";
import { useChatContext } from "@/contexts/ChatContext";

type Msg = { role: "user" | "assistant"; content: string };

const URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/terra-chat`;

// Size of the floating bubble in px — kept here so drag bounds are easy to reason about.
const BUBBLE_SIZE = 64; // size-16 (was size-14)
const SCROLL_HIDE_OFFSET = 80; // px scrolled down before bubble fades
const PANEL_WIDTH = 400;
const PANEL_HEIGHT = 600;
const PANEL_GAP = 12; // gap between bubble and panel when panel is open

type Anchor = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Anchor the bubble to whichever corner of the viewport it is closest to.
 * Pure helper — no side effects. Used after a drag is released so the
 * panel can open from a sensible corner.
 */
function snapToCorner(x: number, y: number, vw: number, vh: number): Anchor {
  const snapX = x + BUBBLE_SIZE / 2 > vw / 2 ? vw - BUBBLE_SIZE - 16 : 16;
  const snapY = y + BUBBLE_SIZE / 2 > vh / 2 ? vh - BUBBLE_SIZE - 16 : 16;
  return { x: snapX, y: snapY };
}

export function TerraChat() {
  const { destinationContext } = useChatContext();
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
  const reduce = useReducedMotion();

  // Track viewport size so drag bounds + panel positioning stay correct on resize.
  const [vp, setVp] = useState({
    w: typeof window === "undefined" ? 1280 : window.innerWidth,
    h: typeof window === "undefined" ? 800 : window.innerHeight,
  });

  // Drag state — stored as offsets from the resting "fixed" anchor.
  // We render with `fixed` + transform so the bubble floats over content
  // without taking layout space.
  const [dragOffset, setDragOffset] = useState<Anchor>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ offset: Anchor; pointer: Anchor } | null>(null);

  // Auto-hide on scroll: track last Y + scroll direction.
  const [scrolling, setScrolling] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<number | null>(null);

  // Whether the user has opened the panel at least once — used to dismiss
  // the notification dot. Persists for the session.
  const [hasOpened, setHasOpened] = useState(false);

  // Mount-time viewport + scroll listeners.
  useEffect(() => {
    const onResize = () =>
      setVp({ w: window.innerWidth, h: window.innerHeight });
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
      lastScrollY.current = y;

      // Only auto-hide the bubble (closed state). When the panel is open,
      // we keep everything visible so the user can finish their message.
      if (!open) {
        if (y > SCROLL_HIDE_OFFSET && dy > 0) {
          setHiddenByScroll(true);
        } else if (dy < 0) {
          setHiddenByScroll(false);
        }
      }

      setScrolling(true);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => setScrolling(false), 120);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [open]);

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

  // ----- Drag handlers -----
  // We treat any movement over 6px during a pointer-down as a drag;
  // anything less is a click that should open the panel.
  const DRAG_THRESHOLD = 6;

  function onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
    dragStart.current = {
      offset: { ...dragOffset },
      pointer: { x: e.clientX, y: e.clientY },
    };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.pointer.x;
    const dy = e.clientY - dragStart.current.pointer.y;

    if (!isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }
    if (!isDragging && Math.hypot(dx, dy) <= DRAG_THRESHOLD) return;

    // Bound to viewport so the bubble can't escape off-screen.
    const maxX = vp.w - BUBBLE_SIZE - 8;
    const maxY = vp.h - BUBBLE_SIZE - 8;
    const nx = clamp(dragStart.current.offset.x + dx, 8, maxX);
    const ny = clamp(dragStart.current.offset.y + dy, 8, maxY);
    setDragOffset({ x: nx, y: ny });
  }

  function onPointerUp(e: ReactPointerEvent<HTMLButtonElement>) {
    const wasDragging = isDragging;
    dragStart.current = null;

    if (!wasDragging) {
      // Treat as click: open the panel, mark opened, snap to nearest corner.
      const { x, y } = snapToCorner(dragOffset.x, dragOffset.y, vp.w, vp.h);
      setDragOffset({ x, y });
      setHasOpened(true);
      setOpen(true);
    } else {
      // Snap to nearest corner after drag release.
      const { x, y } = snapToCorner(dragOffset.x, dragOffset.y, vp.w, vp.h);
      setDragOffset({ x, y });
    }
    setIsDragging(false);
    (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    // No-op — we use pointer events for drag (not framer-motion's pan).
    // Kept here so motion's pan handlers don't fight our pointer logic.
    void info;
  }

  // Anchor the bubble at bottom-right by default; user drag updates dragOffset.
  const restX = vp.w - BUBBLE_SIZE - 20;
  const restY = vp.h - BUBBLE_SIZE - 20;
  const baseX = restX + dragOffset.x;
  const baseY = restY + dragOffset.y;

  // When the panel is open, lift the bubble so it sits just above the panel.
  const panelOffsetX = open
    ? Math.min(PANEL_WIDTH + PANEL_GAP, vp.w - 32)
    : 0;
  const panelOffsetY = open ? Math.min(PANEL_HEIGHT + PANEL_GAP, vp.h - 32) : 0;

  // Show bubble only when panel is closed.
  const showBubble = !open;

  return (
    <>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="fab-wrap"
            style={{
              position: "fixed",
              left: baseX,
              top: baseY - panelOffsetY,
              zIndex: 50,
              touchAction: "none",
            }}
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.6 }}
            animate={
              reduce
                ? undefined
                : {
                    opacity: hiddenByScroll ? 0 : 1,
                    y: hiddenByScroll ? 20 : 0,
                    scale: 1,
                  }
            }
            exit={reduce ? undefined : { opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            {/* Pulse ring — pure decoration, sits behind the bubble */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/40"
              animate={
                reduce
                  ? undefined
                  : {
                      scale: [1, 1.6, 1.6],
                      opacity: [0.5, 0, 0],
                    }
              }
              transition={{
                duration: 2.4,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
            />

            <motion.button
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onDragEnd={onDragEnd}
              drag={false}
              whileHover={reduce || isDragging ? undefined : { scale: 1.06 }}
              whileTap={reduce || isDragging ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`relative size-16 rounded-full bg-primary text-primary-foreground shadow-lift flex items-center justify-center ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              aria-label="Open Terra chatbot"
              title="Terra — your India travel guide"
            >
              <Sparkles className="size-7" />

              {/* Notification dot — disappears once the user opens the panel */}
              {!hasOpened && (
                <span
                  className="absolute top-1 right-1 size-3 rounded-full bg-amber-400 ring-2 ring-background"
                  aria-label="New messages"
                />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            variants={reduce ? undefined : modalVariants}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            exit={reduce ? undefined : "exit"}
            style={{
              position: "fixed",
              right: 20,
              bottom: 20,
              zIndex: 50,
              width: `min(${PANEL_WIDTH}px, calc(100vw - 2rem))`,
              height: `min(${PANEL_HEIGHT}px, calc(100vh - 3rem))`,
              transform: `translate(${Math.min(dragOffset.x, vp.w - PANEL_WIDTH - 32)}px, ${Math.min(dragOffset.y, vp.h - PANEL_HEIGHT - 32)}px)`,
            }}
            className="bg-card border border-border rounded-2xl shadow-lift flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center">
                <Bot className="size-4 text-primary" />
              </div>

              <div className="flex-1">
                <p className="font-display leading-tight flex items-center gap-1.5">
                  Terra
                  <Sparkles className="size-3 text-primary" />
                </p>
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
                <motion.div
                  key={i}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: DUR.base, ease: EASE }}
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
                </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}