import type { AcquisitionDiagnosticInput, DiagnosticFieldOption, DiagnosticStep } from "@/lib/acquisition-diagnostic/types";

const marketOptions: DiagnosticFieldOption[] = [
  { value: "Peru", label: "Peru", description: "Operacion principal en Peru." },
  { value: "Mexico", label: "Mexico", description: "Oferta orientada a Mexico." },
  { value: "Chile", label: "Chile", description: "Captacion activa en Chile." },
  { value: "Colombia", label: "Colombia", description: "Mercado principal en Colombia." },
  { value: "Latam", label: "Latam", description: "Captacion multi-pais en Latam." },
  { value: "Estados Unidos hispano", label: "US hispano", description: "Oferta para audiencia hispana en Estados Unidos." },
];

const businessTypeOptions: DiagnosticFieldOption[] = [
  { value: "clinica", label: "Clinica o centro", description: "Servicios de salud, estetica o bienestar." },
  { value: "consultoria", label: "Consultoria", description: "Servicios expertos y transformacion consultiva." },
  { value: "agencia", label: "Agencia", description: "Servicios creativos, marketing o growth." },
  { value: "educacion", label: "Educacion premium", description: "Mentorias, programas o formacion high ticket." },
  { value: "legal", label: "Servicios legales", description: "Despachos, firmas o asesoria legal." },
  { value: "otro-servicio", label: "Otro servicio", description: "Negocio de servicios con ticket medio o alto." },
];

const commercialProblemOptions: DiagnosticFieldOption[] = [
  { value: "no-llegan-leads", label: "No llegan suficientes leads", description: "La demanda es baja o intermitente." },
  { value: "leads-malos", label: "Llegan leads malos", description: "Entra volumen, pero no con buen encaje." },
  { value: "respuesta-lenta", label: "Respondo tarde", description: "Se enfria la oportunidad antes del primer toque." },
  { value: "no-agendan", label: "No me agendan", description: "Preguntan, pero no avanzan a llamada o diagnostico." },
  { value: "no-cierran", label: "Me preguntan pero no cierran", description: "Hay interes, pero el cierre se cae." },
  { value: "seguimiento-debil", label: "No hago buen seguimiento", description: "El pipeline pierde continuidad." },
  { value: "otro", label: "Otro", description: "Existe otro cuello comercial mas especifico." },
];

const objectionOptions: DiagnosticFieldOption[] = [
  { value: "esta-caro", label: "Esta caro", description: "El precio genera resistencia." },
  { value: "lo-voy-a-pensar", label: "Lo voy a pensar", description: "Necesitan mas conviccion para decidir." },
  { value: "mandame-info", label: "Mandame informacion", description: "Piden detalles sin avanzar de verdad." },
  { value: "no-tengo-tiempo", label: "No tengo tiempo", description: "La urgencia actual compite con la compra." },
  { value: "no-estoy-listo", label: "No estoy listo", description: "No ven el momento correcto para empezar." },
  { value: "consultarlo", label: "Dejame consultarlo", description: "La decision depende de terceros." },
  { value: "otro", label: "Otro", description: "Hay objeciones adicionales propias del negocio." },
];

const goalOptions: DiagnosticFieldOption[] = [
  { value: "mas-leads", label: "Conseguir mas leads", description: "Prioridad total en volumen." },
  { value: "mejor-calidad", label: "Mejor calidad", description: "Filtrar mejor antes de vender." },
  { value: "mejor-respuesta", label: "Mejorar respuesta", description: "Reducir friccion en el primer contacto." },
  { value: "mas-llamadas", label: "Agendar mas llamadas", description: "Mover mas oportunidades a discovery." },
  { value: "mas-cierres", label: "Cerrar mas ventas", description: "Hacer que el pipeline convierta mejor." },
  { value: "ordenar-estrategia", label: "Ordenar estrategia", description: "Alinear mensaje, canal y seguimiento." },
];

const toneOptions: DiagnosticFieldOption[] = [
  { value: "directo", label: "Directo", description: "Claro, frontal y orientado a accion." },
  { value: "elegante", label: "Elegante", description: "Premium, sobrio y con autoridad." },
  { value: "agresivo", label: "Agresivo", description: "Intenso, urgente y competitivo." },
  { value: "cercano", label: "Cercano", description: "Humano, explicativo y accesible." },
];

