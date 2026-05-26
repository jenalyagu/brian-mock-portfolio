import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function ScanlineDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref} className="relative w-full h-24 bg-black overflow-hidden border-t border-white/5">

      {/* Background label — fades in then out during sweep */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.18, 0.18, 0] } : {}}
        transition={{ duration: 1.4, times: [0, 0.25, 0.75, 1], delay: 0.1 }}
      >
        <span className="text-[9px] font-mono tracking-[0.6em] text-white uppercase">
          TOOL_STACK_INITIALIZING
        </span>
      </motion.div>

      {/* Trailing glow — follows behind the line */}
      <motion.div
        className="absolute left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%)',
        }}
        initial={{ top: -80, opacity: 0 }}
        animate={isInView ? { top: '110%', opacity: [0, 1, 0.6] } : {}}
        transition={{ duration: 0.7, ease: 'linear', delay: 0.15 }}
      />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 15%, #ffffff 50%, rgba(255,255,255,0.4) 85%, transparent 100%)',
          boxShadow: '0 0 12px 3px rgba(255,255,255,0.5), 0 0 40px 8px rgba(255,255,255,0.15)',
        }}
        initial={{ top: 0, opacity: 0 }}
        animate={isInView ? { top: '100%', opacity: [0, 1, 1, 0.4] } : {}}
        transition={{ duration: 0.7, ease: 'linear', delay: 0.15 }}
      />

    </div>
  );
}
