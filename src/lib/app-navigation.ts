import type { LucideIcon } from "lucide-react";
import {
  Megaphone,
  MessageSquare,
  Target,
  Settings,
} from "lucide-react";

export type AppNavigationSection = {
  title: string;
  description?: string;
  url: string;
  icon: LucideIcon;
  exact?: boolean;
  plan?: string;
};

export type AppRouteMeta = {
  title: string;
  description: string;
  searchPlaceholder: string;
  primaryAction: string;
};

export const appNavigationSections: AppNavigationSection[] = [
  {
    title: "Adquisicion",
    description: "Campanas guiadas para atraer mejores oportunidades.",
    icon: Megaphone,
    url: "/app/acquisition",
    plan: "Plan completo",
  },
  {
    title: "Atencion automatica",
    description: "Configura el asistente que responde y guía prospectos.",
    icon: MessageSquare,
    url: "/app/automatic-attention",
    plan: "Plan basico",
  },
  {
    title: "Cierre",
    description: "Seguimiento simple para empujar conversiones y cerrar.",
    icon: Target,
    url: "/app/closing",
    plan: "Plan completo",
  },
];

export const appSettingsLink: AppNavigationSection = {
  title: "Configuracion",
  url: "/app/settings",
  icon: Settings,
};

export const appRouteMeta: Record<string, AppRouteMeta> = {
  "/app": {
    title: "Centro de control",
    description: "Una vista clara para atraer clientes, atenderlos mejor y cerrar mas ventas.",
    searchPlaceholder: "Buscar lead, campana o seguimiento...",
    primaryAction: "Ver prioridades",
  },
  "/app/acquisition": {
    title: "Adquisicion",
    description: "Te ayudamos a crear mejores campanas para atraer nuevos clientes.",
    searchPlaceholder: "Buscar idea, hook o campana...",
    primaryAction: "Crear campana",
  },
  "/app/automatic-attention": {
    title: "Atencion automatica",
    description: "Configura tu asistente para responder prospectos automaticamente y mejorar sus respuestas.",
    searchPlaceholder: "Buscar objetivo, objecion o instruccion...",
    primaryAction: "Probar asistente",
  },
  "/app/closing": {
    title: "Cierre",
    description: "Haz seguimiento con foco en conversion, no con un CRM inflado.",
    searchPlaceholder: "Buscar lead, etapa o seguimiento...",
    primaryAction: "Preparar seguimiento",
  },
  "/app/settings": {
    title: "Configuracion",
    description: "Ajustes basicos del workspace y del plan comercial demo.",
    searchPlaceholder: "Buscar ajuste...",
    primaryAction: "Guardar cambios",
  },
};
