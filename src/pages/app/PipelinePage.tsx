import { pipelineStages } from "@/lib/mock-data";
import { MoreHorizontal, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PipelinePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Pipeline</h2>
          <p className="text-sm text-muted-foreground">Gestiona tus oportunidades de cierre</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra"><Plus className="h-4 w-4 mr-2" />Nueva oportunidad</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage, si) => (
          <div key={si} className="min-w-[280px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{stage.name}</h3>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{stage.count}</span>
              </div>
              <span className="text-xs font-semibold tabular-nums text-muted-foreground">{stage.value}</span>
            </div>
            <div className="space-y-3">
              {stage.deals.map((deal, di) => (
                <div key={di} className="rounded-xl border bg-card p-4 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{deal.name}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{deal.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tabular-nums">{deal.value}</span>
                    {deal.days > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{deal.days}d</span>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed rounded-lg hover:bg-muted/50 transition-colors">
                + Agregar deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
