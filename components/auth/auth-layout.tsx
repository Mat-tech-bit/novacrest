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
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Left Panel - Branding & Features */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden ${
          variant === "admin"
            ? "bg-slate-950"
            : "bg-slate-900"
        }`}
      >
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-black/60" />
        
        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-20 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">NOVACREST</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">University</p>
            </div>
          </Link>

          {/* Main Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-5xl xl:text-7xl font-black text-white leading-[0.9] tracking-tighter text-balance">
                {title}
              </h2>
              <p className="text-xl text-white/50 max-w-md font-medium leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            {showFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid gap-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-5 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{feature.title}</h3>
                      <p className="text-sm text-white/50 font-medium leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-12 border-t border-white/10 pt-10"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative bg-slate-50">
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
               <GraduationCap className="w-6 h-6 text-white" />
             </div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[520px]"
        >
          <div className="bg-white p-10 sm:p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100">
             {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
