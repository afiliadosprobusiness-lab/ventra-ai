export type AppNavigationItem = {
  title: string;
  url: string;
  icon: string;
};

export type AppNavigationStage = {
  title: string;
  description: string;
  url: string;
  icon: string;
  items: AppNavigationItem[];
};

export const appNavigationStages: AppNavigationStage[] = [
  {
    title: "Adquisicion de clientes",
    description: "Trae leads nuevos desde anuncios, formularios y prospeccion.",
    url: "/app/acquisition",
    icon: "Megaphone",
    items: [
      { title: "Captacion", url: "/app/acquisition", icon: "Megaphone" },
      { title: "Prospeccion IA", url: "/app/prospector", icon: "Search" },
      { title: "Widgets", url: "/app/widgets", icon: "LayoutGrid" },
      { title: "Campanas", url: "/app/campaigns", icon: "Send" },
    ],
  },
  {
    title: "Nutricion y respuesta",
    description: "Mantiene la conversacion activa con mensajes, llamadas y creativos.",
    url: "/app/conversations",
    icon: "MessageSquare",
    items: [
      { title: "Conversaciones", url: "/app/conversations", icon: "MessageSquare" },
      { title: "Llamadas IA", url: "/app/voice-ai", icon: "Phone" },
      { title: "Estudio creativo", url: "/app/creative-studio", icon: "Palette" },
    ],
  },
  {
    title: "Cierre y seguimiento",
    description: "Ordena oportunidades, tareas comerciales y seguimientos clave.",
    url: "/app/pipeline",
    icon: "GitBranch",
    items: [
      { title: "Pipeline", url: "/app/pipeline", icon: "GitBranch" },
      { title: "Contactos", url: "/app/contacts", icon: "Users" },
      { title: "Automatizaciones", url: "/app/automations", icon: "Zap" },
    ],
  },
  {
    title: "Vision del negocio",
    description: "Revisa avances, metrica comercial y comunidad del equipo.",
    url: "/app",
    icon: "BarChart3",
    items: [
      { title: "Resumen", url: "/app", icon: "LayoutDashboard" },
      { title: "Analitica", url: "/app/analytics", icon: "BarChart3" },
      { title: "Comunidad", url: "/app/community", icon: "Globe" },
    ],
  },
];

export const appRouteTitles: Record<string, string> = {
  "/app": "Resumen",
  "/app/acquisition": "Captacion",
  "/app/prospector": "Prospeccion IA",
  "/app/widgets": "Widgets",
  "/app/voice-ai": "Llamadas IA",
  "/app/creative-studio": "Estudio creativo",
  "/app/conversations": "Conversaciones",
  "/app/pipeline": "Pipeline",
  "/app/contacts": "Contactos",
  "/app/campaigns": "Campanas",
  "/app/analytics": "Analitica",
  "/app/automations": "Automatizaciones",
  "/app/community": "Comunidad",
  "/app/workspaces": "Espacios",
  "/app/settings": "Configuracion",
};
