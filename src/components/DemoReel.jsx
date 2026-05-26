import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Camera, Clock } from 'lucide-react';

const REEL_ITEMS = [
  { title: 'CORPORATE_NARRATIVE',    client: 'Oracle Cloud',           duration: '2:34', format: '4K_RAW',     fps: '23.976' },
  { title: 'PRODUCT_SHOWCASE',       client: 'Apple Arcade',           duration: '1:45', format: '6K_PRORES',  fps: '24.000' },
  { title: 'AERIAL_CINEMATOGRAPHY',  client: 'Bay Area Construction',  duration: '3:12', format: '5.4K_H265',  fps: '29.970' },
  { title: 'TECH_EXPLAINER',         client: 'Lambda Labs',            duration: '2:58', format: '4K_RAW',     fps: '23.976' },
];

function formatTime(time) {
  if (!time || isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function DemoReel() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) { video.pause(); } else { video.play(); }
    setIsPlaying(p => !p);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(m => !m);
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen py-10 md:py-16 overflow-hidden border-t border-white/5"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Film className="w-5 h-5 text-zinc-500" />
            <span className="text-xs tracking-[0.4em] text-zinc-500 uppercase font-mono">DEMO_REEL_2026</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 metallic-text tracking-tighter">
            FEATURED WORK
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A curated selection of cinematic storytelling, technical precision, and creative vision.
          </p>
        </motion.div>

        {/* Main video player */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mb-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative cinematic-glass overflow-hidden group">
            {/* Corner brackets */}
            {[
              'top-0 left-0 border-l-2 border-t-2',
              'top-0 right-0 border-r-2 border-t-2',
              'bottom-0 left-0 border-l-2 border-b-2',
              'bottom-0 right-0 border-r-2 border-b-2',
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-8 h-8 border-white/20 transition-all duration-300 group-hover:border-white/40 group-hover:w-12 group-hover:h-12 z-20`} />
            ))}

            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='48' fill='%23ffffff' opacity='0.3'%3EDEMO REEL%3C/text%3E%3C/svg%3E"
                muted={isMuted}
                loop
                playsInline
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>

              {/* Top-left metadata */}
              <div className="absolute top-6 left-6 space-y-2 font-mono text-xs text-white/40 z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC ● 4K RAW</span>
                </div>
                <div>FPS: 23.976</div>
                <div>TC: {formatTime(currentTime)}</div>
              </div>

              {/* Top-right metadata */}
              <div className="absolute top-6 right-6 font-mono text-xs text-white/40 z-10 text-right space-y-2 pointer-events-none">
                <div>CODEC: H.264</div>
                <div>BITRATE: 50Mbps</div>
                <div>PROFILE: HIGH</div>
              </div>

              {/* Play button overlay */}
              <motion.button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 z-10"
                animate={{ opacity: isPlaying && !isHovering ? 0 : 1 }}
              >
                <div className="w-20 h-20 border-2 border-white/40 flex items-center justify-center hover:border-white/80 hover:bg-white/10 transition-all duration-300">
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </div>
              </motion.button>
            </div>

            {/* Controls bar */}
            <motion.div
              animate={{ opacity: isHovering || !isPlaying ? 1 : 0, y: isHovering || !isPlaying ? 0 : 20 }}
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20"
            >
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-300 shrink-0">
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
                </button>
                <button onClick={toggleMute} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-300 shrink-0">
                  {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-white/60 shrink-0">{formatTime(currentTime)}</span>
                  <div className="flex-1 h-1 bg-white/10 relative group/progress cursor-pointer">
                    <div className="absolute inset-y-0 left-0 bg-white/60 group-hover/progress:bg-white transition-colors" style={{ width: `${progressPct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-white/60 shrink-0">{formatTime(duration)}</span>
                </div>
                <button className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-300 shrink-0">
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Reel items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REEL_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + index * 0.1 }}
              className="cinematic-glass p-6 group cursor-pointer hover:bg-white/[0.04] transition-all duration-300 relative"
            >
              {[
                'top-0 left-0 border-l border-t',
                'top-0 right-0 border-r border-t',
                'bottom-0 left-0 border-l border-b',
                'bottom-0 right-0 border-r border-b',
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4 border-white/0 transition-all duration-300 group-hover:border-white/40 group-hover:w-6 group-hover:h-6`} />
              ))}

              <div className="flex items-start justify-between mb-4">
                <Camera className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                <span className="text-xs font-mono text-white/40">{item.format}</span>
              </div>
              <h3 className="text-sm tracking-[0.2em] text-white/80 mb-2 font-mono uppercase break-words">{item.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{item.client}</p>
              <div className="flex items-center justify-between text-xs font-mono text-white/40">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <span>{item.fps} FPS</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="cinematic-glass px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 group relative">
            <span className="text-sm tracking-[0.3em] text-white/80 uppercase font-mono">View_Full_Portfolio</span>
            {[
              'top-0 left-0 border-l border-t',
              'top-0 right-0 border-r border-t',
              'bottom-0 left-0 border-l border-b',
              'bottom-0 right-0 border-r border-b',
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3 border-white/0 transition-all duration-300 group-hover:border-white/60`} />
            ))}
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
