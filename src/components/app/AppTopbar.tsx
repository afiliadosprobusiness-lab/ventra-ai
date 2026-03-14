import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDemoAuth } from "@/lib/demo-auth";
import { getAppRouteMeta } from "@/lib/app-navigation";

type AppTopbarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
};

export function AppTopbar({ isDarkMode, onToggleDarkMode }: AppTopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useDemoAuth();
  const currentMeta = getAppRouteMeta(location.pathname);

  function handleTarget(target: string) {
    if (target.startsWith("/")) {
      navigate(target);
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <SidebarTrigger className="mt-1 md:hidden" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {currentMeta.eyebrow}
              </span>
              <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                {currentMeta.status}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{currentMeta.title}</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{currentMeta.description}</p>
            </div>

            <div className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {currentMeta.context}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[360px] lg:items-end">
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Button
              type="button"
              onClick={() => handleTarget(currentMeta.primaryActionTarget)}
              className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra"
            >
              <currentMeta.primaryActionIcon className="h-4 w-4" />
              {currentMeta.primaryAction}
            </Button>

            {currentMeta.secondaryAction && currentMeta.secondaryActionTarget && currentMeta.secondaryActionIcon ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl"
                onClick={() => handleTarget(currentMeta.secondaryActionTarget)}
              >
                <currentMeta.secondaryActionIcon className="h-4 w-4" />
                {currentMeta.secondaryAction}
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2 text-right">
              <p className="text-sm font-semibold text-foreground">{user?.name ?? "Cuenta demo"}</p>
              <p className="text-xs text-muted-foreground">{user?.workspace ?? "Workspace principal"}</p>
            </div>

            <ThemeToggle checked={isDarkMode} onCheckedChange={onToggleDarkMode} />

            <Button
              type="button"
              variant="outline"
              className="rounded-2xl px-3"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
