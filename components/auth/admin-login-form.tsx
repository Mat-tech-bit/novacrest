"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Fingerprint,
  Monitor,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthLayout } from "./auth-layout"

// Simulated device verification
const pendingDevice = {
  browser: "Chrome 120",
  os: "Windows 11",
  location: "Lagos, Nigeria",
  time: new Date().toLocaleString(),
}

export function AdminLoginForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    adminId: "",
    password: "",
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep(2) // Move to device verification
  }

  const handleDeviceVerification = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/admin/dashboard")
  }

  return (
    <AuthLayout
      title="Admin Portal"
      subtitle="Secure access to the administrative dashboard. All activities are logged and monitored."
      showFeatures={false}
      variant="admin"
    >
      <div className="space-y-6">
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Secure Admin Access</span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Login Form */}
          {step === 1 && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Administrator Sign In
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access the admin dashboard
                </p>
              </div>

              {/* Security Warning */}
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Security Notice</p>
                  <p className="text-xs text-muted-foreground">
                    This is a restricted area. All access attempts are logged and monitored. Unauthorized access is prohibited.
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@university.edu"
                      className="pl-10 h-11"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Admin ID */}
                <div className="space-y-2">
                  <Label htmlFor="adminId">Admin ID</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="adminId"
                      type="text"
                      placeholder="ADM/001"
                      className="pl-10 h-11"
                      value={formData.adminId}
                      onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
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
                  )}
                </div>

                {/* Remember Device */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberDevice"
                    checked={rememberDevice}
                    onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                  />
                  <Label
                    htmlFor="rememberDevice"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Trust this device for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Secure Sign In
                    </>
                  )}
                </Button>
              </form>

              {/* Audit Log Notice */}
              <p className="text-center text-xs text-muted-foreground">
                Your IP address and device information will be logged
              </p>
            </motion.div>
          )}

          {/* Step 2: Device Verification */}
          {step === 2 && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Verify This Device
                </h2>
                <p className="text-sm text-muted-foreground">
                  Confirm that you are signing in from this device
                </p>
              </div>

              {/* Device Info */}
              <div className="p-4 bg-muted/50 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">New Device Detected</p>
                    <p className="text-sm text-muted-foreground">
                      {pendingDevice.browser} on {pendingDevice.os}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{pendingDevice.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="text-foreground">{pendingDevice.time}</span>
                  </div>
                </div>
              </div>

              {/* Security Question */}
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-foreground font-medium mb-2">
                  Is this you trying to sign in?
                </p>
                <p className="text-xs text-muted-foreground">
                  If you don&apos;t recognize this activity, click &quot;Not Me&quot; to secure your account
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => router.push("/auth/account-recovery")}
                >
                  Not Me
                </Button>
                <Button
                  className="flex-1 h-11"
                  onClick={handleDeviceVerification}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Yes, it&apos;s me
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Not an admin?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Go to regular login
          </Link>
        </p>

        {/* Security Indicators */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3 h-3 text-success" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3 h-3 text-success" />
            <span>2FA Protected</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-success" />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
