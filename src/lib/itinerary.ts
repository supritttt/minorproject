import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LS_KEY = "hiddenterra:itinerary";

export type ItineraryItem = { slug: string; place: string; state: string; addedAt: number };

function read(): ItineraryItem[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]"); } catch { return []; }
}
function write(items: ItineraryItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("itinerary:changed"));
}

export function useItinerary() {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("itinerary:changed", onChange);
    window.addEventListener("storage", onChange);
    return () => { window.removeEventListener("itinerary:changed", onChange); window.removeEventListener("storage", onChange); };
  }, []);

  return {
    items,
    add: (it: Omit<ItineraryItem, "addedAt">) => {
      const cur = read();
      if (cur.some(i => i.slug === it.slug)) { toast.info("Already in your itinerary"); return; }
      write([...cur, { ...it, addedAt: Date.now() }]);
      toast.success(`${it.place} added to itinerary`);
    },
    remove: (slug: string) => write(read().filter(i => i.slug !== slug)),
    clear: () => write([]),
    has: (slug: string) => items.some(i => i.slug === slug),
  };
}

// Save current local itinerary to cloud (creates a new record + share token).
export async function saveItineraryToCloud(userId: string, title: string, items: ItineraryItem[]) {
  const { data, error } = await supabase
    .from("itineraries")
    .insert({ user_id: userId, title, items: items as any })
    .select("id, share_token, title")
    .single();
  if (error) throw error;
  return data;
}
