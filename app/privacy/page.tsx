import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SOPS Finance & Accounting LLC, operating as ApexAutoFlow, collects, uses, and protects your information.",
};

/* Body text transcribed verbatim from the published /privacy page.
   Do not reword without compliance sign-off. */
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effective="Effective date: July 1, 2026"
      seeAlso={[
        { label: "SMS Terms & Consent", href: "/sms-terms" },
        { label: "SMS Text-Back Program", href: "/sms-disclosure" },
      ]}
    >
      <p>
        This Privacy Policy explains how SOPS Finance &amp; Accounting LLC,
        operating as ApexAutoFlow (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
        &ldquo;our&rdquo;), collects, uses, and protects information when you
        contact us, use our services, or visit apexautoflow.com (the
        &ldquo;Site&rdquo;).
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you call us, reply to our
        texts, submit a form, or book an appointment, we may collect your name,
        phone number, email address, and the details of your service request or
        issue.
      </p>
      <p>
        <strong>Information collected automatically.</strong> When you visit the
        Site, we may collect basic usage and device information (such as browser
        type and pages viewed) through standard web technologies.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiry and follow up on calls we missed;</li>
        <li>To schedule, confirm, and provide the services you request;</li>
        <li>
          To send you service-related text messages and appointment
          confirmations;
        </li>
        <li>To operate, maintain, and improve our services.</li>
      </ul>

      <h2>Text messaging (SMS)</h2>
      <p>
        When you call a business that uses ApexAutoFlow and the call goes
        unanswered, an automated voice system (IVR) answers and asks whether you
        would like to receive a text message. You provide explicit consent by
        pressing 1 on your phone&rsquo;s keypad. If you opt in, we send a single
        text message to the phone number you called from, inviting you to
        describe your issue or book an appointment. If you press 2, stay on the
        line, or hang up, no text is sent. If you respond to the text and
        schedule service, we send appointment confirmations and reminders related
        to that service request. We do not send unsolicited or marketing
        messages. Consent to receive texts is not required to receive service.
        You can opt out at any time by replying STOP. Reply HELP for help.
        Message and data rates may apply. See our{" "}
        <Link href="/sms-terms">SMS Terms &amp; Consent</Link> for full details.
      </p>
      <div className="callout">
        <p>
          <strong>No mobile information will be sold,</strong> and no mobile
          information or SMS/text-messaging consent will be shared with third
          parties or affiliates for marketing or promotional purposes.
        </p>
      </div>

      <h2>How we share information</h2>
      <p>We do not sell your personal information. We share information only:</p>
      <ul>
        <li>
          with service providers that help us operate (for example, Twilio for
          messaging, Make.com for automation, and Google for forms, calendars,
          and storage), who may use it only to provide services to us;
        </li>
        <li>when required by law or to protect our legal rights.</li>
      </ul>
      <p>
        Mobile information and SMS consent data are never shared with third
        parties or affiliates for marketing or promotional purposes.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your information only as long as needed to provide our services
        and meet legal or business requirements, and then delete or anonymize it.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable administrative and technical safeguards to protect your
        information. No method of transmission or storage is completely secure,
        so we cannot guarantee absolute security.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>Text messages:</strong> reply STOP to opt out at any time.
        </li>
        <li>
          <strong>Access or deletion:</strong> you may request a copy or deletion
          of your personal information by contacting us below.
        </li>
      </ul>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        Our services are not directed to children under 13, and we do not
        knowingly collect their information.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The effective date
        above shows when it was last revised.
      </p>

      <h2>Contact us</h2>
      <p>
        SOPS Finance &amp; Accounting LLC (operating as ApexAutoFlow)
        <br />
        Email:{" "}
        <a href="mailto:admin.apexautoflow@gmail.com">
          admin.apexautoflow@gmail.com
        </a>
        <br />
        apexautoflow.com
      </p>
    </LegalPage>
  );
}
