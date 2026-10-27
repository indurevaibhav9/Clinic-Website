/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { signInSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate incoming payload using Zod
    const validation = signInSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await db.collection("user").findOne(
      { email: email.toLowerCase() },
      { projection: { _id: 1 } },
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not registered. Please create an account first." },
        { status: 404 },
      );
    }

    // 2. Authenticate user with Better Auth
    const authResult = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      // Pass request headers to allow Better Auth to attach session cookies
      asResponse: true,
      headers: req.headers,
    });

    return authResult;
  } catch (e: any) {
    // 3. Handle specific authentication errors
    const statusCode = e?.status || 401;
    let errorMessage = "Invalid email or password";

    if (statusCode === 403) {
      errorMessage = "Please verify your email address before signing in.";
    } else if (e?.message) {
      errorMessage = e.message;
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode }
    );
  }
}