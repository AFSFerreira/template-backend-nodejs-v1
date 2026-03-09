import type { FastifyRequest } from 'fastify'

/**
 * Extrai o endereço IP do cliente a partir da request do Fastify.
 *
 * Utiliza `request.ip`, que já considera o `trustProxy` configurado no Fastify.
 * Caso seja necessário extrair diretamente do header `X-Forwarded-For` em cenários
 * com proxy reverso, a lógica comentada pode ser reativada.
 *
 * @param request - Request do Fastify.
 * @returns Endereço IP do cliente.
 */
export function getClientIp(request: FastifyRequest): string {
  // const xff = request.headers['x-forwarded-for']
  // if (Array.isArray(xff)) return xff[0]
  // if (typeof xff === 'string' && xff.length > 0) return xff.split(',')[0].trim()
  return request.ip
}
