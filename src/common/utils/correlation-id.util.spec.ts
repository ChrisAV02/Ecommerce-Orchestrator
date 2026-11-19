import {
  CORRELATION_ID_PATTERN,
  isValidCorrelationId,
  resolveCorrelationId,
} from './correlation-id.util';

describe('correlation-id.util', () => {
  it('acepta formatos válidos', () => {
    expect(isValidCorrelationId('abc-123_X.Y')).toBe(true);
    expect(isValidCorrelationId('a'.repeat(128))).toBe(true);
  });

  it.each([
    undefined,
    null,
    '',
    ' '.repeat(4),
    'bad id!!',
    'a'.repeat(129),
    42,
  ])('rechaza el valor inválido %p', (value) => {
    expect(isValidCorrelationId(value)).toBe(false);
  });

  it('conserva un identificador válido', () => {
    expect(resolveCorrelationId('trace-001')).toBe('trace-001');
  });

  it('genera un identificador cuando falta o es inválido', () => {
    const generated = resolveCorrelationId(undefined);

    expect(generated).toMatch(CORRELATION_ID_PATTERN);
    expect(resolveCorrelationId('bad id!!')).not.toBe('bad id!!');
  });
});
