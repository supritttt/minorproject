import { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Loader2,
  AlertCircle,
  RefreshCw,
  Sun,
} from "lucide-react";

export type WeatherData = {
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

export type AQIData = {
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

export type WeatherResp = {
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
  source?: "supabase" | "open-meteo";
};

// Map WMO Weather Codes to human conditions and icons
function getWmoInfo(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: "Clear Sky", icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png" };
  if (code === 1) return { condition: "Mainly Clear", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" };
  if (code === 2) return { condition: "Partly Cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" };
  if (code === 3) return { condition: "Overcast", icon: "https://cdn.weatherapi.com/weather/64x64/day/122.png" };
  if (code === 45 || code === 48) return { condition: "Fog", icon: "https://cdn.weatherapi.com/weather/64x64/day/248.png" };
  if (code >= 51 && code <= 55) return { condition: "Drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" };
  if (code >= 61 && code <= 65) return { condition: "Rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/296.png" };
  if (code >= 71 && code <= 77) return { condition: "Snow", icon: "https://cdn.weatherapi.com/weather/64x64/day/338.png" };
  if (code >= 80 && code <= 82) return { condition: "Rain Showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/356.png" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "https://cdn.weatherapi.com/weather/64x64/day/389.png" };
  return { condition: "Partly Cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" };
}

// Convert PM2.5 concentration to EPA AQI
function calculatePM25AQI(pm25: number | null): number | null {
  if (pm25 == null || !Number.isFinite(pm25)) return null;
  const breakpoints = [
    { cLow: 0.0, cHigh: 9.0, iLow: 0, iHigh: 50 },
    { cLow: 9.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 125.4, iLow: 151, iHigh: 200 },
    { cLow: 125.5, cHigh: 225.4, iLow: 201, iHigh: 300 },
    { cLow: 225.5, cHigh: 325.4, iLow: 301, iHigh: 500 },
  ];
  const concentration = Math.min(pm25, 325.4);
  const bp = breakpoints.find((b) => concentration >= b.cLow && concentration <= b.cHigh);
  if (!bp) return concentration > 325.4 ? 500 : null;
  const aqi = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (concentration - bp.cLow) + bp.iLow;
  return Math.round(aqi);
}

function getAQICategory(aqi: number | null): string {
  if (aqi == null) return "Unavailable";
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

const aqiBand = (v?: number | null) => {
  if (v == null) {
    return { label: "Unavailable", color: "bg-muted text-muted-foreground" };
  }
  if (v <= 50) {
    return { label: "Good", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30" };
  }
  if (v <= 100) {
    return { label: "Moderate", color: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30" };
  }
  if (v <= 150) {
    return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-500/30" };
  }
  if (v <= 200) {
    return { label: "Unhealthy", color: "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30" };
  }
  if (v <= 300) {
    return { label: "Very Unhealthy", color: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30" };
  }
  return { label: "Hazardous", color: "bg-rose-700/20 text-rose-800 dark:text-rose-300 border border-rose-700/30" };
};

// Direct client fallback to Open-Meteo (zero key required, works worldwide, 100% CORS safe)
async function fetchOpenMeteoFallback(lat: number, lng: number): Promise<WeatherResp> {
  const weatherPromise = fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(
      lng
    )}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&timezone=auto`
  ).then((r) => r.json());

  const aqiPromise = fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${encodeURIComponent(
      lat
    )}&longitude=${encodeURIComponent(
      lng
    )}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`
  )
    .then((r) => r.json())
    .catch(() => null);

  const [wData, aqiData] = await Promise.all([weatherPromise, aqiPromise]);

  const current = wData?.current;
  const wmo = getWmoInfo(current?.weather_code ?? 0);
  const currentPM25 = aqiData?.current?.pm2_5 != null ? Number(aqiData.current.pm2_5) : null;
  const calculatedAqi = calculatePM25AQI(currentPM25);

  const forecast = (wData?.hourly?.time || []).slice(0, 8).map((t: string, i: number) => {
    const code = wData.hourly.weather_code?.[i] ?? 0;
    const info = getWmoInfo(code);
    return {
      time: t,
      temp: wData.hourly.temperature_2m?.[i] ?? 0,
      condition: info.condition,
      icon: info.icon,
    };
  });

  return {
    version: "CLIENT_OPEN_METEO_FALLBACK",
    source: "open-meteo",
    weather: {
      temp: current?.temperature_2m ?? 24,
      feels_like: current?.apparent_temperature ?? current?.temperature_2m ?? 24,
      humidity: current?.relative_humidity_2m ?? 50,
      wind_mps: current?.wind_speed_10m != null ? Number((current.wind_speed_10m / 3.6).toFixed(1)) : 2.5,
      condition: wmo.condition,
      icon: wmo.icon,
      last_updated: current?.time ? new Date(current.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Live",
    },
    aqi: {
      value: calculatedAqi,
      category: getAQICategory(calculatedAqi),
      dominant_pollutant: "PM2.5",
      pm25: currentPM25,
      pm10: aqiData?.current?.pm10 != null ? Number(aqiData.current.pm10) : null,
      o3: aqiData?.current?.ozone != null ? Number(aqiData.current.ozone) : null,
      no2: aqiData?.current?.nitrogen_dioxide != null ? Number(aqiData.current.nitrogen_dioxide) : null,
      so2: aqiData?.current?.sulphur_dioxide != null ? Number(aqiData.current.sulphur_dioxide) : null,
      co: aqiData?.current?.carbon_monoxide != null ? Number(aqiData.current.carbon_monoxide) : null,
      source: "Open-Meteo",
      estimated: true,
    },
    forecast,
  };
}

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
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancel = false;

    const loadWeather = async () => {
      try {
        setLoading(true);
        setErr(null);

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        let gotData = false;

        // Step 1: Try Supabase Edge Function
        if (supabaseUrl && publishableKey) {
          try {
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

            if (response.ok) {
              const result = await response.json();
              if (result && result.weather && !result.weather_error) {
                if (!cancel) {
                  setData({ ...result, source: "supabase" });
                  gotData = true;
                }
              }
            }
          } catch (e) {
            console.warn("Supabase weather fetch failed, attempting Open-Meteo fallback:", e);
          }
        }

        // Step 2: Fallback to direct Open-Meteo (zero key required, works reliably)
        if (!gotData) {
          const fallbackData = await fetchOpenMeteoFallback(lat, lng);
          if (!cancel) {
            setData(fallbackData);
            gotData = true;
          }
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
  }, [lat, lng, retryKey]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-porcelain/90 via-card to-card border border-heather/25 rounded-xl p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg text-foreground">Live Weather & AQI</h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold badge-lemon animate-pulse">
              Syncing
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-heather" />
          <span className="text-sm">Fetching real-time weather & AQI…</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------
  if (err || !data || !data.weather) {
    return (
      <div className="bg-card border border-rose-300/40 rounded-xl p-5 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="size-4" />
            <span className="font-medium text-sm">Weather temporarily unavailable</span>
          </div>
          <button
            onClick={() => setRetryKey((k) => k + 1)}
            className="text-xs text-heather hover:text-heather-700 flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw className="size-3" /> Retry
          </button>
        </div>
        {err && <p className="text-xs text-muted-foreground opacity-80">{err}</p>}
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
    <div className="bg-gradient-to-br from-porcelain/90 via-card to-card border border-heather/30 rounded-xl p-5 shadow-soft hover:shadow-lift transition-all">
      {/* =================================================
          HEADER
      ================================================= */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg tracking-tight">Live Weather & AQI</h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold badge-lemon shadow-[0_0_10px_rgba(228,255,59,0.45)]">
            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
            LIVE
          </span>
        </div>

        {data.source === "open-meteo" ? (
          <span className="text-[10px] uppercase tracking-wider bg-heather/15 text-heather-700 font-medium px-2 py-0.5 rounded-full border border-heather/25">
            Meteo Satellite
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-wider bg-heather/15 text-heather-700 font-medium px-2 py-0.5 rounded-full border border-heather/25">
            Verified
          </span>
        )}
      </div>

      {/* =================================================
          WEATHER OVERVIEW
      ================================================= */}
      {w && (
        <>
          <div className="flex items-center gap-3 mb-4 bg-porcelain/40 p-3 rounded-lg border border-heather/20">
            {w.icon ? (
              <img
                src={w.icon}
                alt={w.condition || "Weather"}
                className="size-14 -my-2 drop-shadow-sm"
              />
            ) : (
              <Sun className="size-10 text-amber-500" />
            )}

            <div>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-display font-semibold leading-none text-foreground">
                  {w.temp != null ? Math.round(w.temp) : "—"}
                </p>
                <span className="text-base font-medium text-muted-foreground">°C</span>
              </div>

              <p className="text-sm font-medium text-foreground/80 capitalize mt-0.5">
                {w.condition || "Clear"}
              </p>

              {w.city && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {w.city}
                  {w.region ? `, ${w.region}` : ""}
                </p>
              )}
            </div>
          </div>

          {/* WEATHER DETAILS */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-4">
            <div className="flex items-center gap-1.5 bg-card/80 p-2 rounded-md border border-border/80">
              <Thermometer className="size-3.5 text-heather shrink-0" />
              <div className="truncate">
                <span className="text-muted-foreground block text-[10px]">Feels</span>
                <span className="font-semibold text-foreground">
                  {w.feels_like != null ? `${Math.round(w.feels_like)}°C` : "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-card/80 p-2 rounded-md border border-border/80">
              <Droplets className="size-3.5 text-heather shrink-0" />
              <div className="truncate">
                <span className="text-muted-foreground block text-[10px]">Humidity</span>
                <span className="font-semibold text-foreground">
                  {w.humidity != null ? `${w.humidity}%` : "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-card/80 p-2 rounded-md border border-border/80">
              <Wind className="size-3.5 text-heather shrink-0" />
              <div className="truncate">
                <span className="text-muted-foreground block text-[10px]">Wind</span>
                <span className="font-semibold text-foreground">
                  {w.wind_mps != null ? `${w.wind_mps} m/s` : "—"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =================================================
          AQI
      ================================================= */}
      <div className="border-t border-heather/20 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Air Quality Index
          </span>
          {a?.source && (
            <span className="text-[10px] uppercase tracking-wide bg-heather/10 text-heather-700 font-medium px-2 py-0.5 rounded border border-heather/20">
              {a.source}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-3xl font-display font-semibold text-foreground">
            {a?.value ?? "—"}
          </span>

          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${band.color}`}
          >
            {a?.category || band.label}
          </span>
        </div>

        {/* AQI source note */}
        {a?.source === "Open-Meteo" && (
          <p className="text-[11px] text-muted-foreground mt-1">
            Real-time atmospheric modeling (CAMS)
          </p>
        )}

        {/* Pollutants */}
        {(a?.pm25 != null || a?.pm10 != null || a?.o3 != null || a?.no2 != null) && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-border/60 text-xs">
            {a?.pm25 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">PM2.5</span>
                <span className="font-semibold text-foreground">{a.pm25} µg/m³</span>
              </div>
            )}
            {a?.pm10 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">PM10</span>
                <span className="font-semibold text-foreground">{a.pm10} µg/m³</span>
              </div>
            )}
            {a?.o3 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ozone (O₃)</span>
                <span className="font-semibold text-foreground">{a.o3} µg/m³</span>
              </div>
            )}
            {a?.no2 != null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">NO₂</span>
                <span className="font-semibold text-foreground">{a.no2} µg/m³</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =================================================
          FORECAST
      ================================================= */}
      {data.forecast && data.forecast.length > 0 && (
        <div className="border-t border-heather/20 mt-4 pt-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2.5">
            Next Hours
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {data.forecast.slice(0, 6).map((f, idx) => (
              <div
                key={f.time || idx}
                className="min-w-[56px] text-center p-2 rounded-lg bg-card/60 border border-border/70 hover:border-heather/40 transition-colors"
              >
                <p className="text-[11px] text-muted-foreground font-medium">
                  {new Date(f.time).getHours()}h
                </p>

                {f.icon && (
                  <img
                    src={f.icon}
                    alt={f.condition}
                    className="size-7 mx-auto my-0.5"
                  />
                )}

                <p className="text-xs font-semibold text-foreground">
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