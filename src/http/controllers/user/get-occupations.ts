import { getOccupationQuerySchema } from '@schemas/user/get-occupations-query-schema'
import { getTranslatedOccupations } from '@services/translate-occupation'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getOccupations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { lang } = getOccupationQuerySchema.parse(request.query)

  return await reply.status(200).send({ data: getTranslatedOccupations(lang) })
}
