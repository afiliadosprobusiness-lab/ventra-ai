import { Search, Bell, Plus, LogOut, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDemoAuth } from "@/lib/demo-auth";

const pageTitles: Record<string, string> = {
  "/app": "Overview",
  "/app/acquisition": "Acquisition",
  "/app/prospector": "Prospector AI",
  "/app/widgets": "Widgets",
  "/app/voice-ai": "Voice AI",
  "/app/creative-studio": "Creative Studio",
  "/app/conversations": "Conversaciones",
  "/app/pipeline": "Pipeline",
  "/app/contacts": "Contacts",
  "/app/campaigns": "Campanas",
  "/app/analytics": "Analytics",
  "/app/automations": "Automations",
  "/app/community": "Community",
  "/app/workspaces": "Workspaces",
  "/app/settings": "Settings",
};

export function AppTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useDemoAuth();
  const title = pageTitles[location.pathname] || "Ventra";
  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar leads, conversaciones..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1.5">
          <span>{user?.workspace ?? "Workspace principal"}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="h-4 w-4 mr-1.5" />
          Nuevo Lead
        </Button>
        <button type="button" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
          {initials}
        </div>
      </div>
    </header>
  );
}
