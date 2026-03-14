import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  Megaphone,
  MessageSquareMore,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export type LandingContentItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type LandingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  highlight?: string;
  includedLayers: string[];
  outcomes: string[];
  ctaLabel: string;
};

export type LandingQuizOption = {
  label: string;
  description: string;
};

export type LandingQuizQuestion = {
  id: string;
  title: string;
  helper: string;
  options: LandingQuizOption[];
};

export type LandingQuizResult = {
  headline: string;
  summary: string;
  plan: LandingPlan;
  priorityLayers: string[];
  note: string;
};

export const landingPainPoints: LandingContentItem[] = [
  {
    title: "Llegan consultas y se responden tarde",
    description: "El interes existe, pero el negocio pierde velocidad justo cuando el prospecto esta listo para hablar.",
    icon: Clock3,
  },
  {
    title: "Se pierden oportunidades por falta de seguimiento",
    description: "Muchos leads no se enfrian por precio, sino porque nadie los movio con un siguiente paso claro.",
    icon: Target,
  },
  {
    title: "Todo depende de operacion manual",
    description: "Responder, recordar, insistir y ordenar conversaciones consume tiempo que deberia ir a vender.",
    icon: Users,
  },
];

export const landingLayers: Array<LandingContentItem & { id: string; outcome: string; plan: string }> = [
  {
    id: "acquisition",
    title: "Adquisicion",
    description: "Te ayudamos a crear mejores campanas, hooks y mensajes para atraer nuevas oportunidades.",
    outcome: "Mas oportunidades de mejor calidad.",
    icon: Megaphone,
    plan: "Plan completo",
  },
  {
    id: "automatic-attention",
    title: "Atencion automatica",
    description: "Tu asistente responde prospectos, resuelve dudas y mueve la conversacion sin depender de cada respuesta manual.",
    outcome: "Respuestas mas rapidas y menos fugas por demora.",
    icon: Bot,
    plan: "Plan basico",
  },
  {
    id: "closing",
    title: "Cierre",
    description: "Ordena seguimiento, prioriza leads y empuja conversiones con mensajes y acciones mas claras.",
    outcome: "Mejor seguimiento y mas cierres.",
    icon: TrendingUp,
    plan: "Plan completo",
  },
];

export const landingBenefits: LandingContentItem[] = [
  {
    title: "Respondes mas rapido",
    description: "Cada consulta recibe atencion sin esperar a que alguien este libre para contestar.",
    icon: MessageSquareMore,
  },
  {
    title: "Dejas de perder oportunidades por demora",
    description: "El sistema evita que el interes se enfrie por falta de seguimiento o desorden comercial.",
    icon: CheckCircle2,
  },
  {
    title: "Tu equipo se enfoca en vender",
    description: "Menos carga repetitiva, mas tiempo para avanzar oportunidades con intencion real.",
    icon: Users,
  },
  {
    title: "Conviertes mas consultas en clientes",
    description: "El negocio atrae mejor, responde mejor y hace un seguimiento mas consistente hasta el cierre.",
    icon: ArrowUpRight,
  },
];

export const landingSteps: LandingContentItem[] = [
  {
    title: "Atrae oportunidades",
    description: "Define mejor tu mensaje y lanza campanas con una promesa comercial mas clara.",
  },
  {
    title: "Atiende prospectos automaticamente",
    description: "Tu asistente responde dudas, guia la conversacion y reduce la carga operativa.",
  },
  {
    title: "Da seguimiento y empuja el cierre",
    description: "Prioriza leads, mueve cada oportunidad y convierte mas consultas en clientes.",
  },
];

