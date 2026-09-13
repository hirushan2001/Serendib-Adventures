import { Tour, Destination, Category, Review } from "./types";

export const images = {
  rafting: "/assets/hero-rafting.jpg",
  canyoning: "/assets/adventure-canyoning.jpg",
  trekking: "/assets/adventure-trekking.jpg",
  abseiling: "/assets/adventure-abseiling.jpg",
  camping: "/assets/adventure-camping.jpg",
  highlands: "/assets/destination-highlands.jpg",
};

const rafting = images.rafting;
const canyoning = images.canyoning;
const trekking = images.trekking;
const abseiling = images.abseiling;
const camping = images.camping;
const highlands = images.highlands;

export const categories: Category[] = [
  {
    id: "white-water-rafting",
    title: "White Water Rafting",
    subtitle: "Read the river. Ride the wild.",
    description: "Grade 3-4 rapids along the scenic Kelani River in Kitulgala.",
    image: rafting,
    badge: "Most Popular",
    count: "12 Tours",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: "canyoning",
    title: "Jungle Canyoning",
    subtitle: "Into the rainforest gorge.",
    description: "Natural rock slides, canyon jumps, and stream scrambling.",
    image: canyoning,
    count: "8 Tours",
    className: ""
  },
  {
    id: "jungle-trekking",
    title: "Rainforest Trekking",
    subtitle: "Follow the living forest.",
    description: "Guided jungle trails in Kitulgala, Sinharaja, and Knuckles.",
    image: trekking,
    count: "15 Tours",
    className: ""
  },
  {
    id: "waterfall-abseiling",
    title: "Waterfall Abseiling",
    subtitle: "Step over the edge.",
    description: "Descend spectacular water drops with certified rigging.",
    image: abseiling,
    count: "6 Tours",
    className: "md:col-span-2"
  },
  {
    id: "camping-nature",
    title: "Camping & Nature",
    subtitle: "Stay where the wild begins.",
    description: "Riverside glamping and luxury wilderness camping.",
    image: camping,
    count: "10 Tours",
    className: ""
  },
  {
    id: "cultural-safari",
    title: "Safari & Heritage",
    subtitle: "Wild kingdom & ancient roots.",
    description: "Leopard tracking in Yala and Sigiriya rock fortress expeditions.",
    image: highlands,
    count: "20 Tours",
    className: ""
  }
];

