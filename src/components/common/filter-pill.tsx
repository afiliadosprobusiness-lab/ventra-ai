import { cn } from "@/lib/utils";

type FilterPillProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export function FilterPill({ active = false, children, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