const yesNoOptions: DiagnosticFieldOption[] = [
  { value: "yes", label: "Si", description: "Ya forma parte del flujo actual." },
  { value: "no", label: "No", description: "Todavia no se usa en el flujo." },
];

const salesModelOptions: DiagnosticFieldOption[] = [
  { value: "solo", label: "Vendo solo", description: "El founder o especialista lleva la venta." },
  { value: "equipo", label: "Tengo equipo comercial", description: "Hay vendedores o closers en el proceso." },
  { value: "mixto", label: "Modelo mixto", description: "Founder + equipo participan en el cierre." },
];

const styleOptions: DiagnosticFieldOption[] = [
  { value: "consultivo", label: "Consultivo", description: "Educar, filtrar y diagnosticar antes de vender." },
  { value: "premium", label: "Premium", description: "Posicionamiento aspiracional y serio." },
  { value: "practico", label: "Practico", description: "Resolver con claridad y cero rodeos." },
  { value: "retador", label: "Retador", description: "Cuestionar el status quo del prospecto." },
];

export const initialDiagnosticInput: AcquisitionDiagnosticInput = {
  businessName: "",
  businessType: "",
  industry: "",
  primaryMarket: "Peru",
  websiteOrInstagram: "",
  offerSummary: "",
  averageTicket: "",
  primaryService: "",
  secondaryService: "",
  promisedTransformation: "",
  idealClientType: "",
  economicProfile: "",
  currentSituation: "",
  mainPain: "",
  mainDesire: "",
  commercialProblems: [],
  leadSources: "",
  primaryChannel: "",
  usesWhatsapp: "yes",
  usesCalls: "yes",
  salesModel: "",
  runsAds: "no",
  frequentObjections: [],
  primaryGoal: "",
  brandTone: "",
  communicationStyle: "",
  preferredCta: "",
  commercialStyle: "",
};

export const generationMoments = [
  "Estamos analizando tu negocio y el contexto comercial actual.",
  "Estamos definiendo la promesa, el angulo y la narrativa de captacion.",
  "Estamos armando tu entregable premium con enfoque de implementacion.",
];

