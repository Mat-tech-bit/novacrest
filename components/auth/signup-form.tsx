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
  User,
  Phone,
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  Upload,
  Building2,
  GraduationCap,
  Calendar,
  Shield,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthLayout } from "./auth-layout"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { generateMatricNumber } from "@/lib/utils-auth"
import { toast } from "sonner"

interface FormData {
  accountType: "student" | "fresher"
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  faculty: string
  department: string
  program: string
  admissionYear: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  passportPhoto: File | null
}

const faculties = [
  { id: "science", name: "Faculty of Science" },
  { id: "engineering", name: "Faculty of Engineering" },
  { id: "arts", name: "Faculty of Arts" },
  { id: "medicine", name: "Faculty of Medicine" },
  { id: "law", name: "Faculty of Law" },
  { id: "business", name: "Faculty of Business" },
  { id: "education", name: "Faculty of Education" },
  { id: "social-sciences", name: "Faculty of Social Sciences" },
]

const departments: Record<string, { id: string; name: string }[]> = {
  science: [
    { id: "computer-science", name: "Computer Science" },
    { id: "mathematics", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ],
  engineering: [
    { id: "civil", name: "Civil Engineering" },
    { id: "mechanical", name: "Mechanical Engineering" },
    { id: "electrical", name: "Electrical Engineering" },
    { id: "chemical", name: "Chemical Engineering" },
  ],
  arts: [
    { id: "english", name: "English Language" },
    { id: "history", name: "History" },
    { id: "philosophy", name: "Philosophy" },
    { id: "languages", name: "Foreign Languages" },
  ],
  medicine: [
    { id: "medicine", name: "Medicine & Surgery" },
    { id: "nursing", name: "Nursing" },
    { id: "pharmacy", name: "Pharmacy" },
    { id: "dentistry", name: "Dentistry" },
  ],
  law: [{ id: "law", name: "Law" }],
  business: [
    { id: "accounting", name: "Accounting" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "management", name: "Business Management" },
  ],
  education: [
    { id: "education", name: "Education" },
    { id: "guidance", name: "Guidance & Counseling" },
  ],
  "social-sciences": [
    { id: "economics", name: "Economics" },
    { id: "political-science", name: "Political Science" },
    { id: "sociology", name: "Sociology" },
    { id: "psychology", name: "Psychology" },
  ],
}

const steps = [
  { id: 1, name: "Account", icon: User },
  { id: 2, name: "Personal", icon: User },
  { id: 3, name: "Academic", icon: GraduationCap },
  { id: 4, name: "Security", icon: Lock },
  { id: 5, name: "Photo", icon: CheckCircle2 },
]

const passwordCriteria = [
  { label: "UPPERCASE", regex: /[A-Z]/ },
  { label: "LOWERCASE", regex: /[a-z]/ },
  { label: "NUMBER", regex: /[0-9]/ },
  { label: "SPECIAL CHAR", regex: /[^A-Za-z0-9]/ },
]

// ─── Compress and Resize Image (Ensures < 1MB limit) ─────────────────────────
async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const MAX_WIDTH = 400
        const MAX_HEIGHT = 400
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Convert to highly compressed JPEG
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7)
        resolve(dataUrl)
      }
    }
    reader.onerror = (error) => reject(error)
  })
}
// ─────────────────────────────────────────────────────────────────────────────

