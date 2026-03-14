import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  value: string;
  tone?: "success" | "warning" | "info" | "neutral" | "danger";
  className?: string;
};

const toneMap = {
  success: "border-transparent bg-accent text-accent-foreground",
  warning: "border-transparent bg-amber-50 text-amber-700",
  info: "border-transparent bg-sky-50 text-sky-700",
  neutral: "border-transparent bg-secondary text-secondary-foreground",
  danger: "border-transparent bg-rose-50 text-rose-700",
};

export function StatusBadge({ value, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.12em]",
        toneMap[tone],
        className,
      )}
    >
      {value}
    </Badge>
  );
}
