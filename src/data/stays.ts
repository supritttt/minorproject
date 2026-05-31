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
};

export const getStays = (slug: string) => STAYS[slug];
