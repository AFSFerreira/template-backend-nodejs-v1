import { getAllInstitutionsSchema } from '@schemas/institution/get-all-institutions-query-schema'
import { GetAllInstitutionsNamesUseCase } from '@use-cases/institution/get-all-institutions-names'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function getAllInstitutionsNames(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInstitutionsSchema.parse(request.query)

  const useCase = container.resolve(GetAllInstitutionsNamesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({ data, meta })
}
