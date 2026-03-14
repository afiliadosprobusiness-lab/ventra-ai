import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    title: "¿En qué industria opera tu negocio?",
    options: ["E-commerce / Retail", "Servicios profesionales", "Real Estate", "SaaS / Tech", "Salud y bienestar", "Educación", "Otro"],
  },
  {
    title: "¿Cuál es tu facturación mensual aproximada?",
    options: ["Menos de $10K USD", "$10K - $50K USD", "$50K - $200K USD", "$200K - $1M USD", "Más de $1M USD"],
  },
  {
    title: "¿Cuál es tu principal cuello de botella hoy?",
    options: ["No genero suficientes leads", "Los leads no responden", "No tengo sistema de seguimiento", "No puedo medir qué funciona", "Mi equipo usa muchas herramientas", "No cierro suficientes ventas"],
  },
];

const recommendations: Record<string, { title: string; modules: string[]; desc: string }> = {
  "No genero suficientes leads": {
    title: "Prospector AI + Acquisition",
    modules: ["Prospector AI", "Acquisition", "Widgets", "Campaigns"],
    desc: "Ventra te ayudará a descubrir prospectos de alta intención y captar más leads con widgets inteligentes.",
  },
  "Los leads no responden": {
    title: "Conversations + Voice AI",
    modules: ["Conversations", "Voice AI", "Automations", "Campaigns"],
    desc: "Con Conversations y Voice AI, podrás contactar leads por WhatsApp y llamadas automatizadas.",
  },
  default: {
    title: "Ventra Revenue OS Completo",
    modules: ["Overview", "Prospector AI", "Conversations", "Pipeline", "Analytics", "Automations"],
    desc: "Ventra centraliza toda tu operación comercial para que puedas captar, seguir y cerrar desde un solo sistema.",
  },
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  };

  const rec = recommendations[answers[2]] || recommendations.default;
  const isResult = step >= questions.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="h-16 border-b flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-ventra flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">V</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Ventra</span>
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {!isResult && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Pregunta {step + 1} de {questions.length}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-6">{questions[step].title}</h2>
                <div className="space-y-3">
                  {questions[step].options.map((opt) => (
                    <button key={opt} onClick={() => handleAnswer(opt)}
                      className="w-full text-left p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-card transition-all text-sm font-medium">
                      {opt}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <Button variant="ghost" className="mt-4" onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl gradient-ventra flex items-center justify-center mx-auto mb-6 shadow-ventra">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Tu recomendación personalizada</h2>
                  <p className="text-muted-foreground mb-8">{rec.desc}</p>
                  <div className="rounded-xl border bg-card p-6 mb-8">
                    <h3 className="font-semibold text-lg mb-4 text-primary">{rec.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {rec.modules.map((m) => (
                        <span key={m} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">{m}</span>
                      ))}
                    </div>
                  </div>
                  <Link to="/register">
                    <Button size="lg" className="gradient-ventra text-primary-foreground shadow-ventra px-8">
                      Comenzar con Ventra <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
