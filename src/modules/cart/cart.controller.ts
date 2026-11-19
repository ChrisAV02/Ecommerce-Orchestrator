import { Controller } from '@nestjs/common';

/**
 * Punto de entrada del subproceso 03 (validar stock y anclar carrito).
 *
 * Fase 1: no expone rutas. La validación física del stock corresponde a
 * Inventory y al POS Simulator; el orquestador solo coordinará la operación.
 */
@Controller('cart')
export class CartController {}
