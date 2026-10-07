// models/index.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

// Appointment Model
export interface IAppointment extends Document {
  patientName: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  time: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    address: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

// Feedback Model
export interface IFeedback extends Document {
  name: string;
  rating: number;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

// FAQ Query Model
export interface IFaqSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  question: string;
  createdAt: Date;
}

const FaqSubmissionSchema = new Schema<IFaqSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    question: { type: String, required: true },
  },
  { timestamps: true },
);

// Contact Model
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export const Appointment =
  models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
export const Feedback =
  models.Feedback || model<IFeedback>("Feedback", FeedbackSchema);
export const FaqSubmission =
  models.FaqSubmission ||
  model<IFaqSubmission>("FaqSubmission", FaqSubmissionSchema);
export const ContactMessage =
  models.ContactMessage ||
  model<IContactMessage>("ContactMessage", ContactMessageSchema);
