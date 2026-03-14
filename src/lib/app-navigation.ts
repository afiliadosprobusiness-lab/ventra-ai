import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  GitBranch,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Palette,
  Phone,
  Search,
  Send,
  Settings,
  Users,
  Zap,
} from "lucide-react";

export type AppNavigationLink = {
  title: string;
  description?: string;
  url: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type AppNavigationGroup = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: AppNavigationLink[];
};

export type AppSecondaryNavigationSection = {
  title: string;
  items: AppNavigationLink[];
};

export const appNavigationGroups: AppNavigationGroup[] = [
  {
    id: "acquisition",
    title: "Adquisicion de clientes",
    description: "Trae leads nuevos desde anuncios, formularios y prospeccion.",
    icon: Megaphone,
    children: [
      { title: "Captacion", url: "/app/acquisition", icon: Megaphone },
      { title: "Prospeccion IA", url: "/app/prospector", icon: Search },
      { title: "Widgets", url: "/app/widgets", icon: LayoutGrid },
      { title: "Campanas", url: "/app/campaigns", icon: Send },
    ],
  },
  {
    id: "nurture",
    title: "Nutricion y respuesta",
    description: "Mantiene el contacto activo con mensajes, llamadas, seguimiento y creativos.",
    icon: MessageSquare,
    children: [
      { title: "Conversaciones", url: "/app/conversations", icon: MessageSquare },
      { title: "Llamadas IA", url: "/app/voice-ai", icon: Phone },
      { title: "Seguimientos", url: "/app/pipeline", icon: GitBranch },
      { title: "Creativos", url: "/app/creative-studio", icon: Palette },
    ],
  },
];

export const appSecondaryNavigationSections: AppSecondaryNavigationSection[] = [
  {
    title: "Vista general",
    items: [
      { title: "Resumen", url: "/app", icon: LayoutDashboard, exact: true },
      { title: "Contactos", url: "/app/contacts", icon: Users },
      { title: "Automatizaciones", url: "/app/automations", icon: Zap },
      { title: "Analitica", url: "/app/analytics", icon: BarChart3 },
      { title: "Comunidad", url: "/app/community", icon: Globe },
    ],
  },
  {
    title: "Workspace",
    items: [
      { title: "Espacios", url: "/app/workspaces", icon: Building2 },
      { title: "Configuracion", url: "/app/settings", icon: Settings },
    ],
  },
];

export const appRouteTitles: Record<string, string> = {
  "/app": "Resumen",
  "/app/acquisition": "Captacion",
  "/app/prospector": "Prospeccion IA",
  "/app/widgets": "Widgets",
  "/app/voice-ai": "Llamadas IA",
  "/app/creative-studio": "Creativos",
  "/app/conversations": "Conversaciones",
  "/app/pipeline": "Seguimientos",
  "/app/contacts": "Contactos",
  "/app/campaigns": "Campanas",
  "/app/analytics": "Analitica",
  "/app/automations": "Automatizaciones",
  "/app/community": "Comunidad",
  "/app/workspaces": "Espacios",
  "/app/settings": "Configuracion",
};
