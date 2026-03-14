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
        <div className="app-shell-background flex min-h-screen w-full overflow-hidden bg-background text-foreground">
          <AppSidebar />
          <div className="relative flex min-w-0 flex-1 flex-col">
            <AppTopbar isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
            <main className="relative flex-1 overflow-auto p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
