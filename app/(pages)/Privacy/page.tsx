"use client";

import Link from "next/link";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We may collect your name, email address, phone number, appointment details, and other information you provide while using our healthcare services.",
  },
  {
    title: "2. Medical and Health Information",
    content:
      "With appropriate authorization, we may process medical histories, consultation notes, prescriptions, uploaded reports, and other health information needed to provide healthcare services.",
  },
  {
    title: "3. How We Use Your Information",
    content:
      "Your information may be used to manage appointments, facilitate consultations, maintain patient records, send notifications, improve our services, and respond to your requests.",
  },
  {
    title: "4. AI-Powered Consultation Features",
    content:
      "If you use our AI consultation features, recordings or transcripts may be processed to generate consultation summaries, key points, and follow-up suggestions. AI-generated content may contain errors and should be reviewed by a qualified healthcare professional before clinical use.",
  },
  {
    title: "5. Sharing of Information",
    content:
      "Information may be shared with authorized healthcare professionals and service providers when necessary to deliver our services, comply with applicable laws, or fulfill other lawful purposes.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement appropriate technical and organizational safeguards designed to protect personal and medical information from unauthorized access, disclosure, alteration, and loss.",
  },
  {
    title: "7. Data Retention",
    content:
      "We retain information for as long as reasonably necessary to provide our services and meet applicable legal, regulatory, and healthcare record-retention requirements.",
  },
  {
    title: "8. Cookies and Website Analytics",
    content:
      "Our website may use cookies and similar technologies to maintain login sessions, remember preferences, improve website performance, and understand how visitors use our services.",
  },
  {
    title: "9. Your Privacy Rights",
    content:
      "Subject to applicable law, you may request access to or correction of your personal information, request deletion where permitted, withdraw consent where applicable, and raise privacy concerns with our team.",
  },
  {
    title: "10. Third-Party Services",
    content:
      "Our platform may use third-party services for hosting, authentication, email delivery, AI processing, payments, or video consultations. These services may process information according to their applicable terms and privacy policies.",
  },
  {
    title: "11. Children's Privacy",
    content:
      "Where our services are used by children, personal and medical information must be handled in accordance with applicable laws and any required parent or guardian consent.",
  },
  {
    title: "12. Changes to This Policy",
    content:
      "We may revise this Privacy Policy as our services or legal requirements change. Any updated policy will be published on this page with a revised effective date.",
  },
];

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MedicalDecoration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M25 7h14M29 7v17L15 49a5 5 0 0 0 4 8h26a5 5 0 0 0 4-8L35 24V7" />
      <path d="M22 40h20M26 32h12" />
    </svg>
  );
}

export default function Privacy() {
  const lastUpdated = "October 19, 2026";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* Page banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2455f5] via-[#0865ff] to-[#08b6d8] px-4 py-10 text-white sm:px-5 sm:py-14">
        <MedicalDecoration className="absolute -right-3 -top-8 h-40 w-40 rotate-45 text-white/15 sm:right-8 sm:h-48 sm:w-48" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
            <span className="h-[3px] w-7 rounded-full bg-cyan-200" />
            MEDIFAST
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm text-blue-50"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* Policy content */}
      <section className="relative px-4 py-10 sm:px-5 sm:py-20">
        <MedicalDecoration className="pointer-events-none absolute left-5 top-12 hidden h-14 w-14 -rotate-12 text-blue-100 sm:block lg:left-12" />

        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="pointer-events-none absolute right-6 top-16 hidden h-14 w-14 rotate-12 text-blue-100 sm:block lg:right-12"
          aria-hidden="true"
        >
          <path d="M32 5v54M9 18c15 0 31 28 46 28M9 46c15 0 31-28 46-28M18 11l-9 7 9 7M46 39l9 7-9 7" />
        </svg>

        <div className="relative mx-auto max-w-4xl">
          {/* Intro */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <span className="h-1 w-7 rounded-full bg-blue-600" />
              YOUR PRIVACY MATTERS
            </div>

            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Your Privacy, <span className="text-blue-600">Our Priority</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              At MediFast, we are committed to protecting your personal
              information and medical records. Learn how your information is
              collected, used, and protected when you use our healthcare
              platform.
            </p>

            <p className="mt-4 text-xs text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Privacy commitment */}
          <div className="mb-8 flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
              <ShieldIcon />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Your health information deserves protection
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We aim to handle your personal data responsibly and restrict
                access to authorized individuals. Please review this policy
                to understand our privacy practices.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <article
                key={section.title}
                id={`privacy-${index + 1}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-[0_8px_30px_rgba(37,99,235,0.07)] sm:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white sm:h-10 sm:w-10 sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Contact card */}
          <section className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white sm:p-9">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-100">
                  WE ARE HERE TO HELP
                </p>

                <h2 className="text-2xl font-bold">
                  Questions about your privacy?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50">
                  Contact our team if you have questions about your personal
                  information or how your medical data is handled.
                </p>
              </div>

              <Link
                href="contact-us"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
              >
                Contact Us <span className="ml-2">→</span>
              </Link>
            </div>
          </section>

          <p className="mt-8 text-center text-xs leading-6 text-slate-400">
            This page is a general template and does not constitute legal
            advice. Ensure the published policy accurately reflects your
            actual data practices and applicable privacy and healthcare laws.
          </p>
        </div>
      </section>
    </main>
  );
}