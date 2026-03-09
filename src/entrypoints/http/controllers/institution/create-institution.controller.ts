import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import type { CreateInstitutionBodyType } from '@custom-types/http/schemas/institution/create-institution-body-schema'
import type { FastifyReply } from 'fastify'
import { InstitutionPresenter } from '@http/presenters/institution-presenter'
import { CreateInstitutionUseCase } from '@use-cases/institution/create-institution'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function createInstitution(request: ZodRequest<{ body: CreateInstitutionBodyType }>, reply: FastifyReply) {
  const parsedBody = request.body

  const useCase = container.resolve(CreateInstitutionUseCase)

  const { institution } = await useCase.execute(parsedBody)

  const formattedReply = InstitutionPresenter.toHTTP<InstitutionDefaultPresenterInput, HTTPInstitution>(institution)

  return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
}
