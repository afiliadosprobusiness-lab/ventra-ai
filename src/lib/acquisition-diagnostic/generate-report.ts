import { commercialProblemMap, goalMap, objectionReframeMap, toneDescriptors } from "@/lib/acquisition-diagnostic/templates";
import { cleanUrlLabel, formatList, getTicketTier, getTodayLabel, normalizeSentence } from "@/lib/acquisition-diagnostic/helpers";
import type { AcquisitionDiagnosticInput, CampaignRecommendation, CreativeConcept, StrategicAngle, StrategicReport } from "@/lib/acquisition-diagnostic/types";

function inferPrimaryProblem(input: AcquisitionDiagnosticInput) {
  return input.commercialProblems[0] ?? "otro";
}

function inferMainObjections(input: AcquisitionDiagnosticInput) {
  return input.frequentObjections.length > 0 ? input.frequentObjections : ["lo-voy-a-pensar"];
}

function inferChannelRecommendation(input: AcquisitionDiagnosticInput) {
  const primaryChannel = input.primaryChannel.toLowerCase();
  const leadSources = input.leadSources.toLowerCase();

  if (primaryChannel.includes("google")) {
    return "Google Search + landing consultiva + agenda guiada";
  }

  if (input.runsAds === "yes" && (primaryChannel.includes("meta") || leadSources.includes("instagram"))) {
    return input.usesWhatsapp === "yes"
      ? "Meta Ads + WhatsApp qualification"
      : "Meta Ads + landing consultiva + agenda";
  }

  if (primaryChannel.includes("instagram") || leadSources.includes("instagram")) {
    return input.usesWhatsapp === "yes"
      ? "Instagram inbound + WhatsApp consultivo"
      : "Instagram inbound + landing de diagnostico";
  }

  if (leadSources.includes("referido")) {
    return "Campana de autoridad + landing consultiva para complementar referidos";
  }

  return input.usesWhatsapp === "yes"
    ? "Landing consultiva + WhatsApp qualification"
    : "Landing consultiva + agenda de diagnostico";
}

function inferCampaignType(input: AcquisitionDiagnosticInput) {
  if (input.primaryGoal === "mas-llamadas") return "Diagnostico estrategico con CTA a agenda";
  if (input.primaryGoal === "mejor-calidad") return "Filtro consultivo con cuestionario corto y CTA a evaluacion";
  if (input.primaryGoal === "mas-cierres") return "Promesa premium + prueba + CTA a conversacion";
  if (input.primaryGoal === "mejor-respuesta") return "Captacion con respuesta rapida y derivacion inmediata";

  return "Campana consultiva de captacion con calificacion inicial";
}

function buildPromise(input: AcquisitionDiagnosticInput) {
  const tone = toneDescriptors[input.brandTone] ?? toneDescriptors.elegante;
  const ticketTier = getTicketTier(input.averageTicket);
  const emphasis =
    ticketTier === "elite"
      ? "sin abaratar tu posicionamiento"
      : ticketTier === "high-ticket"
        ? "sin convertir tu oferta en una guerra de precios"
        : "sin agregar mas friccion comercial";

  return `Ayudamos a ${input.idealClientType.toLowerCase()} a pasar de ${input.currentSituation.toLowerCase()} a ${input.promisedTransformation.toLowerCase()}, con una narrativa ${tone.adjective} y ${emphasis}.`;
}

function buildPositioning(input: AcquisitionDiagnosticInput) {
  const ticketTier = getTicketTier(input.averageTicket);
  const positioningBase =
    ticketTier === "elite"
      ? "servicio de implementacion premium"
      : ticketTier === "high-ticket"
        ? "solucion consultiva high ticket"
        : "servicio consultivo con foco en claridad comercial";

  return `${normalizeSentence(input.businessName)} debe posicionarse como ${positioningBase} para ${input.idealClientType.toLowerCase()}, no como una opcion mas del mercado ${input.primaryMarket.toLowerCase()}.`;
}

function buildDiagnosisSignals(input: AcquisitionDiagnosticInput) {
  const primaryProblem = inferPrimaryProblem(input);
  const problemInsight = commercialProblemMap[primaryProblem] ?? commercialProblemMap.otro;
  const goalInsight = goalMap[input.primaryGoal] ?? goalMap["ordenar-estrategia"];
  const objectionInsight = inferMainObjections(input)
    .map((objection) => objectionReframeMap[objection] ?? objectionReframeMap.otro)
    .slice(0, 2);

  return [
    problemInsight.headline,
    `La prioridad comercial deberia ser ${goalInsight.focus}.`,
    ...objectionInsight,
  ].slice(0, 4);
}

