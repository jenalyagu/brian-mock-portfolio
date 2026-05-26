import { useRef, useLayoutEffect } from "react";
import { Film, User, Zap, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const barRef = useRef(null);

  useLayoutEffect(() => {
    // Start off-screen above the viewport
    gsap.set(barRef.current, { opacity: 0, y: -20 });

    // Slide in as soon as the user starts scrolling (~80px)
    ScrollTrigger.create({
      trigger: "body",
      start: "80px top",
      onEnter: () => {
        gsap.to(barRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(barRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.35,
          ease: "power2.in",
        });
      },
    });
  }, []);

  return (
    <>
      {/* Desktop — glass bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <div
          ref={barRef}
          className="pointer-events-auto w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-xl"
          style={{
            background: "rgba(2, 6, 10, 0.62)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 200, 206, 0.22)",
            boxShadow:
              "0 0 0 1px rgba(0,200,206,0.06) inset, 0 4px 28px rgba(0,200,206,0.14), 0 1px 0 rgba(0,200,206,0.08) inset",
          }}
        >
          {/* Brand */}
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-tighter text-white leading-none">
              BM_PRODUCTIONS
            </span>
            <span className="text-[7px] uppercase tracking-[0.4em] text-zinc-500 mt-0.5">
              v.2026.1.0
            </span>
          </div>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8 text-[9px] font-bold uppercase tracking-[0.28em] text-zinc-400">
            <a href="#work"         className="transition-colors hover:text-[#00C8CE]">Work</a>
            <a href="#about"        className="transition-colors hover:text-[#00C8CE]">Profile</a>
            <a href="#capabilities" className="transition-colors hover:text-[#00C8CE]">Stack</a>
            <a
              href="#contact-footer"
              className="px-4 py-1.5 rounded-md text-white transition-all hover:text-[#00C8CE]"
              style={{
                border: "1px solid rgba(0,200,206,0.28)",
                boxShadow: "0 0 10px rgba(0,200,206,0.08)",
              }}
            >
              Contact
            </a>
          </nav>

          {/* Status indicator */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00C8CE] animate-pulse" />
              <div className="h-1 w-1 rounded-full bg-zinc-700" />
              <div className="h-1 w-1 rounded-full bg-zinc-700" />
            </div>
            <span className="text-[7px] uppercase tracking-widest text-zinc-600">
              Status: Online
            </span>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-3">
          {[
            { href: "#work",           Icon: Film,  label: "Work" },
            { href: "#about",          Icon: User,  label: "Profile" },
            { href: "#capabilities",   Icon: Zap,   label: "Stack" },
            { href: "#contact-footer", Icon: Mail,  label: "Contact" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white active:text-[#00C8CE] transition-colors px-4 py-1"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-[8px] font-mono uppercase tracking-widest">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
