// Ventra Mock Data

export const kpiCards = [
  { title: "Leads nuevos", value: "284", change: "+18%", trend: "up" as const, icon: "Users" },
  { title: "Conversaciones activas", value: "127", change: "+7%", trend: "up" as const, icon: "MessageSquare" },
  { title: "Oportunidades abandonadas", value: "43", change: "-12%", trend: "down" as const, icon: "AlertTriangle" },
  { title: "Seguimientos pendientes", value: "31", change: "8 urgentes", trend: "warning" as const, icon: "Clock" },
  { title: "Leads recuperados", value: "67", change: "+34%", trend: "up" as const, icon: "RefreshCw" },
  { title: "Campañas activas", value: "5", change: "2 nuevas", trend: "up" as const, icon: "Target" },
  { title: "Tasa de respuesta", value: "72%", change: "+4%", trend: "up" as const, icon: "TrendingUp" },
  { title: "Ingresos recuperados", value: "$48,320", change: "+23%", trend: "up" as const, icon: "BarChart3" },
];

export const revenueChartData = [
  { date: "1 Mar", value: 12400 },
  { date: "5 Mar", value: 18200 },
  { date: "8 Mar", value: 15600 },
  { date: "11 Mar", value: 22300 },
  { date: "15 Mar", value: 28100 },
  { date: "18 Mar", value: 24500 },
  { date: "21 Mar", value: 31200 },
  { date: "25 Mar", value: 35800 },
  { date: "28 Mar", value: 33400 },
  { date: "30 Mar", value: 42100 },
];

export const insights = [
  {
    type: "opportunity" as const,
    title: "Oportunidad detectada",
    description: "12 leads que consultaron esta semana no recibieron follow-up. Potencial: $8,400.",
    color: "warning",
  },
  {
    type: "trend" as const,
    title: "Tendencia positiva",
    description: "Tu tasa de cierre subió 5% esta semana. Las campañas de recuperación están funcionando.",
    color: "success",
  },
  {
    type: "segment" as const,
    title: "Segmento caliente",
    description: "Los leads de e-commerce COD tienen 42% más probabilidad de cierre. Prioriza este segmento.",
    color: "info",
  },
];

export const hotLeads = [
  { name: "Ana García", score: 92, status: "Interesado", value: "$3,200", source: "Instagram Ads" },
  { name: "Carlos Mendoza", score: 88, status: "Negociando", value: "$5,400", source: "WhatsApp" },
  { name: "Laura Sánchez", score: 85, status: "Contactado", value: "$2,100", source: "Landing Page" },
  { name: "Roberto Díaz", score: 78, status: "Cerrado", value: "$4,800", source: "Referido" },
  { name: "Diana López", score: 75, status: "Nuevo", value: "$1,900", source: "Instagram" },
];

export const recentActivity = [
  { text: "Nuevo lead: Ana García — consulta sobre producto premium", time: "Hace 3 min" },
  { text: "Carlos Mendoza confirmó interés en paquete empresarial", time: "Hace 15 min" },
  { text: "Campaña 'Black Friday' alcanzó 2,400 impresiones", time: "Hace 1h" },
  { text: "Voice AI completó 8 llamadas de seguimiento", time: "Hace 2h" },
  { text: "Laura Sánchez abrió propuesta comercial", time: "Hace 3h" },
];

export const conversations = [
  { id: 1, name: "Ana García", initials: "AG", lastMessage: "Me interesa el paquete premium, ...", time: "2 min", unread: 2, status: "online" as const, score: 92 },
  { id: 2, name: "Pedro Martínez", initials: "PM", lastMessage: "¿Cuánto cuesta el envío a Guadal...", time: "15 min", unread: 1, status: "online" as const, score: 78 },
  { id: 3, name: "Laura Sánchez", initials: "LS", lastMessage: "Déjame pensarlo y te aviso", time: "1h", unread: 0, status: "offline" as const, score: 65 },
  { id: 4, name: "Carlos Mendoza", initials: "CM", lastMessage: "Sí, me interesa. ¿Cómo pago?", time: "2h", unread: 0, status: "online" as const, score: 88 },
  { id: 5, name: "Diana López", initials: "DL", lastMessage: "Hola, vi su anuncio en Instagram", time: "3h", unread: 0, status: "offline" as const, score: 71 },
  { id: 6, name: "Roberto Díaz", initials: "RD", lastMessage: "Perfecto, ya hice la transferencia", time: "5h", unread: 0, status: "offline" as const, score: 95 },
  { id: 7, name: "Fernanda Ruiz", initials: "FR", lastMessage: "No gracias, ya compré en otro lado", time: "1d", unread: 0, status: "offline" as const, score: 22 },
  { id: 8, name: "Miguel Torres", initials: "MT", lastMessage: "¿Tienen disponible en talla M?", time: "1d", unread: 0, status: "offline" as const, score: 55 },
];

