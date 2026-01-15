import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionalInfoPresenter } from '@presenters/institutional-info-presenter'
import { updateInstitutionalInfoBodySchema } from '@schemas/institutional-info/update-institutional-info-body-schema'
import { UpdateInstitutionalInfoUseCase } from '@use-cases/institutional-info/update-institutional-info'
import { container } from 'tsyringe'

export async function updateInstitutionalInfo(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = updateInstitutionalInfoBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateInstitutionalInfoUseCase)

  const { institutionalInfo } = await useCase.execute({ data: parsedBody })

  const formattedReply = InstitutionalInfoPresenter.toHTTP<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>(
    institutionalInfo,
    tokens.presenters.institutionalInfo.institutionalInfoDefault,
  )

  return await reply.status(200).send({ data: formattedReply })
}
