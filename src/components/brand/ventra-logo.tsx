import { cn } from "@/lib/utils";

type VentraLogoProps = {
  compact?: boolean;
  className?: string;
};

export function VentraLogo({ compact = false, className }: VentraLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className={cn("inline-flex items-center gap-3 rounded-xl border border-[#0f766e]/35 bg-[#07111b] px-3 py-2", compact && "px-2.5")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#0f766e]/35 bg-[#0d1b27]">
          <div className="flex items-end gap-1">
            <span className="h-2.5 w-1 rounded-full bg-[#2dd4bf]" />
            <span className="h-4 w-1 rounded-full bg-[#14b8a6]" />
            <span className="h-5.5 w-1 rounded-full bg-[#0f766e]" />
          </div>
        </div>
        {!compact ? <span className="font-display text-lg font-semibold tracking-tight text-white">Ventra</span> : null}
      </div>
    </div>
  );
}
