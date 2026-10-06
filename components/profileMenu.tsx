"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ProfileMenu() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [appointmentsOpen, setAppointmentsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setAppointmentsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateTo = (path: string) => {
    setIsOpen(false);
    setAppointmentsOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
      try {
        const session = await authClient.getSession()
  
        if (session.data?.user) {
          await authClient.signOut()
          toast.success("Logged out successfully.")
        } else {
          toast.error("No active session found. Already logged out.")
        }
      } catch (error) {
        console.log("logout error:", error)
        toast.error("Failed to log out.")
      }
    }

  return (
    <div ref={menuRef} className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-muted"
        aria-label="Open profile menu"
      >
        <User className="h-5 w-5" />
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border bg-background p-2 shadow-lg">
          
          {/* Profile */}
          <button
            onClick={() => navigateTo("/profile")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
          >
            <User className="h-5 w-5" />

            <span className="flex-1">
              Profile
            </span>
          </button>

          {/* My Appointments */}
          <button
            onClick={() =>
              setAppointmentsOpen((prev) => !prev)
            }
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
          >
            <CalendarDays className="h-5 w-5" />

            <span className="flex-1">
              My Appointments
            </span>

            {appointmentsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* Appointment Submenu */}
          {appointmentsOpen && (
            <div className="ml-8 border-l pl-2">
              <button
                onClick={() =>
                  navigateTo("/appointments/upcoming")
                }
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
              >
                Upcoming Appointments
              </button>

              <button
                onClick={() =>
                  navigateTo("/appointments/previous")
                }
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
              >
                Previous Appointments
              </button>
            </div>
          )}

          {/* Logout */}
          <div className="my-1 border-t" />

          <button
            onClick={() => {
              handleLogout() 
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-red-500 hover:bg-muted"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}