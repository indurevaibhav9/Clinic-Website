"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  Eye,
  Glasses,
  ArrowRight,
  Stethoscope,
  Microscope,
  Smartphone,
  ChevronRight,
} from "lucide-react";

export default function ServicesPage() {
  const servicesList = [
    {
      id: 1,
      title: "Ophthalmic Practitioner",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      icon: Eye,
      href: "/services/ophthalmic-practitioner",
    },
    {
      id: 2,
      title: "Diagnose & Research",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
      icon: Microscope,
      href: "/services/diagnose-research",
    },
    {
      id: 3,
      title: "Online Monitoring Available",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      icon: Smartphone,
      href: "/services/online-monitoring",
    },
    {
      id: 4,
      title: "Glaucoma Screening",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop",
      icon: Stethoscope,
      href: "/services/glaucoma-screening",
    },
    {
      id: 5,
      title: "Lens Fitting Services",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
      icon: Glasses,
      href: "/services/lens-fitting",
    },
    {
      id: 6,
      title: "Emergency Care",
      description:
        "It is a long established fact that a reader will be distracted by the readable content element.",
      image:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
      icon: HeartHandshake,
      href: "/services/emergency-care",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* =========================================================================
          SECTION 1: HERO HEADER WITH BREADCRUMB
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 py-12 text-white sm:py-16 md:py-24">
        {/* Subtle background SVG pattern element */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L100 100 M100 0 L0 100"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Services
          </h1>
          <nav className="mt-3 flex items-center gap-2 text-sm text-blue-100">
            <Link
              href="/"
              className="hover:underline hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">Services</span>
          </nav>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FACILITIES WE HAVE
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                Facilities We Have
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Facilities We Provided
              </h2>
            </div>

            <div className="space-y-6">
              {/* Feature Item 1 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Here To Help You
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-md">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Glaucoma Screening
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-md">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form.
                  </p>
                </div>
              </div>

              {/* Feature Item 3 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                  <Glasses className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Lens Fitting Services
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed max-w-md">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Asymmetrical Gallery Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            {/* Top-Left Card */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-3xl shadow-md transition-transform hover:scale-[1.02]">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
                alt="Medical staff consultation"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Top-Right Big Card (Spans vertical height) */}
            <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl shadow-md transition-transform hover:scale-[1.02] row-span-2">
              <Image
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop"
                alt="Doctor with medical chart"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom-Left Card */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-3xl shadow-md transition-transform hover:scale-[1.02]">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
                alt="Patient examination"
                fill
                className="object-cover"
              />
            </div>

            {/* Span-Full Bottom Card */}
            <div className="relative col-span-2 h-44 sm:h-52 w-full overflow-hidden rounded-3xl shadow-md transition-transform hover:scale-[1.02]">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
                alt="Lab research equipment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: COMPLETED SERVICES GRID
         ========================================================================= */}
      <section className="bg-slate-50/70 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Our Services
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Explore Our Completed Services
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Service Image Card */}
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Circular Icon Badge at bottom center */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-white">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Service Description Body */}
                  <div className="mt-8 flex flex-1 flex-col items-center p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      {service.description}
                    </p>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
