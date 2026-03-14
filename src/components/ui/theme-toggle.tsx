import { motion } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export function ThemeToggle({ checked, onCheckedChange, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative flex h-10 w-[74px] items-center rounded-full border border-border/70 bg-background/80 px-1.5 shadow-card transition-colors duration-300 backdrop-blur-xl",
        className,
      )}
      aria-label="Cambiar modo claro u oscuro"
    >
      <motion.div
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_22px_-12px_hsl(var(--primary)/0.9)]"
        animate={{ x: checked ? 31 : 0 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0 }}
      >
        {checked ? <Moon className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
      </motion.div>

      <span className="sr-only">{checked ? "Modo oscuro activo" : "Modo claro activo"}</span>
    </button>
  );
}
