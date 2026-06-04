import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const REEL_VIDEO_ID = 'FRvXX4W0wmM';
const ACCENT = '#00C8CE';

const STATS = [
  { value: '10+', label: 'Years Directing' },
  { value: '50+', label: 'Projects Produced' },
  { value: 'Fortune 500', label: 'Client Roster' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function DemoReel() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="reel"
        className="relative pt-20 pb-10 md:pt-32 md:pb-12 bg-black overflow-hidden border-t border-white/5"
      >
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Left — text */}
            <motion.div className="flex flex-col gap-7" variants={itemVariants}>
              <motion.span
                className="text-[10px] font-bold uppercase tracking-[0.5em] font-mono"
                style={{ color: ACCENT }}
                variants={itemVariants}
              >
                REEL_2026
              </motion.span>

              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-none"
                variants={itemVariants}
              >
                Demo<br />Reel.
              </motion.h2>

              <motion.p
                className="text-base text-white/60 leading-relaxed max-w-sm"
                variants={itemVariants}
              >
                Innovative storytelling and creative excellence across commercial,
                narrative, and branded content.
              </motion.p>

              {/* Stats */}
              <motion.div className="flex flex-col" variants={itemVariants}>
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 py-3 border-b border-white/10"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                    <span className="text-lg font-semibold text-white">{value}</span>
                    <span className="text-sm text-white/60 uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="group relative px-8 py-3.5 font-semibold text-sm uppercase tracking-widest text-black overflow-hidden transition-transform duration-200 hover:scale-105"
                  style={{ backgroundColor: ACCENT }}
                >
                  Watch Reel →
                </button>
              </motion.div>
            </motion.div>

            {/* Right — compact video */}
            <motion.div className="relative w-full" variants={itemVariants}>
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${ACCENT}33`,
                  boxShadow: `0 0 0 1px rgba(0,200,206,0.06), 0 0 40px rgba(0,0,0,0.5)`,
                }}
              >
                {/* top shimmer line */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10" />
                {/* mask YouTube title bar */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${REEL_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
                    title="Brian Mock Demo Reel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={30} />
              </button>
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${REEL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Brian Mock Demo Reel — Fullscreen"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
