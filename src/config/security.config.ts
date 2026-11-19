import { registerAs } from '@nestjs/config';

export const SECURITY_CONFIG_NAMESPACE = 'security';

/**
 * Algoritmos asimétricos previstos para la verificación de tokens.
 * No existe emisión de tokens ni material de firma en esta fase.
 */
export type JwtVerificationAlgorithm = 'RS256' | 'ES256';

export type TokenType = 'access';

/**
 * Parámetros que verificará el futuro guard de autenticación:
 * firma, emisor, audiencia, expiración, tolerancia de reloj, tipo de token y,
 * cuando corresponda, estado de revocación.
 *
 * `enabled` es literalmente `false` en Fase 1: ningún guard lee este valor, por
 * lo que no puede activarse una autenticación inexistente cambiando el entorno.
 */
export interface AuthenticationConfiguration {
  readonly enabled: false;
  readonly issuer: string | null;
  readonly audience: string | null;
  readonly jwksUri: string | null;
  readonly algorithm: JwtVerificationAlgorithm | null;
  readonly clockToleranceSeconds: number;
  readonly requiredTokenType: TokenType;
}

/**
 * La autorización se diseñará por política y rol verificado en el servidor.
 * Nunca se aceptarán roles enviados por el cliente.
 */
export interface AuthorizationConfiguration {
  readonly enabled: false;
  readonly defaultEffect: 'deny';
}

/**
 * Referencias de configuración para bloqueos y revocaciones.
 * No se conecta ningún almacenamiento en esta fase.
 */
export interface BlacklistConfiguration {
  readonly enabled: false;
  readonly temporaryBlockTtlSeconds: number | null;
}

export interface SecurityConfiguration {
  readonly authentication: AuthenticationConfiguration;
  readonly authorization: AuthorizationConfiguration;
  readonly blacklist: BlacklistConfiguration;
}

export default registerAs(
  SECURITY_CONFIG_NAMESPACE,
  (): SecurityConfiguration => ({
    authentication: {
      enabled: false,
      issuer: process.env.JWT_ISSUER ?? null,
      audience: process.env.JWT_AUDIENCE ?? null,
      jwksUri: process.env.JWT_JWKS_URI ?? null,
      algorithm: null,
      clockToleranceSeconds: Number(
        process.env.JWT_CLOCK_TOLERANCE_SECONDS ?? 30,
      ),
      requiredTokenType: 'access',
    },
    authorization: {
      enabled: false,
      defaultEffect: 'deny',
    },
    blacklist: {
      enabled: false,
      temporaryBlockTtlSeconds: null,
    },
  }),
);
