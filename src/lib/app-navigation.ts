import type { LucideIcon } from "lucide-react";
import {
  Image,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Palette,
  Search,
  Send,
  Settings,
  Users,
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
  icon: LucideIcon;
  children: AppNavigationLink[];
};

export type AppRouteMeta = {
  title: string;
  description: string;
  searchPlaceholder: string;
  primaryAction: string;
};

export const appNavigationGroups: AppNavigationGroup[] = [
  {
    id: "acquisition",
    title: "Adquisicion de clientes",
    icon: Megaphone,
    children: [
      { title: "Captacion", url: "/app/acquisition", icon: Megaphone },
      { title: "Prospeccion IA", url: "/app/prospector", icon: Search },
    ],
  },
  {
    id: "nurturing",
    title: "Nurturing",
    icon: MessageSquare,
    children: [
      { title: "Chatbot WhatsApp", url: "/app/voice-ai", icon: MessageSquare },
      { title: "CRM", url: "/app/conversations", icon: Users },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: Palette,
    children: [
      { title: "Generador de ads", url: "/app/creative-studio", icon: Palette },
      { title: "Variantes de ads", url: "/app/campaigns", icon: Send },
      { title: "Copys", url: "/app/widgets", icon: LayoutGrid },
      { title: "Creativos", url: "/app/analytics", icon: Image },
    ],
  },
];

export const appSettingsLink: AppNavigationLink = {
  title: "Configuracion",
  url: "/app/settings",
  icon: Settings,
};

export const appRouteMeta: Record<string, AppRouteMeta> = {
  "/app": {
    title: "Cockpit de ventas",
    description: "Marketing produce assets, adquisicion trae leads y nurturing los convierte en cierres.",
    searchPlaceholder: "Buscar lead, oportunidad o activo...",
    primaryAction: "Nuevo lead",
  },
  "/app/acquisition": {
    title: "Captacion",
    description: "Canales, formularios y fuentes que hoy alimentan el pipeline comercial.",
    searchPlaceholder: "Buscar canal, landing o fuente...",
    primaryAction: "Nuevo lead",
  },
  "/app/prospector": {
    title: "Prospeccion IA",
    description: "Detecta cuentas con mayor senal de compra antes de invertir tiempo comercial.",
    searchPlaceholder: "Buscar industria, ciudad o cuenta...",
    primaryAction: "Buscar prospectos",
  },
  "/app/voice-ai": {
    title: "Chatbot WhatsApp",
    description: "Configura el guion, las objeciones y los disparadores del bot de conversion.",
    searchPlaceholder: "Buscar flujo, regla o mensaje...",
    primaryAction: "Simular bot",
  },
  "/app/conversations": {
    title: "CRM",
    description: "Centraliza conversaciones, contexto comercial y siguientes pasos para cerrar.",
    searchPlaceholder: "Buscar lead o conversacion...",
    primaryAction: "Nuevo seguimiento",
  },
  "/app/creative-studio": {
    title: "Generador de ads",
    description: "Convierte un brief comercial en angulos, mensajes y piezas listas para salir.",
    searchPlaceholder: "Buscar brief, angulo o campana...",
    primaryAction: "Generar ads",
  },
  "/app/campaigns": {
    title: "Variantes de ads",
    description: "Compara versiones activas para escalar solo las que traen demanda real.",
    searchPlaceholder: "Buscar variante o campana...",
    primaryAction: "Nueva variante",
  },
  "/app/widgets": {
    title: "Copys",
    description: "Hooks, mensajes y cierres listos para anuncios, WhatsApp y seguimiento.",
    searchPlaceholder: "Buscar copy, hook o CTA...",
    primaryAction: "Nuevo copy",
  },
  "/app/analytics": {
    title: "Creativos",
    description: "Organiza piezas visuales segun formato, objetivo y rendimiento comercial.",
    searchPlaceholder: "Buscar creativo o formato...",
    primaryAction: "Nuevo creativo",
  },
  "/app/settings": {
    title: "Configuracion",
    description: "Ajustes basicos del workspace y del equipo comercial demo.",
    searchPlaceholder: "Buscar ajuste...",
    primaryAction: "Guardar cambios",
  },
};