function buildAngles(input: AcquisitionDiagnosticInput): StrategicAngle[] {
  const market = input.primaryMarket;
  const service = input.primaryService;
  const idealClient = input.idealClientType.toLowerCase();
  const pain = input.mainPain.toLowerCase();
  const desire = input.mainDesire.toLowerCase();

  return [
    {
      type: "Resultado",
      title: "Vender el cambio visible",
      description: `Abrir la campaña mostrando como ${service.toLowerCase()} ayuda a ${idealClient} a lograr ${desire} en ${market}.`,
    },
    {
      type: "Dolor",
      title: "Nombrar el costo de seguir igual",
      description: `Conectar con el dolor actual: ${pain}, para que la oportunidad se perciba como una correccion urgente y no como una mejora opcional.`,
    },
    {
      type: "Autoridad",
      title: "Posicionamiento desde criterio",
      description: `Usar un tono que proyecte que ${input.businessName} entiende el contexto de compra, objeciones y nivel de exigencia del cliente.`,
    },
    {
      type: "Urgencia",
      title: "Urgencia con contexto",
      description: `Empujar el siguiente paso mostrando que demorar la decision mantiene el problema ${pain} y retrasa ${desire}.`,
    },
    {
      type: "Simplicidad",
      title: "Menos complejidad, mas control",
      description: `Prometer una ruta simple de implementacion para que el prospecto no sienta que comprar ${service.toLowerCase()} implica caos operativo.`,
    },
    {
      type: "Diferenciacion",
      title: "Separarse del mercado ruidoso",
      description: `Presentar la oferta como una solucion consultiva que combina estrategia, criterio comercial y ejecucion, no solo una lista de entregables.`,
    },
  ];
}

function buildHooks(input: AcquisitionDiagnosticInput) {
  const channel = inferChannelRecommendation(input);
  const objections = inferMainObjections(input);

  return [
    `Si hoy ${input.mainPain.toLowerCase()}, no necesitas mas ruido: necesitas una captacion mejor orquestada.`,
    `Tu oferta no tiene que sonar mas barata para vender mejor ${input.primaryService.toLowerCase()}.`,
    `El problema no es solo conseguir leads. Es atraer oportunidades listas para ${input.preferredCta.toLowerCase()}.`,
    `Lo que hoy parece falta de ventas muchas veces es una promesa comercial poco concreta.`,
    `Si tu canal principal es ${input.primaryChannel.toLowerCase()}, tu mensaje deberia preparar el siguiente paso antes del primer contacto.`,
    `Canal recomendado: ${channel}. Porque hoy la estrategia debe responder a ${objections.map((item) => item.replace(/-/g, " ")).join(" y ")}.`,
  ];
}

function buildCopyPack(input: AcquisitionDiagnosticInput) {
  const tone = toneDescriptors[input.brandTone] ?? toneDescriptors.elegante;
  const cta = input.preferredCta;
  const promise = input.promisedTransformation.toLowerCase();
  const problem = input.mainPain.toLowerCase();
  const currentSituation = input.currentSituation.toLowerCase();
  const service = input.primaryService;

  return {
    short: `${normalizeSentence(input.businessName)} ayuda a ${input.idealClientType.toLowerCase()} a lograr ${promise} sin seguir atrapados en ${problem}.`,
    medium: `Si hoy ${currentSituation}, la salida no es sumar mas acciones sueltas. La salida es una propuesta ${tone.framing} que convierta interes en conversaciones mejor calificadas y empuje a ${cta.toLowerCase()}.`,
    long: `${normalizeSentence(input.businessName)} vende ${input.offerSummary.toLowerCase()} para un cliente que quiere ${input.mainDesire.toLowerCase()}, pero hoy convive con ${problem}. La estrategia sugerida es salir con una promesa mas fuerte alrededor de ${service.toLowerCase()}, usar un mensaje ${tone.framing} y llevar la conversacion hacia ${cta.toLowerCase()} para filtrar mejor, sostener autoridad y preparar el cierre desde el primer impacto.`,
    cta: `${cta} y revisa si tu caso tiene fit.`,
    whatsapp: `Hola, vi que estas evaluando ${service.toLowerCase()}. Si quieres, te comparto como estamos ayudando a perfiles similares a pasar de ${problem} a ${promise}.`,
  };
}

