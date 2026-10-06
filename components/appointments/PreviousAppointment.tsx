import {
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
} from "lucide-react";

export interface PreviousAppointmentProps {
  id: string;
  date: string;
  time: string;
  service: string;
  address: string;
  status: string;
}

export default function PreviousAppointment({
  id,
  date,
  time,
  service,
  address,
  status,
}: PreviousAppointmentProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Top */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Appointment #{id}
          </p>

          <h2 className="mt-1 text-lg font-semibold text-gray-900">
            {service}
          </h2>
        </div>

        <span className="w-fit rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600">
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-3">
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

        {/* Location */}
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-gray-500">
              Location
            </p>

            <p className="font-medium">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="mt-4 flex items-center gap-3">
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

      {/* Action */}
      <div className="mt-5 flex justify-end border-t pt-4">
        <button
          type="button"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}