import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Play, Volume2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import type { FunnelDiagnosis, FunnelLeadProfile } from "@/lib/landing-funnel";
import { funnelVideoConfig } from "@/lib/landing-funnel";

type FunnelVideoStageProps = {
  diagnosis: FunnelDiagnosis;
  profile: FunnelLeadProfile;
  onContinue: () => void;
};

export function FunnelVideoStage({ diagnosis, profile, onContinue }: FunnelVideoStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  const unlockThreshold = funnelVideoConfig.unlockThreshold;
  const isUnlocked = progress >= unlockThreshold;
  const remaining = Math.max(0, unlockThreshold - Math.round(progress));
  const firstName = profile.name.trim().split(" ")[0] || "Tu negocio";

  const progressLabel = useMemo(() => {
    if (isUnlocked) return "Siguiente paso desbloqueado";
    if (!isActivated) return "Activa el audio para empezar";
    return `Mira el ${remaining}% restante para desbloquear la propuesta`;
  }, [isActivated, isUnlocked, remaining]);

  async function handleActivate() {
    const video = videoRef.current;
    if (!video) return;

    setIsActivated(true);
    video.currentTime = 0;
    video.muted = false;

    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play().catch(() => undefined);
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !isActivated || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          {funnelVideoConfig.eyebrow}
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">{funnelVideoConfig.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {firstName}, {funnelVideoConfig.subtitle}
        </p>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
        <div className="space-y-5">
          <div className="rounded-[1.8rem] border border-primary/20 bg-primary/8 p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Tu diagnostico</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{diagnosis.headline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{diagnosis.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {diagnosis.outcomeHighlights.map((item) => (
                <span key={item} className="rounded-full border border-primary/15 bg-background/70 px-3 py-1.5 text-xs font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-border bg-card/80 p-6 shadow-card">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">Consumo del video</p>
              <span className="text-sm font-semibold text-primary tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/80">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{progressLabel}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5 text-primary" />
              <span>La propuesta se muestra solo despues del {unlockThreshold}% de reproduccion.</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[380px]">
          <div className="rounded-[2.25rem] border border-border bg-[#050816] p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)]">
            <AspectRatio ratio={9 / 16} className="overflow-hidden rounded-[1.9rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.35),transparent_34%),linear-gradient(180deg,#091120,#04060d)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_22%),linear-gradient(180deg,rgba(4,8,16,0.15),rgba(4,8,16,0.3))]" />
              <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-white backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/90">Ventra implementation</div>
                <div className="mt-2 text-lg font-semibold leading-tight">
                  {diagnosis.focusLabel} primero, despues conversion con menos operacion manual.
                </div>
              </div>

              <video
                ref={videoRef}
                playsInline
                controls={isActivated}
                preload="metadata"
                className="relative z-[1] h-full w-full object-cover"
                src={funnelVideoConfig.source}
                onTimeUpdate={handleTimeUpdate}
              />

              {!isActivated ? (
                <button
                  type="button"
                  onClick={handleActivate}
                  className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 rounded-[1.7rem] border border-white/10 bg-red-600/90 p-6 text-left text-white shadow-[0_24px_60px_-20px_rgba(239,68,68,0.65)] backdrop-blur-xl transition-transform duration-200 hover:scale-[1.01]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-red-100/90">
                        {funnelVideoConfig.overlayTitle}
                      </div>
                      <div className="mt-3 max-w-[220px] text-2xl font-semibold leading-tight">
                        {funnelVideoConfig.overlayBody}
                      </div>
                    </div>
                    <div className="rounded-full bg-white/14 p-3">
                      <Volume2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                    <Play className="h-4 w-4 fill-current" />
                    Hacer clic para escuchar
                  </div>
                </button>
              ) : null}
            </AspectRatio>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: isUnlocked ? 1 : 0, y: isUnlocked ? 0 : 10 }}
            transition={{ duration: 0.28 }}
            className="mt-6"
          >
            <Button
              onClick={onContinue}
              disabled={!isUnlocked}
              className="h-14 w-full rounded-2xl gradient-ventra text-base font-semibold text-primary-foreground shadow-ambient-lg disabled:pointer-events-none disabled:opacity-0"
            >
              Quiero ver la propuesta de implementacion
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
