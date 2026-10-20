import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"),
  plugins: [emailOTPClient(), inferAdditionalFields<typeof auth>()],
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  requestPasswordReset,
  deleteUser,
} = authClient;
