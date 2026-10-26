// app/api/admin/appointments/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Appointment } from "@/models";
import { verifyAdmin } from "@/lib/auth-guard-serverside";
import { z } from "zod";

const updateStatusSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

// GET: View all appointments
export async function GET(req: Request) {
  try {
    const authCheck = await verifyAdmin();
    if (!authCheck.authorized) return authCheck.response;

    await connectDB();
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const query = statusFilter ? { status: statusFilter } : {};
    const appointments = await Appointment.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH: Change appointment status (e.g., mark as COMPLETED)
export async function PATCH(req: Request) {
  try {
    const authCheck = await verifyAdmin();
    if (!authCheck.authorized) return authCheck.response;

    const body = await req.json();
    const validation = updateStatusSchema.safeParse(body);

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
      { status: validation.data.status },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: `Status updated to ${validation.data.status}`,
        appointment: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
