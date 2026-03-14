import { LogOut, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";
import { appRouteMeta } from "@/lib/app-navigation";

type AppTopbarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function AppTopbar({ isDarkMode, onToggleDarkMode }: AppTopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useDemoAuth();
  const currentMeta = appRouteMeta[location.pathname] ?? appRouteMeta["/app"];

  return (
    <header className="sticky top-0 z-30 flex min-h-14 flex-shrink-0 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{currentMeta.title}</p>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">{currentMeta.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleDarkMode(!isDarkMode)}
          className="relative flex h-7 w-14 items-center rounded-full border border-border bg-secondary px-1 transition-colors duration-300"
          aria-label="Cambiar modo"
        >
          <motion.div
            className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
            animate={{ x: isDarkMode ? 24 : 0 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
          >
            {isDarkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
          </motion.div>
        </button>

        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
