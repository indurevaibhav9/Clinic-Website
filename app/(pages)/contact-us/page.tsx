/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { contactSchema } from "@/lib/validation";
import { InlineError } from "@/components/ui/inline-error";

interface LocationInfo {
  city: string;
  address: string;
  email: string;
  phone: string;
  lat: number;
  lng: number;
}

const locations: LocationInfo[] = [
  {
    city: "Pune",
    address: "Shivajinagar, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43210",
    lat: 18.5308,
    lng: 73.8475,
  },
  {
    city: "Pimpri-Chinchwad",
    address: "Pimpri, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43211",
    lat: 18.6298,
    lng: 73.7997,
  },
  {
    city: "Hinjawadi",
    address: "Hinjawadi IT Park, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43212",
    lat: 18.5913,
    lng: 73.7389,
  },
  {
    city: "Kothrud",
    address: "Kothrud, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43213",
    lat: 18.5074,
    lng: 73.8077,
  },
];

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(
    locations[0],
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Track which location's contact details are expanded (accordion style)
  // You can also use location.city to store the open ID
  const [expandedCity, setExpandedCity] = useState(locations[0]?.city || null);

  const handleLocationClick = (location: LocationInfo) => {
    setSelectedLocation(location);
    // Toggle dropdown: if clicking the already open one, close it or keep it open.
    // Here we toggle or open it:
    setExpandedCity((prev) => (prev === location.city ? null : location.city));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((previous) => ({ ...previous, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setFieldErrors(errors);
      setStatusMessage({ type: "error", text: "Please correct the highlighted fields." });
      toast.error(validation.error.issues[0]?.message || "Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ type: null, text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });
      setFieldErrors({});
      toast.success("Your message has been sent successfully.");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred. Please try again.";
      setStatusMessage({
        type: "error",
        text: message,
      });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-blue-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-base text-blue-100 sm:text-lg">
            We are here to help you with your healthcare needs. Reach out to us
            or visit one of our locations in Pune.
          </p>
        </div>
      </section>

      {/* Map and Single Location Card */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">
              Our Locations
            </h2>
            <p className="text-gray-600">
              Click a location name to view it on the map and check contact
              details.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            {/* Google Map Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
              <div className="relative h-64 w-full sm:h-[350px] md:h-[450px]">
                <iframe
                  key={`${selectedLocation.lat}-${selectedLocation.lng}`}
                  title={`${selectedLocation.city} location on Google Maps`}
                  src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="border-t border-gray-200 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Selected Location
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {selectedLocation.city}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedLocation.address}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Locations List with Inline Accordions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Find Our Locations
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a location to view details
                  </p>
                </div>
              </div>

              {/* Clickable Location Accordion Items */}
              <div className="space-y-4">
                {locations.map((location) => {
                  const isSelected = selectedLocation.city === location.city;
                  const isExpanded = expandedCity === location.city;

                  return (
                    <div
                      key={location.city}
                      className={`overflow-hidden rounded-xl border transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                          : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      {/* Location Header Button */}
                      <button
                        type="button"
                        onClick={() => handleLocationClick(location)}
                        aria-pressed={isSelected}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </div>

                          <div className="min-w-0">
                            <span
                              className={`block font-semibold ${
                                isSelected ? "text-blue-700" : "text-gray-900"
                              }`}
                            >
                              {location.city}
                            </span>
                            <span className="mt-1 block text-sm text-gray-500">
                              {location.address}
                            </span>
                          </div>
                        </div>

                        {/* Dropdown Chevron Indicator */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-blue-600" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19 9-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Inline Expandable Contact Details Dropdown */}
                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-white p-5 animate-fadeIn">
                          <h4 className="mb-4 text-md font-bold text-gray-900">
                            Contact Details
                          </h4>

                          {/* Address */}
                          <div className="mb-3 flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-500">
                                Address
                              </p>
                              <p className="text-sm text-gray-700">
                                {location.address}
                              </p>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="mb-3 flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 8l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-500">
                                Email
                              </p>
                              <a
                                href={`mailto:${location.email}`}
                                className="break-all text-sm text-blue-600 hover:underline"
                              >
                                {location.email}
                              </a>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 5a2 2 0 0 1 2-2h3l2 5-2 1-1 2a11 11 0 0 0 6 6l2-1 5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5Z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-500">
                                Phone
                              </p>
                              <a
                                href={`tel:${location.phone.replace(/\s/g, "")}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {location.phone}
                              </a>
                            </div>
                          </div>

                          {/* Quick Directions Button */}
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Get Directions to {location.city}
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Form Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Side: Form */}
          <div className="lg:col-span-7 z-10">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Contact With Us
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Send us a message and we&apos;ll respond as soon as possible
            </p>

            <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
              {statusMessage.text && (
                <div
                  className={`p-4 rounded-lg text-sm border ${
                    statusMessage.type === "success"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    aria-label="Name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    placeholder="Name*"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <InlineError id="contact-name-error" message={fieldErrors.name} />
                </div>
                <div>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    aria-label="Email address"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    placeholder="Email Address*"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <InlineError id="contact-email-error" message={fieldErrors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    aria-label="Phone number"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <InlineError id="contact-phone-error" message={fieldErrors.phone} />
                </div>
                <div>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    aria-label="Subject"
                    aria-invalid={Boolean(fieldErrors.subject)}
                    aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <InlineError id="contact-subject-error" message={fieldErrors.subject} />
                </div>
              </div>

              <div>
                <textarea
                  id="contact-message"
                  name="message"
                  aria-label="Your message"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                  rows={5}
                  placeholder="Your Message here*"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-w-0 resize-none rounded-lg border border-transparent bg-white px-4 py-3 text-sm text-gray-800 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InlineError id="contact-message-error" message={fieldErrors.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side: Doctor Team Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-md h-[400px] sm:h-[480px]">
              <Image
                src="/doctors-team2.png"
                alt="Medical Team"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
