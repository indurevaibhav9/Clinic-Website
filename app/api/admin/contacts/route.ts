// app/api/admin/contacts/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { ContactMessage } from "@/models";
import { verifyAdmin } from "@/lib/auth-guard-serverside";

export async function GET() {
  try {
    const authCheck = await verifyAdmin();
    if (!authCheck.authorized) return authCheck.response;

    await connectDB();
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
