import { authClient } from "@/lib/auth-client"; // Adjust path to your auth client

declare module "better-auth/client" {
  interface User {
    role: "ADMIN" | "NORMAL_USER" | "ASSISTENT" | string;
  }
}
