export type FunnelLayerId = "acquisition" | "automaticAttention" | "closing";

export type FunnelChoiceOption = {
  value: string;
  label: string;
  description: string;
  badge?: string;
};

export type FunnelChoiceStep = {
  id: string;
  type: "single-choice";
  title: string;
  helper: string;
  layout?: "stack" | "grid";
  options: FunnelChoiceOption[];
};

export type FunnelContactField = {
  id: keyof FunnelLeadProfile;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "url";
  required?: boolean;
};

export type FunnelContactStep = {
  id: "contact";
  type: "contact";
  title: string;
  helper: string;
  fields: FunnelContactField[];
};

export type FunnelQuizStep = FunnelChoiceStep | FunnelContactStep;

export type FunnelLeadProfile = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  website: string;
};

export type FunnelDiagnosis = {
  headline: string;
  summary: string;
  focus: FunnelLayerId;
  focusLabel: string;
  supportingLayers: string[];
  recommendedPlan: "basic" | "complete";
  recommendedPlanLabel: string;
  implementationLabel: string;
  implementationPrice: string;
  idealFitLabel: string;
  transitionTitle: string;
  transitionBody: string;
  outcomeHighlights: string[];
};

export type FunnelNextStep = {
  id: string;
  label: string;
  href: string;
  kind: "primary" | "secondary" | "tertiary";
  description: string;
};

const layerLabelMap: Record<FunnelLayerId, string> = {
  acquisition: "Adquisicion",
  automaticAttention: "Atencion automatica",
  closing: "Cierre",
};

