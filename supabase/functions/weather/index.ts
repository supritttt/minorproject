import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);

    const lat = Number(url.searchParams.get("lat"));
    const lng = Number(url.searchParams.get("lng"));

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return new Response(
        JSON.stringify({
          error: "lat and lng are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const weatherKey = Deno.env.get("VITE_WEATHER_API_KEY");
    const aqiKey = Deno.env.get("VITE_AQI_API_KEY");

    if (!weatherKey) {
      throw new Error("VITE_WEATHER_API_KEY is missing");
    }

    if (!aqiKey) {
      throw new Error("VITE_AQI_API_KEY is missing");
    }

    const result: Record<string, any> = {};
    result.version = "AQI_DEBUG_V1";

    // Weather API
    // const weatherResponse = await fetch(
    //   `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${lat},${lng}&days=1&aqi=no`
    // );
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${lat},${lng}&days=1&aqi=yes`
    );

    // AQI API
    let aqiResponse: Response | null = null;

    try {
      aqiResponse = await fetch(
        `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${aqiKey}`
      );
    } catch (error) {
      result.aqi_error = {
        type: "fetch_exception",
        message:
          error instanceof Error ? error.message : String(error),
      };
    }

    // Weather
    if (weatherResponse.ok) {
      const weather = await weatherResponse.json();

      result.weather = {
        city: weather.location.name,
        region: weather.location.region,
        country: weather.location.country,
        temp: weather.current.temp_c,
        feels_like: weather.current.feelslike_c,
        humidity: weather.current.humidity,
        wind_kph: weather.current.wind_kph,
        wind_mps: (weather.current.wind_kph / 3.6).toFixed(1),
        condition: weather.current.condition.text,
        icon: `https:${weather.current.condition.icon}`,
        last_updated: weather.current.last_updated,
      };
      result.forecast =
        weather.forecast?.forecastday?.[0]?.hour?.map(
          (hour: any) => ({
            time: hour.time,
            temp: hour.temp_c,
            condition: hour.condition.text,
            // icon: hour.condition.icon,
            icon: `https:${hour.condition.icon}`,
          })
        ) || [];
    } else {
      result.weather_error = await weatherResponse.text();
    }

    // AQI
    if (aqiResponse && aqiResponse.ok) {
      const aqi = await aqiResponse.json();

      if (aqi.status === "ok") {
        result.aqi = {
          value: aqi.data.aqi,
          city: aqi.data.city?.name,
          dominant_pollutant: aqi.data.dominentpol,
          pm25: aqi.data.iaqi?.pm25?.v ?? null,
          pm10: aqi.data.iaqi?.pm10?.v ?? null,
          o3: aqi.data.iaqi?.o3?.v ?? null,
          no2: aqi.data.iaqi?.no2?.v ?? null,
          so2: aqi.data.iaqi?.so2?.v ?? null,
          co: aqi.data.iaqi?.co?.v ?? null,
        };
      } else {
        result.aqi_error = {
          type: "waqi_error",
          message: aqi.data,
        };
      }
    } else if (!result.aqi_error) {
      result.aqi_error = {
        type: "no_response",
        message: "AQI service unreachable",
      };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});