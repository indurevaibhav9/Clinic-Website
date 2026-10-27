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
import { communicateSchema } from "@/lib/validation";
import { InlineError } from "@/components/ui/inline-error";

// --- TYPES ALIGNED WITH DB SCHEMAS ---
interface Appointment {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address?: string;
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
  name: string;
  email: string;
  phone: string;
  service: string;
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
  const [commFieldErrors, setCommFieldErrors] = useState<Record<string, string>>({});

  // Role Guard Check
  const isAdmin =
    (session?.user as any)?.role === "admin" ||
    (session?.user as any)?.role === "ADMIN";

  // --- FETCH HANDLERS ---
  const fetchAppointments = useCallback(async () => {
    setLoadingData(true);
    try {
      const url =
        statusFilter && statusFilter !== "ALL"
          ? `/api/admin/appointments?status=${statusFilter}`
          : "/api/admin/appointments";

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

  const fetchFeedbacks = useCallback(async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/feedbacks");
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      const data = await res.json();
      setFeedbacks(data.feedbacks || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching feedbacks");
    } finally {
      setLoadingData(false);
    }
  }, []);

  const fetchFaqs = useCallback(async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/faqs");
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const data = await res.json();
      setFaqs(data.faqs || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching FAQs");
    } finally {
      setLoadingData(false);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data.contacts || data || []);
    } catch (err: any) {
      toast.error(err.message || "Error fetching contacts");
    } finally {
      setLoadingData(false);
    }
  }, []);

  // Trigger Data Fetching on Tab/Filter Change
  useEffect(() => {
    if (!isAdmin) return;

    const loadData = async () => {
      if (activeTab === "appointments") await fetchAppointments();
      if (activeTab === "feedbacks") await fetchFeedbacks();
      if (activeTab === "faqs") await fetchFaqs();
      if (activeTab === "contacts") await fetchContacts();
    };

    loadData();
  }, [
    activeTab,
    statusFilter,
    isAdmin,
    fetchAppointments,
    fetchFeedbacks,
    fetchFaqs,
    fetchContacts,
  ]);