export const chatMessages = [
  { id: 1, sender: "customer", text: "Hola, vi su anuncio del paquete premium. ¿Cuánto cuesta?", time: "10:23 AM" },
  { id: 2, sender: "agent", text: "¡Hola Ana! 👋 Gracias por tu interés. El paquete premium tiene un precio de $3,200 MXN e incluye envío gratis.", time: "10:25 AM" },
  { id: 3, sender: "customer", text: "¿Tienen algún descuento por compra de 3 unidades?", time: "10:28 AM" },
  { id: 4, sender: "agent", text: "¡Claro! Para 3 unidades te podemos hacer un 15% de descuento. Quedaría en $8,160 en total (ahorro de $1,440).", time: "10:30 AM" },
  { id: 5, sender: "customer", text: "Me interesa, pero necesito consultarlo con mi socio. ¿Puedo confirmar mañana?", time: "10:35 AM" },
  { id: 6, sender: "agent", text: "Por supuesto, sin problema. Te escribo mañana para confirmar. ¡El descuento se mantiene hasta el viernes! 👌", time: "10:36 AM" },
];

export const prospectorResults = [
  { name: "Café Premium CDMX", industry: "Restaurantes", score: 94, revenue: "$120K/año", location: "Ciudad de México", status: "Alta intención" },
  { name: "Boutique Elegance", industry: "Moda", score: 89, revenue: "$85K/año", location: "Guadalajara", status: "Contactar" },
  { name: "TechStore MX", industry: "Tecnología", score: 86, revenue: "$200K/año", location: "Monterrey", status: "Nuevo" },
  { name: "Dental Smile Plus", industry: "Salud", score: 82, revenue: "$150K/año", location: "Puebla", status: "Investigar" },
  { name: "FitLife Gym", industry: "Fitness", score: 79, revenue: "$95K/año", location: "Querétaro", status: "Contactar" },
  { name: "Autolavado Express", industry: "Servicios", score: 76, revenue: "$60K/año", location: "León", status: "Nuevo" },
  { name: "Panadería Artesanal", industry: "Alimentos", score: 73, revenue: "$45K/año", location: "Mérida", status: "Investigar" },
  { name: "Inmobiliaria Costa", industry: "Real Estate", score: 91, revenue: "$500K/año", location: "Cancún", status: "Alta intención" },
];

export const pipelineStages = [
  {
    name: "Nuevos", count: 12, value: "$34,200",
    deals: [
      { name: "Ana García", value: "$3,200", days: 2, company: "García & Asociados" },
      { name: "Luis Ramírez", value: "$5,100", days: 1, company: "Ramírez Corp" },
      { name: "Sofía Herrera", value: "$2,800", days: 3, company: "Herrera Design" },
    ]
  },
  {
    name: "Contactados", count: 8, value: "$28,600",
    deals: [
      { name: "Carlos Mendoza", value: "$5,400", days: 5, company: "Mendoza Trading" },
      { name: "Laura Sánchez", value: "$2,100", days: 4, company: "Sánchez Retail" },
    ]
  },
  {
    name: "Propuesta enviada", count: 5, value: "$42,800",
    deals: [
      { name: "Roberto Díaz", value: "$12,000", days: 7, company: "Díaz Industries" },
      { name: "Patricia Flores", value: "$8,500", days: 3, company: "Flores Media" },
    ]
  },
  {
    name: "Negociación", count: 3, value: "$18,400",
    deals: [
      { name: "Miguel Torres", value: "$6,200", days: 10, company: "Torres Logistics" },
      { name: "Fernanda Ruiz", value: "$4,800", days: 8, company: "Ruiz Consulting" },
    ]
  },
  {
    name: "Cerrado ✓", count: 15, value: "$128,430",
    deals: [
      { name: "Diana López", value: "$15,000", days: 0, company: "López & Co" },
      { name: "Pedro Martínez", value: "$9,800", days: 0, company: "Martínez SA" },
    ]
  },
];

