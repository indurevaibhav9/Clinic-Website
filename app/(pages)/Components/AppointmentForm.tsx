'use client'

import { authClient } from "@/lib/auth-client";
import { ChevronDown, Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction, Suspense, useState } from "react";
import { toast } from "sonner";
import { LoginRequiredDialog } from "./LoginRequiredDialogue";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type AppointmentFormProps = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

function AppointmentFormContent({ setShowForm }: AppointmentFormProps) {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkLogin = () => {
    if (!session || !session.user) {
      toast.info("Please login to book an appointment");
      setOpen(true);
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    const query = searchParams.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
    setOpen(false);
  };

  // Helper function to convert 24h format (e.g., "10:30") to 12h format (e.g., "10:30 AM")
  const formatTime12h = (time24: string) => {
    if (!time24) return "";
    const [hoursStr, minutes] = time24.split(":");
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const handleAppointmentBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkLogin()) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    // Map input fields to API body structure
    const payload = {
      patientName: String(rawData.fullName || ""),
      email: String(rawData.email || ""),
      phone: String(rawData.phone_no || ""),
      service: String(rawData.service || ""),
      date: String(rawData.preferredDate || ""),
      time: formatTime12h(String(rawData.preferredTime || "")),
      address: String(rawData.address || ""),
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      toast.success("Appointment booked successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <LoginRequiredDialog open={open} onOpenChange={setOpen} onLogin={handleLogin} />
      <form
        onSubmit={handleAppointmentBook}
        className="mt-5 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2"
      >
        {/* Full Name */}
        <div>
          <input
            onClick={checkLogin}
            type="text"
            name="fullName"
            required
            placeholder="Your Full Name*"
            className="w-full rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Address */}
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address*"
            className="w-full rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone No */}
        <div>
          <input
            type="tel"
            name="phone_no"
            required
            placeholder="985625...*"
            className="w-full rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            name="preferredDate"
            required
            min={new Date().toISOString().split("T")[0]}
            aria-label="Preferred Date"
            className="w-full min-w-0 rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time */}
        <div>
          <select
            name="preferredTime"
            required
            aria-label="Preferred Time"
            className="w-full min-w-0 rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Time</option>
            <option value="09:00">09:00 AM</option>
            <option value="09:30">09:30 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="10:30">10:30 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="11:30">11:30 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="12:30">12:30 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="14:30">02:30 PM</option>
            <option value="15:00">03:00 PM</option>
          </select>
        </div>

        {/* Type of Services */}
        <div className="relative">
          <select
            name="service"
            required
            defaultValue=""
            className="w-full min-w-0 appearance-none rounded-md bg-gray-100 px-4 py-3 pr-10 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Type of Services
            </option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>

          <div className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-r-md bg-emerald-500 text-white">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="address"
            required
            placeholder="Address*"
            className="w-full rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0d5cff] py-3 text-xs font-semibold text-white shadow transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AppointmentForm(props: AppointmentFormProps) {
  return (
    <Suspense
      fallback={
        <div className="mt-5 text-sm text-slate-500">Loading appointment form...</div>
      }
    >
      <AppointmentFormContent {...props} />
    </Suspense>
  );
}