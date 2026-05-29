"use client"

import { motion } from "framer-motion"
import { 
  Heart, 
  Coffee, 
  Shield, 
  Trophy, 
  Music, 
  Users, 
  MapPin, 
  Waves,
  Sparkles,
  ArrowRight,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const highlights = [
  { title: "Student Housing", img: "https://images.unsplash.com/photo-1555854817-5b2738a7c577?auto=format&fit=crop&q=80&w=800", icon: Heart, desc: "Modern, high-speed dormitories designed for focused living." },
  { title: "Dining & Social", img: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=800", icon: Coffee, desc: "Gourmet dining halls and student lounges across campus." },
  { title: "Sports & Fitness", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", icon: Trophy, desc: "State-of-the-art gymnasiums and Olympic-sized pools." },
  { title: "Campus Safety", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee3f?auto=format&fit=crop&q=80&w=800", icon: Shield, desc: "24/7 campus security and emergency response teams." }
]

const clubs = [
  { name: "Robotics & AI Lab", category: "Technology", members: "450+" },
  { name: "NovaCrest Philharmonic", category: "Arts", members: "120+" },
  { name: "Global Finance Club", category: "Business", members: "300+" },
  { name: "Crestview Tigers (Rugby)", category: "Athletics", members: "80+" },
]

export default function CampusLifePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-primary" />
              More Than Just An Education
            </div>
            <h1 className="text-6xl sm:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              A Vibrant <br /> <span className="text-primary italic">Community</span>.
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-medium leading-relaxed">
              Experience a campus culture designed to support your personal growth, wellbeing, and lifelong connections.
            </p>
            <div className="flex gap-4">
               <Button size="lg" className="h-16 px-10 rounded-2xl font-black text-lg bg-primary text-white shadow-xl shadow-primary/20" asChild>
                 <Link href="/contact">Book a Campus Tour</Link>
               </Button>
               <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl font-black text-lg border-white/20 text-white hover:bg-white hover:text-slate-950">
                 Student Organizations
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS GRID ──────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-left">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Campus Experience</h2>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-none">
                Facilities Designed <br className="hidden sm:block" /> for Excellence.
              </h3>
            </div>
            <p className="text-slate-500 font-medium max-w-md hidden sm:block">
              From high-performance research labs to relaxed social spaces, every corner of NovaCrest is built with purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {highlights.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] overflow-hidden rounded-[40px] shadow-lg shadow-black/5"
              >
                <img src={h.img} alt={h.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black mb-3">{h.title}</h3>
                  <p className="text-sm font-medium text-white/60 mb-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    {h.desc}
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── CLUBS SECTION ────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-950 p-12 lg:p-20 rounded-[64px] text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-4xl font-black tracking-tight leading-none">Join the <span className="text-primary italic">Vanguard</span>.</h3>
                <p className="text-lg text-white/50 font-medium">Over 200 student-led organizations covering technology, arts, activism, and sports.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {clubs.map(club => (
                  <div key={club.name} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
                    <h5 className="font-bold text-white mb-1">{club.name}</h5>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{club.category}</span>
                      <span className="text-[10px] font-medium text-white/40">{club.members} members</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full h-14 rounded-2xl font-black bg-white text-slate-950 hover:bg-primary hover:text-white transition-all">
                Browse All Organizations
              </Button>
            </div>

            <div className="space-y-10 pl-4 lg:pl-12">
               <div className="space-y-4">
                 <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Campus Life</h2>
                 <h3 className="text-4xl font-black text-slate-950 tracking-tight leading-none">A Global Home.</h3>
                 <p className="text-slate-500 font-medium text-lg leading-relaxed">
                   With students representing over 80 countries, NovaCrest is a melting pot of ideas, cultures, and perspectives. We ensure your housing experience is as educational as your lectures.
                 </p>
               </div>
               
               <div className="space-y-6">
                 {[
                   { icon: Waves, title: "Recreational Zones", label: "20+ Interactive Parks" },
                   { icon: Music, title: "Cultural Festivals", label: "Monthly Major Events" },
                   { icon: MapPin, title: "City Integration", label: "Downtown Access in 15m" }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 items-center group">
                     <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-sm">
                       <item.icon className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-black text-slate-900">{item.title}</h4>
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
