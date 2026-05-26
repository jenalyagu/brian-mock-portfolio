import { motion } from "framer-motion";
import { Music2, Sparkles, ArrowUpRight } from "lucide-react";
import { SiOpenai, SiGithub, SiYoutube, SiInstagram, SiTiktok, SiVimeo } from "react-icons/si";

const TEAL = "#00C8CE";

// ─── Custom icon SVGs ─────────────────────────────────────────────────────────

function PhotoshopIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M8.5 2h7A2.5 2.5 0 0 1 18 4.5v15A2.5 2.5 0 0 1 15.5 22h-7A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2zm0 1.5A1 1 0 0 0 7.5 4.5v15A1 1 0 0 0 8.5 20.5h7A1 1 0 0 0 16.5 19.5v-15A1 1 0 0 0 15.5 3.5h-7z" />
      <path d="M9.5 7.5h2.8c1.5 0 2.7 1 2.7 2.5s-1.2 2.5-2.7 2.5H11V15H9.5V7.5zm1.5 1.3v2.4h1.2c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2H11z" />
    </svg>
  );
}

function PremiereIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5v15A2.5 2.5 0 0 1 15.5 22h-7A2.5 2.5 0 0 1 6 19.5v-15zm1.5 0v15A1 1 0 0 0 8.5 20.5h7A1 1 0 0 0 16.5 19.5v-15A1 1 0 0 0 15.5 3.5h-7A1 1 0 0 0 7.5 4.5z" />
      <path d="M10 8.2l5 3.8-5 3.8V8.2z" />
    </svg>
  );
}

function IllustratorIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M8.5 2h7A2.5 2.5 0 0 1 18 4.5v15A2.5 2.5 0 0 1 15.5 22h-7A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2zm0 1.5A1 1 0 0 0 7.5 4.5v15A1 1 0 0 0 8.5 20.5h7A1 1 0 0 0 16.5 19.5v-15A1 1 0 0 0 15.5 3.5h-7z" />
      <path d="M12 7l1.5 4.5H10.5L12 7zm-2.8 8H8l3-7.5h2l3 7.5h-1.2l-.7-2h-3.2l-.7 2zm1.1-3h2.4L12 9.2 10.3 12z" />
    </svg>
  );
}

function AfterEffectsIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M8.5 2h7A2.5 2.5 0 0 1 18 4.5v15A2.5 2.5 0 0 1 15.5 22h-7A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2zm0 1.5A1 1 0 0 0 7.5 4.5v15A1 1 0 0 0 8.5 20.5h7A1 1 0 0 0 16.5 19.5v-15A1 1 0 0 0 15.5 3.5h-7z" />
      <path d="M9.5 7.5h3c1.4 0 2.5 1 2.5 2.3 0 .9-.5 1.7-1.3 2.1l1.6 3.1h-1.5l-1.4-2.8H11V15H9.5V7.5zm1.5 1.3v2.2h1.4c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1H11z" />
      <path d="M8.2 12.5h3.6v1.2H8.2z" />
    </svg>
  );
}

function CreativeCloudIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M17.5 10.2c-.1-2.8-2.4-5-5.2-4.9-1.8 0-3.5 1-4.4 2.5C6.2 8 4.5 9.8 4.5 12c0 2.5 2 4.5 4.5 4.5h8c2.2 0 4-1.8 4-4 0-1.9-1.3-3.5-3-4.3zm-1 6.3H9c-1.7 0-3-1.3-3-3s1.3-3 3-3c.3 0 .5 0 .8.1.5-1.4 1.8-2.4 3.4-2.4 2 0 3.5 1.5 3.6 3.4 1.1.4 1.8 1.4 1.8 2.6 0 1.3-1.1 2.3-2.1 2.3z" />
    </svg>
  );
}

function AbletonIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <rect x="2"  y="4" width="4.5" height="16" rx="1" />
      <rect x="9.75" y="4" width="4.5" height="10" rx="1" />
      <rect x="17.5" y="4" width="4.5" height="16" rx="1" />
      <rect x="2"  y="21.5" width="20" height="1.5" rx="0.75" />
    </svg>
  );
}

function DaVinciIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M6 4h6c4.4 0 8 3.6 8 8s-3.6 8-8 8H6V4zm2.5 2.5v11h3.5c3 0 5.5-2.5 5.5-5.5S15 6.5 12 6.5H8.5z" />
    </svg>
  );
}

function RunwayIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M5 4h2.5v6.5h4l4-6.5H18l-4.5 7 4.5 9h-2.5l-3.5-7h-4V20H5V4z" />
    </svg>
  );
}

function HiggsIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M4 4h2.8v6.6h10.4V4H20v16h-2.8v-6.6H6.8V20H4V4z" />
    </svg>
  );
}

