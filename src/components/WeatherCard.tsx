// import { useEffect, useState } from "react";
// import { Cloud, Droplets, Wind, Thermometer, Loader2, AlertCircle } from "lucide-react";

// type WeatherResp = {
//   weather?: { temp: number; feels_like: number; humidity: number; wind_mps: number; condition: string; description: string; icon: string; city: string };
//   forecast?: { time: string; temp: number; condition: string; icon: string }[];
//   aqi?: { value?: number; dominant?: string; station?: string; mock?: boolean; error?: string };
//   mock?: boolean;
// };

// const aqiBand = (v?: number) => {
//   if (v == null) return { label: "—", color: "bg-muted text-muted-foreground" };
//   if (v <= 50) return { label: "Good", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" };
//   if (v <= 100) return { label: "Moderate", color: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" };
//   if (v <= 150) return { label: "Unhealthy (SG)", color: "bg-orange-500/15 text-orange-700 dark:text-orange-400" };
//   if (v <= 200) return { label: "Unhealthy", color: "bg-red-500/15 text-red-700 dark:text-red-400" };
//   if (v <= 300) return { label: "Very Unhealthy", color: "bg-purple-500/15 text-purple-700 dark:text-purple-400" };
//   return { label: "Hazardous", color: "bg-rose-700/20 text-rose-800 dark:text-rose-300" };
// };

// export function WeatherCard({ lat, lng }: { lat: number; lng: number }) {
//   const [data, setData] = useState<WeatherResp | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     let cancel = false;
//     setLoading(true); setErr(null);
//     fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather?lat=${lat}&lng=${lng}`, {
//       headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
//     })
//       .then(r => r.json())
//       .then(d => { if (!cancel) setData(d); })
//       .catch(e => { if (!cancel) setErr(e.message); })
//       .finally(() => { if (!cancel) setLoading(false); });
//     return () => { cancel = true; };
//   }, [lat, lng]);

//   if (loading) return <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading weather…</div>;
//   if (err || !data) return <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-destructive"><AlertCircle className="size-4" /> Weather unavailable</div>;

//   const w = data.weather;
//   const a = data.aqi;
//   const band = aqiBand(a?.value);

//   return (
//     <div className="bg-card border border-border rounded-xl p-5">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-display text-lg">Live Weather & AQI</h3>
//         {data.mock && <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded">Mock</span>}
//       </div>
//       {w && (
//         <div className="flex items-center gap-3 mb-4">
//           {w.icon && (
//             <img
//               src={w.icon}
//               alt={w.condition}
//               className="size-14 -my-2"
//             />
//           )}
//           <div>
//             <p className="text-3xl font-display leading-none">{Math.round(w.temp)}°<span className="text-base text-muted-foreground">C</span></p>
//             <p className="text-sm text-muted-foreground capitalize">{w.condition}</p>
//           </div>
//         </div>
//       )}
//       {w && (
//         <div className="grid grid-cols-3 gap-2 text-xs mb-4">
//           <div className="flex items-center gap-1.5"><Thermometer className="size-3.5 text-primary" />Feels {Math.round(w.feels_like)}°</div>
//           <div className="flex items-center gap-1.5"><Droplets className="size-3.5 text-primary" />{w.humidity}%</div>
//           <div className="flex items-center gap-1.5"><Wind className="size-3.5 text-primary" />{w.wind_mps} m/s</div>
//         </div>
//       )}
//       <div className="border-t border-border pt-3">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-sm text-muted-foreground">Air Quality</span>
//           {a?.mock && <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Mock</span>}
//         </div>
//         <div className="flex items-baseline gap-2">
//           <span className="text-2xl font-display">{a?.value ?? "—"}</span>
//           <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${band.color}`}>{band.label}</span>
//         </div>
//         {a?.station && <p className="text-xs text-muted-foreground mt-1 truncate">{a.station}</p>}
//       </div>
//       {data.forecast && data.forecast.length > 0 && (
//         <div className="border-t border-border mt-3 pt-3">
//           <p className="text-xs text-muted-foreground mb-2">Next 24h</p>
//           <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
//             {data.forecast.slice(0, 6).map(f => (
//               <div key={f.time} className="flex flex-col items-center min-w-[52px] text-center">
//                 <span className="text-[10px] text-muted-foreground">{new Date(f.time).getHours()}h</span>
//                 {f.icon && (
//                   <img
//                     src={f.icon}
//                     alt={f.condition}
//                     className="size-8 -my-1.5"
//                   />
//                 )}
//                 <span className="text-xs font-medium">{Math.round(f.temp)}°</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// new
import { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Loader2,
  AlertCircle,
} from "lucide-react";

