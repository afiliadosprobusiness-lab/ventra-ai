import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, CircleOff, FileSpreadsheet, Import, MoreHorizontal, Search, Send, ShieldCheck, UploadCloud } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { acquisitionViews, campaignStatusMeta, importScenarioMeta, leadSortOptions } from "@/lib/acquisition/config";
import {
  buildOverviewMetrics,
  buildSourceDistribution,
  buildStatusDistribution,
  countWhatsappEligible,
  filterLeads,
  formatCompactDate,
  getLeadPriorityDetails,
  getLeadSourceDetails,
  getLeadStatusDetails,
  getSegmentLeadIds,
  getToneClass,
  getValidationDetails,
  getWhatsappDetails,
  resolveAcquisitionView,
  resolveSegmentById,
  sortLeads,
} from "@/lib/acquisition/helpers";
import {
  acquisitionAssetsMock,
  acquisitionCampaignsMock,
  acquisitionLeadsMock,
  acquisitionOwners,
  acquisitionSegmentsMock,
  approvedTemplatesMock,
  defaultCampaignDraft,
  defaultSegmentDraft,
  importScenarioStatesMock,
  leadEvolutionSeries,
} from "@/lib/acquisition/mock";
import type { AcquisitionView, CampaignDraft, ImportScenario, Lead, LeadFilterState, LeadSegment, SegmentDraft } from "@/lib/acquisition/types";

const chartColors = ["#22c55e", "#38bdf8", "#a78bfa", "#f59e0b", "#fb7185", "#94a3b8", "#06b6d4"];

function ToneBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getToneClass(tone)}`}>{label}</span>;
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="text-lg font-semibold tracking-[-0.03em]">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function MetricCard({ label, value, delta }: { label: string; value: number; delta: string }) {
  return (
    <div className="rounded-[1.25rem] border bg-card/80 p-4 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{delta}</p>
    </div>
  );
}

export function AcquisitionWorkspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState(acquisitionLeadsMock);
  const [segments, setSegments] = useState(acquisitionSegmentsMock);
  const [campaigns, setCampaigns] = useState(acquisitionCampaignsMock);
  const [filters, setFilters] = useState<LeadFilterState>({
    search: "",
    status: "all",
    source: "all",
    optIn: "all",
    industry: "all",
    sort: "createdAt_desc",
  });
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [importScenario, setImportScenario] = useState<ImportScenario>("preview");
  const [segmentDraft, setSegmentDraft] = useState<SegmentDraft>(defaultSegmentDraft);
  const [campaignDraft, setCampaignDraft] = useState<CampaignDraft>(defaultCampaignDraft);
  const [activeSegmentId, setActiveSegmentId] = useState(segments[0]?.id ?? "");
  const [noteDraft, setNoteDraft] = useState("");

  const view = resolveAcquisitionView(searchParams.get("view"));
  const filteredLeads = sortLeads(filterLeads(leads, filters), filters.sort);
  const selectedLead = leads.find((item) => item.id === searchParams.get("leadId")) ?? filteredLeads[0] ?? leads[0];
  const overviewMetrics = buildOverviewMetrics(leads);
  const sourceDistribution = buildSourceDistribution(leads);
  const statusDistribution = buildStatusDistribution(leads);
  const importState = importScenarioStatesMock.find((state) => state.id === importScenario) ?? importScenarioStatesMock[0];
  const industries = Array.from(new Set(leads.map((lead) => lead.industry))).sort();
  const segmentPreviewIds = getSegmentLeadIds(leads, segmentDraft.rules);
  const segmentPreviewLeads = leads.filter((lead) => segmentPreviewIds.includes(lead.id));
  const savedSegment = resolveSegmentById(segments, activeSegmentId) ?? segments[0];
  const campaignSegment = resolveSegmentById(segments, campaignDraft.segmentId) ?? segments[0];
  const campaignTemplate = approvedTemplatesMock.find((template) => template.id === campaignDraft.templateId) ?? approvedTemplatesMock[0];
  const campaignAudienceLeads = leads.filter((lead) => campaignSegment?.leadIds.includes(lead.id));
  const campaignEligibleLeads = campaignAudienceLeads.filter((lead) => lead.hasValidWhatsapp && lead.whatsappOptIn);
  const allVisibleSelected = filteredLeads.length > 0 && filteredLeads.every((lead) => selectedLeadIds.includes(lead.id));

  function updateView(nextView: AcquisitionView, leadId?: string) {
    const params = new URLSearchParams(searchParams);
    params.set("view", nextView);
    if (leadId) params.set("leadId", leadId);
    if (!leadId && nextView !== "leads") params.delete("leadId");
    setSearchParams(params);
  }

  function updateLead(leadId: string, updater: (lead: Lead) => Lead) {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? updater(lead) : lead)));
  }

  function handleLeadAction(action: "detail" | "edit" | "tag" | "assign" | "crm" | "campaign" | "duplicate" | "discard", lead: Lead) {
    if (action === "detail") return updateView("leads", lead.id);
    if (action === "edit") return toast.success(`Lead ${lead.fullName} listo para editar cuando conectemos formularios.`);
    if (action === "tag") {
      updateLead(lead.id, (item) => ({ ...item, tags: item.tags.includes("Prioridad comercial") ? item.tags : [...item.tags, "Prioridad comercial"] }));
      return toast.success(`Etiqueta aplicada a ${lead.fullName}.`);
    }
    if (action === "assign") {
      const currentIndex = acquisitionOwners.findIndex((owner) => owner.id === lead.ownerId);
      const nextOwner = acquisitionOwners[(currentIndex + 1) % acquisitionOwners.length];
      updateLead(lead.id, (item) => ({ ...item, ownerId: nextOwner.id, ownerName: nextOwner.name }));
      return toast.success(`${lead.fullName} ahora pertenece a ${nextOwner.name}.`);
    }
    if (action === "crm") {
      updateLead(lead.id, (item) => ({ ...item, status: item.status === "discarded" ? item.status : "qualified", sentToCrmAt: new Date().toISOString() }));
      return toast.success(`${lead.fullName} enviado al CRM mock.`);
    }
    if (action === "campaign") {
      setCampaignDraft((current) => ({ ...current, name: `Activacion ${lead.company}`, segmentId: "segment-003" }));
      updateView("campaigns");
      return toast.success(`Campana preparada para ${lead.fullName}.`);
    }
    if (action === "duplicate") {
      updateLead(lead.id, (item) => ({ ...item, status: "duplicate" }));
      return toast.success(`${lead.fullName} marcado como duplicado.`);
    }
    updateLead(lead.id, (item) => ({ ...item, status: "discarded" }));
    toast.success(`${lead.fullName} descartado del flujo.`);
  }

  function handleBulkAction(action: "crm" | "campaign" | "duplicate" | "discard") {
    if (selectedLeadIds.length === 0) return;
    setLeads((current) =>
      current.map((lead) => {
        if (!selectedLeadIds.includes(lead.id)) return lead;
        if (action === "crm") return { ...lead, status: lead.status === "discarded" ? lead.status : "qualified", sentToCrmAt: new Date().toISOString() };
        if (action === "duplicate") return { ...lead, status: "duplicate" };
        if (action === "discard") return { ...lead, status: "discarded" };
        return lead;
      }),
    );
    if (action === "campaign") updateView("campaigns");
    setSelectedLeadIds([]);
    toast.success(`Accion aplicada a ${selectedLeadIds.length} leads.`);
  }

  function handleAddNote() {
    if (!selectedLead || noteDraft.trim().length === 0) return;
    const createdAt = new Date().toISOString();
    updateLead(selectedLead.id, (lead) => ({
      ...lead,
      notes: [{ id: `note-${Date.now()}`, author: "Equipo Ventra", content: noteDraft.trim(), createdAt }, ...lead.notes],
      activities: [{ id: `activity-${Date.now()}`, type: "note", title: "Nueva nota", description: noteDraft.trim(), createdAt }, ...lead.activities],
    }));
    setNoteDraft("");
    toast.success(`Nota agregada a ${selectedLead.fullName}.`);
  }

  function handleSaveSegment() {
    if (segmentDraft.name.trim().length === 0) return toast.error("Agrega un nombre para el segmento.");
    const leadIds = getSegmentLeadIds(leads, segmentDraft.rules);
    const nextSegment: LeadSegment = {
      id: `segment-${Date.now()}`,
      name: segmentDraft.name,
      description: segmentDraft.description,
      intent: "Audiencia lista para CRM o campana controlada.",
      ruleSummary: [
        segmentDraft.rules.source === "all" ? "Todas las fuentes" : `Fuente ${getLeadSourceDetails(segmentDraft.rules.source).label}`,
        segmentDraft.rules.status === "all" ? "Todos los estados" : `Estado ${getLeadStatusDetails(segmentDraft.rules.status).label}`,
        segmentDraft.rules.optIn === "confirmed" ? "Opt-in confirmado" : segmentDraft.rules.optIn === "missing" ? "Sin opt-in" : "Cualquier opt-in",
      ],
      rules: segmentDraft.rules,
      leadIds,
      whatsappEligibleCount: countWhatsappEligible(leads.filter((lead) => leadIds.includes(lead.id))),
      lastUpdated: new Date().toISOString(),
    };
    setSegments((current) => [nextSegment, ...current]);
    setActiveSegmentId(nextSegment.id);
    toast.success(`Segmento ${nextSegment.name} guardado.`);
  }

  function handleLaunchCampaign() {
    if (!campaignSegment || !campaignTemplate) return toast.error("Selecciona segmento y plantilla.");
    setCampaigns((current) => [
      {
        id: `campaign-${Date.now()}`,
        name: campaignDraft.name,
        status: "scheduled",
        audienceSegmentId: campaignSegment.id,
        templateId: campaignTemplate.id,
        scheduledAt: campaignDraft.schedule,
        batchLimit: campaignDraft.batchLimit,
        sent: 0,
        delivered: 0,
        read: 0,
        responded: 0,
        failed: 0,
        summary: `Lista para ${campaignEligibleLeads.length} leads aptos con envio por lotes.`,
      },
      ...current,
    ]);
    toast.success(`Campana ${campaignDraft.name} preparada.`);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-7">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Captacion de leads
            </div>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                Captura leads, organizalos, valida quien esta listo y activalos para ventas.
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Unifica entradas desde formularios, widgets, CSV, carga manual y prospeccion IA; valida datos, controla opt-in y deja todo listo para CRM o campanas WhatsApp con plantilla aprobada.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra" onClick={() => updateView("import")}>
                <Import className="h-4 w-4" />
                Importar leads
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={() => updateView("segments")}>Crear segmento</Button>
              <Button variant="outline" className="rounded-xl" onClick={() => updateView("campaigns")}>Preparar campana</Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border bg-background/70 p-4">
              <p className="text-sm font-semibold">Motor de readiness</p>
              <p className="mt-3 text-3xl font-semibold">{countWhatsappEligible(leads)}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Leads con WhatsApp valido y opt-in confirmado.</p>
            </div>
            <div className="rounded-[1.25rem] border bg-background/70 p-4">
              <p className="text-sm font-semibold">Revision operativa</p>
              <p className="mt-3 text-3xl font-semibold">{leads.filter((lead) => lead.validationState === "review").length}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Registros pendientes por datos faltantes, duplicados u opt-in.</p>
            </div>
            <div className="rounded-[1.25rem] border bg-background/70 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Promesa del modulo</p>
                  <p className="mt-1 text-xs text-muted-foreground">Entrada ordenada, segmentacion y activacion con control.</p>
                </div>
                <ToneBadge label="Listo para demo" tone="emerald" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs value={view} onValueChange={(next) => updateView(next as AcquisitionView, searchParams.get("leadId") ?? undefined)} className="space-y-4">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-[1.25rem] border bg-card p-2">
          {acquisitionViews.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="rounded-xl px-4 py-3 data-[state=active]:shadow-card">
              <div className="flex flex-col items-start">
                <span className="font-semibold">{item.label}</span>
                <span className="text-[11px] text-muted-foreground">{item.caption}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {overviewMetrics.map((metric) => (
              <MetricCard key={metric.id} label={metric.label} value={metric.value} delta={metric.delta} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Evolucion de leads" description="Captados, validados y listos para activar en un solo pulso." />
              <div className="mt-6 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadEvolutionSeries}>
                    <defs>
                      <linearGradient id="capturedFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="captured" stroke="#22c55e" fill="url(#capturedFill)" strokeWidth={2} />
                    <Area type="monotone" dataKey="validated" stroke="#38bdf8" fill="transparent" strokeWidth={2} />
                    <Area type="monotone" dataKey="ready" stroke="#a78bfa" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Distribucion por fuente" description="De donde entra la demanda y cuanto vale operarla." />
                <div className="mt-5 grid gap-4 lg:grid-cols-[170px_1fr] lg:items-center">
                  <div className="h-[170px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sourceDistribution} dataKey="value" nameKey="label" innerRadius={42} outerRadius={68} paddingAngle={3}>
                          {sourceDistribution.map((entry, index) => (
                            <Cell key={entry.source} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {sourceDistribution.map((entry, index) => (
                      <div key={entry.source} className="flex items-center justify-between rounded-2xl border bg-muted/20 px-3 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                          <span>{entry.label}</span>
                        </div>
                        <span className="font-semibold">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Distribucion por estado" description="Cuanto esta listo, en revision o ya paso al CRM." />
                <div className="mt-5 space-y-3">
                  {statusDistribution.map((entry) => (
                    <div key={entry.status} className="space-y-2 rounded-2xl border bg-muted/20 p-3">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span>{entry.label}</span>
                        <span className="font-semibold">{entry.value}</span>
                      </div>
                      <Progress value={(entry.value / Math.max(leads.length, 1)) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Leads recientes" description="Entrada fresca lista para triage, validacion o handoff." />
              <div className="mt-5 space-y-3">
                {filteredLeads.slice(0, 5).map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => updateView("leads", lead.id)}
                    className="flex w-full items-center justify-between rounded-2xl border bg-muted/20 px-4 py-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <div>
                      <p className="text-sm font-semibold">{lead.fullName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lead.company} · {lead.industry}</p>
                    </div>
                    <ToneBadge label={getLeadStatusDetails(lead.status).label} tone={getLeadStatusDetails(lead.status).tone} />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Segmentos activos" description="Audiencias listas para CRM o contacto con plantilla aprobada." />
              <div className="mt-5 grid gap-3">
                {segments.slice(0, 4).map((segment) => (
                  <button
                    key={segment.id}
                    type="button"
                    onClick={() => {
                      setActiveSegmentId(segment.id);
                      updateView("segments");
                    }}
                    className="rounded-2xl border bg-muted/20 p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{segment.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{segment.description}</p>
                      </div>
                      <ToneBadge label={`${segment.whatsappEligibleCount} aptos`} tone="emerald" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {segment.ruleSummary.map((rule) => (
                        <span key={rule} className="rounded-full border border-border/80 px-2.5 py-1 text-[11px] text-muted-foreground">{rule}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <section className="rounded-[1.5rem] border bg-card p-5 shadow-card">
            <div className="grid gap-3 xl:grid-cols-[1.4fr_repeat(4,minmax(0,0.7fr))]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={filters.search}
                  onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                  placeholder="Buscar por lead, empresa, fuente o etiqueta..."
                  className="h-11 rounded-xl pl-10"
                />
              </div>
              <Select value={filters.source} onValueChange={(value) => setFilters((current) => ({ ...current, source: value as LeadFilterState["source"] }))}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Fuente" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fuentes</SelectItem>
                  {Array.from(new Set(leads.map((lead) => lead.source))).map((source) => (
                    <SelectItem key={source} value={source}>{getLeadSourceDetails(source).label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.optIn} onValueChange={(value) => setFilters((current) => ({ ...current, optIn: value as LeadFilterState["optIn"] }))}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Opt-in" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquier opt-in</SelectItem>
                  <SelectItem value="confirmed">Opt-in confirmado</SelectItem>
                  <SelectItem value="missing">Sin opt-in</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.industry} onValueChange={(value) => setFilters((current) => ({ ...current, industry: value }))}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Industria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las industrias</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.sort} onValueChange={(value) => setFilters((current) => ({ ...current, sort: value as LeadFilterState["sort"] }))}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Ordenar" /></SelectTrigger>
                <SelectContent>
                  {leadSortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["all", "new", "pending_validation", "ready_to_contact", "contacted", "qualified", "duplicate", "discarded"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilters((current) => ({ ...current, status: status as LeadFilterState["status"] }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    filters.status === status ? "border-primary/20 bg-primary/10 text-primary" : "border-border/80 bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {status === "all" ? "Todos" : getLeadStatusDetails(status).label}
                </button>
              ))}
            </div>

            {selectedLeadIds.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-3">
                <span className="text-sm font-medium">{selectedLeadIds.length} leads seleccionados</span>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleBulkAction("crm")}>Enviar a CRM</Button>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleBulkAction("campaign")}>Preparar campana</Button>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleBulkAction("duplicate")}>Duplicados</Button>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleBulkAction("discard")}>Descartar</Button>
              </div>
            ) : null}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
            <section className="overflow-hidden rounded-[1.5rem] border bg-card shadow-card">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b bg-muted/20 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      <th className="px-4 py-4"><Checkbox checked={allVisibleSelected} onCheckedChange={(checked) => setSelectedLeadIds(checked ? filteredLeads.map((lead) => lead.id) : [])} /></th>
                      <th className="px-4 py-4">Nombre</th>
                      <th className="px-4 py-4">Empresa</th>
                      <th className="px-4 py-4">Industria</th>
                      <th className="px-4 py-4">WhatsApp</th>
                      <th className="px-4 py-4">Email</th>
                      <th className="px-4 py-4">Fuente</th>
                      <th className="px-4 py-4">Score</th>
                      <th className="px-4 py-4">Estado</th>
                      <th className="px-4 py-4">Opt-in</th>
                      <th className="px-4 py-4">Ingreso</th>
                      <th className="px-4 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                      <tr key={lead.id} className={`border-b last:border-0 ${selectedLead?.id === lead.id ? "bg-primary/5" : "hover:bg-muted/20"}`}>
                        <td className="px-4 py-4 align-top">
                          <Checkbox
                            checked={selectedLeadIds.includes(lead.id)}
                            onCheckedChange={(checked) => setSelectedLeadIds((current) => checked ? [...current, lead.id] : current.filter((item) => item !== lead.id))}
                          />
                        </td>
                        <td className="px-4 py-4 align-top">
                          <button type="button" onClick={() => updateView("leads", lead.id)} className="text-left">
                            <p className="text-sm font-semibold">{lead.fullName}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{lead.jobTitle}</p>
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm">{lead.company}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{lead.industry}</td>
                        <td className="px-4 py-4 text-sm">{lead.whatsapp || "-"}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{lead.email}</td>
                        <td className="px-4 py-4"><ToneBadge label={getLeadSourceDetails(lead.source).shortLabel} tone={getLeadSourceDetails(lead.source).tone} /></td>
                        <td className="px-4 py-4 text-sm font-semibold">{lead.score}</td>
                        <td className="px-4 py-4"><ToneBadge label={getLeadStatusDetails(lead.status).label} tone={getLeadStatusDetails(lead.status).tone} /></td>
                        <td className="px-4 py-4">{lead.whatsappOptIn ? <ToneBadge label="Confirmado" tone="emerald" /> : <ToneBadge label="Pendiente" tone="amber" />}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{formatCompactDate(lead.createdAt)}</td>
                        <td className="px-4 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-xl"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleLeadAction("detail", lead)}>Ver detalle</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("edit", lead)}>Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("tag", lead)}>Etiquetar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("assign", lead)}>Asignar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("crm", lead)}>Enviar a CRM</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("campaign", lead)}>Preparar campana</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleLeadAction("duplicate", lead)}>Marcar duplicado</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLeadAction("discard", lead)}>Descartar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={12} className="px-6 py-16 text-center">
                          <div className="mx-auto max-w-md space-y-3">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><CircleOff className="h-5 w-5" /></div>
                            <p className="text-lg font-semibold">No hay leads con estos filtros</p>
                            <p className="text-sm text-muted-foreground">Ajusta fuente, industria u opt-in para volver a ver oportunidades listas para activar.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="rounded-[1.5rem] border bg-card p-5 shadow-card">
              {selectedLead ? (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-2xl font-semibold tracking-[-0.03em]">{selectedLead.fullName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{selectedLead.jobTitle} · {selectedLead.company}</p>
                      </div>
                      <ToneBadge label={getLeadPriorityDetails(selectedLead.priority).label} tone={getLeadPriorityDetails(selectedLead.priority).tone} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <ToneBadge label={getLeadStatusDetails(selectedLead.status).label} tone={getLeadStatusDetails(selectedLead.status).tone} />
                      <ToneBadge label={getValidationDetails(selectedLead.validationState).label} tone={getValidationDetails(selectedLead.validationState).tone} />
                      <ToneBadge label={getWhatsappDetails(selectedLead.whatsappState).label} tone={getWhatsappDetails(selectedLead.whatsappState).tone} />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Nombre completo", selectedLead.fullName],
                      ["Empresa", selectedLead.company],
                      ["Industria", selectedLead.industry],
                      ["Pais", `${selectedLead.country} · ${selectedLead.city}`],
                      ["WhatsApp", selectedLead.whatsapp || "-"],
                      ["Email", selectedLead.email],
                      ["Instagram", selectedLead.instagram],
                      ["Website", selectedLead.website],
                      ["LinkedIn", selectedLead.linkedin],
                      ["Fuente", getLeadSourceDetails(selectedLead.source).label],
                      ["Producto", selectedLead.productInterest],
                      ["Presupuesto", selectedLead.budgetRange],
                      ["Owner", selectedLead.ownerName],
                      ["Score", `${selectedLead.score}`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border bg-muted/20 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                        <p className="mt-2 text-sm leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Estado de validacion</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center justify-between gap-3"><span>Resumen</span><span className="text-right font-medium">{selectedLead.validationSummary}</span></div>
                      <div className="flex items-center justify-between gap-3"><span>Opt-in</span><span className="font-medium">{selectedLead.whatsappOptIn ? "Confirmado" : "Pendiente"}</span></div>
                      <div className="flex items-center justify-between gap-3"><span>Ingreso</span><span className="font-medium">{formatCompactDate(selectedLead.createdAt)}</span></div>
                      <div className="flex items-center justify-between gap-3"><span>Ultimo contacto</span><span className="font-medium">{formatCompactDate(selectedLead.lastContactAt)}</span></div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start rounded-xl" onClick={() => handleLeadAction("edit", selectedLead)}>Editar lead</Button>
                    <Button variant="outline" className="justify-start rounded-xl" onClick={() => handleLeadAction("assign", selectedLead)}>Asignar asesor</Button>
                    <Button variant="outline" className="justify-start rounded-xl" onClick={() => handleLeadAction("crm", selectedLead)}>Enviar a CRM</Button>
                    <Button variant="outline" className="justify-start rounded-xl" onClick={() => updateView("segments")}>Crear segmento</Button>
                    <Button className="gradient-ventra justify-start rounded-xl text-primary-foreground" onClick={() => handleLeadAction("campaign", selectedLead)}>Preparar campana WhatsApp</Button>
                  </div>

                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border/80 px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 space-y-3">
                      {selectedLead.activities.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="rounded-xl border bg-background/80 p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold">{activity.title}</p>
                            <span className="text-[11px] text-muted-foreground">{formatCompactDate(activity.createdAt)}</span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      <Textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Anade una nota operativa..." className="min-h-[88px] rounded-2xl" />
                      <Button variant="outline" className="w-full rounded-xl" onClick={handleAddNote}>Anadir nota</Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </TabsContent>
        <TabsContent value="import" className="space-y-6">
          <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-2">
              {importScenarioStatesMock.map((state) => (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => setImportScenario(state.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${importScenario === state.id ? "border-primary/20 bg-primary/10 text-primary" : "bg-background text-muted-foreground hover:bg-muted"}`}
                >
                  {importScenarioMeta[state.id].label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-dashed bg-muted/20 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><UploadCloud className="h-5 w-5" /></div>
                    <div>
                      <p className="text-lg font-semibold">CSV premium uploader</p>
                      <p className="text-sm text-muted-foreground">Carga, valida, detecta duplicados y revisa el mapeo antes de importar.</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl border bg-background/80 p-4 text-sm text-muted-foreground">{importState.summary}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" className="rounded-xl" onClick={() => setImportScenario("preview")}>Archivo demo</Button>
                    <Button variant="outline" className="rounded-xl" onClick={() => setImportScenario("duplicates")}>Simular duplicados</Button>
                    <Button variant="outline" className="rounded-xl" onClick={() => setImportScenario("error")}>Simular errores</Button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Filas detectadas", importState.rowsDetected],
                    ["Listas para importar", importState.readyToImport],
                    ["Warnings", importState.warnings],
                    ["Duplicados", importState.duplicates],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border bg-muted/20 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                      <p className="mt-3 text-2xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border bg-muted/20 p-5">
                  <SectionTitle title="Resumen previo a importar" description="El pipeline entra limpio: detecta errores, faltantes y repetidos antes de comprometer la base." />
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Normaliza nombres, company y telefono.</div>
                    <div className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4 text-sky-400" /> Mapea columnas esperadas para captacion.</div>
                    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Bloquea activacion si WhatsApp no esta apto.</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] border bg-background/80 p-5">
                  <SectionTitle title="Mapeo de columnas" description={`Archivo: ${importState.fileName}`} />
                  <div className="mt-4 space-y-2">
                    {importState.mappings.length > 0 ? importState.mappings.map((mapping) => (
                      <div key={`${mapping.csvColumn}-${mapping.field}`} className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-3 text-sm">
                        <span>{mapping.csvColumn}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{mapping.field}</span>
                          <ToneBadge label={mapping.status} tone={mapping.status === "mapped" ? "emerald" : mapping.status === "optional" ? "sky" : "amber"} />
                        </div>
                      </div>
                    )) : <div className="rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">El mapeo aparecera cuando el archivo tenga encabezados legibles.</div>}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border bg-background/80 p-5">
                  <SectionTitle title="Preview del archivo" description="Valida filas, warnings, errores y duplicados antes de aceptar la carga." />
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          <th className="py-3">Fila</th><th className="py-3">Nombre</th><th className="py-3">Empresa</th><th className="py-3">WhatsApp</th><th className="py-3">Email</th><th className="py-3">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importState.previewRows.length > 0 ? importState.previewRows.map((row) => (
                          <tr key={row.rowNumber} className="border-b last:border-0">
                            <td className="py-3 text-sm">{row.rowNumber}</td>
                            <td className="py-3 text-sm font-medium">{row.firstName} {row.lastName}</td>
                            <td className="py-3 text-sm text-muted-foreground">{row.company}</td>
                            <td className="py-3 text-sm">{row.whatsapp || "-"}</td>
                            <td className="py-3 text-sm text-muted-foreground">{row.email}</td>
                            <td className="py-3">
                              <div className="flex flex-col items-start gap-1">
                                <ToneBadge label={row.validation} tone={row.validation === "valid" ? "emerald" : row.validation === "warning" ? "amber" : row.validation === "duplicate" ? "violet" : "rose"} />
                                {row.issue ? <span className="text-[11px] text-muted-foreground">{row.issue}</span> : null}
                              </div>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">Todavia no hay preview disponible para este estado.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra" onClick={() => setImportScenario("success")}>Importar leads validados</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <section className="grid gap-4 lg:grid-cols-3">
            {[
              ["Formularios activos", acquisitionAssetsMock.filter((asset) => asset.type === "form" && asset.status === "active").length],
              ["Widgets activos", acquisitionAssetsMock.filter((asset) => asset.type === "widget" && asset.status === "active").length],
              ["Conversiones totales", acquisitionAssetsMock.reduce((sum, asset) => sum + asset.conversions, 0)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] border bg-card p-5 shadow-card">
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-4 text-3xl font-semibold">{value}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Formularios y widgets activos" description="Vistas previas, conversiones y status de cada entrada inbound." />
              <div className="mt-5 grid gap-4">
                {acquisitionAssetsMock.map((asset) => (
                  <div key={asset.id} className="rounded-[1.25rem] border bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{asset.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{asset.channel}</p>
                      </div>
                      <ToneBadge label={asset.status} tone={asset.status === "active" ? "emerald" : asset.status === "draft" ? "amber" : "zinc"} />
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border bg-background/80 p-3"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Views</p><p className="mt-2 text-lg font-semibold">{asset.views}</p></div>
                      <div className="rounded-2xl border bg-background/80 p-3"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Conversions</p><p className="mt-2 text-lg font-semibold">{asset.conversions}</p></div>
                      <div className="rounded-2xl border bg-background/80 p-3"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Completion</p><p className="mt-2 text-lg font-semibold">{asset.completionRate}%</p></div>
                    </div>
                    <div className="mt-4 rounded-2xl border bg-background/80 p-4">
                      <p className="text-sm font-semibold">{asset.previewTitle}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{asset.previewDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Codigo embebible mock" description="Listo para conectar luego sin redisenar el modulo." />
                <div className="mt-4 rounded-2xl border bg-[#081118] p-4 font-mono text-xs text-sky-200">{acquisitionAssetsMock[0]?.embedCode}</div>
                <div className="mt-4 flex gap-2">
                  <Button className="rounded-xl gradient-ventra text-primary-foreground">Crear nuevo formulario</Button>
                  <Button variant="outline" className="rounded-xl">Crear nuevo widget</Button>
                </div>
              </div>
              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Performance mock" description="Conversion por entrada para explicar calidad y no solo volumen." />
                <div className="mt-5 space-y-4">
                  {acquisitionAssetsMock.map((asset) => (
                    <div key={asset.id} className="space-y-2 rounded-2xl border bg-muted/20 p-3">
                      <div className="flex items-center justify-between gap-3 text-sm"><span>{asset.name}</span><span className="font-semibold">{asset.completionRate}%</span></div>
                      <Progress value={asset.completionRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Segmentos guardados" description="Audiencias reutilizables para CRM, asignacion o contacto." />
              <div className="mt-5 space-y-3">
                {segments.map((segment) => (
                  <button key={segment.id} type="button" onClick={() => setActiveSegmentId(segment.id)} className={`w-full rounded-[1.25rem] border p-4 text-left transition-colors ${activeSegmentId === segment.id ? "border-primary/20 bg-primary/5" : "bg-muted/20 hover:bg-muted/40"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="text-sm font-semibold">{segment.name}</p><p className="mt-1 text-xs text-muted-foreground">{segment.description}</p></div>
                      <ToneBadge label={`${segment.leadIds.length} leads`} tone="cyan" />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>{segment.whatsappEligibleCount} aptos</span><span>{formatCompactDate(segment.lastUpdated)}</span></div>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Builder de audiencias" description="Guarda filtros como segmentos y deja el modulo listo para backend." />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Input value={segmentDraft.name} onChange={(event) => setSegmentDraft((current) => ({ ...current, name: event.target.value }))} placeholder="Nombre del segmento" className="h-11 rounded-xl" />
                  <Input value={segmentDraft.description} onChange={(event) => setSegmentDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Descripcion corta" className="h-11 rounded-xl" />
                  <Select value={segmentDraft.rules.source} onValueChange={(value) => setSegmentDraft((current) => ({ ...current, rules: { ...current.rules, source: value as SegmentDraft["rules"]["source"] } }))}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Fuente" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las fuentes</SelectItem>
                      {Array.from(new Set(leads.map((lead) => lead.source))).map((source) => <SelectItem key={source} value={source}>{getLeadSourceDetails(source).label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={segmentDraft.rules.status} onValueChange={(value) => setSegmentDraft((current) => ({ ...current, rules: { ...current.rules, status: value as SegmentDraft["rules"]["status"] } }))}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Estado" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      {Array.from(new Set(leads.map((lead) => lead.status))).map((status) => <SelectItem key={status} value={status}>{getLeadStatusDetails(status).label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-muted/20 p-4">
                  <Checkbox checked={segmentDraft.rules.onlyValidWhatsapp} onCheckedChange={(checked) => setSegmentDraft((current) => ({ ...current, rules: { ...current.rules, onlyValidWhatsapp: Boolean(checked) } }))} />
                  <div><p className="text-sm font-semibold">Solo leads con WhatsApp valido</p><p className="text-xs text-muted-foreground">Recomendado para campanas o contacto controlado.</p></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="rounded-xl gradient-ventra text-primary-foreground" onClick={handleSaveSegment}>Guardar como audiencia</Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => setSegmentDraft(defaultSegmentDraft)}>Resetear reglas</Button>
                </div>
              </div>

              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Preview del segmento" description={`${segmentPreviewLeads.length} leads cumplen estas reglas en el mock actual.`} />
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {segmentPreviewLeads.slice(0, 6).map((lead) => (
                    <div key={lead.id} className="rounded-2xl border bg-muted/20 p-4">
                      <p className="text-sm font-semibold">{lead.fullName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lead.company} · {lead.industry}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <ToneBadge label={getLeadStatusDetails(lead.status).label} tone={getLeadStatusDetails(lead.status).tone} />
                        {lead.whatsappOptIn ? <ToneBadge label="Opt-in" tone="emerald" /> : <ToneBadge label="Sin opt-in" tone="amber" />}
                      </div>
                    </div>
                  ))}
                </div>
                {savedSegment ? <div className="mt-5 rounded-2xl border bg-muted/20 p-4 text-sm text-muted-foreground">{savedSegment.intent}</div> : null}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <SectionTitle title="Campanas WhatsApp" description="Solo leads aptos, plantillas aprobadas y envios por lote. Nada de blasting." />
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
              <SectionTitle title="Lista de campanas" description="Estado, audiencia, plantilla y rendimiento de cada activacion." />
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      <th className="py-3">Campana</th><th className="py-3">Estado</th><th className="py-3">Audiencia</th><th className="py-3">Plantilla</th><th className="py-3">Enviados</th><th className="py-3">Entregados</th><th className="py-3">Leidos</th><th className="py-3">Respondidos</th><th className="py-3">Fallidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b last:border-0">
                        <td className="py-3 pr-4"><p className="text-sm font-semibold">{campaign.name}</p><p className="mt-1 text-xs text-muted-foreground">{campaign.summary}</p></td>
                        <td className="py-3"><ToneBadge label={campaignStatusMeta[campaign.status].label} tone={campaignStatusMeta[campaign.status].tone} /></td>
                        <td className="py-3 text-sm">{resolveSegmentById(segments, campaign.audienceSegmentId)?.name ?? "Audiencia"}</td>
                        <td className="py-3 text-sm">{approvedTemplatesMock.find((template) => template.id === campaign.templateId)?.name ?? "Plantilla"}</td>
                        <td className="py-3 text-sm">{campaign.sent}</td><td className="py-3 text-sm">{campaign.delivered}</td><td className="py-3 text-sm">{campaign.read}</td><td className="py-3 text-sm">{campaign.responded}</td><td className="py-3 text-sm">{campaign.failed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Flujo mock para crear campana" description="Selecciona audiencia, plantilla, variables, programacion y lote antes de lanzar." />
                <div className="mt-5 grid gap-4">
                  <Input value={campaignDraft.name} onChange={(event) => setCampaignDraft((current) => ({ ...current, name: event.target.value }))} placeholder="Nombre de campana" className="h-11 rounded-xl" />
                  <Select value={campaignDraft.segmentId} onValueChange={(value) => setCampaignDraft((current) => ({ ...current, segmentId: value }))}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Segmento" /></SelectTrigger>
                    <SelectContent>{segments.map((segment) => <SelectItem key={segment.id} value={segment.id}>{segment.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={campaignDraft.templateId} onValueChange={(value) => setCampaignDraft((current) => ({ ...current, templateId: value }))}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Plantilla" /></SelectTrigger>
                    <SelectContent>{approvedTemplatesMock.map((template) => <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input value={campaignDraft.variableValue} onChange={(event) => setCampaignDraft((current) => ({ ...current, variableValue: event.target.value }))} placeholder="Variable principal" className="h-11 rounded-xl" />
                  <Input value={campaignDraft.schedule} onChange={(event) => setCampaignDraft((current) => ({ ...current, schedule: event.target.value }))} placeholder="Fecha programada ISO" className="h-11 rounded-xl" />
                  <Input value={`${campaignDraft.batchLimit}`} onChange={(event) => setCampaignDraft((current) => ({ ...current, batchLimit: Number(event.target.value) || 0 }))} placeholder="Limite por lote" className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
                <SectionTitle title="Previsualizacion y controles" description="El sistema solo usara leads aptos con WhatsApp valido y opt-in confirmado." />
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <div className="flex flex-wrap gap-2">
                      <ToneBadge label={`${campaignAudienceLeads.length} leads`} tone="cyan" />
                      <ToneBadge label={`${campaignEligibleLeads.length} aptos`} tone="emerald" />
                      <ToneBadge label={`Lote ${campaignDraft.batchLimit}`} tone="amber" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{campaignSegment?.name}</p>
                  </div>
                  <div className="rounded-2xl border bg-muted/20 p-4 text-sm leading-relaxed">
                    {(campaignTemplate?.preview ?? "")
                      .replace("{{firstName}}", campaignEligibleLeads[0]?.firstName ?? "Nombre")
                      .replace("{{productInterest}}", campaignEligibleLeads[0]?.productInterest ?? "producto")
                      .replace("{{ownerName}}", campaignEligibleLeads[0]?.ownerName ?? "asesor")
                      .replace("{{company}}", campaignEligibleLeads[0]?.company ?? "empresa")
                      .replace("{{variableValue}}", campaignDraft.variableValue)
                      .replace("{{budgetRange}}", campaignEligibleLeads[0]?.budgetRange ?? "presupuesto")}
                  </div>
                  <Button className="w-full rounded-xl gradient-ventra text-primary-foreground shadow-ventra" onClick={handleLaunchCampaign}>
                    Lanzar campana
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
