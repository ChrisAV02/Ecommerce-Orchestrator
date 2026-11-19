import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { DiscoveryService } from './modules/discovery/discovery.service';
import { CartService } from './modules/cart/cart.service';
import { CheckoutService } from './modules/checkout/checkout.service';
import { CheckoutSaga } from './modules/checkout/saga/checkout.saga';
import { OrdersService } from './modules/orders/orders.service';
import { CatalogClient } from './integrations/ecommerce-api/clients/catalog.client';
import { InventoryClient } from './integrations/ecommerce-api/clients/inventory.client';
import { SalesClient } from './integrations/ecommerce-api/clients/sales.client';
import { PaymentsClient } from './integrations/ecommerce-api/clients/payments.client';
import { BillingClient } from './integrations/ecommerce-api/clients/billing.client';
import { IncidentsClient } from './integrations/ecommerce-api/clients/incidents.client';
import { HealthController } from './infrastructure/health/health.controller';

describe('AppModule (arquitectura)', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('inicializa los servicios de los cuatro módulos de proceso', () => {
    expect(moduleRef.get(DiscoveryService)).toBeInstanceOf(DiscoveryService);
    expect(moduleRef.get(CartService)).toBeInstanceOf(CartService);
    expect(moduleRef.get(CheckoutService)).toBeInstanceOf(CheckoutService);
    expect(moduleRef.get(CheckoutSaga)).toBeInstanceOf(CheckoutSaga);
    expect(moduleRef.get(OrdersService)).toBeInstanceOf(OrdersService);
  });

  it('registra los seis clientes de integración', () => {
    expect(moduleRef.get(CatalogClient)).toBeInstanceOf(CatalogClient);
    expect(moduleRef.get(InventoryClient)).toBeInstanceOf(InventoryClient);
    expect(moduleRef.get(SalesClient)).toBeInstanceOf(SalesClient);
    expect(moduleRef.get(PaymentsClient)).toBeInstanceOf(PaymentsClient);
    expect(moduleRef.get(BillingClient)).toBeInstanceOf(BillingClient);
    expect(moduleRef.get(IncidentsClient)).toBeInstanceOf(IncidentsClient);
  });

  it('registra HealthController', () => {
    expect(moduleRef.get(HealthController)).toBeInstanceOf(HealthController);
  });
});
