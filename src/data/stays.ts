// Curated nearby stays per destination, grouped by tier.
// Real properties — pricing is an indicative per-night range in INR for a
// standard double room (off-peak to peak). Always verify before booking.

export type StayTier = "Luxury" | "Standard" | "Budget";
export type Stay = { name: string; area: string; price: string; note?: string };
export type StaysByTier = Record<StayTier, Stay[]>;

const S = (luxury: Stay[], standard: Stay[], budget: Stay[]): StaysByTier => ({
  Luxury: luxury, Standard: standard, Budget: budget,
});

export const STAYS: Record<string, StaysByTier> = {
  gangtok: S(
    [
      { name: "Mayfair Spa Resort & Casino", area: "Lower Samdur Block", price: "₹14,000–22,000", note: "Hilltop villas, spa, Kanchenjunga views" },
      { name: "The Elgin Nor-Khill", area: "Stadium Road", price: "₹10,000–16,000", note: "Heritage royal guesthouse, est. 1934" },
    ],
    [
      { name: "Summit Denzong Hotel & Spa", area: "Upper Cart Road", price: "₹5,500–8,500", note: "Mid-luxe with valley views" },
      { name: "Hotel Sonam Delek", area: "Tibet Road", price: "₹3,500–5,500", note: "Reliable, walkable to MG Marg" },
    ],
    [
      { name: "Zostel Gangtok", area: "Lower MG Marg", price: "₹700–1,800", note: "Hostel dorms & private rooms" },
      { name: "Hotel Tibet", area: "Paljor Stadium Road", price: "₹2,000–3,200", note: "Long-running budget Tibetan-run inn" },
    ],
  ),
  yumthang_valley: S(
    [
      { name: "The Yarlam Resort", area: "Lachung", price: "₹8,000–12,000", note: "Closest premium stay; valley-facing rooms" },
      { name: "Snow Lion Resort", area: "Lachung", price: "₹6,500–9,500", note: "Comfortable rooms with heaters" },
    ],
    [
      { name: "Modern Residency", area: "Lachung", price: "₹3,500–5,500", note: "Group-tour favourite" },
      { name: "Le Coxy Resort", area: "Lachung", price: "₹3,000–4,800", note: "Wood-panelled rooms" },
    ],
    [
      { name: "Lachung Tourist Lodge (SNT)", area: "Lachung Bazaar", price: "₹1,500–2,500", note: "Government lodge, basic but warm" },
      { name: "Dzumsa Homestays", area: "Lachung village", price: "₹1,200–2,000", note: "Family kitchens, shared bathrooms" },
    ],
  ),
  zuluk: S(
    [
      { name: "Zuluk Heritage Retreat", area: "Upper Zuluk", price: "₹7,000–10,000", note: "Best-appointed lodge in the village" },
      { name: "Old Silk Route Resort", area: "Zuluk", price: "₹6,000–8,500", note: "Wooden chalets near the viewpoint" },
    ],
    [
      { name: "Hotel Snow Leopard", area: "Zuluk", price: "₹3,200–5,000", note: "Ensuite rooms, hot water, dining hall" },
      { name: "Pelling Inn Zuluk", area: "Zuluk", price: "₹2,800–4,500", note: "Cosy rooms with valley views" },
    ],
    [
      { name: "Bhutia Homestay", area: "Zuluk village", price: "₹1,500–2,500", note: "Family-run, home-cooked Bhutia meals" },
      { name: "Tamang Homestay", area: "Zuluk village", price: "₹1,200–2,200", note: "Simple rooms, sunrise-friendly" },
    ],
  ),
  lachung: S(
    [
      { name: "The Yarlam Resort", area: "Lachung", price: "₹8,000–12,000", note: "Premium pinewood suites" },
      { name: "Snow Lion Resort", area: "Lachung", price: "₹6,500–9,500", note: "Riverside premium rooms" },
    ],
    [
      { name: "Etam Village Resort", area: "Lachung", price: "₹3,500–5,500", note: "Mid-range with garden seating" },
      { name: "Apple Valley Inn", area: "Lachung", price: "₹3,200–5,000", note: "Orchard-side rooms, cosy" },
    ],
    [
      { name: "Lachung Tourist Lodge", area: "Lachung Bazaar", price: "₹1,500–2,500", note: "Govt-run, basic comforts" },
      { name: "Sonam Palgey Homestay", area: "Lachung village", price: "₹1,200–2,000", note: "Authentic Lepcha hospitality" },
    ],
  ),
  pelling: S(
  [
    { name: "The Elgin Mount Pandim", area: "Pelling", price: "₹12,000–18,000", note: "Luxury heritage property with Kanchenjunga views" },
    { name: "Chumbi Mountain Retreat", area: "Pelling", price: "₹9,000–14,000", note: "Premium mountain resort" },
  ],
  [
    { name: "Summit Newa Regency", area: "Upper Pelling", price: "₹4,500–7,000", note: "Popular mid-range stay" },
    { name: "Norbu Ghang Resort", area: "Pelling", price: "₹4,000–6,500", note: "Comfortable rooms with valley views" },
  ],
  [
    { name: "Hotel Kabur", area: "Pelling", price: "₹1,500–2,800", note: "Budget-friendly option" },
    { name: "Local Homestays", area: "Pelling", price: "₹1,000–2,000", note: "Authentic local hospitality" },
  ],
),
ravangla: S(
  [
    { name: "Buddha Retreat", area: "Ravangla", price: "₹7,500–12,000", note: "Luxury stay near Buddha Park" },
    { name: "The Barfung Retreat", area: "Ravangla", price: "₹6,500–10,000", note: "Premium mountain views" },
  ],
  [
    { name: "Hotel Ravangla Star", area: "Town Center", price: "₹3,500–5,500", note: "Popular among tourists" },
    { name: "Mt. Narsing Village Resort", area: "Ravangla", price: "₹3,000–5,000", note: "Comfortable mid-range property" },
  ],
  [
    { name: "Ralong Homestay", area: "Ravangla", price: "₹1,200–2,000", note: "Budget family-run stay" },
    { name: "Local Guest Houses", area: "Ravangla", price: "₹1,000–1,800", note: "Basic accommodation" },
  ],
),
dzongu: S(
  [
    { name: "Mayal Lyang Homestay", area: "Dzongu", price: "₹5,500–8,500", note: "Premium eco-tourism stay" },
    { name: "Munlom Nature Resort", area: "Dzongu", price: "₹5,000–8,000", note: "Nature-focused retreat" },
  ],
  [
    { name: "Dzongu Retreat", area: "Lingdem", price: "₹3,000–5,000", note: "Comfortable village stay" },
    { name: "Lepcha Eco Lodge", area: "Dzongu", price: "₹2,800–4,500", note: "Traditional architecture" },
  ],
  [
    { name: "Lepcha Homestays", area: "Dzongu", price: "₹1,200–2,000", note: "Authentic cultural experience" },
    { name: "Village Guest Houses", area: "Dzongu", price: "₹1,000–1,800", note: "Simple local stays" },
  ],
),
borong: S(
  [
    { name: "Borong Polok Village Resort", area: "Borong", price: "₹6,000–9,000", note: "Premium mountain retreat" },
    { name: "Cherry Resort", area: "Borong", price: "₹5,500–8,500", note: "Excellent Himalayan views" },
  ],
  [
    { name: "Borong Tourist Lodge", area: "Borong", price: "₹3,000–4,800", note: "Comfortable mid-range rooms" },
    { name: "Mountain View Resort", area: "Borong", price: "₹2,800–4,500", note: "Popular with families" },
  ],
  [
    { name: "Local Homestays", area: "Borong", price: "₹1,200–2,000", note: "Village hospitality" },
    { name: "Forest Guest House", area: "Borong", price: "₹1,000–1,800", note: "Basic accommodation" },
  ],
),

  chilika_lake: S(
    [
      { name: "Swosti Chilika Resort", area: "Satapada", price: "₹9,000–14,000", note: "Lakefront luxury, dolphin tours from jetty" },
      { name: "Mayfair Lagoon (Bhubaneswar)", area: "Bhubaneswar (110 km)", price: "₹10,000–16,000", note: "Premium base before/after the lake" },
    ],
    [
      { name: "Panthanivas Barkul (OTDC)", area: "Barkul", price: "₹2,500–4,500", note: "Government resort, lakeshore cottages" },
      { name: "Yatrinivas Rambha", area: "Rambha", price: "₹2,200–4,000", note: "Quiet southern shore, sunset views" },
    ],
    [
      { name: "Hotel Ashoka", area: "Balugaon", price: "₹1,200–2,200", note: "Town-side rooms near rail station" },
      { name: "Satapada Guesthouses", area: "Satapada", price: "₹1,000–2,000", note: "Family-run, basic amenities" },
    ],
    
  ),
  simlipal_national_park: S(
    [
      { name: "Mayfair Palm Beach Resort", area: "Gopalpur (180 km)", price: "₹10,000–16,000", note: "Pair with a coastal night before/after" },
      { name: "Welcomheritage Kila Aurangabad", area: "Baripada region", price: "₹7,500–11,000", note: "Heritage stay near park" },
    ],
    [
      { name: "Aranya Nivas (OTDC)", area: "Lulung gate", price: "₹3,000–5,000", note: "Forest lodge, closest park stay" },
      { name: "Hotel Ambika", area: "Baripada", price: "₹2,500–4,000", note: "Comfortable AC rooms in town" },
    ],
    [
      { name: "FRH Chahala / Jamuani", area: "Inside park", price: "₹1,500–2,500", note: "Forest Rest Houses — book via Forest Dept" },
      { name: "Yatri Niwas Baripada", area: "Baripada", price: "₹1,200–2,000", note: "Basic but clean budget option" },
    ],
  ),
  satkosia_gorge: S(
    [
      { name: "Mayfair Lagoon", area: "Bhubaneswar (175 km)", price: "₹10,000–16,000", note: "Premium base before/after the gorge" },
      { name: "Trident Bhubaneswar", area: "Bhubaneswar", price: "₹9,000–13,000", note: "Reliable luxury hotel" },
    ],
    [
      { name: "Tikarpada Nature Camp (OTDC)", area: "Tikarpada", price: "₹3,500–5,500", note: "Eco-tents on the riverbank" },
      { name: "Baghmunda Nature Camp", area: "Baghmunda", price: "₹3,000–4,800", note: "Forest-edge tented camp" },
    ],
    [
      { name: "Forest Rest House Tikarpada", area: "Tikarpada", price: "₹1,500–2,500", note: "Basic FRH, advance permission needed" },
      { name: "Panthanivas Angul", area: "Angul", price: "₹1,200–2,200", note: "Budget OTDC in nearest town" },
    ],
  ),
  deomali_hills: S(
    [
      { name: "Hello Koraput", area: "Koraput town", price: "₹4,500–7,000", note: "Best-rated full-service hotel in the region" },
      { name: "Desia Koraput", area: "Koraput", price: "₹6,000–9,000", note: "Boutique tribal-themed eco-resort" },
    ],
    [
      { name: "Panthanivas Koraput (OTDC)", area: "Koraput", price: "₹2,500–4,000", note: "Reliable mid-range with restaurant" },
      { name: "Hotel Raj Residency", area: "Koraput", price: "₹2,000–3,500", note: "Clean AC rooms, central location" },
    ],
    [
      { name: "OTDC Yatri Niwas Jeypore", area: "Jeypore (40 km)", price: "₹1,000–1,800", note: "Budget rooms, well-maintained" },
      { name: "Local homestays", area: "Pottangi / villages", price: "₹800–1,500", note: "Arrange via Koraput tourism" },
    ],
  ),
  puri: S(
  [
    { name: "Mayfair Heritage", area: "Puri Beach", price: "₹10,000–18,000", note: "Luxury beachfront resort" },
    { name: "Toshali Sands", area: "Marine Drive", price: "₹8,000–14,000", note: "Resort with large gardens and pool" },
  ],
  [
    { name: "Sterling Puri", area: "Golden Beach Road", price: "₹4,500–7,500", note: "Family-friendly beach resort" },
    { name: "Hotel Holiday Resort", area: "Sea Beach", price: "₹3,500–6,000", note: "Popular sea-facing property" },
  ],
  [
    { name: "Z Hotel Puri", area: "Sea Beach", price: "₹1,500–3,000", note: "Budget hotel near beach" },
    { name: "Yatri Niwas Puri", area: "Temple Area", price: "₹1,000–2,000", note: "Affordable stay near Jagannath Temple" },
  ],
),

konark: S(
  [
    { name: "Lotus Eco Resort", area: "Konark", price: "₹8,000–14,000", note: "Luxury cottages near beach" },
    { name: "Nature Camp Konark", area: "Ramchandi", price: "₹7,000–12,000", note: "Premium eco-retreat" },
  ],
  [
    { name: "OTDC Yatri Nivas", area: "Konark", price: "₹3,500–5,500", note: "Reliable government accommodation" },
    { name: "Sun Temple Hotel", area: "Konark", price: "₹3,000–5,000", note: "Close to Sun Temple" },
  ],
  [
    { name: "Konark Lodge", area: "Konark", price: "₹1,200–2,200", note: "Budget rooms" },
    { name: "Local Guest Houses", area: "Konark", price: "₹1,000–1,800", note: "Affordable local stays" },
  ],
),

daringbadi: S(
  [
    { name: "Eco Retreat Daringbadi", area: "Hilltop", price: "₹7,000–12,000", note: "Luxury tents and mountain views" },
    { name: "Nature Camp Daringbadi", area: "Daringbadi", price: "₹6,000–10,000", note: "Premium forest stay" },
  ],
  [
    { name: "Hotel Utopia", area: "Town Center", price: "₹3,000–5,000", note: "Popular tourist hotel" },
    { name: "Panthanivas Daringbadi", area: "Daringbadi", price: "₹2,500–4,500", note: "Government accommodation" },
  ],
  [
    { name: "Local Homestays", area: "Daringbadi", price: "₹1,000–2,000", note: "Village hospitality" },
    { name: "Hill View Lodge", area: "Town Area", price: "₹1,200–2,200", note: "Simple budget rooms" },
  ],
),

gupteswar: S(
  [
    { name: "Desia Eco Tourism Camp", area: "Koraput", price: "₹6,000–10,000", note: "Best eco-luxury option nearby" },
    { name: "Hello Koraput", area: "Koraput", price: "₹5,000–8,000", note: "Premium hotel in Koraput town" },
  ],
  [
    { name: "Panthanivas Koraput", area: "Koraput", price: "₹2,500–4,500", note: "Reliable government stay" },
    { name: "Hotel Raj Residency", area: "Koraput", price: "₹2,000–3,500", note: "Comfortable rooms" },
  ],
  [
    { name: "Yatri Niwas Jeypore", area: "Jeypore", price: "₹1,000–1,800", note: "Budget option" },
    { name: "Local Guest Houses", area: "Gupteswar Area", price: "₹800–1,500", note: "Basic accommodation" },
  ],
),
  lonavala: S(
    [
      { name: "Della Resorts", area: "Kunegaon", price: "₹15,000–28,000", note: "Adventure resort with luxury villas" },
      { name: "Fariyas Resort", area: "Frichley Hills", price: "₹9,000–14,000", note: "Long-standing 5-star with valley views" },
    ],
    [
      { name: "Lonavala Citrus Hotel", area: "Tungarli", price: "₹4,500–7,000", note: "Reliable mid-range, family-friendly" },
      { name: "Upper Deck Resort", area: "Tungarli Lake", price: "₹4,000–6,500", note: "Lake-view rooms, walkable to viewpoints" },
    ],
    [
      { name: "Zostel Lonavala", area: "Tungarli", price: "₹800–2,200", note: "Hostel with lake-view dorms" },
      { name: "MTDC Karla Resort", area: "Karla", price: "₹2,000–3,500", note: "Government cottages near the caves" },
    ],
  ),
  mahabaleshwar: S(
    [
      { name: "Le Méridien Mahabaleshwar", area: "Frederick Road", price: "₹12,000–20,000", note: "Hilltop resort with infinity pool" },
      { name: "Evershine Resort", area: "Old Mahabaleshwar", price: "₹9,000–14,000", note: "Premium villas in pine forest" },
    ],
    [
      { name: "Brightland Resort & Spa", area: "Nakinda Village", price: "₹5,000–8,000", note: "Family resort with valley views" },
      { name: "Treebo Trend Saj Resort", area: "Mahabaleshwar Town", price: "₹3,500–5,500", note: "Comfortable mid-range" },
    ],
    [
      { name: "MTDC Resort Mahabaleshwar", area: "Bombay Point Road", price: "₹2,000–3,500", note: "Government cottages, great location" },
      { name: "Hotel Pramod", area: "Main Bazaar", price: "₹1,500–2,800", note: "Walkable budget option" },
    ],
  ),
  bhandardara: S(
    [
      { name: "The Anandvan Resort", area: "Shendi", price: "₹8,000–13,000", note: "Lakefront premium cottages" },
      { name: "Famous Lakeview Resort", area: "Shendi", price: "₹7,000–10,500", note: "Premium lake-facing villas" },
    ],
    [
      { name: "MTDC Holiday Resort", area: "Bhandardara", price: "₹2,500–4,500", note: "Government cottages near Wilson Dam" },
      { name: "Aalishan Resort", area: "Shendi", price: "₹3,500–5,500", note: "Mountain-view rooms, pool" },
    ],
    [
      { name: "Lakeside Camping (Arthur Lake)", area: "Arthur Lake", price: "₹1,200–2,500", note: "Tented camps, monsoon and winter" },
      { name: "Local homestays", area: "Shendi village", price: "₹900–1,800", note: "Basic but warm hospitality" },
    ],
  ),
  tamhini_ghat: S(
    [
      { name: "Saj by the Lake", area: "Mulshi (15 km)", price: "₹9,000–14,000", note: "Lakefront luxury resort" },
      { name: "Atmantan Wellness Resort", area: "Mulshi", price: "₹18,000–30,000", note: "Wellness retreat with valley views" },
    ],
    [
      { name: "Malhar Machi Resort", area: "Mulshi backwaters", price: "₹4,500–7,000", note: "Mid-range with adventure activities" },
      { name: "Pinewood Resort", area: "Mulshi", price: "₹4,000–6,500", note: "Comfortable rooms in the hills" },
    ],
    [
      { name: "Plus Valley Camping", area: "Tamhini", price: "₹1,200–2,500", note: "Tented stays during clear-weather months" },
      { name: "Mulshi MTDC", area: "Mulshi Dam", price: "₹1,500–2,800", note: "Budget government rooms" },
    ],
  ),
  matheran: S(
  [
    { name: "The Byke Heritage", area: "MG Road", price: "₹8,000–14,000", note: "Colonial-style luxury resort" },
    { name: "Adamo The Resort", area: "Matheran", price: "₹7,000–12,000", note: "Premium family resort" },
  ],
  [
    { name: "Westend Hotel", area: "Matheran", price: "₹4,000–6,500", note: "Historic mid-range property" },
    { name: "Horseland Hotel", area: "Matheran", price: "₹3,500–5,500", note: "Popular with families" },
  ],
  [
    { name: "MTDC Matheran", area: "Matheran", price: "₹1,800–3,000", note: "Government accommodation" },
    { name: "Local Guest Houses", area: "Market Area", price: "₹1,200–2,500", note: "Budget rooms" },
  ],
),

alibaug: S(
  [
    { name: "Radisson Blu Resort", area: "Alibaug", price: "₹10,000–18,000", note: "Luxury beach resort" },
    { name: "Outpost Resort", area: "Kihim", price: "₹8,000–15,000", note: "Boutique luxury stay" },
  ],
  [
    { name: "Tropicana Resort", area: "Alibaug", price: "₹4,500–7,500", note: "Popular mid-range resort" },
    { name: "Hotel Maple Ivy", area: "Alibaug", price: "₹4,000–6,500", note: "Comfortable rooms" },
  ],
  [
    { name: "Zostel Alibaug", area: "Alibaug", price: "₹900–2,000", note: "Backpacker favourite" },
    { name: "Local Beach Homestays", area: "Varsoli", price: "₹1,200–2,500", note: "Affordable coastal stay" },
  ],
),

kaasplateau: S(
  [
    { name: "Ramsukh Resort", area: "Mahabaleshwar", price: "₹8,000–14,000", note: "Premium resort nearby" },
    { name: "Courtyard Marriott Mahabaleshwar", area: "Mahabaleshwar", price: "₹10,000–18,000", note: "Luxury base for Kaas visit" },
  ],
  [
    { name: "Hotel Lake View", area: "Satara", price: "₹3,500–5,500", note: "Comfortable mid-range stay" },
    { name: "Hotel Radhika Palace", area: "Satara", price: "₹3,000–5,000", note: "Popular among travelers" },
  ],
  [
    { name: "MTDC Kaas", area: "Kaas", price: "₹1,500–2,800", note: "Closest budget stay" },
    { name: "Local Homestays", area: "Kaas Village", price: "₹1,000–2,000", note: "Village accommodation" },
  ],
),

sandhanvalley: S(
  [
    { name: "The Anandvan Resort", area: "Bhandardara", price: "₹8,000–13,000", note: "Premium lakeside resort" },
    { name: "Mystic Valley Spa Resort", area: "Igatpuri", price: "₹7,000–12,000", note: "Luxury stay near valley" },
  ],
  [
    { name: "MTDC Bhandardara", area: "Bhandardara", price: "₹2,500–4,500", note: "Reliable mid-range option" },
    { name: "Aalishan Resort", area: "Shendi", price: "₹3,500–5,500", note: "Popular family stay" },
  ],
  [
    { name: "Camping Sites", area: "Samrad Village", price: "₹1,000–2,000", note: "Adventure camping" },
    { name: "Village Homestays", area: "Samrad", price: "₹800–1,500", note: "Basic accommodation" },
  ],
),

  ooty: S(
    [
      { name: "Taj Savoy Hotel", area: "Sylks Road", price: "₹12,000–18,000", note: "Heritage cottages, est. 1829" },
      { name: "The Gateway Hotel Church Road", area: "Church Road", price: "₹9,000–14,000", note: "Colonial-era luxury, central" },
    ],
    [
      { name: "Sterling Ooty Elk Hill", area: "Elk Hill", price: "₹4,500–7,000", note: "Mid-range resort with valley views" },
      { name: "Welbeck Residency", area: "Club Road", price: "₹3,500–5,500", note: "Comfortable, walkable to centre" },
    ],
    [
      { name: "Zostel Ooty", area: "Sheddon Road", price: "₹800–2,200", note: "Hostel with mountain-view lounge" },
      { name: "YWCA Anandagiri", area: "Ettines Road", price: "₹1,500–2,800", note: "Long-running budget guesthouse" },
    ],
  ),
  kodaikanal: S(
    [
      { name: "The Carlton", area: "Lake Road", price: "₹13,000–20,000", note: "Lakeside heritage 5-star" },
      { name: "Sterling Kodai Lake", area: "Lake Road", price: "₹6,500–10,000", note: "Premium lakefront resort" },
    ],
    [
      { name: "Hilltop Towers", area: "Club Road", price: "₹3,500–5,500", note: "Reliable mid-range near boat club" },
      { name: "Villa Retreat", area: "Coaker's Walk", price: "₹4,000–6,500", note: "Boutique heritage stay" },
    ],
    [
      { name: "Zostel Kodaikanal", area: "Bryant Park", price: "₹800–2,200", note: "Hostel with garden lawns" },
      { name: "Hotel Astoria", area: "Anna Salai", price: "₹1,500–2,800", note: "Bus-stand-adjacent budget rooms" },
    ],
  ),
  yelagiri: S(
    [
      { name: "The Yelagiri Hills Resort", area: "Athanavur", price: "₹6,500–10,000", note: "Best premium resort on the hill" },
      { name: "Sterling Yelagiri", area: "Punganur Lake Road", price: "₹5,500–8,500", note: "Premium-tier resort with pool" },
    ],
    [
      { name: "Jaladhama Resort", area: "Athanavur", price: "₹3,500–5,500", note: "Family resort with activity zone" },
      { name: "Hotel Greenland", area: "Athanavur", price: "₹2,800–4,500", note: "Comfortable mid-range" },
    ],
    [
      { name: "TTDC Hotel Tamil Nadu", area: "Athanavur", price: "₹1,500–2,500", note: "Government budget rooms" },
      { name: "Local cottages", area: "Athanavur", price: "₹1,000–2,000", note: "Basic, often rented for weekends" },
    ],
  ),
  courtallam_falls: S(
    [
      { name: "Hotel Saaral Residency", area: "Courtallam", price: "₹4,000–6,500", note: "Best-rated stay near Main Falls" },
      { name: "Hotel Sri Thanga Residency", area: "Tenkasi (5 km)", price: "₹3,500–5,500", note: "Comfortable AC rooms" },
    ],
    [
      { name: "Hotel Tamil Nadu (TTDC)", area: "Courtallam", price: "₹2,000–3,500", note: "Government mid-range, walkable to falls" },
      { name: "Hotel Janakiram", area: "Tenkasi", price: "₹1,800–3,200", note: "Comfortable AC rooms" },
    ],
    [
      { name: "Sri Murugan Lodge", area: "Courtallam", price: "₹800–1,500", note: "Backpacker-friendly basic rooms" },
      { name: "Local lodges near Main Falls", area: "Courtallam", price: "₹600–1,400", note: "Cheap, fill quickly in season" },
    ],
  ),
  coonoor: S(
  [
    { name: "Gateway Coonoor", area: "Church Road", price: "₹10,000–18,000", note: "Luxury heritage property with Nilgiri views" },
    { name: "Kurumba Village Resort", area: "Coonoor Outskirts", price: "₹8,000–14,000", note: "Premium eco-resort surrounded by nature" },
  ],
  [
    { name: "Neemrana Wallwood Garden", area: "Coonoor", price: "₹4,500–7,500", note: "Historic colonial-era stay" },
    { name: "Hotel Blue Hills", area: "Town Center", price: "₹3,500–5,500", note: "Comfortable family-friendly hotel" },
  ],
  [
    { name: "Zostel Ooty", area: "Nearby Ooty", price: "₹800–2,200", note: "Popular backpacker hostel" },
    { name: "Local Homestays", area: "Coonoor", price: "₹1,200–2,500", note: "Budget stay with local hospitality" },
  ],
),

yercaud: S(
  [
    { name: "Grand Palace Hotel & Spa", area: "Yercaud Lake", price: "₹8,000–15,000", note: "Premium lake-view resort" },
    { name: "Sterling Yercaud", area: "Lake Road", price: "₹7,000–12,000", note: "Luxury mountain resort" },
  ],
  [
    { name: "TGI Star Holidays", area: "Yercaud", price: "₹3,500–5,500", note: "Comfortable mid-range hotel" },
    { name: "Hotel Golden Nest", area: "Town Center", price: "₹3,000–5,000", note: "Popular among families" },
  ],
  [
    { name: "TTDC Hotel Tamil Nadu", area: "Yercaud", price: "₹1,500–2,800", note: "Government accommodation" },
    { name: "Local Homestays", area: "Yercaud", price: "₹1,000–2,000", note: "Affordable hill-station stay" },
  ],
),

meghamalai: S(
  [
    { name: "Megamalai Wildlife Resort", area: "Meghamalai", price: "₹7,000–12,000", note: "Premium nature retreat" },
    { name: "Cloud Mountain Resort", area: "High Wavy Mountains", price: "₹6,500–10,000", note: "Luxury stay with tea-estate views" },
  ],
  [
    { name: "Greenwoods Resort", area: "Meghamalai", price: "₹3,500–5,500", note: "Comfortable mountain property" },
    { name: "Tea County Guest House", area: "Tea Estate Area", price: "₹3,000–5,000", note: "Tea plantation experience" },
  ],
  [
    { name: "Forest Guest House", area: "Meghamalai", price: "₹1,200–2,500", note: "Basic accommodation" },
    { name: "Local Homestays", area: "Village Area", price: "₹1,000–2,000", note: "Budget-friendly local stay" },
  ],
),

kollihills: S(
  [
    { name: "NPS Lake View Resort", area: "Kolli Hills", price: "₹6,500–11,000", note: "Premium hill-view property" },
    { name: "Silverline Retreat", area: "Semmedu", price: "₹6,000–10,000", note: "Luxury retreat with valley views" },
  ],
  [
    { name: "PA Resort", area: "Kolli Hills", price: "₹3,500–5,500", note: "Popular family-friendly stay" },
    { name: "Hill Breeze Resort", area: "Semmedu", price: "₹3,000–5,000", note: "Comfortable mid-range rooms" },
  ],
  [
    { name: "Tamil Nadu Tourism Hotel", area: "Semmedu", price: "₹1,500–2,500", note: "Government accommodation" },
    { name: "Village Homestays", area: "Kolli Hills", price: "₹1,000–2,000", note: "Simple local hospitality" },
  ],
),

  manali: S(
    [
      { name: "The Himalayan", area: "Hadimba Road", price: "₹14,000–22,000", note: "Castle-style luxury in pine forest" },
      { name: "Span Resort & Spa", area: "Katrain (15 km)", price: "₹12,000–18,000", note: "Riverside premium retreat" },
    ],
    [
      { name: "Apple Country Resort", area: "Aleo", price: "₹4,500–7,500", note: "Cottages by the Beas, mid-luxe" },
      { name: "Snow Valley Resorts", area: "Log Huts Area", price: "₹3,500–5,500", note: "Reliable mid-range" },
    ],
    [
      { name: "Zostel Manali", area: "Old Manali", price: "₹700–2,000", note: "Hostel with riverside common area" },
      { name: "GoStops Manali", area: "Old Manali", price: "₹800–2,200", note: "Backpacker hostel, café onsite" },
    ],
  ),
  shimla: S(
    [
      { name: "Wildflower Hall, Oberoi", area: "Chharabra (13 km)", price: "₹35,000–60,000", note: "Iconic luxury in cedar forest" },
      { name: "The Oberoi Cecil", area: "Chaura Maidan", price: "₹20,000–32,000", note: "Heritage 5-star in central Shimla" },
    ],
    [
      { name: "Clarkes Hotel", area: "The Mall", price: "₹5,500–8,500", note: "Classic mid-range, on the Mall Road" },
      { name: "Hotel Combermere", area: "The Mall", price: "₹4,500–7,000", note: "Reliable, near the Lift" },
    ],
    [
      { name: "Zostel Shimla", area: "The Ridge", price: "₹800–2,200", note: "Backpacker hostel with terrace" },
      { name: "HPTDC Hotel Holiday Home", area: "Cart Road", price: "₹2,000–3,500", note: "Government budget rooms" },
    ],
  ),
  chitkul: S(
    [
      { name: "Zostel Plus Chitkul", area: "Chitkul village", price: "₹3,500–6,000", note: "Premium-tier hostel; best in Chitkul" },
      { name: "Banjara Camp & Retreat", area: "Sangla (25 km)", price: "₹6,500–9,500", note: "Premium tented camp on the Baspa river" },
    ],
    [
      { name: "Kinner Camps Chitkul", area: "Riverside", price: "₹3,000–4,800", note: "Comfortable tented stays with meals" },
      { name: "Hotel Sangla Resort", area: "Sangla", price: "₹2,500–4,500", note: "Mid-range alternative in nearby Sangla" },
    ],
    [
      { name: "Thakur Guest House", area: "Chitkul village", price: "₹1,200–2,200", note: "Long-running budget guesthouse" },
      { name: "Local homestays", area: "Chitkul", price: "₹1,000–2,000", note: "Family-run, wood-fired meals included" },
    ],
  ),
  kalpa: S(
    [
      { name: "The Grand Shangri-La", area: "Kalpa", price: "₹6,500–10,000", note: "Best-appointed property facing Kinner Kailash" },
      { name: "Monk's Cottage", area: "Kalpa", price: "₹5,500–8,500", note: "Boutique cottage with mountain views" },
    ],
    [
      { name: "Kinner Kailash Cottage (HPTDC)", area: "Kalpa", price: "₹2,500–4,500", note: "Government cottages with mountain views" },
      { name: "Hotel Apple Pie", area: "Kalpa", price: "₹2,800–4,500", note: "Mid-range with apple-orchard rooms" },
    ],
    [
      { name: "Blue Lotus Inn", area: "Kalpa", price: "₹1,200–2,200", note: "Budget rooms, walkable to viewpoints" },
      { name: "Local homestays", area: "Kalpa village", price: "₹1,000–1,800", note: "Authentic Kinnauri family stays" },
    ],
  ),
  dharamshala: S(
  [
    { name: "Hyatt Regency Dharamshala Resort", area: "Sidhpur", price: "₹12,000–20,000", note: "Luxury resort with mountain views and spa" },
    { name: "Fortune Park Moksha", area: "McLeod Ganj", price: "₹9,000–15,000", note: "Premium hillside resort with valley views" },
  ],
  [
    { name: "Hotel Norbu House", area: "McLeod Ganj", price: "₹4,500–7,000", note: "Boutique Tibetan-style stay" },
    { name: "Hotel Inclover", area: "Dharamshala", price: "₹3,500–5,500", note: "Comfortable family-friendly hotel" },
  ],
  [
    { name: "Zostel Dharamshala", area: "Upper Dharamkot", price: "₹800–2,000", note: "Popular backpacker hostel" },
    { name: "Local Guest Houses", area: "McLeod Ganj", price: "₹1,200–2,500", note: "Budget accommodation near monastery area" },
  ],
),

kasol: S(
  [
    { name: "The Himalayan Village", area: "Kasol", price: "₹10,000–18,000", note: "Luxury Kathkuni-style cottages" },
    { name: "Parvati Kuteer Resort", area: "Kasol", price: "₹8,000–14,000", note: "Premium riverside resort" },
  ],
  [
    { name: "The Hosteller Kasol", area: "Kasol Market", price: "₹3,500–5,500", note: "Comfortable private rooms and dorms" },
    { name: "Royal Castle Kasol", area: "Kasol", price: "₹3,000–5,000", note: "Popular mid-range hotel" },
  ],
  [
    { name: "Zostel Kasol", area: "Kasol", price: "₹700–1,800", note: "Backpacker favorite" },
    { name: "Local Riverside Homestays", area: "Parvati Valley", price: "₹1,000–2,000", note: "Budget stays with river views" },
  ],
),

tirthanvalley: S(
  [
    { name: "Tirthan Anglers Retreat", area: "Nagini", price: "₹8,000–14,000", note: "Luxury riverside retreat" },
    { name: "Raju's Cottage", area: "Tirthan Valley", price: "₹7,000–12,000", note: "Premium stay near the river" },
  ],
  [
    { name: "Sharda Resort", area: "Banjar", price: "₹3,500–5,500", note: "Comfortable valley-view property" },
    { name: "Trishla Resort", area: "Gushaini", price: "₹3,000–5,000", note: "Popular among nature lovers" },
  ],
  [
    { name: "Hosteller Tirthan Valley", area: "Gushaini", price: "₹800–2,000", note: "Budget-friendly backpacker stay" },
    { name: "Village Homestays", area: "Gushaini", price: "₹1,000–2,000", note: "Local hospitality and home-cooked meals" },
  ],
),

jibhi: S(
  [
    { name: "The Forest Edge", area: "Jibhi", price: "₹7,000–12,000", note: "Luxury cottages surrounded by pine forest" },
    { name: "Whispering Pines Cottages", area: "Jibhi", price: "₹6,500–10,000", note: "Premium mountain-view stay" },
  ],
  [
    { name: "Mudhouse Hostel & Cafe", area: "Jibhi", price: "₹3,000–5,000", note: "Comfortable boutique stay" },
    { name: "Jibhi Mountain Retreat", area: "Jibhi", price: "₹3,500–5,500", note: "Popular among couples and families" },
  ],
  [
    { name: "Hosteller Jibhi", area: "Jibhi", price: "₹800–2,000", note: "Backpacker-friendly hostel" },
    { name: "Local Wooden Homestays", area: "Jibhi Village", price: "₹1,000–2,000", note: "Traditional Himachali hospitality" },
  ],
),
};

export const getStays = (slug: string) => STAYS[slug];
