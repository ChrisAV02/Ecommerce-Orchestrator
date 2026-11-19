import { Module } from '@nestjs/common';

/**
 * Persistencia propia del orquestador (Sagas y estados de checkout).
 *
 * Fase 1: estructura preparada, sin ORM, sin conexión y sin migraciones. La
 * aplicación debe arrancar con PostgreSQL apagado.
 *
 * Reglas futuras:
 * - Nunca almacenar productos ni existencias físicas del POS.
 * - Nunca leer tablas de Ecommerce-Api.
 * - No usar `synchronize: true`.
 * - Las migraciones se generarán cuando existan entidades reales.
 */
@Module({})
export class PersistenceModule {}
