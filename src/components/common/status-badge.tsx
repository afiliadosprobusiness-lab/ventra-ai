import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  value: string;
  tone?: "success" | "warning" | "info" | "neutral" | "danger";
  className?: string;
};

const toneMap = {
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  info: "border-sky-400/20 bg-sky-400/10 text-sky-100",
  neutral: "border-white/10 bg-white/[0.04] text-slate-200",
  danger: "border-rose-400/20 bg-rose-400/10 text-rose-100",
};

export function StatusBadge({ value, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
        toneMap[tone],
        className,
      )}
    >
      {value}
    </Badge>
  );
}
