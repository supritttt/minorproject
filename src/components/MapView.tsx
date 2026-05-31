import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/data/destinations";

// Fix default icon paths (Leaflet's webpack-style assets break with bundlers).
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

export function MapView({ destination }: { destination: Destination }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([destination.coords.lat, destination.coords.lng], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors", maxZoom: 18,
    }).addTo(map);
    L.marker([destination.coords.lat, destination.coords.lng], { icon })
      .addTo(map).bindPopup(`<strong>${destination.place}</strong><br/>${destination.state}`);
    destination.nearby_poi.forEach(p => {
      L.circleMarker([p.coords.lat, p.coords.lng], { radius: 6, color: "hsl(var(--primary))", fillOpacity: 0.7, weight: 2 })
        .addTo(map).bindPopup(`<strong>${p.name}</strong><br/><em>${p.kind}</em>`);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [destination]);

  return <div ref={ref} className="h-[320px] w-full rounded-xl border border-border overflow-hidden z-0" aria-label={`Map of ${destination.place}`} />;
}
