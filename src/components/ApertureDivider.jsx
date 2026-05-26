import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const N = 8;
const CX = 100, CY = 100;
const OUTER_R = 88;
const INNER_R = 18;
const GAP_DEG = 3;
const INNER_TAPER = 9;

function bladePts(i, rotDeg) {
  const step = 360 / N;
  const r = (d) => (d * Math.PI) / 180;
  const o1 = r(i * step + rotDeg);
  const o2 = r(i * step + step - GAP_DEG + rotDeg);
  const i1 = r(i * step + INNER_TAPER + rotDeg);
  const i2 = r(i * step + step - GAP_DEG - INNER_TAPER + rotDeg);
  const p = (rad, ang) =>
    `${(CX + rad * Math.cos(ang)).toFixed(2)},${(CY + rad * Math.sin(ang)).toFixed(2)}`;
  return [p(OUTER_R, o1), p(OUTER_R, o2), p(INNER_R, i2), p(INNER_R, i1)].join(' ');
}

export function ApertureDivider() {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const blades = Array.from({ length: N }, (_, i) =>
      svgRef.current.querySelector(`[data-blade="${i}"]`)
    );
    const update = (v) =>
      blades.forEach((el, i) => el?.setAttribute('points', bladePts(i, v)));

    const ctrl = animate(0, 12, {
      duration: 0.45,
      ease: 'easeIn',
      onUpdate: update,
      onComplete: () =>
        animate(12, 0, {
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
          onUpdate: update,
        }),
    });

    return () => ctrl.stop();
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-10"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      />

      <svg ref={svgRef} width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
        {/* Outer guide ring */}
        <circle
          cx={CX} cy={CY} r={OUTER_R + 1}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"
        />

        {/* Blades — DOM-mutated directly for perf */}
        {Array.from({ length: N }).map((_, i) => (
          <polygon
            key={i}
            data-blade={i}
            points={bladePts(i, 0)}
            fill="#080808"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.3"
          />
        ))}

        {/* Inner guide ring */}
        <circle
          cx={CX} cy={CY} r={INNER_R}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"
        />
      </svg>

      {/* Flash when aperture snaps back open */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-20"
        style={{
          width: 40,
          height: 40,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 50%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={isInView ? { opacity: [0, 0, 1, 0], scale: [0.4, 0.4, 1, 2.8] } : {}}
        transition={{ duration: 0.5, times: [0, 0.58, 0.7, 1], delay: 0.43 }}
      />

      {/* Label */}
      <motion.p
        className="relative z-10 mt-4 text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        TOOL_STACK
      </motion.p>
    </div>
  );
}
