/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import FooterComponent from "../Components/FooterComponent";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Menu } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import {
  ClipboardList,
  Award,
  Rocket,
  Crown,
  Tag,
  Stethoscope,
  PhoneCall,
  ChevronDown,
} from "lucide-react";
import {
  Sparkles,
  Ear,
  Wind,
  Activity,
  Microscope,
  Bone,
  Baby,
} from "lucide-react";
import { MapPin, ChevronsRight, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserCheck,
  Ambulance,
  Clock,
  Users,
  Smile,
  Bed,
  Trophy,
} from "lucide-react";
import {} from "lucide-react";

import { Plus, Minus, Pill } from "lucide-react";
import ProfileMenu from "@/components/profileMenu";
import AppointmentForm from "../Components/AppointmentForm";
import Footer from "../Components/Footer";
export default function HomeComponent() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Alexander",
      specialty: "Dermatologist",
      image: "/Assets/doctor-alexander.png",
      linkedin: "",
      facebook: "",
      twitter: ""
    },
    {
      id: 2,
      name: "Dr. Nishita Raw",
      specialty: "Cardiologist",
      image: "/Assets/doctor-nishita.png",
      // Initially expanded in the UI preview design
      defaultOpen: true,
      linkedin: "",
      facebook: "",
      twitter: ""
    },
    {
      id: 3,
      name: "Dr. Christopher",
      specialty: "Senior Therapist",
      image: "/Assets/doctor-christopher.png",
      linkedin: "",
      facebook: "",
      twitter: ""
    },
    {
      id: 4,
      name: "Dr. Eishita Jery",
      specialty: "Heart Surgery Specialist",
      image: "/Assets/doctor-eishita.png",
      linkedin: "",
      facebook: "",
      twitter: ""
    },
  ];

  // Track expanded state for each doctor by ID
  const [expandedDoctorId, setExpandedDoctorId] = useState<number | null>(2);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false)
  
  const HandleReadMore=()=>{
    setIsAboutExpanded(!isAboutExpanded);
  }
  const toggleSocials = (id: number) => {
    setExpandedDoctorId((prev) => (prev === id ? null : id));
  };
  const specialties = [
    {
      title: "Professional Staff",
      description:
        "On the other hand we denounce with righteous indignation and denounce with righteous indignation.",
      icon: UserCheck,
    },
    {
      title: "Emergency Case",
      description:
        "On the other hand we denounce with righteous indignation and denounce with righteous indignation.",
      icon: Ambulance,
    },
    {
      title: "Qualified Doctors",
      description:
        "On the other hand we denounce with righteous indignation and denounce with righteous indignation.",
      icon: Stethoscope,
    },
    {
      title: "24/7 Services",
      description:
        "On the other hand we denounce with righteous indignation and denounce with righteous indignation.",
      icon: Clock,
    },
  ];

  const stats = [
    {
      count: "1500",
      label: "Medical Experts",
      icon: Users,
    },
    {
      count: "8562",
      label: "Happy Patients",
      icon: Smile,
    },
    {
      count: "450",
      label: "Health Departments",
      icon: Bed,
    },
    {
      count: "38",
      label: "Winning Awards",
      icon: Trophy,
    },
  ];
  const plans = [
    {
      name: "Regular Plan",
      price: "20",
      icon: ClipboardList,
      isFeatured: false,
      features: [
        "Access To Employers Hotline",
        "Binding Arbitration And Class",
        "State And Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
    {
      name: "Standard Plan",
      price: "60",
      icon: Award,
      isFeatured: true,
      badgeText: "Best Plan",
      features: [
        "Access To Employers Hotline",
        "Binding Arbitration And Class",
        "State And Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
    {
      name: "Business Plan",
      price: "80",
      icon: Rocket,
      isFeatured: false,
      features: [
        "Access To Employers Hotline",
        "Binding Arbitration And Class",
        "State And Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
    {
      name: "Premium Plan",
      price: "99",
      icon: Crown,
      isFeatured: false,
      features: [
        "Access To Employers Hotline",
        "Binding Arbitration And Class",
        "State And Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
  ];

  const nservices = [
    {
      id: 1,
      title: "ENT & Otology",
      icon: Ear,
      // Desktop absolute positions (percentage-based)
      pos: "top-[40%] left-[18%]",
      active: false,
    },
    {
      id: 2,
      title: "Pulmonology & Respiratory",
      icon: Wind,
      pos: "top-[75%] left-[26%]",
      active: false,
    },
    {
      id: 3,
      title: "X-Ray Imaging And Reporting",
      icon: Activity,
      pos: "top-[52%] left-[39%]",
      active: true, // Active Tooltip Node
      image: "/Assets/xray-thumb.png", // Replace with image path
    },
    {
      id: 4,
      title: "Microbiology & Pathology",
      icon: Microscope,
      pos: "top-[70%] left-[51%]",
      active: false,
    },
    {
      id: 5,
      title: "Orthopedics & Joint Care",
      icon: Bone,
      pos: "top-[32%] left-[60%]",
      active: false,
    },
    {
      id: 6,
      title: "Gynecology & Obstetrics",
      icon: Baby,
      pos: "top-[78%] left-[70%]",
      active: false,
    },
    {
      id: 7,
      title: "General Diagnostics",
      icon: Stethoscope,
      pos: "top-[48%] left-[81%]",
      active: false,
    },
  ];
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const services = [
    { title: "Dental Care", href: "#", active: false },
    { title: "Cardiac Clinic", href: "#", active: true },
    { title: "Masseter Therapy", href: "#", active: false },
    { title: "Cardiology", href: "#", active: false },
    { title: "Precise Diagnosis", href: "#", active: false },
    { title: "Ambulance Services", href: "#", active: false },
  ];

  const recentPosts = [
    {
      id: 1,
      date: "16 Feb 2023",
      title: "Scientist wearing overall in as ped medical laboratory",
      image: "/Assets/post-1.jpg",
    },
    {
      id: 2,
      date: "16 Feb 2023",
      title: "Female doctors checking resu on digital tablet",
      image: "/Assets/post-2.jpg",
    },
  ];

  const openingHours = [
    { day: "Monday:", hours: "09:00 am - 10.00 pm" },
    { day: "Tuesday:", hours: "09:00 am - 10.00 pm" },
    { day: "Wednesday:", hours: "09:00 am - 10.00 pm" },
    { day: "Thursday:", hours: "09:00 am - 10.00 pm" },
    { day: "Friday:", hours: "09:00 am - 10.00 pm" },
    { day: "Sat - Sun day:", hours: "Closed", isClosed: true },
  ];
  const [activeService, setActiveService] = useState<number>(3);
  function handleAppointmentClick() {
    console.log("Appointment button clicked");
  }

  

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      {/* MAIN BODY CONTENT */}
      <main className="flex-1 w-full bg-[#0d5cff]">
        <section className="relative w-full overflow-hidden bg-[#0d5cff] py-8 text-white sm:py-10 lg:py-12">
          {/* Background Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* UPPER HERO CARD */}
            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-[#eef5ff] via-[#e6f0fa] to-[#d8e8f8] p-6 text-gray-900 shadow-xl sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                {/* Left Content Column */}
                <div className="z-10 min-w-0 text-center lg:col-span-6 lg:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                    Great Experience in Building
                  </span>

                  <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    Get Better Care For <br className="hidden sm:inline" />
                    Your <span className="text-emerald-500">Health</span>
                  </h1>

                  <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-gray-600 sm:text-sm lg:mx-0">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>

       
<div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
  <button
    type="button"
    onClick={HandleReadMore}
    aria-expanded={isAboutExpanded}
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0d5cff] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
  >
    {isAboutExpanded ? "Read Less" : "Read More"}

    <ChevronDown
      className={`h-4 w-4 transition-transform duration-300 ${
        isAboutExpanded ? "rotate-180" : ""
      }`}
    />
  </button>

  {isAboutExpanded && (
    <div className="w-full rounded-xl border border-blue-100 bg-blue-50/70 p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#0d5cff]">
          <Stethoscope className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900">
            Better Healthcare, Made Easier
          </h3>

          <p className="mt-2 text-sm leading-7 text-gray-600">
            Our healthcare platform provides convenient access to
            medical services, qualified doctors, and appointment
            requests. Patients can explore different medical
            specialties, learn about available treatments, and find
            relevant healthcare information.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            We aim to make healthcare services easier to access by
            bringing essential medical information and patient support
            together in one place. Our platform helps patients navigate
            healthcare options and connect with the services they need.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg bg-white p-3">
              <UserCheck className="h-5 w-5 shrink-0 text-[#0d5cff]" />
              <span className="text-sm font-medium text-gray-700">
                Qualified Medical Professionals
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-white p-3">
              <Calendar className="h-5 w-5 shrink-0 text-[#0d5cff]" />
              <span className="text-sm font-medium text-gray-700">
                Convenient Appointment Requests
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

                </div>

                {/* Right Image Column */}
                <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
                  <div className="relative h-[180px] w-full max-w-md sm:h-[220px] lg:h-[260px] lg:max-w-xl">
                    <Image
                      src="/Assets/image1.png"
                      alt="Doctor with patient and child"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-center lg:object-right-top"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LOWER SECTION: CONTACT CARD + APPOINTMENT FORM */}
            <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
              {/* Left Blue Contact Card */}
              <div className="flex flex-col justify-between rounded-xl border border-blue-400/20 bg-[#0d5cff] p-6 shadow-lg lg:col-span-4">
                <div className="min-w-0">
                  {/* Phone Icon & Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0d5cff]">
                      <PhoneCall className="h-6 w-6" />
                    </div>

                    <div>
                      <span className="text-xs text-blue-100">
                        Give Us a Call
                      </span>
                      <p className="text-base font-bold text-white sm:text-lg">
                        +91 7932157891
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-blue-100/90">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="contact-us"
                    className="inline-flex w-full items-center justify-center rounded-md bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-white shadow transition-colors hover:bg-emerald-600 sm:w-auto"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Right White Appointment Form */}
              <div className="rounded-xl bg-white p-6 text-gray-800 shadow-xl sm:p-8 lg:col-span-8">
                <h3 className="text-lg font-bold text-gray-900">
                  Apply For Appointment
                </h3>

                <AppointmentForm setShowForm={setShowForm} />
                
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-24 text-gray-900">
          {/* Decorative watermark intentionally omitted to avoid a broken image
              when /Assets/syringe-bg.png is not present in public/Assets. */}

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* LEFT CONTENT COLUMN */}
              <div className="lg:col-span-6 z-10 text-left">
                {/* Pill Badge Tag */}
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-medium text-blue-600">
                  <Pill className="h-3.5 w-3.5" />
                  <span>About Health & Medicine</span>
                </div>

                {/* Main Heading */}
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl leading-tight">
                  Complete Medical Solutions In One{" "}
                  <br className="hidden sm:inline" />
                  Place & Good Health
                </h2>

                {/* Paragraph Text */}
                <p className="mt-4 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised word which don&apos;t look
                  even slightly believable. If you are going to use a passage.
                </p>

                {/* Bullet Points Grid */}
                <div className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2 text-xs sm:text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span>100% Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span>Instant Operation & Appointment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span>From Scientific Journal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span>Medicine & Instrument</span>
                  </div>
                </div>



{/* Action Button and Expandable Content */}
<div className="mt-8 space-y-5">
  <button
    type="button"
    onClick={HandleReadMore}
    aria-expanded={isAboutExpanded}
    aria-controls="about-expanded-content"
    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#0d5cff] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    {isAboutExpanded ? "Read Less" : "Read More"}

    <ChevronDown
      className={`h-4 w-4 transition-transform duration-300 ${
        isAboutExpanded ? "rotate-180" : ""
      }`}
    />
  </button>

  {isAboutExpanded && (
    <div
      id="about-expanded-content"
      className="w-full overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/60 p-5 shadow-sm transition-all duration-300 sm:p-7"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#0d5cff]">
          <Stethoscope className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            Better Healthcare, Made Easier
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
            Our healthcare platform provides convenient access to
            medical services, qualified doctors, and appointment
            requests. Patients can explore different medical
            specialties, learn about available treatments, and find
            relevant healthcare information.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
            We aim to make healthcare services easier to access by
            bringing essential medical information and patient support
            together in one place. Our platform helps patients navigate
            healthcare options and connect with the services they need.
          </p>

          {/* Feature Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0d5cff]">
                <UserCheck className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold leading-5 text-gray-700">
                Qualified Medical Professionals
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0d5cff]">
                <Calendar className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold leading-5 text-gray-700">
                Convenient Appointment Requests
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

              </div>

              {/* RIGHT MEDIA COLUMN */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg lg:max-w-none">
                  {/* Main Medical Image Container */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100">
                    <div className="relative h-[320px] sm:h-[420px] lg:h-[460px] w-full">
                      <Image
                        src="/Assets/medical-image.png" // Replace with your main doctor/patient image
                        alt="Doctor consulting patient"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating Left Overlay: Video Preview Box */}

                  {/* Floating Bottom Badge: 25 Years Experience */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-30 flex items-center gap-3 rounded-xl bg-white p-4 sm:p-5 shadow-2xl border border-gray-100">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                      <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                          25
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-gray-800">
                          Years
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 block">
                        Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full bg-[#f0f6ff] py-16 sm:py-20 lg:py-24 text-gray-900 overflow-hidden">
          {/* Background Soft Molecule/Particle Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* SECTION HEADER */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-semibold text-blue-600">
                <Tag className="h-3.5 w-3.5" />
                <span>Our Pricing</span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-gray-900">
                Our Best Pricing Plans
              </h2>
            </div>

            {/* PRICING CARDS GRID */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {plans.map((plan, index) => {
                const Icon = plan.icon;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100"
                  >
                    {/* Corner "Best Plan" Ribbon for Featured Card */}
                    {plan.isFeatured && (
                      <div className="absolute top-3 -right-8 z-20 w-28 rotate-45 bg-emerald-500 py-1 text-center text-[10px] font-bold text-white shadow-sm">
                        {plan.badgeText}
                      </div>
                    )}

                    <div>
                      {/* Top Banner with Price and Icon */}
                      <div className="relative flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 text-white overflow-hidden">
                        {/* Pattern Overlay on Banner */}
                        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

                        {/* Icon Badge */}
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-md">
                          <Icon className="h-6 w-6" />
                        </div>

                        {/* Price Tag */}
                        <div className="relative z-10 flex items-baseline text-white">
                          <span className="text-lg font-bold">$</span>
                          <span className="text-3xl font-extrabold tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-[11px] font-medium opacity-90 ml-0.5">
                            /Per Mon
                          </span>
                        </div>
                      </div>

                      {/* Card Title & Features */}
                      <div className="p-6 text-center">
                        <h3
                          className={`text-base font-bold ${
                            plan.isFeatured ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {plan.name}
                        </h3>

                        {/* Features List */}
                        <ul className="mt-6 space-y-3.5 text-xs text-gray-500">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="leading-tight">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card CTA Button */}
                    <div className="p-6 pt-0 text-center">
                      <Link
                        href="#"
                        className={`inline-block w-full rounded-md py-2.5 text-xs font-semibold transition-all ${
                          plan.isFeatured
                            ? "bg-[#0d5cff] text-white shadow-md hover:bg-blue-700"
                            : "border border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"
                        }`}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative w-full overflow-hidden bg-[#0d5cff] py-16 sm:py-20 lg:py-28 text-white">
          {/* Background Medical Illustration Pattern / Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />

          {/* Decorative Watermark Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* SECTION HEADER */}
            <div className="text-center max-w-2xl mx-auto z-10 relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/20">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>Excellence is Our Specialty</span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl text-white">
                Discover Medifay Services
              </h2>
            </div>

            {/* DESKTOP VIEW: Scattered Interactive Floating Nodes (Hidden on Mobile/Tablet) */}
            <div className="relative mt-12 hidden lg:block h-[500px] w-full">
              {nservices.map((service) => {
                const Icon = service.icon;
                const isSelected = activeService === service.id;

                return (
                  <div
                    key={service.id}
                    className={`absolute transition-all duration-300 ${service.pos}`}
                  >
                    {/* Active Tooltip Box (Appears above the selected node) */}
                    {isSelected && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-2xl transition-all duration-300 min-w-[240px]">
                        <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-blue-100 shrink-0">
                          {service.image ? (
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white">
                              <Icon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-bold text-gray-900 leading-snug">
                          {service.title}
                        </span>

                        {/* Tooltip Arrow Pointer */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-white" />
                      </div>
                    )}

                    {/* Circular Icon Node */}
                    <button
                      onClick={() => setActiveService(service.id)}
                      className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-white p-1 transition-all duration-300 hover:scale-110 shadow-lg ${
                        isSelected
                          ? "ring-4 ring-emerald-400 ring-offset-2 ring-offset-[#0d5cff]"
                          : "border-2 border-emerald-400 hover:ring-2 hover:ring-white"
                      }`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-blue-600 transition-colors group-hover:bg-blue-50">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* MOBILE & TABLET VIEW: Responsive Grid Layout (Visible on Small/Medium Screens) */}
            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:hidden">
              {nservices.map((service) => {
                const Icon = service.icon;
                const isSelected = activeService === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all ${
                      isSelected
                        ? "bg-white text-gray-900 shadow-xl"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full p-1 mb-3 ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border-2 border-emerald-400"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold leading-tight">
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f0f6ff] via-[#e8f1fd] to-white py-12 sm:py-16 lg:py-20 text-gray-900">
          {/* Background Medical Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#0d5cff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* UPPER SECTION: Text Content & Medical Team Image */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Side: Specialties Grid */}
              <div className="lg:col-span-7 z-10">
                {/* shadcn Badge Component */}
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 border-blue-200 bg-white px-3.5 py-1 text-xs font-semibold text-blue-600 shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span>Why Choose Us</span>
                </Badge>

                <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-gray-900">
                  What&apos;s Our Specialty
                </h2>

                {/* 2x2 Features Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {specialties.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex gap-4 items-start">
                        {/* Circle Icon Badge */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-md border border-blue-100">
                          <Icon className="h-6 w-6 text-[#0d5cff]" />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Medical Team Image */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative h-[280px] sm:h-[380px] lg:h-[420px] w-full max-w-lg">
                  <Image
                    src="/Assets/medical-team-group.png" // Replace with medical team image path
                    alt="Medical Team Doctors and Nurses"
                    fill
                    className="object-contain object-center lg:object-right-bottom"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* LOWER SECTION: Blue Statistics Banner */}
            <div className="mt-12 sm:mt-16">
              <Card className="border-none bg-[#0d5cff] text-white shadow-2xl rounded-2xl overflow-hidden relative">
                {/* Inner Gradient/Glow Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />

                <CardContent className="p-6 sm:p-10 relative z-10">
                  <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 items-center text-center">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="flex flex-col items-center">
                          {/* Round Green Icon */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-white shadow-md mb-4">
                            <Icon className="h-7 w-7" />
                          </div>

                          {/* Number Counter */}
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                            {stat.count}
                          </span>

                          {/* Label */}
                          <span className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                            {stat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 text-gray-900">
          {/* Background Decorative Watermark (Faded Thermometer on Right) */}
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-15 lg:opacity-25">
            <Image
              src="/Assets/thermometer-bg.png" // Replace with your watermark image asset
              alt=""
              width={300}
              height={600}
              className="object-contain"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* SECTION HEADER */}
            <div className="text-center max-w-xl mx-auto">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1.5 border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-medium text-blue-600 rounded-full"
              >
                <Pill className="h-3.5 w-3.5" />
                <span>Meet Doctors</span>
              </Badge>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-gray-900">
                Our Professional Doctors
              </h2>
            </div>

            {/* DOCTORS GRID */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
  {doctors.map((doctor) => {
    const isExpanded = expandedDoctorId === doctor.id;

    return (
      <Card
        key={doctor.id}
        className="group flex flex-col justify-between border-none bg-transparent shadow-none"
      >
        <CardContent className="p-0">
          {/* Doctor Image Container */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm sm:h-80">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Floating Social Toggle & Menu */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center">
              {isExpanded ? (
                <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white p-1.5 shadow-lg animate-in fade-in slide-in-from-right-3">
                  {/* Social Media Icons */}
                  <div className="flex items-center gap-2 px-2">
                    <Link
                      href={doctor.facebook || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on Facebook`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#1877F2] transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:text-white"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </Link>

                    <Link
                      href={doctor.twitter || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on X`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
                    >
                      <FaXTwitter className="h-4 w-4" />
                    </Link>

                    <Link
                      href={doctor.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:text-white"
                    >
                      <FaLinkedinIn className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Close Social Menu */}
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    onClick={() => toggleSocials(doctor.id)}
                    aria-label="Close social media links"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Close Socials</span>
                  </Button>
                </div>
              ) : (
                /* Expand Social Menu */
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-blue-600 text-white shadow-md transition-transform hover:bg-blue-700 active:scale-95"
                  onClick={() => toggleSocials(doctor.id)}
                  aria-label="Show social media links"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Expand Socials</span>
                </Button>
              )}
            </div>
          </div>

          {/* Doctor Information */}
          <div className="mt-4 text-left">
            <h3 className="text-base font-bold leading-snug text-gray-900">
              {doctor.name}
            </h3>

            <p className="mt-1 text-xs font-semibold text-blue-600">
              {doctor.specialty}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
          </div>
        </section>
        
      </main>
    </div>
  );
}
