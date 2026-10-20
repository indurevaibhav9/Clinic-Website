"use client";

import Link from "next/link";

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the MediFast website, you agree to these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using the website.",
  },
  {
    title: "2. Description of Services",
    content:
      "MediFast provides healthcare-related website features, which may include doctor information, appointment requests, patient dashboards, consultation management, medical records, and communication tools. Available features may vary depending on your account and the services enabled.",
  },
  {
    title: "3. User Accounts and Responsibilities",
    content:
      "You are responsible for providing accurate information, maintaining the confidentiality of your login credentials, and notifying us if you suspect unauthorized access to your account. You must not impersonate another person or use the platform for unlawful purposes.",
  },
  {
    title: "4. Appointments and Cancellations",
    content:
      "Appointment requests are subject to availability and confirmation. Please check the appointment details and follow the cancellation or rescheduling instructions provided by the platform or healthcare provider. Submitting a request does not necessarily guarantee an appointment.",
  },
  {
    title: "5. Medical Disclaimer",
    content:
      "Website content is provided for general informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding medical concerns. In an emergency, contact your local emergency services immediately.",
  },
  {
    title: "6. AI-Generated Content",
    content:
      "Certain features may use artificial intelligence to generate consultation transcripts, summaries, key points, or follow-up suggestions. AI-generated content may be inaccurate or incomplete and must not be treated as an independent diagnosis or prescription. A qualified healthcare professional should review such content before clinical use.",
  },
  {
    title: "7. Patient Information and Privacy",
    content:
      "Your use of the platform is also subject to our Privacy Policy. You should provide personal or medical information only through the appropriate platform features and when authorized to do so. Access to patient information must be limited to legitimate, permitted purposes.",
  },
  {
    title: "8. Payments and Fees",
    content:
      "Where paid services are offered, applicable fees, payment terms, and any cancellation or refund conditions will be communicated before payment. Online payments, if available, may be processed through third-party payment providers.",
  },
  {
    title: "9. Acceptable Use",
    content:
      "You must not interfere with the platform's operation, attempt unauthorized access, introduce malicious code, misuse another person's information, or use the website in a way that violates applicable laws or the rights of others.",
  },
  {
    title: "10. Intellectual Property",
    content:
      "Unless otherwise stated, the website's design, branding, text, graphics, software, and other materials are owned by or licensed to the relevant rights holder. You may not reproduce, distribute, modify, or commercially exploit protected materials without appropriate permission.",
  },
  {
    title: "11. Third-Party Services and Links",
    content:
      "The platform may link to or integrate with third-party services, including communication, payment, authentication, and AI providers. These services may be governed by their own terms and policies. MediFast does not necessarily control third-party services or their availability.",
  },
  {
    title: "12. Service Availability",
    content:
      "We aim to keep the website available and functioning reliably but do not guarantee uninterrupted access. Features may be modified, suspended, or temporarily unavailable for maintenance, security, technical, or operational reasons.",
  },
  {
    title: "13. Limitation of Liability",
    content:
      "To the extent permitted by applicable law, MediFast and the relevant service operators will not be liable for indirect or consequential losses arising from use of the website. Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by law.",
  },
  {
    title: "14. Changes to These Terms",
    content:
      "We may revise these Terms and Conditions as our services or legal requirements change. Updated terms will be published on this page with a revised effective date. Your continued use of the platform after changes take effect may constitute acceptance where permitted by applicable law.",
  },
  {
    title: "15. Governing Law and Contact",
    content:
      "These terms are subject to applicable laws and any mandatory consumer or healthcare protections. Contact our team if you have questions about these terms or need clarification about the services offered through MediFast.",
  },
];

function MedicalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="M12 8v8M8 12h8" />
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
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M25 7h14M29 7v17L15 49a5 5 0 0 0 4 8h26a5 5 0 0 0 4-8L35 24V7" />
      <path d="M22 40h20M26 32h12" />
    </svg>
  );
}

export default function Terms() {
  const lastUpdated = "October 19, 2026";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* Gradient page banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2455f5] via-[#0865ff] to-[#08b6d8] px-5 py-12 text-white sm:py-14">
        <MedicalDecoration className="absolute -right-3 -top-8 h-40 w-40 rotate-45 text-white/15 sm:right-8 sm:h-48 sm:w-48" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
            <span className="h-[3px] w-7 rounded-full bg-cyan-200" />
            MEDIFAST
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms &amp; Conditions
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center gap-2 text-sm text-blue-50"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Terms &amp; Conditions</span>
          </nav>
        </div>
      </section>

      {/* Main terms content */}
      <section className="relative px-5 py-14 sm:py-20">
        <MedicalDecoration className="pointer-events-none absolute left-5 top-12 hidden h-14 w-14 -rotate-12 text-blue-100 sm:block lg:left-12" />

        <div className="relative mx-auto max-w-4xl">
          {/* Introduction */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <span className="h-1 w-7 rounded-full bg-blue-600" />
              PLEASE READ CAREFULLY
            </div>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Clear Terms for Your{" "}
              <span className="text-blue-600">Healthcare Journey</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              These Terms and Conditions explain the rules and responsibilities
              that apply when you access or use MediFast's healthcare platform
              and related services.
            </p>

            <p className="mt-4 text-xs text-slate-400">
              Effective / last updated: {lastUpdated}
            </p>
          </div>

          {/* Notice card */}
          <div className="mb-8 flex gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
              <MedicalIcon />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Your responsibilities matter
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                By using MediFast, you agree to use the platform responsibly,
                provide accurate information, and follow the applicable
                instructions of your healthcare provider.
              </p>
            </div>
          </div>

          {/* Terms cards */}
          <div className="space-y-4">
            {termsSections.map((section, index) => (
              <article
                key={section.title}
                id={`terms-${index + 1}`}
                className="group scroll-mt-8 rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-200 hover:shadow-[0_8px_30px_rgba(37,99,235,0.07)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
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

          {/* Contact section */}
          <section className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white sm:p-9">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-100">
                  NEED CLARIFICATION?
                </p>

                <h2 className="text-2xl font-bold">
                  Have questions about our terms?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50">
                  Our team can help clarify questions about the platform,
                  appointments, and the services we provide.
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
            This template is for general informational purposes and is not
            legal advice. Customize it to reflect your actual services,
            policies, payment arrangements, and applicable laws before
            publishing.
          </p>
        </div>
      </section>
    </main>
  );
}