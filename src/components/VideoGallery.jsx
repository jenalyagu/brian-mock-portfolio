import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { workSamples } from "@/data/portfolioData";

// Extract a YouTube video ID from a full watch URL.
// Returns null if the URL contains REPLACE_ME or is unparseable.
function getYouTubeId(url) {
  if (!url || url.includes("REPLACE_ME")) return null;
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? m[1] : null;
}

// When we have a real ID, use YouTube's own maxres thumbnail.
// Otherwise fall back to the placeholder image in portfolioData.
function getThumbnail(sample) {
  const id = getYouTubeId(sample.youtubeUrl);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return sample.thumbnail;
}

export function VideoGallery() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggle = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const close = (e) => {
    e.stopPropagation();
    setExpandedIndex(null);
  };

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#070708" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-4 font-mono">
            Portfolio
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Selected Work
          </h2>
          <div
            className="mx-auto h-px w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, #00C8CE, transparent)",
            }}
          />
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workSamples.map((sample, index) => {
            const isExpanded = expandedIndex === index;
            const videoId = getYouTubeId(sample.youtubeUrl);
            const thumb = getThumbnail(sample);

            return (
              <motion.div
                key={sample.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={isExpanded ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <motion.div
                  layout
                  onClick={() => toggle(index)}
                  whileHover={!isExpanded ? { scale: 1.015 } : {}}
                  transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  style={{
                    border: isExpanded
                      ? "1.5px solid rgba(0,200,206,0.6)"
                      : "1.5px solid rgba(255,255,255,0.06)",
                    boxShadow: isExpanded
                      ? "0 0 32px rgba(0,200,206,0.22), 0 0 64px rgba(0,200,206,0.1)"
                      : "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isExpanded ? (
                      // ── Expanded: YouTube iframe ──────────────────────────
                      <motion.div
                        key="player"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full bg-black"
                        style={{ aspectRatio: "16/9" }}
                      >
                        {videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={sample.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        ) : (
                          // No real ID yet — show a "coming soon" state
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div
                              className="w-16 h-16 rounded-full flex items-center justify-center"
                              style={{
                                background: "rgba(0,200,206,0.12)",
                                border: "1.5px solid rgba(0,200,206,0.35)",
                              }}
                            >
                              <Play
                                className="w-6 h-6 ml-1"
                                style={{ color: "#00C8CE" }}
                              />
                            </div>
                            <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono">
                              Video coming soon
                            </p>
                          </div>
                        )}

                        {/* Close button */}
                        <button
                          onClick={close}
                          className="absolute top-4 right-4 z-20 p-2 rounded-full transition-colors"
                          style={{
                            background: "rgba(0,0,0,0.65)",
                            border: "1px solid rgba(0,200,206,0.3)",
                          }}
                        >
                          <X className="w-4 h-4" style={{ color: "#00C8CE" }} />
                        </button>
                      </motion.div>
                    ) : (
                      // ── Collapsed: thumbnail ──────────────────────────────
                      <motion.div
                        key="thumb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <img
                          src={thumb}
                          alt={sample.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Dark gradient base */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        {/* Teal radial glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 60%, rgba(0,200,206,0.1) 0%, transparent 65%)",
                          }}
                        />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                            style={{
                              background: "rgba(0,200,206,0.15)",
                              border: "1.5px solid rgba(0,200,206,0.5)",
                              boxShadow: "0 0 24px rgba(0,200,206,0.25)",
                            }}
                          >
                            <Play
                              className="w-5 h-5 ml-1"
                              style={{ color: "#00C8CE" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Metadata strip (always visible) */}
                  <motion.div
                    layout
                    className="px-5 py-4"
                    style={{ background: "rgba(8,8,10,0.96)" }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {sample.title}
                      </h3>
                      {sample.featured && (
                        <span
                          className="flex-shrink-0 text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 rounded font-mono"
                          style={{
                            background: "rgba(0,200,206,0.12)",
                            color: "#00C8CE",
                            border: "1px solid rgba(0,200,206,0.25)",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-500 mb-3 font-mono tracking-wide">
                      {sample.role}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {sample.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-0.5 rounded-full font-mono"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#6b7280",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
