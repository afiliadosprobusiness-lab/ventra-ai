import { Building2, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoAuth } from "@/lib/demo-auth";

const baseWorkspaces = [
  { name: "E-commerce MX", role: "Admin", members: 4, plan: "Starter", status: "Activo" },
  { name: "Demo Ventra", role: "Viewer", members: 2, plan: "Free", status: "Inactivo" },
];

export default function WorkspacesPage() {
  const { user } = useDemoAuth();
  const workspaces = [
    { name: user?.workspace ?? "Workspace principal", role: user?.role ?? "Owner", members: 8, plan: "Growth", status: "Activo" },
    ...baseWorkspaces,
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Workspaces</h2>
          <p className="text-sm text-muted-foreground">Gestiona tus espacios de trabajo</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nuevo workspace</Button>
      </div>

      <div className="space-y-4">
        {workspaces.map((workspace) => (
          <div key={`${workspace.name}-${workspace.role}`} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{workspace.name}</h3>
                  <p className="text-xs text-muted-foreground">{workspace.role} - {workspace.plan} - {workspace.members} miembros</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${workspace.status === "Activo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{workspace.status}</span>
                <Button variant="outline" size="sm">Cambiar</Button>
                <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
