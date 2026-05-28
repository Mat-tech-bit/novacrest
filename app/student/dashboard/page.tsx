"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Link from "next/link"
import {
  GraduationCap,
  LogOut,
  User,
  BookOpen,
  Calendar,
  Bell,
  Settings,
  BarChart3,
  FileText,
  CreditCard,
  Home,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface StudentData {
  uid: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  faculty: string
  department: string
  program: string
  admissionYear: string
  matricNumber: string
  photoUrl: string
  createdAt: string
}

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "fees", label: "Fees & Finance", icon: CreditCard },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "profile", label: "My Profile", icon: User },
]

const sampleCourses = [
  { code: "CSC 101", title: "Introduction to Computing", units: 3, status: "In Progress", grade: null },
  { code: "MTH 101", title: "Elementary Mathematics I", units: 3, status: "In Progress", grade: null },
  { code: "ENG 101", title: "Use of English", units: 2, status: "In Progress", grade: null },
  { code: "GST 101", title: "Communication in English", units: 2, status: "Pending", grade: null },
  { code: "PHY 101", title: "General Physics I", units: 3, status: "In Progress", grade: null },
]

const announcements = [
  { id: 1, type: "info", title: "Course Registration Open", body: "Course registration for the 2025/2026 first semester is now open. Deadline: June 30, 2026.", time: "2 hours ago" },
  { id: 2, type: "warning", title: "Tuition Fee Reminder", body: "First semester tuition fees are due by July 15, 2026. Avoid late payment penalties.", time: "1 day ago" },
  { id: 3, type: "success", title: "Library Access Activated", body: "Your student card has been linked to the university library system. Visit during opening hours.", time: "3 days ago" },
]

