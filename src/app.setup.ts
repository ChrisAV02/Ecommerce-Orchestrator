import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

/** Ruta absoluta de la documentación OpenAPI. */
export const SWAGGER_PATH = 'api/docs';

/**
 * Configuración HTTP compartida entre `main.ts` y las pruebas e2e.
 *
 * No realiza llamadas externas ni depende de servicios de infraestructura.
 */
export function configureApplication(app: INestApplication): void {
  const config = app.get(ConfigService);

  const apiPrefix = config.get<string>('app.apiPrefix', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  const correlationIdMiddleware = new CorrelationIdMiddleware();
  app.use(correlationIdMiddleware.use);

  // Solo se habilitan orígenes declarados explícitamente. Windows Forms no está
  // sujeto a CORS de navegador; esta configuración queda para herramientas web.
  const allowedOrigins = parseAllowedOrigins(
    config.get<string>('CORS_ALLOWED_ORIGINS'),
  );
  if (allowedOrigins.length > 0) {
    app.enableCors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-Id'],
    });
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce Orchestrator API')
    .setDescription(
      'Orquestador SOA de los procesos comerciales de DespensaCerca.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAGGER_PATH, app, document);
}

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}
