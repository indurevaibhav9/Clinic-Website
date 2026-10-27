import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0]?.message ?? "Enter a valid email address." },
        { status: 400 },
      );
    }

    const user = await db.collection("user").findOne<{ emailVerified?: boolean }>(
      { email: validation.data.email.toLowerCase() },
      { projection: { emailVerified: 1 } },
    );

    return NextResponse.json({
      success: true,
      registered: Boolean(user),
      verified: user?.emailVerified === true,
    });
  } catch (error) {
    console.error("Account status lookup failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to check this account right now. Please try again." },
      { status: 500 },
    );
  }
}
