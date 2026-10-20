"use client";
import Link from "next/link";
import { Stethoscope, Menu } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AppointmentForm from "./AppointmentForm";
import SearchBar from "./SearchBar";
import PatientsDropdown from "./PatientsDropdown";

export default function HeaderComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [showForm, setShowForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-2xl">
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

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetContent side="right" className="w-[min(20rem,90vw)] overflow-y-auto">
          <SheetHeader className="border-b pr-12">
            <SheetTitle>MediFast navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-1 px-4 pb-6">
            <SearchBar />
            {[
              { href: "/home", label: "Home" },
              ...(session?.user?.role === "ADMIN"
                ? [{ href: "/admin", label: "Admin Dashboard" }]
                : []),
              ...(session?.user && session.user.role !== "NORMAL_USER"
                ? [
                    { href: "/patient-list/todays-patients", label: "Today's Patients" },
                    { href: "/patient-list", label: "All Patients" },
                    { href: "/patient-list/register", label: "Register Patient" },
                  ]
                : []),
              { href: "/aboutUs", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/doctors", label: "Doctors" },
              { href: "/feedback", label: "Feedback" },
              { href: "/faqs", label: "FAQs" },
              { href: "/contact-us", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setShowMobileMenu(false);
                handleAppointmentClick();
              }}
            >
              Appointment
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:h-20 sm:px-4 lg:px-8">
          {/* Left Section: Logo Badge */}
          <div className="flex h-full shrink-0 items-center bg-blue-600 px-2 py-3 text-white sm:px-4 lg:px-6">
            <Link href="/home" className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                <Stethoscope className="h-5 w-5 text-green-400 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tight sm:text-xl">
                  MediFast
                </span>
                <span className="mt-1 text-[9px] font-medium tracking-wider opacity-90 sm:text-[10px]">
                  Health & Medical
                </span>
              </div>
            </Link>
          </div>
          {/* Middle Section: Navigation Links */}
          <nav className="hidden items-center space-x-3 px-2 xl:flex 2xl:space-x-5">
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
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden w-48 2xl:block">
              <SearchBar />
            </div>
            <Button
              className="hidden h-10 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-700 md:flex lg:px-5"
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

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-gray-700 hover:bg-gray-100 xl:hidden"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Open navigation menu"
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
