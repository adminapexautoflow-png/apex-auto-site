/**
 * Site-wide constants. Anything the client might want changed without a code
 * review lives here or in lib/content.ts.
 */

export const site = {
  name: "ApexAutoFlow",
  legalEntity: "SOPS Finance & Accounting LLC",
  url: "https://apexautoflow.com",
  contactEmail: "partner.apexautoflow@gmail.com",
  adminEmail: "admin.apexautoflow@gmail.com",
  region: "Colorado",
} as const;

/**
 * BACKEND SEAM (scheduling).
 *
 * Empty string = every "Book a free call" CTA goes to the on-site booking page
 * at /book (app/book/page.tsx), which emails the request through lib/booking.ts.
 * Drop in a Calendly / Cal.com / SavvyCal link and the exact same CTAs route
 * there instead. No component changes required — see components/ui/Cta.tsx.
 */
export const BOOKING_URL = "";

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What you get", href: "#what-you-get" },
  { label: "Why us", href: "#why-us" },
  { label: "Pricing", href: "#pricing" },
] as const;

export type TimelineNode = {
  id: string;
  /** Elapsed call/job time. Still shown in the mobile capsule in Nav.tsx; the
   *  rail itself no longer renders it. */
  time: string;
  label: string;
  /** Carries a standing ring on the rail whether or not its section is in
   *  view, so the one node we want people to walk to stays visible from the
   *  top of the page. Exactly one node should have it. */
  highlight?: boolean;
};

/**
 * The Live Line: the arc of one recovered job, from the ring to getting paid.
 * Each node maps to a section id, in document order.
 */
export const timeline: readonly TimelineNode[] = [
  { id: "top", time: "00:00", label: "Ring" },
  { id: "problem", time: "00:18", label: "No answer" },
  { id: "how-it-works", time: "00:22", label: "Text sent" },
  { id: "what-you-get", time: "01:05", label: "Reply" },
  { id: "why-us", time: "01:11", label: "Ranked" },
  { id: "pricing", time: "01:26", label: "Booked", highlight: true },
  { id: "faq", time: "02:41", label: "On site" },
  { id: "get-started", time: "——:——", label: "Paid" },
];