export const funnelQuizSteps: FunnelQuizStep[] = [
  {
    id: "businessType",
    type: "single-choice",
    title: "Que tipo de negocio quieres hacer vender mejor?",
    helper: "Necesitamos contexto para entender el tipo de conversacion y el ritmo comercial.",
    options: [
      {
        value: "services",
        label: "Servicios y ventas consultivas",
        description: "Propuestas, reuniones, cierres por llamada o WhatsApp.",
      },
      {
        value: "commerce",
        label: "E-commerce o retail",
        description: "Consultas frecuentes, tickets variados y volumen constante.",
      },
      {
        value: "high-trust",
        label: "Salud, educacion o inmobiliaria",
        description: "Negocios donde confianza y seguimiento pesan mucho.",
      },
      {
        value: "other",
        label: "Otro negocio que vende por mensajes",
        description: "Instagram, WhatsApp, DM o formularios como canal principal.",
      },
    ],
  },
  {
    id: "leadSource",
    type: "single-choice",
    title: "Como te llegan hoy la mayoria de consultas o leads?",
    helper: "Esto nos ayuda a detectar si el cuello de botella esta en captar o en gestionar mejor la demanda.",
    layout: "grid",
    options: [
      {
        value: "ads",
        label: "Anuncios y campanas",
        description: "Ya inviertes en adquisicion y necesitas que convierta mejor.",
      },
      {
        value: "messaging",
        label: "WhatsApp, Instagram o DM",
        description: "Las oportunidades llegan por conversacion directa.",
      },
      {
        value: "referrals",
        label: "Referidos u organico",
        description: "Hay interes, pero no un sistema comercial claro.",
      },
      {
        value: "low-demand",
        label: "Me llegan muy pocas consultas",
        description: "Primero hay que fortalecer captacion y propuesta.",
      },
    ],
  },
  {
    id: "mainPain",
    type: "single-choice",
    title: "Que problema te esta frenando mas hoy?",
    helper: "Esta respuesta define la capa con mayor impacto inmediato.",
    layout: "grid",
    options: [
      {
        value: "lead-generation",
        label: "No estoy generando suficientes oportunidades",
        description: "Necesitas mejorar mensaje, captacion y campanas.",
        badge: "Adquisicion",
      },
      {
        value: "slow-response",
        label: "Respondo tarde y se enfria el interes",
        description: "La atencion manual ya no da velocidad suficiente.",
        badge: "Atencion automatica",
      },
      {
        value: "follow-up",
        label: "Pierdo ventas por falta de seguimiento",
        description: "Las conversaciones no avanzan con siguiente paso claro.",
        badge: "Cierre",
      },
      {
        value: "mixed",
        label: "Tengo varios cuellos de botella al mismo tiempo",
        description: "Hay fuga entre captacion, respuesta y cierre.",
        badge: "Sistema completo",
      },
    ],
  },
  {
    id: "currentResponder",
    type: "single-choice",
    title: "Quien responde hoy a tus prospectos?",
    helper: "Queremos medir cuanto depende el negocio de operacion manual.",
    options: [
      {
        value: "owner",
        label: "Yo respondo casi todo",
        description: "La venta depende demasiado del dueno o fundador.",
      },
      {
        value: "small-team",
        label: "Tengo una persona o equipo pequeno",
        description: "Hay soporte, pero con capacidad limitada.",
      },
      {
        value: "sales-team",
        label: "Ya tengo equipo comercial",
        description: "El reto suele ser orden, velocidad y consistencia.",
      },
    ],
  },
  {
    id: "leadVolume",
    type: "single-choice",
    title: "Cuantas consultas recibes aproximadamente al mes?",
    helper: "El volumen cambia si conviene empezar por captar mas o por ordenar mejor lo que ya entra.",
    options: [
      {
        value: "low",
        label: "Menos de 30",
        description: "Cada oportunidad cuenta demasiado.",
      },
      {
        value: "medium",
        label: "Entre 30 y 150",
        description: "Ya hay suficiente traccion para montar un sistema util.",
      },
      {
        value: "high",
        label: "Mas de 150",
        description: "La operacion se rompe rapido si todo sigue manual.",
      },
    ],
  },
  {
    id: "primaryGoal",
    type: "single-choice",
    title: "Cual es tu objetivo principal en este momento?",
    helper: "Buscamos la palanca comercial mas urgente para tu negocio.",
    layout: "grid",
    options: [
      {
        value: "more-leads",
        label: "Conseguir mas leads",
        description: "Quiero atraer mas oportunidades calificadas.",
      },
      {
        value: "faster-replies",
        label: "Responder mas rapido",
        description: "No quiero perder consultas por demora.",
      },
      {
        value: "close-more",
        label: "Cerrar mas ventas",
        description: "Necesito mover mejor cada prospecto al cierre.",
      },
      {
        value: "recover-opps",
        label: "Recuperar oportunidades",
        description: "Quiero rescatar conversaciones que se quedaron abiertas.",
      },
    ],
  },
  {
    id: "whatsappImportance",
    type: "single-choice",
    title: "Que tan importante es WhatsApp en tu proceso comercial?",
    helper: "La automatizacion tiene mas impacto cuando las conversaciones viven ahi.",
    options: [
      {
        value: "critical",
        label: "Es totalmente clave",
        description: "La mayoria de consultas y cierres pasa por WhatsApp.",
      },
      {
        value: "relevant",
        label: "Es importante, pero no el unico canal",
        description: "Se combina con formulario, Instagram o llamadas.",
      },
      {
        value: "low",
        label: "No pesa tanto hoy",
        description: "El problema puede estar mas en captacion o cierre.",
      },
    ],
  },
  {
    id: "salesModel",
    type: "single-choice",
    title: "Vendes solo o tienes equipo?",
    helper: "Esto cambia el tipo de sistema que conviene montar primero.",
    options: [
      {
        value: "solo",
        label: "Vendo casi solo",
        description: "Necesito liberar tiempo operativo y no perseguir todo manualmente.",
      },
      {
        value: "small-team",
        label: "Tengo un equipo pequeno",
        description: "Quiero que el equipo responda y haga seguimiento mejor.",
      },
      {
        value: "structured-team",
        label: "Tengo un equipo comercial armado",
        description: "Necesito mas orden y conversion en el proceso.",
      },
    ],
  },
  {
    id: "startingLayer",
    type: "single-choice",
    title: "Que solucion te interesaria implementar primero si encaja contigo?",
    helper: "Tomamos en cuenta preferencia, pero la recomendacion final sigue siendo consultiva.",
    layout: "grid",
    options: [
      {
        value: "acquisition",
        label: "Mejorar adquisicion",
        description: "Campanas, hooks y mensajes para atraer mejor.",
      },
      {
        value: "automaticAttention",
        label: "Automatizar la atencion",
        description: "Responder prospectos y filtrar mejor sin hacerlo todo manual.",
      },
      {
        value: "closing",
        label: "Ordenar seguimiento y cierre",
        description: "Priorizar leads y convertir mas conversaciones.",
      },
      {
        value: "complete",
        label: "Quiero una solucion completa",
        description: "Atraer, atender y cerrar con un mismo sistema comercial.",
      },
    ],
  },
  {
    id: "contact",
    type: "contact",
    title: "Ultimo paso: danos tus datos para dejar lista tu recomendacion",
    helper: "Esto nos ayuda a personalizar la propuesta y filtrar curiosos sin interes real.",
    fields: [
      { id: "name", label: "Nombre", placeholder: "Tu nombre", required: true },
      { id: "company", label: "Empresa", placeholder: "Nombre de tu negocio", required: true },
      { id: "whatsapp", label: "WhatsApp", placeholder: "+51 999 999 999", type: "tel", required: true },
      { id: "email", label: "Email", placeholder: "correo@empresa.com", type: "email", required: true },
      { id: "website", label: "Instagram o web", placeholder: "instagram.com/tuempresa o sitio web", type: "url" },
    ],
  },
];

