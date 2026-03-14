import { useState } from "react";
import { MessageCircle, Send, Settings } from "lucide-react";

const defaultObjections = [
  "Es muy caro",
  "Lo tengo que pensar",
  "Ya tengo otro proveedor",
  "No tengo tiempo ahora",
];

const initialMessages = [
  { role: "user" as const, text: "Hola, me interesa el servicio" },
  { role: "bot" as const, text: "Hola. Gracias por escribir. Te ayudo a resolver dudas y a ver si esto encaja con tu negocio." },
];

export default function AutomaticAttentionPage() {
  const [tab, setTab] = useState<"config" | "test">("config");
  const [name, setName] = useState("Ventra Assistant");
  const [objective, setObjective] = useState("Agendar una llamada de demostracion");
  const [instructions, setInstructions] = useState(
    "Se amable y profesional. Resuelve dudas del prospecto y guia la conversacion hacia agendar una llamada o avanzar al siguiente paso.",
  );
  const [objections, setObjections] = useState(defaultObjections);
  const [newObjection, setNewObjection] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function addObjection() {
    if (!newObjection.trim()) return;
    setObjections((current) => [...current, newObjection.trim()]);
    setNewObjection("");
  }

  function handleSend() {
    if (!input.trim()) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: input },
      {
        role: "bot",
        text: "Perfecto. Entiendo tu punto. Te explico como esto puede ayudarte y si quieres avanzamos con una llamada breve.",
      },
    ]);
    setInput("");
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Atencion automatica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configura y prueba tu asistente comercial</p>
      </div>

      <div className="mb-6 flex w-fit gap-1 rounded-xl bg-secondary p-1">
        <button
          type="button"
          onClick={() => setTab("config")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "config" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="h-4 w-4" /> Configuracion
        </button>
        <button
          type="button"
          onClick={() => setTab("test")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "test" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageCircle className="h-4 w-4" /> Probar asistente
        </button>
      </div>

      {tab === "config" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <label className="mb-2 block text-sm font-medium text-foreground">Nombre del asistente</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <label className="mb-2 block text-sm font-medium text-foreground">Objetivo principal</label>
              <input
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <label className="mb-2 block text-sm font-medium text-foreground">Instrucciones</label>
              <textarea
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Biblioteca de objeciones</h3>
            <p className="mb-4 text-xs text-muted-foreground">Agrega objeciones comunes y entrena respuestas mas claras.</p>
            <div className="mb-4 space-y-2">
              {objections.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5">
                  <span className="flex-1 text-sm text-foreground">"{item}"</span>
                  <button
                    type="button"
                    onClick={() => setObjections((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                    className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newObjection}
                onChange={(event) => setNewObjection(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addObjection();
                }}
                placeholder="Agregar objecion..."
                className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={addObjection}
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-lg overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{name}</div>
              <div className="text-[10px] text-primary">En linea</div>
            </div>
          </div>

          <div className="h-80 space-y-3 overflow-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-secondary text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
