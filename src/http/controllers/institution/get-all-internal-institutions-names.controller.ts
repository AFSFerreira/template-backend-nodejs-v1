import type { HTTPInstitution } from '@custom-types/http/presenter/institution/institution-default'
import type { Institution } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionPresenter } from '@presenters/institution-presenter'
import { getAllInternalInstitutionsNamesQuerySchema } from '@schemas/institution/get-all-internal-institutions-names-query-schema'
import { GetAllInternalInstitutionsNamesUseCase } from '@use-cases/institution/get-all-internal-institutions-names'
import { container } from 'tsyringe'

export async function getAllInternalInstitutionsNames(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllInternalInstitutionsNamesQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllInternalInstitutionsNamesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = InstitutionPresenter.toHTTP<Institution, HTTPInstitution>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
