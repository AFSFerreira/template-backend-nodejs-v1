import { getEducationLevelsQuerySchema } from '@schemas/user/get-education-levels-query-schema'
import { getTranslatedEducationLevels } from '@services/translate-education-level'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getEducationLevels(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { lang } = getEducationLevelsQuerySchema.parse(request.query)

  return await reply
    .status(200)
    .send({ data: getTranslatedEducationLevels(lang) })
}
