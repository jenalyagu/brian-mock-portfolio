import { motion } from "framer-motion";
import { Download, Mail, Activity, ShieldCheck, Cpu, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Resume() {
  return (
    <div id="about" className="px-4 sm:px-6 md:px-10">
      {/* About Section */}
      <section className="py-16 md:py-32 border-t border-white/5">
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-[1.5fr_1fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="h-4 w-4 text-white/40" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">PROFILE_ROOT</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter metallic-text mb-10 relative z-10">ABOUT_BRIAN</h2>
            <div className="space-y-8 max-w-2xl">
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                A Senior Video Producer and Editor with 13+ years of production experience across tech, corporate, and AI-assisted workflows.
              </p>
              <p className="text-lg leading-relaxed text-zinc-500">
                My background spans the full production spectrum: development, pre-production, on-set execution, post-production, motion graphics, color, and delivery. I've worked with companies like Oracle and Apple, managing digital asset pipelines at enterprise scale.
              </p>
              <div className="pt-6 border-t border-white/5">
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-6">Credential_Access:</p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="cinematic-glass border-white/10 rounded-none px-8 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    <Download className="mr-3 h-4 w-4" /> Export_Resume.pdf
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative cinematic-glass p-6 sm:p-8 md:p-12"
          >
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] mb-8 md:mb-12">SYSTEM_ADVANTAGES</h3>
            <div className="space-y-10">
              {[
                { title: "ENTERPRISE_READY", text: "13+ years of ramp-up-free production discipline.", icon: ShieldCheck },
                { title: "TECHNICAL_MASTERY", text: "Premiere, After Effects, Resolve, and AI Pipelines.", icon: Cpu },
                { title: "FULL_SPECTRUM", text: "Concept to export. Zero creative friction.", icon: Activity },
              ].map((item) => (
                <div key={item.title} className="flex gap-6">
                  <div className="mt-1">
                    <item.icon className="h-5 w-5 text-white/40" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-mono">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-32 border-t border-white/5" id="contact">
        <div className="relative overflow-hidden cinematic-glass p-8 sm:p-12 md:p-16 lg:p-32 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">INITIALIZE_COLLABORATION</p>
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-10 italic">LET'S_WORK</h2>
            
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-16 tracking-wide">
              Available for senior production roles, strategic contracts, and high-impact creative engagements. Optimized for Bay Area or Global Remote.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-md py-6 bg-white text-black text-[14px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-4"
              >
                <Mail className="h-4 w-4" /> Open_Comm_Channel
              </motion.button>
              
              <div className="flex gap-10 mt-12 pt-12 border-t border-white/5 w-full justify-center">
                <div className="text-center">
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Location</p>
                  <p className="text-xs font-bold text-zinc-400 font-mono tracking-tight">SF_BAY_AREA</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Availability</p>
                  <p className="text-xs font-bold text-zinc-400 font-mono tracking-tight">AVAILABLE_NOW</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Response</p>
                  <p className="text-xs font-bold text-zinc-400 font-mono tracking-tight">&lt;24H_CYCLE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

