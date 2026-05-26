import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingOrb({ className }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute rounded-full blur-[100px] opacity-20", className)}
      animate={{ 
        y: [0, -40, 0], 
        x: [0, 30, 0], 
        scale: [1, 1.15, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
  );
}
