import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutSaga } from './saga/checkout.saga';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutSaga],
  exports: [CheckoutService],
})
export class CheckoutModule {}
