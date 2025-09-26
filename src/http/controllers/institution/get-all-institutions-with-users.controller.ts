import { InstitutionPresenter } from '@presenters/institution-presenter'
import { getAllInstitutionsWithUsersQuerySchema } from '@schemas/institution/get-all-institutions-with-users-query-schema'
import { makeGetAllInstitutionsWithUsersUseCase } from '@use-cases/factories/institution/make-get-all-institutions-with-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllInstitutionsWithUsers(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInstitutionsWithUsersQuerySchema.parse(request.query)

  const getAllInstitutionsWithUsersUseCase = makeGetAllInstitutionsWithUsersUseCase()

  const { data, meta } = await getAllInstitutionsWithUsersUseCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: InstitutionPresenter.toHTTP(data),
    meta,
  })
}
