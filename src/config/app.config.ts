import { registerAs } from '@nestjs/config';

export const APP_CONFIG_NAMESPACE = 'app';

export interface AppConfiguration {
  readonly nodeEnv: string;
  readonly port: number;
  readonly serviceName: string;
  readonly apiPrefix: string;
}

/**
 * Configuración propia del proceso NestJS.
 *
 * Los valores llegan ya validados por `validateEnvironment`.
 */
export default registerAs(APP_CONFIG_NAMESPACE, (): AppConfiguration => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  serviceName: process.env.SERVICE_NAME ?? 'ecommerce-orchestrator',
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
}));
