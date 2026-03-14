import { acquisitionViews, leadSourceMeta, leadStatusMeta, priorityMeta, toneClasses, validationMeta, whatsappMeta } from "@/lib/acquisition/config";
import type { AcquisitionView, Lead, LeadFilterState, LeadSegment, LeadSortKey, LeadStatus, SegmentRuleSet } from "@/lib/acquisition/types";

export function resolveAcquisitionView(value: string | null): AcquisitionView {
  return acquisitionViews.find((view) => view.id === value)?.id ?? "overview";
}

export function formatCompactDate(value?: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDay(value: string) {
  return new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short" }).format(new Date(value));
}

export function getToneClass(tone: string) {
  return toneClasses[tone] ?? toneClasses.zinc;
}

export function getLeadStatusDetails(status: LeadStatus) {
  return leadStatusMeta[status];
}

export function getLeadSourceDetails(source: Lead["source"]) {
  return leadSourceMeta[source];
}

export function getLeadPriorityDetails(priority: Lead["priority"]) {
  return priorityMeta[priority];
}

export function getValidationDetails(state: Lead["validationState"]) {
  return validationMeta[state];
}

export function getWhatsappDetails(state: Lead["whatsappState"]) {
  return whatsappMeta[state];
}

export function sortLeads(leads: Lead[], sortKey: LeadSortKey) {
  const sorted = [...leads];

  sorted.sort((left, right) => {
    if (sortKey === "company_asc") return left.company.localeCompare(right.company);
    if (sortKey === "score_desc") return right.score - left.score;
    if (sortKey === "score_asc") return left.score - right.score;
    if (sortKey === "createdAt_asc") return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });

  return sorted;
}

export function filterLeads(leads: Lead[], filters: LeadFilterState) {
  const search = filters.search.trim().toLowerCase();

  return leads.filter((lead) => {
    const matchesSearch =
      search.length === 0 ||
      [
        lead.fullName,
        lead.company,
        lead.industry,
        lead.email,
        lead.whatsapp,
        lead.tags.join(" "),
        lead.source,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);

    const matchesStatus = filters.status === "all" || lead.status === filters.status;
    const matchesSource = filters.source === "all" || lead.source === filters.source;
    const matchesIndustry = filters.industry === "all" || lead.industry === filters.industry;
    const matchesOptIn =
      filters.optIn === "all" ||
      (filters.optIn === "confirmed" ? lead.whatsappOptIn : !lead.whatsappOptIn);

    return matchesSearch && matchesStatus && matchesSource && matchesIndustry && matchesOptIn;
  });
}

export function getSegmentLeadIds(leads: Lead[], rules: SegmentRuleSet) {
  return leads
    .filter((lead) => {
      const matchesSource = rules.source === "all" || lead.source === rules.source;
      const matchesStatus = rules.status === "all" || lead.status === rules.status;
      const matchesIndustry = rules.industry === "all" || lead.industry === rules.industry;
      const matchesOptIn =
        rules.optIn === "all" ||
        (rules.optIn === "confirmed" ? lead.whatsappOptIn : !lead.whatsappOptIn);
      const matchesWhatsapp = !rules.onlyValidWhatsapp || lead.hasValidWhatsapp;

      return matchesSource && matchesStatus && matchesIndustry && matchesOptIn && matchesWhatsapp;
    })
    .map((lead) => lead.id);
}

export function countWhatsappEligible(leads: Lead[]) {
  return leads.filter((lead) => lead.hasValidWhatsapp && lead.whatsappOptIn).length;
}

export function buildOverviewMetrics(leads: Lead[]) {
  return [
    { id: "total", label: "Total de leads captados", value: leads.length, delta: "+14% este ciclo" },
    { id: "new", label: "Leads nuevos", value: leads.filter((lead) => lead.status === "new").length, delta: "Ingreso reciente" },
    { id: "validated", label: "Leads validados", value: leads.filter((lead) => lead.validationState === "validated").length, delta: "Datos normalizados" },
    { id: "whatsapp", label: "Leads con WhatsApp", value: leads.filter((lead) => lead.hasValidWhatsapp).length, delta: "Canal disponible" },
    { id: "optin", label: "Leads con opt-in", value: leads.filter((lead) => lead.whatsappOptIn).length, delta: "Apto para plantilla" },
    { id: "ready", label: "Listos para contactar", value: leads.filter((lead) => lead.status === "ready_to_contact").length, delta: "Priorizar hoy" },
    { id: "duplicate", label: "Leads duplicados", value: leads.filter((lead) => lead.status === "duplicate").length, delta: "Requieren consolidacion" },
    { id: "crm", label: "Enviados a CRM", value: leads.filter((lead) => Boolean(lead.sentToCrmAt)).length, delta: "Ya activados comercialmente" },
  ];
}

export function buildSourceDistribution(leads: Lead[]) {
  return Object.entries(
    leads.reduce<Record<string, number>>((accumulator, lead) => {
      accumulator[lead.source] = (accumulator[lead.source] ?? 0) + 1;
      return accumulator;
    }, {}),
  ).map(([source, value]) => ({
    source,
    label: leadSourceMeta[source as Lead["source"]].label,
    value,
  }));
}

export function buildStatusDistribution(leads: Lead[]) {
  return Object.entries(
    leads.reduce<Record<string, number>>((accumulator, lead) => {
      accumulator[lead.status] = (accumulator[lead.status] ?? 0) + 1;
      return accumulator;
    }, {}),
  ).map(([status, value]) => ({
    status,
    label: leadStatusMeta[status as LeadStatus].label,
    value,
  }));
}

export function getRecentLeads(leads: Lead[]) {
  return [...leads]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 5);
}

export function resolveSegmentById(segments: LeadSegment[], id: string) {
  return segments.find((segment) => segment.id === id);
}
