import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, ShieldCheck, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { LandingNavBar } from "@/components/landing/LandingNavBar";
import { LandingSection } from "@/components/landing/LandingSection";
import {
  landingBenefits,
  landingFaqs,
  landingLayers,
  landingPainPoints,
  landingPlans,
  landingSteps,
  landingTrustNotes,
} from "@/lib/landing-content";
import { getInitialLandingDarkMode, persistLandingTheme } from "@/lib/landing-theme";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialLandingDarkMode);

  useEffect(() => {
    persistLandingTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%)]" />

        <LandingNavBar isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />

        <main className="relative">
          <section className="overflow-hidden px-6 pb-24 pt-32 sm:pt-36">
            <div className="container mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.55, bounce: 0 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sistema comercial para atraer, atender y cerrar
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.55, bounce: 0, delay: 0.08 }}
                className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.07em] sm:text-5xl lg:text-6xl"
              >
                Te implementamos un sistema comercial que atrae clientes, atiende consultas y cierra mas ventas.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.55, bounce: 0, delay: 0.16 }}
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
              >
                Ventra ayuda a negocios que quieren vender mas sin depender tanto de operacion manual. Ordena la
                adquisicion, automatiza la atencion y mejora el seguimiento comercial.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.55, bounce: 0, delay: 0.24 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link to="/quiz">
                  <Button size="lg" className="h-12 rounded-xl px-8 gradient-ventra text-sm font-medium text-primary-foreground shadow-ambient-lg">
                    Solicitar implementacion
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="h-12 rounded-xl px-8 text-sm font-medium">
                    <Play className="mr-2 h-4 w-4" />
                    Ver como funciona
                  </Button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.34 }}
                className="relative mt-16"
              >
                <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
                <div className="glass-card mx-auto max-w-4xl p-2 sm:p-4">
                  <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                        <div className="h-2.5 w-2.5 rounded-full bg-warning/40" />
                        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                      </div>
                      <div className="flex flex-1 justify-center">
                        <div className="rounded-md bg-secondary px-4 py-1 text-xs text-muted-foreground">ventra.ai/sistema-comercial</div>
                      </div>
                    </div>

                    <div className="space-y-6 p-6 sm:p-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <div className="mb-1 text-xs text-muted-foreground">Impacto comercial estimado</div>
                          <div className="text-3xl font-semibold tracking-[-0.05em] tabular-nums">+23%</div>
                        </div>
                        <div className="text-sm font-medium text-primary">Mas conversion cuando el proceso deja de ser manual</div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        {[
                          { label: "Oportunidades nuevas", value: "89", change: "+12%" },
                          { label: "Consultas atendidas", value: "127", change: "+8%" },
                          { label: "Seguimientos activos", value: "41", change: "+5%" },
                        ].map((metric) => (
                          <div key={metric.label} className="rounded-xl border border-border bg-background/80 p-4">
                            <div className="mb-2 text-xs text-muted-foreground">{metric.label}</div>
                            <div className="text-xl font-semibold tabular-nums">{metric.value}</div>
                            <div className="mt-1 text-xs text-primary tabular-nums">{metric.change}</div>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-4 lg:grid-cols-3">
                        {landingLayers.map((layer, index) => (
                          <div key={layer.id} className="rounded-2xl border border-border bg-muted/20 p-4 text-left">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                {layer.icon ? <layer.icon className="h-5 w-5" /> : null}
                              </div>
                              <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                Paso {index + 1}
                              </span>
                            </div>
                            <div className="text-sm font-semibold">{layer.title}</div>
                            <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{layer.outcome}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <LandingSection
            eyebrow="Problemas reales"
            title="La mayoria de negocios no pierde ventas por falta de interes. Las pierde por desorden comercial."
            description="Llegan consultas, se responden tarde, falta seguimiento y todo termina dependiendo de operacion manual."
            align="center"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {landingPainPoints.map((item) => (
                <div key={item.title} className="glass-card hover-lift p-6">
                  {item.icon ? (
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <item.icon className="h-5 w-5" />
                    </div>
                  ) : null}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            id="solution"
            eyebrow="La solucion"
            title="Un sistema de 3 capas para vender mas"
            description="Cada capa resuelve una parte del proceso comercial. Juntas forman un sistema simple, entendible y orientado a conversion."
            className="bg-muted/30"
            align="center"
          >
            <div className="space-y-8">
              {landingLayers.map((layer, index) => (
                <div key={layer.id} className="glass-card p-6 sm:p-8">
                  <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex-1 text-left">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          {layer.icon ? <layer.icon className="h-5 w-5" /> : null}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{layer.title}</h3>
                          <p className="text-sm text-muted-foreground">{layer.plan}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
                      <div className="mt-5 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                        {layer.outcome}
                      </div>
                    </div>

                    <div className="lg:w-[280px]">
                      <div className="space-y-3 text-left">
                        {index === 0 ? (
                          <>
                            <div className="rounded-lg border border-border bg-background/80 p-3">
                              <div className="mb-2 text-xs text-muted-foreground">Angulo sugerido</div>
                              <div className="text-sm font-medium">Atrae clientes con un mensaje mas claro</div>
                            </div>
                            <div className="rounded-lg border border-border bg-background/80 p-3">
                              <div className="mb-2 text-xs text-muted-foreground">CTA recomendado</div>
                              <div className="text-sm font-medium">Lleva la consulta directo a una conversacion util</div>
                            </div>
                          </>
                        ) : null}
                        {index === 1 ? (
                          <>
                            <div className="flex justify-end">
                              <div className="max-w-[220px] rounded-xl rounded-br-sm bg-primary/10 px-3 py-2 text-xs text-primary">
                                Hola, me interesa. Quiero saber si esto encaja con mi negocio.
                              </div>
                            </div>
                            <div className="max-w-[240px] rounded-xl rounded-bl-sm border border-border bg-background/80 px-3 py-2 text-xs text-foreground">
                              Claro. Te explico en breve como te ayuda a responder mejor y vender mas.
                            </div>
                          </>
                        ) : null}
                        {index === 2 ? (
                          <>
                            {[
                              { name: "Ana Garcia", score: "92", status: "Alta intencion" },
                              { name: "Carlos Ruiz", score: "68", status: "En seguimiento" },
                              { name: "Marta Diaz", score: "41", status: "Recuperar interes" },
                            ].map((lead) => (
                              <div key={lead.name} className="flex items-center gap-3 rounded-lg border border-border bg-background/80 p-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                  {lead.name[0]}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-xs font-medium">{lead.name}</div>
                                  <div className="text-[10px] text-muted-foreground">{lead.status}</div>
                                </div>
                                <div className="text-xs font-semibold text-primary tabular-nums">{lead.score}</div>
                              </div>
                            ))}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            eyebrow="Beneficios"
            title="Resultados reales para tu negocio"
            description="No se trata de tecnologia por si sola. Se trata de vender mas con menos friccion operativa."
            align="center"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {landingBenefits.map((benefit) => (
                <div key={benefit.title} className="hover-lift rounded-2xl border border-border bg-card p-6">
                  {benefit.icon ? (
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                  ) : null}
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            id="how-it-works"
            eyebrow="Como funciona"
            title="Un flujo comercial facil de escanear, entender y activar"
            description="Atraes mejor, atiendes mejor y cierras con mas consistencia."
            align="center"
            className="bg-muted/30"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {landingSteps.map((step, index) => (
                <div key={step.title} className="glass-card p-6">
                  <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Paso {index + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            id="quiz"
            eyebrow="CTA principal"
            title="El siguiente paso ya no es un formulario. Es un embudo consultivo."
            description="Primero diagnosticas tu negocio. Despues ves un video corto. Solo entonces se revela el CTA con precio y la oferta final."
            align="center"
          >
            <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="glass-card p-6 sm:p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold">Filtro premium para prospectos con intencion real</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  El flujo clasifica el principal cuello de botella, captura datos clave, obliga a consumir el video y
                  deja el siguiente paso con precio explicito.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Quiz multistep con diagnostico y data capture.",
                    "Transicion consultiva antes del pitch.",
                    "Video vertical con gating al 85% antes del CTA.",
                    "Pantalla final con beneficios, precio y siguientes pasos.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-background/80 px-4 py-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <Link to="/quiz" className="mt-6 inline-flex">
                  <Button className="h-12 rounded-xl px-6 gradient-ventra text-primary-foreground shadow-ambient-lg">
                    Empezar diagnostico
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="glass-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Fase 1</div>
                      <h3 className="text-xl font-semibold">Quiz y diagnostico</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Detecta si el negocio necesita empezar por Adquisicion, Atencion automatica, Cierre o una solucion completa.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Fase 2</div>
                      <h3 className="text-xl font-semibold">Video gate con consumo real</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    El CTA con precio se desbloquea solo al ver al menos el 85% del video. Menos curiosos, mas seriedad comercial.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Fase 3</div>
                      <h3 className="text-xl font-semibold">Oferta y siguiente paso</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Se muestra una mini sales page con beneficios, implementacion desde 1000 USD y rutas hacia comunidad o aplicacion.
                  </p>
                </div>
              </div>
            </div>
          </LandingSection>

          <LandingSection
            id="pricing"
            eyebrow="Precios"
            title="Empieza simple y escala cuando tenga sentido"
            description="La estructura acompana la logica del producto: primero respondes mejor, luego activas el sistema completo."
            align="center"
            className="bg-muted/30"
          >
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {landingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-6 sm:p-8 hover-lift ${index === 1 ? "gradient-border border-2 border-primary shadow-ambient-lg bg-card" : "border border-border bg-card"}`}
                >
                  {index === 1 ? (
                    <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Sistema completo</div>
                  ) : null}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mb-2 mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-[-0.05em] tabular-nums">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <p className="mt-3 text-sm leading-relaxed">{plan.highlight}</p>
                  <Link to="/quiz" className="mt-6 block">
                    <Button
                      className={`h-12 w-full rounded-xl ${index === 1 ? "gradient-ventra text-primary-foreground shadow-ambient-lg" : ""}`}
                      variant={index === 1 ? "default" : "outline"}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                  <div className="mt-6 space-y-3">
                    {plan.outcomes.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            eyebrow="Confianza"
            title="Ventra sirve mejor cuando el negocio quiere vender con mas orden y mas velocidad"
            description="Promesa clara, casos de uso claros y una propuesta facil de entender."
          >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                {landingTrustNotes.map((note) => (
                  <div key={note.title} className="glass-card p-5">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.description}</p>
                  </div>
                ))}
              </div>
              <div className="glass-card p-6 sm:p-8">
                <h3 className="text-2xl font-semibold">Preguntas frecuentes</h3>
                <Accordion type="single" collapsible className="mt-6">
                  {landingFaqs.map((faq, index) => (
                    <AccordionItem key={faq.title} value={`faq-${index}`} className="border-b border-border last:border-0">
                      <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{faq.title}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.description}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </LandingSection>

          <section className="bg-muted/30 px-6 py-24">
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Deja de perder clientes. Empieza a cerrar mas ventas.
              </h2>
              <p className="mx-auto mb-8 mt-4 max-w-xl text-lg text-muted-foreground">
                Diagnostica tu situacion, entiende la implementacion y filtra el siguiente paso con una propuesta mas seria.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/quiz">
                  <Button size="lg" className="h-12 rounded-xl px-8 gradient-ventra text-primary-foreground shadow-ambient-lg">
                    Solicitar implementacion
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#quiz">
                  <Button size="lg" variant="outline" className="h-12 rounded-xl px-8">Ver el nuevo flujo</Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border px-6 py-12">
          <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <VentraLogo markClassName="h-7 w-7" wordmarkClassName="text-lg" />
            </div>
            <p>(c) 2026 Ventra AI. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
