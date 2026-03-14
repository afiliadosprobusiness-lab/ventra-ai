import { useState } from "react";
import { ArrowRight, CheckCircle2, Megaphone, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const campaignGoals = [
  "Generar conversaciones por WhatsApp",
  "Captar leads calificados",
  "Recuperar interes en ofertas",
];

const audienceProfiles = [
  "Negocios que dependen de mensajes para vender",
  "Servicios premium con ticket medio alto",
  "Equipos comerciales con respuesta lenta",
];

const offers = [
  "Demo guiada",
  "Diagnostico sin costo",
  "Promocion por tiempo limitado",
];

const hooksByGoal: Record<string, string[]> = {
  "Generar conversaciones por WhatsApp": [
    "Tus prospectos ya preguntan, pero llegan tarde las respuestas.",
    "Vende por WhatsApp sin dejar enfriar cada consulta.",
  ],
  "Captar leads calificados": [
    "No necesitas mas leads. Necesitas mejores conversaciones.",
    "Atrae personas con intencion real, no solo clics.",
  ],
  "Recuperar interes en ofertas": [
    "Vuelve a mover leads tibios con un mensaje mas claro.",
    "Recupera oportunidades antes de que compren en otro lado.",
  ],
};

const structures = [
  "Dolor claro -> resultado concreto -> prueba social -> CTA directo",
  "Hook corto -> objecion comun -> beneficio principal -> siguiente paso",
  "Escenario real -> oportunidad perdida -> solucion simple -> CTA",
];

export default function AcquisitionPage() {
  const [selectedGoal, setSelectedGoal] = useState(campaignGoals[0]);
  const [selectedAudience, setSelectedAudience] = useState(audienceProfiles[0]);
  const [selectedOffer, setSelectedOffer] = useState(offers[0]);

  const recommendedAngle =
    selectedGoal === "Recuperar interes en ofertas"
      ? "Recuperacion con urgencia controlada"
      : selectedGoal === "Captar leads calificados"
        ? "Filtrar mejor y atraer conversaciones utiles"
        : "Responder rapido para no perder demanda";
  const recommendedHooks = hooksByGoal[selectedGoal];
  const recommendedStructure = structures[campaignGoals.indexOf(selectedGoal)] ?? structures[0];
  const suggestedCopy = `Ayudamos a ${selectedAudience.toLowerCase()} a ${selectedGoal.toLowerCase()} con ${selectedOffer.toLowerCase()} y un siguiente paso claro desde el primer anuncio.`;

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Adquisicion
            </div>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                Crea mejores campanas para atraer nuevos clientes.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                En lugar de mostrar herramientas sueltas, esta capa te guia para definir objetivo, mensaje y enfoque
                comercial antes de lanzar una campana.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">
                Generar propuesta de campana
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-xl">Ver ideas recomendadas</Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Campanas listas", "12", "Con mensaje y CTA definidos"],
              ["Hooks fuertes", "24", "Agrupados por objetivo comercial"],
              ["Siguiente paso", "1", "Lanzar una sola campana mas clara"],
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

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">Wizard de campana</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Completa tres decisiones simples. Ventra te devuelve una direccion clara para captar mejores leads.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm font-semibold">1. Que quieres lograr</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {campaignGoals.map((goal) => (
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
              <p className="text-sm font-semibold">2. A quien quieres atraer</p>
              <div className="mt-3 grid gap-2">
                {audienceProfiles.map((audience) => (
                  <button
                    key={audience}
                    type="button"
                    onClick={() => setSelectedAudience(audience)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      selectedAudience === audience ? "border-primary/20 bg-primary/5" : "bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">3. Cual es tu mejor oferta</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {offers.map((offer) => (
                  <button
                    key={offer}
                    type="button"
                    onClick={() => setSelectedOffer(offer)}
                    className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                      selectedOffer === offer ? "border-primary/20 bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {offer}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Canal principal</label>
                <Input defaultValue="Meta Ads hacia WhatsApp" className="mt-2 h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium">Promesa principal</label>
                <Input defaultValue="Responder mas rapido y cerrar mas consultas" className="mt-2 h-11 rounded-xl" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Contexto de la campana</label>
              <Textarea
                className="mt-2 min-h-[140px]"
                defaultValue="Producto: Ventra AI. Objetivo: atraer negocios que venden por mensajes. Dolor: llegan consultas pero el seguimiento es lento. Resultado esperado: mas conversaciones utiles y mas cierres."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Recomendacion accionable</h3>
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Angulo sugerido</p>
                <p className="mt-2 text-lg font-semibold">{recommendedAngle}</p>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Copy base</p>
                <p className="mt-2 text-sm leading-relaxed">{suggestedCopy}</p>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Estructura recomendada</p>
                <p className="mt-2 text-sm leading-relaxed">{recommendedStructure}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Hooks para probar</h3>
            </div>
            <div className="mt-4 space-y-3">
              {recommendedHooks.map((hook) => (
                <div key={hook} className="rounded-2xl border bg-muted/20 p-4">
                  <p className="text-sm font-semibold">{hook}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold">Ideas listas para lanzar</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Hook directo", "Si tus consultas llegan pero no cierran, el problema no es el trafico."],
              ["Objecion comun", "Responder tarde cuesta mas ventas de las que parece."],
              ["CTA claro", "Pide una demo y convierte conversaciones en oportunidades."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold">Checklist de claridad</h3>
          <div className="mt-5 space-y-3">
            {[
              "Una sola promesa por campana",
              "CTA directo hacia una conversacion util",
              "Hook que muestre el problema antes de la herramienta",
              "Oferta concreta y facil de entender",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border bg-muted/20 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
