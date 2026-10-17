"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
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
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-blue-600">
              Patient Management
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              Register New Patient
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter the patient's details to create a patient record.
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="doctorId"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Assigned Doctor ID
              </label>

              <input
                id="doctorId"
                type="text"
                value={doctorId}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
              />

              <p className="mt-1 text-xs text-gray-500">
                This patient will be associated with the configured doctor ID.
              </p>
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