export const contacts = [
  { id: 1, name: "Ana García", email: "ana@gmail.com", phone: "+52 55 1234 5678", company: "García & Asociados", status: "Activo", tags: ["Premium", "Instagram", "WhatsApp"], owner: "María R.", lastContact: "Hace 2 min", value: "$3,200" },
  { id: 2, name: "Carlos Mendoza", email: "carlos@mendoza.mx", phone: "+52 33 9876 5432", company: "Mendoza Trading", status: "Negociando", tags: ["Enterprise", "Referido"], owner: "Juan P.", lastContact: "Hace 2h", value: "$5,400" },
  { id: 3, name: "Laura Sánchez", email: "laura@sanchez.com", phone: "+52 81 5555 1234", company: "Sánchez Retail", status: "Contactado", tags: ["E-commerce", "Landing"], owner: "María R.", lastContact: "Hace 1h", value: "$2,100" },
  { id: 4, name: "Roberto Díaz", email: "roberto@diaz.com", phone: "+52 22 4444 5678", company: "Díaz Industries", status: "Cerrado", tags: ["Industrial", "WhatsApp"], owner: "Carlos S.", lastContact: "Hace 5h", value: "$12,000" },
  { id: 5, name: "Diana López", email: "diana@lopez.mx", phone: "+52 55 3333 4444", company: "López & Co", status: "Nuevo", tags: ["Instagram"], owner: "María R.", lastContact: "Hace 3h", value: "$1,900" },
  { id: 6, name: "Pedro Martínez", email: "pedro@martinez.com", phone: "+52 33 2222 1111", company: "Martínez SA", status: "Activo", tags: ["Premium", "Ads"], owner: "Juan P.", lastContact: "Hace 15 min", value: "$9,800" },
];

export const campaigns = [
  { id: 1, name: "Black Friday Early Access", status: "Activa", type: "WhatsApp", sent: 2400, opened: 1680, clicked: 840, converted: 126, revenue: "$12,600" },
  { id: 2, name: "Recuperación Carritos Q1", status: "Activa", type: "WhatsApp", sent: 890, opened: 712, clicked: 356, converted: 67, revenue: "$8,400" },
  { id: 3, name: "Lanzamiento Premium", status: "Pausada", type: "Email + WhatsApp", sent: 1200, opened: 960, clicked: 480, converted: 48, revenue: "$14,400" },
  { id: 4, name: "Re-engagement 30 días", status: "Programada", type: "WhatsApp", sent: 0, opened: 0, clicked: 0, converted: 0, revenue: "$0" },
  { id: 5, name: "Upsell Clientes Actuales", status: "Completada", type: "Email", sent: 560, opened: 448, clicked: 168, converted: 34, revenue: "$6,800" },
];

export const automations = [
  { id: 1, name: "Follow-up automático 24h", status: "Activa", trigger: "Lead sin respuesta", actions: 3, executions: 342, lastRun: "Hace 5 min" },
  { id: 2, name: "Asignación de asesor", status: "Activa", trigger: "Nuevo lead", actions: 2, executions: 284, lastRun: "Hace 12 min" },
  { id: 3, name: "Recuperación de carrito", status: "Activa", trigger: "Carrito abandonado", actions: 4, executions: 156, lastRun: "Hace 1h" },
  { id: 4, name: "Scoring automático", status: "Activa", trigger: "Interacción detectada", actions: 2, executions: 1240, lastRun: "Hace 2 min" },
  { id: 5, name: "Alerta de oportunidad", status: "Pausada", trigger: "Score > 80", actions: 3, executions: 89, lastRun: "Hace 2 días" },
];

export const communityPosts = [
  { id: 1, author: "María Rodríguez", avatar: "MR", content: "¡Acabo de cerrar mi primer deal de $10K usando el Prospector AI! 🎉 La función de scoring fue clave para priorizar.", likes: 24, comments: 8, time: "Hace 2h" },
  { id: 2, author: "Carlos Vega", avatar: "CV", content: "¿Alguien ha probado las nuevas automatizaciones de WhatsApp? Quiero configurar un flow de nurturing.", likes: 12, comments: 15, time: "Hace 4h" },
  { id: 3, author: "Ana Torres", avatar: "AT", content: "Tip: Conecten Voice AI con su pipeline. Las llamadas automáticas de seguimiento aumentaron mi tasa de respuesta un 34%.", likes: 45, comments: 12, time: "Hace 6h" },
];

export const sidebarNavItems = {
  principal: [
    { title: "Overview", url: "/app", icon: "LayoutDashboard" },
    { title: "Acquisition", url: "/app/acquisition", icon: "Megaphone" },
    { title: "Prospector AI", url: "/app/prospector", icon: "Search" },
    { title: "Widgets", url: "/app/widgets", icon: "LayoutGrid" },
    { title: "Voice AI", url: "/app/voice-ai", icon: "Phone" },
    { title: "Creative Studio", url: "/app/creative-studio", icon: "Palette" },
    { title: "Conversations", url: "/app/conversations", icon: "MessageSquare" },
    { title: "Pipeline", url: "/app/pipeline", icon: "GitBranch" },
    { title: "Contacts", url: "/app/contacts", icon: "Users" },
    { title: "Campaigns", url: "/app/campaigns", icon: "Send" },
  ],
  intelligence: [
    { title: "Analytics", url: "/app/analytics", icon: "BarChart3" },
    { title: "Automations", url: "/app/automations", icon: "Zap" },
    { title: "Community", url: "/app/community", icon: "Globe" },
  ],
};
