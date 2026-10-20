"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Dna,
  Stethoscope,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const faqs = [
  {
    question: "How Much Does Medical Cost?",
    answer:
      "The cost of medical services depends on the type of treatment, consultation, and healthcare service required. Please contact us for detailed pricing information.",
  },
  {
    question: "What Health Plans Are Available Through Medicare?",
    answer:
      "We accept various Medicare plans including Part A, Part B, and several Advantage plans. Contact our billing department to verify your specific coverage details.",
  },
  {
    question: "Will I Be Able To Stay With My Doctor?",
    answer:
      "Yes. We aim to provide continuity of care whenever possible. You can continue consulting with your preferred doctor based on their availability.",
  },
  {
    question: "If I Sign Up For Medical, Will Anything Happen To My Assets?",
    answer:
      "No. Your personal information and assets are handled securely and in strict compliance with medical privacy laws and data protection regulations.",
  },
  {
    question: "What Happens To My Sample Once I Have Provided It?",
    answer:
      "Samples are handled by trained medical professionals, securely transported, and processed in accredited laboratory facilities according to strict clinical standards.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          question: formData.message, // Map message to question
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the FAQ question.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* =========================================================
          HERO / PAGE BANNER
      ========================================================= */}
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
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-cyan-300" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">
                MediFast
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              FAQ
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-white/80">Home</span>
              <span className="text-white/50">/</span>
              <span className="font-medium text-cyan-200">FAQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
        <div className="absolute left-8 top-20 hidden opacity-[0.12] lg:block">
          <FlaskConical className="h-20 w-20 rotate-12 text-blue-500" />
        </div>

        <div className="absolute right-8 top-16 hidden opacity-[0.12] lg:block">
          <Dna className="h-20 w-20 text-blue-500" />
        </div>

        <div className="absolute bottom-10 left-[8%] hidden opacity-[0.07] lg:block">
          <Stethoscope className="h-24 w-24 -rotate-12 text-blue-500" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* LEFT - DOCTOR IMAGE */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[min(78vw,380px)] w-[min(78vw,380px)] rounded-full bg-blue-50" />

            <div className="absolute bottom-5 left-4 hidden opacity-10 sm:block">
              <FlaskConical className="h-36 w-36 rotate-45 text-blue-500" />
            </div>

            <div className="relative h-[min(90vw,430px)] w-full max-w-[500px] sm:h-[430px]">
              <Image
                src="/images/faq-doctors.jpg"
                alt="Healthcare doctors ready to answer questions"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* RIGHT - FAQ */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-1.5 w-10 rounded-full bg-blue-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Common Questions
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked
              <span className="block text-blue-600">Questions</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
              Find answers to some of the most common questions about our
              healthcare services, consultations, and medical procedures.
            </p>

            {/* FAQ List */}
            <div className="mt-8 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "border-blue-200 bg-blue-50/40 shadow-md shadow-blue-100/50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`text-base font-semibold leading-6 transition-colors sm:text-[17px] ${
                          isOpen ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6">
                        <div className="border-t border-blue-100 pt-4">
                          <p className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ASK ANY QUESTION FORM
      ========================================================= */}
      <section className="relative overflow-hidden bg-blue-50 py-12 sm:py-16 lg:py-24">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-100/70" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-blue-600/10" />

            <div className="relative h-[min(90vw,360px)] w-full overflow-hidden rounded-2xl shadow-xl sm:h-[420px]">
              <Image
                src="/images/ask-question-doctors.webp"
                alt="Healthcare professionals"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Professional Care
                </p>
                <p className="text-xs text-gray-500">
                  Your health matters to us
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-1.5 w-10 rounded-full bg-blue-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Get In Touch
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ask Any Question
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
              Have a question about our services? Send us a message and our
              healthcare team will get back to you as soon as possible.
            </p>

            {isSubmitted ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="mt-1 text-sm text-green-700">
                      Thank you for contacting MediFast. Our medical team will
                      respond shortly.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-green-700 underline hover:text-green-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="985262..."
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Type of Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="general-consultation">
                        General Consultation
                      </option>
                      <option value="specialist">
                        Specialist Consultation
                      </option>
                      <option value="diagnostic">Diagnostic Services</option>
                      <option value="online-consultation">
                        Online Consultation
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-blue-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-10 bg-white" />
    </main>
  );
}
