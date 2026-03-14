import { Clock, MoreHorizontal, Pause, Play, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { automations } from "@/lib/mock-data";

export default function AutomationsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Automatizaciones</h2>
          <p className="text-sm text-muted-foreground">Automatiza tareas para no dejar leads colgados.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nueva automatizacion
        </Button>
      </div>

      <div className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{automation.name}</h3>
                  <p className="text-xs text-muted-foreground">Se activa con: {automation.trigger}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${automation.status === "Activa" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {automation.status}
                </span>
                {automation.status === "Activa" ? (
                  <Button variant="ghost" size="sm">
                    <Pause className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm">
                    <Play className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4 border-t pt-3">
              <div>
                <p className="text-xs text-muted-foreground">Acciones</p>
                <p className="text-sm font-bold">{automation.actions}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ejecuciones</p>
                <p className="text-sm font-bold tabular-nums">{automation.executions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ultima ejecucion</p>
                <p className="flex items-center gap-1 text-sm font-medium">
                  <Clock className="h-3 w-3" />
                  {automation.lastRun}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
