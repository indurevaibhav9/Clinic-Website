// app/api/feedback/route.ts
import { NextResponse } from "next/server";

import { Feedback } from "@/models";
import { feedbackSchema } from "@/lib/validation";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = feedbackSchema.safeParse(body);

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
    const feedback = await Feedback.create(validation.data);

    return NextResponse.json(
      { message: "Feedback submitted successfully", feedback },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