export const funnelTransitionChecklist = [
  "Cruzando tus respuestas con la estructura comercial recomendada.",
  "Definiendo por que capa conviene empezar en tu caso.",
  "Preparando el siguiente paso para implementar el sistema sin friccion.",
  "Dejando lista la explicacion corta antes de la oferta final.",
];

export const funnelVideoConfig = {
  title: "Tu diagnostico esta listo. Mira este video corto antes de avanzar.",
  subtitle:
    "Primero entiende la logica de implementacion. El siguiente paso se desbloquea solo cuando consumas la explicacion completa.",
  eyebrow: "Paso clave",
  overlayTitle: "Tu video ya ha comenzado",
  overlayBody: "Haz clic para escuchar y desbloquear el siguiente paso.",
  source: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  unlockThreshold: 85,
};

export const funnelOfferContent = {
  badge: "Implementacion guiada",
  title: "Tu siguiente paso no es comprar software. Es montar un sistema comercial que realmente venda mejor.",
  summary:
    "La implementacion esta pensada para negocios que quieren mas orden comercial, menos dependencia operativa y un proceso claro para atraer, atender y cerrar.",
  benefits: [
    "Sistema para atraer clientes con una propuesta y campanas mas claras.",
    "Atencion automatica para responder consultas sin depender de operacion manual.",
    "Seguimiento comercial con mas criterio, prioridad y empuje al cierre.",
    "Menos trabajo repetitivo y mas foco del equipo en vender.",
    "Mejor organizacion comercial para que el interes no se enfrie.",
    "Implementacion guiada para salir rapido de la improvisacion.",
  ],
  includes: [
    "Diagnostico inicial y recomendacion de capa prioritaria.",
    "Configuracion base del sistema comercial de Ventra.",
    "Estructura inicial de captacion, atencion y seguimiento.",
    "Automatizacion inicial lista para ser adaptada al negocio.",
    "Acceso a comunidad base y recursos de arranque.",
    "Ruta preparada para upgrades o implementacion avanzada.",
  ],
  fitBullets: [
    "Negocios que ya reciben consultas y quieren responder mejor.",
    "Equipos comerciales pequenos o fundadores que venden casi solos.",
    "Empresas que hacen marketing, pero sienten fuga en la conversion.",
  ],
  priceLabel: "Implementacion desde 1000 USD",
};

export const funnelNextSteps: FunnelNextStep[] = [
  {
    id: "implementation",
    label: "Aplicar a la implementacion",
    href: "/register?intent=implementation",
    kind: "primary",
    description: "Continua hacia el siguiente paso formal para activar la implementacion.",
  },
  {
    id: "community",
    label: "Conocer la comunidad base",
    href: "/register?intent=community",
    kind: "secondary",
    description: "Entra primero a la comunidad gratuita y luego escala con modulos avanzados.",
  },
  {
    id: "call",
    label: "Solicitar llamada de evaluacion",
    href: "mailto:hola@ventra.ai?subject=Evaluacion%20Ventra%20AI",
    kind: "tertiary",
    description: "Si prefieres validar encaje antes, puedes pedir una llamada de evaluacion.",
  },
];

