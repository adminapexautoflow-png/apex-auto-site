# ApexAutoFlow

Marketing site for ApexAutoFlow — missed-call text-back for HVAC, plumbing,
electrical and drain shops across Colorado. A service of SOPS Finance &
Accounting LLC.

Next.js 16 (App Router) · Tailwind v4 · `motion` · static export to `out/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # emits out/ — this is what Cloudflare serves (wrangler.jsonc)
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | Every word of marketing copy. Hand this file to the client for review. |
| `lib/site.ts` | Contact details, nav, and the Live Line timeline. |
| `lib/leads.ts` | Backend seam for the homepage contact form. |
| `lib/booking.ts` | Backend seam for `/book`. **Needs a Web3Forms key — see below.** |
| `components/LiveLine.tsx` | The left rail — the site's signature element. |
| `app/book` | The "Book a free call" page. Every CTA on the site points here. |
| `app/privacy`, `app/sms-terms`, `app/sms-disclosure` | Compliance pages. |

## Booking a call — `/book`

Every "Book a free call" button on the site routes to `/book`, which asks for
first name, last name, email, business, and a preferred day plus a time window
(morning / midday / afternoon), then emails the request to us.

The Web3Forms access key is set in `ACCESS_KEY_FALLBACK` in `lib/booking.ts`,
so the form sends. `NEXT_PUBLIC_WEB3FORMS_KEY` overrides it if set in the
Cloudflare build environment.

That key is public by design — it only ever permits sending to one fixed
address — so it lives in the repo and ships in client JS deliberately. It is
not a secret and does not belong in a secret store.

The destination address is **not in this repo**. It lives on the Web3Forms
side, bound to the key. To change who receives bookings, change it there, or
register the new address for a fresh key and swap it in here.

If the key is ever blanked, the form does not break: it renders normally and
tells the visitor to email us instead, so it collects nothing rather than
dropping leads silently.

The email arrives with `Reply-To` set to the customer, so hitting Reply in the
inbox goes straight to the shop owner.

### Using an external scheduler instead

`BOOKING_URL` in `lib/site.ts` still wins if you set it. Drop in a Calendly /
Cal.com link and every CTA opens that scheduler instead of `/book` — one
constant, no component edits.

## Wiring up the homepage contact form

The contact form in the `#get-started` section funnels through one function:

```ts
submitLead(lead: Lead): Promise<SubmitResult>
```

`LeadForm.tsx` calls it and renders the result. It has no idea what is on the
other side, so switching backends never touches a component.

**Today** it posts to Netlify Forms. Submissions appear under *Netlify dashboard
→ Forms → "contact"*; add an email notification there to forward each lead to
`partner.apexautoflow@gmail.com`. The hidden `<form name="contact">` in
`app/layout.tsx` is what Netlify's build-time crawler detects — the visible form
submits with `fetch()`, so that static copy has to stay.

**To point at Make.com (or anything else):** set `NEXT_PUBLIC_LEAD_ENDPOINT` in
the Netlify environment and redeploy. `submitLead` switches to a JSON POST at
that URL with the `Lead` shape plus `submittedAt`. Nothing else changes.

**To bring it in-house:** drop `output: "export"` from `next.config.ts`, add
`app/api/leads/route.ts` accepting `Lead`, and set
`NEXT_PUBLIC_LEAD_ENDPOINT="/api/leads"`.

## Rules for editing

- **Legal text is verbatim.** The SMS consent paragraph in `LeadForm.tsx` and
  the bodies of the three legal pages are transcribed from the published site
  and must not be reworded without compliance sign-off.
- **Colour carries meaning.** Amber = ApexAutoFlow acting, steel blue = the
  customer, red = the lost job. Do not use them decoratively.
- **Every animation needs a resting state.** Anything animated is gated on
  `useReducedMotion()` and must render its final state when motion is reduced.
- **No invented statistics.** The Problem section uses arithmetic a shop owner
  can check, not a cited figure.