export const adventures: Tour[] = [
  {
    id: "kitulgala-white-water-rafting",
    slug: "kitulgala-white-water-rafting",
    title: "Kitulgala White Water Rafting Expedition",
    location: "Kitulgala, Sabaragamuwa",
    category: "White Water Rafting",
    categoryId: "white-water-rafting",
    destinationId: "kitulgala",
    image: rafting,
    duration: "3 - 5 hours",
    difficulty: "Moderate",
    rating: 5.0,
    reviewsCount: 184,
    price: 65,
    oldPrice: 80,
    badge: "Viator 5.0★ Best Seller",
    featured: true,
    groupSize: "2 - 8 People",
    viatorUrl: "https://www.viator.com/tours/Kandy/White-Water-Rafting-Kitulgala/d22283-135461P7",
    tripAdvisorUrl: "https://www.tripadvisor.co.uk/AttractionProductReview-g608523-d19773087-White_Water_Rafting_Kitulgala-Kitulgala_Sabaragamuwa_Province.html",
    viatorProductCode: "135461P7",
    tripAdvisorRef: "d19773087",
    freeCancellation: true,
    instantConfirmation: true,
    comboActivities: ["White Water Rafting", "Jungle Canyoning", "Waterfall Abseiling", "Rainforest Trekking", "Kayaking", "Ziplining"],
    overview: "Conquer five major Grade 3/4 rapids along the historic Kelani River in Kitulgala. Guided by certified swift-water rescue instructors, this top-rated experience with Serendib Adventures offers optional multi-activity combos including jungle canyoning, ziplining, and waterfall abseiling.",
    highlights: [
      "Navigate 5 major Grade 3/4 rapids (Head Chopper, Virgin's Breast, Butter Fly)",
      "Optional combo upgrades: Jungle Canyoning, Ziplining & Waterfall Abseiling",
      "Full UIAA-certified safety gear: Helmets, high-buoyancy life vests & safety kayakers",
      "Body surfing and flat-water river swim at the finish",
      "Traditional Sri Lankan buffet lunch & fresh king coconut by the riverbank"
    ],
    included: ["Professional raft guide & safety crew", "All technical safety equipment", "Buffet lunch & fresh king coconut", "Changing room access & locker storage", "Free cancellation up to 24h before experience"],
    toBring: ["Quick-dry clothes or swimwear", "Water shoes or secure sandals", "Sunscreen & change of dry clothes", "Towel"],
    itinerary: [
      { time: "09:00 AM", title: "Safety Briefing & Equipment Fitting", desc: "Meet your guide at the base camp, fit helmets and life vests, and get a thorough safety briefing." },
      { time: "09:45 AM", title: "Launch at Kelani River", desc: "Enter the river for paddling drills before tackling the first set of rapids." },
      { time: "11:15 AM", title: "Flat Water Float & Body Surfing", desc: "Enjoy a calm float down the river and try body surfing in clear river pools." },
      { time: "12:00 PM", title: "Return to Camp & Buffet Lunch", desc: "Shower, change into dry clothes, and enjoy a traditional rice-and-curry feast." }
    ],
    gallery: [rafting, canyoning, camping]
  },
  {
    id: "jungle-river-canyoning",
    slug: "jungle-river-canyoning",
    title: "Rainforest Gorge Canyoning & Rock Slides",
    location: "Kitulgala Rainforest",
    category: "Jungle Canyoning",
    categoryId: "canyoning",
    destinationId: "kitulgala",
    image: canyoning,
    duration: "5 hours",
    difficulty: "Active",
    rating: 4.9,
    reviewsCount: 98,
    price: 89,
    oldPrice: 110,
    badge: "Top Experience",
    featured: true,
    groupSize: "2 - 6 People",
    overview: "Deep inside the Kitulgala jungle, scramble over ancient granite boulders, slide down smooth natural water slides, and leap from cliffs into crystal clear forest pools.",
    highlights: [
      "3 natural rock water slides formed over centuries",
      "Cliff jumps ranging from 3m to 9m into deep rock pools",
      "Stream walking and gorge scrambling in primary rainforest",
      "Expert canyoning instructors guiding every move"
    ],
    included: ["Full canyoning gear & helmet", "Certified canyoning guides", "Energy snacks & fresh tropical fruits", "Photo & video package"],
    toBring: ["Grippy wet shoes", "Boardshorts or rash guard", "Waterproof camera/GoPro", "Dry clothes for afterwards"],
    itinerary: [
      { time: "08:30 AM", title: "Jungle Trek to Canyon Entry", desc: "Hike through lush rubber plantations and tea estates to reach the gorge entrance." },
      { time: "09:30 AM", title: "Canyon Descent & Slides", desc: "Navigate natural slides, jumps, and scramble through hidden waterfall pools." },
      { time: "12:30 PM", title: "Jungle Refreshment Break", desc: "Rehydrate with fresh king coconuts and snacks." }
    ],
    gallery: [canyoning, abseiling, rafting]
  },
  {
    id: "waterfall-abseiling-experience",
    slug: "waterfall-abseiling-experience",
    title: "Kataran-Oya Waterfall Abseiling",
    location: "Kitulgala, Sabaragamuwa",
    category: "Waterfall Abseiling",
    categoryId: "waterfall-abseiling",
    destinationId: "kitulgala",
    image: abseiling,
    duration: "4 hours",
    difficulty: "Challenging",
    rating: 4.8,
    reviewsCount: 76,
    price: 95,
    oldPrice: 120,
    badge: "High Thrill",
    featured: true,
    groupSize: "2 - 6 People",
    overview: "Harness up and rappel down a roaring 105ft waterfall into a pristine jungle pool. Feel the spray of pure mountain water as you conquer your fears with dual-line safety backup.",
    highlights: [
      "105ft waterfall rappel descent down Kataran-Oya falls",
      "Dual safety system with secondary belay controller",
      "Includes practice run on dry rock before the waterfall",
      "Stunning views of the Kitulgala forest canopy"
    ],
    included: ["UIAA-certified climbing harness & helmet", "Professional climbing instructors", "Safety ropes & hardware", "Refreshments & king coconut"],
    toBring: ["Sturdy wet shoes with tread", "Sportswear or rash guard", "Towel and dry change of clothes"],
    itinerary: [
      { time: "08:00 AM", title: "Base Camp Gear Up", desc: "Inspection of equipment and harness fitting." },
      { time: "09:00 AM", title: "Practice Descent", desc: "Dry wall practice to master friction control and foot placement." },
      { time: "10:15 AM", title: "Waterfall Abseil", desc: "Controlled descent down the face of the waterfall into the pool below." }
    ],
    gallery: [abseiling, canyoning, trekking]
  },
  {
    id: "sinharaja-rainforest-expedition",
    slug: "sinharaja-rainforest-expedition",
    title: "Sinharaja Virgin Rainforest Trekking Expedition",
    location: "Sinharaja UNESCO Reserve",
    category: "Rainforest Trekking",
    categoryId: "jungle-trekking",
    destinationId: "sinharaja",
    image: trekking,
    duration: "Full day",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 115,
    price: 75,
    oldPrice: 95,
    badge: "UNESCO Heritage",
    featured: true,
    groupSize: "2 - 10 People",
    overview: "Step into Sri Lanka's last viable area of primary tropical rainforest. Spot rare endemic birds, purple-faced langurs, tree frogs, and swim beneath hidden jungle cascades.",
    highlights: [
      "Guided by certified wildlife naturalist trackers",
      "Spot mixed-species bird feeding flocks (Sri Lanka Blue Magpie, Red-faced Malkoha)",
      "Swim in natural forest rock pools at Kekuna Ella waterfall",
      "Leech socks and eco-trekking kit provided"
    ],
    included: ["Forest Reserve permits & ticket entry", "Senior wildlife naturalist guide", "Leech socks & repellent", "Packed picnic lunch & water"],
    toBring: ["Light long pants & breathable shirt", "Trekking boots or sturdy sneakers", "Binoculars & camera", "Rain jacket"],
    itinerary: [
      { time: "07:30 AM", title: "Park Entrance & Briefing", desc: "Enter Kudawa gate and meet your resident naturalist." },
      { time: "08:00 AM", title: "Canopy & Birding Trail", desc: "Walk through primary canopy observing endemic flora and fauna." },
      { time: "12:30 PM", title: "Waterfall Swim & Picnic", desc: "Relax by Kekuna Ella falls and enjoy packed organic lunch." }
    ],
    gallery: [trekking, highlands, camping]
  },
  {
    id: "kitulgala-riverside-glamping",
    slug: "kitulgala-riverside-glamping",
    title: "Riverside Wilderness Camping & Night Safari",
    location: "Kitulgala Riverbank",
    category: "Camping & Nature",
    categoryId: "camping-nature",
    destinationId: "kitulgala",
    image: camping,
    duration: "2 days / 1 night",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 88,
    price: 145,
    oldPrice: 175,
    badge: "Glamping Special",
    featured: false,
    groupSize: "2 - 12 People",
    overview: "Sleep under the stars in comfortable safari-style tents right on the riverbank. Enjoy lantern-lit night barbecues, nocturnal wildlife walks, and morning river kayaking.",
    highlights: [
      "Luxury safari tents with cozy beds & clean bedding",
      "BBQ dinner around a roaring campfire",
      "Nocturnal rainforest walk to spot flying squirrels & owls",
      "Sunrise kayak session on the tranquil river"
    ],
    included: ["Overnight safari tent stay", "BBQ dinner & cooked breakfast", "Night walk guide", "Kayaking gear & instruction"],
    toBring: ["Warm fleece for evening", "Headlamp or flashlight", "Personal toiletries", "Swimsuit"],
    itinerary: [
      { time: "04:00 PM (Day 1)", title: "Campsite Check-in", desc: "Welcome king coconut and settle into your tent by the river." },
      { time: "07:30 PM (Day 1)", title: "Campfire & BBQ", desc: "Enjoy grilled meats, baked potatoes, and Sri Lanka curries under the stars." },
      { time: "07:00 AM (Day 2)", title: "Sunrise Kayak & Breakfast", desc: "Paddle through morning mist followed by fresh tropical breakfast." }
    ],
    gallery: [camping, rafting, canyoning]
  },
  {
    id: "knuckles-cloud-forest-trek",
    slug: "knuckles-cloud-forest-trek",
    title: "Knuckles Range Cloud Forest & Hidden Waterfall Hike",
    location: "Knuckles Range, Kandy",
    category: "Rainforest Trekking",
    categoryId: "jungle-trekking",
    destinationId: "knuckles",
    image: highlands,
    duration: "Full day",
    difficulty: "Challenging",
    rating: 4.9,
    reviewsCount: 64,
    price: 95,
    oldPrice: 115,
    badge: "High Mountain",
    featured: false,
    groupSize: "2 - 8 People",
    overview: "Hike through mist-veiled cloud forests, across steep mountain ridges to Mini World's End drop, and cool off in secluded mountain waterfall pools.",
    highlights: [
      "Panoramas from Mini World's End sheer cliff edge",
      "Traverse 3 distinct microclimatic forest zones",
      "Visit Meemure isolated mountain village culture",
      "Mountain stream bathing in crystal waters"
    ],
    included: ["Knuckles sanctuary permit fees", "Expert mountain guide", "Snack pack & trail lunch", "Roundtrip transfer from Kandy"],
    toBring: ["Sturdy hiking boots", "Rain layer & warm windbreaker", "Hydration pack / water bottles", "Sun hat"],
    itinerary: [
      { time: "06:00 AM", title: "Kandy Hotel Pickup", desc: "Drive into the Knuckles foothills as sunrise lights up the peaks." },
      { time: "08:00 AM", title: "Trailhead Trek", desc: "Begin ascent through pine forest into pristine cloud canopy." },
      { time: "01:00 PM", title: "Cliff Viewpoint & Lunch", desc: "Eat lunch at Mini World's End overlooking 1,000m sheer drop." }
    ],
    gallery: [highlands, trekking, camping]
  },
  {
    id: "sigiriya-rock-pidurangala-heritage-tour",
    slug: "sigiriya-rock-pidurangala-heritage-tour",
    title: "Sigiriya Lion Rock Fortress & Pidurangala Sunrise Expedition",
    location: "Sigiriya, Central Province",
    category: "Safari & Heritage",
    categoryId: "cultural-safari",
    destinationId: "sigiriya",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop",
    duration: "Full day",
    difficulty: "Moderate",
    rating: 4.9,
    reviewsCount: 184,
    price: 110,
    oldPrice: 135,
    badge: "UNESCO Classic",
    featured: true,
    groupSize: "1 - 12 People",
    overview: "Experience Sri Lanka's 8th wonder of the world. Climb the ancient 5th-century sky palace of Sigiriya, admire 1,500-year-old frescoes, and catch a breathtaking sunrise over the jungle from Pidurangala rock.",
    highlights: [
      "Climb 1,200 steps to King Kasyapa's summit palace",
      "View celestial maiden frescoes & the mirror wall",
      "Sunrise climb up Pidurangala for unobstructed views of Sigiriya",
      "Traditional bullock cart & lake boat village excursion"
    ],
    included: ["Sigiriya UNESCO entry ticket", "Pidurangala admission ticket", "Private AC transport with English guide", "Traditional village lunch"],
    toBring: ["Walking shoes with good grip", "Sun protection & hat", "Camera with extra batteries", "Modest temple attire (covered shoulders/knees)"],
    itinerary: [
      { time: "05:00 AM", title: "Pidurangala Sunrise Hike", desc: "Ascend Pidurangala rock in cool morning breeze to watch dawn break over Sigiriya." },
      { time: "08:30 AM", title: "Sigiriya Rock Citadel Tour", desc: "Guided exploration of water gardens, frescoes, lion paws, and summit palace." },
      { time: "01:00 PM", title: "Village Rice & Curry Feast", desc: "Catamaran ride across jungle lake followed by authentic woodfire lunch." }
    ],
    gallery: ["https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop", highlands, trekking]
  },
  {
    id: "yala-leopard-safari-expedition",
    slug: "yala-leopard-safari-expedition",
    title: "Yala National Park 4x4 Leopard & Wildlife Safari",
    location: "Yala, Southern Coast",
    category: "Safari & Heritage",
    categoryId: "cultural-safari",
    destinationId: "yala",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    duration: "Full day",
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 210,
    price: 125,
    oldPrice: 150,
    badge: "Wild Leopard",
    featured: true,
    groupSize: "2 - 6 People",
    overview: "Embark on a high-spec 4x4 game drive through Yala National Park, holding the highest density of wild leopards in the world. Spot wild elephants, sloth bears, mugger crocodiles, and colorful peacocks.",
    highlights: [
      "Custom modified safari 4x4 jeep with open top for panoramic photos",
      "Expert wildlife tracker guiding leopard & bear hotspots",
      "Explore Block 1 and coastal Palatupana lagoons",
      "All park permits, entry fees, and tracker charges included"
    ],
    included: ["Private 4x4 Jeep with driver & tracker", "Yala Park entry tickets & taxes", "Picnic breakfast & cold drinks", "Binoculars for guest use"],
    toBring: ["Earth-toned clothing", "Sunglasses & hat", "Camera with zoom lens", "Dust mask / scarf"],
    itinerary: [
      { time: "05:30 AM", title: "Park Gate Entrance", desc: "Enter Yala as the animals emerge for early morning feeding." },
      { time: "09:30 AM", title: "Lagoon Picnic Breakfast", desc: "Enjoy breakfast overlooking coastal lagoons populated by flamingos." },
      { time: "03:00 PM", title: "Afternoon Game Drive", desc: "Track leopards along rock outcrops as sun lowers." }
    ],
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", camping, highlands]
  },
  {
    id: "ella-nine-arch-train-hike",
    slug: "ella-nine-arch-train-hike",
    title: "Ella Nine Arch Bridge & Little Adam's Peak Hiking Tour",
    location: "Ella, Central Highlands",
    category: "Rainforest Trekking",
    categoryId: "jungle-trekking",
    destinationId: "ella",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop",
    duration: "1 Day",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 152,
    price: 85,
    oldPrice: 105,
    badge: "Highland Favorite",
    featured: false,
    groupSize: "1 - 8 People",
    overview: "Immerse yourself in Ella's cool mountain air. Walk across the famous Nine Arch Demodara Railway Bridge, hike up Little Adam's Peak for tea valley vistas, and refresh at Ravana Falls.",
    highlights: [
      "Watch the scenic blue mountain train cross Nine Arch Bridge",
      "Panoramic views of Ella Gap from Little Adam's Peak summit",
      "Visit historic Dambatenne tea factory & tea plucking experience",
      "Cool down at Ravana Waterfall pool"
    ],
    included: ["Local guide & walking host", "Tea plantation entry & tasting", "Fresh fruit smoothie break", "All local tuk-tuk transfers"],
    toBring: ["Light trainers or hiking shoes", "Sunscreen", "Camera", "Light jacket"],
    itinerary: [
      { time: "08:00 AM", title: "Nine Arch Bridge Walk", desc: "Walk down through tea bushes to catch the morning train crossing." },
      { time: "10:30 AM", title: "Little Adam's Peak Hike", desc: "Easy 45-minute climb to 360-degree viewpoint overlooking Ella Gap." },
      { time: "02:00 PM", title: "Tea Tasting & Ravana Falls", desc: "Learn tea grading process followed by waterfall view." }
    ],
    gallery: ["https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop", highlands, trekking]
  },
  {
    id: "galle-fort-coastal-mangrove-safari",
    slug: "galle-fort-coastal-mangrove-safari",
    title: "Galle Dutch Fort Ramparts & Madu River Mangrove Cruise",
    location: "Galle & South Coast",
    category: "Safari & Heritage",
    categoryId: "cultural-safari",
    destinationId: "galle",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    duration: "Full day",
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 94,
    price: 80,
    oldPrice: 95,
    badge: "Coastal Heritage",
    featured: false,
    groupSize: "1 - 10 People",
    overview: "Wander cobblestone streets inside the 17th-century UNESCO Galle Dutch Fort, witness iconic stilt fishermen, and take a motorboat safari through Madu River mangrove tunnels.",
    highlights: [
      "Guided walking tour of Galle Fort lighthouse, ramparts & Dutch quarter",
      "Madu River motorboat safari through 64 mangrove islands",
      "Visit Cinnamon Island & traditional peeling demonstration",
      "See iconic Sri Lankan stilt fishermen along Koggala shore"
    ],
    included: ["Private AC car transfer", "Madu river boat hire & captain", "Fort heritage guide", "Cinnamon island entry"],
    toBring: ["Sunglasses & wide brim hat", "Comfortable walking shoes", "Camera"],
    itinerary: [
      { time: "09:00 AM", title: "Madu River Safari", desc: "Cruise through dense mangrove natural tunnels and visit cinnamon growers." },
      { time: "12:00 PM", title: "Stilt Fishermen Viewing", desc: "Stop at Koggala coastline to photograph fishermen perched on wooden stilts." },
      { time: "02:00 PM", title: "Galle Fort Exploration", desc: "Walk historical ramparts, visit lighthouse, and browse heritage boutiques." }
    ],
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", rafting, canyoning]
  }
];

