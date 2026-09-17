"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  TIME_WINDOWS,
  submitBooking,
  todayISO,
  validateBooking,
  type Booking,
} from "@/lib/booking";
import { booking as copy } from "@/lib/content";

const EMPTY: Booking = {
  firstName: "",
  lastName: "",
  email: "",
  business: "",
  day: "",
  window: "",
  notes: "",
};

type Status = "idle" | "pending" | "success" | "error";

/** Today never changes under us mid-session, so there is nothing to subscribe to. */
const noSubscribe = () => () => {};

/**
 * Today on the client, empty string on the server.
 *
 * The build is prerendered to static HTML (next.config.ts, `output: "export"`),
 * so a date read during render is the *build* date: it would hydrate mismatched
 * and then sit stale on the CDN for as long as the deploy lives. This is the
 * one React primitive that is allowed to disagree across that boundary.
 */
function useToday(): string {
  return useSyncExternalStore(noSubscribe, todayISO, () => "");
}

/**
 * This component never knows where a booking goes. It validates, calls
 * submitBooking(), and renders the result — see lib/booking.ts for the seam.
 */
export function BookingForm() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState<Booking>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Booking, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  const minDay = useToday();

  const set = <K extends keyof Booking>(key: K, value: Booking[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateBooking(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("pending");
    setFormError("");
    const result = await submitBooking(form);

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setFormError(result.error);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="ticks console relative px-7 py-14 text-center"
        initial={reduced ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="status"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
          Received
        </span>
        <h2 className="display-tight mt-4 text-[1.5rem]">{copy.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
          {copy.successBody}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="ticks console relative p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          index={0}
          id="firstName"
          label="First name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(v) => set("firstName", v)}
          autoComplete="given-name"
        />
        <Field
          index={1}
          id="lastName"
          label="Last name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(v) => set("lastName", v)}
          autoComplete="family-name"
        />
        <Field
          index={2}
          id="email"
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(v) => set("email", v)}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          index={3}
          id="business"
          label="Business name"
          value={form.business}
          error={errors.business}
          onChange={(v) => set("business", v)}
          autoComplete="organization"
        />

        <Row index={4} full>
          <div className="rule mb-6 mt-1" />
          <Label htmlFor="day">Preferred day</Label>
          <input
            id="day"
            name="day"
            type="date"
            value={form.day}
            min={minDay || undefined}
            onChange={(e) => set("day", e.target.value)}
            aria-invalid={!!errors.day}
            aria-describedby={errors.day ? "day-error" : undefined}
            className={`w-full rounded-xl border bg-panel-2 px-3.5 py-3 font-mono text-[0.9375rem] tabular-nums transition-colors duration-200 [color-scheme:dark] focus:border-signal ${
              errors.day ? "border-alert" : "border-line-bright"
            } ${form.day === "" ? "text-dim" : "text-text"}`}
          />
          <FieldError id="day-error" message={errors.day} />
        </Row>

        <Row index={5} full>
          <fieldset>
            <legend className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              Preferred time
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {TIME_WINDOWS.map((slot) => {
                const checked = form.window === slot.value;
                return (
                  <label
                    key={slot.value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3.5 transition-colors duration-200 ${
                      checked
                        ? "border-signal bg-signal/[0.08]"
                        : `bg-panel-2 hover:border-signal/50 ${
                            errors.window ? "border-alert" : "border-line-bright"
                          }`
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="window"
                        value={slot.value}
                        checked={checked}
                        onChange={() => set("window", slot.value)}
                        aria-describedby={
                          errors.window ? "window-error" : undefined
                        }
                        className="h-4 w-4 shrink-0 accent-[var(--color-signal)]"
                      />
                      <span
                        className={`text-[0.9375rem] font-medium ${
                          checked ? "text-signal" : "text-text"
                        }`}
                      >
                        {slot.label}
                      </span>
                    </span>
                    <span className="pl-[26px] font-mono text-[11px] tabular-nums text-dim">
                      {slot.hours}
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError id="window-error" message={errors.window} />
          </fieldset>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-dim">
            {copy.timezoneNote}
          </p>
        </Row>

        <Row index={6} full>
          <Label htmlFor="notes">Anything we should know? (optional)</Label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Roughly how many calls you miss in a week, what trade you're in..."
            className="w-full resize-y rounded-xl border border-line-bright bg-panel-2 px-3.5 py-3 text-[0.9375rem] text-text transition-colors duration-200 placeholder:text-dim focus:border-signal"
          />
        </Row>
      </div>

      <AnimatePresence>
        {status === "error" && formError && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-5 rounded-xl border border-alert/40 bg-alert/[0.07] px-4 py-3 text-sm text-alert"
          >
            {formError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "pending"}
        className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-signal px-6 py-4 text-[0.9375rem] font-semibold text-void transition-all duration-300 hover:bg-signal-soft hover:shadow-[0_10px_40px_-10px_rgb(var(--signal-rgb)/0.6)] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "pending" ? "Sending..." : copy.submit}
        {status !== "pending" && (
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
        )}
      </button>
    </form>
  );
}

function Row({
  children,
  index,
  full = false,
}: {
  children: React.ReactNode;
  index: number;
  full?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={full ? "sm:col-span-2" : ""}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
    >
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] text-alert">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  index,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  index: number;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  return (
    <Row index={index}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-panel-2 px-3.5 py-3 text-[0.9375rem] text-text transition-colors duration-200 focus:border-signal ${
          error ? "border-alert" : "border-line-bright"
        }`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </Row>
  );
}
