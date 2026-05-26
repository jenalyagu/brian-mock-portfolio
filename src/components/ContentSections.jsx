import { motion } from "framer-motion";
import { Cpu, Activity, ShieldCheck, Download } from "lucide-react";

export function IntroSection() {
  return (
    <section id="intro" className="py-16 md:py-32 px-4 sm:px-6 md:px-10 border-t border-white/5 bg-[#050505]">
      <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="min-w-0"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-4 w-4 text-white/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">PHILOSOPHY_01</p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tighter metallic-text mb-10 relative z-10 break-words">
            END-TO-END.<br />DAY_ONE_READY.
          </h2>
          <div className="space-y-8 max-w-xl">
            <p className="text-xl leading-relaxed text-zinc-400 font-light">
              Brian Mock is a Senior Video Producer and Editor with over a decade of experience across corporate video, branded content, and AI-assisted creative workflows.
            </p>
            <p className="text-lg leading-relaxed text-zinc-500 italic">
              "I work at the intersection of creative direction and technical execution. One partner from concept to final export."
            </p>
            <div className="pt-2">
              <button className="cinematic-glass border-white/10 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center gap-3">
                <Download className="h-4 w-4" /> Export_Resume.pdf
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="relative group">
          <div className="absolute -inset-4 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative cinematic-glass p-6 sm:p-8 md:p-12 border-white/10">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] mb-12">EXECUTION_MODEL</h3>
            <div className="space-y-10">
              {[
                { title: "ZERO_HANDOFFS", text: "Unified workflow from concept to delivery.", icon: ShieldCheck },
                { title: "SENIOR_INSTINCTS", text: "13+ years of enterprise-level production.", icon: Activity },
                { title: "TECHNICAL_FLUENCY", text: "Mastery of the full post-production stack.", icon: Cpu },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <div className="mt-1">
                    <item.icon className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-mono">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


