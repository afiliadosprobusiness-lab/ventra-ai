import { useMemo, useState } from "react";
import { Bot, CheckCircle2, MessageSquare, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const assistantGoals = [
  "Agendar una llamada",
  "Calificar interesados",
  "Responder dudas frecuentes",
  "Recuperar interes",
  "Empujar el cierre",
];

const commonObjections = [
  "Es muy caro",
  "Necesito pensarlo",
  "No estoy listo todavia",
  "Ya estoy viendo otra opcion",
  "No entiendo bien como funciona",
];

export default function AutomaticAttentionPage() {
  const [selectedGoal, setSelectedGoal] = useState(assistantGoals[0]);
  const [selectedObjection, setSelectedObjection] = useState(commonObjections[0]);

  const previewReply = useMemo(() => {
    if (selectedGoal === "Agendar una llamada") {
      return "Perfecto. Si te parece, te propongo una llamada corta para mostrarte como funcionaria en tu negocio y resolver dudas concretas.";
    }

    if (selectedGoal === "Recuperar interes") {
      return "Retomo tu mensaje porque vi interes real. Si quieres, te resumo en 30 segundos como esto te ayuda a responder mas rapido y no perder consultas.";
    }

    if (selectedGoal === "Empujar el cierre") {
      return "Si ya estas evaluandolo, te recomiendo avanzar con el siguiente paso hoy para que no se enfrie la oportunidad. Te acompano en lo que falta.";
    }

    return "Te ayudo a resolver eso de forma clara y, si encaja contigo, te llevo al siguiente paso sin perder tiempo.";
  }, [selectedGoal]);

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Atencion automatica
            </div>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                Configura tu asistente para atender prospectos automaticamente.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Esta capa concentra lo importante: objetivo, objeciones, instrucciones y una vista previa para probar
                respuestas antes de usar el asistente en conversaciones reales.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                <Play className="h-4 w-4" />
                Probar asistente
              </Button>
              <Button variant="outline" className="rounded-xl">Guardar configuracion</Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Plan de entrada", "Basico", "Incluye solo esta capa desde 9.99 USD/mes"],
              ["Conversaciones activas", "127", "Prospectos atendidos con seguimiento inicial"],
              ["Respuesta promedio", "< 1 min", "Mas velocidad, menos fugas por demora"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-[1.25rem] border bg-background/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Configuracion del asistente</h3>
            </div>
            <div className="mt-5 grid gap-4">
              <div>
                <label className="text-sm font-medium">Nombre del asistente</label>
                <Input defaultValue="Asistente comercial Ventra" className="mt-2 h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium">Objetivo principal</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {assistantGoals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setSelectedGoal(goal)}
                      className={`rounded-full px-3 py-2 text-sm transition-colors ${
                        selectedGoal === goal ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Instrucciones clave</label>
                <Textarea
                  className="mt-2 min-h-[160px]"
                  defaultValue={`- Hablar claro y sin tecnicismos
- Responder con empatia y llevar a un siguiente paso
- No saturar de informacion
- Detectar si conviene agendar, calificar o cerrar
- Escalar a humano cuando haya bloqueo real`}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Objeciones comunes</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {commonObjections.map((objection) => (
                <button
                  key={objection}
                  type="button"
                  onClick={() => setSelectedObjection(objection)}
                  className={`rounded-full px-3 py-2 text-sm transition-colors ${
                    selectedObjection === objection ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {objection}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border bg-muted/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Objecion seleccionada</p>
              <p className="mt-2 text-sm font-semibold">{selectedObjection}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                El asistente debe responder con contexto, aliviar la friccion y llevar al prospecto a una decision o
                al siguiente paso adecuado.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-card">
            <div className="flex items-center justify-between border-b bg-sidebar px-5 py-4 text-sidebar-foreground">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Preview conversacional</p>
                <h3 className="mt-1 text-base font-semibold">Prueba el asistente antes de publicarlo</h3>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-sidebar-foreground hover:bg-white/10">
                Simular
              </Button>
            </div>

            <div className="space-y-4 bg-background p-5">
              <div className="flex justify-end">
                <div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                  Hola. Tengo interes, pero no entiendo bien como me ayudaria.
                </div>
              </div>
              <div className="max-w-sm rounded-2xl rounded-bl-md border bg-card px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Asistente</p>
                <p className="mt-2 text-sm leading-relaxed">{previewReply}</p>
              </div>
              <div className="flex justify-end">
                <div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                  {selectedObjection}
                </div>
              </div>
              <div className="max-w-sm rounded-2xl rounded-bl-md border bg-card px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Asistente</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Entiendo esa duda. En vez de darte una respuesta generica, te explico rapido el resultado: menos
                  prospectos frios, mejores respuestas y un siguiente paso claro para cerrar o agendar.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Como mejorar respuestas</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Hablar en terminos de resultado, no de tecnologia.",
                "Responder una objecion por mensaje para no saturar.",
                "Cerrar cada respuesta con un siguiente paso claro.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border bg-muted/20 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
