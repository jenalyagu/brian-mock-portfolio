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
    title: "Sports VFX — AI Generated",
    category: "Motion",
    role: "Motion Graphics / VFX Editor",
    description:
      "High-energy sports content with motion graphics and visual effects. Kinetic compositing and dynamic title work built to amplify the footage.",
    tags: ["VFX", "Motion", "Sports"],
    featured: true,
    youtubeUrl: "https://youtu.be/MyyG16Ac2Pg",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 2,
    title: "Sierra Circuits — Automotive PCB",
    category: "Full-Stack Production",
    role: "Producer / Director / Editor",
    description:
      "Technically precise product video for Sierra Circuits showcasing high-performance PCB manufacturing in the automotive sector. B2B precision without losing visual momentum.",
    tags: ["Premiere", "B2B", "Production"],
    featured: true,
    youtubeUrl: "https://youtu.be/JZ6eHPIcTd0",
    thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 3,
    title: "EHBG — SCIP Tech",
    category: "Full-Stack Production",
    role: "Content Production / Asset Management Lead",
    description:
      "Everlasting Homes Building Group builds custom luxury homes to keep your family safe during extreme weather, fire and earthquakes.",
    tags: ["AI-Enhanced", "Production"],
    featured: true,
    youtubeUrl: "https://youtu.be/8j61BmIpywo",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-stone-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 4,
    title: "Oracle x Mack Trucks Partnership",
    category: "Corporate",
    role: "Senior Video Producer / Editor",
    description:
      "Senior Video Producer for one of the world's largest enterprise tech companies. Clean, professional, on-brand, delivered to enterprise standards across multiple formats.",
    tags: ["Corporate", "Tech", "Enterprise"],
    featured: true,
    youtubeUrl: "https://www.youtube.com/watch?v=Vura5l4JASU",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-stone-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 5,
    title: "Wiggle Uses Oracle to Understand Their Athletes",
    category: "Corporate",
    role: "Senior Video Producer / Editor",
    description:
      "Senior Video Producer for one of the world's largest enterprise tech companies. Clean, professional, on-brand, delivered to enterprise standards across multiple formats.",
    tags: ["Corporate", "Tech", "Enterprise"],
    youtubeUrl: "https://www.youtube.com/watch?v=JFnWVcHa7_g",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-neutral-800/40 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 6,
    title: "Oracle University Ribbon Cutting",
    category: "Corporate",
    role: "Senior Video Producer / Editor",
    description:
      "Internal and external video for one of the world's largest enterprise tech companies. Clean, professional, on-brand, delivered to enterprise standards across multiple formats.",
    tags: ["Corporate", "Tech", "Enterprise"],
    youtubeUrl: "https://www.youtube.com/watch?v=jj7aNPOcGrg",
    thumbnail: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 7,
    title: "Apple Arcade — New Release",
    category: "Asset Management",
    role: "Content Production / Asset Management Lead",
    description:
      "Production support and digital asset management for Apple. Large-scale video and digital assets, workflows managed to Apple's standards.",
    tags: ["Apple", "Gaming", "Assets"],
    youtubeUrl: "https://www.youtube.com/watch?v=RI0dWy1CVfw",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 8,
    title: "Apple Keynote — iOS Release",
    category: "Asset Management",
    role: "Content Production / Asset Management Lead",
    description:
      "Production support and digital asset management for Apple. Large-scale video and digital assets, workflows managed to Apple's standards.",
    tags: ["Apple", "iOS", "Assets"],
    youtubeUrl: "https://www.youtube.com/watch?v=-rAeqN-Q7x4",
    thumbnail: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 9,
    title: "Apple Keynote — iOS Release",
    category: "Asset Management",
    role: "Content Production / Asset Management Lead",
    description:
      "Production support and digital asset management for Apple. Large-scale video and digital assets, workflows managed to Apple's standards.",
    tags: ["Apple", "iOS", "Assets"],
    youtubeUrl: "https://www.youtube.com/watch?v=psL_5RIBqnY",
    thumbnail: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-stone-800/50 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 10,
    title: "Building & Construction — Build Group, FTG & more",
    category: "Drone",
    role: "Video & Drone Video, Post-Production / Asset Management Lead",
    description:
      "Video production and digital asset management for Build Group. Large-scale content libraries and production workflows managed to client standards. Project documentary and safety videos.",
    tags: ["Drone", "Video", "Graphics"],
    youtubeUrl: "https://youtu.be/X07pzna-4wA",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=506&fit=crop&q=80",
    accent: "from-zinc-900 via-zinc-800/60 to-zinc-950",
    cta: "Watch Project"
  },
  {
    id: 11,
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
    id: 12,
    title: "Professional Boxer: Pedro Cruz",
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
