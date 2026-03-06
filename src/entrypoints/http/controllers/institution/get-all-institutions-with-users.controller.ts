import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPInstitutionWithUsersCount,
  InstitutionWithUsersCountPresenterInput,
} from '@custom-types/http/presenter/institution/institution-with-users-count'
import type { GetAllInstitutionsWithUsersQueryType } from '@custom-types/http/schemas/institution/get-all-institutions-with-users-query-schema'
import type { FastifyReply } from 'fastify'
import { InstitutionPresenter } from '@http/presenters/institution-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllInstitutionsWithUsersUseCase } from '@use-cases/institution/get-all-institutions-with-user'
import { container } from 'tsyringe'

export async function getAllInstitutionsWithUsers(
  request: ZodRequest<{ querystring: GetAllInstitutionsWithUsersQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllInstitutionsWithUsersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = InstitutionPresenter.toHTTP<
    InstitutionWithUsersCountPresenterInput,
    HTTPInstitutionWithUsersCount
  >(data, tsyringeTokens.presenters.institution.institutionWithUsersCount)

  return await reply.status(200).send({ data: formattedReply, meta })
}
