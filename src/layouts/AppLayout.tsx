import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const THEME_STORAGE_KEY = "ventra:app-theme";

function getInitialDarkMode() {
  if (typeof window === "undefined") return false;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark") return true;
  if (storedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function AppLayout() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <SidebarProvider>
        <div className="app-shell-background flex min-h-svh w-full overflow-hidden text-foreground">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppTopbar isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
            <main className="flex-1 overflow-auto">
              <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
