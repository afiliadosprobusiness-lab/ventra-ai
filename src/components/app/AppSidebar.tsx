import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarNavGroup } from "@/components/app/SidebarNavGroup";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Accordion } from "@/components/ui/accordion";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appNavigationGroups, appUtilityNavigation } from "@/lib/app-navigation";
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
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">Revenue OS</p>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="space-y-4">
            <div className="space-y-1.5">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55">
                Etapas
              </p>

              <Accordion
                type="single"
                collapsible
                value={expandedGroup}
                onValueChange={(value) => setExpandedGroup(value || undefined)}
                className="space-y-1.5"
              >
                {appNavigationGroups.map((group) => (
                  <SidebarNavGroup
                    key={group.id}
                    group={group}
                    isExpanded={expandedGroup === group.id}
                    isGroupActive={group.children.some((item) => isItemActive(item.url, item.exact))}
                    isItemActive={isItemActive}
                  />
                ))}
              </Accordion>
            </div>

            <div className="space-y-1.5 pt-2">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/55">
                Atajos
              </p>

              <div className="space-y-0.5">
                {appUtilityNavigation.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = isItemActive(item.url, item.exact);

                  return (
                    <Link
                      key={item.url}
                      to={item.url}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-all duration-200",
                        isActive
                          ? "bg-white/[0.05] text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(16,185,129,0.14)]"
                          : "text-muted-foreground hover:bg-white/[0.03] hover:text-sidebar-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200",
                          isActive ? "bg-primary/10 text-primary" : "group-hover:text-sidebar-foreground",
                        )}
                      >
                        <ItemIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/80 p-3">
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
