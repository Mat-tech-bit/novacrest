"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Smartphone,
  Shield,
  QrCode,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  ArrowLeft,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"

const recoveryCodesData = [
  "ABCD-1234-EFGH",
  "IJKL-5678-MNOP",
  "QRST-9012-UVWX",
  "YZ12-3456-AB78",
  "CD90-EFGH-IJKL",
  "MNOP-QRST-UVWX",
  "YZ12-3456-7890",
  "ABCD-EFGH-IJKL",
]

export function TwoFactorSetupForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState<"authenticator" | "sms">("authenticator")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [copiedCodes, setCopiedCodes] = useState(false)
  const [savedCodes, setSavedCodes] = useState(false)

  const secretKey = "JBSWY3DPEHPK3PXP"

  const handleCopySecret = async () => {
    await navigator.clipboard.writeText(secretKey)
    setCopiedSecret(true)
    setTimeout(() => setCopiedSecret(false), 2000)
  }

  const handleCopyCodes = async () => {
    await navigator.clipboard.writeText(recoveryCodesData.join("\n"))
    setCopiedCodes(true)
    setTimeout(() => setCopiedCodes(false), 2000)
  }

  const handleDownloadCodes = () => {
    const blob = new Blob([recoveryCodesData.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "uniportal-recovery-codes.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleVerify = async () => {
    if (verificationCode.length !== 6) return

    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)
    setStep(3) // Move to recovery codes step
  }

  const handleComplete = () => {
    if (!savedCodes) return
    router.push("/auth/login")
  }

  return (
    <AuthLayout
      title="Secure Your Account"
      subtitle="Two-factor authentication adds an extra layer of security to protect your account."
      showFeatures={false}
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Skip for now
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-8 h-0.5 transition-colors ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Method */}
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
                  Set up two-factor authentication
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to receive verification codes
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "authenticator",
                    icon: QrCode,
                    title: "Authenticator App",
                    description: "Use Google Authenticator, Authy, or similar apps",
                    recommended: true,
                  },
                  {
                    id: "sms",
                    icon: Smartphone,
                    title: "SMS Text Message",
                    description: "Receive codes via text message",
                    recommended: false,
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMethod(option.id as "authenticator" | "sms")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                      method === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        method === option.id ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <option.icon
                        className={`w-6 h-6 ${
                          method === option.id ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{option.title}</h3>
                        {option.recommended && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                        method === option.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {method === option.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Button className="w-full h-11" onClick={() => setStep(2)}>
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Setup & Verify */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {method === "authenticator" ? "Scan QR Code" : "Verify Phone Number"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {method === "authenticator"
                    ? "Scan this QR code with your authenticator app"
                    : "Enter the code sent to your phone"}
                </p>
              </div>

              {method === "authenticator" && (
                <div className="space-y-4">
                  {/* QR Code Placeholder */}
                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-white p-4 rounded-xl border border-border">
                      <div className="w-full h-full bg-[repeating-conic-gradient(#000_0_90deg,#fff_90deg_180deg)] bg-[length:12px_12px] rounded-lg" />
                    </div>
                  </div>

                  {/* Secret Key */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                      {"Can't scan? Enter this key manually:"}
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <code className="flex-1 text-sm font-mono text-foreground text-center">
                        {secretKey}
                      </code>
                      <Button variant="ghost" size="sm" onClick={handleCopySecret}>
                        {copiedSecret ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Code Input */}
              <div className="space-y-2">
                <Label htmlFor="code">Enter 6-digit verification code</Label>
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className="h-11 text-center text-lg font-mono tracking-widest"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-11" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1 h-11"
                  onClick={handleVerify}
                  disabled={verificationCode.length !== 6 || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Recovery Codes */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">2FA Enabled!</h2>
                  <p className="text-sm text-muted-foreground">Save your recovery codes</p>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Important</p>
                  <p className="text-xs text-muted-foreground">
                    Save these recovery codes in a secure location. They can be used to access your
                    account if you lose your 2FA device.
                  </p>
                </div>
              </div>

              {/* Recovery Codes */}
              <div className="p-4 bg-muted rounded-xl space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {recoveryCodesData.map((code, i) => (
                    <div key={i} className="font-mono text-sm text-foreground bg-card p-2 rounded-lg text-center">
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleCopyCodes}
                  >
                    {copiedCodes ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-success" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy all
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleDownloadCodes}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Confirmation */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="savedCodes"
                  checked={savedCodes}
                  onChange={(e) => setSavedCodes(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <Label htmlFor="savedCodes" className="text-sm text-muted-foreground cursor-pointer">
                  I have saved my recovery codes in a secure location
                </Label>
              </div>

              <Button
                className="w-full h-11"
                onClick={handleComplete}
                disabled={!savedCodes}
              >
                Complete setup
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Your account security is our priority</span>
        </div>
      </div>
    </AuthLayout>
  )
}
