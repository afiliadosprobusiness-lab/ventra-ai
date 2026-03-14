import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getInitialThemeMode, persistThemeMode } from "@/lib/theme";

export default function AppLayout() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialThemeMode);

  useEffect(() => {
    persistThemeMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <SidebarProvider>
        <div className="app-shell-background flex min-h-svh w-full overflow-hidden text-foreground">
          <AppSidebar />
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 mesh-hero opacity-80" />
            <AppTopbar isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
            <main className="relative z-[1] flex-1 overflow-auto">
              <div className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
