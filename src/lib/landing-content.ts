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
    title: "Llegan consultas, pero no siempre llegan las correctas",
    description: "Sin una promesa comercial clara, entra ruido y el equipo termina ocupando tiempo en prospectos flojos.",
    icon: Clock3,
  },
  {
    title: "Las respuestas dependen demasiado del dueno o del equipo",
    description: "Cuando nadie responde rapido o con criterio, el interes se enfria justo antes del avance real.",
    icon: Target,
  },
  {
    title: "El seguimiento no empuja el cierre",
    description: "Muchos negocios hablan con prospectos, pero no tienen un sistema corto para priorizar, insistir y cerrar.",
    icon: Users,
  },
];

export const landingLayers: Array<LandingContentItem & { id: string; outcome: string; plan: string }> = [
  {
    id: "acquisition",
    title: "Adquisicion",
    description: "Definimos mejor tu mensaje, la promesa principal y el tipo de campana que atrae oportunidades con mejor encaje.",
    outcome: "Mas oportunidades relevantes, menos consultas vacias.",
    icon: Megaphone,
    plan: "Entrada recomendada cuando falta demanda clara",
  },
  {
    id: "automatic-attention",
    title: "Atencion automatica",
    description: "Configuramos un asistente que responde, filtra, detecta intencion y deja mejor encaminado el siguiente paso.",
    outcome: "Mas velocidad, menos fuga por demora y menos carga manual.",
    icon: Bot,
    plan: "Capa mas urgente cuando las ventas viven en WhatsApp",
  },
  {
    id: "closing",
    title: "Cierre",
    description: "Ordenamos un pipeline corto, etiquetas de intencion y mensajes de seguimiento para empujar conversion con criterio.",
    outcome: "Mas seguimiento util y mas cierres con foco.",
    icon: TrendingUp,
    plan: "Capa critica cuando hay interes pero no conversion",
  },
];

export const landingBenefits: LandingContentItem[] = [
  {
    title: "Mas claridad comercial",
    description: "Tu negocio deja de improvisar el mensaje y empieza a vender con una narrativa mas ordenada.",
    icon: MessageSquareMore,
  },
  {
    title: "Menos carga operativa",
    description: "Responder y filtrar mejor ya no depende tanto del tiempo del dueno o del equipo.",
    icon: CheckCircle2,
  },
  {
    title: "Mejor seguimiento",
    description: "Las oportunidades dejan de quedarse abiertas sin contexto, sin insistencia y sin siguiente paso.",
    icon: Users,
  },
  {
    title: "Mas conversion real",
    description: "No porque haya mas herramientas, sino porque el proceso completo vende mejor.",
    icon: ArrowUpRight,
  },
];

export const landingSteps: LandingContentItem[] = [
  {
    title: "Diagnostico consultivo",
    description: "Entendemos si tu cuello de botella principal esta en adquisicion, atencion automatica, cierre o en el sistema completo.",
  },
  {
    title: "Implementacion guiada",
    description: "Montamos la capa correcta para tu negocio y dejamos el software alineado a esa operacion.",
  },
  {
    title: "Seguimiento y continuidad",
    description: "Tu negocio queda listo para crecer por capas sin rehacer la experiencia comercial.",
  },
];

export const landingPlans: LandingPlan[] = [
  {
    name: "Diagnostico consultivo",
    price: "Aplicacion",
    period: "",
    description: "Entrada recomendada para negocios que primero necesitan claridad sobre por donde empezar.",
    highlight: "No compras una licencia. Validamos encaje, prioridad y siguiente paso antes de implementar.",
    includedLayers: ["Diagnostico", "Hoja de ruta inicial", "Recomendacion de capa"],
    outcomes: ["Prioridad comercial clara", "Filtro serio de encaje", "Siguiente paso recomendado"],
    ctaLabel: "Quiero mi diagnostico",
  },
  {
    name: "Implementacion premium",
    price: "Desde 1000 USD",
    period: "",
    description: "Oferta principal para negocios que quieren montar un sistema comercial completo o por capas.",
    highlight: "Incluye servicio de implementacion, software alineado al proceso y ruta de continuidad.",
    includedLayers: ["Adquisicion", "Atencion automatica", "Cierre"],
    outcomes: ["Sistema comercial claro", "Software incluido", "Menos carga manual y mas conversion"],
    ctaLabel: "Evaluar implementacion",
  },
];

