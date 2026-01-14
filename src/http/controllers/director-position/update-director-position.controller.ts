import type { HTTPDirectorPosition } from '@custom-types/http/presenter/director-position/director-position-default'
import type { DirectorPosition } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DirectorPositionPresenter } from '@presenters/director-position-presenter'
import { updateDirectorPositionBodySchema } from '@schemas/director-position/update-director-position-body-schema'
import { updateDirectorPositionParamsSchema } from '@schemas/director-position/update-director-position-params-schema'
import { UpdateDirectorPositionUseCase } from '@use-cases/director-position/update-director-position'
import { container } from 'tsyringe'

export async function updateDirectorPosition(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateDirectorPositionParamsSchema.parse(request.params)
  const parsedBody = updateDirectorPositionBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateDirectorPositionUseCase)

  const { directorPosition } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = DirectorPositionPresenter.toHTTP<DirectorPosition, HTTPDirectorPosition>(directorPosition)

  return await reply.status(200).send({ data: formattedReply })
}
