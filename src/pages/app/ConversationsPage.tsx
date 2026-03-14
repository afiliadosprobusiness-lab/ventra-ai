import { useState } from "react";
import { MoreHorizontal, Paperclip, Phone, Send, Smile, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatMessages, conversations } from "@/lib/mock-data";

const crmStats = [
  { label: "Leads activos", value: "48" },
  { label: "Seguimiento hoy", value: "12" },
  { label: "Prob. cierre", value: "88%" },
];

const suggestionChips = [
  "Enviar recordatorio del descuento",
  "Preguntar si necesita mas informacion",
  "Ofrecer muestra gratis",
  "Compartir testimonios de clientes",
];

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const conv = conversations[selected];

  return (
    <div className="space-y-4 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-5 shadow-card xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Nurturing + CRM</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Conversaciones, contexto y siguientes pasos en un solo lugar.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            El CRM ya no es un modulo aparte. Aqui mismo el equipo conversa, prioriza y empuja al lead hacia cierre.
          </p>
        </div>
        <div className="flex gap-3">
          {crmStats.map((item) => (
            <div key={item.label} className="rounded-2xl border bg-muted/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid min-h-[calc(100vh-14rem)] gap-0 overflow-hidden rounded-[1.5rem] border bg-card shadow-card xl:grid-cols-[320px_minmax(0,1fr)_300px]">
        <aside className="border-r">
          <div className="border-b p-4">
            <Input placeholder="Buscar leads o conversaciones..." className="h-10 rounded-xl" />
          </div>
          <div className="flex items-center gap-2 border-b px-4 py-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">Calientes</span>
            <span>Sin respuesta</span>
            <span>Por cerrar</span>
          </div>
          <div className="max-h-[calc(100vh-21rem)] overflow-auto">
            {conversations.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(index)}
                className={`flex w-full items-center gap-3 border-b px-4 py-4 text-left transition-colors ${
                  selected === index ? "bg-primary/5" : "hover:bg-muted/30"
                }`}
              >
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {item.initials}
                  </div>
                  {item.status === "online" ? <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-primary" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{item.lastMessage}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Score {item.score}</p>
                </div>
                {item.unread > 0 ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {item.unread}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {conv.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{conv.name}</p>
                <p className="text-xs text-muted-foreground">En linea · Lead caliente · Score {conv.score}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><Star className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><Tag className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-auto bg-background px-5 py-5">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xl rounded-2xl px-4 py-3 ${
                    msg.sender === "agent"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border bg-card shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`mt-2 text-[10px] ${msg.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t px-4 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestionChips.map((item) => (
                <button key={item} className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4" /></Button>
              <Input placeholder="Escribe un mensaje..." className="flex-1 rounded-xl" />
              <Button variant="ghost" size="sm"><Smile className="h-4 w-4" /></Button>
              <Button size="sm" className="gradient-ventra rounded-xl text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <aside className="border-l p-5">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
              {conv.initials}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{conv.name}</h3>
            <p className="text-sm text-muted-foreground">ana@gmail.com</p>
            <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Informacion comercial</p>
              <div className="mt-3 space-y-3">
                {[
                  ["Estado", "Interesado"],
                  ["Score", "92"],
                  ["Prob. cierre", "88%"],
                  ["Valor", "$3,200"],
                  ["Fuente", "Instagram Ads"],
                  ["Asesor", "Maria R."],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Etiquetas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Premium", "Instagram", "WhatsApp", "Descuento"].map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Acciones</p>
              <div className="mt-3 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-center rounded-xl">Programar seguimiento</Button>
                <Button variant="outline" size="sm" className="w-full justify-center rounded-xl">Asignar a asesor</Button>
                <Button size="sm" className="w-full justify-center rounded-xl gradient-ventra text-primary-foreground">Marcar como cerrado</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
