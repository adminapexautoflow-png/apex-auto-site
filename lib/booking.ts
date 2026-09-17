/**
 * THE BOOKING SEAM — sibling to lib/leads.ts.
 *
 * Components never talk to a network. `BookingForm` calls `submitBooking()`
 * and renders the result, so changing what happens on the other side is a
 * change to this file alone.
 *
 * ---------------------------------------------------------------------------
 * Today: Web3Forms. Zero backend — the browser POSTs straight to their API and
 * they email the booking on to us. The site stays `output: "export"` (see
 * next.config.ts); there is no Worker script and no secret to deploy.
 *
 * SETUP (one minute, once):
 *   1. Go to https://web3forms.com and enter the ApexAutoFlow inbox that
 *      should receive bookings. They email back an access key (a UUID).
 *   2. Put it in ACCESS_KEY below, or set NEXT_PUBLIC_WEB3FORMS_KEY in the
 *      build environment — the env var wins if both are set.
 *
 * The destination address is NOT in this repo. It lives on the Web3Forms side,
 * bound to the access key. To change who gets bookings, change it there — or
 * generate a new key for the new address and swap it in here. The key is a
 * public identifier by design (it only permits sending to that one fixed
 * address), so shipping it in client JS is safe and intended.
 *
 * To move it in-house later:
 *   1. Drop `output: "export"` from next.config.ts.
 *   2. Add app/api/book/route.ts accepting the `Booking` shape below.
 *   3. Replace `postWeb3Forms` with a JSON POST to "/api/book".
 * ---------------------------------------------------------------------------
 */

/** Paste the Web3Forms access key here, or set NEXT_PUBLIC_WEB3FORMS_KEY. */
const ACCESS_KEY_FALLBACK = "";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ACCESS_KEY_FALLBACK;

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Coarse windows rather than exact slots: there is no calendar behind this
 * form, so promising 10:30am would be promising something we cannot hold.
 * We confirm the exact time by reply.
 */
export const TIME_WINDOWS = [
  { value: "morning", label: "Morning", hours: "8am – 12pm" },
  { value: "midday", label: "Midday", hours: "12pm – 3pm" },
  { value: "afternoon", label: "Afternoon", hours: "3pm – 6pm" },
] as const;

export type TimeWindow = (typeof TIME_WINDOWS)[number]["value"];

export type Booking = {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  /** "YYYY-MM-DD", straight off `<input type="date">`. */
  day: string;
  window: TimeWindow | "";
  notes?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "That didn't go through. Try again, or email us and we'll book it from there.";

const UNCONFIGURED_ERROR =
  "This form isn't connected yet. Email us and we'll get you booked in.";

/** Whether the form can actually send. False until the access key is set. */
export const isBookingConfigured = ACCESS_KEY !== "";

/** Today as "YYYY-MM-DD" in the visitor's own timezone, not UTC. */
export function todayISO(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${date}`;
}

/**
 * "2026-09-22" -> "Tuesday, 22 September 2026".
 * Parsed field by field: `new Date("2026-09-22")` is parsed as UTC midnight and
 * renders as the day before for anyone west of Greenwich — which is everyone
 * in Colorado.
 */
export function formatDay(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  if (!year || !month || !date) return day;
  return new Date(year, month - 1, date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function windowLabel(value: TimeWindow | ""): string {
  const found = TIME_WINDOWS.find((w) => w.value === value);
  return found ? `${found.label} (${found.hours})` : "";
}

export function validateBooking(
  booking: Booking,
): Partial<Record<keyof Booking, string>> {
  const errors: Partial<Record<keyof Booking, string>> = {};

  if (!booking.firstName.trim()) errors.firstName = "We need a first name.";
  if (!booking.lastName.trim()) errors.lastName = "And a last name.";

  const email = booking.email.trim();
  if (!email) errors.email = "Where should we send the confirmation?";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That doesn't look like a working email address.";

  if (!booking.business.trim()) errors.business = "What's the shop called?";

  if (!booking.day) errors.day = "Pick a day that works.";
  else if (booking.day < todayISO()) errors.day = "That day has already been.";

  if (!booking.window) errors.window = "Pick a window.";

  return errors;
}

async function postWeb3Forms(booking: Booking): Promise<SubmitResult> {
  const name = `${booking.firstName.trim()} ${booking.lastName.trim()}`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,

      // Web3Forms reserves these three. `replyto` is what makes hitting Reply
      // in the inbox go to the shop owner rather than to Web3Forms.
      subject: `Free call request — ${booking.business.trim()} (${name})`,
      from_name: "ApexAutoFlow website",
      replyto: booking.email.trim(),

      // Everything below is ours, and is what shows up in the email body.
      "First name": booking.firstName.trim(),
      "Last name": booking.lastName.trim(),
      Email: booking.email.trim(),
      Business: booking.business.trim(),
      "Preferred day": formatDay(booking.day),
      "Preferred time": windowLabel(booking.window),
      Notes: booking.notes?.trim() || "—",
      "Submitted at": new Date().toISOString(),

      // Web3Forms' honeypot. Bots fill it, people never see it.
      botcheck: "",
    }),
  });

  const data: { success?: boolean } = await res.json().catch(() => ({}));
  return res.ok && data.success
    ? { ok: true }
    : { ok: false, error: GENERIC_ERROR };
}

export async function submitBooking(booking: Booking): Promise<SubmitResult> {
  if (!isBookingConfigured) {
    return { ok: false, error: UNCONFIGURED_ERROR };
  }
  try {
    return await postWeb3Forms(booking);
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
