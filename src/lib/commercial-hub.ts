import {
  Activity,
  AlarmClockCheck,
  ArrowUpRight,
  BadgeDollarSign,
  Bot,
  CalendarCheck2,
  CircleAlert,
  Handshake,
  Megaphone,
  MessageSquareMore,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

export const overviewMetrics = [
  {
    label: "Oportunidades nuevas",
    value: "46",
    detail: "Entraron 12 de alta intencion esta semana.",
    delta: "+18%",
    icon: Users,
  },
  {
    label: "Conversaciones activas",
    value: "19",
    detail: "Prospectos con respuesta abierta o accion pendiente.",
    delta: "+9%",
    icon: MessageSquareMore,
  },
  {
    label: "Seguimientos vivos",
    value: "27",
    detail: "Leads en seguimiento con proximo paso definido.",
    delta: "+6%",
    icon: AlarmClockCheck,
  },
  {
    label: "Tasa de conversion",
    value: "32%",
    detail: "Sobre oportunidades calificadas del ultimo ciclo.",
    delta: "+4.2 pts",
    icon: TrendingUp,
  },
];

export const overviewFunnel = [
  { label: "Nuevos", value: 46, revenue: "USD 62k" },
  { label: "Conversando", value: 19, revenue: "USD 38k" },
  { label: "Seguimiento", value: 27, revenue: "USD 54k" },
  { label: "Cerrados", value: 11, revenue: "USD 28k" },
  { label: "Perdidos", value: 7, revenue: "USD 11k" },
];

export const overviewPriorityBoard = [
  {
    title: "Responder mas rapido los leads de alto ticket",
    summary: "4 prospectos llegaron por anuncios y siguen esperando una segunda respuesta.",
    layer: "Atencion automatica",
    impact: "Impacto estimado: USD 12k",
    owner: "Asistente Ventra",
    icon: Bot,
  },
  {
    title: "Ajustar la promesa de la campana principal",
    summary: "La oferta actual atrae curiosos; conviene enfatizar implementacion y resultado.",
    layer: "Adquisicion",
    impact: "Mejora esperada: +15% en calidad de lead",
    owner: "Equipo comercial",
    icon: Megaphone,
  },
  {
    title: "Recuperar propuestas sin respuesta",
    summary: "Hay 3 oportunidades tibias listas para un mensaje de empuje al cierre.",
    layer: "Cierre",
    impact: "Impacto estimado: USD 9k",
    owner: "Closer",
    icon: Target,
  },
];

export const overviewRecentActivity = [
  {
    lead: "Marcela Ruiz",
    action: "pidio llamada luego de recibir una respuesta automatica mejor orientada al cierre",
    time: "Hace 4 min",
    tag: "Hot lead",
  },
  {
    lead: "Dental Nova",
    action: "quedo marcado como oportunidad premium desde la capa de adquisicion",
    time: "Hace 18 min",
    tag: "Campana",
  },
  {
    lead: "EducaLab",
    action: "respondio al mensaje de seguimiento despues de 5 dias",
    time: "Hace 41 min",
    tag: "Reactivado",
  },
  {
    lead: "Grupo Aurora",
    action: "paso a propuesta enviada y listo para llamada final",
    time: "Hace 1 h",
    tag: "Pipeline",
  },
];

export const overviewOperationalSignals = [
  {
    title: "Revenue en juego",
    value: "USD 83k",
    helper: "Pipeline vivo entre seguimiento, llamada y propuesta.",
    icon: BadgeDollarSign,
  },
  {
    title: "Llamadas listas",
    value: "6",
    helper: "Prospectos filtrados para siguiente paso comercial.",
    icon: CalendarCheck2,
  },
  {
    title: "Leads perdidos",
    value: "7",
    helper: "La mayoria cae por demora o falta de insistencia.",
    icon: CircleAlert,
  },
];

export const automaticAttentionGoals = [
  "Responder consultas",
  "Calificar prospectos",
  "Agendar llamada",
  "Detectar intencion",
  "Recuperar interes",
  "Filtrar curiosos",
];

export const assistantToneOptions = [
  "Consultivo y directo",
  "Cercano con criterio comercial",
  "Ejecutivo y premium",
];

export const assistantIdealClientTypes = [
  "Dueño de negocio de servicios high ticket",
  "Equipo comercial pequeno que vende por WhatsApp",
  "Negocio que recibe consultas pero convierte poco",
];

export const assistantObjectionLibrary = [
  "Esta caro para mi en este momento",
  "Lo voy a pensar",
  "Mandame la info y luego te aviso",
  "Tengo que consultarlo con mi socio",
  "Ahora no es prioridad",
  "Ya trabajo con otra opcion",
];

export const assistantPreviewScenarios = [
  {
    id: "price",
    label: "Objecion precio",
    customerMessage: "Me interesa, pero siento que esta caro y no se si recupero la inversion.",
    goal: "Mostrar retorno y llevar a siguiente paso.",
  },
  {
    id: "thinking",
    label: "Lo voy a pensar",
    customerMessage: "Suena bien, pero dejame pensarlo y luego te escribo.",
    goal: "Evitar fuga tibia y pedir compromiso suave.",
  },
  {
    id: "info",
    label: "Mandame info",
    customerMessage: "Mandame info por aqui y si me interesa te respondo.",
    goal: "No caer en envio pasivo; mover la conversacion.",
  },
];

export const assistantHandoffRules = [
  {
    title: "Marcar lead caliente",
    description: "Cuando pide precio, compara opciones o solicita llamada en el mismo hilo.",
    icon: TrendingUp,
  },
  {
    title: "Pedir datos utiles",
    description: "Solicitar rubro, ticket y urgencia antes de enviar cualquier propuesta.",
    icon: UserCheck,
  },
  {
    title: "Derivar a humano",
    description: "Escalar cuando el prospecto pide negociacion, caso especial o condiciones comerciales.",
    icon: Handshake,
  },
  {
    title: "Priorizar seguimiento",
    description: "Activar seguimiento cuando hubo interes claro, pero no quedo siguiente paso definido.",
    icon: Activity,
  },
];

export const closingMetrics = [
  { label: "Leads totales", value: "64" },
  { label: "Calificados", value: "29" },
  { label: "En seguimiento", value: "21" },
  { label: "Llamadas agendadas", value: "8" },
  { label: "Cerrados", value: "11" },
  { label: "Perdidos", value: "7" },
  { label: "Conversion", value: "32%" },
];

export const closingPipeline = [
  {
    stage: "Nuevo",
    leads: [
      { name: "Clinica Nova", amount: "USD 4.2k", source: "Meta Ads", tags: ["tibio", "pidio precio"] },
      { name: "Grupo Yara", amount: "USD 7.8k", source: "Referido", tags: ["caliente", "urgente"] },
    ],
  },
  {
    stage: "Contactado",
    leads: [
      { name: "Madero Legal", amount: "USD 6.5k", source: "WhatsApp", tags: ["tibio", "listo para llamada"] },
    ],
  },
  {
    stage: "Calificado",
    leads: [
      { name: "Dental Prime", amount: "USD 9.1k", source: "Instagram", tags: ["caliente", "pidio precio"] },
      { name: "Vision Real", amount: "USD 5.4k", source: "Web", tags: ["tibio"] },
    ],
  },
  {
    stage: "Seguimiento",
    leads: [
      { name: "Estudio Quark", amount: "USD 3.9k", source: "WhatsApp", tags: ["objecion precio", "no responde"] },
      { name: "Aurora Kids", amount: "USD 4.6k", source: "Referido", tags: ["caliente"] },
    ],
  },
  {
    stage: "Listo para llamada",
    leads: [{ name: "Atica Salud", amount: "USD 8.4k", source: "Meta Ads", tags: ["urgente", "caliente"] }],
  },
  {
    stage: "Propuesta enviada",
    leads: [{ name: "Studio Eleven", amount: "USD 10.2k", source: "Web", tags: ["tibio", "pidio precio"] }],
  },
  {
    stage: "Cerrado",
    leads: [{ name: "Optima Care", amount: "USD 5.7k", source: "Referido", tags: ["cerrado"] }],
  },
  {
    stage: "Perdido",
    leads: [{ name: "Casa Norte", amount: "USD 2.8k", source: "Instagram", tags: ["no califica"] }],
  },
];

export const closingSignals = [
  "frio",
  "tibio",
  "caliente",
  "urgente",
  "pidio precio",
  "listo para llamada",
  "objecion precio",
  "no responde",
  "no califica",
];

export const closingFollowUpSuggestions = [
  {
    title: "Siguiente mejor mensaje",
    copy: "Vi que ya revisaste la propuesta. Si te sirve, te dejo una llamada corta para aterrizar el plan correcto para tu negocio.",
  },
  {
    title: "Mensaje para reactivar",
    copy: "No queria dejar la conversacion abierta. Si esto sigue siendo prioridad, te digo en dos mensajes como lo implementariamos sin sobrecargar a tu equipo.",
  },
  {
    title: "Mensaje para objecion",
    copy: "Mas que sumar una herramienta, aqui estas montando un sistema para responder mejor y cerrar mas. Si quieres, te explico donde suele recuperarse la inversion primero.",
  },
  {
    title: "Mensaje de cierre",
    copy: "Si te hace sentido, definimos hoy el siguiente paso y dejamos tu implementacion lista para arrancar esta semana.",
  },
  {
    title: "Mensaje post llamada",
    copy: "Gracias por la llamada. Te resumo el foco: atraer mejor, responder mas rapido y ordenar seguimiento para que el proceso venda con menos carga manual.",
  },
];

export const closingSpotlightLeads = [
  {
    name: "Dental Prime",
    status: "Calificado",
    nextMove: "Enviar mensaje de prueba social y ofrecer llamada de 15 min.",
    signal: "Listo para llamada",
  },
  {
    name: "Estudio Quark",
    status: "Seguimiento",
    nextMove: "Rebatir objecion precio con retorno y urgencia.",
    signal: "Objecion precio",
  },
  {
    name: "Aurora Kids",
    status: "Seguimiento",
    nextMove: "Empujar cierre con agenda y fecha de implementacion.",
    signal: "Caliente",
  },
];
