import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoPlaceholder({ label = "Video Embed", className }) {
  return (
    <div className={cn(
      "relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl group/video",
      className
    )}>
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.12),transparent_28%),linear-gradient(135deg,rgba(39,39,42,.8),rgba(9,9,11,.9))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:40px_40px]" />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <motion.div
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors cursor-pointer group-hover/video:border-white/40"
        >
          <Play className="ml-1 h-7 w-7 text-white fill-white/20 group-hover/video:fill-white" />
        </motion.div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">{label}</p>
          <p className="text-xs text-zinc-600">Video player placeholder</p>
        </div>
      </div>

      {/* Gloss effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
