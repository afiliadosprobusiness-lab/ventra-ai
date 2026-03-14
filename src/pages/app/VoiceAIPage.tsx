import { Bot, Play, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const objections = [
  "Es muy caro",
  "Necesito pensarlo",
  "Ya compre en otro lado",
  "No tengo dinero ahora",
  "Tienen descuento?",
  "No estoy seguro",
];

const activators = [
  { label: "Primer mensaje del lead", enabled: true },
  { label: "Sin respuesta en 30 min", enabled: true },
  { label: "Lead pregunta por precio", enabled: true },
  { label: "Objecion detectada", enabled: true },
  { label: "Lead pide descuento", enabled: false },
  { label: "Conversacion abandonada 24h", enabled: true },
];

const templates = [
  {
    label: "Saludo inicial",
    text: "Hola {nombre}. Gracias por escribirnos. Te ayudo a resolver dudas y llevarte a la mejor opcion para cerrar hoy.",
  },
  {
    label: "Respuesta a precio",
    text: "Nuestro paquete premium cuesta {precio} e incluye envio gratis. Si te parece, te muestro rapido por que es la mejor opcion para tu caso.",
  },
  {
    label: "Cierre",
    text: "Perfecto. Para confirmar tu compra solo necesito nombre completo, telefono y direccion de entrega.",
  },
];

const advancedSettings = [
  ["Tiempo de espera antes de responder", "3 - 8 segundos"],
  ["Maximo de mensajes por conversacion", "15"],
  ["Escalar a humano despues de", "3 objeciones"],
  ["Idioma principal", "Espanol LATAM"],
  ["Uso de emojis", "Si, moderado"],
];

export default function VoiceAIPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border bg-card p-6 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Nurturing</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Chatbot WhatsApp enfocado en conversion.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              El bot existe para responder objeciones, recuperar interes y empujar al lead hacia el cierre o al CRM.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Activo</span>
          <Button variant="outline" className="rounded-xl">
            <Play className="mr-2 h-4 w-4" />
            Simular
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold">Configuracion general</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre del asistente</label>
                <Input defaultValue="Cerrador WhatsApp Ventra" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Objetivo comercial</label>
                <Input defaultValue="Cerrar ventas" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Tono de comunicacion</label>
                <Input defaultValue="Amigable, directo y comercial" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Reglas de comportamiento</label>
                <Textarea
                  className="mt-2 min-h-[160px]"
                  defaultValue={
                    "- Saludar por nombre si existe\n- Responder objeciones con empatia\n- Priorizar cierre o siguiente paso claro\n- No ofrecer descuento en la primera objecion\n- Escalar a humano cuando la conversacion se enfrie"
                  }
                />
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold">Objeciones frecuentes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {objections.map((item) => (
                <span key={item} className="rounded-full bg-warning/10 px-3 py-1.5 text-sm text-warning">
                  {item}
                </span>
              ))}
            </div>
            <button className="mt-4 text-sm font-medium text-primary">+ Agregar objecion</button>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Activadores</h3>
            </div>
            <div className="space-y-3">
              {activators.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border bg-muted/20 px-4 py-3">
                  <span className="text-sm">{item.label}</span>
                  <Switch checked={item.enabled} aria-label={item.label} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-card">
            <div className="flex items-center justify-between bg-sidebar px-5 py-4 text-sidebar-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <span className="font-semibold">Vista previa de conversacion</span>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-sidebar-foreground hover:bg-white/10">
                <Play className="mr-2 h-3.5 w-3.5" />
                Simular
              </Button>
            </div>

            <div className="grid gap-4 bg-background p-4">
              <div className="flex justify-end">
                <div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                  Hola, cuanto cuesta?
                </div>
              </div>
              <div className="max-w-sm rounded-2xl rounded-bl-md border bg-card px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">IA</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Hola. Nuestro producto cuesta $1,200 MXN con envio gratis. Quieres que te comparta beneficios y promo activa?
                </p>
              </div>
              <div className="flex justify-end">
                <div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                  Se me hace un poco caro.
                </div>
              </div>
              <div className="max-w-sm rounded-2xl rounded-bl-md border bg-card px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">IA</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Entiendo. Muchos clientes pensaron lo mismo, pero terminan comprando porque recuperan la inversion rapido. Hoy tambien tienes 10% off si cierras ahora.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold">Mensajes de ejemplo</h3>
            <div className="mt-4 space-y-3">
              {templates.map((item) => (
                <div key={item.label} className="rounded-2xl border bg-muted/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Configuracion avanzada</h3>
            </div>
            <div className="space-y-3">
              {advancedSettings.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
