import { useMemo, useState } from "react";
import { Bell, Command as CommandIcon, LogOut, Plus, Search, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
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
  { label: "Community overview", to: "/app/community" },
  { label: "Community builder", to: "/app/community/setup" },
  { label: "Community feed", to: "/app/community/feed" },
  { label: "Community members", to: "/app/community/members" },
  { label: "Community events", to: "/app/community/events" },
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
  { label: "Review community members", detail: "Inspect CRM-linked members and campaign-ready profiles", to: "/app/community/members" },
  { label: "Build community", detail: "Open branding, spaces and member setup", to: "/app/community/setup" },
  { label: "Check community analytics", detail: "See member growth, top spaces and event engagement", to: "/app/analytics" },
  { label: "Create widget", detail: "Open a new acquisition surface", to: "/app/widgets/new" },
  { label: "Open partner opportunity", detail: "Inspect the prospect-origin deal", to: "/app/pipeline/deal-4" },
  { label: "Generate partner pitch", detail: "Jump into Creative Studio with the active prospect motion", to: "/app/creative-studio/projects/cp-3" },
];

const topbarRoutes = [
  { match: /^\/app\/overview/, title: "Overview" },
  { match: /^\/app\/acquisition\/prospector-ai/, title: "Prospector AI" },
  { match: /^\/app\/acquisition/, title: "Acquisition" },
  { match: /^\/app\/widgets/, title: "Widgets" },
  { match: /^\/app\/voice-ai/, title: "Voice AI" },
  { match: /^\/app\/creative-studio/, title: "Creative Studio" },
  { match: /^\/app\/conversations/, title: "Conversations" },
  { match: /^\/app\/community/, title: "Community" },
  { match: /^\/app\/pipeline/, title: "Pipeline" },
  { match: /^\/app\/campaigns/, title: "Campaigns" },
  { match: /^\/app\/contacts/, title: "Contacts" },
  { match: /^\/app\/analytics/, title: "Analytics" },
  { match: /^\/app\/automations/, title: "Automations" },
  { match: /^\/app\/workspaces/, title: "Workspaces" },
  { match: /^\/app\/settings/, title: "Settings" },
];

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentWorkspace, user, workspaces, selectWorkspace, logout } = useSession();
  const [commandOpen, setCommandOpen] = useState(false);
  const userInitials =
    user?.name
      ?.split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2) ?? "VE";

  const workspaceOptions = useMemo(
    () =>
      workspaces.map((workspace) => ({
        id: workspace.id,
        label: workspace.name,
        caption: `${workspace.industry} | ${workspace.region}`,
      })),
    [workspaces],
  );
  const currentTitle = topbarRoutes.find((item) => item.match.test(location.pathname))?.title ?? "Ventra";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-6">
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-semibold text-foreground">{currentTitle}</h1>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden h-8 min-w-[256px] items-center gap-3 rounded-xl border border-input bg-background px-4 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/40 xl:flex"
            >
              <Search className="h-3.5 w-3.5" />
              Buscar páginas, acciones o contactos...
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-xl bg-secondary px-3 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <span>{currentWorkspace?.name ?? "Workspace"}</span>
                  <span className="text-muted-foreground">▾</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-lg">
                <DropdownMenuLabel className="text-slate-500">Cambiar workspace</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                {workspaceOptions.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => selectWorkspace(workspace.id)}
                    className="flex cursor-pointer flex-col items-start gap-1 py-3 focus:bg-slate-50 focus:text-slate-900"
                  >
                    <span>{workspace.label}</span>
                    <span className="text-xs text-slate-500">{workspace.caption}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 rounded-xl px-4 text-xs">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Nueva acción
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-lg">
                <DropdownMenuLabel className="text-slate-500">Accesos rápidos</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                {quickActions.map((action) => (
                  <DropdownMenuItem
                    key={action.to}
                    onClick={() => navigate(action.to)}
                    className="flex cursor-pointer flex-col items-start gap-1 py-3 focus:bg-slate-50"
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
                  className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-lg">
                <DropdownMenuLabel className="text-slate-500">Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex cursor-pointer flex-col items-start gap-1 whitespace-normal py-3 focus:bg-slate-50"
                  >
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-slate-500">{notification.detail}</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{notification.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-lg border border-input bg-background p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              <CommandIcon className="h-4 w-4" />
            </button>

            <Button
              variant="outline"
              onClick={logout}
              className="hidden h-8 rounded-xl border-input bg-background px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground lg:inline-flex"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Salir
            </Button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {userInitials}
            </div>
          </div>
        </div>
      </header>

      <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
        <DialogContent className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-lg sm:max-w-2xl">
          <Command className="bg-transparent">
            <CommandInput placeholder="Escribe una página o acción rápida" className="border-slate-200" />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup heading="Ir a">
                {commandItems.map((item) => (
                  <CommandItem
                    key={item.to}
                    value={item.label}
                    onSelect={() => {
                      navigate(item.to);
                      setCommandOpen(false);
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
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
