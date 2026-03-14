import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FunnelDiagnosis, FunnelLeadProfile } from "@/lib/landing-funnel";
import { diagnoseVentraLead } from "@/lib/landing-funnel";
import { FunnelOfferStage } from "./FunnelOfferStage";
import { FunnelQuizStage } from "./FunnelQuizStage";
import { FunnelTransitionStage } from "./FunnelTransitionStage";
import { FunnelVideoStage } from "./FunnelVideoStage";

type FunnelPhase = "quiz" | "transition" | "video" | "offer";

const emptyLeadProfile: FunnelLeadProfile = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  website: "",
};

export function ConsultativeFunnel() {
  const [phase, setPhase] = useState<FunnelPhase>("quiz");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<FunnelLeadProfile>(emptyLeadProfile);

  const diagnosis: FunnelDiagnosis | null = useMemo(() => {
    if (!Object.keys(answers).length) return null;
    return diagnoseVentraLead(answers, profile);
  }, [answers, profile]);

  return (
    <AnimatePresence mode="wait">
      {phase === "quiz" ? (
        <motion.div
          key="funnel-quiz"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          <FunnelQuizStage
            initialAnswers={answers}
            initialProfile={profile}
            onComplete={(nextAnswers, nextProfile) => {
              setAnswers(nextAnswers);
              setProfile(nextProfile);
              setPhase("transition");
            }}
          />
        </motion.div>
      ) : null}

      {phase === "transition" && diagnosis ? (
        <motion.div
          key="funnel-transition"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          <FunnelTransitionStage diagnosis={diagnosis} profile={profile} onContinue={() => setPhase("video")} />
        </motion.div>
      ) : null}

      {phase === "video" && diagnosis ? (
        <motion.div
          key="funnel-video"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          <FunnelVideoStage diagnosis={diagnosis} profile={profile} onContinue={() => setPhase("offer")} />
        </motion.div>
      ) : null}

      {phase === "offer" && diagnosis ? (
        <motion.div
          key="funnel-offer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          <FunnelOfferStage diagnosis={diagnosis} profile={profile} onRestart={() => setPhase("quiz")} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
