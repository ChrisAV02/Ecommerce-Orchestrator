import { Injectable } from '@nestjs/common';

/**
 * Coordinará la validación de stock y los cambios del carrito.
 *
 * Regla de negocio documentada: el carrito del Desktop puede contener productos
 * de varias tiendas, pero cada checkout se procesa contra una sola sucursal.
 * El orquestador no mantiene stock propio ni consulta el POS directamente.
 *
 * Fase 1: sin comportamiento.
 */
@Injectable()
export class CartService {}
