import { ArrowUpRight, CircleDollarSign, Sparkles } from "lucide-react";
import {
  overviewFunnel,
  overviewMetrics,
  overviewOperationalSignals,
  overviewPriorityBoard,
  overviewRecentActivity,
} from "@/lib/commercial-hub";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <section className="surface-panel overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Revenue command center
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Una vista corta para decidir donde mover el sistema comercial hoy.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Ventra prioriza pocas senales, pero las correctas: oportunidades nuevas, conversaciones activas,
              seguimiento vivo y conversion real.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {overviewOperationalSignals.map((item) => (
                <div key={item.title} className="surface-subtle p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-4 text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.helper}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-subtle p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Pulso semanal</p>
                <p className="mt-2 text-xl font-semibold">Embudo operativo</p>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
                <CircleDollarSign className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {overviewFunnel.map((item, index) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.revenue}</p>
                    </div>
                    <p className="text-lg font-semibold tabular-nums">{item.value}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                      style={{ width: `${Math.max(14, 100 - index * 14)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <article key={metric.label} className="surface-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <metric.icon className="h-4 w-4" />
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {metric.delta}
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] tabular-nums">{metric.value}</p>
            <p className="mt-2 text-sm font-semibold">{metric.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section id="overview-priorities" className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Prioridades</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Donde intervenir primero</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {overviewPriorityBoard.map((item) => (
              <article key={item.title} className="surface-subtle p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {item.layer}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{item.impact}</span>
                      <span className="rounded-full bg-background px-3 py-1 text-muted-foreground">{item.owner}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="surface-panel p-6 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Actividad reciente</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Movimiento relevante</h2>
          <div className="mt-6 space-y-4">
            {overviewRecentActivity.map((item) => (
              <div key={`${item.lead}-${item.time}`} className="flex gap-3 rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.lead[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{item.lead}</p>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.action}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
