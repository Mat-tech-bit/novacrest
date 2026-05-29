"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  GraduationCap,
  LogIn,
  UserPlus,
  ChevronRight,
  Sparkles,
  Users,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  LifeBuoy,
  FileText,
  ShieldCheck,
  Zap,
  Building2,
  BarChart3,
  Stethoscope,
  Cpu,
  Trophy,
  Calendar,
  ArrowRight,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const stats = [
  { value: "98%", label: "GRADUATION RATE" },
  { value: "50+", label: "GLOBAL PARTNERS" },
  { value: "12:1", label: "STUDENT RATIO" },
  { value: "20+", label: "RESEARCH HUBS" },
]

const academicPrograms = [
  {
    title: "Engineering & Technology",
    icon: Building2,
    desc: "Innovative solutions for complex infrastructure and sustainable development.",
    color: "bg-blue-600",
  },
  {
    title: "Computer Science & AI",
    icon: Cpu,
    desc: "Master the algorithms shaping the next century of digital transformation.",
    color: "bg-indigo-600",
  },
  {
    title: "Business Administration",
    icon: BarChart3,
    desc: "Developing leadership frameworks for sustainable global trade and ethics.",
    color: "bg-emerald-600",
  },
  {
    title: "Health Sciences",
    icon: Stethoscope,
    desc: "Advancing medical care through research-driven clinical excellence.",
    color: "bg-rose-600",
  },
]

const events = [
  {
    title: "Annual Research Symposium 2026",
    date: "June 15, 2026",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Innovators' Hackathon",
    date: "July 02, 2026",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Fall Semester Orientation",
    date: "August 20, 2026",
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1523050335102-c8845180f3bd?auto=format&fit=crop&q=80&w=800",
  },
]

const faculties = [
  { name: "Science", icon: Zap, count: "12 Departments", color: "bg-blue-500" },
  { name: "Engineering", icon: Building2, count: "8 Departments", color: "bg-orange-500" },
  { name: "Medicine", icon: Sparkles, count: "15 Specialized Fields", color: "bg-red-500" },
  { name: "Business", icon: BarChart3, count: "6 Programs", color: "bg-emerald-500" },
  { name: "Law", icon: ShieldCheck, count: "4 Departments", color: "bg-indigo-500" },
  { name: "Arts & Humanities", icon: BookOpen, count: "10 Departments", color: "bg-purple-500" },
]

