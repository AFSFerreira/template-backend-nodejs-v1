import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import type { GetAllInternalInstitutionsNamesQueryType } from '@custom-types/http/schemas/institution/get-all-internal-institutions-names-query-schema'
import type { FastifyReply } from 'fastify'
import { InstitutionPresenter } from '@http/presenters/institution-presenter'
import { GetAllInternalInstitutionsNamesUseCase } from '@use-cases/institution/get-all-internal-institutions-names'
import { container } from 'tsyringe'

export async function getAllInternalInstitutionsNames(
  request: ZodRequest<{ querystring: GetAllInternalInstitutionsNamesQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllInternalInstitutionsNamesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionDefaultPresenterInput, HTTPInstitution>(data)

  return await reply.sendPaginated(formattedReply, meta)
}
