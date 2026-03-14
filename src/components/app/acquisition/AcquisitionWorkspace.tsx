import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AcquisitionGenerationScreen } from "@/components/app/acquisition/AcquisitionGenerationScreen";
import { AcquisitionReportView } from "@/components/app/acquisition/AcquisitionReportView";
import { AcquisitionWizard } from "@/components/app/acquisition/AcquisitionWizard";
import { diagnosticSteps, generationMoments, initialDiagnosticInput } from "@/lib/acquisition-diagnostic/config";
import { generateStrategicReport } from "@/lib/acquisition-diagnostic/generate-report";
import { getStepValidationMessage } from "@/lib/acquisition-diagnostic/helpers";
import type { AcquisitionDiagnosticInput, AcquisitionExperienceStage, StrategicReport } from "@/lib/acquisition-diagnostic/types";

export function AcquisitionWorkspace() {
  const [stage, setStage] = useState<AcquisitionExperienceStage>("wizard");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<AcquisitionDiagnosticInput>(initialDiagnosticInput);
  const [stepError, setStepError] = useState<string | null>(null);
  const [generationIndex, setGenerationIndex] = useState(0);
  const [report, setReport] = useState<StrategicReport | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (stage !== "generating") return undefined;

    setGenerationIndex(0);

    const interval = window.setInterval(() => {
      setGenerationIndex((current) => {
        if (current >= generationMoments.length - 1) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 1150);

    const timeout = window.setTimeout(() => {
      setStage("report");
    }, 3900);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [stage]);

  function updateField<K extends keyof AcquisitionDiagnosticInput>(field: K, nextValue: AcquisitionDiagnosticInput[K]) {
    setFormData((current) => ({ ...current, [field]: nextValue }));
    setStepError(null);
  }

  function handleNext() {
    const validationMessage = getStepValidationMessage(diagnosticSteps[currentStepIndex], formData);

    if (validationMessage) {
      setStepError(validationMessage);
      return;
    }

    setCurrentStepIndex((current) => Math.min(current + 1, diagnosticSteps.length - 1));
    setStepError(null);
  }

  function handlePrevious() {
    setCurrentStepIndex((current) => Math.max(current - 1, 0));
    setStepError(null);
  }

  function handleSubmit() {
    const validationMessage = getStepValidationMessage(diagnosticSteps[currentStepIndex], formData);

    if (validationMessage) {
      setStepError(validationMessage);
      return;
    }

    const nextReport = generateStrategicReport(formData);
    setReport(nextReport);
    setStage("generating");
    setStepError(null);
    toast.success("Diagnostico en proceso. Estamos preparando tu reporte.");
  }

  async function handleDownloadPdf() {
    if (!report) return;

    try {
      setIsDownloading(true);
      const { downloadStrategicReportPdf } = await import("@/lib/acquisition-diagnostic/pdf");
      downloadStrategicReportPdf(report);
      toast.success("Reporte PDF generado.");
    } catch (error) {
      toast.error("No pudimos generar el PDF en este intento.");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  }

  function handleReset() {
    setStage("wizard");
    setCurrentStepIndex(0);
    setReport(null);
    setStepError(null);
    setGenerationIndex(0);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {stage === "wizard" ? (
        <AcquisitionWizard
          value={formData}
          currentStepIndex={currentStepIndex}
          error={stepError}
          onValueChange={updateField}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      ) : null}

      {stage === "generating" ? (
        <AcquisitionGenerationScreen
          currentMessage={generationMoments[generationIndex] ?? generationMoments[generationMoments.length - 1]}
          progress={((generationIndex + 1) / generationMoments.length) * 100}
          steps={generationMoments}
        />
      ) : null}

      {stage === "report" && report ? (
        <AcquisitionReportView
          report={report}
          onDownload={handleDownloadPdf}
          onReset={handleReset}
          isDownloading={isDownloading}
        />
      ) : null}
    </div>
  );
}
