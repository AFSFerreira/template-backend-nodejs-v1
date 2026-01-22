import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionPresenter } from '@presenters/institution-presenter'
import { createInstitutionBodySchema } from '@schemas/institution/create-institution-body-schema'
import { CreateInstitutionUseCase } from '@use-cases/institution/create-institution'
import { container } from 'tsyringe'

export async function createInstitution(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createInstitutionBodySchema.parse(request.body)

  const useCase = container.resolve(CreateInstitutionUseCase)

  const { institution } = await useCase.execute(parsedBody)

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionDefaultPresenterInput, HTTPInstitution>(institution)

  return await reply.status(201).send({
    data: formattedReply,
  })
}
