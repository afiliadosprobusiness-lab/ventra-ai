import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2, Layers3, Target } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDemoAuth } from "@/lib/demo-auth";
import { getInitialThemeMode, persistThemeMode } from "@/lib/theme";

const onboardingSteps = [
  { title: "Negocio", icon: Building2 },
  { title: "Prioridad", icon: Target },
  { title: "Capas", icon: Layers3 },
  { title: "Resumen", icon: CheckCircle2 },
];

const priorityOptions = [
  "Atraer mejores oportunidades",
  "Responder y filtrar mas rapido",
  "Seguir y cerrar mejor",
  "Ordenar todo el sistema comercial",
];

const layerOptions = ["Adquisicion", "Atencion automatica", "Cierre"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(getInitialThemeMode);
  const [businessName, setBusinessName] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [priority, setPriority] = useState(priorityOptions[0]);
  const [selectedLayers, setSelectedLayers] = useState<string[]>(["Atencion automatica"]);
  const navigate = useNavigate();
  const { user } = useDemoAuth();

  useEffect(() => {
    persistThemeMode(isDarkMode);
  }, [isDarkMode]);

  function toggleLayer(layer: string) {
    setSelectedLayers((current) =>
      current.includes(layer) ? current.filter((item) => item !== layer) : [...current, layer],
    );
  }

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] mesh-hero opacity-80" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
            <ThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>

          <div className="flex flex-1 items-center py-8">
            <div className="grid w-full gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <aside className="surface-panel p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Onboarding comercial</p>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Dejemos claro por donde debe empezar tu workspace.</h1>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Este onboarding ya no gira en modulos legacy. Solo define negocio, prioridad y capas del sistema comercial.
                </p>

                <div className="mt-8 space-y-3">
                  {onboardingSteps.map((item, index) => (
                    <div
                      key={item.title}
                      className={`flex items-center gap-3 rounded-[1.15rem] border px-4 py-3 ${
                        index === step
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : index < step
                            ? "border-border bg-background/70 text-foreground"
                            : "border-border/70 bg-background/50 text-muted-foreground"
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-background/80">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs">{`Paso ${index + 1}`}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.35rem] border border-primary/20 bg-primary/5 p-5">
                  <p className="text-sm font-semibold">{user?.name ?? "Cuenta demo"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{user?.email ?? "demo@ventra.io"}</p>
                </div>
              </aside>

              <section className="surface-panel p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.24 }}
                  >
                    {step === 0 ? (
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Paso 1</p>
                          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Contexto del negocio</h2>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Deja una base clara para que el dashboard y el funnel hablen el lenguaje correcto.
                          </p>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Nombre del negocio</label>
                          <Input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Ej. Nova Dental" className="h-12 rounded-2xl" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Que vendes y como sueles cerrar</label>
                          <Textarea
                            value={businessContext}
                            onChange={(event) => setBusinessContext(event.target.value)}
                            placeholder="Ej. Vendemos tratamientos dentales y cerramos por WhatsApp o llamada."
                            className="min-h-[140px] rounded-2xl"
                          />
                        </div>
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Paso 2</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Prioridad comercial</h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          Esto define con que mensaje y con que foco arranca la experiencia del workspace.
                        </p>
                        <div className="mt-6 grid gap-3">
                          {priorityOptions.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setPriority(item)}
                              className={`rounded-[1.2rem] border p-4 text-left text-sm font-medium transition-colors ${
                                priority === item
                                  ? "border-primary/25 bg-primary/10 text-primary"
                                  : "border-border bg-background/70 text-foreground hover:border-primary/20"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Paso 3</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Capas activas</h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          Selecciona las capas que el workspace debe tener visibles desde el inicio.
                        </p>
                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                          {layerOptions.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleLayer(item)}
                              className={`rounded-[1.2rem] border p-5 text-left text-sm font-medium transition-colors ${
                                selectedLayers.includes(item)
                                  ? "border-primary/25 bg-primary/10 text-primary"
                                  : "border-border bg-background/70 text-foreground hover:border-primary/20"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="space-y-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Paso 4</p>
                          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Resumen del workspace</h2>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Ya tienes una base coherente con la nueva direccion premium del producto.
                          </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="surface-subtle p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Negocio</p>
                            <p className="mt-2 text-sm font-semibold">{businessName || "Por definir"}</p>
                          </div>
                          <div className="surface-subtle p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Prioridad</p>
                            <p className="mt-2 text-sm font-semibold">{priority}</p>
                          </div>
                          <div className="surface-subtle p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Capas</p>
                            <p className="mt-2 text-sm font-semibold">{selectedLayers.join(", ")}</p>
                          </div>
                        </div>
                        <div className="surface-subtle p-5">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {businessContext || "Todavia no agregaste contexto del negocio."}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-8 flex justify-end">
                      {step < 3 ? (
                        <Button onClick={() => setStep(step + 1)} className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
                          Continuar
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button onClick={() => navigate("/app")} className="rounded-2xl gradient-ventra text-primary-foreground shadow-ventra">
                          Ir al dashboard
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