export const destinations: Destination[] = [
  {
    id: "kitulgala",
    name: "Kitulgala",
    district: "Kegalle",
    region: "Sabragamuwa Rainforest",
    description: "Wild rivers and deep rainforest at Sri Lanka’s adventure capital.",
    overview: "Kitulgala is the premier outdoor adventure sanctuary of Sri Lanka, situated along the rushing Kelani River. Famous as the film location for 'The Bridge on the River Kwai', it is surrounded by wet-zone rainforests ideal for white-water rafting, canyoning, and waterfall rappelling.",
    toursCount: "12 Adventure Tours",
    image: rafting,
    bestTimeToVisit: "Year-round (Best: October to April)",
    highlights: [
      "Grade 3 & 4 White Water Rafting on Kelani River",
      "Natural rock water slides & canyon jumping",
      "Waterfall abseiling down 100ft cascades",
      "Belilena prehistoric cave archaeological site"
    ],
    gallery: [rafting, canyoning, abseiling, camping],
    size: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    district: "Matale",
    region: "Cultural Triangle",
    description: "Ancient 5th-century sky fortress atop a 200m monolithic rock.",
    overview: "Sigiriya (Lion Rock) is a UNESCO World Heritage site featuring King Kasyapa's 5th-century palace complex, ancient water gardens, painted frescoes, and sweeping 360-degree views over central Sri Lankan jungle canopy.",
    toursCount: "18 Heritage Tours",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop",
    bestTimeToVisit: "December to April",
    highlights: [
      "Ascend 1,200 steps through Lion Paw gate to rock summit",
      "View ancient frescoes of celestial maidens",
      "Pidurangala Rock sunrise hike",
      "Minneriya National Park elephant gathering safaris"
    ],
    gallery: ["https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop", highlands, trekking],
    size: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "ella",
    name: "Ella",
    district: "Badulla",
    region: "Central Highlands",
    description: "Cloud forests, mountain gaps, Nine Arch Bridge, and tea estates.",
    overview: "Ella is a high-altitude mountain haven surrounded by misty valleys, dramatic cliff precipices, green tea plantations, and iconic rail bridges. It offers some of the best trekking trails in Asia.",
    toursCount: "22 Highland Tours",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop",
    bestTimeToVisit: "January to March",
    highlights: [
      "Nine Arch Demodara Railway Bridge train spotting",
      "Little Adam's Peak & Ella Rock summit treks",
      "Diyaluma & Ravana waterfall pool swims",
      "Scenic Kandy-to-Ella blue train journey"
    ],
    gallery: ["https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop", highlands, trekking],
    size: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "sinharaja",
    name: "Sinharaja",
    district: "Ratnapura",
    region: "Lowland Rainforest",
    description: "A living UNESCO virgin tropical rainforest alive with endemic species.",
    overview: "Sinharaja is Sri Lanka's last remaining primary tropical rainforest. Recognized as a UNESCO Biosphere Reserve, it harbors over 60% of Sri Lanka's endemic trees and rare bird species.",
    toursCount: "10 Eco Expeditions",
    image: trekking,
    bestTimeToVisit: "December to April",
    highlights: [
      "Deep canopy birding for Sri Lanka Blue Magpie",
      "Kekuna Ella waterfall rock pool bathing",
      "Naturalist-guided eco tracking trails",
      "Spot purple-faced langurs and endemic orchids"
    ],
    gallery: [trekking, canyoning, camping],
    size: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    id: "yala",
    name: "Yala",
    district: "Hambantota",
    region: "South Coast Wildlands",
    description: "Sri Lanka's premier wildlife national park with wild leopards and elephants.",
    overview: "Yala National Park stretches across coastal drylands, forest glades, and brackish lagoons. It holds the world's highest density of Sri Lankan leopards alongside wild elephant herds and sloth bears.",
    toursCount: "20 Wildlife Safaris",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    bestTimeToVisit: "February to July",
    highlights: [
      "4x4 Leopard tracking in Block 1",
      "Wild elephant sightings around lakes",
      "Coastal lagoon flamingo & crocodile safari",
      "Luxury wilderness tented camping"
    ],
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", camping, highlands],
    size: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "galle",
    name: "Galle Fort",
    district: "Galle",
    region: "Southern Coast",
    description: "UNESCO 17th-century Dutch colonial fort city overlooking Indian Ocean.",
    overview: "Galle Fort combines centuries of Dutch colonial heritage with vibrant ocean ramparts, cobblestone shopping streets, lighthouse vistas, and nearby stilt fishermen beaches.",
    toursCount: "25 Coastal Tours",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    bestTimeToVisit: "November to April",
    highlights: [
      "Sunset walks along Dutch Fort ramparts",
      "Madu River mangrove motorboat safari",
      "Stilt fishermen photography at Koggala",
      "Unawatuna & Jungle Beach sea snorkeling"
    ],
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", rafting, canyoning],
    size: "col-span-1 md:col-span-1 lg:col-span-1"
  }
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Maya Thompson",
    country: "United Kingdom",
    initials: "MT",
    trip: "White Water Rafting Expedition",
    rating: 5,
    comment: "The river rapids were exhilarating! Our guide was an absolute professional, making us feel completely safe while giving us the ride of our lives. The local buffet lunch afterwards was the best meal we had in Sri Lanka!",
    date: "February 2026"
  },
  {
    id: "rev-2",
    name: "Julien Moreau",
    country: "France",
    initials: "JM",
    trip: "Kataran-Oya Waterfall Abseiling",
    rating: 5,
    comment: "Stepping over the edge of a 100ft waterfall was terrifying at first, but the equipment and dual belay line setup gave total confidence. Unforgettable highlight of our trip!",
    date: "January 2026"
  },
  {
    id: "rev-3",
    name: "Anika Perera",
    country: "Australia",
    initials: "AP",
    trip: "Sinharaja Rainforest Expedition",
    rating: 5,
    comment: "Thoughtful, intimate, and beautifully paced. Our naturalist tracker helped us spot the Blue Magpie and tree frogs that we never could have found on our own. 10/10!",
    date: "January 2026"
  },
  {
    id: "rev-4",
    name: "David & Sarah Miller",
    country: "Germany",
    initials: "DS",
    trip: "Riverside Wilderness Camping",
    rating: 5,
    comment: "Glamping right next to the Kelani River with a campfire, BBQ, and nighttime wildlife walk. Waking up to rainforest morning mist was pure magic.",
    date: "December 2025"
  }
];
