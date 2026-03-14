import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FunnelLeadProfile, FunnelQuizStep } from "@/lib/landing-funnel";
import { funnelQuizSteps } from "@/lib/landing-funnel";
import { cn } from "@/lib/utils";

type FunnelQuizStageProps = {
  initialAnswers?: Record<string, string>;
  initialProfile?: FunnelLeadProfile;
  onComplete: (answers: Record<string, string>, profile: FunnelLeadProfile) => void;
};

const emptyLeadProfile: FunnelLeadProfile = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  website: "",
};

export function FunnelQuizStage({
  initialAnswers = {},
  initialProfile = emptyLeadProfile,
  onComplete,
}: FunnelQuizStageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [profile, setProfile] = useState<FunnelLeadProfile>(initialProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof FunnelLeadProfile, string>>>({});

  const step = funnelQuizSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / funnelQuizSteps.length) * 100);
  const isContactStep = step.type === "contact";

  const selectedValue = useMemo(() => {
    if (step.type !== "single-choice") return "";
    return answers[step.id] ?? "";
  }, [answers, step]);

  function handleNext() {
    if (step.type === "single-choice") {
      if (!selectedValue) return;
      if (stepIndex === funnelQuizSteps.length - 1) {
        onComplete(answers, profile);
        return;
      }
      setStepIndex((current) => current + 1);
      return;
    }

    const nextErrors: Partial<Record<keyof FunnelLeadProfile, string>> = {};
    step.fields.forEach((field) => {
      const value = profile[field.id].trim();
      if (field.required && !value) {
        nextErrors[field.id] = "Este dato es obligatorio.";
      }
      if (field.id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors.email = "Introduce un email valido.";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;
    onComplete(answers, profile);
  }

  function handleBack() {
    if (stepIndex === 0) return;
    setStepIndex((current) => current - 1);
  }

  function handleChoiceSelect(currentStep: FunnelQuizStep, value: string) {
    if (currentStep.type !== "single-choice") return;
    setAnswers((current) => ({ ...current, [currentStep.id]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card/90 shadow-card backdrop-blur-xl">
        <div className="border-b border-border px-5 py-4 sm:px-8 sm:py-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              disabled={stepIndex === 0}
              aria-label="Volver al paso anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Diagnostico consultivo
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span>
              Paso {stepIndex + 1} de {funnelQuizSteps.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted/70">
            <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">{step.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{step.helper}</p>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          {step.type === "single-choice" ? (
            <div className={cn("grid gap-4", step.layout === "grid" ? "sm:grid-cols-2" : "grid-cols-1")}>
              {step.options.map((option) => {
                const isSelected = selectedValue === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChoiceSelect(step, option.value)}
                    className={cn(
                      "group rounded-[1.6rem] border p-5 text-left transition-all duration-200",
                      "bg-background/70 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover",
                      isSelected ? "border-primary bg-primary/8 ring-1 ring-primary/20" : "border-border",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {option.badge ? (
                          <div className="mb-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                            {option.badge}
                          </div>
                        ) : null}
                        <p className="text-base font-semibold sm:text-lg">{option.label}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
                      </div>
                      <div
                        className={cn(
                          "mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent",
                        )}
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {step.fields.map((field) => (
                <div key={field.id} className={cn(field.id === "website" ? "md:col-span-2" : undefined)}>
                  <label className="mb-2 block text-sm font-medium text-foreground" htmlFor={field.id}>
                    {field.label}
                    {field.required ? <span className="ml-1 text-primary">*</span> : null}
                  </label>
                  <Input
                    id={field.id}
                    type={field.type ?? "text"}
                    value={profile[field.id]}
                    placeholder={field.placeholder}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setProfile((current) => ({ ...current, [field.id]: nextValue }));
                      if (errors[field.id]) {
                        setErrors((current) => ({ ...current, [field.id]: undefined }));
                      }
                    }}
                    className={cn(
                      "h-12 rounded-2xl border-border bg-background/70",
                      errors[field.id] ? "border-destructive focus-visible:ring-destructive" : undefined,
                    )}
                  />
                  {errors[field.id] ? <p className="mt-2 text-xs text-destructive">{errors[field.id]}</p> : null}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <LockKeyhole className="h-4 w-4 text-primary" />
              <span>Proceso privado, consultivo y enfocado en filtrar intencion real.</span>
            </div>
            <Button
              onClick={handleNext}
              className="h-12 rounded-2xl px-6 gradient-ventra text-primary-foreground shadow-ambient-lg"
              disabled={step.type === "single-choice" ? !selectedValue : false}
            >
              {isContactStep ? "Ver mi recomendacion" : "Continuar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="glass-card rounded-[1.8rem] p-6">
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Lo que estas desbloqueando
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">No es un formulario. Es un filtro consultivo serio.</h2>
          <div className="mt-5 space-y-4">
            {[
              "Diagnostico real de tu cuello de botella principal.",
              "Explicacion breve antes de mostrar la oferta para filtrar curiosos.",
              "Siguiente paso con una implementacion clara y precio explicito.",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-primary/20 bg-primary/8 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">Pensado para negocios que quieren implementar, no solo explorar.</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Si encajas, al final veras el siguiente paso con una oferta de implementacion y rutas para aplicar, seguir o evaluar encaje.
          </p>
        </div>
      </aside>
    </div>
  );
}
