"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Lock,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"

export function ResetPasswordForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordsMatch =
    formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordsMatch || passwordStrength < 3) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setIsLoading(false)

    // Redirect after showing success
    setTimeout(() => {
      router.push("/auth/login")
    }, 2000)
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password Reset Complete"
        subtitle="Your password has been successfully reset."
        showFeatures={false}
      >
        <motion.div
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
              Password updated!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your password has been changed successfully. You can now sign in with your new
              password.
            </p>
          </div>

          <Button asChild className="w-full h-11">
            <Link href="/auth/login">
              Continue to login
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Choose a strong, unique password to keep your account secure."
      showFeatures={false}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Reset password</h2>
          <p className="text-sm text-muted-foreground">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-10 pr-10 h-11"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? passwordStrength <= 1
                            ? "bg-destructive"
                            : passwordStrength <= 2
                            ? "bg-warning"
                            : "bg-success"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="space-y-1 text-xs">
                  {[
                    { check: formData.password.length >= 8, text: "At least 8 characters" },
                    { check: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
                    { check: /[0-9]/.test(formData.password), text: "One number" },
                    {
                      check: /[^A-Za-z0-9]/.test(formData.password),
                      text: "One special character",
                    },
                  ].map((req, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 ${
                        req.check ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      {req.check ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-current" />
                      )}
                      <span>{req.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 pr-10 h-11"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}
            {passwordsMatch && (
              <p className="text-xs text-success flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isLoading || !passwordsMatch || passwordStrength < 3}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting password...
              </>
            ) : (
              <>
                Reset password
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="p-4 bg-muted/50 rounded-xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Security tips</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use a unique password you haven&apos;t used before</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication for extra security</li>
            </ul>
          </div>
        </div>

        {/* Back to Login */}
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
