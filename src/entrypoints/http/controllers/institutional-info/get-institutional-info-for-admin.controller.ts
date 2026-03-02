import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoPresenter } from '@http/presenters/institutional-info-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetInstitutionalInfoForAdminUseCase } from '@use-cases/institutional-info/get-institutional-info-for-admin'
import { container } from 'tsyringe'

export async function getInstitutionalInfoForAdmin(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetInstitutionalInfoForAdminUseCase)

  const { institutionalInfo } = await useCase.execute()

  const formattedReply = InstitutionalInfoPresenter.toHTTP<
    InstitutionalInfoForAdminPresenterInput,
    HTTPInstitutionalInfoForAdmin
  >(institutionalInfo, tsyringeTokens.presenters.institutionalInfo.institutionalInfoForAdmin)

  return await reply.status(200).send({ data: formattedReply })
}
