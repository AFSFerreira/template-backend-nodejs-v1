import { SENSITIVE_KEYS } from '@constants/sets'

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
