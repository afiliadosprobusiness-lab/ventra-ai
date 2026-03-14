import { ArrowUpRight, Pause, Play, SplitSquareVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const adVariants = [
  { name: "Premium directo", channel: "Instagram Feed", status: "Activa", ctr: "4.8%", cpl: "$5.90", leads: 84, revenue: "$9,600" },
  { name: "Comparativo rapido", channel: "Instagram Stories", status: "Activa", ctr: "4.1%", cpl: "$6.20", leads: 63, revenue: "$7,100" },
  { name: "Prueba social", channel: "Facebook Feed", status: "Pausada", ctr: "2.9%", cpl: "$8.40", leads: 27, revenue: "$2,900" },
  { name: "Objecion precio", channel: "Remarketing", status: "En revision", ctr: "3.7%", cpl: "$6.80", leads: 41, revenue: "$4,850" },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Marketing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Variantes de ads para escalar solo lo que si trae demanda.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Cada variante se compara por respuesta comercial, costo por lead y revenue, no por vanity metrics.
          </p>
        </div>
        <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">Nueva variante</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Variantes activas", "8"],
          ["Mejor CTR", "4.8%"],
          ["Mejor CPL", "$5.90"],
          ["Revenue atribuido", "$24,450"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.25rem] border bg-card p-5 shadow-card">
            <p className="text-2xl font-semibold tracking-[-0.03em]">{value}</p>
            <p className="mt-1 text-sm font-medium">{label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        {adVariants.map((variant) => (
          <div key={variant.name} className="rounded-[1.5rem] border bg-card p-5 shadow-card">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <SplitSquareVertical className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">{variant.name}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      variant.status === "Activa"
                        ? "bg-primary/10 text-primary"
                        : variant.status === "Pausada"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {variant.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{variant.channel}</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    {[
                      ["CTR", variant.ctr],
                      ["CPL", variant.cpl],
                      ["Leads", String(variant.leads)],
                      ["Revenue", variant.revenue],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border bg-muted/20 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  Escalable
                </span>
                {variant.status === "Activa" ? (
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Pause className="mr-2 h-4 w-4" />
                    Pausar
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Play className="mr-2 h-4 w-4" />
                    Activar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
