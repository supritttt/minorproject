import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/data/destinations";
import { stayLinks, type Stay } from "@/data/stays";

// Fix default icon paths (Leaflet's webpack-style assets break with bundlers).
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

// Gold-pill marker for stays — uses SVG so we don't need a new asset.
const stayIcon = L.divIcon({
  className: "stay-marker",
  html: `<div style="
      width: 18px; height: 18px; border-radius: 50%;
      background: hsl(32 49% 64%);
      border: 2px solid hsl(230 50% 9%);
      box-shadow: 0 2px 6px hsl(0 0% 0% / 0.3);
    "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

const stayPopupHtml = (s: Stay) => {
  const links = stayLinks(s);
  return `
    <div style="font-family: Inter, system-ui, sans-serif; min-width: 200px;">
      <strong>${escapeHtml(s.name)}</strong>
      <div style="font-size: 11px; color: #555; margin: 2px 0 6px;">${escapeHtml(s.area)}</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <a href="${links.booking}" target="_blank" rel="noopener noreferrer"
           style="font-size: 12px; color: #113F67; text-decoration: none;">Book on Booking.com →</a>
        <a href="${links.makemytrip}" target="_blank" rel="noopener noreferrer"
           style="font-size: 12px; color: #113F67; text-decoration: none;">Book on MakeMyTrip →</a>
        <a href="${links.google}" target="_blank" rel="noopener noreferrer"
           style="font-size: 12px; color: #113F67; text-decoration: none;">View on Google Hotels →</a>
      </div>
    </div>
  `;
};

export function MapView({
  destination,
  stays,
}: {
  destination: Destination;
  stays?: Stay[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const stayLayersRef = useRef<L.Layer[]>([]);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView(
      [destination.coords.lat, destination.coords.lng],
      11
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    L.marker([destination.coords.lat, destination.coords.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${destination.place}</strong><br/>${destination.state}`);

    destination.nearby_poi.forEach((p) => {
      L.circleMarker([p.coords.lat, p.coords.lng], {
        radius: 6,
        color: "hsl(var(--primary))",
        fillOpacity: 0.7,
        weight: 2,
      })
        .addTo(map)
        .bindPopup(`<strong>${p.name}</strong><br/><em>${p.kind}</em>`);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      stayLayersRef.current = [];
    };
  }, [destination]);

  // Render & keep stay markers in sync when `stays` changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous stay layers
    stayLayersRef.current.forEach((l) => map.removeLayer(l));
    stayLayersRef.current = [];

    if (!stays || stays.length === 0) return;

    const layers: L.Layer[] = [];
    const points: L.LatLngTuple[] = [[destination.coords.lat, destination.coords.lng]];
    stays.forEach((s) => {
      const m = L.marker([s.coords.lat, s.coords.lng], { icon: stayIcon })
        .addTo(map)
        .bindPopup(stayPopupHtml(s));
      layers.push(m);
      points.push([s.coords.lat, s.coords.lng]);
    });
    stayLayersRef.current = layers;

    // Fit the map to show destination + stays, with some padding.
    if (points.length > 1) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [stays, destination]);

  // Honor a "highlight this stay" request from NearStays.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const raw = sessionStorage.getItem("nearStayFocus");
    if (!raw) return;
    try {
      const { lat, lng } = JSON.parse(raw) as { lat: number; lng: number };
      map.setView([lat, lng], 14, { animate: true });
      // Clear so a future navigation doesn't re-trigger.
      sessionStorage.removeItem("nearStayFocus");
    } catch {
      // ignore
    }
  });

  return (
    <div
      ref={ref}
      className="h-[320px] w-full rounded-xl border border-border overflow-hidden z-0"
      aria-label={`Map of ${destination.place}`}
    />
  );
}
