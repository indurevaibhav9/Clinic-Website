"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { patientSchema } from "@/lib/validation";
import { InlineError } from "@/components/ui/inline-error";

type PatientResponse = {
  success: boolean;
  message: string;
  patient?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
};

export default function RegisterPatientPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Hardcoded doctor ID as requested in your previous code.
  const [doctorId] = useState("671a1234567890abcdef1234");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validation = patientSchema.safeParse({ name, email, phone });
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setFieldErrors(errors);
      setError("Please correct the highlighted fields.");
      return;
    }

    try {
      setLoading(true);
      setFieldErrors({});

      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validation.data,
          doctorId,
        }),
      });

      const data: PatientResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to register patient.");
      }

      setSuccess("Patient registered successfully!");

      setName("");
      setEmail("");
      setPhone("");

      // Open the newly registered patient's details page.
      if (data.patient?.id) {
        setTimeout(() => {
          router.push(`/patient-list`);
        }, 1000);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-blue-600">
              Patient Management
            </p>

            <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Register New Patient
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter the patient&apos;s details to create a patient record.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter patient's full name"
                required
                maxLength={100}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "patient-name-error" : undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <InlineError id="patient-name-error" message={fieldErrors.name} />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="patient@example.com"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "patient-email-error" : undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <InlineError id="patient-email-error" message={fieldErrors.email} />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter phone number"
                required
                maxLength={20}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "patient-phone-error" : undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <InlineError id="patient-phone-error" message={fieldErrors.phone} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Registering Patient..." : "Register Patient"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
