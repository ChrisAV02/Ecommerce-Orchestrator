import { NextFunction, Response } from 'express';
import { CORRELATION_ID_HEADER } from '../constants/http-headers.constants';
import {
  CorrelationIdMiddleware,
  RequestWithCorrelationId,
} from './correlation-id.middleware';

describe('CorrelationIdMiddleware', () => {
  const middleware = new CorrelationIdMiddleware();

  function execute(headers: Record<string, string | string[] | undefined>) {
    const request = { headers } as unknown as RequestWithCorrelationId;
    const setHeader = jest.fn();
    const response = { setHeader } as unknown as Response;
    const next = jest.fn() as NextFunction;

    middleware.use(request, response, next);

    return { request, setHeader, next };
  }

  it('genera un identificador cuando la cabecera falta', () => {
    const { request, setHeader, next } = execute({});

    expect(request.correlationId).toMatch(/^[A-Za-z0-9._-]{1,128}$/);
    expect(setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      request.correlationId,
    );
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('conserva un identificador válido', () => {
    const { request, setHeader } = execute({
      [CORRELATION_ID_HEADER]: 'trace-123',
    });

    expect(request.correlationId).toBe('trace-123');
    expect(setHeader).toHaveBeenCalledWith(CORRELATION_ID_HEADER, 'trace-123');
  });

  it('reemplaza un identificador inválido', () => {
    const { request, setHeader } = execute({
      [CORRELATION_ID_HEADER]: 'invalid value with spaces',
    });

    expect(request.correlationId).not.toBe('invalid value with spaces');
    expect(request.correlationId).toMatch(/^[A-Za-z0-9._-]{1,128}$/);
    expect(setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      request.correlationId,
    );
  });

  it('rechaza cabeceras repetidas y genera un identificador nuevo', () => {
    const { request } = execute({
      [CORRELATION_ID_HEADER]: ['trace-a', 'trace-b'],
    });

    expect(request.correlationId).not.toBe('trace-a');
    expect(request.correlationId).not.toBe('trace-b');
  });
});
