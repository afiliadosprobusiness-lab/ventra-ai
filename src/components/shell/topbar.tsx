import { useMemo, useState } from "react";
import { Bell, Command as CommandIcon, LogOut, Plus, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mock-data";
import { useSession } from "@/lib/session";

const commandItems = [
  { label: "Overview", to: "/app/overview" },
  { label: "Prospector AI", to: "/app/acquisition/prospector-ai" },
  { label: "Widgets", to: "/app/widgets" },
  { label: "Conversations", to: "/app/conversations" },
  { label: "Voice AI", to: "/app/voice-ai" },
  { label: "Creative Studio", to: "/app/creative-studio" },
  { label: "Contacts", to: "/app/contacts" },
  { label: "Pipeline", to: "/app/pipeline" },
  { label: "Partner opportunity", to: "/app/pipeline/deal-4" },
  { label: "Partner campaign", to: "/app/campaigns/camp-3" },
  { label: "Analytics", to: "/app/analytics" },
  { label: "Settings", to: "/app/settings" },
];

const quickActions = [
  { label: "Run Prospector scan", detail: "Review net-new accounts and audits", to: "/app/acquisition/prospector-ai" },
  { label: "Create widget", detail: "Open a new acquisition surface", to: "/app/widgets/new" },
  { label: "Open partner opportunity", detail: "Inspect the prospect-origin deal", to: "/app/pipeline/deal-4" },
  { label: "Generate partner pitch", detail: "Jump into Creative Studio with the active prospect motion", to: "/app/creative-studio/projects/cp-3" },
];

export function Topbar() {
  const navigate = useNavigate();
  const { currentWorkspace, workspaces, selectWorkspace, logout } = useSession();
  const [commandOpen, setCommandOpen] = useState(false);

  const workspaceOptions = useMemo(
    () =>
      workspaces.map((workspace) => ({
        id: workspace.id,
        label: workspace.name,
        caption: `${workspace.industry} | ${workspace.region}`,
      })),
    [workspaces],
  );

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050d1b]/80 backdrop-blur-2xl">
        <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-8">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="hidden min-w-[320px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-400 transition hover:border-cyan-300/20 hover:text-white xl:flex"
          >
            <Search className="h-4 w-4" />
            Search pages, actions, contacts
            <span className="ml-auto rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Ctrl K
            </span>
          </button>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 xl:block">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Commercial spine</p>
              <p className="mt-1 text-sm font-medium text-white">
                {currentWorkspace?.activeContacts ?? 0} contacts under one record
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition hover:border-cyan-300/20"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Workspace</p>
                  <p className="mt-1 text-sm font-medium text-white">{currentWorkspace?.name ?? "Select"}</p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 border-white/10 bg-[#071121] text-slate-100">
                <DropdownMenuLabel className="text-slate-400">Switch workspace</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {workspaceOptions.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => selectWorkspace(workspace.id)}
                    className="flex cursor-pointer flex-col items-start gap-1 py-3 focus:bg-white/[0.05] focus:text-white"
                  >
                    <span>{workspace.label}</span>
                    <span className="text-xs text-slate-500">{workspace.caption}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
                  <Plus className="mr-2 h-4 w-4" />
                  Quick action
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 border-white/10 bg-[#071121] text-slate-100">
                <DropdownMenuLabel className="text-slate-400">Cross-module actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {quickActions.map((action) => (
                  <DropdownMenuItem
                    key={action.to}
                    onClick={() => navigate(action.to)}
                    className="flex cursor-pointer flex-col items-start gap-1 py-3 focus:bg-white/[0.05]"
                  >
                    <span>{action.label}</span>
                    <span className="text-xs text-slate-500">{action.detail}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:text-white"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 border-white/10 bg-[#071121] text-slate-100">
                <DropdownMenuLabel className="text-slate-400">Signal center</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex cursor-pointer flex-col items-start gap-1 whitespace-normal py-3 focus:bg-white/[0.05]"
                  >
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-slate-400">{notification.detail}</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{notification.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:text-white lg:hidden"
            >
              <CommandIcon className="h-4 w-4" />
            </button>

            <Button
              variant="outline"
              onClick={logout}
              className="hidden rounded-2xl border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white lg:inline-flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
        <DialogContent className="overflow-hidden border-white/10 bg-[#071121] p-0 text-slate-100 sm:max-w-2xl">
          <Command className="bg-transparent">
            <CommandInput placeholder="Type a page or quick action" className="border-white/10" />
            <CommandList>
              <CommandEmpty>No result found.</CommandEmpty>
              <CommandGroup heading="Jump to">
                {commandItems.map((item) => (
                  <CommandItem
                    key={item.to}
                    value={item.label}
                    onSelect={() => {
                      navigate(item.to);
                      setCommandOpen(false);
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
