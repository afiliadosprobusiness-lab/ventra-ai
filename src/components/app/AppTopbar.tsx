import { ArrowRight, LogOut, MoonStar, Search, SunMedium } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useDemoAuth } from "@/lib/demo-auth";
import { appRouteMeta } from "@/lib/app-navigation";

type AppTopbarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function AppTopbar({ isDarkMode, onToggleDarkMode }: AppTopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useDemoAuth();
  const routeMeta = appRouteMeta[location.pathname] ?? appRouteMeta["/app"];
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">Revenue focus</p>
          <h1 className="text-lg font-semibold">{routeMeta.title}</h1>
        </div>
        <p className="hidden max-w-xl text-sm text-muted-foreground xl:block">{routeMeta.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-border/70 bg-muted/80 px-3 py-2 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={routeMeta.searchPlaceholder}
            className="w-64 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 shadow-sm">
          {isDarkMode ? <MoonStar className="h-4 w-4 text-primary" /> : <SunMedium className="h-4 w-4 text-warning" />}
          <div className="hidden xl:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">Modo</p>
            <p className="text-xs font-medium">{isDarkMode ? "Oscuro" : "Claro"}</p>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} aria-label="Cambiar modo oscuro" />
        </div>

        <Button size="sm" className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
          {routeMeta.primaryAction}
          <ArrowRight className="h-4 w-4" />
        </Button>

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
