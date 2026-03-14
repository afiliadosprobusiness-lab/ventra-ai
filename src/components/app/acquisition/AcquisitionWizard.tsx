import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { diagnosticSteps } from "@/lib/acquisition-diagnostic/config";
import { getStringValue, isStepComplete } from "@/lib/acquisition-diagnostic/helpers";
import type { AcquisitionDiagnosticInput, DiagnosticField, DiagnosticFieldOption, DiagnosticStep } from "@/lib/acquisition-diagnostic/types";
import { cn } from "@/lib/utils";

type AcquisitionWizardProps = {
  value: AcquisitionDiagnosticInput;
  currentStepIndex: number;
  error: string | null;
  onValueChange: <K extends keyof AcquisitionDiagnosticInput>(field: K, nextValue: AcquisitionDiagnosticInput[K]) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

function ChoiceCard({
  option,
  selected,
  onClick,
}: {
  option: DiagnosticFieldOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[1.25rem] border p-4 text-left transition-all hover:-translate-y-0.5",
        selected ? "border-primary/25 bg-primary/10 shadow-ventra" : "border-border/80 bg-background/80 hover:bg-background",
      )}
    >
      <p className="text-sm font-semibold">{option.label}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{option.description}</p>
    </button>
  );
}

function renderField(
  field: DiagnosticField,
  value: AcquisitionDiagnosticInput,
  onValueChange: AcquisitionWizardProps["onValueChange"],
) {
  const currentValue = value[field.id];

  if (field.type === "text" || field.type === "url") {
    return (
      <Input
        value={getStringValue(currentValue)}
        onChange={(event) => onValueChange(field.id, event.target.value as AcquisitionDiagnosticInput[typeof field.id])}
        placeholder={field.placeholder}
        className="h-12 rounded-2xl"
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        value={getStringValue(currentValue)}
        onChange={(event) => onValueChange(field.id, event.target.value as AcquisitionDiagnosticInput[typeof field.id])}
        placeholder={field.placeholder}
        className="min-h-[130px] rounded-2xl"
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        value={getStringValue(currentValue)}
        onValueChange={(nextValue) => onValueChange(field.id, nextValue as AcquisitionDiagnosticInput[typeof field.id])}
      >
        <SelectTrigger className="h-12 rounded-2xl">
          <SelectValue placeholder={field.placeholder ?? "Selecciona una opcion"} />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "choice") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {field.options.map((option) => (
          <ChoiceCard
            key={option.value}
            option={option}
            selected={currentValue === option.value}
            onClick={() => onValueChange(field.id, option.value as AcquisitionDiagnosticInput[typeof field.id])}
          />
        ))}
      </div>
    );
  }

  const selectedValues = Array.isArray(currentValue) ? currentValue : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-border/70 bg-background/70 px-4 py-3 text-xs text-muted-foreground">
        <span>Selecciona hasta {field.maxSelections} opciones.</span>
        <span>{selectedValues.length}/{field.maxSelections}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {field.options.map((option) => {
          const selected = selectedValues.includes(option.value);
          const canSelectMore = selected || selectedValues.length < field.maxSelections;

          return (
            <ChoiceCard
              key={option.value}
              option={option}
              selected={selected}
              onClick={() => {
                if (selected) {
                  onValueChange(
                    field.id,
                    selectedValues.filter((item) => item !== option.value) as AcquisitionDiagnosticInput[typeof field.id],
                  );
                  return;
                }

                if (!canSelectMore) return;

                onValueChange(field.id, [...selectedValues, option.value] as AcquisitionDiagnosticInput[typeof field.id]);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function StepPreview({
  value,
  currentStep,
}: {
  value: AcquisitionDiagnosticInput;
  currentStep: DiagnosticStep;
}) {
  const completedSteps = diagnosticSteps.filter((step) => isStepComplete(step, value)).length;

  return (
    <aside id="campaign-plan" className="space-y-4">
      <div className="surface-panel p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Entregable final</p>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">Ventra AI Strategic Report</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Al terminar vas a recibir una estrategia inicial de captacion con promesa, angulos, hooks, copys, concepto de anuncios y recomendacion de campana.
        </p>
      </div>

      <div className="surface-subtle p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Lectura actual</p>
        <div className="mt-4 space-y-4">
          {[
            ["Negocio", value.businessName || "Aun sin definir"],
            ["Oferta", value.primaryService || "Aun sin definir"],
            ["Objetivo", value.primaryGoal || "Aun sin definir"],
            ["Paso activo", currentStep.title],
          ].map(([label, content]) => (
            <div key={label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
              <p className="mt-1 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-subtle p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Progreso del diagnostico</p>
            <p className="text-xs text-muted-foreground">{completedSteps} de {diagnosticSteps.length} bloques listos</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AcquisitionWizard({
  value,
  currentStepIndex,
  error,
  onValueChange,
  onPrevious,
  onNext,
  onSubmit,
}: AcquisitionWizardProps) {
  const currentStep = diagnosticSteps[currentStepIndex];
  const isLastStep = currentStepIndex === diagnosticSteps.length - 1;
  const progress = ((currentStepIndex + 1) / diagnosticSteps.length) * 100;

  return (
    <section id="campaign-diagnosis" className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
      <div className="surface-panel overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Diagnostico de captacion
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Vamos a construir la base estrategica de tu proxima campana.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Un paso por bloque. Sin formularios eternos. Al final obtendras un reporte premium listo para descargar y usar como brief comercial.
            </p>
          </div>

          <div className="rounded-[1.1rem] border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
            <p className="font-semibold text-primary">{currentStep.eyebrow}</p>
            <p className="mt-1 text-muted-foreground">Bloque {currentStepIndex + 1} de {diagnosticSteps.length}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progreso total</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {diagnosticSteps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "rounded-[1.1rem] border px-4 py-3 transition-all",
                index === currentStepIndex
                  ? "border-primary/25 bg-primary/10"
                  : isStepComplete(step, value)
                    ? "border-border/80 bg-background/80"
                    : "border-border/60 bg-background/55 text-muted-foreground",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">{step.eyebrow}</p>
              <p className="mt-2 text-sm font-semibold">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-border/80 bg-background/70 p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{currentStep.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{currentStep.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{currentStep.description}</p>

          <div className="mt-6 grid gap-5">
            {currentStep.fields.map((field) => (
              <div key={field.id}>
                <div className="mb-3">
                  <label className="text-sm font-medium">{field.label}</label>
                  {field.description ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{field.description}</p>
                  ) : null}
                </div>
                {renderField(field, value, onValueChange)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Salida esperada de este bloque</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{currentStep.outcome}</p>
        </div>

        {error ? (
          <div className="mt-5 rounded-[1.1rem] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" className="rounded-2xl" onClick={onPrevious} disabled={currentStepIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra"
            onClick={isLastStep ? onSubmit : onNext}
          >
            {isLastStep ? "Generar diagnostico premium" : "Siguiente bloque"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <StepPreview value={value} currentStep={currentStep} />
    </section>
  );
}
