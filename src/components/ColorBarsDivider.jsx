import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const BARS = [
  { label: 'WHT', color: '#C0C0C0' },
  { label: 'YEL', color: '#C0C000' },
  { label: 'CYN', color: '#00C0C0' },
  { label: 'GRN', color: '#00C000' },
  { label: 'MAG', color: '#C000C0' },
  { label: 'RED', color: '#C00000' },
  { label: 'BLU', color: '#0000C0' },
];

export function ColorBarsDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [cut, setCut] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setCut(true), 1800);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full h-48 overflow-hidden border-t border-white/5 bg-black">

      {/* Bars */}
      <motion.div
        className="absolute inset-0 flex"
        animate={{ opacity: cut ? 0 : 1 }}
        transition={{ duration: cut ? 0.04 : 0.15 }}
      >
        {BARS.map(({ label, color }, i) => (
          <motion.div
            key={label}
            className="flex-1 flex flex-col justify-end pb-3 items-center"
            style={{ backgroundColor: color, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 0.18, delay: i * 0.05, ease: 'easeOut' }}
          >
            <span className="text-[7px] font-mono font-bold tracking-widest text-black/30 uppercase select-none">
              {label}
            </span>
          </motion.div>
        ))}

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* Top metadata strip */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 flex items-center justify-between px-5">
          <span className="text-[8px] font-mono text-white/50 tracking-[0.4em]">SMPTE_BARS ● 75%</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[8px] font-mono text-white/50 tracking-[0.3em]">TEST_SIGNAL</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
