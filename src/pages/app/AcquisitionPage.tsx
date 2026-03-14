import { ArrowUpRight, BarChart3, Megaphone, MousePointerClick, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const summaryCards = [
  { icon: Users, label: "Leads entrantes", value: "342", sub: "+18% esta semana" },
  { icon: MousePointerClick, label: "CTR promedio", value: "4.2%", sub: "El mejor canal es Instagram Ads" },
  { icon: Megaphone, label: "Fuentes activas", value: "5", sub: "2 concentran la mayor demanda" },
  { icon: BarChart3, label: "Costo por lead", value: "$6.40", sub: "-11% vs semana pasada" },
];

const sourceRows = [
  { source: "Instagram Ads", spend: "$2,100", leads: "126", qualified: "54", closeRate: "18%", revenue: "$14,200" },
  { source: "Google Search", spend: "$1,450", leads: "94", qualified: "39", closeRate: "16%", revenue: "$9,800" },
  { source: "Landing principal", spend: "$620", leads: "61", qualified: "28", closeRate: "21%", revenue: "$8,100" },
  { source: "Referidos", spend: "$0", leads: "34", qualified: "19", closeRate: "29%", revenue: "$12,100" },
  { source: "WhatsApp organico", spend: "$0", leads: "27", qualified: "12", closeRate: "15%", revenue: "$4,600" },
];

const readyForNurturing = [
  { lead: "Ana Garcia", source: "Instagram Ads", intent: "Consulta precio premium", value: "$3,200" },
  { lead: "Carlos Mendoza", source: "Landing principal", intent: "Pidio demo comercial", value: "$5,400" },
  { lead: "Pedro Martinez", source: "Google Search", intent: "Solicito cotizacion", value: "$9,800" },
];

export default function AcquisitionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Adquisicion</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Trae leads con intencion, no volumen decorativo.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Aqui solo se ve lo que genera demanda real: fuentes, costo por lead y volumen listo para entrar a nurturing.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">Ver fuentes</Button>
          <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">Nuevo lead</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-[1.25rem] border bg-card p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <card.icon className="h-4 w-4" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                <ArrowUpRight className="h-3 w-3" />
                En foco
              </span>
            </div>
            <p className="text-2xl font-semibold tracking-[-0.03em]">{card.value}</p>
            <p className="mt-1 text-sm font-medium">{card.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Fuentes que alimentan revenue</h3>
            <p className="text-sm text-muted-foreground">Mide inversion, calidad y cierres por canal para no dispersar presupuesto.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="pb-3 text-left font-medium">Fuente</th>
                  <th className="pb-3 text-right font-medium">Inversion</th>
                  <th className="pb-3 text-right font-medium">Leads</th>
                  <th className="pb-3 text-right font-medium">Calificados</th>
                  <th className="pb-3 text-right font-medium">Cierre</th>
                  <th className="pb-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {sourceRows.map((row) => (
                  <tr key={row.source} className="border-b last:border-0">
                    <td className="py-3 text-sm font-medium">{row.source}</td>
                    <td className="py-3 text-right text-sm text-muted-foreground">{row.spend}</td>
                    <td className="py-3 text-right text-sm">{row.leads}</td>
                    <td className="py-3 text-right text-sm">{row.qualified}</td>
                    <td className="py-3 text-right text-sm">{row.closeRate}</td>
                    <td className="py-3 text-right text-sm font-semibold">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Listos para pasar a nurturing</h3>
            <p className="text-sm text-muted-foreground">Leads con senal suficiente para que WhatsApp empiece conversacion y seguimiento.</p>
          </div>

          <div className="space-y-3">
            {readyForNurturing.map((item) => (
              <div key={item.lead} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.lead}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.source}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{item.value}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.intent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
