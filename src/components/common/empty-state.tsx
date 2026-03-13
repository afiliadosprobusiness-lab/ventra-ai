import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: string;
};

export function EmptyState({ icon: Icon, title, description, cta }: EmptyStateProps) {
  return (
    <div className="ventra-card flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_12px_40px_-24px_rgba(56,189,248,0.7)]">
        <Icon className="h-6 w-6 text-cyan-200" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">{description}</p>
      {cta ? (
        <Button className="mt-6 rounded-full bg-white text-slate-950 hover:bg-slate-100">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
