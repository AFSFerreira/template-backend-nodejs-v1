import { getAllInstitutionsSchema } from '@schemas/institution/get-all-institutions-query-schema'
import { makeGetAllInstitutionsNamesUseCase } from '@use-cases/factories/institution/make-get-all-institutions-names-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllInstitutionsNames(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInstitutionsSchema.parse(request.query)

  const getAllInstitutionsNamesUseCase = makeGetAllInstitutionsNamesUseCase()

  const { data, meta } = await getAllInstitutionsNamesUseCase.execute(parsedQuery)

  return await reply.status(200).send({ data, meta })
}
