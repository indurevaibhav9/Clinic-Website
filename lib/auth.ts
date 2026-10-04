/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import { APIError, betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "./db";
import { emailOTPClient } from "better-auth/client/plugins";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    uniqueEmail: true,
    async sendResetPassword({ user, url, token }, request) {
      await resend.emails.send({
        from: "Clinic <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "NORMAL_USER",
      },
      phone_no: {
        type: "string",
        required: true,
      },
      password: {
        type: "string"
      }
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          const { data, error } = await resend.emails.send({
            from: "Clinic Auth <onboarding@resend.dev>",
            to: email,
            subject:
              type === "sign-in"
                ? "Sign-in OTP"
                : "Verify your account - OTP Code",
            html: `<p>Your verification code is: <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
          });

          // Resend returns an error object on failure instead of throwing
          if (error) {
            console.error("Resend API Error:", error);

            throw new APIError("BAD_REQUEST", {
              message: `Failed to send email: ${error.message}`,
            });
          }

          console.log("OTP Email Sent Successfully:", data?.id);
        } catch (err: any) {
          console.error("Failed to deliver OTP email:", err);
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: err?.message || "Email delivery failed.",
          });
        }
      },
      otpLength: 6,
      expiresIn: 600,
    }),
  ],
});
