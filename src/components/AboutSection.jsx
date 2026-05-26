import { motion } from "framer-motion";
import { Download, Camera, MonitorPlay, Layers, Sparkles, Plane, Database, ArrowUpRight } from "lucide-react";

const TEAL = "#00C8CE";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "13+", label: "Years Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "Global", label: "Brand Clients" },
  { value: "4K", label: "Cinema Quality" },
];

const skills = [
  {
    Icon: Camera,
    title: "Video Production",
    desc: "Concept to camera. Corporate, branded, documentary, and event — executed with precision on every format.",
  },
  {
    Icon: MonitorPlay,
    title: "Post-Production",
    desc: "Premiere Pro, After Effects, DaVinci Resolve. Color, sound mix, and delivery handled in-house.",
  },
  {
    Icon: Layers,
    title: "Motion Graphics",
    desc: "Lower thirds, title sequences, kinetic text, logo animations, and compositing — all brand-aligned.",
  },
  {
    Icon: Sparkles,
    title: "AI-Assisted Workflows",
    desc: "Pika, Runway, and generative tools integrated where they add value. Judgment and taste run the process.",
  },
  {
    Icon: Plane,
    title: "Drone Cinematography",
    desc: "FAA Part 107 licensed. Cinematic aerials for real estate, construction, and corporate exteriors.",
  },
  {
    Icon: Database,
    title: "Asset Management",
    desc: "Large-scale content libraries managed to enterprise standards. Apple-level workflows, version-controlled.",
  },
];

const clients = ["Oracle", "Apple Arcade", "Lambda", "Sierra Circuits", "Pika"];

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label, index }) {
  return (
    <motion.div
      {...fadeUp(0.1 + index * 0.08)}
      className="flex flex-col items-center gap-1 px-6 py-5 rounded-xl text-center"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span
        className="text-3xl sm:text-4xl font-bold tracking-tight"
        style={{ color: TEAL }}
      >
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
        {label}
      </span>
    </motion.div>
  );
}

function SkillCard({ Icon, title, desc, index }) {
  return (
    <motion.div
      {...fadeUp(0.15 + index * 0.07)}
      className="group relative rounded-xl p-5 overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      whileHover={{ borderColor: "rgba(0,200,206,0.3)", y: -2 }}
    >
      {/* Teal glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{
          background: "radial-gradient(circle at 30% 40%, rgba(0,200,206,0.07) 0%, transparent 70%)",
          boxShadow: "inset 0 0 0 1px rgba(0,200,206,0.12)",
        }}
      />

      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: "rgba(0,200,206,0.1)",
          border: "1px solid rgba(0,200,206,0.2)",
        }}
      >
        <Icon className="w-4 h-4" style={{ color: TEAL }} strokeWidth={1.5} />
      </div>

      <h4 className="text-sm font-semibold text-white mb-2 tracking-wide">{title}</h4>
      <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: "#070708",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-4 font-mono">
            Profile
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            The Producer Behind<br className="hidden sm:block" /> the Work
          </h2>
          <div
            className="mx-auto h-px w-24"
            style={{
              background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
            }}
          />
        </motion.div>

        {/* ── Bio + CTA ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-start">
          {/* Left — bio */}
          <div className="space-y-6">
            <motion.h3
              {...fadeUp(0.1)}
              className="text-2xl md:text-3xl font-bold text-white leading-snug"
            >
              Story. Motion. Precision. Post.
            </motion.h3>

            <motion.p {...fadeUp(0.15)} className="text-base text-zinc-400 leading-relaxed">
              Brian Mock is a Senior Video Producer and Editor with over 13 years of experience
              across corporate video, branded content, documentary production, and AI-assisted
              creative workflows. He's worked with enterprise clients including{" "}
              <span className="text-white font-medium">Oracle</span>,{" "}
              <span className="text-white font-medium">Apple Arcade</span>, and{" "}
              <span className="text-white font-medium">Lambda</span> — bringing the same
              senior-level discipline to every project regardless of scale.
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="text-base text-zinc-500 leading-relaxed">
              From pre-production planning and on-set direction to color grading and final
              export, Brian operates as a single creative partner across the entire production
              pipeline. FAA Part 107 licensed drone operator. Technically fluent across
              Premiere Pro, After Effects, and DaVinci Resolve.
            </motion.p>

            <motion.p {...fadeUp(0.22)} className="text-sm text-zinc-600 italic leading-relaxed border-l-2 pl-4" style={{ borderColor: `rgba(0,200,206,0.35)` }}>
              "I work at the intersection of creative direction and technical execution —
              one partner from concept to final export."
            </motion.p>

            {/* Client name strip */}
            <motion.div {...fadeUp(0.25)} className="pt-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-3 font-mono">
                Clients include
              </p>
              <div className="flex flex-wrap gap-2">
                {clients.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-mono px-3 py-1 rounded-full text-zinc-400"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Resume CTA */}
            <motion.div {...fadeUp(0.3)} className="pt-4 flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "rgba(0,200,206,0.12)",
                  border: `1.5px solid rgba(0,200,206,0.45)`,
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
                <Download className="w-4 h-4" strokeWidth={2} />
                Download Resume
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                View the Work
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right — skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.title} {...skill} index={i} />
            ))}
          </div>
        </div>

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.2)}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Subtle top teal line */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, transparent 5%, ${TEAL}55 40%, ${TEAL}55 60%, transparent 95%)`,
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center text-center py-8 px-6 gap-1.5"
                style={{ background: "#070708" }}
              >
                <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: TEAL }}>
                  {s.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
