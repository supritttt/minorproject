// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// };

// serve(async (req: Request) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: corsHeaders,
//     });
//   }

//   try {
//     const url = new URL(req.url);

//     const lat = Number(url.searchParams.get("lat"));
//     const lng = Number(url.searchParams.get("lng"));

//     if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
//       return new Response(
//         JSON.stringify({
//           error: "lat and lng are required",
//         }),
//         {
//           status: 400,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const weatherKey = Deno.env.get("WEATHER_API_KEY");
//     const aqiKey = Deno.env.get("AQI_API_KEY");

//     if (!weatherKey) {
//       throw new Error("WEATHER_API_KEY is missing");
//     }

//     if (!aqiKey) {
//       throw new Error("AQI_API_KEY is missing");
//     }

//     const result: Record<string, any> = {};
//     result.version = "AQI_DEBUG_V1";

//     // Weather API
//     // const weatherResponse = await fetch(
//     //   `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${lat},${lng}&days=1&aqi=no`
//     // );
//     const weatherResponse = await fetch(
//       `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${lat},${lng}&days=1&aqi=yes`
//     );

//     // AQI API
//     let aqiResponse: Response | null = null;

//     try {
//       aqiResponse = await fetch(
//         `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${aqiKey}`
//       );
//     } catch (error) {
//       result.aqi_error = {
//         type: "fetch_exception",
//         message:
//           error instanceof Error ? error.message : String(error),
//       };
//     }

//     // Weather
//     if (weatherResponse.ok) {
//       const weather = await weatherResponse.json();

//       result.weather = {
//         city: weather.location.name,
//         region: weather.location.region,
//         country: weather.location.country,
//         temp: weather.current.temp_c,
//         feels_like: weather.current.feelslike_c,
//         humidity: weather.current.humidity,
//         wind_kph: weather.current.wind_kph,
//         wind_mps: (weather.current.wind_kph / 3.6).toFixed(1),
//         condition: weather.current.condition.text,
//         icon: `https:${weather.current.condition.icon}`,
//         last_updated: weather.current.last_updated,
//       };
//       result.forecast =
//         weather.forecast?.forecastday?.[0]?.hour?.map(
//           (hour: any) => ({
//             time: hour.time,
//             temp: hour.temp_c,
//             condition: hour.condition.text,
//             // icon: hour.condition.icon,
//             icon: `https:${hour.condition.icon}`,
//           })
//         ) || [];
//     } else {
//       result.weather_error = await weatherResponse.text();
//     }

//     // AQI
//     if (aqiResponse && aqiResponse.ok) {
//       const aqi = await aqiResponse.json();

//       if (aqi.status === "ok") {
//         result.aqi = {
//           value: aqi.data.aqi,
//           city: aqi.data.city?.name,
//           dominant_pollutant: aqi.data.dominentpol,
//           pm25: aqi.data.iaqi?.pm25?.v ?? null,
//           pm10: aqi.data.iaqi?.pm10?.v ?? null,
//           o3: aqi.data.iaqi?.o3?.v ?? null,
//           no2: aqi.data.iaqi?.no2?.v ?? null,
//           so2: aqi.data.iaqi?.so2?.v ?? null,
//           co: aqi.data.iaqi?.co?.v ?? null,
//         };
//       } else {
//         result.aqi_error = {
//           type: "waqi_error",
//           message: aqi.data,
//         };
//       }
//     } else if (!result.aqi_error) {
//       result.aqi_error = {
//         type: "no_response",
//         message: "AQI service unreachable",
//       };
//     }

//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: {
//         ...corsHeaders,
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         error:
//           error instanceof Error
//             ? error.message
//             : "Unknown server error",
//       }),
//       {
//         status: 500,
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// });




// new
// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// };

// serve(async (req: Request) => {
//   // Handle CORS preflight
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: corsHeaders,
//     });
//   }

//   try {
//     const url = new URL(req.url);

