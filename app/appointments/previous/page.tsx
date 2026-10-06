import PreviousAppointment from "@/components/appointments/PreviousAppointment";
import {
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
} from "lucide-react";

export default function PreviousAppointmentsPage() {
  const appointments = [
    {
      id: "1008",
      date: "15 September 2026",
      time: "11:00 AM",
      service: "General Consultation",
      address: "Pune, Maharashtra",
      status: "Completed",
    },
    {
      id: "1002",
      date: "28 August 2026",
      time: "3:30 PM",
      service: "Follow-up Consultation",
      address: "Pune, Maharashtra",
      status: "Completed",
    },
    {
      id: "998",
      date: "10 August 2026",
      time: "12:00 PM",
      service: "Health Consultation",
      address: "Pune, Maharashtra",
      status: "Completed",
    },
  ];

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

        {/* Appointment List */}
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />

              <h2 className="mt-4 text-xl font-semibold">
                No Previous Appointments
              </h2>

              <p className="mt-2 text-gray-500">
                Your appointment history will appear here.
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