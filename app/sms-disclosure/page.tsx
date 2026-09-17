import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "SMS Text-Back Program",
  description:
    "How and when you may receive a text message from a business that uses ApexAutoFlow's automated missed-call text-back service.",
};

/* Body text transcribed verbatim from the published /sms-disclosure page.
   Do not reword without compliance sign-off. */
export default function SmsDisclosure() {
  return (
    <LegalPage
      title="SMS Text-Back Program"
      effective="Effective date: July 1, 2026"
      seeAlso={[
        { label: "Privacy Policy", href: "/privacy" },
        { label: "SMS Terms & Consent", href: "/sms-terms" },
      ]}
    >
      <p>
        This page explains how and when you may receive a text message from a
        business that uses ApexAutoFlow&rsquo;s automated missed-call text-back
        service.
      </p>

      <h2>How the program works</h2>
      <p>
        SOPS Finance &amp; Accounting LLC, operating as ApexAutoFlow, sends
        automated customer-care text messages to consumers in the trades industry
        (HVAC, plumbing, electrical, and drain service). Here is how it works:
      </p>
      <ul>
        <li>
          <strong>You call a business</strong> that uses ApexAutoFlow and the call
          goes unanswered.
        </li>
        <li>
          <strong>An automated voice system answers</strong> and asks if you would
          like to receive a text message so you can describe your issue or
          schedule service.
        </li>
        <li>
          <strong>You press 1 to opt in.</strong> This confirms your consent, and
          you receive one text message inviting you to describe your service issue
          or book an appointment. If you press 2, stay on the line, or hang up, no
          text is sent.
        </li>
        <li>
          <strong>If you respond and schedule service,</strong> you may receive
          additional texts related to that appointment — such as a confirmation
          and a reminder.
        </li>
        <li>
          <strong>If you do not respond,</strong> you will not receive any further
          messages.
        </li>
      </ul>

      <h2>Consent</h2>
      <div className="callout">
        <p>
          You provide <strong>explicit consent</strong> to receive a text message
          by pressing 1 on your phone&rsquo;s keypad during the automated voice
          prompt. This keypress confirms that you agree to receive a follow-up
          SMS. If you press 2, stay on the line, or hang up, no text message is
          sent. By responding to the text and scheduling an appointment, you
          consent to receive additional service-related messages (appointment
          confirmations and reminders) from that business.
        </p>
        <p>
          <strong>Consent is not required to receive service.</strong> You can
          contact the business by other means (email, visiting in person) without
          receiving text messages. Text messaging consent is not a condition of
          any purchase or service.
        </p>
      </div>

      <h2>Message frequency</h2>
      <p>
        Message frequency varies. If you opt in by pressing 1, you will receive
        one initial text per missed call. If you schedule an appointment, you may
        receive a small number of additional messages (typically 1&ndash;3)
        related to that specific appointment.
      </p>

      <h2>Message and data rates</h2>
      <p>
        Message and data rates may apply, depending on your mobile carrier and
        plan.
      </p>

      <h2>How to opt out</h2>
      <p>
        You can stop receiving messages at any time by replying{" "}
        <strong>STOP</strong> to any text message. You will receive one
        confirmation and no further messages will be sent. To resume messages,
        reply <strong>START</strong>.
      </p>

      <h2>How to get help</h2>
      <p>
        Reply <strong>HELP</strong> to any message for assistance, or contact us
        at{" "}
        <a href="mailto:admin.apexautoflow@gmail.com">
          admin.apexautoflow@gmail.com
        </a>
        .
      </p>

      <h2>What messages look like</h2>
      <p>Here are examples of the types of messages you may receive:</p>
      <div className="callout">
        <p>
          <strong>After you press 1 (opt-in):</strong> &ldquo;Hi, thanks for
          calling [Business Name] — sorry we missed you! Tell us what you need
          here: [link to service request form] or book a call: [link to scheduling
          page]. Reply STOP to opt out, HELP for help.&rdquo;
        </p>
        <p>
          <strong>Appointment reminder:</strong> &ldquo;[Business Name]: Reminder
          — your appointment is tomorrow, [date] at [time]. Our technician will
          arrive ready to help. Reply STOP to opt out, HELP for help.&rdquo;
        </p>
        <p>
          <strong>Technician on the way:</strong> &ldquo;[Business Name]: Our
          technician is on the way and should arrive shortly. Thank you for
          choosing us! Reply STOP to opt out, HELP for help.&rdquo;
        </p>
        <p>
          <strong>Post-service follow-up:</strong> &ldquo;[Business Name]: Thanks
          for choosing us! If you need anything else or have questions about the
          work completed, don&rsquo;t hesitate to reach out. Reply STOP to opt
          out, HELP for help.&rdquo;
        </p>
      </div>

      <h2>Privacy</h2>
      <p>
        We do not sell your personal information. Mobile information and SMS
        consent data are never shared with third parties or affiliates for
        marketing or promotional purposes. See our full{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Program operator</h2>
      <p>
        SOPS Finance &amp; Accounting LLC (operating as ApexAutoFlow)
        <br />
        Email:{" "}
        <a href="mailto:admin.apexautoflow@gmail.com">
          admin.apexautoflow@gmail.com
        </a>
        <br />
        <Link href="/">apexautoflow.com</Link>
      </p>
    </LegalPage>
  );
}