//     const latParam = url.searchParams.get("lat");
//     const lngParam = url.searchParams.get("lng");

//     const lat = Number(latParam);
//     const lng = Number(lngParam);

//     // --------------------------------------------------
//     // Validate coordinates
//     // --------------------------------------------------

//     if (
//       !Number.isFinite(lat) ||
//       !Number.isFinite(lng) ||
//       lat < -90 ||
//       lat > 90 ||
//       lng < -180 ||
//       lng > 180
//     ) {
//       return new Response(
//         JSON.stringify({
//           error: "Valid lat and lng coordinates are required",
//         }),
//         {
//           status: 400,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // --------------------------------------------------
//     // API KEYS
//     // --------------------------------------------------

//     const weatherKey = Deno.env.get("WEATHER_API_KEY");
//     const aqiKey = Deno.env.get("AQI_API_KEY");

//     if (!weatherKey) {
//       throw new Error("WEATHER_API_KEY is missing");
//     }

//     // AQI_API_KEY is optional.
//     // If WAQI is unavailable, WeatherAPI AQI will be used.
//     const result: Record<string, any> = {};

//     result.version = "AQI_DEBUG_V2";

//     // --------------------------------------------------
//     // WEATHER API
//     // --------------------------------------------------

//     let weather: any = null;

//     try {
//       const weatherUrl =
//         `https://api.weatherapi.com/v1/forecast.json` +
//         `?key=${encodeURIComponent(weatherKey)}` +
//         `&q=${encodeURIComponent(`${lat},${lng}`)}` +
//         `&days=1` +
//         `&aqi=yes` +
//         `&alerts=no`;

//       const weatherResponse = await fetch(weatherUrl);

//       if (!weatherResponse.ok) {
//         const errorText = await weatherResponse.text();

//         result.weather_error = {
//           status: weatherResponse.status,
//           message: errorText,
//         };
//       } else {
//         weather = await weatherResponse.json();

//         // --------------------------------------------------
//         // Weather information
//         // --------------------------------------------------

//         result.weather = {
//           city: weather.location?.name ?? null,
//           region: weather.location?.region ?? null,
//           country: weather.location?.country ?? null,

//           temp: weather.current?.temp_c ?? null,
//           feels_like: weather.current?.feelslike_c ?? null,

//           humidity: weather.current?.humidity ?? null,

//           wind_kph: weather.current?.wind_kph ?? null,

//           wind_mps:
//             typeof weather.current?.wind_kph === "number"
//               ? Number(
//                   (weather.current.wind_kph / 3.6).toFixed(1)
//                 )
//               : null,

//           condition: weather.current?.condition?.text ?? null,

//           icon: weather.current?.condition?.icon
//             ? `https:${weather.current.condition.icon}`
//             : null,

//           last_updated:
//             weather.current?.last_updated ?? null,
//         };

//         // --------------------------------------------------
//         // Hourly forecast
//         // --------------------------------------------------

//         result.forecast =
//           weather.forecast?.forecastday?.[0]?.hour?.map(
//             (hour: any) => ({
//               time: hour.time ?? null,
//               temp: hour.temp_c ?? null,
//               condition: hour.condition?.text ?? null,

//               icon: hour.condition?.icon
//                 ? `https:${hour.condition.icon}`
//                 : null,
//             })
//           ) ?? [];
//       }
//     } catch (error) {
//       result.weather_error = {
//         type: "fetch_exception",
//         message:
//           error instanceof Error
//             ? error.message
//             : String(error),
//       };
//     }

//     // --------------------------------------------------
//     // AQI FROM WAQI
//     // --------------------------------------------------

//     let waqiAQIAvailable = false;

//     if (aqiKey) {
//       try {
//         const waqiUrl =
//           `https://api.waqi.info/feed/geo:${lat};${lng}/` +
//           `?token=${encodeURIComponent(aqiKey)}`;

//         const aqiResponse = await fetch(waqiUrl);

