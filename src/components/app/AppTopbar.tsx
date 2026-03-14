import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDemoAuth } from "@/lib/demo-auth";

type AppTopbarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function AppTopbar({ isDarkMode, onToggleDarkMode }: AppTopbarProps) {
  const navigate = useNavigate();
  const { logout } = useDemoAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#060913]/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-10 w-10 rounded-2xl border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06] hover:text-white md:hidden" />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle
            checked={isDarkMode}
            onCheckedChange={onToggleDarkMode}
            className="border-white/8 bg-white/[0.03] shadow-none"
          />

          <Button
            type="button"
            variant="ghost"
            className="h-10 w-10 rounded-2xl border border-white/8 bg-white/[0.03] px-0 text-white/70 hover:bg-white/[0.06] hover:text-white"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
