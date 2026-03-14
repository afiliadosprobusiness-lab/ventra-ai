import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronsUpDown } from "lucide-react";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationSections, appSettingsLink } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  const { user } = useDemoAuth();

  const isActive = (url: string) => (url === "/app" ? location.pathname === "/app" : location.pathname.startsWith(url));

  return (
    <Sidebar collapsible="offcanvas" className="h-svh border-r-0 bg-transparent">
      <div className="m-3 flex min-h-0 flex-1 flex-col rounded-[1.9rem] border border-sidebar-border/80 bg-sidebar/95 shadow-card">
        <div className="border-b border-sidebar-border/80 px-4 py-4">
          <Link to="/app" className="inline-flex">
            <VentraLogo markClassName="h-9 w-9" wordmarkClassName="text-lg text-sidebar-foreground" />
          </Link>

          <div className="mt-5 rounded-[1.35rem] border border-sidebar-border/80 bg-background/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Commercial OS</p>
                <p className="mt-1 text-sm font-semibold text-sidebar-foreground">Implementacion guiada</p>
              </div>
              <div className="rounded-full border border-sidebar-border/80 p-2 text-muted-foreground">
                <ChevronsUpDown className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Atrae, atiende y cierra con una sola narrativa comercial.
            </p>
          </div>
        </div>

        <SidebarContent className="px-3 py-4">
          <nav className="space-y-1.5">
            <Link
              to="/app"
              className={cn(
                "group flex w-full items-start gap-3 rounded-[1.2rem] border px-3.5 py-3 transition-all",
                isActive("/app")
                  ? "border-primary/25 bg-primary/10 text-sidebar-foreground shadow-card"
                  : "border-transparent text-muted-foreground hover:border-sidebar-border/80 hover:bg-sidebar-accent/55 hover:text-sidebar-foreground",
              )}
            >
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm">
                <span className="text-xs font-semibold">00</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Overview</span>
                  {isActive("/app") ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Centro ejecutivo para prioridades, conversion y actividad reciente.
                </p>
              </div>
            </Link>

            {appNavigationSections.map((section) => {
              const active = isActive(section.url);
              const SectionIcon = section.icon;

              return (
                <Link
                  key={section.url}
                  to={section.url}
                  className={cn(
                    "group flex w-full items-start gap-3 rounded-[1.2rem] border px-3.5 py-3 transition-all",
                    active
                      ? "border-primary/25 bg-primary/10 text-sidebar-foreground shadow-card"
                      : "border-transparent text-muted-foreground hover:border-sidebar-border/80 hover:bg-sidebar-accent/55 hover:text-sidebar-foreground",
                  )}
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm">
                    <SectionIcon className="h-4 w-4" strokeWidth={active ? 2 : 1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">{section.title}</span>
                      <span className="rounded-full border border-sidebar-border/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {section.step}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{section.summary}</p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-sidebar-border/80 px-3 py-4">
          <div className="mb-3 rounded-[1.25rem] border border-sidebar-border/80 bg-background/70 p-4">
            <p className="text-xs font-semibold text-sidebar-foreground">{user?.workspace ?? "Workspace principal"}</p>
            <p className="mt-1 text-xs text-muted-foreground">{user?.role ?? "Owner"} · Demo operativa</p>
          </div>

          <Link
            to={appSettingsLink.url}
            className={cn(
              "mb-1.5 flex items-center gap-3 rounded-[1.05rem] px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(appSettingsLink.url)
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <appSettingsLink.icon className="h-4 w-4" strokeWidth={isActive(appSettingsLink.url) ? 2 : 1.7} />
            {appSettingsLink.title}
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-[1.05rem] px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
            Volver al sitio
          </Link>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
