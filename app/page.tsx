"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"

const stats = [
  { value: "98%", label: "GRADUATION RATE" },
  { value: "50+", label: "GLOBAL PARTNERS" },
  { value: "12:1", label: "STUDENT RATIO" },
  { value: "20+", label: "RESEARCH HUBS" },
]

const portalLinks = [
  {
    href: "/auth/login",
    icon: LogIn,
    title: "Student Hub",
    description: "Access your courses, grades, and schedules in one centralized dashboard.",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/auth/signup",
    icon: UserPlus,
    title: "Admissions Office",
    description: "Begin your journey, track your application, and explore admissions requirements.",
    color: "bg-accent/10 text-accent",
  },
  {
    href: "/auth/admin",
    icon: ShieldCheck,
    title: "Faculty & Staff Portal",
    description: "Manage research, grading, and departmental resources securely.",
    color: "bg-foreground/10 text-foreground",
  },
  {
    href: "/auth/verify-email",
    icon: Mail,
    title: "Institutional Mail",
    description: "Access your official university email and communication channels.",
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    href: "/auth/account-recovery",
    icon: LifeBuoy,
    title: "IT Support Desk",
    description: "Get technical assistance for your accounts and digital resources.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    href: "/auth/two-factor-setup",
    icon: Zap,
    title: "Digital Security",
    description: "Manage your account security and two-factor authentication settings.",
    color: "bg-chart-3/10 text-chart-3",
  },
]



const universityHighlights = [
  {
    icon: Zap,
    title: "Cutting-Edge Research",
    description: "Leading the way in innovation with state-of-the-art labs and world-renowned researchers.",
  },
  {
    icon: Users,
    title: "Vibrant Campus Life",
    description: "A diverse and inclusive community with over 200 student organizations and clubs.",
  },
  {
    icon: Globe,
    title: "Global Alumni Network",
    description: "Join a network of over 200,000 alumni making an impact across the globe.",
  },
]

const faculties = [
  { name: "Science", icon: Zap, count: "12 Departments", color: "bg-blue-500" },
  { name: "Engineering", icon: Building2, count: "8 Departments", color: "bg-orange-500" },
  { name: "Medicine", icon: Sparkles, icon2: Users, count: "15 Specialized Fields", color: "bg-red-500" },
  { name: "Business", icon: BarChart3, count: "6 Programs", color: "bg-emerald-500" },
  { name: "Law", icon: ShieldCheck, count: "4 Departments", color: "bg-indigo-500" },
  { name: "Arts & Humanities", icon: BookOpen, count: "10 Departments", color: "bg-purple-500" },
]

