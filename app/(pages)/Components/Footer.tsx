/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
 
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  Stethoscope,
  PhoneCall,
  MapPin,
  ChevronsRight,
  ArrowUp,
  Clock,
  Calendar,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const openingHours = [
    { day: "Monday:", hours: "09:00 am - 10.00 pm" },
    { day: "Tuesday:", hours: "09:00 am - 10.00 pm" },
    { day: "Wednesday:", hours: "09:00 am - 10.00 pm" },
    { day: "Thursday:", hours: "09:00 am - 10.00 pm" },
    { day: "Friday:", hours: "09:00 am - 10.00 pm" },
    { day: "Sat - Sun day:", hours: "Closed", isClosed: true },
  ];

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
      date: "16 Feb 2023",
      title: "Scientist wearing overall in as ped medical laboratory",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=100&q=80",
    },
    {
      date: "16 Feb 2023",
      title: "Female doctors checking resu on digital tablet",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=100&q=80",
    },
  ];

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-white pt-6">
      {/* FLOATING TOP CONTACT BANNER CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-3 lg:px-4 z-20">
        <Card className="border-none bg-[#0d5cff] text-white shadow-xl rounded-2xl overflow-hidden translate-y-1/2">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
              {/* Office Address */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:pr-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-white shadow-md">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Office Address
                  </h4>
                  <p className="mt-1 text-xs text-blue-100 leading-tight">
                   Shivajinagar, Pune, Maharashtra, India
                  
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-white shadow-md">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Working Hours
                  </h4>
                  <p className="mt-1 text-xs text-blue-100 leading-tight">
                    Weekdays 8am – 22pm <br />
                    Weekend 10am – 12pm
                  </p>
                </div>
              </div>

              {/* Contact Us */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-white shadow-md">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Contact Us</h4>
                  <p className="mt-1 text-xs text-blue-100 leading-tight">
                      +91 7932157891 <br />
                    Clinicone@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DARK FOOTER MAIN SECTION */}
      <div className="relative bg-[#0b0809] text-slate-300 pt-32 pb-12 overflow-hidden z-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* MAIN FOOTER CONTENT GRID */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4 text-xs">
            {/* COLUMN 1: BRANDING & ABOUT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-500">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white block leading-none">
                    MediFast
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    Health & Medical
                  </span>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed pt-2">
                Lorem Ipsum is simply dummys text of the printing and
                typesetting industry. Lorem Ipsum has been the industrys
                established fact that a reader will be.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 pt-2">
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#03091e] hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaFacebookF className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#03091e] hover:bg-sky-500 hover:text-white transition-colors"
                >
                  <FaTwitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#03091e] hover:bg-blue-700 hover:text-white transition-colors"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#03091e] hover:bg-red-600 hover:text-white transition-colors"
                >
                  <FaYoutube className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* COLUMN 2: OUR SERVICES */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Our Service
              </h3>
              <ul className="space-y-2.5">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className={`flex items-center gap-2 transition-colors ${
                        service.active
                          ? "text-blue-500 font-semibold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <ChevronsRight className="h-3.5 w-3.5 shrink-0" />
                      <span>{service.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: RECENT POST */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Recent Post
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="h-12 w-12 rounded-md object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-blue-400">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                        {post.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 4: OPENING HOURS */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Opening Hours
              </h3>
              <ul className="space-y-2 text-slate-400">
                {openingHours.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-slate-800/60 pb-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <ChevronsRight className="h-3 w-3 text-slate-500 shrink-0" />
                      <span>{item.day}</span>
                    </div>
                    <span
                      className={
                        item.isClosed
                          ? "text-blue-500 font-bold"
                          : "text-slate-300"
                      }
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SCROLL TO TOP FLOATING BUTTON */}
          <button
            onClick={scrollToTop}
            className="absolute bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:bg-blue-700 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="w-full bg-[#0d5cff] py-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-center sm:text-left text-xs">
          <p className="text-white/90">
            2023 © All rights reserved by Devsnest-llc
          </p>
          <div className="flex items-center gap-4 text-white/90">
            <Link href="/Privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span className="h-3 w-[1px] bg-white/40" aria-hidden="true" />
            <Link href="/Terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
