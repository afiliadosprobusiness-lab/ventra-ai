import { Link, useLocation } from "react-router-dom";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationSections, appSettingsLink } from "@/lib/app-navigation";
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
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">Ventra AI</p>
        <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted-foreground/80">
          Atrae mejores oportunidades, respondelas rapido y empuja el cierre sin ruido visual.
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">Centro de control</p>
              <p className="mt-1 text-sm font-semibold text-sidebar-foreground">Adquisicion - Atencion automatica - Cierre</p>
              <p className="mt-2 text-xs leading-relaxed">
                El tablero principal resume donde actuar para vender mas esta semana.
              </p>
            </Link>

            <div className="space-y-1.5">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55">Capas del producto</p>
              <div className="space-y-2">
                {appNavigationSections.map((section) => {
                  const SectionIcon = section.icon;
                  const isActive = isItemActive(section.url, section.exact);

                  return (
                    <Link
                      key={section.url}
                      to={section.url}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl border px-3 py-3 transition-all duration-200",
                        isActive
                          ? "border-primary/20 bg-primary/10 text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)]"
                          : "border-sidebar-border/70 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.05] hover:text-sidebar-foreground",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-white/[0.04]",
                            isActive && "border-primary/20 bg-primary/12 text-primary",
                          )}
                        >
                          <SectionIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-semibold tracking-[-0.01em] text-sidebar-foreground">{section.title}</p>
                            {section.plan ? (
                              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {section.plan}
                              </span>
                            ) : null}
                          </div>
                          {section.description ? <p className="mt-1 text-xs leading-relaxed">{section.description}</p> : null}
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
