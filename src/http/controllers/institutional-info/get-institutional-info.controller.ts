import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoPresenter } from '@presenters/institutional-info-presenter'
import { GetInstitutionalInfoUseCase } from '@use-cases/institutional-info/get-institutional-info'
import { container } from 'tsyringe'

export async function getInstitutionalInfo(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetInstitutionalInfoUseCase)

  const { institutionalInfo } = await useCase.execute()

  const formattedReply = InstitutionalInfoPresenter.toHTTP<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>(
    institutionalInfo,
  )

  return await reply.status(200).send({ data: formattedReply })
}
