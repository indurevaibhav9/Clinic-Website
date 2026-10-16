
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ConsultationRecorder from "../../../(pages)/consultations/page";

type Consultation = {
  id: string;
  patientId: string;
  doctorId: string;
  transcript: string;
  summary: string;
  keyPoints: string[];
  followUp: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function PatientPage() {
  const params = useParams<{ patientId: string }>();

  // Hardcoded values retained as requested.
  const patientId = params.patientId;
  const doctorId = "671a1234567890abcdef1234";

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const loadConsultations = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/patients/${patientId}/consultations`,
          {
            cache: "no-store",
            signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load consultations."
          );
        }

        setConsultations(data.consultations ?? []);
      } catch (err) {
        if (
          err instanceof Error &&
          err.name !== "AbortError"
        ) {
          setError(err.message);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [patientId]
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadConsultations(controller.signal);

    return () => controller.abort();
  }, [loadConsultations, refreshKey]);

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-bold">Patient Details</h1>

        <p className="mt-2 text-sm text-gray-600">
          Patient ID: {patientId}
        </p>
      </header>

      {/* Consultation recording */}
      <ConsultationRecorder
        patientId={patientId}
        doctorId={doctorId}
        onSaved={() => setRefreshKey((previous) => previous + 1)}
      />

      {/* Saved consultation history */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Consultation History
        </h2>

        {loading && <p>Loading consultations...</p>}

        {error && (
          <div className="space-y-2">
            <p className="text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => setRefreshKey((previous) => previous + 1)}
              className="rounded border px-4 py-2"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && consultations.length === 0 && (
          <p className="rounded border p-4">
            No consultations found for this patient.
          </p>
        )}

        {consultations.map((consultation) => (
          <article
            key={consultation.id}
            className="space-y-4 rounded-lg border p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">Consultation</h3>

              <span className="rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                {consultation.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {new Date(consultation.createdAt).toLocaleString()}
            </p>

            <div>
              <h4 className="font-medium">AI Summary — review required</h4>
              <p className="mt-1 whitespace-pre-wrap">
                {consultation.summary}
              </p>
            </div>

            <div>
              <h4 className="font-medium">Key Points</h4>

              {consultation.keyPoints?.length ? (
                <ul className="list-disc space-y-1 pl-6">
                  {consultation.keyPoints.map((point, index) => (
                    <li key={`${consultation.id}-point-${index}`}>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None documented.</p>
              )}
            </div>

            <div>
              <h4 className="font-medium">Follow-up</h4>

              {consultation.followUp?.length ? (
                <ul className="list-disc space-y-1 pl-6">
                  {consultation.followUp.map((item, index) => (
                    <li key={`${consultation.id}-followup-${index}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None documented.</p>
              )}
            </div>

            <details className="rounded bg-gray-50 p-3">
              <summary className="cursor-pointer font-medium">
                View full transcript
              </summary>

              <p className="mt-3 whitespace-pre-wrap">
                {consultation.transcript}
              </p>
            </details>
          </article>
        ))}
      </section>
    </main>
  );
}