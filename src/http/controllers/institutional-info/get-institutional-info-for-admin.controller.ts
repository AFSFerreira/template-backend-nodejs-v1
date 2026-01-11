import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/presenter/institutional-info/institutional-info-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionalInfoPresenter } from '@presenters/institutional-info-presenter'
import { GetInstitutionalInfoForAdminUseCase } from '@use-cases/institutional-info/get-institutional-info-for-admin'
import { container } from 'tsyringe'

export async function getInstitutionalInfoForAdmin(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetInstitutionalInfoForAdminUseCase)

  const { institutionalInfo } = await useCase.execute()

  const formattedReply = InstitutionalInfoPresenter.toHTTP<
    InstitutionalInfoForAdminPresenterInput,
    HTTPInstitutionalInfoForAdmin
  >(institutionalInfo, tokens.presenters.institutionalInfo.institutionalInfoForAdmin)

  return await reply.status(200).send({ data: formattedReply })
}
