import {
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
  User,
  Mail,
} from "lucide-react";

export interface UpcomingAppointmentProps {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
  address: string;
  status: string;
}

export default function UpcomingAppointment({
  id,
  name,
  email,
  date,
  time,
  service,
  address,
  status,
}: UpcomingAppointmentProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <p className="text-sm text-gray-500">
            Appointment #{id}
          </p>

          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            {service}
          </h2>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="grid gap-4 py-5 sm:grid-cols-2">
        {/* Patient */}
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Patient
            </p>

            <p className="font-medium">
              {name}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {email}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Date
            </p>

            <p className="font-medium">
              {date}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Time
            </p>

            <p className="font-medium">
              {time}
            </p>
          </div>
        </div>

        {/* Service */}
        <div className="flex items-center gap-3">
          <Stethoscope className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Service
            </p>

            <p className="font-medium">
              {service}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Address
            </p>

            <p className="font-medium">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end border-t pt-4">
        <button
          type="button"
          className="rounded-lg border border-red-500 px-5 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}