export const landingTrustNotes: LandingContentItem[] = [
  {
    title: "Pensado para negocios de servicios y ventas consultivas",
    description: "Funciona mejor cuando el negocio vende por consulta, llamada o conversacion directa, no por compra impulsiva.",
  },
  {
    title: "Servicio primero, software incluido",
    description: "Ventra no se presenta como una navaja suiza. Se presenta como una implementacion comercial con soporte de software.",
  },
  {
    title: "Escalable por capas",
    description: "Puedes empezar por la prioridad mas urgente y luego crecer hacia el sistema completo sin rehacer todo.",
  },
];

export const landingFaqs: LandingContentItem[] = [
  {
    title: "Ventra vende software o servicio?",
    description: "La oferta principal es una implementacion comercial premium. El software viene incluido como parte del sistema.",
  },
  {
    title: "Necesito activar las tres capas desde el inicio?",
    description: "No necesariamente. Primero detectamos tu cuello de botella y definimos si conviene empezar por una capa o por la solucion completa.",
  },
  {
    title: "Sirve si hoy vendo por WhatsApp y hago casi todo manual?",
    description: "Si. Ese es uno de los escenarios donde mas valor aporta ordenar atencion automatica y seguimiento.",
  },
  {
    title: "Es un CRM grande o una suite de herramientas?",
    description: "No. La experiencia busca ser corta, clara y orientada a conversion. Menos modulos, mas criterio comercial.",
  },
];

