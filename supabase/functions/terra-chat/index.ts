// // Terra AI – streaming travel assistant via Lovable AI Gateway.
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
//   try {
//     const { messages, destinationContext } = await req.json();
//     const KEY = Deno.env.get("LOVABLE_API_KEY");
//     if (!KEY) throw new Error("LOVABLE_API_KEY missing");

//     const sys = `You are Terra, the friendly travel guide for HiddenTerra — a site showcasing tourist destinations across India (popular hotspots and hidden gems). Be concise, warm, and practical. Suggest itineraries, best seasons, transport tips, food, and cultural etiquette. If asked about a destination on the site, prefer the supplied context.${destinationContext ? `\n\nCurrent destination context:\n${destinationContext}` : ""}`;

//     const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
//       method: "POST",
//       headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "google/gemini-3-flash-preview",
//         messages: [{ role: "system", content: sys }, ...(messages ?? [])],
//         stream: true,
//       }),
//     });
//     if (r.status === 429) return new Response(JSON.stringify({ error: "Rate limit reached, try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
//     if (r.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
//     if (!r.ok) return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

//     return new Response(r.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
//   } catch (e) {
//     return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
//   }
// });


import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;

serve(async (req) => {
  try {
    // CORS support
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    const { messages, destinationContext } = await req.json();

    const userMessage =
      messages?.[messages.length - 1]?.content || "";

    const prompt = `
You are Terra, the AI travel guide for HiddenTerra.

You help users with:
- Hidden destinations in India
- Tourist hotspots
- Travel itineraries
- Local food recommendations
- Transportation guidance
- Budget planning
- Weather advice


Destination Context:
${destinationContext || "India"}

User Question:
${userMessage}

Provide a helpful, friendly, and travel-focused answer.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return new Response(
        JSON.stringify({
          error: `Gemini request failed (${response.status}): ${errorText}`,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({
        text,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: String(err),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});