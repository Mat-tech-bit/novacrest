"use client"

import { motion } from "framer-motion"
import { GraduationCap, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showFeatures?: boolean
  variant?: "default" | "admin"
}

const features = [
  {
    icon: GraduationCap,
    title: "World-Class Education",
    description: "Access premium learning resources and expert faculty members",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security protecting your academic journey",
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description: "Intuitive interface designed for the digital generation",
  },
]

const stats = [
  { value: "50K+", label: "Students" },
  { value: "2,500+", label: "Faculty" },
  { value: "150+", label: "Programs" },
  { value: "95%", label: "Employment" },
]

export function AuthLayout({
  children,
  title,
  subtitle,
  showFeatures = true,
  variant = "default",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* ─── LEFT PANEL: INSTITUTIONAL BRANDING ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`hidden md:flex md:w-1/2 lg:w-[45%] xl:w-[40%] relative overflow-hidden ${
          variant === "admin" ? "bg-slate-950" : "bg-primary/95"
        } selection:bg-white/20`}
      >
        {/* Background Layer: Deep Texture & Glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-slate-900" />
          
          {/* Geometric Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          {/* Concentric Glow Effects */}
          <div className="absolute top-0 -right-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-slate-950/40 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 xl:p-20 w-full h-full text-white">
          {/* Logo & Institution Header */}
          <Link href="/" className="flex items-center gap-4 group w-fit">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-black/20 group-hover:rotate-6 transition-transform duration-500">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter leading-none">NOVACREST</h1>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.3em] mt-1">UNIVERSITY</p>
            </div>
          </Link>

          {/* Core Messaging Section */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.85] tracking-tighter text-balance">
                Empowering <span className="text-white/40 italic">Innovators</span>, Shaping the Future.
              </h2>
              <p className="text-xl text-white/60 max-w-md font-medium leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            {showFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-5"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 group cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg tracking-tight">{feature.title}</h3>
                      <p className="text-sm text-white/50 font-medium leading-snug">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Footer Stats: Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-10 border-t border-white/10 pt-12"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-black text-white leading-none tracking-tighter">{stat.value}</div>
                <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── RIGHT PANEL: AUTHENTICATION FORM ────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 relative bg-white lg:bg-slate-50/50">
        {/* Mobile Logo Visibility */}
        <div className="md:hidden absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
               <GraduationCap className="w-7 h-7 text-white" />
             </div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto relative z-10"
        >
          <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-8">
             {children}
          </div>
        </motion.div>

        {/* Legal/Footer Info */}
        <div className="absolute bottom-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 pointer-events-none">
          © {new Date().getFullYear()} NOVACREST UNI — SECURE GATEWAY
        </div>
      </div>
    </div>
  )
}
