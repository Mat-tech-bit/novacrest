"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Smartphone,
  ChevronRight,
  Loader2,
  RefreshCw,
  CheckCircle2,
  ArrowLeft,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AuthLayout } from "./auth-layout"

export function OTPVerificationForm() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)

    // Focus last filled input or next empty
    const lastIndex = Math.min(pastedData.length - 1, 5)
    inputRefs.current[lastIndex]?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join("")
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate verification (in real app, verify with backend)
    if (code === "123456") {
      router.push("/auth/two-factor-setup")
    } else {
      setError("Invalid verification code. Please try again.")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }
    setIsVerifying(false)
  }

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsResending(false)
    setResendCooldown(60)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="Enter the verification code sent to your device to confirm your identity."
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

        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Smartphone className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Enter verification code
            </h2>
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to your registered phone number ending in ****7890
            </p>
          </div>

          {/* OTP Input */}
          <div className="w-full space-y-4">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => {inputRefs.current[index] = el}}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                    error
                      ? "border-destructive"
                      : digit
                      ? "border-primary"
                      : "border-border"
                  }`}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            className="w-full h-11"
            disabled={!isComplete || isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify code
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          {/* Resend Section */}
          <div className="space-y-2">
            {resendCooldown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in{" "}
                <span className="font-medium text-foreground">{resendCooldown}s</span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {"Didn't receive the code? "}
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
                      Resend code
                    </>
                  )}
                </button>
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="w-full p-4 bg-muted/50 rounded-xl flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Security Notice</p>
              <p className="text-xs text-muted-foreground">
                Never share this code with anyone. NovaCrest University staff will never ask for your
                verification code.
              </p>
            </div>
          </div>
        </div>

        {/* Help Link */}
        <p className="text-center text-xs text-muted-foreground">
          Having trouble? Contact{" "}
          <Link href="/support" className="text-primary hover:underline">
            support
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
