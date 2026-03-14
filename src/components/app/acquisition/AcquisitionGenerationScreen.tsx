import { BrainCircuit, FileText, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type AcquisitionGenerationScreenProps = {
  currentMessage: string;
  progress: number;
  steps: string[];
};

export function AcquisitionGenerationScreen({
  currentMessage,
  progress,
  steps,
}: AcquisitionGenerationScreenProps) {
  return (
    <section className="surface-panel mesh-hero overflow-hidden p-6 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Generando entregable
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-border/70 bg-card/90 p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/12 text-primary">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Ventra AI Strategic Engine</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-[-0.05em]">Estamos preparando tu estrategia de captacion</h2>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {currentMessage}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Progreso del diagnostico</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2.5" />
            </div>

            <div className="mt-8 grid gap-3">
              {steps.map((step) => {
                const isActive = step === currentMessage;
                const isPast = steps.indexOf(step) < steps.indexOf(currentMessage);

                return (
                  <div
                    key={step}
                    className={`rounded-[1.25rem] border px-4 py-3 transition-all ${
                      isActive
                        ? "border-primary/25 bg-primary/10 text-foreground shadow-ventra"
                        : isPast
                          ? "border-border/80 bg-background/80"
                          : "border-border/60 bg-background/50 text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm font-medium">{step}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Sparkles,
                title: "Promesa y posicionamiento",
                description: "Estamos definiendo como debe presentarse la oferta para atraer mejores oportunidades.",
              },
              {
                icon: FileText,
                title: "Brief premium",
                description: "El resultado final saldra listo para convertirse luego en campana, guion, copy o implementacion.",
              },
            ].map((item) => (
              <div key={item.title} className="surface-subtle p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold tracking-[-0.03em]">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