function scoreAnswers(answers: Record<string, string>) {
  const score: Record<FunnelLayerId, number> = {
    acquisition: 0,
    automaticAttention: 0,
    closing: 0,
  };

  if (answers.leadSource === "low-demand") {
    score.acquisition += 4;
  }
  if (answers.leadSource === "ads") {
    score.acquisition += 1;
    score.closing += 1;
  }
  if (answers.leadSource === "messaging") {
    score.automaticAttention += 2;
  }
  if (answers.leadSource === "referrals") {
    score.acquisition += 1;
    score.closing += 2;
  }

  if (answers.mainPain === "lead-generation") score.acquisition += 5;
  if (answers.mainPain === "slow-response") score.automaticAttention += 5;
  if (answers.mainPain === "follow-up") score.closing += 5;
  if (answers.mainPain === "mixed") {
    score.acquisition += 2;
    score.automaticAttention += 2;
    score.closing += 2;
  }

  if (answers.currentResponder === "owner") {
    score.automaticAttention += 2;
    score.closing += 1;
  }
  if (answers.currentResponder === "small-team") {
    score.automaticAttention += 1;
    score.closing += 2;
  }
  if (answers.currentResponder === "sales-team") {
    score.closing += 2;
  }

  if (answers.leadVolume === "low") {
    score.acquisition += 2;
  }
  if (answers.leadVolume === "medium") {
    score.automaticAttention += 2;
    score.closing += 1;
  }
  if (answers.leadVolume === "high") {
    score.automaticAttention += 3;
    score.closing += 3;
  }

  if (answers.primaryGoal === "more-leads") score.acquisition += 4;
  if (answers.primaryGoal === "faster-replies") score.automaticAttention += 4;
  if (answers.primaryGoal === "close-more") score.closing += 4;
  if (answers.primaryGoal === "recover-opps") {
    score.automaticAttention += 2;
    score.closing += 3;
  }

  if (answers.whatsappImportance === "critical") score.automaticAttention += 4;
  if (answers.whatsappImportance === "relevant") score.automaticAttention += 2;
  if (answers.whatsappImportance === "low") score.acquisition += 1;

  if (answers.salesModel === "solo") {
    score.automaticAttention += 2;
    score.acquisition += 1;
  }
  if (answers.salesModel === "small-team") {
    score.automaticAttention += 1;
    score.closing += 2;
  }
  if (answers.salesModel === "structured-team") {
    score.closing += 2;
  }

  if (answers.startingLayer === "acquisition") score.acquisition += 2;
  if (answers.startingLayer === "automaticAttention") score.automaticAttention += 2;
  if (answers.startingLayer === "closing") score.closing += 2;
  if (answers.startingLayer === "complete") {
    score.acquisition += 1;
    score.automaticAttention += 1;
    score.closing += 1;
  }

  return score;
}

