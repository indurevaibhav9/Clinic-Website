"use client";

import { useState } from "react";

export default function ReadMoreSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        About MediFast
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        MediFast helps patients connect with healthcare professionals and
        access convenient healthcare services.
      </p>

      {isExpanded && (
        <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
          <p>
            Patients can explore medical services, view doctor information,
            request appointments, and manage their healthcare journey through
            our platform.
          </p>

          <p>
            Our platform may also provide patient dashboards, consultation
            summaries, appointment reminders, and other digital healthcare
            features, depending on the services enabled.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        aria-expanded={isExpanded}
        className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-cyan-600"
      >
        {isExpanded ? "Read Less" : "Read More"}

        <span
          className={`inline-block transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>
    </section>
  );
}