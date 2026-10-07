"use client";
import HeaderComponent from "../Components/HeaderCompontent";
import FooterComponent from "../Components/FooterComponent";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  UserCheck,
  Award,
  Ambulance,
  Clock,
  Users,
  Smile,
  Building2,
  Trophy,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import AppointmentForm from "../Components/AppointmentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function AboutUsComponent() {
  const schedule = [
    { days: "Mon-Tue day:", hours: "9:00 am - 10.00 pm" },
    { days: "Wed-Thu day:", hours: "9:00 am - 10.00 pm" },
    { days: "Friday:", hours: "9:00 am - 10.00 pm" },
    { days: "Sat-Sun day:", hours: "Closed", isClosed: true },
  ];
  const [showForm, setShowForm] = useState(false);

  const handleMakeAppointment = () => {
    setShowForm(true);
  };
  return (
    <div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
          </DialogHeader>

          <AppointmentForm setShowForm={setShowForm} />
        </DialogContent>
      </Dialog>
      <section className="relative w-full bg-white pb-16 lg:pb-24">
        {/* TOP BLUE HEADER BANNER */}
        <div className="relative w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-40 text-white overflow-hidden">
          {/* Background Decorative DNA Strand / Grid Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              About Us
            </h1>

            {/* Breadcrumb Navigation */}
            <nav className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-100">
              <Link href="#" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-70" />
              <span className="text-blue-200">About Us</span>
            </nav>
          </div>
        </div>

        {/* OVERLAY CARDS SECTION */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 lg:-mt-32">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {/* CARD 1: Working Time */}
            <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
                    Working Time
                  </h3>

                  <ul className="space-y-3 text-xs">
                    {schedule.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-gray-600"
                      >
                        <span className="font-medium">{item.days}</span>
                        <span
                          className={
                            item.isClosed
                              ? "font-bold text-blue-600"
                              : "text-gray-500"
                          }
                        >
                          {item.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CARD 2: Doctors Timetable (Active / Highlighted) */}
            <Card className="border-2 border-blue-500 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Doctors Timetable
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    It is a long established fact that are ader will be
                    distracted by the read ble content of a page when
                  </p>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-[#0d5cff] hover:bg-blue-700 text-white font-medium text-xs py-2.5 rounded-md shadow-md">
                    View Timetable
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CARD 3: Appointments */}
            <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Appointments
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    It is a long established fact that are ader will be
                    distracted by the read ble content of a page when
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handleMakeAppointment()}
                    className="w-full border-gray-300 text-gray-800 hover:border-blue-600 hover:text-blue-600 font-medium text-xs py-2.5 rounded-md"
                  >
                    Make Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CARD 4: Emergency Call */}
            <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Emergency Call
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    It is a long established fact that are ader will be
                    distracted by the read ble content of a page when
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100 font-bold text-xs py-2.5 rounded-md flex items-center justify-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
                    <span>+88 ( 5548 ) 6548</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white text-gray-800">
        {/* =========================================================================
                  SECTION 1: ABOUT HEALTH & MEDICINE
                 ========================================================================= */}
        <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Collage Images */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative grid grid-cols-2 gap-4">
                {/* Doctor consulting patient */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl shadow-lg col-span-2 sm:col-span-1">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
                    alt="Doctor with patient"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Medical staff team inset */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl shadow-lg col-span-2 sm:col-span-1 sm:mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
                    alt="Medical team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Small Floating Team Badge */}
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl border border-gray-100">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150"
                    alt="Staff 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150"
                    alt="Staff 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150"
                    alt="Staff 3"
                  />
                </div>
                <span className="text-xs font-bold text-gray-700">
                  100+ Medical Specialists
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                About Health & Medicine
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                The Heart And Science Of Medicine Service Good Health
              </h1>

              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which dont look even
                slightly believable. If you are going to use a passage.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Modern Technology
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Fully committed to the success of our company and
                      patients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Certified Doctors
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Patient health and well-being will always be my top
                      priority.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
                  SECTION 2: WHY CHOOSE US / SPECIALTY
                 ========================================================================= */}
        <section className="bg-gradient-to-b from-blue-50/50 to-blue-50/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Specialty Cards Grid (Left 6 Columns) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-600">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    Why Choose Us
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    What&apos;s Our Specialty
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Card 1 */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50/50 hover:shadow-md transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">
                      Professional Staff
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      On the other hand we denounce with righteous indignation
                      and dislike with righteous indignation.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50/50 hover:shadow-md transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                      <Ambulance className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">
                      Emergency Case
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      On the other hand we denounce with righteous indignation
                      and dislike with righteous indignation.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50/50 hover:shadow-md transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">
                      Qualified Doctors
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      On the other hand we denounce with righteous indignation
                      and dislike with righteous indignation.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50/50 hover:shadow-md transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">
                      24/7 Services
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      On the other hand we denounce with righteous indignation
                      and dislike with righteous indignation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Lineup Illustration (Right 6 Columns) */}
              <div className="lg:col-span-6 relative flex items-end justify-center">
                <div className="relative h-[320px] sm:h-[400px] w-full max-w-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
                    alt="Medical Team Standup"
                    fill
                    className="object-contain object-bottom drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
                  SECTION 3: STATS COUNTER BAR
                 ========================================================================= */}
        <section className="bg-blue-600 py-10 text-white shadow-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-3xl font-extrabold sm:text-4xl">
                  1500
                </span>
                <span className="mt-1 text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Medical Experts
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
                  <Smile className="h-6 w-6" />
                </div>
                <span className="text-3xl font-extrabold sm:text-4xl">
                  8562
                </span>
                <span className="mt-1 text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Happy Patients
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-3xl font-extrabold sm:text-4xl">450</span>
                <span className="mt-1 text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Health Departments
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
                  <Trophy className="h-6 w-6" />
                </div>
                <span className="text-3xl font-extrabold sm:text-4xl">38</span>
                <span className="mt-1 text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Winning Awards
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
                  SECTION 4: OUR PROFESSIONAL DOCTORS
                 ========================================================================= */}
        <section className="py-16 md:py-24 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                Meet Doctors
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Professional Doctors
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Doctor 1 */}
              <div className="group rounded-3xl bg-blue-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
                <div className="relative mx-auto h-56 w-full overflow-hidden rounded-2xl bg-blue-600">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop"
                    alt="Dr. Nishita Raw"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. Nishita Raw
                  </h3>
                  <p className="text-xs font-medium text-blue-600 mt-1">
                    Cardiologist
                  </p>
                </div>

                {/* Social Icons */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Doctor 2 */}
              <div className="group rounded-3xl bg-emerald-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
                <div className="relative mx-auto h-56 w-full overflow-hidden rounded-2xl bg-emerald-500">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
                    alt="Dr. Eishita Jery"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. Eishita Jery
                  </h3>
                  <p className="text-xs font-medium text-blue-600 mt-1">
                    Specialist Heart Surgery
                  </p>
                </div>

                {/* Social Icons */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Doctor 3 */}
              <div className="group rounded-3xl bg-blue-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
                <div className="relative mx-auto h-56 w-full overflow-hidden rounded-2xl bg-blue-600">
                  <Image
                    src="/image.png"
                    alt="Dr. Sarah Jenkins"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. Sarah Jenkins
                  </h3>
                  <p className="text-xs font-medium text-blue-600 mt-1">
                    Pediatric Specialist
                  </p>
                </div>

                {/* Social Icons */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Doctor 4 */}
              <div className="group rounded-3xl bg-blue-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
                <div className="relative mx-auto h-56 w-full overflow-hidden rounded-2xl bg-blue-600">
                  <Image
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop"
                    alt="Dr. Christopher"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. Christopher
                  </h3>
                  <p className="text-xs font-medium text-blue-600 mt-1">
                    Senior Therapist
                  </p>
                </div>

                {/* Social Icons */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
