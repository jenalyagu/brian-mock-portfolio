import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const COUNTS = [5, 4, 3, 2, 1];
const TICK_DURATION = 0.65;
const CX = 100, CY = 100;
const R_OUTER = 96;
const R_SWEEP = 82;
const R_INNER = 62;
const SWEEP_C = +(2 * Math.PI * R_SWEEP).toFixed(3);

function Ticks() {
  return Array.from({ length: 60 }).map((_, i) => {
    const ang = (i * 6 - 90) * (Math.PI / 180);
    const long = i % 5 === 0;
    const r1 = R_OUTER;
    const r2 = long ? R_OUTER - 8 : R_OUTER - 4;
    return (
      <line
        key={i}
        x1={(CX + r1 * Math.cos(ang)).toFixed(2)} y1={(CY + r1 * Math.sin(ang)).toFixed(2)}
        x2={(CX + r2 * Math.cos(ang)).toFixed(2)} y2={(CY + r2 * Math.sin(ang)).toFixed(2)}
        stroke={`rgba(255,255,255,${long ? 0.35 : 0.12})`}
        strokeWidth={long ? 0.8 : 0.4}
      />
    );
  });
}

export function FilmLeaderDivider() {
  const ref = useRef(null);
  const sweepRef = useRef(null);
  const numRef = useRef(null);
  const flashRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    async function run() {
      for (const n of COUNTS) {
        if (cancelled) return;
        if (numRef.current) numRef.current.textContent = n;
        if (sweepRef.current) sweepRef.current.setAttribute('stroke-dashoffset', SWEEP_C);

        await new Promise(resolve =>
          animate(SWEEP_C, 0, {
            duration: TICK_DURATION,
            ease: 'linear',
            onUpdate: (v) => sweepRef.current?.setAttribute('stroke-dashoffset', v.toFixed(2)),
            onComplete: resolve,
          })
        );
      }

      if (!cancelled && flashRef.current) {
        flashRef.current.style.transition = 'opacity 0.08s ease-in';
        flashRef.current.style.opacity = '1';
        setTimeout(() => {
          if (flashRef.current) {
            flashRef.current.style.transition = 'opacity 0.3s ease-out';
            flashRef.current.style.opacity = '0';
          }
        }, 80);
      }
    }

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-12"
    >
      {/* Flash frame */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none z-30"
        style={{ opacity: 0 }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Corner frame marks */}
      {['top-4 left-8', 'top-4 right-8', 'bottom-4 left-8', 'bottom-4 right-8'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-3 h-3 border border-white/10`} />
      ))}

      {/* Metadata */}
      <div className="absolute top-5 left-12 text-[8px] font-mono text-white/20 tracking-[0.3em] pointer-events-none">SYNC ● 5</div>
      <div className="absolute top-5 right-12 text-[8px] font-mono text-white/20 tracking-[0.3em] text-right pointer-events-none">PICTURE_START</div>
      <div className="absolute bottom-5 left-12 text-[8px] font-mono text-white/20 tracking-[0.3em] pointer-events-none">BRIAN_MOCK</div>
      <div className="absolute bottom-5 right-12 text-[8px] font-mono text-white/20 tracking-[0.3em] text-right pointer-events-none">TOOL_STACK</div>

      {/* Leader disc */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.25 }}
      >
        <svg width="220" height="220" viewBox="0 0 200 200">
          {/* Outer ring */}
          <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <Ticks />

          {/* Sweep arc */}
          <circle
            ref={sweepRef}
            cx={CX} cy={CY} r={R_SWEEP}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeDasharray={SWEEP_C}
            strokeDashoffset={SWEEP_C}
            strokeLinecap="butt"
            transform="rotate(-90 100 100)"
          />

          {/* Inner circle */}
          <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

          {/* Crosshairs */}
          <line x1={CX - R_INNER} y1={CY} x2={CX + R_INNER} y2={CY} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1={CX} y1={CY - R_INNER} x2={CX} y2={CY + R_INNER} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

          {/* Center dot */}
          <circle cx={CX} cy={CY} r={1.5} fill="rgba(255,255,255,0.25)" />

          {/* Countdown number */}
          <text
            ref={numRef}
            x={CX} y={CY + 20}
            textAnchor="middle"
            fontSize="54"
            fontFamily="monospace"
            fontWeight="bold"
            fill="rgba(255,255,255,0.8)"
          >
            5
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
