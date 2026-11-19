import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import ecommerceApiConfig from './config/ecommerce-api.config';
import securityConfig from './config/security.config';
import trafficConfig from './config/traffic.config';
import { validateEnvironment } from './config/env.validation';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { CartModule } from './modules/cart/cart.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { OrdersModule } from './modules/orders/orders.module';
import { EcommerceApiModule } from './integrations/ecommerce-api/ecommerce-api.module';
import { SecurityModule } from './security/security.module';
import { HealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      load: [appConfig, ecommerceApiConfig, securityConfig, trafficConfig],
      validate: validateEnvironment,
    }),
    DiscoveryModule,
    CartModule,
    CheckoutModule,
    OrdersModule,
    EcommerceApiModule,
    SecurityModule,
    HealthModule,
  ],
})
export class AppModule {}
