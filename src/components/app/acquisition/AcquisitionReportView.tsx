import {
  ArrowRight,
  BadgeCheck,
  Download,
  FileText,
  MessageSquareQuote,
  Radar,
  RefreshCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StrategicReport } from "@/lib/acquisition-diagnostic/types";

type AcquisitionReportViewProps = {
  report: StrategicReport;
  onDownload: () => void;
  onReset: () => void;
  isDownloading: boolean;
};

function SectionCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
  id,
}: {
  icon: typeof Sparkles;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="surface-panel p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AcquisitionReportView({
  report,
  onDownload,
  onReset,
  isDownloading,
}: AcquisitionReportViewProps) {
  return (
    <div className="space-y-6">
      <section id="campaign-diagnosis" className="surface-panel mesh-hero overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Reporte estrategico listo
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              {report.businessSummary.name} ya tiene un brief de captacion inicial listo para ejecutar.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {report.executiveSummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra"
                onClick={onDownload}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Preparando PDF..." : "Descargar reporte PDF"}
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={onReset}>
                <RefreshCcw className="h-4 w-4" />
                Nuevo diagnostico
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Mercado", report.businessSummary.market],
              ["Ticket", report.businessSummary.ticket],
              ["Oferta principal", report.businessSummary.offer],
              ["Fecha", report.createdAt],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.25rem] border border-border/70 bg-card/85 p-4 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {report.diagnosisSignals.map((signal) => (
          <article key={signal} className="surface-panel p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Senal detectada</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{signal}</p>
          </article>
        ))}
      </section>

      <SectionCard
        icon={Target}
        eyebrow="Cliente ideal"
        title="A quien deberia atraer esta campana"
        description="El avatar, su contexto actual y las resistencias que la estrategia debe trabajar desde el primer impacto."
      >
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-subtle p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Avatar resumido</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.clientProfile.avatar}</p>
          </div>
          <div className="grid gap-4">
            <div className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Dolor principal</p>
              <p className="mt-3 text-sm leading-relaxed">{report.clientProfile.pain}</p>
            </div>
            <div className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Deseo principal</p>
              <p className="mt-3 text-sm leading-relaxed">{report.clientProfile.desire}</p>
            </div>
            <div className="rounded-[1.25rem] border border-primary/20 bg-primary/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Objeciones probables</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {report.clientProfile.objections.map((objection) => (
                  <span key={objection} className="rounded-full border border-primary/15 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {objection}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        icon={BadgeCheck}
        eyebrow="Propuesta"
        title="Promesa, transformacion y posicionamiento"
        description="La base del mensaje para que la captacion se sienta consultiva, premium y con direccion comercial."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Promesa comercial sugerida", report.coreProposal.promise],
            ["Transformacion sugerida", report.coreProposal.transformation],
            ["Posicionamiento sugerido", report.coreProposal.positioning],
          ].map(([label, value]) => (
            <div key={label} className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
              <p className="mt-3 text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        icon={Radar}
        eyebrow="Angulos"
        title="Angulos de venta sugeridos"
        description="Seis caminos para estructurar anuncios, guiones, piezas o mensajes sin depender todavia de IA real."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {report.salesAngles.map((angle) => (
            <article key={angle.type} className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{angle.type}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">{angle.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{angle.description}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard
          icon={MessageSquareQuote}
          eyebrow="Hooks"
          title="Hooks sugeridos"
          description="Frases de arranque para anuncios, videos, carruseles y copies."
        >
          <div className="space-y-3">
            {report.hooks.map((hook, index) => (
              <div key={hook} className="rounded-[1.25rem] border border-primary/20 bg-primary/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Hook {index + 1}</p>
                <p className="mt-3 text-sm leading-relaxed">{hook}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          icon={FileText}
          eyebrow="Copy pack"
          title="Copys base listos para adaptar"
          description="Base mock creible para anuncios, videos, secuencias y ventas por WhatsApp."
        >
          <div className="space-y-4">
            {[
              ["Copy corto", report.copyPack.short],
              ["Copy mediano", report.copyPack.medium],
              ["Copy largo", report.copyPack.long],
              ["CTA sugerido", report.copyPack.cta],
              ["Mensaje corto para WhatsApp", report.copyPack.whatsapp],
            ].map(([label, value]) => (
              <div key={label} className="surface-subtle p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        icon={Sparkles}
        eyebrow="Conceptos creativos"
        title="Ideas de anuncios y conceptos de campana"
        description="No son creativos finales. Son direcciones claras para producir piezas con mejor criterio comercial."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {report.adIdeas.map((idea) => (
            <article key={idea.title} className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{idea.format}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">{idea.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idea.description}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        id="campaign-plan"
        icon={ArrowRight}
        eyebrow="Campana recomendada"
        title="Siguiente mejor salida para captar mejor"
        description="La recomendacion inicial ya aterriza canal, tipo de campana, CTA y foco operativo."
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {[
              ["Canal sugerido", report.campaignRecommendation.channel],
              ["Tipo de campana", report.campaignRecommendation.campaignType],
              ["CTA recomendado", report.campaignRecommendation.cta],
            ].map(([label, value]) => (
              <div key={label} className="surface-subtle p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.4rem] border border-primary/20 bg-primary/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Enfoque inicial recomendado</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.campaignRecommendation.focus}</p>
            </div>
            <div className="surface-subtle p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Justificacion</p>
              <p className="mt-3 text-sm leading-relaxed">{report.campaignRecommendation.justification}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        icon={ArrowRight}
        eyebrow="Siguiente paso"
        title="Que deberia pasar despues de este reporte"
        description="El valor no termina en el diagnostico. Este brief queda listo para convertirse en implementacion."
      >
        <div className="grid gap-3">
          {report.nextSteps.map((step, index) => (
            <div key={step} className="surface-subtle flex gap-4 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
