/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Eye, EyeOff } from "lucide-react"

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

function ResetPasswordPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordSchema) {
    if (!token) {
      toast.error("Invalid or missing reset token.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      })

      if (error) {
        toast.error(error.message || "Failed to reset password. The link may have expired.")
        return
      }

      toast.success("Password reset successfully! Redirecting to login...")
      router.push("/login")
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:p-4">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Invalid Request</CardTitle>
            <CardDescription>
              No reset token found. Please request a new password reset link.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/login")}>
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:p-4">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below to complete the reset process.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* New Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                    <div className="relative">
                      <Input
                      {...field}
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
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
                    
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Confirm New Password Field */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm New Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            form="reset-password-form"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating Password..." : "Reset Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ResetPasswordPageContent />
    </Suspense>
  )
}