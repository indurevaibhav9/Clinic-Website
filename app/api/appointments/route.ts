/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/appointments/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Appointment } from "@/models";
import { appointmentSchema, cancelAppointmentSchema } from "@/lib/validation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Book Appointment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await connectDB();
    const appointment = await Appointment.create({
      ...validation.data,
      date: new Date(validation.data.date),
      status: "PENDING",
    });

    return NextResponse.json(
      { message: "Appointment booked successfully", appointment },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Cancel Appointment by Patient
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const validation = cancelAppointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await connectDB();
    const updated = await Appointment.findByIdAndUpdate(
      validation.data.appointmentId,
      { status: "CANCELLED" },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Appointment cancelled successfully", appointment: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 },
    );
  }
}


