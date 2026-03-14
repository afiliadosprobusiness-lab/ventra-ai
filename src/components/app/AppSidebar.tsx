import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { appNavigationSections, appSettingsLink } from "@/lib/app-navigation";

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="h-screen w-[240px] border-r border-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-sidebar-border px-5">
        <Link to="/app" className="inline-flex">
          <VentraLogo markClassName="h-7 w-7" wordmarkClassName="text-sm text-sidebar-foreground" />
        </Link>
      </div>

      <SidebarContent className="p-3">
        <nav className="space-y-1">
          <Link
            to="/app"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              location.pathname === "/app"
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            <span>Overview</span>
            {location.pathname === "/app" ? <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> : null}
          </Link>

          {appNavigationSections.map((section) => {
            const active = location.pathname === section.url;
            const SectionIcon = section.icon;

            return (
              <Link
                key={section.url}
                to={section.url}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <SectionIcon className="h-4 w-4" strokeWidth={active ? 2 : 1.5} />
                {section.title}
                {active ? <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> : null}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <Link
          to={appSettingsLink.url}
          className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            location.pathname === appSettingsLink.url
              ? "bg-sidebar-accent text-sidebar-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          }`}
        >
          <appSettingsLink.icon className="h-4 w-4" strokeWidth={location.pathname === appSettingsLink.url ? 2 : 1.5} />
          {appSettingsLink.title}
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Volver al sitio
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
