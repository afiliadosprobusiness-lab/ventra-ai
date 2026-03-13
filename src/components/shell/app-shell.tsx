import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { Topbar } from "@/components/shell/topbar";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,185,255,0.08),transparent_20%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%)]" />
      <div className="relative flex min-h-screen">
        <div className="hidden lg:block">
          <SidebarNav collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <div className="border-b border-white/10 bg-[#08111d]/95 px-4 py-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-100">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] border-r border-white/10 bg-[#08111d] p-0 text-slate-100">
                <SidebarNav collapsed={false} onToggle={() => undefined} mobile />
              </SheetContent>
            </Sheet>
          </div>

          <Topbar />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))] px-4 py-4 sm:px-6 lg:px-6 lg:py-6">
            <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-5 lg:gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
