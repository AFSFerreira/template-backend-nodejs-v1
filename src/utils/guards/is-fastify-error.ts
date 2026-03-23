import type { FastifyError } from 'fastify'

/**
 * Type guard que verifica se um erro é uma instância de `FastifyError`.
 *
 * Detecta erros específicos do Fastify (como payload inválido, body vazio, limites de multipart),
 * que possuem as propriedades `code` e `statusCode`, diferenciando-os de erros genéricos.
 *
 * @param error - Instância de `Error` a ser verificada.
 * @returns `true` se o erro possui `code` e `statusCode` (características de `FastifyError`).
 */
export function isFastifyError(error: Error): error is FastifyError {
  return typeof error === 'object' && error !== null && 'code' in error && 'statusCode' in error
}