const recentNews = [
  { id: 1, date: "May 25, 2026", title: "NovaCrest Ranks #1 in Sustainable Energy Research", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { id: 2, date: "May 20, 2026", title: "New Global Partnership with European Research Council", image: "https://images.unsplash.com/photo-1523050335102-c8845180f3bd?auto=format&fit=crop&q=80&w=800" },
  { id: 3, date: "May 15, 2026", title: "Innovators Fund Awarded to 15 Student Entrepreneurs", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      {/* ─── STICKY HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-[100] border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-foreground tracking-tight leading-none">NOVACREST</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">UNIVERSITY</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            {["Academics", "Admissions", "Research", "Campus Life", "Alumni"].map((item) => (
              <Link key={item} href="#" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden border-transparent hover:bg-muted md:flex font-bold" asChild>
              <Link href="/auth/login">Portal Login</Link>
            </Button>
            <Button className="rounded-full px-8 h-12 font-bold shadow-xl shadow-primary/25" asChild>
              <Link href="/auth/signup">Apply Today</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* ─── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-slate-950">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative pt-10">
            <div className="max-w-4xl space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-widest uppercase">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Shaping Tomorrow&apos;s Leaders Today
                </div>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  BE THE <span className="text-primary italic">FUTURE</span> <br /> OF INNOVATION.
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed">
                  Join a global community of thinkers, creators, and leaders at Africa&apos;s leading research-driven university. Your journey to excellence starts here.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6"
              >
                <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-primary/40 group" asChild>
                  <Link href="/auth/signup">
                    Start Application
                    <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-black border-white/30 text-white hover:bg-white hover:text-black transition-all" asChild>
                  <Link href="#">View 2026/27 Prospectus</Link>
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 pt-16">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FACULTIES GRID ───────────────────────────────────────── */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl space-y-4 text-left">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Academic Excellence</h2>
                <h3 className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-none">
                  World-Class Faculties <br /> & Research Centers.
                </h3>
              </div>
              <Button variant="link" className="text-primary font-black uppercase tracking-widest group">
                All Departments <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                  className="group p-10 bg-white rounded-[32px] border border-slate-200 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-8 shadow-xl shadow-${f.color.split('-')[1]}-200`}>
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{f.name}</h4>
                  <p className="text-slate-500 font-medium mt-2">{f.count}</p>
                  <div className="h-0.5 w-12 bg-slate-100 group-hover:w-full group-hover:bg-primary/20 transition-all duration-700 mt-8" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DIGITAL PORTAL ACTION ────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />
          <div className="container mx-auto px-4 lg:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-white space-y-6">
              <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">
                Seamless Digital Gateway <br /> for Every Student.
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
              <div className="w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center lg:mt-12 group transition-all hover:-rotate-6">
                <FileText className="w-8 h-8 text-white mb-2" />
                <p className="text-[10px] font-black tracking-widest text-white/60">RESOURCES</p>
              </div>
              <div className="w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center group transition-all hover:rotate-6">
                <Users className="w-8 h-8 text-white mb-2" />
                <p className="text-[10px] font-black tracking-widest text-white/60">COMMUNITY</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LATEST UPDATES ────────────────────────────────────────── */}
        <section className="py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Latest Happenings</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">University News & Events.</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {recentNews.map((news) => (
                <div key={news.id} className="group cursor-pointer">
                  <div className="relative h-64 overflow-hidden rounded-[32px] mb-8">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-slate-900">
                      {news.date}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-950 group-hover:text-primary transition-colors leading-tight">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-4 text-primary font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                    Read Full Story <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CALL TO ACTION BAR ────────────────────────────────────── */}
        <section className="container mx-auto px-4 lg:px-8 pb-32">
          <div className="bg-slate-950 rounded-[48px] p-12 lg:p-24 relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-[140px] opacity-20 -mr-48 -mt-48" />
            <div className="space-y-6 relative z-10 max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-none tracking-tighter">
                Ready to Join <br /> Our <span className="text-primary underline underline-offset-8 decoration-white/20">Elite</span> Class?
              </h2>
              <p className="text-xl text-white/50 font-medium">
                Admissions for the upcoming 2026/2027 semester close on August 30th. Secure your spot in the future.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
              <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-black bg-white text-slate-950 hover:bg-primary hover:text-white transition-all w-full md:w-auto" asChild>
                <Link href="/auth/signup">Apply for Admission</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-lg font-black border-white/20 text-white hover:border-white transition-all w-full md:w-auto">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── STICKY FOOTER NAVIGATION ─────────────────────────────── */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-left">
            <div className="col-span-2 lg:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter">NOVACREST</h1>
              </Link>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                Setting the global standard for high-impact education and ethical leadership since 1954. Driven by innovation, built on tradition.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">University</h5>
              <ul className="space-y-4 font-bold text-slate-600">
                {["History", "Research Area", "Staff Directory", "Careers", "Sustainability"].map(item => (
                  <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Admissions</h5>
              <ul className="space-y-4 font-bold text-slate-600">
                {["Undergraduate", "Postgraduate", "Tuition & Fees", "Scholarships", "International"].map(item => (
                  <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Support</h5>
              <ul className="space-y-4 font-bold text-slate-600">
                {["Help Center", "IT Desk", "Campus Safety", "Counseling", "Health Services"].map(item => (
                  <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar is essentially sticky by design in long content layouts */}
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <p>© {new Date().getFullYear()} NOVACREST UNI</p>
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Status</Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Crestview, USA</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


