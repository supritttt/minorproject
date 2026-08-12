// Curated nearby stays per destination, grouped by tier.
// Real properties — pricing is an indicative per-night range in INR for a
// standard double room (off-peak to peak). Always verify before booking.
//
// Every stay carries `coords` (hotel-accurate where sourced, otherwise
// area-centroid). The booking-link helpers then build real OTA search URLs
// for Booking.com, MakeMyTrip, and Google Hotels — no network call needed.

export type StayTier = "Luxury" | "Standard" | "Budget";
export type Coords = { lat: number; lng: number };
export type Stay = {
  name: string;
  area: string;
  price: string;
  note?: string;
  coords: Coords;
};
export type StaysByTier = Record<StayTier, Stay[]>;

// ---------------------------------------------------------------------------
// Booking link helpers — pure derivation, no API keys required.
// ---------------------------------------------------------------------------

/** Booking.com hotel search with explicit hotel-name query + lat/lng anchor. */
export const bookingUrl = (s: Stay) =>
  `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    `${s.name} ${s.area}`
  )}&dest_type=hotel&latitude=${s.coords.lat}&longitude=${s.coords.lng}`;

/** MakeMyTrip search — passes hotel name as searchText (MMT doesn't use lat/lng). */
export const mmtUrl = (s: Stay) =>
  `https://www.makemytrip.com/hotels/hotel-listing/?searchText=${encodeURIComponent(
    `${s.name} ${s.area}`
  )}`;

/** Google Hotels search — passes full query with location hint. */
export const googleHotelsUrl = (s: Stay) =>
  `https://www.google.com/travel/hotels?q=${encodeURIComponent(
    `${s.name} ${s.area}`
  )}`;

export const stayLinks = (s: Stay) => ({
  booking: bookingUrl(s),
  makemytrip: mmtUrl(s),
  google: googleHotelsUrl(s),
});

// ---------------------------------------------------------------------------
// Distance helper — Haversine great-circle km.
// ---------------------------------------------------------------------------

const R = 6371; // km
const toRad = (d: number) => (d * Math.PI) / 180;

export const distanceKm = (a: Coords, b: Coords): number => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
};

/** Pretty distance label — "1.2 km" or "12 km" (no decimals past 10 km). */
export const formatDistance = (km: number): string => {
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
};

// ---------------------------------------------------------------------------
// Per-destination stay data.
//
// `coords` strategy:
//   - Same town as destination       → use destination's coords (small jitter
//                                      to avoid stack at exact same point).
//   - Mentioned nearby town          → coords of that town (well-known refs).
//   - Vague area ("Mahabaleshwar")   → coords of that town.
// ---------------------------------------------------------------------------

const S = (
  luxury: ReadonlyArray<Omit<Stay, "coords"> & { coords: Coords }>,
  standard: ReadonlyArray<Omit<Stay, "coords"> & { coords: Coords }>,
  budget: ReadonlyArray<Omit<Stay, "coords"> & { coords: Coords }>
): StaysByTier => ({
  Luxury: luxury.map((s) => ({ ...s })),
  Standard: standard.map((s) => ({ ...s })),
  Budget: budget.map((s) => ({ ...s })),
});

// Small helper: jitter coords by ~200-400 m so multiple pins in the same
// town don't stack on the map. Stable seed from a string so jitter stays
// consistent across renders.
const jitter = (base: Coords, seed: string): Coords => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const dLat = ((h & 0xff) / 255 - 0.5) * 0.006; // ~±300m
  const dLng = (((h >> 8) & 0xff) / 255 - 0.5) * 0.006;
  return { lat: base.lat + dLat, lng: base.lng + dLng };
};

