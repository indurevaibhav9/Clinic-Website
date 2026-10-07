// lib/validations.ts
import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1).max(5),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export const faqSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string(),
  question: z.string().min(5, "Question must be at least 5 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(2, "Service name is required"),
  date: z.string().or(z.date()),
  time: z.string().min(1, "Time is required"),
  address: z.string(),
});

export const cancelAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
});
