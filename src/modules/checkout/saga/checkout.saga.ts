import { Injectable } from '@nestjs/common';

/**
 * Esqueleto del coordinador Saga del checkout.
 *
 * Reglas documentadas para la implementación futura:
 * - El POS es la fuente autoritativa de las unidades reservadas.
 * - El estado del proceso no puede vivir únicamente en memoria: deberá
 *   persistirse en PostgreSQL propio con claves de idempotencia.
 * - Cada paso debe tener una compensación explícita.
 *
 * Fase 1: no ejecuta reservas, pagos, reintentos, timeouts ni compensaciones.
 */
@Injectable()
export class CheckoutSaga {}
