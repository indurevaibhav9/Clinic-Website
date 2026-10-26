/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/validations/auth";
import { connectDB } from "../../../../lib/mongoose";
import User from "@/models/User";
import { db } from "@/lib/db";
import mongoose from "mongoose";
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

    const user = await auth.api.getSession({ headers: req.headers});
    if(user?.user.emailVerified === true){
      return NextResponse.json(
        {
          success: false,
          message: "User already exists and is verified. Please log in instead.",
        },
        { status: 400 },
      );
    }
    // 2. Explicitly send OTP email & catch delivery failures
    try {
      const otpResponse = await auth.api.sendVerificationOTP({
        body: {
          email,
          type: "email-verification",
        },
        headers: req.headers,
      });

      // Better Auth API methods return an object with an error property if the hook throws an APIError
      if (otpResponse && "error" in otpResponse && otpResponse.error) {
        throw new Error("Failed to send OTP email.");
      }
    } catch (emailError: any) {
      console.error("OTP Delivery Error:", emailError);

      // Return a 400 error immediately so the client knows email sending failed
      return NextResponse.json(
        {
          success: false,
          message:
            emailError?.message ||
            "User created, but failed to send verification OTP email.",
        },
        { status: 400 },
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

    const errorMessage = e?.message || "Registration or server error occurred.";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}
