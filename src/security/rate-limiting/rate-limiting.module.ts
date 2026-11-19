import { Module } from '@nestjs/common';

/**
 * Preparación del control de solicitudes.
 *
 * Fase 1: no registra `ThrottlerGuard`, no define límites activos y no usa
 * Redis. Cuando se implemente, necesitará un almacén compartido para que el
 * límite sea consistente entre instancias.
 */
@Module({})
export class RateLimitingModule {}
