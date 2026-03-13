import { useMemo, useState, type ReactNode } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Compass,
  Lock,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Radar,
  ScanSearch,
  Sparkles,
  Target,
  UserPlus,
  WandSparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { VentraLogo } from "@/components/brand/ventra-logo";
import {
  faqItems,
  landingHighlights,
  moduleCards,
  onboardingChannels,
  onboardingGoals,
  pricingPlans,
} from "@/data/mock-data";
import { useSession } from "@/lib/session";

const publicProof = [
  { label: "More opportunities", value: "+41%" },
  { label: "Response speed", value: "3x faster" },
  { label: "Close control", value: "One workflow" },
];

const operatingSpine = [
  ["Prospector AI discovers demand", "Ventra finds high-potential businesses and maps commercial pain before your team starts cold outreach."],
  ["Acquisition captures intent", "Widgets, forms and quiz flows convert demand into structured records instead of loose lead lists."],
  ["Conversations and Voice AI execute", "Follow-up, recovery and calls update the same timeline instead of living in side tools."],
  ["Pipeline reflects the next action", "Every active opportunity keeps owner, probability, reactivation state and next step visible for the team."],
];

const revenueJourney = [
  { label: "Discover", detail: "Prospector AI maps new businesses with score, signals and opportunity angle.", icon: ScanSearch },
  { label: "Diagnose", detail: "Ventra detects pain points, missing capture layers and next-best commercial play.", icon: Compass },
  { label: "Capture", detail: "Widgets, forms and quiz flows turn attention into structured demand.", icon: Target },
  { label: "Contact", detail: "Conversations and Voice AI launch smarter outreach from one record.", icon: MessageSquareMore },
  { label: "Follow up", detail: "Owners, tasks and automations keep response speed high and leakage low.", icon: Radar },
  { label: "Close", detail: "Pipeline visibility makes the next action obvious for every opportunity.", icon: CheckCircle2 },
  { label: "Reactivate", detail: "Campaigns and Creative Studio reopen stalled deals with better narratives.", icon: WandSparkles },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">{children}</p>;
}

function PublicNavbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#071121]/82 px-5 py-3 backdrop-blur-2xl">
        <VentraLogo />
        <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          <a href="#platform" className="transition hover:text-white">Platform</a>
          <a href="#spine" className="transition hover:text-white">Contact spine</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:text-white sm:inline-flex">
            Login
          </Link>
          <Link to="/register" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Book demo flow
          </Link>
        </div>
      </div>
    </nav>
  );
}

