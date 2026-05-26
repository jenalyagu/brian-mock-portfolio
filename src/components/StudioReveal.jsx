import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export function StudioReveal({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const spotlightRef = useRef(null);
  const flashWhiteRef = useRef(null);
  const flashWarmRef = useRef(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        onComplete?.();
      },
    });

    gsap.set(textRef.current, { opacity: 0, scale: 1.08, filter: "blur(12px)" });
    gsap.set(spotlightRef.current, { opacity: 0 });
    gsap.set(flashWhiteRef.current, { opacity: 0 });
    gsap.set(flashWarmRef.current, { opacity: 0 });

    // Silence before the strike
    tl.to({}, { duration: 0.35 });

    // Flicker 1 — brief white jolt
    tl.to(flashWhiteRef.current, { opacity: 0.65, duration: 0.05, ease: "none" })
      .to(textRef.current, { opacity: 0.45, filter: "blur(6px)", duration: 0.05, ease: "none" }, "<")
      .to(flashWhiteRef.current, { opacity: 0, duration: 0.05, ease: "none" })
      .to(textRef.current, { opacity: 0, duration: 0.05, ease: "none" }, "<");

    tl.to({}, { duration: 0.14 });

    // Flicker 2 — double stutter
    tl.to(flashWhiteRef.current, { opacity: 0.45, duration: 0.07, ease: "none" })
      .to(textRef.current, { opacity: 0.32, duration: 0.07, ease: "none" }, "<")
      .to(flashWhiteRef.current, { opacity: 0, duration: 0.04, ease: "none" })
      .to(textRef.current, { opacity: 0, duration: 0.04, ease: "none" }, "<")
      .to({}, { duration: 0.04 })
      .to(flashWhiteRef.current, { opacity: 0.58, duration: 0.08, ease: "none" })
      .to(textRef.current, { opacity: 0.5, duration: 0.08, ease: "none" }, "<")
      .to(flashWhiteRef.current, { opacity: 0, duration: 0.05, ease: "none" })
      .to(textRef.current, { opacity: 0, duration: 0.05, ease: "none" }, "<");

    tl.to({}, { duration: 0.1 });

    // Flicker 3 — warm tungsten almost catches
    tl.to(flashWarmRef.current, { opacity: 0.72, duration: 0.11, ease: "none" })
      .to(textRef.current, { opacity: 0.68, filter: "blur(3px)", duration: 0.11, ease: "none" }, "<")
      .to(spotlightRef.current, { opacity: 0.45, duration: 0.11, ease: "none" }, "<")
      .to(flashWarmRef.current, { opacity: 0.06, duration: 0.09, ease: "none" })
      .to(textRef.current, { opacity: 0.1, duration: 0.09, ease: "none" }, "<")
      .to(spotlightRef.current, { opacity: 0.06, duration: 0.09, ease: "none" }, "<");

    tl.to({}, { duration: 0.07 });

    // Light catches — full power
    tl.to(spotlightRef.current, { opacity: 1, duration: 0.55, ease: "power2.out" })
      .to(
        textRef.current,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "power2.out" },
        "<0.05"
      )
      .to(flashWarmRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, "<");

    // The cinematic hold
    tl.to({}, { duration: 1.9 });

    // Camera pulls back + fade to reveal hero
    tl.to(textRef.current, { scale: 0.92, duration: 1.0, ease: "power1.inOut" })
      .to(containerRef.current, { opacity: 0, duration: 0.75, ease: "power2.inOut" }, "<0.3");

    return () => tl.kill();
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[90] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* White burst flash */}
      <div
        ref={flashWhiteRef}
        className="absolute inset-0"
        style={{ background: "rgb(255,255,255)", opacity: 0 }}
      />

      {/* Teal flash */}
      <div
        ref={flashWarmRef}
        className="absolute inset-0"
        style={{ background: "rgb(0,154,147)", opacity: 0 }}
      />

      {/* Teal spotlight pool */}
      <div
        ref={spotlightRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(0,154,147,0.14) 0%, rgba(0,109,117,0.07) 45%, transparent 100%)",
        }}
      />

      {/* The name — close up */}
      <div ref={textRef} className="relative z-10 text-center select-none" style={{ opacity: 0 }}>
        <p className="text-[9px] font-mono tracking-[0.55em] text-zinc-500 uppercase mb-6">
          Director &amp; Producer
        </p>
        <h1
          className="font-display font-bold leading-none tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 21vw, 22rem)",
            color: "#00C8CE",
            textShadow: [
              // Tight core
              "0 0 8px rgba(0,200,206,0.95)",
              // Horizontal flare — near
              "-22px 0 14px rgba(0,200,206,0.55)",
              "22px 0 14px rgba(0,200,206,0.55)",
              // Horizontal flare — mid
              "-70px 0 28px rgba(0,154,147,0.3)",
              "70px 0 28px rgba(0,154,147,0.3)",
              // Horizontal flare — far fade
              "-140px 0 50px rgba(0,122,116,0.14)",
              "140px 0 50px rgba(0,122,116,0.14)",
              // Upward bloom
              "0 -16px 24px rgba(0,154,147,0.22)",
            ].join(", "),
          }}
        >
          BRIAN
          <br />
          MOCK
        </h1>
      </div>
    </div>
  );
}
