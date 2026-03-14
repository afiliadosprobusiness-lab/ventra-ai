import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  closingFollowUpSuggestions,
  closingMetrics,
  closingPipeline,
  closingSignals,
  closingSpotlightLeads,
} from "@/lib/commercial-hub";

export default function ClosingPage() {
  return (
    <div className="space-y-6">
      <section className="surface-panel overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Capa 03
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Seguimiento comercial simple para empujar cierre, no para montar otro CRM gigante.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Aqui solo importa lo que ayuda a convertir: etapas claras, senales de intencion y mensajes de siguiente
              paso para que las oportunidades no se enfrien.
            </p>
          </div>

          <div className="surface-subtle p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Senales de intencion</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {closingSignals.map((signal) => (
                <span key={signal} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
        {closingMetrics.map((metric) => (
          <article key={metric.label} className="surface-panel p-4 text-center">
            <p className="text-2xl font-semibold tracking-[-0.04em] tabular-nums">{metric.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</p>
          </article>
        ))}
      </section>

      <section id="pipeline-board" className="surface-panel p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Pipeline</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Etapas canonicas del cierre</h2>
          </div>
          <Button className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
            Preparar seguimiento
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid min-w-[1180px] grid-cols-8 gap-4">
            {closingPipeline.map((column) => (
              <div key={column.stage} className="rounded-[1.5rem] border border-border/80 bg-background/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{column.stage}</p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {column.leads.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {column.leads.map((lead) => (
                    <article key={`${column.stage}-${lead.name}`} className="rounded-[1.15rem] border border-border bg-card p-4 shadow-card">
                      <p className="text-sm font-semibold">{lead.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lead.source}</p>
                      <p className="mt-3 text-sm font-semibold text-primary">{lead.amount}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {lead.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div id="follow-up-guides" className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Sugerencias de seguimiento</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Mensajes para mover la oportunidad</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {closingFollowUpSuggestions.map((item) => (
              <article key={item.title} className="surface-subtle p-5">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Focus leads</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Oportunidades para empujar hoy</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {closingSpotlightLeads.map((lead) => (
              <article key={lead.name} className="surface-subtle p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{lead.name}</p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {lead.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lead.nextMove}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{lead.signal}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
