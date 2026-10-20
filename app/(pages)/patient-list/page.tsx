"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  ChevronRight,
  UserRound,
  RefreshCw,
  UserPlus,
  X,
} from "lucide-react";

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

export default function PatientsList({
  doctorId = "671a1234567890abcdef1234",
}: Props) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

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
          append ? [...previous, ...data.patients] : data.patients,
        );
        setHasMore(data.pagination?.hasMore ?? data.hasMore ?? false);
        setPage(pageNumber);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load patients.",
        );
      } finally {
        setLoading(false);
      }
    },
    [doctorId],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadPatients(1, false, search);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search, loadPatients, refreshKey]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRefreshKey((key) => key + 1);
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const getInitials = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();


      useEffect(() => {
  if (!doctorId) return;

  const eventSource = new EventSource(
    `/api/patients/events?doctorId=${encodeURIComponent(doctorId)}`
  );

  eventSource.addEventListener("patient-registered", () => {
    // Fetch the latest list without a page refresh.
    void loadPatients(1, false, search);
  });

  eventSource.onerror = (error) => {
    console.error("Patient SSE connection error:", error);
    // EventSource automatically attempts to reconnect.
  };

  return () => {
    eventSource.close();
  };
}, [doctorId, loadPatients, search]);

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-6 text-slate-800 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Users size={16} />
              <span>Patient Management</span>
              <ChevronRight size={14} />
              <span className="text-slate-700 dark:text-slate-200">
                All Patients
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              All Patients
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              View, search and manage your registered patients.
            </p>
          </div>

          <Link
            href="/patient-list/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <UserPlus size={18} />
            Register Patient
          </Link>
        </div>

        {/* Summary card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Users size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Patients loaded
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {patients.length}
                {hasMore ? "+" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Patient table card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Patient Directory
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Search patient details and open their profiles.
              </p>
            </div>

      
          </div>

          {/* Search */}
          <div className="border-b border-slate-100 p-4 sm:p-5 dark:border-slate-800">
            <div className="relative max-w-lg">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email or phone..."
                aria-label="Search patients"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-950"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="m-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => setRefreshKey((key) => key + 1)}
                className="self-start font-semibold underline underline-offset-4 sm:self-auto"
              >
                Try again
              </button>
            </div>
          )}

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Contact Information</th>
                  <th className="px-5 py-4">Registered On</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {getInitials(patient.name) || <UserRound size={18} />}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {patient.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Patient ID: {patient._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <Mail size={14} className="shrink-0 text-slate-400" />
                          <span>{patient.email || "Not provided"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <Phone
                            size={14}
                            className="shrink-0 text-slate-400"
                          />
                          <span>{patient.phone || "Not provided"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-slate-400"
                        />
                        {formatDate(patient.createdAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/patient-list/${patient._id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      >
                        <Eye size={15} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

                {loading &&
                  patients.length === 0 &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      {Array.from({ length: 4 }).map((__, cellIndex) => (
                        <td key={cellIndex} className="px-5 py-5">
                          <div className="h-4 animate-pulse rounded-md bg-slate-100 dark:bg-slate-800" />
                        </td>
                      ))}
                    </tr>
                  ))}

                {!loading && !error && patients.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <Users size={26} />
                      </div>
                      <h3 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
                        {search ? "No matching patients" : "No patients yet"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {search
                          ? "Try another name, email or phone number."
                          : "Registered patients will appear here."}
                      </p>
                      {search && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer and pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {patients.length}
              </span>{" "}
              {patients.length === 1 ? "patient" : "patients"} loaded
            </p>

            {hasMore && (
              <button
                type="button"
                onClick={() => void loadPatients(page + 1, true, search)}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {loading ? "Loading..." : "Load More Patients"}
                {!loading && <ChevronRight size={16} />}
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