const facultyLabels: Record<string, string> = {
  science: "Science",
  engineering: "Engineering",
  arts: "Arts",
  medicine: "Medicine",
  law: "Law",
  business: "Business",
  education: "Education",
  "social-sciences": "Social Sciences",
}
const programLabels: Record<string, string> = {
  bsc: "Bachelor of Science (B.Sc.)",
  ba: "Bachelor of Arts (B.A.)",
  beng: "Bachelor of Engineering (B.Eng.)",
  msc: "Master of Science (M.Sc.)",
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      try {
        const snap = await getDoc(doc(db, "students", user.uid))
        if (snap.exists()) {
          setStudent(snap.data() as StudentData)
        }
      } catch (e) {
        console.error("Error loading student data:", e)
      } finally {
        setLoading(false)
      }
    })
    return () => unsub()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading your portal...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Academic Profile Missing</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We found your login account, but your university student profile hasn&apos;t been set up yet or was incompletely registered.
            </p>
          </div>
          <div className="pt-4 space-y-3">
            <Button onClick={handleLogout} variant="outline" className="w-full h-12 rounded-xl border-slate-200">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out & Try Again
            </Button>
            <p className="text-[11px] text-slate-400">
              If you believe this is an error, please contact the University ICT department.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const firstName = student.firstName || "Student"

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-200 shrink-0">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">NovaCrest</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">University</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Student mini-profile */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
              {student.photoUrl ? (
                <img src={student.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-sm truncate">{firstName} {student.lastName}</p>
              <p className="text-[11px] text-primary font-bold truncate">{student.matricNumber}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Bottom logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center gap-4 px-4 lg:px-8 shrink-0">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
              {student.photoUrl ? (
                <img src={student.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>

            {/* ─── OVERVIEW ──────────────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
                  <div className="flex items-center gap-5 relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-white/30 shrink-0 shadow-xl">
                      {student.photoUrl ? (
                        <img src={student.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/20 flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-medium">Welcome back 👋</p>
                      <h2 className="text-2xl lg:text-3xl font-bold">{firstName} {student.lastName}</h2>
                      <p className="text-white/80 text-sm mt-1">{student.matricNumber} · {facultyLabels[student.faculty] || student.faculty} Faculty</p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Registered Courses", value: "5", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
                    { label: "Credit Units", value: "13", icon: Award, color: "bg-purple-50 text-purple-600" },
                    { label: "Current GPA", value: "—", icon: TrendingUp, color: "bg-green-50 text-green-600" },
                    { label: "Academic Level", value: "100L", icon: GraduationCap, color: "bg-orange-50 text-orange-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Announcements + Quick Actions */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Announcements</h3>
                      <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{announcements.length}</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {announcements.map((a) => (
                        <div key={a.id} className="px-6 py-4 flex gap-4">
                          <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            a.type === "warning" ? "bg-amber-100" : a.type === "success" ? "bg-green-100" : "bg-blue-100"
                          }`}>
                            {a.type === "warning" ? <AlertCircle className="w-4 h-4 text-amber-600" /> :
                             a.type === "success" ? <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                             <Bell className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{a.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{a.body}</p>
                            <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                      <h3 className="font-bold text-slate-900 mb-4 text-sm">Quick Actions</h3>
                      <div className="space-y-2">
                        {[
                          { label: "Register Courses", icon: BookOpen, tab: "courses" },
                          { label: "View Results", icon: BarChart3, tab: "results" },
                          { label: "Pay Fees", icon: CreditCard, tab: "fees" },
                          { label: "My Documents", icon: FileText, tab: "documents" },
                        ].map((action) => (
                          <button
                            key={action.label}
                            onClick={() => setActiveTab(action.tab)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-all group"
                          >
                            <action.icon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            {action.label}
                            <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-primary" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-2xl border border-primary/10 p-5">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Academic Session</p>
                      <p className="text-slate-900 font-bold">2025/2026</p>
                      <p className="text-slate-500 text-xs mt-1">First Semester</p>
                      <div className="mt-3 bg-white rounded-lg p-3">
                        <p className="text-[11px] text-slate-500">Semester ends</p>
                        <p className="text-slate-800 font-bold text-sm">December 20, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── MY COURSES ────────────────────────────────────────── */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Registered Courses</h2>
                    <p className="text-slate-500 text-sm">2025/2026 Academic Session — First Semester</p>
                  </div>
                  <div className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full">13 Units</div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="text-left p-4 font-semibold text-slate-600">Course Code</th>
                          <th className="text-left p-4 font-semibold text-slate-600">Course Title</th>
                          <th className="text-center p-4 font-semibold text-slate-600">Units</th>
                          <th className="text-center p-4 font-semibold text-slate-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {sampleCourses.map((c) => (
                          <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-primary">{c.code}</td>
                            <td className="p-4 text-slate-700">{c.title}</td>
                            <td className="p-4 text-center font-semibold text-slate-900">{c.units}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                c.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                              }`}>{c.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">Course Registration Deadline</p>
                    <p className="text-amber-700 text-xs mt-1">Ensure all courses are registered before June 30, 2026. Late registration attracts a penalty fee.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── RESULTS ──────────────────────────────────────────── */}
            {activeTab === "results" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Academic Results</h2>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                  <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-700 text-lg">No Results Yet</h3>
                  <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">Your semester results will appear here once they are published by the examination office.</p>
                </div>
              </div>
            )}

            {/* ─── TIMETABLE ────────────────────────────────────────── */}
            {activeTab === "timetable" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Class Timetable</h2>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-700 text-lg">Timetable Not Published</h3>
                  <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">The semester timetable is being prepared by the Academic Office. Check back soon.</p>
                </div>
              </div>
            )}

            {/* ─── FEES ─────────────────────────────────────────────── */}
            {activeTab === "fees" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Fees & Finance</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Acceptance Fee", amount: "₦50,000", status: "Paid", color: "green" },
                    { label: "School Fees (1st Semester)", amount: "₦150,000", status: "Pending", color: "amber" },
                    { label: "Student Union Levy", amount: "₦5,000", status: "Pending", color: "amber" },
                    { label: "Library Fee", amount: "₦3,000", status: "Pending", color: "amber" },
                  ].map((fee) => (
                    <div key={fee.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{fee.label}</p>
                        <p className="text-xl font-bold text-slate-900 mt-1">{fee.amount}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        fee.color === "green" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>{fee.status}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full sm:w-auto h-11">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment Portal
                </Button>
              </div>
            )}

            {/* ─── DOCUMENTS ────────────────────────────────────────── */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">My Documents</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Admission Letter", desc: "Official admission offer letter", available: true },
                    { name: "Student ID Card", desc: "Digital student identity card", available: false },
                    { name: "Course Registration Form", desc: "Semester course registration", available: false },
                    { name: "Medical Certificate", desc: "University health form", available: false },
                    { name: "Academic Transcript", desc: "Official academic record", available: false },
                    { name: "Studentship Certificate", desc: "Proof of enrollment", available: false },
                  ].map((doc) => (
                    <div key={doc.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{doc.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                      </div>
                      <Button size="sm" variant={doc.available ? "default" : "outline"} disabled={!doc.available} className="w-full">
                        {doc.available ? "Download" : "Not Available"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PROFILE ──────────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="space-y-6 max-w-3xl">
                <h2 className="text-xl font-bold text-slate-900">Student Profile</h2>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="h-28 bg-gradient-to-r from-primary to-primary/70" />
                  <div className="px-6 pb-6">
                    <div className="-mt-14 flex items-end gap-5 mb-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 shrink-0">
                        {student.photoUrl ? (
                          <img src={student.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200">
                            <User className="w-10 h-10 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{student.firstName} {student.lastName}</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mt-1">
                          <Award className="w-3 h-3" />
                          {student.matricNumber}
                        </span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Personal Details</h4>
                        {[
                          { icon: User, label: "Full Name", value: `${student.firstName} ${student.lastName}` },
                          { icon: Mail, label: "Email", value: student.email },
                          { icon: Phone, label: "Phone", value: student.phone || "—" },
                          { icon: Calendar, label: "Date of Birth", value: student.dateOfBirth || "—" },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                              <row.icon className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{row.label}</p>
                              <p className="text-slate-800 font-medium text-sm">{row.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Academic Details</h4>
                        {[
                          { icon: GraduationCap, label: "Program", value: programLabels[student.program] || student.program },
                          { icon: BookOpen, label: "Faculty", value: `Faculty of ${facultyLabels[student.faculty] || student.faculty}` },
                          { icon: MapPin, label: "Department", value: student.department?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) },
                          { icon: Calendar, label: "Admission Year", value: `${student.admissionYear}/${parseInt(student.admissionYear) + 1} Session` },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                              <row.icon className="w-4 h-4 text-slate-500" />
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{row.label}</p>
                              <p className="text-slate-800 font-medium text-sm capitalize">{row.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
