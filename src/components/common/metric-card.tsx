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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_30%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Icon className="h-5 w-5 text-sky-200" />
        </div>
      </div>
      <div className="relative mt-5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-slate-200">
        <TrendIcon className="h-3.5 w-3.5" />
        {delta}
      </div>
    </article>
  );
}
