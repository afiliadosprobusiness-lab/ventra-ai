import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { Topbar } from "@/components/shell/topbar";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040b15] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,185,255,0.1),transparent_22%),radial-gradient(circle_at_85%_14%,rgba(139,92,246,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="relative flex min-h-screen">
        <div className="hidden lg:block">
          <SidebarNav collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <div className="border-b border-white/10 px-5 py-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-100">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] border-r border-white/10 bg-[#071121] p-0 text-slate-100">
                <SidebarNav collapsed={false} onToggle={() => undefined} mobile />
              </SheetContent>
            </Sheet>
          </div>

          <Topbar />

          <main className="flex-1 overflow-x-hidden px-4 py-5 sm:px-5 lg:px-8 lg:py-7">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 lg:gap-7">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
