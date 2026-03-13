import { cn } from "@/lib/utils";

type VentraLogoProps = {
  compact?: boolean;
  className?: string;
};

export function VentraLogo({ compact = false, className }: VentraLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] shadow-[0_0_45px_rgba(59,130,246,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(56,189,248,0.45),transparent_45%),radial-gradient(circle_at_right,rgba(139,92,246,0.42),transparent_52%),radial-gradient(circle_at_top,rgba(251,191,36,0.32),transparent_36%)]" />
        <div className="relative flex items-end gap-1">
          <span className="h-3 w-1.5 rounded-full bg-sky-300" />
          <span className="h-5 w-1.5 rounded-full bg-blue-300" />
          <span className="h-7 w-1.5 rounded-full bg-violet-300" />
        </div>
      </div>
      {!compact ? (
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold tracking-tight text-white">Ventra</span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Revenue OS</span>
        </div>
      ) : null}
    </div>
  );
}
