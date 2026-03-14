import { jsPDF } from "jspdf";
import type { StrategicReport } from "@/lib/acquisition-diagnostic/types";

const palette = {
  dark: [12, 33, 29] as const,
  green: [20, 157, 110] as const,
  teal: [23, 127, 128] as const,
  light: [241, 250, 246] as const,
  border: [211, 228, 220] as const,
  text: [37, 61, 53] as const,
  muted: [96, 120, 111] as const,
  white: [255, 255, 255] as const,
};

type PdfContext = {
  doc: jsPDF;
  cursorY: number;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  contentWidth: number;
};

function addPageChrome(ctx: PdfContext, pageLabel: string) {
  const { doc, pageWidth, margin } = ctx;

  doc.setDrawColor(...palette.border);
  doc.setLineWidth(1);
  doc.line(margin, 34, pageWidth - margin, 34);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...palette.green);
  doc.text("Ventra AI", margin, 24);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...palette.muted);
  doc.text(pageLabel, pageWidth - margin, 24, { align: "right" });
}

function ensureSpace(ctx: PdfContext, height: number, label: string) {
  if (ctx.cursorY + height <= ctx.pageHeight - 48) return;

  ctx.doc.addPage();
  addPageChrome(ctx, label);
  ctx.cursorY = 56;
}

function writeParagraph(
  ctx: PdfContext,
  text: string,
  options?: { fontSize?: number; color?: readonly [number, number, number]; lineHeight?: number },
) {
  const fontSize = options?.fontSize ?? 10.5;
  const lineHeight = options?.lineHeight ?? fontSize + 4;

  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(fontSize);
  ctx.doc.setTextColor(...(options?.color ?? palette.text));

  const lines = ctx.doc.splitTextToSize(text, ctx.contentWidth);
  ensureSpace(ctx, lines.length * lineHeight + 8, "Strategic Report");
  ctx.doc.text(lines, ctx.margin, ctx.cursorY);
  ctx.cursorY += lines.length * lineHeight + 8;
}

function writeSectionTitle(ctx: PdfContext, title: string, kicker?: string) {
  ensureSpace(ctx, 56, "Strategic Report");

  if (kicker) {
    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setFontSize(9);
    ctx.doc.setTextColor(...palette.green);
    ctx.doc.text(kicker.toUpperCase(), ctx.margin, ctx.cursorY);
    ctx.cursorY += 14;
  }

  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(18);
  ctx.doc.setTextColor(...palette.dark);
  ctx.doc.text(title, ctx.margin, ctx.cursorY);
  ctx.cursorY += 18;
}

function writeInfoCardRow(ctx: PdfContext, items: Array<[string, string]>) {
  const columnWidth = ctx.contentWidth / 2 - 8;

  for (let index = 0; index < items.length; index += 2) {
    const chunk = items.slice(index, index + 2);
    const heights = chunk.map(([, value]) => {
      const bodyLines = ctx.doc.splitTextToSize(value, columnWidth - 28);
      return 28 + bodyLines.length * 13;
    });
    const rowHeight = Math.max(...heights);

    ensureSpace(ctx, rowHeight + 12, "Strategic Report");

    chunk.forEach(([title, value], chunkIndex) => {
      const x = ctx.margin + chunkIndex * (columnWidth + 16);
      const y = ctx.cursorY;

      ctx.doc.setFillColor(...palette.light);
      ctx.doc.setDrawColor(...palette.border);
      ctx.doc.roundedRect(x, y, columnWidth, rowHeight, 12, 12, "FD");
      ctx.doc.setFont("helvetica", "bold");
      ctx.doc.setFontSize(10);
      ctx.doc.setTextColor(...palette.muted);
      ctx.doc.text(title, x + 14, y + 18);

      ctx.doc.setFont("helvetica", "normal");
      ctx.doc.setFontSize(10.5);
      ctx.doc.setTextColor(...palette.text);
      const bodyLines = ctx.doc.splitTextToSize(value, columnWidth - 28);
      ctx.doc.text(bodyLines, x + 14, y + 34);
    });

    ctx.cursorY += rowHeight + 12;
  }
}

function writeBulletList(ctx: PdfContext, items: string[]) {
  items.forEach((item) => {
    const lines = ctx.doc.splitTextToSize(item, ctx.contentWidth - 20);
    ensureSpace(ctx, lines.length * 14 + 8, "Strategic Report");
    ctx.doc.setFillColor(...palette.green);
    ctx.doc.circle(ctx.margin + 4, ctx.cursorY - 3, 2, "F");
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setFontSize(10.5);
    ctx.doc.setTextColor(...palette.text);
    ctx.doc.text(lines, ctx.margin + 14, ctx.cursorY);
    ctx.cursorY += lines.length * 14 + 4;
  });

  ctx.cursorY += 4;
}

