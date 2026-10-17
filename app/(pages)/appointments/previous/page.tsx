/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PreviousAppointment from "@/components/appointments/PreviousAppointment";
import { authClient } from "@/lib/auth-client";
import { CalendarDays, Loader2 } from "lucide-react";

interface AppointmentType {
  id: string;
  _id?: string;
  name?: string;
  patientName?: string;
  email?: string;
  date: string;
  time: string;
  service: string;
  address: string;
  status: string;
}

export default function PreviousAppointmentsPage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSessionPending) return;

    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }

    const fetchCompletedAppointments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/appointments/completed?email=${encodeURIComponent(session.user.id)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch completed appointments.");
        }

        const data = await response.json();

        const formattedAppointments = (data.appointments || []).map(
          (item: any) => ({
            id: item._id || item.id,
            name: item.patientName || item.name || "N/A",
            email: item.email,
            date: item.date
              ? new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : item.date,
            time: item.time,
            service: item.service,
            address: item.address,
            status: item.status,
          }),
        );

        setAppointments(formattedAppointments);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedAppointments();
  }, [session, isSessionPending]);

  return (
    <main className="min-h-screen bg-blue-600 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Previous Appointments
          </h1>

          <p className="mt-2 text-blue-100">
            View your previous appointment history.
          </p>
        </div>

        {/* Appointment List Container */}
        <div className="space-y-4">
          {isLoading || isSessionPending ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-md">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              <p className="mt-4 text-sm font-medium text-gray-600">
                Loading your appointment history...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-md">
              <p className="font-semibold text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : appointments.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-md">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />

              <h2 className="mt-4 text-xl font-semibold">
                No Previous Appointments
              </h2>

              <p className="mt-2 text-gray-500">
                Your completed appointment history will appear here.
              </p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <PreviousAppointment key={appointment.id} {...appointment} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