function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#030915] px-4 py-8 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-[#071121]/92 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="relative hidden overflow-hidden border-r border-white/10 p-10 lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_25%),radial-gradient(circle_at_center_right,rgba(139,92,246,0.22),transparent_26%),radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_14%)]" />
          <div className="relative">
            <VentraLogo />
            <SectionLabel>Revenue operating system</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-tight text-white">
              One commercial system from first signal to close.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Auth, onboarding and the private shell now share one premium language so the demo reads like one finished product.
            </p>
          </div>
          <div className="relative mt-10 grid gap-4">
            {[
              "The same contact record powers acquisition, conversations, calls and pipeline.",
              "Creative Studio and Campaigns stay tied to revenue, not isolated in a side module.",
              "The shell is ready for demos, onboarding and future backend rollout.",
            ].map((item) => (
              <div key={item} className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <VentraLogo className="lg:hidden" />
            <h1 className="mt-8 font-display text-4xl font-semibold text-white">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030915] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_35%_55%,rgba(99,102,241,0.18),transparent_22%),radial-gradient(circle_at_60%_30%,rgba(251,191,36,0.08),transparent_12%),radial-gradient(circle_at_78%_22%,rgba(139,92,246,0.18),transparent_22%)]" />
      <PublicNavbar />
      <main className="relative z-10">
        <section className="px-4 pb-20 pt-36 sm:px-6 lg:pt-40">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                <Sparkles className="h-3.5 w-3.5" />
                Growth OS comercial para LATAM
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
                Discover, capture, follow up and close
                <span className="block bg-gradient-to-r from-sky-300 via-white to-violet-300 bg-clip-text text-transparent">
                  more opportunities from one commercial platform
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Ventra helps revenue teams discover new prospects, diagnose commercial pain, capture demand, launch smarter outreach, reactivate stalled deals and close with better control from one operating system.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                  Start the guided demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/quiz" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                  Find your revenue motion
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {["More opportunities", "Faster response", "Less leakage", "Smarter outreach", "More closings"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {publicProof.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {landingHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                    <CheckCircle2 className="mb-3 h-4 w-4 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="relative rounded-[32px] border border-white/10 bg-[#071121]/90 p-4 shadow-[0_40px_120px_-50px_rgba(2,12,38,0.9)]">
                <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute -bottom-6 right-0 h-40 w-40 rounded-full bg-violet-500/25 blur-3xl" />
                <div className="relative overflow-hidden rounded-[28px] border border-white/10">
                  <img src="/ui-reference/hero-premium-01.png" alt="Ventra platform preview" className="w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 grid gap-3 bg-gradient-to-t from-[#071121] via-[#071121]/90 to-transparent p-5">
                    <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-2xl border border-sky-300/20 bg-[#020711]/75 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-sky-200">Prospector AI</p>
                        <p className="mt-2 text-2xl font-semibold text-white">18 new targets mapped</p>
                        <p className="mt-1 text-sm text-slate-300">High-potential businesses diagnosed before outreach enters CRM, inbox or calls.</p>
                      </div>
                      <div className="rounded-2xl border border-violet-300/20 bg-[#020711]/75 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-violet-200">Next best action</p>
                        <p className="mt-2 text-2xl font-semibold text-white">Outreach live in 13m</p>
                        <p className="mt-1 text-sm text-slate-300">No handoff leak between discovery, capture, follow-up and close.</p>
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      {["Prospector score 96", "Conversation live in 13m", "Pipeline now worth $18K"].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-[#020711]/70 px-4 py-3 text-sm text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Revenue chain</SectionLabel>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                One end-to-end motion from first market signal to reactivated revenue
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Ventra is not a stack of tools. It is one commercial system that helps teams discover, diagnose, capture, contact, follow up, close and reactivate without losing context.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {revenueJourney.map((step) => (
                <Card key={step.label} className="ventra-card p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <step.icon className="h-5 w-5 text-sky-200" />
                  </div>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">{step.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="spine" className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="max-w-2xl">
                <SectionLabel>Contact spine</SectionLabel>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Every discovery, capture and close motion lands on the same commercial memory
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Ventra does not sell isolated tools. It makes the contact record, timeline, opportunity state and reactivation path visible everywhere.
                </p>
              </div>
              <div className="grid gap-4">
                {operatingSpine.map(([title, detail]) => (
                  <div key={title} className="ventra-card p-5">
                    <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ventra-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">360 commercial view</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-white">One profile, every motion connected</h3>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                  CRM backbone
                </span>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
                <div className="space-y-4">
                  <div className="rounded-[26px] border border-white/10 bg-[#081425] p-5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Contact</p>
                    <h4 className="mt-2 font-display text-2xl font-semibold text-white">Andrea Del Solar</h4>
                    <p className="mt-1 text-sm text-slate-400">Independent buyer | Lima</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {["Score 92", "Stage Qualified", "Owner Dario Perez", "Value $18K"].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-white">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Next best action</p>
                    <p className="mt-2 text-lg font-semibold text-white">Confirm onsite visit and send shortlist</p>
                    <p className="mt-2 text-sm text-slate-400">Ventra keeps the rep, the thread, the call summary and the deal step on the same surface.</p>
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-[#081425] p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Unified timeline</p>
                  <div className="mt-5 space-y-4">
                    {[
                      ["Prospector AI", "A strategic account was discovered and diagnosed before entering outreach.", "08:41"],
                      ["Acquisition", "Premium quiz captured a high-intent buyer.", "08:58"],
                      ["Conversations", "WhatsApp thread opened with grouped inventory context.", "09:11"],
                      ["Voice AI", "Qualification call confirmed urgency and visit timing.", "09:22"],
                      ["Pipeline", "Deal advanced with next step visible for the whole team.", "09:34"],
                      ["Campaigns", "Launch assets influenced the contact before the quiz and stayed ready for recovery.", "09:46"],
                    ].map(([module, detail, time]) => (
                      <div key={`${module}-${time}`} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{module}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-300">{detail}</p>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Platform modules</SectionLabel>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Strategic modules that push one outcome: more qualified opportunities and more closings
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Prospector AI leads the top of funnel, and every other module keeps moving the same account toward smarter outreach, better control and faster close.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {moduleCards.map((module) => (
                <Card key={module.id} className={`ventra-card p-6 ${module.id === "prospector-ai" ? "border-cyan-300/30 shadow-[0_0_70px_rgba(56,189,248,0.12)]" : ""}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <module.icon className="h-5 w-5 text-sky-200" />
                  </div>
                  {module.id === "prospector-ai" ? (
                    <div className="mt-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                      Premium discovery layer
                    </div>
                  ) : null}
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">{module.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{module.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200">
                    Connected to the same revenue workflow
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                Pricing built around operating maturity, not feature clutter
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`ventra-card p-7 ${plan.highlight ? "border-violet-300/30 shadow-[0_0_70px_rgba(124,58,237,0.14)]" : ""}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-2xl font-semibold text-white">{plan.name}</p>
                    {plan.highlight ? <span className="rounded-full bg-violet-400/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-violet-200">Best demo path</span> : null}
                  </div>
                  <p className="mt-5 text-4xl font-bold text-white">{plan.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{plan.description}</p>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className={`mt-8 w-full rounded-full ${plan.highlight ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-white/[0.06] text-white hover:bg-white/[0.12]"}`}>
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 pb-20 pt-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-3 font-display text-4xl font-semibold text-white">The product story should feel commercially obvious in a demo</h2>
              <p className="mt-4 text-lg text-slate-300">Ventra must present itself as one operating system with a visible central contact record.</p>
            </div>
            <Card className="ventra-card p-6">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border border-white/10 px-4">
                    <AccordionTrigger className="text-left text-white hover:no-underline">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-400">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="ventra-card p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <SectionLabel>Final CTA</SectionLabel>
                  <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                    Show Ventra as the platform that finds, converts and closes more opportunities
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg text-slate-300">
                    Use the demo to show discovery, capture, follow-up, recovery and close inside one premium commercial workflow.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                    Book the product demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link to="/quiz" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                    Run the guided quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useSession();
  const [email, setEmail] = useState("ken@ventra.app");
  const [password, setPassword] = useState("demo");

  if (isAuthenticated) return <Navigate to="/app/overview" replace />;

  return (
    <AuthShell
      title="Enter the Ventra shell"
      description="Open the demo workspace with connected data, premium surfaces and a visible commercial spine."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          login(email || "ken@ventra.app");
          navigate("/app/overview");
        }}
      >
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Email</label>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Password</label>
          <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
        </div>
        <Button type="submit" className="h-12 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
          <Lock className="mr-2 h-4 w-4" />
          Enter workspace
        </Button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <Link to="/forgot-password" className="transition hover:text-white">Forgot password</Link>
        <Link to="/register" className="transition hover:text-white">Create account</Link>
      </div>
    </AuthShell>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useSession();
  const [name, setName] = useState("Ken Ortega");
  const [email, setEmail] = useState("ken@ventra.app");

  if (isAuthenticated) return <Navigate to="/onboarding" replace />;

  return (
    <AuthShell
      title="Create your Ventra workspace"
      description="Start the guided flow, define your commercial context and enter a real operating system instead of a generic dashboard."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          register(name, email);
          navigate("/onboarding");
        }}
      >
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Full name</label>
          <Input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Email</label>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
        </div>
        <Button type="submit" className="h-12 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
          <UserPlus className="mr-2 h-4 w-4" />
          Continue to onboarding
        </Button>
      </form>
      <p className="mt-5 text-sm text-slate-400">
        Already have a workspace? <Link to="/login" className="text-white">Login</Link>
      </p>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset access"
      description="This demo route simulates a production-grade recovery flow with safe messaging and the same premium shell language."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Work email</label>
          <Input defaultValue="ken@ventra.app" className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
        </div>
        <Button className="h-12 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
          <Mail className="mr-2 h-4 w-4" />
          Send reset link
        </Button>
        <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
          In the final backend, this route will trigger email recovery. For now it preserves the branded production feel expected in the full demo.
        </p>
      </div>
    </AuthShell>
  );
}

export function QuizPage() {
  const navigate = useNavigate();
  const steps = [
    {
      prompt: "What do you need to improve first?",
      options: ["Discover more qualified opportunities", "Capture more qualified demand", "Close faster with better follow-up", "Recover stalled opportunities"],
    },
    {
      prompt: "Which channel matters most right now?",
      options: ["Prospecting new accounts", "Website widgets and forms", "WhatsApp conversations", "AI phone calls"],
    },
    {
      prompt: "What is the real bottleneck?",
      options: ["Leads arrive but nobody owns the next step", "The team does not know who to target next", "Marketing and sales operate in silos", "Follow-up is not repeatable"],
    },
    {
      prompt: "What stage is your team in?",
      options: ["Validating channel fit", "Scaling multiple campaigns", "Standardizing operations", "Preparing a bigger sales team"],
    },
  ];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const progress = ((index + 1) / (steps.length + 1)) * 100;
  const completed = index >= steps.length;

  const result = useMemo(() => {
    const first = answers[0] ?? "";
    const second = answers[1] ?? "";

    if (first.includes("Discover") || second.includes("Prospecting")) {
      return {
        title: "Start with Prospector AI + Conversations",
        description: "Discover high-potential businesses, diagnose commercial pain and push the best accounts into smarter outreach before your pipeline runs dry.",
        modules: ["Prospector AI", "Conversations", "Voice AI"],
      };
    }

    if (first.includes("Capture")) {
      return {
        title: "Start with Widgets + Acquisition",
        description: "Build a stronger entry layer so Ventra captures, qualifies and routes demand into one revenue workflow from the first touch.",
        modules: ["Widgets", "Acquisition", "Conversations"],
      };
    }

    if (first.includes("Close")) {
      return {
        title: "Start with Conversations + Voice AI",
        description: "Speed up follow-up, keep ownership visible and move hot accounts toward close with better control.",
        modules: ["Conversations", "Voice AI", "Pipeline"],
      };
    }

    if (first.includes("Recover")) {
      return {
        title: "Start with Voice AI + Creative Studio",
        description: "Reactivate stalled opportunities with structured recovery, refreshed messaging and stronger sales assets.",
        modules: ["Voice AI", "Creative Studio", "Campaigns"],
      };
    }

    return {
      title: "Start with Creative Studio + Campaigns",
      description: "Connect launch assets, outreach and commercial execution to real opportunities instead of isolated activity.",
      modules: ["Creative Studio", "Campaigns", "Prospector AI"],
    };
  }, [answers]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030915] px-4 py-10 text-white">
      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-[#071121]/92 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.65)]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between">
              <VentraLogo />
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">Premium quiz</span>
            </div>
            <Progress value={progress} className="mt-8 h-2 bg-white/10" />
            <div className="mt-8">
              <SectionLabel>Quiz goal</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white">Turn feature interest into a clear commercial action</h2>
            </div>
            <div className="mt-8 space-y-3">
              {steps.map((step, stepIndex) => (
                <div key={step.prompt} className={`rounded-2xl border px-4 py-3 text-sm ${stepIndex === index ? "border-cyan-300/20 bg-cyan-300/10 text-white" : stepIndex < index ? "border-white/10 bg-white/[0.03] text-slate-300" : "border-white/10 text-slate-500"}`}>
                  {step.prompt}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            {!completed ? (
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Step {index + 1} of {steps.length}</p>
                <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white">{steps[index].prompt}</h1>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {steps[index].options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setAnswers((previous) => [...previous, option]);
                        setIndex((value) => value + 1);
                      }}
                      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-base font-medium leading-relaxed">{option}</span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
                <div>
                  <SectionLabel>Recommended motion</SectionLabel>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-white">{result.title}</h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{result.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {result.modules.map((module) => (
                      <span key={module} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-cyan-100">
                        {module}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {answers.map((answer) => (
                      <span key={answer} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                        {answer}
                      </span>
                    ))}
                  </div>
                </div>
                <Card className="ventra-card p-6">
                  <SectionLabel>Next action</SectionLabel>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white">Move from diagnosis to a live demo path</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">Create the workspace and enter a guided environment where the recommended modules already appear as one connected revenue system.</p>
                  <div className="mt-6 grid gap-3">
                    <Button onClick={() => navigate("/register")} className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">
                      Start the demo workspace
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/")} className="w-full rounded-full border-white/10 bg-transparent text-slate-200 hover:bg-white/[0.04]">
                      Return to landing
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, completeOnboarding, createWorkspace } = useSession();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Altavista Homes");
  const [industry, setIndustry] = useState("Real estate");
  const [region, setRegion] = useState("Lima, Peru");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([onboardingGoals[0], onboardingGoals[1]]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([onboardingChannels[0], onboardingChannels[2]]);

  const total = 3;
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-[#030915] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-[#071121]/92">
        <div className="grid gap-0 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
            <VentraLogo />
            <SectionLabel>Onboarding</SectionLabel>
            <h1 className="mt-3 font-display text-4xl font-semibold text-white">Build the first operating layer of your workspace</h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">This flow should feel like the beginning of a real revenue system: guided, premium and tied to the motions that matter.</p>
            <Progress value={progress} className="mt-8 h-2 bg-white/10" />
            <div className="mt-6 space-y-3">
              {["Workspace identity", "Growth goals", "Commercial channels"].map((item, currentIndex) => (
                <div key={item} className={`rounded-2xl border px-4 py-3 text-sm ${currentIndex === step ? "border-cyan-300/20 bg-cyan-300/10 text-white" : currentIndex < step ? "border-white/10 bg-white/[0.03] text-slate-300" : "border-white/10 text-slate-500"}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="p-8">
            <p className="text-sm text-slate-400">Welcome, {user?.name ?? "builder"}.</p>
            {step === 0 ? (
              <div className="mt-6 grid gap-4">
                <Input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
                <Input value={industry} onChange={(event) => setIndustry(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
                <Input value={region} onChange={(event) => setRegion(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
              </div>
            ) : null}
            {step === 1 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {onboardingGoals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setSelectedGoals((previous) => previous.includes(goal) ? previous.filter((item) => item !== goal) : [...previous, goal])}
                    className={`rounded-2xl border p-4 text-left text-sm ${selectedGoals.includes(goal) ? "border-cyan-300/20 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            ) : null}
            {step === 2 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {onboardingChannels.map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setSelectedChannels((previous) => previous.includes(channel) ? previous.filter((item) => item !== channel) : [...previous, channel])}
                    className={`rounded-2xl border p-4 text-left text-sm ${selectedChannels.includes(channel) ? "border-violet-300/25 bg-violet-300/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))} className="rounded-full border-white/10 bg-transparent text-slate-300 hover:bg-white/[0.04]">
                Back
              </Button>
              {step < total - 1 ? (
                <Button onClick={() => setStep((value) => value + 1)} className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    createWorkspace({ name, industry, region });
                    completeOnboarding();
                    navigate("/workspaces/select");
                  }}
                  className="rounded-full bg-white text-slate-950 hover:bg-slate-100"
                >
                  Finish setup
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceSelectPage() {
  const navigate = useNavigate();
  const { workspaces, selectWorkspace } = useSession();

  return (
    <div className="min-h-screen bg-[#030915] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <VentraLogo />
        <SectionLabel>Workspace selection</SectionLabel>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Choose the commercial system you want to operate</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              type="button"
              onClick={() => {
                selectWorkspace(workspace.id);
                navigate("/app/overview");
              }}
              className="rounded-[28px] border border-white/10 bg-[#071121]/90 p-6 text-left transition hover:border-cyan-300/20 hover:bg-[#0a1629]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{workspace.plan}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">Revenue OS</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">{workspace.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{workspace.industry} | {workspace.region}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-300">{workspace.activeContacts} active contacts</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-300">{workspace.monthlyPipeline} pipeline</div>
              </div>
            </button>
          ))}
        </div>
        <Link to="/workspaces/new" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
          <Sparkles className="h-4 w-4" />
          Create a new workspace
        </Link>
      </div>
    </div>
  );
}

export function WorkspaceCreatePage() {
  const navigate = useNavigate();
  const { createWorkspace } = useSession();
  const [name, setName] = useState("Ventra New Co");
  const [industry, setIndustry] = useState("B2B services");
  const [region, setRegion] = useState("Mexico City, Mexico");

  return (
    <div className="min-h-screen bg-[#030915] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#071121]/90">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
            <VentraLogo />
            <SectionLabel>New workspace</SectionLabel>
            <h1 className="mt-3 font-display text-4xl font-semibold text-white">Launch a fresh commercial operating environment</h1>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              <Input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
              <Input value={industry} onChange={(event) => setIndustry(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
              <Input value={region} onChange={(event) => setRegion(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white" />
              <Button
                onClick={() => {
                  createWorkspace({ name, industry, region });
                  navigate("/app/overview");
                }}
                className="h-12 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100"
              >
                Launch workspace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030915] px-4 text-white">
      <div className="max-w-xl text-center">
        <VentraLogo className="justify-center" />
        <h1 className="mt-8 font-display text-5xl font-semibold text-white">This route lives outside the current Ventra operating system</h1>
        <p className="mt-4 text-slate-400">The requested page is not part of the current product walkthrough. Return to the landing flow and continue through the supported routes.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">
          Return to landing
        </Link>
      </div>
    </div>
  );
}
