import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApplication } from './app.setup';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);
    configureApplication(app);
    app.enableShutdownHooks();

    const config = app.get(ConfigService);
    const port = config.get<number>('app.port', 3001);
    const serviceName = config.get<string>(
      'app.serviceName',
      'ecommerce-orchestrator',
    );

    await app.listen(port);
    logger.log(`${serviceName} escuchando en http://localhost:${port}`);
    logger.log(`OpenAPI disponible en http://localhost:${port}/api/docs`);
  } catch (error) {
    const detail = error instanceof Error ? error.stack : String(error);
    logger.error('No se pudo iniciar la aplicación', detail);
    process.exitCode = 1;
  }
}

void bootstrap();
