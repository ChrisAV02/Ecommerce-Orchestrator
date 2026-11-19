import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from '../constants/http-headers.constants';
import { resolveCorrelationId } from '../utils/correlation-id.util';

export interface RequestWithCorrelationId extends Request {
  correlationId?: string;
}

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use = (
    request: RequestWithCorrelationId,
    response: Response,
    next: NextFunction,
  ): void => {
    const correlationId = resolveCorrelationId(
      request.headers[CORRELATION_ID_HEADER],
    );

    request.correlationId = correlationId;
    response.setHeader(CORRELATION_ID_HEADER, correlationId);
    next();
  };
}
