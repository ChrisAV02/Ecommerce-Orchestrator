/**
 * Tipo de sujeto bloqueable.
 *
 * Se mantienen separados a propósito: una IP, una identidad y un token son
 * sujetos distintos y no deben mezclarse en una misma clave de almacenamiento.
 */
export type BlacklistSubjectType = 'ip' | 'userId' | 'tokenId';

export interface BlacklistSubject {
  readonly type: BlacklistSubjectType;
  readonly value: string;
}

export interface BlacklistEntry {
  readonly subject: BlacklistSubject;
  readonly reason: string;
  readonly createdAt: Date;
  readonly expiresAt: Date | null;
  /** Componente que originó el bloqueo. */
  readonly source: string;
}

export interface BlacklistStatus {
  readonly blocked: boolean;
  readonly expiresAt: Date | null;
}

/**
 * Contrato técnico de almacenamiento de bloqueos y revocaciones.
 *
 * No existe implementación en Fase 1. Una implementación futura podrá usar
 * Redis para bloqueos temporales; las suspensiones administrativas persistentes
 * deberán provenir del sistema autoritativo de identidad.
 *
 * Los motivos internos no deben exponerse al usuario final.
 */
export interface BlacklistStore {
  isBlocked(subject: BlacklistSubject): Promise<BlacklistStatus>;
  block(entry: BlacklistEntry): Promise<void>;
  unblock(subject: BlacklistSubject): Promise<void>;
}
