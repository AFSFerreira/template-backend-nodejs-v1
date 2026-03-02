import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionPresenter } from '@presenters/institution-presenter'
import { updateInstitutionBodySchema } from '@schemas/institution/update-institution-body-schema'
import { updateInstitutionParamsSchema } from '@schemas/institution/update-institution-params-schema'
import { UpdateInstitutionUseCase } from '@use-cases/institution/update-institution'
import { container } from 'tsyringe'

export async function updateInstitution(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateInstitutionParamsSchema.parse(request.params)
  const parsedBody = updateInstitutionBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateInstitutionUseCase)

  const { institution } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionDefaultPresenterInput, HTTPInstitution>(institution)

  return await reply.status(200).send({
    data: formattedReply,
  })
}
