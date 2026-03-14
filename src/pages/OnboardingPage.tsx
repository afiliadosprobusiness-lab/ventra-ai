import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Building2, Target, Layers, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { useDemoAuth } from "@/lib/demo-auth";

const steps = [
  { title: "Crea tu workspace", icon: Building2 },
  { title: "Objetivos", icon: Target },
  { title: "Modulos prioritarios", icon: Layers },
  { title: "Resumen", icon: FileText },
];

const objectives = ["Generar mas leads", "Mejorar tasa de cierre", "Automatizar seguimiento", "Centralizar operaciones", "Escalar equipo de ventas", "Medir revenue"];
const modulesList = ["Prospector AI", "Conversations", "Voice AI", "Pipeline", "Campaigns", "Creative Studio", "Automations", "Analytics", "Community"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useDemoAuth();

  const toggleItem = (item: string, list: string[], setList: (value: string[]) => void) => {
    setList(list.includes(item) ? list.filter((current) => current !== item) : [...list, item]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-16 border-b flex items-center px-6">
        <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
      </div>

      <div className="flex-1 flex">
        <div className="hidden md:flex w-64 border-r p-6 flex-col">
          <h3 className="text-sm font-semibold text-muted-foreground mb-6">Configuracion</h3>
          {steps.map((currentStep, index) => (
            <div
              key={currentStep.title}
              className={`flex items-center gap-3 py-3 text-sm ${
                index === step ? "text-primary font-medium" : index < step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {index < step ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs ${
                    index === step ? "border-primary text-primary" : "border-muted-foreground/30"
                  }`}
                >
                  {index + 1}
                </div>
              )}
              <span>{currentStep.title}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {step === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Crea tu workspace</h2>
                    <p className="text-muted-foreground mb-6">Configura los datos basicos de tu negocio</p>
                    <div className="mb-6 rounded-xl border bg-card p-4">
                      <p className="text-sm font-medium">{user?.name ?? "Cuenta demo"}</p>
                      <p className="text-xs text-muted-foreground">{user?.email ?? "demo@ventra.io"}</p>
                    </div>
                    <div className="space-y-4">
                      <div><Label>Nombre del negocio</Label><Input placeholder="Mi Empresa" className="mt-1.5" /></div>
                      <div><Label>Industria</Label><Input placeholder="E-commerce, Servicios, etc." className="mt-1.5" /></div>
                      <div><Label>Sitio web</Label><Input placeholder="https://miempresa.com" className="mt-1.5" /></div>
                      <div><Label>Tamano del equipo</Label><Input placeholder="1-10 personas" className="mt-1.5" /></div>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Cuales son tus objetivos?</h2>
                    <p className="text-muted-foreground mb-6">Selecciona los que apliquen a tu negocio</p>
                    <div className="grid grid-cols-2 gap-3">
                      {objectives.map((objective) => (
                        <button
                          key={objective}
                          type="button"
                          onClick={() => toggleItem(objective, selectedObjectives, setSelectedObjectives)}
                          className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                            selectedObjectives.includes(objective) ? "border-primary bg-primary/5 text-primary" : "hover:border-primary/30"
                          }`}
                        >
                          {objective}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Modulos prioritarios</h2>
                    <p className="text-muted-foreground mb-6">Con que quieres empezar?</p>
                    <div className="grid grid-cols-3 gap-3">
                      {modulesList.map((module) => (
                        <button
                          key={module}
                          type="button"
                          onClick={() => toggleItem(module, selectedModules, setSelectedModules)}
                          className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${
                            selectedModules.includes(module) ? "border-primary bg-primary/5 text-primary" : "hover:border-primary/30"
                          }`}
                        >
                          {module}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="text-center">
                    <div className="mx-auto mb-6 inline-flex rounded-2xl border border-primary/20 bg-primary/5 p-4">
                      <VentraLogo compact markClassName="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Todo listo</h2>
                    <p className="text-muted-foreground mb-8">Tu workspace esta configurado. Vamos a tu dashboard.</p>
                    <div className="rounded-xl border bg-card p-6 text-left mb-8">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Objetivos</span><span className="font-medium">{selectedObjectives.length} seleccionados</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Modulos</span><span className="font-medium">{selectedModules.length} activos</span></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-8 flex justify-end">
                  {step < 3 ? (
                    <Button onClick={() => setStep(step + 1)} className="gradient-ventra text-primary-foreground shadow-ventra">
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/app")} className="gradient-ventra text-primary-foreground shadow-ventra">
                      Ir al dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
