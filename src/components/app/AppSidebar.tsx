import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { appNavigationSections, appSettingsLink } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();

  const isActive = (url: string) => (url === "/app" ? location.pathname === "/app" : location.pathname.startsWith(url));

  const baseLinkClass =
    "group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition-all duration-200";

  return (
    <Sidebar collapsible="offcanvas" className="h-svh border-r border-white/8 bg-[#070b14]">
      <div className="flex min-h-0 flex-1 flex-col bg-[#070b14] text-white">
        <div className="flex h-14 items-center border-b border-white/8 px-4">
          <Link to="/app" className="inline-flex items-center">
            <VentraLogo
              theme="light"
              markClassName="h-7 w-7"
              wordmarkClassName="text-sm font-semibold tracking-[-0.03em] text-white"
            />
          </Link>
        </div>

        <SidebarContent className="px-3 py-3">
          <nav className="space-y-1">
            <Link
              to="/app"
              className={cn(
                baseLinkClass,
                isActive("/app")
                  ? "border-white/10 bg-white/[0.07] text-white"
                  : "border-transparent text-white/68 hover:border-white/6 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03]",
                  isActive("/app") ? "text-primary" : "text-white/55",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="truncate font-medium">Overview</span>
              </div>
              {isActive("/app") ? <span className="h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
            </Link>

            {appNavigationSections.map((section) => {
              const active = isActive(section.url);
              const SectionIcon = section.icon;

              return (
                <Link
                  key={section.url}
                  to={section.url}
                  className={cn(
                    baseLinkClass,
                    active
                      ? "border-white/10 bg-white/[0.07] text-white"
                      : "border-transparent text-white/68 hover:border-white/6 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03]",
                      active ? "text-primary" : "text-white/55",
                    )}
                  >
                    <SectionIcon className="h-4 w-4" strokeWidth={active ? 2 : 1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{section.title}</span>
                  </div>
                  {active ? <span className="h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                </Link>
              );
            })}
          </nav>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-white/8 px-3 py-3">
          <Link
            to={appSettingsLink.url}
            className={cn(
              "mb-1 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
              isActive(appSettingsLink.url)
                ? "bg-white/[0.06] text-white"
                : "text-white/68 hover:bg-white/[0.04] hover:text-white",
            )}
          >
            <appSettingsLink.icon className="h-4 w-4" strokeWidth={isActive(appSettingsLink.url) ? 2 : 1.7} />
            {appSettingsLink.title}
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/68 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
            Volver al sitio
          </Link>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
