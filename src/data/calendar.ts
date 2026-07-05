import { PillarKey } from "../brand";
import { BrandRevealProps } from "../templates/BrandReveal";
import { KineticListProps } from "../templates/KineticList";
import { MemeTextProps } from "../templates/MemeText";
import { PovFeaturesProps } from "../templates/PovFeatures";
import { BeforeAfterProps } from "../templates/BeforeAfter";
import { FestivalGreetingProps } from "../templates/FestivalGreeting";
import { QuizReelProps } from "../templates/QuizReel";
import { CountdownTeaseProps } from "../templates/CountdownTease";
import { CarouselProps } from "../templates/Carousel";
import { StatCardProps } from "../templates/StatCard";

export type TemplateId =
  | "BrandReveal"
  | "KineticList"
  | "MemeText"
  | "PovFeatures"
  | "BeforeAfter"
  | "FestivalGreeting"
  | "QuizReel"
  | "CountdownTease"
  | "Carousel"
  | "StatCard";

export type CalendarEntry = {
  day: number;
  date: string;
  pillar: PillarKey;
  platforms: string;
  title: string;
  language: "English" | "Nepali" | "Bilingual";
  template: TemplateId;
  /** "video" renders an mp4; "stills" renders one PNG per slide/frame. */
  output: "video" | "stills";
  props:
    | BrandRevealProps
    | KineticListProps
    | MemeTextProps
    | PovFeaturesProps
    | BeforeAfterProps
    | FestivalGreetingProps
    | QuizReelProps
    | CountdownTeaseProps
    | CarouselProps
    | StatCardProps;
  notes?: string;
};

const CTA = "Download KaamKotha";