export const landingPlans: LandingPlan[] = [
  {
    name: "Plan basico",
    price: "9.99 USD",
    period: "/ mes",
    description: "Empieza por la capa que mas reduce fuga y carga operativa.",
    highlight: "Ideal para negocios que necesitan responder mejor sin montar todo el sistema desde el dia uno.",
    includedLayers: ["Atencion automatica"],
    outcomes: ["Respuestas mas rapidas", "Menos consultas sin atender", "Inicio simple y facil de activar"],
    ctaLabel: "Empezar con el basico",
  },
  {
    name: "Plan completo",
    price: "99 USD",
    period: "/ mes",
    description: "Activa el sistema comercial completo para atraer, atender y cerrar.",
    highlight: "Para negocios que quieren una maquina comercial mas ordenada y orientada a conversion.",
    includedLayers: ["Adquisicion", "Atencion automatica", "Cierre"],
    outcomes: ["Mas oportunidades", "Mejor seguimiento", "Mas cierres con menos friccion operativa"],
    ctaLabel: "Ir por la solucion completa",
  },
];

export const landingTrustNotes: LandingContentItem[] = [
  {
    title: "Ideal para negocios que venden por WhatsApp o consulta directa",
    description: "Servicios, retail, salud, educacion, inmobiliaria y equipos que dependen de responder rapido para vender.",
  },
  {
    title: "Promesa realista",
    description: "Ventra no sustituye estrategia comercial. Ordena adquisicion, respuesta y seguimiento para que el proceso venda mejor.",
  },
  {
    title: "Implementacion simple",
    description: "Puedes empezar con la capa basica y crecer al sistema completo cuando el negocio necesite mas empuje comercial.",
  },
];

export const landingFaqs: LandingContentItem[] = [
  {
    title: "Que hace exactamente Ventra AI?",
    description: "Implementa un sistema comercial para atraer clientes, atender consultas y dar mejor seguimiento hasta el cierre.",
  },
  {
    title: "Necesito usar todo desde el inicio?",
    description: "No. Puedes empezar con Atencion automatica y luego sumar Adquisicion y Cierre cuando quieras crecer.",
  },
  {
    title: "Sirve si hoy vendo por WhatsApp y casi todo es manual?",
    description: "Si. Esa es una de las situaciones donde Ventra aporta mas claridad y mas velocidad de respuesta.",
  },
  {
    title: "Esto reemplaza por completo a un CRM complejo?",
    description: "Ventra no busca ser un CRM inflado. Busca darte un seguimiento simple y enfocado en conversion.",
  },
];

