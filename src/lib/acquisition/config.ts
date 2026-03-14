import type {
  AcquisitionView,
  CampaignStatus,
  ImportScenario,
  LeadPriority,
  LeadSortKey,
  LeadSource,
  LeadStatus,
  ValidationState,
  WhatsappState,
} from "@/lib/acquisition/types";

export const acquisitionViews: Array<{ id: AcquisitionView; label: string; caption: string }> = [
  { id: "overview", label: "Overview", caption: "Pulso y readiness" },
  { id: "leads", label: "Leads", caption: "Lista y detalle" },
  { id: "import", label: "Importar", caption: "CSV y validacion" },
  { id: "forms", label: "Formularios y widgets", caption: "Inbound" },
  { id: "segments", label: "Segmentos", caption: "Audiencias activables" },
  { id: "campaigns", label: "Campanas WhatsApp", caption: "Contacto controlado" },
];

export const leadStatusMeta: Record<LeadStatus, { label: string; description: string; tone: string }> = {
  new: { label: "Nuevo", description: "Aun sin clasificacion comercial.", tone: "sky" },
  pending_validation: { label: "Pendiente de validacion", description: "Necesita revisar datos u opt-in.", tone: "amber" },
  ready_to_contact: { label: "Listo para contactar", description: "Cumple datos minimos y esta apto para activacion.", tone: "emerald" },
  contacted: { label: "Contactado", description: "Ya tuvo primer toque comercial.", tone: "violet" },
  qualified: { label: "Calificado", description: "Paso validacion y ya puede moverse al CRM.", tone: "cyan" },
  duplicate: { label: "Duplicado", description: "Debe consolidarse antes de accionar.", tone: "rose" },
  discarded: { label: "Descartado", description: "No califica o no debe usarse.", tone: "zinc" },
};

export const leadSourceMeta: Record<LeadSource, { label: string; shortLabel: string; tone: string }> = {
  form: { label: "Formulario", shortLabel: "Form", tone: "sky" },
  widget: { label: "Widget", shortLabel: "Widget", tone: "cyan" },
  landing: { label: "Landing", shortLabel: "Landing", tone: "violet" },
  csv: { label: "CSV", shortLabel: "CSV", tone: "amber" },
  manual: { label: "Manual", shortLabel: "Manual", tone: "zinc" },
  ai_prospecting: { label: "Prospeccion IA", shortLabel: "IA", tone: "emerald" },
  campaign: { label: "Campana", shortLabel: "Campana", tone: "rose" },
};

export const priorityMeta: Record<LeadPriority, { label: string; tone: string }> = {
  high: { label: "Alta", tone: "emerald" },
  medium: { label: "Media", tone: "amber" },
  low: { label: "Baja", tone: "zinc" },
};

export const validationMeta: Record<ValidationState, { label: string; tone: string }> = {
  validated: { label: "Validado", tone: "emerald" },
  review: { label: "Revisar", tone: "amber" },
  invalid: { label: "Con error", tone: "rose" },
};

export const whatsappMeta: Record<WhatsappState, { label: string; tone: string }> = {
  valid: { label: "WhatsApp valido", tone: "emerald" },
  missing: { label: "Sin WhatsApp", tone: "zinc" },
  invalid: { label: "Numero invalido", tone: "rose" },
  needs_opt_in: { label: "Falta opt-in", tone: "amber" },
};

export const campaignStatusMeta: Record<CampaignStatus, { label: string; tone: string }> = {
  draft: { label: "Borrador", tone: "zinc" },
  scheduled: { label: "Programada", tone: "amber" },
  running: { label: "Activa", tone: "emerald" },
  completed: { label: "Completada", tone: "cyan" },
};

export const importScenarioMeta: Record<ImportScenario, { label: string; hint: string; tone: string }> = {
  empty: { label: "Vacio", hint: "Aun no se cargo archivo.", tone: "zinc" },
  uploading: { label: "Cargando", hint: "Procesando encabezados y filas.", tone: "sky" },
  preview: { label: "Preview correcto", hint: "Listo para revisar mapeo.", tone: "emerald" },
  warning: { label: "Columnas faltantes", hint: "Hay campos clave ausentes.", tone: "amber" },
  error: { label: "Errores de formato", hint: "El archivo contiene filas invalidas.", tone: "rose" },
  duplicates: { label: "Duplicados detectados", hint: "Se encontraron leads repetidos.", tone: "violet" },
  success: { label: "Importacion exitosa", hint: "Los leads ya entraron a captacion.", tone: "emerald" },
};

export const leadSortOptions: Array<{ value: LeadSortKey; label: string }> = [
  { value: "createdAt_desc", label: "Ingreso mas reciente" },
  { value: "createdAt_asc", label: "Ingreso mas antiguo" },
  { value: "score_desc", label: "Score mas alto" },
  { value: "score_asc", label: "Score mas bajo" },
  { value: "company_asc", label: "Empresa A-Z" },
];

export const toneClasses: Record<string, string> = {
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  sky: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  zinc: "border-border/80 bg-muted/50 text-muted-foreground",
};
