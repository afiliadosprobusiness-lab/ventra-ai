import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Search, MessageSquare, Phone, BarChart3,
  Zap, Users, Send, Globe, Palette, GitBranch, ChevronDown, Star, Play,
  Target, TrendingUp, Shield, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VentraLogo } from "@/components/brand/ventra-logo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const logos = ["Shopify", "HubSpot", "Stripe", "Zapier", "Slack", "Meta"];

const modules = [
  { icon: Search, title: "Prospector AI", desc: "Descubre prospectos de alta intención con scoring inteligente." },
  { icon: MessageSquare, title: "Conversations", desc: "Inbox unificado con WhatsApp, Instagram y más." },
  { icon: Phone, title: "Voice AI", desc: "Llamadas automatizadas de seguimiento con IA." },
  { icon: GitBranch, title: "Pipeline", desc: "Visualiza y gestiona cada oportunidad de cierre." },
  { icon: Send, title: "Campaigns", desc: "Lanza campañas multicanal y mide resultados." },
  { icon: Palette, title: "Creative Studio", desc: "Crea activos de marketing listos para convertir." },
  { icon: Zap, title: "Automations", desc: "Automatiza follow-ups, scoring y asignaciones." },
  { icon: Globe, title: "Community", desc: "Construye y gestiona tu comunidad integrada." },
];

const benefits = [
  { icon: Target, title: "Captura más oportunidades", desc: "Encuentra prospectos que tus competidores ignoran con Prospector AI." },
  { icon: Clock, title: "Sigue más rápido", desc: "Automatiza follow-ups en minutos, no en días. Cada lead recibe atención." },
  { icon: TrendingUp, title: "Cierra más ingresos", desc: "Pipeline visual + insights de IA = decisiones que generan revenue." },
  { icon: Shield, title: "Opera desde un solo sistema", desc: "CRM, messaging, calls, campaigns, analytics. Todo en Ventra." },
];

const faqs = [
  { q: "¿Ventra reemplaza mi CRM actual?", a: "Sí. Ventra es un Revenue OS completo que incluye CRM, messaging, pipeline, analytics y más. No necesitas herramientas adicionales." },
  { q: "¿Puedo conectar WhatsApp Business?", a: "Absolutamente. Ventra se integra nativamente con WhatsApp Business API para conversaciones bidireccionales." },
  { q: "¿Cómo funciona Voice AI?", a: "Voice AI realiza llamadas automatizadas de seguimiento, calificación y nurturing usando inteligencia artificial conversacional." },
  { q: "¿Qué incluye el plan Growth?", a: "El plan Growth incluye todos los módulos core, hasta 10 usuarios, 5,000 contactos, Voice AI y soporte prioritario." },
  { q: "¿Puedo importar mis contactos existentes?", a: "Sí. Importa desde CSV, HubSpot, Salesforce o cualquier CRM. La migración es asistida por nuestro equipo." },
];

