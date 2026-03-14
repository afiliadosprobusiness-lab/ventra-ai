import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SidebarAccordionGroup } from "@/components/app/SidebarAccordionGroup";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Accordion } from "@/components/ui/accordion";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationGroups, appSecondaryNavigationSections } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { user } = useDemoAuth();
  const location = useLocation();

  const isItemActive = (url: string, exact = false) => {
    if (exact) return location.pathname === url;
    return location.pathname.startsWith(url);
  };

  const activeGroupId = appNavigationGroups.find((group) =>
    group.children.some((item) => isItemActive(item.url, item.exact)),
  )?.id;

  const [expandedGroup, setExpandedGroup] = useState<string | undefined>(activeGroupId);

  useEffect(() => {
    if (activeGroupId) {
      setExpandedGroup(activeGroupId);
    }
  }, [activeGroupId]);

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
          Navega por etapas comerciales con menos ruido y acceso directo a cada modulo activo.
        </p>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                  Navegacion principal
                </p>
                <span className="text-[11px] text-muted-foreground/55">2 grupos</span>
              </div>

              <Accordion
                type="single"
                collapsible
                value={expandedGroup}
                onValueChange={(value) => setExpandedGroup(value || undefined)}
                className="space-y-3"
              >
                {appNavigationGroups.map((group) => (
                  <SidebarAccordionGroup
                    key={group.id}
                    group={group}
                    isExpanded={expandedGroup === group.id}
                    isGroupActive={group.children.some((item) => isItemActive(item.url, item.exact))}
                    isItemActive={isItemActive}
                  />
                ))}
              </Accordion>
            </div>

            <div className="space-y-4">
              {appSecondaryNavigationSections.map((section) => (
                <section key={section.title}>
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                    {section.title}
                  </p>

                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = isItemActive(item.url, item.exact);

                      return (
                        <Link
                          key={item.url}
                          to={item.url}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                            isActive
                              ? "bg-sidebar-accent/80 text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(16,185,129,0.16)]"
                              : "text-muted-foreground hover:bg-white/[0.04] hover:text-sidebar-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent transition-colors duration-200",
                              isActive
                                ? "border-primary/15 bg-primary/10 text-primary"
                                : "text-muted-foreground group-hover:border-white/8 group-hover:bg-black/10 group-hover:text-sidebar-foreground",
                            )}
                          >
                            <ItemIcon className="h-4 w-4" />
                          </span>

                          <span className="flex-1 truncate font-medium">{item.title}</span>

                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 transition-all duration-200",
                              isActive ? "text-primary" : "text-muted-foreground/35 group-hover:translate-x-0.5",
                            )}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 p-3">
        <div className="flex items-center gap-3 rounded-2xl border border-sidebar-border/70 bg-background/75 px-3 py-3">
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
