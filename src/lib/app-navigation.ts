import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Megaphone,
  MessageSquare,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

export type AppNavigationSection = {
  title: string;
  description?: string;
  url: string;
  icon: LucideIcon;
  step: string;
  summary: string;
};

export type AppRouteMeta = {
  eyebrow: string;
  title: string;
  description: string;
  context: string;
  status: string;
  primaryAction: string;
  primaryActionTarget: string;
  primaryActionIcon: LucideIcon;
  secondaryAction?: string;
  secondaryActionTarget?: string;
  secondaryActionIcon?: LucideIcon;
};

export const appNavigationSections: AppNavigationSection[] = [
  {
    title: "Adquisicion",
    description: "Campanas guiadas para atraer mejores oportunidades.",
    icon: Megaphone,
    url: "/app/acquisition",
    step: "Capa 01",
    summary: "Diagnostico, mensaje y plan de captacion con foco comercial.",
  },
  {
    title: "Atencion automatica",
    description: "Configura el asistente que responde y guia prospectos.",
    icon: MessageSquare,
    url: "/app/automatic-attention",
    step: "Capa 02",
    summary: "Asistente, objeciones, preview conversacional y handoff.",
  },
  {
    title: "Cierre",
    description: "Seguimiento simple para empujar conversiones y cerrar.",
    icon: Target,
    url: "/app/closing",
    step: "Capa 03",
    summary: "Pipeline corto, senales de intencion y accion siguiente.",
  },
];

export const appSettingsLink: AppNavigationSection = {
  title: "Configuracion",
  url: "/app/settings",
  icon: Settings,
  step: "Base",
  summary: "Workspace, narrativa comercial y reglas del sistema.",
};

const appRouteMetaByPath: Record<string, AppRouteMeta> = {
  "/app": {
    eyebrow: "Centro de control",
    title: "Centro de control",
    description: "Una lectura ejecutiva del estado comercial para decidir donde intervenir primero.",
    context: "Operacion comercial premium",
    status: "Mock operativo alineado",
    primaryAction: "Ver prioridades",
    primaryActionTarget: "overview-priorities",
    primaryActionIcon: Activity,
    secondaryAction: "Abrir adquisicion",
    secondaryActionTarget: "/app/acquisition",
    secondaryActionIcon: ArrowRight,
  },
  "/app/acquisition": {
    eyebrow: "Adquisicion",
    title: "Adquisicion",
    description: "Diagnostica el negocio, define la estrategia de captacion y descarga un brief premium listo para ejecutar.",
    context: "Como atraemos mejores oportunidades",
    status: "Wizard consultivo, reporte y PDF listos en frontend",
    primaryAction: "Iniciar diagnostico",
    primaryActionTarget: "campaign-diagnosis",
    primaryActionIcon: Rocket,
    secondaryAction: "Ver entregable",
    secondaryActionTarget: "campaign-plan",
    secondaryActionIcon: Sparkles,
  },
  "/app/automatic-attention": {
    eyebrow: "Atencion automatica",
    title: "Atencion automatica",
    description: "Configura un asistente que responde consultas con criterio comercial y sabe cuando derivar.",
    context: "Como respondemos y filtramos sin depender del dueno",
    status: "Preview conversacional en tiempo real",
    primaryAction: "Probar asistente",
    primaryActionTarget: "assistant-preview",
    primaryActionIcon: MessageSquare,
    secondaryAction: "Revisar handoff",
    secondaryActionTarget: "assistant-handoff",
    secondaryActionIcon: ShieldCheck,
  },
  "/app/closing": {
    eyebrow: "Cierre",
    title: "Cierre",
    description: "Empuja conversion con un pipeline corto, senales de intencion y seguimiento accionable.",
    context: "Como seguimos y convertimos mas oportunidades reales",
    status: "Seguimiento simple, sin CRM inflado",
    primaryAction: "Abrir pipeline",
    primaryActionTarget: "pipeline-board",
    primaryActionIcon: Target,
    secondaryAction: "Ver sugerencias",
    secondaryActionTarget: "follow-up-guides",
    secondaryActionIcon: Sparkles,
  },
  "/app/settings": {
    eyebrow: "Configuracion",
    title: "Configuracion",
    description: "Alinea el workspace, la promesa comercial y la forma en que Ventra opera en demo.",
    context: "Base de marca, operaciones y narrativa",
    status: "Workspace listo para demo",
    primaryAction: "Editar perfil",
    primaryActionTarget: "workspace-profile",
    primaryActionIcon: Settings,
    secondaryAction: "Revisar capas",
    secondaryActionTarget: "commercial-model",
    secondaryActionIcon: ShieldCheck,
  },
};

export function getAppRouteMeta(pathname: string) {
  const matchedPath =
    Object.keys(appRouteMetaByPath).find((path) => (path === "/app" ? pathname === path : pathname.startsWith(path))) ??
    "/app";

  return appRouteMetaByPath[matchedPath];
}
