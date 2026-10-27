// lib/validations.ts
import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  rating: z.number().int().min(1, "Select a rating").max(5, "Rating must be between 1 and 5"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  service: z.string().trim().min(1, "Select the service you used"),
  message: z.string().trim().min(5, "Feedback must be at least 5 characters").max(2000, "Feedback cannot exceed 2000 characters"),
});

export const faqSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  service: z.string().trim().min(1, "Select a service"),
  question: z.string().trim().min(5, "Question must be at least 5 characters").max(2000, "Question cannot exceed 2000 characters"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional().refine((value) => !value || /^\+?[1-9]\d{7,14}$/.test(value), "Enter a valid phone number"),
  subject: z.string().trim().max(150, "Subject cannot exceed 150 characters").optional(),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(2000, "Message cannot exceed 2000 characters"),
});

export const appointmentSchema = z.object({
  patientName: z.string().trim().min(2, "Patient name must be at least 2 characters").max(100, "Patient name cannot exceed 100 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  service: z.string().trim().min(2, "Select a service"),
  date: z.string().refine((value) => !Number.isNaN(Date.parse(value)), "Choose a valid appointment date").refine((value) => value >= new Date().toISOString().slice(0, 10), "Appointment date cannot be in the past"),
  time: z.string().min(1, "Time is required"),
  address: z.string().trim().min(5, "Address must be at least 5 characters").max(300, "Address cannot exceed 300 characters"),
});

export const cancelAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
});

export const communicateSchema = z.object({
  type: z.enum(["whatsapp", "email"]),
  phone: z.string().optional(),
  email: z.string().trim().email("Enter a valid email address").optional(),
  patientName: z.string().trim().min(2, "Patient name must be at least 2 characters").max(100, "Patient name cannot exceed 100 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message cannot exceed 2000 characters"),
  subject: z.string().trim().max(150, "Subject cannot exceed 150 characters").optional(),
}).superRefine((data, context) => {
  if (data.type === "whatsapp" && !data.phone?.trim()) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Phone number is required for WhatsApp" });
  }
  if (data.type === "whatsapp" && data.phone && !/^\+?[1-9][\d\s()-]{6,19}$/.test(data.phone.trim())) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Enter a valid phone number with country code" });
  }
  if (data.type === "email" && !data.email) {
    context.addIssue({ code: "custom", path: ["email"], message: "Email address is required" });
  }
  if (data.type === "email" && !data.subject?.trim()) {
    context.addIssue({ code: "custom", path: ["subject"], message: "Subject is required" });
  }
});

export const patientSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
});
