// ─── MILESTONES & GAMES ─────────────────────────────────────────────────────
// The six-chapter journey. Game-level piece content lives with each game component;
// this file is the narrative + progression structure (and what the summaries read).

export const MILESTONES = [
  {
    id: "first-things",
    n: 1,
    title: "The First Things",
    place: "Home & Playground",
    location: "A residential society · late 1990s energy",
    age: "5",
    art: "playground",
    sign: "SECTOR 7 PARK",
    arrival:
      "A small pin drops on an ordinary afternoon. A girl with a backpack stands up, and a single red balloon finds her wrist.",
    intro:
      "Every journey starts with a backpack and one balloon. This one starts with seven stones and a rubber ball.",
    games: [
      {
        id: "pithoo",
        key: "pithoo",
        title: "Pithoo",
        tagline: "Seven stones. One ball. Knock them down.",
        how: "Drag anywhere to aim the arrow — pull further for more force. Release to throw. One good hit brings the tower down.",
        skills: ["teamwork", "coordination", "initiative"],
        after:
          "Nobody keeps score at Pithoo for long. But teamwork, coordination and the nerve to go first — those stick.",
      },
    ],
    skills: ["teamwork", "coordination", "initiative"],
    evidence: [],
    summaryLine:
      "Some of the earliest foundations of teamwork, communication and initiative didn't come from a classroom. They came from play.",
  },
  {
    id: "things-we-learn",
    n: 2,
    title: "The Things We Learn",
    place: "School · The Library",
    location: "School No. 23, Library Wing",
    age: "13",
    art: "school",
    sign: "SCHOOL · THIS WAY",
    arrival:
      "Corridors, noticeboards, the smell of chalk. The library door is open a little wider than usual today.",
    intro:
      "Between the shelves, six books refuse to stay quiet. Collect them all — the exit only opens for a full bag.",
    games: [
      {
        id: "maze",
        key: "maze",
        title: "The Library Maze",
        tagline: "Six books are hiding between the shelves.",
        how: "Tap any tile — she'll walk there herself. Collect all six books to open the exit.",
        skills: [
          "curiosity",
          "observation",
          "communication",
          "creativity",
          "public-speaking",
          "structured-thinking",
        ],
        after:
          "Six books into the backpack. None of them had instructions for real life — they were the instructions.",
      },
    ],
    skills: [
      "curiosity",
      "observation",
      "communication",
      "creativity",
      "public-speaking",
      "structured-thinking",
    ],
    evidence: [],
    summaryLine:
      "The library taught the things marks can't measure: curiosity, observation, communication, creativity — and the courage to speak up.",
  },
  {
    id: "art-of-observing",
    n: 3,
    title: "The Art of Observing",
    place: "Undergraduate · Psychology",
    location: "Vivekananda College, University of Delhi",
    age: "18",
    art: "college",
    sign: "VIVEKANANDA COLLEGE",
    arrival:
      "Red brick, summer light, corridors that echo. In the psychology department, a room is waiting to be read like a case study.",
    intro: "People leave traces everywhere. In this room, six of them matter.",
    games: [
      {
        id: "observation",
        key: "observation",
        title: "The Observation Room",
        tagline: "A psychology student's room, in five clues.",
        how: "Read a clue, then tap the object it describes. Found objects can be connected — some things belong together.",
        skills: [
          "research",
          "observation",
          "empathy",
          "perspective-taking",
          "analytical-thinking",
          "consumer-understanding",
        ],
        after:
          "The dissertation took six months, eighty pages and a semiotic lens to Instagram. The room was just practice.",
      },
      {
        id: "find-audience",
        key: "find-audience",
        title: "Find Your Audience",
        tagline: "Delhi summer. Campus gates. Sell the stay.",
        how: "Watch the students crossing the campus. Tap the ones carrying luggage — outstation students need a room. Then choose how to pitch.",
        skills: [
          "initiative",
          "communication",
          "consumer-understanding",
          "resilience",
        ],
        after:
          "Scanned campuses, read prospects at a glance, pitched, and converted. Marketing, it turns out, starts on foot.",
      },
    ],
    skills: [
      "research",
      "observation",
      "empathy",
      "perspective-taking",
      "analytical-thinking",
      "consumer-understanding",
      "initiative",
      "communication",
      "resilience",
    ],
    evidence: ["dissertation", "coping-paper", "du-internship"],
    summaryLine:
      "Four years of psychology trained the same muscle marketing needs: the ability to watch people until they make sense.",
  },
  {
    id: "business-of-becoming",
    n: 4,
    title: "The Business of Becoming",
    place: "Postgraduate · IMT Ghaziabad",
    location: "Institute of Management Technology, Ghaziabad",
    age: "22",
    art: "mba",
    sign: "IMT GHAZIABAD",
    arrival:
      "White buildings, glass, case competitions in the air. The backpack is heavier now — and she carries it like she means it.",
    intro:
      "Two years, many tables: a business to assemble, a home to build on a budget, and a product launch to run.",
    games: [
      {
        id: "build-business",
        key: "build-business",
        title: "Build the Business",
        tagline: "A business is just pieces that agree with each other.",
        how: "Tap a piece from the table, then tap its right slot on the board. Connect consumer to communication — the whole chain.",
        skills: [
          "strategic-thinking",
          "commercial-awareness",
          "marketing-fundamentals",
          "problem-solving",
          "decision-making",
        ],
        after:
          "Consumer, need, product, price, positioning, distribution, communication — seven pieces that only work as one.",
      },
      {
        id: "independent-life",
        key: "independent-life",
        title: "The Independent Life",
        tagline: "First home. Finite budget. Choose well.",
        how: "Pick things for the flat within the budget. Rest, work, cook, breathe — every zone needs something.",
        skills: [
          "independence",
          "adaptability",
          "prioritisation",
          "resource-management",
        ],
        after:
          "Her own place, her own budget, her own decisions. Prioritisation is a life skill before it's a business one.",
      },
      {
        id: "launch-board",
        key: "launch-board",
        title: "The Product Launch Board",
        tagline: "CandyMan Fantastik needs a launch. Build it in order.",
        how: "Tap a stage card, then tap its numbered slot. Walk the launch from analysis to sales projections.",
        skills: [
          "innovation",
          "gtm-planning",
          "data-led-analysis",
          "consumer-understanding",
        ],
        after:
          "At ITC, the launch plan for CandyMan Fantastik covered product, packaging, pricing, promotion, pilot markets, distribution and sales projections — after 36 consumer immersions.",
      },
    ],
    skills: [
      "strategic-thinking",
      "commercial-awareness",
      "marketing-fundamentals",
      "problem-solving",
      "decision-making",
      "independence",
      "adaptability",
      "prioritisation",
      "resource-management",
      "innovation",
      "gtm-planning",
      "data-led-analysis",
    ],
    evidence: ["itc-candyman", "campus-leadership", "infogain"],
    summaryLine:
      "PGDM, Marketing specialisation. A student committee's stage, a wafer chocolate launch, a careers page rebuilt — the toolkit got real.",
  },
  {
    id: "ground-game",
    n: 5,
    title: "Learning the Ground Game",
    place: "Emami · Kolkata",
    location: "Emami Limited, Kolkata",
    age: "24–25",
    art: "kolkata",
    sign: "KOLKATA",
    arrival:
      "A small flight east. Warm, dusty, utterly alive — Kolkata teaches faster than any classroom. Four stints, four educations.",
    intro:
      "First a sales stint, then e-commerce, then a brand stint. Every one of them left something in the backpack.",
    games: [
      {
        id: "last-mile",
        key: "last-mile",
        title: "The Last-Mile Delivery",
        tagline: "Ride pillion. Aim. Deliver.",
        how: "Drag from the box to set the arc, release to deliver it to the glowing shop. Four deliveries and the day is done.",
        skills: [
          "negotiation",
          "market-understanding",
          "retailer-relationships",
          "ground-execution",
          "resilience",
        ],
        after:
          "₹14 Cr of General Trade across 10,000+ outlets — and a grassroots education in strangers, negotiation and shelf reality.",
      },
      {
        id: "perfect-shelf",
        key: "perfect-shelf",
        title: "The Perfect Shelf",
        tagline: "The shelf sells when you're not there.",
        how: "Tap the items on the shopping list to fill the cart, then place them on the lit shelf slots. Eye level wins.",
        skills: [
          "assortment-planning",
          "merchandising",
          "retail-execution",
          "analytical-thinking",
        ],
        after:
          "Assortment, availability, visibility — Modern Trade and e-commerce growth levers, driven through data-led analysis, pricing and visibility optimisation.",
      },
      {
        id: "spot-difference",
        key: "spot-difference",
        title: "The Digital Shelf",
        tagline: "Something is wrong with this listing. Six things.",
        how: "Tap the six errors on the product page — wrong pack, missing price, anything a shopper would trip over.",
        skills: [
          "ecommerce-ops",
          "digital-merchandising",
          "content-optimisation",
          "platform-management",
        ],
        after:
          "Sales and marketing for a ₹46 Cr+ e-commerce account, 61% overall growth, 2x revenue in three brands — shelf by digital shelf.",
      },
      {
        id: "build-activation",
        key: "build-activation",
        title: "The Brand Activation Lab",
        tagline: "Build the community. Build the clinic. Build the journey.",
        how: "Tap the pieces onto the board — community on the left, on-ground on the right. Connect the journey from first touch to trial.",
        skills: [
          "brand-communication",
          "community-building",
          "campaign-planning",
          "digital-activation",
          "on-ground-activation",
          "execution",
        ],
        after:
          "A Facebook community for physiotherapists with a year-long calendar — and an activation across clinics and gyms that linked trials to sales uplift.",
      },
    ],
    skills: [
      "negotiation",
      "market-understanding",
      "retailer-relationships",
      "ground-execution",
      "resilience",
      "assortment-planning",
      "merchandising",
      "retail-execution",
      "analytical-thinking",
      "ecommerce-ops",
      "digital-merchandising",
      "content-optimisation",
      "platform-management",
      "brand-communication",
      "community-building",
      "campaign-planning",
      "digital-activation",
      "on-ground-activation",
      "execution",
    ],
    evidence: [
      "emami-sales",
      "emami-ecommerce",
      "flipkart-performance",
      "emami-activation",
    ],
    summaryLine:
      "Kolkata taught the ground game: ₹14 Cr GT across 10,000+ outlets, a ₹46 Cr+ e-commerce account, 7x ROI on Flipkart — and a community built from scratch.",
  },
  {
    id: "making-things-move",
    n: 6,
    title: "Making Things Move",
    place: "Danone · Mumbai",
    location: "Danone, Mumbai",
    age: "27",
    art: "mumbai",
    sign: "MUMBAI",
    arrival:
      "A short flight west. Mumbai doesn't slow down for anyone — and neither does she. Five missions, all of them hers.",
    intro:
      "Packaging, chatbots, campaigns, accounts and one very cross-functional launch. Ownership, finally, spelled in full.",
    games: [
      {
        id: "pack-studio",
        key: "pack-studio",
        title: "The Packaging Studio",
        tagline: "A blank pack. A hero proposition. Build it.",
        how: "Tap each layer to add it to the pack — insight, proposition, benefits, claims, design, go-to-market.",
        skills: [
          "consumer-understanding",
          "brand-strategy",
          "proposition-development",
          "innovation",
          "gtm-planning",
        ],
        after:
          "Value propositions tested with 20 users across 4 cities. Category research, agency teams, print proofing, GTM — the pack had to earn its place.",
      },
      {
        id: "chatbot-journey",
        key: "chatbot-journey",
        title: "The 28-Day Journey",
        tagline: "One scan should start a journey, not a transaction.",
        how: "Tap the nodes in order to connect the journey: QR → chatbot → diet plan → 28 days → follow-up.",
        skills: [
          "customer-journey",
          "personalisation",
          "consumer-engagement",
          "digital-activation",
        ],
        after:
          "A QR-triggered chatbot generating a personalised diet plan and a 28-day health and wellness journey — conversational architecture, database, logic and creatives, designed end to end.",
      },
      {
        id: "campaign-room",
        key: "campaign-room",
        title: "The Campaign Control Room",
        tagline: "Apollo 24x7 is live. Tune the machine.",
        how: "Drag the sliders to split the budget between budget breadth, keywords and creative. Watch the ROAS meter — find the sweet spot.",
        skills: [
          "performance-marketing",
          "media-optimisation",
          "roi-optimisation",
          "decision-making",
        ],
        after:
          "ROAS 9.81. 1.7 lakh ad impressions, 3,300+ clicks — budget, keyword and creative enhancements, aligned to brand strategy.",
      },
      {
        id: "biz-room",
        key: "biz-room",
        title: "The Business Control Room",
        tagline: "Seven accounts. Match the brand to the platform.",
        how: "Tap a brand chip, then tap the platform where it belongs. Fill the board and watch the NSV climb.",
        skills: [
          "account-strategy",
          "commercial-planning",
          "business-growth",
          "portfolio-management",
          "data-led-analysis",
        ],
        after:
          "Seven e-commerce, quick-commerce and e-pharmacy accounts — Blinkit, Flipkart, Tata 1mg and others. ~₹200 Cr annual NSV, e-pharma scaled 2x in 11 months.",
      },
      {
        id: "connect-dots",
        key: "connect-dots",
        title: "Connect the Dots",
        tagline: "A launch needs every team in the room.",
        how: "Tap a task, then tap the team that owns it. When all six tasks find their owners, the launch ships.",
        skills: [
          "stakeholder-management",
          "cross-functional",
          "ownership",
          "project-management",
          "execution",
        ],
        after:
          "Joint business planning with platform and internal teams — seamless go-to-market plans, maximal campaign impact.",
      },
    ],
    skills: [
      "consumer-understanding",
      "brand-strategy",
      "proposition-development",
      "innovation",
      "gtm-planning",
      "customer-journey",
      "personalisation",
      "consumer-engagement",
      "digital-activation",
      "performance-marketing",
      "media-optimisation",
      "roi-optimisation",
      "decision-making",
      "account-strategy",
      "commercial-planning",
      "business-growth",
      "portfolio-management",
      "data-led-analysis",
      "stakeholder-management",
      "cross-functional",
      "ownership",
      "project-management",
      "execution",
    ],
    evidence: [
      "danone-packaging",
      "whatsapp-chatbot",
      "apollo-performance",
      "danone-accounts",
    ],
    summaryLine:
      "Brand and packaging innovation, a 28-day WhatsApp journey, ROAS 9.81, ~₹200 Cr NSV across seven accounts — and three awards along the way.",
  },
];

export const BOOKS = [
  {
    id: "b1",
    title: "The Art of Asking Questions",
    skill: "curiosity",
    hue: "#c74a3c",
  },
  {
    id: "b2",
    title: "The Observer's Handbook",
    skill: "observation",
    hue: "#2a7f79",
  },
  {
    id: "b3",
    title: "The Power of Words",
    skill: "communication",
    hue: "#e8a33d",
  },
  {
    id: "b4",
    title: "Ideas Without Instructions",
    skill: "creativity",
    hue: "#7b5ea7",
  },
  {
    id: "b5",
    title: "The Little Book of Speaking Up",
    skill: "public-speaking",
    hue: "#4a7fb5",
  },
  {
    id: "b6",
    title: "Connecting the Dots",
    skill: "structured-thinking",
    hue: "#5a9e6f",
  },
];
