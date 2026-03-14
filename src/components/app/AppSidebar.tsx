import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  ChevronRight,
  GitBranch,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Palette,
  Phone,
  Search,
  Send,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationStages } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Megaphone,
  Search,
  LayoutGrid,
  Phone,
  Palette,
  MessageSquare,
  GitBranch,
  Users,
  Send,
  BarChart3,
  Zap,
  Globe,
};

export function AppSidebar() {
  const { user } = useDemoAuth();
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(url);
  };

  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  return (
    <Sidebar className="border-r border-sidebar-border/80 bg-sidebar/95 backdrop-blur-xl">
      <div className="border-b border-sidebar-border/80 px-4 py-4">
        <Link to="/app" className="inline-flex">
          <VentraLogo markClassName="h-11 w-11" wordmarkClassName="text-sidebar-foreground" />
        </Link>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Ordena el trabajo comercial por etapa y entra directo a lo que toca hoy.
        </p>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="space-y-3">
            {appNavigationStages.map((stage) => {
              const StageIcon = iconMap[stage.icon];
              const stageActive = stage.items.some((item) => isActive(item.url));

              return (
                <section
                  key={stage.title}
                  className={cn(
                    "rounded-2xl border border-sidebar-border/70 bg-card/80 p-3 shadow-card transition-all",
                    stageActive && "border-primary/25 bg-primary/10 shadow-card-hover",
                  )}
                >
                  <Link
                    to={stage.url}
                    className="flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-background/60"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background/90 text-muted-foreground",
                        stageActive && "border-primary/20 bg-primary text-primary-foreground",
                      )}
                    >
                      {StageIcon ? <StageIcon className="h-4.5 w-4.5" /> : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-sidebar-foreground">{stage.title}</p>
                        {stageActive ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{stage.description}</p>
                    </div>
                  </Link>

                  <div className="mt-3 space-y-1.5">
                    {stage.items.map((item) => {
                      const ItemIcon = iconMap[item.icon];
                      const active = isActive(item.url);

                      return (
                        <Link
                          key={item.title}
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                            active
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                          )}
                        >
                          {ItemIcon ? <ItemIcon className="h-4 w-4 shrink-0" /> : null}
                          <span className="flex-1 truncate">{item.title}</span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform",
                              active ? "text-primary" : "text-muted-foreground/50",
                            )}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/app/workspaces"
            className="flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Building2 className="h-4 w-4" />
            <span>Espacios</span>
          </Link>
          <Link
            to="/app/settings"
            className="flex items-center gap-2 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            <span>Ajustes</span>
          </Link>
        </div>

        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sidebar-border/70 bg-background/80 px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name ?? "Cuenta demo"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.workspace ?? "Espacio principal"}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
