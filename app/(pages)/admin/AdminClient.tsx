/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MessageSquare,
  HelpCircle,
  Mail,
  Send,
  Filter,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

// --- TYPES ---
interface Appointment {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

interface Feedback {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  rating: number;
  message: string;
  createdAt?: string;
}

interface FAQSubmission {
  _id: string;
  name?: string;
  email?: string;
  question: string;
  createdAt?: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export default function AdminClient() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "appointments" | "feedbacks" | "faqs" | "contacts" | "communicate"
  >("appointments");

  // State Data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [faqs, setFaqs] = useState<FAQSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  // Loading States
  const [loadingData, setLoadingData] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Communication Form State
  const [commType, setCommType] = useState<"whatsapp" | "email">("whatsapp");
  const [commForm, setCommForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [commSubmitting, setCommSubmitting] = useState(false);

  // Search Filter State for Tables
  const [searchTerm, setSearchTerm] = useState("");

  // Role Guard Check
  const isAdmin =
    (session?.user as any)?.role === "admin" ||
    (session?.user as any)?.role === "ADMIN";
  // const isAdmin = true
  // --- FETCH HANDLERS ---
  const fetchAppointments = useCallback(async () => {
    setLoadingData(true);
    try {
      const url =
        statusFilter && statusFilter !== "ALL"
          ? `http://localhost:3000/api/admin/appointments?status=${statusFilter}`
          : "http://localhost:3000/api/admin/appointments";

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data.appointments || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching appointments");
    } finally {
      setLoadingData(false);
    }
  }, [statusFilter]);

  const fetchFeedbacks = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/feedbacks");
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      const data = await res.json();
      setFeedbacks(data.feedbacks || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching feedbacks");
    } finally {
      setLoadingData(false);
    }
  };

  const fetchFaqs = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/faqs");
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const data = await res.json();
      setFaqs(data.faqs || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching FAQs");
    } finally {
      setLoadingData(false);
    }
  };