export function SignupForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    accountType: "fresher",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    faculty: "",
    department: "",
    program: "",
    admissionYear: new Date().getFullYear().toString(),
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    passportPhoto: null,
  })

  const handleAccountTypeChange = (type: "student" | "fresher") => {
    if (type === "student") {
      toast.info("Returning students should use the login page.")
      router.push("/auth/login")
      return
    }
    updateFormData("accountType", type)
  }

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value }
      if (key === "faculty") {
        updated.department = ""
        updated.program = ""
      }
      return updated
    })
  }

  const passwordStrength = passwordCriteria.filter((c) => c.regex.test(formData.password)).length

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB.")
        return
      }
      updateFormData("passportPhoto", file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true
      case 2:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth)
      case 3:
        return !!(formData.faculty && formData.department && formData.program)
      case 4:
        return !!(
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          formData.acceptTerms &&
          passwordStrength >= 4
        )
      case 5:
        return !!formData.passportPhoto
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!formData.passportPhoto) {
      toast.error("Please upload your passport photograph.")
      return
    }
    setIsLoading(true)
    let createdUser: any = null

    try {
      // STEP 1 — Create Firebase Auth account first
      toast.loading("Creating secure account...", { id: "reg-toast" })
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      createdUser = userCredential.user
      console.log("✅ Auth account created:", createdUser.uid)

      // STEP 2 — Compress & Convert photo (FIX: keeps size < 1MB)
      toast.loading("Optimizing passport photograph...", { id: "reg-toast" })
      const compressedPhoto = await compressImage(formData.passportPhoto)
      console.log("✅ Photo compressed successfully")
      
      // STEP 3 — Generate matric number
      const matricNumber = generateMatricNumber(formData.faculty, formData.admissionYear)

      // STEP 4 — Save EVERYTHING to Firestore in one single atomic write
      toast.loading("Completing registration...", { id: "reg-toast" })
      await setDoc(doc(db, "students", createdUser.uid), {
        uid: createdUser.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        faculty: formData.faculty,
        department: formData.department,
        program: formData.program,
        admissionYear: formData.admissionYear,
        matricNumber,
        photoUrl: compressedPhoto, // Saved directly and compressed!
        role: "student",
        createdAt: new Date().toISOString(),
      })
      console.log("✅ Registration Complete & Profile Saved")

      toast.success("Registration Successful!", { 
        id: "reg-toast",
        description: "Your academic profile is ready. Redirecting to login...",
        duration: 5000 
      })
      
      setTimeout(() => {
        router.push("/auth/login")
      }, 1000)

    } catch (error: any) {
      console.error("❌ Critical Registration Error:", error)
      toast.dismiss("reg-toast")

      // Cleanup Auth account if we failed before saving to Firestore
      if (createdUser && (error.code?.includes("permission-denied") || error.message.includes("Firestore"))) {
        await createdUser.delete().catch(console.error)
      }

      const msg = error.code === "permission-denied" 
        ? "Firestore permission denied. Check your Firebase rules." 
        : error.message || "Registration failed. Try again."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Begin Your Journey"
      subtitle="Join NovaCrest University's vibrant academic community."
      showFeatures={currentStep <= 2}
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Create Account</h2>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
        </div>

        {/* Progress Steps */}
        <div className="relative">
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)",
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted || isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </motion.div>
                  <span className={`mt-2 text-[10px] font-medium uppercase tracking-tight ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-muted -z-0">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Step 1: Account Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Are you a new or returning student?</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "fresher", label: "New Admission", icon: User, description: "Apply as a freshman" },
                    { id: "student", label: "Returning Student", icon: GraduationCap, description: "Already have a matric number" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleAccountTypeChange(type.id as "student" | "fresher")}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        formData.accountType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {formData.accountType === type.id && (
                        <motion.div layoutId="selectedType" className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                      <type.icon className={`w-6 h-6 mb-2 ${formData.accountType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="font-semibold text-foreground">{type.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="firstName" placeholder="John" className="pl-10 h-11" value={formData.firstName} onChange={(e) => updateFormData("firstName", e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="lastName" placeholder="Doe" className="pl-10 h-11" value={formData.lastName} onChange={(e) => updateFormData("lastName", e.target.value)} required />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="john.doe@gmail.com" className="pl-10 h-11" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="+234 800 000 0000" className="pl-10 h-11" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="dob" type="date" className="pl-10 h-11" value={formData.dateOfBirth} onChange={(e) => updateFormData("dateOfBirth", e.target.value)} required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Faculty</Label>
                  <Select value={formData.faculty} onValueChange={(v) => updateFormData("faculty", v)}>
                    <SelectTrigger className="h-11"><Building2 className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select your faculty" /></SelectTrigger>
                    <SelectContent>{faculties.map((f) => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={formData.department} onValueChange={(v) => updateFormData("department", v)} disabled={!formData.faculty}>
                    <SelectTrigger className="h-11"><GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select your department" /></SelectTrigger>
                    <SelectContent>{departments[formData.faculty]?.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select value={formData.program} onValueChange={(v) => updateFormData("program", v)}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select your program" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsc">B.Sc. (Bachelor of Science)</SelectItem>
                      <SelectItem value="ba">B.A. (Bachelor of Arts)</SelectItem>
                      <SelectItem value="beng">B.Eng. (Bachelor of Engineering)</SelectItem>
                      <SelectItem value="msc">M.Sc. (Master of Science)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Admission Year</Label>
                  <Select value={formData.admissionYear} onValueChange={(v) => updateFormData("admissionYear", v)}>
                    <SelectTrigger className="h-11"><Calendar className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select admission year" /></SelectTrigger>
                    <SelectContent>
                      {[2024, 2025, 2026].map((y) => <SelectItem key={y} value={y.toString()}>{y}/{y + 1} Session</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Security */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="pl-10 pr-10 h-11" value={formData.password} onChange={(e) => updateFormData("password", e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Live password requirements */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-xl border border-border">
                    {passwordCriteria.map((c) => {
                      const ok = c.regex.test(formData.password)
                      return (
                        <div key={c.label} className={`flex items-center gap-2 text-[10px] font-bold transition-colors ${ok ? "text-green-600" : "text-muted-foreground"}`}>
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 ${ok ? "bg-green-600 border-green-600" : "border-muted-foreground/40"}`}>
                            {ok && <Check className="w-2 h-2 text-white" />}
                          </div>
                          {c.label}
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Password must be at least 8 characters and meet all criteria above.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Repeat your password" className="pl-10 pr-10 h-11" value={formData.confirmPassword} onChange={(e) => updateFormData("confirmPassword", e.target.value)} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match.</p>
                  )}
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={(c) => updateFormData("acceptTerms", c as boolean)} />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I agree to the academic terms and privacy policy of NovaCrest University.
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5: Passport Photo */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Upload a clear passport photograph (max 5MB). This will appear on your student ID.</p>
                <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${previewUrl ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {previewUrl ? (
                    <div className="space-y-3">
                      <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-primary shadow-md">
                        <img src={previewUrl} alt="Passport preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-primary font-medium">✓ Photo selected — click to replace</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">Click or drag to upload passport photo</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG, WEBP — max 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button type="button" variant="outline" className="flex-1 h-11" onClick={() => setCurrentStep((p) => p - 1)} disabled={isLoading}>
              <ChevronLeft className="w-4 h-4 mr-2" />Back
            </Button>
          )}
          {currentStep < steps.length ? (
            <Button type="button" className="flex-1 h-11" onClick={() => setCurrentStep((p) => p + 1)} disabled={!canProceed()}>
              Continue<ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="button" className="flex-1 h-11" onClick={handleSubmit} disabled={!canProceed() || isLoading}>
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</>) : (<>Complete Registration<ChevronRight className="w-4 h-4 ml-2" /></>)}
            </Button>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          <Shield className="w-3 h-3 text-primary" />
          <span>NovaCrest Secure Enrollment</span>
        </div>
      </div>
    </AuthLayout>
  )
}