const quickActions = [
  { label: "Emergency", sub: "24/7 Response", icon: LifeBuoy, color: "text-red-500", border: "border-red-500/20" },
  { label: "Apply Now", sub: "Admissions 2026", icon: UserPlus, color: "text-primary", border: "border-primary/20" },
  { label: "Campus Map", sub: "Digital Hub", icon: MapPin, color: "text-emerald-500", border: "border-emerald-500/20" },
  { label: "E-Library", sub: "24/7 Access", icon: BookOpen, color: "text-amber-500", border: "border-amber-500/20" },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      {/* ─── INSTITUTIONAL TOP BAR ─────────────────────────────────── */}
      <div className="bg-slate-950 text-white border-b border-white/5 overflow-hidden">
        <div className="container mx-auto max-w-7xl flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] h-10 px-4 lg:px-8">
          <div className="hidden sm:flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 text-primary animate-pulse font-black">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Campus Status: Normal
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <MapPin className="w-3 h-3" /> Campus Map
            </Link>
          </div>
          
          <div className="flex sm:hidden items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap py-2">
            <div className="flex items-center gap-2 text-primary font-black">
               Normal
            </div>
            <Link href="/contact" className="hover:text-primary transition-colors">Map</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Emergency</Link>
          </div>

          <div className="hidden sm:flex items-center gap-6 shrink-0">
            <span className="opacity-40 italic">Global Accreditation: AU-CARES</span>
            <Link href="/contact" className="hover:text-primary transition-colors border-l border-white/10 pl-6">Emergency Info</Link>
          </div>
        </div>
      </div>

      {/* ─── STICKY HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-[100] border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-black text-foreground tracking-tight leading-none">NOVACREST</h1>
              <p className="text-[9px] sm:text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-0.5 sm:mt-1">UNIVERSITY</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { n: "Academics", h: "/academics" },
              { n: "Admissions", h: "/admissions" },
              { n: "Campus Life", h: "/campus-life" },
              { n: "Contact", h: "/contact" }
            ].map((item) => (
              <Link key={item.n} href={item.h} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors relative group">
                {item.n}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" className="border-transparent hover:bg-muted font-bold" asChild>
                <Link href="/auth/login">Portal Login</Link>
              </Button>
              <Button className="rounded-full px-8 h-12 font-bold shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href="/auth/signup">Apply Today</Link>
              </Button>
            </div>
            <Button variant="outline" size="icon" className="lg:hidden rounded-xl h-10 w-10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-background border-b border-border/40 overflow-hidden"
            >
              <div className="px-4 py-8 space-y-6">
                {[
                  { n: "Academics", h: "/academics" },
                  { n: "Admissions", h: "/admissions" },
                  { n: "Campus Life", h: "/campus-life" },
                  { n: "Contact", h: "/contact" },
                  { n: "Student Portal", h: "/auth/login" }
                ].map((item) => (
                  <Link 
                    key={item.n} 
                    href={item.h} 
                    className="block text-2xl font-black text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.n}
                  </Link>
                ))}
                <Button className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 bg-primary text-white" asChild>
                  <Link href="/auth/signup">Apply Today</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {/* ─── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative flex items-center overflow-hidden bg-slate-950 pt-32 pb-24 lg:pt-48 lg:pb-32">
          {/* Background Layer: Deep Texture & Glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Professional Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Dynamic Glow Accents */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col gap-12 lg:gap-20">
              {/* Hero Content */}
              <div className="max-w-4xl space-y-8 lg:space-y-10 text-center lg:text-left mx-auto lg:mx-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Shaping Tomorrow&apos;s Leaders Today
                  </div>
                  
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                    BE THE <span className="text-primary italic">FUTURE</span> <br /> OF INNOVATION.
                  </h1>
                  
                  <p className="text-lg lg:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
                    Join a global community of thinkers, creators, and leaders at Africa&apos;s leading research-driven university. Your journey to excellence starts here.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6"
                >
                  <Button size="lg" className="h-14 lg:h-16 px-8 lg:px-10 rounded-2xl text-base lg:text-lg font-black shadow-2xl shadow-primary/40 group bg-primary text-white hover:bg-primary/90" asChild>
                    <Link href="/auth/signup">
                      Start Application
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="h-14 lg:h-16 px-8 lg:px-10 rounded-2xl text-base lg:text-lg font-black border border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950 transition-all backdrop-blur-sm group" asChild>
                    <Link href="/auth/login">
                      Student Login
                      <LogIn className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* ─── QUICK ACCESS BAR (HEALTH CENTER MODEL) ──────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {quickActions.map((action, i) => (
                  <Link 
                    key={i}
                    href="#" 
                    className={`flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 backdrop-blur-xl border ${action.border} hover:bg-white/10 transition-all group`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white">{action.label}</span>
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{action.sub}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>

              {/* ─── HORIZONTAL STATS CARD (GLASSMORPISM) ──────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 lg:p-12 shadow-2xl"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="space-y-2 relative group italic text-center md:text-left">
                      <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] leading-tight">
                        {stat.label}
                      </div>
                      {i < stats.length - 1 && (
                        <div className="hidden md:block absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── FACULTIES GRID ───────────────────────────────────────── */}
        <section className="py-24 sm:py-32 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Academic Excellence</h2>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none">
                  World-Class Faculties <br className="hidden sm:block" /> & Research Centers.
                </h3>
              </div>
              <Button variant="link" className="text-primary font-black uppercase tracking-widest group p-0 h-auto" asChild>
                <Link href="/academics">
                  All Departments <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculties.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 bg-white rounded-[40px] border border-slate-200 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-8 shadow-xl shadow-black/5`}>
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                    {f.name}
                  </h4>
                  <p className="text-slate-500 font-medium mt-2">{f.count}</p>
                  <div className="h-0.5 w-12 bg-slate-100 group-hover:w-full group-hover:bg-primary/20 transition-all duration-700 mt-8" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LATEST NEWS & CAMPUS EVENTS ───────────────────────────── */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Happenings</h2>
                <h3 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-none">
                  News & Campus Events.
                </h3>
              </div>
              <Button variant="link" className="text-primary font-black uppercase tracking-widest p-0 h-auto group" asChild>
                <Link href="/academics">
                  All Events <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto sm:overflow-visible no-scrollbar pb-8 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[300px] sm:min-w-0 group cursor-pointer"
                >
                  <div className="relative h-64 sm:h-72 lg:h-[400px] rounded-[48px] overflow-hidden mb-8 shadow-2xl shadow-black/5">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-slate-900 shadow-sm">
                        {event.date}
                       </span>
                      <span className="px-5 py-2 bg-primary/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-white shadow-sm self-start">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-950 group-hover:text-primary transition-colors leading-tight mb-4">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
                    Register for Event <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ACADEMIC PROGRAMS GRID ──────────────────────────────── */}
        <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -mr-20 -mt-20" />
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-16 sm:mb-24 gap-8">
              <div className="max-w-3xl space-y-4">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Major Fields of Study</h2>
                <h3 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-none">
                  Academic Programs <br className="hidden sm:block" /> Built for the Real World.
                </h3>
              </div>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                Explore our diverse range of industry-aligned programs designed to prepare you for global impact.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {academicPrograms.map((prog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-10 rounded-[40px] border border-slate-200 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white ${prog.color} shadow-xl shadow-black/5 group-hover:scale-110 transition-transform`}>
                    <prog.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">
                    {prog.title}
                  </h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 flex-grow">
                    {prog.desc}
                  </p>
                  <Link 
                    href="/academics" 
                    className="inline-flex items-center text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DIGITAL PORTAL ACTION ────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />
          <div className="container mx-auto max-w-7xl px-4 lg:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-white space-y-6">
              <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">
                Seamless Digital Gateway <br className="hidden sm:block" /> for Every Student.
              </h3>
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                NovaCrest University is fully digital. Manage your courses, access library resources, and handle academic administration from anywhere in the world.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/auth/login" className="px-8 py-4 bg-white text-primary font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-black/10 text-sm">
                  Go to Student Hub <LogIn className="w-4 h-4" />
                </Link>
                <Link href="/auth/admin" className="px-8 py-4 bg-primary-foreground/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-sm">
                  Staff Access
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ rotate: -6 }}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center lg:mt-12 transition-all shadow-2xl"
              >
                <FileText className="w-8 h-8 text-white mb-2" />
                <p className="text-[10px] font-black tracking-widest text-white/60 uppercase">RESOURCES</p>
              </motion.div>
              <motion.div 
                whileHover={{ rotate: 6 }}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center transition-all shadow-2xl"
              >
                <Users className="w-8 h-8 text-white mb-2" />
                <p className="text-[10px] font-black tracking-widest text-white/60 uppercase">COMMUNITY</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CALL TO ACTION BAR ────────────────────────────────────── */}
        <section className="container mx-auto max-w-7xl px-4 lg:px-8 py-32">
          <div className="bg-slate-950 rounded-[48px] p-12 lg:p-24 relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-[140px] opacity-20 -mr-48 -mt-48" />
            <div className="space-y-6 relative z-10 max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter">
                Ready to Join <br className="hidden sm:block" /> Our <span className="text-primary underline underline-offset-8 decoration-white/20 italic">Elite</span> Class?
              </h2>
              <p className="text-xl text-white/50 font-medium">
                Admissions for the upcoming 2026/2027 semester close on August 30th. Secure your spot in the future.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
              <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-black bg-white text-slate-950 hover:bg-primary hover:text-white transition-all w-full md:w-auto shadow-2xl shadow-white/5" asChild>
                <Link href="/auth/signup">Apply for Admission</Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-12 rounded-2xl text-lg font-black border border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950 transition-all w-full md:w-auto backdrop-blur-md" asChild>
                <Link href="/contact">Talk to an Advisor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── INSTITUTIONAL FOOTER ──────────────────────────────────── */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            <div className="col-span-2 lg:col-span-1 space-y-8">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-950 tracking-tighter leading-none">NOVACREST</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">UNIVERSITY</span>
                </div>
              </Link>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                Empowering the next generation of global innovators through research excellence and modern education.
              </p>
              <div className="flex items-center gap-4 text-slate-400">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <Link key={i} href="#" className="hover:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-950 font-black text-xs uppercase tracking-[0.2em] mb-8">Academic Units</h4>
              <ul className="space-y-4">
                {["Science & Tech", "Engineering", "Medicine", "Business", "Law", "Social Sciences"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 hover:text-primary font-medium text-sm transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-slate-950 font-black text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {["Student Portal", "Fee Schedule", "Academic Calendar", "Library", "Research", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 hover:text-primary font-medium text-sm transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-slate-950 font-black text-xs uppercase tracking-[0.2em] mb-8">Our Campus</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-500 text-sm font-medium leading-relaxed">
                    12 University Way, <br /> Innovation District, Lagos.
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <Phone className="w-5 h-5 text-primary" /> +234 800 123 4567
                </li>
                <li className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <Mail className="w-5 h-5 text-primary" /> admissions@novacrest.edu
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} NovaCrest University. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> AU Accreditation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
