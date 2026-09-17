"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/site";

const BOOK_PAGE = "/book/";

/**
 * Every "Book a free call" on the site routes through here.
 *
 * By default it goes to the on-site booking page (app/book). Set BOOKING_URL in
 * lib/site.ts to a Calendly / Cal.com / SavvyCal link and the exact same CTAs
 * open that scheduler instead — one constant, no component edits.
 */
export function BookCall({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9375rem] font-semibold transition-all duration-300 focus-visible:outline-2";

  const styles =
    variant === "primary"
      ? "bg-signal text-void hover:bg-signal-soft hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgb(var(--signal-rgb)/0.6)]"
      : "border border-line-bright text-text hover:border-signal/60 hover:text-signal hover:-translate-y-0.5";

  const external = BOOKING_URL !== "";

  const arrow = (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );

  if (external) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={BOOK_PAGE} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow}
    </Link>
  );
}
