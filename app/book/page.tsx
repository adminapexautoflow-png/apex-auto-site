import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { booking } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free call",
  description:
    "Fifteen minutes with ApexAutoFlow. Pick a day and a time window and we will tell you roughly how many jobs a month your shop is losing to missed calls.",
  openGraph: {
    title: "Book a free call — ApexAutoFlow",
    description:
      "Fifteen minutes on the phone. No pressure, no jargon, no slide deck.",
    url: `${site.url}/book/`,
    siteName: site.name,
    type: "website",
  },
};

export default function Book() {
  return (
    <div className="relative overflow-hidden pb-24 pt-28 lg:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[560px] w-[560px] rounded-full bg-signal/[0.07] blur-[150px]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim transition-colors hover:text-signal"
          >
            <span aria-hidden>←</span> Back to site
          </Link>

          <Eyebrow>{booking.eyebrow}</Eyebrow>

          <Reveal as="h1" delay={0.05}>
            <span className="display mt-6 block max-w-[13ch] text-[2.1rem] sm:text-[2.8rem] lg:text-[3.2rem]">
              {booking.headline}
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-muted">
              {booking.body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-10 space-y-6 border-l border-line-bright pl-5">
              {booking.reassurance.map((item) => (
                <li key={item.title}>
                  <h2 className="display-tight text-[0.9375rem]">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-dim">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-10 text-sm text-dim">
              {booking.emailPrompt}{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-mono text-[13px] text-signal underline underline-offset-4 transition-colors hover:text-signal-soft"
              >
                {site.contactEmail}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </div>
  );
}
