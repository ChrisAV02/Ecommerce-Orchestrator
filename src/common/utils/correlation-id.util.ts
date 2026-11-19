import { randomUUID } from 'node:crypto';

export const CORRELATION_ID_PATTERN = /^[A-Za-z0-9._-]{1,128}$/;

export function isValidCorrelationId(value: unknown): value is string {
  return typeof value === 'string' && CORRELATION_ID_PATTERN.test(value);
}

export function resolveCorrelationId(value: unknown): string {
  return isValidCorrelationId(value) ? value : randomUUID();
}