type WeatherData = {
  temp?: number;
  feels_like?: number;
  humidity?: number;
  wind_mps?: number | string;
  condition?: string;
  icon?: string;
  city?: string;
  region?: string;
  country?: string;
  last_updated?: string;
};

type AQIData = {
  value?: number | null;
  city?: string | null;
  dominant_pollutant?: string | null;

  pm25?: number | null;
  pm10?: number | null;
  o3?: number | null;
  no2?: number | null;
  so2?: number | null;
  co?: number | null;

  source?: string | null;
  model?: string | null;
  fallback?: boolean;

  category?: string | null;
  estimated?: boolean;

  latitude?: number;
  longitude?: number;

  timezone?: string | null;
  time?: string | null;

  units?: {
    pm25?: string;
    pm10?: string;
    o3?: string;
    no2?: string;
    so2?: string;
    co?: string;
  };
};

type WeatherResp = {
  version?: string;
  weather?: WeatherData;
  forecast?: {
    time: string;
    temp: number;
    condition: string;
    icon: string;
  }[];
  aqi?: AQIData;
  aqi_error?: {
    type?: string;
    message?: string;
  };
  weather_error?: {
    status?: number;
    message?: string;
  };
};

const aqiBand = (v?: number | null) => {
  if (v == null) {
    return {
      label: "Unavailable",
      color: "bg-muted text-muted-foreground",
    };
  }

  if (v <= 50) {
    return {
      label: "Good",
      color:
        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    };
  }

  if (v <= 100) {
    return {
      label: "Moderate",
      color:
        "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    };
  }

  if (v <= 150) {
    return {
      label: "Unhealthy for Sensitive Groups",
      color:
        "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    };
  }

  if (v <= 200) {
    return {
      label: "Unhealthy",
      color:
        "bg-red-500/15 text-red-700 dark:text-red-400",
    };
  }

  if (v <= 300) {
    return {
      label: "Very Unhealthy",
      color:
        "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    };
  }

  return {
    label: "Hazardous",
    color:
      "bg-rose-700/20 text-rose-800 dark:text-rose-300",
  };
};

export function WeatherCard({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const [data, setData] = useState<WeatherResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    const loadWeather = async () => {
      try {
        setLoading(true);
        setErr(null);

        const supabaseUrl =
          import.meta.env.VITE_SUPABASE_URL;

        const publishableKey =
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl) {
          throw new Error(
            "VITE_SUPABASE_URL is missing"
          );
        }

        if (!publishableKey) {
          throw new Error(
            "VITE_SUPABASE_PUBLISHABLE_KEY is missing"
          );
        }

        const response = await fetch(
          `${supabaseUrl}/functions/v1/weather?lat=${encodeURIComponent(
            lat
          )}&lng=${encodeURIComponent(lng)}`,
          {
            headers: {
              Authorization: `Bearer ${publishableKey}`,
              apikey: publishableKey,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error ||
              result?.message ||
              `Request failed with status ${response.status}`
          );
        }

        if (!cancel) {
          setData(result);
        }
      } catch (error) {
        if (!cancel) {
          setErr(
            error instanceof Error
              ? error.message
              : "Unable to load weather"
          );
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      cancel = true;
    };
  }, [lat, lng]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <span>Loading weather & AQI…</span>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (err || !data) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-2 text-destructive">
        <AlertCircle className="size-4" />

        <div>
          <p>Weather unavailable</p>

          {err && (
            <p className="text-xs mt-1 opacity-80">
              {err}
            </p>
          )}
        </div>
      </div>
    );
  }

  const w = data.weather;
  const a = data.aqi;

  // --------------------------------------------------
  // AQI
  // --------------------------------------------------

  const band = aqiBand(a?.value);

  const isEstimated =
    a?.estimated === true ||
    a?.source === "Open-Meteo";

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg">
          Live Weather & AQI
        </h3>

        {isEstimated && (
          <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded">
            Estimated
          </span>
        )}
      </div>

      {/* =================================================
          WEATHER
      ================================================= */}

      {w && (
        <>
          <div className="flex items-center gap-3 mb-4">
            {w.icon && (
              <img
                src={w.icon}
                alt={w.condition || "Weather"}
                className="size-14 -my-2"
              />
            )}

            <div>
              <p className="text-3xl font-display leading-none">
                {w.temp != null
                  ? Math.round(w.temp)
                  : "—"}

                <span className="text-base text-muted-foreground">
                  °C
                </span>
              </p>

              <p className="text-sm text-muted-foreground capitalize">
                {w.condition || "Unknown"}
              </p>

              {w.city && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {w.city}
                </p>
              )}
            </div>
          </div>

          {/* WEATHER DETAILS */}

          <div className="grid grid-cols-3 gap-2 text-xs mb-4">
            <div className="flex items-center gap-1.5">
              <Thermometer className="size-3.5 text-primary" />

              <span>
                Feels{" "}
                {w.feels_like != null
                  ? `${Math.round(w.feels_like)}°`
                  : "—"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Droplets className="size-3.5 text-primary" />

              <span>
                {w.humidity != null
                  ? `${w.humidity}%`
                  : "—"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Wind className="size-3.5 text-primary" />

              <span>
                {w.wind_mps != null
                  ? `${w.wind_mps} m/s`
                  : "—"}
              </span>
            </div>
          </div>
        </>
      )}

      {/* =================================================
          AQI
      ================================================= */}

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Air Quality
          </span>

          {a?.source && (
            <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded">
              {a.source}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-3xl font-display">
            {a?.value ?? "—"}
          </span>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${band.color}`}
          >
            {a?.category || band.label}
          </span>
        </div>

        {/* AQI source information */}

        {a?.source === "Open-Meteo" && (
          <p className="text-xs text-muted-foreground mt-1">
            Estimated using CAMS atmospheric model
          </p>
        )}

        {a?.model && (
          <p className="text-xs text-muted-foreground">
            Model: {a.model}
          </p>
        )}

        {/* =================================================
            POLLUTANTS
        ================================================= */}

        {(a?.pm25 != null ||
          a?.pm10 != null ||
          a?.o3 != null ||
          a?.no2 != null ||
          a?.so2 != null ||
          a?.co != null) && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs">
            {a?.pm25 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  PM2.5
                </span>

                <span className="font-medium">
                  {a.pm25}
                </span>
              </div>
            )}

            {a?.pm10 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  PM10
                </span>

                <span className="font-medium">
                  {a.pm10}
                </span>
              </div>
            )}

            {a?.o3 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  O₃
                </span>

                <span className="font-medium">
                  {a.o3}
                </span>
              </div>
            )}

            {a?.no2 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  NO₂
                </span>

                <span className="font-medium">
                  {a.no2}
                </span>
              </div>
            )}

            {a?.so2 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  SO₂
                </span>

                <span className="font-medium">
                  {a.so2}
                </span>
              </div>
            )}

            {a?.co != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  CO
                </span>

                <span className="font-medium">
                  {a.co}
                </span>
              </div>
            )}
          </div>
        )}

        {/* AQI update time */}

        {a?.time && (
          <p className="text-[10px] text-muted-foreground mt-4">
            Updated:{" "}
            {new Date(a.time).toLocaleString()}
          </p>
        )}
      </div>

      {/* =================================================
          FORECAST
      ================================================= */}

      {data.forecast &&
        data.forecast.length > 0 && (
          <div className="border-t border-border mt-4 pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Next 24h
            </p>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {data.forecast
                .slice(0, 6)
                .map((f) => (
                  <div
                    key={f.time}
                    className="min-w-[58px] text-center"
                  >
                    <p className="text-xs text-muted-foreground">
                      {new Date(f.time).getHours()}h
                    </p>

                    {f.icon && (
                      <img
                        src={f.icon}
                        alt={f.condition}
                        className="size-8 mx-auto"
                      />
                    )}

                    <p className="text-sm font-medium">
                      {Math.round(f.temp)}°
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
    </div>
  );
}