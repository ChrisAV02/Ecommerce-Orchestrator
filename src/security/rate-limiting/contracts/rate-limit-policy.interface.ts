/**
 * Sujeto al que se aplica el conteo.
 *
 * `user` solo es válido cuando existe una identidad autenticada y verificada;
 * `ip` debe provenir de una fuente confiable, nunca de una cabecera enviada
 * libremente por el cliente.
 */
export type RateLimitScope = 'ip' | 'user' | 'global';

/**
 * Estructura mínima de una política de rate limiting.
 *
 * Fase 1: solo contrato. No hay guard, contadores ni almacenamiento registrado,
 * por lo que ningún límite se aplica todavía.
 */
export interface RateLimitPolicy {
  readonly name: string;
  readonly limit: number;
  readonly windowSeconds: number;
  readonly scope: RateLimitScope;
}