export function diagnoseVentraLead(answers: Record<string, string>, profile: FunnelLeadProfile): FunnelDiagnosis {
  const score = scoreAnswers(answers);
  const ranked = (Object.entries(score) as Array<[FunnelLayerId, number]>).sort((a, b) => b[1] - a[1]);
  const [primaryLayer, primaryScore] = ranked[0];
  const [secondaryLayer, secondaryScore] = ranked[1];

  const hasHighVolume = answers.leadVolume === "high";
  const hasMixedPain = answers.mainPain === "mixed";
  const needsComplete = hasMixedPain || hasHighVolume || primaryScore - secondaryScore <= 1 || answers.startingLayer === "complete";
  const recommendedPlan = primaryLayer === "automaticAttention" && !needsComplete ? "basic" : "complete";
  const supportingLayers = ranked.slice(0, 2).map(([layer]) => layerLabelMap[layer]);
  const firstName = profile.name.trim().split(" ")[0] || "Tu negocio";

  if (primaryLayer === "acquisition" && recommendedPlan === "complete") {
    return {
      headline: `${firstName}, tu mejor oportunidad esta en mejorar captacion y respuesta al mismo tiempo.`,
      summary:
        "Hoy necesitas atraer oportunidades mas claras y asegurarte de que no se enfrien cuando llegan. La mayor ganancia viene de conectar adquisicion con atencion automatica desde el inicio.",
      focus: primaryLayer,
      focusLabel: layerLabelMap[primaryLayer],
      supportingLayers,
      recommendedPlan,
      recommendedPlanLabel: "Solucion completa recomendada",
      implementationLabel: "Implementacion completa Ventra",
      implementationPrice: "1000 USD",
      idealFitLabel: "Buen encaje si quieres una maquina comercial mas ordenada, no una herramienta suelta.",
      transitionTitle: "Tu diagnostico apunta a una implementacion mas integral.",
      transitionBody: "Te mostraremos primero la forma correcta de montar captacion, atencion y cierre sin inflar el sistema.",
      outcomeHighlights: [
        "Mas oportunidades calificadas",
        "Respuestas mas rapidas cuando entra interes",
        "Seguimiento mas claro hasta el cierre",
      ],
    };
  }

  if (primaryLayer === "acquisition") {
    return {
      headline: `${firstName}, el primer cuello de botella esta en adquisicion.`,
      summary:
        "Tu negocio necesita una promesa comercial mas clara para atraer mejores consultas y no depender solo de organico o improvisacion.",
      focus: primaryLayer,
      focusLabel: layerLabelMap[primaryLayer],
      supportingLayers,
      recommendedPlan,
      recommendedPlanLabel: "Solucion completa recomendada",
      implementationLabel: "Implementacion comercial Ventra",
      implementationPrice: "1000 USD",
      idealFitLabel: "Tiene sentido si ya quieres dejar de depender de mensajes dispersos o captacion inestable.",
      transitionTitle: "Tu recomendacion ya esta lista.",
      transitionBody: "Ahora te mostraremos la forma mas directa de convertir mejor la demanda que vas a empezar a generar.",
      outcomeHighlights: [
        "Campanas y hooks mas claros",
        "Mejor calidad de lead",
        "Base comercial lista para escalar",
      ],
    };
  }

  if (primaryLayer === "closing") {
    return {
      headline: `${firstName}, el dinero hoy se esta escapando en seguimiento y cierre.`,
      summary:
        "Ya existe interes real, pero falta un sistema simple para priorizar leads, insistir con contexto y empujar cada oportunidad hacia el siguiente paso correcto.",
      focus: primaryLayer,
      focusLabel: layerLabelMap[primaryLayer],
      supportingLayers,
      recommendedPlan: "complete",
      recommendedPlanLabel: "Solucion completa recomendada",
      implementationLabel: "Implementacion de cierre Ventra",
      implementationPrice: "1000 USD",
      idealFitLabel: "Encaja si tu negocio ya habla con prospectos, pero no convierte todo lo que podria.",
      transitionTitle: "Tu diagnostico ya tiene una prioridad clara.",
      transitionBody: "Antes de avanzar, mira la explicacion corta de como ordenamos seguimiento, prioridad y conversion.",
      outcomeHighlights: [
        "Seguimiento mas disciplinado",
        "Mejor priorizacion de leads",
        "Mas cierres con menos improvisacion",
      ],
    };
  }

  return {
    headline: `${firstName}, tu mayor cuello de botella esta en atencion automatica.`,
    summary:
      "Ya hay interes, pero la demora y la carga manual frenan conversiones. Si respondes mas rapido y filtras mejor, el negocio gana velocidad sin crecer en caos operativo.",
    focus: primaryLayer,
    focusLabel: layerLabelMap[primaryLayer],
    supportingLayers,
    recommendedPlan,
    recommendedPlanLabel: recommendedPlan === "basic" ? "Plan basico recomendado" : "Solucion completa recomendada",
    implementationLabel: "Implementacion de atencion Ventra",
    implementationPrice: "1000 USD",
    idealFitLabel: "Ideal si WhatsApp pesa mucho en tu venta y hoy todo depende de responder a mano.",
    transitionTitle: "Tu recomendacion esta enfocada en responder mejor y filtrar mas rapido.",
    transitionBody: "Te mostraremos primero la logica de implementacion para que entiendas si esto encaja antes de avanzar.",
    outcomeHighlights: [
      "Respuesta mas rapida",
      "Menos fuga por demora",
      "Mas tiempo del equipo para vender",
    ],
  };
}
