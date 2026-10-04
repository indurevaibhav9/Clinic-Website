/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyOtpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = verifyOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Invalid inputs" },
        { status: 400 }
      );
    }

    const { email, otp } = validation.data;

    const result = await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
      headers: req.headers,
    });

    if (!result.status) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Account verified successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e?.message || "OTP verification failed" },
      { status: 400 }
    );
  }
}