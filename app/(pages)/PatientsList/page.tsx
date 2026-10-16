"use client";

import { useCallback, useEffect, useState } from "react";

type Patient = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  assignedDoctorId: string;
  createdAt: string;
};

type Props = {
  doctorId: string;

};

export default function PatientsList({ doctorId="671a1234567890abcdef1234" }: Props) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPatients = useCallback(
    async (pageNumber: number, append: boolean, query: string) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          doctorId,
          page: String(pageNumber),
          search: query,
        });

        const response = await fetch(`/api/patients?${params}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load patients.");
        }

        setPatients((previous) =>
          append ? [...previous, ...data.patients] : data.patients
        );
        setHasMore(data.hasMore);
        setPage(pageNumber);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load patients."
        );
      } finally {
        setLoading(false);
      }
    },
    [doctorId]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadPatients(1, false, search);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search, loadPatients]);

  // Refresh the first page periodically to show new registrations.
  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadPatients(1, false, search);
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [loadPatients, search]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">All Patients</h2>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name, email or phone..."
        className="w-full rounded border p-2"
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Registered</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b">
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.email}</td>
                <td className="p-2">{patient.phone}</td>
                <td className="p-2">
                  {new Date(patient.createdAt).toLocaleString()}
                </td>
                <td className="p-2">
                  <a
                    href={`/PatientsList/${patient._id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}

            {!loading && patients.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && <p>Loading patients...</p>}

      {hasMore && !loading && (
        <button
          type="button"
          onClick={() => void loadPatients(page + 1, true, search)}
          className="rounded border px-4 py-2"
        >
          Load More (20)
        </button>
      )}
    </section>
  );
}