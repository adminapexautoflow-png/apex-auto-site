import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Site",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "What you get", href: "/#what-you-get" },
      { label: "Why us", href: "/#why-us" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Book a free call", href: "/book" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "SMS Terms", href: "/sms-terms" },
      { label: "SMS Disclosure", href: "/sms-disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="display-tight text-[1.0625rem]">
            Apex<span className="text-signal">AutoFlow</span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-dim">
            Missed-call recovery for trades businesses across {site.region}.
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-5 inline-block font-mono text-[13px] text-muted transition-colors hover:text-signal"
          >
            {site.contactEmail}
          </a>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 text-[0.8125rem] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} is a service of {site.legalEntity}.
          </p>
          <p className="font-mono text-[11px] tabular-nums">
            © {new Date().getFullYear()} · {site.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
