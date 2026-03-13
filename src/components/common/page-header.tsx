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
    <div className={cn("border-b border-white/10 pb-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p> : null}
          <div className="flex items-start gap-3">
            {Icon ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04]">
                <Icon className="h-4.5 w-4.5 text-sky-200" />
              </div>
            ) : null}
            <div>
              <h1 className="font-display text-[1.8rem] font-semibold tracking-tight text-white md:text-[2rem]">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          </div>
        </div>
        {actions ? <div className="relative flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
