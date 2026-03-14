import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLandingRecommendation, landingQuizQuestions } from "@/lib/landing-content";

type LandingQuizWizardProps = {
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  standalone?: boolean;
};

const stepMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function LandingQuizWizard({
  ctaHref = "/quiz",
  ctaLabel = "Ver recomendacion completa",
  className,
  standalone = false,
}: LandingQuizWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = landingQuizQuestions[step];
  const isComplete = step >= landingQuizQuestions.length;
  const recommendation = useMemo(() => getLandingRecommendation(answers), [answers]);
  const progress = Math.round((Object.keys(answers).length / landingQuizQuestions.length) * 100);

  function handleAnswer(option: string) {
    const nextAnswers = { ...answers, [question.id]: option };
    setAnswers(nextAnswers);

    if (step === landingQuizQuestions.length - 1) {
      setStep(landingQuizQuestions.length);
      return;
    }

    setStep(step + 1);
  }

  function handleBack() {
    if (isComplete) {
      const lastQuestion = landingQuizQuestions[landingQuizQuestions.length - 1];
      const nextAnswers = { ...answers };
      delete nextAnswers[lastQuestion.id];
      setAnswers(nextAnswers);
      setStep(landingQuizQuestions.length - 1);
      return;
    }

    if (step === 0) return;

    const previousQuestion = landingQuizQuestions[step - 1];
    const nextAnswers = { ...answers };
    delete nextAnswers[previousQuestion.id];
    setAnswers(nextAnswers);
    setStep(step - 1);
  }

  function handleRestart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div className={cn("rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8", className)}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Diagnostico guiado</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
            {standalone ? "Descubre por donde deberia empezar tu negocio" : "Evalua tu cuello de botella comercial"}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Responde unas preguntas y te diremos si hoy necesitas mejorar adquisicion, atencion automatica o cierre.
          </p>
        </div>
        <div className="min-w-[180px]">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Progreso</span>
            <span>{isComplete ? 100 : progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${isComplete ? 100 : progress}%` }} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={question.id}
            initial={stepMotion.initial}
            animate={stepMotion.animate}
            exit={stepMotion.exit}
            transition={{ duration: 0.25 }}
          >
            <div className="rounded-[1.5rem] border bg-muted/20 p-5 md:p-6">
              <p className="text-sm font-semibold text-primary">
                Paso {step + 1} de {landingQuizQuestions.length}
              </p>
              <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{question.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{question.helper}</p>
            </div>

            <div className="mt-5 grid gap-3">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option.label)}
                  className="group rounded-[1.35rem] border bg-background p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold">{option.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <Button variant="ghost" className="rounded-xl" onClick={handleBack} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
              <p className="text-xs text-muted-foreground">Resultado consultivo, no un formulario generico.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-result"
            initial={stepMotion.initial}
            animate={stepMotion.animate}
            exit={stepMotion.exit}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="rounded-[1.5rem] border bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Resultado</p>
                  <h4 className="text-xl font-semibold tracking-[-0.03em]">{recommendation.headline}</h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{recommendation.summary}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.5rem] border bg-muted/20 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Prioridad recomendada</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recommendation.priorityLayers.map((layer) => (
                    <span key={layer} className="rounded-full bg-background px-3 py-1.5 text-sm font-medium">
                      {layer}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{recommendation.note}</p>
              </div>

              <div className="rounded-[1.5rem] border bg-background p-5 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Plan sugerido</p>
                <p className="mt-3 text-2xl font-semibold">{recommendation.plan.name}</p>
                <p className="mt-1 text-lg font-semibold text-primary">
                  {recommendation.plan.price}
                  <span className="text-sm font-medium text-muted-foreground">{recommendation.plan.period}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{recommendation.plan.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recommendation.plan.includedLayers.map((layer) => (
                    <span key={layer} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {layer}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Link to={ctaHref}>
                  <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-xl" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4" />
                  Repetir diagnostico
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">La recomendacion te ayuda a empezar por la capa con mayor impacto.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