export const landingQuizQuestions: LandingQuizQuestion[] = [
  {
    id: "businessType",
    title: "Que tipo de negocio tienes?",
    helper: "Esto nos ayuda a entender como vendes y que tan consultiva es la conversacion.",
    options: [
      { label: "Servicios profesionales", description: "Ventas consultivas, reuniones o propuestas." },
      { label: "E-commerce o retail", description: "Mucho volumen y consultas frecuentes." },
      { label: "Salud, educacion o inmobiliaria", description: "Prospectos que necesitan mas confianza y seguimiento." },
      { label: "Otro negocio que vende por mensajes", description: "Conversaciones directas como parte central del cierre." },
    ],
  },
  {
    id: "leadSource",
    title: "Como te llegan la mayoria de consultas hoy?",
    helper: "Queremos detectar si el cuello de botella esta en conseguir demanda o en gestionarla.",
    options: [
      { label: "Anuncios y campanas", description: "Ya haces adquisicion y quieres que convierta mejor." },
      { label: "WhatsApp, Instagram o redes", description: "La demanda llega por mensajes y conversaciones directas." },
      { label: "Referidos o contactos organicos", description: "Hay ventas, pero no un sistema comercial claro." },
      { label: "Me llegan pocas consultas", description: "Primero necesitas mejorar captacion." },
    ],
  },
  {
    id: "usesWhatsapp",
    title: "Tu proceso comercial pasa por WhatsApp?",
    helper: "La atencion automatica tiene mas impacto cuando las conversaciones viven ahi.",
    options: [
      { label: "Si, casi todo pasa por WhatsApp", description: "WhatsApp es el canal principal para responder y vender." },
      { label: "Si, pero tambien uso otros canales", description: "WhatsApp es importante, aunque no es el unico." },
      { label: "No mucho", description: "El problema puede estar mas en captacion o seguimiento." },
    ],
  },
  {
    id: "salesTeam",
    title: "Quien responde y hace seguimiento hoy?",
    helper: "Esto nos muestra cuanto pesa la operacion manual en el negocio.",
    options: [
      { label: "Yo vendo casi todo", description: "La operacion depende mucho del dueno." },
      { label: "Tengo una persona o equipo pequeno", description: "Hay soporte comercial, pero con recursos limitados." },
      { label: "Ya tengo un equipo comercial", description: "El reto suele estar en orden y consistencia." },
    ],
  },
  {
    id: "slowResponse",
    title: "Pierdes leads por responder tarde?",
    helper: "Esta es una de las senales mas claras para recomendar Atencion automatica.",
    options: [
      { label: "Si, con frecuencia", description: "Hay consultas que se enfrian antes de responder." },
      { label: "A veces", description: "Sucede cuando hay volumen o el equipo esta ocupado." },
      { label: "No es mi principal problema", description: "Probablemente el cuello de botella esta en otra capa." },
    ],
  },
  {
    id: "followUp",
    title: "Hoy haces seguimiento comercial de forma ordenada?",
    helper: "Queremos saber si tus oportunidades siguen avanzando o se quedan en conversaciones abiertas.",
    options: [
      { label: "Si, tengo un proceso claro", description: "Ya hay algo de orden comercial." },
      { label: "Lo hago de forma irregular", description: "Existe seguimiento, pero no es consistente." },
      { label: "Casi nunca", description: "Muchos prospectos se quedan sin siguiente paso." },
    ],
  },
  {
    id: "leadVolume",
    title: "Cuantas consultas o leads recibes al mes?",
    helper: "El volumen cambia la urgencia entre automatizar respuesta o mejorar captacion.",
    options: [
      { label: "Menos de 30", description: "Necesitas que cada oportunidad cuente." },
      { label: "Entre 30 y 150", description: "Ya hay volumen suficiente para ordenar el proceso." },
      { label: "Mas de 150", description: "La operacion se rompe rapido si no hay sistema." },
    ],
  },
  {
    id: "goal",
    title: "Que te urge mas resolver ahora?",
    helper: "Con esta respuesta definimos por donde deberias empezar.",
    options: [
      { label: "Conseguir mas oportunidades", description: "Prioridad en adquisicion." },
      { label: "Responder mas rapido", description: "Prioridad en atencion automatica." },
      { label: "Cerrar mas clientes", description: "Prioridad en seguimiento y cierre." },
      { label: "Recuperar oportunidades perdidas", description: "Necesitas mejor atencion y cierre." },
    ],
  },
];

const layerTitleById = {
  acquisition: "Adquisicion",
  automaticAttention: "Atencion automatica",
  closing: "Cierre",
};

function scoreQuizAnswers(answers: Record<string, string>) {
  const score = {
    acquisition: 0,
    automaticAttention: 0,
    closing: 0,
  };

  if (answers.leadSource === "Me llegan pocas consultas") score.acquisition += 3;
  if (answers.leadSource === "Referidos o contactos organicos") {
    score.acquisition += 2;
    score.closing += 1;
  }
  if (answers.leadSource === "Anuncios y campanas") score.acquisition += 1;
  if (answers.leadSource === "WhatsApp, Instagram o redes") score.automaticAttention += 1;

  if (answers.usesWhatsapp === "Si, casi todo pasa por WhatsApp") score.automaticAttention += 3;
  if (answers.usesWhatsapp === "Si, pero tambien uso otros canales") score.automaticAttention += 2;

  if (answers.salesTeam === "Yo vendo casi todo") {
    score.automaticAttention += 2;
    score.closing += 1;
  }
  if (answers.salesTeam === "Tengo una persona o equipo pequeno") {
    score.automaticAttention += 1;
    score.closing += 1;
  }
  if (answers.salesTeam === "Ya tengo un equipo comercial") score.closing += 1;

  if (answers.slowResponse === "Si, con frecuencia") score.automaticAttention += 4;
  if (answers.slowResponse === "A veces") score.automaticAttention += 2;

  if (answers.followUp === "Casi nunca") score.closing += 4;
  if (answers.followUp === "Lo hago de forma irregular") score.closing += 2;

  if (answers.leadVolume === "Mas de 150") {
    score.automaticAttention += 2;
    score.closing += 1;
  }
  if (answers.leadVolume === "Entre 30 y 150") {
    score.automaticAttention += 1;
    score.closing += 1;
  }
  if (answers.leadVolume === "Menos de 30") score.acquisition += 1;

  if (answers.goal === "Conseguir mas oportunidades") score.acquisition += 4;
  if (answers.goal === "Responder mas rapido") score.automaticAttention += 4;
  if (answers.goal === "Cerrar mas clientes") score.closing += 4;
  if (answers.goal === "Recuperar oportunidades perdidas") {
    score.automaticAttention += 2;
    score.closing += 3;
  }

  return score;
}