export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "business",
    eyebrow: "Paso 01",
    title: "Base del negocio",
    description: "Ubicamos el negocio, su mercado y la referencia publica que hoy sostiene la percepcion comercial.",
    outcome: "Esto nos ayuda a redactar la estrategia con contexto real de oferta y mercado.",
    fields: [
      { id: "businessName", label: "Nombre del negocio", type: "text", placeholder: "Ej. Aura Clinic" },
      { id: "businessType", label: "Tipo de negocio", type: "choice", options: businessTypeOptions },
      { id: "industry", label: "Sector o nicho", type: "text", placeholder: "Ej. Medicina estetica" },
      { id: "primaryMarket", label: "Mercado principal", type: "select", options: marketOptions },
      { id: "websiteOrInstagram", label: "Web o Instagram", type: "url", placeholder: "aura-clinic.com o @aura.clinic", optional: true },
    ],
  },
  {
    id: "offer",
    eyebrow: "Paso 02",
    title: "Oferta principal",
    description: "Definimos exactamente que vendes, a que nivel economico y que transformacion prometes.",
    outcome: "La promesa comercial se construye desde esta base, no desde copies aislados.",
    fields: [
      { id: "offerSummary", label: "Que vendes exactamente", type: "textarea", placeholder: "Describe el servicio principal y como lo empaquetas." },
      { id: "averageTicket", label: "Ticket promedio", type: "text", placeholder: "Ej. USD 2,500" },
      { id: "primaryService", label: "Servicio principal", type: "text", placeholder: "Ej. Tratamiento integral de rejuvenecimiento" },
      { id: "secondaryService", label: "Servicio secundario", type: "text", placeholder: "Ej. Plan de mantenimiento trimestral", optional: true },
      { id: "promisedTransformation", label: "Transformacion o resultado que promete", type: "textarea", placeholder: "Ej. Ayudamos a ejecutivos a verse mas frescos sin cirugia." },
    ],
  },
  {
    id: "client",
    eyebrow: "Paso 03",
    title: "Cliente ideal",
    description: "Aterrizamos a quien quieres atraer, en que situacion esta y que cambio espera comprar.",
    outcome: "El reporte final va a hablarle al cliente correcto, no a un publico generico.",
    fields: [
      { id: "idealClientType", label: "Tipo de cliente ideal", type: "text", placeholder: "Ej. Fundadores de clinicas odontologicas" },
      { id: "economicProfile", label: "Nivel economico o perfil", type: "text", placeholder: "Ej. Ticket alto, decision rapida y foco en ROI" },
      { id: "currentSituation", label: "Situacion actual del cliente", type: "textarea", placeholder: "Ej. Tiene demanda, pero depende demasiado de referidos y WhatsApp." },
      { id: "mainPain", label: "Principal dolor", type: "textarea", placeholder: "Ej. Llegan contactos frios y sin urgencia real." },
      { id: "mainDesire", label: "Principal deseo", type: "textarea", placeholder: "Ej. Tener mas citas calificadas y cerrar con mas consistencia." },
    ],
  },
  {
    id: "problem",
    eyebrow: "Paso 04",
    title: "Problema comercial actual",
    description: "Marcamos donde se rompe el flujo hoy para enfocar la recomendacion en un cuello concreto.",
    outcome: "Ventra AI prioriza la estrategia a partir del problema que hoy mas frena crecimiento.",
    fields: [
      {
        id: "commercialProblems",
        label: "Que esta frenando hoy la captacion",
        type: "multi-choice",
        options: commercialProblemOptions,
        maxSelections: 3,
      },
    ],
  },
  {
    id: "process",
    eyebrow: "Paso 05",
    title: "Proceso comercial actual",
    description: "Entendemos por donde entra la demanda, como se atiende y que tan lista esta la operacion para captarla mejor.",
    outcome: "Esto define canal sugerido, CTA y tipo de campana inicial.",
    fields: [
      { id: "leadSources", label: "De donde llegan los leads hoy", type: "textarea", placeholder: "Ej. Instagram organico, referidos y Meta Ads" },
      { id: "primaryChannel", label: "Canal principal actual", type: "text", placeholder: "Ej. WhatsApp desde Instagram" },
      { id: "usesWhatsapp", label: "Usan WhatsApp", type: "choice", options: yesNoOptions },
      { id: "usesCalls", label: "Usan llamadas", type: "choice", options: yesNoOptions },
      { id: "salesModel", label: "Quien vende hoy", type: "choice", options: salesModelOptions },
      { id: "runsAds", label: "Ya hacen anuncios", type: "choice", options: yesNoOptions },
    ],
  },
  {
    id: "objections",
    eyebrow: "Paso 06",
    title: "Objeciones frecuentes",
    description: "Elegimos las resistencias que mas aparecen para afinar hooks, copys y framing de la propuesta.",
    outcome: "El reporte usara estas objeciones para dar respuesta comercial anticipada.",
    fields: [
      {
        id: "frequentObjections",
        label: "Objeciones mas repetidas",
        type: "multi-choice",
        options: objectionOptions,
        maxSelections: 3,
      },
    ],
  },
  {
    id: "goal",
    eyebrow: "Paso 07",
    title: "Meta principal",
    description: "Definimos la prioridad real del negocio para que la campana responda a una sola intencion fuerte.",
    outcome: "La recomendacion final va a estar alineada con un objetivo comercial tangible.",
    fields: [
      { id: "primaryGoal", label: "Meta principal", type: "choice", options: goalOptions },
    ],
  },
  {
    id: "communication",
    eyebrow: "Paso 08",
    title: "Estilo de comunicacion",
    description: "Ajustamos el tono de la marca, el estilo comercial y el CTA que la estrategia debe empujar.",
    outcome: "El entregable sale listo para convertirse luego en anuncios, copies y secuencias.",
    fields: [
      { id: "brandTone", label: "Tono de marca", type: "choice", options: toneOptions },
      { id: "communicationStyle", label: "Estilo de voz deseado", type: "choice", options: styleOptions },
      { id: "preferredCta", label: "CTA preferido", type: "text", placeholder: "Ej. Agenda tu diagnostico" },
      { id: "commercialStyle", label: "Estilo comercial deseado", type: "textarea", placeholder: "Ej. Consultivo, premium y con foco en claridad." },
    ],
  },
];
