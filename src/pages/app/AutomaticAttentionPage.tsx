import { useMemo, useState } from "react";
import { ArrowRight, Bot, MessageSquareMore, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  assistantHandoffRules,
  assistantIdealClientTypes,
  assistantObjectionLibrary,
  assistantPreviewScenarios,
  assistantToneOptions,
  automaticAttentionGoals,
} from "@/lib/commercial-hub";
import { cn } from "@/lib/utils";

type PreviewMessage = {
  role: "assistant" | "user";
  content: string;
};

function buildAssistantResponse(input: string, assistantName: string, tone: string, objective: string) {
  return `${assistantName}: Entiendo tu punto. ${tone.toLowerCase()} nuestra prioridad aqui es ${objective.toLowerCase()}. Si te sirve, te hago dos preguntas cortas para ver si encaja contigo y dejarte el siguiente paso claro.`;
}

export default function AutomaticAttentionPage() {
  const [assistantName, setAssistantName] = useState("Ventra Concierge");
  const [objective, setObjective] = useState("calificar prospectos y llevarlos a llamada cuando hay intencion real");
  const [tone, setTone] = useState(assistantToneOptions[2]);
  const [idealClient, setIdealClient] = useState(assistantIdealClientTypes[0]);
  const [mainOutcome, setMainOutcome] = useState("Resolver dudas, detectar encaje y dejar siguiente paso definido.");
  const [handoffTrigger, setHandoffTrigger] = useState("Cuando el prospecto pide negociacion, caso especial o llamada inmediata.");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Responder consultas",
    "Calificar prospectos",
    "Agendar llamada",
  ]);
  const [objections, setObjections] = useState(assistantObjectionLibrary);
  const [newObjection, setNewObjection] = useState("");
  const [selectedScenario, setSelectedScenario] = useState(assistantPreviewScenarios[0]);
  const [previewInput, setPreviewInput] = useState("");
  const [customThread, setCustomThread] = useState<PreviewMessage[]>([]);

  const previewMessages = useMemo<PreviewMessage[]>(
    () => [
      { role: "user", content: selectedScenario.customerMessage },
      {
        role: "assistant",
        content: buildAssistantResponse(selectedScenario.customerMessage, assistantName, tone, objective),
      },
      ...customThread,
    ],
    [assistantName, customThread, objective, selectedScenario.customerMessage, tone],
  );

  function toggleGoal(goal: string) {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal],
    );
  }

  function addObjection() {
    if (!newObjection.trim()) return;
    setObjections((current) => [...current, newObjection.trim()]);
    setNewObjection("");
  }

  function sendPreviewMessage() {
    if (!previewInput.trim()) return;
    setCustomThread((current) => [
      ...current,
      { role: "user", content: previewInput.trim() },
      {
        role: "assistant",
        content: buildAssistantResponse(previewInput.trim(), assistantName, tone, objective),
      },
    ]);
    setPreviewInput("");
  }

  return (
    <div className="space-y-6">
      <section className="surface-panel overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Capa 02
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Configura un asistente que atiende consultas con criterio comercial.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Nada tecnico ni inflado. Solo lo necesario para responder, filtrar, detectar intencion y derivar a humano
              cuando hace falta.
            </p>
          </div>

          <div className="surface-subtle p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Lo que debe lograr</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedGoals.map((goal) => (
                <span key={goal} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {goal}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Cliente ideal: {idealClient}. Resultado esperado: {mainOutcome}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Configuracion</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Base del asistente</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Nombre del asistente</label>
              <Input value={assistantName} onChange={(event) => setAssistantName(event.target.value)} className="h-12 rounded-2xl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Tono</label>
              <Input value={tone} onChange={(event) => setTone(event.target.value)} className="h-12 rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Objetivo principal</label>
              <Textarea value={objective} onChange={(event) => setObjective(event.target.value)} className="min-h-[96px] rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Tipo de cliente ideal</label>
              <Textarea value={idealClient} onChange={(event) => setIdealClient(event.target.value)} className="min-h-[96px] rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Que debe lograr en la conversacion</label>
              <Textarea value={mainOutcome} onChange={(event) => setMainOutcome(event.target.value)} className="min-h-[96px] rounded-2xl" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Cuando pasar a humano</label>
              <Textarea value={handoffTrigger} onChange={(event) => setHandoffTrigger(event.target.value)} className="min-h-[96px] rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-panel p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Objetivos del asistente</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {automaticAttentionGoals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    selectedGoals.includes(goal)
                      ? "border-primary/25 bg-primary/10 text-primary"
                      : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div className="surface-panel p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Objeciones comunes</p>
            <div className="mt-5 space-y-3">
              {objections.map((item) => (
                <div key={item} className="surface-subtle flex items-center justify-between gap-3 p-4">
                  <p className="text-sm leading-relaxed">{item}</p>
                  <button
                    type="button"
                    className="text-xs font-medium text-muted-foreground hover:text-destructive"
                    onClick={() => setObjections((current) => current.filter((objection) => objection !== item))}
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <Input value={newObjection} onChange={(event) => setNewObjection(event.target.value)} className="h-12 rounded-2xl" placeholder="Agregar nueva objecion" />
              <Button type="button" onClick={addObjection} className="rounded-2xl gradient-ventra text-primary-foreground">
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div id="assistant-preview" className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquareMore className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Preview conversacional</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Probar respuestas antes de salir</h2>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {assistantPreviewScenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setSelectedScenario(scenario);
                  setPreviewInput("");
                  setCustomThread([]);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selectedScenario.id === scenario.id
                    ? "border-primary/25 bg-primary/10 text-primary"
                    : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                )}
              >
                {scenario.label}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-border/80 bg-background/70">
            <div className="border-b border-border/80 px-5 py-4">
              <p className="text-sm font-semibold">{assistantName}</p>
              <p className="mt-1 text-xs text-muted-foreground">{selectedScenario.goal}</p>
            </div>

            <div className="space-y-4 p-5">
              {previewMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-[1.2rem] px-4 py-3 text-sm leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border bg-card text-foreground",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/80 p-4">
              <div className="flex gap-3">
                <Input
                  value={previewInput}
                  onChange={(event) => setPreviewInput(event.target.value)}
                  className="h-12 rounded-2xl"
                  placeholder="Escribe un mensaje para probar"
                />
                <Button type="button" onClick={sendPreviewMessage} className="rounded-2xl gradient-ventra text-primary-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div id="assistant-handoff" className="surface-panel p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Reglas de derivacion</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Cuando escalar y cuando priorizar</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {assistantHandoffRules.map((rule) => (
              <div key={rule.title} className="surface-subtle p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <rule.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{rule.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.35rem] border border-primary/20 bg-primary/5 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Regla principal</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{handoffTrigger}</p>
            <Button className="mt-5 w-full rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
              Guardar criterio del asistente
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
