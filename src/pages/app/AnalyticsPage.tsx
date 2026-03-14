import { Image, LayoutGrid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const creativeCards = [
  { name: "Hero premium", format: "Feed 1080x1350", status: "Listo", note: "El mas usado en captacion de leads premium." },
  { name: "Testimonio visual", format: "Story 1080x1920", status: "En revision", note: "Funciona para reactivar prospectos tibios." },
  { name: "Oferta con urgencia", format: "Banner 1200x628", status: "Listo", note: "Mejor pieza para promociones de cierre rapido." },
  { name: "Comparativo antes / despues", format: "Carousel 1080x1080", status: "Listo", note: "Ideal para mostrar valor y justificar precio." },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Marketing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Creativos ordenados por utilidad comercial.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Esta vista se queda solo con piezas que alimentan adquisicion y nurturing. Nada de galerias decorativas.
          </p>
        </div>
        <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo creativo
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Creativos listos", "12"],
          ["Formatos activos", "5"],
          ["Piezas en uso", "9"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.25rem] border bg-card p-5 shadow-card">
            <p className="text-2xl font-semibold tracking-[-0.03em]">{value}</p>
            <p className="mt-1 text-sm font-medium">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {creativeCards.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-[1.5rem] border bg-card shadow-card">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-primary/10 bg-background/70 text-primary">
                <Image className="h-7 w-7" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{item.name}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "Listo" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.format}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-primary" />
          <h3 className="text-lg font-semibold">Uso dentro del flujo</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Captacion", "Creativos para ads con CTA de WhatsApp y formularios."],
            ["Nurturing", "Piezas de apoyo para seguimiento, prueba social y recuperacion."],
            ["Cierre", "Visuales que refuerzan precio, urgencia y confianza comercial."],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-2xl border bg-muted/20 p-4">
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
