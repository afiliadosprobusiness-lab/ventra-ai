import { RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { FunnelDiagnosis, FunnelLeadProfile } from "@/lib/landing-funnel";
import { funnelNextSteps, funnelOfferContent } from "@/lib/landing-funnel";
import { cn } from "@/lib/utils";

type FunnelOfferStageProps = {
  diagnosis: FunnelDiagnosis;
  profile: FunnelLeadProfile;
  onRestart: () => void;
};

export function FunnelOfferStage({ diagnosis, profile, onRestart }: FunnelOfferStageProps) {
  const firstName = profile.name.trim().split(" ")[0] || "Tu negocio";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-border bg-card/90 p-6 shadow-card backdrop-blur-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {funnelOfferContent.badge}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">
              {funnelOfferContent.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {firstName}, {funnelOfferContent.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {funnelOfferContent.priceLabel}
              </span>
              <span className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium">
                {diagnosis.recommendedPlanLabel}
              </span>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-primary/20 bg-primary/8 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Diagnostico final</div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{diagnosis.headline}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{diagnosis.summary}</p>
            <p className="mt-5 text-sm font-medium text-foreground">{diagnosis.idealFitLabel}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {diagnosis.supportingLayers.map((layer) => (
                <span key={layer} className="rounded-full border border-primary/20 bg-background/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                  {layer}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.8rem] border border-border bg-card/90 p-6 shadow-card">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Beneficios</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Lo que esta implementacion busca resolver</h2>
          <div className="mt-6 space-y-4">
            {funnelOfferContent.benefits.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-background/70 px-4 py-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.8rem] border border-border bg-card/90 p-6 shadow-card">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Que recibes</div>
            <div className="mt-5 space-y-4">
              {funnelOfferContent.includes.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-primary/20 bg-primary/8 p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Para quien va dirigido</div>
            <div className="mt-5 space-y-4">
              {funnelOfferContent.fitBullets.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-card sm:p-10">
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Siguiente paso</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Elige como quieres continuar.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              La arquitectura queda lista para checkout, comunidad base o aplicacion. Hoy el frontend ya te permite
              simular esas rutas sin depender de backend real.
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Repetir diagnostico
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {funnelNextSteps.map((step) => {
              const isExternal = step.href.startsWith("mailto:");

              const card = (
                <div
                  className={cn(
                    "flex h-full flex-col rounded-[1.6rem] border p-5 transition-all duration-200 hover:-translate-y-0.5",
                    step.kind === "primary" ? "border-primary/30 bg-primary/10 shadow-ambient-lg" : "border-border bg-background/70",
                  )}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {step.kind === "primary" ? "Principal" : step.kind === "secondary" ? "Alternativa" : "Opcional"}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{step.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  <div className="mt-6">
                    <Button
                      className={cn(
                        "h-11 w-full rounded-2xl",
                        step.kind === "primary" ? "gradient-ventra text-primary-foreground" : "border-border bg-background/80",
                      )}
                      variant={step.kind === "primary" ? "default" : "outline"}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              );

              return isExternal ? (
                <a key={step.id} href={step.href}>
                  {card}
                </a>
              ) : (
                <Link key={step.id} to={step.href}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
