export type LeadStatus =
  | "new"
  | "pending_validation"
  | "ready_to_contact"
  | "contacted"
  | "qualified"
  | "duplicate"
  | "discarded";

export type LeadSource = "form" | "widget" | "landing" | "csv" | "manual" | "ai_prospecting" | "campaign";

export type LeadPriority = "high" | "medium" | "low";
export type ValidationState = "validated" | "review" | "invalid";
export type WhatsappState = "valid" | "missing" | "invalid" | "needs_opt_in";
export type AcquisitionView = "overview" | "leads" | "import" | "forms" | "segments" | "campaigns";
export type OptInFilter = "all" | "confirmed" | "missing";
export type LeadSortKey = "createdAt_desc" | "createdAt_asc" | "score_desc" | "score_asc" | "company_asc";
export type ImportScenario = "empty" | "uploading" | "preview" | "warning" | "error" | "duplicates" | "success";
export type CampaignStatus = "draft" | "scheduled" | "running" | "completed";
export type TemplateCategory = "reactivation" | "demo" | "quote" | "follow_up";

export type LeadNote = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

export type LeadActivity = {
  id: string;
  type: "ingest" | "validation" | "assignment" | "crm" | "campaign" | "note";
  title: string;
  description: string;
  createdAt: string;
};

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  company: string;
  jobTitle: string;
  industry: string;
  country: string;
  city: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  website: string;
  linkedin: string;
  source: LeadSource;
  interest: string;
  productInterest: string;
  budgetRange: string;
  score: number;
  priority: LeadPriority;
  status: LeadStatus;
  ownerId: string;
  ownerName: string;
  tags: string[];
  notes: LeadNote[];
  whatsappOptIn: boolean;
  whatsappOptInAt?: string;
  whatsappOptInSource?: string;
  whatsappOptInProof?: string;
  hasValidWhatsapp: boolean;
  validationState: ValidationState;
  validationSummary: string;
  whatsappState: WhatsappState;
  lastContactAt?: string;
  createdAt: string;
  updatedAt: string;
  sentToCrmAt?: string;
  duplicateOfLeadId?: string;
  activities: LeadActivity[];
};

export type LeadOwner = {
  id: string;
  name: string;
  title: string;
  load: number;
  focus: string;
};

export type SegmentRuleSet = {
  source: LeadSource | "all";
  status: LeadStatus | "all";
  industry: string | "all";
  optIn: OptInFilter;
  onlyValidWhatsapp: boolean;
};

export type LeadSegment = {
  id: string;
  name: string;
  description: string;
  intent: string;
  ruleSummary: string[];
  rules: SegmentRuleSet;
  leadIds: string[];
  whatsappEligibleCount: number;
  lastUpdated: string;
};

export type SegmentDraft = {
  name: string;
  description: string;
  rules: SegmentRuleSet;
};

export type ImportColumnMapping = {
  csvColumn: string;
  field: string;
  status: "mapped" | "missing" | "optional";
};

export type ImportPreviewRow = {
  rowNumber: number;
  firstName: string;
  lastName: string;
  company: string;
  industry: string;
  whatsapp: string;
  email: string;
  source: string;
  optInWhatsapp: string;
  validation: "valid" | "warning" | "error" | "duplicate";
  issue?: string;
};

export type ImportScenarioState = {
  id: ImportScenario;
  fileName: string;
  uploadedAt: string;
  rowsDetected: number;
  readyToImport: number;
  warnings: number;
  errors: number;
  duplicates: number;
  summary: string;
  mappings: ImportColumnMapping[];
  previewRows: ImportPreviewRow[];
};

export type InboundAsset = {
  id: string;
  type: "form" | "widget";
  name: string;
  status: "active" | "draft" | "paused";
  channel: string;
  views: number;
  conversions: number;
  completionRate: number;
  lastLeadAt: string;
  previewTitle: string;
  previewDescription: string;
  fields: string[];
  embedCode: string;
};

export type ApprovedTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  language: string;
  variables: string[];
  preview: string;
  compliance: string;
};

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  audienceSegmentId: string;
  templateId: string;
  scheduledAt: string;
  batchLimit: number;
  sent: number;
  delivered: number;
  read: number;
  responded: number;
  failed: number;
  summary: string;
};

export type CampaignDraft = {
  name: string;
  segmentId: string;
  templateId: string;
  variableValue: string;
  schedule: string;
  batchLimit: number;
};

export type LeadFilterState = {
  search: string;
  status: LeadStatus | "all";
  source: LeadSource | "all";
  optIn: OptInFilter;
  industry: string | "all";
  sort: LeadSortKey;
};
