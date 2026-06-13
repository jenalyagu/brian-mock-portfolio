import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Video, 
  Film, 
  Zap, 
  Sparkles, 
  Camera, 
  Clapperboard 
} from "lucide-react";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    icon: Video,
    title: "CORPORATE_VIDEO",
    description: "End-to-end production for enterprise clients. Branded content, internal comms, product launches.",
    metadata: "REC ● 4K RAW"
  },
  {
    icon: Film,
    title: "POST_PRODUCTION",
    description: "Advanced editing, color grading, VFX compositing. Premiere Pro, DaVinci Resolve, After Effects.",
    metadata: "FPS: 23.976"
  },
  {
    icon: Zap,
    title: "MOTION_GRAPHICS",
    description: "Dynamic title sequences, lower thirds, animated infographics. Cinema 4D, Element 3D workflows.",
    metadata: "TC: 00:00:00:00"
  },
  {
    icon: Sparkles,
    title: "AI_VIDEO_WORKFLOWS",
    description: "Cutting-edge generative video. Pika, Runway, Midjourney integration for rapid iteration.",
    metadata: "ISO: 800"
  },
  {
    icon: Camera,
    title: "DRONE_CINEMATOGRAPHY",
    description: "FAA Part 107 certified. Aerial establishing shots, real estate, construction progress documentation.",
    metadata: "SHUTTER: 1/50"
  },
  {
    icon: Clapperboard,
    title: "ASSET_MANAGEMENT",
    description: "Frame.io, Dropbox, LucidLink pipelines. Organized delivery, version control, archival systems.",
    metadata: "CODEC: ProRes"
  }
];

function CapabilityCard({ capability, index }) {
  const cardRef = useRef(null);
  const Icon = capability.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative"
    >
      <div className="cinematic-glass relative overflow-hidden rounded-none p-8 h-full transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/0 group-hover:border-white/40 transition-all duration-300" />

        {/* Hover spotlight effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Metadata overlay */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.4em] uppercase">
              {capability.metadata}
            </span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>

          {/* Icon */}
          <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            <Icon className="w-12 h-12 text-white/80" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-semibold text-white mb-4 tracking-tight">
            {capability.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed">
            {capability.description}
          </p>

          {/* Bottom border gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  );
}

export function Capabilities() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white py-16 md:py-32 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-white/5" id="capabilities">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.5em] uppercase">
              CAPABILITIES_INDEX
            </span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 relative z-10">
            <span className="metallic-text">FULL-STACK</span>
            <br />
            VIDEO PRODUCTION
          </h2>
          
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            13+ years delivering premium content for enterprise clients. 
            <span className="text-white font-medium"> Day one ready.</span>
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard 
              key={capability.title} 
              capability={capability} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <div className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase">
                LOCATION: BAY_AREA_CA
              </div>
              <div className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase">
                EXPERIENCE: 15+_YEARS
              </div>
            </div>
            <div className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase">
              STATUS: AVAILABLE_FOR_HIRE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