// Gangtok: 27.3389, 88.6065
const GANGTOK: Coords = { lat: 27.3389, lng: 88.6065 };
// Lachung: 27.6900, 88.7500
const LACHUNG: Coords = { lat: 27.6900, lng: 88.7500 };
// Zuluk: 27.0595, 88.7985
const ZULUK: Coords = { lat: 27.0595, lng: 88.7985 };
// Pelling: 27.3000, 88.2500
const PELLING: Coords = { lat: 27.3000, lng: 88.2500 };
// Ravangla: 27.3000, 88.3700
const RAVANGLA: Coords = { lat: 27.3000, lng: 88.3700 };
// Dzongu: 27.5000, 88.4500
const DZONGU: Coords = { lat: 27.5000, lng: 88.4500 };
// Borong: 27.1500, 88.3500
const BORONG: Coords = { lat: 27.1500, lng: 88.3500 };
// Bhubaneswar: 20.2961, 85.8245
const BHUBANESWAR: Coords = { lat: 20.2961, lng: 85.8245 };
// Chilika — Satapada: 19.6700, 85.4300
const SATAPADA: Coords = { lat: 19.6700, lng: 85.4300 };
// Barkul: 19.7800, 85.1800
const BARKUL: Coords = { lat: 19.7800, lng: 85.1800 };
// Rambha: 19.5100, 85.0900
const RAMBHA: Coords = { lat: 19.5100, lng: 85.0900 };
// Balugaon: 19.7400, 85.2200
const BALUGAON: Coords = { lat: 19.7400, lng: 85.2200 };
// Gopalpur (Odisha): 19.2700, 84.9100
const GOPALPUR_ODISHA: Coords = { lat: 19.2700, lng: 84.9100 };
// Baripada: 21.9300, 86.7200
const BARIPADA: Coords = { lat: 21.9300, lng: 86.7200 };
// Tikarpada: 20.6200, 84.5300
const TIKARPADA: Coords = { lat: 20.6200, lng: 84.5300 };
// Angul: 20.8400, 85.1000
const ANGUL: Coords = { lat: 20.8400, lng: 85.1000 };
// Koraput: 18.8200, 82.7200
const KORAPUT: Coords = { lat: 18.8200, lng: 82.7200 };
// Jeypore: 18.8600, 82.5600
const JEYPORE: Coords = { lat: 18.8600, lng: 82.5600 };
// Puri: 19.8135, 85.8312
const PURI: Coords = { lat: 19.8135, lng: 85.8312 };
// Konark: 19.8876, 86.0945
const KONARK: Coords = { lat: 19.8876, lng: 86.0945 };
// Daringbadi: 19.9000, 84.1300
const DARINGBADI: Coords = { lat: 19.9000, lng: 84.1300 };
// Gupteswar: 18.8100, 82.6500
const GUPTESWAR: Coords = { lat: 18.8100, lng: 82.6500 };
// Lonavala — Tungarli: 18.7600, 73.4500
const LONAVALA: Coords = { lat: 18.7546, lng: 73.4062 };
const TUNGARLI: Coords = { lat: 18.7600, lng: 73.4500 };
const KUNEGAON: Coords = { lat: 18.7650, lng: 73.4400 };
const FRICHLEY: Coords = { lat: 18.7700, lng: 73.4300 };
const KARLA: Coords = { lat: 18.7833, lng: 73.4667 };
// Mahabaleshwar: 17.9307, 73.6477
const MAHABALESHWAR: Coords = { lat: 17.9307, lng: 73.6477 };
// Bhandardara / Shendi: 19.5333, 73.7500
const BHANDARDARA: Coords = { lat: 19.5333, lng: 73.7500 };
const SHENDI: Coords = { lat: 19.5400, lng: 73.7550 };
// Mulshi: 18.5200, 73.5000
const MULSHI: Coords = { lat: 18.5200, lng: 73.5000 };
// Tamhini: 18.4667, 73.4167
const TAMHINI: Coords = { lat: 18.4667, lng: 73.4167 };
// Matheran: 19.0000, 73.2833
const MATHERAN: Coords = { lat: 19.0000, lng: 73.2833 };
// Alibaug: 18.6400, 72.8800
const ALIBAUG: Coords = { lat: 18.6400, lng: 72.8800 };
const KIHIM: Coords = { lat: 18.7700, lng: 72.8700 };
const VARSOLI: Coords = { lat: 18.6850, lng: 72.9050 };
// Kaas Plateau: 17.7200, 73.8200
const KAAS: Coords = { lat: 17.7200, lng: 73.8200 };
// Satara: 17.6800, 73.9900
const SATARA: Coords = { lat: 17.6800, lng: 73.9900 };
// Sandhan Valley / Samrad: 19.7000, 73.7500
const SAMRAD: Coords = { lat: 19.7000, lng: 73.7500 };
// Igatpuri: 19.7000, 73.5500
const IGATPURI: Coords = { lat: 19.7000, lng: 73.5500 };
// Ooty: 11.4102, 76.6950
const OOTY: Coords = { lat: 11.4102, lng: 76.6950 };
// Kodaikanal: 10.2381, 77.4892
const KODAIKANAL: Coords = { lat: 10.2381, lng: 77.4892 };
// Yelagiri / Athanavur: 12.5833, 78.6333
const ATHANAVUR: Coords = { lat: 12.5833, lng: 78.6333 };
// Courtallam / Tenkasi: 8.9600, 77.3000
const COURTALLAM: Coords = { lat: 8.9333, lng: 77.2833 };
const TENKASI: Coords = { lat: 8.9600, lng: 77.3000 };
// Coonoor: 11.3500, 76.8200
const COONOOR: Coords = { lat: 11.3500, lng: 76.8200 };
// Yercaud: 11.7700, 78.2200
const YERCAUD: Coords = { lat: 11.7700, lng: 78.2200 };
// Meghamalai: 9.6200, 77.3800
const MEGHAMALAI: Coords = { lat: 9.6200, lng: 77.3800 };
// Kolli Hills / Semmedu: 11.3000, 78.3500
const KOLLI_HILLS: Coords = { lat: 11.3000, lng: 78.3500 };
const SEMMEDU: Coords = { lat: 11.3000, lng: 78.3500 };
// Manali: 32.2432, 77.1892
const MANALI: Coords = { lat: 32.2432, lng: 77.1892 };
const OLD_MANALI: Coords = { lat: 32.2560, lng: 77.1760 };
const ALEO: Coords = { lat: 32.2680, lng: 77.1820 };
const KATRAIN: Coords = { lat: 32.1100, lng: 77.1300 };
// Shimla: 31.1048, 77.1734
const SHIMLA: Coords = { lat: 31.1048, lng: 77.1734 };
const CHHARI: Coords = { lat: 31.0700, lng: 77.2300 };
const CHAURA: Coords = { lat: 31.0980, lng: 77.1700 };
const MALL_ROAD: Coords = { lat: 31.1040, lng: 77.1740 };
const RIDGE: Coords = { lat: 31.1050, lng: 77.1750 };
const CART_ROAD: Coords = { lat: 31.1060, lng: 77.1760 };
// Chitkul: 31.3500, 78.4333
const CHITKUL: Coords = { lat: 31.3500, lng: 78.4333 };
const SANGLA: Coords = { lat: 31.4200, lng: 78.3900 };
// Kalpa: 31.5333, 78.2500
const KALPA: Coords = { lat: 31.5333, lng: 78.2500 };
// Dharamshala: 32.2200, 76.3200
const DHARAMSHALA: Coords = { lat: 32.2200, lng: 76.3200 };
const SIDHPUR: Coords = { lat: 32.2400, lng: 76.3800 };
const MCLEOD_GANJ: Coords = { lat: 32.2400, lng: 76.3200 };
const UPPER_DHARAMKOT: Coords = { lat: 32.2470, lng: 76.3340 };
// Kasol: 32.0100, 77.3100
const KASOL: Coords = { lat: 32.0100, lng: 77.3100 };
const PARVATI: Coords = { lat: 32.0200, lng: 77.3300 };
// Tirthan Valley / Gushaini: 31.6900, 77.4200
const GUSHAINI: Coords = { lat: 31.6900, lng: 77.4200 };
const BANJAR: Coords = { lat: 31.6400, lng: 77.4100 };
const NAGINI: Coords = { lat: 31.7000, lng: 77.4000 };
// Jibhi: 31.7300, 77.3300
const JIBHI: Coords = { lat: 31.7300, lng: 77.3300 };

