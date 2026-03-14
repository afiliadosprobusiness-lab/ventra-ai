import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CircleUserRound,
  Contact,
  LayoutTemplate,
  Lock,
  Megaphone,
  MessageSquareMore,
  NotebookPen,
  Plus,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { FilterPill } from "@/components/common/filter-pill";
import { MetricCard } from "@/components/common/metric-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  getCommunityWorkspaceData,
  type CommunityCampaignPlay,
  type CommunityEvent,
  type CommunityMember,
  type CommunityPost,
  type CommunitySpace,
  type CommunityVisibility,
  type CommunityWorkspaceData,
} from "@/data/community-data";
import { getWorkspaceData } from "@/data/mock-data";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

function GlassBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Card className={cn("ventra-card p-6", className)}>{children}</Card>;
}

function MiniStat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-[18px] border border-border bg-muted/40 px-4 py-3.5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
      {detail ? <p className="mt-1 text-xs text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

function CommunityModuleShell({
  title,
  description,
  icon: Icon,
  actions,
  children,
}: {
  title: string;
  description: string;
  icon: typeof Users;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const tabs = [
    { label: "Overview", to: "/app/community" },
    { label: "Builder", to: "/app/community/setup" },
    { label: "Home", to: "/app/community/home" },
    { label: "Feed", to: "/app/community/feed" },
    { label: "Members", to: "/app/community/members" },
    { label: "Events", to: "/app/community/events" },
    { label: "Settings", to: "/app/community/settings" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="Community" title={title} description={description} icon={Icon} actions={actions} />
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.to === "/app/community" ? location.pathname === tab.to : location.pathname.startsWith(tab.to);

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}

function IntegrationTile({
  to,
  label,
  detail,
  icon: Icon,
}: {
  to: string;
  label: string;
  detail: string;
  icon: typeof Users;
}) {
  return (
    <Link to={to} className="group rounded-[18px] border border-border bg-card px-4 py-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-accent text-accent-foreground">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
      </div>
    </Link>
  );
}

function SpaceCard({ space }: { space: CommunitySpace }) {
  return (
    <div className="rounded-[18px] border border-border bg-muted/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{space.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{space.description}</p>
        </div>
        <StatusBadge value={space.access} tone={space.access === "Open" ? "success" : space.access === "Private" ? "neutral" : "info"} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniStat label="Members" value={`${space.members}`} />
        <MiniStat label="Posts" value={`${space.posts}`} />
      </div>
    </div>
  );
}

function PostCard({ post, compact = false }: { post: CommunityPost; compact?: boolean }) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {post.pinned ? <StatusBadge value="Pinned" tone="warning" /> : null}
            <span className="text-sm font-medium text-foreground">{post.author}</span>
            <span className="text-xs text-muted-foreground">{post.role}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">{post.time}</p>
        </div>
        <StatusBadge value={post.reactions[0] ?? "Active"} tone="info" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.reactions.map((reaction) => (
          <span key={reaction} className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-secondary-foreground">
            {reaction}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span>{post.likes} likes</span>
        <span>{post.commentsCount} comments</span>
      </div>
      {!compact && post.comments.length ? (
        <div className="mt-5 space-y-3 border-t border-border pt-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="rounded-[16px] bg-muted/40 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{comment.author}</p>
                  <p className="text-[11px] text-muted-foreground">{comment.role}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{comment.time}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{event.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.description}</p>
        </div>
        <StatusBadge value={event.status} tone={event.status === "Replay ready" ? "info" : event.status === "Open seats" ? "warning" : "success"} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <MiniStat label="Date" value={event.dateLabel} />
        <MiniStat label="Time" value={event.timeLabel} />
        <MiniStat label="Attendees" value={`${event.attendees}`} detail={event.host} />
      </div>
      <Button className="mt-4 h-9 rounded-xl px-4 text-xs">{event.ctaLabel}</Button>
    </div>
  );
}

function memberTone(status: CommunityMember["status"]) {
  if (status === "Active") return "success" as const;
  if (status === "Invited") return "info" as const;
  return "warning" as const;
}

function activityTone(level: CommunityMember["activityLevel"]) {
  if (level === "High") return "success" as const;
  if (level === "Moderate") return "info" as const;
  return "warning" as const;
}

function getLinkedContact(workspaceData: ReturnType<typeof getWorkspaceData>, member: CommunityMember) {
  return workspaceData.contacts.find((contact) => contact.id === member.contactId) ?? null;
}

function getLinkedCampaigns(workspaceData: ReturnType<typeof getWorkspaceData>, member: CommunityMember) {
  return workspaceData.campaigns.filter((campaign) => member.linkedCampaignIds?.includes(campaign.id));
}

function getSuggestedCampaignPlays(member: CommunityMember, plays: CommunityCampaignPlay[]) {
  return plays.filter((play) => play.recommendedMemberIds.includes(member.id)).slice(0, 2);
}

function MemberDetailPanel({
  member,
  community,
  workspaceData,
}: {
  member: CommunityMember | null;
  community: CommunityWorkspaceData;
  workspaceData: ReturnType<typeof getWorkspaceData>;
}) {
  if (!member) {
    return (
      <GlassBlock>
        <div className="rounded-[20px] border border-dashed border-border bg-muted/30 px-5 py-10 text-center">
          <p className="text-sm font-medium text-foreground">Select a member</p>
          <p className="mt-2 text-sm text-muted-foreground">The detail panel will show CRM relation, activity, events, notes and campaign suggestions.</p>
        </div>
      </GlassBlock>
    );
  }

  const linkedContact = getLinkedContact(workspaceData, member);
  const linkedCampaigns = getLinkedCampaigns(workspaceData, member);
  const suggestedPlays = getSuggestedCampaignPlays(member, community.campaignPlays);

  return (
    <GlassBlock className="p-0">
      <div className="border-b border-border bg-[linear-gradient(135deg,#0f172a,#115e59,#0f766e)] px-6 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/15 text-base font-semibold">{member.avatarLabel}</div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Member detail</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{member.name}</h2>
              <p className="mt-1 text-sm text-white/80">{member.title}</p>
              <p className="mt-1 text-xs text-white/65">{member.company} · {member.email}</p>
            </div>
          </div>
          <StatusBadge value={member.status} tone={memberTone(member.status)} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge value={member.role} tone={member.role === "Owner" || member.role === "Admin" ? "success" : "neutral"} />
          <StatusBadge value={`${member.activityLevel} activity`} tone={activityTone(member.activityLevel)} />
          <StatusBadge value={member.lifecycle} tone="info" />
          <StatusBadge value={linkedContact ? "CRM linked" : "Community only"} tone={linkedContact ? "success" : "warning"} />
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MiniStat label="Joined" value={member.joinedAt} detail={member.source} />
          <MiniStat label="Activity score" value={`${member.activityScore}`} detail={member.activity} />
          <MiniStat label="Spaces" value={`${member.spaces.length}`} detail={member.spaces.join(", ")} />
          <MiniStat label="Events" value={`${member.eventParticipation.length}`} detail={member.eventParticipation[0]?.status ?? "No sessions"} />
        </div>

        <div className="rounded-[20px] border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">CRM relationship</p>
              <p className="mt-2 text-sm font-medium text-foreground">{linkedContact ? "This member already exists inside Contacts." : "This member is not yet represented in Contacts."}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {linkedContact
                  ? `${linkedContact.company} · ${linkedContact.owner} · ${linkedContact.pipelineStage}`
                  : "Use Community as the high-fidelity bridge before the member becomes a commercial record."}
              </p>
            </div>
            <StatusBadge value={linkedContact ? "Synced with contact 360" : "Awaiting CRM sync"} tone={linkedContact ? "success" : "warning"} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="h-10 rounded-xl text-sm">
              <Link to={linkedContact ? `/app/contacts/${linkedContact.id}` : "/app/contacts"}>
                <Contact className="mr-2 h-4 w-4" />
                {linkedContact ? "Open contact record" : "Open Contacts"}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl text-sm"
              onClick={() =>
                toast.success(linkedContact ? "Community and CRM are already linked in this demo." : "Mock sync queued. This member is now marked as ready for Contacts.")
              }
            >
              <Workflow className="mr-2 h-4 w-4" />
              {linkedContact ? "Review CRM sync" : "Queue CRM sync"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Spaces and tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {member.spaces.map((space) => (
                  <span key={space} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {space}
                  </span>
                ))}
                {member.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Recent posts and comments</p>
              <div className="mt-3 space-y-3">
                {member.recentContributions.length ? (
                  member.recentContributions.map((item) => (
                    <div key={item.id} className="rounded-[18px] border border-border bg-muted/40 px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <StatusBadge value={item.type} tone="info" />
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="mt-3 font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-xs text-primary">{item.space}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{item.engagement}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-dashed border-border bg-muted/20 px-4 py-4 text-sm text-muted-foreground">No recent contributions yet. Use campaigns or events to activate this member.</div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Notes</p>
              <div className="mt-3 space-y-3">
                {member.notes.map((note) => (
                  <div key={note.id} className="rounded-[18px] border border-border bg-muted/40 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{note.author}</p>
                      <span className="text-[11px] text-muted-foreground">{note.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Events attended or upcoming</p>
              <div className="mt-3 space-y-3">
                {member.eventParticipation.map((event) => (
                  <div key={event.id} className="rounded-[18px] border border-border bg-muted/40 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <StatusBadge value={event.status} tone={event.status === "Upcoming" ? "info" : "success"} />
                    </div>
                    <p className="mt-2 text-xs text-primary">{event.dateLabel}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{event.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Linked campaigns</p>
              <div className="mt-3 space-y-3">
                {linkedCampaigns.length ? (
                  linkedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="rounded-[18px] border border-border bg-muted/40 px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                        <StatusBadge value={campaign.status} tone={campaign.status === "Active" ? "success" : "info"} />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{campaign.goal}</p>
                      <Button asChild variant="outline" className="mt-4 h-9 rounded-xl px-4 text-xs">
                        <Link to={`/app/campaigns/${campaign.id}`}>
                          <Megaphone className="mr-2 h-3.5 w-3.5" />
                          Open campaign
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-dashed border-border bg-muted/20 px-4 py-4 text-sm text-muted-foreground">No linked campaign record yet. The suggested campaign plays below are the next best step.</div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Suggested campaign plays</p>
              <div className="mt-3 space-y-3">
                {suggestedPlays.map((play) => (
                  <div key={play.id} className="rounded-[18px] border border-border bg-card px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge value={play.type} tone={play.type === "Re-engagement" ? "warning" : "info"} />
                      <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{play.audience}</span>
                    </div>
                    <p className="mt-3 font-medium text-foreground">{play.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{play.detail}</p>
                    <div className="mt-4 flex gap-2">
                      <Button asChild variant="outline" className="h-9 rounded-xl px-4 text-xs">
                        <Link to={play.to}>{play.ctaLabel}</Link>
                      </Button>
                      <Button
                        className="h-9 rounded-xl px-4 text-xs"
                        onClick={() => toast.success(`${play.type} prepared for ${member.name} in the frontend demo.`)}
                      >
                        Launch mock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick actions</p>
              <div className="mt-3 grid gap-3">
                {member.quickActions.map((action) => (
                  <IntegrationTile
                    key={`${member.id}-${action.to}-${action.label}`}
                    to={action.to}
                    label={action.label}
                    detail={action.detail}
                    icon={action.to.includes("contacts") ? CircleUserRound : action.to.includes("campaigns") ? Megaphone : action.to.includes("analytics") ? Activity : BriefcaseBusiness}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassBlock>
  );
}

export function CommunityOverviewPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const workspaceData = getWorkspaceData(activeWorkspaceId);
  const linkedMembers = community.members.filter((member) => getLinkedContact(workspaceData, member));

  return (
    <CommunityModuleShell
      title="Build a branded community inside Ventra"
      description="Centralize your audience, turn customers into members and host content, sessions and conversations in one place."
      icon={Users}
      actions={
        <>
          <Button asChild variant="outline" className="h-10 rounded-xl px-4 text-sm">
            <Link to="/app/community/setup">Open builder</Link>
          </Button>
          <Button asChild className="h-10 rounded-xl px-4 text-sm">
            <Link to="/app/community/home">
              <Plus className="mr-2 h-4 w-4" />
              Open community
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total members" value={`${community.summary.totalMembers}`} delta={`${community.workspaceName} audience`} icon={Users} />
        <MetricCard label="Active members" value={`${community.summary.activeMembers}`} delta="Engaged in the last 7 days" icon={Sparkles} />
        <MetricCard label="Posts this week" value={`${community.summary.postsThisWeek}`} delta="Content and conversations live" icon={MessageSquareMore} />
        <MetricCard label="Upcoming events" value={`${community.summary.upcomingEvents}`} delta="Sessions and office hours" icon={CalendarClock} />
        <MetricCard label="Engagement score" value={community.summary.engagementScore} delta="Member momentum" icon={Star} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
        <GlassBlock>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Community launchpad</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">Turn customers into members with one branded experience</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{community.profile.description}</p>
            </div>
            <StatusBadge value={community.profile.visibility} tone="neutral" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {community.quickActions.map((action) => (
              <IntegrationTile key={action.to} to={action.to} label={action.label} detail={action.detail} icon={action.to.includes("analytics") ? LayoutTemplate : action.to.includes("campaign") ? Megaphone : action.to.includes("settings") ? Settings2 : Users} />
            ))}
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {community.featuredHighlights.map((highlight) => (
              <div key={highlight} className="rounded-[18px] border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                {highlight}
              </div>
            ))}
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Connected to Ventra</p>
          <div className="mt-4 space-y-3">
            <MiniStat label="Contacts available" value={`${workspaceData.contacts.length}`} detail={`${linkedMembers.length} already linked to Community`} />
            <MiniStat label="Campaign motions" value={`${workspaceData.campaigns.length}`} detail={`${community.campaignPlays.length} member plays ready`} />
            <MiniStat label="Analytics sync" value={community.analytics.engagementRate} detail={community.analytics.syncCoverage} />
            <MiniStat label="Community domain" value={community.profile.domain} detail="Mock member URL inside the same workspace" />
          </div>
        </GlassBlock>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_0.98fr]">
        <GlassBlock>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Member to CRM continuity</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">Community now shares commercial context with Contacts and Campaigns</h2>
            </div>
            <StatusBadge value={`${linkedMembers.length} linked members`} tone="success" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {community.members.slice(0, 4).map((member) => {
              const linkedContact = getLinkedContact(workspaceData, member);

              return (
                <div key={member.id} className="rounded-[18px] border border-border bg-muted/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{member.title}</p>
                    </div>
                    <StatusBadge value={linkedContact ? "In Contacts" : "Community only"} tone={linkedContact ? "success" : "warning"} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {linkedContact
                      ? `${linkedContact.company} · ${linkedContact.owner} · ${linkedContact.pipelineStage}`
                      : "Still managed as a community-first relationship. Promote to Contacts when commercial follow-up begins."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" className="h-8 rounded-lg px-3 text-xs">
                      <Link to={linkedContact ? `/app/contacts/${linkedContact.id}` : "/app/contacts"}>Open contact</Link>
                    </Button>
                    <Button asChild variant="outline" className="h-8 rounded-lg px-3 text-xs">
                      <Link to="/app/community/members">Open member detail</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Campaign plays ready</p>
          <div className="mt-4 space-y-3">
            {community.campaignPlays.map((play) => (
              <div key={play.id} className="rounded-[18px] border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge value={play.type} tone={play.type === "Re-engagement" ? "warning" : "info"} />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{play.audience}</span>
                </div>
                <p className="mt-3 font-medium text-foreground">{play.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{play.detail}</p>
                <Button asChild variant="outline" className="mt-4 h-9 rounded-xl px-4 text-xs">
                  <Link to={play.to}>{play.ctaLabel}</Link>
                </Button>
              </div>
            ))}
          </div>
        </GlassBlock>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <GlassBlock>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Spaces</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">Organize members by stage, content and conversations</h2>
            </div>
            <Button asChild variant="outline" className="h-9 rounded-xl px-4 text-xs">
              <Link to="/app/community/feed">Open feed</Link>
            </Button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {community.spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Upcoming sessions</p>
          <div className="mt-4 space-y-4">
            {community.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </GlassBlock>
      </div>
    </CommunityModuleShell>
  );
}

export function CommunitySetupPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const [name, setName] = useState(community.profile.name);
  const [description, setDescription] = useState(community.profile.description);
  const [visibility, setVisibility] = useState<CommunityVisibility>(community.profile.visibility);
  const [domain, setDomain] = useState(community.profile.domain);
  const [coverLabel, setCoverLabel] = useState(community.profile.coverLabel);
  const [logoLabel, setLogoLabel] = useState(community.profile.logoLabel);
  const [spaces, setSpaces] = useState(community.spaces.map((space) => space.name).join(", "));

  return (
    <CommunityModuleShell
      title="Community builder"
      description="Build a branded community, organize spaces and prepare a premium member experience before you launch."
      icon={WandSparkles}
      actions={
        <Button className="h-10 rounded-xl px-4 text-sm" onClick={() => toast.success("Community setup saved in the frontend demo.")}>
          Save mock setup
        </Button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.98fr)_420px]">
        <GlassBlock>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Community name</label>
              <Input value={name} onChange={(event) => setName(event.target.value)} className="h-11 rounded-xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Description</label>
              <Textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-[120px] rounded-xl" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Visibility</label>
              <div className="flex flex-wrap gap-2">
                {(["Private", "Members only", "Public waitlist"] as CommunityVisibility[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setVisibility(option)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      visibility === option ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Domain or URL</label>
              <Input value={domain} onChange={(event) => setDomain(event.target.value)} className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Cover concept</label>
              <Input value={coverLabel} onChange={(event) => setCoverLabel(event.target.value)} className="h-11 rounded-xl" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Avatar or logo</label>
              <Input value={logoLabel} onChange={(event) => setLogoLabel(event.target.value)} className="h-11 rounded-xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Categories or spaces</label>
              <Textarea value={spaces} onChange={(event) => setSpaces(event.target.value)} className="min-h-[110px] rounded-xl" />
            </div>
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Live preview</p>
          <div className="mt-4 overflow-hidden rounded-[22px] border border-border">
            <div className="bg-[linear-gradient(135deg,#0f766e,#14b8a6,#d1fae5)] px-5 py-6 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold">
                {logoLabel}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-white/90">{coverLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">{visibility}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">{domain}</span>
              </div>
            </div>
            <div className="space-y-4 bg-card p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              <div className="space-y-2">
                {spaces
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .slice(0, 5)
                  .map((item) => (
                    <div key={item} className="rounded-[16px] bg-muted/40 px-4 py-3 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
              </div>
              <Button asChild className="h-10 w-full rounded-xl text-sm">
                <Link to="/app/community/home">Create community</Link>
              </Button>
            </div>
          </div>
        </GlassBlock>
      </div>
    </CommunityModuleShell>
  );
}

export function CommunityHomePage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const featuredPost = community.posts.find((post) => post.pinned) ?? community.posts[0];

  return (
    <CommunityModuleShell
      title={community.profile.name}
      description="Host content, sessions and member conversations in one private experience that still feels native to Ventra."
      icon={Sparkles}
      actions={
        <Button className="h-10 rounded-xl px-4 text-sm">
          <Plus className="mr-2 h-4 w-4" />
          New post
        </Button>
      }
    >
      <GlassBlock className="overflow-hidden p-0">
        <div className="bg-[linear-gradient(135deg,#0f172a,#115e59,#0f766e)] px-6 py-8 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Community home</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">{community.profile.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{community.profile.tagline}</p>
            </div>
            <Button variant="secondary" className="h-10 rounded-xl bg-white text-slate-900 hover:bg-white/90">
              {community.profile.primaryCta}
            </Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <MiniStat label="Members" value={`${community.summary.totalMembers}`} detail="Audience in one hub" />
            <MiniStat label="Spaces" value={`${community.spaces.length}`} detail="Structured by theme" />
            <MiniStat label="Events" value={`${community.events.length}`} detail="Live or replay-ready" />
            <MiniStat label="Domain" value={community.profile.domain} detail="Mock private URL" />
          </div>
        </div>
      </GlassBlock>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <GlassBlock>
            <PostCard post={featuredPost} />
          </GlassBlock>
          <GlassBlock>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Latest feed</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">What members are seeing right now</h3>
              </div>
              <Button asChild variant="outline" className="h-9 rounded-xl px-4 text-xs">
                <Link to="/app/community/feed">View all posts</Link>
              </Button>
            </div>
            <div className="mt-5 space-y-4">
              {community.posts.slice(1, 3).map((post) => (
                <PostCard key={post.id} post={post} compact />
              ))}
            </div>
          </GlassBlock>
        </div>

        <div className="space-y-6">
          <GlassBlock>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Spaces</p>
            <div className="mt-4 space-y-4">
              {community.spaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </GlassBlock>

          <GlassBlock>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Recent members</p>
            <div className="mt-4 space-y-3">
              {community.members.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-3 rounded-[16px] bg-muted/40 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.activity}</p>
                  </div>
                  <StatusBadge value={member.role} tone={member.role === "Owner" || member.role === "Admin" ? "success" : "neutral"} />
                </div>
              ))}
            </div>
          </GlassBlock>

          <GlassBlock>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Upcoming events</p>
            <div className="mt-4 space-y-4">
              {community.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </GlassBlock>
        </div>
      </div>
    </CommunityModuleShell>
  );
}

export function CommunityFeedPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filters = ["All", ...community.spaces.map((space) => space.name)];
  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return community.posts;
    const activeSpace = community.spaces.find((space) => space.name === activeFilter);
    return community.posts.filter((post) => post.spaceId === activeSpace?.id);
  }, [activeFilter, community.posts, community.spaces]);

  return (
    <CommunityModuleShell
      title="Community feed"
      description="Publish updates, pin the most important post and keep comments, reactions and categories visible from the same view."
      icon={MessageSquareMore}
      actions={<Button className="h-10 rounded-xl px-4 text-sm">Create post</Button>}
    >
      <GlassBlock>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <FilterPill key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
              {filter}
            </FilterPill>
          ))}
        </div>
      </GlassBlock>

      <div className="space-y-5">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </CommunityModuleShell>
  );
}

export function CommunityMembersPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const workspaceData = getWorkspaceData(activeWorkspaceId);
  const [activeFilter, setActiveFilter] = useState("All members");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(community.members[0]?.id ?? null);

  useEffect(() => {
    setSelectedMemberId(community.members[0]?.id ?? null);
  }, [activeWorkspaceId, community.members]);

  const filteredMembers = useMemo(() => {
    if (activeFilter === "All members") return community.members;
    if (activeFilter === "CRM linked") return community.members.filter((member) => getLinkedContact(workspaceData, member));
    if (activeFilter === "Community only") return community.members.filter((member) => !getLinkedContact(workspaceData, member));
    if (activeFilter === "At risk") return community.members.filter((member) => member.status === "At risk");
    return community.members.filter((member) => member.role === "Ambassador" || member.role === "Moderator");
  }, [activeFilter, community.members, workspaceData]);

  const selectedMember = filteredMembers.find((member) => member.id === selectedMemberId) ?? community.members.find((member) => member.id === selectedMemberId) ?? filteredMembers[0] ?? null;

  return (
    <CommunityModuleShell
      title="Members"
      description="Manage members, roles and activity with visible continuity into Contacts, Campaigns, Analytics and the workspace shell."
      icon={Users}
      actions={<Button className="h-10 rounded-xl px-4 text-sm">Invite members</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Members" value={`${community.summary.totalMembers}`} delta="Across all spaces" icon={Users} />
        <MetricCard label="CRM linked" value={`${community.analytics.linkedContacts}`} delta={community.analytics.syncCoverage} icon={Contact} />
        <MetricCard label="Campaign-ready" value={`${community.campaignPlays.length}`} delta="Invite, nurture and reminder motions" icon={Megaphone} />
        <MetricCard label="At risk" value={`${community.members.filter((member) => member.status === "At risk").length}`} delta="Need follow-up" icon={Lock} trend="down" />
      </div>

      <GlassBlock>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Connected member directory</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">Community members now carry CRM, campaign and workspace context</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All members", "CRM linked", "Community only", "At risk", "Ambassadors"].map((filter) => (
              <FilterPill key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </FilterPill>
            ))}
          </div>
        </div>
      </GlassBlock>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <GlassBlock>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Member</TableHead>
                  <TableHead>CRM relation</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quick actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => {
                  const linkedContact = getLinkedContact(workspaceData, member);
                  const isSelected = selectedMember?.id === member.id;

                  return (
                    <TableRow key={member.id} className={cn("cursor-pointer", isSelected && "bg-muted/50")} onClick={() => setSelectedMemberId(member.id)}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{member.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <StatusBadge value={linkedContact ? "Existing contact" : "Community only"} tone={linkedContact ? "success" : "warning"} />
                          <p className="text-xs text-muted-foreground">
                            {linkedContact ? `${linkedContact.company} · ${linkedContact.owner}` : "No CRM record yet. Good candidate for promotion when sales follow-up starts."}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <StatusBadge value={member.role} tone={member.role === "Owner" || member.role === "Admin" ? "success" : "neutral"} />
                          <p className="text-xs text-muted-foreground">{member.lifecycle}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <StatusBadge value={`${member.activityLevel} activity`} tone={activityTone(member.activityLevel)} />
                          <p className="text-xs text-muted-foreground">{member.activity}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge value={member.status} tone={memberTone(member.status)} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-lg px-3 text-xs">
                            <Link to={linkedContact ? `/app/contacts/${linkedContact.id}` : "/app/contacts"}>Open contact</Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-xs" onClick={() => setSelectedMemberId(member.id)}>
                            View detail
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </GlassBlock>

        <MemberDetailPanel member={selectedMember} community={community} workspaceData={workspaceData} />
      </div>
    </CommunityModuleShell>
  );
}

export function CommunityEventsPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);

  return (
    <CommunityModuleShell
      title="Events and sessions"
      description="Host live sessions, office hours and replay moments as a natural extension of campaigns, onboarding and member retention."
      icon={CalendarClock}
      actions={<Button className="h-10 rounded-xl px-4 text-sm">Schedule event</Button>}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {community.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="space-y-6">
          <GlassBlock>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Session checklist</p>
            <div className="mt-4 space-y-3">
              {[
                "Create the member-facing event page and CTA.",
                "Tag invited members by campaign or contact segment.",
                "Prepare replay note, follow-up summary and next-step CTA.",
                "Route engaged attendees into Contacts and Analytics.",
              ].map((item) => (
                <div key={item} className="rounded-[16px] bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </GlassBlock>

          <GlassBlock>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Campaign triggers</p>
            <div className="mt-4 space-y-3">
              {community.campaignPlays.filter((play) => play.type === "Event reminder" || play.type === "Invite campaign").map((play) => (
                <div key={play.id} className="rounded-[18px] border border-border bg-muted/40 p-4">
                  <StatusBadge value={play.type} tone={play.type === "Event reminder" ? "info" : "warning"} />
                  <p className="mt-3 font-medium text-foreground">{play.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{play.detail}</p>
                  <Button asChild variant="outline" className="mt-4 h-9 rounded-xl px-4 text-xs">
                    <Link to={play.to}>{play.ctaLabel}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </GlassBlock>
        </div>
      </div>
    </CommunityModuleShell>
  );
}

export function CommunitySettingsPage() {
  const { activeWorkspaceId } = useSession();
  const community = getCommunityWorkspaceData(activeWorkspaceId);
  const [memberApproval, setMemberApproval] = useState(true);
  const [allowReplies, setAllowReplies] = useState(true);
  const [sendInvitesFromCampaigns, setSendInvitesFromCampaigns] = useState(true);
  const [showMemberDirectory, setShowMemberDirectory] = useState(true);

  return (
    <CommunityModuleShell
      title="Community settings"
      description="Control branding, access, categories, moderation, invitations, domain and the member experience from one mock configuration layer."
      icon={Settings2}
      actions={
        <Button className="h-10 rounded-xl px-4 text-sm" onClick={() => toast.success("Community settings updated in the demo.")}>
          Save settings
        </Button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Branding</p>
          <div className="mt-4 space-y-4">
            <Input defaultValue={community.profile.name} className="h-11 rounded-xl" />
            <Input defaultValue={community.profile.domain} className="h-11 rounded-xl" />
            <Textarea defaultValue={community.profile.tagline} className="min-h-[110px] rounded-xl" />
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Access and moderation</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-[16px] bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Require member approval</p>
                <p className="text-xs text-muted-foreground">Review every join request before access.</p>
              </div>
              <Switch checked={memberApproval} onCheckedChange={setMemberApproval} />
            </div>
            <div className="flex items-center justify-between rounded-[16px] bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Allow comments and replies</p>
                <p className="text-xs text-muted-foreground">Keep feed conversations visible for members.</p>
              </div>
              <Switch checked={allowReplies} onCheckedChange={setAllowReplies} />
            </div>
            <div className="rounded-[16px] bg-muted/40 px-4 py-3">
              <p className="text-sm font-medium text-foreground">Visibility</p>
              <p className="mt-1 text-xs text-muted-foreground">{community.profile.visibility}</p>
            </div>
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Categories and invitations</p>
          <div className="mt-4 space-y-4">
            <Textarea defaultValue={community.spaces.map((space) => `${space.name}: ${space.description}`).join("\n\n")} className="min-h-[190px] rounded-xl" />
            <div className="flex items-center justify-between rounded-[16px] bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Send invites from campaigns</p>
                <p className="text-xs text-muted-foreground">Use campaign segments as invite audiences.</p>
              </div>
              <Switch checked={sendInvitesFromCampaigns} onCheckedChange={setSendInvitesFromCampaigns} />
            </div>
          </div>
        </GlassBlock>

        <GlassBlock>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Member experience</p>
          <div className="mt-4 space-y-4">
            <Textarea defaultValue={community.profile.welcomeMessage} className="min-h-[120px] rounded-xl" />
            <div className="flex items-center justify-between rounded-[16px] bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Show member directory</p>
                <p className="text-xs text-muted-foreground">Expose recent members and roles inside the home view.</p>
              </div>
              <Switch checked={showMemberDirectory} onCheckedChange={setShowMemberDirectory} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniStat label="Community URL" value={community.profile.domain} />
              <MiniStat label="Workspace" value={community.workspaceName} detail="Multi-tenant mock setup" />
            </div>
          </div>
        </GlassBlock>
      </div>
    </CommunityModuleShell>
  );
}
