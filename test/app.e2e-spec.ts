import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApplication } from './../src/app.setup';
import { HealthResponse } from './../src/infrastructure/health/health.controller';

describe('Orquestador (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApplication(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health responde 200 con el JSON esperado', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      service: 'ecommerce-orchestrator',
    });
  });

  it('no depende de PostgreSQL, Redis ni Ecommerce-Api para arrancar', async () => {
    // El arranque ya ocurrió en beforeAll sin esas dependencias disponibles.
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    const body = response.body as HealthResponse;
    expect(body.status).toBe('ok');
  });

  it('genera un CorrelationId cuando la solicitud no lo envía', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.headers['x-correlation-id']).toMatch(
      /^[A-Za-z0-9._-]{1,128}$/,
    );
  });

  it('conserva un CorrelationId válido', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .set('X-Correlation-Id', 'trace-e2e-001')
      .expect(200);

    expect(response.headers['x-correlation-id']).toBe('trace-e2e-001');
  });

  it('reemplaza un CorrelationId inválido', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .set('X-Correlation-Id', 'not a valid id')
      .expect(200);

    expect(response.headers['x-correlation-id']).not.toBe('not a valid id');
  });

  it('expone la documentación OpenAPI en /api/docs', async () => {
    await request(app.getHttpServer()).get('/api/docs').expect(200);
  });

  it('devuelve 404 en una ruta inexistente', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/does-not-exist')
      .expect(404);
  });
});
