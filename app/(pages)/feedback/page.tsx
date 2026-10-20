"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dna,
  Stethoscope,
  HeartPulse,
  MessageSquareHeart,
  Send,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Patient",
    rating: 5,
    message:
      "The doctors were very professional and caring. The appointment process was simple and the staff made me feel comfortable throughout my visit.",
  },
  {
    name: "Rahul Patil",
    role: "Patient",
    rating: 5,
    message:
      "I had a very good experience with MediFast. The doctor listened carefully to my concerns and explained everything clearly.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Patient",
    rating: 4,
    message:
      "The online appointment process was convenient and easy to use. I would definitely recommend the clinic to my family and friends.",
  },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          rating: rating,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setRating(0);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO / PAGE BANNER */}
      <section className="relative h-[220px] overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="absolute -right-10 -top-20 opacity-20">
          <Dna className="h-[330px] w-[330px] rotate-12 text-white" />
        </div>

        <div className="absolute right-[25%] top-10 opacity-10">
          <Dna className="h-20 w-20 -rotate-12 text-white" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-1.5 w-10 rounded-full bg-cyan-300" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                MediFast
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Feedback
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-white/80">Home</span>
              <span className="text-white/50">/</span>
              <span className="font-medium text-cyan-200">Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK INTRO + RATING */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
        <div className="absolute left-8 top-20 hidden opacity-[0.10] lg:block">
          <HeartPulse className="h-24 w-24 text-blue-500" />
        </div>

        <div className="absolute right-8 top-16 hidden opacity-[0.10] lg:block">
          <MessageSquareHeart className="h-24 w-24 text-blue-500" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* LEFT CONTENT */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-50" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-blue-600" />
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Your Opinion Matters
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                Help Us Provide
                <span className="block text-blue-600">Better Healthcare</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
                Your feedback helps us understand what we are doing well and
                where we can improve. Every response helps us create a better
                healthcare experience for our patients.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-5xl font-bold text-gray-900">4.8</div>

                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-blue-100 sm:h-16 sm:w-px" />

                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Excellent Patient Experience
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Thank you to all our patients for trusting MediFast with
                      their healthcare.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Your feedback helps us improve our services.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Share your experience with our doctors and staff.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Help other patients make informed decisions.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - FEEDBACK FORM */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-100/40 sm:p-8">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-blue-600" />
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Share Your Experience
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Tell Us About Your Visit
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                We would love to hear about your experience with our healthcare
                team.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                <h4 className="mt-3 text-lg font-bold text-green-900">
                  Thank You for Your Feedback!
                </h4>
                <p className="mt-2 text-sm text-green-700">
                  Your response has been submitted successfully.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm font-semibold text-green-800 underline hover:text-green-900"
                >
                  Submit another feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="985262..."
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Service Used
                    </label>

                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="appointment">Doctor Appointment</option>
                      <option value="consultation">General Consultation</option>
                      <option value="online-consultation">
                        Online Consultation
                      </option>
                      <option value="diagnostic">Diagnostic Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    How would you rate your experience?
                  </label>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    {rating === 0
                      ? "Select a rating"
                      : `${rating} out of 5 stars`}
                  </p>
                </div>

                {/* Feedback Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Feedback
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your experience..."
                    required
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-blue-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS */}
      <section className="relative overflow-hidden bg-gray-50 py-12 sm:py-16 lg:py-24">
        <div className="absolute -left-12 top-10 hidden opacity-[0.06] lg:block">
          <Dna className="h-52 w-52 rotate-12 text-blue-600" />
        </div>

        <div className="absolute -right-12 bottom-10 hidden opacity-[0.06] lg:block">
          <Dna className="h-52 w-52 -rotate-12 text-blue-600" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-1.5 w-10 rounded-full bg-blue-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Patient Stories
              </span>
              <span className="h-1.5 w-10 rounded-full bg-blue-600" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Patients Say
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500">
              We are grateful for the trust our patients place in us. Here are
              some experiences shared by our patients.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50"
              >
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Quote className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-gray-600">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-10 text-center shadow-xl sm:px-12 sm:py-12">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-white/10" />

            <div className="relative">
              <MessageSquareHeart className="mx-auto h-10 w-10 text-cyan-200" />

              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                Your Feedback Makes a Difference
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Thank you for helping us improve the quality of care and
                experience we provide to every patient.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
