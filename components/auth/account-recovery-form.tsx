"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Mail,
  Phone,
  KeyRound,
  ChevronRight,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Shield,
  User,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"

type RecoveryMethod = "email" | "phone" | "recovery-code" | "support"

const recoveryMethods = [
  {
    id: "email" as const,
    icon: Mail,
    title: "Email Recovery",
    description: "Receive a recovery link to your registered email",
    available: true,
  },
  {
    id: "phone" as const,
    icon: Phone,
    title: "Phone Verification",
    description: "Get a verification code via SMS",
    available: true,
  },
  {
    id: "recovery-code" as const,
    icon: KeyRound,
    title: "Recovery Code",
    description: "Use one of your saved backup codes",
    available: true,
  },
  {
    id: "support" as const,
    icon: HelpCircle,
    title: "Contact Support",
    description: "Get help from our support team",
    available: true,
  },
]

export function AccountRecoveryForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState<RecoveryMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    recoveryCode: "",
  })

  const handleMethodSelect = (selectedMethod: RecoveryMethod) => {
    setMethod(selectedMethod)
    if (selectedMethod === "support") {
      // Redirect to support page
      router.push("/support")
    } else {
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)

    // Redirect after success
    setTimeout(() => {
      if (method === "recovery-code") {
        router.push("/auth/reset-password")
      }
    }, 2000)
  }

  return (
    <AuthLayout
      title="Account Recovery"
      subtitle="Having trouble accessing your account? We have several ways to help you recover access."
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

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Recovery Method */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Recover your account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to recover access to your account
                </p>
              </div>

              {/* Identifier Input */}
              <div className="space-y-2">
                <Label htmlFor="identifier">Email or Student ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="you@university.edu or STU/2024/001234"
                    className="pl-10 h-11"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  />
                </div>
              </div>

              {/* Recovery Methods */}
              <div className="space-y-3">
                <Label className="text-sm">Recovery Options</Label>
                {recoveryMethods.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleMethodSelect(option.id)}
                    disabled={!option.available || !formData.identifier}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      option.available && formData.identifier
                        ? "border-border hover:border-primary/50 hover:bg-muted/50"
                        : "border-border/50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <option.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{option.title}</h3>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Recovery Input */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {method === "email" && "Email Recovery"}
                  {method === "phone" && "Phone Verification"}
                  {method === "recovery-code" && "Recovery Code"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {method === "email" &&
                    "We'll send a recovery link to your registered email address."}
                  {method === "phone" &&
                    "We'll send a verification code to your registered phone number."}
                  {method === "recovery-code" &&
                    "Enter one of your saved backup recovery codes."}
                </p>
              </div>

              {/* Recovery Code Input */}
              {method === "recovery-code" && (
                <div className="space-y-2">
                  <Label htmlFor="recoveryCode">Recovery Code</Label>
                  <Input
                    id="recoveryCode"
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    className="h-11 font-mono text-center tracking-widest uppercase"
                    value={formData.recoveryCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recoveryCode: e.target.value.toUpperCase(),
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the recovery code you saved when setting up 2FA
                  </p>
                </div>
              )}

              {/* Email/Phone Confirmation */}
              {(method === "email" || method === "phone") && (
                <div className="p-4 bg-muted/50 rounded-xl space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {method === "email"
                      ? "A recovery link will be sent to:"
                      : "A verification code will be sent to:"}
                  </p>
                  <p className="font-medium text-foreground">
                    {method === "email" ? "j***n@university.edu" : "****7890"}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => {
                    setStep(1)
                    setMethod(null)
                  }}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 h-11"
                  onClick={handleSubmit}
                  disabled={
                    isLoading ||
                    (method === "recovery-code" && formData.recoveryCode.length < 10)
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {method === "recovery-code" ? "Verify Code" : "Send Recovery"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {method === "email" && "Recovery email sent!"}
                  {method === "phone" && "Verification code sent!"}
                  {method === "recovery-code" && "Code verified!"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {method === "email" &&
                    "Check your email for the recovery link. It will expire in 24 hours."}
                  {method === "phone" && "Enter the verification code sent to your phone."}
                  {method === "recovery-code" &&
                    "Redirecting you to reset your password..."}
                </p>
              </div>

              {(method === "email" || method === "phone") && (
                <Button asChild className="w-full h-11">
                  <Link href="/auth/verify-otp">
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Account recovery is secured with encryption</span>
        </div>
      </div>
    </AuthLayout>
  )
}
