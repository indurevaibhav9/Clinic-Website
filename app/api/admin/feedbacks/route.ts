// app/api/admin/feedbacks/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Feedback } from "@/models";
import { verifyAdmin } from "@/lib/auth-guard-serverside";

export async function GET() {
  try {
    const authCheck = await verifyAdmin();
    if (!authCheck.authorized) return authCheck.response;

    await connectDB();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
