import type { HTTPInstitutionWithUsersCount } from '@custom-types/http/presenter/institution/institution-with-users-count'
import type { InstitutionsUsersCount } from '@custom-types/repository/prisma/institution/institutions-users-count'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionPresenter } from '@presenters/institution-presenter'
import { getAllInstitutionsWithUsersQuerySchema } from '@schemas/institution/get-all-institutions-with-users-query-schema'
import { GetAllInstitutionsWithUsersUseCase } from '@use-cases/institution/get-all-institutions-with-user'
import { container } from 'tsyringe'

export async function getAllInstitutionsWithUsers(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInstitutionsWithUsersQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllInstitutionsWithUsersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionsUsersCount, HTTPInstitutionWithUsersCount>(
    data,
    tokens.presenters.institution.institutionWithUsersCount,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
