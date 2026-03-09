import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import type { UpdateInstitutionBodyType } from '@custom-types/http/schemas/institution/update-institution-body-schema'
import type { UpdateInstitutionParamsType } from '@custom-types/http/schemas/institution/update-institution-params-schema'
import type { FastifyReply } from 'fastify'
import { InstitutionPresenter } from '@http/presenters/institution-presenter'
import { UpdateInstitutionUseCase } from '@use-cases/institution/update-institution'
import { container } from 'tsyringe'

export async function updateInstitution(
  request: ZodRequest<{ body: UpdateInstitutionBodyType; params: UpdateInstitutionParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(UpdateInstitutionUseCase)

  const { institution } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionDefaultPresenterInput, HTTPInstitution>(institution)

  return await reply.sendResponse(formattedReply)
}
