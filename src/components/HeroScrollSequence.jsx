import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedTextCycle } from './AnimatedTextCycle';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 97;
const FIRST_FRAME_NUM = 100;

function frameUrl(index) {
  return `/web scroll frames webp/BM_Hero_scroll_v${FIRST_FRAME_NUM + index}.webp`;
}

function drawFrame(ctx, canvas, img) {
  const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
  const x = (canvas.width - img.naturalWidth * scale) / 2;
  const y = (canvas.height - img.naturalHeight * scale) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
}

export function HeroScrollSequence() {
  const sequenceRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function setSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = imagesRef.current[currentFrameRef.current];
      if (img?.complete && img.naturalWidth) drawFrame(ctx, canvas, img);
    }
    setSize();
    window.addEventListener('resize', setSize);

    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameUrl(i);
      if (i === 1) img.onload = () => drawFrame(ctx, canvas, img);
      return img;
    });
    imagesRef.current = images;

    const frameSt = ScrollTrigger.create({
      trigger: sequenceRef.current,
      start: 'top top',
      end: () => '+=' + window.innerHeight * 0.5,
      pin: true,
      anticipatePin: 1,
      scrub: true,
      onUpdate(self) {
        // progress 0% → index 1 (v101), progress 100% → index 96 (v196)
        const idx = 1 + Math.round(self.progress * (FRAME_COUNT - 2));
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          const img = images[idx];
          if (img?.complete && img.naturalWidth) drawFrame(ctx, canvas, img);
        }
        // Fade text out in first 5% of progress
        if (overlayRef.current) {
          overlayRef.current.style.opacity = Math.max(0, 1 - self.progress / 0.25);
        }
      },
    });

    return () => {
      window.removeEventListener('resize', setSize);
      frameSt.kill();
    };
  }, []);

  return (
    <section id="hero">
      <div ref={sequenceRef} className="h-screen w-full overflow-hidden relative bg-black">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

        {/* Hero text — fades out on scroll */}
        <div ref={overlayRef} className="absolute inset-0 flex flex-col z-10 text-white">
          <div className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <div className="cinematic-glass px-4 py-2 rounded-full text-xs uppercase tracking-wider mb-8 inline-block">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Available for Projects
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 metallic-text leading-tight"
              style={{
                textShadow: [
                  '0 0 6px rgba(0,200,206,0.85)',
                  '-18px 0 12px rgba(0,200,206,0.45)',
                  '18px 0 12px rgba(0,200,206,0.45)',
                  '-55px 0 22px rgba(0,154,147,0.22)',
                  '55px 0 22px rgba(0,154,147,0.22)',
                  '-110px 0 35px rgba(0,122,116,0.1)',
                  '110px 0 35px rgba(0,122,116,0.1)',
                  '0 -12px 20px rgba(0,154,147,0.18)',
                ].join(', '),
              }}
            >
              BRIAN MOCK
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12 text-gray-300 flex items-center gap-2 flex-wrap justify-center"
            >
              <span>Senior</span>
              <AnimatedTextCycle
                words={['Cinematographer', 'Director', 'Producer', 'Editor', 'Storyteller']}
                interval={2500}
                className="metallic-text"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex gap-4"
            >
              <button className="cinematic-glass px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all transform hover:scale-105">
                View Reel
              </button>
              <button className="cinematic-glass px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all transform hover:scale-105">
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <div className="cinematic-glass border-t border-white/10 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold metallic-text mb-1">13+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold metallic-text mb-1">200+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold metallic-text mb-1">Global</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Brand Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold metallic-text mb-1">4K</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Cinema Quality</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
