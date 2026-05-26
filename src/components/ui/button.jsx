import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", glow = false, ...props }, ref) => {
  const Comp = "button"
  
  const variants = {
    default: "bg-white text-zinc-950 hover:bg-zinc-200",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-white/20 bg-white/[0.03] text-white hover:bg-white/10 backdrop-blur-sm",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    ghost: "hover:bg-white/10 text-white",
    link: "text-white underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-full px-8",
    icon: "h-10 w-10",
  }

  return (
    <div className={cn("relative inline-flex group/btn", glow && "z-10")}>
      {glow && (
        <div className="absolute -inset-1.5 animate-pulse rounded-full bg-cyan-500/50 blur-xl opacity-70 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all duration-500" />
      )}
      {glow && (
        <div className="absolute -inset-1 animate-glow rounded-full bg-cyan-400 blur-md opacity-40" />
      )}
      
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variants[variant],
          !glow && variant === "default" && "shadow-lg",
          sizes[size],
          glow && "border-2 border-cyan-400/50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Button.displayName = "Button"

export { Button }
