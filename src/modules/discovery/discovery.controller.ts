import { Controller } from '@nestjs/common';

/**
 * Punto de entrada del subproceso 01 (geolocalizar y asignar tienda) y del
 * subproceso 02 (explorar catálogo localizado).
 *
 * Fase 1: no expone rutas. La selección de tienda, el catálogo y el cálculo de
 * distancias se implementarán en la siguiente fase contra Catalog de
 * Ecommerce-Api.
 */
@Controller('discovery')
export class DiscoveryController {}
