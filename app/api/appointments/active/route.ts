/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Appointment } from "@/models";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectDB();

    const queryFilter: Record<string, any> = {
      status: { $in: ["PENDING", "CONFIRMED", "CANCELLED"] },
    };

    // If an email query parameter is passed, verify session & authorization
    if (id) {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session || !session.user) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 401 },
        );
      }

      if (session.user.id.toLowerCase() !== id.toLowerCase()) {
        return NextResponse.json(
          { error: "Forbidden: You can only view your own appointments" },
          { status: 403 },
        );
      }

      queryFilter.id = id;
    }

    const appointments = await Appointment.find(queryFilter).sort({
      createdAt: -1,
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching active appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