export function getLandingRecommendation(answers: Record<string, string>): LandingQuizResult {
  const score = scoreQuizAnswers(answers);
  const rankedLayers = Object.entries(score)
    .sort((first, second) => second[1] - first[1])
    .map(([key]) => key as keyof typeof layerTitleById);

  const primaryLayer = rankedLayers[0];
  const secondaryLayer = rankedLayers[1];
  const primaryScore = score[primaryLayer];
  const secondaryScore = score[secondaryLayer];

  const priorityLayers = rankedLayers.slice(0, 2).map((layer) => layerTitleById[layer]);
  const recommendedPlan =
    primaryLayer === "automaticAttention" && primaryScore - secondaryScore >= 2 ? landingPlans[0] : landingPlans[1];

  if (primaryLayer === "automaticAttention" && secondaryLayer === "closing" && secondaryScore >= primaryScore - 1) {
    return {
      headline: "Tu negocio necesita ordenar atencion y cierre.",
      summary: "Hay interes real, pero se pierde velocidad entre responder y mover cada oportunidad al siguiente paso.",
      priorityLayers,
      plan: landingPlans[1],
      note: "La mejor ganancia vendra de responder mejor y dar seguimiento con mas disciplina.",
    };
  }

  if (primaryLayer === "acquisition" && secondaryLayer === "automaticAttention" && secondaryScore >= primaryScore - 1) {
    return {
      headline: "Tu mejor oportunidad esta en mejorar captacion y respuesta.",
      summary: "Necesitas atraer mas consultas utiles y asegurarte de que no se enfrien cuando llegan.",
      priorityLayers,
      plan: landingPlans[1],
      note: "Conviene empezar con una promesa comercial mas clara y una respuesta mas rapida.",
    };
  }

  if (primaryLayer === "automaticAttention") {
    return {
      headline: "Tu mayor cuello de botella esta en atencion automatica.",
      summary: "El negocio ya genera interes, pero la demora y la carga manual estan frenando conversiones.",
      priorityLayers,
      plan: recommendedPlan,
      note: "Puedes empezar con el plan basico y crecer cuando quieras sumar captacion o cierre.",
    };
  }

  if (primaryLayer === "closing") {
    return {
      headline: "Tu negocio necesita ordenar seguimiento y cierre.",
      summary: "Hay oportunidades activas, pero falta un sistema simple para priorizar, insistir y convertir mejor.",
      priorityLayers,
      plan: landingPlans[1],
      note: "La prioridad es mover cada prospecto con siguiente paso, contexto y mejor timing comercial.",
    };
  }

  return {
    headline: "Tu mayor oportunidad esta en fortalecer adquisicion.",
    summary: "Antes de complicar la operacion, necesitas mejorar como atraes oportunidades y con que mensaje llegas al mercado.",
    priorityLayers,
    plan: landingPlans[1],
    note: "Cuando captas mejor y respondes a tiempo, el resto del sistema empieza a escalar con mas claridad.",
  };
}
