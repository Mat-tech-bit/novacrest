"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChevronRight,
  Loader2,
  Shield,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthLayout } from "./auth-layout"
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      // Check user role/profile in Firestore
      const userDoc = await getDoc(doc(db, "students", user.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        toast.success(`Welcome back, ${userData.firstName}!`)
        router.push("/student/dashboard")
      } else {
        // Might be an admin or staff (if you implement that later)
        toast.success("Login successful!")
        router.push("/student/dashboard")
      }
    } catch (error: any) {
      console.error("Login error code:", error.code, error.message)
      // Map Firebase error codes to friendly messages
      const errorMessages: Record<string, string> = {
        "auth/invalid-credential": "Incorrect email or password. Please check your credentials and try again.",
        "auth/user-not-found": "No account found with this email. Please register first.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/user-disabled": "This account has been disabled. Contact support.",
        "auth/too-many-requests": "Too many failed attempts. Please wait a few minutes and try again.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/operation-not-allowed": "Email/password sign-in is not enabled. Please contact the administrator.",
      }
      const friendlyMessage = errorMessages[error.code] || "Login failed. Please check your credentials."
      toast.error(friendlyMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Access your academic records and university resources securely."
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign in</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to access your portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@gmail.com"
                className="pl-10 h-11"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
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
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, rememberMe: checked as boolean })
              }
            />
            <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Admission Office</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          {"New student? "}
          <Link href="/auth/signup" className="text-primary font-medium hover:underline">
            Begin your application
          </Link>
        </p>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          <Shield className="w-3 h-3 text-primary" />
          <span>NovaCrest Secure Access</span>
        </div>
      </div>
    </AuthLayout>
  )
}
