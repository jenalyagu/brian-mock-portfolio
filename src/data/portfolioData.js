import { 
  Camera, 
  Plane, 
  MonitorPlay, 
  Layers, 
  Sparkles,
  Database,
} from "lucide-react";

export const workSamples = [
  {
    id: 1,
    title: "Sierra Circuits — Automotive PCB",
    category: "Selected",
    role: "Producer / Director / Editor",
    description:
      "Technically precise product video for Sierra Circuits showcasing high-performance PCB manufacturing in the automotive sector. B2B precision without losing visual momentum.",
    tags: ["Premiere", "B2B", "Production"],
    featured: true,
    youtubeUrl: "https://youtu.be/3WL6DFD2QMg",
    thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 2,
    title: "Lambda x Pika — AI Video Campaign",
    category: "AI",
    role: "Producer / Editor / AI Workflow Lead",
    description:
      "Branded content integrating AI-generated visuals via Pika into a cohesive campaign for Lambda. AI in the toolbox — judgment and taste still run the edit.",
    tags: ["AI Video", "Pika", "Branded"],
    featured: true,
    youtubeUrl: "https://youtu.be/sHQBQk7Nbdc",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-slate-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 3,
    title: "Oracle — Corporate Video Production",
    category: "Corporate",
    role: "Senior Video Producer / Editor",
    description:
      "Internal and external video for one of the world's largest enterprise tech companies. Clean, professional, on-brand, delivered to enterprise standards across multiple formats.",
    tags: ["Corporate", "Tech", "Enterprise"],
    featured: true,
    youtubeUrl: "https://www.youtube.com/watch?v=REPLACE_ME",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-stone-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 4,
    title: "Apple Arcade — Asset Management",
    category: "Asset Management",
    role: "Content Production / Asset Management Lead",
    description:
      "Production support and digital asset management for Apple Arcade. Large-scale content libraries and production workflows managed to Apple's standards.",
    tags: ["Apple", "Gaming", "Assets"],
    youtubeUrl: "https://www.youtube.com/watch?v=REPLACE_ME",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/60 to-zinc-950",
    cta: "View Project Details"
  },
  {
    id: 5,
    title: "Drone Demo Reel",
    category: "Drone",
    role: "Producer / Drone Operator / Editor",
    description:
      "FAA Part 107 aerial operations across real estate, construction, and commercial properties. Cinematic site footage, progress documentation, and property showcases.",
    tags: ["Drone", "Aerial", "FAA Part 107"],
    youtubeUrl: "https://youtu.be/x8HsbOZdDUU",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-700/40 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 6,
    title: "Experts Pro — Pedro Cruz",
    category: "Documentary",
    role: "Producer / DP / Editor",
    description:
      "Character-driven branded documentary. Real location, real story — produced handheld and verité-style to hold attention without heavy production overhead.",
    tags: ["Documentary", "Branded", "Field"],
    youtubeUrl: "https://youtu.be/SWMbwNwh2p0",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 7,
    title: "Post-Production Demo",
    category: "Selected",
    role: "Editor / Colorist / Post-Production Lead",
    description:
      "End-to-end post workflow on display — precision cutting, color grading, sound mix, and final delivery. Premiere Pro, DaVinci Resolve, After Effects.",
    tags: ["Post-Production", "Color", "Edit"],
    featured: true,
    youtubeUrl: "https://youtu.be/ROOcwEqr9Cc",
    thumbnail: "https://images.unsplash.com/photo-1574717024453-354056afd6fc?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 8,
    title: "Sports VFX",
    category: "Motion",
    role: "Motion Graphics / VFX Editor",
    description:
      "High-energy sports content with motion graphics and visual effects. Kinetic compositing and dynamic title work built to amplify the footage.",
    tags: ["VFX", "Motion", "Sports"],
    youtubeUrl: "https://youtu.be/T8V-fdVXRlc",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 9,
    title: "Residential Building Projects — Aerial",
    category: "Drone",
    role: "Producer / Drone Operator / Editor",
    description:
      "Multi-property residential construction coverage. Aerial progress documentation and showcase footage operated under FAA Part 107.",
    tags: ["Drone", "Real Estate", "Construction"],
    youtubeUrl: "https://youtu.be/HUDPoEkWKpA",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-stone-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 10,
    title: "Featured Home Highlight — Social",
    category: "Real Estate",
    role: "Producer / Editor",
    description:
      "Short-form property highlight optimized for social. Fast, clean, visually led — built to stop the scroll and convert interest into showings.",
    tags: ["Real Estate", "Social", "Short-Form"],
    youtubeUrl: "https://youtu.be/9pUtI76oURM",
    thumbnail: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-700/40 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 11,
    title: "Featured Home — Video Production",
    category: "Real Estate",
    role: "Producer / DP / Editor",
    description:
      "Full-length real estate listing video. Interior walk-through, exterior aerials, and lifestyle framing — the complete package for premium property marketing.",
    tags: ["Real Estate", "Production", "Listing"],
    youtubeUrl: "https://youtu.be/dPYImoLtWXw",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 12,
    title: "Commercial Building — Aerial",
    category: "Drone",
    role: "Producer / Drone Operator / Editor",
    description:
      "Aerial production for commercial real estate and corporate campus exteriors. Wide establishing shots, reveal angles, and property context from above.",
    tags: ["Drone", "Commercial", "Aerial"],
    youtubeUrl: "https://youtu.be/UVf9KjF72bI",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/40 to-zinc-950",
    cta: "Watch Project"
  },
];

export const capabilities = [
  {
    icon: Camera,
    title: "Video Production",
    items: [
      "Concept development",
      "On-set execution",
      "Corporate videos",
      "Brand campaigns",
      "Product launches",
      "Event coverage",
      "Documentary-style content",
      "Fast & organized"
    ],
  },
  {
    icon: MonitorPlay,
    title: "Editing & Post-Production",
    items: [
      "Precision cuts",
      "Story structure",
      "Premiere Pro & After Effects",
      "DaVinci Resolve",
      "Color & Sound mix",
      "Export & Delivery"
    ],
  },
  {
    icon: Layers,
    title: "Motion Graphics & VFX",
    items: [
      "Lower thirds",
      "Title sequences",
      "Logo animations",
      "Kinetic text",
      "Compositing",
      "Brand-aligned motion"
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Creative Workflows",
    items: [
      "Pika & Runway integration",
      "Visual development",
      "Concept visualization",
      "B-roll augmentation",
      "Workflow acceleration",
      "Taste-driven AI"
    ],
  },
  {
    icon: Plane,
    title: "Drone Video",
    items: [
      "FAA Part 107 Licensed",
      "Real estate",
      "Construction progress",
      "Corporate exteriors",
      "Cinematic aerials",
      "Safe operation"
    ],
  },
  {
    icon: Database,
    title: "Asset & Content Management",
    items: [
      "Large-scale libraries",
      "Enterprise experience",
      "Apple standards",
      "Organized & searchable",
      "Version-controlled",
      "Scalable workflows"
    ],
  },
];

export const filters = ["All", "Selected", "AI", "Corporate", "Drone", "Real Estate", "Documentary", "Motion"];

export const roleFits = [
  "Range without the overhead",
  "Senior-level from day one",
  "Technically fluent (Premiere, AE, Resolve)",
  "Production discipline",
  "Creative instinct backed by experience",
  "Adaptable across industries",
];
