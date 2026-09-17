/**
 * Every word on the marketing pages lives here so the client can review copy
 * in one file. Legal text (SMS consent, /privacy, /sms-terms, /sms-disclosure)
 * is deliberately NOT here — it is transcribed verbatim in its own routes and
 * must not be edited without compliance sign-off.
 */

export const hero = {
  eyebrow: "Missed-call recovery · Colorado",
  headline: "The next call you miss won't cost you the job.",
  sub: "You're under a sink and the phone rings out. Four seconds later ApexAutoFlow has texted that customer, written down what's wrong, and put them at the top of your callback list — ranked by what the job is worth.",
  primary: "Book a free call",
  secondary: "See how it works",
  trust: "Built for HVAC, plumbing, electrical and drain shops across Colorado.",
};

export const problem = {
  eyebrow: "The problem",
  headline: "Nobody leaves a voicemail. They call the next guy.",
  body: "You're on a roof, under a house, or elbow-deep in a panel. The phone rings out. That customer doesn't wait around — they are already dialling your competitor, and you never find out the job existed. For a shop doing real volume, that is thousands of dollars a month walking out quietly.",
  mathLead: "Run the arithmetic on your own shop.",
  math: [
    { label: "Calls you miss a week", value: "6" },
    { label: "Average ticket", value: "$420" },
    { label: "Even if you only closed one in three", value: "104 jobs" },
  ],
  mathTotal: 43680,
  mathTotalLabel: "walks out the door in a year",
  mathFootnote:
    "That is the arithmetic on six calls. Most shops we talk to miss more than six.",
};

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Four steps. You don't lift a finger until it's time to win the job.",
  steps: [
    {
      title: "The call rolls over",
      body: "Your line rings out the way it always does. Instead of dumping to voicemail, our system picks up and asks the caller one question: do you want a text? They press 1.",
      chip: "00:18 · No answer",
    },
    {
      title: "They get a text, in seconds",
      body: "One message, from your shop, asking what's wrong. They type it out or book a slot themselves. You are still on the job and haven't touched your phone.",
      chip: "00:22 · Text sent",
    },
    {
      title: "You get a ranked alert",
      body: "Text and email, with their name, number, what's broken, and a priority score. No heat in February outranks a slow drain, and you can see it at a glance.",
      chip: "01:11 · Ranked",
    },
    {
      title: "You call back and win it",
      body: "You already know the problem before you dial, so you show up with the right part on the truck and the customer thinks you're a mind reader.",
      chip: "01:26 · Booked",
    },
  ],
};

