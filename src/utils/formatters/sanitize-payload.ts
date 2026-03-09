import { SENSITIVE_KEYS } from '@constants/sets'

/**
 * Sanitiza recursivamente um payload substituindo valores de campos sensíveis por `[FILTERED_BY_SECURITY]`.
 *
 * Percorre o objeto em profundidade e substitui qualquer propriedade cujo nome esteja
 * no conjunto `SENSITIVE_KEYS` (ex: `password`, `token`, `identityDocument`). Arrays,
 * `Date` e `Buffer` são tratados adequadamente.
 *
 * Utilizado para sanitizar dados antes de logá-los (Pino/Sentry), garantindo que informações
 * sensíveis nunca sejam expostas em logs.
 *
 * @param body - Payload a ser sanitizado (qualquer tipo).
 * @returns Cópia do payload com campos sensíveis substituídos. Retorna o valor original para tipos primitivos.
 *
 * @example
 * sanitizePayload({ email: 'user@email.com', password: '123456' })
 * // { email: 'user@email.com', password: '[FILTERED_BY_SECURITY]' }
 *
 * sanitizePayload({ users: [{ name: 'Ana', token: 'abc' }] })
 * // { users: [{ name: 'Ana', token: '[FILTERED_BY_SECURITY]' }] }
 */
export function sanitizePayload(body: unknown): unknown {
  if (!body || typeof body !== 'object') {
    return body
  }

  if (Array.isArray(body)) {
    return body.map((item) => sanitizePayload(item))
  }

  if (body instanceof Date || body instanceof Buffer) {
    return body
  }

  const clonedBody = {} as Record<string, unknown>

  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key)) {
      clonedBody[key] = '[FILTERED_BY_SECURITY]'
    } else {
      clonedBody[key] = sanitizePayload(value)
    }
  }

  return clonedBody
}
