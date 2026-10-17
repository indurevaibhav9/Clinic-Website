"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bgColor?: string; // Hex or Tailwind class for top arch background
}

const doctorsData: Doctor[] = [
  {
    id: "Nishita",
    name: "Dr. Nishita Raw",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "Eishita",
    name: "Dr. Eishita Jery",
    specialty: "Specialist Heart Surgery",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-emerald-500",
  },
  {
    id: "dr-christopher",
    name: "Dr. Christopher",
    specialty: "Senior Therapist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-alexander",
    name: "Dr. Alexander",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-kenneth",
    name: "Dr. Kenneth",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-benjamin",
    name: "Dr. Benjamin",
    specialty: "Anesthesiologist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-nicholas",
    name: "Dr. Nicholas",
    specialty: "Medicine Specialist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-christian",
    name: "Dr. Christian",
    specialty: "Family Physician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
];

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 py-16 text-white md:py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Doctor
          </h1>
          <nav className="mt-3 flex items-center gap-2 text-sm text-blue-100">
            <Link
              href="/home"
              className="hover:underline hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">Doctor</span>
          </nav>
        </div>
      </section>

      {/* Doctor Grid */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doc) => (
            <Link
              key={doc.id}
              href={`/doctors/${doc.id}`}
              className="group relative flex flex-col items-center bg-slate-50/70 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Arch Image Wrapper */}
              <div className="relative w-full aspect-[4/5] max-w-[220px] mb-6">
                <div
                  className={`absolute inset-0 rounded-t-full ${
                    doc.bgColor || "bg-blue-600"
                  }`}
                />
                <div className="relative h-full w-full overflow-hidden rounded-t-full">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Social Icons Overlay on Card Hover */}
              <div className="flex items-center gap-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-colors">
                  <FaFacebook className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition-colors">
                  <FaTwitter className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-colors">
                  <FaLinkedin className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-colors">
                  <FaYoutube className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Details */}
              <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {doc.name}
              </h3>
              <p className="text-xs font-medium text-blue-500 mt-1">
                {doc.specialty}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
