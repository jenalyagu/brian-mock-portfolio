import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, Film } from "lucide-react";
import { workSamples, filters } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

function WorkCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(() => {
    if (item.youtubeUrl && !item.youtubeUrl.includes("REPLACE_ME")) {
      window.open(item.youtubeUrl, "_blank", "noopener,noreferrer");
    }
  }, [item.youtubeUrl]);

  const isPlaceholder = !item.youtubeUrl || item.youtubeUrl.includes("REPLACE_ME");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-video bg-zinc-950 overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`${item.title} — ${item.cta}`}
    >
      {/* Gradient thumbnail background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
          item.accent,
          hovered ? "opacity-100" : "opacity-70"
        )}
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Bottom gradient scrim — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Corner brackets — appear on hover, inspired by 21st.dev dark grid */}
      <AnimatePresence>
        {hovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/50 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.03 }}
              className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/50 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.06 }}
              className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/50 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.09 }}
              className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Film metadata — top left */}
      <div className="absolute top-5 left-5 opacity-30 pointer-events-none">
        <p className="text-[8px] font-mono tracking-[0.3em] text-white uppercase">
          {item.category} // {String(item.id).padStart(3, "0")}
        </p>
      </div>

      {/* Play button — center, reveals on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-14 h-14 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
        >
          {isPlaceholder ? (
            <Film className="h-5 w-5 text-white" />
          ) : (
            <Play className="ml-0.5 h-5 w-5 text-white fill-white" />
          )}
        </motion.div>
      </div>

      {/* Card footer — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        {/* Tags row — hidden until hover */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 border border-white/10 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title — always visible, moves up on hover */}
        <motion.h3
          animate={hovered ? { y: 0 } : { y: 4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg font-display font-bold text-white tracking-tight leading-tight"
        >
          {item.title}
        </motion.h3>

        {/* Role — always visible */}
        <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
          {item.role}
        </p>

        {/* Description + CTA — reveals on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={hovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-3 text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              {isPlaceholder ? "Coming Soon" : item.cta}
              {!isPlaceholder && <ExternalLink className="h-3 w-3" />}
            </span>
            <div className="h-[1px] flex-1 mx-4 bg-white/10" />
            <span className="text-[9px] font-mono text-zinc-600">
              ID:{String(item.id).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredWork = useMemo(() => {
    if (activeFilter === "All") return workSamples;
    if (activeFilter === "Selected") return workSamples.filter((item) => item.featured);
    return workSamples.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="py-32 px-6 md:px-10" id="work">

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-zinc-700" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              Portfolio
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter metallic-text">
            SELECTED_WORK
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all border",
                activeFilter === filter
                  ? "border-white bg-white text-black"
                  : "border-white/10 text-zinc-500 hover:border-white/30 hover:text-white"
              )}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
        <AnimatePresence mode="popLayout">
          {filteredWork.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {filteredWork.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-24 text-center"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo reel CTA */}
      <div className="mt-24 relative group cursor-pointer" id="reel">
        <div className="absolute -inset-px bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative cinematic-glass p-16 md:p-20 text-center overflow-hidden">

          {/* Decorative film icon */}
          <div className="absolute top-0 left-0 p-5 opacity-10 pointer-events-none">
            <Film className="h-16 w-16" />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/20 pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-5">
              Master_Reel_2024
            </p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter italic">
              THE_COLLECTION
            </h2>
            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-10 tracking-wide max-w-xl mx-auto">
              Thirteen years of editorial instinct and production range condensed
              into a three-minute cinematic journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open("https://www.youtube.com/watch?v=REPLACE_REEL_URL", "_blank", "noopener,noreferrer")}
              className="px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-100 transition-colors inline-flex items-center gap-3"
            >
              <Play className="h-4 w-4 fill-current" />
              Initialize Sequence
              <ExternalLink className="h-3 w-3 opacity-50" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mt-16 flex items-center gap-4 opacity-20">
        <div className="h-[1px] flex-1 bg-white/20" />
        <p className="text-[8px] font-mono tracking-[0.4em] text-zinc-500 uppercase">
          End_of_Sequence
        </p>
        <div className="h-[1px] flex-1 bg-white/20" />
      </div>
    </section>
  );
}
