// app/api/faq/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { FaqSubmission } from "@/models";
import { faqSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = faqSchema.safeParse(body);

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
    const faq = await FaqSubmission.create(validation.data);

    return NextResponse.json(
      { message: "Question submitted successfully", faq },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
