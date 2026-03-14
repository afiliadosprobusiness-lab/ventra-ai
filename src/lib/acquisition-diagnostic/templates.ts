export const commercialProblemMap: Record<string, { headline: string; recommendation: string }> = {
  "no-llegan-leads": {
    headline: "Hay un problema de volumen y visibilidad inicial.",
    recommendation: "Necesitas una oferta mas facil de entender y una entrada consultiva que capture demanda con menos friccion.",
  },
  "leads-malos": {
    headline: "El negocio esta atrayendo interes, pero no con suficiente encaje.",
    recommendation: "La prioridad es filtrar mejor desde el mensaje y el CTA para no pagar conversaciones que no califican.",
  },
  "respuesta-lenta": {
    headline: "La demanda se enfria antes de recibir direccion comercial.",
    recommendation: "Conviene mover la estrategia hacia respuesta rapida, CTA claro y seguimiento inmediato.",
  },
  "no-agendan": {
    headline: "La conversacion inicial no empuja al siguiente compromiso.",
    recommendation: "La campana debe vender el valor del diagnostico o llamada, no solo el servicio final.",
  },
  "no-cierran": {
    headline: "Hay interes, pero la propuesta no termina de convertir.",
    recommendation: "Hace falta una promesa mejor estructurada y mas manejo de objeciones desde la captacion.",
  },
  "seguimiento-debil": {
    headline: "El pipeline pierde oportunidades por falta de continuidad.",
    recommendation: "La salida recomendada debe incluir CTA y mensajes que faciliten un siguiente paso automatico.",
  },
  otro: {
    headline: "Existe un cuello comercial particular que hoy limita la captacion.",
    recommendation: "La recomendacion se enfoca en clarificar el mensaje para recuperar control del proceso comercial.",
  },
};

export const goalMap: Record<string, { focus: string; metric: string }> = {
  "mas-leads": {
    focus: "abrir mas conversaciones calificadas sin degradar posicionamiento",
    metric: "volumen de diagnosticos iniciados",
  },
  "mejor-calidad": {
    focus: "atraer menos curiosos y mas oportunidades con fit real",
    metric: "ratio de leads calificados sobre leads totales",
  },
  "mejor-respuesta": {
    focus: "acortar tiempo entre interes y primer contacto comercial",
    metric: "tiempo de respuesta y continuidad de follow-up",
  },
  "mas-llamadas": {
    focus: "mover mas leads hacia discovery o llamada consultiva",
    metric: "agendamientos sobre conversaciones iniciadas",
  },
  "mas-cierres": {
    focus: "subir la conversion desde la captacion hasta la venta",
    metric: "cierres por cohorte de leads captados",
  },
  "ordenar-estrategia": {
    focus: "alinear promesa, canal, CTA y proceso comercial en una sola direccion",
    metric: "claridad de propuesta y consistencia operativa",
  },
};

export const objectionReframeMap: Record<string, string> = {
  "esta-caro": "Hay que justificar el valor antes de presentar precio y aterrizar el ROI esperado.",
  "lo-voy-a-pensar": "La campaña debe elevar urgencia y mostrar por que postergar tiene costo comercial.",
  "mandame-info": "Conviene usar un CTA que lleve a diagnostico guiado y no a envio pasivo de informacion.",
  "no-tengo-tiempo": "La propuesta debe prometer simplicidad operativa y rapidez de implementacion.",
  "no-estoy-listo": "El mensaje tiene que reducir el umbral de entrada y hacer ver la compra como siguiente paso natural.",
  consultarlo: "Hace falta equipar al comprador con argumentos listos para compartir internamente.",
  otro: "La recomendacion debe incorporar una respuesta consultiva y concreta a la objecion dominante.",
};

export const toneDescriptors: Record<string, { adjective: string; framing: string }> = {
  directo: {
    adjective: "directo",
    framing: "sin rodeos, con foco en oportunidad y accion inmediata",
  },
  elegante: {
    adjective: "elegante",
    framing: "premium, seguro y con autoridad sobria",
  },
  agresivo: {
    adjective: "agresivo",
    framing: "retador, competitivo y con urgencia clara",
  },
  cercano: {
    adjective: "cercano",
    framing: "humano, claro y con tono conversacional",
  },
};
