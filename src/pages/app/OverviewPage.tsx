import { ArrowRight, Megaphone, MessageSquare, Palette, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { hotLeads, revenueChartData } from "@/lib/mock-data";

const moduleCards = [
  {
    title: "Marketing",
    icon: Palette,
    href: "/app/creative-studio",
    stat: "18 assets listos",
    summary: "Genera ads, variantes, copys y creativos con un solo brief comercial.",
    bullets: ["4 briefs activos", "3 conceptos por lanzar"],
  },
  {
    title: "Adquisicion",
    icon: Megaphone,
    href: "/app/acquisition",
    stat: "342 leads esta semana",
    summary: "Ordena las fuentes que traen demanda real y corta rapido lo que no convierte.",
    bullets: ["Instagram y landing arriba", "Prospectos IA con score 90+"],
  },
  {
    title: "Nurturing",
    icon: MessageSquare,
    href: "/app/voice-ai",
    stat: "127 conversaciones activas",
    summary: "WhatsApp conversa, el CRM prioriza y el equipo empuja al cierre sin dispersion.",
    bullets: ["31 seguimientos pendientes", "88% probabilidad en top leads"],
  },
];

const flowSteps = [
  { label: "Marketing", value: "24 briefs", detail: "Ads, copys y creativos listos para lanzar." },
  { label: "Adquisicion", value: "342 leads", detail: "Landing, ads y prospeccion IA alimentan el pipeline." },
  { label: "Nurturing", value: "127 chats", detail: "WhatsApp atiende, responde objeciones y recupera interesados." },
  { label: "CRM", value: "46 oportunidades", detail: "Seguimiento ordenado para no dejar dinero en la mesa." },
  { label: "Ventas", value: "$42.1k", detail: "Ingresos cerrados en los ultimos 30 dias." },
];

const priorities = [
  {
    title: "Escalar lo que ya esta trayendo cierre",
    detail: "El anuncio premium de Instagram y la landing principal concentran 54% del revenue semanal.",
  },
  {
    title: "Atender respuestas lentas en WhatsApp",
    detail: "12 leads con score alto siguen sin follow-up dentro de la ventana de 30 minutos.",
  },
  {
    title: "Enviar a CRM solo demanda calificada",
    detail: "Prospeccion IA detecto 8 cuentas nuevas con senal fuerte de compra para esta semana.",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Dashboard centrado en revenue
            </div>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Todo el producto ahora empuja un solo flujo: generar demanda, nutrir conversaciones y cerrar ventas.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Marketing produce mensajes y piezas. Adquisicion trae leads calificados. Nurturing conversa, hace seguimiento y los mueve al CRM para cerrar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                <Link to="/app/creative-studio">Ir al generador de ads</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/app/conversations">Abrir CRM</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border/70 bg-muted/30 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pulso comercial</p>
                <p className="mt-1 text-2xl font-semibold">$42,100</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">+23% en 30 dias</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueChartData.slice(-6)}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {moduleCards.map((module) => (
          <Link
            key={module.title}
            to={module.href}
            className="group rounded-[1.5rem] border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <module.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </div>
            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{module.title}</p>
              <p className="text-xl font-semibold tracking-[-0.03em]">{module.stat}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{module.summary}</p>
            </div>
            <div className="mt-5 space-y-2">
              {module.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {bullet}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Flujo operativo del MVP</h3>
              <p className="text-sm text-muted-foreground">La experiencia completa se resume en cinco pasos medibles.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Sin modulos decorativos</span>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Paso {index + 1}</span>
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold">{step.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{step.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">Prioridades de hoy</h3>
          </div>
          <div className="space-y-4">
            {priorities.map((item) => (
              <div key={item.title} className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Leads listos para cierre</h3>
            <p className="text-sm text-muted-foreground">Los contactos de mayor probabilidad que deben pasar de nurturing a CRM hoy.</p>
          </div>
          <Users className="h-5 w-5 text-primary" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="pb-3 text-left font-medium">Lead</th>
                <th className="pb-3 text-left font-medium">Fuente</th>
                <th className="pb-3 text-left font-medium">Estado</th>
                <th className="pb-3 text-right font-medium">Score</th>
                <th className="pb-3 text-right font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {hotLeads.map((lead) => (
                <tr key={lead.name} className="border-b last:border-0">
                  <td className="py-3 text-sm font-medium">{lead.name}</td>
                  <td className="py-3 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="py-3 text-sm text-muted-foreground">{lead.status}</td>
                  <td className="py-3 text-right">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{lead.score}</span>
                  </td>
                  <td className="py-3 text-right text-sm font-semibold tabular-nums">{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
