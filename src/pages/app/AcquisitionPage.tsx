import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

const angles = [
  {
    name: "El angulo del ahorro",
    hook: "Cuanto pierdes al mes sin un sistema comercial claro?",
    copy: "Cada consulta que no respondes a tiempo es una venta que se aleja. Ventra te ayuda a atraer mejor y responder mas rapido.",
  },
  {
    name: "El angulo de la velocidad",
    hook: "Responde en segundos, no en horas",
    copy: "Tus prospectos comparan opciones. Un sistema que responde y sigue mejor te da ventaja justo cuando el interes es mas alto.",
  },
  {
    name: "El angulo del cierre",
    hook: "No necesitas mas leads. Necesitas convertir mejor los que ya llegan.",
    copy: "Con Ventra atraes mas claro, atiendes mejor y das seguimiento con mas orden para cerrar mas oportunidades.",
  },
];

export default function AcquisitionPage() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  function handleGenerate() {
    if (prompt.trim()) setGenerated(true);
  }

  function handleCopy(index: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-foreground">Adquisicion</h1>
        <p className="mt-1 text-sm text-muted-foreground">Crea campanas mas claras para atraer mas clientes</p>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <label className="mb-3 block text-sm font-medium text-foreground">Que quieres promocionar hoy?</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ej: Servicio para negocios que venden por WhatsApp..."
            className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={handleGenerate}
            className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            Generar
          </button>
        </div>
      </div>

      {generated ? (
        <div>
          <h3 className="text-sm font-semibold text-foreground">3 angulos de venta sugeridos</h3>
          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {angles.map((angle, index) => (
            <div key={angle.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Angulo {index + 1}</div>
                  <h4 className="font-bold text-foreground">{angle.name}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(index, `${angle.hook}\n\n${angle.copy}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied === index ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  {copied === index ? "Copiado" : "Copiar"}
                </button>
              </div>
              <div className="mb-3 rounded-xl border border-border bg-secondary p-4">
                <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Hook</div>
                <p className="text-sm font-medium text-foreground">{angle.hook}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary p-4">
                <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Copy</div>
                <p className="text-sm leading-relaxed text-foreground">{angle.copy}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Genera angulos de venta</h3>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Describe lo que quieres promocionar y Ventra generara angulos de venta, hooks y copys listos para usar.
          </p>
        </div>
      )}
    </div>
  );
}