export function downloadStrategicReportPdf(report: StrategicReport) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const ctx: PdfContext = {
    doc,
    cursorY: 72,
    pageWidth,
    pageHeight,
    margin,
    contentWidth: pageWidth - margin * 2,
  };

  doc.setFillColor(...palette.dark);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(...palette.green);
  doc.circle(pageWidth - 78, 94, 74, "F");
  doc.setFillColor(...palette.teal);
  doc.circle(pageWidth - 126, 132, 34, "F");
  doc.setTextColor(...palette.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ventra AI", margin, 62);
  doc.setFontSize(30);
  doc.text("Diagnostico de Captacion", margin, 138);
  doc.setFontSize(26);
  doc.text(report.businessSummary.name, margin, 176);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const coverCopy = doc.splitTextToSize(
    "Estrategia inicial para salir con un mensaje mas claro, mejores angulos de venta y una campana consultiva lista para ejecutar.",
    300,
  );
  doc.text(coverCopy, margin, 216);
  doc.setDrawColor(...palette.white);
  doc.roundedRect(margin, pageHeight - 164, 248, 92, 18, 18);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Fecha de generacion", margin + 18, pageHeight - 132);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(report.createdAt, margin + 18, pageHeight - 108);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Ticket de referencia", margin + 18, pageHeight - 84);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(report.businessSummary.ticket, margin + 18, pageHeight - 60);

  doc.addPage();
  ctx.cursorY = 56;
  addPageChrome(ctx, "Strategic Report");

  writeSectionTitle(ctx, "Resumen ejecutivo", "Overview");
  writeParagraph(ctx, report.executiveSummary, { fontSize: 11.5, color: palette.dark, lineHeight: 16 });
  writeParagraph(ctx, report.strategicThesis);
  writeInfoCardRow(ctx, [
    ["Negocio", report.businessSummary.name],
    ["Tipo", report.businessSummary.type],
    ["Oferta principal", report.businessSummary.offer],
    ["Mercado", report.businessSummary.market],
  ]);

  writeSectionTitle(ctx, "Senales de diagnostico", "Signals");
  writeBulletList(ctx, report.diagnosisSignals);

  writeSectionTitle(ctx, "Cliente ideal", "Avatar");
  writeParagraph(ctx, report.clientProfile.avatar);
  writeBulletList(ctx, [
    `Dolor principal: ${report.clientProfile.pain}`,
    `Deseo principal: ${report.clientProfile.desire}`,
    `Objeciones probables: ${report.clientProfile.objections.join(", ")}`,
  ]);

  writeSectionTitle(ctx, "Propuesta principal", "Strategy");
  writeBulletList(ctx, [
    `Promesa sugerida: ${report.coreProposal.promise}`,
    `Transformacion sugerida: ${report.coreProposal.transformation}`,
    `Posicionamiento sugerido: ${report.coreProposal.positioning}`,
  ]);

  writeSectionTitle(ctx, "Angulos de venta", "Angles");
  report.salesAngles.forEach((angle) => {
    writeBulletList(ctx, [`${angle.type}: ${angle.title}. ${angle.description}`]);
  });

  writeSectionTitle(ctx, "Hooks y mensajes base", "Messaging");
  writeBulletList(ctx, report.hooks);
  writeBulletList(ctx, [
    `Copy corto: ${report.copyPack.short}`,
    `Copy mediano: ${report.copyPack.medium}`,
    `Copy largo: ${report.copyPack.long}`,
    `CTA sugerido: ${report.copyPack.cta}`,
    `WhatsApp sugerido: ${report.copyPack.whatsapp}`,
  ]);

  writeSectionTitle(ctx, "Ideas de anuncios", "Creative");
  report.adIdeas.forEach((idea) => {
    writeBulletList(ctx, [`${idea.format}: ${idea.title}. ${idea.description}`]);
  });

  writeSectionTitle(ctx, "Recomendacion de campana", "Campaign");
  writeBulletList(ctx, [
    `Canal sugerido: ${report.campaignRecommendation.channel}`,
    `Tipo de campana: ${report.campaignRecommendation.campaignType}`,
    `CTA recomendado: ${report.campaignRecommendation.cta}`,
    `Enfoque inicial: ${report.campaignRecommendation.focus}`,
    `Justificacion: ${report.campaignRecommendation.justification}`,
  ]);

  writeSectionTitle(ctx, "Siguiente paso sugerido", "Next");
  writeBulletList(ctx, report.nextSteps);

  ensureSpace(ctx, 110, "Strategic Report");
  ctx.doc.setFillColor(...palette.light);
  ctx.doc.setDrawColor(...palette.border);
  ctx.doc.roundedRect(ctx.margin, ctx.cursorY, ctx.contentWidth, 78, 18, 18, "FD");
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(12);
  ctx.doc.setTextColor(...palette.dark);
  ctx.doc.text("Nota final de Ventra AI", ctx.margin + 18, ctx.cursorY + 24);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(10.5);
  ctx.doc.setTextColor(...palette.text);
  const finalNote = ctx.doc.splitTextToSize(
    "Este documento funciona como brief inicial de captacion. La siguiente etapa es convertir esta estrategia en activos, automatizaciones y seguimiento operativo dentro de la implementacion.",
    ctx.contentWidth - 36,
  );
  ctx.doc.text(finalNote, ctx.margin + 18, ctx.cursorY + 44);

  const safeName = report.businessSummary.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`ventra-ai-diagnostico-${safeName}.pdf`);
}
