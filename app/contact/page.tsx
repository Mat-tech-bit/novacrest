"use client"

import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Search,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactItems = [
  { 
    icon: Mail, 
    label: "Admissions Inquiry", 
    val: "admissions@novacrest.edu", 
    desc: "For application and enrollment queries." 
  },
  { 
    icon: Phone, 
    label: "Registrar Office", 
    val: "+1 (555) 123-4567", 
    desc: "Academic records and certification." 
  },
  { 
    icon: MapPin, 
    label: "Campus Address", 
    val: "100 University Way, USA", 
    desc: "Official physical shipping & visiting." 
  }
]

const departments = [
  { name: "Admissions Office", email: "adms@novacrest.edu", phone: "ext 102" },
  { name: "Financial Aid", email: "finaid@novacrest.edu", phone: "ext 305" },
  { name: "IT Helpdesk", email: "support@novacrest.edu", phone: "ext 000" },
  { name: "Student Life", email: "life@novacrest.edu", phone: "ext 444" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HEADER ────────────────────────────────────────────────── */}
      <section className="bg-slate-950 pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-20 -mr-96 -mt-96" />
        
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              Reach Out to <span className="text-primary italic">NovaCrest</span>.
            </h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed max-w-xl">
              Our departments are ready to answer your questions and assist with your transition to our academic community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* ─── CONTACT INFO ───────────────────────────────────────── */}
            <div className="space-y-16">
              <div className="space-y-10">
                {contactItems.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 items-start group"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-1 pt-1">
                      <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary">{item.label}</h4>
                      <p className="text-2xl font-black text-slate-950">{item.val}</p>
                      <p className="text-sm font-medium text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-10 bg-slate-50 rounded-[48px] border border-slate-100 space-y-8">
                <h4 className="text-xl font-black text-slate-950 flex items-center gap-3">
                   <MessageSquare className="w-5 h-5 text-primary" /> Department Directory
                </h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  {departments.map(dept => (
                    <div key={dept.name} className="space-y-1">
                      <p className="font-bold text-slate-900">{dept.name}</p>
                      <p className="text-xs font-medium text-slate-500">{dept.email}</p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">{dept.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                 <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Institutional Socials</h4>
                 <div className="flex gap-4">
                    {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                      <button key={i} className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                        <Icon className="w-6 h-6" />
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            {/* ─── CONTACT FORM ───────────────────────────────────────── */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-16 rounded-[64px] border border-slate-200 shadow-2xl shadow-slate-200/50 relative"
            >
              <div className="absolute top-10 right-10 w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
                 <Globe className="w-8 h-8 text-primary/20" />
              </div>
              
              <div className="mb-12 space-y-3">
                <h3 className="text-3xl font-black text-slate-950">Send a Secure Message</h3>
                <p className="text-slate-500 font-medium">Responses usually within 24 business hours.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 pl-1">Full Name</label>
                    <Input className="h-14 px-6 rounded-2xl bg-slate-50 border-slate-100 focus:border-primary focus:bg-white transition-all font-bold" placeholder="E.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 pl-1">Email Address</label>
                    <Input type="email" className="h-14 px-6 rounded-2xl bg-slate-50 border-slate-100 focus:border-primary focus:bg-white transition-all font-bold" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 pl-1">Target Department</label>
                   <div className="relative">
                      <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:bg-white transition-all font-bold appearance-none outline-none">
                        <option>General Admissions</option>
                        <option>International Office</option>
                        <option>Financial Registry</option>
                        <option>IT Support</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 pl-1">Your Message</label>
                  <Textarea rows={4} className="p-6 rounded-3xl bg-slate-50 border-slate-100 focus:border-primary focus:bg-white transition-all font-bold" placeholder="How can we help you today?" />
                </div>

                <Button className="w-full h-18 rounded-[2rem] font-black text-lg gap-3 bg-primary text-white shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform">
                  Dispatch Message <Send className="w-5 h-5" />
                </Button>
                
                <p className="text-[10px] text-center font-black uppercase tracking-widest text-slate-400 pt-4 flex items-center justify-center gap-2">
                   <Clock className="w-3 h-3" /> Average response time: 04h 22m
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MAP COORDINATES ──────────────────────────────────────── */}
      <section className="pb-32 container mx-auto max-w-7xl px-4 lg:px-8">
         <div className="h-[500px] w-full bg-slate-100 rounded-[4rem] border-4 border-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            
            <div className="absolute bottom-16 left-16 text-white space-y-2">
               <h4 className="text-3xl font-black">Crestview Campus</h4>
               <p className="text-white/60 font-medium">32 Main Avenue, Crestview Science Park, USA</p>
               <Button className="bg-white text-slate-950 h-10 px-6 rounded-full font-black text-xs mt-4">
                 Open in Google Maps
               </Button>
            </div>
         </div>
      </section>
    </div>
  )
}
