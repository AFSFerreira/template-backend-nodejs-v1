import type { RateLimitInput } from '@custom-types/utils/http/rate-limit-input-type'
import type { RouteOptions } from 'fastify'
import { rateLimitKeyGenerator } from './rate-limit-key-generator'

/**
 * Cria a configuração de Rate Limiting para uma rota Fastify.
 *
 * Retorna um objeto parcial de `RouteOptions` que pode ser espalhado na definição
 * da rota. A chave de identificação padrão prioriza o `id` do usuário autenticado;
 * caso contrário, utiliza o IP do cliente.
 *
 * @param params - Parâmetros de configuração.
 * @param params.max - Número máximo de requisições por janela de tempo (padrão: 20).
 * @param params.timeWindow - Janela de tempo para contabilização (padrão: `'1m'`).
 * @param params.keyGenerator - Função geradora da chave de identificação (padrão: `rateLimitKeyGenerator`).
 * @returns Configuração parcial de `RouteOptions` com rate limiting.
 *
 * @example
 * // Rota com rate limit padrão (20 req/min):
 * app.get('/api/resource', { ...rateLimit({}) }, handler)
 *
 * // Rota de login com rate limit restritivo:
 * app.post('/api/login', { ...rateLimit({ max: 5, timeWindow: '15m' }) }, handler)
 */
export function rateLimit({
  max = 20,
  timeWindow = '1m',
  keyGenerator = rateLimitKeyGenerator,
}: RateLimitInput): Partial<RouteOptions> {
  return {
    config: {
      rateLimit: {
        max,
        timeWindow,
        keyGenerator,
      },
    },
  }
}
