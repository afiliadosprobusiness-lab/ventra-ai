import { ArrowRight, Palette, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const generatedAds = [
  {
    title: "Oferta directa",
    hook: "Convierte consultas en ventas por WhatsApp en menos de 24 horas.",
    angle: "Urgencia + beneficio inmediato",
    cta: "Escribenos ahora",
  },
  {
    title: "Prueba social",
    hook: "Las marcas que ordenan sus conversaciones venden mas sin contratar mas equipo.",
    angle: "Credibilidad + eficiencia comercial",
    cta: "Quiero verlo",
  },
  {
    title: "Recuperacion de interes",
    hook: "No pierdas leads por respuestas lentas ni CRM desordenado.",
    angle: "Dolor + solucion concreta",
    cta: "Activar demo",
  },
];

const assetPackages = [
  { name: "Pack lanzamiento", detail: "3 ads, 2 copys y 1 creativo principal", status: "Listo" },
  { name: "Pack remarketing", detail: "2 variantes para leads tibios", status: "En revision" },
  { name: "Pack oferta premium", detail: "1 pieza hero y 3 mensajes de cierre", status: "Listo" },
];

export default function CreativeStudioPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Marketing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Generador de ads con foco total en revenue.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Parte de un brief, define angulos y genera mensajes listos para atraer leads de mejor calidad.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Brief comercial</label>
              <Textarea
                className="mt-2 min-h-[180px]"
                defaultValue={
                  "Producto: plataforma de ventas enfocada en WhatsApp.\nObjetivo: captar leads listos para conversar.\nOferta: demo guiada + activacion rapida.\nAudiencia: negocios que dependen de mensajes para vender."
                }
              />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Objetivo", "Generar leads"],
                ["Canal", "Meta Ads"],
                ["CTA", "Escribenos ahora"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border bg-muted/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                <Sparkles className="mr-2 h-4 w-4" />
                Generar lote
              </Button>
              <Button variant="outline" className="rounded-xl">Guardar brief</Button>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Resultado esperado</p>
              <h3 className="mt-1 text-xl font-semibold">Ads listos para adquisicion</h3>
            </div>
            <Target className="h-5 w-5 text-primary" />
          </div>

          <div className="mt-5 space-y-4">
            {generatedAds.map((item) => (
              <div key={item.title} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em]">{item.hook}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item.angle}</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{item.cta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border bg-card p-6 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <h3 className="text-lg font-semibold">Paquetes de assets</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {assetPackages.map((item) => (
            <div key={item.name} className="rounded-2xl border bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{item.name}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "Listo" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
