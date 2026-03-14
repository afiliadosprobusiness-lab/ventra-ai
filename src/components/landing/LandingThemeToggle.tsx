import { ThemeToggle } from "@/components/ui/theme-toggle";

type LandingThemeToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function LandingThemeToggle({ checked, onCheckedChange }: LandingThemeToggleProps) {
  return <ThemeToggle checked={checked} onCheckedChange={onCheckedChange} className="h-9 w-[68px]" />;
}
