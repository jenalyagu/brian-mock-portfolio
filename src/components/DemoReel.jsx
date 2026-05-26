import { motion } from 'framer-motion';

// Replace with YouTube video ID (the part after ?v= or youtu.be/)
const REEL_VIDEO_ID = 'REPLACE_ME';

export function DemoReel() {
  return (
    <section id="reel" className="relative py-20 md:py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00C8CE]/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-3 font-mono">
            REEL_2026
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
            Demo Reel
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-video overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 1px rgba(0,200,206,0.06), 0 32px 80px rgba(0,0,0,0.8)',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10" />
          <iframe
            src={`https://www.youtube.com/embed/${REEL_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
            title="Brian Mock Demo Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
