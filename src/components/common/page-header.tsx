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
    <div className={cn("pb-1", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-2 text-[11px] font-medium text-muted-foreground">{eyebrow}</p> : null}
          <div className="flex items-start gap-3">
            {Icon ? (
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-4 w-4" />
              </div>
            ) : null}
            <div>
              <h1 className="font-display text-[1.8rem] font-semibold tracking-tight text-foreground md:text-[2rem]">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
        {actions ? <div className="relative flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
