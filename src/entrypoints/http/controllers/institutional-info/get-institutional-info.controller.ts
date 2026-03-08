import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoPresenter } from '@http/presenters/institutional-info-presenter'
import { GetInstitutionalInfoUseCase } from '@use-cases/institutional-info/get-institutional-info'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getInstitutionalInfo(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetInstitutionalInfoUseCase)

  const { institutionalInfo } = await useCase.execute()

  const formattedReply = InstitutionalInfoPresenter.toHTTP<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>(
    institutionalInfo,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
