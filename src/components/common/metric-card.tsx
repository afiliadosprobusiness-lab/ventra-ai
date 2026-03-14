import { ArrowDownRight, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "flat";
  className?: string;
};

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  trend = "up",
  className,
}: MetricCardProps) {
  const TrendIcon = trend === "down" ? ArrowDownRight : trend === "flat" ? ArrowRight : ArrowUpRight;

  return (
    <article className={cn("ventra-card p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium",
            trend === "down" ? "text-destructive" : "text-primary",
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {delta}
        </div>
      </div>
      <p className="mt-5 font-display text-[2rem] font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}
