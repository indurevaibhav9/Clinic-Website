'use client'

import { authClient } from "@/lib/auth-client";
import { ChevronDown } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { LoginRequiredDialog } from "./LoginRequiredDialogue";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
type AppointmentFormProps = {
    setShowForm: Dispatch<SetStateAction<boolean>>
}

const AppointmentForm = ({setShowForm}: AppointmentFormProps) => {
    const {data: session, isPending, error} = authClient.useSession()

    const handleAppointmentBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    console.log("logged", entries);
    setShowForm(false)
    // book appointment api
  };
  const checkLogin = () => {
    if(!session || !session.user){
        toast.info("please login to book appoinment")
        setOpen(true)
    }
  }
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const handleLogin = () => {
    const query = searchParams.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
    setOpen(false);
  };

  return (
    
    <div>
      <LoginRequiredDialog open={open} onOpenChange={setOpen} onLogin={handleLogin} />
      <form
        onSubmit={handleAppointmentBook}
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
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

        <input
          type="date"
          name="preferredDate"
          min={new Date().toISOString().split("T")[0]}
          aria-label="Preferred Date"
          className="w-full min-w-0 rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="preferredTime"
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
          <option value="02:00">02:00 PM</option>
          <option value="02:30">02:30 PM</option>
          <option value="03:00">03:00 PM</option>
        </select>

        {/* Type of Services */}
        <div className="relative">
          <select
            name="service"
            defaultValue=""
            className="w-full min-w-0 appearance-none rounded-md bg-gray-100 px-4 py-3 pr-10 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Type of Services
            </option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
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
            className="w-full rounded-md bg-[#0d5cff] py-3 text-xs font-semibold text-white shadow transition-colors hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
