import { Link, useLocation } from "react-router-dom";
import { SidebarNavGroup } from "@/components/app/SidebarNavGroup";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationGroups, appSettingsLink } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { user } = useDemoAuth();
  const location = useLocation();

  const isItemActive = (url: string, exact = false) => {
    if (exact) return location.pathname === url;
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
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">MVP ventas</p>
        <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted-foreground/80">
          Captar demanda, nutrir conversaciones y convertir cierres sin menus largos.
        </p>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="space-y-4">
            <Link
              to="/app"
              aria-current={location.pathname === "/app" ? "page" : undefined}
              className={cn(
                "block rounded-2xl border px-3 py-3 transition-all duration-200",
                location.pathname === "/app"
                  ? "border-primary/20 bg-primary/10 text-sidebar-foreground"
                  : "border-sidebar-border/80 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.05] hover:text-sidebar-foreground",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">Flujo comercial</p>
              <p className="mt-1 text-sm font-semibold text-sidebar-foreground">Marketing - Adquisicion - Nurturing - CRM - venta</p>
              <p className="mt-2 text-xs leading-relaxed">
                El dashboard raiz resume lo que hoy esta frenando ingresos.
              </p>
            </Link>

            <div className="space-y-1.5">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55">Modulos</p>
              <div className="space-y-3">
                {appNavigationGroups.map((group) => (
                  <SidebarNavGroup
                    key={group.id}
                    group={group}
                    isGroupActive={group.children.some((item) => isItemActive(item.url, item.exact))}
                    isItemActive={isItemActive}
                  />
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 p-3">
        <Link
          to={appSettingsLink.url}
          className={cn(
            "mb-3 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] transition-all duration-200",
            isItemActive(appSettingsLink.url)
              ? "border-primary/20 bg-primary/10 text-sidebar-foreground"
              : "border-sidebar-border/70 bg-background/50 text-muted-foreground hover:text-sidebar-foreground",
          )}
        >
          <appSettingsLink.icon className="h-4 w-4" />
          <span className="font-medium">{appSettingsLink.title}</span>
        </Link>

        <div className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background/70 px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-sidebar-foreground">{user?.name ?? "Cuenta demo"}</p>
            <p className="truncate text-[11px] text-muted-foreground">{user?.workspace ?? "Espacio principal"}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