function ClaudeIcon({ size = 28, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <rect x="2" y="3.2"  width="20" height="2.8" rx="1.4" />
      <rect x="2" y="8.2"  width="15" height="2.8" rx="1.4" />
      <rect x="2" y="13.2" width="20" height="2.8" rx="1.4" />
      <rect x="2" y="18.2" width="11" height="2.8" rx="1.4" />
    </svg>
  );
}

// ─── Tool data ────────────────────────────────────────────────────────────────

const TOOLS = [
  { name: "Premiere Pro",    Icon: PremiereIcon,      color: "#9999FF", bgFrom: "#00005B", bgTo: "#0D0066" },
  { name: "After Effects",   Icon: AfterEffectsIcon,  color: "#9999FF", bgFrom: "#00005B", bgTo: "#0D0066" },
  { name: "DaVinci Resolve", Icon: DaVinciIcon,       color: "#FF8C42", bgFrom: "#1A0C00", bgTo: "#2A1800" },
  { name: "Photoshop",       Icon: PhotoshopIcon,     color: "#31A8FF", bgFrom: "#001E36", bgTo: "#003254" },
  { name: "Illustrator",     Icon: IllustratorIcon,   color: "#FF9A00", bgFrom: "#330000", bgTo: "#4A0000" },
  { name: "Creative Cloud",  Icon: CreativeCloudIcon, color: "#FF0000", bgFrom: "#1D0000", bgTo: "#2A0000" },
  { name: "Logic Pro",       Icon: Music2,            color: "#FFFFFF", bgFrom: "#1B3A1A", bgTo: "#2A5729" },
  { name: "Ableton",         Icon: AbletonIcon,       color: "#FFFFFF", bgFrom: "#000000", bgTo: "#1A1A1A" },
  { name: "Pika",            Icon: Sparkles,          color: TEAL,      bgFrom: "#001A1B", bgTo: "#002728" },
  { name: "Runway",          Icon: RunwayIcon,        color: "#FFFFFF", bgFrom: "#0D0D0D", bgTo: "#1A1A1A" },
  { name: "Higgsfield",      Icon: HiggsIcon,         color: "#FFFFFF", bgFrom: "#0D0D0D", bgTo: "#1A1A1A" },
  { name: "ChatGPT",         Icon: SiOpenai,          color: "#FFFFFF", bgFrom: "#0A2E2B", bgTo: "#0F3D39" },
  { name: "Claude",          Icon: ClaudeIcon,        color: "#D97742", bgFrom: "#1A0C00", bgTo: "#2A1400" },
  { name: "YouTube",         Icon: SiYoutube,         color: "#FF0000", bgFrom: "#1A0000", bgTo: "#2A0000" },
  { name: "Vimeo",           Icon: SiVimeo,           color: "#1AB7EA", bgFrom: "#001520", bgTo: "#001E2E" },
  { name: "Instagram",       Icon: SiInstagram,       color: "#E4405F", bgFrom: "#1A0010", bgTo: "#2A0020" },
  { name: "TikTok",          Icon: SiTiktok,          color: "#69C9D0", bgFrom: "#010101", bgTo: "#1A1A1A" },
  { name: "GitHub",          Icon: SiGithub,          color: "#FFFFFF", bgFrom: "#181717", bgTo: "#242929" },
];

const OCTAGON = "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)";

// ─── Main export ──────────────────────────────────────────────────────────────

export function FocusSection() {
  return (
    <section
      id="capabilities"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: "#070708",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* ── Left ──────────────────────────────────────────────────── */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
              The Full<br />
              <span style={{ color: TEAL }}>Production</span><br />
              Stack
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
              Every phase of production, covered. From pre-production planning and on-set
              direction to color grade and final export — the tools that power senior-level
              creative work, deployed with judgment.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "rgba(0,200,206,0.12)",
                  border: "1.5px solid rgba(0,200,206,0.45)",
                  color: TEAL,
                  boxShadow: "0 0 24px rgba(0,200,206,0.15)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(0,200,206,0.2)";
                  e.currentTarget.style.boxShadow = "0 0 36px rgba(0,200,206,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(0,200,206,0.12)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,200,206,0.15)";
                }}
              >
                View Selected Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Right — octagon icon grid ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4 justify-items-center"
          >
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.035, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                title={tool.name}
                className="relative w-14 h-14 flex items-center justify-center cursor-default"
                style={{
                  clipPath: OCTAGON,
                  background: `linear-gradient(145deg, ${tool.bgFrom}, ${tool.bgTo})`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.6)",
                }}
              >
                {/* gloss sheen */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
                  }}
                />
                <tool.Icon
                  size={22}
                  style={{ color: tool.color, position: "relative", zIndex: 1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
