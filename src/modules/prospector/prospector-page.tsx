import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  Megaphone,
  MessageSquareMore,
  MoreHorizontal,
  PhoneCall,
  ScanSearch,
  Sparkles,
  Target,
  UserRoundPlus,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { EmptyState } from "@/components/common/empty-state";
import { MetricCard } from "@/components/common/metric-card";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deriveCrmStatus,
  getProspectorWorkspaceData,
} from "@/data/prospector-data";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import type {
  Prospect,
  ProspectAudit,
  ProspectCrmStatus,
  ProspectOpportunityStatus,
  ProspectOutreachStatus,
  ProspectorSavedSearch,
} from "@/data/mock-data";

type FilterState = {
  query: string;
  industry: string;
  country: string;
  city: string;
  businessSize: string;
  website: "any" | "with" | "without";
  socials: "any" | "active" | "inactive";
  ads: "any" | "active" | "inactive";
  minScore: number;
  signal: string;
  onlyHighIntent: boolean;
  missingCaptureLayer: boolean;
};

type ActionType =
  | "save-crm"
  | "create-opportunity"
  | "send-conversations"
  | "send-voice"
  | "add-campaign"
  | "assign-owner";

type DrawerMode = "audit" | "pitch" | "mockup" | null;

const defaultFilters: FilterState = {
  query: "",
  industry: "All",
  country: "All",
  city: "All",
  businessSize: "All",
  website: "any",
  socials: "any",
  ads: "any",
  minScore: 75,
  signal: "All",
  onlyHighIntent: false,
  missingCaptureLayer: false,
};

const owners = ["Camila Rojas", "Dario Perez", "Jazmin Solis", "Lucia Saenz"];
const campaigns = ["Q2 tower launch", "Warm lead recovery", "Partner motion"];

function toneForScore(score: number) {
  if (score >= 90) return "success";
  if (score >= 80) return "warning";
  return "info";
}

function crmTone(value: ProspectCrmStatus | ProspectOpportunityStatus | ProspectOutreachStatus) {
  if (value === "Contact enriched" || value === "Opportunity created" || value === "Conversations queued") return "success";
  if (value === "Lead saved" || value === "Voice AI queued" || value === "Campaign linked") return "info";
  return "neutral";
}

