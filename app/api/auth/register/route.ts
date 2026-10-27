/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.format() },
        { status: 400 },
      );
    }

    const { name, email, password, role, phone_no } = validation.data;
    const normalizedEmail = email.toLowerCase();
    const existingUser = await db.collection("user").findOne<{
      emailVerified?: boolean;
    }>({ email: normalizedEmail }, { projection: { emailVerified: 1 } });

    if (existingUser?.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "This user is already registered and verified. Please sign in instead.",
        },
        { status: 409 },
      );
    }

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered but not verified. Sign in to receive a new verification code.",
        },
        { status: 409 },
      );
    }

    const userResponse = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role,
        phone_no,
      },
      headers: req.headers,
    });

    try {
      const otpResponse = await auth.api.sendVerificationOTP({
        body: {
          email,
          type: "email-verification",
        },
        headers: req.headers,
      });

      if (otpResponse && "error" in otpResponse && otpResponse.error) {
        throw new Error("Verification email could not be sent.");
      }
    } catch (emailError: any) {
      console.error("OTP Delivery Error:", emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Your account was created, but we couldn't send the verification email. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! OTP sent to your email.",
        response: userResponse,
      },
      { status: 201 },
    );
  } catch (e: any) {
    console.error("Registration route error:", e);

    const alreadyRegistered =
      e?.statusCode === 422 ||
      e?.status === 422 ||
      e?.status === "UNPROCESSABLE_ENTITY";
    const statusCode = alreadyRegistered ? 409 : 500;
    const errorMessage =
      alreadyRegistered
        ? "This email is already registered. Please sign in instead."
        : e?.message || "Registration failed. Please try again.";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode },
    );
  }
}