export const features = {
  eyebrow: "What you get",
  headline: "Your phone lines, finally organised.",
  items: [
    {
      title: "Four-second text-back",
      body: "Nobody sits in voicemail. The reply goes out while they're still holding the phone.",
    },
    {
      title: "Every lead written down",
      body: "Name, number and the problem in the customer's own words. Nothing lives in your head any more.",
    },
    {
      title: "Priority scoring",
      body: "Ranked by urgency and likely job value, so an emergency never sits underneath a quote request.",
    },
    {
      title: "Confirmations that send themselves",
      body: "Booked, reminded and on-the-way texts go out without anyone typing them.",
    },
    {
      title: "We build it, you don't",
      body: "Setup is done for you. Send us your details and we hand back a working system.",
    },
    {
      title: "Your number stays your number",
      body: "Nothing changes on your trucks, your yard signs or your Google listing.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why ApexAutoFlow",
  headline: "Cheaper than a hire. Simpler than a CRM.",
  body: "You don't need another dashboard you'll never log into, and you don't need someone on payroll to answer a phone. This does one job — it turns the calls you miss into work you booked — and it talks like a shop, not like software.",
  columns: ["ApexAutoFlow", "An office hire", "A generic CRM"],
  rows: [
    {
      label: "Monthly cost",
      values: ["From $79 a month", "Salary and benefits", "Per seat, plus onboarding"],
    },
    {
      label: "Answers at 7pm",
      values: ["Every time", "No", "Only if you're in it"],
    },
    {
      label: "Built for trades",
      values: ["It's all it does", "Depends who you get", "No"],
    },
    {
      label: "Who sets it up",
      values: ["We do", "You train them", "You do"],
    },
    {
      label: "What you have to learn",
      values: ["Nothing — it texts you", "Weeks of it", "Ask your team"],
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  headline: "Catch them, or answer them.",
  sub: "Both plans turn calls you can't take into work you booked. The difference is whether the phone actually gets picked up.",
  badge: "Founding spots open — our first clients lock in a reduced rate",
  cta: "Book a free call",
  plans: [
    {
      id: "essential",
      name: "Essential",
      tagline: "We catch the calls you miss.",
      amount: 79,
      cents: "",
      period: "/ month",
      note: "Plus a one-time setup. One recovered job usually covers the whole year.",
      featured: false,
      flag: "",
      includes: [
        "Missed-call text-back on your existing line",
        "Lead capture and priority scoring",
        "Appointment confirmations and reminders",
        "Done-for-you setup, and changes when you need them",
        "A person in Colorado who picks up when you call",
      ],
      meters: [],
      meterNote: "",
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "We answer them before they're missed.",
      amount: 199,
      cents: ".99",
      period: "/ month",
      note: "One flat rate. No contracts. Cancel anytime.",
      featured: true,
      flag: "Nothing goes to voicemail",
      includes: [
        "An AI agent answers every call the moment it comes in — no hold music, no voicemail",
        "Books appointments and takes the job details on the call",
        "Transfers to your team when a call needs a human, with a text alert before the phone rings",
        "A priority callback or a transcribed voicemail if nobody is free",
        "An immediate alert on anything urgent, whatever the hour",
        "A full summary after every call — who rang, what they need, how urgent it is",
      ],
      meters: [
        { label: "Call minutes", value: "500", unit: "/ mo" },
        { label: "Texts", value: "1,000", unit: "/ mo" },
      ],
      meterNote: "Need more? Add capacity as your volume grows.",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headline: "Questions, answered.",
  items: [
    {
      q: "Do I have to change my phone number?",
      a: "No. You keep your line, your number and your listings exactly as they are. We only pick up the calls you don't.",
    },
    {
      q: "How fast can I be running?",
      a: "Days, not weeks. You send us your details, we build it, you approve it. There is nothing for you to install and nothing to learn.",
    },
    {
      q: "Will my customers get spammed with texts?",
      a: "No. They only get a text if they ask for one — the system asks, and they press 1 on the keypad. After that it's about their job and nothing else, and STOP works at any time.",
    },
    {
      q: "What happens to calls that come in after hours?",
      a: "The same thing. They're caught, texted back, and waiting for you in priority order when you open up in the morning.",
    },
    {
      q: "What does it actually cost?",
      a: "Essential is $79 a month plus a one-time setup — we text back the calls you miss. Premium is $199.99 a month with no setup and no contract, and an AI agent picks up every call live. Founding clients lock in a reduced rate. Book a call and we'll tell you which one fits your volume.",
    },
  ],
};

export const getStarted = {
  eyebrow: "Get started",
  headline: "Let's find out what you're missing.",
  body: "Fifteen minutes on the phone. We'll look at your call volume and tell you roughly how many jobs a month are going to the next guy. No pressure, no jargon, no slide deck.",
  submit: "Book a free call",
  emailPrompt: "Prefer email?",
  successTitle: "Got it — we'll be in touch.",
  successBody:
    "We'll reach out shortly to book your free call. If it's urgent, email us and we'll move faster.",
};

/** The scripted call that plays in the hero console. */
export const heroCall = {
  number: "(719) 555-0142",
  location: "Colorado Springs, CO",
  outbound:
    "Sorry we missed you! Tell us what's going on and we'll get someone out. Reply STOP to opt out.",
  inbound: "Furnace is out. No heat at all, and we've got two kids at home.",
  score: 92,
  tag: "No heat · Emergency",
  estimate: "$480 – $1,100",
};

/** The /book page. Legal text is not here — see the note at the top. */
export const booking = {
  eyebrow: "Book a free call",
  headline: "Pick a time. We'll do the rest.",
  body: "Fifteen minutes on the phone. We'll look at your call volume and tell you roughly how many jobs a month are going to the next guy. No pressure, no jargon, no slide deck.",
  submit: "Request this time",
  timezoneNote:
    "All times Mountain Time. We'll email you to confirm the exact slot — if the window you picked is full we'll offer the nearest one.",
  emailPrompt: "Rather just email?",
  successTitle: "Got it — check your inbox.",
  successBody:
    "We'll confirm your call by email shortly. If it's urgent, email us directly and we'll move faster.",
  /** The three things a shop owner wants to know before giving up a quarter hour. */
  reassurance: [
    {
      title: "Fifteen minutes, not an hour",
      body: "We keep it short because you're working. If we can't tell you something useful in fifteen minutes, we've wasted your time and ours.",
    },
    {
      title: "No contract, no card",
      body: "It's a conversation about your call volume. Nothing to sign, nothing to pay, and no follow-up sequence if you decide it isn't for you.",
    },
    {
      title: "We'll bring numbers",
      body: "Come with a rough idea of how many calls you miss in a week and we'll do the arithmetic with you on the call.",
    },
  ],
};
