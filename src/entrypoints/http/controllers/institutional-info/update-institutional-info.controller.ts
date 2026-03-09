import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import type { UpdateInstitutionalInfoBodyType } from '@custom-types/http/schemas/institutional-info/update-institutional-info-body-schema'
import type { FastifyReply } from 'fastify'
import { InstitutionalInfoPresenter } from '@http/presenters/institutional-info-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UpdateInstitutionalInfoUseCase } from '@use-cases/institutional-info/update-institutional-info'
import { container } from 'tsyringe'

export async function updateInstitutionalInfo(
  request: ZodRequest<{ body: UpdateInstitutionalInfoBodyType }>,
  reply: FastifyReply,
) {
  const parsedBody = request.body

  const useCase = container.resolve(UpdateInstitutionalInfoUseCase)

  const { institutionalInfo } = await useCase.execute({ data: parsedBody })

  const formattedReply = InstitutionalInfoPresenter.toHTTP<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>(
    institutionalInfo,
    tsyringeTokens.presenters.institutionalInfo.institutionalInfoDefault,
  )

  return await reply.sendResponse(formattedReply)
}
