// lib/auth-guard.ts
import { auth } from "@/lib/auth"; // Adjust import to match your better-auth server configuration
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type VerifyAdminResult =
  | {
      authorized: true;
      user: {
        role?: string | null;
        [key: string]: unknown;
      };
      response: null;
    }
  | {
      authorized: false;
      user: {
        role?: string | null;
        [key: string]: unknown;
      } | null;
      response: Response;
    };

export async function verifyAdmin(): Promise<VerifyAdminResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user ?? null;

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 },
      ),
      user: null,
    };
  }

  if (user.role !== "ADMIN") {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden. Admin privileges required." },
        { status: 403 },
      ),
      user,
    };
  }

  return { authorized: true, user, response: null };
}
