import { useState } from "react";
import { Search, Send } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  source: string;
  score: number;
  status: "nuevo" | "en_seguimiento" | "cerrado" | "perdido";
  lastInteraction: string;
  suggestedAction: string;
};

const leadsData: Lead[] = [
  { id: 1, name: "Maria Lopez", source: "WhatsApp", score: 92, status: "en_seguimiento", lastInteraction: "Hace 5 min", suggestedAction: "Enviar propuesta final de cierre" },
  { id: 2, name: "Carlos Ruiz", source: "Meta Ads", score: 78, status: "en_seguimiento", lastInteraction: "Hace 1 hora", suggestedAction: "Seguimiento con caso de exito similar" },
  { id: 3, name: "Ana Torres", source: "Referido", score: 67, status: "nuevo", lastInteraction: "Hace 3 horas", suggestedAction: "Agendar llamada de descubrimiento" },
  { id: 4, name: "Pedro Gomez", source: "WhatsApp", score: 95, status: "cerrado", lastInteraction: "Ayer", suggestedAction: "-" },
  { id: 5, name: "Laura Martinez", source: "Web", score: 45, status: "en_seguimiento", lastInteraction: "Hace 2 dias", suggestedAction: "Reenviar informacion de beneficios" },
  { id: 6, name: "Diego Hernandez", source: "Meta Ads", score: 12, status: "perdido", lastInteraction: "Hace 5 dias", suggestedAction: "-" },
];

const statusColor = {
  nuevo: "bg-info/10 text-info",
  en_seguimiento: "bg-warning/10 text-warning",
  cerrado: "bg-primary/10 text-primary",
  perdido: "bg-destructive/10 text-destructive",
};

const statusLabel = {
  nuevo: "Nuevo",
  en_seguimiento: "En seguimiento",
  cerrado: "Cerrado",
  perdido: "Perdido",
};

export default function ClosingPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Lead["status"]>("all");

  const filtered = leadsData.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || lead.status === filter;
    return matchesSearch && matchesFilter;
  });

  const metrics = {
    total: leadsData.length,
    seguimiento: leadsData.filter((lead) => lead.status === "en_seguimiento").length,
    cerrados: leadsData.filter((lead) => lead.status === "cerrado").length,
    perdidos: leadsData.filter((lead) => lead.status === "perdido").length,
    conversion: Math.round((leadsData.filter((lead) => lead.status === "cerrado").length / leadsData.length) * 100),
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Cierre</h1>
        <p className="mt-1 text-sm text-muted-foreground">Prioriza leads, da seguimiento y empuja el cierre</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Total", value: metrics.total },
          { label: "En seguimiento", value: metrics.seguimiento },
          { label: "Cerrados", value: metrics.cerrados },
          { label: "Perdidos", value: metrics.perdidos },
          { label: "Conversion", value: `${metrics.conversion}%` },
        ].map((metric) => (
          <div key={metric.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-xl font-bold tabular-nums text-foreground">{metric.value}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar lead..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {(["all", "nuevo", "en_seguimiento", "cerrado", "perdido"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === item ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item === "all" ? "Todos" : statusLabel[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-12 gap-4 border-b border-border px-5 py-3 text-[10px] uppercase tracking-wider text-muted-foreground sm:grid">
          <div className="col-span-3">Lead</div>
          <div className="col-span-1 text-center">Score</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Ultima interaccion</div>
          <div className="col-span-4">Accion sugerida</div>
        </div>

        {filtered.map((lead) => (
          <div key={lead.id} className="grid grid-cols-1 items-center gap-2 border-b border-border px-5 py-4 transition-colors hover:bg-secondary/50 last:border-0 sm:grid-cols-12 sm:gap-4">
            <div className="flex items-center gap-3 sm:col-span-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {lead.name[0]}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{lead.name}</div>
                <div className="text-[10px] text-muted-foreground">{lead.source}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:col-span-1 sm:justify-center">
              <span className="text-[10px] text-muted-foreground sm:hidden">Score:</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-8 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${lead.score}%` }} />
                </div>
                <span className="text-xs font-mono text-foreground">{lead.score}</span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-medium ${statusColor[lead.status]}`}>
                {statusLabel[lead.status]}
              </span>
            </div>

            <div className="text-xs text-muted-foreground sm:col-span-2">{lead.lastInteraction}</div>

            <div className="sm:col-span-4">
              {lead.suggestedAction !== "-" ? (
                <button type="button" className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                  <Send className="h-3 w-3" />
                  {lead.suggestedAction}
                </button>
              ) : (
                <span className="text-xs text-muted-foreground">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
