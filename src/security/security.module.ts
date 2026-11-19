import { Module } from '@nestjs/common';

/**
 * Contratos técnicos de seguridad del orquestador.
 *
 * Fase 1: marco organizativo. No registra guards, no activa autenticación y no
 * aplica bloqueos. Tener este módulo no significa disponer de seguridad
 * funcional.
 */
@Module({})
export class SecurityModule {}
