import { registerAs } from '@nestjs/config';

export const TRAFFIC_CONFIG_NAMESPACE = 'traffic';

export type TrafficSubjectScope = 'ip' | 'user' | 'global' | 'unspecified';

/**
 * Definición de una política de tráfico.
 *
 * `limit: null` y `windowSeconds: null` significan "todavía sin definir".
 * Ninguna política se aplica en Fase 1: no existe guard, middleware ni
 * almacén de contadores registrado.
 */
export interface TrafficPolicyDefinition {
  readonly operation: string;
  readonly limit: number | null;
  readonly windowSeconds: number | null;
  readonly scope: TrafficSubjectScope;
  readonly notes?: string;
}

export interface TrafficConfiguration {
  readonly policies: readonly TrafficPolicyDefinition[];
  readonly globalConcurrentRequests: number | null;
  readonly maxPayloadBytes: number | null;
  readonly upstreamTimeoutMs: number;
}

/**
 * Catálogo de políticas previstas, sin valores definitivos.
 *
 * Los límites concretos se fijarán con mediciones y pruebas antes de activarlos.
 */
export const PLANNED_TRAFFIC_POLICIES: readonly TrafficPolicyDefinition[] = [
  {
    operation: 'catalog.read',
    limit: null,
    windowSeconds: null,
    scope: 'unspecified',
    notes: 'Lectura paginada; preservar paginación del upstream.',
  },
  {
    operation: 'stock.validate',
    limit: null,
    windowSeconds: null,
    scope: 'unspecified',
    notes: 'Consulta al POS a través de Inventory.',
  },
  {
    operation: 'checkout.start',
    limit: null,
    windowSeconds: null,
    scope: 'unspecified',
    notes: 'Operación sensible; requiere límite más restrictivo.',
  },
  {
    operation: 'payments.write',
    limit: null,
    windowSeconds: null,
    scope: 'unspecified',
    notes: 'Idempotencia obligatoria; nunca reintentar a ciegas.',
  },
  {
    operation: 'health.read',
    limit: null,
    windowSeconds: null,
    scope: 'unspecified',
    notes: 'Política específica para no inutilizar el monitoreo.',
  },
];

export default registerAs(
  TRAFFIC_CONFIG_NAMESPACE,
  (): TrafficConfiguration => ({
    policies: PLANNED_TRAFFIC_POLICIES,
    globalConcurrentRequests: null,
    maxPayloadBytes: null,
    upstreamTimeoutMs: Number(process.env.ECOMMERCE_API_TIMEOUT_MS ?? 5000),
  }),
);
