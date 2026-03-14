import { Plus, MoreHorizontal, Play, Pause, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/lib/mock-data";

export default function CampaignsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Campañas</h2>
          <p className="text-sm text-muted-foreground">Lanza y gestiona tus campañas comerciales</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nueva campaña</Button>
      </div>

      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  c.status === 'Activa' ? 'bg-success/10 text-success' :
                  c.status === 'Pausada' ? 'bg-warning/10 text-warning' :
                  c.status === 'Completada' ? 'bg-primary/10 text-primary' :
                  'bg-muted text-muted-foreground'
                }`}>{c.status}</span>
                <span className="text-xs text-muted-foreground">{c.type}</span>
              </div>
              <div className="flex items-center gap-1">
                {c.status === 'Activa' && <Button variant="ghost" size="sm"><Pause className="h-3.5 w-3.5" /></Button>}
                {c.status === 'Pausada' && <Button variant="ghost" size="sm"><Play className="h-3.5 w-3.5" /></Button>}
                <Button variant="ghost" size="sm"><BarChart3 className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {[["Enviados", c.sent], ["Abiertos", c.opened], ["Clicks", c.clicked], ["Convertidos", c.converted], ["Revenue", c.revenue]].map(([label, val]) => (
                <div key={label as string}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-lg font-bold tabular-nums">{typeof val === 'number' ? val.toLocaleString() : val}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
