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
        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
