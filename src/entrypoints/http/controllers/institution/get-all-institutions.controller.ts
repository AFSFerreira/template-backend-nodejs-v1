import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllInstitutionsQueryType } from '@custom-types/http/schemas/institution/get-all-institutions-query-schema'
import type { FastifyReply } from 'fastify'
import { GetAllInstitutionsNamesUseCase } from '@use-cases/institution/get-all-institutions-names'
import { container } from 'tsyringe'

export async function getAllInstitutionsNames(
  request: ZodRequest<{ querystring: GetAllInstitutionsQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllInstitutionsNamesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.sendPaginated(data, meta)
}
