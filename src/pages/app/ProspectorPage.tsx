import { Building2, ExternalLink, Filter, MapPin, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prospectorResults } from "@/lib/mock-data";

export default function ProspectorPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Prospeccion IA</h2>
          <p className="text-sm text-muted-foreground">Descubre negocios con alta intencion de compra.</p>
        </div>
        <Button className="gradient-ventra text-primary-foreground shadow-ventra">Buscar prospectos</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por industria, ubicacion o nombre..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground">
              <th className="p-4 text-left font-medium">Negocio</th>
              <th className="p-4 text-left font-medium">Industria</th>
              <th className="p-4 text-left font-medium">Score comercial</th>
              <th className="p-4 text-left font-medium">Facturacion est.</th>
              <th className="p-4 text-left font-medium">Ubicacion</th>
              <th className="p-4 text-left font-medium">Estado</th>
              <th className="p-4 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prospectorResults.map((result) => (
              <tr key={`${result.name}-${result.location}`} className="border-t transition-colors hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{result.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{result.industry}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${result.score >= 85 ? "bg-success/10 text-success" : result.score >= 75 ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                    {result.score}
                  </span>
                </td>
                <td className="p-4 text-sm tabular-nums">{result.revenue}</td>
                <td className="p-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {result.location}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${result.score >= 90 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {result.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm">
                      <Star className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" className="gradient-ventra text-xs text-primary-foreground">
                      Contactar
                    </Button>
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
