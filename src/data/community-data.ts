import { getWorkspaceById } from "@/data/mock-data";

export type CommunityVisibility = "Private" | "Members only" | "Public waitlist";
export type CommunityMemberRole = "Owner" | "Admin" | "Moderator" | "Member" | "Ambassador";
export type CommunityMemberStatus = "Active" | "Invited" | "At risk";
export type CommunityEventStatus = "Scheduled" | "Open seats" | "Replay ready";
export type CommunityMemberActivityLevel = "High" | "Moderate" | "Low";
export type CommunityMemberLifecycle = "Customer" | "Partner" | "Lead" | "Operator";
export type CommunityContributionType = "Post" | "Comment" | "Reply";
export type CommunityMemberEventStatus = "Attended" | "Upcoming" | "Replay watched";
export type CommunityCampaignPlayType = "Invite campaign" | "Re-engagement" | "Event reminder" | "New member nurture";

export type CommunitySummary = {
  totalMembers: number;
  activeMembers: number;
  postsThisWeek: number;
  upcomingEvents: number;
  engagementScore: string;
};

export type CommunityProfile = {
  name: string;
  tagline: string;
  description: string;
  visibility: CommunityVisibility;
  domain: string;
  logoLabel: string;
  coverLabel: string;
  primaryCta: string;
  welcomeMessage: string;
};

export type CommunitySpace = {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  access: "Open" | "Private" | "Cohort";
};

export type CommunityComment = {
  id: string;
  author: string;
  role: string;
  content: string;
  time: string;
};

export type CommunityPost = {
  id: string;
  workspaceId: string;
  spaceId: string;
  author: string;
  role: string;
  title: string;
  content: string;
  pinned?: boolean;
  likes: number;
  commentsCount: number;
  reactions: string[];
  time: string;
  comments: CommunityComment[];
  contactId?: string;
  campaignId?: string;
};

export type CommunityMemberContribution = {
  id: string;
  type: CommunityContributionType;
  title: string;
  space: string;
  summary: string;
  time: string;
  engagement: string;
};

export type CommunityMemberEventLink = {
  id: string;
  eventId: string;
  title: string;
  dateLabel: string;
  status: CommunityMemberEventStatus;
  detail: string;
};

export type CommunityMemberNote = {
  id: string;
  author: string;
  time: string;
  content: string;
};

export type CommunityMemberQuickAction = {
  label: string;
  detail: string;
  to: string;
};

export type CommunityMember = {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  role: CommunityMemberRole;
  joinedAt: string;
  activity: string;
  status: CommunityMemberStatus;
  source: "Contacts" | "Campaigns" | "Referral" | "Manual";
  title: string;
  company: string;
  avatarLabel: string;
  lifecycle: CommunityMemberLifecycle;
  activityLevel: CommunityMemberActivityLevel;
  activityScore: number;
  contactId?: string;
  linkedCampaignIds?: string[];
  spaces: string[];
  tags: string[];
  recentContributions: CommunityMemberContribution[];
  eventParticipation: CommunityMemberEventLink[];
  notes: CommunityMemberNote[];
  quickActions: CommunityMemberQuickAction[];
};

export type CommunityEvent = {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  dateLabel: string;
  timeLabel: string;
  host: string;
  attendees: number;
  status: CommunityEventStatus;
  ctaLabel: string;
};

export type CommunityGrowthPoint = {
  label: string;
  members: number;
  active: number;
  posts: number;
};

export type CommunityTopSpace = {
  id: string;
  name: string;
  members: number;
  engagement: string;
  activityDelta: string;
};

export type CommunityHighEngagementMember = {
  memberId: string;
  name: string;
  label: string;
  detail: string;
  score: number;
};

export type CommunityCampaignPlay = {
  id: string;
  type: CommunityCampaignPlayType;
  title: string;
  detail: string;
  audience: string;
  ctaLabel: string;
  to: string;
  campaignId?: string;
  recommendedMemberIds: string[];
};

export type CommunityAnalytics = {
  engagementRate: string;
  eventAttendance: string;
  memberGrowth: string;
  linkedContacts: number;
  syncCoverage: string;
  growthSeries: CommunityGrowthPoint[];
  topSpaces: CommunityTopSpace[];
  highEngagementMembers: CommunityHighEngagementMember[];
};

export type CommunityWorkspaceData = {
  workspaceName: string;
  summary: CommunitySummary;
  profile: CommunityProfile;
  spaces: CommunitySpace[];
  posts: CommunityPost[];
  members: CommunityMember[];
  events: CommunityEvent[];
  analytics: CommunityAnalytics;
  campaignPlays: CommunityCampaignPlay[];
  featuredHighlights: string[];
  quickActions: Array<{ label: string; detail: string; to: string }>;
};

