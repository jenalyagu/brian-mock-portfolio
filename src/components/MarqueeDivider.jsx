const ITEMS = [
  'BRIAN MOCK',
  '●',
  'FEATURED WORK',
  '●',
  'BAY AREA CA',
  '●',
  '15+ YEARS',
  '●',
  'DEMO_REEL',
  '●',
];

const track = [...ITEMS, ...ITEMS];

export function MarqueeDivider() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black py-4 select-none">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 22s linear infinite' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className={`mx-6 text-[11px] font-mono tracking-[0.4em] uppercase ${
              item === '●' ? 'text-red-500' : 'text-white/30'
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