const pricing = [
  {
    name: "Starter", price: "$49", period: "/mes", desc: "Para negocios que inician su operación comercial.",
    features: ["Hasta 3 usuarios", "1,000 contactos", "Conversations básico", "Pipeline", "Email support"],
    cta: "Comenzar gratis", highlighted: false,
  },
  {
    name: "Growth", price: "$149", period: "/mes", desc: "Para equipos que quieren escalar ingresos.",
    features: ["Hasta 10 usuarios", "5,000 contactos", "Todos los módulos", "Voice AI", "Prospector AI", "Automations", "Soporte prioritario"],
    cta: "Empezar prueba gratuita", highlighted: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", desc: "Para operaciones de alto volumen.",
    features: ["Usuarios ilimitados", "Contactos ilimitados", "API access", "SSO", "Account manager", "SLA garantizado", "Onboarding dedicado"],
    cta: "Contactar ventas", highlighted: false,
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="inline-flex">
            <VentraLogo markClassName="h-10 w-10" wordmarkClassName="text-2xl" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Módulos</a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beneficios</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-ventra text-primary-foreground shadow-ventra">
                Comenzar gratis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 pt-20 pb-24 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            Revenue OS para equipos comerciales
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Deja de gestionar leads.{" "}
            <span className="text-gradient-hero">Empieza a cerrar ingresos.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubre, capta, sigue y cierra más clientes desde un solo sistema.
            CRM, WhatsApp, Voice AI, Campaigns y más — todo en Ventra.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gradient-ventra text-primary-foreground shadow-ventra text-base px-8 h-12">
                Comenzar prueba gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button size="lg" variant="outline" className="text-base px-8 h-12">
                <Play className="mr-2 h-4 w-4" />
                Descubre tu plan ideal
              </Button>
            </Link>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="mt-4 text-sm text-muted-foreground">
            Sin tarjeta de crédito · Setup en 2 minutos · Cancela cuando quieras
          </motion.p>

          {/* Product Shot */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="mt-16 relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-ventra-blue/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative rounded-xl border shadow-card-hover overflow-hidden bg-card">
              <div className="h-8 bg-muted/50 flex items-center px-4 gap-2 border-b">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
                <span className="text-xs text-muted-foreground ml-2">app.ventra.io/overview</span>
              </div>
              <div className="grid grid-cols-4 gap-3 p-6">
                {[
                  { label: "Leads nuevos", value: "284", change: "+18%" },
                  { label: "Conversaciones", value: "127", change: "+7%" },
                  { label: "Oportunidades", value: "43", change: "-12%" },
                  { label: "Ingresos", value: "$48,320", change: "+23%" },
                ].map((card, i) => (
                  <div key={i} className="rounded-xl border bg-background p-4">
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">{card.value}</p>
                    <p className={`text-xs mt-1 font-medium ${card.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>{card.change}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="h-48 bg-muted/30 rounded-xl border flex items-end justify-around px-8 pb-6">
                  {[40, 55, 45, 65, 80, 72, 88, 95, 85, 100].map((h, i) => (
                    <div key={i} className="w-8 rounded-t-md gradient-ventra" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">Empresas que confían en Ventra para cerrar más ingresos</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {logos.map((logo) => (
              <span key={logo} className="text-xl font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">¿Por qué Ventra?</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              No es otro CRM. Es tu sistema operativo de ingresos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all hover:border-primary/20">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="rounded-xl border bg-background p-8">
              <h3 className="text-xl font-bold mb-6 text-destructive">Sin Ventra</h3>
              {["Leads perdidos entre herramientas", "Follow-ups manuales que nunca suceden", "Sin visibilidad del pipeline real", "Datos dispersos en 5+ plataformas", "Oportunidades que caducan en silencio"].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0">
                  <span className="text-destructive mt-0.5">✕</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border-2 border-primary/20 bg-background p-8 shadow-ventra">
              <h3 className="text-xl font-bold mb-6 text-primary">Con Ventra</h3>
              {["Todos los leads centralizados y con scoring", "Follow-ups automáticos a las 24h", "Pipeline visual con insights de IA", "Un solo sistema para todo el revenue", "Alertas proactivas de oportunidades calientes"].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Todo lo que necesitas para cerrar más</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              8 módulos integrados que trabajan juntos para maximizar tus ingresos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {modules.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group rounded-xl border bg-card p-5 hover:shadow-card-hover hover:border-primary/20 transition-all cursor-default">
                <m.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Pricing simple, sin sorpresas</h2>
            <p className="mt-4 text-muted-foreground text-lg">Elige el plan que se adapte a tu operación.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <div key={i} className={`rounded-xl border bg-card p-8 flex flex-col ${plan.highlighted ? "border-2 border-primary shadow-ventra relative" : "shadow-card"}`}>
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                )}
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8">
                  <Button className={`w-full ${plan.highlighted ? "gradient-ventra text-primary-foreground shadow-ventra" : ""}`}
                    variant={plan.highlighted ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            Empieza a cerrar más ingresos hoy
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Únete a cientos de equipos que usan Ventra para operar su revenue.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gradient-ventra text-primary-foreground shadow-ventra px-8 h-12">
                Comenzar gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <VentraLogo markClassName="h-9 w-9" wordmarkClassName="text-xl" />
              </div>
              <p className="text-sm text-muted-foreground">Revenue OS para equipos que quieren cerrar más.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#modules" className="hover:text-foreground transition-colors">Módulos</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integraciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2026 Ventra Revenue OS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
