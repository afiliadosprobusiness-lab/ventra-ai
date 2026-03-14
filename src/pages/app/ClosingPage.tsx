import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquareText, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pipelineStages } from "@/lib/mock-data";

const closingLeads = [
  { id: 1, name: "Ana Garcia", company: "Garcia y Asociados", stage: "En seguimiento", intent: "Alta", status: "Caliente", value: "$3,200", tags: ["Premium", "WhatsApp"], nextStep: "Confirmar llamada hoy" },
  { id: 2, name: "Carlos Mendoza", company: "Mendoza Trading", stage: "En seguimiento", intent: "Alta", status: "Negociando", value: "$5,400", tags: ["Descuento", "Referido"], nextStep: "Enviar propuesta final" },
  { id: 3, name: "Laura Sanchez", company: "Sanchez Retail", stage: "Nuevo", intent: "Media", status: "Interesada", value: "$2,100", tags: ["Landing", "E-commerce"], nextStep: "Hacer primer seguimiento" },
  { id: 4, name: "Roberto Diaz", company: "Diaz Industries", stage: "Cerrado", intent: "Alta", status: "Ganado", value: "$12,000", tags: ["Industrial"], nextStep: "Solicitar testimonio" },
  { id: 5, name: "Fernanda Ruiz", company: "Ruiz Consulting", stage: "Perdido", intent: "Baja", status: "Sin respuesta", value: "$4,800", tags: ["Consultoria"], nextStep: "Reactivar en 30 dias" },
];

export default function ClosingPage() {
  const [selectedLeadId, setSelectedLeadId] = useState(closingLeads[0].id);
  const selectedLead = closingLeads.find((lead) => lead.id === selectedLeadId) ?? closingLeads[0];

  const metrics = useMemo(() => {
    const total = closingLeads.length;
    const inFollowUp = closingLeads.filter((lead) => lead.stage === "En seguimiento").length;
    const closed = closingLeads.filter((lead) => lead.stage === "Cerrado").length;
    const lost = closingLeads.filter((lead) => lead.stage === "Perdido").length;
    const conversion = `${Math.round((closed / total) * 100)}%`;

    return [
      ["Leads totales", String(total)],
      ["En seguimiento", String(inFollowUp)],
      ["Cerrados", String(closed)],
      ["Perdidos", String(lost)],
      ["Tasa de conversion", conversion],
    ];
  }, []);

  const messageSuggestions = [
    `Hola ${selectedLead.name}. Retomo tu caso porque ${selectedLead.nextStep.toLowerCase()}. Si te parece, hoy mismo cerramos el siguiente paso.`,
    `Vi que tu interes sigue en ${selectedLead.status.toLowerCase()}. Te comparto una propuesta breve para que puedas decidir sin perder mas tiempo.`,
    `Si todavia estas evaluandolo, puedo resumirte en un mensaje por que ${selectedLead.company} encaja bien con esta solucion y cual seria el siguiente paso.`,
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Cierre
            </div>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                Haz seguimiento simple para cerrar mas ventas.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Aqui ves solo lo necesario: clasificacion de leads, seguimiento comercial y mensajes personalizados
                para empujar el cierre sin convertir Ventra en un CRM gigante.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                Preparar seguimiento
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-xl">Ver pipeline simple</Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.25rem] border bg-background/70 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Foco de hoy</p>
              <p className="mt-3 text-2xl font-semibold">2 leads calientes</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Listos para una accion comercial directa.</p>
            </div>
            <div className="rounded-[1.25rem] border bg-background/70 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Riesgo</p>
              <p className="mt-3 text-2xl font-semibold">1 oportunidad</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Puede perderse hoy si no sale seguimiento.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-[1.25rem] border bg-card p-5 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">Leads en seguimiento</h3>
          </div>
          <div className="mt-5 space-y-3">
            {closingLeads.map((lead) => (
              <button
                key={lead.id}
                type="button"
                onClick={() => setSelectedLeadId(lead.id)}
                className={`w-full rounded-[1.25rem] border p-4 text-left transition-colors ${
                  selectedLeadId === lead.id ? "border-primary/20 bg-primary/5" : "bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{lead.name}</p>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{lead.stage}</span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        Intencion {lead.intent}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{lead.company}</p>
                    <p className="mt-3 text-sm">{lead.nextStep}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-semibold">{lead.value}</p>
                    <div className="mt-2 flex flex-wrap gap-2 md:justify-end">
                      {lead.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Mensajes sugeridos</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Copys para insercion manual segun la etapa y la intencion del lead seleccionado.
            </p>
            <div className="mt-5 space-y-3">
              {messageSuggestions.map((message) => (
                <div key={message} className="rounded-2xl border bg-muted/20 p-4">
                  <p className="text-sm leading-relaxed">{message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Proceso comercial simple</h3>
            </div>
            <div className="mt-5 space-y-3">
              {pipelineStages.slice(0, 4).map((stage) => (
                <div key={stage.name} className="rounded-2xl border bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{stage.name}</p>
                    <span className="text-sm font-semibold">{stage.count}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{stage.value} en esta etapa.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
        <h3 className="text-lg font-semibold">Reglas para no complicar el cierre</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Etiquetar la intencion antes de mandar mas mensajes.",
            "Definir un siguiente paso concreto para cada lead activo.",
            "Mover rapido a ganado o perdido para mantener el foco.",
          ].map((rule) => (
            <div key={rule} className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-sm leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
