import { motion } from 'framer-motion';

const LOGOS = [
  { name: 'Apple',       src: '/logos/Apple_Logo_bw.png' },
  { name: 'Oracle',      src: '/logos/Oracle_logo_bw.png' },
  { name: 'Nat Geo',     src: '/logos/NatGEo_bw.png', imgClass: 'max-h-12' },
  { name: 'Cookies',     src: '/logos/Cookies_logo.webp' },
  { name: 'Hogarth',     src: '/logos/Hogarth_bw.png' },
  { name: 'du',          src: '/logos/Du_bw.png', imgClass: 'max-h-12' },
  { name: 'Experts',     src: '/logos/EXPERTS_bw.png' },
  { name: 'Independence',src: '/logos/IndependenceBC_bw.png' },
  { name: 'Wall to Wall',src: '/logos/WalltoWall_bw.png', imgClass: 'max-h-14' },
];

export function ClientLogos() {
  return (
    <section
      className="pt-10 pb-2 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(to bottom, #000000, #070708)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center justify-center h-16 rounded-xl overflow-hidden cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              {/* Teal glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0,200,206,0.35), 0 0 18px rgba(0,200,206,0.12)',
                }}
              />

              {/* Top gloss sheen */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 55%)',
                }}
              />

              <img
                src={logo.src}
                alt={logo.name}
                className={`relative z-10 ${logo.imgClass ?? 'max-h-8'} max-w-full w-auto object-contain transition-all duration-300 group-hover:brightness-125`}
                style={{
                  filter: 'grayscale(1) invert(1) brightness(0.8)',
                  mixBlendMode: 'screen',
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