export const CALENDAR: CalendarEntry[] = [
  // ─── Week 1: Brand Introduction ───────────────────────────────────────────
  {
    day: 1,
    date: "Mar 10",
    pillar: "promo",
    platforms: "TikTok · IG Reel · FB",
    title: "KaamKotha: Introduced — 30-sec brand reveal",
    language: "English",
    template: "BrandReveal",
    output: "video",
    props: {
      hook: "If you're Nepali and living in the UK — this is the app you've been waiting for.",
      highlightWords: ["Nepali", "UK", "app"],
      features: [
        { emoji: "🏠", label: "Verified rooms near you" },
        { emoji: "💼", label: "Jobs from trusted employers" },
        { emoji: "🛕", label: "Pujari, events & community" },
      ],
      cta: CTA,
    },
    notes: "Hook first 3 seconds. Logo slam at 5s. Pair with kinetic trending audio.",
  },
  {
    day: 2,
    date: "Mar 11",
    pillar: "education",
    platforms: "IG Carousel · FB",
    title: "5 Mistakes Nepalese Newcomers Make Finding Rooms in the UK",
    language: "Bilingual",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "ROOM HUNTING · कोठा खोज्दा",
        title: "5 Mistakes Nepalese Newcomers Make Finding Rooms in the UK",
        sub: "Save this before you send another deposit. 🇳🇵→🇬🇧",
      },
      slides: [
        {
          emoji: "💸",
          heading: "Paying a deposit before viewing",
          body: "कोठा नहेरी पैसा नपठाउनुहोस्। Never transfer money before you (or a friend) have seen the room in person or on a live video call.",
        },
        {
          emoji: "📄",
          heading: "No written agreement",
          body: "WhatsApp promises are not a tenancy. Ask for a written agreement — even for a room in a shared house.",
        },
        {
          emoji: "🔍",
          heading: "Not checking who actually holds the tenancy",
          body: "Subletting from someone who isn't allowed to sublet can get you evicted overnight. Ask who the landlord is.",
        },
        {
          emoji: "🧾",
          heading: "Ignoring bills & council tax",
          body: '"£500 all inclusive" — of what? Confirm gas, electric, WiFi and council tax in writing before moving in.',
        },
        {
          emoji: "⏰",
          heading: "Rushing because of pressure",
          body: '"Another person is coming to see it today" is the oldest trick. A genuine room will survive one day of thinking.',
        },
      ],
      outro: {
        title: "KaamKotha fixes this.",
        body: "Verified listings from the Nepali community across the UK — with real photos and real people.",
        cta: "Find rooms on KaamKotha",
      },
    },
    notes: "High-save target. Final slide = KK solves it.",
  },
  {
    day: 3,
    date: "Mar 12",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel",
    title: "When the WhatsApp group posts the same room listing for the 5th time 😭",
    language: "Nepali",
    template: "MemeText",
    output: "video",
    props: {
      setup: "जब WhatsApp group मा उही कोठाको listing पाँचौं पटक आउँछ…",
      setupHighlights: ["पाँचौं"],
      emoji: "😭",
      punchline: "भाइ हरु… अब त app छ नि। KaamKotha मा हेर्नुस् न।",
      cta: CTA,
    },
    notes: "Overlay a trending reaction audio in the editor. Relatable in-group humour.",
  },
  {
    day: 4,
    date: "Mar 13",
    pillar: "trending",
    platforms: "TikTok · IG Reel",
    title: "POV: You just found a room, a job, AND a pujari — all in one app",
    language: "English",
    template: "PovFeatures",
    output: "video",
    props: {
      povLine: "You just found a room, a job, AND a pujari — all in one app",
      highlights: ["room,", "job,", "pujari"],
      panels: [
        { emoji: "🏠", title: "Room in Aldershot", sub: "£520/mo · verified landlord" },
        { emoji: "💼", title: "Warehouse job", sub: "Full-time · starts Monday" },
        { emoji: "🛕", title: "Pujari for griha pravesh", sub: "Available this weekend" },
      ],
      cta: CTA,
    },
    notes: "Use trending POV audio. Panels mimic in-app cards.",
  },
  {
    day: 5,
    date: "Mar 14",
    pillar: "education",
    platforms: "IG Carousel · FB",
    title: "Your Rights as a Nepali Tenant in the UK — A Quick Guide",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "KNOW YOUR RIGHTS",
        title: "Your Rights as a Tenant in the UK — A Quick Guide",
        sub: "7 things every Nepali renter should know. Save this. 📌",
      },
      slides: [
        {
          emoji: "🛡️",
          heading: "Your deposit must be protected",
          body: "Landlords must place your deposit in a government-approved scheme (DPS, TDS or mydeposits) within 30 days.",
        },
        {
          emoji: "🚪",
          heading: "No one can evict you overnight",
          body: "Even lodgers are entitled to reasonable notice. Tenants need a formal legal process — changing the locks on you is illegal.",
        },
        {
          emoji: "🔧",
          heading: "Repairs are the landlord's job",
          body: "Heating, hot water, structure and damp are the landlord's responsibility — regardless of what the agreement says.",
        },
        {
          emoji: "📈",
          heading: "Rent can't rise mid-contract",
          body: "During a fixed term, rent can only increase if you agree or your contract allows it.",
        },
        {
          emoji: "🔑",
          heading: "Your landlord must give notice to enter",
          body: "At least 24 hours' written notice for inspections — it's your home, not theirs.",
        },
        {
          emoji: "🧯",
          heading: "Safety checks are mandatory",
          body: "Annual gas safety certificate, smoke alarms on every floor, and electrical safety report every 5 years.",
        },
        {
          emoji: "🆘",
          heading: "Free help exists",
          body: "Citizens Advice and Shelter give free, confidential tenancy help — in any language via interpreters.",
        },
      ],
      outro: {
        title: "Genuinely useful. No catch.",
        body: "KaamKotha exists so no Nepali in the UK gets taken advantage of. Share this with someone who just arrived.",
        cta: "Join the community",
      },
    },
    notes: "Peak save bait. No hard sell.",
  },
  {
    day: 6,
    date: "Mar 15",
    pillar: "virality",
    platforms: "TikTok · IG Reel · FB",
    title: "Tell me you're Nepali in the UK without telling me you're Nepali in the UK",
    language: "Bilingual",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "virality",
      title: "Tell me you're Nepali in the UK… without telling me 🇳🇵🇬🇧",
      titleHighlights: ["Nepali", "UK…"],
      items: [
        "Your suitcase is 23kg of gifts, 2kg of clothes ✈️",
        "\"Khana khayo?\" is your hello 🍚",
        "Rice cooker came before the bed came 🍛",
        "You know exactly which shop sells gundruk 🌿",
        "Sunday = momo party at somebody's flat 🥟",
      ],
      itemSeconds: 2.6,
      cta: "Add yours in the comments 👇",
    },
    notes: "Invite comments to add their own. Pin the best comment.",
  },
  {
    day: 7,
    date: "Mar 16",
    pillar: "promo",
    platforms: "FB Post · IG Post",
    title: "5,000+ Nepalese in the UK Already Trust KaamKotha. Are you in?",
    language: "English",
    template: "StatCard",
    output: "stills",
    props: {
      theme: "crimson",
      kicker: "The community is moving",
      headline: "5,000+ Nepalese in the UK already trust KaamKotha.",
      highlight: "5,000+",
      sub: "Rooms. Jobs. Businesses. Events. One app — built for our community.",
      cta: "Are you in?",
    },
    notes: "Bold stat graphic. Red BG, white text. FOMO mechanic.",
  },

  // ─── Week 2: Community & Culture ──────────────────────────────────────────
  {
    day: 8,
    date: "Mar 17",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel",
    title: "Things only Nepalese people in the UK actually understand 😂",
    language: "Nepali",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "entertainment",
      title: "यूकेका नेपालीहरूले मात्र बुझ्ने कुराहरू 😂",
      titleHighlights: [],
      items: [
        "\"UK मा त पैसा रुखमा फल्छ\" भन्ने आफन्त 🌳",
        "Aldershot लाई 'दोस्रो काठमाडौं' भन्नु 🏔️",
        "घरमा फोन गर्दा: \"यहाँ त घाम लाग्यो आज!\" ☀️",
        "Tesco मा चामलको भाउ हेरेर देश सम्झनु 🍚",
        "एउटै गाडीमा ६ जना — सबै आफन्तै पर्ने 🚗",
      ],
      itemSeconds: 2.8,
      cta: CTA,
    },
    notes: "Fast paced, trending audio. Numbered list video.",
  },
  {
    day: 9,
    date: "Mar 18",
    pillar: "education",
    platforms: "IG Carousel · FB",
    title: "How to Open a UK Bank Account as a New Nepali Arrival",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "MONEY BASICS",
        title: "How to Open a UK Bank Account as a New Arrival",
        sub: "No UK credit history? No problem. Here's the 2026 playbook.",
      },
      slides: [
        {
          emoji: "📱",
          heading: "Start with an app-based bank",
          body: "Monzo, Starling and Revolut open accounts in minutes with just your passport + BRP — no proof of address needed.",
        },
        {
          emoji: "🛂",
          heading: "Documents you need",
          body: "Passport, BRP/eVisa share code, and a UK phone number. That's it for digital banks.",
        },
        {
          emoji: "🏦",
          heading: "High-street banks come second",
          body: "Barclays, Lloyds and HSBC want proof of address — a tenancy agreement or employer letter usually works.",
        },
        {
          emoji: "💷",
          heading: "Get paid properly",
          body: "Never let an employer pay wages into someone else's account. Your salary → your account. Always.",
        },
        {
          emoji: "🌍",
          heading: "Sending money home",
          body: "Compare Wise, Remitly and IME rates before you send. Small % differences = thousands of rupees over a year.",
        },
        {
          emoji: "⚠️",
          heading: "Protect your account",
          body: "Never rent out your bank account or accept 'transfer jobs'. Money muling is a crime that ends visas.",
        },
      ],
      outro: {
        title: "New to the UK?",
        body: "KaamKotha's guides section covers banking, NI numbers, GP registration and more — in Nepali and English.",
        cta: "Get the app",
      },
    },
    notes: "Monzo, Starling, high-street options. No fluff.",
  },
  {
    day: 10,
    date: "Mar 19",
    pillar: "cultural",
    platforms: "IG Post · FB · TikTok",
    title: "Ghode Jatra ko Shubhakamana 🐎",
    language: "Bilingual",
    template: "FestivalGreeting",
    output: "video",
    props: {
      festivalEmoji: "🐎",
      titleNepali: "घोडे जात्राको हार्दिक शुभकामना",
      titleEnglish: "Happy Ghode Jatra from the KaamKotha family",
      message:
        "To every Nepali celebrating far from Tundikhel today — the community rides with you. 🇳🇵",
    },
    notes: "PRIORITY POST. No promo CTA. Pure community love.",
  },
  {
    day: 11,
    date: "Mar 20",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel",
    title: "UK vs Nepal: Things That Confuse Every Nepali When They First Arrive",
    language: "Bilingual",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "entertainment",
      title: "Things that confuse EVERY Nepali when they first arrive in the UK 🤯",
      titleHighlights: ["EVERY", "confuse"],
      items: [
        "Queuing for the queue 🚶🚶🚶",
        "Shops closing at 4pm on a Sunday?? 🕓",
        "\"You alright?\" — is not actually a question 😅",
        "Cold rain in July. घाम खोई त? 🌧️",
        "Two taps: one freezing, one boiling 🚰",
      ],
      itemSeconds: 2.8,
      cta: CTA,
    },
    notes: "Side-by-side text animation vibe. Queue culture, weather, Sunday shopping.",
  },
  {
    day: 12,
    date: "Mar 21",
    pillar: "trending",
    platforms: "TikTok · IG Reel",
    title: "The KaamKotha Effect: Life Before vs After Downloading the App",
    language: "English",
    template: "BeforeAfter",
    output: "video",
    props: {
      title: "The KaamKotha Effect ⚡",
      titleHighlights: ["KaamKotha"],
      beforeLabel: "BEFORE",
      afterLabel: "AFTER",
      beforeItems: [
        "47 WhatsApp groups, zero answers",
        "\"Room already gone bro\" 💀",
        "Asking strangers for job leads",
      ],
      afterItems: [
        "Verified rooms with photos",
        "Jobs posted by real employers",
        "One community. One app.",
      ],
      cta: CTA,
      strikeBefore: true,
    },
    notes: "Trending before/after audio. WhatsApp chaos vs clean KK UI.",
  },
  {
    day: 13,
    date: "Mar 22",
    pillar: "promo",
    platforms: "IG Carousel · FB",
    title: "Did You Know? KaamKotha Has a Nepali Business Directory for All of the UK",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "promo",
      cover: {
        kicker: "DID YOU KNOW?",
        title: "KaamKotha has a Nepali Business Directory for the whole UK",
        sub: "Restaurants, groceries, salons, accountants — ours, all in one place.",
      },
      slides: [
        {
          emoji: "🍛",
          heading: "Find Nepali restaurants anywhere",
          body: "Craving momo in Manchester or thakali in Reading? Search by city and find Nepali-owned kitchens near you.",
        },
        {
          emoji: "🛒",
          heading: "Groceries & spice shops",
          body: "Gundruk, chiura, timur — locate the shops that stock home, from Aldershot to Aberdeen.",
        },
        {
          emoji: "💇",
          heading: "Services in your language",
          body: "Salons, mechanics, accountants, solicitors — professionals who understand you, literally.",
        },
        {
          emoji: "📈",
          heading: "Support Nepali-owned",
          body: "Every listing is a Nepali family business. Community money staying in the community.",
        },
      ],
      outro: {
        title: "Know a business that should be here?",
        body: "Tag a Nepali business that's not listed yet 👇 — listings are free.",
        cta: "Explore the directory",
      },
    },
    notes: "'Tag a Nepali business not listed yet 👇'",
  },
  {
    day: 14,
    date: "Mar 23",
    pillar: "virality",
    platforms: "TikTok · IG Reel · FB",
    title: "Name a UK City With More Than 100 Nepalese People — Go.",
    language: "Bilingual",
    template: "QuizReel",
    output: "video",
    props: {
      question: "Name a UK city with more than 100 Nepalese people. Go. 🇳🇵",
      questionHighlights: ["100", "Go."],
      timerSeconds: 5,
      commentPrompt: "Wrong answers only? Comment your city",
      cta: CTA,
    },
    notes: "Geography debate = massive engagement. City comments flood.",
  },

  // ─── Week 3: Feature Education & Deep Value ───────────────────────────────
  {
    day: 15,
    date: "Mar 24",
    pillar: "education",
    platforms: "IG Carousel · FB",
    title: "How to Find a Verified Job on KaamKotha — Step by Step",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "APP TUTORIAL",
        title: "How to Find a Verified Job on KaamKotha",
        sub: "From download to job offer — step by step. 💼",
      },
      slides: [
        {
          emoji: "📲",
          heading: "Step 1 — Open the Jobs tab",
          body: "Tap Jobs in the bottom bar. Filter by city, industry and full-time / part-time.",
        },
        {
          emoji: "✅",
          heading: "Step 2 — Look for the verified badge",
          body: "The blue tick means we've checked the employer is real. No fake listings, no 'pay to apply' scams.",
        },
        {
          emoji: "📄",
          heading: "Step 3 — Apply in two taps",
          body: "Attach your CV once, reuse it everywhere. Employers reply inside the app.",
        },
        {
          emoji: "🔔",
          heading: "Step 4 — Set job alerts",
          body: "Tell us your city and role — get a notification the moment something new drops.",
        },
        {
          emoji: "🤝",
          heading: "Step 5 — Interview with confidence",
          body: "Every listing shows salary range and hours upfront. Know your worth before you walk in.",
        },
      ],
      outro: {
        title: "Your next job is already posted.",
        body: "Hundreds of verified roles across the UK — from employers who value our community.",
        cta: "Browse jobs now",
      },
    },
    notes: "Use real UI screenshots in stories version. Shows verification badge.",
  },
  {
    day: 16,
    date: "Mar 25",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel",
    title: "Things Every Nepali in the UK Sends Back Home 📦",
    language: "Nepali",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "entertainment",
      title: "नेपाल पठाउने बाकसमा के के हुन्छ? 📦",
      titleHighlights: [],
      items: [
        "UK को chocolate — आधा त बाटैमा सकिन्छ 🍫",
        "NHS भिटामिन र fish oil 💊",
        "Primark का लुगा — 'यता सस्तो छ नि!' 👕",
        "Perfume — दिदीबहिनीको फर्माइस 🌸",
        "अनि सबैभन्दा गह्रौं… माया ❤️",
      ],
      itemSeconds: 2.8,
      cta: CTA,
    },
    notes: "Emotional nostalgia = share. End on the heart line.",
  },
  {
    day: 17,
    date: "Mar 26",
    pillar: "trending",
    platforms: "TikTok · IG Reel · FB",
    title: "Rate Your UK City for Nepalese Community Life: 1–10",
    language: "English",
    template: "QuizReel",
    output: "video",
    props: {
      question: "Rate YOUR UK city for Nepali community life: 1–10 🏙️",
      questionHighlights: ["YOUR", "1–10"],
      timerSeconds: 5,
      commentPrompt: "City + score. Defend it",
      cta: CTA,
    },
    notes: "City ranking causes debate = enormous engagement loop.",
  },
  {
    day: 18,
    date: "Mar 27",
    pillar: "education",
    platforms: "IG Post · FB",
    title: "Nepali Cultural Events Across the UK — April 2026 🗓️",
    language: "Bilingual",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "cultural",
      cover: {
        kicker: "APRIL 2026 · वैशाख आउँदैछ",
        title: "Nepali Cultural Events Across the UK 🗓️",
        sub: "Mark your calendars — April is OUR month.",
      },
      slides: [
        {
          emoji: "🎉",
          heading: "Navavarsha 2083 — Apr 13",
          body: "Nepali New Year! Community events in London, Aldershot, Reading and Manchester. Details in the app.",
        },
        {
          emoji: "🏃",
          heading: "Community sports days",
          body: "Football and volleyball tournaments across the South East — check the Events tab for your city.",
        },
        {
          emoji: "🎶",
          heading: "Cultural nights & concerts",
          body: "Live Nepali music and dohori nights announced weekly — venues from Ashford to Aberdeen.",
        },
        {
          emoji: "🛕",
          heading: "Temple & puja gatherings",
          body: "Pashupati Mandir UK and community pujas — dates and times all listed in one place.",
        },
      ],
      outro: {
        title: "Never miss what's ours.",
        body: "Every Nepali event in the UK, in one Events tab. Something special is coming for Navavarsha… 👀",
        cta: "Open Events in KaamKotha",
      },
    },
    notes: "Tease Navavarsha (Apr 13). Strong CTA to Events section.",
  },
  {
    day: 19,
    date: "Mar 28",
    pillar: "promo",
    platforms: "TikTok · IG Reel",
    title: "Why WhatsApp Groups Aren't Enough Anymore",
    language: "English",
    template: "BeforeAfter",
    output: "video",
    props: {
      title: "Why WhatsApp groups aren't enough anymore 📵",
      titleHighlights: ["aren't", "enough"],
      beforeLabel: "WHATSAPP GROUPS",
      afterLabel: "KAAMKOTHA",
      beforeItems: [
        "Same listing forwarded 5 times",
        "No idea who's real",
        "Scroll 400 messages for one answer",
      ],
      afterItems: [
        "Search rooms & jobs in seconds",
        "Verified people & listings",
        "Everything organised by city",
      ],
      cta: CTA,
      strikeBefore: true,
    },
    notes: "5 problems → 5 KK solutions. Fast cut. Direct tone.",
  },
  {
    day: 20,
    date: "Mar 29",
    pillar: "virality",
    platforms: "TikTok · IG Reel · FB",
    title: "Tag a Nepali Friend in the UK Who Needs to See This 👇",
    language: "Bilingual",
    template: "MemeText",
    output: "video",
    props: {
      setup: "Tag a Nepali friend in the UK who NEEDS to see this",
      setupHighlights: ["NEEDS"],
      emoji: "👇",
      punchline: "साथीलाई tag गर्नुस् — रुम, जब, सबै एउटै app मा। Sharing is caring. 🇳🇵",
      cta: CTA,
    },
    notes: "Every tag = new eyes on brand. Keep caption minimal.",
  },
  {
    day: 21,
    date: "Mar 30",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel",
    title: "Nepali Aunties in the UK When They Discover KaamKotha 😂",
    language: "Nepali",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "entertainment",
      title: "UK का नेपाली आन्टीहरूले KaamKotha भेट्दा 😂",
      titleHighlights: ["KaamKotha"],
      items: [
        "\"ए! यसमा त कोठा पनि पाइन्छ?\" 🏠",
        "\"मेरो भान्जालाई काम चाहिएको छ…\" 💼",
        "\"पुजारी पनि? लौ न, बुक गरिदेऊ!\" 🛕",
        "\"यो app को बारेमा किन कसैले भनेन?\" 😤",
        "…अनि पूरै आफन्त समूहलाई forward 📲",
      ],
      itemSeconds: 2.8,
      cta: CTA,
    },
    notes: "Text bubbles as 'auntie' voice. Warm humour, never mocking.",
  },

  // ─── Week 4: Engagement & Trends ──────────────────────────────────────────
  {
    day: 22,
    date: "Mar 31",
    pillar: "education",
    platforms: "IG Carousel · FB",
    title: "How to List Your Nepali Business on KaamKotha for Free — In 3 Steps",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "FOR BUSINESS OWNERS",
        title: "List Your Nepali Business on KaamKotha — Free, in 3 Steps",
        sub: "Restaurants, shops, services — get found by the whole UK Nepali community.",
      },
      slides: [
        {
          emoji: "1️⃣",
          heading: "Create your business profile",
          body: "Name, city, category, photos. Takes less time than making one cup of chiya.",
        },
        {
          emoji: "2️⃣",
          heading: "Add what makes you special",
          body: "Menu highlights, services, opening hours, Nepali-speaking staff — tell the community why you.",
        },
        {
          emoji: "3️⃣",
          heading: "Get verified & go live",
          body: "Our team confirms your business is real, and you appear in search for your whole city. Free. Forever.",
        },
      ],
      outro: {
        title: "5,000+ community members are searching.",
        body: "Tag a Nepali business that should be listed 👇",
        cta: "List your business free",
      },
    },
    notes: "Target: business owners.",
  },
  {
    day: 23,
    date: "Apr 1",
    pillar: "trending",
    platforms: "TikTok · IG Reel · FB",
    title: "KaamKotha is Shutting Down… April Fools 😂",
    language: "English",
    template: "CountdownTease",
    output: "video",
    props: {
      teaseLines: [
        "We have some difficult news to share…",
        "After careful consideration…",
        "KaamKotha is shutting down. 💔",
      ],
      bigReveal: "APRIL FOOLS 😂",
      dateLine: "WE'RE JUST GETTING STARTED",
      cta: "Follow for what's next",
    },
    notes: "Fake sad announcement → hard cut reveal. April 1 algo boost.",
  },
  {
    day: 24,
    date: "Apr 2",
    pillar: "promo",
    platforms: "IG Carousel · FB",
    title: "Real Stories from the KaamKotha Community 🙏",
    language: "Bilingual",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "promo",
      cover: {
        kicker: "COMMUNITY STORIES · समुदायका कथा",
        title: "Real Stories from the KaamKotha Community 🙏",
        sub: "In their own words.",
      },
      slides: [
        {
          emoji: "🏠",
          heading: "\"Found a room in 3 days\"",
          body: "\"काठमाडौंबाट आएको दुई हप्तामै Reading मा कोठा पाएँ। WhatsApp मा months लाग्थ्यो।\" — Suraj, Reading",
        },
        {
          emoji: "💼",
          heading: "\"My first UK job\"",
          body: "\"The verified badge gave me confidence it wasn't a scam. Started my care job within two weeks.\" — Pratima, Ashford",
        },
        {
          emoji: "🛕",
          heading: "\"Pujari for mum's puja\"",
          body: "\"आमाको श्राद्धको लागि पुजारी चाहिएको थियो। App बाटै भेटियो — घरमै आउनुभयो।\" — Bikash, Aldershot",
        },
        {
          emoji: "🤝",
          heading: "\"Felt like home\"",
          body: "\"Moved to a city with no Nepali friends. Through Events I found my people in one weekend.\" — Anisha, Manchester",
        },
      ],
      outro: {
        title: "What's your KaamKotha story?",
        body: "Share it in the comments — we feature one every week. 👇",
        cta: "Join the community",
      },
    },
    notes: "Representative community quote cards; refresh with real testimonials as they come in.",
  },
  {
    day: 25,
    date: "Apr 3",
    pillar: "education",
    platforms: "IG Carousel · TikTok",
    title: "The Ultimate Checklist for New Nepali Arrivals in the UK 📋",
    language: "English",
    template: "Carousel",
    output: "stills",
    props: {
      pillar: "education",
      cover: {
        kicker: "SAVE THIS · नयाँ आउनेका लागि",
        title: "The Ultimate Checklist for New Nepali Arrivals in the UK 📋",
        sub: "8 steps, in order. Send this to whoever lands next.",
      },
      slides: [
        {
          emoji: "🛂",
          heading: "Collect your BRP / eVisa",
          body: "Within 10 days of arrival (or before your vignette expires). Everything else depends on this.",
        },
        {
          emoji: "📱",
          heading: "Get a UK SIM",
          body: "Giffgaff, Lebara or VOXI — order free SIMs online. You need a UK number for everything below.",
        },
        {
          emoji: "🏦",
          heading: "Open a bank account",
          body: "Monzo or Starling on day one — just passport + BRP. High-street banks later.",
        },
        {
          emoji: "🔢",
          heading: "Apply for your NI number",
          body: "Free on gov.uk. Never pay anyone to 'arrange' it for you.",
        },
        {
          emoji: "🩺",
          heading: "Register with a GP",
          body: "It's free and you don't need proof of address. Don't wait until you're sick.",
        },
        {
          emoji: "🏠",
          heading: "Sort long-term housing",
          body: "Verified rooms on KaamKotha — see our deposit-safety guide before paying anything.",
        },
        {
          emoji: "💼",
          heading: "Start the job hunt",
          body: "CV in UK format (no photo needed!) + verified listings in the Jobs tab.",
        },
        {
          emoji: "🇳🇵",
          heading: "Find your community",
          body: "Events, temples, sports, momo nights — your people are already here. Come find them.",
        },
      ],
      outro: {
        title: "Landing is hard. This makes it easier.",
        body: "Save it. Share it. Everything in this list lives inside one app.",
        cta: CTA,
      },
    },
    notes: "HIGHEST SAVE TARGET of the month.",
  },
  {
    day: 26,
    date: "Apr 4",
    pillar: "entertainment",
    platforms: "TikTok · IG Reel · FB",
    title: "Nepali Food Every UK Nepali Craves on a Rainy British Day 🍜",
    language: "Bilingual",
    template: "KineticList",
    output: "video",
    props: {
      pillar: "entertainment",
      title: "Rainy British day. What are we craving? 🌧️🍜",
      titleHighlights: ["craving?"],
      items: [
        "Steaming थुक्पा — instant Kathmandu winter 🍜",
        "Momo with THAT golbheda achar 🥟",
        "दाल भात — nothing else fixes homesickness 🍛",
        "Sel roti + चिया combo ☕",
        "Wai Wai... सुकै खाने कि पकाएर? 😂",
      ],
      itemSeconds: 2.8,
      cta: "Find Nepali restaurants near you on KaamKotha",
    },
    notes: "Food debates = maximum comments. Ask: what did we miss?",
  },
  {
    day: 27,
    date: "Apr 5",
    pillar: "trending",
    platforms: "IG Reel · TikTok · FB",
    title: "Easter Weekend: The Nepali Way vs The British Way 😂",
    language: "Bilingual",
    template: "BeforeAfter",
    output: "video",
    props: {
      title: "Easter Bank Holiday: British way vs Nepali way 😂🐣",
      titleHighlights: ["British", "Nepali"],
      beforeLabel: "THE BRITISH WAY 🇬🇧",
      afterLabel: "THE NEPALI WAY 🇳🇵",
      beforeItems: [
        "Easter egg hunt in the garden",
        "Roast dinner at 1pm sharp",
        "B&Q trip because… tradition?",
      ],
      afterItems: [
        "4-day weekend = 4 momo parties",
        "Volleyball till the rain starts",
        "\"Holiday छ, भेला हुनुपर्‍यो!\" 🎉",
      ],
      cta: CTA,
      strikeBefore: false,
    },
    notes: "Easter Bank Holiday — peak platform usage. Light crossover humour, both sides loving.",
  },

  // ─── Final Days: Momentum & Navavarsha Tease ──────────────────────────────
  {
    day: 28,
    date: "Apr 6",
    pillar: "virality",
    platforms: "TikTok · IG Reel · FB",
    title: "How Many UK Cities Can You Name That Have a Strong Nepali Community?",
    language: "Bilingual",
    template: "QuizReel",
    output: "video",
    props: {
      question: "How many UK cities can you name with a strong Nepali community? 🗺️",
      questionHighlights: ["How", "many"],
      timerSeconds: 8,
      commentPrompt: "Drop your list — most cities wins",
      cta: CTA,
    },
    notes: "UK map dots idea for v2. City competition in comments.",
  },
  {
    day: 29,
    date: "Apr 7",
    pillar: "promo",
    platforms: "IG Post · FB · TikTok",
    title: "28 Days. One Mission. Help Every Nepali in the UK Feel at Home.",
    language: "Bilingual",
    template: "StatCard",
    output: "stills",
    props: {
      theme: "navy",
      kicker: "Our mission · हाम्रो अभियान",
      headline: "28 days. One mission. Help every Nepali in the UK feel at home.",
      highlight: "feel at home.",
      sub: "घर भनेको ठाउँ होइन, समुदाय हो। Home isn't a place — it's a community.",
      cta: "KaamKotha 🇳🇵",
    },
    notes: "Emotional brand graphic. No hard CTA. Values-led share.",
  },
  {
    day: 30,
    date: "Apr 8",
    pillar: "cultural",
    platforms: "TikTok · IG Reel · FB",
    title: "Nepali New Year is Coming. And We Have Something Special Planned. 👀",
    language: "Bilingual",
    template: "CountdownTease",
    output: "video",
    props: {
      teaseLines: [
        "नयाँ वर्ष आउँदैछ… 🎉",
        "Nepali New Year 2083 is almost here.",
        "And we have something special planned…",
      ],
      bigReveal: "SOMETHING BIG IS COMING 👀",
      dateLine: "NAVAVARSHA · APRIL 13",
      cta: "Follow so you don't miss it",
    },
    notes: "CAMPAIGN LAUNCHPAD. Mystery tease. Follow CTA. FOMO mechanic.",
  },
];
