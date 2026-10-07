"use client";

import React from "react";
import {
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  User,
  Stethoscope,
  CheckCircle2,
  Clock3,
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
  const isConfirmed = status.toLowerCase() === "confirmed";

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Top Bar: Service Tag & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Appointment #{id}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{service}</h3>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isConfirmed
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {isConfirmed ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <Clock3 className="h-3.5 w-3.5 text-amber-600" />
          )}
          <span>{status}</span>
        </div>
      </div>

      {/* Appointment Details Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Patient Name */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Patient Name</p>
            <p className="text-sm font-semibold text-gray-800">{name}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Date & Time</p>
            <p className="text-sm font-semibold text-gray-800">{date}</p>
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <Clock className="h-3 w-3" /> {time}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-400">Email</p>
            <p
              className="truncate text-sm font-semibold text-gray-800"
              title={email}
            >
              {email}
            </p>
          </div>
        </div>

        {/* Location / Address */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Location</p>
            <p className="text-sm font-semibold text-gray-800">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
