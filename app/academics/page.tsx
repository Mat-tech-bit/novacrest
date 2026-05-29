"use client"

import { motion } from "framer-motion"
import { 
  BookOpen, 
  Microscope, 
  Globe, 
  Users, 
  Clock, 
  ChevronRight, 
  Search,
  GraduationCap,
  Building2,
  Zap,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Download,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const faculties = [
  { 
    title: "Science & Innovation", 
    icon: Microscope, 
    count: "12 Departments", 
    desc: "Leading research in renewable energy, quantum computing, and biotechnology.",
    programs: ["Computer Science", "Physics", "Chemistry", "Molecular Biology"]
  },
  { 
    title: "Business & Leadership", 
    icon: Globe, 
    count: "8 Programs", 
    desc: "Developing the next generation of global entrepreneurs and ethical CEOs.",
    programs: ["MBA", "Finance", "International Trade", "Strategic Marketing"]
  },
  { 
    title: "Health Sciences", 
    icon: Users, 
    count: "15 Specialized Fields", 
    desc: "Advance medical training with state-of-the-art simulation laboratories.",
    programs: ["Medicine", "Nursing", "Pharmacy", "Biomedical Science"]
  },
  { 
    title: "Arts & Humanities", 
    icon: BookOpen, 
    count: "10 Departments", 
    desc: "Exploring human culture through critical thinking and creative expression.",
    programs: ["Philosophy", "History", "Fine Arts", "Languages"]
  }
]

const academicSchedule = [
  { event: "Fall Semester Starts", date: "Sep 01, 2026" },
  { event: "Mid-Term Examinations", date: "Oct 15, 2026" },
  { event: "Spring Registration", date: "Nov 10, 2026" },
  { event: "Winter Break Starts", date: "Dec 20, 2026" },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── HERO HEADER ────────────────────────────────────────── */}
      <section className="bg-slate-950 pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523050335102-c8845180f3bd?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              Shape the <span className="text-primary italic">Knowledge</span> <br /> of Tomorrow.
            </h1>
            <p className="text-xl text-white/70 font-medium leading-relaxed max-w-xl">
              NovaCrest offers a curriculum designed to challenge boundaries and foster innovation across 40+ specialized disciplines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input 
                  placeholder="Search for a program or course..." 
                  className="h-14 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl backdrop-blur-md focus:ring-primary"
                />
              </div>
              <Button size="lg" className="h-14 px-10 rounded-2xl font-black bg-primary text-white">Find Your Fit</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 lg:px-8 py-24">
        {/* ─── FACULTIES GRID ───────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {faculties.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[48px] border border-slate-200 hover:shadow-2xl hover:border-primary/20 transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <f.icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 rounded-full">
                  {f.count}
                </span>
              </div>
              
              <h3 className="text-3xl font-black text-slate-950 mb-3 leading-tight">{f.title}</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">{f.desc}</p>
              
              <div className="space-y-3 mb-10 flex-grow">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Programs</h4>
                <div className="flex flex-wrap gap-2">
                  {f.programs.map(p => (
                    <span key={p} className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="h-12 rounded-xl font-bold border-slate-200 hover:border-primary hover:text-primary group/btn w-full sm:w-auto self-start">
                Explore Directory <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* ─── CALENDAR & RESOURCES ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-950">Academic Calendar 2026/27</h2>
              <p className="text-slate-500 font-medium max-w-xl">Stay informed about key dates, registration deadlines, and examination periods for the current academic session.</p>
            </div>
            
            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
              {academicSchedule.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-8 ${i !== academicSchedule.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex flex-col items-center justify-center text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">{item.event}</span>
                  </div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="h-14 px-10 rounded-2xl font-black gap-3 w-full sm:w-auto" asChild>
              <Link href="#">
                Download Full Calendar <Download className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div className="bg-primary p-10 rounded-[40px] text-white space-y-6 shadow-xl shadow-primary/20">
              <h3 className="text-2xl font-black leading-tight">Ready to start your academic year?</h3>
              <p className="text-white/80 font-medium">Join thousands of students building their careers at NovaCrest. Applications are now open for all faculties.</p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 h-14 rounded-2xl font-black" asChild>
                <Link href="/auth/signup">Apply Today</Link>
              </Button>
            </div>

            <div className="bg-slate-900 p-8 rounded-[40px] text-white border border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Accreditation</h4>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                NovaCrest University is fully accredited by the Global Bureau of Higher Education, ensuring your degree is recognized worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
