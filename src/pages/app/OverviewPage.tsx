import { ArrowUpRight, MessageCircle, Target, TrendingUp, Users } from "lucide-react";

const kpis = [
  { label: "Leads nuevos", value: "89", change: "+12%", icon: Users },
  { label: "Conversaciones activas", value: "34", change: "+8%", icon: MessageCircle },
  { label: "En seguimiento", value: "52", change: "+15%", icon: Target },
  { label: "Tasa de cierre", value: "31%", change: "+5%", icon: TrendingUp },
];

const activity = [
  { name: "Maria Lopez", action: "fue marcada como alta intencion por el asistente", time: "Hace 5 min" },
  { name: "Carlos Ruiz", action: "respondio al mensaje de seguimiento", time: "Hace 12 min" },
  { name: "Ana Torres", action: "inicio conversacion por WhatsApp", time: "Hace 25 min" },
  { name: "Pedro Gomez", action: "cerrado como cliente", time: "Hace 1 hora" },
];

const chartData = [40, 55, 35, 60, 75, 50, 80, 65, 90, 70, 85, 95];
const chartLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default function OverviewPage() {
  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Resumen de tu sistema comercial</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:mb-8 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center gap-0.5 text-xs font-medium text-primary tabular-nums">
                {kpi.change}
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums">{kpi.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-4 xl:mb-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold">Oportunidades generadas vs. cerradas</h3>
          <div className="flex h-44 items-end gap-1.5 overflow-hidden sm:h-52">
            {chartData.map((height, index) => (
              <div key={chartLabels[index]} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative w-full overflow-hidden rounded-t-sm bg-primary/15" style={{ height: `${height}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-primary" style={{ height: `${height * 0.55}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{chartLabels[index]}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-sm bg-primary/15" /> Generadas
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-sm bg-primary" /> Cerradas
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold">Embudo</h3>
          <div className="space-y-3">
            {[
              { label: "Nuevos", val: 89, pct: 100 },
              { label: "En conversacion", val: 34, pct: 38 },
              { label: "En seguimiento", val: 52, pct: 58 },
              { label: "Cerrados", val: 28, pct: 31 },
              { label: "Perdidos", val: 9, pct: 10 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-foreground">{item.val}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-semibold">Actividad reciente</h3>
        <div className="space-y-3">
          {activity.map((item) => (
            <div key={`${item.name}-${item.time}`} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{item.name}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
