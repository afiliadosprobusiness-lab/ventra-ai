export type AcquisitionExperienceStage = "wizard" | "generating" | "report";

export type BinaryChoice = "yes" | "no";

export type AcquisitionDiagnosticInput = {
  businessName: string;
  businessType: string;
  industry: string;
  primaryMarket: string;
  websiteOrInstagram: string;
  offerSummary: string;
  averageTicket: string;
  primaryService: string;
  secondaryService: string;
  promisedTransformation: string;
  idealClientType: string;
  economicProfile: string;
  currentSituation: string;
  mainPain: string;
  mainDesire: string;
  commercialProblems: string[];
  leadSources: string;
  primaryChannel: string;
  usesWhatsapp: BinaryChoice;
  usesCalls: BinaryChoice;
  salesModel: string;
  runsAds: BinaryChoice;
  frequentObjections: string[];
  primaryGoal: string;
  brandTone: string;
  communicationStyle: string;
  preferredCta: string;
  commercialStyle: string;
};

export type DiagnosticFieldOption = {
  value: string;
  label: string;
  description: string;
};

export type DiagnosticField =
  | {
      id: keyof AcquisitionDiagnosticInput;
      label: string;
      description?: string;
      type: "text" | "url" | "textarea";
      placeholder?: string;
      optional?: boolean;
    }
  | {
      id: keyof AcquisitionDiagnosticInput;
      label: string;
      description?: string;
      type: "select" | "choice";
      placeholder?: string;
      optional?: boolean;
      options: DiagnosticFieldOption[];
    }
  | {
      id: keyof AcquisitionDiagnosticInput;
      label: string;
      description?: string;
      type: "multi-choice";
      placeholder?: string;
      optional?: boolean;
      options: DiagnosticFieldOption[];
      maxSelections: number;
    };

export type DiagnosticStep = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  fields: DiagnosticField[];
};

export type StrategicAngle = {
  type: string;
  title: string;
  description: string;
};

export type StrategicCopyPack = {
  short: string;
  medium: string;
  long: string;
  cta: string;
  whatsapp: string;
};

export type CreativeConcept = {
  format: string;
  title: string;
  description: string;
};

export type CampaignRecommendation = {
  channel: string;
  campaignType: string;
  cta: string;
  focus: string;
  justification: string;
};

export type StrategicReport = {
  createdAt: string;
  executiveSummary: string;
  strategicThesis: string;
  businessSummary: {
    name: string;
    type: string;
    offer: string;
    ticket: string;
    market: string;
  };
  diagnosisSignals: string[];
  clientProfile: {
    avatar: string;
    pain: string;
    desire: string;
    objections: string[];
  };
  coreProposal: {
    promise: string;
    transformation: string;
    positioning: string;
  };
  salesAngles: StrategicAngle[];
  hooks: string[];
  copyPack: StrategicCopyPack;
  adIdeas: CreativeConcept[];
  campaignRecommendation: CampaignRecommendation;
  nextSteps: string[];
};
