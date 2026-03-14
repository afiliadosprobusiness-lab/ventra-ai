import { describe, expect, it } from "vitest";
import { generateStrategicReport } from "@/lib/acquisition-diagnostic/generate-report";
import type { AcquisitionDiagnosticInput } from "@/lib/acquisition-diagnostic/types";

const baseInput: AcquisitionDiagnosticInput = {
  businessName: "Aura Clinic",
  businessType: "clinica",
  industry: "Medicina estetica",
  primaryMarket: "Peru",
  websiteOrInstagram: "https://auraclinic.pe",
  offerSummary: "Tratamientos de rejuvenecimiento facial para ejecutivos",
  averageTicket: "USD 2,500",
  primaryService: "Rejuvenecimiento facial premium",
  secondaryService: "",
  promisedTransformation: "verse mejor y recuperar seguridad sin procedimientos invasivos",
  idealClientType: "ejecutivos y empresarias de 35 a 55 anos",
  economicProfile: "alto poder adquisitivo y poco tiempo disponible",
  currentSituation: "dependen de referidos y consultas dispersas por Instagram",
  mainPain: "reciben preguntas sueltas que no siempre terminan en cita",
  mainDesire: "agendar mas valoraciones con pacientes realmente listos para comprar",
  commercialProblems: ["leads-malos", "no-agendan"],
  leadSources: "Instagram, referidos y Meta Ads",
  primaryChannel: "Meta Ads + WhatsApp",
  usesWhatsapp: "yes",
  usesCalls: "yes",
  salesModel: "mixto",
  runsAds: "yes",
  frequentObjections: ["esta-caro", "lo-voy-a-pensar"],
  primaryGoal: "mas-llamadas",
  brandTone: "elegante",
  communicationStyle: "premium",
  preferredCta: "Agenda tu diagnostico",
  commercialStyle: "Consultivo, premium y orientado a confianza.",
};

describe("generateStrategicReport", () => {
  it("builds a channel recommendation aligned with ads and WhatsApp", () => {
    const report = generateStrategicReport(baseInput);

    expect(report.businessSummary.name).toBe("Aura Clinic");
    expect(report.campaignRecommendation.channel).toContain("Meta Ads + WhatsApp");
    expect(report.campaignRecommendation.campaignType).toContain("agenda");
  });

  it("uses business inputs to compose hooks and proposal", () => {
    const report = generateStrategicReport(baseInput);

    expect(report.coreProposal.promise).toContain("ejecutivos y empresarias");
    expect(report.hooks.some((hook) => hook.toLowerCase().includes("agenda tu diagnostico"))).toBe(true);
    expect(report.adIdeas[0].description.toLowerCase()).toContain("referidos y consultas dispersas por instagram");
  });
});
