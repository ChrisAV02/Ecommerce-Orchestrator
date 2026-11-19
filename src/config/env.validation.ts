import { z } from 'zod';

/**
 * Esquema de validación de variables de entorno.
 *
 * Se ejecuta antes de construir el resto de la aplicación. Un valor inválido
 * impide el arranque en lugar de degradar el comportamiento en tiempo de
 * ejecución.
 *
 * No se declaran secretos obligatorios: la Fase 1 no implementa autenticación,
 * Redis ni PostgreSQL, por lo que el esqueleto debe poder arrancar sin ellos.
 */
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  SERVICE_NAME: z.string().trim().min(1).default('ecommerce-orchestrator'),
  API_PREFIX: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:[/-][a-z0-9]+)*$/,
      'API_PREFIX must be a lowercase path without leading or trailing slashes',
    )
    .default('api/v1'),
  ECOMMERCE_API_BASE_URL: z.string().url().default('http://localhost:5000'),
  ECOMMERCE_API_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .positive()
    .max(120_000)
    .default(5000),
  CORS_ALLOWED_ORIGINS: z.string().trim().optional(),
});

export type Environment = z.infer<typeof envSchema>;

/**
 * Adaptador para la opción `validate` de `ConfigModule.forRoot`.
 *
 * Devuelve un objeto plano porque es el contrato que espera NestJS. Los valores
 * normalizados (por ejemplo `PORT` como número) quedan disponibles en
 * `process.env` y en `ConfigService`.
 */
export function validateEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'ENV'}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}
