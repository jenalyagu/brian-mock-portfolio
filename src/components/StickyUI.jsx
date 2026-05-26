import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';

const SECTIONS = [
  { id: 'hero',          label: 'HOME' },
  { id: 'work',          label: 'WORK' },
  { id: 'capabilities',  label: 'STACK' },
  { id: 'about',         label: 'PROFILE' },
  { id: 'contact-footer', label: 'CONTACT' },
];

export function StickyUI({ onOpenContact }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observersRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);

    observersRef.current = observers;
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollTo = (id) => {
    if (id === 'contact-footer') { onOpenContact?.(); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Vertical timeline — right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3">
        {SECTIONS.map(({ id, label }, i) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-3"
              aria-label={label}
            >
              {/* Label — slides in on hover */}
              <span className="w-10 text-right text-[9px] font-mono tracking-[0.3em] text-white/0 group-hover:text-[#00C8CE] transition-all duration-300 uppercase select-none">
                {label}
              </span>
              {/* Dash */}
              <div
                className={`h-px transition-all duration-300 ${
                  isActive
                    ? 'w-5 bg-[#00C8CE]'
                    : 'w-4 bg-white/20 group-hover:bg-[#00C8CE]/60'
                }`}
                style={isActive ? { boxShadow: '0 0 8px rgba(0,200,206,0.8), 0 0 16px rgba(0,200,206,0.4)' } : {}}
              />
            </button>
          );
        })}

        {/* Connecting line behind dots */}
        <div className="absolute top-2 bottom-2 left-[calc(100%+14px)] w-px bg-white/10 -z-10 hidden" />
      </div>

      {/* Sticky back-to-top — bottom right */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollTo('hero')}
            className="fixed bottom-20 md:bottom-8 right-6 z-50 w-10 h-10 cinematic-glass border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky CTA — bottom left */}
      <div className="fixed bottom-20 md:bottom-8 left-6 z-[60]">
        <motion.a
          href="mailto:expertsmedia@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="cinematic-glass border border-white/10 px-5 py-3 flex items-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors">
            Let&apos;s_Work
          </span>
          <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
        </motion.a>
      </div>
    </>
  );
}
