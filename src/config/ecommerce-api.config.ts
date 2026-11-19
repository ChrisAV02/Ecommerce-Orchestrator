import { registerAs } from '@nestjs/config';

export const ECOMMERCE_API_CONFIG_NAMESPACE = 'ecommerceApi';

export interface EcommerceApiConfiguration {
  /** URL base del servicio .NET. En Fase 1 solo se almacena; no se invoca. */
  readonly baseUrl: string;
  /** Timeout por operación que deberá aplicar el transporte HTTP futuro. */
  readonly timeoutMs: number;
}

/**
 * Configuración del upstream Ecommerce-Api.
 *
 * No se realizan llamadas HTTP en esta fase. El transporte real (timeouts,
 * CorrelationId, autenticación entre servicios, reintentos seguros y
 * traducción de errores) se implementará al construir los clientes.
 */
export default registerAs(
  ECOMMERCE_API_CONFIG_NAMESPACE,
  (): EcommerceApiConfiguration => ({
    baseUrl: process.env.ECOMMERCE_API_BASE_URL ?? 'http://localhost:5000',
    timeoutMs: Number(process.env.ECOMMERCE_API_TIMEOUT_MS ?? 5000),
  }),
);
