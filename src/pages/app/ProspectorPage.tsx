import { Building2, ExternalLink, Filter, MapPin, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prospectorResults } from "@/lib/mock-data";

const focusCards = [
  { label: "Cuentas detectadas", value: "38", sub: "Con score comercial arriba de 80" },
  { label: "Alta prioridad", value: "12", sub: "Listas para contacto esta semana" },
  { label: "Valor potencial", value: "$182k", sub: "Estimado anual agregado" },
];

export default function ProspectorPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Prospeccion IA</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Encuentra cuentas con senal comercial antes de meterlas al flujo.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Este modulo solo existe para encontrar oportunidades con mas chance de cerrar y enviarlas limpias a adquisicion o CRM.
          </p>
        </div>
        <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">Buscar prospectos</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {focusCards.map((card) => (
          <div key={card.label} className="rounded-[1.25rem] border bg-card p-5 shadow-card">
            <p className="text-2xl font-semibold tracking-[-0.03em]">{card.value}</p>
            <p className="mt-1 text-sm font-medium">{card.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por industria, ubicacion o nombre..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="pb-3 text-left font-medium">Negocio</th>
                <th className="pb-3 text-left font-medium">Industria</th>
                <th className="pb-3 text-left font-medium">Score</th>
                <th className="pb-3 text-left font-medium">Facturacion</th>
                <th className="pb-3 text-left font-medium">Ubicacion</th>
                <th className="pb-3 text-left font-medium">Estado</th>
                <th className="pb-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {prospectorResults.map((result) => (
                <tr key={`${result.name}-${result.location}`} className="border-b last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{result.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{result.industry}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{result.score}</span>
                  </td>
                  <td className="py-4 text-sm">{result.revenue}</td>
                  <td className="py-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {result.location}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{result.status}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Star className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" className="gradient-ventra text-xs text-primary-foreground">Enviar a CRM</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
