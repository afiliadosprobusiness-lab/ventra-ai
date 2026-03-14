import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { Topbar } from "@/components/shell/topbar";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="ventra-private-ui min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <SidebarNav collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <div className="border-b border-border bg-card px-4 py-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className="rounded-xl border border-border bg-background p-2.5 text-foreground shadow-sm">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] border-r border-sidebar-border bg-sidebar-background p-0 text-sidebar-foreground">
                <SidebarNav collapsed={false} onToggle={() => undefined} mobile />
              </SheetContent>
            </Sheet>
          </div>

          <Topbar />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background px-4 py-4 sm:px-6 lg:px-6 lg:py-6">
            <div className="flex w-full flex-col gap-5 lg:gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
