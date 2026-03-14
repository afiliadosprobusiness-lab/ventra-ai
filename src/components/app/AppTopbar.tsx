import { Bell, ChevronDown, LogOut, MoonStar, Plus, Search, SunMedium } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useDemoAuth } from "@/lib/demo-auth";
import { appRouteTitles } from "@/lib/app-navigation";

type AppTopbarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function AppTopbar({ isDarkMode, onToggleDarkMode }: AppTopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useDemoAuth();
  const title = appRouteTitles[location.pathname] || "Ventra";
  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">Ventra</p>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-border/70 bg-muted/80 px-3 py-2 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Busca leads, conversaciones o tareas..."
            className="w-64 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 shadow-sm">
          {isDarkMode ? <MoonStar className="h-4 w-4 text-primary" /> : <SunMedium className="h-4 w-4 text-warning" />}
          <div className="hidden lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">Modo</p>
            <p className="text-xs font-medium">{isDarkMode ? "Oscuro" : "Claro"}</p>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} aria-label="Cambiar modo oscuro" />
        </div>

        <Button variant="outline" size="sm" className="hidden rounded-xl md:flex items-center gap-1.5">
          <span>{user?.workspace ?? "Espacio principal"}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>

        <Button size="sm" className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
          <Plus className="mr-1.5 h-4 w-4" />
          Nuevo lead
        </Button>

        <button type="button" className="relative rounded-xl p-2.5 transition-colors hover:bg-muted">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </button>

        <button
          type="button"
          className="rounded-xl p-2.5 transition-colors hover:bg-muted"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initials}
        </div>
      </div>
    </header>
  );
}
