import { Copy, MessageSquareText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const copyLibrary = [
  {
    title: "Hook directo",
    channel: "Meta Ads",
    text: "Tus leads ya llegan. El problema es que se enfria la conversacion antes de cerrar.",
    cta: "Activa el flujo ahora",
  },
  {
    title: "Objecion precio",
    channel: "WhatsApp",
    text: "Si hoy sientes que vender por mensajes te quita tiempo, imagina cerrar sin responder todo manualmente.",
    cta: "Quiero verlo",
  },
  {
    title: "Prueba social",
    channel: "Landing",
    text: "Marcas que ordenan marketing, captacion y nurturing en un mismo flujo venden mas con el mismo equipo.",
    cta: "Solicitar demo",
  },
  {
    title: "Seguimiento tibio",
    channel: "Remarketing",
    text: "Tu CRM no deberia ser un cementerio de interesados. Reactiva conversaciones con contexto y timing.",
    cta: "Recuperar leads",
  },
];

export default function WidgetsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Marketing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Copys listos para captar, nutrir y cerrar.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Mantiene el mensaje comercial consistente entre anuncios, WhatsApp y seguimiento sin duplicar trabajo.
          </p>
        </div>
        <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo copy
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {copyLibrary.map((item) => (
          <div key={item.title} className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{item.channel}</span>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.title}</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{item.text}</p>
              <p className="mt-4 text-sm text-primary">{item.cta}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl">
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>
              <Button variant="ghost" size="sm" className="rounded-xl">Editar</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
