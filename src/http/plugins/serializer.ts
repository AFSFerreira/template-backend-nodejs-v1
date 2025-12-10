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

import type { OptionalPipeObject } from '@custom-types/custom/optional-pipe-object'
import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify'
import { Readable } from 'node:stream'
import { Prisma } from '@prisma/client'

function hasPipe(value: unknown) {
  const isNotNull = value !== null
  const isObject = typeof value === 'object'
  const hasPipeProperty = 'pipe' in (value as object)
  const hasPipeFunction = typeof (value as OptionalPipeObject).pipe === 'function'

  return isNotNull && isObject && hasPipeProperty && hasPipeFunction
}

function toSerializable(value: unknown, alreadySeen: WeakSet<object>): unknown {
  if (value === null || value === undefined) return value
  if (typeof value === 'bigint') return value.toString()
  if (value instanceof Prisma.Decimal) return value.toString()

  if (value === Prisma.DbNull || value === Prisma.JsonNull || value === Prisma.AnyNull) {
    return null
  }

  if (Buffer.isBuffer(value) || value instanceof Readable) {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (value instanceof Map) {
    const obj: Record<string, unknown> = {}
    for (const [key, val] of value.entries()) {
      obj[String(key)] = toSerializable(val, alreadySeen)
    }
    return obj
  }

  if (value instanceof Set) {
    return Array.from(value).map((val) => toSerializable(val, alreadySeen))
  }

  if (Array.isArray(value)) {
    return (value as unknown[]).map((item) => toSerializable(item, alreadySeen))
  }

  if (typeof value === 'object') {
    const unknownObject = value as Record<string, unknown>

    if (alreadySeen.has(unknownObject)) {
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
