import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("ventra-shell relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_20%)]" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p> : null}
          <div className="flex items-start gap-4">
            {Icon ? (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Icon className="h-5 w-5 text-sky-200" />
              </div>
            ) : null}
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">{description}</p>
            </div>
          </div>
        </div>
        {actions ? <div className="relative flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
