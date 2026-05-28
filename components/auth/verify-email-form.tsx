"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, ChevronRight, Loader2, RefreshCw, CheckCircle2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AuthLayout } from "./auth-layout"

export function VerifyEmailForm() {
  const router = useRouter()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setResendSuccess(true)
    setIsResending(false)

    // Reset success message after 3 seconds
    setTimeout(() => setResendSuccess(false), 3000)
  }

  const handleContinue = () => {
    router.push("/auth/login")
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="A verification link has been sent to your email address. Check your inbox to continue."
      showFeatures={false}
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to signup
        </Link>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animated Mail Icon */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Mail className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center"
            >
              <CheckCircle2 className="w-5 h-5 text-success-foreground" />
            </motion.div>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Check your email
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              We&apos;ve sent a verification link to your email address. Click the link to verify
              your account and complete your registration.
            </p>
          </div>

          {/* Email Preview */}
          <div className="w-full p-4 bg-muted/50 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Verify your NovaCrest University account
                </p>
                <p className="text-xs text-muted-foreground">
                  From: noreply@novacrest.edu
                </p>
              </div>
            </div>
          </div>

          {/* Email Client Buttons */}
          <div className="w-full grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11" asChild>
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                  />
                </svg>
                Gmail
              </a>
            </Button>
            <Button variant="outline" className="h-11" asChild>
              <a href="https://outlook.com" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 12c0 2.21 1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4m6 0c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-6-9c0-.55.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1m0 18c0-.55.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1m12-3V6c0-1.11-.89-2-2-2H7c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2Z"
                  />
                </svg>
                Outlook
              </a>
            </Button>
          </div>

          {/* Resend Section */}
          <div className="w-full space-y-3">
            {resendSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-sm text-success"
              >
                <CheckCircle2 className="w-4 h-4" />
                Email resent successfully!
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {"Didn't receive the email? "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3 h-3" />
                      Resend email
                    </>
                  )}
                </button>
              </p>
            )}
          </div>

          {/* Continue Button */}
          <Button onClick={handleContinue} className="w-full h-11">
            I&apos;ve verified my email
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground">
          The verification link will expire in 24 hours. If you need help, contact{" "}
          <Link href="/support" className="text-primary hover:underline">
            support
          </Link>
          .
        </p>
      </div>
    </AuthLayout>
  )
}