//         if (aqiResponse.ok) {
//           const aqi = await aqiResponse.json();

//           if (aqi.status === "ok" && aqi.data) {
//             const data = aqi.data;

//             const numericAQI = Number(data.aqi);

//             // WAQI sometimes returns "-" instead of a number
//             if (Number.isFinite(numericAQI)) {
//               result.aqi = {
//                 value: numericAQI,

//                 city: data.city?.name ?? null,

//                 dominant_pollutant:
//                   data.dominentpol ?? null,

//                 pm25: data.iaqi?.pm25?.v ?? null,
//                 pm10: data.iaqi?.pm10?.v ?? null,
//                 o3: data.iaqi?.o3?.v ?? null,
//                 no2: data.iaqi?.no2?.v ?? null,
//                 so2: data.iaqi?.so2?.v ?? null,
//                 co: data.iaqi?.co?.v ?? null,

//                 source: "WAQI",
//                 fallback: false,
//               };

//               waqiAQIAvailable = true;
//             } else {
//               result.aqi_error = {
//                 type: "waqi_invalid_aqi",
//                 message: "WAQI returned an invalid AQI value",
//               };
//             }
//           } else {
//             result.aqi_error = {
//               type: "waqi_error",
//               message:
//                 typeof aqi.data === "string"
//                   ? aqi.data
//                   : "WAQI did not return valid AQI data",
//             };
//           }
//         } else {
//           result.aqi_error = {
//             type: "waqi_http_error",
//             status: aqiResponse.status,
//             message: await aqiResponse.text(),
//           };
//         }
//       } catch (error) {
//         result.aqi_error = {
//           type: "waqi_fetch_exception",
//           message:
//             error instanceof Error
//               ? error.message
//               : String(error),
//         };
//       }
//     } else {
//       result.aqi_error = {
//         type: "missing_key",
//         message:
//           "AQI_API_KEY is not configured. Using WeatherAPI AQI fallback.",
//       };
//     }

//     // --------------------------------------------------
//     // WEATHERAPI AQI FALLBACK
//     // --------------------------------------------------

//     if (!waqiAQIAvailable) {
//       const air = weather?.current?.air_quality;

//       if (air) {
//         const usEpaIndex = Number(air["us-epa-index"]);

//         result.aqi = {
//           value: Number.isFinite(usEpaIndex)
//             ? usEpaIndex
//             : null,

//           city: weather.location?.name ?? null,

//           dominant_pollutant: null,

//           pm25: air.pm2_5 ?? null,
//           pm10: air.pm10 ?? null,
//           o3: air.o3 ?? null,
//           no2: air.no2 ?? null,
//           so2: air.so2 ?? null,
//           co: air.co ?? null,

//           source: "WeatherAPI",
//           fallback: true,

//           us_epa_index: Number.isFinite(usEpaIndex)
//             ? usEpaIndex
//             : null,
//         };
//       }
//     }

//     // --------------------------------------------------
//     // NO AQI AVAILABLE
//     // --------------------------------------------------

//     if (!result.aqi) {
//       result.aqi = {
//         value: null,

//         city: weather?.location?.name ?? null,

//         dominant_pollutant: null,

//         pm25: null,
//         pm10: null,
//         o3: null,
//         no2: null,
//         so2: null,
//         co: null,

//         source: null,
//         fallback: false,
//       };

//       result.aqi_error = {
//         type: "unavailable",
//         message:
//           "AQI data is not available for this location.",
//       };
//     }

//     // --------------------------------------------------
//     // AQI CATEGORY
//     // --------------------------------------------------

//     if (
//       result.aqi?.value !== null &&
//       Number.isFinite(Number(result.aqi.value))
//     ) {
//       const value = Number(result.aqi.value);

