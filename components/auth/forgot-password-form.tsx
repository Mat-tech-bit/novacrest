"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, ChevronRight, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="We&apos;ll send you a secure link to reset your password and get you back on track."
      showFeatures={false}
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Forgot password?
              </h2>
              <p className="text-sm text-muted-foreground">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    className="pl-10 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success State */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Check your email
                </h2>
                <p className="text-sm text-muted-foreground max-w-sm">
                  We sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
            </div>

            {/* Email Client Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-11" asChild>
                <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                    />
                  </svg>
                  Open Gmail
                </a>
              </Button>
              <Button variant="outline" className="w-full h-11" asChild>
                <a href="https://outlook.com" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M7 12c0 2.21 1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4m6 0c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-6-9c0-.55.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1m0 18c0-.55.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1m12-3V6c0-1.11-.89-2-2-2H7c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2Z"
                    />
                  </svg>
                  Open Outlook
                </a>
              </Button>
            </div>

            {/* Resend */}
            <p className="text-center text-sm text-muted-foreground">
              {"Didn't receive the email? "}
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-primary font-medium hover:underline"
              >
                Click to resend
              </button>
            </p>
          </motion.div>
        )}

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground">
          If you don&apos;t see the email, check your spam folder or contact{" "}
          <Link href="/support" className="text-primary hover:underline">
            support
          </Link>
          .
        </p>
      </div>
    </AuthLayout>
  )
}
