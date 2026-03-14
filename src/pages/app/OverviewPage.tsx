import { ArrowRight, Megaphone, MessageSquare, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { revenueChartData } from "@/lib/mock-data";

const layerCards = [
  {
    title: "Adquisicion",
    icon: Megaphone,
    href: "/app/acquisition",
    badge: "Plan completo",
    stat: "3 campanas claras",
    summary: "Define objetivo, angulo y copy sin perderte en herramientas separadas.",
  },
  {
    title: "Atencion automatica",
    icon: MessageSquare,
    href: "/app/automatic-attention",
    badge: "Plan basico",
    stat: "127 conversaciones activas",
    summary: "Configura el asistente, pruebalo y mejora respuestas para no dejar dudas sin atender.",
  },
  {
    title: "Cierre",
    icon: Target,
    href: "/app/closing",
    badge: "Plan completo",
    stat: "5 leads priorizados",
    summary: "Haz seguimiento, clasifica interes y empuja cada oportunidad al siguiente paso.",
  },
];

const priorities = [
  {
    title: "Afinar una sola campana",
    detail: "Usa Adquisicion para salir con un mensaje mas claro antes de abrir nuevos frentes.",
  },
  {
    title: "Revisar respuestas del asistente",
    detail: "La atencion automatica debe resolver objeciones y llevar a una llamada o cierre.",
  },
  {
    title: "Mover leads calientes a seguimiento",
    detail: "El modulo de Cierre debe concentrarse solo en oportunidades con siguiente paso claro.",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Centro de control comercial
            </div>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Ventra AI ahora se entiende en menos de 10 segundos: atraer clientes, atenderlos mejor y cerrar mas ventas.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                El producto se reorganiza en tres capas claras para que puedas empezar por atencion automatica y crecer
                hacia adquisicion y cierre cuando necesites mas empuje comercial.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                <Link to="/app/automatic-attention">Configurar atencion automatica</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/app/acquisition">Abrir adquisicion</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border/70 bg-muted/30 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Resultado del mes</p>
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
            <p className="mt-4 text-sm text-muted-foreground">
              Cuando la narrativa del producto es clara, tambien es mas facil decidir donde actuar primero.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {layerCards.map((layer) => (
          <Link
            key={layer.title}
            to={layer.href}
            className="group rounded-[1.5rem] border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <layer.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {layer.badge}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{layer.title}</p>
              <p className="text-xl font-semibold tracking-[-0.03em]">{layer.stat}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{layer.summary}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Como se vende Ventra hoy</h3>
              <p className="text-sm text-muted-foreground">Una promesa simple, una ruta clara y tres capas entendibles.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Menos ruido, mas foco</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["1", "Adquisicion", "Te ayudamos a crear mejores campanas para atraer nuevos clientes."],
              ["2", "Atencion automatica", "El asistente responde, guia y mejora las conversaciones."],
              ["3", "Cierre", "Seguimiento claro para no perder oportunidades ni cierres."],
            ].map(([step, title, detail]) => (
              <div key={title} className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Paso {step}</span>
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
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
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="text-lg font-semibold">Escalado por plan</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              La experiencia ya comunica una progresion simple: empieza con atencion automatica y suma adquisicion y
              cierre cuando quieras crecer.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border bg-muted/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Plan basico</p>
              <p className="mt-2 text-xl font-semibold">Atencion automatica</p>
              <p className="mt-2 text-sm text-muted-foreground">Para empezar a responder mejor y no perder prospectos entrantes.</p>
            </div>
            <div className="rounded-2xl border bg-primary/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Plan completo</p>
              <p className="mt-2 text-xl font-semibold">Adquisicion + Atencion automatica + Cierre</p>
              <p className="mt-2 text-sm text-muted-foreground">Para atraer mejores clientes, atenderlos y cerrar mas ventas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
