import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AnimatedTextCycle } from './AnimatedTextCycle';

export function Hero() {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const animateRef = useRef(null);
  const dotsRef = useRef([]);
  const gridRef = useRef({});
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const mousePositionRef = useRef({ x: null, y: null });

  const DOT_SPACING = 30;
  const BASE_OPACITY_MIN = 0.15;
  const BASE_OPACITY_MAX = 0.25;
  const BASE_RADIUS = 1.5;
  const INTERACTION_RADIUS = 180;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.7;
  const RADIUS_BOOST = 3;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

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
        newGrid[cellKey].push(newDots.length);

        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        newDots.push({
          x, y,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

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
    const ctx = canvas?.getContext('2d');
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateRef.current);
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
          if (grid[cellKey]) grid[cellKey].forEach(idx => activeDotIndices.add(idx));
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
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

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      ctx.beginPath();
      ctx.fillStyle = `rgba(200, 200, 200, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateRef.current);
  }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX]);

  useEffect(() => {
    animateRef.current = animateDots;
  }, [animateDots]);

  useEffect(() => {
    handleResize();
    animateRef.current = animateDots;
    const handleMouseLeave = () => { mousePositionRef.current = { x: null, y: null }; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId.current = requestAnimationFrame(animateRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleResize, handleMouseMove, animateDots]);

  return (
    <section id="hero" className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-black/20 to-black/90" />

      {/* Centered content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10 pt-20">
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
              "0 0 6px rgba(0,200,206,0.85)",
              "-18px 0 12px rgba(0,200,206,0.45)",
              "18px 0 12px rgba(0,200,206,0.45)",
              "-55px 0 22px rgba(0,154,147,0.22)",
              "55px 0 22px rgba(0,154,147,0.22)",
              "-110px 0 35px rgba(0,122,116,0.1)",
              "110px 0 35px rgba(0,122,116,0.1)",
              "0 -12px 20px rgba(0,154,147,0.18)",
            ].join(", "),
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

      {/* Stats bar — in flow at the bottom of the section flex column, never overlaps centered content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10"
      >
        <div className="cinematic-glass border-t border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold metallic-text mb-1">15+</div>
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
              <div className="text-3xl font-bold metallic-text mb-1">8+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Project Manager</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
