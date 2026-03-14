import { Building2, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoAuth } from "@/lib/demo-auth";

const baseWorkspaces = [
  { name: "E-commerce MX", role: "Admin", members: 4, plan: "Starter", status: "Activo" },
  { name: "Demo Ventra", role: "Solo lectura", members: 2, plan: "Free", status: "Inactivo" },
];

const roleLabels: Record<string, string> = {
  Owner: "Dueno",
  Admin: "Admin",
  Viewer: "Solo lectura",
};

export default function WorkspacesPage() {
  const { user } = useDemoAuth();
  const workspaces = [
    {
      name: user?.workspace ?? "Espacio principal",
      role: roleLabels[user?.role ?? "Owner"] ?? user?.role ?? "Dueno",
      members: 8,
      plan: "Growth",
      status: "Activo",
    },
    ...baseWorkspaces,
  ];

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Espacios de trabajo</h2>
          <p className="text-sm text-muted-foreground">Cambia de cuenta o revisa quien tiene acceso.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo espacio
        </Button>
      </div>

      <div className="space-y-4">
        {workspaces.map((workspace) => (
          <div key={`${workspace.name}-${workspace.role}`} className="rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{workspace.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {workspace.role} - {workspace.plan} - {workspace.members} miembros
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${workspace.status === "Activo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  {workspace.status}
                </span>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
