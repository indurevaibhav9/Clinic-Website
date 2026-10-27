import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long").max(100, "Name cannot exceed 100 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.literal("NORMAL_USER"),
    phone_no: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number, including country code if needed"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const verifyOtpSchema = z.object({
    email: z.string().trim().email("Enter a valid email address"),
    otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit verification code")
})

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export type SignUpInput = z.infer<typeof signUpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;