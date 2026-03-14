import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LandingSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

export function LandingSection({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: LandingSectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow ? (
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
