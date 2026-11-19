import { Injectable } from '@nestjs/common';
import { CheckoutSaga } from './saga/checkout.saga';

/**
 * Coordinará reserva, pago, confirmación de pedido y compensación.
 *
 * Fase 1: sin casos de uso. La Saga se inyecta para dejar preparado el punto de
 * composición, pero no se invoca.
 */
@Injectable()
export class CheckoutService {
  constructor(private readonly saga: CheckoutSaga) {}

  /** Acceso de solo lectura al esqueleto de la Saga (sin ejecutar pasos). */
  get sagaCoordinator(): CheckoutSaga {
    return this.saga;
  }
}
