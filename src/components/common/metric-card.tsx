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
    <article className={cn("ventra-card relative overflow-hidden p-5", className)}>
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/10 bg-cyan-300/10">
          <Icon className="h-5 w-5 text-sky-200" />
        </div>
        <div className="inline-flex items-center gap-1 text-xs text-slate-300">
          <TrendIcon className="h-3.5 w-3.5" />
          {delta}
        </div>
      </div>
      <p className="mt-5 font-display text-[2rem] font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </article>
  );
}