const communityByWorkspace: Record<string, Omit<CommunityWorkspaceData, "workspaceName">> = {
  "ws-ventra-estate": {
    summary: {
      totalMembers: 284,
      activeMembers: 196,
      postsThisWeek: 18,
      upcomingEvents: 4,
      engagementScore: "87%",
    },
    profile: {
      name: "Altavista Inner Circle",
      tagline: "Build a branded community around premium buyers, partners and launches.",
      description: "Centralize your audience, turn customers into members and host content, sessions and conversations in one private experience.",
      visibility: "Private",
      domain: "community.altavista.pe",
      logoLabel: "AIC",
      coverLabel: "Launch stories, partner sessions and member wins",
      primaryCta: "Invite members",
      welcomeMessage: "Welcome members into one premium hub connected to campaigns, conversations and follow-up.",
    },
    spaces: [
      { id: "space-announcements", workspaceId: "ws-ventra-estate", name: "Announcements", description: "Launch updates and pinned opportunities.", members: 284, posts: 12, access: "Open" },
      { id: "space-playbooks", workspaceId: "ws-ventra-estate", name: "Playbooks", description: "Templates and resources tied to campaigns.", members: 168, posts: 27, access: "Private" },
      { id: "space-sessions", workspaceId: "ws-ventra-estate", name: "Sessions", description: "Office hours and live cohort moments.", members: 104, posts: 9, access: "Cohort" },
      { id: "space-wins", workspaceId: "ws-ventra-estate", name: "Wins", description: "Member stories and proof points.", members: 142, posts: 21, access: "Open" },
    ],
    posts: [
      {
        id: "post-1",
        workspaceId: "ws-ventra-estate",
        spaceId: "space-announcements",
        author: "Camila Rojas",
        role: "Community lead",
        title: "Pinned: March member onboarding path",
        content: "The new onboarding checklist keeps campaigns, follow-up and sessions aligned in one member journey.",
        pinned: true,
        likes: 54,
        commentsCount: 8,
        reactions: ["Like", "Celebrate", "Helpful"],
        time: "Today · 9:10 AM",
        comments: [
          { id: "comment-1", author: "Andrea Del Solar", role: "Member", content: "The checklist feels much clearer.", time: "10 min ago" },
          { id: "comment-2", author: "Jazmin Solis", role: "Moderator", content: "We tied the invite sequence to the active campaign.", time: "4 min ago" },
        ],
        campaignId: "camp-1",
      },
      {
        id: "post-2",
        workspaceId: "ws-ventra-estate",
        spaceId: "space-playbooks",
        author: "Dario Perez",
        role: "Growth advisor",
        title: "Sales script for member referrals",
        content: "This script is aligned with the latest contact tags and campaign follow-up.",
        likes: 31,
        commentsCount: 5,
        reactions: ["Like", "Save"],
        time: "Yesterday · 5:45 PM",
        comments: [{ id: "comment-3", author: "Martin Valera", role: "Ambassador", content: "We already used this and got three referrals.", time: "Yesterday · 6:10 PM" }],
        contactId: "con-2",
      },
      {
        id: "post-3",
        workspaceId: "ws-ventra-estate",
        spaceId: "space-wins",
        author: "Paola Velez",
        role: "Member success",
        title: "Member win: from webinar attendee to signed buyer",
        content: "A community attendee moved into Contacts, joined a consultation and closed in five days.",
        likes: 44,
        commentsCount: 6,
        reactions: ["Celebrate", "Like"],
        time: "2 days ago",
        comments: [{ id: "comment-4", author: "Camila Rojas", role: "Community lead", content: "This is the exact motion we want to repeat next month.", time: "2 days ago" }],
      },
      {
        id: "post-4",
        workspaceId: "ws-ventra-estate",
        spaceId: "space-sessions",
        author: "Lucia Mena",
        role: "Session host",
        title: "Office hours replay is now available",
        content: "Replay and notes are live, and pricing questions are now tagged for follow-up.",
        likes: 19,
        commentsCount: 3,
        reactions: ["Helpful"],
        time: "3 days ago",
        comments: [{ id: "comment-5", author: "Roberto Diaz", role: "Member", content: "Can we open a thread for the pricing Q&A?", time: "3 days ago" }],
      },
    ],
    members: [
      {
        id: "member-1",
        workspaceId: "ws-ventra-estate",
        name: "Andrea Del Solar",
        email: "andrea@altavista.pe",
        role: "Ambassador",
        joinedAt: "Mar 03, 2026",
        activity: "Posted 3 times this week",
        status: "Active",
        source: "Contacts",
        title: "Premium buyer and referral advocate",
        company: "Independent buyer",
        avatarLabel: "AD",
        lifecycle: "Customer",
        activityLevel: "High",
        activityScore: 94,
        contactId: "con-1",
        linkedCampaignIds: ["camp-1"],
        spaces: ["Announcements", "Wins", "Sessions"],
        tags: ["VIP buyer", "Referral advocate", "Launch cohort"],
        recentContributions: [
          { id: "m1-c1", type: "Comment", title: "March member onboarding path", space: "Announcements", summary: "Asked for a concierge walkthrough.", time: "10 min ago", engagement: "8 replies" },
          { id: "m1-c2", type: "Post", title: "Site visit recap", space: "Wins", summary: "Shared how the guided tour clarified her next step.", time: "Yesterday", engagement: "22 likes" },
        ],
        eventParticipation: [
          { id: "m1-e1", eventId: "event-1", title: "Premium buyer onboarding session", dateLabel: "Mar 18", status: "Upcoming", detail: "Confirmed attendance and wants a financing Q&A slot." },
          { id: "m1-e2", eventId: "event-3", title: "Replay: launch Q&A", dateLabel: "Available now", status: "Replay watched", detail: "Replay helped reopen a live visit discussion." },
        ],
        notes: [
          { id: "m1-n1", author: "Camila Rojas", time: "Today · 9:42 AM", content: "Best example of community -> contact -> deal continuity in the demo." },
          { id: "m1-n2", author: "Paola Velez", time: "Yesterday · 4:16 PM", content: "Strong candidate for ambassador storytelling in the next launch." },
        ],
        quickActions: [
          { label: "Open CRM contact", detail: "Review the commercial record behind this member.", to: "/app/contacts/con-1" },
          { label: "Open launch campaign", detail: "Inspect the motion that influenced this journey.", to: "/app/campaigns/camp-1" },
          { label: "Review Analytics", detail: "See where this member appears in the engagement scoreboard.", to: "/app/analytics" },
        ],
      },
      {
        id: "member-2",
        workspaceId: "ws-ventra-estate",
        name: "Martin Valera",
        email: "martin@urbanedge.pe",
        role: "Member",
        joinedAt: "Mar 08, 2026",
        activity: "Commented on referral playbook",
        status: "Active",
        source: "Contacts",
        title: "Investor member in proposal review",
        company: "Family office",
        avatarLabel: "MV",
        lifecycle: "Lead",
        activityLevel: "Moderate",
        activityScore: 82,
        contactId: "con-2",
        linkedCampaignIds: ["camp-2"],
        spaces: ["Playbooks", "Announcements"],
        tags: ["Investor", "Warm recovery", "Proposal stage"],
        recentContributions: [
          { id: "m2-c1", type: "Comment", title: "Sales script for member referrals", space: "Playbooks", summary: "Said the script generated three introductions.", time: "Yesterday · 6:10 PM", engagement: "5 reactions" },
          { id: "m2-c2", type: "Reply", title: "Offer timing thread", space: "Announcements", summary: "Asked for a tighter proposal path.", time: "2 days ago", engagement: "3 replies" },
        ],
        eventParticipation: [
          { id: "m2-e1", eventId: "event-2", title: "Partner playbook office hours", dateLabel: "Mar 20", status: "Upcoming", detail: "Interested in partner-side referral scripts." },
          { id: "m2-e2", eventId: "event-3", title: "Replay: launch Q&A", dateLabel: "Available now", status: "Replay watched", detail: "Replay is referenced in the live proposal." },
        ],
        notes: [
          { id: "m2-n1", author: "Camila Rojas", time: "Today · 10:08 AM", content: "Good fit for a re-engagement plus community proof motion." },
          { id: "m2-n2", author: "Dario Perez", time: "Yesterday · 6:40 PM", content: "Community comments should be mirrored in the contact record." },
        ],
        quickActions: [
          { label: "Open CRM contact", detail: "Check proposal stage, owner and recovery signals.", to: "/app/contacts/con-2" },
          { label: "Open recovery campaign", detail: "Inspect the warm-lead motion tied to this member.", to: "/app/campaigns/camp-2" },
          { label: "Open Community feed", detail: "Return to the posts that reactivated this relationship.", to: "/app/community/feed" },
        ],
      },
      {
        id: "member-3",
        workspaceId: "ws-ventra-estate",
        name: "Skyline Relocation Partners",
        email: "growth@skyline-relocation.pe",
        role: "Member",
        joinedAt: "Mar 10, 2026",
        activity: "Joined from partner campaign",
        status: "Invited",
        source: "Campaigns",
        title: "Strategic partner workspace for referral growth",
        company: "Skyline Relocation Partners",
        avatarLabel: "SR",
        lifecycle: "Partner",
        activityLevel: "Moderate",
        activityScore: 76,
        contactId: "con-4",
        linkedCampaignIds: ["camp-3"],
        spaces: ["Playbooks", "Sessions"],
        tags: ["Partner motion", "Invite pending", "Bilingual"],
        recentContributions: [
          { id: "m3-c1", type: "Reply", title: "Referral routing checklist", space: "Playbooks", summary: "Requested a bilingual version before rollout.", time: "Today · 9:34 AM", engagement: "2 replies" },
          { id: "m3-c2", type: "Comment", title: "Partner playbook preview", space: "Sessions", summary: "Left a note on referral handoff expectations.", time: "Yesterday", engagement: "4 reactions" },
        ],
        eventParticipation: [{ id: "m3-e1", eventId: "event-2", title: "Partner playbook office hours", dateLabel: "Mar 20", status: "Upcoming", detail: "Invite is tied to the partner campaign and CRM follow-up." }],
        notes: [
          { id: "m3-n1", author: "Camila Rojas", time: "Today · 10:28 AM", content: "Already represented in Contacts and Pipeline. Community should reinforce the same account narrative." },
          { id: "m3-n2", author: "Jazmin Solis", time: "Yesterday · 5:10 PM", content: "Keep partner invite, campaign proof and onboarding aligned for the demo." },
        ],
        quickActions: [
          { label: "Open linked CRM contact", detail: "Inspect the strategic account record.", to: "/app/contacts/con-4" },
          { label: "Open partner campaign", detail: "Review the campaign driving this invite motion.", to: "/app/campaigns/camp-3" },
          { label: "Open partner opportunity", detail: "Jump into the associated pipeline detail.", to: "/app/pipeline/deal-4" },
        ],
      },
      {
        id: "member-4",
        workspaceId: "ws-ventra-estate",
        name: "Cumbres Wealth Circle",
        email: "alliances@cumbreswealth.ec",
        role: "Moderator",
        joinedAt: "Mar 11, 2026",
        activity: "Hosting next session",
        status: "Active",
        source: "Referral",
        title: "Partner moderator coordinating cross-border intros",
        company: "Cumbres Wealth Circle",
        avatarLabel: "CW",
        lifecycle: "Partner",
        activityLevel: "High",
        activityScore: 88,
        linkedCampaignIds: ["camp-3"],
        spaces: ["Sessions", "Wins"],
        tags: ["Moderator", "Referral partner", "Session host"],
        recentContributions: [{ id: "m4-c1", type: "Post", title: "Partner intro checklist", space: "Sessions", summary: "Outlined prep needed before referring premium buyers.", time: "Today · 8:10 AM", engagement: "14 likes" }],
        eventParticipation: [{ id: "m4-e1", eventId: "event-2", title: "Partner playbook office hours", dateLabel: "Mar 20", status: "Upcoming", detail: "Hosting the live session with Dario." }],
        notes: [{ id: "m4-n1", author: "Paola Velez", time: "Today · 7:42 AM", content: "Not yet in Contacts. Good example of a community-native partner to promote later." }],
        quickActions: [
          { label: "Open Campaigns", detail: "Use the partner motion to keep this moderator active.", to: "/app/campaigns" },
          { label: "Open Events", detail: "Review the session where this partner is hosting.", to: "/app/community/events" },
          { label: "Open Workspaces", detail: "Check how this hub fits into the workspace narrative.", to: "/app/workspaces" },
        ],
      },
      {
        id: "member-5",
        workspaceId: "ws-ventra-estate",
        name: "Paola Velez",
        email: "paola@ventra.app",
        role: "Admin",
        joinedAt: "Feb 27, 2026",
        activity: "Reviewed 12 new members",
        status: "Active",
        source: "Manual",
        title: "Member success operator",
        company: "Ventra",
        avatarLabel: "PV",
        lifecycle: "Operator",
        activityLevel: "High",
        activityScore: 91,
        linkedCampaignIds: ["camp-1", "camp-2"],
        spaces: ["Announcements", "Wins", "Playbooks"],
        tags: ["Operator", "Retention", "Moderation"],
        recentContributions: [{ id: "m5-c1", type: "Post", title: "Member win: from webinar attendee to signed buyer", space: "Wins", summary: "Published the strongest proof point linking Community to pipeline.", time: "2 days ago", engagement: "44 likes" }],
        eventParticipation: [{ id: "m5-e1", eventId: "event-1", title: "Premium buyer onboarding session", dateLabel: "Mar 18", status: "Upcoming", detail: "Preparing concierge assets and onboarding notes." }],
        notes: [{ id: "m5-n1", author: "Camila Rojas", time: "Yesterday · 6:14 PM", content: "Key operator for the demo. Keeps feed, events and notes coherent with the commercial story." }],
        quickActions: [
          { label: "Open Analytics", detail: "Track the retention and engagement layers this operator manages.", to: "/app/analytics" },
          { label: "Open Settings", detail: "Review the moderation and onboarding configuration.", to: "/app/community/settings" },
        ],
      },
      {
        id: "member-6",
        workspaceId: "ws-ventra-estate",
        name: "Roberto Diaz",
        email: "roberto@cloudpeak.io",
        role: "Member",
        joinedAt: "Mar 02, 2026",
        activity: "No activity in 9 days",
        status: "At risk",
        source: "Contacts",
        title: "Dormant member with pricing objections",
        company: "CloudPeak",
        avatarLabel: "RD",
        lifecycle: "Lead",
        activityLevel: "Low",
        activityScore: 41,
        spaces: ["Sessions"],
        tags: ["At risk", "Needs follow-up", "Pricing objections"],
        recentContributions: [{ id: "m6-c1", type: "Comment", title: "Office hours replay is now available", space: "Sessions", summary: "Asked for a thread to share pricing Q&A.", time: "3 days ago", engagement: "1 reply" }],
        eventParticipation: [
          { id: "m6-e1", eventId: "event-3", title: "Replay: launch Q&A", dateLabel: "Available now", status: "Replay watched", detail: "Replay consumed but no recent action since the pricing concern." },
          { id: "m6-e2", eventId: "event-1", title: "Premium buyer onboarding session", dateLabel: "Mar 18", status: "Upcoming", detail: "Good candidate for an event reminder plus re-engagement motion." },
        ],
        notes: [{ id: "m6-n1", author: "Dario Perez", time: "Today · 8:42 AM", content: "Not linked to a CRM contact yet. Community activity still suggests buying intent." }],
        quickActions: [
          { label: "Open Campaigns", detail: "Launch a re-engagement motion from Campaigns.", to: "/app/campaigns" },
          { label: "Open Analytics", detail: "Review at-risk behavior next to overall engagement.", to: "/app/analytics" },
        ],
      },
    ],
    events: [
      { id: "event-1", workspaceId: "ws-ventra-estate", title: "Premium buyer onboarding session", description: "Offer, timeline and concierge flow for new buyers.", dateLabel: "Mar 18", timeLabel: "10:00 AM PET", host: "Camila Rojas", attendees: 38, status: "Open seats", ctaLabel: "View session" },
      { id: "event-2", workspaceId: "ws-ventra-estate", title: "Partner playbook office hours", description: "Referral scripts and the next partner campaign push.", dateLabel: "Mar 20", timeLabel: "4:00 PM PET", host: "Dario Perez", attendees: 22, status: "Scheduled", ctaLabel: "Join session" },
      { id: "event-3", workspaceId: "ws-ventra-estate", title: "Replay: launch Q&A", description: "Replay and notes from last week's community launch.", dateLabel: "Available now", timeLabel: "Replay", host: "Lucia Mena", attendees: 61, status: "Replay ready", ctaLabel: "Watch replay" },
    ],
    analytics: {
      engagementRate: "69%",
      eventAttendance: "121 attendees",
      memberGrowth: "+14% MoM",
      linkedContacts: 3,
      syncCoverage: "53% of key members linked to Contacts",
      growthSeries: [
        { label: "W1", members: 226, active: 148, posts: 9 },
        { label: "W2", members: 239, active: 157, posts: 12 },
        { label: "W3", members: 251, active: 171, posts: 14 },
        { label: "W4", members: 268, active: 184, posts: 16 },
        { label: "W5", members: 276, active: 191, posts: 17 },
        { label: "W6", members: 284, active: 196, posts: 18 },
      ],
      topSpaces: [
        { id: "space-wins", name: "Wins", members: 142, engagement: "72%", activityDelta: "+11% this week" },
        { id: "space-playbooks", name: "Playbooks", members: 168, engagement: "66%", activityDelta: "+8% this week" },
        { id: "space-announcements", name: "Announcements", members: 284, engagement: "61%", activityDelta: "+5% this week" },
      ],
      highEngagementMembers: [
        { memberId: "member-1", name: "Andrea Del Solar", label: "CRM-linked ambassador", detail: "Community activity is already reinforcing a live opportunity.", score: 94 },
        { memberId: "member-5", name: "Paola Velez", label: "Operator momentum", detail: "Drives moderation, proof content and member onboarding.", score: 91 },
        { memberId: "member-4", name: "Cumbres Wealth Circle", label: "Partner-hosted influence", detail: "Hosting the next session and shaping partner referrals.", score: 88 },
      ],
    },
    campaignPlays: [
      { id: "community-play-1", type: "Invite campaign", title: "Launch cohort invite push", detail: "Invite buyers and partners who touched launch content but have not activated their profile yet.", audience: "12 invite-ready records across Contacts and member tags", ctaLabel: "Open launch campaign", to: "/app/campaigns/camp-1", campaignId: "camp-1", recommendedMemberIds: ["member-3", "member-6"] },
      { id: "community-play-2", type: "Re-engagement", title: "Dormant member recovery motion", detail: "Reconnect at-risk members with replay content, WhatsApp follow-up and a tighter CTA.", audience: "9 low-activity members tagged for warm recovery", ctaLabel: "Open recovery campaign", to: "/app/campaigns/camp-2", campaignId: "camp-2", recommendedMemberIds: ["member-2", "member-6"] },
      { id: "community-play-3", type: "Event reminder", title: "Partner office hours reminder", detail: "Push session reminders before office hours and route attendees into Contacts.", audience: "22 partner and ambassador members tied to the next event", ctaLabel: "Open community events", to: "/app/community/events", recommendedMemberIds: ["member-3", "member-4"] },
      { id: "community-play-4", type: "New member nurture", title: "First 7-day nurture sequence", detail: "Guide new members through welcome content, events and CRM-aware next actions.", audience: "14 recent members from campaigns and contact invites", ctaLabel: "Open Community builder", to: "/app/community/setup", recommendedMemberIds: ["member-1", "member-3"] },
    ],
    featuredHighlights: [
      "Build a branded community around every launch and customer milestone.",
      "Turn customers into members with one coordinated feed, event calendar and member directory.",
      "Route campaigns, contacts and follow-up into the same community experience.",
    ],
    quickActions: [
      { label: "Open Contacts", detail: "Review the commercial records behind your newest members.", to: "/app/contacts" },
      { label: "Launch Campaigns", detail: "Promote sessions, drops and cohort invites from one motion.", to: "/app/campaigns" },
      { label: "Check Analytics", detail: "Track engagement, activation and contribution to revenue.", to: "/app/analytics" },
      { label: "Open Workspaces", detail: "See how Community fits the current workspace posture.", to: "/app/workspaces" },
    ],
  },
  "ws-ventra-clinic": {
    summary: { totalMembers: 172, activeMembers: 121, postsThisWeek: 11, upcomingEvents: 3, engagementScore: "81%" },
    profile: {
      name: "Smile Growth Club",
      tagline: "Host content, sessions and private support around every patient journey.",
      description: "Create a premium member space for consultations, education and loyalty moments without leaving the Ventra ecosystem.",
      visibility: "Members only",
      domain: "club.novadental.co",
      logoLabel: "SGC",
      coverLabel: "Private sessions, patient wins and referral education",
      primaryCta: "Publish update",
      welcomeMessage: "Give patients and partners a clear place to learn, engage and book next steps.",
    },
    spaces: [
      { id: "clinic-announcements", workspaceId: "ws-ventra-clinic", name: "Announcements", description: "Clinic updates and member notices.", members: 172, posts: 8, access: "Open" },
      { id: "clinic-treatments", workspaceId: "ws-ventra-clinic", name: "Treatment journeys", description: "Education, before/after care and guided check-ins.", members: 118, posts: 16, access: "Private" },
      { id: "clinic-sessions", workspaceId: "ws-ventra-clinic", name: "Live sessions", description: "Q&A, consultation prep and replay-ready sessions.", members: 83, posts: 7, access: "Cohort" },
    ],
    posts: [
      {
        id: "clinic-post-1",
        workspaceId: "ws-ventra-clinic",
        spaceId: "clinic-announcements",
        author: "Lucia Saenz",
        role: "Community lead",
        title: "Pinned: whitening program welcome guide",
        content: "New members now receive the whitening checklist, FAQs and booking flow in one community post.",
        pinned: true,
        likes: 36,
        commentsCount: 4,
        reactions: ["Like", "Helpful"],
        time: "Today · 8:20 AM",
        comments: [{ id: "clinic-comment-1", author: "Aura Wellness Hub", role: "Partner", content: "This is exactly what we want to share with our referrals.", time: "2 hours ago" }],
      },
      {
        id: "clinic-post-2",
        workspaceId: "ws-ventra-clinic",
        spaceId: "clinic-treatments",
        author: "Mariela Costa",
        role: "Moderator",
        title: "Patient win: consultation to referral in one week",
        content: "A patient joined the private group, attended the live Q&A and referred two friends.",
        likes: 22,
        commentsCount: 2,
        reactions: ["Celebrate"],
        time: "Yesterday · 4:00 PM",
        comments: [{ id: "clinic-comment-2", author: "Lucia Saenz", role: "Community lead", content: "We should feature this in the next retention campaign.", time: "Yesterday · 5:14 PM" }],
      },
    ],
    members: [
      {
        id: "clinic-member-1",
        workspaceId: "ws-ventra-clinic",
        name: "Aura Wellness Hub",
        email: "marketing@aurawellness.co",
        role: "Ambassador",
        joinedAt: "Mar 05, 2026",
        activity: "Shared the welcome guide",
        status: "Active",
        source: "Campaigns",
        title: "Referral partner driving patient education",
        company: "Aura Wellness Hub",
        avatarLabel: "AW",
        lifecycle: "Partner",
        activityLevel: "High",
        activityScore: 89,
        spaces: ["Announcements", "Live sessions"],
        tags: ["Partner", "Referral motion", "Health education"],
        recentContributions: [{ id: "cm1-c1", type: "Comment", title: "Whitening program welcome guide", space: "Announcements", summary: "Requested more partner-facing assets for referrals.", time: "2 hours ago", engagement: "4 replies" }],
        eventParticipation: [{ id: "cm1-e1", eventId: "clinic-event-2", title: "Referral partner session", dateLabel: "Mar 22", status: "Upcoming", detail: "Booked to review invite flows and repeat consultation nudges." }],
        notes: [{ id: "cm1-n1", author: "Lucia Saenz", time: "Today · 9:15 AM", content: "High-engagement partner, but still no CRM sync in this workspace demo." }],
        quickActions: [
          { label: "Open Campaigns", detail: "Review the referral motions connected to this partner.", to: "/app/campaigns" },
          { label: "Open Workspaces", detail: "Inspect the clinic workspace posture and setup.", to: "/app/workspaces" },
        ],
      },
      {
        id: "clinic-member-2",
        workspaceId: "ws-ventra-clinic",
        name: "Valeria Torres",
        email: "valeria@novadental.co",
        role: "Admin",
        joinedAt: "Mar 01, 2026",
        activity: "Moderated 6 comments",
        status: "Active",
        source: "Manual",
        title: "Clinic operations lead",
        company: "Nova Dental Group",
        avatarLabel: "VT",
        lifecycle: "Operator",
        activityLevel: "High",
        activityScore: 92,
        spaces: ["Announcements", "Treatment journeys", "Live sessions"],
        tags: ["Operator", "Member success", "Consultation prep"],
        recentContributions: [{ id: "cm2-c1", type: "Reply", title: "Patient onboarding Q&A", space: "Treatment journeys", summary: "Answered post-treatment questions and linked next steps to the live session.", time: "Today · 7:32 AM", engagement: "6 replies" }],
        eventParticipation: [{ id: "cm2-e1", eventId: "clinic-event-1", title: "Smile design live Q&A", dateLabel: "Mar 19", status: "Upcoming", detail: "Hosting the live Q&A and aligning follow-up messaging." }],
        notes: [{ id: "cm2-n1", author: "Mariela Costa", time: "Today · 8:42 AM", content: "Keeps the member experience polished even without backend or CRM sync." }],
        quickActions: [
          { label: "Open Analytics", detail: "Track patient engagement and session attendance.", to: "/app/analytics" },
          { label: "Open Community settings", detail: "Refine welcome copy, access rules and onboarding.", to: "/app/community/settings" },
        ],
      },
      {
        id: "clinic-member-3",
        workspaceId: "ws-ventra-clinic",
        name: "Carlos Rivera",
        email: "carlos@email.com",
        role: "Member",
        joinedAt: "Mar 09, 2026",
        activity: "Booked a follow-up session",
        status: "Active",
        source: "Contacts",
        title: "Treatment prospect with repeat interest",
        company: "Patient member",
        avatarLabel: "CR",
        lifecycle: "Lead",
        activityLevel: "Moderate",
        activityScore: 78,
        spaces: ["Treatment journeys", "Live sessions"],
        tags: ["Consultation follow-up", "Education engaged"],
        recentContributions: [{ id: "cm3-c1", type: "Comment", title: "Consultation prep checklist", space: "Treatment journeys", summary: "Asked for more detail on treatment timing and post-visit care.", time: "Yesterday", engagement: "2 replies" }],
        eventParticipation: [{ id: "cm3-e1", eventId: "clinic-event-1", title: "Smile design live Q&A", dateLabel: "Mar 19", status: "Upcoming", detail: "Likely conversion candidate after the live Q&A." }],
        notes: [{ id: "cm3-n1", author: "Valeria Torres", time: "Yesterday · 6:05 PM", content: "Good example of a community-engaged patient who should later graduate into a richer CRM demo." }],
        quickActions: [
          { label: "Open Contacts", detail: "Inspect the workspace contact surface for follow-up continuity.", to: "/app/contacts" },
          { label: "Open Campaigns", detail: "Review the nurture and reminder motions for engaged patients.", to: "/app/campaigns" },
        ],
      },
      {
        id: "clinic-member-4",
        workspaceId: "ws-ventra-clinic",
        name: "Sonrisa Kids Club",
        email: "hello@sonrisakids.pe",
        role: "Member",
        joinedAt: "Mar 12, 2026",
        activity: "Invite pending",
        status: "Invited",
        source: "Referral",
        title: "Referral partner candidate awaiting activation",
        company: "Sonrisa Kids Club",
        avatarLabel: "SK",
        lifecycle: "Partner",
        activityLevel: "Low",
        activityScore: 49,
        spaces: ["Announcements"],
        tags: ["Invite pending", "Partner lead"],
        recentContributions: [],
        eventParticipation: [{ id: "cm4-e1", eventId: "clinic-event-2", title: "Referral partner session", dateLabel: "Mar 22", status: "Upcoming", detail: "Invite should be reinforced before the session starts." }],
        notes: [{ id: "cm4-n1", author: "Lucia Saenz", time: "Today · 10:02 AM", content: "Candidate for invite campaign and event reminder sequence." }],
        quickActions: [
          { label: "Open Campaigns", detail: "Trigger the invite and reminder motion from Campaigns.", to: "/app/campaigns" },
          { label: "Open Events", detail: "Review the session connected to this invite.", to: "/app/community/events" },
        ],
      },
    ],
    events: [
      { id: "clinic-event-1", workspaceId: "ws-ventra-clinic", title: "Smile design live Q&A", description: "Private walkthrough for members considering treatment plans and upgrades.", dateLabel: "Mar 19", timeLabel: "7:00 PM COT", host: "Valeria Torres", attendees: 27, status: "Scheduled", ctaLabel: "View session" },
      { id: "clinic-event-2", workspaceId: "ws-ventra-clinic", title: "Referral partner session", description: "Teach partners how to invite members and drive repeat consultations.", dateLabel: "Mar 22", timeLabel: "1:00 PM COT", host: "Lucia Saenz", attendees: 18, status: "Open seats", ctaLabel: "Join session" },
    ],
    analytics: {
      engagementRate: "70%",
      eventAttendance: "45 attendees",
      memberGrowth: "+9% MoM",
      linkedContacts: 1,
      syncCoverage: "Community mostly drives pre-CRM education in this workspace",
      growthSeries: [
        { label: "W1", members: 143, active: 92, posts: 6 },
        { label: "W2", members: 151, active: 99, posts: 8 },
        { label: "W3", members: 158, active: 108, posts: 9 },
        { label: "W4", members: 164, active: 114, posts: 10 },
        { label: "W5", members: 169, active: 119, posts: 10 },
        { label: "W6", members: 172, active: 121, posts: 11 },
      ],
      topSpaces: [
        { id: "clinic-treatments", name: "Treatment journeys", members: 118, engagement: "74%", activityDelta: "+9% this week" },
        { id: "clinic-announcements", name: "Announcements", members: 172, engagement: "63%", activityDelta: "+4% this week" },
        { id: "clinic-sessions", name: "Live sessions", members: 83, engagement: "59%", activityDelta: "+7% this week" },
      ],
      highEngagementMembers: [
        { memberId: "clinic-member-2", name: "Valeria Torres", label: "Operator-led retention", detail: "Keeps moderation, education and live sessions coherent for the clinic demo.", score: 92 },
        { memberId: "clinic-member-1", name: "Aura Wellness Hub", label: "Partner influence", detail: "Turns member content into a repeatable referral engine.", score: 89 },
      ],
    },
    campaignPlays: [
      { id: "clinic-play-1", type: "Invite campaign", title: "Partner activation invite", detail: "Reinforce the invitation for referral partners before the next live session.", audience: "6 invite-pending partner records", ctaLabel: "Open Campaigns", to: "/app/campaigns", recommendedMemberIds: ["clinic-member-4"] },
      { id: "clinic-play-2", type: "Event reminder", title: "Live Q&A attendance push", detail: "Send reminders to engaged patient members likely to convert after the session.", audience: "27 expected attendees for the smile design Q&A", ctaLabel: "Open Community events", to: "/app/community/events", recommendedMemberIds: ["clinic-member-2", "clinic-member-3"] },
      { id: "clinic-play-3", type: "New member nurture", title: "7-day patient education path", detail: "Guide new members from welcome guide into consultation prep without backend complexity.", audience: "11 recent members from referral and consult flows", ctaLabel: "Open Community builder", to: "/app/community/setup", recommendedMemberIds: ["clinic-member-3", "clinic-member-4"] },
    ],
    featuredHighlights: [
      "Centralize your audience with a private member hub tied to consultations and loyalty.",
      "Turn customers into members with education, events and a visible support journey.",
      "Use one workspace to host content, sessions and follow-up without extra tools.",
    ],
    quickActions: [
      { label: "Open Contacts", detail: "Review patient records connected to the member experience.", to: "/app/contacts" },
      { label: "View Campaigns", detail: "Launch referral and education motions from the same flow.", to: "/app/campaigns" },
      { label: "Open Workspaces", detail: "See how Community fits into the active workspace setup.", to: "/app/workspaces" },
      { label: "Check Analytics", detail: "Review member growth, top spaces and event engagement.", to: "/app/analytics" },
    ],
  },
};

export function getCommunityWorkspaceData(workspaceId: string | null | undefined): CommunityWorkspaceData {
  const workspace = getWorkspaceById(workspaceId);
  const community = communityByWorkspace[workspace.id] ?? communityByWorkspace["ws-ventra-estate"];

  return {
    workspaceName: workspace.name,
    ...community,
  };
}