function FilterTile({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ventra-panel rounded-[26px] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function applyProspectAction(
  current: Prospect,
  action: ActionType,
  ownerDraft: string,
): Prospect {
  switch (action) {
    case "save-crm":
      return {
        ...current,
        crmStatus: current.crmStatus === "Not in CRM" ? "Lead saved" : "Contact enriched",
        nextStep: "Create opportunity and route the first outreach action",
      };
    case "create-opportunity":
      return {
        ...current,
        crmStatus: current.crmStatus === "Not in CRM" ? "Lead saved" : current.crmStatus,
        opportunityStatus: "Opportunity created",
        nextStep: "Assign owner and generate the pitch before outreach",
      };
    case "send-conversations":
      return {
        ...current,
        crmStatus: current.crmStatus === "Not in CRM" ? "Lead saved" : current.crmStatus,
        outreachStatus: "Conversations queued",
        nextStep: "Approve the first message sequence in Conversations",
      };
    case "send-voice":
      return {
        ...current,
        crmStatus: current.crmStatus === "Not in CRM" ? "Lead saved" : current.crmStatus,
        outreachStatus: "Voice AI queued",
        nextStep: "Review the call objective and fallback script",
      };
    case "add-campaign":
      return {
        ...current,
        outreachStatus: "Campaign linked",
        nextStep: "Generate a Creative Studio mockup and attach it to the campaign",
      };
    case "assign-owner":
      return {
        ...current,
        owner: ownerDraft,
        nextStep: "Owner assigned. Launch the recommended outreach path",
      };
  }
}

function ActionDialogCopy({ action, prospect }: { action: ActionType; prospect: Prospect }) {
  const copy = {
    "save-crm": {
      title: "Save prospect to CRM",
      detail: `Create a structured lead record for ${prospect.businessName} and expose its score, signals and next revenue action inside the Ventra spine.`,
    },
    "create-opportunity": {
      title: "Create opportunity",
      detail: `Open a pipeline-ready opportunity around ${prospect.suggestedOpportunity.toLowerCase()} so ownership and next step become visible.`,
    },
    "send-conversations": {
      title: "Send to Conversations",
      detail: `Push ${prospect.businessName} into the inbox with the detected pain points and suggested pitch attached.`,
    },
    "send-voice": {
      title: "Send to Voice AI",
      detail: `Queue a Voice AI qualification path for ${prospect.businessName} using the current opportunity angle and score.`,
    },
    "add-campaign": {
      title: "Add to Campaigns",
      detail: `Connect ${prospect.businessName} to a campaign motion so outreach, assets and follow-up stay in one workflow.`,
    },
    "assign-owner": {
      title: "Assign owner",
      detail: `Move ${prospect.businessName} from discovery into owned execution with a clear commercial next step.`,
    },
  }[action];

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Step flow</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Signal mapped", "Revenue destination", "Launch ready"].map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-[#081425] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
              <p className="mt-2 text-sm font-medium text-white">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-medium text-white">{copy.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy.detail}</p>
      </div>
    </div>
  );
}

function ProspectDetail({
  prospect,
  audit,
  onAction,
  onDrawer,
}: {
  prospect: Prospect;
  audit: ProspectAudit;
  onAction: (action: ActionType) => void;
  onDrawer: (mode: Exclude<DrawerMode, null>) => void;
}) {
  const crmState = deriveCrmStatus(prospect.crmStatus, prospect.opportunityStatus, prospect.outreachStatus);

  return (
    <Card className="ventra-card sticky top-24 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Prospect audit 360</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white">{prospect.businessName}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {prospect.category} • {prospect.city}, {prospect.country}
          </p>
        </div>
        <div className="space-y-2 text-right">
          <StatusBadge value={`${prospect.aiScore} AI score`} tone={toneForScore(prospect.aiScore)} />
          <StatusBadge value={prospect.potential} tone={prospect.potential === "Watchlist" ? "neutral" : "success"} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <StatPill label="CRM status" value={prospect.crmStatus} />
        <StatPill label="Next step" value={prospect.nextStep} />
        <StatPill label="Opportunity" value={prospect.opportunityStatus} />
        <StatPill label="Owner" value={prospect.owner ?? "Unassigned"} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100" onClick={() => onAction("save-crm")}>
          Save to CRM
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]" onClick={() => onAction("create-opportunity")}>
          <BriefcaseBusiness className="mr-2 h-4 w-4" />
          Create opportunity
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]" onClick={() => onDrawer("pitch")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate pitch
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]" onClick={() => onDrawer("mockup")}>
          <WandSparkles className="mr-2 h-4 w-4" />
          Generate mockup
        </Button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className={cn("rounded-[24px] border p-4", crmState.inCrm ? "border-emerald-400/20 bg-emerald-400/10" : "border-white/10 bg-white/[0.03]")}>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">CRM sync</p>
          <p className="mt-2 text-sm font-medium text-white">{audit.crmSyncStatus.contact}</p>
        </div>
        <div className={cn("rounded-[24px] border p-4", crmState.hasOpportunity ? "border-cyan-300/20 bg-cyan-300/10" : "border-white/10 bg-white/[0.03]")}>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Revenue motion</p>
          <p className="mt-2 text-sm font-medium text-white">{audit.crmSyncStatus.opportunity}</p>
        </div>
        <div className={cn("rounded-[24px] border p-4", crmState.inOutreach ? "border-violet-300/20 bg-violet-300/10" : "border-white/10 bg-white/[0.03]")}>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Outreach layer</p>
          <p className="mt-2 text-sm font-medium text-white">{audit.crmSyncStatus.outreach}</p>
        </div>
      </div>

      <Tabs defaultValue="audit" className="mt-6">
        <TabsList className="h-auto w-full justify-start rounded-[22px] bg-white/[0.04] p-1">
          <TabsTrigger value="audit" className="rounded-[18px] data-[state=active]:bg-[#081425]">Audit</TabsTrigger>
          <TabsTrigger value="signals" className="rounded-[18px] data-[state=active]:bg-[#081425]">Signals</TabsTrigger>
          <TabsTrigger value="activity" className="rounded-[18px] data-[state=active]:bg-[#081425]">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="audit" className="space-y-4">
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm leading-relaxed text-slate-300">{audit.summary}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {audit.enrichedData.map((item) => (
              <StatPill key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Problems detected</p>
            <div className="mt-4 space-y-3">
              {audit.identifiedProblems.map((problem) => (
                <div key={problem} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#081425] px-4 py-3">
                  <Target className="mt-0.5 h-4 w-4 text-cyan-200" />
                  <p className="text-sm text-slate-300">{problem}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Opportunity angle</p>
            <p className="mt-3 text-sm leading-relaxed text-white">{audit.opportunityAngle}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-slate-500">Recommended Ventra offer</p>
            <p className="mt-2 text-sm text-slate-300">{audit.recommendedOffer}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-slate-500">Suggested outreach message</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{audit.suggestedOutreachMessage}</p>
          </div>
        </TabsContent>
        <TabsContent value="signals" className="space-y-4">
          {audit.detectedSignals.map((signal) => (
            <div key={signal.label} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{signal.label}</p>
                <StatusBadge value={signal.strength} tone={signal.strength === "High" ? "success" : signal.strength === "Medium" ? "warning" : "info"} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{signal.detail}</p>
            </div>
          ))}
          {audit.commercialAudit.map((block) => (
            <div key={block.title} className="rounded-[26px] border border-white/10 bg-[#081425] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{block.title}</p>
                <StatusBadge value="Audit" tone={block.tone} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{block.detail}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          {audit.recentActivity.map((activity) => (
            <div key={activity.id} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">{activity.module}</p>
                <StatusBadge value={activity.outcome} tone={activity.tone} />
              </div>
              <p className="mt-2 text-sm text-white">{activity.detail}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">{activity.time}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export function ProspectorAIPage() {
  const { activeWorkspaceId } = useSession();
  const baseData = useMemo(() => getProspectorWorkspaceData(activeWorkspaceId), [activeWorkspaceId]);
  const [prospects, setProspects] = useState<Prospect[]>(baseData.prospects);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedId, setSelectedId] = useState<string | null>(baseData.prospects[0]?.id ?? null);
  const [actionDialog, setActionDialog] = useState<{ action: ActionType; prospectId: string } | null>(null);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [ownerDraft, setOwnerDraft] = useState(owners[0]);
  const [campaignDraft, setCampaignDraft] = useState(campaigns[0]);
  const deferredQuery = useDeferredValue(filters.query);

  useEffect(() => {
    setProspects(baseData.prospects);
    setSelectedId(baseData.prospects[0]?.id ?? null);
    setFilters(defaultFilters);
  }, [baseData]);

  const auditsById = useMemo(
    () => new Map(baseData.audits.map((audit) => [audit.prospectId, audit])),
    [baseData.audits],
  );

  const filteredProspects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return prospects.filter((prospect) => {
      const queryMatch =
        normalizedQuery.length === 0 ||
        [
          prospect.businessName,
          prospect.category,
          prospect.city,
          prospect.country,
          prospect.industry,
          prospect.niche,
          prospect.suggestedOpportunity,
          ...prospect.digitalSignals,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const industryMatch = filters.industry === "All" || prospect.industry === filters.industry;
      const countryMatch = filters.country === "All" || prospect.country === filters.country;
      const cityMatch = filters.city === "All" || prospect.city === filters.city;
      const sizeMatch = filters.businessSize === "All" || prospect.businessSize === filters.businessSize;
      const websiteMatch =
        filters.website === "any" ||
        (filters.website === "with" ? prospect.hasWebsite : !prospect.hasWebsite);
      const socialMatch =
        filters.socials === "any" ||
        (filters.socials === "active" ? prospect.activeSocials : !prospect.activeSocials);
      const adsMatch =
        filters.ads === "any" || (filters.ads === "active" ? prospect.activeAds : !prospect.activeAds);
      const signalMatch =
        filters.signal === "All" ||
        prospect.digitalSignals.some((signal) => signal.toLowerCase().includes(filters.signal.toLowerCase()));
      const highIntentMatch = !filters.onlyHighIntent || prospect.aiScore >= 88;
      const captureGapMatch =
        !filters.missingCaptureLayer || !prospect.hasWebsite || prospect.digitalSignals.some((signal) => signal.toLowerCase().includes("manual"));

      return (
        queryMatch &&
        industryMatch &&
        countryMatch &&
        cityMatch &&
        sizeMatch &&
        websiteMatch &&
        socialMatch &&
        adsMatch &&
        signalMatch &&
        prospect.aiScore >= filters.minScore &&
        highIntentMatch &&
        captureGapMatch
      );
    });
  }, [deferredQuery, filters, prospects]);

  useEffect(() => {
    if (!filteredProspects.length) return;
    if (!selectedId || !filteredProspects.some((prospect) => prospect.id === selectedId)) {
      setSelectedId(filteredProspects[0].id);
    }
  }, [filteredProspects, selectedId]);

  const selectedProspect = filteredProspects.find((prospect) => prospect.id === selectedId) ?? prospects.find((prospect) => prospect.id === selectedId) ?? filteredProspects[0] ?? prospects[0] ?? null;
  const selectedAudit = selectedProspect ? auditsById.get(selectedProspect.id) ?? null : null;

  const overview = useMemo(() => {
    const highPotential = prospects.filter((prospect) => prospect.aiScore >= 88).length;
    const opportunities = prospects.filter((prospect) => prospect.aiScore >= 80 || prospect.opportunityStatus === "Opportunity created").length;
    const sentToCrm = prospects.filter((prospect) => prospect.crmStatus !== "Not in CRM").length;
    const sentToConversations = prospects.filter((prospect) => prospect.outreachStatus === "Conversations queued").length;
    const sentToVoice = prospects.filter((prospect) => prospect.outreachStatus === "Voice AI queued").length;

    return { highPotential, opportunities, sentToCrm, sentToConversations, sentToVoice };
  }, [prospects]);

  const industries = useMemo(() => [...new Set(prospects.map((prospect) => prospect.industry))], [prospects]);
  const countries = useMemo(() => [...new Set(prospects.map((prospect) => prospect.country))], [prospects]);
  const cities = useMemo(() => [...new Set(prospects.map((prospect) => prospect.city))], [prospects]);

  const openAction = (action: ActionType, prospectId = selectedProspect?.id) => {
    if (!prospectId) return;
    const prospect = prospects.find((item) => item.id === prospectId);
    setOwnerDraft(prospect?.owner ?? owners[0]);
    setActionDialog({ action, prospectId });
  };

  const confirmAction = () => {
    if (!actionDialog) return;
    setProspects((current) =>
      current.map((prospect) =>
        prospect.id === actionDialog.prospectId ? applyProspectAction(prospect, actionDialog.action, ownerDraft) : prospect,
      ),
    );
    toast.success("Prospect workflow updated", {
      description: `${selectedProspect?.businessName ?? "Prospect"} moved deeper into the Ventra revenue workflow.`,
    });
    setActionDialog(null);
  };

  const applySavedSearch = (savedSearch: ProspectorSavedSearch) => {
    setFilters({
      query: savedSearch.query,
      industry: savedSearch.industry,
      country: savedSearch.country,
      city: savedSearch.city,
      businessSize: savedSearch.businessSize,
      website: savedSearch.website,
      socials: savedSearch.socials,
      ads: savedSearch.ads,
      minScore: savedSearch.minScore,
      signal: savedSearch.signal,
      onlyHighIntent: savedSearch.minScore >= 88,
      missingCaptureLayer: savedSearch.website === "without",
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Prospector AI"
        title="Discover high-potential businesses before outreach even starts"
        description="Prospector AI turns market signals into CRM-ready opportunities, surfacing who to target, why they matter and how to activate them across Conversations, Voice AI, Campaigns and Creative Studio."
        icon={ScanSearch}
        actions={
          <>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
              <Link to="/app/acquisition">Back to acquisition</Link>
            </Button>
            <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100" onClick={() => toast.success("Search refreshed", { description: "Prospector AI reran the active market scan with the current filters." })}>
              <Sparkles className="mr-2 h-4 w-4" />
              Run market scan
            </Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="ventra-card overflow-hidden p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                Revenue radar
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-white">
                Move prospects into your revenue workflow with commercial context already mapped.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                Discover high-potential businesses, detect commercial pain before outreach and push the right account into CRM, Conversations, Voice AI or Creative Studio without leaving Acquisition.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Acquisition", "CRM spine", "Conversations", "Voice AI", "Campaigns", "Creative Studio"].map((item) => (
                  <StatusBadge key={item} value={item} tone="info" />
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-[28px] border border-white/10 bg-[#081425] p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Current workspace</p>
                <p className="mt-2 text-xl font-semibold text-white">{baseData.workspaceName}</p>
                <p className="mt-2 text-sm text-slate-400">Prospector AI is feeding the top of funnel with enriched accounts, fit scores and action-ready pain points.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <StatPill label="Saved searches" value={`${baseData.savedSearches.length}`} />
                <StatPill label="Results in view" value={`${filteredProspects.length}`} />
                <StatPill label="Top industry" value={baseData.topIndustries[0]?.label ?? "Mixed"} />
                <StatPill label="Top location" value={baseData.topLocations[0]?.label ?? "LATAM"} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="ventra-card p-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Quick insights</p>
          <div className="mt-4 space-y-3">
            {baseData.quickInsights.map((insight) => (
              <div key={insight} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-300">
                {insight}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total prospects found" value={`${prospects.length}`} delta="Discovery layer active" icon={Building2} />
        <MetricCard label="High potential prospects" value={`${overview.highPotential}`} delta="Score 88+ in this workspace" icon={Target} />
        <MetricCard label="Opportunities identified" value={`${overview.opportunities}`} delta="Revenue angles already mapped" icon={BriefcaseBusiness} />
        <MetricCard label="Prospects sent to CRM" value={`${overview.sentToCrm}`} delta="CRM spine visibility on" icon={Workflow} />
        <MetricCard label="Sent to Conversations" value={`${overview.sentToConversations}`} delta="Inbox-ready accounts" icon={MessageSquareMore} />
        <MetricCard label="Sent to Voice AI" value={`${overview.sentToVoice}`} delta="Call queue candidates" icon={PhoneCall} />
        <MetricCard label="Top industries" value={`${baseData.topIndustries.length}`} delta={baseData.topIndustries.map((item) => item.label).join(" • ")} icon={Megaphone} />
        <MetricCard label="Top locations" value={`${baseData.topLocations.length}`} delta={baseData.topLocations.map((item) => item.label).join(" • ")} icon={MapPin} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="ventra-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Search experience</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">Build premium acquisition searches with real commercial intent</h2>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]" onClick={() => setFilters(defaultFilters)}>
              Reset filters
            </Button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <FilterTile label="Keywords" description="Search by business, niche, city, opportunity angle or detected signal.">
              <Input value={filters.query} onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))} placeholder="e.g. relocation, proposal gap, Lima brokers" className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            </FilterTile>
            <FilterTile label="Potential threshold" description="Keep only prospects with the right score band for demo-grade pipeline moves.">
              <Select value={`${filters.minScore}`} onValueChange={(value) => setFilters((current) => ({ ...current, minScore: Number(value) }))}>
                <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                  <SelectItem value="70">70+ score</SelectItem>
                  <SelectItem value="80">80+ score</SelectItem>
                  <SelectItem value="88">88+ score</SelectItem>
                  <SelectItem value="92">92+ score</SelectItem>
                </SelectContent>
              </Select>
            </FilterTile>
            <FilterTile label="Geography" description="Zoom by country and city without losing multi-market visibility.">
              <div className="grid gap-3 sm:grid-cols-2">
                <Select value={filters.country} onValueChange={(value) => setFilters((current) => ({ ...current, country: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue placeholder="Country" /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="All">All countries</SelectItem>
                    {countries.map((country) => <SelectItem key={country} value={country}>{country}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filters.city} onValueChange={(value) => setFilters((current) => ({ ...current, city: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue placeholder="City" /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="All">All cities</SelectItem>
                    {cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </FilterTile>
            <FilterTile label="Industry and size" description="Filter by vertical, niche and business size to sharpen your ICP.">
              <div className="grid gap-3 sm:grid-cols-2">
                <Select value={filters.industry} onValueChange={(value) => setFilters((current) => ({ ...current, industry: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue placeholder="Industry" /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="All">All industries</SelectItem>
                    {industries.map((industry) => <SelectItem key={industry} value={industry}>{industry}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filters.businessSize} onValueChange={(value) => setFilters((current) => ({ ...current, businessSize: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue placeholder="Business size" /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="All">All sizes</SelectItem>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="SMB">SMB</SelectItem>
                    <SelectItem value="Mid-market">Mid-market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FilterTile>
          </div>
        </Card>

        <Card className="ventra-card p-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Digital signals and advanced filters</p>
          <div className="mt-4 space-y-4">
            <FilterTile label="Web posture" description="Separate accounts with owned funnels from those still selling through manual channels.">
              <Select value={filters.website} onValueChange={(value: FilterState["website"]) => setFilters((current) => ({ ...current, website: value }))}>
                <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                  <SelectItem value="any">Website or no website</SelectItem>
                  <SelectItem value="with">Has website</SelectItem>
                  <SelectItem value="without">No website</SelectItem>
                </SelectContent>
              </Select>
            </FilterTile>
            <div className="grid gap-4 sm:grid-cols-2">
              <FilterTile label="Social activity" description="Prioritize accounts with visible distribution channels.">
                <Select value={filters.socials} onValueChange={(value: FilterState["socials"]) => setFilters((current) => ({ ...current, socials: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="any">Any social state</SelectItem>
                    <SelectItem value="active">Active socials</SelectItem>
                    <SelectItem value="inactive">No socials</SelectItem>
                  </SelectContent>
                </Select>
              </FilterTile>
              <FilterTile label="Paid demand" description="Find businesses already spending and likely leaking demand.">
                <Select value={filters.ads} onValueChange={(value: FilterState["ads"]) => setFilters((current) => ({ ...current, ads: value }))}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                    <SelectItem value="any">Any ad state</SelectItem>
                    <SelectItem value="active">Active ads</SelectItem>
                    <SelectItem value="inactive">No ads</SelectItem>
                  </SelectContent>
                </Select>
              </FilterTile>
            </div>
            <FilterTile label="Signal cluster" description="Surface prospects with a specific commercial pain already detected.">
              <Select value={filters.signal} onValueChange={(value) => setFilters((current) => ({ ...current, signal: value }))}>
                <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                  <SelectItem value="All">All signals</SelectItem>
                  <SelectItem value="No website">No website</SelectItem>
                  <SelectItem value="Paid demand">Paid demand</SelectItem>
                  <SelectItem value="manual">Manual intake</SelectItem>
                  <SelectItem value="proposal">Proposal gap</SelectItem>
                </SelectContent>
              </Select>
            </FilterTile>
            <div className="space-y-3 rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
              {[
                {
                  checked: filters.onlyHighIntent,
                  label: "Only high-intent prospects",
                  description: "Keep only AI score 88+ accounts ready for premium outreach.",
                  onCheckedChange: (checked: boolean) => setFilters((current) => ({ ...current, onlyHighIntent: checked })),
                },
                {
                  checked: filters.missingCaptureLayer,
                  label: "Missing capture layer",
                  description: "Show businesses with no website or manual intake gaps.",
                  onCheckedChange: (checked: boolean) => setFilters((current) => ({ ...current, missingCaptureLayer: checked })),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#081425] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                  </div>
                  <Switch checked={item.checked} onCheckedChange={item.onCheckedChange} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <Card className="ventra-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Saved searches</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">Reusable market scans for the premium demo flow</h2>
              </div>
              <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
                Save current search
              </Button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {baseData.savedSearches.map((savedSearch) => (
                <button key={savedSearch.id} type="button" onClick={() => applySavedSearch(savedSearch)} className="text-left">
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{savedSearch.name}</p>
                      <StatusBadge value={`${savedSearch.matched} matches`} tone="info" />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{savedSearch.description}</p>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-slate-500">Last run {savedSearch.lastRun}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="ventra-card overflow-hidden p-0">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Results view</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">Prospects prioritized for CRM and outreach activation</h2>
            </div>
            <div className="hidden grid-cols-[1.4fr_0.95fr_1.05fr_0.9fr_0.8fr_92px] gap-4 border-b border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-slate-500 xl:grid">
              <span>Business</span>
              <span>Opportunity</span>
              <span>Signals detected</span>
              <span>CRM status</span>
              <span>Owner</span>
              <span>Actions</span>
            </div>
            <div className="space-y-0">
              {filteredProspects.length ? (
                filteredProspects.map((prospect) => (
                  <div key={prospect.id} className={cn("border-b border-white/10 px-6 py-5 transition last:border-b-0", selectedId === prospect.id ? "bg-cyan-300/[0.08]" : "hover:bg-white/[0.03]")}>
                    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.95fr_1.05fr_0.9fr_0.8fr_92px]">
                      <button type="button" onClick={() => setSelectedId(prospect.id)} className="text-left">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#081425]">
                            <Building2 className="h-5 w-5 text-cyan-200" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium text-white">{prospect.businessName}</p>
                              <StatusBadge value={`${prospect.aiScore}`} tone={toneForScore(prospect.aiScore)} />
                            </div>
                            <p className="mt-1 text-sm text-slate-400">{prospect.category} • {prospect.city}, {prospect.country}</p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                              <span>{prospect.website ?? "No website"}</span>
                              <span>{prospect.phone ?? "No phone"}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div>
                        <p className="font-medium text-white">{prospect.suggestedOpportunity}</p>
                        <p className="mt-2 text-sm text-slate-400">{prospect.recommendedOffer}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {prospect.digitalSignals.slice(0, 3).map((signal) => (
                          <StatusBadge key={signal} value={signal} tone="neutral" />
                        ))}
                      </div>
                      <div className="space-y-2">
                        <StatusBadge value={prospect.crmStatus} tone={crmTone(prospect.crmStatus)} />
                        <StatusBadge value={prospect.opportunityStatus} tone={crmTone(prospect.opportunityStatus)} />
                        <StatusBadge value={prospect.outreachStatus} tone={crmTone(prospect.outreachStatus)} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-white">{prospect.owner ?? "Unassigned"}</p>
                        <p className="text-sm text-slate-400">{prospect.nextStep}</p>
                      </div>
                      <div className="flex items-start justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-2xl border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 border-white/10 bg-[#071121] text-slate-100">
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("save-crm", prospect.id)}>Save to CRM</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("create-opportunity", prospect.id)}>Create opportunity</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("send-conversations", prospect.id)}>Send to Conversations</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("send-voice", prospect.id)}>Send to Voice AI</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("add-campaign", prospect.id)}>Add to Campaign</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => { setSelectedId(prospect.id); setDrawerMode("audit"); }}>Open audit</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => { setSelectedId(prospect.id); setDrawerMode("pitch"); }}>Generate pitch</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => { setSelectedId(prospect.id); setDrawerMode("mockup"); }}>Generate mockup</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/[0.05]" onClick={() => openAction("assign-owner", prospect.id)}>Assign owner</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6">
                  <EmptyState icon={ScanSearch} title="No prospects match this search" description="Relax the filters or run a broader market scan to surface fresh businesses and opportunity angles." />
                </div>
              )}
            </div>
          </Card>
        </div>

        {selectedProspect && selectedAudit ? (
          <ProspectDetail
            prospect={selectedProspect}
            audit={selectedAudit}
            onAction={openAction}
            onDrawer={setDrawerMode}
          />
        ) : (
          <EmptyState icon={Bot} title="No audit selected" description="Select a prospect from the results view to inspect the commercial audit, CRM sync status and next activation path." />
        )}
      </div>

      <Dialog open={Boolean(actionDialog)} onOpenChange={(open) => !open && setActionDialog(null)}>
        <DialogContent className="border-white/10 bg-[#071121] text-slate-100 sm:max-w-2xl">
          {actionDialog ? (
            <>
              <DialogHeader>
                <DialogTitle>{actionDialog.action.replace("-", " ")}</DialogTitle>
              </DialogHeader>
              {selectedProspect ? <ActionDialogCopy action={actionDialog.action} prospect={prospects.find((item) => item.id === actionDialog.prospectId) ?? selectedProspect} /> : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <FilterTile label="Owner" description="Assign commercial ownership before launch.">
                  <Select value={ownerDraft} onValueChange={setOwnerDraft}>
                    <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                      {owners.map((owner) => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FilterTile>
                <FilterTile label="Campaign" description="Optional destination for campaign-linked motions.">
                  <Select value={campaignDraft} onValueChange={setCampaignDraft}>
                    <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#071121] text-slate-100">
                      {campaigns.map((campaign) => <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FilterTile>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]" onClick={() => setActionDialog(null)}>
                  Cancel
                </Button>
                <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100" onClick={confirmAction}>
                  Confirm action
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Drawer open={Boolean(drawerMode)} onOpenChange={(open) => !open && setDrawerMode(null)}>
        <DrawerContent className="max-h-[92vh] border-white/10 bg-[#071121] text-slate-100">
          <DrawerHeader className="px-6 pt-6">
            <DrawerTitle className="font-display text-2xl text-white">
              {drawerMode === "audit" ? "Prospect audit drawer" : drawerMode === "pitch" ? "Generated pitch" : "Creative Studio mockup brief"}
            </DrawerTitle>
            <DrawerDescription className="text-slate-400">
              {selectedProspect ? selectedProspect.businessName : "Selected prospect"}
            </DrawerDescription>
          </DrawerHeader>
          {selectedProspect && selectedAudit ? (
            <div className="overflow-y-auto px-6 pb-8">
              <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Summary</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {drawerMode === "audit" ? selectedAudit.summary : drawerMode === "pitch" ? selectedAudit.pitchNarrative : selectedAudit.creativePrompt}
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-[#081425] p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Recommended next step</p>
                  <p className="mt-3 text-sm font-medium text-white">{selectedProspect.nextStep}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <StatusBadge value={selectedProspect.crmStatus} tone={crmTone(selectedProspect.crmStatus)} />
                    <StatusBadge value={selectedProspect.opportunityStatus} tone={crmTone(selectedProspect.opportunityStatus)} />
                    <StatusBadge value={selectedProspect.outreachStatus} tone={crmTone(selectedProspect.outreachStatus)} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
