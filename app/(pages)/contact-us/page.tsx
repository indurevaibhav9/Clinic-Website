/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LocationInfo {
  city: string;
  address: string;
  email: string;
  phone: string;
}

const locations: LocationInfo[] = [
  {
    city: "New York",
    address: "198 West 21th Street, Suite New York NY 10010",
    email: "medifay@example.com",
    phone: "+88 ( 5548 ) 6548",
  },
  {
    city: "Amsterdam",
    address: "198 West 21th Street, Suite New York NY 10010",
    email: "medifay@example.com",
    phone: "+88 ( 5548 ) 6548",
  },
  {
    city: "London",
    address: "198 West 21th Street, Suite New York NY 10010",
    email: "medifay@example.com",
    phone: "+88 ( 5548 ) 6548",
  },
  {
    city: "San Francisco",
    address: "198 West 21th Street, Suite New York NY 10010",
    email: "medifay@example.com",
    phone: "+88 ( 5548 ) 6548",
  },
];

export default function ContactPage() {
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* 1. Header Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-16 px-6 md:px-16 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            Contact Us
          </h1>
          <nav className="mt-2 text-sm text-blue-100 flex items-center space-x-2">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-blue-200">Contact Us</span>
          </nav>
        </div>
        {/* Background DNA Pattern Overlay Effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* 2. Map & Contact Info Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Column */}
          <div className="lg:col-span-5 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="w-full h-full min-h-[350px] rounded-xl overflow-hidden relative">
              <iframe
                title="MMF Ratna Memorial Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.027278776677!2d73.82698217496309!3d18.527669382567307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf77fce67481%3A0xececcc30848966ca!2sMMF%20Ratna%20Memorial%20Hospital!5e0!3m2!1sen!2sus!4v1791293103058!5m2!1sen!2sus"
                className="w-full h-full border-0 rounded-xl min-h-[350px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Our Contact Info
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Our Contact Info and we&apos;ll respond as soon as possible
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {locations.map((loc, idx) => (
                <div key={idx} className="space-y-1 text-xs sm:text-sm">
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {loc.city}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    <span className="font-medium text-gray-700">Address: </span>
                    {loc.address}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Email: </span>
                    {loc.email}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Phone: </span>
                    {loc.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Form Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-indigo-50/50 py-16 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Form */}
          <div className="lg:col-span-7 z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Contact With Us
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Send us a message and we&apos;ll respond as soon as possible
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message here*"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none"
                />
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
