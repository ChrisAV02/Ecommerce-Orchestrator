# Ecommerce Orchestrator

Orquestador SOA del proyecto **DespensaCerca**. Recibe solicitudes del cliente,
aplica controles técnicos y coordina los procesos comerciales contra
`Ecommerce-Api` (ASP.NET Core), que conserva las reglas de negocio.

- **Stack**: NestJS 11, TypeScript 5.9, pnpm.
- **Estado**: Fase 1 — estructura y configuración técnica.
- **Sin** autenticación, blacklist, rate limiting activo, Redis, PostgreSQL,
  llamadas HTTP ni casos de uso comerciales.

## Arranque

```powershell
pnpm install
Copy-Item .env.example .env   # opcional; hay valores por defecto
pnpm run start:dev
```

- Health: `http://localhost:3001/api/v1/health`
- Swagger: `http://localhost:3001/api/docs`

La aplicación arranca **sin** Ecommerce-Api, POS Simulator, PostgreSQL ni Redis.

## Comandos

```powershell
pnpm run build
pnpm run lint
pnpm run test
pnpm run test:e2e
pnpm exec tsc --noEmit
```

> `@nestjs/config` 12 se publica como ESM. Jest 30 solo puede cargarlo con
> `--experimental-vm-modules`; por eso los scripts de test invocan Jest mediante
> `node --experimental-vm-modules`. No se cambió de framework ni de runner.

## Estructura

```text
src/
├── config/                  configuración tipada y validación de entorno
├── modules/                 procesos de negocio
│   ├── discovery/           01 geolocalizar y asignar tienda; 02 catálogo localizado
│   ├── cart/                03 validar stock y anclar carrito
│   ├── checkout/            04 reservar y procesar pago (Saga)
│   └── orders/              05 preparar pedido y cerrar entrega
├── integrations/
│   └── ecommerce-api/       seis clientes preparados, sin HTTP todavía
├── common/                  middleware, contratos e infraestructura técnica
├── security/                contratos de autenticación, autorización, blacklist y rate limiting
└── infrastructure/          health, persistencia, caché y resiliencia preparadas
```

Detalle completo en [`docs/architecture.md`](docs/architecture.md) y evidencia de
la fase en [`docs/phase-1-report.md`](docs/phase-1-report.md).

## Endpoints

| Método | Ruta | Estado |
| --- | --- | --- |
| GET | `/api/v1/health` | Implementado (disponibilidad del proceso) |
| GET | `/api/docs` | Implementado (Swagger) |

No existen endpoints comerciales en esta fase.

## Estado de las capacidades

| Capacidad | Estado |
| --- | --- |
| Configuración centralizada + validación | Implementado |
| CorrelationId | Implementado |
| Health | Implementado |
| Swagger | Implementado |
| Clientes de integración | Preparados (sin HTTP) |
| Autenticación / autorización | Preparado (sin guards) |
| Blacklist | Contrato únicamente |
| Rate Limiting | Módulo y contrato únicamente |
| Persistencia / Redis / resiliencia | Estructura y documentación |

Ver [`docs/security.md`](docs/security.md) para la distinción entre preparado,
implementado y pendiente.
