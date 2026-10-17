/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import UpcomingAppointment from "@/components/appointments/UpcomingAppointments";
import { authClient } from "@/lib/auth-client";
import { CalendarDays, Loader2 } from "lucide-react";

interface AppointmentType {
  id: string;
  _id?: string;
  patientName?: string;
  name?: string;
  email: string;
  date: string;
  time: string;
  service: string;
  address: string;
  status: string;
}

export default function UpcomingAppointmentsPage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait until session state settles
    if (isSessionPending) return;

    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }

    const fetchActiveAppointments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(session.user)
        const response = await fetch(
          `/api/appointments/active?email=${encodeURIComponent(session.user.id)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch active appointments.");
        }

        const data = await response.json();

        // Map fields to guarantee compatibility with your UpcomingAppointment component
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

    fetchActiveAppointments();
  }, [session, isSessionPending]);

  return (
    <main className="min-h-screen bg-blue-600 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Upcoming Appointments
          </h1>

          <p className="mt-2 text-blue-100">
            View and manage your upcoming appointments.
          </p>
        </div>

        {/* Content Container */}
        <div className="space-y-5">
          {isLoading || isSessionPending ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              <p className="mt-4 text-sm font-medium text-gray-600">
                Loading your appointments...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <p className="text-red-500 font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : appointments.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />

              <h2 className="mt-4 text-xl font-semibold">
                No Upcoming Appointments
              </h2>

              <p className="mt-2 text-gray-500">
                You don&apos;t have any upcoming or active appointments.
              </p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <UpcomingAppointment key={appointment.id} {...appointment} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
