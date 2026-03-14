import { Zap, Play, Pause, MoreHorizontal, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { automations } from "@/lib/mock-data";

export default function AutomationsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Automations</h2>
          <p className="text-sm text-muted-foreground">Automatiza tus flujos comerciales</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nueva automatización</Button>
      </div>

      <div className="space-y-4">
        {automations.map((a) => (
          <div key={a.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">Trigger: {a.trigger}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.status === 'Activa' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{a.status}</span>
                {a.status === 'Activa' ? <Button variant="ghost" size="sm"><Pause className="h-3.5 w-3.5" /></Button> : <Button variant="ghost" size="sm"><Play className="h-3.5 w-3.5" /></Button>}
                <Button variant="ghost" size="sm"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
              <div><p className="text-xs text-muted-foreground">Acciones</p><p className="text-sm font-bold">{a.actions}</p></div>
              <div><p className="text-xs text-muted-foreground">Ejecuciones</p><p className="text-sm font-bold tabular-nums">{a.executions.toLocaleString()}</p></div>
              <div><p className="text-xs text-muted-foreground">Última ejecución</p><p className="text-sm font-medium flex items-center gap-1"><Clock className="h-3 w-3" />{a.lastRun}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
