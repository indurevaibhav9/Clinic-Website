/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/admin/communicate/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const communicateSchema = z.object({
  type: z.enum(["whatsapp", "email"]),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  patientName: z.string(),
  message: z.string().min(1, "Message content is required"),
  subject: z.string().optional(),
});

import { Resend } from "resend";
import { verifyAdmin } from "@/lib/auth-guard-serverside";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const authCheck = await verifyAdmin();
    if (!authCheck.authorized) return authCheck.response;

    const body = await req.json();
    const validation = communicateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { type, phone, email, patientName, message, subject } =
      validation.data;

    // WHATSAPP COMMUNICATION ROUTE
    if (type === "whatsapp") {
      if (!phone) {
        return NextResponse.json(
          { error: "Phone number is required for WhatsApp communication." },
          { status: 400 },
        );
      }

      // Clean phone number (remove spaces, symbols)
      const cleanPhone = phone.replace(/\D/g, "");
      const encodedMessage = encodeURIComponent(
        `Hello ${patientName},\n\n${message}\n\nBest regards,\nMediFast Team`,
      );
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

      return NextResponse.json(
        {
          success: true,
          method: "whatsapp",
          whatsappUrl,
          message: "WhatsApp link generated successfully.",
        },
        { status: 200 },
      );
    }

    // EMAIL COMMUNICATION ROUTE (via Resend)
    if (type === "email") {
      if (!email) {
        return NextResponse.json(
          { error: "Email address is required for Email communication." },
          { status: 400 },
        );
      }

      const senderEmail =
        process.env.RESEND_FROM_EMAIL || "MediFast <onboarding@resend.dev>";
      const emailSubject = subject || "Notification from MediFast";

      // Send Email via Resend
      const { data, error } = await resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">MediFast</h1>
            </div>
            <div style="padding: 24px; color: #333333; line-height: 1.6;">
              <p style="font-size: 16px;">Hello <strong>${patientName}</strong>,</p>
              <p style="font-size: 15px; white-space: pre-wrap;">${message}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="font-size: 13px; color: #666666; margin-bottom: 0;">
                Best regards,<br />
                <strong>MediFast Team</strong>
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return NextResponse.json(
          { error: "Failed to send email via Resend", details: error.message },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          method: "email",
          recipient: email,
          resendId: data?.id,
          message: `Email sent successfully to ${email}.`,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid communication type." },
      { status: 400 },
    );
  } catch (error: any) {
    console.error("Communication API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
