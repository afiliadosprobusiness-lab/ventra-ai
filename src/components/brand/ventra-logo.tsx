import { useId } from "react";

import { cn } from "@/lib/utils";

type VentraLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  theme?: "dark" | "light";
  compact?: boolean;
};

export function VentraMark({ className }: { className?: string }) {
  const gradientId = useId();
  const accentId = useId();
  const glowId = useId();
  const plateId = useId();

  return (
    <svg
      viewBox="0 0 92 92"
      aria-hidden="true"
      className={cn("h-10 w-10 drop-shadow-[0_14px_26px_rgba(14,165,130,0.24)]", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="20" y1="16" x2="65" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#32D6A0" />
          <stop offset="0.52" stopColor="#13B981" />
          <stop offset="1" stopColor="#0E8F71" />
        </linearGradient>
        <linearGradient id={accentId} x1="26" y1="18" x2="72" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EAFDF6" />
          <stop offset="1" stopColor="#B5F5DE" />
        </linearGradient>
        <linearGradient id={plateId} x1="18" y1="18" x2="72" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0C1E1D" />
          <stop offset="1" stopColor="#163230" />
        </linearGradient>
        <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46 46) rotate(90) scale(34 30)">
          <stop stopColor="#4ADEB1" stopOpacity="0.42" />
          <stop offset="1" stopColor="#4ADEB1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="46" cy="46" r="34" fill={`url(#${glowId})`} />
      <rect x="15" y="15" width="62" height="62" rx="21" fill={`url(#${plateId})`} />
      <path d="M23 23L44 69H56L35 23H23Z" fill={`url(#${gradientId})`} />
      <path d="M69 23L48 69H36L57 23H69Z" fill={`url(#${accentId})`} />
      <path d="M40 50L46 36L52 50H40Z" fill="#8CF7D0" fillOpacity="0.96" />
    </svg>
  );
}

export function VentraLogo({
  className,
  markClassName,
  wordmarkClassName,
  theme = "dark",
  compact = false,
}: VentraLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <VentraMark className={markClassName} />
      {compact ? null : (
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-[-0.04em]",
            theme === "light" ? "text-white" : "text-foreground",
            wordmarkClassName,
          )}
        >
          Ventra
        </span>
      )}
    </div>
  );
}