//       if (result.aqi.source === "WAQI") {
//         if (value <= 50) {
//           result.aqi.category = "Good";
//         } else if (value <= 100) {
//           result.aqi.category = "Moderate";
//         } else if (value <= 150) {
//           result.aqi.category =
//             "Unhealthy for Sensitive Groups";
//         } else if (value <= 200) {
//           result.aqi.category = "Unhealthy";
//         } else if (value <= 300) {
//           result.aqi.category = "Very Unhealthy";
//         } else {
//           result.aqi.category = "Hazardous";
//         }
//       }

//       // WeatherAPI uses the US EPA index from 1 to 6.
//       if (result.aqi.source === "WeatherAPI") {
//         const index = Number(result.aqi.value);

//         const categories: Record<number, string> = {
//           1: "Good",
//           2: "Moderate",
//           3: "Unhealthy for Sensitive Groups",
//           4: "Unhealthy",
//           5: "Very Unhealthy",
//           6: "Hazardous",
//         };

//         result.aqi.category =
//           categories[index] ?? "Unknown";
//       }
//     }

//     // --------------------------------------------------
//     // FINAL RESPONSE
//     // --------------------------------------------------

//     return new Response(JSON.stringify(result), {
//       status: 200,

//       headers: {
//         ...corsHeaders,
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Weather function error:", error);

//     return new Response(
//       JSON.stringify({
//         error:
//           error instanceof Error
//             ? error.message
//             : "Unknown server error",
//       }),
//       {
//         status: 500,

//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// });




// open meteo
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type AnyRecord = Record<string, any>;

