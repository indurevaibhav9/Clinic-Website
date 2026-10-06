import UpcomingAppointment from "@/components/appointments/UpcomingAppointments";
import {
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  User,
  Stethoscope,
} from "lucide-react";

export default function UpcomingAppointmentsPage() {
  const appointments = [
    {
      id: "1024",
      name: "Vaibhav Indure",
      email: "vaibhav@gmail.com",
      date: "12 October 2026",
      time: "10:30 AM",
      service: "General Consultation",
      address: "Pune, Maharashtra",
      status: "Confirmed",
    },
    {
      id: "1025",
      name: "Vaibhav Indure",
      email: "vaibhav@gmail.com",
      date: "20 October 2026",
      time: "4:00 PM",
      service: "Follow-up Consultation",
      address: "Pune, Maharashtra",
      status: "Confirmed",
    },
  ];

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

        {/* Appointments */}
        <div className="space-y-5">
          {appointments.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />

              <h2 className="mt-4 text-xl font-semibold">
                No Upcoming Appointments
              </h2>

              <p className="mt-2 text-gray-500">
                You dont have any upcoming appointments.
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