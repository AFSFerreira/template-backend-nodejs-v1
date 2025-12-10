import type { HTTPInstitutionWithUsersCount } from '@custom-types/presenter/institution/institution-with-users-count'
import type { InstitutionsUsersCount } from '@custom-types/repository/institution/institutions-users-count'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { INSTITUTION_WITH_USERS_COUNT_PRESENTER_KEY } from '@constants/presenters-constants'
import { InstitutionPresenter } from '@presenters/variants/institution-presenter'
import { getAllInstitutionsWithUsersQuerySchema } from '@schemas/institution/get-all-institutions-with-users-query-schema'
import { GetAllInstitutionsWithUsersUseCase } from '@use-cases/institution/get-all-institutions-with-user'
import { container } from 'tsyringe'

export async function getAllInstitutionsWithUsers(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInstitutionsWithUsersQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllInstitutionsWithUsersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: InstitutionPresenter.toHTTP<InstitutionsUsersCount, HTTPInstitutionWithUsersCount>(
      data,
      INSTITUTION_WITH_USERS_COUNT_PRESENTER_KEY,
    ),
    meta,
  })
}