  // --- ACTIONS ---
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string,
  ) => {
    setUpdatingId(appointmentId);
    try {
      const res = await fetch("/api/admin/appointments", {
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

    const rawPayload =
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

    const validation = communicateSchema.safeParse(rawPayload);
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setCommFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message || "Please correct the highlighted fields.");
      return;
    }

    setCommSubmitting(true);

    try {
      const res = await fetch("/api/admin/communicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

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
      setCommFieldErrors({});
    } catch (err: any) {
      toast.error(err.message || "Communication failed");
    } finally {
      setCommSubmitting(false);
    }
  };

  const fillCommForm = ({
    name,
    phone = "",
    email = "",
    subject = "",
    type = "email",
  }: {
    name: string;
    phone?: string;
    email?: string;
    subject?: string;
    type?: "whatsapp" | "email";
  }) => {
    setCommType(type);
    setCommForm({
      patientName: name || "",
      phone: phone || "",
      email: email || "",
      subject:
        subject || (type === "email" ? "MediFast Healthcare Inquiry" : ""),
      message: "",
    });
    setActiveTab("communicate");
  };

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              M
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                MediFast Admin
              </h1>
              <p className="text-xs text-gray-500">
                Healthcare Operations Center
              </p>
            </div>
          </div>

          <div className="flex max-w-full items-center gap-3">
            <span className="max-w-full break-all rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Admin: {session.user.name || session.user.email}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Nav Tabs */}
        <div className="-mx-4 mb-6 flex flex-nowrap items-center gap-2 overflow-x-auto overscroll-x-contain border-b border-gray-200 px-4 pb-4 sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
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
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
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
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
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
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
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
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
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
              <div className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm sm:w-auto">
                <Filter className="ml-2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm font-medium text-gray-700 outline-none sm:flex-none"
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
              <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-gray-500 sm:p-12">
                No appointments found for the selected status.
              </div>
            ) : (
              <>
              <div className="space-y-3 lg:hidden">
                {appointments.map((apt) => (
                  <article key={apt._id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words font-semibold text-gray-900">{apt.patientName}</h3>
                        <p className="break-all text-xs text-gray-500">{apt.email}</p>
                        <p className="text-xs text-gray-500">{apt.phone}</p>
                      </div>
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                        {apt.status}
                      </span>
                    </div>
                    <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-3 text-sm sm:grid-cols-2">
                      <div><dt className="text-xs text-gray-500">Service</dt><dd className="font-medium text-gray-800">{apt.service}</dd></div>
                      <div><dt className="text-xs text-gray-500">Date &amp; Time</dt><dd className="text-gray-700">{new Date(apt.date).toLocaleDateString()} · {apt.time}</dd></div>
                      <div className="sm:col-span-2"><dt className="text-xs text-gray-500">Location</dt><dd className="break-words text-gray-700">{apt.address || "N/A"}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                      {updatingId === apt._id ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      ) : (
                        <>
                          {apt.status !== "CONFIRMED" && <button onClick={() => handleStatusChange(apt._id, "CONFIRMED")} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">Confirm</button>}
                          {apt.status !== "COMPLETED" && <button onClick={() => handleStatusChange(apt._id, "COMPLETED")} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100">Complete</button>}
                          <button type="button" onClick={() => fillCommForm({ name: apt.patientName, phone: apt.phone, email: apt.email, subject: `Regarding your ${apt.service} appointment`, type: "whatsapp" })} className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200">Notify</button>
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <div className="hidden overflow-x-auto overscroll-x-contain rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
                <table className="w-full min-w-[950px] border-collapse text-left text-sm">
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
                          <div>{new Date(apt.date).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">
                            {apt.time}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs truncate">
                          {apt.address || "N/A"}
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
                                type="button"
                                onClick={() =>
                                  fillCommForm({
                                    name: apt.patientName,
                                    phone: apt.phone,
                                    email: apt.email,
                                    subject: `Regarding your ${apt.service} appointment`,
                                    type: "whatsapp",
                                  })
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
              </>
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
              <div className="rounded-2xl bg-white p-6 text-center text-gray-500 sm:p-12">
                No feedback records found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {feedbacks.map((item) => (
                  <div
                    key={item._id}
                    className="flex min-w-0 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-bold text-yellow-700">
                          {item.rating} ★
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-blue-600 font-medium">
                        Service: {item.service}
                      </p>
                      <p className="mt-4 break-words text-sm leading-relaxed text-gray-600">
                        &ldquo;{item.message}&rdquo;
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-start justify-between gap-3 border-t border-gray-50 pt-3">
                      <div className="min-w-0 text-xs text-gray-400">
                        <p className="break-all">{item.email}</p>
                        <p>{item.phone}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          fillCommForm({
                            name: item.name,
                            email: item.email,
                            phone: item.phone,
                            subject: "Thank you for your feedback",
                            type: "email",
                          })
                        }
                        className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Reply
                      </button>
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
              <div className="rounded-2xl bg-white p-6 text-center text-gray-500 sm:p-12">
                No FAQ submissions found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {faqs.map((faq) => (
                  <div
                    key={faq._id}
                    className="flex min-w-0 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
                  >
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 mb-2">
                        {faq.service}
                      </span>
                      <p className="break-words text-base font-semibold text-gray-900">
                        Q: {faq.question}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-start justify-between gap-3 border-t border-gray-50 pt-3 text-xs text-gray-500">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800">{faq.name}</p>
                        <p>
                          <span className="break-all">{faq.email}</span> | {faq.phone}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          fillCommForm({
                            name: faq.name,
                            email: faq.email,
                            phone: faq.phone,
                            subject: "Regarding your FAQ Inquiry",
                            type: "email",
                          })
                        }
                        className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        Reply
                      </button>
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
              <div className="rounded-2xl bg-white p-6 text-center text-gray-500 sm:p-12">
                No contact messages found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contacts.map((msg) => (
                  <div
                    key={msg._id}
                    className="flex min-w-0 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900">
                            {msg.name}
                          </h3>
                          <p className="break-all text-xs text-gray-400">
                            {msg.email} {msg.phone ? `• ${msg.phone}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            fillCommForm({
                              name: msg.name,
                              email: msg.email,
                              phone: msg.phone ?? "",
                              subject: msg.subject
                                ? `Re: ${msg.subject}`
                                : "MediFast Support Reply",
                              type: "email",
                            })
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
                      <p className="mt-2 break-words text-sm leading-relaxed text-gray-600">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 5: SEND COMMUNICATION --- */}
        {activeTab === "communicate" && (
          <div className="mx-auto max-w-2xl text-black space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Patient Communication
              </h2>
              <p className="text-sm text-gray-500">
                Send direct email notifications or open a pre-filled WhatsApp
                link.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-8">
              {/* Type Switcher */}
              <div className="mb-6 flex flex-col gap-1 rounded-xl bg-gray-100 p-1 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setCommType("whatsapp")}
                  className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-xs font-bold transition-all sm:text-sm ${
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
                  className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-xs font-bold transition-all sm:text-sm ${
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
                  <label htmlFor="comm-patient-name" className="mb-1 block text-xs font-semibold text-gray-700">
                    Patient Name
                  </label>
                  <input
                    id="comm-patient-name"
                    type="text"
                    required
                    value={commForm.patientName}
                    aria-invalid={Boolean(commFieldErrors.patientName)}
                    aria-describedby={commFieldErrors.patientName ? "comm-patient-name-error" : undefined}
                    onChange={(e) => {
                      setCommForm({ ...commForm, patientName: e.target.value });
                      setCommFieldErrors((previous) => ({ ...previous, patientName: "" }));
                    }}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <InlineError id="comm-patient-name-error" message={commFieldErrors.patientName} />
                </div>

                {commType === "whatsapp" ? (
                  <div>
                    <label htmlFor="comm-phone" className="mb-1 block text-xs font-semibold text-gray-700">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      id="comm-phone"
                      required
                      value={commForm.phone}
                      aria-invalid={Boolean(commFieldErrors.phone)}
                      aria-describedby={commFieldErrors.phone ? "comm-phone-error" : undefined}
                      onChange={(e) => {
                        setCommForm({ ...commForm, phone: e.target.value });
                        setCommFieldErrors((previous) => ({ ...previous, phone: "" }));
                      }}
                      placeholder="e.g. 919876543210"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    <InlineError id="comm-phone-error" message={commFieldErrors.phone} />
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="comm-email" className="mb-1 block text-xs font-semibold text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="comm-email"
                        required
                        value={commForm.email}
                        aria-invalid={Boolean(commFieldErrors.email)}
                        aria-describedby={commFieldErrors.email ? "comm-email-error" : undefined}
                        onChange={(e) => {
                          setCommForm({ ...commForm, email: e.target.value });
                          setCommFieldErrors((previous) => ({ ...previous, email: "" }));
                        }}
                        placeholder="e.g. aarav@example.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                      <InlineError id="comm-email-error" message={commFieldErrors.email} />
                    </div>
                    <div>
                      <label htmlFor="comm-subject" className="mb-1 block text-xs font-semibold text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="comm-subject"
                        required
                        value={commForm.subject}
                        aria-invalid={Boolean(commFieldErrors.subject)}
                        aria-describedby={commFieldErrors.subject ? "comm-subject-error" : undefined}
                        onChange={(e) => {
                          setCommForm({ ...commForm, subject: e.target.value });
                          setCommFieldErrors((previous) => ({ ...previous, subject: "" }));
                        }}
                        placeholder="e.g. Appointment Confirmation"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                      <InlineError id="comm-subject-error" message={commFieldErrors.subject} />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="comm-message" className="mb-1 block text-xs font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="comm-message"
                    rows={4}
                    required
                    value={commForm.message}
                    aria-invalid={Boolean(commFieldErrors.message)}
                    aria-describedby={commFieldErrors.message ? "comm-message-error" : undefined}
                    onChange={(e) => {
                      setCommForm({ ...commForm, message: e.target.value });
                      setCommFieldErrors((previous) => ({ ...previous, message: "" }));
                    }}
                    placeholder="Type your message here..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <InlineError id="comm-message-error" message={commFieldErrors.message} />
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
