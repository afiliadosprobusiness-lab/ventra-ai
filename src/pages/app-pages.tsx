import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  AudioWaveform,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  Clock3,
  Filter,
  LayoutTemplate,
  MessageSquareMore,
  PhoneCall,
  Plus,
  ScanSearch,
  Settings,
  Sparkles,
  Target,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/common/empty-state";
import { FilterPill } from "@/components/common/filter-pill";
import { MetricCard } from "@/components/common/metric-card";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import {
  acquisitionSources,
  getContactCampaignTouches,
  getContactTasks,
  getContactTimeline,
  getWorkspaceData,
  performanceSeries,
  type Contact,
  type Deal,
  type Thread,
  type Widget,
} from "@/data/mock-data";
import { getProspectorWorkspaceData } from "@/data/prospector-data";
import { useSession } from "@/lib/session";
import { ProspectorAIPage } from "@/modules/prospector/prospector-page";

function toneForStatus(value: string): "success" | "warning" | "info" | "neutral" | "danger" {
  if (["Live", "Ready", "Active", "Won", "Completed", "Hot", "Scale", "Recovered", "Configured"].includes(value)) return "success";
  if (["Optimizing", "Waiting", "Warm", "Review", "Proposal", "Scaling", "Paused", "Today", "Now"].includes(value)) return "warning";
  if (["Draft", "Discovery", "Scheduled", "Queued", "Growth", "Qualified"].includes(value)) return "info";
  return "neutral";
}

function GlassBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Card className={`ventra-card ${className}`}>{children}</Card>;
}

function MiniStat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
      {detail ? <p className="mt-1 text-xs text-slate-400">{detail}</p> : null}
    </div>
  );
}

function toneForPotential(value: string): "success" | "warning" | "info" | "neutral" {
  if (value === "High potential") return "success";
  if (value === "Expansion fit") return "info";
  return "neutral";
}

