// lib/auth-guard.ts
import { auth } from "@/lib/auth"; // Adjust import to match your better-auth server configuration
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function verifyAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 },
      ),
      user: null,
    };
  }

  // Verify role field attached to better-auth user object
  if (session.user.role !== "ADMIN") {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden. Admin privileges required." },
        { status: 403 },
      ),
      user: session.user,
    };
  }

  return { authorized: true, user: session.user, response: null };
}
