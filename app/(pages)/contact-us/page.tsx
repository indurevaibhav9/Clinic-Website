/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LocationInfo {
  city: string;
  address: string;
  email: string;
  phone: string;
  lat:number;
  lng:number;
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

  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(locations[0]);        
    
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      setStatusMessage({
        type: "error",
        text:
          error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
  <div className="min-h-screen bg-white">
    {/* Page Header */}
    <section className="bg-blue-600 px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-blue-100">
          We are here to help you with your healthcare needs.
          Reach out to us or visit one of our locations in Pune.
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
            Click a location name to view it on the map.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Google Map */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="relative h-[350px] w-full md:h-[450px]">
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

          {/* One Card Containing All Locations */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
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
                <h3 className="text-2xl font-bold text-gray-900">
                  Find Our Locations
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a location below
                </p>
              </div>
            </div>

            {/* Clickable Location Names */}
            <div className="mb-8 space-y-3">
              {locations.map((location) => {
                const isSelected =
                  selectedLocation.city === location.city;

                return (
                  <button
                    key={location.city}
                    type="button"
                    onClick={() => setSelectedLocation(location)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                    }`}
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
                            isSelected
                              ? "text-blue-700"
                              : "text-gray-900"
                          }`}
                        >
                          {location.city}
                        </span>

                        <span className="mt-1 block text-sm text-gray-500">
                          {location.address}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12 4 4L19 6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 18 6-6-6-6"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Location Contact Details */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="mb-5 text-lg font-bold text-gray-900">
                Contact Details
              </h4>

              {/* Address */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                  <p className="font-semibold text-gray-900">
                    Address
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {selectedLocation.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                      d="M3 8l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${selectedLocation.email}`}
                    className="mt-1 block break-all text-sm text-gray-600 hover:text-blue-600"
                  >
                    {selectedLocation.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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
                      d="M3 5a2 2 0 0 1 2-2h3l2 5-2 1-1 2a11 11 0 0 0 6 6l2-1 5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Phone Number
                  </p>
                  <a
                    href={`tel:${selectedLocation.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-gray-600 hover:text-blue-600"
                  >
                    {selectedLocation.phone}
                  </a>
                </div>
              </div>

              {/* Directions */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Get Directions to {selectedLocation.city}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Keep your existing Contact Form Section and Doctor Team Section below */}
  </div>
);
  
  
  
  
  
  

}
