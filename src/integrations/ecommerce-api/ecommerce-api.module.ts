import { Module } from '@nestjs/common';
import { CatalogClient } from './clients/catalog.client';
import { InventoryClient } from './clients/inventory.client';
import { SalesClient } from './clients/sales.client';
import { PaymentsClient } from './clients/payments.client';
import { BillingClient } from './clients/billing.client';
import { IncidentsClient } from './clients/incidents.client';

const CLIENTS = [
  CatalogClient,
  InventoryClient,
  SalesClient,
  PaymentsClient,
  BillingClient,
  IncidentsClient,
];

/**
 * Agrupa la comunicación con Ecommerce-Api.
 *
 * Fase 1: registra y exporta los seis clientes, sin transporte HTTP ni URLs
 * comerciales. La configuración de `ecommerceApi` ya está disponible mediante
 * `ConfigService`.
 */
@Module({
  providers: CLIENTS,
  exports: CLIENTS,
})
export class EcommerceApiModule {}