  const fetchContacts = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data.contacts || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching contacts");
    } finally {
      setLoadingData(false);
    }
  };

  // Trigger Data Fetching on Tab/Filter Change
  useEffect(() => {
    if (!isAdmin) return;

    if (activeTab === "appointments") fetchAppointments();
    if (activeTab === "feedbacks") fetchFeedbacks();
    if (activeTab === "faqs") fetchFaqs();
    if (activeTab === "contacts") fetchContacts();
  }, [activeTab, statusFilter, isAdmin, fetchAppointments]);

  // --- ACTIONS ---
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string,
  ) => {
    setUpdatingId(appointmentId);
    try {
      const res = await fetch("http://localhost:3000/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(`Appointment status updated to ${newStatus}`);
      fetchAppointments();
    } catch (err: any) {
      toast.error(err.message || "Error updating appointment status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSendCommunication = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommSubmitting(true);

    try {
      const payload =
        commType === "whatsapp"
          ? {
              type: "whatsapp",
              patientName: commForm.patientName,
              phone: commForm.phone,
              message: commForm.message,
            }
          : {
              type: "email",
              patientName: commForm.patientName,
              email: commForm.email,
              subject: commForm.subject,
              message: commForm.message,
            };

      const res = await fetch("http://localhost:3000/api/admin/communicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();

      if (commType === "whatsapp" && data.whatsappUrl) {
        toast.success("WhatsApp link generated! Opening...");
        window.open(data.whatsappUrl, "_blank");
      } else {
        toast.success("Communication sent successfully!");
      }

      setCommForm({
        patientName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Communication failed");
    } finally {
      setCommSubmitting(false);
    }
  };

  const fillCommForm = (name: string, phone: string, email: string) => {
    setCommForm((prev) => ({
      ...prev,
      patientName: name,
      phone: phone,
      email: email,
    }));
    setActiveTab("communicate");
  };

  // Session / Role Loading Guard
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Access Denied Shield
  if (!session || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You must be logged in as an Administrator to view this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                MediFast Admin
              </h1>
              <p className="text-xs text-gray-500">
                Healthcare Operations Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
              Admin: {session.user.name || session.user.email}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Nav Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "appointments"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Appointments
          </button>

          <button
            onClick={() => setActiveTab("feedbacks")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "feedbacks"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Feedbacks
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "faqs"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            FAQ Inquiries
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "contacts"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Mail className="h-4 w-4" />
            Contact Messages
          </button>

          <button
            onClick={() => setActiveTab("communicate")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "communicate"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Send className="h-4 w-4" />
            Send Communication
          </button>
        </div>

        {/* --- TAB 1: APPOINTMENTS --- */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Appointments
                </h2>
                <p className="text-sm text-gray-500">
                  Filter, confirm, or mark patient visits as completed.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-sm border border-gray-200">
                <Filter className="ml-2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            {loadingData ? (
              <div className="flex h-64 items-center justify-center rounded-2xl bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : appointments.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500 border border-gray-100">
                No appointments found for the selected status.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-gray-100">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-gray-50/50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="p-4">Patient</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((apt) => (
                      <tr
                        key={apt._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-gray-900">
                            {apt.patientName}
                          </p>
                          <p className="text-xs text-gray-500">{apt.email}</p>
                          <p className="text-xs text-gray-500">{apt.phone}</p>
                        </td>
                        <td className="p-4 font-medium text-gray-800">
                          {apt.service}
                        </td>
                        <td className="p-4 text-gray-600">
                          <div>{apt.date}</div>
                          <div className="text-xs text-gray-400">
                            {apt.time}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs truncate">
                          {apt.address}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              apt.status === "CONFIRMED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : apt.status === "PENDING"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : apt.status === "COMPLETED"
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {updatingId === apt._id ? (
                            <Loader2 className="inline-block h-4 w-4 animate-spin text-blue-600" />
                          ) : (
                            <>
                              {apt.status !== "CONFIRMED" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(apt._id, "CONFIRMED")
                                  }
                                  className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                >
                                  Confirm
                                </button>
                              )}
                              {apt.status !== "COMPLETED" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(apt._id, "COMPLETED")
                                  }
                                  className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  fillCommForm(
                                    apt.patientName,
                                    apt.phone,
                                    apt.email,
                                  )
                                }
                                className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                              >
                                Notify
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: FEEDBACKS --- */}
        {activeTab === "feedbacks" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Patient Feedbacks
              </h2>
              <p className="text-sm text-gray-500">
                Ratings and reviews submitted by patients.
              </p>
            </div>

            {loadingData ? (
              <div className="flex h-64 items-center justify-center bg-white rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
                No feedback records found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {feedbacks.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-bold text-yellow-700">
                        {item.rating} ★
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      Service: {item.service || "General"}
                    </p>
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-gray-50 pt-3 text-xs text-gray-400 flex justify-between">
                      <span>{item.email}</span>
                      <span>{item.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: FAQ SUBMISSIONS --- */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                FAQ Submissions
              </h2>
              <p className="text-sm text-gray-500">
                Inquiries submitted from the FAQ section.
              </p>
            </div>

            {loadingData ? (
              <div className="flex h-64 items-center justify-center bg-white rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : faqs.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
                No FAQ submissions found.
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq._id}
                    className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
                  >
                    <p className="text-base font-semibold text-gray-900">
                      Q: {faq.question}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span>Asked by: {faq.name || "Anonymous"}</span>
                      {faq.email && <span>Email: {faq.email}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: CONTACT MESSAGES --- */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Messages
              </h2>
              <p className="text-sm text-gray-500">
                Direct inquiries from the Contact Us form.
              </p>
            </div>

            {loadingData ? (
              <div className="flex h-64 items-center justify-center bg-white rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
                No contact messages found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contacts.map((msg) => (
                  <div
                    key={msg._id}
                    className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{msg.name}</h3>
                        <p className="text-xs text-gray-400">{msg.email}</p>
                      </div>
                      <button
                        onClick={() =>
                          fillCommForm(msg.name, msg.phone || "", msg.email)
                        }
                        className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Reply
                      </button>
                    </div>
                    {msg.subject && (
                      <p className="mt-3 text-xs font-semibold uppercase text-blue-600 tracking-wider">
                        Subject: {msg.subject}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 5: SEND COMMUNICATION --- */}
        {activeTab === "communicate" && (
          <div className="mx-auto max-w-2xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Patient Communication
              </h2>
              <p className="text-sm text-gray-500">
                Send direct email notifications or open a pre-filled WhatsApp
                link.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              {/* Type Switcher */}
              <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setCommType("whatsapp")}
                  className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                    commType === "whatsapp"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  WhatsApp Direct Link
                </button>
                <button
                  type="button"
                  onClick={() => setCommType("email")}
                  className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                    commType === "email"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Direct Email
                </button>
              </div>

              <form onSubmit={handleSendCommunication} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={commForm.patientName}
                    onChange={(e) =>
                      setCommForm({ ...commForm, patientName: e.target.value })
                    }
                    placeholder="e.g. Aarav Sharma"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {commType === "whatsapp" ? (
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      required
                      value={commForm.phone}
                      onChange={(e) =>
                        setCommForm({ ...commForm, phone: e.target.value })
                      }
                      placeholder="e.g. 919876543210"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={commForm.email}
                        onChange={(e) =>
                          setCommForm({ ...commForm, email: e.target.value })
                        }
                        placeholder="e.g. aarav@example.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={commForm.subject}
                        onChange={(e) =>
                          setCommForm({ ...commForm, subject: e.target.value })
                        }
                        placeholder="e.g. Appointment Confirmation"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={commForm.message}
                    onChange={(e) =>
                      setCommForm({ ...commForm, message: e.target.value })
                    }
                    placeholder="Type your message here..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={commSubmitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white shadow-lg transition-all ${
                    commType === "whatsapp"
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                  } disabled:opacity-50`}
                >
                  {commSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {commType === "whatsapp"
                        ? "Generate & Launch WhatsApp"
                        : "Send Email"}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
