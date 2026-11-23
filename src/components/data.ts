export type Webinar = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  dayLabel: string;
  time: string;
  format: string;
  seatsLeft: number;
  totalSeats: number;
  /** ISO start in UTC, used for calendar export */
  startUtc: string;
  durationMinutes: number;
};

export const webinars: Webinar[] = [
  {
    id: "forex-foundations",
    number: "01",
    category: "Forex Trading",
    title: "Forex Foundations: Reading Market Structure Without Stress",
    subtitle:
      "Highs, lows, trend and range — a calm, repeatable way to read any chart before you place a trade.",
    dateLabel: "Sat, 6 Dec 2026",
    dayLabel: "6 Dec",
    time: "7:00 PM WAT",
    format: "Live on Zoom",
    seatsLeft: 14,
    totalSeats: 60,
    startUtc: "2026-12-06T18:00:00Z",
    durationMinutes: 90,
  },
  {
    id: "affiliate-blueprint",
    number: "02",
    category: "Affiliate Marketing",
    title: "Affiliate Marketing Blueprint: Turning Content Into Daily Commissions",
    subtitle:
      "Choosing offers worth promoting, building trust with your audience, and tracking what actually converts.",
    dateLabel: "Sat, 13 Dec 2026",
    dayLabel: "13 Dec",
    time: "6:00 PM WAT",
    format: "Live on Zoom",
    seatsLeft: 8,
    totalSeats: 50,
    startUtc: "2026-12-13T17:00:00Z",
    durationMinutes: 75,
  },
  {
    id: "live-qa-2026",
    number: "03",
    category: "Live Mentorship",
    title: "Live Q&A: Scaling Your Digital Income in 2026",
    subtitle:
      "Bring your numbers and your questions. An open session on stacking income streams sustainably.",
    dateLabel: "Sun, 21 Dec 2026",
    dayLabel: "21 Dec",
    time: "5:00 PM WAT",
    format: "Live on Zoom",
    seatsLeft: 23,
    totalSeats: 80,
    startUtc: "2026-12-21T16:00:00Z",
    durationMinutes: 60,
  },
];

export type Review = {
  name: string;
  role: string;
  location: string;
  quote: string;
  outcome: string;
};

export const reviews: Review[] = [
  {
    name: "Chiamaka Okafor",
    role: "Pharmacist & part-time trader",
    location: "Lagos, Nigeria",
    quote:
      "I used to jump into trades on gut feeling. Sommie taught me to mark structure first and wait for my setup. My journal finally makes sense.",
    outcome: "First fully green month after 4 weeks of mentorship",
  },
  {
    name: "Tunde Adeyemi",
    role: "Content creator",
    location: "Abuja, Nigeria",
    quote:
      "The affiliate session changed how I pick products. I stopped pushing random links and built one honest review series instead.",
    outcome: "Earned ₦480,000 in commissions within 60 days",
  },
  {
    name: "Aisha Bello",
    role: "Product designer",
    location: "London, UK",
    quote:
      "What I value most is how calm and practical she is. No hype, no screenshots of Lambos — just clear frameworks I can actually follow after work.",
    outcome: "Built a second income stream alongside a full-time role",
  },
  {
    name: "Kwame Mensah",
    role: "University student",
    location: "Accra, Ghana",
    quote:
      "The live Q&As are where it clicks. She answered my exact question about risk per trade and I rebuilt my plan that same night.",
    outcome: "Cut his average drawdown in half over one quarter",
  },
];

export const videoTakeaways = [
  {
    title: "Where it started",
    body: "Why Sommie began trading with a small account — and the early mistakes that shaped how she teaches.",
  },
  {
    title: "Structure over signals",
    body: "The reason her students learn to read the market themselves instead of copying calls.",
  },
  {
    title: "Content that earns",
    body: "How affiliate income grew from sharing what she genuinely uses, not chasing every offer.",
  },
  {
    title: "What a webinar looks like",
    body: "Format, pace and what you will walk away with after each live session.",
  },
];

export const videoChapters = [
  { at: 0, label: "Introduction" },
  { at: 28, label: "How I started" },
  { at: 64, label: "What I teach" },
  { at: 104, label: "Joining a webinar" },
];

export const VIDEO_DURATION = 135;
