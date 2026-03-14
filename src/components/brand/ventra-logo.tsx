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
  const purpleId = useId();
  const glowId = useId();

  return (
    <svg
      viewBox="0 0 92 92"
      aria-hidden="true"
      className={cn("h-10 w-10 drop-shadow-[0_8px_24px_rgba(58,91,255,0.28)]", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="14" y1="20" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#20D7FF" />
          <stop offset="1" stopColor="#0C59FF" />
        </linearGradient>
        <linearGradient id={accentId} x1="45" y1="18" x2="71" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD977" />
          <stop offset="1" stopColor="#FFB35C" />
        </linearGradient>
        <linearGradient id={purpleId} x1="35" y1="34" x2="72" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C86CFF" />
          <stop offset="0.45" stopColor="#7B45FF" />
          <stop offset="1" stopColor="#2B1B9A" />
        </linearGradient>
        <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 48) rotate(90) scale(36 34)">
          <stop stopColor="#20D7FF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#20D7FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="48" rx="32" ry="34" fill={`url(#${glowId})`} />
      <path d="M14 20H54L32 42L14 20Z" fill={`url(#${gradientId})`} />
      <path d="M14 20L32 42L26 58L14 20Z" fill="#1436B8" />
      <path d="M38 20H72L47 32L38 20Z" fill={`url(#${accentId})`} />
      <path d="M54 20L72 20L26 76L32 58L54 20Z" fill={`url(#${purpleId})`} />
      <path d="M32 42L54 20L32 58V42Z" fill="#5D54FF" fillOpacity="0.72" />
      <path d="M26 58H32L26 76V58Z" fill="#28156E" fillOpacity="0.8" />
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
            theme === "light" ? "text-white" : "text-slate-950",
            wordmarkClassName,
          )}
        >
          Ventra
        </span>
      )}
    </div>
  );
}
