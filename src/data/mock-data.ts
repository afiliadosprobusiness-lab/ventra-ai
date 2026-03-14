import {
  Activity,
  AudioWaveform,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Layers3,
  MessageSquareMore,
  ScanSearch,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  title: string;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  region: string;
  plan: "Growth" | "Scale" | "Enterprise";
  members: number;
  activeContacts: number;
  monthlyPipeline: string;
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

export type Lead = {
  id: string;
  workspaceId: string;
  name: string;
  source: string;
  originModule?: "Prospector AI" | "Quiz" | "Widgets" | "Voice AI" | "Campaigns";
  originLabel?: string;
  prospectId?: string | null;
  stage: "New" | "Qualified" | "Contacted" | "Proposal" | "Won";
  score: number;
  value: string;
  owner: string;
  lastTouch: string;
};

export type Contact = {
  id: string;
  workspaceId: string;
  leadId: string;
  name: string;
  company: string;
  channel: "WhatsApp" | "Voice AI" | "Web form" | "Quiz";
  originModule?: "Prospector AI" | "Quiz" | "Widgets" | "Voice AI" | "Campaigns";
  originLabel?: string;
  prospectId?: string | null;
  health: "Hot" | "Warm" | "Cold";
  pipelineStage: "Discovery" | "Evaluation" | "Negotiation" | "Won";
  owner: string;
  phone: string;
  email: string;
  city: string;
  lastActivity: string;
  value: string;
};

export type Thread = {
  id: string;
  workspaceId: string;
  contactId: string;
  name: string;
  company: string;
  unread: number;
  status: "Live" | "Waiting" | "Recovered";
  channel: "WhatsApp" | "Instagram DM" | "Lead Chat";
  originModule?: "Prospector AI" | "Quiz" | "Widgets" | "Voice AI" | "Campaigns";
  originLabel?: string;
  summary: string;
  assignee: string;
  messages: Array<{ id: string; sender: "agent" | "lead" | "ai"; content: string; time: string }>;
};

export type VoiceCall = {
  id: string;
  workspaceId: string;
  contactId: string;
  direction: "Inbound" | "Outbound";
  status: "Active" | "Scheduled" | "Completed" | "Review";
  originModule?: "Prospector AI" | "Quiz" | "Widgets" | "Voice AI" | "Campaigns";
  originLabel?: string;
  objective: string;
  caller: string;
  time: string;
  duration: string;
  score: number;
  summary: string;
};

export type Widget = {
  id: string;
  workspaceId: string;
  name: string;
  status: "Live" | "Draft" | "Optimizing";
  type: "Multi-step" | "Exit intent" | "Qualification quiz";
  source: string;
  conversions: string;
  conversionRate: string;
  lastUpdate: string;
};

export type CreativeProject = {
  id: string;
  workspaceId: string;
  name: string;
  campaign: string;
  stage: "Draft" | "Generating" | "Ready";
  assets: number;
  owner: string;
  updatedAt: string;
  theme: string;
  linkedProspectIds?: string[];
  pitchFocus?: string;
};

export type Campaign = {
  id: string;
  workspaceId: string;
  name: string;
  audience: string;
  goal: string;
  status: "Active" | "Draft" | "Scaling";
  spend: string;
  influencedPipeline: string;
  assets: string[];
  sourceFocus?: string;
  linkedProspectIds?: string[];
};

export type Deal = {
  id: string;
  workspaceId: string;
  contactId: string;
  title: string;
  stage: "Discovery" | "Qualified" | "Proposal" | "Commit";
  owner: string;
  value: string;
  nextStep: string;
  probability: number;
  originModule?: "Prospector AI" | "Quiz" | "Widgets" | "Voice AI" | "Campaigns";
  originLabel?: string;
  prospectId?: string | null;
};

export type Automation = {
  id: string;
  workspaceId: string;
  name: string;
  trigger: string;
  action: string;
  status: "Active" | "Paused";
  impact: string;
};

export type Event = {
  id: string;
  workspaceId: string;
  type: "lead" | "conversation" | "call" | "creative" | "campaign" | "prospector";
  title: string;
  detail: string;
  time: string;
};

export type Insight = {
  id: string;
  workspaceId: string;
  title: string;
  detail: string;
  tone: "primary" | "warning" | "info";
};

export type ContactTimelineEntry = {
  id: string;
  workspaceId: string;
  contactId: string;
  module: "Prospector AI" | "Acquisition" | "Widgets" | "Conversations" | "Voice AI" | "Pipeline" | "Campaigns" | "Creative Studio" | "Community";
  title: string;
  detail: string;
  time: string;
  outcome: string;
  tone: "success" | "warning" | "info" | "neutral";
};

export type ContactTask = {
  id: string;
  workspaceId: string;
  contactId: string;
  title: string;
  owner: string;
  due: string;
  status: "Now" | "Today" | "Queued";
};

export type CampaignTouch = {
  id: string;
  workspaceId: string;
  contactId: string;
  campaignId: string;
  label: string;
  impact: string;
};

export type ProspectCrmStatus = "Not in CRM" | "Lead saved" | "Contact enriched";

export type ProspectOpportunityStatus = "No opportunity" | "Opportunity created";

export type ProspectOutreachStatus =
  | "Not started"
  | "Conversations queued"
  | "Voice AI queued"
  | "Campaign linked";

export type ProspectPotential = "High potential" | "Expansion fit" | "Watchlist";

export type Prospect = {
  id: string;
  workspaceId: string;
  businessName: string;
  category: string;
  industry: string;
  niche: string;
  city: string;
  country: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  businessSize: "Solo" | "SMB" | "Mid-market";
  hasWebsite: boolean;
  activeSocials: boolean;
  activeAds: boolean;
  aiScore: number;
  potential: ProspectPotential;
  digitalSignals: string[];
  suggestedOpportunity: string;
  recommendedOffer: string;
  crmStatus: ProspectCrmStatus;
  opportunityStatus: ProspectOpportunityStatus;
  outreachStatus: ProspectOutreachStatus;
  owner: string | null;
  nextStep: string;
  lastDetected: string;
};

export type ProspectAuditSignal = {
  label: string;
  detail: string;
  strength: "High" | "Medium" | "Emerging";
};

export type ProspectAuditBlock = {
  title: string;
  detail: string;
  tone: "success" | "warning" | "info";
};

export type ProspectAuditActivity = {
  id: string;
  time: string;
  module: "Prospector AI" | "CRM" | "Conversations" | "Voice AI" | "Campaigns" | "Creative Studio";
  detail: string;
  outcome: string;
  tone: "success" | "warning" | "info" | "neutral";
};

export type ProspectAudit = {
  prospectId: string;
  summary: string;
  enrichedData: Array<{ label: string; value: string }>;
  detectedSignals: ProspectAuditSignal[];
  commercialAudit: ProspectAuditBlock[];
  identifiedProblems: string[];
  opportunityAngle: string;
  recommendedOffer: string;
  suggestedOutreachMessage: string;
  recentActivity: ProspectAuditActivity[];
  crmSyncStatus: {
    contact: string;
    opportunity: string;
    outreach: string;
    owner: string;
    nextStep: string;
  };
  pitchNarrative: string;
  creativePrompt: string;
};

export type ProspectorSavedSearch = {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
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
  matched: number;
  lastRun: string;
};

export const demoUser: DemoUser = {
  id: "user_ventra_demo",
  name: "Ken Ortega",
  email: "ken@ventra.app",
  title: "Growth Operator",
};

export const workspaces: Workspace[] = [
  {
    id: "ws-ventra-estate",
    name: "Altavista Homes",
    slug: "altavista-homes",
    industry: "Real estate",
    region: "Lima, Peru",
    plan: "Scale",
    members: 12,
    activeContacts: 948,
    monthlyPipeline: "$218K",
  },
  {
    id: "ws-ventra-clinic",
    name: "Nova Dental Group",
    slug: "nova-dental-group",
    industry: "Healthcare",
    region: "Bogota, Colombia",
    plan: "Growth",
    members: 7,
    activeContacts: 611,
    monthlyPipeline: "$126K",
  },
];

export const metricsByWorkspace: Record<string, Metric[]> = {
  "ws-ventra-estate": [
    { id: "m1", label: "Qualified demand", value: "184", delta: "+14.6% this month", trend: "up" },
    { id: "m2", label: "Pipeline under control", value: "$218K", delta: "+9.1% from connected motions", trend: "up" },
    { id: "m3", label: "Conversation close rate", value: "31%", delta: "+4.2% after score handoff", trend: "up" },
    { id: "m4", label: "Voice AI meetings", value: "29", delta: "3 waiting owner follow-up", trend: "flat" },
  ],
  "ws-ventra-clinic": [
    { id: "m5", label: "Qualified demand", value: "132", delta: "+8.1% this month", trend: "up" },
    { id: "m6", label: "Pipeline under control", value: "$126K", delta: "+6.4% from shared contact context", trend: "up" },
    { id: "m7", label: "Conversation close rate", value: "26%", delta: "+2.8% after workflow cleanup", trend: "up" },
    { id: "m8", label: "Voice AI meetings", value: "16", delta: "+3 booked today", trend: "up" },
  ],
};

export const performanceSeries = [
  { week: "W1", prospector: 8, acquisition: 32, conversations: 21, revenue: 44 },
  { week: "W2", prospector: 11, acquisition: 41, conversations: 26, revenue: 52 },
  { week: "W3", prospector: 15, acquisition: 48, conversations: 31, revenue: 58 },
  { week: "W4", prospector: 18, acquisition: 52, conversations: 36, revenue: 63 },
  { week: "W5", prospector: 23, acquisition: 60, conversations: 42, revenue: 71 },
  { week: "W6", prospector: 27, acquisition: 67, conversations: 49, revenue: 77 },
];

export const acquisitionSources = [
  { source: "Prospector AI", leads: 28, qualified: "71%", cpa: "$6", intent: "Very high" },
  { source: "Meta Ads", leads: 112, qualified: "41%", cpa: "$14", intent: "High" },
  { source: "Quiz flow", leads: 66, qualified: "58%", cpa: "$8", intent: "Very high" },
  { source: "Organic website", leads: 39, qualified: "36%", cpa: "$0", intent: "Medium" },
  { source: "Voice callback", leads: 24, qualified: "62%", cpa: "$11", intent: "Very high" },
];

export const leads: Lead[] = [
  {
    id: "lead-1",
    workspaceId: "ws-ventra-estate",
    name: "Andrea Del Solar",
    source: "Quiz / Project launch",
    stage: "Qualified",
    score: 92,
    value: "$18K",
    owner: "Dario Perez",
    lastTouch: "6 min ago",
  },
  {
    id: "lead-2",
    workspaceId: "ws-ventra-estate",
    name: "Martin Valera",
    source: "Voice AI outbound",
    originModule: "Voice AI",
    originLabel: "Outbound recovery motion",
    stage: "Proposal",
    score: 81,
    value: "$42K",
    owner: "Camila Rojas",
    lastTouch: "12 min ago",
  },
  {
    id: "lead-3",
    workspaceId: "ws-ventra-estate",
    name: "Natalia Wong",
    source: "Widget / Exit intent",
    originModule: "Widgets",
    originLabel: "Inventory exit-intent capture",
    stage: "Contacted",
    score: 74,
    value: "$9K",
    owner: "Dario Perez",
    lastTouch: "32 min ago",
  },
  {
    id: "lead-4",
    workspaceId: "ws-ventra-estate",
    name: "Isabel Meneses",
    source: "Prospector AI / Relocation partner scan",
    originModule: "Prospector AI",
    originLabel: "Referral engine for premium buyers",
    prospectId: "pros-1",
    stage: "Qualified",
    score: 94,
    value: "$36K",
    owner: "Camila Rojas",
    lastTouch: "9 min ago",
  },
  {
    id: "lead-5",
    workspaceId: "ws-ventra-clinic",
    name: "Sofia Pineda",
    source: "Meta Ads / Lead form",
    stage: "Qualified",
    score: 88,
    value: "$6K",
    owner: "Lucia Saenz",
    lastTouch: "3 min ago",
  },
];

export const contacts: Contact[] = [
  {
    id: "con-1",
    workspaceId: "ws-ventra-estate",
    leadId: "lead-1",
    name: "Andrea Del Solar",
    company: "Independent buyer",
    channel: "Quiz",
    health: "Hot",
    pipelineStage: "Evaluation",
    owner: "Dario Perez",
    phone: "+51 978 321 224",
    email: "andrea@buyer.pe",
    city: "Lima",
    lastActivity: "Today, 10:12",
    value: "$18K",
  },
  {
    id: "con-2",
    workspaceId: "ws-ventra-estate",
    leadId: "lead-2",
    name: "Martin Valera",
    company: "Family office",
    channel: "Voice AI",
    health: "Hot",
    pipelineStage: "Negotiation",
    owner: "Camila Rojas",
    phone: "+51 942 554 199",
    email: "martin@valera.pe",
    city: "Miraflores",
    lastActivity: "Today, 09:48",
    value: "$42K",
  },
  {
    id: "con-3",
    workspaceId: "ws-ventra-estate",
    leadId: "lead-3",
    name: "Natalia Wong",
    company: "Altos del Bosque",
    channel: "Web form",
    health: "Warm",
    pipelineStage: "Discovery",
    owner: "Dario Perez",
    phone: "+51 955 220 198",
    email: "natalia@bosque.pe",
    city: "Surco",
    lastActivity: "Yesterday",
    value: "$9K",
  },
  {
    id: "con-4",
    workspaceId: "ws-ventra-estate",
    leadId: "lead-4",
    name: "Isabel Meneses",
    company: "Skyline Relocation Partners",
    channel: "Voice AI",
    originModule: "Prospector AI",
    originLabel: "Referral engine for premium buyers",
    prospectId: "pros-1",
    health: "Hot",
    pipelineStage: "Negotiation",
    owner: "Camila Rojas",
    phone: "+51 969 882 440",
    email: "isabel@skyline-relocation.pe",
    city: "Lima",
    lastActivity: "Today, 10:28",
    value: "$36K",
  },
];

export const threads: Thread[] = [
  {
    id: "thr-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    name: "Andrea Del Solar",
    company: "Independent buyer",
    unread: 2,
    status: "Live",
    channel: "WhatsApp",
    summary: "Finished the premium qualification flow and is already asking for visit windows and unit fit.",
    assignee: "Dario Perez",
    messages: [
      { id: "msg-1", sender: "lead", content: "I finished the quiz and want to see the premium tower options.", time: "09:10" },
      { id: "msg-2", sender: "ai", content: "I grouped inventory by budget, urgency and view preference so your advisor can continue with context.", time: "09:11" },
      { id: "msg-3", sender: "agent", content: "I can show you two high-fit options today at 5pm or tomorrow at 11am.", time: "09:14" },
    ],
  },
  {
    id: "thr-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    name: "Martin Valera",
    company: "Family office",
    unread: 0,
    status: "Recovered",
    channel: "Lead Chat",
    summary: "Recovered after 14 silent days and now reviewing a blended multi-unit proposal.",
    assignee: "Camila Rojas",
    messages: [
      { id: "msg-4", sender: "lead", content: "Can we revisit the package if you include closing support?", time: "Yesterday" },
      { id: "msg-5", sender: "agent", content: "Yes. I prepared a blended package with legal support and visit coordination.", time: "Yesterday" },
    ],
  },
  {
    id: "thr-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    name: "Isabel Meneses",
    company: "Skyline Relocation Partners",
    unread: 1,
    status: "Live",
    channel: "WhatsApp",
    originModule: "Prospector AI",
    originLabel: "Partner outreach from commercial audit",
    summary: "Prospector AI surfaced the account, Creative Studio generated a partner pitch and Camila is now aligning bilingual handoff expectations.",
    assignee: "Camila Rojas",
    messages: [
      { id: "msg-6", sender: "agent", content: "I prepared a partner funnel view showing how Skyline can route premium relocation demand with less manual follow-up.", time: "10:01" },
      { id: "msg-7", sender: "lead", content: "Share it. We need a cleaner first-response flow before we scale more campaigns.", time: "10:04" },
      { id: "msg-8", sender: "ai", content: "Voice AI concierge and partner proposal are ready to review in the same account record.", time: "10:06" },
    ],
  },
];

export const voiceCalls: VoiceCall[] = [
  {
    id: "call-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    direction: "Outbound",
    status: "Completed",
    objective: "Qualify visit intent and budget fit",
    caller: "Ventra Voice agent 03",
    time: "Today, 09:22",
    duration: "04:21",
    score: 91,
    summary: "Confirmed buying horizon under 45 days and accepted a guided site visit.",
  },
  {
    id: "call-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    direction: "Inbound",
    status: "Review",
    objective: "Handle pricing objection",
    caller: "Ventra Voice inbound",
    time: "Today, 10:04",
    duration: "06:02",
    score: 76,
    summary: "Lead wants an updated payment schedule. Suggested human takeover.",
  },
  {
    id: "call-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    direction: "Outbound",
    status: "Scheduled",
    originModule: "Prospector AI",
    originLabel: "Partner concierge qualification",
    objective: "Validate partner routing and referral SLA expectations",
    caller: "Ventra Voice agent 07",
    time: "Today, 11:40",
    duration: "Pending",
    score: 89,
    summary: "Prospector-sourced strategic account queued for a bilingual qualification call before proposal review.",
  },
];

export const widgets: Widget[] = [
  {
    id: "wid-1",
    workspaceId: "ws-ventra-estate",
    name: "Project Launch Qualifier",
    status: "Live",
    type: "Qualification quiz",
    source: "Landing / Luxury project",
    conversions: "118",
    conversionRate: "16.8%",
    lastUpdate: "2 hours ago",
  },
  {
    id: "wid-2",
    workspaceId: "ws-ventra-estate",
    name: "Exit Intent Investor Prompt",
    status: "Optimizing",
    type: "Exit intent",
    source: "Inventory pages",
    conversions: "46",
    conversionRate: "11.3%",
    lastUpdate: "Today",
  },
];

export const creativeProjects: CreativeProject[] = [
  {
    id: "cp-1",
    workspaceId: "ws-ventra-estate",
    name: "Mirador launch system",
    campaign: "Q2 tower launch",
    stage: "Ready",
    assets: 18,
    owner: "Jazmin Solis",
    updatedAt: "40 min ago",
    theme: "Editorial conversion kit",
  },
  {
    id: "cp-2",
    workspaceId: "ws-ventra-estate",
    name: "Investor urgency pack",
    campaign: "Recovery sprint",
    stage: "Generating",
    assets: 9,
    owner: "Jazmin Solis",
    updatedAt: "Now",
    theme: "High-ticket persuasion",
  },
  {
    id: "cp-3",
    workspaceId: "ws-ventra-estate",
    name: "Skyline partner pitch kit",
    campaign: "Partner motion",
    stage: "Ready",
    assets: 7,
    owner: "Jazmin Solis",
    updatedAt: "12 min ago",
    theme: "Prospector proposal system",
    linkedProspectIds: ["pros-1", "pros-6"],
    pitchFocus: "Bilingual partner funnel and referral intake upgrade",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    workspaceId: "ws-ventra-estate",
    name: "Q2 tower launch",
    audience: "New buyers / Miraflores",
    goal: "Drive qualified visits",
    status: "Active",
    spend: "$12.4K",
    influencedPipeline: "$84K",
    assets: ["Hero mockups", "Quiz assets", "Visit CTA pack"],
  },
  {
    id: "camp-2",
    workspaceId: "ws-ventra-estate",
    name: "Warm lead recovery",
    audience: "Dormant opportunities / 30d",
    goal: "Reopen stalled conversations",
    status: "Scaling",
    spend: "$3.2K",
    influencedPipeline: "$29K",
    assets: ["Recovery carousels", "Voice AI script", "Closer notes"],
  },
  {
    id: "camp-3",
    workspaceId: "ws-ventra-estate",
    name: "Partner motion",
    audience: "Prospector AI strategic accounts",
    goal: "Open partner opportunities",
    status: "Active",
    spend: "$1.8K",
    influencedPipeline: "$61K",
    assets: ["Executive pitch deck", "Referral mockup", "Voice AI concierge script"],
    sourceFocus: "Prospector AI",
    linkedProspectIds: ["pros-1", "pros-6"],
  },
];

export const deals: Deal[] = [
  {
    id: "deal-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    title: "Andrea / Premium tower",
    stage: "Qualified",
    owner: "Dario Perez",
    value: "$18K",
    nextStep: "Confirm onsite visit",
    probability: 72,
  },
  {
    id: "deal-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    title: "Martin / Multi-unit block",
    stage: "Proposal",
    owner: "Camila Rojas",
    value: "$42K",
    nextStep: "Present blended proposal",
    probability: 84,
  },
  {
    id: "deal-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-3",
    title: "Natalia / Family upgrade",
    stage: "Discovery",
    owner: "Dario Perez",
    value: "$9K",
    nextStep: "Send brochure and funding path",
    probability: 48,
  },
  {
    id: "deal-4",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    title: "Skyline / Referral engine rollout",
    stage: "Commit",
    owner: "Camila Rojas",
    value: "$36K",
    nextStep: "Present bilingual partner proposal",
    probability: 88,
    originModule: "Prospector AI",
    originLabel: "Referral engine for premium buyers",
    prospectId: "pros-1",
  },
];

export const automations: Automation[] = [
  {
    id: "auto-1",
    workspaceId: "ws-ventra-estate",
    name: "Score-driven handoff",
    trigger: "Lead score above 85",
    action: "Open Conversations thread and schedule Voice AI callback",
    status: "Active",
    impact: "12 additional meetings this week",
  },
  {
    id: "auto-2",
    workspaceId: "ws-ventra-estate",
    name: "Creative to campaign sync",
    trigger: "Creative pack marked Ready",
    action: "Attach assets to launch campaign workspace",
    status: "Active",
    impact: "Saved 3h per launch",
  },
  {
    id: "auto-3",
    workspaceId: "ws-ventra-estate",
    name: "Prospector strategic activation",
    trigger: "Prospector AI account reaches 90+ score",
    action: "Create opportunity, queue Conversations and suggest Voice AI concierge call",
    status: "Active",
    impact: "4 partner accounts activated this week",
  },
];

export const events: Event[] = [
  {
    id: "evt-0",
    workspaceId: "ws-ventra-estate",
    type: "prospector",
    title: "Prospector AI opened a partner motion",
    detail: "Skyline Relocation Partners was discovered, enriched and moved into campaign, conversation and pipeline views in one demo flow.",
    time: "2 min ago",
  },
  {
    id: "evt-1",
    workspaceId: "ws-ventra-estate",
    type: "lead",
    title: "New premium lead",
    detail: "Quiz identified strong buyer intent and opened a pipeline deal in the same record.",
    time: "5 min ago",
  },
  {
    id: "evt-2",
    workspaceId: "ws-ventra-estate",
    type: "call",
    title: "Voice AI qualification completed",
    detail: "Budget and urgency confirmed. Meeting suggested for 5pm and logged in contact timeline.",
    time: "14 min ago",
  },
  {
    id: "evt-3",
    workspaceId: "ws-ventra-estate",
    type: "creative",
    title: "Creative pack shipped",
    detail: "Launch campaign now has refreshed hero, mockups and headlines tied to active opportunities.",
    time: "28 min ago",
  },
];

export const insights: Insight[] = [
  {
    id: "ins-1",
    workspaceId: "ws-ventra-estate",
    title: "Best leverage right now",
    detail: "Meta Ads plus qualification quiz are producing the most meeting-ready contacts. Scale there first.",
    tone: "primary",
  },
  {
    id: "ins-2",
    workspaceId: "ws-ventra-estate",
    title: "Commercial risk detected",
    detail: "Two hot opportunities still rely on manual proposal follow-up. Move them into task-backed flows.",
    tone: "warning",
  },
  {
    id: "ins-3",
    workspaceId: "ws-ventra-estate",
    title: "Creative insight",
    detail: "Assets tied to urgency and appointment framing outperform brochure-only variants by 24%.",
    tone: "info",
  },
  {
    id: "ins-4",
    workspaceId: "ws-ventra-estate",
    title: "Prospector AI signal",
    detail: "Strategic accounts discovered by Prospector AI are creating faster pipeline than cold outbound because campaign, pitch and Voice AI handoff are already prepared.",
    tone: "primary",
  },
];

export const contactTimelineEntries: ContactTimelineEntry[] = [
  {
    id: "timeline-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Acquisition",
    title: "Premium quiz captured buyer intent",
    detail: "Andrea completed the launch quiz and ranked high on urgency, budget fit and visit intent.",
    time: "Today, 08:58",
    outcome: "Lead scored 92 and contact created",
    tone: "success",
  },
  {
    id: "timeline-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Conversations",
    title: "WhatsApp handoff opened",
    detail: "Ventra created a live thread with grouped inventory context for Dario to continue the motion.",
    time: "Today, 09:11",
    outcome: "Conversation owner assigned",
    tone: "info",
  },
  {
    id: "timeline-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Voice AI",
    title: "Qualification call confirmed visit window",
    detail: "Voice AI validated buying horizon under 45 days and collected preferred tower and timing.",
    time: "Today, 09:22",
    outcome: "Meeting suggested for 5pm",
    tone: "success",
  },
  {
    id: "timeline-4",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Pipeline",
    title: "Deal moved into qualified stage",
    detail: "The contact is now tied to an active opportunity with owner, value and next action visible.",
    time: "Today, 09:34",
    outcome: "Onsite visit pending confirmation",
    tone: "info",
  },
  {
    id: "timeline-5",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Campaigns",
    title: "Launch campaign influenced response",
    detail: "Andrea interacted with the Mirador launch assets before starting the qualification flow.",
    time: "Today, 09:46",
    outcome: "Campaign touch tied to contact history",
    tone: "neutral",
  },
  {
    id: "timeline-5b",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    module: "Community",
    title: "Joined Altavista Inner Circle",
    detail: "Andrea entered the community onboarding flow, engaged with the launch checklist and now appears as a CRM-linked ambassador member.",
    time: "Today, 09:52",
    outcome: "Member profile synced to contact record",
    tone: "success",
  },
  {
    id: "timeline-6",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    module: "Voice AI",
    title: "Inbound objection call requested support",
    detail: "The contact asked for a revised payment schedule and flagged need for human follow-up.",
    time: "Today, 10:04",
    outcome: "Human takeover requested",
    tone: "warning",
  },
  {
    id: "timeline-7",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    module: "Conversations",
    title: "Recovery thread reopened",
    detail: "A recovery script re-engaged Martin after 14 days of silence and reopened deal momentum.",
    time: "Yesterday, 16:42",
    outcome: "Proposal discussion active again",
    tone: "success",
  },
  {
    id: "timeline-7b",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    module: "Community",
    title: "Referral playbook comment increased intent",
    detail: "Martin engaged inside Community, shared referral interest and created clearer context for the active proposal motion.",
    time: "Yesterday, 18:10",
    outcome: "Community activity added to contact context",
    tone: "info",
  },
  {
    id: "timeline-8",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    module: "Creative Studio",
    title: "Investor urgency pack shared",
    detail: "Creative Studio attached updated offer assets and closer notes directly to the recovery motion.",
    time: "Yesterday, 16:10",
    outcome: "Proposal narrative refreshed",
    tone: "info",
  },
  {
    id: "timeline-9",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    module: "Pipeline",
    title: "Deal advanced to proposal review",
    detail: "Camila is now preparing a blended package for a multi-unit commitment conversation.",
    time: "Today, 10:18",
    outcome: "Proposal delivery due today",
    tone: "warning",
  },
  {
    id: "timeline-10",
    workspaceId: "ws-ventra-estate",
    contactId: "con-3",
    module: "Widgets",
    title: "Exit intent widget captured a warm lead",
    detail: "Natalia converted from an inventory page widget after showing family-upgrade interest.",
    time: "Yesterday, 18:20",
    outcome: "Lead scored 74 and entered recovery track",
    tone: "info",
  },
  {
    id: "timeline-11",
    workspaceId: "ws-ventra-estate",
    contactId: "con-3",
    module: "Campaigns",
    title: "Brochure-driven nurture launched",
    detail: "A warm nurture campaign now keeps the contact tied to assets and follow-up timing.",
    time: "Yesterday, 19:05",
    outcome: "Funding path content sent",
    tone: "neutral",
  },
  {
    id: "timeline-12",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Prospector AI",
    title: "Strategic account discovered and enriched",
    detail: "Prospector AI mapped Skyline's relocation demand, response gap and bilingual partner opportunity before human outreach started.",
    time: "Today, 09:28",
    outcome: "Account saved with 94 score",
    tone: "success",
  },
  {
    id: "timeline-13",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Creative Studio",
    title: "Partner pitch kit generated",
    detail: "Creative Studio assembled an executive deck, referral mockup and proof narrative directly from the commercial audit.",
    time: "Today, 09:46",
    outcome: "Pitch ready for Camila",
    tone: "info",
  },
  {
    id: "timeline-14",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Campaigns",
    title: "Partner motion activated",
    detail: "The account entered a prospecting-specific campaign so proposals, scripts and follow-up stay in one commercial motion.",
    time: "Today, 09:58",
    outcome: "Campaign linked to account",
    tone: "neutral",
  },
  {
    id: "timeline-15",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Conversations",
    title: "Executive thread opened",
    detail: "Camila started a live partner conversation using the audit summary, outreach narrative and pitch link generated upstream.",
    time: "Today, 10:04",
    outcome: "Conversation queue active",
    tone: "success",
  },
  {
    id: "timeline-16",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Voice AI",
    title: "Concierge qualification scheduled",
    detail: "Voice AI is prepared to validate referral intake expectations and multilingual routing before the commercial review.",
    time: "Today, 10:20",
    outcome: "Call scheduled",
    tone: "info",
  },
  {
    id: "timeline-17",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Pipeline",
    title: "Opportunity moved to commit",
    detail: "The partner rollout opportunity is now visible with value, probability and next action tied to the same account record.",
    time: "Today, 10:28",
    outcome: "Proposal review pending",
    tone: "warning",
  },
  {
    id: "timeline-18",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    module: "Community",
    title: "Partner invite routed into Community",
    detail: "Skyline now has a member-facing partner lane with office hours, playbooks and onboarding copy tied to the same strategic account.",
    time: "Today, 10:34",
    outcome: "Community invite linked to account",
    tone: "info",
  },
];

export const contactTasks: ContactTask[] = [
  {
    id: "task-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    title: "Confirm onsite visit and send tower shortlist",
    owner: "Dario Perez",
    due: "Today, 12:30",
    status: "Now",
  },
  {
    id: "task-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    title: "Deliver blended payment proposal with legal support notes",
    owner: "Camila Rojas",
    due: "Today, 15:00",
    status: "Today",
  },
  {
    id: "task-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-3",
    title: "Review brochure reply and decide if Voice AI callback should fire",
    owner: "Dario Perez",
    due: "Tomorrow, 09:00",
    status: "Queued",
  },
  {
    id: "task-4",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    title: "Present partner proposal and confirm Voice AI concierge flow",
    owner: "Camila Rojas",
    due: "Today, 14:30",
    status: "Today",
  },
];

export const campaignTouches: CampaignTouch[] = [
  {
    id: "touch-1",
    workspaceId: "ws-ventra-estate",
    contactId: "con-1",
    campaignId: "camp-1",
    label: "Q2 tower launch",
    impact: "Quiz completion after premium launch assets",
  },
  {
    id: "touch-2",
    workspaceId: "ws-ventra-estate",
    contactId: "con-2",
    campaignId: "camp-2",
    label: "Warm lead recovery",
    impact: "Recovery creative and Voice AI script reopened the deal",
  },
  {
    id: "touch-3",
    workspaceId: "ws-ventra-estate",
    contactId: "con-3",
    campaignId: "camp-2",
    label: "Warm lead recovery",
    impact: "Brochure and nurture path kept the contact warm",
  },
  {
    id: "touch-4",
    workspaceId: "ws-ventra-estate",
    contactId: "con-4",
    campaignId: "camp-3",
    label: "Partner motion",
    impact: "Prospector AI account moved into a pitch-led partner campaign",
  },
];

export const notifications = [
  {
    id: "noti-1",
    title: "Prospector AI account activated",
    detail: "Skyline Relocation Partners moved from discovery into Contacts, Pipeline, Campaigns and Conversations with one coordinated handoff.",
    time: "1 min ago",
  },
  {
    id: "noti-2",
    title: "High-intent contact created",
    detail: "A qualified lead became a contact, opened a thread and generated a deal in one flow.",
    time: "2 min ago",
  },
  {
    id: "noti-3",
    title: "Creative pack attached to live campaign",
    detail: "Q2 tower launch now has fresh assets connected to active opportunities.",
    time: "18 min ago",
  },
  {
    id: "noti-4",
    title: "Conversation waiting owner reply",
    detail: "One hot account will miss SLA if nobody responds before noon.",
    time: "45 min ago",
  },
];

export const moduleCards = [
  {
    id: "prospector-ai",
    title: "Prospector AI",
    description: "Discover high-potential businesses, diagnose commercial pain and move new accounts into the Ventra revenue workflow before outreach starts.",
    icon: ScanSearch,
  },
  {
    id: "acquisition",
    title: "Acquisition",
    description: "Capture intent and qualify it before the contact ever reaches a rep or leaks out of the workflow.",
    icon: Target,
  },
  {
    id: "widgets",
    title: "Widgets",
    description: "Deploy premium entry points that create better contact records from the first interaction.",
    icon: Layers3,
  },
  {
    id: "voice-ai",
    title: "Voice AI",
    description: "Run inbound and outbound calls that enrich the same contact timeline and next-step logic.",
    icon: AudioWaveform,
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    description: "Produce launch assets and sales narratives that stay tied to campaigns and live opportunities.",
    icon: Sparkles,
  },
  {
    id: "conversations",
    title: "Conversations",
    description: "Operate follow-up, handoff and recovery from one inbox with pipeline-aware context.",
    icon: MessageSquareMore,
  },
  {
    id: "pipeline",
    title: "Pipeline",
    description: "Track ownership, probability and next best action without losing the contact story.",
    icon: BriefcaseBusiness,
  },
  {
    id: "campaigns",
    title: "Campaigns",
    description: "Measure how assets and audiences influence revenue, not only traffic.",
    icon: ChartColumnIncreasing,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Read growth through the full motion from capture to close and recovery.",
    icon: Activity,
  },
  {
    id: "automations",
    title: "Automations",
    description: "Trigger score-driven handoffs and keep the operating system moving without leaks.",
    icon: Workflow,
  },
];

export const landingHighlights = [
  "Discover more opportunities before your team even starts outreach.",
  "Diagnose, capture and route demand faster with less leakage and better control.",
  "Follow up, reactivate and close from one revenue workflow instead of disconnected tools.",
];

export const pricingPlans = [
  {
    name: "Growth",
    price: "$149",
    description: "For teams that need to discover and capture more opportunities while keeping follow-up under one visible workflow.",
    cta: "Launch Growth",
    highlight: false,
    features: ["Prospector AI + Acquisition", "Shared contact history", "Conversations inbox", "Basic Voice AI"],
  },
  {
    name: "Scale",
    price: "$349",
    description: "For operators running prospecting, campaigns, creative systems and multi-channel closing from one commercial spine.",
    cta: "Start Scale",
    highlight: true,
    features: ["Everything in Growth", "Creative Studio", "Advanced Voice AI", "Automations + analytics"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For revenue teams that need governance, rollout support and a more tailored operating model.",
    cta: "Talk to Ventra",
    highlight: false,
    features: ["Unlimited workspaces", "Advanced permissions", "Guided rollout", "Custom integrations"],
  },
];

export const faqItems = [
  {
    question: "Is Ventra just another CRM?",
    answer: "No. Contacts and pipeline are the central spine, but Ventra wins because Prospector AI, acquisition, creative, conversations and Voice AI all operate on top of the same revenue workflow.",
  },
  {
    question: "Can this demo sell the product without backend readiness?",
    answer: "Yes. The frontend is intentionally modeled with coherent data, routes and flows so the product can be sold, tested and narrated before backend convergence.",
  },
  {
    question: "What happens after the quiz?",
    answer: "The quiz identifies the strongest growth motion, recommends modules like Prospector AI, Widgets, Conversations, Voice AI or Creative Studio, and pushes the visitor into a clearer demo path.",
  },
];

export const onboardingGoals = [
  "Capture more qualified demand",
  "Speed up response time",
  "Improve follow-up and recovery",
  "Systematize launch assets and campaigns",
];

export const onboardingChannels = [
  "WhatsApp",
  "Web forms",
  "Landing quiz",
  "Meta lead ads",
  "Inbound calls",
  "Voice AI callbacks",
];

export function getWorkspaceById(workspaceId: string | null | undefined) {
  return workspaces.find((workspace) => workspace.id === workspaceId) ?? workspaces[0];
}

export function getContactTimeline(contactId: string) {
  return contactTimelineEntries.filter((item) => item.contactId === contactId);
}

export function getContactTasks(contactId: string) {
  return contactTasks.filter((item) => item.contactId === contactId);
}

export function getContactCampaignTouches(contactId: string) {
  return campaignTouches.filter((item) => item.contactId === contactId);
}

export function getWorkspaceData(workspaceId: string | null | undefined) {
  const workspace = getWorkspaceById(workspaceId);

  return {
    workspace,
    metrics: metricsByWorkspace[workspace.id] ?? metricsByWorkspace[workspaces[0].id],
    leads: leads.filter((item) => item.workspaceId === workspace.id),
    contacts: contacts.filter((item) => item.workspaceId === workspace.id),
    threads: threads.filter((item) => item.workspaceId === workspace.id),
    voiceCalls: voiceCalls.filter((item) => item.workspaceId === workspace.id),
    widgets: widgets.filter((item) => item.workspaceId === workspace.id),
    creativeProjects: creativeProjects.filter((item) => item.workspaceId === workspace.id),
    campaigns: campaigns.filter((item) => item.workspaceId === workspace.id),
    deals: deals.filter((item) => item.workspaceId === workspace.id),
    automations: automations.filter((item) => item.workspaceId === workspace.id),
    events: events.filter((item) => item.workspaceId === workspace.id),
    insights: insights.filter((item) => item.workspaceId === workspace.id),
    timeline: contactTimelineEntries.filter((item) => item.workspaceId === workspace.id),
    tasks: contactTasks.filter((item) => item.workspaceId === workspace.id),
    campaignTouches: campaignTouches.filter((item) => item.workspaceId === workspace.id),
  };
}