export const landingQuizQuestions: LandingQuizQuestion[] = [
  {
    id: "businessType",
    title: "Que tipo de negocio quieres hacer vender mejor?",
    helper: "Esto nos ayuda a entender si el proceso comercial es mas consultivo y cuanto pesa la conversacion.",
    options: [
      { label: "Servicios profesionales", description: "Llamadas, propuestas y cierre por seguimiento." },
      { label: "Salud, educacion o inmobiliaria", description: "Negocios donde confianza y timing importan mucho." },
      { label: "Agencia, consultoria o implementacion", description: "Ventas con objeciones, precio y evaluacion." },
      { label: "Otro negocio que vende por mensajes", description: "WhatsApp, Instagram o DM como parte central del cierre." },
    ],
  },
  {
    id: "leadSource",
    title: "Como te llegan hoy la mayoria de consultas?",
    helper: "Queremos detectar si el cuello de botella esta en generar demanda o en operarla mejor.",
    options: [
      { label: "Anuncios y campanas", description: "Ya existe captacion y quieres que convierta mejor." },
      { label: "WhatsApp, Instagram o redes", description: "La demanda entra por mensajes directos." },
      { label: "Referidos o contactos organicos", description: "Hay interes, pero sin sistema comercial claro." },
      { label: "Me llegan pocas consultas", description: "Primero hay que trabajar mejor adquisicion." },
    ],
  },
  {
    id: "usesWhatsapp",
    title: "Que tan importante es WhatsApp para vender?",
    helper: "La atencion automatica pesa mas cuando la conversacion real vive ahi.",
    options: [
      { label: "Es el canal principal", description: "La mayoria de oportunidades se mueven por WhatsApp." },
      { label: "Es importante, pero no el unico", description: "Tambien usas formularios, Instagram o llamadas." },
      { label: "No es tan relevante", description: "El problema puede estar mas en captacion o cierre." },
    ],
  },
  {
    id: "salesTeam",
    title: "Quien responde y hace seguimiento hoy?",
    helper: "Esto nos muestra cuanto depende la venta de operacion manual.",
    options: [
      { label: "Yo respondo casi todo", description: "La venta depende mucho del dueno o fundador." },
      { label: "Tengo una persona o equipo pequeno", description: "Hay soporte, pero con capacidad limitada." },
      { label: "Ya tengo equipo comercial", description: "El reto suele ser consistencia y criterio." },
    ],
  },
  {
    id: "slowResponse",
    title: "Pierdes oportunidades por responder tarde?",
    helper: "Es una de las senales mas fuertes para recomendar atencion automatica.",
    options: [
      { label: "Si, con frecuencia", description: "Hay consultas que se enfrian antes de responder." },
      { label: "A veces", description: "Sucede cuando el equipo se satura." },
      { label: "No es el problema principal", description: "La fuga puede estar en otra parte del sistema." },
    ],
  },
  {
    id: "followUp",
    title: "Tienes un seguimiento comercial realmente ordenado?",
    helper: "Queremos saber si las oportunidades avanzan o quedan abiertas sin direccion.",
    options: [
      { label: "Si, hay un proceso claro", description: "Ya existe cierta disciplina comercial." },
      { label: "Lo hago de forma irregular", description: "Hay seguimiento, pero no siempre se sostiene." },
      { label: "Casi nunca", description: "Muchos prospectos se quedan sin siguiente paso." },
    ],
  },
  {
    id: "leadVolume",
    title: "Cuantas consultas recibes al mes?",
    helper: "El volumen cambia si conviene captar mas o responder mejor lo que ya llega.",
    options: [
      { label: "Menos de 30", description: "Cada oportunidad cuenta demasiado." },
      { label: "Entre 30 y 150", description: "Ya hay traccion para ordenar el proceso." },
      { label: "Mas de 150", description: "Sin sistema, la operacion se rompe rapido." },
    ],
  },
  {
    id: "goal",
    title: "Que te urge resolver primero?",
    helper: "Esta respuesta nos ayuda a elegir la capa que puede mover mas el negocio.",
    options: [
      { label: "Conseguir mas oportunidades", description: "Prioridad en adquisicion." },
      { label: "Responder mas rapido", description: "Prioridad en atencion automatica." },
      { label: "Cerrar mas clientes", description: "Prioridad en seguimiento y cierre." },
      { label: "Ordenar todo el proceso comercial", description: "Necesitas una solucion completa." },
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

  if (answers.usesWhatsapp === "Es el canal principal") score.automaticAttention += 3;
  if (answers.usesWhatsapp === "Es importante, pero no el unico") score.automaticAttention += 2;

  if (answers.salesTeam === "Yo respondo casi todo") {
    score.automaticAttention += 2;
    score.closing += 1;
  }
  if (answers.salesTeam === "Tengo una persona o equipo pequeno") {
    score.automaticAttention += 1;
    score.closing += 1;
  }
  if (answers.salesTeam === "Ya tengo equipo comercial") score.closing += 1;

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
  if (answers.goal === "Ordenar todo el proceso comercial") {
    score.acquisition += 2;
    score.automaticAttention += 2;
    score.closing += 2;
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
      summary: "Hay interes real, pero se pierde velocidad entre responder mejor y mover cada oportunidad al siguiente paso correcto.",
      priorityLayers,
      plan: landingPlans[1],
      note: "La mayor ganancia vendra de implementar un sistema corto para responder, filtrar y seguir con criterio.",
    };
  }

  if (primaryLayer === "acquisition" && secondaryLayer === "automaticAttention" && secondaryScore >= primaryScore - 1) {
    return {
      headline: "Tu mejor oportunidad esta en mejorar captacion y respuesta.",
      summary: "Necesitas atraer consultas mas utiles y asegurarte de que no se enfrien cuando llegan.",
      priorityLayers,
      plan: landingPlans[1],
      note: "Conviene empezar por una promesa comercial mas clara y una respuesta mas rapida.",
    };
  }

  if (primaryLayer === "automaticAttention") {
    return {
      headline: "Tu mayor cuello de botella esta en atencion automatica.",
      summary: "El negocio ya genera interes, pero la demora y la carga manual frenan conversiones y saturan al equipo.",
      priorityLayers,
      plan: recommendedPlan,
      note: "El diagnostico consultivo ayuda a validar si basta con empezar por esta capa o si ya conviene implementar el sistema completo.",
    };
  }

  if (primaryLayer === "closing") {
    return {
      headline: "Tu negocio necesita ordenar seguimiento y cierre.",
      summary: "Hay oportunidades activas, pero falta un sistema simple para priorizar, insistir y convertir mejor.",
      priorityLayers,
      plan: landingPlans[1],
      note: "La prioridad es mover cada prospecto con mejor timing, contexto y siguiente paso.",
    };
  }

  return {
    headline: "Tu mayor oportunidad esta en fortalecer adquisicion.",
    summary: "Antes de sumar mas operacion, necesitas mejorar como atraes oportunidades y con que mensaje llegas al mercado.",
    priorityLayers,
    plan: landingPlans[1],
    note: "Cuando captas mejor y respondes a tiempo, el resto del sistema escala con mucha mas claridad.",
  };
}
