import type { AcquisitionDiagnosticInput, DiagnosticStep } from "@/lib/acquisition-diagnostic/types";

export function getTodayLabel() {
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function getArrayValue(value: AcquisitionDiagnosticInput[keyof AcquisitionDiagnosticInput]) {
  return Array.isArray(value) ? value : [];
}

export function getStringValue(value: AcquisitionDiagnosticInput[keyof AcquisitionDiagnosticInput]) {
  return typeof value === "string" ? value : "";
}

export function isStepComplete(step: DiagnosticStep, data: AcquisitionDiagnosticInput) {
  return step.fields.every((field) => {
    if (field.optional) return true;

    const value = data[field.id];

    if (field.type === "multi-choice") {
      return getArrayValue(value).length > 0;
    }

    return getStringValue(value).trim().length > 0;
  });
}

export function getStepValidationMessage(step: DiagnosticStep, data: AcquisitionDiagnosticInput) {
  const missingField = step.fields.find((field) => {
    if (field.optional) return false;

    const value = data[field.id];

    if (field.type === "multi-choice") {
      return getArrayValue(value).length === 0;
    }

    return getStringValue(value).trim().length === 0;
  });

  return missingField ? `Completa "${missingField.label}" para avanzar.` : null;
}

export function normalizeSentence(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return "";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function formatList(items: string[]) {
  const sanitized = items.map((item) => item.trim()).filter(Boolean);

  if (sanitized.length === 0) return "";
  if (sanitized.length === 1) return sanitized[0];
  if (sanitized.length === 2) return `${sanitized[0]} y ${sanitized[1]}`;

  return `${sanitized.slice(0, -1).join(", ")} y ${sanitized[sanitized.length - 1]}`;
}

export function cleanUrlLabel(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/^www\./, "").trim();
}

export function extractTicketValue(value: string) {
  const normalized = value.replace(/,/g, "").match(/\d+(\.\d+)?/g);
  if (!normalized) return null;

  const numbers = normalized.map((item) => Number(item)).filter((item) => !Number.isNaN(item));
  if (numbers.length === 0) return null;

  return Math.max(...numbers);
}

export function getTicketTier(value: string) {
  const ticket = extractTicketValue(value);

  if (!ticket) return "premium";
  if (ticket >= 5000) return "elite";
  if (ticket >= 2000) return "high-ticket";
  if (ticket >= 900) return "premium";

  return "consultivo";
}

export function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
}
