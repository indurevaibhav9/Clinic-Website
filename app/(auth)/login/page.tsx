"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import {Eye, EyeOff} from "lucide-react"

type AuthMode = "SIGN_IN" | "VERIFY_OTP"

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession()

        if (session.data?.user) {
          router.replace("/dashboard")
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkSession()
  }, [router])

  const [authMode, setAuthMode] = useState<AuthMode>("SIGN_IN")
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // =========================================================
  // SIGN IN
  // =========================================================
  const searchParams = useSearchParams()
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please enter email and password.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        toast.error(error.message || "Invalid email or password.")
        return
      }

      toast.success("Signed in successfully!")
      const callback = searchParams.get("callbackUrl") || "/"
      router.push(callback)
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // VERIFY EMAIL OTP
  // =========================================================

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email) {
      toast.error("Email address is missing.")
      return
    }

    if (!otp || otp.length < 6) {
      toast.error("Please enter the OTP.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      })

      if (error) {
        toast.error(error.message || "Invalid or expired OTP.")
        return
      }

      toast.success("Email verified successfully!")
      setAuthMode("SIGN_IN")
      setPassword("")
      setOtp("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // RESEND OTP
  // =========================================================

  async function handleResendOtp() {
    if (!email) {
      toast.error("Email address is missing.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      })

      if (error) {
        toast.error(error.message || "Failed to resend OTP.")
        return
      }

      toast.success("A new OTP has been sent to your email.")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  async function handleForgotPassword() {
    if (!email) {
      toast.error("Please enter your email address first.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      })

      if (error) {
        toast.error(
          error.message || "Failed to send password reset email."
        )
        return
      }

      toast.success("Password reset link sent to your email!")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
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
                required
                autoComplete="email"
                className="mt-1 w-full rounded border p-2"
                placeholder="name@example.com"
              />
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
                type={ showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
              <label
                htmlFor="otp"
                className="block text-sm font-medium"
              >
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
                required
                maxLength={6}
                className="mt-1 w-full rounded border p-2 text-center text-lg tracking-widest"
                placeholder="123456"
              />
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
                setAuthMode("SIGN_IN")
                setPassword("")
                setOtp("")
              }}
              className="font-semibold text-blue-600 hover:underline"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}