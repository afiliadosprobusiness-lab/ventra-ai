import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type LandingThemeToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function LandingThemeToggle({ checked, onCheckedChange }: LandingThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className="relative flex h-7 w-14 items-center rounded-full border border-border bg-secondary px-1 transition-colors duration-300"
      aria-label="Cambiar modo claro u oscuro"
    >
      <motion.div
        className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0 }}
      >
        {checked ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </motion.div>
    </button>
  );
}
