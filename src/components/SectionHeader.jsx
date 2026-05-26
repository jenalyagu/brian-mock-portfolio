import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, copy, className, align = "center" }) {
  return (
    <div className={cn(
      "max-w-3xl mb-16",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}>
      {eyebrow && (
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
        {title}
      </h2>
      {copy && (
        <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}
