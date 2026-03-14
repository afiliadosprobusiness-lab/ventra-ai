import { MoonStar, SunMedium } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type LandingThemeToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function LandingThemeToggle({ checked, onCheckedChange }: LandingThemeToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-card backdrop-blur-xl">
      <SunMedium className={`h-4 w-4 ${checked ? "text-muted-foreground" : "text-warning"}`} />
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label="Cambiar modo claro u oscuro" />
      <MoonStar className={`h-4 w-4 ${checked ? "text-primary" : "text-muted-foreground"}`} />
    </div>
  );
}
