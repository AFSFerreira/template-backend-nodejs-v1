import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'
import type { UpdateDirectorPositionBodyType } from '@custom-types/http/schemas/director-position/update-director-position-body-schema'
import type { UpdateDirectorPositionParamsType } from '@custom-types/http/schemas/director-position/update-director-position-params-schema'
import type { FastifyReply } from 'fastify'
import { DirectorPositionPresenter } from '@http/presenters/director-position-presenter'
import { UpdateDirectorPositionUseCase } from '@use-cases/director-position/update-director-position'
import { container } from 'tsyringe'

export async function updateDirectorPosition(
  request: ZodRequest<{ body: UpdateDirectorPositionBodyType; params: UpdateDirectorPositionParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(UpdateDirectorPositionUseCase)

  const { directorPosition } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = DirectorPositionPresenter.toHTTP<DirectorPositionDefaultPresenterInput, HTTPDirectorPosition>(
    directorPosition,
  )

  return await reply.status(200).send({ data: formattedReply })
}
