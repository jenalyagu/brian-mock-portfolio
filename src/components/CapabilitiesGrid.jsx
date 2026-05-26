import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Video, Film, Zap, Layers, Sparkles, ClipboardList } from "lucide-react";

const DOT_SPACING = 30;
const BASE_OPACITY_MIN = 0.15;
const BASE_OPACITY_MAX = 0.25;
const BASE_RADIUS = 1;
const INTERACTION_RADIUS = 120;
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
const OPACITY_BOOST = 0.4;
const RADIUS_BOOST = 2;
const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

const CAPABILITIES = [
  {
    icon: Video,
    title: "Video Production",
    description:
      "High-impact branded content for tech, construction, and real estate sectors. From concept to delivery.",
  },
  {
    icon: Zap,
    title: "AI Video Workflows",
    description:
      "Cutting-edge integration of Pika, Runway, and generative tools for rapid iteration.",
  },
  {
    icon: Layers,
    title: "Editor",
    description:
      "Expert editing, color grading, sound design, and finishing for broadcast-ready deliverables.",
  },
  {
    icon: Film,
    title: "Motion Graphics & VFX",
    description:
      "Advanced compositing, title design, and visual effects that elevate your story.",
  },
  {
    icon: Sparkles,
    title: "Asset Management",
    description:
      "Organized media libraries, archival systems, and streamlined production pipelines.",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description:
      "Lead projects through all phases of production from concept to delivery.",
  },
];

function CapabilityCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="cinematic-glass rounded-none p-8 h-full transition-all duration-500 hover:border-white/40 hover:bg-white/[0.04]">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/0 group-hover:border-white/40 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/0 group-hover:border-white/40 transition-all duration-300" />

        <div className="relative z-10">
          <div className="mb-6 inline-flex p-3 rounded-sm bg-white/5 border border-white/10">
            <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
            {title}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            <span>Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CapabilitiesGrid() {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const dotsRef = useRef([]);
  const gridRef = useRef({});
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const mousePositionRef = useRef({ x: null, y: null });

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots = [];
    const newGrid = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) newGrid[cellKey] = [];

        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);

        const baseOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.003 + 0.001,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, []);

  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    mousePositionRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    if (
      canvas.width !== width ||
      canvas.height !== height ||
      canvasSizeRef.current.width !== width ||
      canvasSizeRef.current.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      createDots();
    }
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const activeDotIndices = new Set();
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const cellKey = `${mouseCellX + i}_${mouseCellY + j}`;
          if (grid[cellKey]) grid[cellKey].forEach((idx) => activeDotIndices.add(idx));
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (
        dot.currentOpacity >= dot.targetOpacity ||
        dot.currentOpacity <= BASE_OPACITY_MIN
      ) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(
          BASE_OPACITY_MIN,
          Math.min(dot.currentOpacity, BASE_OPACITY_MAX)
        );
        dot.targetOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;
        }
      }

      const finalOpacity = Math.min(
        1,
        dot.currentOpacity + interactionFactor * OPACITY_BOOST
      );
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, []);

  useEffect(() => {
    handleResize();

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleResize, handleMouseMove, animateDots]);

  return (
    <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-20 px-6">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, #050505 90%)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.4em]">
              CAPABILITIES_OVERVIEW
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 metallic-text">
            Full-Stack Video Production
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end creative services. From pre-production to final delivery. Day one ready.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 font-mono text-xs text-zinc-600 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC ● 4K RAW
            </span>
            <span>|</span>
            <span>FPS: 23.976</span>
            <span>|</span>
            <span>TC: 00:00:00:00</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, index) => (
            <CapabilityCard
              key={cap.title}
              icon={cap.icon}
              title={cap.title}
              description={cap.description}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 text-xs font-mono text-zinc-600 uppercase tracking-[0.3em]">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
            <span>13+ Years Experience</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
