import type { FastifyRequest } from 'fastify'

/**
 * Extrai o `id` do usuário autenticado, retornando `null` se não estiver presente.
 *
 * Versão não-obrigatória de {@link getRequestUserId}. Utilizada em rotas
 * que podem ser acessadas tanto por usuários autenticados quanto anônimos
 * (ex: geração de chave de rate limit).
 *
 * @param request - Request do Fastify.
 * @returns `id` (UUIDv7) do usuário ou `null` se não autenticado.
 */
export function getRequestUserIdOptional(request: FastifyRequest): string | null {
  return request.user?.sub
}
