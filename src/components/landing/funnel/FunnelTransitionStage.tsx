import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import type { FunnelDiagnosis, FunnelLeadProfile } from "@/lib/landing-funnel";
import { funnelTransitionChecklist } from "@/lib/landing-funnel";

type FunnelTransitionStageProps = {
  diagnosis: FunnelDiagnosis;
  profile: FunnelLeadProfile;
  onContinue: () => void;
};

export function FunnelTransitionStage({ diagnosis, profile, onContinue }: FunnelTransitionStageProps) {
  const [timeline, setTimeline] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeline((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return current + 4;
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeline < 100) return;
    const timeout = window.setTimeout(onContinue, 650);
    return () => window.clearTimeout(timeout);
  }, [onContinue, timeline]);

  const progressRows = useMemo(
    () =>
      funnelTransitionChecklist.map((label, index) => {
        const localProgress = Math.max(0, Math.min(100, timeline * 1.3 - index * 22));
        return { label, progress: localProgress };
      }),
    [timeline],
  );

  const firstName = profile.name.trim().split(" ")[0] || "Tu negocio";

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card/90 p-6 shadow-card backdrop-blur-xl sm:p-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Diagnostico en preparacion
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">
          {firstName}, estamos terminando de preparar tu recomendacion.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {diagnosis.transitionTitle} {diagnosis.transitionBody}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.8rem] border border-border bg-background/70 p-6">
          <div className="mb-6 flex items-center gap-3">
            <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm font-semibold">Cruzando respuestas y preparando el siguiente paso.</p>
          </div>

          <div className="space-y-5">
            {progressRows.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="tabular-nums text-primary">{Math.round(row.progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/80">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${row.progress}%` }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-primary/20 bg-primary/8 p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Recomendacion preliminar</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{diagnosis.headline}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{diagnosis.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {diagnosis.supportingLayers.map((layer) => (
              <span key={layer} className="rounded-full border border-primary/20 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                {layer}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-primary">{diagnosis.recommendedPlanLabel}</p>
        </div>
      </div>
    </div>
  );
}
