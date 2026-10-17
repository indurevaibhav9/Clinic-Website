"use client";
import Link from "next/link";
import { Search, Stethoscope, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import ProfileMenu from "@/components/profileMenu";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { LoginRequiredDialog } from "./LoginRequiredDialogue";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentForm from "./AppointmentForm";
import SearchBar from "./SearchBar";
import PatientsList from "../patient-list/page";
import PatientsDropdown from "./PatientsDropdown";

export default function HeaderComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { data: session, isPending, error } = authClient.useSession();
  const [showForm, setShowForm] = useState(false);

  const hanldeLogin = () => {
    const query = searchParams.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
  };
  function handleAppointmentClick() {
    if (!session || !session.user) {
      setShowLoginDialog(true);
    } else {
      setShowForm(true);
    }
  }
  const handleLogin = () => {
    const query = searchParams.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
    setShowLoginDialog(false);
  };
  return (
    <div className="fixed top-0 left-0  right-0 z-50">
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
          </DialogHeader>

          <AppointmentForm setShowForm={setShowForm} />
        </DialogContent>
      </Dialog>

      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-around pl-0 pr-4 sm:pr-6 lg:pr-8">
          {/* Left Section: Logo Badge */}
          <div className="flex h-full shrink-0 items-center bg-blue-600 px-4 sm:px-6 py-3 text-white">
            <Link href="/home" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Stethoscope className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tight">
                  MediFast
                </span>
                <span className="mt-1 text-[10px] font-medium tracking-wider opacity-90">
                  Health & Medical
                </span>
              </div>
            </Link>
          </div>
          {/* Middle Section: Navigation Links */}
          <nav className="hidden px-2 items-center space-x-3 lg:flex lg:space-x-8">
            <Link
              href="/home"
              className="whitespace-nowrap text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Home
            </Link>
            {session && session.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className=" text-black whitespace-nowrap text-sm font-medium transition-colors hover:text-blue-700"
              >
                Admin Dashboard
              </Link>
            )}

            {session && session.user.role != "NORMAL_USER" && (
              <PatientsDropdown />
            )}
            <Link
              href="/aboutUs"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/services"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              href="/doctors"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Doctor
            </Link>
            <Link
              href="/feedback"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Feedback
            </Link>
            <Link
              href="/faqs"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              FAQs
            </Link>
            <Link
              href="contact-us"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Contact Us
            </Link>
          </nav>
          {/* Right Section: Action Buttons */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-md border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button> */}
            <SearchBar />
            <Button
              className="hidden h-10 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-700 sm:flex sm:px-6"
              onClick={handleAppointmentClick}
            >
              Appointment
            </Button>
            {isPending ? (
              <p className="text-black">Loading ...</p>
            ) : !session || !session.user ? (
              <Button onClick={hanldeLogin} className="bg-blue-600">
                Login
              </Button>
            ) : (
              <ProfileMenu />
            )}

            {/* Mobile Navigation Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
