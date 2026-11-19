import { Controller } from '@nestjs/common';

/**
 * Punto de entrada del subproceso 05 (preparar pedido y cerrar entrega).
 *
 * Fase 1: no expone rutas. Picking, facturación, incidencias y confirmación de
 * entrega permanecen en los módulos C# correspondientes.
 */
@Controller('orders')
export class OrdersController {}