function jsonResponse(data: AnyRecord, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

// Convert PM2.5 concentration to US EPA-style AQI.
// This is an estimate because Open-Meteo provides pollutant
// concentrations/modelled data rather than a physical AQI station value.
function calculatePM25AQI(pm25: number | null): number | null {
  if (pm25 == null || !Number.isFinite(pm25)) {
    return null;
  }

  // US EPA PM2.5 AQI breakpoints.
  const breakpoints = [
    { cLow: 0.0, cHigh: 9.0, iLow: 0, iHigh: 50 },
    { cLow: 9.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 125.4, iLow: 151, iHigh: 200 },
    { cLow: 125.5, cHigh: 225.4, iLow: 201, iHigh: 300 },
    { cLow: 225.5, cHigh: 325.4, iLow: 301, iHigh: 500 },
  ];

  const concentration = Math.min(pm25, 325.4);

  const bp = breakpoints.find(
    (item) =>
      concentration >= item.cLow &&
      concentration <= item.cHigh
  );

  if (!bp) {
    return concentration > 325.4 ? 500 : null;
  }

  const aqi =
    ((bp.iHigh - bp.iLow) /
      (bp.cHigh - bp.cLow)) *
      (concentration - bp.cLow) +
    bp.iLow;

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

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return jsonResponse(
        {
          error: "Valid lat and lng are required",
        },
        400
      );
    }

    const weatherKey = Deno.env.get("WEATHER_API_KEY");

    if (!weatherKey) {
      throw new Error("WEATHER_API_KEY is missing");
    }

    const result: AnyRecord = {};

    result.version = "AQI_OPEN_METEO_V1";

    // =========================================================
    // WEATHER API
    // =========================================================

    const weatherUrl =
      `https://api.weatherapi.com/v1/forecast.json` +
      `?key=${encodeURIComponent(weatherKey)}` +
      `&q=${encodeURIComponent(`${lat},${lng}`)}` +
      `&days=1` +
      `&aqi=no`;

    const weatherResponse = await fetch(weatherUrl);

    if (weatherResponse.ok) {
      const weather = await weatherResponse.json();

      result.weather = {
        city: weather.location?.name ?? null,
        region: weather.location?.region ?? null,
        country: weather.location?.country ?? null,

        lat: weather.location?.lat ?? lat,
        lng: weather.location?.lon ?? lng,

        temp: weather.current?.temp_c ?? null,
        feels_like: weather.current?.feelslike_c ?? null,

        humidity: weather.current?.humidity ?? null,

        wind_kph: weather.current?.wind_kph ?? null,

        wind_mps:
          weather.current?.wind_kph != null
            ? Number(
                (weather.current.wind_kph / 3.6).toFixed(1)
              )
            : null,

        condition:
          weather.current?.condition?.text ?? null,

        icon: weather.current?.condition?.icon
          ? `https:${weather.current.condition.icon}`
          : null,

        last_updated:
          weather.current?.last_updated ?? null,
      };

      result.forecast =
        weather.forecast?.forecastday?.[0]?.hour?.map(
          (hour: AnyRecord) => ({
            time: hour.time,
            temp: hour.temp_c,
            condition: hour.condition?.text ?? null,
            icon: hour.condition?.icon
              ? `https:${hour.condition.icon}`
              : null,
          })
        ) || [];
    } else {
      result.weather_error = {
        status: weatherResponse.status,
        message: await weatherResponse.text(),
      };
    }

    // =========================================================
    // OPEN-METEO AIR QUALITY
    // =========================================================

    let airQualityResponse: Response | null = null;

    try {
      const airQualityUrl =
        `https://air-quality-api.open-meteo.com/v1/air-quality` +
        `?latitude=${encodeURIComponent(lat)}` +
        `&longitude=${encodeURIComponent(lng)}` +
        `&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone` +
        `&timezone=auto`;

      airQualityResponse = await fetch(airQualityUrl);

      if (!airQualityResponse.ok) {
        result.aqi_error = {
          type: "open_meteo_error",
          status: airQualityResponse.status,
          message: await airQualityResponse.text(),
        };
      }
    } catch (error) {
      result.aqi_error = {
        type: "fetch_exception",
        message:
          error instanceof Error
            ? error.message
            : String(error),
      };
    }

    // =========================================================
    // PROCESS OPEN-METEO AQI
    // =========================================================

    if (airQualityResponse?.ok) {
      const airQuality = await airQualityResponse.json();

      const current = airQuality.current;

      if (current) {
        const pm25 =
          current.pm2_5 != null
            ? Number(current.pm2_5)
            : null;

        const pm10 =
          current.pm10 != null
            ? Number(current.pm10)
            : null;

        const o3 =
          current.ozone != null
            ? Number(current.ozone)
            : null;

        const no2 =
          current.nitrogen_dioxide != null
            ? Number(current.nitrogen_dioxide)
            : null;

        const so2 =
          current.sulphur_dioxide != null
            ? Number(current.sulphur_dioxide)
            : null;

        const co =
          current.carbon_monoxide != null
            ? Number(current.carbon_monoxide)
            : null;

        const calculatedAQI = calculatePM25AQI(pm25);

        result.aqi = {
          value: calculatedAQI,

          city: result.weather?.city ?? null,

          dominant_pollutant:
            calculatedAQI != null
              ? "PM2.5"
              : null,

          pm25,
          pm10,
          o3,
          no2,
          so2,
          co,

          source: "Open-Meteo",
          model: "CAMS",

          fallback: false,

          category:
            getAQICategory(calculatedAQI),

          // Important:
          // This is calculated from PM2.5 concentration.
          // It is not a direct monitoring-station AQI.
          estimated: true,

          latitude: lat,
          longitude: lng,

          timezone:
            airQuality.timezone ?? null,

          time:
            current.time ?? null,

          units: {
            pm25: "µg/m³",
            pm10: "µg/m³",
            o3: "µg/m³",
            no2: "µg/m³",
            so2: "µg/m³",
            co: "µg/m³",
          },
        };
      } else {
        result.aqi_error = {
          type: "open_meteo_no_current_data",
          message:
            "Open-Meteo returned no current air-quality data",
        };
      }
    }

    // =========================================================
    // FINAL RESPONSE
    // =========================================================

    return jsonResponse(result, 200);
  } catch (error) {
    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      500
    );
  }
});