export const STAYS: Record<string, StaysByTier> = {
  gangtok: S(
    [
      { name: "Mayfair Spa Resort & Casino", area: "Lower Samdur Block", price: "₹14,000–22,000", note: "Hilltop villas, spa, Kanchenjunga views", coords: jitter(GANGTOK, "Mayfair") },
      { name: "The Elgin Nor-Khill", area: "Stadium Road", price: "₹10,000–16,000", note: "Heritage royal guesthouse, est. 1934", coords: jitter(GANGTOK, "Elgin") },
    ],
    [
      { name: "Summit Denzong Hotel & Spa", area: "Upper Cart Road", price: "₹5,500–8,500", note: "Mid-luxe with valley views", coords: jitter(GANGTOK, "Summit") },
      { name: "Hotel Sonam Delek", area: "Tibet Road", price: "₹3,500–5,500", note: "Reliable, walkable to MG Marg", coords: jitter(GANGTOK, "Sonam") },
    ],
    [
      { name: "Zostel Gangtok", area: "Lower MG Marg", price: "₹700–1,800", note: "Hostel dorms & private rooms", coords: jitter(GANGTOK, "ZostelGt") },
      { name: "Hotel Tibet", area: "Paljor Stadium Road", price: "₹2,000–3,200", note: "Long-running budget Tibetan-run inn", coords: jitter(GANGTOK, "Tibet") },
    ],
  ),
  yumthang_valley: S(
    [
      { name: "The Yarlam Resort", area: "Lachung", price: "₹8,000–12,000", note: "Closest premium stay; valley-facing rooms", coords: jitter(LACHUNG, "Yarlam") },
      { name: "Snow Lion Resort", area: "Lachung", price: "₹6,500–9,500", note: "Comfortable rooms with heaters", coords: jitter(LACHUNG, "SnowLion") },
    ],
    [
      { name: "Modern Residency", area: "Lachung", price: "₹3,500–5,500", note: "Group-tour favourite", coords: jitter(LACHUNG, "Modern") },
      { name: "Le Coxy Resort", area: "Lachung", price: "₹3,000–4,800", note: "Wood-panelled rooms", coords: jitter(LACHUNG, "Coxy") },
    ],
    [
      { name: "Lachung Tourist Lodge (SNT)", area: "Lachung Bazaar", price: "₹1,500–2,500", note: "Government lodge, basic but warm", coords: jitter(LACHUNG, "SNT") },
      { name: "Dzumsa Homestays", area: "Lachung village", price: "₹1,200–2,000", note: "Family kitchens, shared bathrooms", coords: jitter(LACHUNG, "Dzumsa") },
    ],
  ),
  zuluk: S(
    [
      { name: "Zuluk Heritage Retreat", area: "Upper Zuluk", price: "₹7,000–10,000", note: "Best-appointed lodge in the village", coords: jitter(ZULUK, "Heritage") },
      { name: "Old Silk Route Resort", area: "Zuluk", price: "₹6,000–8,500", note: "Wooden chalets near the viewpoint", coords: jitter(ZULUK, "SilkRoute") },
    ],
    [
      { name: "Hotel Snow Leopard", area: "Zuluk", price: "₹3,200–5,000", note: "Ensuite rooms, hot water, dining hall", coords: jitter(ZULUK, "SnowLeopard") },
      { name: "Pelling Inn Zuluk", area: "Zuluk", price: "₹2,800–4,500", note: "Cosy rooms with valley views", coords: jitter(ZULUK, "PellingInn") },
    ],
    [
      { name: "Bhutia Homestay", area: "Zuluk village", price: "₹1,500–2,500", note: "Family-run, home-cooked Bhutia meals", coords: jitter(ZULUK, "Bhutia") },
      { name: "Tamang Homestay", area: "Zuluk village", price: "₹1,200–2,200", note: "Simple rooms, sunrise-friendly", coords: jitter(ZULUK, "Tamang") },
    ],
  ),
  lachung: S(
    [
      { name: "The Yarlam Resort", area: "Lachung", price: "₹8,000–12,000", note: "Premium pinewood suites", coords: jitter(LACHUNG, "Yarlam2") },
      { name: "Snow Lion Resort", area: "Lachung", price: "₹6,500–9,500", note: "Riverside premium rooms", coords: jitter(LACHUNG, "SnowLion2") },
    ],
    [
      { name: "Etam Village Resort", area: "Lachung", price: "₹3,500–5,500", note: "Mid-range with garden seating", coords: jitter(LACHUNG, "Etam") },
      { name: "Apple Valley Inn", area: "Lachung", price: "₹3,200–5,000", note: "Orchard-side rooms, cosy", coords: jitter(LACHUNG, "Apple") },
    ],
    [
      { name: "Lachung Tourist Lodge", area: "Lachung Bazaar", price: "₹1,500–2,500", note: "Govt-run, basic comforts", coords: jitter(LACHUNG, "Tourist") },
      { name: "Sonam Palgey Homestay", area: "Lachung village", price: "₹1,200–2,000", note: "Authentic Lepcha hospitality", coords: jitter(LACHUNG, "SonamPalgey") },
    ],
  ),
  pelling: S(
    [
      { name: "The Elgin Mount Pandim", area: "Pelling", price: "₹12,000–18,000", note: "Luxury heritage property with Kanchenjunga views", coords: jitter(PELLING, "ElginMount") },
      { name: "Chumbi Mountain Retreat", area: "Pelling", price: "₹9,000–14,000", note: "Premium mountain resort", coords: jitter(PELLING, "Chumbi") },
    ],
    [
      { name: "Summit Newa Regency", area: "Upper Pelling", price: "₹4,500–7,000", note: "Popular mid-range stay", coords: jitter(PELLING, "SummitNewa") },
      { name: "Norbu Ghang Resort", area: "Pelling", price: "₹4,000–6,500", note: "Comfortable rooms with valley views", coords: jitter(PELLING, "Norbu") },
    ],
    [
      { name: "Hotel Kabur", area: "Pelling", price: "₹1,500–2,800", note: "Budget-friendly option", coords: jitter(PELLING, "Kabur") },
      { name: "Local Homestays", area: "Pelling", price: "₹1,000–2,000", note: "Authentic local hospitality", coords: jitter(PELLING, "LocalH") },
    ],
  ),
  ravangla: S(
    [
      { name: "Buddha Retreat", area: "Ravangla", price: "₹7,500–12,000", note: "Luxury stay near Buddha Park", coords: jitter(RAVANGLA, "Buddha") },
      { name: "The Barfung Retreat", area: "Ravangla", price: "₹6,500–10,000", note: "Premium mountain views", coords: jitter(RAVANGLA, "Barfung") },
    ],
    [
      { name: "Hotel Ravangla Star", area: "Town Center", price: "₹3,500–5,500", note: "Popular among tourists", coords: jitter(RAVANGLA, "Star") },
      { name: "Mt. Narsing Village Resort", area: "Ravangla", price: "₹3,000–5,000", note: "Comfortable mid-range property", coords: jitter(RAVANGLA, "Narsing") },
    ],
    [
      { name: "Ralong Homestay", area: "Ravangla", price: "₹1,200–2,000", note: "Budget family-run stay", coords: jitter(RAVANGLA, "Ralong") },
      { name: "Local Guest Houses", area: "Ravangla", price: "₹1,000–1,800", note: "Basic accommodation", coords: jitter(RAVANGLA, "LocalG") },
    ],
  ),
  dzongu: S(
    [
      { name: "Mayal Lyang Homestay", area: "Dzongu", price: "₹5,500–8,500", note: "Premium eco-tourism stay", coords: jitter(DZONGU, "Mayal") },
      { name: "Munlom Nature Resort", area: "Dzongu", price: "₹5,000–8,000", note: "Nature-focused retreat", coords: jitter(DZONGU, "Munlom") },
    ],
    [
      { name: "Dzongu Retreat", area: "Lingdem", price: "₹3,000–5,000", note: "Comfortable village stay", coords: jitter(DZONGU, "Retreat") },
      { name: "Lepcha Eco Lodge", area: "Dzongu", price: "₹2,800–4,500", note: "Traditional architecture", coords: jitter(DZONGU, "Lepcha") },
    ],
    [
      { name: "Lepcha Homestays", area: "Dzongu", price: "₹1,200–2,000", note: "Authentic cultural experience", coords: jitter(DZONGU, "Homestays") },
      { name: "Village Guest Houses", area: "Dzongu", price: "₹1,000–1,800", note: "Simple local stays", coords: jitter(DZONGU, "Village") },
    ],
  ),
  borong: S(
    [
      { name: "Borong Polok Village Resort", area: "Borong", price: "₹6,000–9,000", note: "Premium mountain retreat", coords: jitter(BORONG, "Polok") },
      { name: "Cherry Resort", area: "Borong", price: "₹5,500–8,500", note: "Excellent Himalayan views", coords: jitter(BORONG, "Cherry") },
    ],
    [
      { name: "Borong Tourist Lodge", area: "Borong", price: "₹3,000–4,800", note: "Comfortable mid-range rooms", coords: jitter(BORONG, "Tourist") },
      { name: "Mountain View Resort", area: "Borong", price: "₹2,800–4,500", note: "Popular with families", coords: jitter(BORONG, "MountainView") },
    ],
    [
      { name: "Local Homestays", area: "Borong", price: "₹1,200–2,000", note: "Village hospitality", coords: jitter(BORONG, "LocalH") },
      { name: "Forest Guest House", area: "Borong", price: "₹1,000–1,800", note: "Basic accommodation", coords: jitter(BORONG, "ForestGH") },
    ],
  ),
  chilika_lake: S(
    [
      { name: "Swosti Chilika Resort", area: "Satapada", price: "₹9,000–14,000", note: "Lakefront luxury, dolphin tours from jetty", coords: jitter(SATAPADA, "Swosti") },
      { name: "Mayfair Lagoon (Bhubaneswar)", area: "Bhubaneswar (110 km)", price: "₹10,000–16,000", note: "Premium base before/after the lake", coords: jitter(BHUBANESWAR, "Mayfair") },
    ],
    [
      { name: "Panthanivas Barkul (OTDC)", area: "Barkul", price: "₹2,500–4,500", note: "Government resort, lakeshore cottages", coords: jitter(BARKUL, "Panthanivas") },
      { name: "Yatrinivas Rambha", area: "Rambha", price: "₹2,200–4,000", note: "Quiet southern shore, sunset views", coords: jitter(RAMBHA, "Yatrinivas") },
    ],
    [
      { name: "Hotel Ashoka", area: "Balugaon", price: "₹1,200–2,200", note: "Town-side rooms near rail station", coords: jitter(BALUGAON, "Ashoka") },
      { name: "Satapada Guesthouses", area: "Satapada", price: "₹1,000–2,000", note: "Family-run, basic amenities", coords: jitter(SATAPADA, "Guesthouses") },
    ],
  ),
  simlipal_national_park: S(
    [
      { name: "Mayfair Palm Beach Resort", area: "Gopalpur (180 km)", price: "₹10,000–16,000", note: "Pair with a coastal night before/after", coords: jitter(GOPALPUR_ODISHA, "Mayfair") },
      { name: "Welcomheritage Kila Aurangabad", area: "Baripada region", price: "₹7,500–11,000", note: "Heritage stay near park", coords: jitter(BARIPADA, "Kila") },
    ],
    [
      { name: "Aranya Nivas (OTDC)", area: "Lulung gate", price: "₹3,000–5,000", note: "Forest lodge, closest park stay", coords: { lat: 21.7900, lng: 86.5300 } },
      { name: "Hotel Ambika", area: "Baripada", price: "₹2,500–4,000", note: "Comfortable AC rooms in town", coords: jitter(BARIPADA, "Ambika") },
    ],
    [
      { name: "FRH Chahala / Jamuani", area: "Inside park", price: "₹1,500–2,500", note: "Forest Rest Houses — book via Forest Dept", coords: { lat: 21.7500, lng: 86.5200 } },
      { name: "Yatri Niwas Baripada", area: "Baripada", price: "₹1,200–2,000", note: "Basic but clean budget option", coords: jitter(BARIPADA, "YatriNiwas") },
    ],
  ),
  satkosia_gorge: S(
    [
      { name: "Mayfair Lagoon", area: "Bhubaneswar (175 km)", price: "₹10,000–16,000", note: "Premium base before/after the gorge", coords: jitter(BHUBANESWAR, "MayfairLagoon") },
      { name: "Trident Bhubaneswar", area: "Bhubaneswar", price: "₹9,000–13,000", note: "Reliable luxury hotel", coords: jitter(BHUBANESWAR, "Trident") },
    ],
    [
      { name: "Tikarpada Nature Camp (OTDC)", area: "Tikarpada", price: "₹3,500–5,500", note: "Eco-tents on the riverbank", coords: jitter(TIKARPADA, "NatureCamp") },
      { name: "Baghmunda Nature Camp", area: "Baghmunda", price: "₹3,000–4,800", note: "Forest-edge tented camp", coords: { lat: 20.5800, lng: 84.5000 } },
    ],
    [
      { name: "Forest Rest House Tikarpada", area: "Tikarpada", price: "₹1,500–2,500", note: "Basic FRH, advance permission needed", coords: jitter(TIKARPADA, "FRH") },
      { name: "Panthanivas Angul", area: "Angul", price: "₹1,200–2,200", note: "Budget OTDC in nearest town", coords: jitter(ANGUL, "Panthanivas") },
    ],
  ),
  deomali_hills: S(
    [
      { name: "Hello Koraput", area: "Koraput town", price: "₹4,500–7,000", note: "Best-rated full-service hotel in the region", coords: jitter(KORAPUT, "Hello") },
      { name: "Desia Koraput", area: "Koraput", price: "₹6,000–9,000", note: "Boutique tribal-themed eco-resort", coords: jitter(KORAPUT, "Desia") },
    ],
    [
      { name: "Panthanivas Koraput (OTDC)", area: "Koraput", price: "₹2,500–4,000", note: "Reliable mid-range with restaurant", coords: jitter(KORAPUT, "Panthanivas") },
      { name: "Hotel Raj Residency", area: "Koraput", price: "₹2,000–3,500", note: "Clean AC rooms, central location", coords: jitter(KORAPUT, "RajResidency") },
    ],
    [
      { name: "OTDC Yatri Niwas Jeypore", area: "Jeypore (40 km)", price: "₹1,000–1,800", note: "Budget rooms, well-maintained", coords: jitter(JEYPORE, "YatriNiwas") },
      { name: "Local homestays", area: "Pottangi / villages", price: "₹800–1,500", note: "Arrange via Koraput tourism", coords: { lat: 18.5700, lng: 82.9600 } },
    ],
  ),
  puri: S(
    [
      { name: "Mayfair Heritage", area: "Puri Beach", price: "₹10,000–18,000", note: "Luxury beachfront resort", coords: jitter(PURI, "MayfairHeritage") },
      { name: "Toshali Sands", area: "Marine Drive", price: "₹8,000–14,000", note: "Resort with large gardens and pool", coords: jitter(PURI, "Toshali") },
    ],
    [
      { name: "Sterling Puri", area: "Golden Beach Road", price: "₹4,500–7,500", note: "Family-friendly beach resort", coords: jitter(PURI, "Sterling") },
      { name: "Hotel Holiday Resort", area: "Sea Beach", price: "₹3,500–6,000", note: "Popular sea-facing property", coords: jitter(PURI, "HolidayResort") },
    ],
    [
      { name: "Z Hotel Puri", area: "Sea Beach", price: "₹1,500–3,000", note: "Budget hotel near beach", coords: jitter(PURI, "ZHotel") },
      { name: "Yatri Niwas Puri", area: "Temple Area", price: "₹1,000–2,000", note: "Affordable stay near Jagannath Temple", coords: jitter(PURI, "YatriNiwas") },
    ],
  ),
  konark: S(
    [
      { name: "Lotus Eco Resort", area: "Konark", price: "₹8,000–14,000", note: "Luxury cottages near beach", coords: jitter(KONARK, "Lotus") },
      { name: "Nature Camp Konark", area: "Ramchandi", price: "₹7,000–12,000", note: "Premium eco-retreat", coords: { lat: 19.9300, lng: 86.2700 } },
    ],
    [
      { name: "OTDC Yatri Nivas", area: "Konark", price: "₹3,500–5,500", note: "Reliable government accommodation", coords: jitter(KONARK, "YatriNivas") },
      { name: "Sun Temple Hotel", area: "Konark", price: "₹3,000–5,000", note: "Close to Sun Temple", coords: jitter(KONARK, "SunTemple") },
    ],
    [
      { name: "Konark Lodge", area: "Konark", price: "₹1,200–2,200", note: "Budget rooms", coords: jitter(KONARK, "KonarkLodge") },
      { name: "Local Guest Houses", area: "Konark", price: "₹1,000–1,800", note: "Affordable local stays", coords: jitter(KONARK, "LocalG") },
    ],
  ),
  daringbadi: S(
    [
      { name: "Eco Retreat Daringbadi", area: "Hilltop", price: "₹7,000–12,000", note: "Luxury tents and mountain views", coords: jitter(DARINGBADI, "EcoRetreat") },
      { name: "Nature Camp Daringbadi", area: "Daringbadi", price: "₹6,000–10,000", note: "Premium forest stay", coords: jitter(DARINGBADI, "NatureCamp") },
    ],
    [
      { name: "Hotel Utopia", area: "Town Center", price: "₹3,000–5,000", note: "Popular tourist hotel", coords: jitter(DARINGBADI, "Utopia") },
      { name: "Panthanivas Daringbadi", area: "Daringbadi", price: "₹2,500–4,500", note: "Government accommodation", coords: jitter(DARINGBADI, "Panthanivas") },
    ],
    [
      { name: "Local Homestays", area: "Daringbadi", price: "₹1,000–2,000", note: "Village hospitality", coords: jitter(DARINGBADI, "LocalH") },
      { name: "Hill View Lodge", area: "Town Area", price: "₹1,200–2,200", note: "Simple budget rooms", coords: jitter(DARINGBADI, "HillView") },
    ],
  ),
  gupteswar: S(
    [
      { name: "Desia Eco Tourism Camp", area: "Koraput", price: "₹6,000–10,000", note: "Best eco-luxury option nearby", coords: jitter(KORAPUT, "DesiaEco") },
      { name: "Hello Koraput", area: "Koraput", price: "₹5,000–8,000", note: "Premium hotel in Koraput town", coords: jitter(KORAPUT, "Hello2") },
    ],
    [
      { name: "Panthanivas Koraput", area: "Koraput", price: "₹2,500–4,500", note: "Reliable government stay", coords: jitter(KORAPUT, "Panthanivas2") },
      { name: "Hotel Raj Residency", area: "Koraput", price: "₹2,000–3,500", note: "Comfortable rooms", coords: jitter(KORAPUT, "RajResidency2") },
    ],
    [
      { name: "Yatri Niwas Jeypore", area: "Jeypore", price: "₹1,000–1,800", note: "Budget option", coords: jitter(JEYPORE, "YatriNiwas2") },
      { name: "Local Guest Houses", area: "Gupteswar Area", price: "₹800–1,500", note: "Basic accommodation", coords: jitter(GUPTESWAR, "LocalG") },
    ],
  ),
  lonavala: S(
    [
      { name: "Della Resorts", area: "Kunegaon", price: "₹15,000–28,000", note: "Adventure resort with luxury villas", coords: jitter(KUNEGAON, "Della") },
      { name: "Fariyas Resort", area: "Frichley Hills", price: "₹9,000–14,000", note: "Long-standing 5-star with valley views", coords: jitter(FRICHLEY, "Fariyas") },
    ],
    [
      { name: "Lonavala Citrus Hotel", area: "Tungarli", price: "₹4,500–7,000", note: "Reliable mid-range, family-friendly", coords: jitter(TUNGARLI, "Citrus") },
      { name: "Upper Deck Resort", area: "Tungarli Lake", price: "₹4,000–6,500", note: "Lake-view rooms, walkable to viewpoints", coords: jitter(TUNGARLI, "UpperDeck") },
    ],
    [
      { name: "Zostel Lonavala", area: "Tungarli", price: "₹800–2,200", note: "Hostel with lake-view dorms", coords: jitter(TUNGARLI, "ZostelLv") },
      { name: "MTDC Karla Resort", area: "Karla", price: "₹2,000–3,500", note: "Government cottages near the caves", coords: jitter(KARLA, "MTDC") },
    ],
  ),
  mahabaleshwar: S(
    [
      { name: "Le Méridien Mahabaleshwar", area: "Frederick Road", price: "₹12,000–20,000", note: "Hilltop resort with infinity pool", coords: jitter(MAHABALESHWAR, "LeMeridien") },
      { name: "Evershine Resort", area: "Old Mahabaleshwar", price: "₹9,000–14,000", note: "Premium villas in pine forest", coords: jitter(MAHABALESHWAR, "Evershine") },
    ],
    [
      { name: "Brightland Resort & Spa", area: "Nakinda Village", price: "₹5,000–8,000", note: "Family resort with valley views", coords: jitter(MAHABALESHWAR, "Brightland") },
      { name: "Treebo Trend Saj Resort", area: "Mahabaleshwar Town", price: "₹3,500–5,500", note: "Comfortable mid-range", coords: jitter(MAHABALESHWAR, "Saj") },
    ],
    [
      { name: "MTDC Resort Mahabaleshwar", area: "Bombay Point Road", price: "₹2,000–3,500", note: "Government cottages, great location", coords: jitter(MAHABALESHWAR, "MTDC") },
      { name: "Hotel Pramod", area: "Main Bazaar", price: "₹1,500–2,800", note: "Walkable budget option", coords: jitter(MAHABALESHWAR, "Pramod") },
    ],
  ),
  bhandardara: S(
    [
      { name: "The Anandvan Resort", area: "Shendi", price: "₹8,000–13,000", note: "Lakefront premium cottages", coords: jitter(SHENDI, "Anandvan") },
      { name: "Famous Lakeview Resort", area: "Shendi", price: "₹7,000–10,500", note: "Premium lake-facing villas", coords: jitter(SHENDI, "Famous") },
    ],
    [
      { name: "MTDC Holiday Resort", area: "Bhandardara", price: "₹2,500–4,500", note: "Government cottages near Wilson Dam", coords: jitter(BHANDARDARA, "MTDC") },
      { name: "Aalishan Resort", area: "Shendi", price: "₹3,500–5,500", note: "Mountain-view rooms, pool", coords: jitter(SHENDI, "Aalishan") },
    ],
    [
      { name: "Lakeside Camping (Arthur Lake)", area: "Arthur Lake", price: "₹1,200–2,500", note: "Tented camps, monsoon and winter", coords: { lat: 19.5500, lng: 73.7700 } },
      { name: "Local homestays", area: "Shendi village", price: "₹900–1,800", note: "Basic but warm hospitality", coords: jitter(SHENDI, "LocalH") },
    ],
  ),
  tamhini_ghat: S(
    [
      { name: "Saj by the Lake", area: "Mulshi (15 km)", price: "₹9,000–14,000", note: "Lakefront luxury resort", coords: jitter(MULSHI, "Saj") },
      { name: "Atmantan Wellness Resort", area: "Mulshi", price: "₹18,000–30,000", note: "Wellness retreat with valley views", coords: jitter(MULSHI, "Atmantan") },
    ],
    [
      { name: "Malhar Machi Resort", area: "Mulshi backwaters", price: "₹4,500–7,000", note: "Mid-range with adventure activities", coords: jitter(MULSHI, "Malhar") },
      { name: "Pinewood Resort", area: "Mulshi", price: "₹4,000–6,500", note: "Comfortable rooms in the hills", coords: jitter(MULSHI, "Pinewood") },
    ],
    [
      { name: "Plus Valley Camping", area: "Tamhini", price: "₹1,200–2,500", note: "Tented stays during clear-weather months", coords: jitter(TAMHINI, "PlusValley") },
      { name: "Mulshi MTDC", area: "Mulshi Dam", price: "₹1,500–2,800", note: "Budget government rooms", coords: jitter(MULSHI, "MTDC") },
    ],
  ),
  matheran: S(
    [
      { name: "The Byke Heritage", area: "MG Road", price: "₹8,000–14,000", note: "Colonial-style luxury resort", coords: jitter(MATHERAN, "Byke") },
      { name: "Adamo The Resort", area: "Matheran", price: "₹7,000–12,000", note: "Premium family resort", coords: jitter(MATHERAN, "Adamo") },
    ],
    [
      { name: "Westend Hotel", area: "Matheran", price: "₹4,000–6,500", note: "Historic mid-range property", coords: jitter(MATHERAN, "Westend") },
      { name: "Horseland Hotel", area: "Matheran", price: "₹3,500–5,500", note: "Popular with families", coords: jitter(MATHERAN, "Horseland") },
    ],
    [
      { name: "MTDC Matheran", area: "Matheran", price: "₹1,800–3,000", note: "Government accommodation", coords: jitter(MATHERAN, "MTDC") },
      { name: "Local Guest Houses", area: "Market Area", price: "₹1,200–2,500", note: "Budget rooms", coords: jitter(MATHERAN, "LocalG") },
    ],
  ),
  alibaug: S(
    [
      { name: "Radisson Blu Resort", area: "Alibaug", price: "₹10,000–18,000", note: "Luxury beach resort", coords: jitter(ALIBAUG, "Radisson") },
      { name: "Outpost Resort", area: "Kihim", price: "₹8,000–15,000", note: "Boutique luxury stay", coords: jitter(KIHIM, "Outpost") },
    ],
    [
      { name: "Tropicana Resort", area: "Alibaug", price: "₹4,500–7,500", note: "Popular mid-range resort", coords: jitter(ALIBAUG, "Tropicana") },
      { name: "Hotel Maple Ivy", area: "Alibaug", price: "₹4,000–6,500", note: "Comfortable rooms", coords: jitter(ALIBAUG, "MapleIvy") },
    ],
    [
      { name: "Zostel Alibaug", area: "Alibaug", price: "₹900–2,000", note: "Backpacker favourite", coords: jitter(ALIBAUG, "ZostelAb") },
      { name: "Local Beach Homestays", area: "Varsoli", price: "₹1,200–2,500", note: "Affordable coastal stay", coords: jitter(VARSOLI, "LocalH") },
    ],
  ),
  kaasplateau: S(
    [
      { name: "Ramsukh Resort", area: "Mahabaleshwar", price: "₹8,000–14,000", note: "Premium resort nearby", coords: jitter(MAHABALESHWAR, "Ramsukh") },
      { name: "Courtyard Marriott Mahabaleshwar", area: "Mahabaleshwar", price: "₹10,000–18,000", note: "Luxury base for Kaas visit", coords: jitter(MAHABALESHWAR, "Courtyard") },
    ],
    [
      { name: "Hotel Lake View", area: "Satara", price: "₹3,500–5,500", note: "Comfortable mid-range stay", coords: jitter(SATARA, "LakeView") },
      { name: "Hotel Radhika Palace", area: "Satara", price: "₹3,000–5,000", note: "Popular among travelers", coords: jitter(SATARA, "Radhika") },
    ],
    [
      { name: "MTDC Kaas", area: "Kaas", price: "₹1,500–2,800", note: "Closest budget stay", coords: jitter(KAAS, "MTDC") },
      { name: "Local Homestays", area: "Kaas Village", price: "₹1,000–2,000", note: "Village accommodation", coords: jitter(KAAS, "LocalH") },
    ],
  ),
  sandhanvalley: S(
    [
      { name: "The Anandvan Resort", area: "Bhandardara", price: "₹8,000–13,000", note: "Premium lakeside resort", coords: jitter(BHANDARDARA, "Anandvan") },
      { name: "Mystic Valley Spa Resort", area: "Igatpuri", price: "₹7,000–12,000", note: "Luxury stay near valley", coords: jitter(IGATPURI, "Mystic") },
    ],
    [
      { name: "MTDC Bhandardara", area: "Bhandardara", price: "₹2,500–4,500", note: "Reliable mid-range option", coords: jitter(BHANDARDARA, "MTDC") },
      { name: "Aalishan Resort", area: "Shendi", price: "₹3,500–5,500", note: "Popular family stay", coords: jitter(SHENDI, "Aalishan") },
    ],
    [
      { name: "Camping Sites", area: "Samrad Village", price: "₹1,000–2,000", note: "Adventure camping", coords: jitter(SAMRAD, "Camping") },
      { name: "Village Homestays", area: "Samrad", price: "₹800–1,500", note: "Basic accommodation", coords: jitter(SAMRAD, "VillageH") },
    ],
  ),
  ooty: S(
    [
      { name: "Taj Savoy Hotel", area: "Sylks Road", price: "₹12,000–18,000", note: "Heritage cottages, est. 1829", coords: jitter(OOTY, "TajSavoy") },
      { name: "The Gateway Hotel Church Road", area: "Church Road", price: "₹9,000–14,000", note: "Colonial-era luxury, central", coords: jitter(OOTY, "Gateway") },
    ],
    [
      { name: "Sterling Ooty Elk Hill", area: "Elk Hill", price: "₹4,500–7,000", note: "Mid-range resort with valley views", coords: jitter(OOTY, "SterlingElk") },
      { name: "Welbeck Residency", area: "Club Road", price: "₹3,500–5,500", note: "Comfortable, walkable to centre", coords: jitter(OOTY, "Welbeck") },
    ],
    [
      { name: "Zostel Ooty", area: "Sheddon Road", price: "₹800–2,200", note: "Hostel with mountain-view lounge", coords: jitter(OOTY, "ZostelOoty") },
      { name: "YWCA Anandagiri", area: "Ettines Road", price: "₹1,500–2,800", note: "Long-running budget guesthouse", coords: jitter(OOTY, "YWCA") },
    ],
  ),
  kodaikanal: S(
    [
      { name: "The Carlton", area: "Lake Road", price: "₹13,000–20,000", note: "Lakeside heritage 5-star", coords: jitter(KODAIKANAL, "Carlton") },
      { name: "Sterling Kodai Lake", area: "Lake Road", price: "₹6,500–10,000", note: "Premium lakefront resort", coords: jitter(KODAIKANAL, "SterlingLake") },
    ],
    [
      { name: "Hilltop Towers", area: "Club Road", price: "₹3,500–5,500", note: "Reliable mid-range near boat club", coords: jitter(KODAIKANAL, "Hilltop") },
      { name: "Villa Retreat", area: "Coaker's Walk", price: "₹4,000–6,500", note: "Boutique heritage stay", coords: jitter(KODAIKANAL, "VillaRetreat") },
    ],
    [
      { name: "Zostel Kodaikanal", area: "Bryant Park", price: "₹800–2,200", note: "Hostel with garden lawns", coords: jitter(KODAIKANAL, "ZostelK") },
      { name: "Hotel Astoria", area: "Anna Salai", price: "₹1,500–2,800", note: "Bus-stand-adjacent budget rooms", coords: jitter(KODAIKANAL, "Astoria") },
    ],
  ),
  yelagiri: S(
    [
      { name: "The Yelagiri Hills Resort", area: "Athanavur", price: "₹6,500–10,000", note: "Best premium resort on the hill", coords: jitter(ATHANAVUR, "YelagiriHills") },
      { name: "Sterling Yelagiri", area: "Punganur Lake Road", price: "₹5,500–8,500", note: "Premium-tier resort with pool", coords: jitter(ATHANAVUR, "SterlingY") },
    ],
    [
      { name: "Jaladhama Resort", area: "Athanavur", price: "₹3,500–5,500", note: "Family resort with activity zone", coords: jitter(ATHANAVUR, "Jaladhama") },
      { name: "Hotel Greenland", area: "Athanavur", price: "₹2,800–4,500", note: "Comfortable mid-range", coords: jitter(ATHANAVUR, "Greenland") },
    ],
    [
      { name: "TTDC Hotel Tamil Nadu", area: "Athanavur", price: "₹1,500–2,500", note: "Government budget rooms", coords: jitter(ATHANAVUR, "TTDC") },
      { name: "Local cottages", area: "Athanavur", price: "₹1,000–2,000", note: "Basic, often rented for weekends", coords: jitter(ATHANAVUR, "LocalH") },
    ],
  ),
  courtallam_falls: S(
    [
      { name: "Hotel Saaral Residency", area: "Courtallam", price: "₹4,000–6,500", note: "Best-rated stay near Main Falls", coords: jitter(COURTALLAM, "Saaral") },
      { name: "Hotel Sri Thanga Residency", area: "Tenkasi (5 km)", price: "₹3,500–5,500", note: "Comfortable AC rooms", coords: jitter(TENKASI, "SriThanga") },
    ],
    [
      { name: "Hotel Tamil Nadu (TTDC)", area: "Courtallam", price: "₹2,000–3,500", note: "Government mid-range, walkable to falls", coords: jitter(COURTALLAM, "TTDC") },
      { name: "Hotel Janakiram", area: "Tenkasi", price: "₹1,800–3,200", note: "Comfortable AC rooms", coords: jitter(TENKASI, "Janakiram") },
    ],
    [
      { name: "Sri Murugan Lodge", area: "Courtallam", price: "₹800–1,500", note: "Backpacker-friendly basic rooms", coords: jitter(COURTALLAM, "Murugan") },
      { name: "Local lodges near Main Falls", area: "Courtallam", price: "₹600–1,400", note: "Cheap, fill quickly in season", coords: jitter(COURTALLAM, "LocalG") },
    ],
  ),
  coonoor: S(
    [
      { name: "Gateway Coonoor", area: "Church Road", price: "₹10,000–18,000", note: "Luxury heritage property with Nilgiri views", coords: jitter(COONOOR, "Gateway") },
      { name: "Kurumba Village Resort", area: "Coonoor Outskirts", price: "₹8,000–14,000", note: "Premium eco-resort surrounded by nature", coords: jitter(COONOOR, "Kurumba") },
    ],
    [
      { name: "Neemrana Wallwood Garden", area: "Coonoor", price: "₹4,500–7,500", note: "Historic colonial-era stay", coords: jitter(COONOOR, "Wallwood") },
      { name: "Hotel Blue Hills", area: "Town Center", price: "₹3,500–5,500", note: "Comfortable family-friendly hotel", coords: jitter(COONOOR, "BlueHills") },
    ],
    [
      { name: "Zostel Ooty", area: "Nearby Ooty", price: "₹800–2,200", note: "Popular backpacker hostel", coords: jitter(OOTY, "ZostelOoty2") },
      { name: "Local Homestays", area: "Coonoor", price: "₹1,200–2,500", note: "Budget stay with local hospitality", coords: jitter(COONOOR, "LocalH") },
    ],
  ),
  yercaud: S(
    [
      { name: "Grand Palace Hotel & Spa", area: "Yercaud Lake", price: "₹8,000–15,000", note: "Premium lake-view resort", coords: jitter(YERCAUD, "GrandPalace") },
      { name: "Sterling Yercaud", area: "Lake Road", price: "₹7,000–12,000", note: "Luxury mountain resort", coords: jitter(YERCAUD, "SterlingY") },
    ],
    [
      { name: "TGI Star Holidays", area: "Yercaud", price: "₹3,500–5,500", note: "Comfortable mid-range hotel", coords: jitter(YERCAUD, "TGI") },
      { name: "Hotel Golden Nest", area: "Town Center", price: "₹3,000–5,000", note: "Popular among families", coords: jitter(YERCAUD, "GoldenNest") },
    ],
    [
      { name: "TTDC Hotel Tamil Nadu", area: "Yercaud", price: "₹1,500–2,800", note: "Government accommodation", coords: jitter(YERCAUD, "TTDC") },
      { name: "Local Homestays", area: "Yercaud", price: "₹1,000–2,000", note: "Affordable hill-station stay", coords: jitter(YERCAUD, "LocalH") },
    ],
  ),
  meghamalai: S(
    [
      { name: "Megamalai Wildlife Resort", area: "Meghamalai", price: "₹7,000–12,000", note: "Premium nature retreat", coords: jitter(MEGHAMALAI, "Wildlife") },
      { name: "Cloud Mountain Resort", area: "High Wavy Mountains", price: "₹6,500–10,000", note: "Luxury stay with tea-estate views", coords: jitter(MEGHAMALAI, "CloudMountain") },
    ],
    [
      { name: "Greenwoods Resort", area: "Meghamalai", price: "₹3,500–5,500", note: "Comfortable mountain property", coords: jitter(MEGHAMALAI, "Greenwoods") },
      { name: "Tea County Guest House", area: "Tea Estate Area", price: "₹3,000–5,000", note: "Tea plantation experience", coords: jitter(MEGHAMALAI, "TeaCounty") },
    ],
    [
      { name: "Forest Guest House", area: "Meghamalai", price: "₹1,200–2,500", note: "Basic accommodation", coords: jitter(MEGHAMALAI, "ForestGH") },
      { name: "Local Homestays", area: "Village Area", price: "₹1,000–2,000", note: "Budget-friendly local stay", coords: jitter(MEGHAMALAI, "LocalH") },
    ],
  ),
  kollihills: S(
    [
      { name: "NPS Lake View Resort", area: "Kolli Hills", price: "₹6,500–11,000", note: "Premium hill-view property", coords: jitter(KOLLI_HILLS, "NPS") },
      { name: "Silverline Retreat", area: "Semmedu", price: "₹6,000–10,000", note: "Luxury retreat with valley views", coords: jitter(SEMMEDU, "Silverline") },
    ],
    [
      { name: "PA Resort", area: "Kolli Hills", price: "₹3,500–5,500", note: "Popular family-friendly stay", coords: jitter(KOLLI_HILLS, "PA") },
      { name: "Hill Breeze Resort", area: "Semmedu", price: "₹3,000–5,000", note: "Comfortable mid-range rooms", coords: jitter(SEMMEDU, "HillBreeze") },
    ],
    [
      { name: "Tamil Nadu Tourism Hotel", area: "Semmedu", price: "₹1,500–2,500", note: "Government accommodation", coords: jitter(SEMMEDU, "TTDC") },
      { name: "Village Homestays", area: "Kolli Hills", price: "₹1,000–2,000", note: "Simple local hospitality", coords: jitter(KOLLI_HILLS, "LocalH") },
    ],
  ),
  manali: S(
    [
      { name: "The Himalayan", area: "Hadimba Road", price: "₹14,000–22,000", note: "Castle-style luxury in pine forest", coords: jitter(MANALI, "Himalayan") },
      { name: "Span Resort & Spa", area: "Katrain (15 km)", price: "₹12,000–18,000", note: "Riverside premium retreat", coords: jitter(KATRAIN, "Span") },
    ],
    [
      { name: "Apple Country Resort", area: "Aleo", price: "₹4,500–7,500", note: "Cottages by the Beas, mid-luxe", coords: jitter(ALEO, "AppleCountry") },
      { name: "Snow Valley Resorts", area: "Log Huts Area", price: "₹3,500–5,500", note: "Reliable mid-range", coords: jitter(MANALI, "SnowValley") },
    ],
    [
      { name: "Zostel Manali", area: "Old Manali", price: "₹700–2,000", note: "Hostel with riverside common area", coords: jitter(OLD_MANALI, "ZostelMn") },
      { name: "GoStops Manali", area: "Old Manali", price: "₹800–2,200", note: "Backpacker hostel, café onsite", coords: jitter(OLD_MANALI, "GoStops") },
    ],
  ),
  shimla: S(
    [
      { name: "Wildflower Hall, Oberoi", area: "Chharabra (13 km)", price: "₹35,000–60,000", note: "Iconic luxury in cedar forest", coords: jitter(CHHARI, "Wildflower") },
      { name: "The Oberoi Cecil", area: "Chaura Maidan", price: "₹20,000–32,000", note: "Heritage 5-star in central Shimla", coords: jitter(CHAURA, "OberoiCecil") },
    ],
    [
      { name: "Clarkes Hotel", area: "The Mall", price: "₹5,500–8,500", note: "Classic mid-range, on the Mall Road", coords: jitter(MALL_ROAD, "Clarkes") },
      { name: "Hotel Combermere", area: "The Mall", price: "₹4,500–7,000", note: "Reliable, near the Lift", coords: jitter(MALL_ROAD, "Combermere") },
    ],
    [
      { name: "Zostel Shimla", area: "The Ridge", price: "₹800–2,200", note: "Backpacker hostel with terrace", coords: jitter(RIDGE, "ZostelShimla") },
      { name: "HPTDC Hotel Holiday Home", area: "Cart Road", price: "₹2,000–3,500", note: "Government budget rooms", coords: jitter(CART_ROAD, "HPTDC") },
    ],
  ),
  chitkul: S(
    [
      { name: "Zostel Plus Chitkul", area: "Chitkul village", price: "₹3,500–6,000", note: "Premium-tier hostel; best in Chitkul", coords: jitter(CHITKUL, "ZostelPlus") },
      { name: "Banjara Camp & Retreat", area: "Sangla (25 km)", price: "₹6,500–9,500", note: "Premium tented camp on the Baspa river", coords: jitter(SANGLA, "Banjara") },
    ],
    [
      { name: "Kinner Camps Chitkul", area: "Riverside", price: "₹3,000–4,800", note: "Comfortable tented stays with meals", coords: jitter(CHITKUL, "KinnerCamps") },
      { name: "Hotel Sangla Resort", area: "Sangla", price: "₹2,500–4,500", note: "Mid-range alternative in nearby Sangla", coords: jitter(SANGLA, "SanglaResort") },
    ],
    [
      { name: "Thakur Guest House", area: "Chitkul village", price: "₹1,200–2,200", note: "Long-running budget guesthouse", coords: jitter(CHITKUL, "Thakur") },
      { name: "Local homestays", area: "Chitkul", price: "₹1,000–2,000", note: "Family-run, wood-fired meals included", coords: jitter(CHITKUL, "LocalH") },
    ],
  ),
  kalpa: S(
    [
      { name: "The Grand Shangri-La", area: "Kalpa", price: "₹6,500–10,000", note: "Best-appointed property facing Kinner Kailash", coords: jitter(KALPA, "ShangriLa") },
      { name: "Monk's Cottage", area: "Kalpa", price: "₹5,500–8,500", note: "Boutique cottage with mountain views", coords: jitter(KALPA, "Monks") },
    ],
    [
      { name: "Kinner Kailash Cottage (HPTDC)", area: "Kalpa", price: "₹2,500–4,500", note: "Government cottages with mountain views", coords: jitter(KALPA, "HPTDC") },
      { name: "Hotel Apple Pie", area: "Kalpa", price: "₹2,800–4,500", note: "Mid-range with apple-orchard rooms", coords: jitter(KALPA, "ApplePie") },
    ],
    [
      { name: "Blue Lotus Inn", area: "Kalpa", price: "₹1,200–2,200", note: "Budget rooms, walkable to viewpoints", coords: jitter(KALPA, "BlueLotus") },
      { name: "Local homestays", area: "Kalpa village", price: "₹1,000–1,800", note: "Authentic Kinnauri family stays", coords: jitter(KALPA, "LocalH") },
    ],
  ),
  dharamshala: S(
    [
      { name: "Hyatt Regency Dharamshala Resort", area: "Sidhpur", price: "₹12,000–20,000", note: "Luxury resort with mountain views and spa", coords: jitter(SIDHPUR, "Hyatt") },
      { name: "Fortune Park Moksha", area: "McLeod Ganj", price: "₹9,000–15,000", note: "Premium hillside resort with valley views", coords: jitter(MCLEOD_GANJ, "Fortune") },
    ],
    [
      { name: "Hotel Norbu House", area: "McLeod Ganj", price: "₹4,500–7,000", note: "Boutique Tibetan-style stay", coords: jitter(MCLEOD_GANJ, "Norbu") },
      { name: "Hotel Inclover", area: "Dharamshala", price: "₹3,500–5,500", note: "Comfortable family-friendly hotel", coords: jitter(DHARAMSHALA, "Inclover") },
    ],
    [
      { name: "Zostel Dharamshala", area: "Upper Dharamkot", price: "₹800–2,000", note: "Popular backpacker hostel", coords: jitter(UPPER_DHARAMKOT, "ZostelDh") },
      { name: "Local Guest Houses", area: "McLeod Ganj", price: "₹1,200–2,500", note: "Budget accommodation near monastery area", coords: jitter(MCLEOD_GANJ, "LocalG") },
    ],
  ),
  kasol: S(
    [
      { name: "The Himalayan Village", area: "Kasol", price: "₹10,000–18,000", note: "Luxury Kathkuni-style cottages", coords: jitter(KASOL, "HimalayanVillage") },
      { name: "Parvati Kuteer Resort", area: "Kasol", price: "₹8,000–14,000", note: "Premium riverside resort", coords: jitter(KASOL, "ParvatiKuteer") },
    ],
    [
      { name: "The Hosteller Kasol", area: "Kasol Market", price: "₹3,500–5,500", note: "Comfortable private rooms and dorms", coords: jitter(KASOL, "Hosteller") },
      { name: "Royal Castle Kasol", area: "Kasol", price: "₹3,000–5,000", note: "Popular mid-range hotel", coords: jitter(KASOL, "RoyalCastle") },
    ],
    [
      { name: "Zostel Kasol", area: "Kasol", price: "₹700–1,800", note: "Backpacker favorite", coords: jitter(KASOL, "ZostelKsl") },
      { name: "Local Riverside Homestays", area: "Parvati Valley", price: "₹1,000–2,000", note: "Budget stays with river views", coords: jitter(PARVATI, "LocalH") },
    ],
  ),
  tirthanvalley: S(
    [
      { name: "Tirthan Anglers Retreat", area: "Nagini", price: "₹8,000–14,000", note: "Luxury riverside retreat", coords: jitter(NAGINI, "Anglers") },
      { name: "Raju's Cottage", area: "Tirthan Valley", price: "₹7,000–12,000", note: "Premium stay near the river", coords: jitter(NAGINI, "Rajus") },
    ],
    [
      { name: "Sharda Resort", area: "Banjar", price: "₹3,500–5,500", note: "Comfortable valley-view property", coords: jitter(BANJAR, "Sharda") },
      { name: "Trishla Resort", area: "Gushaini", price: "₹3,000–5,000", note: "Popular among nature lovers", coords: jitter(GUSHAINI, "Trishla") },
    ],
    [
      { name: "Hosteller Tirthan Valley", area: "Gushaini", price: "₹800–2,000", note: "Budget-friendly backpacker stay", coords: jitter(GUSHAINI, "Hosteller") },
      { name: "Village Homestays", area: "Gushaini", price: "₹1,000–2,000", note: "Local hospitality and home-cooked meals", coords: jitter(GUSHAINI, "VillageH") },
    ],
  ),
  jibhi: S(
    [
      { name: "The Forest Edge", area: "Jibhi", price: "₹7,000–12,000", note: "Luxury cottages surrounded by pine forest", coords: jitter(JIBHI, "ForestEdge") },
      { name: "Whispering Pines Cottages", area: "Jibhi", price: "₹6,500–10,000", note: "Premium mountain-view stay", coords: jitter(JIBHI, "WhisperingPines") },
    ],
    [
      { name: "Mudhouse Hostel & Cafe", area: "Jibhi", price: "₹3,000–5,000", note: "Comfortable boutique stay", coords: jitter(JIBHI, "Mudhouse") },
      { name: "Jibhi Mountain Retreat", area: "Jibhi", price: "₹3,500–5,500", note: "Popular among couples and families", coords: jitter(JIBHI, "MountainRetreat") },
    ],
    [
      { name: "Hosteller Jibhi", area: "Jibhi", price: "₹800–2,000", note: "Backpacker-friendly hostel", coords: jitter(JIBHI, "Hosteller") },
      { name: "Local Wooden Homestays", area: "Jibhi Village", price: "₹1,000–2,000", note: "Traditional Himachali hospitality", coords: jitter(JIBHI, "LocalH") },
    ],
  ),
};

export const getStays = (slug: string) => STAYS[slug];
