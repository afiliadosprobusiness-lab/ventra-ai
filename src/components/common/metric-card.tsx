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
    <article className={cn("ventra-card flex h-full min-h-[156px] flex-col p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent text-accent-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div
          className={cn(
            "inline-flex max-w-[60%] items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium",
            trend === "down" ? "text-destructive" : "text-primary",
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          <span className="truncate">{delta}</span>
        </div>
      </div>
      <div className="mt-6 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-3 font-display text-[2.1rem] font-bold tracking-tight text-foreground">{value}</p>
      </div>
      <div className="mt-4 h-px w-full bg-border/80" />
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {trend === "down" ? "Signal needs attention inside the current operating flow." : "Connected to the shared workspace operating system."}
      </p>
    </article>
  );
}