function buildAdIdeas(input: AcquisitionDiagnosticInput): CreativeConcept[] {
  return [
    {
      format: "Testimonio",
      title: "Cliente que ya vivio el cambio",
      description: `Caso corto mostrando como alguien con ${input.currentSituation.toLowerCase()} termino logrando ${input.mainDesire.toLowerCase()}.`,
    },
    {
      format: "Error comun",
      title: "El error que encarece la captacion",
      description: `Pieza que expone por que seguir vendiendo ${input.primaryService.toLowerCase()} desde lo tactico alimenta ${input.mainPain.toLowerCase()}.`,
    },
    {
      format: "Antes / despues",
      title: "De caos comercial a proceso claro",
      description: `Comparar el escenario actual del prospecto con la experiencia posterior a una estrategia mejor estructurada.`,
    },
    {
      format: "Autoridad",
      title: "Diagnostico experto",
      description: `Video o carrusel donde ${input.businessName} explica que señales detecta cuando una captacion no esta lista para vender tickets de ${input.averageTicket}.`,
    },
    {
      format: "Caso real",
      title: "Mini breakdown de oportunidad ganada",
      description: `Desmenuzar una situacion real donde mejorar mensaje, CTA y seguimiento destrabo una venta.`,
    },
    {
      format: "Objecion destruida",
      title: "Responder la resistencia dominante",
      description: `Concepto centrado en desmontar "${inferMainObjections(input)[0]?.replace(/-/g, " ")}" con framing, contexto y claridad.`,
    },
  ];
}

function buildCampaignRecommendation(input: AcquisitionDiagnosticInput): CampaignRecommendation {
  const primaryProblem = inferPrimaryProblem(input);
  const problemInsight = commercialProblemMap[primaryProblem] ?? commercialProblemMap.otro;
  const goalInsight = goalMap[input.primaryGoal] ?? goalMap["ordenar-estrategia"];
  const channel = inferChannelRecommendation(input);

  return {
    channel,
    campaignType: inferCampaignType(input),
    cta: input.preferredCta,
    focus: `La campaña inicial debe enfocarse en ${goalInsight.focus} y mover al prospecto a una accion concreta sin perder percepcion premium.`,
    justification: `${problemInsight.recommendation} La metrica mas importante al iniciar deberia ser ${goalInsight.metric}.`,
  };
}

export function generateStrategicReport(input: AcquisitionDiagnosticInput): StrategicReport {
  const linkLabel = input.websiteOrInstagram ? cleanUrlLabel(input.websiteOrInstagram) : "Presencia comercial en construccion";
  const objections = inferMainObjections(input).map((objection) => objection.replace(/-/g, " "));
  const campaignRecommendation = buildCampaignRecommendation(input);

  return {
    createdAt: getTodayLabel(),
    executiveSummary: `${normalizeSentence(input.businessName)} vende ${input.offerSummary.toLowerCase()} en ${input.primaryMarket}. Hoy la oportunidad mas clara es reorganizar la captacion para atraer mejores conversaciones alrededor de ${input.primaryService.toLowerCase()} y no seguir dependiendo de ${input.leadSources.toLowerCase()}.`,
    strategicThesis: `La tesis recomendada es convertir ${input.businessName} en una opcion mas clara y deseable para ${input.idealClientType.toLowerCase()}, combinando una promesa premium, angulos de venta concretos y una campana inicial enfocada en ${campaignRecommendation.cta.toLowerCase()}. Referencia visible: ${linkLabel}.`,
    businessSummary: {
      name: input.businessName,
      type: input.businessType,
      offer: input.offerSummary,
      ticket: input.averageTicket,
      market: input.primaryMarket,
    },
    diagnosisSignals: buildDiagnosisSignals(input),
    clientProfile: {
      avatar: `${normalizeSentence(input.idealClientType)} con perfil ${input.economicProfile.toLowerCase()} que hoy vive ${input.currentSituation.toLowerCase()}.`,
      pain: normalizeSentence(input.mainPain),
      desire: normalizeSentence(input.mainDesire),
      objections,
    },
    coreProposal: {
      promise: buildPromise(input),
      transformation: normalizeSentence(input.promisedTransformation),
      positioning: buildPositioning(input),
    },
    salesAngles: buildAngles(input),
    hooks: buildHooks(input),
    copyPack: buildCopyPack(input),
    adIdeas: buildAdIdeas(input),
    campaignRecommendation,
    nextSteps: [
      `Preparar una landing o activo principal alineado a "${input.preferredCta}".`,
      `Redactar la secuencia inicial de respuesta para ${input.usesWhatsapp === "yes" ? "WhatsApp" : "el canal de contacto principal"}.`,
      "Convertir los hooks y angulos sugeridos en 3 piezas de campana para test inicial.",
      `Alinear el proceso comercial para que ${formatList(input.commercialProblems.map((item) => item.replace(/-/g, " ")))} deje de frenar conversion.`,
      "Descargar el reporte, validarlo internamente y usarlo como brief de implementacion.",
    ],
  };
}
