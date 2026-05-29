"use client"

import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  Calendar, 
  FileText, 
  CreditCard, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  HelpCircle,
  Clock
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const admissionSteps = [
  { 
    title: "Apply Online", 
    desc: "Complete our comprehensive digital application form in less than 15 minutes.", 
    icon: FileText,
    detail: "Personal and academic information required."
  },
  { 
    title: "Document Verification", 
    desc: "Submit your academic transcripts and identification documents via our secure portal.", 
    icon: CheckCircle2,
    detail: "JPG, PNG, or PDF format accepted."
  },
  { 
    title: "Evaluation Period", 
    desc: "Our board reviews all applications within 14 business days of submission.", 
    icon: Clock,
    detail: "Real-time tracking available in Portal."
  },
  { 
    title: "Final Enrollment", 
    desc: "Confirm your spot by paying the initial commitment fee and setting up your ID.", 
    icon: CreditCard,
    detail: "Secure online payment gateway."
  }
]

const tuitionData = [
  { level: "Undergraduate", fee: "$12,500", period: "per semester", details: "All lab & library fees included" },
  { level: "Postgraduate", fee: "$18,200", period: "per semester", details: "Research grants available" },
  { level: "International", fee: "$22,000", period: "per year", details: "Visa assistance & housing provided" },
]

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                Admissions for 2026/27 Now Open
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter">
                Start Your <br /> <span className="text-primary italic">Legacy</span> Today.
              </h1>
              <p className="text-xl text-slate-600 max-w-xl font-medium leading-relaxed">
                We are looking for ambitious minds ready to redefine what&apos;s possible. Our process is transparent, digital-first, and designed for global excellence.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-2xl font-black text-lg bg-primary text-white shadow-xl shadow-primary/20" asChild>
                  <Link href="/auth/signup">Begin Application</Link>
                </Button>
                <Link href="/contact" className="flex items-center gap-2 font-black uppercase text-xs tracking-widest text-primary hover:gap-4 transition-all group">
                   Inquiry Form <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 w-full lg:w-auto grid grid-cols-2 gap-6"
            >
              <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-xl shadow-black/5 space-y-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-950 mb-2">Aug 30</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regular Application Deadline</p>
                </div>
              </div>

              <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl space-y-8 mt-12">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-4xl font-black mb-2 text-white">Sep 15</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Freshman Orientation Starts</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STEPS GRID ───────────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
             <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">The Roadmap</h2>
             <h3 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">Four Steps to Enrollment.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-slate-50 p-10 rounded-[40px] border border-slate-100 group hover:bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-5xl font-black text-slate-200 absolute top-8 right-10 group-hover:text-primary/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <step.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-950 mb-3">{step.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{step.desc}</p>
                <div className="pt-6 border-t border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {step.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TUITION & FEES ───────────────────────────────────────── */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-10 -ml-64 -mt-64" />
        
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-20 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tighter">
                Invest in Your <br /> Future Excellence.
              </h2>
              <p className="text-lg text-white/60 font-medium">
                We offer competitive tuition structures and over $20M in annual scholarships to ensure financial obstacles don&apos;t stand in the way of brilliance.
              </p>
              <div className="space-y-4">
                <Button className="w-full h-14 rounded-2xl font-black bg-primary text-white" asChild>
                  <Link href="/contact">Download Fee Schedule (PDF)</Link>
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-2xl font-black border-white/10 text-white hover:bg-white hover:text-slate-950">
                  Scholarship Finder
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
              {tuitionData.map((t, i) => (
                <div key={i} className="p-10 rounded-[48px] bg-white text-slate-950 space-y-6 flex flex-col items-center text-center shadow-2xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 rounded-full">
                    {t.level}
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black">{t.fee}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.period}</div>
                  </div>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed pt-6 border-t border-slate-100 w-full">
                    {t.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="bg-slate-50 p-12 lg:p-20 rounded-[64px] border border-slate-100">
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-slate-950 tracking-tight">Need Assistance?</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  Our admissions officers are available 24/7 to guide you through the application portal and answer institutional questions.
                </p>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-bold text-sm text-slate-900">Virtual Office Hours</span>
                   </div>
                   <div className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span className="font-bold text-sm text-slate-900">FAQ Center</span>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
                  <span className="font-bold text-slate-900">What are the language requirements?</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
                  <span className="font-bold text-slate-900">Can I apply for multiple programs?</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
                  <span className="font-bold text-slate-900">Is there an application fee?</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
