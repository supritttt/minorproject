// HiddenTerra destination data. Single source of truth — add new entries here
// and the entire app (cards, detail pages, chat rooms, maps) updates automatically.
//
// Slug must match the folder name in /public/images/{slug}/{slug}_1..5.jpg

export type Coordinates = { lat: number; lng: number };
export type POI = {
  name: string;
  kind: "airport" | "railway" | "landmark";
  coords: Coordinates;
};

export type Destination = {
  slug: string;
  place: string;
  state: string;
  type: string;
  category: "Hotspot" | "Hidden Gem";
  description: string;
  coords: Coordinates;
  best_season: string;
  how_to_reach: { air: string; rail: string; road: string };
  travel_precautions: string[];
  travel_tips: string[];
  nearby_poi: POI[];
  imageExt: "jpg" | "jpeg"; // file extension used for /public/images
};

const D = (d: Destination) => d;

export const DESTINATIONS: Destination[] = [
  // ============ SIKKIM ============
  D({
    slug: "gangtok", place: "Gangtok", state: "Sikkim", type: "Hill Station", category: "Hotspot",
    description: "Gangtok is the vibrant capital of Sikkim, perched at an altitude of 1,650 metres in the Eastern Himalayas. The city offers sweeping views of the Kanchenjunga range on clear days, alongside a lively blend of Tibetan Buddhist culture, colourful monasteries, and bustling bazaars. The famous MG Marg promenade is perfect for an evening stroll, lined with cafes and handicraft shops. Gangtok is the ideal base for exploring the rest of Sikkim and is well connected by road from Siliguri.",
    coords: { lat: 27.3389, lng: 88.6065 }, imageExt: "jpeg",
    best_season: "October to March (clear mountain views); March to May (pleasant spring)",
    how_to_reach: { air: "Pakyong Airport (PYG), 35 km — limited flights. Bagdogra (IXB) is the main hub, 124 km via shared cab.", rail: "New Jalpaiguri (NJP), 148 km — shared sumos and taxis depart frequently for Gangtok.", road: "NH10 from Siliguri (4–5 hr). Self-drive permitted; landslides possible during monsoon (Jun–Sep)." },
    travel_precautions: ["Mild altitude effects possible — go slow on day one", "NH10 prone to landslides during monsoon", "Foreign nationals need a Restricted Area Permit for parts of Sikkim", "Carry layers — temperatures drop sharply after sunset"],
    travel_tips: ["MG Marg is a no-vehicle, no-litter promenade — perfect for evening walks", "Respect monastery dress codes: covered shoulders and knees", "Stay near MG Marg or Development Area for walkability", "Bargaining is acceptable at Lal Bazaar but not in fixed-price stores"],
    nearby_poi: [
      { name: "Pakyong Airport", kind: "airport", coords: { lat: 27.2284, lng: 88.5860 } },
      { name: "New Jalpaiguri Railway Station", kind: "railway", coords: { lat: 26.6873, lng: 88.4243 } },
      { name: "Rumtek Monastery", kind: "landmark", coords: { lat: 27.2875, lng: 88.5615 } },
      { name: "Tsomgo Lake", kind: "landmark", coords: { lat: 27.3742, lng: 88.7611 } },
    ],
  }),
  D({
    slug: "yumthang_valley", place: "Yumthang Valley", state: "Sikkim", type: "Valley", category: "Hotspot",
    description: "Known as the Valley of Flowers of the East, Yumthang Valley sits at a breathtaking altitude of 3,564 metres in North Sikkim. From March to June, the valley erupts in a spectacular carpet of rhododendrons, primulas, and poppies, drawing visitors from across the country. The Teesta River winds through the valley, and hot springs near the entrance offer a warming soak after the cold mountain journey. Snow-capped peaks surround the valley year-round, making it one of Sikkim's most iconic landscapes.",
    coords: { lat: 27.8259, lng: 88.6833 }, imageExt: "jpeg",
    best_season: "March to June for rhododendrons; December to February for snow",
    how_to_reach: { air: "Bagdogra (IXB), ~220 km — then two-day road journey via Gangtok and Lachung.", rail: "New Jalpaiguri (NJP), ~240 km — same onward route.", road: "Only via Lachung (25 km) on a steep mountain road. Restricted area — protected area permits required and arranged by registered tour operators." },
    travel_precautions: ["High altitude (3,500m+) — risk of AMS, ascend gradually with a night at Lachung", "Protected Area Permit mandatory; foreigners need additional clearance", "Roads close after heavy snow (Jan–Feb) and during monsoon landslides", "Mobile network is limited — only BSNL works reliably"],
    travel_tips: ["Visit before 10 AM for clearest views before clouds roll in", "Hot springs near entrance are a welcome stop — carry quick-dry towel", "Stay in Lachung the night before; day-trips from Gangtok are exhausting", "Pack thermal layers even in summer — early mornings are sub-zero"],
    nearby_poi: [
      { name: "Bagdogra Airport", kind: "airport", coords: { lat: 26.6812, lng: 88.3286 } },
      { name: "New Jalpaiguri Railway Station", kind: "railway", coords: { lat: 26.6873, lng: 88.4243 } },
      { name: "Lachung Village", kind: "landmark", coords: { lat: 27.6900, lng: 88.7500 } },
      { name: "Zero Point (Yumesamdong)", kind: "landmark", coords: { lat: 27.9333, lng: 88.7167 } },
    ],
  }),
  D({
    slug: "zuluk", place: "Zuluk", state: "Sikkim", type: "Mountain Pass", category: "Hidden Gem",
    description: "Zuluk is a remote and sparsely visited village in East Sikkim, sitting along the historic Old Silk Route at an altitude of around 3,000 metres. The area is famous for its dramatic hairpin bends — over 32 sharp turns carved into the mountainside — offering surreal views of the Kanchenjunga massif at sunrise. The route here passes through pristine forests, ancient mule tracks, and Buddhist monasteries rarely seen by mainstream tourists. An inner line permit is required to visit, which keeps the footfall low and the experience genuinely unspoiled.",
    coords: { lat: 27.0595, lng: 88.7985 }, imageExt: "jpg",
    best_season: "September to December (clear skies); March to May (rhododendron blooms)",
    how_to_reach: { air: "Bagdogra (IXB), ~150 km — then via Rongli with a registered operator.", rail: "New Jalpaiguri (NJP), ~165 km.", road: "Only via Rongli (25 km of tight switchbacks). Protected area — visit must be arranged through Sikkim-registered tour operators." },
    travel_precautions: ["Inner Line Permit / Protected Area Permit mandatory — arrange through operator", "Cold even in summer; nights drop below freezing in winter", "Roads close after heavy snowfall (Jan–Feb)", "AMS possible at 3,000m — limit alcohol on day one"],
    travel_tips: ["Stay at family-run homestays for authentic Lepcha hospitality", "Wake at 4 AM for the sunrise view from Thambi Viewpoint over Kanchenjunga", "Carry cash — no ATMs in Zuluk", "Respect the silence; this is a tiny village, not a resort town"],
    nearby_poi: [
      { name: "Bagdogra Airport", kind: "airport", coords: { lat: 26.6812, lng: 88.3286 } },
      { name: "New Jalpaiguri Railway Station", kind: "railway", coords: { lat: 26.6873, lng: 88.4243 } },
      { name: "Thambi Viewpoint", kind: "landmark", coords: { lat: 27.0744, lng: 88.8083 } },
      { name: "Nathang Valley", kind: "landmark", coords: { lat: 27.0833, lng: 88.8333 } },
    ],
  }),
  D({
    slug: "lachung", place: "Lachung", state: "Sikkim", type: "Village", category: "Hidden Gem",
    description: "Lachung is a peaceful Lepcha village tucked into the North Sikkim mountains at 2,700 metres, where the Lachen and Lachung rivers meet. Surrounded by dense pine and rhododendron forests, the village is a gateway to Yumthang Valley and the higher Zero Point plateau. Traditional wooden homes, apple orchards, and a distinctive self-governance system called the Dzumsa give Lachung a character entirely its own. The village receives far fewer visitors than the Gangtok circuit and offers a slower, more authentic Himalayan experience.",
    coords: { lat: 27.6900, lng: 88.7500 }, imageExt: "jpeg",
    best_season: "March to June and October to December",
    how_to_reach: { air: "Bagdogra (IXB), ~210 km via Gangtok.", rail: "New Jalpaiguri (NJP), ~225 km.", road: "118 km from Gangtok via the Mangan road (6–7 hr). Protected Area Permit required." },
    travel_precautions: ["Altitude 2,700m — pace yourself", "Roads narrow and prone to landslides in monsoon", "Limited medical facilities — carry basic medication", "BSNL is the only reliable carrier"],
    travel_tips: ["Stay at a Lachung Tourist Lodge or local homestay", "Try thukpa and momos at family-run kitchens", "Apple wine and chhang are local specialties", "Dress in earthy colours — bright clothing feels jarring against the village palette"],
    nearby_poi: [
      { name: "Bagdogra Airport", kind: "airport", coords: { lat: 26.6812, lng: 88.3286 } },
      { name: "New Jalpaiguri Railway Station", kind: "railway", coords: { lat: 26.6873, lng: 88.4243 } },
      { name: "Yumthang Valley", kind: "landmark", coords: { lat: 27.8259, lng: 88.6833 } },
      { name: "Lachung Monastery", kind: "landmark", coords: { lat: 27.6889, lng: 88.7472 } },
    ],
  }),
  D({
  slug: "pelling",
  place: "Pelling",
  state: "Sikkim",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Pelling is one of Sikkim's most famous tourist destinations, known for breathtaking views of Mount Kanchenjunga, monasteries, waterfalls, and adventure activities. The town offers a perfect blend of nature, culture, and tranquility.",
  coords: { lat: 27.3009, lng: 88.2356 },
  imageExt: "jpeg",
  best_season: "March to May and October to December",
  how_to_reach: {
    air: "Pakyong Airport (135 km) or Bagdogra Airport (160 km)",
    rail: "New Jalpaiguri Railway Station (150 km)",
    road: "Regular taxis and buses available from Gangtok and Siliguri"
  },
  travel_precautions: [
    "Carry warm clothes during winter",
    "Roads may be slippery during monsoon",
    "Check weather before mountain excursions"
  ],
  travel_tips: [
    "Visit early morning for clear Kanchenjunga views",
    "Explore local monasteries",
    "Carry cash as digital payments may not work everywhere"
  ],
  nearby_poi: [
    {
      name: "Pemayangtse Monastery",
      kind: "landmark",
      coords: { lat: 27.2934, lng: 88.2297 }
    },
    {
      name: "Sky Walk",
      kind: "landmark",
      coords: { lat: 27.3065, lng: 88.2375 }
    },
    {
      name: "Kanchenjunga Falls",
      kind: "landmark",
      coords: { lat: 27.2545, lng: 88.2151 }
    }
  ]
}),

D({
  slug: "ravangla",
  place: "Ravangla",
  state: "Sikkim",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Ravangla is a scenic mountain town famous for Buddha Park, panoramic Himalayan views, and peaceful surroundings. It serves as a gateway to several trekking routes and monasteries.",
  coords: { lat: 27.3054, lng: 88.3655 },
  imageExt: "jpeg",
  best_season: "March to June and September to December",
  how_to_reach: {
    air: "Pakyong Airport (75 km)",
    rail: "New Jalpaiguri Railway Station (125 km)",
    road: "Connected by road to Gangtok, Namchi and Pelling"
  },
  travel_precautions: [
    "Carry jackets even during summer evenings",
    "Mountain weather can change rapidly",
    "Wear comfortable walking shoes"
  ],
  travel_tips: [
    "Visit Buddha Park during sunrise",
    "Try local Sikkimese cuisine",
    "Keep camera ready for mountain views"
  ],
  nearby_poi: [
    {
      name: "Buddha Park",
      kind: "landmark",
      coords: { lat: 27.3064, lng: 88.3607 }
    },
    {
      name: "Ralang Monastery",
      kind: "landmark",
      coords: { lat: 27.2910, lng: 88.3720 }
    }
  ]
}),

D({
  slug: "dzongu",
  place: "Dzongu",
  state: "Sikkim",
  type: "Tribal Reserve",
  category: "Hidden Gem",
  description:
    "Dzongu is a protected Lepcha reserve offering untouched forests, mountain streams, traditional culture, and eco-tourism experiences. It is one of the most peaceful regions in Sikkim.",
  coords: { lat: 27.5450, lng: 88.5050 },
  imageExt: "jpeg",
  best_season: "October to April",
  how_to_reach: {
    air: "Pakyong Airport (90 km)",
    rail: "New Jalpaiguri Railway Station (140 km)",
    road: "Accessible by taxi from Gangtok and Mangan"
  },
  travel_precautions: [
    "Respect local customs and traditions",
    "Mobile connectivity may be limited",
    "Carry essential medicines"
  ],
  travel_tips: [
    "Stay in local homestays",
    "Explore nearby waterfalls",
    "Interact with Lepcha communities"
  ],
  nearby_poi: [
    {
      name: "Lingdem Village",
      kind: "landmark",
      coords: { lat: 27.5600, lng: 88.5000 }
    },
    {
      name: "Teesta River Viewpoint",
      kind: "landmark",
      coords: { lat: 27.5300, lng: 88.4900 }
    }
  ]
}),

D({
  slug: "borong",
  place: "Borong",
  state: "Sikkim",
  type: "Mountain Village",
  category: "Hidden Gem",
  description:
    "Borong is a quiet Himalayan village known for hot springs, bird watching, dense forests, and incredible views of the snow-capped peaks. It is ideal for travelers seeking solitude.",
  coords: { lat: 27.2930, lng: 88.3900 },
  imageExt: "jpeg",
  best_season: "October to April",
  how_to_reach: {
    air: "Pakyong Airport (80 km)",
    rail: "New Jalpaiguri Railway Station (130 km)",
    road: "Accessible by road from Ravangla"
  },
  travel_precautions: [
    "Carry warm clothing",
    "Limited medical facilities available",
    "Road travel may take longer during monsoon"
  ],
  travel_tips: [
    "Visit Borong Hot Springs",
    "Ideal location for bird photography",
    "Book homestays in advance during peak season"
  ],
  nearby_poi: [
    {
      name: "Borong Hot Springs",
      kind: "landmark",
      coords: { lat: 27.2800, lng: 88.3820 }
    },
    {
      name: "Maenam Wildlife Sanctuary",
      kind: "landmark",
      coords: { lat: 27.3000, lng: 88.4000 }
    }
  ]
}),

  // ============ ODISHA ============
  D({
    slug: "chilika_lake", place: "Chilika Lake", state: "Odisha", type: "Lake", category: "Hotspot",
    description: "Chilika Lake is Asia's largest coastal lagoon and one of India's most important wetland ecosystems, stretching across 1,100 square kilometres on the Odisha coast. Every winter, the lake transforms into a birdwatcher's paradise as over a million migratory birds — including flamingos, grey pelicans, and Siberian ducks — arrive from as far as Siberia and Central Asia. Boat rides to Nalabana Bird Sanctuary and Kalijai Island temple are must-dos, and the lake is also famous for its Irrawaddy dolphins, which can occasionally be spotted near Satapada. The surrounding fishing communities and their traditional crafts add a rich cultural layer to any visit.",
    coords: { lat: 19.7167, lng: 85.3167 }, imageExt: "jpeg",
    best_season: "November to February (peak bird migration & dolphin sightings)",
    how_to_reach: { air: "Biju Patnaik International Airport, Bhubaneswar (BBI), 110 km.", rail: "Balugaon Railway Station, 5 km from north shore; Rambha Station for southern access.", road: "NH16 from Bhubaneswar (2.5 hr) or Puri (1 hr)." },
    travel_precautions: ["Hire only government-licensed boat operators — overloading is dangerous", "Sunscreen and hat essential — no shade on water", "Mosquitoes near shoreline at dusk", "Avoid swimming — undercurrents in deeper sections"],
    travel_tips: ["Start boat trips before 7 AM for best dolphin sightings near Satapada", "Try fresh prawn curry at Barkul or Rambha eco-resorts", "Carry binoculars for birding at Nalabana", "Respect fishing community boundaries — many areas are working livelihoods"],
    nearby_poi: [
      { name: "Bhubaneswar Airport", kind: "airport", coords: { lat: 20.2519, lng: 85.8178 } },
      { name: "Balugaon Railway Station", kind: "railway", coords: { lat: 19.7515, lng: 85.1664 } },
      { name: "Kalijai Temple", kind: "landmark", coords: { lat: 19.7167, lng: 85.3500 } },
      { name: "Satapada Dolphin Point", kind: "landmark", coords: { lat: 19.6667, lng: 85.7500 } },
    ],
  }),
  D({
    slug: "simlipal_national_park", place: "Simlipal National Park", state: "Odisha", type: "Wildlife", category: "Hotspot",
    description: "Simlipal National Park is one of India's largest tiger reserves and a UNESCO Biosphere Reserve, covering over 2,750 square kilometres of dense sal forests, plateaus, and cascading waterfalls in the Mayurbhanj district of Odisha. The park is home to Royal Bengal tigers, elephants, leopards, and over 300 species of birds. The spectacular Barehipani and Joranda waterfalls, among the tallest in India, lie within the park's boundaries and make for unforgettable treks. Simlipal is also culturally significant as the homeland of the Kolha and Ho tribes, whose traditions are deeply rooted in the forest.",
    coords: { lat: 21.6500, lng: 86.4500 }, imageExt: "jpeg",
    best_season: "November to mid-June (park closes mid-June to October for monsoon)",
    how_to_reach: { air: "Bhubaneswar (BBI), 270 km; Kolkata (CCU), 240 km.", rail: "Baripada Railway Station, 25 km from Pithabata gate.", road: "Pithabata gate (north) and Jashipur gate (west) — entry permits required at gate." },
    travel_precautions: ["Park closed mid-June to October — verify dates before travel", "Wild elephants common — never leave vehicles outside designated zones", "Carry mosquito repellent and long sleeves at dusk", "Mobile network sparse — inform someone of your route"],
    travel_tips: ["Book accommodation at FRH Chahala or Jamuani well in advance via Odisha Forest Dept", "Hire a local naturalist guide — wildlife sightings improve dramatically", "Carry binoculars and a zoom lens", "Visit Joranda and Barehipani Falls before noon for best light"],
    nearby_poi: [
      { name: "Bhubaneswar Airport", kind: "airport", coords: { lat: 20.2519, lng: 85.8178 } },
      { name: "Baripada Railway Station", kind: "railway", coords: { lat: 21.9347, lng: 86.7173 } },
      { name: "Barehipani Falls", kind: "landmark", coords: { lat: 21.6500, lng: 86.3833 } },
      { name: "Joranda Falls", kind: "landmark", coords: { lat: 21.6333, lng: 86.4000 } },
    ],
  }),
  D({
    slug: "satkosia_gorge", place: "Satkosia Gorge", state: "Odisha", type: "River Gorge", category: "Hidden Gem",
    description: "Satkosia Gorge is a stunning 22-kilometre gorge carved by the Mahanadi River through the Eastern Ghats, forming one of Odisha's best-kept natural secrets. The gorge is part of the Satkosia Tiger Reserve and is flanked by steep cliffs draped in tropical forests, home to mugger crocodiles, gharials, otters, and a remarkable variety of birdlife. Boating through the gorge at dawn, when the river mist lifts over the hills, is an experience unlike anything else in Eastern India. The area also has eco-camps and nature trails that make it ideal for an offbeat overnight stay.",
    coords: { lat: 20.6167, lng: 84.5333 }, imageExt: "jpeg",
    best_season: "October to March (cool, ideal for boating and trekking)",
    how_to_reach: { air: "Bhubaneswar (BBI), 175 km.", rail: "Angul Railway Station, 50 km — closest railhead.", road: "Tikarpada (south bank) and Chhotkei (north bank) entry points; both reached via Angul." },
    travel_precautions: ["Crocodile habitat — never wade or swim", "Eco-camp tents are basic; pack accordingly", "Limited mobile network in core zone", "Boats only operate in daylight"],
    travel_tips: ["Book Tikarpada Eco-Camp through Odisha Tourism — limited tents, fills fast", "Sunrise boat ride is the highlight — book the night before", "Carry cash; no card payments at eco-camps", "Combine with Simlipal for a longer Odisha wildlife loop"],
    nearby_poi: [
      { name: "Bhubaneswar Airport", kind: "airport", coords: { lat: 20.2519, lng: 85.8178 } },
      { name: "Angul Railway Station", kind: "railway", coords: { lat: 20.8467, lng: 85.1018 } },
      { name: "Tikarpada Eco-Camp", kind: "landmark", coords: { lat: 20.6500, lng: 84.6167 } },
      { name: "Gharial Sanctuary", kind: "landmark", coords: { lat: 20.6500, lng: 84.5500 } },
    ],
  }),
  D({
    slug: "deomali_hills", place: "Deomali Hills", state: "Odisha", type: "Hill", category: "Hidden Gem",
    description: "Deomali is the highest peak in Odisha, rising to 1,672 metres in the Koraput district near the Andhra Pradesh border, and it remains almost entirely unknown to mainstream tourism. The surrounding hills are blanketed in dense forests, coffee plantations, and tribal villages that have preserved their way of life for centuries. The journey to Deomali takes you through the Koraput tribal belt, where colourful weekly haats (markets) offer a vivid glimpse into the culture of the Kondh and Gadaba communities. On a clear day, the summit offers views stretching across Odisha and into the neighbouring state.",
    coords: { lat: 18.3750, lng: 82.9230 }, imageExt: "jpeg",
    best_season: "October to February (cool, clear views)",
    how_to_reach: { air: "Visakhapatnam (VTZ), 220 km.", rail: "Koraput Railway Station, 50 km.", road: "Drive from Koraput via Pottangi (2.5 hr); last few km are rough — SUV recommended." },
    travel_precautions: ["Mobile network patchy beyond Koraput town", "Tribal villages — always ask before photographing people", "Avoid driving after sunset — roads are unlit and remote", "Carry first-aid; nearest hospital is in Koraput"],
    travel_tips: ["Visit on a Thursday for the famous Onukudelli tribal haat", "Stay at OTDC Panthanivas Koraput — clean and well-located", "Carry warm layers — summit drops to single digits at night", "Engage a local guide via Koraput tourism for cultural context"],
    nearby_poi: [
      { name: "Visakhapatnam Airport", kind: "airport", coords: { lat: 17.7212, lng: 83.2245 } },
      { name: "Koraput Railway Station", kind: "railway", coords: { lat: 18.8129, lng: 82.7100 } },
      { name: "Onukudelli Tribal Market", kind: "landmark", coords: { lat: 18.3000, lng: 82.4500 } },
      { name: "Duduma Waterfall", kind: "landmark", coords: { lat: 18.1833, lng: 82.5167 } },
    ],
  }),
  D({
  slug: "puri",
  place: "Puri",
  state: "Odisha",
  type: "Beach & Pilgrimage",
  category: "Hotspot",
  description:
    "Puri is one of India's most sacred pilgrimage destinations and home to the famous Jagannath Temple. Alongside its spiritual significance, the city offers beautiful beaches, vibrant culture, and rich heritage.",
  coords: { lat: 19.8135, lng: 85.8312 },
  imageExt: "jpeg",
  best_season: "October to February",
  how_to_reach: {
    air: "Biju Patnaik International Airport, Bhubaneswar (60 km)",
    rail: "Puri Railway Station",
    road: "Excellent road connectivity from Bhubaneswar and Cuttack"
  },
  travel_precautions: [
    "Expect large crowds during Rath Yatra",
    "Carry water during summer visits",
    "Follow temple dress guidelines"
  ],
  travel_tips: [
    "Visit Puri Beach at sunrise",
    "Try local Odia cuisine and khaja",
    "Explore nearby artisan villages"
  ],
  nearby_poi: [
    {
      name: "Jagannath Temple",
      kind: "landmark",
      coords: { lat: 19.8047, lng: 85.8174 }
    },
    {
      name: "Puri Beach",
      kind: "landmark",
      coords: { lat: 19.7983, lng: 85.8245 }
    },
    {
      name: "Puri Railway Station",
      kind: "railway",
      coords: { lat: 19.8144, lng: 85.8319 }
    }
  ]
}),

D({
  slug: "konark",
  place: "Konark",
  state: "Odisha",
  type: "Heritage Site",
  category: "Hotspot",
  description:
    "Konark is world famous for the UNESCO-listed Sun Temple, a masterpiece of ancient Indian architecture. The town combines heritage, history, and coastal beauty.",
  coords: { lat: 19.8876, lng: 86.0945 },
  imageExt: "jpeg",
  best_season: "October to March",
  how_to_reach: {
    air: "Biju Patnaik International Airport, Bhubaneswar (65 km)",
    rail: "Puri Railway Station (35 km)",
    road: "Frequent buses and taxis available from Puri and Bhubaneswar"
  },
  travel_precautions: [
    "Carry sunscreen and water",
    "Wear comfortable footwear",
    "Avoid visiting during peak afternoon heat"
  ],
  travel_tips: [
    "Visit early morning for photography",
    "Attend Konark Dance Festival if available",
    "Explore Chandrabhaga Beach nearby"
  ],
  nearby_poi: [
    {
      name: "Konark Sun Temple",
      kind: "landmark",
      coords: { lat: 19.8876, lng: 86.0945 }
    },
    {
      name: "Chandrabhaga Beach",
      kind: "landmark",
      coords: { lat: 19.9044, lng: 86.1160 }
    }
  ]
}),

D({
  slug: "daringbadi",
  place: "Daringbadi",
  state: "Odisha",
  type: "Hill Station",
  category: "Hidden Gem",
  description:
    "Known as the Kashmir of Odisha, Daringbadi is a picturesque hill station featuring pine forests, coffee plantations, waterfalls, and cool weather throughout the year.",
  coords: { lat: 19.9070, lng: 84.1220 },
  imageExt: "jpeg",
  best_season: "October to February",
  how_to_reach: {
    air: "Bhubaneswar Airport (250 km)",
    rail: "Berhampur Railway Station (120 km)",
    road: "Connected via Kandhamal district roads"
  },
  travel_precautions: [
    "Carry warm clothing during winter",
    "Road visibility may reduce during fog",
    "Fuel stations are limited in remote areas"
  ],
  travel_tips: [
    "Visit Pine Forest and Hill View Park",
    "Explore coffee gardens",
    "Stay overnight for sunrise views"
  ],
  nearby_poi: [
    {
      name: "Pine Forest",
      kind: "landmark",
      coords: { lat: 19.9200, lng: 84.1100 }
    },
    {
      name: "Hill View Park",
      kind: "landmark",
      coords: { lat: 19.9015, lng: 84.1235 }
    },
    {
      name: "Midubanda Waterfall",
      kind: "landmark",
      coords: { lat: 19.8900, lng: 84.0950 }
    }
  ]
}),

D({
  slug: "gupteswar",
  place: "Gupteswar Cave",
  state: "Odisha",
  type: "Cave Temple",
  category: "Hidden Gem",
  description:
    "Located amidst dense forests near Koraput, Gupteswar Cave is a sacred cave temple dedicated to Lord Shiva. The destination combines spirituality, adventure, and natural beauty.",
  coords: { lat: 18.8368, lng: 82.1688 },
  imageExt: "jpeg",
  best_season: "October to February",
  how_to_reach: {
    air: "Visakhapatnam Airport (220 km)",
    rail: "Koraput Railway Station (55 km)",
    road: "Accessible via road from Koraput and Jeypore"
  },
  travel_precautions: [
    "Steps may be slippery during monsoon",
    "Carry drinking water",
    "Wear sturdy footwear"
  ],
  travel_tips: [
    "Visit early morning to avoid crowds",
    "Combine with nearby tribal tourism circuits",
    "Carry a flashlight if exploring deeper cave sections"
  ],
  nearby_poi: [
    {
      name: "Gupteswar Temple",
      kind: "landmark",
      coords: { lat: 18.8368, lng: 82.1688 }
    },
    {
      name: "Sabara Srikhetra",
      kind: "landmark",
      coords: { lat: 18.8200, lng: 82.1500 }
    },
    {
      name: "Kolab River Viewpoint",
      kind: "landmark",
      coords: { lat: 18.8500, lng: 82.1800 }
    }
  ]
}),

  // ============ MAHARASHTRA ============
  D({
    slug: "lonavala", place: "Lonavala", state: "Maharashtra", type: "Hill Station", category: "Hotspot",
    description: "Lonavala is one of Maharashtra's most beloved hill stations, nestled in the Sahyadri ranges of the Western Ghats at 622 metres and just 65 kilometres from Pune. The town comes alive during the monsoon when the ghats turn impossibly green, waterfalls thunder down the cliffs, and the valleys fill with mist. Key attractions include the dramatic Bhushi Dam, Tiger's Leap viewpoint, Karla and Bhaja caves — ancient Buddhist rock-cut monuments — and the famous Lohagad fort. Lonavala is also the birthplace of chikki, a traditional peanut and jaggery brittle that every visitor takes home.",
    coords: { lat: 18.7546, lng: 73.4062 }, imageExt: "jpeg",
    best_season: "June to September (monsoon magic); October to February (pleasant)",
    how_to_reach: { air: "Pune (PNQ), 64 km; Mumbai (BOM), 96 km.", rail: "Lonavala Railway Station — on the Mumbai–Pune main line, frequent locals and expresses.", road: "Mumbai-Pune Expressway exit at Lonavala (1.5 hr from Mumbai, 1 hr from Pune)." },
    travel_precautions: ["Slippery rocks at Bhushi Dam — many drowning incidents; stay back from currents", "Heavy monsoon traffic on weekends — leave very early", "Leeches in trekking zones during monsoon", "Pickpocketing reported at crowded viewpoints"],
    travel_tips: ["Avoid weekends if possible — crowds are intense", "Buy chikki only from established stores like Maganlal or Cooper's", "Carry rain gear during monsoon — every day is wet", "Combine with Karla & Bhaja caves for a half-day historical add-on"],
    nearby_poi: [
      { name: "Pune Airport", kind: "airport", coords: { lat: 18.5821, lng: 73.9197 } },
      { name: "Lonavala Railway Station", kind: "railway", coords: { lat: 18.7510, lng: 73.4072 } },
      { name: "Lohagad Fort", kind: "landmark", coords: { lat: 18.7100, lng: 73.4760 } },
      { name: "Karla Caves", kind: "landmark", coords: { lat: 18.7833, lng: 73.4750 } },
    ],
  }),
  D({
    slug: "mahabaleshwar", place: "Mahabaleshwar", state: "Maharashtra", type: "Hill Station", category: "Hotspot",
    description: "Mahabaleshwar is the queen of Maharashtra's hill stations, sitting at 1,372 metres in the Sahyadri ranges and offering some of the most sweeping valley views in the Western Ghats. The town is famous for its strawberry farms, which produce much of India's strawberry crop and allow visitors to pick fruit directly from the fields. Arthur's Seat, Wilson Point, and Elephant's Head Point are iconic viewpoints, while Venna Lake offers boating amidst cool pine-scented air. The ancient Mahabaleshwar temple, dedicated to Lord Shiva, adds a spiritual dimension to what is otherwise a nature lover's retreat.",
    coords: { lat: 17.9307, lng: 73.6477 }, imageExt: "jpeg",
    best_season: "October to June (avoid heavy monsoon Jul–Sep when many viewpoints close)",
    how_to_reach: { air: "Pune (PNQ), 120 km.", rail: "Wathar (60 km) or Satara (55 km).", road: "Pune via NH48 and SH72 (3.5 hr); Mumbai via expressway (6 hr)." },
    travel_precautions: ["Many viewpoints close during peak monsoon for safety", "Strawberry-picking only at certified farms — wash before eating", "Hairpin bends — drive carefully especially in fog", "Some honey and chikki shops sell adulterated products — buy from known brands"],
    travel_tips: ["Pre-book hotels for long weekends — fills out months ahead", "Strawberry season peaks Feb–April; honey season Mar–May", "Try corn patties and chikki at Mapro Garden", "Old Mahabaleshwar village is quieter than the main bazaar area"],
    nearby_poi: [
      { name: "Pune Airport", kind: "airport", coords: { lat: 18.5821, lng: 73.9197 } },
      { name: "Wathar Railway Station", kind: "railway", coords: { lat: 17.7533, lng: 74.1383 } },
      { name: "Pratapgad Fort", kind: "landmark", coords: { lat: 17.9361, lng: 73.5778 } },
      { name: "Venna Lake", kind: "landmark", coords: { lat: 17.9221, lng: 73.6597 } },
    ],
  }),
  D({
    slug: "bhandardara", place: "Bhandardara", state: "Maharashtra", type: "Lake", category: "Hidden Gem",
    description: "Bhandardara is a serene lakeside retreat tucked into the Sahyadri hills of Ahmednagar district, roughly 165 kilometres from Mumbai, and still largely undiscovered by mass tourism. The Arthur Lake here, formed by the Wilson Dam on the Pravara River, creates a striking blue expanse surrounded by forested hills and ancient forts. The monsoon season brings the dramatic Randha Falls to life, and the area is one of the best spots in Maharashtra for firefly camping in June. With Ratangad and Harishchandragad forts nearby, Bhandardara is a perfect blend of nature, history, and quiet adventure.",
    coords: { lat: 19.5333, lng: 73.7500 }, imageExt: "jpeg",
    best_season: "June (fireflies); July to September (monsoon waterfalls); October to February (camping & treks)",
    how_to_reach: { air: "Mumbai (BOM), 165 km; Pune (PNQ), 175 km.", rail: "Igatpuri Railway Station, 45 km.", road: "Mumbai via Kasara/Igatpuri (4 hr); Pune via Sangamner (4.5 hr). Last 30 km are narrow ghat roads." },
    travel_precautions: ["Limited night-time facilities — return to camp before dark", "Leeches during monsoon treks", "Lake currents are strong — no swimming", "Mobile network is patchy beyond Shendi village"],
    travel_tips: ["MTDC Bhandardara Resort is the most reliable lakeside stay", "Firefly festival in late May/early June — book months ahead", "Sunrise from Wilson Dam is unforgettable", "Pack mosquito repellent and a torch — many areas have no streetlights"],
    nearby_poi: [
      { name: "Mumbai Airport", kind: "airport", coords: { lat: 19.0896, lng: 72.8656 } },
      { name: "Igatpuri Railway Station", kind: "railway", coords: { lat: 19.6936, lng: 73.5631 } },
      { name: "Randha Falls", kind: "landmark", coords: { lat: 19.5483, lng: 73.7717 } },
      { name: "Ratangad Fort", kind: "landmark", coords: { lat: 19.5667, lng: 73.7167 } },
    ],
  }),
  D({
    slug: "tamhini_ghat", place: "Tamhini Ghat", state: "Maharashtra", type: "Mountain Pass", category: "Hidden Gem",
    description: "Tamhini Ghat is a breathtaking mountain pass in the Western Ghats connecting Pune to the Konkan coast, and it is arguably the most scenic monsoon drive in all of Maharashtra. During July and August, the ghat transforms into a lush green corridor with dozens of thin silver waterfalls cascading down moss-covered cliffs on either side of the road. The Tamhini Wildlife Sanctuary within the ghat is a biodiversity hotspot, home to leopards, giant squirrels, and a remarkable variety of endemic flora. Unlike the busier routes to Lonavala or Mahabaleshwar, Tamhini remains quiet, raw, and deeply immersive.",
    coords: { lat: 18.4667, lng: 73.4167 }, imageExt: "jpeg",
    best_season: "July to September (monsoon waterfalls at peak)",
    how_to_reach: { air: "Pune (PNQ), 70 km.", rail: "Pune Junction, 75 km.", road: "Pune via Mulshi (2 hr); narrow road, single-carriage in places." },
    travel_precautions: ["Road becomes slippery and visibility drops in heavy rain — drive cautiously", "No fuel stations along the ghat — fill up at Mulshi", "Leopard habitat — do not stop in unlit areas at night", "Some illegal waterfall stops have caused fatal accidents — stay on marked viewpoints"],
    travel_tips: ["Best done as a day trip from Pune", "Carry food and water — very few restaurants on the ghat", "Photographers should stop at Devkund waterfall (short trek required)", "Best in early morning to beat tourist traffic"],
    nearby_poi: [
      { name: "Pune Airport", kind: "airport", coords: { lat: 18.5821, lng: 73.9197 } },
      { name: "Pune Junction", kind: "railway", coords: { lat: 18.5286, lng: 73.8742 } },
      { name: "Mulshi Lake", kind: "landmark", coords: { lat: 18.5167, lng: 73.5167 } },
      { name: "Devkund Waterfall", kind: "landmark", coords: { lat: 18.5167, lng: 73.3833 } },
    ],
  }),
  D({
  slug: "matheran",
  place: "Matheran",
  state: "Maharashtra",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Matheran is India's only automobile-free hill station, famous for its lush forests, toy train, panoramic viewpoints, and pleasant climate. It offers a peaceful escape from the busy city life of Mumbai and Pune.",
  coords: { lat: 18.9866, lng: 73.2679 },
  imageExt: "jpeg",
  best_season: "October to May",
  how_to_reach: {
    air: "Chhatrapati Shivaji Maharaj International Airport, Mumbai (90 km)",
    rail: "Neral Railway Station (8 km)",
    road: "Connected by road to Neral; vehicles stop at Dasturi Point"
  },
  travel_precautions: [
    "Wear comfortable walking shoes",
    "Carry rain protection during monsoon",
    "Avoid trekking alone in remote trails"
  ],
  travel_tips: [
    "Take the toy train ride from Neral",
    "Visit Panorama Point during sunrise",
    "Explore multiple viewpoints on foot"
  ],
  nearby_poi: [
    {
      name: "Panorama Point",
      kind: "landmark",
      coords: { lat: 19.0020, lng: 73.2840 }
    },
    {
      name: "Charlotte Lake",
      kind: "landmark",
      coords: { lat: 18.9882, lng: 73.2746 }
    },
    {
      name: "Neral Railway Station",
      kind: "railway",
      coords: { lat: 19.0245, lng: 73.3163 }
    }
  ]
}),

D({
  slug: "alibaug",
  place: "Alibaug",
  state: "Maharashtra",
  type: "Beach Destination",
  category: "Hotspot",
  description:
    "Alibaug is a popular coastal town known for its sandy beaches, historic forts, water sports, and relaxed atmosphere. Often called the 'Goa of Maharashtra', it attracts travelers throughout the year.",
  coords: { lat: 18.6414, lng: 72.8722 },
  imageExt: "jpeg",
  best_season: "November to March",
  how_to_reach: {
    air: "Mumbai Airport (100 km)",
    rail: "Panvel Railway Station (55 km)",
    road: "Well connected via Mumbai-Goa Highway and ferry services"
  },
  travel_precautions: [
    "Avoid swimming during rough sea conditions",
    "Check ferry schedules before travel",
    "Stay hydrated during summer"
  ],
  travel_tips: [
    "Visit Kolaba Fort during low tide",
    "Enjoy beachside sunsets",
    "Try local seafood specialties"
  ],
  nearby_poi: [
    {
      name: "Kolaba Fort",
      kind: "landmark",
      coords: { lat: 18.6340, lng: 72.8675 }
    },
    {
      name: "Alibaug Beach",
      kind: "landmark",
      coords: { lat: 18.6392, lng: 72.8714 }
    },
    {
      name: "Varsoli Beach",
      kind: "landmark",
      coords: { lat: 18.6610, lng: 72.8820 }
    }
  ]
}),

D({
  slug: "kaasplateau",
  place: "Kaas Plateau",
  state: "Maharashtra",
  type: "Biodiversity Site",
  category: "Hidden Gem",
  description:
    "Kaas Plateau, often called the Valley of Flowers of Maharashtra, is a UNESCO-recognized biodiversity hotspot famous for its seasonal bloom of rare wildflowers and stunning landscapes.",
  coords: { lat: 17.7204, lng: 73.8190 },
  imageExt: "jpeg",
  best_season: "August to October",
  how_to_reach: {
    air: "Pune Airport (140 km)",
    rail: "Satara Railway Station (25 km)",
    road: "Excellent road connectivity from Satara"
  },
  travel_precautions: [
    "Do not pluck flowers",
    "Follow eco-tourism guidelines",
    "Roads can be slippery during monsoon"
  ],
  travel_tips: [
    "Visit during flower blooming season",
    "Carry a camera for landscape photography",
    "Start early to avoid crowds"
  ],
  nearby_poi: [
    {
      name: "Kaas Lake",
      kind: "landmark",
      coords: { lat: 17.7280, lng: 73.8130 }
    },
    {
      name: "Thoseghar Waterfalls",
      kind: "landmark",
      coords: { lat: 17.5950, lng: 73.7950 }
    }
  ]
}),

D({
  slug: "sandhanvalley",
  place: "Sandhan Valley",
  state: "Maharashtra",
  type: "Canyon Trek",
  category: "Hidden Gem",
  description:
    "Sandhan Valley is a spectacular canyon carved between mountain ranges near Bhandardara. Known as the Valley of Shadows, it is famous for trekking, rappelling, camping, and adventure activities.",
  coords: { lat: 19.5000, lng: 73.7500 },
  imageExt: "jpeg",
  best_season: "November to February",
  how_to_reach: {
    air: "Nashik Airport (90 km)",
    rail: "Igatpuri Railway Station (45 km)",
    road: "Accessible by road via Samrad village"
  },
  travel_precautions: [
    "Trek only with guides if inexperienced",
    "Carry sufficient water and food",
    "Avoid visiting during heavy monsoon"
  ],
  travel_tips: [
    "Ideal for adventure seekers",
    "Carry trekking gear",
    "Plan overnight camping for best experience"
  ],
  nearby_poi: [
    {
      name: "Samrad Village",
      kind: "landmark",
      coords: { lat: 19.5140, lng: 73.7420 }
    },
    {
      name: "Bhandardara Dam",
      kind: "landmark",
      coords: { lat: 19.5360, lng: 73.7580 }
    },
    {
      name: "Kalsubai Peak",
      kind: "landmark",
      coords: { lat: 19.6010, lng: 73.7060 }
    }
  ]
}),

  // ============ TAMIL NADU ============
  D({
    slug: "ooty", place: "Ooty", state: "Tamil Nadu", type: "Hill Station", category: "Hotspot",
    description: "Ooty, officially known as Udhagamandalam, is the crown jewel of the Nilgiri Hills in Tamil Nadu and one of South India's most iconic hill destinations, sitting at an elevation of 2,240 metres. The famous Nilgiri Mountain Railway — a UNESCO World Heritage Site — winds up to Ooty through tea estates, eucalyptus forests, and misty tunnels on a journey that is itself as memorable as the destination. The Government Botanical Garden, Ooty Lake, and Rose Garden are popular landmarks, while the surrounding Nilgiri Biosphere Reserve offers rich wildlife and trekking. Ooty's cool climate, fragrant tea, and colonial-era charm make it a timeless retreat.",
    coords: { lat: 11.4102, lng: 76.6950 }, imageExt: "jpeg",
    best_season: "April to June and September to November",
    how_to_reach: { air: "Coimbatore (CJB), 90 km.", rail: "Mettupalayam (45 km) for the toy train; Coimbatore Junction for mainline.", road: "Coimbatore via NH181 (3 hr) — 36 hairpin bends." },
    travel_precautions: ["Hairpin bends cause motion sickness — carry tablets", "Weekend overcrowding — book hotels in advance", "Beware overpriced 'tea estate tours' run by touts", "Leech zone in forest treks during monsoon"],
    travel_tips: ["Book the Nilgiri Mountain Railway 60+ days ahead via IRCTC — sells out fast", "Stay in Fernhill or Coonoor area for a quieter experience", "Try varkey biscuits and homemade chocolate from Modern Stores", "Carry warm layers year-round — even summer evenings are chilly"],
    nearby_poi: [
      { name: "Coimbatore Airport", kind: "airport", coords: { lat: 11.0299, lng: 77.0434 } },
      { name: "Mettupalayam Railway Station", kind: "railway", coords: { lat: 11.3000, lng: 76.9333 } },
      { name: "Doddabetta Peak", kind: "landmark", coords: { lat: 11.4000, lng: 76.7333 } },
      { name: "Coonoor (Sim's Park)", kind: "landmark", coords: { lat: 11.3530, lng: 76.7959 } },
    ],
  }),
  D({
    slug: "kodaikanal", place: "Kodaikanal", state: "Tamil Nadu", type: "Hill Station", category: "Hotspot",
    description: "Kodaikanal, known as the Princess of Hill Stations, sits at 2,133 metres in the Palani Hills of Tamil Nadu and offers a cooler, more intimate alternative to Ooty. The star-shaped Kodaikanal Lake at the heart of town is perfect for boating and cycling along its forested banks, while the nearby Pillar Rocks — three giant vertical granite formations — rise dramatically from the mist. Coaker's Walk is a classic promenade that overlooks the plains far below, and the surrounding shola forests and grasslands shelter rare wildlife including the Nilgiri Tahr. Kodaikanal has a laid-back, bohemian atmosphere unlike any other hill station in India.",
    coords: { lat: 10.2381, lng: 77.4892 }, imageExt: "jpeg",
    best_season: "April to June and September to October",
    how_to_reach: { air: "Madurai (IXM), 120 km.", rail: "Kodaikanal Road Railway Station, 80 km — local buses and taxis available.", road: "Madurai via Batlagundu (3 hr); steep ghat road last 60 km." },
    travel_precautions: ["Mist can reduce visibility to a few metres — drive slowly", "Bison occasionally on roads at dawn/dusk", "Monsoon (Oct–Dec) brings landslides on the ghat", "Avoid trekking alone in shola forests"],
    travel_tips: ["Stay near the lake for walkable access to most sights", "Hire a cycle for the 5 km lake loop — best done early morning", "Try home-made cheese and chocolates at Pastry Corner", "Pillar Rocks viewpoint is best between 9–11 AM before mist sets in"],
    nearby_poi: [
      { name: "Madurai Airport", kind: "airport", coords: { lat: 9.8345, lng: 78.0934 } },
      { name: "Kodaikanal Road Railway Station", kind: "railway", coords: { lat: 10.2333, lng: 77.7833 } },
      { name: "Pillar Rocks", kind: "landmark", coords: { lat: 10.2300, lng: 77.4500 } },
      { name: "Berijam Lake", kind: "landmark", coords: { lat: 10.2333, lng: 77.3833 } },
    ],
  }),
  D({
    slug: "yelagiri", place: "Yelagiri", state: "Tamil Nadu", type: "Hill Station", category: "Hidden Gem",
    description: "Yelagiri is a compact, unhurried hill station in the Vellore district of Tamil Nadu, rising to about 1,100 metres and offering a refreshing escape without the crowds of Ooty or Kodaikanal. The plateau is dotted with fruit orchards, rose gardens, and tribal villages, and Punganur Lake at its centre is lovely for an early morning walk. A network of trekking trails leads up to Swamimalai Hill, from where the plains of North Tamil Nadu stretch out below in every direction. Yelagiri is particularly popular with cyclists and paragliders, and its proximity to Chennai makes it an ideal weekend destination.",
    coords: { lat: 12.5833, lng: 78.6333 }, imageExt: "jpeg",
    best_season: "October to March",
    how_to_reach: { air: "Bengaluru (BLR), 160 km; Chennai (MAA), 230 km.", rail: "Jolarpettai Junction, 25 km — taxis and buses to the top.", road: "Jolarpettai via 14 hairpin bends (45 min)." },
    travel_precautions: ["Limited late-night dining — most kitchens close by 9 PM", "ATMs are few — carry cash", "Paragliding only with TASAC-certified pilots", "Mobile network is best with Airtel and Jio"],
    travel_tips: ["Yelagiri Summer Festival (May) is the liveliest time", "Stay at Jaladhama or Sterling for lake views", "Try the local thali at Saravana Bhavan in the bazaar", "Cycling is the best way to explore the small plateau"],
    nearby_poi: [
      { name: "Bengaluru Airport", kind: "airport", coords: { lat: 13.1986, lng: 77.7066 } },
      { name: "Jolarpettai Junction", kind: "railway", coords: { lat: 12.5722, lng: 78.5719 } },
      { name: "Punganur Lake", kind: "landmark", coords: { lat: 12.5800, lng: 78.6300 } },
      { name: "Swamimalai Hill", kind: "landmark", coords: { lat: 12.6000, lng: 78.6500 } },
    ],
  }),
  D({
    slug: "courtallam_falls", place: "Courtallam Falls", state: "Tamil Nadu", type: "Waterfall", category: "Hidden Gem",
    description: "Courtallam, often called the Spa of South India, is a cluster of nine waterfalls nestled in the Western Ghats near Tenkasi in southern Tamil Nadu. The falls are fed by rivers that pass through forests rich in medicinal herbs, and the water is locally believed to have therapeutic and healing properties. The Main Falls and Five Falls are the most accessible and popular, but the more secluded Shenbagadevi Falls offer a quieter experience deep in the forest. Courtallam is at its spectacular best during the monsoon season from June to September, when the falls swell with full force.",
    coords: { lat: 8.9333, lng: 77.2833 }, imageExt: "jpeg",
    best_season: "June to September (peak flow); October to January (gentler bathing)",
    how_to_reach: { air: "Tuticorin (TCR), 95 km; Madurai (IXM), 160 km.", rail: "Tenkasi Junction, 6 km — frequent buses to falls.", road: "Tenkasi via SH40 (15 min)." },
    travel_precautions: ["Falls can be closed during flash floods — check weather before visiting", "Strong currents at Main Falls — only bathe in designated zones", "Crowded on Sundays — go on a weekday", "Slippery rocks — wear grippy footwear"],
    travel_tips: ["Carry a change of clothes and a towel — bathing is part of the experience", "Stay in Tenkasi for more food and accommodation options", "Try fresh tender coconut at the falls entrance", "Visit Shenbagadevi Falls early — short forest trek required"],
    nearby_poi: [
      { name: "Tuticorin Airport", kind: "airport", coords: { lat: 8.7242, lng: 78.0258 } },
      { name: "Tenkasi Junction", kind: "railway", coords: { lat: 8.9594, lng: 77.3147 } },
      { name: "Five Falls", kind: "landmark", coords: { lat: 8.9333, lng: 77.2667 } },
      { name: "Old Courtallam Falls", kind: "landmark", coords: { lat: 8.9333, lng: 77.2750 } },
    ],
  }),
  D({
  slug: "coonoor",
  place: "Coonoor",
  state: "Tamil Nadu",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Coonoor is a charming hill station in the Nilgiri Hills, known for tea plantations, pleasant weather, scenic viewpoints, and the famous Nilgiri Mountain Railway. It offers a quieter alternative to Ooty.",
  coords: { lat: 11.3530, lng: 76.7959 },
  imageExt: "jpeg",
  best_season: "October to May",
  how_to_reach: {
    air: "Coimbatore International Airport (70 km)",
    rail: "Coonoor Railway Station",
    road: "Well connected via Ooty and Coimbatore"
  },
  travel_precautions: [
    "Carry warm clothing during winter",
    "Roads can be foggy during mornings",
    "Wear comfortable footwear for walking"
  ],
  travel_tips: [
    "Take the Nilgiri Mountain Railway ride",
    "Visit tea estates and factories",
    "Explore viewpoints early in the morning"
  ],
  nearby_poi: [
    {
      name: "Dolphin's Nose",
      kind: "landmark",
      coords: { lat: 11.3275, lng: 76.8006 }
    },
    {
      name: "Sim's Park",
      kind: "landmark",
      coords: { lat: 11.3487, lng: 76.7952 }
    },
    {
      name: "Coonoor Railway Station",
      kind: "railway",
      coords: { lat: 11.3500, lng: 76.7940 }
    }
  ]
}),

D({
  slug: "yercaud",
  place: "Yercaud",
  state: "Tamil Nadu",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Yercaud is a picturesque hill station in the Shevaroy Hills, famous for coffee plantations, Yercaud Lake, viewpoints, and pleasant weather. It is often called the Jewel of the South.",
  coords: { lat: 11.7753, lng: 78.2090 },
  imageExt: "jpeg",
  best_season: "October to June",
  how_to_reach: {
    air: "Salem Airport (38 km)",
    rail: "Salem Junction (35 km)",
    road: "Connected through a scenic ghat road from Salem"
  },
  travel_precautions: [
    "Drive carefully on hairpin bends",
    "Carry light jackets during winter",
    "Avoid trekking alone at night"
  ],
  travel_tips: [
    "Enjoy boating at Yercaud Lake",
    "Visit Lady's Seat viewpoint",
    "Try locally grown coffee"
  ],
  nearby_poi: [
    {
      name: "Yercaud Lake",
      kind: "landmark",
      coords: { lat: 11.7758, lng: 78.2088 }
    },
    {
      name: "Lady's Seat",
      kind: "landmark",
      coords: { lat: 11.7685, lng: 78.1940 }
    },
    {
      name: "Pagoda Point",
      kind: "landmark",
      coords: { lat: 11.7955, lng: 78.2125 }
    }
  ]
}),

D({
  slug: "meghamalai",
  place: "Meghamalai",
  state: "Tamil Nadu",
  type: "Mountain Range",
  category: "Hidden Gem",
  description:
    "Meghamalai, also known as the High Wavy Mountains, is a hidden paradise featuring tea estates, mist-covered hills, wildlife, waterfalls, and breathtaking landscapes far from crowded tourist routes.",
  coords: { lat: 9.6683, lng: 77.2470 },
  imageExt: "jpeg",
  best_season: "October to March",
  how_to_reach: {
    air: "Madurai Airport (120 km)",
    rail: "Theni Railway Station (60 km)",
    road: "Accessible by road through Theni district"
  },
  travel_precautions: [
    "Roads can be narrow and winding",
    "Mobile connectivity may be limited",
    "Carry cash and essentials"
  ],
  travel_tips: [
    "Visit tea plantations",
    "Carry binoculars for wildlife spotting",
    "Stay overnight for sunrise views"
  ],
  nearby_poi: [
    {
      name: "High Wavy Dam",
      kind: "landmark",
      coords: { lat: 9.6550, lng: 77.2550 }
    },
    {
      name: "Meghamalai Tea Estates",
      kind: "landmark",
      coords: { lat: 9.6700, lng: 77.2450 }
    },
    {
      name: "Vellimalai Viewpoint",
      kind: "landmark",
      coords: { lat: 9.6800, lng: 77.2400 }
    }
  ]
}),

D({
  slug: "kollihills",
  place: "Kolli Hills",
  state: "Tamil Nadu",
  type: "Hill Station",
  category: "Hidden Gem",
  description:
    "Kolli Hills is a lesser-known mountain retreat famous for its 70 hairpin bends, dense forests, waterfalls, trekking routes, and peaceful natural beauty. It remains one of Tamil Nadu's best hidden gems.",
  coords: { lat: 11.2480, lng: 78.3410 },
  imageExt: "jpeg",
  best_season: "September to February",
  how_to_reach: {
    air: "Tiruchirappalli International Airport (120 km)",
    rail: "Namakkal Railway Station (45 km)",
    road: "Accessible via Namakkal through mountain roads"
  },
  travel_precautions: [
    "Drive carefully on hairpin bends",
    "Carry sufficient fuel",
    "Avoid travel during heavy rainfall"
  ],
  travel_tips: [
    "Visit Agaya Gangai Waterfalls",
    "Explore local tribal villages",
    "Enjoy panoramic valley views"
  ],
  nearby_poi: [
    {
      name: "Agaya Gangai Waterfalls",
      kind: "landmark",
      coords: { lat: 11.2360, lng: 78.3370 }
    },
    {
      name: "Arapaleeswarar Temple",
      kind: "landmark",
      coords: { lat: 11.2540, lng: 78.3450 }
    },
    {
      name: "Seekuparai Viewpoint",
      kind: "landmark",
      coords: { lat: 11.2600, lng: 78.3300 }
    }
  ]
}),

  // ============ HIMACHAL PRADESH ============
  D({
    slug: "manali", place: "Manali", state: "Himachal Pradesh", type: "Hill Station", category: "Hotspot",
    description: "Manali is one of India's most famous mountain destinations, situated at 2,050 metres in the Kullu Valley of Himachal Pradesh where the Beas River flows cold and swift through pine and deodar forests. The town is a year-round adventure hub — offering skiing and snowboarding at Solang Valley in winter, and trekking, river rafting, and paragliding in summer. The ancient Hadimba Devi Temple, built in 1553 amid towering cedar trees, is a must-visit, as is the charming old Manali village with its traditional Himachali homes and cafes. Manali is also the starting point for the legendary Leh-Manali Highway, one of the world's great road journeys.",
    coords: { lat: 32.2432, lng: 77.1892 }, imageExt: "jpeg",
    best_season: "March to June (pleasant); December to February (snow); September to November (clear)",
    how_to_reach: { air: "Bhuntar Airport (KUU), 50 km — limited flights; Chandigarh (IXC), 310 km.", rail: "Joginder Nagar (135 km) or Chandigarh (310 km).", road: "Volvo from Delhi via Chandigarh (12–14 hr); self-drive on NH3." },
    travel_precautions: ["Snow chains required Dec–Feb on Rohtang/Atal Tunnel road", "Permit needed for Rohtang Pass (online via HP Tourism)", "Mall Road is car-free — park outside and walk", "Rafting only with certified operators displaying ATOAI permits"],
    travel_tips: ["Stay in Old Manali or Vashisht for character; New Manali for convenience", "Book Solang Valley adventure activities through verified operators only", "Try sidu (steamed bread with ghee) and trout at riverside cafes", "Carry warm layers even in summer — mornings are cold"],
    nearby_poi: [
      { name: "Bhuntar Airport (Kullu)", kind: "airport", coords: { lat: 31.8765, lng: 77.1543 } },
      { name: "Joginder Nagar Railway Station", kind: "railway", coords: { lat: 31.9870, lng: 76.7920 } },
      { name: "Hadimba Devi Temple", kind: "landmark", coords: { lat: 32.2486, lng: 77.1846 } },
      { name: "Solang Valley", kind: "landmark", coords: { lat: 32.3175, lng: 77.1572 } },
    ],
  }),
  D({
    slug: "shimla", place: "Shimla", state: "Himachal Pradesh", type: "Hill Station", category: "Hotspot",
    description: "Shimla is the capital of Himachal Pradesh and India's most storied hill station, once serving as the summer capital of the British Raj and still wearing that colonial heritage proudly. Perched at 2,200 metres, the town's iconic Ridge and Mall Road are framed by Victorian architecture, Christ Church, and views of snow-dusted peaks that make every stroll feel cinematic. The Kalka–Shimla Railway, a UNESCO World Heritage Site, is one of the most scenic train journeys in the country. Jakhu Temple, Chadwick Falls, and the surrounding apple orchards and forest trails complete the picture of a destination that balances history, culture, and natural beauty.",
    coords: { lat: 31.1048, lng: 77.1734 }, imageExt: "jpeg",
    best_season: "March to June and September to November; December to January for snow",
    how_to_reach: { air: "Shimla Airport (SLV), 22 km — small, weather-dependent; Chandigarh (IXC), 110 km.", rail: "Kalka (96 km) — connect via the UNESCO toy train.", road: "Chandigarh via NH5 (3.5 hr)." },
    travel_precautions: ["Mall Road and Ridge are pedestrian-only", "Heavy snow can shut roads in Jan–Feb — check before driving", "Monkey thefts at Jakhu Temple — secure phones, glasses, food", "Hotel touts at the bus stand can be aggressive — pre-book accommodation"],
    travel_tips: ["Book the toy train (Kalka–Shimla) months in advance", "Stay near Mall Road for walkable access; or in Mashobra for quiet luxury", "Try chana madra and trout at Cafe Sol or Indian Coffee House", "Wear sturdy shoes — Shimla is steep and stair-heavy"],
    nearby_poi: [
      { name: "Shimla Airport (Jubbarhatti)", kind: "airport", coords: { lat: 31.0818, lng: 77.0680 } },
      { name: "Shimla Railway Station", kind: "railway", coords: { lat: 31.1019, lng: 77.1583 } },
      { name: "Jakhu Temple", kind: "landmark", coords: { lat: 31.1067, lng: 77.1842 } },
      { name: "Christ Church", kind: "landmark", coords: { lat: 31.1041, lng: 77.1735 } },
    ],
  }),
  D({
    slug: "chitkul", place: "Chitkul", state: "Himachal Pradesh", type: "Village", category: "Hidden Gem",
    description: "Chitkul is the last inhabited village before the Indo-Tibet border in the Baspa Valley of the Kinnaur district, sitting at a staggering 3,450 metres and accessible only via a narrow mountain road. The village is one of the most strikingly beautiful in all of the Himalayas — a small cluster of traditional Kinnauri wooden homes with carved balconies, an ancient temple, apple orchards, and the turquoise Baspa River rushing alongside. Life here moves at a pace entirely removed from the modern world, and the surrounding mountains offer excellent high-altitude treks. Chitkul is accessible from May to October before heavy snowfall closes the roads.",
    coords: { lat: 31.3500, lng: 78.4333 }, imageExt: "jpeg",
    best_season: "May to October (road typically snow-bound rest of year)",
    how_to_reach: { air: "Shimla (SLV), 250 km; Chandigarh (IXC), 360 km.", rail: "Shimla, 250 km.", road: "From Shimla via Sangla (10–12 hr); narrow mountain roads after Karcham." },
    travel_precautions: ["Altitude 3,450m — risk of AMS; spend a night at Sangla first", "Roads close after heavy snow (Nov–Apr)", "Limited medical facilities — carry full medicine kit", "Inner Line not required for Indians but ID always asked at checkposts"],
    travel_tips: ["Stay at Kinner Camps or local homestays — book ahead, tiny inventory", "Try thukpa, chha gosht, and apple cider at family kitchens", "Walk to the Baspa riverbank at sunrise — unforgettable", "Carry warm layers, sunscreen, and lip balm — UV is intense"],
    nearby_poi: [
      { name: "Shimla Airport (Jubbarhatti)", kind: "airport", coords: { lat: 31.0818, lng: 77.0680 } },
      { name: "Shimla Railway Station", kind: "railway", coords: { lat: 31.1019, lng: 77.1583 } },
      { name: "Sangla Village", kind: "landmark", coords: { lat: 31.4283, lng: 78.2658 } },
      { name: "Kalpa Village", kind: "landmark", coords: { lat: 31.5333, lng: 78.2500 } },
    ],
  }),
  D({
    slug: "kalpa", place: "Kalpa", state: "Himachal Pradesh", type: "Village", category: "Hidden Gem",
    description: "Kalpa is a small, enchanting village in the Kinnaur district of Himachal Pradesh, perched at 2,960 metres directly opposite the towering Kinner Kailash range — a holy mountain that glows gold at sunrise and turns silver at dusk in a spectacle that leaves visitors speechless. The village is surrounded by terraced apple and apricot orchards that burst into blossom in spring, and ancient Buddhist monasteries and Hindu temples coexist here in the unique syncretism of Kinnauri culture. The old Roghi village walk and Suicide Point viewpoint are popular short treks. Kalpa sees a fraction of the tourist traffic of Shimla or Manali, making it ideal for those seeking solitude and raw Himalayan beauty.",
    coords: { lat: 31.5333, lng: 78.2500 }, imageExt: "jpeg",
    best_season: "April to October; March for apple blossoms",
    how_to_reach: { air: "Shimla (SLV), 230 km; Chandigarh (IXC), 340 km.", rail: "Shimla, 230 km.", road: "Shimla via NH5 to Reckong Peo (9 hr), then 11 km uphill to Kalpa." },
    travel_precautions: ["Altitude 2,960m — pace activity on day one", "Section between Tapri and Powari is landslide-prone — check road status", "Limited medical and ATM facilities — carry essentials", "Roads can close in heavy snow (Jan–Feb)"],
    travel_tips: ["Stay at HPTDC Kinner Kailash Cottages for unbeatable views", "Walk to Roghi village on the old footpath — quieter than the road", "Sunrise on Kinner Kailash from your balcony is the highlight — wake at 5:30 AM", "Carry cash; ATMs work only in Reckong Peo (11 km below)"],
    nearby_poi: [
      { name: "Shimla Airport (Jubbarhatti)", kind: "airport", coords: { lat: 31.0818, lng: 77.0680 } },
      { name: "Shimla Railway Station", kind: "railway", coords: { lat: 31.1019, lng: 77.1583 } },
      { name: "Suicide Point", kind: "landmark", coords: { lat: 31.5350, lng: 78.2580 } },
      { name: "Reckong Peo", kind: "landmark", coords: { lat: 31.5417, lng: 78.2667 } },
    ],
  }),
  D({
  slug: "dharamshala",
  place: "Dharamshala",
  state: "Himachal Pradesh",
  type: "Hill Station",
  category: "Hotspot",
  description:
    "Dharamshala is a beautiful Himalayan town known for its Tibetan culture, monasteries, mountain scenery, and pleasant weather. It serves as the residence of the Dalai Lama and attracts travelers from around the world.",
  coords: { lat: 32.2190, lng: 76.3234 },
  imageExt: "jpeg",
  best_season: "March to June and September to November",
  how_to_reach: {
    air: "Kangra Airport (15 km)",
    rail: "Pathankot Railway Station (85 km)",
    road: "Well connected by buses and taxis from major Himachal cities"
  },
  travel_precautions: [
    "Carry warm clothing during evenings",
    "Roads may be slippery during monsoon",
    "Book accommodation in advance during peak season"
  ],
  travel_tips: [
    "Visit McLeod Ganj and Namgyal Monastery",
    "Try authentic Tibetan cuisine",
    "Enjoy sunset views from Naddi Village"
  ],
  nearby_poi: [
    {
      name: "McLeod Ganj",
      kind: "landmark",
      coords: { lat: 32.2426, lng: 76.3219 }
    },
    {
      name: "Namgyal Monastery",
      kind: "landmark",
      coords: { lat: 32.2396, lng: 76.3217 }
    },
    {
      name: "Bhagsu Waterfall",
      kind: "landmark",
      coords: { lat: 32.2514, lng: 76.3344 }
    }
  ]
}),

D({
  slug: "kasol",
  place: "Kasol",
  state: "Himachal Pradesh",
  type: "Valley Town",
  category: "Hotspot",
  description:
    "Kasol is a picturesque village located along the Parvati River. Known for its scenic beauty, trekking trails, riverside cafes, and backpacker culture, it is one of Himachal Pradesh's most popular mountain destinations.",
  coords: { lat: 32.0100, lng: 77.3150 },
  imageExt: "jpeg",
  best_season: "March to June and October to November",
  how_to_reach: {
    air: "Bhuntar Airport (31 km)",
    rail: "Joginder Nagar Railway Station (145 km)",
    road: "Accessible via Bhuntar and Kullu by road"
  },
  travel_precautions: [
    "Carry warm clothing throughout the year",
    "Avoid trekking alone in remote areas",
    "Weather can change quickly in the mountains"
  ],
  travel_tips: [
    "Visit Manikaran Sahib nearby",
    "Walk along the Parvati River",
    "Explore nearby villages like Chalal and Tosh"
  ],
  nearby_poi: [
    {
      name: "Parvati River",
      kind: "landmark",
      coords: { lat: 32.0090, lng: 77.3140 }
    },
    {
      name: "Manikaran Sahib",
      kind: "landmark",
      coords: { lat: 32.0277, lng: 77.3506 }
    },
    {
      name: "Chalal Village",
      kind: "landmark",
      coords: { lat: 32.0130, lng: 77.3180 }
    }
  ]
}),

D({
  slug: "tirthanvalley",
  place: "Tirthan Valley",
  state: "Himachal Pradesh",
  type: "Valley",
  category: "Hidden Gem",
  description:
    "Tirthan Valley is a peaceful Himalayan paradise known for crystal-clear rivers, trout fishing, traditional villages, and access to the Great Himalayan National Park. It is one of Himachal's most beautiful hidden gems.",
  coords: { lat: 31.6385, lng: 77.3443 },
  imageExt: "jpeg",
  best_season: "March to June and September to November",
  how_to_reach: {
    air: "Bhuntar Airport (50 km)",
    rail: "Joginder Nagar Railway Station (120 km)",
    road: "Accessible by road through Aut and Banjar"
  },
  travel_precautions: [
    "Carry basic medicines",
    "Weather can become cold at night",
    "Follow local trekking guidelines"
  ],
  travel_tips: [
    "Visit Great Himalayan National Park",
    "Stay in riverside homestays",
    "Ideal destination for nature photography"
  ],
  nearby_poi: [
    {
      name: "Great Himalayan National Park",
      kind: "landmark",
      coords: { lat: 31.7780, lng: 77.3650 }
    },
    {
      name: "Jalori Pass",
      kind: "landmark",
      coords: { lat: 31.5330, lng: 77.4070 }
    },
    {
      name: "Banjar",
      kind: "landmark",
      coords: { lat: 31.6390, lng: 77.3400 }
    }
  ]
}),

D({
  slug: "jibhi",
  place: "Jibhi",
  state: "Himachal Pradesh",
  type: "Mountain Village",
  category: "Hidden Gem",
  description:
    "Jibhi is a charming Himalayan village surrounded by pine forests, wooden cottages, waterfalls, and mountain streams. Its peaceful atmosphere makes it a perfect escape from crowded tourist destinations.",
  coords: { lat: 31.5890, lng: 77.3460 },
  imageExt: "jpeg",
  best_season: "March to June and September to November",
  how_to_reach: {
    air: "Bhuntar Airport (52 km)",
    rail: "Joginder Nagar Railway Station (118 km)",
    road: "Connected via Banjar and Aut"
  },
  travel_precautions: [
    "Carry warm clothes even during summer nights",
    "Mobile network coverage may be limited",
    "Roads may become slippery during rain"
  ],
  travel_tips: [
    "Visit Jibhi Waterfall",
    "Stay in traditional wooden cottages",
    "Explore nearby Jalori Pass and Serolsar Lake"
  ],
  nearby_poi: [
    {
      name: "Jibhi Waterfall",
      kind: "landmark",
      coords: { lat: 31.5915, lng: 77.3490 }
    },
    {
      name: "Serolsar Lake",
      kind: "landmark",
      coords: { lat: 31.5300, lng: 77.4200 }
    },
    {
      name: "Jalori Pass",
      kind: "landmark",
      coords: { lat: 31.5330, lng: 77.4070 }
    }
  ]
}),
];

//add
/*
alibaug
borong
daringbadi
dharamshala
dzongu
gupteswar
jibhi
kaasplateau
kasol
kollihills
konark
matheran
meghamalai
pelling
puri
ravangla
sandhanvalley
trithanvalley
yeracaud
*/


export const STATES = ["Sikkim", "Odisha", "Maharashtra", "Tamil Nadu", "Himachal Pradesh"] as const;
export const CATEGORIES = ["Hotspot", "Hidden Gem"] as const;

export function getCoverImage(d: Destination) {
  return `/images/${d.slug}/${d.slug}_1.${d.imageExt}`;
}
export function getGalleryImages(d: Destination) {
  return [1, 2, 3, 4, 5].map(i => `/images/${d.slug}/${d.slug}_${i}.${d.imageExt}`);
}
export function getDestination(slug: string) {
  return DESTINATIONS.find(d => d.slug === slug);
}
