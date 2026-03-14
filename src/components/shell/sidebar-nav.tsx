import {
  Activity,
  AudioWaveform,
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  LayoutDashboard,
  MessageSquareMore,
  PanelsTopLeft,
  ScanSearch,
  Settings,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  collapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
};

const groups = [
  {
    label: "Command",
    items: [
      { to: "/app/overview", label: "Overview", icon: LayoutDashboard },
      { to: "/app/acquisition", label: "Acquisition", icon: Target },
      { to: "/app/acquisition/prospector-ai", label: "Prospector AI", icon: ScanSearch, badge: "AI" },
      { to: "/app/widgets", label: "Widgets", icon: PanelsTopLeft },
      { to: "/app/voice-ai", label: "Voice AI", icon: AudioWaveform },
      { to: "/app/creative-studio", label: "Creative Studio", icon: Sparkles },
      { to: "/app/conversations", label: "Conversations", icon: MessageSquareMore },
    ],
  },
  {
    label: "Revenue spine",
    items: [
      { to: "/app/contacts", label: "Contacts", icon: Users },
      { to: "/app/pipeline", label: "Pipeline", icon: BriefcaseBusiness },
      { to: "/app/campaigns", label: "Campaigns", icon: ChartColumnIncreasing },
      { to: "/app/community", label: "Community", icon: MessageSquareMore },
      { to: "/app/analytics", label: "Analytics", icon: Activity },
      { to: "/app/automations", label: "Automations", icon: Workflow },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/app/workspaces", label: "Workspaces", icon: Building2 },
    ],
  },
];

export function SidebarNav({ collapsed, onToggle, mobile = false }: SidebarNavProps) {
  const { user } = useSession();
  const initials =
    user?.name
      ?.split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2) ?? "VE";

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-dvh shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        collapsed ? "w-[84px]" : "w-[248px]",
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-4">
        <VentraLogo compact={collapsed} />
      </div>

      <div className="sidebar-scroll flex-1 overflow-y-auto px-3 py-5 pr-2">
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.label}>
              {!collapsed ? (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/55">
                  {group.label}
                </p>
              ) : null}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-0",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed ? (
                          <>
                            <span className="truncate">{item.label}</span>
                            <span className="ml-auto flex items-center gap-2">
                              {item.badge ? (
                                <span className="rounded-full bg-sidebar-primary/15 px-2 py-1 text-[10px] font-medium text-sidebar-primary">
                                  {item.badge}
                                </span>
                              ) : null}
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full transition-opacity",
                                  isActive ? "bg-sidebar-primary opacity-100" : "opacity-0",
                                )}
                              />
                            </span>
                          </>
                        ) : null}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-sidebar-border px-3 py-3">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            cn(
              "mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              collapsed && "justify-center px-0",
            )
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed ? <span>Settings</span> : null}
        </NavLink>

        <div className={cn("flex items-center gap-3 px-3 py-2", collapsed && "justify-center px-0")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary">
            {initials}
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-sidebar-accent-foreground">{user?.name ?? "Ventra Demo"}</p>
              <p className="truncate text-[10px] text-sidebar-foreground">{user?.email ?? "demo@ventra.app"}</p>
            </div>
          ) : null}
        </div>
      </div>

      {mobile ? <div className="px-4 pb-4 text-xs text-sidebar-foreground/60">Ventra</div> : null}
    </aside>
  );
}
