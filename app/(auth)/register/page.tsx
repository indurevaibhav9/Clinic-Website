/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signUpSchema } from "@/lib/validations/auth";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
});

type SignUpSchema = z.infer<typeof signUpSchema>;
type OtpSchema = z.infer<typeof otpSchema>;

export default function SignUpForm() {
  const [step, setStep] = React.useState<"REGISTER" | "VERIFY_OTP">("REGISTER");

  const [isLoading, setIsLoading] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [resendTimer, setResendTimer] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();

        if (session.data?.user) {
          router.replace("/home");
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkSession();
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // =========================================================
  // SIGN UP FORM
  // =========================================================

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "NORMAL_USER",
      phone_no: "",
    },
  });

  // =========================================================
  // OTP FORM
  // =========================================================

  const otpForm = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // =========================================================
  // RESEND TIMER
  // =========================================================

  React.useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // =========================================================
  // SIGN UP
  // =========================================================

  async function onSignUpSubmit(data: SignUpSchema) {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        toast.error(resData.message || "Failed to register account.");

        return;
      }

      setUserEmail(data.email);
      setStep("VERIFY_OTP");
      setResendTimer(60);

      toast.success(
        resData.message || "Registration initiated! OTP sent to email.",
      );
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // VERIFY OTP
  // =========================================================

  async function onOtpSubmit(data: OtpSchema) {
    setIsLoading(true);

    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: userEmail,
        otp: data.otp,
      });

      if (error) {
        toast.error(error.message || "Invalid or expired OTP.");

        return;
      }

      toast.success("Account verified successfully! You can now sign in.");

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // RESEND OTP
  // =========================================================

  async function handleResendOtp() {
    if (resendTimer > 0) return;

    setIsLoading(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: userEmail,
        type: "email-verification",
      });

      if (error) {
        toast.error(error.message || "Failed to resend OTP.");

        return;
      }

      setResendTimer(60);

      toast.success("A fresh OTP code has been sent to your email.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-3 py-5 sm:px-4 sm:py-8">
      {/* Main Card */}
      <Card className="w-full max-w-lg overflow-hidden border border-border bg-card shadow-xl">
        {/* =================================================
          HEADER
      ================================================= */}

        <CardHeader className="space-y-4 border-b bg-card px-4 py-6 sm:px-8 sm:py-7">
          {/* Logo / Brand */}

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
              C
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">
                Clinic Portal
              </p>

              <p className="text-xs text-muted-foreground">
                Secure healthcare access
              </p>
            </div>
          </div>

          {/* Title */}

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {step === "REGISTER" ? "Create an Account" : "Verify Your Email"}
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-muted-foreground">
              {step === "REGISTER" ? (
                "Enter your details below to create your clinic account."
              ) : (
                <>
                  We sent a 6-digit verification code to{" "}
                  <span className="font-medium text-foreground">
                    {userEmail}
                  </span>
                </>
              )}
            </CardDescription>
          </div>

          {/* Progress */}

          <div className="flex items-center gap-2 pt-1">
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                step === "REGISTER" ? "bg-primary" : "bg-primary"
              }`}
            />

            <div
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                step === "VERIFY_OTP" ? "bg-primary" : "bg-muted"
              }`}
            />
          </div>
        </CardHeader>

        {/* =================================================
          CONTENT
      ================================================= */}

        <CardContent className="px-4 py-6 sm:px-8 sm:py-7">
          {step === "REGISTER" ? (
            /* ================= SIGN UP ================= */

            <form
              id="signup-form"
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            >
              <FieldGroup className="gap-5">
                {/* NAME */}

                <Controller
                  name="name"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-username"
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name
                      </FieldLabel>

                      <Input
                        {...field}
                        id="signup-username"
                        placeholder="full name"
                        aria-invalid={fieldState.invalid}
                        autoComplete="name"
                        className="h-11 border-input bg-background transition focus:border-primary focus:ring-primary"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* EMAIL */}

                <Controller
                  name="email"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address
                      </FieldLabel>

                      <Input
                        {...field}
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                        className="h-11 border-input bg-background transition focus:border-primary focus:ring-primary"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PHONE */}

                <Controller
                  name="phone_no"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-phone"
                        className="text-sm font-medium text-foreground"
                      >
                        Phone Number
                      </FieldLabel>

                      <Input
                        {...field}
                        id="signup-phone"
                        type="tel"
                        placeholder="98765...."
                        aria-invalid={fieldState.invalid}
                        autoComplete="tel"
                        className="h-11 border-input bg-background transition focus:border-primary focus:ring-primary"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* ROLE */}

                <Controller
                  name="role"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-role"
                        className="text-sm font-medium text-foreground"
                      >
                        Account Type
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="signup-role"
                          className="h-11 border-input bg-background"
                        >
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="NORMAL_USER">
                            Normal User
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PASSWORD */}

                <Controller
                  name="password"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-password"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                          className="h-11 border-input bg-background transition focus:border-primary focus:ring-primary"
                        />
                        {/* Toggle Button */}
                        <button
                          type="button" // Always specify type="button" so it doesn't accidentally submit forms
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 select-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* CONFIRM PASSWORD */}

                <Controller
                  name="confirmPassword"
                  control={signUpForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="signup-confirm-password"
                        className="text-sm font-medium text-foreground"
                      >
                        Confirm Password
                      </FieldLabel>

                      <Input
                        {...field}
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        autoComplete="new-password"
                        className="h-11 border-input bg-background transition focus:border-primary focus:ring-primary"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          ) : (
            /* ================= OTP ================= */

            <form id="otp-form" onSubmit={otpForm.handleSubmit(onOtpSubmit)}>
              <div className="space-y-7">
                {/* OTP Icon */}

                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-9 w-9 text-primary"
                    >
                      <rect width="18" height="13" x="3" y="5" rx="2" />

                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                </div>

                {/* OTP Description */}

                <div className="text-center">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Enter the verification code sent to your email address.
                  </p>
                </div>

                <FieldGroup>
                  <Controller
                    name="otp"
                    control={otpForm.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="items-center"
                      >
                        <FieldLabel
                          htmlFor="otp-input"
                          className="text-sm font-medium text-foreground"
                        >
                          Verification Code
                        </FieldLabel>

                        <Input
                          {...field}
                          id="otp-input"
                          maxLength={6}
                          inputMode="numeric"
                          placeholder="123456"
                          autoComplete="one-time-code"
                          className="h-14 max-w-xs border-input bg-background text-center font-mono text-2xl font-semibold tracking-[0.5em] focus:border-primary focus:ring-primary"
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);

                            field.onChange(value);
                          }}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* Security message */}

                <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-center text-xs leading-5 text-primary">
                  Your verification code is valid for 10 minutes. Do not share
                  this code with anyone.
                </div>
              </div>
            </form>
          )}
        </CardContent>

        {/* =================================================
          FOOTER
      ================================================= */}

        <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 px-4 py-5 sm:px-8">
          {step === "REGISTER" ? (
            <Field className="w-full" orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => signUpForm.reset()}
                disabled={isLoading}
                className="h-11 flex-1 border-input"
              >
                Reset
              </Button>

              <Button
                type="submit"
                form="signup-form"
                disabled={isLoading}
                className="h-11 flex-1 font-medium shadow-sm"
              >
                {isLoading ? "Registering..." : "Create Account"}
              </Button>
            </Field>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <Button
                type="submit"
                form="otp-form"
                disabled={isLoading}
                className="h-11 w-full font-medium shadow-sm"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="flex items-center justify-between pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStep("REGISTER");
                    otpForm.reset();
                  }}
                  disabled={isLoading}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ← Back to register
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isLoading}
                  className="text-primary hover:text-primary/80"
                >
                  {resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Resend Code"}
                </Button>
              </div>
            </div>
          )}

          {/* Footer text */}
          {step === "REGISTER" && (
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          )}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to the clinics terms and privacy policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
