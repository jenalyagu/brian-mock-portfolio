import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export function Resume({ onOpenContact }) {
  return (
    <div className="px-4 sm:px-6 md:px-10">
      <section className="py-16 md:py-32 border-t border-white/5" id="contact">
        <div className="relative overflow-hidden cinematic-glass p-8 sm:p-12 md:p-16 lg:p-32 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">
              INITIALIZE_COLLABORATION
            </p>

            <motion.button
              onClick={onOpenContact}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-10 italic cursor-pointer hover:text-zinc-200 transition-colors"
            >
              LET'S_WORK
            </motion.button>

            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-16 tracking-wide">
              Available for senior production roles, strategic contracts, and high-impact creative
              engagements. Optimized for Bay Area or Global Remote.
            </p>

            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <motion.a
                  href="mailto:expertsmedia@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
                >
                  <Mail className="h-4 w-4" /> Send_Email
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/bmock1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-6 bg-transparent text-white text-[12px] font-bold uppercase tracking-[0.3em] border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </motion.a>
              </div>

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
