import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, Thermometer, Loader2, AlertCircle } from "lucide-react";

type WeatherResp = {
  weather?: { temp: number; feels_like: number; humidity: number; wind_mps: number; condition: string; description: string; icon: string; city: string };
  forecast?: { time: string; temp: number; condition: string; icon: string }[];
  aqi?: { value?: number; dominant?: string; station?: string; mock?: boolean; error?: string };
  mock?: boolean;
};

const aqiBand = (v?: number) => {
  if (v == null) return { label: "—", color: "bg-muted text-muted-foreground" };
  if (v <= 50) return { label: "Good", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" };
  if (v <= 100) return { label: "Moderate", color: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" };
  if (v <= 150) return { label: "Unhealthy (SG)", color: "bg-orange-500/15 text-orange-700 dark:text-orange-400" };
  if (v <= 200) return { label: "Unhealthy", color: "bg-red-500/15 text-red-700 dark:text-red-400" };
  if (v <= 300) return { label: "Very Unhealthy", color: "bg-purple-500/15 text-purple-700 dark:text-purple-400" };
  return { label: "Hazardous", color: "bg-rose-700/20 text-rose-800 dark:text-rose-300" };
};

export function WeatherCard({ lat, lng }: { lat: number; lng: number }) {
  const [data, setData] = useState<WeatherResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true); setErr(null);
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather?lat=${lat}&lng=${lng}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    })
      .then(r => r.json())
      .then(d => { if (!cancel) setData(d); })
      .catch(e => { if (!cancel) setErr(e.message); })
      .finally(() => { if (!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, [lat, lng]);

  if (loading) return <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading weather…</div>;
  if (err || !data) return <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-destructive"><AlertCircle className="size-4" /> Weather unavailable</div>;

  const w = data.weather;
  const a = data.aqi;
  const band = aqiBand(a?.value);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg">Live Weather & AQI</h3>
        {data.mock && <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded">Mock</span>}
      </div>
      {w && (
        <div className="flex items-center gap-3 mb-4">
          {w.icon && (
            <img
              src={w.icon}
              alt={w.condition}
              className="size-14 -my-2"
            />
          )}
          <div>
            <p className="text-3xl font-display leading-none">{Math.round(w.temp)}°<span className="text-base text-muted-foreground">C</span></p>
            <p className="text-sm text-muted-foreground capitalize">{w.condition}</p>
          </div>
        </div>
      )}
      {w && (
        <div className="grid grid-cols-3 gap-2 text-xs mb-4">
          <div className="flex items-center gap-1.5"><Thermometer className="size-3.5 text-primary" />Feels {Math.round(w.feels_like)}°</div>
          <div className="flex items-center gap-1.5"><Droplets className="size-3.5 text-primary" />{w.humidity}%</div>
          <div className="flex items-center gap-1.5"><Wind className="size-3.5 text-primary" />{w.wind_mps} m/s</div>
        </div>
      )}
      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Air Quality</span>
          {a?.mock && <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Mock</span>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display">{a?.value ?? "—"}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${band.color}`}>{band.label}</span>
        </div>
        {a?.station && <p className="text-xs text-muted-foreground mt-1 truncate">{a.station}</p>}
      </div>
      {data.forecast && data.forecast.length > 0 && (
        <div className="border-t border-border mt-3 pt-3">
          <p className="text-xs text-muted-foreground mb-2">Next 24h</p>
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
            {data.forecast.slice(0, 6).map(f => (
              <div key={f.time} className="flex flex-col items-center min-w-[52px] text-center">
                <span className="text-[10px] text-muted-foreground">{new Date(f.time).getHours()}h</span>
                {f.icon && (
                  <img
                    src={f.icon}
                    alt={f.condition}
                    className="size-8 -my-1.5"
                  />
                )}
                <span className="text-xs font-medium">{Math.round(f.temp)}°</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
