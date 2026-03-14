import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { VentraLogo } from "@/components/brand/ventra-logo";
import { LandingQuizWizard } from "@/components/landing/LandingQuizWizard";
import { LandingSection } from "@/components/landing/LandingSection";
import { LandingThemeToggle } from "@/components/landing/LandingThemeToggle";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay },
  }),
};

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialLandingDarkMode);

  useEffect(() => {
    persistLandingTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : undefined}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_26%)]" />

        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
            <Link to="/" className="inline-flex">
              <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-[1.6rem]" />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              <a href="#solution" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sistema</a>
              <a href="#benefits" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Beneficios</a>
              <a href="#quiz" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Diagnostico</a>
              <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Planes</a>
            </nav>

            <div className="flex items-center gap-3">
              <LandingThemeToggle checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" className="rounded-xl">Iniciar sesion</Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-ventra rounded-xl text-primary-foreground shadow-ventra">Solicitar implementacion</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="relative">
          <section className="overflow-hidden pb-20 pt-16 md:pb-24 md:pt-24">
            <div className="container mx-auto px-4">
              <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="max-w-3xl">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0}
                    className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
                  >
                    Sistema comercial implementado para vender mas
                  </motion.div>

                  <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.08}
                    className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.07em] md:text-7xl"
                  >
                    Te implementamos un sistema comercial para atraer clientes, atender consultas y cerrar mas ventas.
                  </motion.h1>

                  <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.16}
                    className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                  >
                    Ventra AI ayuda a negocios que quieren responder mejor, dar seguimiento con mas orden y dejar de
                    depender tanto de operacion manual para vender.
                  </motion.p>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.24}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    <Link to="/register">
                      <Button size="lg" className="gradient-ventra h-12 rounded-xl px-8 text-base text-primary-foreground shadow-ventra">
                        Solicitar implementacion
                      </Button>
                    </Link>
                    <a href="#quiz">
                      <Button size="lg" variant="outline" className="h-12 rounded-xl px-8 text-base">
                        Hacer diagnostico
                      </Button>
                    </a>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.32}
                    className="mt-8 grid gap-3 sm:grid-cols-3"
                  >
                    {[
                      ["Mas oportunidades", "Campanas mas claras para atraer mejores consultas."],
                      ["Respuestas mas rapidas", "Atencion automatica para no dejar enfriar interes."],
                      ["Mas cierres", "Seguimiento simple para mover prospectos hasta la venta."],
                    ].map(([title, detail]) => (
                      <div key={title} className="rounded-[1.35rem] border bg-card/85 p-4 shadow-card backdrop-blur-xl">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0.18}
                  className="relative"
                >
                  <div className="absolute left-10 top-14 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute bottom-10 right-6 h-44 w-44 rounded-full bg-info/20 blur-3xl" />

                  <div className="relative rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-card-hover backdrop-blur-xl">
                    <div className="rounded-[1.5rem] border bg-background/80 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Sistema comercial Ventra</p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Tres capas. Un resultado.</h3>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Implementacion guiada</span>
                      </div>

                      <div className="mt-5 space-y-3">
                        {landingLayers.map((layer, index) => (
                          <div key={layer.id} className="rounded-[1.35rem] border bg-card p-4 shadow-card">
                            <div className="flex items-start gap-4">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <layer.icon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-semibold">{index + 1}. {layer.title}</p>
                                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                    {layer.plan}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
                                <p className="mt-3 text-sm font-medium text-foreground">{layer.outcome}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-[1.35rem] border bg-muted/20 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Visual del proceso</p>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">Consulta</div>
                          <div className="h-px flex-1 bg-border" />
                          <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">Respuesta</div>
                          <div className="h-px flex-1 bg-border" />
                          <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">Cierre</div>
                        </div>
                      </div>
                      <div className="rounded-[1.35rem] border bg-muted/20 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Resultado esperado</p>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">+23%</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          Cuando el negocio responde mejor y hace seguimiento con mas claridad, las conversiones suben.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <LandingSection
            id="problem"
            eyebrow="Problema"
            title="La mayoria no pierde ventas por falta de interes. Las pierde por desorden comercial."
            description="Llegan consultas, se responden tarde, falta seguimiento y todo termina dependiendo de operacion manual. Esa mezcla hace que el marketing traiga ruido, no cierres."
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="grid gap-4">
                {landingPainPoints.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border bg-card p-5 shadow-card">
                    <div className="flex items-start gap-4">
                      {item.icon ? (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                          <item.icon className="h-5 w-5" />
                        </div>
                      ) : null}
                      <div>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border bg-muted/20 p-6 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Asi se ve hoy en muchos negocios</p>
                <div className="mt-5 grid gap-4">
                  {[
                    ["Marketing trae consultas", "Pero no siempre llegan con un mensaje claro."],
                    ["WhatsApp se llena de conversaciones", "Y algunas quedan abiertas sin siguiente paso."],
                    ["El seguimiento depende del equipo", "Entonces la consistencia comercial se rompe rapido."],
                  ].map(([title, detail]) => (
                    <div key={title} className="rounded-[1.35rem] border bg-background/80 p-4">
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </LandingSection>

          <LandingSection
            id="solution"
            eyebrow="La solucion"
            title="Ventra ordena el proceso comercial en tres capas faciles de entender."
            description="No es una suite de herramientas sueltas. Es un sistema comercial claro para atraer oportunidades, responder mejor y empujar el cierre."
          >
            <div className="grid gap-5 xl:grid-cols-3">
              {landingLayers.map((layer) => (
                <div key={layer.id} className="rounded-[1.75rem] border bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {layer.icon ? <layer.icon className="h-5 w-5" /> : null}
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {layer.plan}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{layer.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
                  <div className="mt-5 rounded-[1.2rem] border bg-muted/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Beneficio directo</p>
                    <p className="mt-2 text-sm font-medium">{layer.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            id="benefits"
            eyebrow="Beneficios"
            title="La landing debe vender resultado, no complejidad. Por eso los beneficios son directos."
            description="Ventra ayuda a que el negocio responda mejor, haga seguimiento con mas orden y convierta mas consultas en clientes."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {landingBenefits.map((benefit) => (
                <div key={benefit.title} className="rounded-[1.5rem] border bg-card p-5 shadow-card">
                  {benefit.icon ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                  ) : null}
                  <p className="mt-5 text-lg font-semibold">{benefit.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            eyebrow="Como funciona"
            title="Tres pasos para ordenar el proceso comercial."
            description="La experiencia debe entenderse rapido: atraes mejor, atiendes mejor y cierras con mas consistencia."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {landingSteps.map((step, index) => (
                <div key={step.title} className="rounded-[1.6rem] border bg-card p-6 shadow-card">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Paso {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            id="quiz"
            eyebrow="Diagnostico interactivo"
            title="Descubre que necesita primero tu negocio."
            description="Este wizard te ayuda a detectar si hoy el cuello de botella esta en adquisicion, atencion automatica o cierre, y te recomienda por donde empezar."
          >
            <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[1.75rem] border bg-muted/20 p-6 shadow-card">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">No es un formulario aburrido.</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  El diagnostico pregunta por tu tipo de negocio, como llegan consultas, si dependes de WhatsApp, si pierdes leads por demora y como haces seguimiento hoy.
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    "Detecta si el mayor impacto esta en captacion, respuesta o seguimiento.",
                    "Te recomienda si conviene empezar con el plan basico o la solucion completa.",
                    "Convierte la conversacion comercial en una recomendacion consultiva y clara.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.2rem] border bg-background/80 px-4 py-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.35rem] border bg-primary/5 p-4">
                  <p className="text-sm font-semibold">Ejemplos de resultado</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    "Tu mayor cuello de botella esta en atencion automatica" o "Tu mejor oportunidad esta en mejorar captacion y respuesta".
                  </p>
                </div>
              </div>

              <LandingQuizWizard ctaLabel="Solicitar implementacion" />
            </div>
          </LandingSection>

          <LandingSection
            id="pricing"
            eyebrow="Planes"
            title="Empieza simple y escala cuando tenga sentido."
            description="La estructura de precios acompana la logica del producto: puedes empezar con la capa basica y crecer hacia la solucion completa."
            align="center"
            className="bg-muted/20"
          >
            <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
              {landingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`rounded-[1.9rem] border bg-card p-7 shadow-card ${index === 1 ? "border-primary/20 shadow-ventra" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{plan.name}</p>
                      <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
                        {plan.price}
                        <span className="text-base font-medium text-muted-foreground">{plan.period}</span>
                      </p>
                    </div>
                    {plan.highlight ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                        Recomendado
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                  <p className="mt-4 text-sm leading-relaxed">{plan.highlight}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {plan.includedLayers.map((layer) => (
                      <span key={layer} className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
                        {layer}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    {plan.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/register" className="mt-8 block">
                    <Button
                      className={`h-12 w-full rounded-xl ${index === 1 ? "gradient-ventra text-primary-foreground shadow-ventra" : ""}`}
                      variant={index === 1 ? "default" : "outline"}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </LandingSection>

          <LandingSection
            eyebrow="Confianza"
            title="Una solucion comercial clara tambien necesita confianza clara."
            description="Ventra sirve mejor cuando el negocio ya quiere vender con mas orden, responder mejor y reducir carga operativa repetitiva."
          >
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-4">
                {landingTrustNotes.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border bg-card p-5 shadow-card">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border bg-card p-6 shadow-card">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">Preguntas frecuentes</h3>
                <Accordion type="single" collapsible className="mt-5">
                  {landingFaqs.map((faq, index) => (
                    <AccordionItem key={faq.title} value={`faq-${index}`} className="border-b last:border-0">
                      <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                        {faq.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {faq.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </LandingSection>

          <section className="pb-24 pt-6">
            <div className="container mx-auto px-4">
              <div className="overflow-hidden rounded-[2rem] border bg-card p-8 shadow-card md:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Cierre de la landing
                    </div>
                    <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
                      Si quieres vender mas, responder mejor y reducir carga operativa, Ventra te ayuda a montar ese sistema.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                      Atrae mejores oportunidades, atiende consultas automaticamente y empuja el cierre con mas orden.
                      Esa es la promesa. Esa es la experiencia que debe comunicar la landing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Link to="/register" className="block">
                      <Button size="lg" className="gradient-ventra h-12 w-full rounded-xl text-base text-primary-foreground shadow-ventra">
                        Solicitar implementacion
                      </Button>
                    </Link>
                    <a href="#quiz" className="block">
                      <Button size="lg" variant="outline" className="h-12 w-full rounded-xl text-base">
                        Hacer diagnostico primero
                      </Button>
                    </a>
                    <div className="rounded-[1.35rem] border bg-muted/20 p-4">
                      <p className="text-sm font-semibold">Resultado esperado</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Mas oportunidades, respuestas mas rapidas, mejor seguimiento y un proceso comercial mucho mas claro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border/70 py-10">
          <div className="container mx-auto flex flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <VentraLogo markClassName="h-9 w-9" wordmarkClassName="text-xl" />
              <p className="mt-3 max-w-md">
                Ventra AI ayuda a negocios a atraer clientes, atender consultas y cerrar mas ventas con un sistema comercial mas claro.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <a href="#solution" className="transition-colors hover:text-foreground">Sistema</a>
              <a href="#quiz" className="transition-colors hover:text-foreground">Diagnostico</a>
              <a href="#pricing" className="transition-colors hover:text-foreground">Planes</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
