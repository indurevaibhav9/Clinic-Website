"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { signInSchema, verifyOtpSchema } from "@/lib/validations/auth";

type AuthMode = "SIGN_IN" | "VERIFY_OTP";

function AuthPageContent() {
  const router = useRouter();

  useEffect(() => {
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

  const [authMode, setAuthMode] = useState<AuthMode>("SIGN_IN");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // =========================================================
  // SIGN IN
  // =========================================================
  const searchParams = useSearchParams();
  async function checkAccount(emailAddress: string) {
    const response = await fetch("/api/auth/account-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailAddress }),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to check this account.");
    }

    return result as { success: true; registered: boolean; verified: boolean };
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = signInSchema.safeParse({ email, password });
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message || "Check the form fields.");
      return;
    }

    setIsLoading(true);

    try {
      setFieldErrors({});
      const account = await checkAccount(validation.data.email);
      if (!account.registered) {
        setFieldErrors({ email: "No account is registered with this email. Please create an account first." });
        toast.error("User not registered. Please create an account first.");
        return;
      }

      const { error } = await authClient.signIn.email({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (error) {
        if (error.status === 403) {
          setAuthMode("VERIFY_OTP");

          const { error: otpError } =
            await authClient.emailOtp.sendVerificationOtp({
              email,
              type: "email-verification",
            });

          if (otpError) {
            toast.error(
              "Your email is not verified, but we couldn't send the verification email. Please try again.",
            );
          } else {
            toast.info("Your email is not verified. A verification code was sent.");
          }
        } else if (error.status === 401) {
          toast.error(
            "Incorrect password. Try again or use Forgot password to reset it.",
          );
        } else {
          toast.error(error.message || "Unable to sign in.");
        }
        return;
      }

      toast.success("Signed in successfully!");
      const callback = searchParams.get("callbackUrl") || "/";
      router.push(callback);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // VERIFY EMAIL OTP
  // =========================================================

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = verifyOtpSchema.safeParse({ email, otp });
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message || "Check the verification code.");
      return;
    }

    setIsLoading(true);

    try {
      setFieldErrors({});
      const { error } = await authClient.emailOtp.verifyEmail({
        email: validation.data.email,
        otp: validation.data.otp,
      });

      if (error) {
        toast.error(error.message || "Invalid or expired OTP.");
        return;
      }

      toast.success("Email verified successfully!");
      setAuthMode("SIGN_IN");
      setPassword("");
      setOtp("");
      setFieldErrors({});
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // RESEND OTP
  // =========================================================

  async function handleResendOtp() {
    setIsLoading(true);

    try {
      const account = await checkAccount(email);
      if (!account.registered) {
        toast.error("User not registered. Please create an account first.");
        return;
      }
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) {
        toast.error("We couldn't send the verification email. Please try again.");
        return;
      }

      toast.success("A new OTP has been sent to your email.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to resend the verification email.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  async function handleForgotPassword() {
    const emailValidation = signInSchema.shape.email.safeParse(email);
    if (!emailValidation.success) {
      const message = emailValidation.error.issues[0]?.message || "Enter a valid email address.";
      setFieldErrors({ email: message });
      toast.error(message);
      return;
    }

    setIsLoading(true);

    try {
      setFieldErrors({});
      const account = await checkAccount(emailValidation.data);
      if (!account.registered) {
        setFieldErrors({ email: "No account is registered with this email. Please create an account first." });
        toast.error("User not registered. Please create an account first.");
        return;
      }

      const { error } = await authClient.requestPasswordReset({
        email: emailValidation.data,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error("We couldn't send the password reset email. Please try again.");
        return;
      }

      toast.success("Password reset link sent to your email!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send the password reset email.");
    } finally {
      setIsLoading(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:p-4">
      <div className="w-full max-w-md rounded-lg border p-4 shadow-md sm:p-6">
        {/* ================= HEADER ================= */}

        <h2 className="mb-2 text-center text-2xl font-bold">
          {authMode === "SIGN_IN" && "Sign In to Your Account"}
          {authMode === "VERIFY_OTP" && "Verify Your Email"}
        </h2>

        {authMode === "VERIFY_OTP" && (
          <p className="mb-6 text-center text-sm text-gray-600">
            We sent a verification code to <strong>{email}</strong>
          </p>
        )}

        {/* =================================================
            SIGN IN
        ================================================= */}

        {authMode === "SIGN_IN" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="signin-email"
                className="block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  const result = signInSchema.shape.email.safeParse(email);
                  setFieldErrors((previous) => ({
                    ...previous,
                    email: result.success ? "" : result.error.issues[0]?.message || "",
                  }));
                }}
                required
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "signin-email-error" : undefined}
                className="mt-1 w-full rounded border p-2"
                placeholder="name@example.com"
              />
              {fieldErrors.email && (
                <p id="signin-email-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="signin-password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-xs text-blue-600 hover:underline disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative *:mt-1">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    if (!password) {
                      setFieldErrors((previous) => ({ ...previous, password: "Password is required." }));
                    }
                  }}
                  required
                  autoComplete="current-password"
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? "signin-password-error" : undefined}
                  className="mt-1 w-full rounded border p-2"
                  placeholder="••••••••"
                />
                {/* Toggle Button */}
                <button
                  type="button" // Always specify type="button" so it doesn't accidentally submit forms
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 select-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="signin-password-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.password}</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        {/* =================================================
            VERIFY OTP
        ================================================= */}

        {authMode === "VERIFY_OTP" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium">
                Verification Code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                onBlur={() => {
                  const result = verifyOtpSchema.shape.otp.safeParse(otp);
                  setFieldErrors((previous) => ({
                    ...previous,
                    otp: result.success ? "" : result.error.issues[0]?.message || "",
                  }));
                }}
                required
                maxLength={6}
                aria-invalid={Boolean(fieldErrors.otp)}
                aria-describedby={fieldErrors.otp ? "otp-error" : undefined}
                className="mt-1 w-full rounded border p-2 text-center text-lg tracking-widest"
                placeholder="123456"
              />
              {fieldErrors.otp && (
                <p id="otp-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.otp}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="w-full text-sm text-blue-600 hover:underline disabled:opacity-50"
            >
              Resend OTP
            </button>
          </form>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-6 text-center text-sm">
          {authMode === "SIGN_IN" && (
            <p className="text-gray-600">
              New to the site?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          )}

          {authMode === "VERIFY_OTP" && (
            <button
              type="button"
              onClick={() => {
                setAuthMode("SIGN_IN");
                setPassword("");
                setOtp("");
              }}
              className="font-semibold text-blue-600 hover:underline"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
