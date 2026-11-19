/**
 * Estados previstos para el proceso de checkout.
 *
 * Fase 1: solo se declara el vocabulario. No existen transiciones, persistencia
 * ni compensaciones implementadas.
 */
export enum CheckoutState {
  /** Proceso creado, aún sin reserva ni pago. */
  Created = 'created',
  /** Solicitud de reserva enviada a Inventory. */
  ReservingStock = 'reserving_stock',
  /** Reserva obtenida; pendiente el resultado del pago. */
  AwaitingPayment = 'awaiting_payment',
  /** Pago capturado y pedido confirmado. */
  Confirmed = 'confirmed',
  /** Ejecutando compensaciones por un fallo posterior. */
  Compensating = 'compensating',
  /** Proceso finalizado correctamente. */
  Completed = 'completed',
  /** Proceso compensado y cerrado. */
  Cancelled = 'cancelled',
  /** Proceso irrecuperable; requiere intervención. */
  Failed = 'failed',
}
