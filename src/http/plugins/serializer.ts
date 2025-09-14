/**
 * preSerialization hook
 *
 * Este hook do Fastify garante que o payload da resposta seja convertido para uma forma
 * serializável e segura antes de ser enviado ao cliente.
 *
 * Ele trata casos especiais e tipos não suportados nativamente pelo JSON,
 * preservando ao mesmo tempo valores que já podem ser enviados diretamente.
 *
 * Em resumo: sua função é atuar como uma camada de adaptação entre os dados internos
 * da aplicação e o formato final enviado na resposta HTTP.
 *
 * Obs: caso esta função seja modificada no futuro, revise se ela continua garantindo
 * compatibilidade de serialização e transmissão no Fastify.
 */

import { Readable } from 'node:stream'
import { Decimal } from '@prisma/client/runtime/library'
import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify'

type OptionalPipeObject = object & { pipe?: unknown }

function hasPipe(value: unknown) {
  const isNotNull = value !== null
  const isObject = typeof value === 'object'
  const hasPipeProperty = 'pipe' in (value as object)
  const hasPipeFunction = typeof (value as OptionalPipeObject).pipe === 'function'

  return isNotNull && isObject && hasPipeProperty && hasPipeFunction
}

function toSerializable(value: unknown, alreadySeen: WeakSet<object>) {
  if (value == null) return value
  if (typeof value === 'bigint') return value.toString()
  if (value instanceof Decimal) return value.toString()
  if (value instanceof Date || Buffer.isBuffer(value) || value instanceof Readable) {
    // Mantém tipos especiais inalterados, pois já são serializáveis ou tratados pelo Fastify
    return value
  }

  if (Array.isArray(value)) {
    return (value as unknown[]).map((item) => toSerializable(item, alreadySeen))
  }

  if (typeof value === 'object') {
    const unknownObject = value as Record<string, unknown>

    if (alreadySeen.has(unknownObject)) {
      // Retorna o objeto original para evitar loops infinitos em referências circulares
      return value
    }
    alreadySeen.add(unknownObject)

    const output = Object.fromEntries(
      Object.entries(unknownObject).map(([k, v]) => [k, toSerializable(v, alreadySeen)]),
    )

    return output
  }

  return value
}

export function preSerialization(
  _request: FastifyRequest,
  _reply: FastifyReply,
  payload: unknown,
  done: DoneFuncWithErrOrRes,
) {
  if (payload instanceof Readable || hasPipe(payload) || Buffer.isBuffer(payload)) {
    done(null, payload)
    return
  }

  const alreadySeen = new WeakSet<object>()
  done(null, toSerializable(payload, alreadySeen))
}
