import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Megaphone, Search, LayoutGrid, Phone, Palette,
  MessageSquare, GitBranch, Users, Send, BarChart3, Zap, Globe, Settings, ChevronDown,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
} from "@/components/ui/sidebar";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Megaphone, Search, LayoutGrid, Phone, Palette,
  MessageSquare, GitBranch, Users, Send, BarChart3, Zap, Globe,
};

const principal = [
  { title: "Overview", url: "/app", icon: "LayoutDashboard" },
  { title: "Acquisition", url: "/app/acquisition", icon: "Megaphone" },
  { title: "Prospector AI", url: "/app/prospector", icon: "Search" },
  { title: "Widgets", url: "/app/widgets", icon: "LayoutGrid" },
  { title: "Voice AI", url: "/app/voice-ai", icon: "Phone" },
  { title: "Creative Studio", url: "/app/creative-studio", icon: "Palette" },
  { title: "Conversations", url: "/app/conversations", icon: "MessageSquare" },
  { title: "Pipeline", url: "/app/pipeline", icon: "GitBranch" },
  { title: "Contacts", url: "/app/contacts", icon: "Users" },
  { title: "Campaigns", url: "/app/campaigns", icon: "Send" },
];

const intelligence = [
  { title: "Analytics", url: "/app/analytics", icon: "BarChart3" },
  { title: "Automations", url: "/app/automations", icon: "Zap" },
  { title: "Community", url: "/app/community", icon: "Globe" },
];

export function AppSidebar() {
  const { user } = useDemoAuth();
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(url);
  };

  const initials = user?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "VD";

  const renderItems = (items: typeof principal) =>
    items.map((item) => {
      const Icon = iconMap[item.icon];
      const active = isActive(item.url);

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              to={item.url}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
              <span>{item.title}</span>
              {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> : null}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar className="border-r bg-sidebar">
      <div className="border-b p-4">
        <Link to="/app" className="inline-flex">
          <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-xl" />
        </Link>
      </div>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(principal)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
            Inteligencia
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(intelligence)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Link to="/app/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="h-4 w-4" />
          <span>Configuracion</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 mt-1">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">{initials}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name ?? "Cuenta Demo"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email ?? "demo@ventra.io"}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
