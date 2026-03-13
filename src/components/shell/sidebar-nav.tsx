import {
  Activity,
  AudioWaveform,
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  LayoutDashboard,
  MessageSquareMore,
  PanelLeftClose,
  PanelLeftOpen,
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
      { to: "/app/analytics", label: "Analytics", icon: Activity },
      { to: "/app/automations", label: "Automations", icon: Workflow },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/app/workspaces", label: "Workspaces", icon: Building2 },
      { to: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function SidebarNav({ collapsed, onToggle, mobile = false }: SidebarNavProps) {
  const { currentWorkspace, user } = useSession();
  const initials =
    user?.name
      ?.split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2) ?? "VE";

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-[#06101e]/95 backdrop-blur-2xl",
        collapsed ? "w-[92px]" : "w-[300px]",
      )}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
        <VentraLogo compact={collapsed} />
        <button
          type="button"
          onClick={onToggle}
          className="hidden rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed ? (
        <div className="border-b border-white/10 px-4 py-4">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">Active workspace</p>
                <p className="mt-2 truncate font-display text-base font-semibold text-white">
                  {currentWorkspace?.name ?? "Select workspace"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {currentWorkspace?.industry ?? "Workspace"} | {currentWorkspace?.region ?? "LATAM"}
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                Unified
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-white/10 bg-[#081425] px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Contacts</p>
                <p className="mt-1 text-sm font-semibold text-white">{currentWorkspace?.activeContacts ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#081425] px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Pipeline</p>
                <p className="mt-1 text-sm font-semibold text-white">{currentWorkspace?.monthlyPipeline ?? "$0"}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Prospector AI, contacts, pipeline, conversations and Voice AI stay tied to one commercial record.
            </p>
          </div>
        </div>
      ) : (
        <div className="border-b border-white/10 px-4 py-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
            OS
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-7">
          {groups.map((group) => (
            <div key={group.label}>
              {!collapsed ? (
                <p className="mb-2 px-3 text-[10px] uppercase tracking-[0.24em] text-slate-500">
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
                        "flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition-all duration-200",
                        isActive
                          ? "border-cyan-300/25 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(139,92,246,0.08))] text-white shadow-[0_10px_30px_-18px_rgba(56,189,248,0.7)]"
                          : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
                        collapsed && "justify-center px-0",
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed ? (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge ? <span className="ml-auto rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">{item.badge}</span> : null}
                      </>
                    ) : null}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className={cn("flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3", collapsed && "justify-center")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-400 text-xs font-semibold text-white">
            {initials}
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user?.name ?? "Ventra Demo"}</p>
              <p className="truncate text-xs text-slate-400">{user?.title ?? "Growth Operator"}</p>
            </div>
          ) : null}
        </div>
      </div>

      {mobile ? <div className="px-4 pb-4 text-xs text-slate-500">Powered by Ventra</div> : null}
    </aside>
  );
}
