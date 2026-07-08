import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroScrollSequence } from "@/components/HeroScrollSequence";
import { CapabilitiesGrid } from "@/components/CapabilitiesGrid";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { StickyUI } from "@/components/StickyUI";
import { MarqueeDivider } from "@/components/MarqueeDivider";
import { ColorBarsDivider } from "@/components/ColorBarsDivider";
import { DemoReel } from "@/components/DemoReel";
import { ClientLogos } from "@/components/ClientLogos";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

// Below-the-fold and modal-only content — deferred into their own chunks.
// The ~2.7s branded Loader below fully masks the fetch/parse time, so
// there's no visible delay when these mount.
const VideoGallery = lazy(() =>
  import("@/components/VideoGallery").then((m) => ({ default: m.VideoGallery }))
);
const AboutSection = lazy(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const Resume = lazy(() =>
  import("@/components/Resume").then((m) => ({ default: m.Resume }))
);
const ContactModal = lazy(() =>
  import("@/components/ContactModal").then((m) => ({ default: m.ContactModal }))
);

function Loader({ onGone }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf;
    const tick = (now) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const hideTimer = setTimeout(() => {
        setShow(false);
        const goneTimer = setTimeout(() => onGone?.(), 850);
        return () => clearTimeout(goneTimer);
      }, 500);
      return () => clearTimeout(hideTimer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-[2px] w-64 bg-zinc-900 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="flex justify-between w-64">
              <p className="text-[8px] font-mono tracking-[0.3em] text-zinc-500 uppercase">System_Init</p>
              <p className="text-[8px] font-mono tracking-[0.3em] text-zinc-500">{Math.round(progress)}%</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#000] text-white overflow-x-hidden pb-14 md:pb-0">
        <Loader onGone={() => {}} />

        <ScrollManager />
        <StickyUI onOpenContact={openContact} />

        <div className="vignette" />

        <div className="relative z-10">
          <Navbar onOpenContact={openContact} />

          <main>
            <HeroScrollSequence onOpenContact={openContact} />
            <CapabilitiesGrid />
            <MarqueeDivider />
            <DemoReel />
            <ClientLogos />
            <Suspense fallback={null}>
              <VideoGallery />
              <AboutSection />
              <Resume onOpenContact={openContact} />
            </Suspense>
          </main>

          <Footer onOpenContact={openContact} />
        </div>

        <Suspense fallback={null}>
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;
