import { envSchema, validateEnvironment } from './env.validation';

describe('validateEnvironment', () => {
  it('acepta una configuración válida y normaliza los tipos', () => {
    const result = validateEnvironment({
      PORT: '3001',
      ECOMMERCE_API_BASE_URL: 'http://localhost:5000',
      ECOMMERCE_API_TIMEOUT_MS: '5000',
    });

    expect(result.PORT).toBe(3001);
    expect(result.ECOMMERCE_API_TIMEOUT_MS).toBe(5000);
    expect(result.SERVICE_NAME).toBe('ecommerce-orchestrator');
    expect(result.API_PREFIX).toBe('api/v1');
  });

  it('aplica valores por defecto sin exigir secretos de producción', () => {
    const result = envSchema.parse({});

    expect(result.NODE_ENV).toBe('development');
    expect(result.PORT).toBe(3001);
    expect(result.ECOMMERCE_API_BASE_URL).toBe('http://localhost:5000');
  });

  it.each(['0', '-1', '70000', 'not-a-number'])(
    'rechaza el puerto inválido %s',
    (port) => {
      expect(() => validateEnvironment({ PORT: port })).toThrow(
        /Invalid environment configuration/,
      );
    },
  );

  it('rechaza una URL malformada', () => {
    expect(() =>
      validateEnvironment({ ECOMMERCE_API_BASE_URL: 'not-a-url' }),
    ).toThrow(/ECOMMERCE_API_BASE_URL/);
  });

  it.each(['0', '-250', 'abc'])('rechaza el timeout inválido %s', (timeout) => {
    expect(() =>
      validateEnvironment({ ECOMMERCE_API_TIMEOUT_MS: timeout }),
    ).toThrow(/ECOMMERCE_API_TIMEOUT_MS/);
  });

  it('rechaza un prefijo de API con formato inválido', () => {
    expect(() => validateEnvironment({ API_PREFIX: '/api/v1/' })).toThrow(
      /API_PREFIX/,
    );
  });

  it('rechaza un entorno no soportado', () => {
    expect(() => validateEnvironment({ NODE_ENV: 'staging' })).toThrow(
      /NODE_ENV/,
    );
  });
});