function QuickActionTile({
  to,
  icon: Icon,
  label,
  detail,
}: {
  to: string;
  icon: typeof ScanSearch;
  label: string;
  detail: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-cyan-300/20 hover:bg-white/[0.05]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/10 bg-[#0b1626]">
            <Icon className="h-4 w-4 text-cyan-200" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="mt-1 text-xs text-slate-400">{detail}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-200" />
      </div>
    </Link>
  );
}

function getProspectorBridge(data: ReturnType<typeof getWorkspaceData>) {
  const prospector = getProspectorWorkspaceData(data.workspace.id);
  const prospectsById = new Map(prospector.prospects.map((prospect) => [prospect.id, prospect]));
  const sourcedContacts = data.contacts.filter((contact) => contact.originModule === "Prospector AI" || contact.prospectId);
  const sourcedDeals = data.deals.filter((deal) => deal.originModule === "Prospector AI" || deal.prospectId);
  const sourcedCalls = data.voiceCalls.filter((call) => call.originModule === "Prospector AI");
  const sourcedThreads = data.threads.filter((thread) => thread.originModule === "Prospector AI");
  const linkedCampaigns = data.campaigns.filter((campaign) => campaign.linkedProspectIds?.length);
  const linkedCreativeProjects = data.creativeProjects.filter((project) => project.linkedProspectIds?.length);
  const crmReady = prospector.prospects.filter((prospect) => prospect.crmStatus !== "Not in CRM");
  const opportunitiesReady = prospector.prospects.filter((prospect) => prospect.opportunityStatus === "Opportunity created");
  const conversationQueue = prospector.prospects.filter((prospect) => prospect.outreachStatus === "Conversations queued");
  const voiceQueue = prospector.prospects.filter((prospect) => prospect.outreachStatus === "Voice AI queued");
  const campaignQueue = prospector.prospects.filter((prospect) => prospect.outreachStatus === "Campaign linked");
  const creativeQueue = prospector.prospects.filter(
    (prospect) => prospect.recommendedOffer.includes("Creative Studio") || prospect.outreachStatus === "Campaign linked",
  );

  return {
    prospector,
    prospectsById,
    sourcedContacts,
    sourcedDeals,
    sourcedCalls,
    sourcedThreads,
    linkedCampaigns,
    linkedCreativeProjects,
    crmReady,
    opportunitiesReady,
    conversationQueue,
    voiceQueue,
    campaignQueue,
    creativeQueue,
  };
}

function TimelineFeed({ contactId, compact = false }: { contactId: string; compact?: boolean }) {
  const timeline = getContactTimeline(contactId);

  return (
    <div className="space-y-3">
      {timeline.map((item) => (
        <div key={item.id} className={`rounded-[18px] border border-white/10 bg-white/[0.03] ${compact ? "px-4 py-3" : "px-4 py-4"}`}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">{item.module}</p>
            <StatusBadge value={item.outcome} tone={item.tone} />
          </div>
          <p className="mt-2 font-medium text-white">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">{item.time}</p>
        </div>
      ))}
    </div>
  );
}

function useContact360(data: ReturnType<typeof getWorkspaceData>, contactId: string | null | undefined) {
  return useMemo(() => {
    const contact = data.contacts.find((item) => item.id === contactId) ?? data.contacts[0] ?? null;
    if (!contact) return null;
    const lead = data.leads.find((item) => item.id === contact.leadId) ?? null;
    const prospectsById = new Map(getProspectorWorkspaceData(data.workspace.id).prospects.map((prospect) => [prospect.id, prospect]));

    return {
      contact,
      lead,
      prospect: prospectsById.get(contact.prospectId ?? lead?.prospectId ?? "") ?? null,
      thread: data.threads.find((item) => item.contactId === contact.id) ?? null,
      deal: data.deals.find((item) => item.contactId === contact.id) ?? null,
      calls: data.voiceCalls.filter((item) => item.contactId === contact.id),
      tasks: getContactTasks(contact.id),
      touches: getContactCampaignTouches(contact.id),
    };
  }, [contactId, data]);
}

function ContactRecord({ record }: { record: NonNullable<ReturnType<typeof useContact360>> }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-white/10 bg-[#0b1626] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">Selected contact</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">{record.contact.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{record.contact.company} | {record.contact.city}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge value={record.contact.originModule ?? "Inbound"} tone={record.contact.originModule === "Prospector AI" ? "success" : "info"} />
              {record.contact.originLabel ? <StatusBadge value={record.contact.originLabel} tone="neutral" /> : null}
              {record.prospect ? <StatusBadge value={record.prospect.potential} tone={toneForPotential(record.prospect.potential)} /> : null}
            </div>
          </div>
          <StatusBadge value={record.contact.health} tone={toneForStatus(record.contact.health)} />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MiniStat label="Channel" value={record.contact.channel} />
          <MiniStat label="Stage" value={record.contact.pipelineStage} />
          <MiniStat label="Owner" value={record.contact.owner} />
          <MiniStat label="Value" value={record.contact.value} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassBlock className="p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">CRM backbone</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <MiniStat label="Lead source" value={record.lead?.source ?? "Unknown"} detail={record.lead ? `${record.lead.score} score` : undefined} />
            <MiniStat label="Origin layer" value={record.contact.originModule ?? "Inbound"} detail={record.contact.originLabel ?? "Captured inside the workspace"} />
            <MiniStat label="Opportunity" value={record.deal?.stage ?? "No deal"} detail={record.deal?.nextStep ?? record.prospect?.suggestedOpportunity} />
            <MiniStat label="Conversation" value={record.thread?.status ?? "Not opened"} detail={record.thread?.channel} />
            <MiniStat label="Voice AI" value={record.calls[0]?.status ?? "No call"} detail={record.calls[0]?.objective} />
            <MiniStat label="Campaign touch" value={record.touches[0]?.label ?? "Not linked"} detail={record.touches[0]?.impact} />
          </div>
        </GlassBlock>

        <GlassBlock className="p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Next best actions</p>
          <div className="mt-4 space-y-3">
            {record.tasks.map((task) => (
              <div key={task.id} className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{task.title}</p>
                  <StatusBadge value={task.status} tone={toneForStatus(task.status)} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{task.owner} | {task.due}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {record.deal ? (
              <QuickActionTile
                to={`/app/pipeline/${record.deal.id}`}
                icon={BriefcaseBusiness}
                label="Open opportunity"
                detail={record.deal.originModule === "Prospector AI" ? "Prospector-sourced deal detail" : "Review stage, owner and next step"}
              />
            ) : null}
            {record.thread ? (
              <QuickActionTile
                to={`/app/conversations/${record.thread.id}`}
                icon={MessageSquareMore}
                label="Continue conversation"
                detail={record.thread.originModule === "Prospector AI" ? "Resume the prospecting handoff thread" : "Open the linked inbox thread"}
              />
            ) : null}
            {record.calls[0] ? (
              <QuickActionTile
                to={`/app/voice-ai/calls/${record.calls[0].id}`}
                icon={AudioWaveform}
                label="Open Voice AI"
                detail={record.calls[0].originModule === "Prospector AI" ? "Review the concierge call queued from discovery" : "Inspect the latest call summary"}
              />
            ) : null}
            {record.prospect ? (
              <QuickActionTile
                to="/app/acquisition/prospector-ai"
                icon={ScanSearch}
                label="Return to Prospector AI"
                detail="Inspect the original audit, offer and recommended outreach path"
              />
            ) : null}
          </div>
        </GlassBlock>
      </div>
    </div>
  );
}

export function OverviewPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);
  const primaryContactId = prospectorBridge.sourcedContacts[0]?.id ?? data.contacts[0]?.id;
  const record = useContact360(data, primaryContactId);
  const timelineContactId = prospectorBridge.sourcedContacts[0]?.id ?? data.contacts[0]?.id;

  return (
    <>
      <PageHeader
        eyebrow="Growth OS overview"
        title={`Operate ${data.workspace.name} from one commercial system`}
        description="This command center now makes the central contact record visible across acquisition, conversations, Voice AI, pipeline and launch assets."
        icon={Activity}
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <MetricCard key={metric.id} label={metric.label} value={metric.value} delta={metric.delta} trend={metric.trend} icon={[Target, MessageSquareMore, BriefcaseBusiness, AudioWaveform][index] ?? Activity} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassBlock className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Prospector AI pulse</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">Net-new discovery is now visible in the operating overview</h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
              <Link to="/app/acquisition/prospector-ai">Open Prospector AI</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <MiniStat label="Prospects found" value={`${prospectorBridge.prospector.prospects.length}`} detail="Saved searches and audits connected" />
            <MiniStat label="Saved to CRM" value={`${prospectorBridge.crmReady.length}`} detail="Accounts now visible in Contacts" />
            <MiniStat label="Open opportunities" value={`${prospectorBridge.opportunitiesReady.length}`} detail="Strategic accounts already routed" />
            <MiniStat label="Outreach live" value={`${prospectorBridge.conversationQueue.length + prospectorBridge.voiceQueue.length}`} detail="Conversations and Voice AI queues" />
          </div>
          <div className="mt-6 space-y-3">
            {prospectorBridge.sourcedContacts.slice(0, 2).map((contact) => {
              const prospect = contact.prospectId ? prospectorBridge.prospectsById.get(contact.prospectId) : null;
              const deal = data.deals.find((item) => item.contactId === contact.id);
              return (
                <div key={contact.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{contact.company}</p>
                      <p className="mt-1 text-sm text-slate-400">{contact.originLabel ?? prospect?.suggestedOpportunity ?? "Prospector-sourced motion"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge value={contact.originModule ?? "Inbound"} tone="success" />
                      {deal ? <StatusBadge value={deal.stage} tone={toneForStatus(deal.stage)} /> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Cross-module launchpad</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">Quick actions now follow the same prospecting motion</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickActionTile to="/app/contacts/con-4" icon={Users} label="Open sourced contact" detail="Review the account record created from Prospector AI" />
            <QuickActionTile to="/app/pipeline/deal-4" icon={BriefcaseBusiness} label="Open partner opportunity" detail="Inspect the prospect-origin deal detail and next action" />
            <QuickActionTile to="/app/conversations/thr-3" icon={MessageSquareMore} label="Continue partner thread" detail="Resume the live conversation opened from the audit" />
            <QuickActionTile to="/app/campaigns/camp-3" icon={ChartColumnIncreasing} label="Review partner campaign" detail="See the campaign, pitch and influenced pipeline tied to discovery" />
          </div>
        </GlassBlock>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassBlock className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Commercial velocity</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">How acquisition becomes revenue movement</h2>
            </div>
            <div className="flex gap-2">
              <FilterPill active>30d</FilterPill>
              <FilterPill>90d</FilterPill>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="prospectorGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.34} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="acquisitionGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3BB9FF" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#3BB9FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.42} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: "rgba(255,255,255,0.06)" }} contentStyle={{ background: "#071121", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
                <Area type="monotone" dataKey="prospector" stroke="#f59e0b" fill="url(#prospectorGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="acquisition" stroke="#3BB9FF" fill="url(#acquisitionGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="url(#revenueGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Contact spotlight</p>
          {record ? <ContactRecord record={record} /> : null}
        </GlassBlock>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassBlock className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Top pipeline deals</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">Priority deals with next action visible</h2>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">Open pipeline</Button>
          </div>
          <div className="mt-6 space-y-3">
            {data.deals.map((deal) => (
              <div key={deal.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{deal.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{deal.nextStep}</p>
                    {deal.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{deal.originModule} | {deal.originLabel}</p> : null}
                  </div>
                  <StatusBadge value={deal.stage} tone={toneForStatus(deal.stage)} />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                  <span>{deal.value}</span>
                  <span>{deal.probability}% probability</span>
                </div>
              </div>
            ))}
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Unified timeline preview</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">Prospector AI activity now lands in the same account timeline</h2>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">View contacts</Button>
          </div>
          {timelineContactId ? <div className="mt-6"><TimelineFeed contactId={timelineContactId} compact /></div> : null}
        </GlassBlock>
      </div>
    </>
  );
}

export function AcquisitionPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospector = getProspectorWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);

  return (
    <>
      <PageHeader
        eyebrow="Acquisition system"
        title="Control every entry point of demand"
        description="Acquisition now reads as the front door of the CRM backbone: score the lead, create the contact and route the next action with no dead-end modules."
        icon={Target}
        actions={
          <>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
              <Link to="/app/acquisition/prospector-ai">
                <ScanSearch className="mr-2 h-4 w-4" />
                Open Prospector AI
              </Link>
            </Button>
            <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
              <Plus className="mr-2 h-4 w-4" />
              New funnel
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Prospector-ready accounts" value={`${prospector.prospects.filter((item) => item.aiScore >= 88).length}`} delta="+3 routed today" icon={ScanSearch} />
        <MetricCard label="New qualified leads" value={`${data.leads.length}`} delta="+18% week over week" icon={Target} />
        <MetricCard label="Quiz conversion rate" value="58%" delta="+7.4%" icon={Sparkles} />
        <MetricCard label="Widget to conversation" value="42%" delta="+4.1%" icon={MessageSquareMore} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassBlock className="overflow-hidden p-6 xl:col-span-2">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Prospector AI</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white">Acquisition now discovers net-new businesses, not only incoming leads</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                Prospector AI adds a premium discovery layer to Acquisition, turning market signals into ready-to-activate prospects that can move into CRM, Conversations, Voice AI, Campaigns or Creative Studio with one action.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MiniStat label="Prospects found" value={`${prospector.prospects.length}`} />
                <MiniStat label="High potential" value={`${prospector.prospects.filter((item) => item.aiScore >= 88).length}`} />
                <MiniStat label="Saved searches" value={`${prospector.savedSearches.length}`} />
              </div>
            </div>
            <div className="space-y-3">
              {prospector.prospects.slice(0, 3).map((prospect) => (
                <div key={prospect.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{prospect.businessName}</p>
                      <p className="text-sm text-slate-400">{prospect.suggestedOpportunity}</p>
                    </div>
                    <StatusBadge value={`${prospect.aiScore}`} tone={toneForStatus(prospect.aiScore >= 90 ? "Ready" : "Qualified")} />
                  </div>
                </div>
              ))}
              <Button asChild className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">
                <Link to="/app/acquisition/prospector-ai">Launch Prospector AI</Link>
              </Button>
            </div>
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Source performance</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Source</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Qualified</TableHead>
                  <TableHead>CPA</TableHead>
                  <TableHead>Intent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {acquisitionSources.map((item) => (
                  <TableRow key={item.source} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell className="font-medium text-white">{item.source}</TableCell>
                    <TableCell className="text-slate-300">{item.leads}</TableCell>
                    <TableCell className="text-slate-300">{item.qualified}</TableCell>
                    <TableCell className="text-slate-300">{item.cpa}</TableCell>
                    <TableCell><StatusBadge value={item.intent} tone={item.intent.includes("Very") ? "success" : "info"} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Lead to CRM handoff</p>
          <div className="mt-5 space-y-3">
            {data.leads.map((lead) => {
              const contact = data.contacts.find((item) => item.leadId === lead.id);
              const deal = data.deals.find((item) => item.contactId === contact?.id);
              return (
                <div key={lead.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-sm text-slate-400">{lead.source}</p>
                      {lead.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{lead.originModule} | {lead.originLabel}</p> : null}
                    </div>
                    <StatusBadge value={`${lead.score} score`} tone={lead.score > 85 ? "success" : "warning"} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <MiniStat label="Lead stage" value={lead.stage} />
                    <MiniStat label="Contact record" value={contact?.channel ?? "Pending"} />
                    <MiniStat label="Deal state" value={deal?.stage ?? "No deal yet"} detail={deal?.nextStep} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassBlock>

        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Prospector activation lanes</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <QuickActionTile to="/app/conversations" icon={MessageSquareMore} label={`${prospectorBridge.conversationQueue.length} queued for Conversations`} detail="Prospector accounts ready for human follow-up and inbox handoff" />
            <QuickActionTile to="/app/voice-ai" icon={AudioWaveform} label={`${prospectorBridge.voiceQueue.length} queued for Voice AI`} detail="Strategic accounts prepared for concierge or qualification calls" />
            <QuickActionTile to="/app/campaigns/camp-3" icon={ChartColumnIncreasing} label={`${prospectorBridge.campaignQueue.length} linked to Campaigns`} detail="Pitch and outreach motions already tied to discovery" />
            <QuickActionTile to="/app/creative-studio" icon={Sparkles} label={`${prospectorBridge.creativeQueue.length} need creative proof`} detail="Generate proposals and mockups without leaving Acquisition" />
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

export { ProspectorAIPage };

export function WidgetsPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(data.widgets[0] ?? null);

  return (
    <>
      <PageHeader
        eyebrow="Widgets"
        title="High-conversion capture surfaces"
        description="Widgets now position themselves as CRM entry points: every conversion should create a cleaner handoff into contacts, conversations and pipeline."
        icon={LayoutTemplate}
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
                <Plus className="mr-2 h-4 w-4" />
                Create widget
              </Button>
            </DialogTrigger>
            <DialogContent className="border-white/10 bg-[#071121] text-white">
              <DialogHeader>
                <DialogTitle>Create a premium widget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Widget name" className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
                <Textarea placeholder="Primary value proposition" className="min-h-[120px] rounded-2xl border-white/10 bg-white/[0.04] text-white" />
                <Button className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">Save draft</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {data.widgets.map((widget) => (
          <button key={widget.id} type="button" onClick={() => setSelectedWidget(widget)} className="text-left">
            <GlassBlock className="h-full p-6 transition hover:border-cyan-300/20">
              <div className="flex items-center justify-between">
                <StatusBadge value={widget.status} tone={toneForStatus(widget.status)} />
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{widget.type}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">{widget.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{widget.source}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat label="Conversions" value={widget.conversions} />
                <MiniStat label="CVR" value={widget.conversionRate} />
              </div>
            </GlassBlock>
          </button>
        ))}
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-fit rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
            Open widget detail
          </Button>
        </DrawerTrigger>
        <DrawerContent className="border-white/10 bg-[#071121] text-white">
          <DrawerHeader>
            <DrawerTitle>{selectedWidget?.name ?? "Widget detail"}</DrawerTitle>
          </DrawerHeader>
          <div className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassBlock className="p-4">
              <img src="/ui-reference/editor-layout-01.png" alt="Editor reference" className="rounded-2xl" />
            </GlassBlock>
            <div className="space-y-4">
              <GlassBlock className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Widget profile</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MiniStat label="Status" value={selectedWidget?.status ?? "Draft"} />
                  <MiniStat label="Type" value={selectedWidget?.type ?? "Multi-step"} />
                  <MiniStat label="Conversions" value={selectedWidget?.conversions ?? "0"} />
                  <MiniStat label="Rate" value={selectedWidget?.conversionRate ?? "0%"} />
                </div>
              </GlassBlock>
              <GlassBlock className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">CRM hooks</p>
                <div className="mt-4 space-y-3">
                  {["Create contact record", "Open follow-up thread", "Suggest Voice AI callback"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
                  ))}
                </div>
              </GlassBlock>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function WidgetStudioPage() {
  const { widgetId } = useParams();

  return (
    <>
      <PageHeader
        eyebrow="Widget studio"
        title={widgetId ? "Edit live widget experience" : "Build a new widget system"}
        description="The builder now makes handoff logic explicit so every widget feels like part of the central revenue spine."
        icon={WandSparkles}
      />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
        <GlassBlock className="p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Structure</p>
          <div className="mt-4 space-y-3">
            {["Hero prompt", "Question flow", "Intent scoring", "Handoff state", "Thank-you screen"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </GlassBlock>
        <GlassBlock className="p-4">
          <img src="/ui-reference/editor-layout-01.png" alt="Widget editor reference" className="w-full rounded-3xl" />
        </GlassBlock>
        <GlassBlock className="p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Settings</p>
          <div className="mt-4 space-y-4">
            <Input defaultValue="Project Launch Qualifier" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Input defaultValue="High-intent qualification flow" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Textarea defaultValue="Use premium tone, ask for urgency early and route high score leads to Voice AI callback." className="min-h-[150px] rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Button className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">Publish widget</Button>
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

export function VoiceAIPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);

  return (
    <>
      <PageHeader
        eyebrow="Voice AI"
        title="Run inbound and outbound calls with commercial traceability"
        description="Voice AI now reads like a connected execution layer: every call enriches the contact record, the owner workflow and the next pipeline move."
        icon={AudioWaveform}
      />
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Completed calls" value={`${data.voiceCalls.length}`} delta="+8 this week" icon={AudioWaveform} />
        <MetricCard label="Qualification score" value="84" delta="+6 avg" icon={Bot} />
        <MetricCard label="Meetings booked" value="29" delta="+11%" icon={Clock3} />
        <MetricCard label="Prospector AI callbacks" value={`${prospectorBridge.sourcedCalls.length + prospectorBridge.voiceQueue.length}`} delta={`${prospectorBridge.voiceQueue.length} queued from discovery`} icon={ScanSearch} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <GlassBlock className="p-6">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Call</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.voiceCalls.map((call) => (
                  <TableRow key={call.id} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{call.objective}</p>
                        <p className="text-xs text-slate-500">{call.time}</p>
                        {call.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{call.originModule} | {call.originLabel}</p> : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{call.direction}</TableCell>
                    <TableCell><StatusBadge value={call.status} tone={toneForStatus(call.status)} /></TableCell>
                    <TableCell className="text-slate-300">{call.score || "--"}</TableCell>
                    <TableCell className="max-w-[320px] text-sm text-slate-400">{call.summary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassBlock>
        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Call impact on CRM</p>
          <div className="mt-4 space-y-4">
            {prospectorBridge.voiceQueue.length ? (
              <div className="rounded-[26px] border border-white/10 bg-[#081425] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">Queued from Prospector AI</p>
                  <StatusBadge value={`${prospectorBridge.voiceQueue.length} queued`} tone="info" />
                </div>
                <div className="mt-4 space-y-3">
                  {prospectorBridge.voiceQueue.slice(0, 2).map((prospect) => (
                    <div key={prospect.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-medium text-white">{prospect.businessName}</p>
                      <p className="mt-2 text-sm text-slate-400">{prospect.suggestedOpportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {data.voiceCalls.map((call) => {
              const contact = data.contacts.find((item) => item.id === call.contactId);
              const deal = data.deals.find((item) => item.contactId === call.contactId);
              return (
                <div key={call.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{contact?.name ?? "Contact"}</p>
                    <StatusBadge value={call.status} tone={toneForStatus(call.status)} />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{call.summary}</p>
                  {call.originModule ? <p className="mt-3 text-xs text-cyan-200/80">{call.originModule} | {call.originLabel}</p> : null}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <MiniStat label="Deal stage" value={deal?.stage ?? "No deal"} detail={deal?.nextStep} />
                    <MiniStat label="Next action" value={call.status === "Review" ? "Human takeover" : "Meeting follow-up"} detail={call.time} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

export function VoiceAICallPage() {
  const { callId } = useParams();
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const call = data.voiceCalls.find((item) => item.id === callId) ?? data.voiceCalls[0];
  const record = useContact360(data, call?.contactId);

  return (
    <>
      <PageHeader
        eyebrow="Voice AI call detail"
        title={call ? call.objective : "Call detail"}
        description="Every call detail should connect transcript, summary, confidence and the linked commercial record."
        icon={AudioWaveform}
      />
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassBlock className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniStat label="Status" value={call?.status ?? "Review"} />
            <MiniStat label="Direction" value={call?.direction ?? "Outbound"} />
            <MiniStat label="Duration" value={call?.duration ?? "--"} />
            <MiniStat label="Qualification score" value={`${call?.score ?? "--"}`} />
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Call summary</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{call?.summary}</p>
          </div>
          {record ? <div className="mt-6"><ContactRecord record={record} /></div> : null}
        </GlassBlock>
        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Transcript and impact</p>
          <ScrollArea className="mt-4 h-[340px] rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            {[
              "Voice AI: Hi, I am calling from Ventra on behalf of Altavista Homes.",
              "Lead: Yes, I was expecting the callback after the qualification quiz.",
              "Voice AI: Great. I want to confirm budget range and ideal visit timing.",
              "Lead: Budget stays around 420k and I prefer a visit this week.",
              "Voice AI: Perfect. I marked this as high-intent and suggested a guided meeting with your advisor.",
            ].map((line) => (
              <div key={line} className="mb-3 rounded-2xl border border-white/10 bg-[#0a1527] p-4 text-sm text-slate-300">{line}</div>
            ))}
          </ScrollArea>
          {call?.contactId ? <div className="mt-4"><TimelineFeed contactId={call.contactId} compact /></div> : null}
        </GlassBlock>
      </div>
    </>
  );
}

export function CreativeStudioPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);

  return (
    <>
      <PageHeader
        eyebrow="Creative Studio"
        title="Produce commercial assets inside the same operating system"
        description="Creative Studio now feels less like a detached generator and more like the production layer behind campaigns, recovery and pipeline motion."
        icon={Sparkles}
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 xl:grid-cols-2">
          {data.creativeProjects.map((project) => (
            <GlassBlock key={project.id} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <StatusBadge value={project.stage} tone={toneForStatus(project.stage)} />
                {project.linkedProspectIds?.length ? <StatusBadge value="Prospector AI" tone="success" /> : null}
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">{project.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{project.campaign}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat label="Assets" value={`${project.assets}`} />
                <MiniStat label="Owner" value={project.owner} detail={project.pitchFocus ?? project.theme} />
              </div>
              <Button asChild className="mt-6 w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">
                <Link to={`/app/creative-studio/projects/${project.id}`}>Open project</Link>
              </Button>
            </GlassBlock>
          ))}
        </div>
        <div className="space-y-6">
          <GlassBlock className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Connected impact</p>
            <div className="mt-4 space-y-3">
              {[
                "Launch assets now attach directly to active campaigns.",
                "Recovery packs can trigger on warm opportunities without leaving the shell.",
                "Prospector AI audits can now trigger partner pitches and proposal mockups in the same workspace.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </GlassBlock>
          <GlassBlock className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Prospector pitch queue</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">Discovery accounts waiting for creative proof</h2>
              </div>
              <Button asChild variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
                <Link to="/app/acquisition/prospector-ai">Open audits</Link>
              </Button>
            </div>
            <div className="mt-5 space-y-3">
              {prospectorBridge.creativeQueue.slice(0, 3).map((prospect) => (
                <div key={prospect.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{prospect.businessName}</p>
                    <StatusBadge value={prospect.potential} tone={toneForPotential(prospect.potential)} />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{prospect.recommendedOffer}</p>
                </div>
              ))}
            </div>
          </GlassBlock>
        </div>
      </div>
    </>
  );
}

export function CreativeProjectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Creative Studio editor"
        title="Campaign asset operating center"
        description="This editor now frames structure, canvas and campaign hooks as one coordinated launch workflow."
        icon={Sparkles}
      />
      <div className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
        <GlassBlock className="p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Project map</p>
          <div className="mt-4 space-y-3">
            {["Overview", "Mockups", "Copy lab", "Asset library", "Campaign hooks", "History"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </GlassBlock>
        <GlassBlock className="p-4">
          <img src="/ui-reference/editor-layout-01.png" alt="Creative editor reference" className="w-full rounded-3xl" />
        </GlassBlock>
        <GlassBlock className="p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Project settings</p>
          <div className="mt-4 space-y-4">
            <Input defaultValue="Mirador launch system" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Input defaultValue="Q2 tower launch" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Textarea defaultValue="Premium launch system tied to project urgency, appointment framing and visual trust." className="min-h-[150px] rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Button className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">Publish assets to campaign</Button>
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

export function ConversationsPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);
  const [thread, setThread] = useState<Thread | null>(data.threads[0] ?? null);
  const record = useContact360(data, thread?.contactId);

  return (
    <>
      <PageHeader
        eyebrow="Conversations"
        title="Operate the closing inbox with full commercial context"
        description="The inbox now behaves like a premium revenue desk: messages on the center rail, contact spine on the right, and owner context always visible."
        icon={MessageSquareMore}
      />
      <div className="grid gap-6 xl:grid-cols-[320px_1fr_340px]">
        <GlassBlock className="p-4">
          <div className="space-y-4">
            {prospectorBridge.conversationQueue.length ? (
              <div className="rounded-[26px] border border-white/10 bg-[#081425] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">Queued from Prospector AI</p>
                  <StatusBadge value={`${prospectorBridge.conversationQueue.length} ready`} tone="info" />
                </div>
                <div className="mt-4 space-y-3">
                  {prospectorBridge.conversationQueue.slice(0, 2).map((prospect) => (
                    <div key={prospect.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-medium text-white">{prospect.businessName}</p>
                      <p className="mt-2 text-sm text-slate-400">{prospect.nextStep}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="space-y-3">
            {data.threads.map((item) => (
              <button key={item.id} type="button" onClick={() => setThread(item)} className="w-full text-left">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/20">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{item.name}</p>
                    {item.unread ? <span className="rounded-full bg-cyan-300/15 px-2 py-1 text-[11px] text-cyan-100">{item.unread}</span> : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.channel}</p>
                  {item.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{item.originModule} | {item.originLabel}</p> : null}
                  <p className="mt-3 text-sm text-slate-400">{item.summary}</p>
                </div>
              </button>
            ))}
            </div>
          </div>
        </GlassBlock>
        <GlassBlock className="p-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-display text-2xl font-semibold text-white">{thread?.name ?? "Select a thread"}</p>
                <p className="mt-1 text-sm text-slate-400">{thread?.company} | {thread?.channel}</p>
                {thread?.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{thread.originModule} | {thread.originLabel}</p> : null}
              </div>
              {thread ? <StatusBadge value={thread.status} tone={toneForStatus(thread.status)} /> : null}
            </div>
            <ScrollArea className="mt-4 h-[440px]">
              {thread?.messages.map((message) => (
                <div key={message.id} className={`mb-4 flex ${message.sender === "lead" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm ${message.sender === "lead" ? "bg-[#0d1b31] text-slate-200" : "bg-white text-slate-950"}`}>
                    {message.content}
                    <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">{message.time}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="mt-4 flex gap-3">
            <Input placeholder="Reply with context..." className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Button className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100">Send</Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <QuickActionTile to="/app/pipeline/deal-4" icon={BriefcaseBusiness} label="Open opportunity" detail="Move from thread to pipeline detail without losing context" />
            <QuickActionTile to="/app/voice-ai" icon={AudioWaveform} label="Send to Voice AI" detail="Queue or review concierge calls for this account" />
            <QuickActionTile to="/app/creative-studio" icon={Sparkles} label="Open pitch assets" detail="Jump to proposal or mockup support for the conversation" />
          </div>
        </GlassBlock>
        <GlassBlock className="p-4">
          {record ? (
            <div className="space-y-4">
              <ContactRecord record={record} />
              <GlassBlock className="p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unified timeline</p>
                <div className="mt-4"><TimelineFeed contactId={record.contact.id} compact /></div>
              </GlassBlock>
            </div>
          ) : (
            <EmptyState icon={Users} title="No contact context yet" description="Pick a thread to inspect the commercial record behind the conversation." />
          )}
        </GlassBlock>
      </div>
    </>
  );
}

export function PipelinePage() {
  const { dealId } = useParams();
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);
  const stages = ["Discovery", "Qualified", "Proposal", "Commit"] as const;
  const selectedDeal = data.deals.find((item) => item.id === dealId) ?? prospectorBridge.sourcedDeals[0] ?? data.deals[0] ?? null;
  const selectedRecord = useContact360(data, selectedDeal?.contactId);
  const selectedCampaignTouch = selectedDeal ? data.campaignTouches.find((touch) => touch.contactId === selectedDeal.contactId) ?? null : null;
  const selectedCampaign = selectedCampaignTouch ? data.campaigns.find((campaign) => campaign.id === selectedCampaignTouch.campaignId) ?? null : null;

  return (
    <>
      <PageHeader
        eyebrow="Pipeline"
        title="Pipeline with ownership, probability and next step"
        description="Pipeline now reads like the visible extension of the contact record, not a separate board disconnected from conversations and calls."
        icon={BriefcaseBusiness}
        actions={
          <Button asChild variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
            <Link to="/app/acquisition/prospector-ai">Review discovery origin</Link>
          </Button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="grid gap-4 xl:grid-cols-4">
          {stages.map((stage) => (
            <GlassBlock key={stage} className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold text-white">{stage}</p>
                <span className="text-xs text-slate-500">{data.deals.filter((deal) => deal.stage === stage).length}</span>
              </div>
              <div className="mt-4 space-y-3">
                {data.deals.filter((deal) => deal.stage === stage).map((deal) => {
                  const contact = data.contacts.find((item) => item.id === deal.contactId);
                  const isSelected = selectedDeal?.id === deal.id;
                  return (
                    <Link key={deal.id} to={`/app/pipeline/${deal.id}`} className="block">
                      <div className={`rounded-2xl border p-4 transition ${isSelected ? "border-cyan-300/25 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-cyan-300/20"}`}>
                        <p className="font-medium text-white">{deal.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{contact?.name} | {deal.nextStep}</p>
                        {deal.originModule ? <p className="mt-2 text-xs text-cyan-200/80">{deal.originModule} | {deal.originLabel}</p> : null}
                        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                          <span>{deal.value}</span>
                          <span>{deal.probability}%</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </GlassBlock>
          ))}
        </div>

        <GlassBlock className="p-6">
          {selectedDeal && selectedRecord ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Opportunity detail</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-white">{selectedDeal.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{selectedRecord.contact.name} | {selectedRecord.contact.company}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge value={selectedDeal.stage} tone={toneForStatus(selectedDeal.stage)} />
                  <StatusBadge value={selectedDeal.originModule ?? "Inbound"} tone={selectedDeal.originModule === "Prospector AI" ? "success" : "info"} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniStat label="Value" value={selectedDeal.value} />
                <MiniStat label="Probability" value={`${selectedDeal.probability}%`} detail={selectedDeal.nextStep} />
                <MiniStat label="Owner" value={selectedDeal.owner} />
                <MiniStat label="Lead source" value={selectedRecord.lead?.source ?? "Unknown"} detail={selectedDeal.originLabel ?? "Same CRM spine"} />
              </div>

              {selectedRecord.prospect ? (
                <div className="rounded-[26px] border border-white/10 bg-[#081425] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">Came from prospecting</p>
                    <StatusBadge value={selectedRecord.prospect.potential} tone={toneForPotential(selectedRecord.prospect.potential)} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{selectedRecord.prospect.suggestedOpportunity}</p>
                  <p className="mt-3 text-sm text-slate-400">{selectedDeal.originLabel ?? selectedRecord.prospect.recommendedOffer}</p>
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <QuickActionTile to={`/app/contacts/${selectedRecord.contact.id}`} icon={Users} label="Open contact 360" detail="Inspect the account timeline and source attribution" />
                {selectedRecord.thread ? <QuickActionTile to={`/app/conversations/${selectedRecord.thread.id}`} icon={MessageSquareMore} label="Open conversation" detail="Continue the linked follow-up thread" /> : null}
                {selectedRecord.calls[0] ? <QuickActionTile to={`/app/voice-ai/calls/${selectedRecord.calls[0].id}`} icon={AudioWaveform} label="Review Voice AI" detail="Inspect the latest call or queued concierge flow" /> : null}
                {selectedCampaign ? <QuickActionTile to={`/app/campaigns/${selectedCampaign.id}`} icon={ChartColumnIncreasing} label="Open campaign" detail={selectedCampaign.name} /> : null}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Activity and timeline</p>
                <div className="mt-4">
                  <TimelineFeed contactId={selectedRecord.contact.id} compact />
                </div>
              </div>
            </div>
          ) : (
            <EmptyState icon={BriefcaseBusiness} title="No opportunity selected" description="Choose a deal from the board to inspect source, ownership and linked workflow." />
          )}
        </GlassBlock>
      </div>
    </>
  );
}

export function CampaignsPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);

  return (
    <>
      <PageHeader
        eyebrow="Campaigns"
        title="Launch assets, audiences and results from one system"
        description="Campaigns now show how Creative Studio, Acquisition and opportunity movement reinforce each other inside the same commercial environment."
        icon={ChartColumnIncreasing}
      />
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Prospector-linked campaigns" value={`${prospectorBridge.linkedCampaigns.length}`} delta="+1 strategic motion live" icon={ScanSearch} />
        <MetricCard label="Creative proofs attached" value={`${prospectorBridge.linkedCreativeProjects.length}`} delta="Pitch kits ready to launch" icon={Sparkles} />
        <MetricCard label="Influenced sourced deals" value={`${prospectorBridge.sourcedDeals.length}`} delta="+2 in active review" icon={BriefcaseBusiness} />
        <MetricCard label="Campaign-ready accounts" value={`${prospectorBridge.campaignQueue.length}`} delta="Discovery already connected to outreach" icon={Target} />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {data.campaigns.map((campaign) => (
          <GlassBlock key={campaign.id} className="p-6">
            <div className="flex items-center justify-between">
              <StatusBadge value={campaign.status} tone={toneForStatus(campaign.status)} />
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{campaign.sourceFocus ?? campaign.goal}</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">{campaign.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{campaign.audience}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label="Spend" value={campaign.spend} />
              <MiniStat label="Pipeline" value={campaign.influencedPipeline} />
            </div>
            {campaign.linkedProspectIds?.length ? <p className="mt-4 text-xs text-cyan-200/80">{campaign.linkedProspectIds.length} prospecting accounts connected</p> : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {campaign.assets.map((asset) => (
                <StatusBadge key={asset} value={asset} />
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6 w-full rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
              <Link to={`/app/campaigns/${campaign.id}`}>Open campaign detail</Link>
            </Button>
          </GlassBlock>
        ))}
      </div>
    </>
  );
}

export function CampaignDetailPage() {
  const { campaignId } = useParams();
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const campaign = data.campaigns.find((item) => item.id === campaignId) ?? data.campaigns[0];
  const influenced = data.campaignTouches.filter((touch) => touch.campaignId === campaign?.id);
  const prospector = getProspectorWorkspaceData(activeWorkspaceId);
  const linkedProspects = (campaign?.linkedProspectIds ?? [])
    .map((prospectId) => prospector.prospects.find((prospectItem) => prospectItem.id === prospectId))
    .filter((prospectItem): prospectItem is NonNullable<typeof prospectItem> => Boolean(prospectItem));

  return (
    <>
      <PageHeader
        eyebrow="Campaign detail"
        title={campaign?.name ?? "Campaign detail"}
        description="Campaign detail connects objective, assets, audience and influenced contact records in one operating view."
        icon={ChartColumnIncreasing}
      />
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassBlock className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniStat label="Status" value={campaign?.status ?? "Draft"} />
            <MiniStat label="Spend" value={campaign?.spend ?? "$0"} />
            <MiniStat label="Audience" value={campaign?.audience ?? "General"} />
            <MiniStat label="Pipeline influenced" value={campaign?.influencedPipeline ?? "$0"} />
          </div>
          {campaign?.sourceFocus ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#081425] p-4 text-sm text-slate-300">
              Source focus: {campaign.sourceFocus}. This motion is being fed directly by Prospector AI discovery and Creative Studio proof.
            </div>
          ) : null}
        </GlassBlock>
        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Influenced contacts</p>
          <div className="mt-4 space-y-3">
            {influenced.map((touch) => {
              const contact = data.contacts.find((item) => item.id === touch.contactId);
              return (
                <div key={touch.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-medium text-white">{contact?.name ?? touch.label}</p>
                  <p className="mt-2 text-sm text-slate-400">{touch.impact}</p>
                </div>
              );
            })}
          </div>
          {linkedProspects.length ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Linked prospects</p>
              <div className="mt-4 space-y-3">
                {linkedProspects.map((prospect) => (
                  <div key={prospect.id} className="rounded-2xl border border-white/10 bg-[#081425] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{prospect.businessName}</p>
                      <StatusBadge value={prospect.potential} tone={toneForPotential(prospect.potential)} />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{prospect.suggestedOpportunity}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </GlassBlock>
      </div>
    </>
  );
}

export function ContactsPage() {
  const { contactId } = useParams();
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const defaultContactId = data.contacts[0]?.id ?? null;
  const [selectedContactId, setSelectedContactId] = useState<string | null>(contactId ?? defaultContactId);
  useEffect(() => {
    setSelectedContactId(contactId ?? defaultContactId);
  }, [contactId, activeWorkspaceId, defaultContactId]);
  const [contact, setContact] = useState<Contact | null>(data.contacts.find((item) => item.id === selectedContactId) ?? data.contacts[0] ?? null);
  useEffect(() => {
    setContact(data.contacts.find((item) => item.id === selectedContactId) ?? data.contacts[0] ?? null);
  }, [activeWorkspaceId, data, selectedContactId]);
  const record = useContact360(data, contact?.id);

  return (
    <>
      <PageHeader
        eyebrow="Contacts"
        title="Commercial memory anchored in one contact profile"
        description="This screen is now the clearest expression of the Ventra backbone: one record consolidating source, pipeline, conversation, Voice AI and campaign context."
        icon={Users}
      />
      <div className="grid gap-6 xl:grid-cols-[1.02fr_1.18fr]">
        <GlassBlock className="p-6">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Contact</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.contacts.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer border-white/10 hover:bg-white/[0.03]" onClick={() => setSelectedContactId(item.id)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <StatusBadge value={item.originModule ?? "Inbound"} tone={item.originModule === "Prospector AI" ? "success" : "info"} />
                        {item.originLabel ? <p className="text-xs text-slate-500">{item.originLabel}</p> : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{item.channel}</TableCell>
                    <TableCell><StatusBadge value={item.health} tone={toneForStatus(item.health)} /></TableCell>
                    <TableCell className="text-slate-300">{item.owner}</TableCell>
                    <TableCell className="font-medium text-white">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassBlock>

        <div className="space-y-6">
          {record ? (
            <>
              <ContactRecord record={record} />
              <GlassBlock className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unified timeline</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">Everything that moved this account</h2>
                  </div>
                  <PhoneCall className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="mt-6"><TimelineFeed contactId={record.contact.id} /></div>
              </GlassBlock>
            </>
          ) : (
            <EmptyState icon={Users} title="No contact selected" description="Pick a contact from the table to inspect the full 360 commercial profile." />
          )}
        </div>
      </div>
    </>
  );
}

export function AnalyticsPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);
  const prospectorBridge = useMemo(() => getProspectorBridge(data), [data]);

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Executive visibility without losing operational meaning"
        description="Analytics now reads more clearly as a commercial scoreboard fed by the same contact-driven operating system, including Prospector AI discovery and cross-module activation."
        icon={Activity}
      />
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Prospects discovered" value={`${prospectorBridge.prospector.prospects.length}`} delta="+27 across the last 6 weeks" icon={ScanSearch} />
        <MetricCard label="Prospect to CRM" value={`${Math.round((prospectorBridge.crmReady.length / Math.max(prospectorBridge.prospector.prospects.length, 1)) * 100)}%`} delta={`${prospectorBridge.crmReady.length} accounts now in Contacts`} icon={Users} />
        <MetricCard label="Prospect to opportunity" value={`${prospectorBridge.opportunitiesReady.length}`} delta="Partner and strategic motions live" icon={BriefcaseBusiness} />
        <MetricCard label="Outreach activated" value={`${prospectorBridge.conversationQueue.length + prospectorBridge.voiceQueue.length + prospectorBridge.campaignQueue.length}`} delta="Conversations, Voice AI and Campaigns connected" icon={Workflow} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassBlock className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Prospecting contribution</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">Discovery, activation and revenue now read on the same curve</h2>
            </div>
            <StatusBadge value="Unified funnel" tone="success" />
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="analyticsProspectorGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="analyticsConversationGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3BB9FF" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#3BB9FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: "rgba(255,255,255,0.06)" }} contentStyle={{ background: "#071121", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
                <Area type="monotone" dataKey="prospector" stroke="#f59e0b" fill="url(#analyticsProspectorGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="conversations" stroke="#3BB9FF" fill="url(#analyticsConversationGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="rgba(139,92,246,0.18)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassBlock>
        <div className="space-y-6">
          <GlassBlock className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Prospector funnel</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-medium text-white">Discovery to CRM</p>
                <p className="mt-2 text-sm text-slate-400">{prospectorBridge.crmReady.length} of {prospectorBridge.prospector.prospects.length} accounts are already saved or enriched inside the commercial spine.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-medium text-white">CRM to opportunity</p>
                <p className="mt-2 text-sm text-slate-400">{prospectorBridge.opportunitiesReady.length} prospecting accounts already opened a deal visible in Pipeline.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-medium text-white">Activation layer</p>
                <p className="mt-2 text-sm text-slate-400">{prospectorBridge.conversationQueue.length} queued for Conversations, {prospectorBridge.voiceQueue.length} for Voice AI and {prospectorBridge.campaignQueue.length} linked to Campaigns.</p>
              </div>
            </div>
          </GlassBlock>
          <GlassBlock className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Executive takeaways</p>
            <div className="mt-4 space-y-3">
              {[
                "Prospector AI is now the fastest net-new path into pipeline because Contacts, Campaigns and outreach are already aligned.",
                "Voice AI performs best when it receives a prospecting audit, not just a cold phone target.",
                "Creative Studio increases prospect conversion when it is used to generate pitches and proposal proof for strategic accounts.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </GlassBlock>
        </div>
      </div>
    </>
  );
}

export function AutomationsPage() {
  const { activeWorkspaceId } = useSession();
  const data = getWorkspaceData(activeWorkspaceId);

  return (
    <>
      <PageHeader
        eyebrow="Automations"
        title="Rules that move revenue operations forward"
        description="Automations now read like visible operating rules, not hidden technical toggles."
        icon={Workflow}
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {data.automations.map((automation) => (
          <GlassBlock key={automation.id} className="p-6">
            <div className="flex items-center justify-between">
              <StatusBadge value={automation.status} tone={toneForStatus(automation.status)} />
              <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">Edit</Button>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">{automation.name}</h2>
            <p className="mt-3 text-sm text-slate-400">When {automation.trigger}</p>
            <p className="mt-2 text-sm text-slate-300">Then {automation.action}</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">{automation.impact}</div>
          </GlassBlock>
        ))}
      </div>
    </>
  );
}

export function WorkspacesPage() {
  const { workspaces } = useSession();

  return (
    <>
      <PageHeader
        eyebrow="Workspaces"
        title="Multi-tenant by design, visible from the first frontend release"
        description="Workspaces separate operating context, members and branding while keeping the shell visually coherent."
        icon={Building2}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {workspaces.map((workspace) => (
          <GlassBlock key={workspace.id} className="p-6">
            <StatusBadge value={workspace.plan} tone={workspace.plan === "Scale" ? "success" : "info"} />
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">{workspace.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{workspace.industry} | {workspace.region}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label="Members" value={`${workspace.members}`} />
              <MiniStat label="Contacts" value={`${workspace.activeContacts}`} />
            </div>
          </GlassBlock>
        ))}
      </div>
    </>
  );
}

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Configure the workspace without breaking product coherence"
        description="Settings keeps profile, team, branding, billing and integrations inside the same premium shell."
        icon={Settings}
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workspace branding</p>
          <div className="mt-4 space-y-4">
            <Input defaultValue="Altavista Homes" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Input defaultValue="lima.pe" className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
            <Textarea defaultValue="High-ticket residential sales with premium buyer qualification." className="min-h-[140px] rounded-2xl border-white/10 bg-white/[0.04] text-white" />
          </div>
        </GlassBlock>
        <GlassBlock className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Integrations and rollout</p>
          <div className="mt-4 space-y-3">
            {["Meta Ads source sync", "WhatsApp channel bridge", "Voice AI routing", "Creative asset publishing"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-300">
                {item}
                <StatusBadge value="Configured" tone="success" />
              </div>
            ))}
          </div>
        </GlassBlock>
      </div>
    </>
  );
}
