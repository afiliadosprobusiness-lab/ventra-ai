import { Search, Filter, ArrowUpRight, ExternalLink, Star, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prospectorResults } from "@/lib/mock-data";

export default function ProspectorPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Prospector AI</h2>
          <p className="text-sm text-muted-foreground">Descubre negocios con alta intención de compra</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Buscar prospectos</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por industria, ubicación, nombre..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filtros</Button>
      </div>

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground">
              <th className="text-left p-4 font-medium">Negocio</th>
              <th className="text-left p-4 font-medium">Industria</th>
              <th className="text-left p-4 font-medium">Revenue Score</th>
              <th className="text-left p-4 font-medium">Facturación est.</th>
              <th className="text-left p-4 font-medium">Ubicación</th>
              <th className="text-left p-4 font-medium">Estado</th>
              <th className="text-right p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prospectorResults.map((r, i) => (
              <tr key={i} className="border-t hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{r.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{r.industry}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.score >= 85 ? 'bg-success/10 text-success' : r.score >= 75 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                    {r.score}
                  </span>
                </td>
                <td className="p-4 text-sm tabular-nums">{r.revenue}</td>
                <td className="p-4 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === 'Alta intención' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm"><Star className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" className="gradient-ventra text-primary-foreground text-xs">Contactar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
